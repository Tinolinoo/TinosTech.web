import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, Clock } from 'lucide-react';

const OffersPage: React.FC = () => {
  const navigate = useNavigate();

  const offers = [
    {
      id: 1,
      name: "Notebook Pro X",
      originalPrice: "R$ 4.999,00",
      discountPrice: "R$ 4.499,00",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
      discount: "10%",
      endDate: "2024-04-30"
    },
    {
      id: 2,
      name: "Smartphone Ultra",
      originalPrice: "R$ 2.499,00",
      discountPrice: "R$ 1.999,00",
      image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800",
      discount: "20%",
      endDate: "2024-04-25"
    },
    {
      id: 3,
      name: "Smart Watch Elite",
      originalPrice: "R$ 999,00",
      discountPrice: "R$ 799,00",
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
      discount: "20%",
      endDate: "2024-04-20"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar à Loja
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Ofertas Especiais</h1>
              <p className="text-blue-100">Aproveite nossos melhores preços!</p>
            </div>
            <Tag className="h-12 w-12 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
                  -{offer.discount}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{offer.name}</h2>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-gray-500 line-through">{offer.originalPrice}</span>
                  <span className="text-2xl font-bold text-blue-600">{offer.discountPrice}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Oferta válida até {new Date(offer.endDate).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => navigate(`/product/${offer.id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Produto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersPage;