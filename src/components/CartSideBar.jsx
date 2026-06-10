import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";

function CartSidebar(){
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        removeFromCart,
        updateQuantity,
        cartCount,
    } = useCart();
    
    const {theme} = useTheme();
    const navigate = useNavigate();

    function handleCheckout() {
        setIsCartOpen(false);

        navigate('/checkout');
    };

    function handleClose() {
        setIsCartOpen(false);
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 200,
        opacity: isCartOpen ? 1 : 0,
        pointerEvents: isCartOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
    };

    const sidebarStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '380px',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.2)',
        zIndex: 201,
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
    };

    const headerStyle = {
        padding: '20px 24px',
        borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#eee'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const itemsContainerStyle = {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    };

    const footerStyle = {
        padding: '20px 24px',
        borderTop: `1px solid ${theme === 'dark' ? '#333' : '#eee'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    };

    const cartItemStyle = {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        paddingBottom: '16px',
        borderBottom: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#f0f0f0'}`,
    };

    const quantityButtonStyle = {
        width: '28px',
        height: '28px',
        border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
        borderRadius: '6px',
        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
        color: theme === 'dark' ? '#fff' : '#111',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
        <div style={overlayStyle} onClick={handleClose} />
        <div style={sidebarStyle}>
            <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>
                Your Cart ({cartCount})
            </h2>
            <button
                onClick={handleClose}
                style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: theme === 'dark' ? '#aaa' : '#555',
                lineHeight: 1,
                }}
            >
                ✕
            </button>
            </div>
            <div style={itemsContainerStyle}>
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5 }}>
                <p style={{ fontSize: '40px', margin: '0 0 12px' }}>🛒</p>
                <p style={{ margin: 0 }}>Your cart is empty</p>
                <button
                    onClick={handleClose}
                    style={{
                    marginTop: '16px',
                    background: 'none',
                    border: 'none',
                    color: '#0070f3',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textDecoration: 'underline',
                    }}
                >
                    Continue Shopping
                </button>
                </div>

            ) : (
                cartItems.map(item => (
                <div key={item.id} style={cartItemStyle}>
                    <img
                    src={item.image}
                    alt={item.name}
                    style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        flexShrink: 0,
                    }}
                    />

                    <div style={{ flex: 1 }}>

                    <p style={{ margin: '0 0 4px', fontWeight: '600', fontSize: '14px' }}>
                        {item.name}
                    </p>

                    <p style={{ margin: '0 0 8px', opacity: 0.7, fontSize: '13px' }}>
                        ${item.price} each
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                        <button
                        style={quantityButtonStyle}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                        −
                        </button>

                        <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                        </span>

                        <button
                        style={quantityButtonStyle}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                        +
                        </button>

                        <button
                        onClick={() => removeFromCart(item.id)}

                        style={{
                            marginLeft: 'auto',
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '13px',
                            padding: '4px',
                        }}
                        >
                        Remove
                        </button>

                    </div>
                    </div>

                    <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', flexShrink: 0 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                    </p>

                </div>
                ))
            )}

            </div>

            {cartItems.length > 0 && (
            <div style={footerStyle}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Total</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold' }}>
                    ${cartTotal.toFixed(2)}
                </span>
                </div>

                <button
                onClick={handleCheckout}
                style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#0070f3',
                    color: '#ffffff',
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
                onClick={handleClose}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: 'transparent',
                    color: theme === 'dark' ? '#aaa' : '#555',
                    border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                }}
                >
                Continue Shopping
                </button>

            </div>
            )}

        </div>
        </>
    );
}

export default CartSidebar;