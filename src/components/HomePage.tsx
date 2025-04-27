import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Settings, User, ShoppingCart, LogOut } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 font-[Poppins]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Tino's Tech</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img 
                src={user?.picture || 'https://via.placeholder.com/40'} 
                alt="Profile" 
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-2 text-gray-700 font-medium hidden md:inline">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Tino's Tech, {user?.name}!</h2>
          <p className="text-gray-600">
            Esta é sua página inicial personalizada. Aqui você pode gerenciar suas preferências,
            ver seus pedidos recentes e muito mais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium">Meu Perfil</h3>
            </div>
            <p className="text-gray-600 mb-4">Gerencie suas informações pessoais e preferências de conta.</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Editar Perfil
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <ShoppingCart className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium">Meus Pedidos</h3>
            </div>
            <p className="text-gray-600 mb-4">Visualize seus pedidos recentes e acompanhe entregas.</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Ver Pedidos
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium">Configurações</h3>
            </div>
            <p className="text-gray-600 mb-4">Ajuste as configurações da sua conta e preferências.</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Gerenciar Configurações
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={logout}
            className="flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
          >
            <LogOut size={18} />
            <span>Sair da conta</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;