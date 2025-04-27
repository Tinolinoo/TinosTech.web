import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Truck, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addItem);
  const [cep, setCep] = useState('');
  const [shippingPrice, setShippingPrice] = useState<number | null>(null);

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
    // Add other products here...
  ];

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const calculateShipping = () => {
    if (cep.length === 8) {
      const randomPrice = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
      setShippingPrice(randomPrice);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{product.rating}/5</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-3xl font-bold text-blue-600 mb-6">{product.price}</p>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Especificações</h2>
                <dl className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="w-1/3 font-medium text-gray-600">{key}:</dt>
                      <dd className="w-2/3 text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Calcular Frete</h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                    placeholder="Digite seu CEP"
                    maxLength={8}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={calculateShipping}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <Truck className="h-5 w-5 mr-2" />
                    Calcular
                  </button>
                </div>
                {shippingPrice && (
                  <p className="mt-2 text-green-600">
                    Frete estimado: R$ {shippingPrice.toFixed(2)}
                  </p>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Adicionar ao Carrinho</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;