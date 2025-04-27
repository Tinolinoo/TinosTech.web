import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const StorePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const cartItems = useCartStore(state => state.items);

  const products = [
    {
      id: 1,
      name: "Notebook Pro X",
      price: "R$ 4.999,00",
      priceNumber: 4999.00,
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
      description: "Notebook de última geração com processador Intel Core i7, 16GB RAM, SSD 512GB e tela 15.6' Full HD.",
      rating: 4.5,
      specs: {
        "Processador": "Intel Core i7 11th Gen",
        "Memória RAM": "16GB DDR4",
        "Armazenamento": "512GB NVMe SSD",
        "Tela": "15.6' Full HD IPS",
        "Sistema Operacional": "Windows 11 Pro"
      }
    },
    {
      id: 2,
      name: "Smartphone Ultra",
      price: "R$ 2.499,00",
      priceNumber: 2499.00,
      image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Smartphone com câmera de 108MP, tela AMOLED 120Hz e bateria de 5000mAh.",
      rating: 4.8,
      specs: {
        "Processador": "Snapdragon 8 Gen 2",
        "Memória RAM": "12GB",
        "Armazenamento": "256GB",
        "Tela": "6.7' AMOLED 120Hz",
        "Bateria": "5000mAh"
      }
    },
    {
      id: 3,
      name: "Smart Watch Elite",
      price: "R$ 999,00",
      priceNumber: 999.00,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Smartwatch com monitor cardíaco, GPS e mais de 100 modos de exercício.",
      rating: 4.3,
      specs: {
        "Tela": "1.4' AMOLED",
        "Bateria": "14 dias",
        "GPS": "Dual Band",
        "Resistência": "5ATM",
        "Sensores": "Cardíaco, SpO2, Sono"
      }
    },
    {
      id: 4,
      name: "Fones Bluetooth Pro",
      price: "R$ 599,00",
      priceNumber: 599.00,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Fones de ouvido com cancelamento de ruído ativo e até 30h de bateria.",
      rating: 4.6,
      specs: {
        "Drivers": "40mm",
        "Bateria": "30 horas",
        "Bluetooth": "5.2",
        "ANC": "Híbrido",
        "Microfones": "6 com AI"
      }
    },
    {
      id: 5,
      name: "Tablet Ultra Slim",
      price: "R$ 3.499,00",
      priceNumber: 3499.00,
      image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Tablet com tela 2K, processador potente e suporte a caneta stylus.",
      rating: 4.7,
      specs: {
        "Processador": "M2",
        "Memória RAM": "8GB",
        "Armazenamento": "256GB",
        "Tela": "11' 2K 120Hz",
        "Bateria": "10.000mAh"
      }
    },
    {
      id: 6,
      name: "Camera DSLR 4K",
      price: "R$ 5.999,00",
      priceNumber: 5999.00,
      image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Câmera profissional com gravação 4K e sensor full-frame.",
      rating: 4.9,
      specs: {
        "Sensor": "Full-frame 45MP",
        "ISO": "100-51200",
        "Vídeo": "4K 60fps",
        "Tela": "3.2' Touch",
        "Estabilização": "5-axis IBIS"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Tino's Tech</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Produtos</Link>
              <Link to="/offers" className="text-gray-700 hover:text-blue-600">Ofertas</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600">Sobre</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contato</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/cart')} 
                className="p-2 text-gray-600 hover:text-blue-600 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>{isAuthenticated ? 'Dashboard' : 'Entrar'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bem-vindo à Tino's Tech</h2>
            <p className="text-lg md:text-xl mb-6">Descubra as últimas novidades em tecnologia</p>
            <Link
              to="/offers"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
            >
              Ver Ofertas
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 
                    className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold mt-2">{product.price}</p>
                  <button 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
              <p className="text-gray-400">
                A Tino's Tech é sua loja especializada em produtos tecnológicos de alta qualidade.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">Política de Privacidade</Link></li>
                <li><Link to="/about" className="hover:text-white">Termos de Uso</Link></li>
                <li><Link to="/about" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contato@tinostech.com</li>
                <li>Tel: (11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorePage;