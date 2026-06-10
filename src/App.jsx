import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import NotFound from './pages/NotFound.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import CartSidebar from './components/CartSidebar.jsx';

function App() {
  const { theme } = useTheme();

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#0f0f0f' : '#f5f5f5',
    color: theme === 'dark' ? '#ffffff' : '#111111',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={appStyle}>

      <Navbar />

      <CartSidebar />

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;