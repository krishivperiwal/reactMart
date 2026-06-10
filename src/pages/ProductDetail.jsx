// src/pages/ProductDetail.jsx

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import api from '../api/axiosInstance.js';
//           ↑
// import our axios instance — not the local products data anymore

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const pageTopRef = useRef(null);

  // ── Real API fetch ─────────────────────────────────────────
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        setAddedToCart(false);

        if (pageTopRef.current) {
          pageTopRef.current.scrollIntoView();
        }

        const res = await api.get(`/products/${id}`);
        //                          ↑
        // GET https://fakestoreapi.com/products/1
        // axios throws automatically if 404 or 500
        // so we don't need to check res.ok like with fetch

        setProduct(res.data);
        //              ↑
        // res.data is the product object directly
        // { id, title, price, description, category, image, rating }

      } catch (err) {
        if (err.response?.status === 404) {
          //              ↑
          // optional chaining — err.response might not exist
          // for network errors (no .response property)
          setError('Product not found.');
        } else {
          setError('Failed to load product. Please try again.');
        }

      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);
  //   ↑
  // re-fetches when id changes — same as before

  // ── Check if already in cart ───────────────────────────────
  const itemInCart = cartItems.find(item => item.id === product?.id);
  const currentCartQuantity = itemInCart ? itemInCart.quantity : 0;

  // ── Add to cart ────────────────────────────────────────────
  function handleAddToCart() {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  // ── FakeStoreAPI products don't have inStock field ─────────
  // so we treat all products as in stock
  const inStock = true;

  // ── Styles (unchanged) ─────────────────────────────────────
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: theme === 'dark'
      ? '0 4px 24px rgba(0,0,0,0.4)'
      : '0 4px 24px rgba(0,0,0,0.08)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  };

  const infoStyle = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const buttonStyle = {
    padding: '14px 24px',
    backgroundColor: addedToCart ? '#22c55e' : '#0070f3',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const quantityButtonStyle = {
    width: '36px',
    height: '36px',
    border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
    borderRadius: '8px',
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
    color: theme === 'dark' ? '#fff' : '#111',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // ── Loading state ──────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', opacity: 0.6 }}>
        <p style={{ fontSize: '18px' }}>Loading product...</p>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <p style={{ fontSize: '18px', color: '#ef4444' }}>{error}</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '16px',
            padding: '10px 24px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  // ── Success state ──────────────────────────────────────────
  return (
    <div style={containerStyle} ref={pageTopRef}>

      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          color: theme === 'dark' ? '#aaa' : '#555',
          marginBottom: '20px',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        ← Back
      </button>

      <div style={cardStyle}>

        {/* ── Product Image ────────────────────────────── */}
        <div style={{
          backgroundColor: '#ffffff',
          //  ↑
          // FakeStoreAPI product images have white backgrounds
          // force white here so images look clean in dark mode too
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              maxWidth: '100%',
              maxHeight: '320px',
              objectFit: 'contain',
              //           ↑
              // 'contain' instead of 'cover' for product images
              // shows the full image without cropping
            }}
          />
        </div>

        {/* ── Product Info ─────────────────────────────── */}
        <div style={infoStyle}>

          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#0070f3',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {product.category}
          </span>

          <h1 style={{ margin: 0, fontSize: '22px', lineHeight: '1.3' }}>
            {product.title}
            {/* ↑ FakeStoreAPI uses title not name */}
          </h1>

          {/* Rating from API */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#f5a623' }}>⭐</span>
            <span>{product.rating?.rate}</span>
            {/*           ↑
                optional chaining — rating might not exist
                product.rating = { rate: 4.5, count: 120 }  */}
            <span style={{ opacity: 0.5, fontSize: '13px' }}>
              ({product.rating?.count} reviews)
            </span>
          </div>

          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            ${product.price}
          </p>

          <p style={{ margin: 0, lineHeight: '1.6', opacity: 0.8, fontSize: '14px' }}>
            {product.description}
          </p>

          {currentCartQuantity > 0 && (
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
              You have {currentCartQuantity} in your cart already
            </p>
          )}

          {/* Quantity selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                style={quantityButtonStyle}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >−</button>
              <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                style={quantityButtonStyle}
                onClick={() => setQuantity(q => Math.min(10, q + 1))}
              >+</button>
            </div>
          </div>

          <button style={buttonStyle} onClick={handleAddToCart}>
            {addedToCart
              ? '✓ Added to Cart!'
              : `Add ${quantity} to Cart — $${(product.price * quantity).toFixed(2)}`
            }
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;