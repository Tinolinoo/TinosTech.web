import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import StorePage from './components/StorePage';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OffersPage from './components/OffersPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/offers" element={<OffersPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;