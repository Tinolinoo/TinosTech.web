import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, User } from '../types/auth';
import { jwtDecode } from 'jwt-decode';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: JSON.parse(user) 
      });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (email && password) {
        const userData: User = {
          id: '12345',
          name: email.split('@')[0],
          email: email,
          picture: 'https://via.placeholder.com/150'
        };

        localStorage.setItem('user', JSON.stringify(userData));
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: userData 
        });
      } else {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: 'Email and password are required'
        });
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: 'Invalid email or password'
      });
    }
  };

  const loginWithGoogle = (credential: string) => {
    try {
      const decoded: any = jwtDecode(credential);
      
      const userData: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      };

      localStorage.setItem('user', JSON.stringify(userData));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: userData 
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: 'Google authentication failed'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};