import React, { useEffect, useRef, memo } from 'react';
import { useAppTheme } from 'authscape';

/**
 * AnimatedBackground Component
 *
 * A modern AI-themed animated background with neural network canvas animation,
 * floating particles, glowing orbs, and animated grid lines.
 *
 * This component matches the design used in the IDP (Identity Provider) pages.
 *
 * @param {Object} props
 * @param {boolean} props.showCanvas - Whether to show the neural network canvas animation (default: true)
 * @param {boolean} props.showParticles - Whether to show floating particles (default: true)
 * @param {boolean} props.showOrbs - Whether to show glowing orbs (default: true)
 * @param {boolean} props.showGrid - Whether to show animated grid (default: false)
 * @param {number} props.particleCount - Number of particles to generate (default: 50)
 * @param {number} props.opacity - Overall opacity of the background (default: 1)
 */
const AnimatedBackground = memo(({
  showCanvas = true,
  showParticles = true,
  showOrbs = true,
  showGrid = false,
  particleCount = 50,
  opacity = 1,
}) => {
  const canvasRef = useRef(null);
  const { mode } = useAppTheme();
  const isDarkMode = mode === 'dark';

  // Neural network canvas animation
  useEffect(() => {
    if (!showCanvas || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode
          ? 'rgba(139, 92, 246, 0.6)'
          : 'rgba(79, 70, 229, 0.5)';
        ctx.fill();

        // Draw connections
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = (1 - distance / 150) * 0.3;
            ctx.strokeStyle = isDarkMode
              ? `rgba(139, 92, 246, ${opacity})`
              : `rgba(79, 70, 229, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(drawNetwork);
    };

    resizeCanvas();
    initNodes();
    drawNetwork();

    const handleResize = () => {
      resizeCanvas();
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [showCanvas, isDarkMode]);

  // Generate random particles
  const particles = React.useMemo(() => {
    if (!showParticles) return [];
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${15 + Math.random() * 10}s`,
    }));
  }, [showParticles, particleCount]);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    overflow: 'hidden',
    opacity,
    background: isDarkMode
      ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #252542 100%)'
      : 'linear-gradient(135deg, #f9fafb 0%, #eef2ff 50%, #e0f2fe 100%)',
    transition: 'background 0.5s ease',
  };

  const canvasStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  const particleStyle = (particle) => ({
    position: 'absolute',
    left: particle.left,
    top: particle.top,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    background: isDarkMode ? '#8b5cf6' : '#4f46e5',
    borderRadius: '50%',
    opacity: 0.6,
    animation: `float-particle ${particle.animationDuration} infinite ease-in-out`,
    animationDelay: particle.animationDelay,
  });

  const orbStyles = {
    orb1: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: isDarkMode ? 0.3 : 0.4,
      background: isDarkMode ? '#8b5cf6' : '#4f46e5',
      top: '-100px',
      right: '-100px',
      animation: 'pulse-glow 8s infinite ease-in-out',
    },
    orb2: {
      position: 'absolute',
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      filter: 'blur(70px)',
      opacity: isDarkMode ? 0.25 : 0.35,
      background: isDarkMode ? '#4f46e5' : '#8b5cf6',
      bottom: '10%',
      left: '-80px',
      animation: 'pulse-glow 8s infinite ease-in-out',
      animationDelay: '-3s',
    },
    orb3: {
      position: 'absolute',
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: isDarkMode ? 0.2 : 0.3,
      background: '#63b3ed',
      top: '40%',
      right: '15%',
      animation: 'pulse-glow 8s infinite ease-in-out',
      animationDelay: '-5s',
    },
  };

  const gridStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '200%',
    backgroundImage: isDarkMode
      ? `linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
         linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)`
      : `linear-gradient(rgba(79, 70, 229, 0.03) 1px, transparent 1px),
         linear-gradient(90deg, rgba(79, 70, 229, 0.03) 1px, transparent 1px)`,
    backgroundSize: '50px 50px',
    animation: 'grid-move 20s linear infinite',
    transformOrigin: 'center center',
  };

  return (
    <div style={containerStyle}>
      {/* Neural Network Canvas */}
      {showCanvas && (
        <canvas
          ref={canvasRef}
          style={canvasStyle}
        />
      )}

      {/* Floating Particles */}
      {showParticles && particles.map((particle) => (
        <div
          key={particle.id}
          style={particleStyle(particle)}
        />
      ))}

      {/* Glowing Orbs */}
      {showOrbs && (
        <>
          <div style={orbStyles.orb1} />
          <div style={orbStyles.orb2} />
          <div style={orbStyles.orb3} />
        </>
      )}

      {/* Animated Grid */}
      {showGrid && <div style={gridStyle} />}

      {/* CSS Keyframes - injected via style tag */}
      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-60px) translateX(-10px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(-20px);
            opacity: 0.7;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: ${isDarkMode ? 0.2 : 0.3};
            transform: scale(1);
          }
          50% {
            opacity: ${isDarkMode ? 0.35 : 0.5};
            transform: scale(1.1);
          }
        }

        @keyframes grid-move {
          0% {
            transform: perspective(500px) rotateX(60deg) translateY(0);
          }
          100% {
            transform: perspective(500px) rotateX(60deg) translateY(50px);
          }
        }
      `}</style>
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
