import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ShoppingBag, Users, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

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

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Equipe Tino's Tech"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end">
              <div className="p-8">
                <h1 className="text-4xl font-bold text-white mb-2">Sobre a Tino's Tech</h1>
                <p className="text-gray-200">Sua loja especializada em tecnologia desde 2020</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">+10.000</h3>
                <p className="text-gray-600">Produtos Vendidos</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">+5.000</h3>
                <p className="text-gray-600">Clientes Satisfeitos</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">+50</h3>
                <p className="text-gray-600">Prêmios Recebidos</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
              <p className="text-gray-600 mb-6">
                A Tino's Tech nasceu da paixão por tecnologia e da vontade de tornar produtos de alta qualidade acessíveis a todos. Fundada em 2020, nossa empresa rapidamente se tornou referência no mercado de eletrônicos, oferecendo não apenas produtos, mas soluções completas para nossos clientes.
              </p>

              <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-gray-600 mb-6">
                Proporcionar a melhor experiência em tecnologia, com produtos de qualidade, atendimento excepcional e preços justos, contribuindo para a transformação digital da sociedade.
              </p>

              <h2 className="text-2xl font-bold mb-4">Nossos Valores</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li>Excelência no atendimento ao cliente</li>
                <li>Compromisso com a qualidade</li>
                <li>Inovação constante</li>
                <li>Responsabilidade social</li>
                <li>Transparência em todas as relações</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;