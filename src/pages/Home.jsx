// src/pages/Home.jsx

import { useProducts } from '../hooks/useProducts.js';
import ProductCard from '../components/ProductCard.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

function Home() {
  const { theme } = useTheme();

  const {
    filteredProducts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
    //  ↑ new — we now get error from the hook
  } = useProducts();

  const searchStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '10px',
    border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#111111',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
    marginTop: '24px',
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '28px' }}>All Products</h1>
        <p style={{ margin: 0, opacity: 0.6 }}>
          {loading ? 'Loading...' : `${filteredProducts.length} products found`}
          {/*         ↑
              while loading don't show "0 products found"
              show "Loading..." instead — better UX          */}
        </p>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={searchStyle}
      />

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: selectedCategory === category
                ? '#0070f3'
                : (theme === 'dark' ? '#2a2a2a' : '#e8e8e8'),
              color: selectedCategory === category
                ? '#ffffff'
                : (theme === 'dark' ? '#cccccc' : '#555555'),
              transition: 'all 0.2s',
              textTransform: 'capitalize',
              //               ↑
              // FakeStoreAPI categories are lowercase
              // "electronics" → "Electronics" visually
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ── Three render states ───────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', opacity: 0.6 }}>
          <p style={{ fontSize: '18px' }}>Loading products...</p>
        </div>

      ) : error ? (
      //    ↑
      // NEW — error state, didn't exist before with fake data
      // real APIs can fail — we must handle this
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontSize: '18px', color: '#ef4444' }}>
            Failed to load products
          </p>
          <p style={{ opacity: 0.6 }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            //               ↑
            // simple retry — reload the page
            // in a more advanced app you'd call fetchData() again
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
            }}
          >
            Try Again
          </button>
        </div>

      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', opacity: 0.6 }}>
          <p style={{ fontSize: '18px' }}>No products found.</p>
          <p>Try a different search or category.</p>
        </div>

      ) : (
        <div style={gridStyle}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;