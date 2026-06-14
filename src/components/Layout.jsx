import { useState, useEffect } from 'react';
import { C } from '../utils/constants';
import AntigravityBackground from './AntigravityBackground';

// ═══ ANTIGRAVITY BACKGROUND FLAG ═══
// Set to true to show the floating dotted glassmorphic background
// Set to false to hide it (just the gradient background)
const ENABLE_ANTIGRAVITY = false;

export default function Layout({ children, title, subtitle, titleColor = 'var(--gray-900)', subtitleColor = 'var(--gray-600)', showBack, onBack }) {
  const [scrolled, setScrolled] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'transparent',
      backgroundAttachment: 'fixed',
      fontFamily: "'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
    }}>
      {/* Antigravity Dotted Background (toggle via ENABLE_ANTIGRAVITY flag) */}
      <AntigravityBackground enabled={ENABLE_ANTIGRAVITY} />
      {/* Premium Desktop Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          padding: scrolled ? '12px 40px' : '16px 40px',
          boxShadow: scrolled
            ? '0 4px 30px rgba(240, 105, 34, 0.1)'
            : '0 4px 30px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          {/* Back Button */}
          {showBack && (
            <button
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: scrolled ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: 12,
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: 600,
                color: scrolled ? 'var(--white)' : 'var(--white)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: scrolled ? '0 4px 15px rgba(240, 105, 34, 0.3)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(-4px)';
                e.target.style.boxShadow = '0 6px 20px rgba(240, 105, 34, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
                e.target.style.boxShadow = scrolled ? '0 4px 15px rgba(240, 105, 34, 0.3)' : 'none';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}

          {/* Logo & Brand */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: showBack ? 'center' : 'flex-start',
            gap: 16,
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              {/* Logo with glow */}
              <div style={{
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: -4,
                  background: scrolled ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 16,
                  filter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                }} />
                <img
                  src="/relivlogo.jpeg"
                  alt="Reliv AI"
                  style={{
                    width: scrolled ? 44 : 50,
                    height: scrolled ? 44 : 50,
                    borderRadius: 14,
                    border: scrolled ? '2px solid rgba(240, 105, 34, 0.2)' : '3px solid rgba(255, 255, 255, 0.4)',
                    objectFit: 'cover',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'all 0.3s ease',
                    boxShadow: scrolled ? '0 4px 20px rgba(240, 105, 34, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.15)',
                  }}
                />
              </div>

              {/* Brand Name */}
              <div>
                <h1 style={{
                  fontSize: scrolled ? 22 : 26,
                  fontWeight: 800,
                  color: scrolled ? '#F06922' : 'var(--white)',
                  letterSpacing: '-0.5px',
                  margin: 0,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  Reliv AI
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: scrolled ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)' : 'rgba(255, 255, 255, 0.25)',
                    color: 'var(--white)',
                    padding: '4px 10px',
                    borderRadius: 20,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Beta
                  </span>
                </h1>
                <p style={{
                  fontSize: 12,
                  color: scrolled ? 'var(--gray-600)' : 'rgba(255, 255, 255, 0.85)',
                  margin: '2px 0 0',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                }}>
                  Your Personal AI Health Coach
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: scrolled ? 'var(--cream-200)' : 'rgba(255, 255, 255, 0.15)',
                border: scrolled ? '1px solid #FFD296' : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 10,
                padding: '10px 16px',
                fontSize: 13,
                fontWeight: 600,
                color: scrolled ? '#F06922' : 'var(--white)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = scrolled ? 'var(--cream-300)' : 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = scrolled ? 'var(--cream-200)' : 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span>💬</span> Help
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '48px 40px 100px',
        opacity: pageLoaded ? 1 : 0,
        transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Page Title & Subtitle */}
        {(title || subtitle) && (
          <div style={{
            textAlign: 'center',
            marginBottom: 40,
            opacity: pageLoaded ? 1 : 0,
            transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.1s',
          }}>
            {title && (
              <h2 style={{
                fontSize: 36,
                fontWeight: 800,
                color: titleColor,
                marginBottom: 12,
                letterSpacing: '-1px',
                lineHeight: 1.2,
              }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{
                fontSize: 17,
                color: subtitleColor,
                lineHeight: 1.6,
                maxWidth: 500,
                margin: '0 auto',
              }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Page Content */}
        <div style={{
          opacity: pageLoaded ? 1 : 0,
          transform: pageLoaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
        }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '24px 40px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          fontSize: 13,
          color: 'var(--gray-800)',
          fontWeight: 500,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🔒</span> Bank-Grade Security
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>✅</span> 50,000+ Happy Users
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>💳</span> Secure Payments
          </span>
        </div>
        <p style={{
          fontSize: 12,
          color: 'var(--gray-600)',
          marginTop: 16,
          fontWeight: 500,
        }}>
          © 2024 Reliv AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
