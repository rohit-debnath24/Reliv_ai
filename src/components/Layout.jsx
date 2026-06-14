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
      {/* Premium Responsive Header */}
      <header
        className="px-4 sm:px-8 md:px-10"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          paddingTop: scrolled ? '12px' : '20px',
          paddingBottom: scrolled ? '12px' : '20px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* LEFT: Back Button */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            {showBack && (
              <button
                onClick={onBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  color: '#FFF',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline" style={{ fontSize: 14, fontWeight: 600 }}>Back</span>
              </button>
            )}
          </div>

          {/* CENTER: Logo & Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            justifyContent: 'center',
          }}>
            <img
              src="/relivlogo.jpeg"
              alt="Reliv AI"
              style={{
                width: scrolled ? 40 : 48,
                height: scrolled ? 40 : 48,
                borderRadius: 14,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                objectFit: 'cover',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
              }}
            />
            <div className="hidden sm:block">
              <h1 style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#FFF',
                letterSpacing: '-0.5px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                Reliv AI
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: 'rgba(255,255,255,0.15)',
                  padding: '4px 8px',
                  borderRadius: 20,
                  letterSpacing: '0.5px',
                }}>BETA</span>
              </h1>
            </div>
          </div>

          {/* RIGHT: Help Action */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 12,
                padding: '10px 14px',
                color: '#FFF',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="hidden sm:inline" style={{ fontSize: 14, fontWeight: 600 }}>Help</span>
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
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '24px 40px',
        textAlign: 'center',
      }}>
        <div className="flex-col sm:flex-row" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          fontSize: 13,
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 500,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Bank-Grade Security
          </span>
          <span className="hidden sm:inline">•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            50,000+ Happy Users
          </span>
          <span className="hidden sm:inline">•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            Secure Payments
          </span>
        </div>
        <p style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)',
          marginTop: 20,
          fontWeight: 500,
        }}>
          © 2024 Reliv AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
