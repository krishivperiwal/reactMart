// src/pages/Checkout.jsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
//                                       ↑
// keeping your exact import path since yours uses lowercase 'themeContext'

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── React Hook Form setup ──────────────────────────────────
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  //             ↑
  // onBlur = validate when user leaves a field
  // errors only appear after user has interacted with a field
  // much better UX than showing errors immediately

  // ── Watch password for confirm password comparison ─────────
  const password = watch('password');
  //                ↑
  // reads the live value of password field
  // needed so confirmPassword can compare against it

  // ── Submit handler ─────────────────────────────────────────
  function onSubmit(data) {
    //               ↑
    // RHF passes ALL field values here automatically
    // this function ONLY runs if ALL validation passes
    // no need to manually check errors
    console.log('Order placed:', data);

    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setOrderPlaced(true);
    }, 1500);
  }

  // ── Styles ─────────────────────────────────────────────────
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
    borderRadius: '12px',
    padding: '28px',
    marginBottom: '20px',
    boxShadow: theme === 'dark'
      ? '0 2px 12px rgba(0,0,0,0.3)'
      : '0 2px 12px rgba(0,0,0,0.07)',
  };

  function inputStyle(fieldName) {
    return {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: `1px solid ${
        errors[fieldName]
          ? '#ef4444'
          // ↑ red border when this field has a validation error
          : theme === 'dark' ? '#333' : '#ddd'
      }`,
      backgroundColor: theme === 'dark' ? '#111' : '#fafafa',
      color: theme === 'dark' ? '#fff' : '#111',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      marginTop: '6px',
    };
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    opacity: 0.8,
    display: 'block',
    marginTop: '16px',
  };

  const errorTextStyle = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block',
  };

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  };

  // ── Success screen ─────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div style={{ ...containerStyle, textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: '72px', margin: '0 0 16px' }}>🎉</p>
        <h1 style={{ margin: '0 0 8px' }}>Order Placed!</h1>
        <p style={{ opacity: 0.7, margin: '0 0 8px' }}>
          Thank you for shopping at ReactMart.
        </p>
        <p style={{ opacity: 0.6, fontSize: '14px', margin: '0 0 32px' }}>
          We'll get your order ready soon.
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
          Continue Shopping
        </button>
      </div>
    );
  }

  // ── Checkout form ──────────────────────────────────────────
  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '24px' }}>Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      {/*             ↑
          handleSubmit wraps our onSubmit
          1. calls e.preventDefault() automatically
          2. runs all validation
          3. if valid → calls onSubmit(data)
          4. if invalid → populates errors, stops           */}

        {/* ── Personal Information ───────────────────────── */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px' }}>Personal Information</h3>
          <p style={{ margin: '0 0 8px', opacity: 0.6, fontSize: '13px' }}>
            Powered by React Hook Form
          </p>

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                {...register('firstName', {
                //  ↑
                // spread gives input: name, ref, onChange, onBlur
                // replaces: value={} onChange={} onBlur={} name=""
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'Must be at least 2 characters',
                  },
                })}
                placeholder="John"
                style={inputStyle('firstName')}
              />
              {errors.firstName && (
              //  ↑ only renders when firstName validation fails
                <span style={errorTextStyle}>
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                {...register('lastName', {
                  required: 'Last name is required',
                })}
                placeholder="Doe"
                style={inputStyle('lastName')}
              />
              {errors.lastName && (
                <span style={errorTextStyle}>{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <label style={labelStyle}>Email Address</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Enter a valid email address',
              },
            })}
            placeholder="john@example.com"
            style={inputStyle('email')}
          />
          {errors.email && (
            <span style={errorTextStyle}>{errors.email.message}</span>
          )}

          <label style={labelStyle}>Street Address</label>
          <input
            {...register('address', {
              required: 'Address is required',
            })}
            placeholder="123 Main Street"
            style={inputStyle('address')}
          />
          {errors.address && (
            <span style={errorTextStyle}>{errors.address.message}</span>
          )}

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>City</label>
              <input
                {...register('city', {
                  required: 'City is required',
                })}
                placeholder="Mumbai"
                style={inputStyle('city')}
              />
              {errors.city && (
                <span style={errorTextStyle}>{errors.city.message}</span>
              )}
            </div>
            <div>
              <label style={labelStyle}>ZIP Code</label>
              <input
                {...register('zipCode', {
                  required: 'ZIP code is required',
                  pattern: {
                    value: /^[0-9]{4,6}$/,
                    message: 'Enter a valid ZIP code',
                  },
                })}
                placeholder="400001"
                style={inputStyle('zipCode')}
              />
              {errors.zipCode && (
                <span style={errorTextStyle}>{errors.zipCode.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Payment Details ────────────────────────────── */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 4px' }}>Payment Details</h3>
          <p style={{ margin: '0 0 8px', opacity: 0.6, fontSize: '13px' }}>
            Also managed by React Hook Form
          </p>

          <label style={labelStyle}>Card Number</label>
          <input
            {...register('cardNumber', {
              required: 'Card number is required',
              pattern: {
                value: /^[\d\s]{16,19}$/,
                message: 'Enter a valid 16-digit card number',
              },
            })}
            placeholder="1234 5678 9012 3456"
            style={inputStyle('cardNumber')}
            maxLength={19}
          />
          {errors.cardNumber && (
            <span style={errorTextStyle}>{errors.cardNumber.message}</span>
          )}

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Expiry Date</label>
              <input
                {...register('cardExpiry', {
                  required: 'Expiry date is required',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: 'Use MM/YY format',
                  },
                })}
                placeholder="MM/YY"
                style={inputStyle('cardExpiry')}
                maxLength={5}
              />
              {errors.cardExpiry && (
                <span style={errorTextStyle}>{errors.cardExpiry.message}</span>
              )}
            </div>
            <div>
              <label style={labelStyle}>CVV</label>
              <input
                {...register('cardCVV', {
                  required: 'CVV is required',
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: 'Enter a valid CVV',
                  },
                })}
                placeholder="123"
                style={inputStyle('cardCVV')}
                maxLength={4}
                type="password"
              />
              {errors.cardCVV && (
                <span style={errorTextStyle}>{errors.cardCVV.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Order Summary ──────────────────────────────── */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 16px' }}>Order Summary</h3>

          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                marginBottom: '8px',
                opacity: 0.8,
              }}
            >
              <span>{item.title || item.name} × {item.quantity}</span>
              {/*          ↑
                  item.title → FakeStoreAPI products
                  item.name  → fallback for any old cart items  */}
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div style={{
            borderTop: `1px solid ${theme === 'dark' ? '#333' : '#eee'}`,
            marginTop: '12px',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '18px',
          }}>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* ── Submit button ───────────────────────────────── */}
        <button
          type="submit"
          disabled={isSubmitting || cartItems.length === 0}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: isSubmitting ? '#555' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginBottom: '32px',
          }}
        >
          {isSubmitting
            ? 'Processing...'
            : `Place Order — $${cartTotal.toFixed(2)}`
          }
        </button>

      </form>
    </div>
  );
}

export default Checkout;