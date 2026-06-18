import { useState, useEffect, useMemo } from 'react';

export default function SparkleBackground() {
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem("theme");
      setIsDark(saved ? saved === "dark" : true);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  // Generate bubbles for the background
  const bubbles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 4 + 2}px`,
    height: `${Math.random() * 4 + 2}px`,
    duration: `${Math.random() * 12 + 10}s`,
    delay: `${Math.random() * 10}s`
  })), []);

  return (
    <>
      <div className={isDark ? 'dark-mode' : 'light-mode'} style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1,
        background: isDark ? '#11140F' : 'linear-gradient(135deg, #F9F6F0 0%, #FFE8D6 100%)',
        overflow: 'hidden',
        transition: 'background 0.4s ease'
      }}>
        <div className="bubble-wrapper">
          {bubbles.map(b => (
            <div 
              key={b.id} 
              className="sparkle-bubble"
              style={{
                left: b.left,
                width: b.width,
                height: b.height,
                animationDuration: b.duration,
                animationDelay: b.delay
              }}
            />
          ))}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        .bubble-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .sparkle-bubble {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: #ff8c00;
          box-shadow: 0 0 8px #ff8c00, 0 0 16px #ff4500;
          opacity: 0;
          pointer-events: none;
          animation: float-sparkle linear infinite;
          will-change: transform, opacity;
        }

        .dark-mode .sparkle-bubble {
          background: #ffa500;
          box-shadow: 0 0 12px #ff8c00, 0 0 24px #ff4500, 0 0 36px rgba(255, 69, 0, 0.8);
        }

        @keyframes float-sparkle {
          0% {
            transform: translate3d(0, 0, 0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
            transform: translate3d(0, -20vh, 0) scale(1.1);
          }
          50% {
            opacity: 0.7;
            transform: translate3d(0, -50vh, 0) scale(0.9);
          }
          80% {
            opacity: 1;
            transform: translate3d(0, -80vh, 0) scale(1.2);
          }
          100% {
            transform: translate3d(0, -110vh, 0) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
