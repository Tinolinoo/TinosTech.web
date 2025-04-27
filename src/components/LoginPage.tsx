import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { isAuthenticated, user, error, login, loginWithGoogle, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLocalError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
    } catch (err) {
      setLocalError('Login failed. Please try again.');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        
        const userInfo = await userInfoResponse.json();
        
        const credential = {
          sub: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture
        };
        
        loginWithGoogle(JSON.stringify(credential));
      } catch (err) {
        setLocalError('Google login failed. Please try again.');
      }
    },
    onError: () => {
      setLocalError('Google login failed. Please try again.');
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-[Poppins]">
      {!isAuthenticated ? (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">Bem-vindo de volta!</h1>
              <p className="text-gray-600 mt-2">Entre com sua conta para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Seu e-mail"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Esqueceu a senha?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Sua senha"
                  required
                />
              </div>

              {localError && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                  {localError}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              >
                <span>Entrar</span>
                <LogIn size={18} />
              </button>
            </form>

            <div className="mt-6 relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600 text-sm">ou continue com</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => googleLogin()}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 mr-2" />
                Entrar com Google
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl animate-fadeIn">
          <div className="p-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                <img 
                  src={user?.picture || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600 mb-6">{user?.email}</p>
              
              <button
                onClick={logout}
                className="flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
              >
                <LogOut size={18} />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;