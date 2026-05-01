import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Opening Section - Grid Construction
      gsap.from('.grid-line', {
        scaleX: 0,
        duration: 1.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.from('.grid-line-v', {
        scaleY: 0,
        duration: 1.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.7
      });

      gsap.from('.hero-text', {
        opacity: 0,
        y: 100,
        rotationX: 90,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1.8
      });

      // Pulsing animation on hero text
      gsap.to('.hero-text', {
        scale: 1.02,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Foundation Section
      gsap.from('.foundation-title', {
        scrollTrigger: {
          trigger: '.foundation-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -200,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.to('.foundation-grid-line', {
        scrollTrigger: {
          trigger: '.foundation-section',
          start: 'top 60%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        scaleX: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.inOut'
      });

      // Precision Section - Typography Grid
      const precisionChars = document.querySelectorAll('.precision-char');
      gsap.from(precisionChars, {
        scrollTrigger: {
          trigger: '.precision-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: {
          amount: 0.8,
          from: 'random'
        },
        duration: 0.8,
        ease: 'back.out(1.7)'
      });

      // Break Section - Chaos
      gsap.to('.break-grid-item', {
        scrollTrigger: {
          trigger: '.break-section',
          start: 'top 60%',
          end: 'center center',
          scrub: 1
        },
        x: () => (Math.random() - 0.5) * 300,
        y: () => (Math.random() - 0.5) * 300,
        rotation: () => (Math.random() - 0.5) * 180,
        scale: () => 0.5 + Math.random() * 1.5
      });

      gsap.to('.break-title', {
        scrollTrigger: {
          trigger: '.break-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -200,
        rotation: 5
      });

      // Reform Section - Grid Reassembly
      gsap.to('.reform-grid-item', {
        scrollTrigger: {
          trigger: '.reform-section',
          start: 'top 70%',
          end: 'center center',
          scrub: 1
        },
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: 'power2.inOut'
      });

      gsap.from('.reform-text', {
        scrollTrigger: {
          trigger: '.reform-section',
          start: 'top 60%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Balance Section - Parallax layers
      gsap.to('.balance-layer-1', {
        scrollTrigger: {
          trigger: '.balance-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -150
      });

      gsap.to('.balance-layer-2', {
        scrollTrigger: {
          trigger: '.balance-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -80
      });

      gsap.from('.balance-title', {
        scrollTrigger: {
          trigger: '.balance-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.5,
        ease: 'power3.inOut'
      });

      // Closing Section
      gsap.from('.closing-text-line', {
        scrollTrigger: {
          trigger: '.closing-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to('.closing-grid', {
        scrollTrigger: {
          trigger: '.closing-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        rotation: 45,
        scale: 1.5,
        opacity: 0.3
      });

      // Additional parallax for hero text
      gsap.to('.hero-text', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 300,
        scale: 0.8,
        opacity: 0.5
      });

      // Grid lines fade on scroll
      gsap.to('.grid-line, .grid-line-v', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        opacity: 0
      });

      // Precision subtitle animation
      gsap.from('.precision-subtitle', {
        scrollTrigger: {
          trigger: '.precision-section',
          start: 'top 60%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power2.out'
      });

      // Manifest Section
      gsap.from('.manifest-grid-box', {
        scrollTrigger: {
          trigger: '.manifest-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        rotation: 180,
        stagger: {
          amount: 0.6,
          from: 'center'
        },
        duration: 0.8,
        ease: 'back.out(1.7)'
      });

      gsap.from('.manifest-cell', {
        scrollTrigger: {
          trigger: '.manifest-section',
          start: 'top 60%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        stagger: {
          amount: 1.2,
          from: 'random'
        },
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.5
      });

      gsap.from('.manifest-word', {
        scrollTrigger: {
          trigger: '.manifest-section',
          start: 'top 50%',
          end: 'bottom 50%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: (index) => (index - 1) * 100,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });

      // Foundation grid lines pulse
      gsap.to('.foundation-grid-line', {
        scrollTrigger: {
          trigger: '.foundation-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        scaleX: 1.1,
        transformOrigin: 'center center',
        stagger: 0.05
      });

      // Break overlay text pulsate
      gsap.fromTo('.break-overlay-text', 
        { scale: 1 },
        {
          scrollTrigger: {
            trigger: '.break-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          },
          scale: 1.2,
          ease: 'sine.inOut'
        }
      );

      // Scroll progress indicator
      gsap.to('.scroll-progress', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5
        },
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none'
      });

      // Dimension Section - 3D Layers
      gsap.to('.layer-back', {
        scrollTrigger: {
          trigger: '.dimension-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        z: -800,
        rotationY: 45,
        scale: 0.8,
        opacity: 0.3
      });

      gsap.to('.layer-mid', {
        scrollTrigger: {
          trigger: '.dimension-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        z: -400,
        rotationY: 25,
        scale: 0.9,
        opacity: 0.6
      });

      gsap.to('.layer-front', {
        scrollTrigger: {
          trigger: '.dimension-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        z: 200,
        rotationY: -15,
        scale: 1.1
      });

      // Floating cubes
      gsap.to('.floating-cube', {
        scrollTrigger: {
          trigger: '.dimension-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        rotationX: 360,
        rotationY: 360,
        y: -100,
        stagger: 0.1
      });

      // Overflow Section
      gsap.to('.overflow-title', {
        scrollTrigger: {
          trigger: '.overflow-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        x: 200,
        rotationZ: 15,
        scale: 1.3
      });

      gsap.to('.overflow-bar', {
        scrollTrigger: {
          trigger: '.overflow-section',
          start: 'top 60%',
          end: 'center center',
          scrub: 1
        },
        x: (i) => (i % 2 === 0 ? 800 : -800),
        rotation: (i) => (i % 2 === 0 ? 45 : -45),
        stagger: 0.05
      });

      // Layers Section - Stacking
      gsap.from('.layer-stack', {
        scrollTrigger: {
          trigger: '.layers-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        z: -1000,
        rotationX: -90,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.to('.layer-stack', {
        scrollTrigger: {
          trigger: '.layers-section',
          start: 'center center',
          end: 'bottom top',
          scrub: 1
        },
        y: (i) => -i * 150,
        rotationX: (i) => i * 10,
        stagger: 0.1
      });

      // Rotation Section
      gsap.to('.rotate-char', {
        scrollTrigger: {
          trigger: '.rotation-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        rotationY: 720,
        z: (i) => Math.sin(i) * 200,
        stagger: 0.1
      });

      gsap.to('.grid-3d-item', {
        scrollTrigger: {
          trigger: '.rotation-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        rotationX: 360,
        rotationY: 180,
        z: (i) => (i - 12) * 30,
        stagger: {
          amount: 1,
          from: 'center'
        }
      });

      // Perspective Section
      gsap.to('.perspective-tile', {
        scrollTrigger: {
          trigger: '.perspective-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        z: (i) => -i * 50,
        opacity: (i) => 1 - (i * 0.01),
        scale: (i) => 1 - (i * 0.01)
      });

      gsap.to('.perspective-title', {
        scrollTrigger: {
          trigger: '.perspective-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        z: -2000,
        scale: 3,
        opacity: 0
      });

      // Explode Section
      gsap.to('.explode-piece', {
        scrollTrigger: {
          trigger: '.explode-section',
          start: 'top center',
          end: 'center center',
          scrub: 1
        },
        x: (i) => (Math.cos((i / 36) * Math.PI * 2) * 600),
        y: (i) => (Math.sin((i / 36) * Math.PI * 2) * 600),
        rotation: (i) => i * 10,
        scale: 0.5,
        opacity: 0.3
      });

      gsap.from('.explode-title', {
        scrollTrigger: {
          trigger: '.explode-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        rotation: 180,
        duration: 1,
        ease: 'back.out(2)'
      });

      // Tunnel Section
      gsap.to('.tunnel-ring', {
        scrollTrigger: {
          trigger: '.tunnel-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        z: (i) => i * 300 - 2000,
        rotationZ: (i) => i * 45,
        scale: (i) => 1 + (i * 0.3),
        opacity: (i) => 1 - (i * 0.05)
      });

      gsap.to('.tunnel-text', {
        scrollTrigger: {
          trigger: '.tunnel-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        z: -3000,
        scale: 5,
        opacity: 0
      });

      // Shatter Section
      gsap.from('.shatter-text', {
        scrollTrigger: {
          trigger: '.shatter-section',
          start: 'top 60%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse'
        },
        scale: 1.5,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to('.fragment', {
        scrollTrigger: {
          trigger: '.shatter-section',
          start: 'center center',
          end: 'bottom top',
          scrub: 1
        },
        x: () => (Math.cos(Math.random() * 360) * 800 * Math.random()),
        y: () => (Math.sin(Math.random() * 360) * 800 * Math.random()),
        rotation: () => Math.random() * 360,
        opacity: 0,
        scale: () => 0.3 + Math.random() * 0.7,
        stagger: 0.02
      });

      // Morph Section
      gsap.to('.morph-shape', {
        scrollTrigger: {
          trigger: '.morph-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        rotation: 360,
        scale: (i) => 0.5 + (i * 0.2),
        borderRadius: (i) => (i % 2 === 0 ? '50%' : '0%'),
        stagger: 0.1
      });

      gsap.to('.morph-inner', {
        scrollTrigger: {
          trigger: '.morph-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        rotation: -180,
        scale: 1.5
      });

      // Pulse Section
      gsap.from('.pulse-ring', {
        scrollTrigger: {
          trigger: '.pulse-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Split Section
      gsap.to('.split-left', {
        scrollTrigger: {
          trigger: '.split-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        x: -300,
        rotationY: -30
      });

      gsap.to('.split-right', {
        scrollTrigger: {
          trigger: '.split-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        x: 300,
        rotationY: 30
      });

      gsap.from('.split-line', {
        scrollTrigger: {
          trigger: '.split-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        scaleY: 0,
        duration: 1.2,
        ease: 'power3.inOut'
      });

      // Wave Section
      gsap.to('.wave-cell', {
        scrollTrigger: {
          trigger: '.wave-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: (i) => {
          const row = Math.floor(i / 20);
          const col = i % 20;
          return Math.sin((row + col) * 0.3) * 100;
        },
        rotationX: (i) => {
          const row = Math.floor(i / 20);
          const col = i % 20;
          return Math.sin((row + col) * 0.2) * 45;
        },
        z: (i) => {
          const row = Math.floor(i / 20);
          const col = i % 20;
          return Math.cos((row + col) * 0.3) * 150;
        },
        stagger: {
          amount: 0.5,
          from: 'start'
        }
      });

      gsap.to('.wave-title', {
        scrollTrigger: {
          trigger: '.wave-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        backgroundPosition: '200% center',
        ease: 'none'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="app-container">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }}
      />

      {/* Scroll Progress */}
      <div className="scroll-progress" />

      {/* Corner Markers */}
      <div className="corner-marker corner-tl" />
      <div className="corner-marker corner-tr" />
      <div className="corner-marker corner-bl" />
      <div className="corner-marker corner-br" />
      
      {/* Opening Section - Grid Construction */}
      <section className="hero-section">
        <div className="grid-overlay">
          {[...Array(8)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line" style={{ top: `${(i + 1) * 11.11}%` }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line-v" style={{ left: `${(i + 1) * 14.28}%` }} />
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-text">
            GRID
          </h1>
        </div>
      </section>

      {/* Foundation Section */}
      <section className="foundation-section">
        <div className="foundation-content">
          <h2 className="foundation-title">
            STRUCTURE<br />
            IS THE<br />
            FOUNDATION
          </h2>
          <div className="foundation-grid">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="foundation-grid-line" />
            ))}
          </div>
        </div>
      </section>

      {/* Precision Section */}
      <section className="precision-section">
        <div className="precision-content">
          <div className="precision-text">
            {'PRECISION'.split('').map((char, i) => (
              <span key={i} className="precision-char">{char}</span>
            ))}
          </div>
          <div className="precision-subtitle">
            Every element finds its place
          </div>
        </div>
      </section>

      {/* Manifest Section */}
      <section className="manifest-section">
        <div className="manifest-grid-container">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="manifest-grid-box">
              <div className="manifest-inner-grid">
                {[...Array(16)].map((_, j) => (
                  <div key={j} className="manifest-cell" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="manifest-text">
          <span className="manifest-word">ALIGN</span>
          <span className="manifest-word">DIVIDE</span>
          <span className="manifest-word">MULTIPLY</span>
        </div>
      </section>

      {/* Dimension Section - 3D Typography */}
      <section className="dimension-section">
        <div className="dimension-layers">
          <div className="dimension-layer layer-back">DEPTH</div>
          <div className="dimension-layer layer-mid">DEPTH</div>
          <div className="dimension-layer layer-front">DEPTH</div>
        </div>
        <div className="dimension-cubes">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="floating-cube" style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}>
              <div className="cube-face cube-front" />
              <div className="cube-face cube-back" />
              <div className="cube-face cube-left" />
              <div className="cube-face cube-right" />
              <div className="cube-face cube-top" />
              <div className="cube-face cube-bottom" />
            </div>
          ))}
        </div>
      </section>

      {/* Overflow Section */}
      <section className="overflow-section">
        <div className="overflow-container">
          <h2 className="overflow-title">ESCAPE</h2>
          <div className="overflow-bars">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="overflow-bar" style={{ '--index': i } as React.CSSProperties} />
            ))}
          </div>
        </div>
      </section>

      {/* Break Section */}
      <section className="break-section">
        <h2 className="break-title">CHAOS</h2>
        <div className="break-grid">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="break-grid-item" />
          ))}
        </div>
        <div className="break-overlay-text">
          RULES<br />ARE<br />MEANT<br />TO<br />BREAK
        </div>
      </section>

      {/* Reform Section */}
      <section className="reform-section">
        <div className="reform-grid">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className="reform-grid-item"
              style={{
                transform: `translate(${(Math.random() - 0.5) * 500}px, ${(Math.random() - 0.5) * 500}px) rotate(${(Math.random() - 0.5) * 360}deg) scale(${Math.random() * 2})`
              }}
            />
          ))}
        </div>
        <div className="reform-text">
          ORDER<br />RESTORED
        </div>
      </section>

      {/* Balance Section */}
      <section className="balance-section">
        <div className="balance-layer-1">
          <div className="balance-grid-bg" />
        </div>
        <div className="balance-layer-2">
          <h2 className="balance-title">
            BALANCE
          </h2>
          <p className="balance-subtitle">
            Between structure and freedom<br />
            Between constraint and expression<br />
            Between system and spontaneity
          </p>
        </div>
      </section>

      {/* Layers Section - Overlapping Depth */}
      <section className="layers-section">
        <div className="layer-stack layer-1">
          <div className="layer-content">01</div>
        </div>
        <div className="layer-stack layer-2">
          <div className="layer-content">02</div>
        </div>
        <div className="layer-stack layer-3">
          <div className="layer-content">03</div>
        </div>
        <div className="layer-stack layer-4">
          <div className="layer-content">04</div>
        </div>
        <div className="layers-title">STACKED</div>
      </section>

      {/* Rotation Section - 3D Text */}
      <section className="rotation-section">
        <div className="rotation-container">
          <div className="rotating-text">
            <span className="rotate-char" style={{ '--char-index': 0 } as React.CSSProperties}>R</span>
            <span className="rotate-char" style={{ '--char-index': 1 } as React.CSSProperties}>O</span>
            <span className="rotate-char" style={{ '--char-index': 2 } as React.CSSProperties}>T</span>
            <span className="rotate-char" style={{ '--char-index': 3 } as React.CSSProperties}>A</span>
            <span className="rotate-char" style={{ '--char-index': 4 } as React.CSSProperties}>T</span>
            <span className="rotate-char" style={{ '--char-index': 5 } as React.CSSProperties}>E</span>
          </div>
        </div>
        <div className="rotation-grid-3d">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="grid-3d-item" style={{ '--item-index': i } as React.CSSProperties} />
          ))}
        </div>
      </section>

      {/* Perspective Section - Vanishing Point */}
      <section className="perspective-section">
        <div className="perspective-container">
          <div className="perspective-title">VANISH</div>
          <div className="perspective-grid">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="perspective-tile" />
            ))}
          </div>
        </div>
      </section>

      {/* Explode Section */}
      <section className="explode-section">
        <h2 className="explode-title">DISPERSE</h2>
        <div className="explode-grid">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="explode-piece" style={{ '--piece-index': i } as React.CSSProperties} />
          ))}
        </div>
      </section>

      {/* Tunnel Section */}
      <section className="tunnel-section">
        <div className="tunnel-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="tunnel-ring" style={{ '--ring-index': i } as React.CSSProperties}>
              <div className="ring-top" />
              <div className="ring-bottom" />
              <div className="ring-left" />
              <div className="ring-right" />
            </div>
          ))}
        </div>
        <div className="tunnel-text">INFINITE</div>
      </section>

      {/* Shatter Section */}
      <section className="shatter-section">
        <div className="shatter-text-container">
          <h2 className="shatter-text">SHATTER</h2>
          <div className="shatter-fragments">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className="fragment" 
                style={{ 
                  '--fragment-index': i,
                  '--random-x': Math.random(),
                  '--random-y': Math.random()
                } as React.CSSProperties} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Morph Section */}
      <section className="morph-section">
        <div className="morph-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="morph-shape" style={{ '--morph-index': i } as React.CSSProperties}>
              <div className="morph-inner" />
            </div>
          ))}
        </div>
        <div className="morph-title">TRANSFORM</div>
      </section>

      {/* Pulse Section */}
      <section className="pulse-section">
        <div className="pulse-container">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="pulse-ring" style={{ '--pulse-delay': `${i * 0.15}s` } as React.CSSProperties} />
          ))}
        </div>
        <div className="pulse-text">PULSE</div>
      </section>

      {/* Split Section */}
      <section className="split-section">
        <div className="split-left">
          <h2 className="split-title-left">DIVIDE</h2>
        </div>
        <div className="split-right">
          <h2 className="split-title-right">CONQUER</h2>
        </div>
        <div className="split-line" />
      </section>

      {/* Wave Section */}
      <section className="wave-section">
        <div className="wave-grid">
          {[...Array(200)].map((_, i) => (
            <div 
              key={i} 
              className="wave-cell" 
              style={{ 
                '--cell-index': i,
                '--row': Math.floor(i / 20),
                '--col': i % 20
              } as React.CSSProperties} 
            />
          ))}
        </div>
        <div className="wave-title">FLOW</div>
      </section>

      {/* Closing Section */}
      <section className="closing-section">
        <div className="closing-grid" />
        <div className="closing-content">
          <div className="closing-text-line">The grid is not a cage.</div>
          <div className="closing-text-line">It is a canvas.</div>
          <div className="closing-text-line">It is a language.</div>
          <div className="closing-text-line">It is alive.</div>
        </div>
      </section>
    </div>
  );
}

export default App;
