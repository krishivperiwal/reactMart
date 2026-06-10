// src/components/Navbar.jsx

import { NavLink, useNavigate } from 'react-router-dom';
//        ↑           ↑
// NavLink    = like Link but knows if its URL is currently active
// useNavigate = lets us navigate programmatically (via code)

import { useTheme } from '../context/ThemeContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  //      ↑           ↑
  // theme       = 'light' or 'dark' — to style the navbar
  // toggleTheme = called when user clicks the theme button

  const { cartCount, setIsCartOpen } = useCart();
  //      ↑               ↑
  // cartCount    = total items in cart — shown as badge on cart icon
  // setIsCartOpen = opens the cart sidebar when cart icon is clicked

  const navigate = useNavigate();
  //     ↑
  // gives us a function to navigate programmatically
  // we'll use it for the logo click — clicking logo goes home

  // ── Styles ──────────────────────────────────────────────────
  const navStyle = {
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    // dark navbar background in dark mode, white in light mode
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',       // vertically center everything
    justifyContent: 'space-between', // logo left, links right
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    // subtle shadow so navbar looks lifted above the page
    position: 'sticky',
    top: 0,
    // ↑ sticky positioning — navbar stays at top when you scroll
    zIndex: 100,
    // ↑ sits above all other content so nothing overlaps it
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    cursor: 'pointer',
    // pointer cursor on hover so user knows it's clickable
    color: theme === 'dark' ? '#ffffff' : '#111111',
    background: 'none',
    border: 'none',
    // ↑ reset button styles since we're using a button for the logo
  };

  const linkStyle = {
    // base styles for all nav links
    textDecoration: 'none',
    // remove default underline from links
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '15px',
    transition: 'background-color 0.2s',
  };

  function getNavLinkStyle({ isActive }) {
    //                        ↑
    // NavLink automatically passes isActive to this function
    // isActive = true when the link's URL matches current URL
    return {
      ...linkStyle,
      // spread base styles first
      backgroundColor: isActive
        ? (theme === 'dark' ? '#333' : '#e8e8e8')
        : 'transparent',
      // active link gets a subtle background highlight
      color: isActive
        ? (theme === 'dark' ? '#ffffff' : '#000000')
        : (theme === 'dark' ? '#aaaaaa' : '#555555'),
      // active link is full color, inactive is slightly muted
    };
  }

  const cartButtonStyle = {
    backgroundColor: '#0070f3',
    // blue button — stands out as the main action
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    // space between the icon and the count badge
    position: 'relative',
  };

  const badgeStyle = {
    backgroundColor: '#ff3b30',
    // red badge — high contrast so it's immediately noticeable
    color: '#ffffff',
    borderRadius: '50%',
    // makes it a circle
    width: '20px',
    height: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyle}>

      {/* ── LEFT SIDE: Logo ──────────────────────────────── */}
      <button style={logoStyle} onClick={() => navigate('/')}>
        {/*                               ↑
            useNavigate in action — clicking the logo
            navigates to the home page programmatically
            we use a button (not Link) because logos are
            typically buttons semantically                   */}
        🛒 ReactMart
      </button>

      {/* ── RIGHT SIDE: Links + Actions ──────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        <NavLink to="/" style={getNavLinkStyle} end>
          {/*              ↑                    ↑
              getNavLinkStyle receives isActive  'end' means ONLY
              from NavLink automatically         mark active when URL
                                                 is EXACTLY "/" not
                                                 just starts with "/"  */}
          Home
        </NavLink>

        <NavLink to="/cart" style={getNavLinkStyle}>
          Cart
        </NavLink>

        {/* ── Theme Toggle Button ────────────────────────── */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '16px',
            color: theme === 'dark' ? '#ffffff' : '#111111',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
          {/*  ↑
              show sun icon in dark mode (click to go light)
              show moon icon in light mode (click to go dark)  */}
        </button>

        {/* ── Cart Icon Button ──────────────────────────── */}
        <button
          style={cartButtonStyle}
          onClick={() => setIsCartOpen(true)}
        >
          🛒
          {cartCount > 0 && (
            //  ↑           // only show the badge if there's at least 1 item
            // if cart is empty, no badge — clean look
            <span style={badgeStyle}>{cartCount}</span>
            //                          ↑
            //                 shows the number of items
          )}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;