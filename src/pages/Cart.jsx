import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate,Link } from "react-router-dom";

function Cart(){

    const{
        cartItems,
        cartTotal,
        cartCount,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCart();

    const {theme} = useTheme();
    const navigate = useNavigate();

    const pageStyle = {
        maxWidth: '900px',
        margin: '0 auto',
    };

    const tableHeaderStyle = {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '16px',
        padding: '12px 16px',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        opacity: 0.7,
        marginBottom: '8px',
    };

    const rowStyle = {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '16px',
        padding: '16px',
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        borderRadius: '10px',
        alignItems: 'center',
        marginBottom: '8px',
        boxShadow: theme === 'dark'
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.06)',
    };

    const summaryStyle = {
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: theme === 'dark'
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '24px',
    };

    const qtyBtnStyle = {
        width: '32px',
        height: '32px',
        border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
        borderRadius: '6px',
        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
        color: theme === 'dark' ? '#fff' : '#111',
        cursor: 'pointer',
        fontSize: '16px',
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ ...pageStyle, textAlign: 'center', padding: '80px 20px' }}>
                <p style={{ fontSize: '64px', margin: '0 0 16px' }}>🛒</p>
                <h2 style={{ margin: '0 0 8px' }}>Your cart is empty</h2>
                <p style={{ opacity: 0.6, margin: '0 0 24px' }}>
                    Looks like you haven't added anything yet.
                </p>
                <button
                onClick={() => navigate('/')}
                style={{
                    padding: '12px 32px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                }}
                >
                Browse Products
                </button>
            </div>
        );
    }
    return (
        <div style={pageStyle}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
               <div>
                    <h1 style={{ margin: '0 0 4px' }}>Your Cart</h1>
                    <p style={{ margin: 0, opacity: 0.6 }}>
                        {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </p>
                </div>

                <button
                onClick={clearCart}
                style={{
                    background: 'none',
                    border: `1px solid #ef4444`,
                    color: '#ef4444',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
                >
                Clear Cart
                </button>
            </div>

            <div style={tableHeaderStyle}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
            </div>

            {cartItems.map(item => (
                <div key={item.id} style={rowStyle}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                    src={item.image}
                    alt={item.name}
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        flexShrink: 0,
                    }}
                />
                <div>
                <Link
                    to={`/product/${item.id}`}
                    style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontWeight: '600',
                    fontSize: '15px',
                    }}
                >
                    {item.name}
                </Link>
                <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                    display: 'block',
                    marginTop: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '13px',
                    }}
                >
                    Remove
                </button>
                </div>
            </div>

                <span style={{ fontWeight: '500' }}>
                    ${item.price}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                    style={qtyBtnStyle}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                    −
                    </button>
                    <span style={{ fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
                    {item.quantity}
                    </span>
                    <button
                    style={qtyBtnStyle}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                    +
                    </button>
                </div>

                <span style={{ fontWeight: '700', fontSize: '16px' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                </span>

                </div>
            ))}
            <div style={summaryStyle}>
                <h3 style={{ margin: 0 }}>Order Summary</h3>
            
                {cartItems.map(item => (
                <div
                    key={item.id}
                    style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', opacity: 0.8 }}
                >
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                ))}
                <div style={{ borderTop: `1px solid ${theme === 'dark' ? '#333' : '#eee'}`, paddingTop: '16px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Shipping</span>
                    <span style={{ color: '#22c55e', fontWeight: '600' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                </div>
                <button
                onClick={() => navigate('/checkout')}
                style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                }}
                >
                Proceed to Checkout →
                </button>
                <button
                onClick={() => navigate('/')}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'transparent',
                    color: theme === 'dark' ? '#aaa' : '#555',
                    border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                }}
                >
                ← Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default Cart;