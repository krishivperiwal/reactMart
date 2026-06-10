import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
    const { theme } = useTheme();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Option A: Fallback to true if product.inStock is undefined from the API
    const isAvailable = product.inStock ?? true;

    const cardStyle = {
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: theme === 'dark'
            ? '0 2px 12px rgba(0,0,0,0.4)' // Fixed typo: 4 to 0.4 for smooth dark mode shadow
            : '0 2px 12px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
    };

    const imageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    };

    const contentStyle = {
        padding: '16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '0 0 12px 12px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: isAvailable ? 'pointer' : 'not-allowed',
        backgroundColor: isAvailable ? '#0070f3' : '#cccccc',
        color: isAvailable ? '#ffffff' : '#888888',
        transition: 'background-color 0.2s',
    };

    function handleCardClick() {
        navigate(`/product/${product.id}`);
    }

    function handleAddToCart(e) {
        e.stopPropagation();

        if (!isAvailable) return;
        addToCart(product);
    }

    return (
        <div style={cardStyle} onClick={handleCardClick}>
            <img 
                src={product.image}
                alt={product.title}
                style={imageStyle}
            />

            <div style={contentStyle}>
                <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#0070f3',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    {product.category}
                </span>

                <h3 style={{ margin: 0, fontSize: '16px', lineHeight: '1.3' }}>
                    {product.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#f5a623' }}>⭐</span>
                    <span style={{ fontSize: '14px' }}>{product.rating?.rate ?? '-'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        ${product.price}
                    </span>

                    {isAvailable
                        ? <span style={{ fontSize: '12px', color: '#22c55e' }}>✓ In Stock</span>
                        : <span style={{ fontSize: '12px', color: '#ef4444' }}>✗ Out of Stock</span>
                    }
                </div>
            </div>

            <button
                style={buttonStyle}
                onClick={handleAddToCart}
                disabled={!isAvailable}
            >
                {isAvailable ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
}

export default ProductCard;