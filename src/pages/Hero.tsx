import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';

// Optimized ParticleField with reduced particles
const ParticleField = () => {
  const particles = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-twinkle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

// Optimized ThreeScene with visibility detection and reduced complexity
const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    objects: THREE.Object3D[];
    isVisible: boolean;
  } | null>(null);
  const frameId = useRef<number | null>(null);

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (sceneRef.current) {
          sceneRef.current.isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle resize function
  const handleResize = useCallback(() => {
    if (!mountRef.current || !sceneRef.current) return;
    const newWidth = mountRef.current.clientWidth;
    const newHeight = mountRef.current.clientHeight;
    sceneRef.current.camera.aspect = newWidth / newHeight;
    sceneRef.current.camera.updateProjectionMatrix();
    sceneRef.current.renderer.setSize(newWidth, newHeight);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disable antialiasing for better performance
      powerPreference: "high-performance"
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const objects = [];
    
    // Simplified geometries with fewer polygons
    const torusGeometry = new THREE.TorusGeometry(1.2, 0.4, 8, 50); // Reduced segments
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1, 
      transparent: true, 
      opacity: 0.7, 
      wireframe: false 
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 1, -2);
    scene.add(torus);
    objects.push(torus);

    const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icoMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8b5cf6, 
      transparent: true, 
      opacity: 0.8 
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(3, -1, -1);
    scene.add(icosahedron);
    objects.push(icosahedron);

    const octaGeometry = new THREE.OctahedronGeometry(1.2);
    const octaMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xa855f7, 
      transparent: true, 
      opacity: 0.6 
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(0, 2, -3);
    scene.add(octahedron);
    objects.push(octahedron);

    camera.position.set(0, 0, 5);
    sceneRef.current = { scene, camera, renderer, objects, isVisible: false };

    const animate = (currentTime: number) => {
      if (!sceneRef.current?.isVisible) {
        frameId.current = requestAnimationFrame(animate);
        return;
      }

      frameId.current = requestAnimationFrame(animate);
      
      const time = currentTime * 0.001;
      
      // Slower animations for better performance
      torus.rotation.x = time * 0.3;
      torus.rotation.y = time * 0.2;
      
      icosahedron.rotation.x = time * 0.2;
      icosahedron.rotation.z = time * 0.3;
      
      octahedron.rotation.y = time * 0.3;
      octahedron.rotation.x = time * 0.1;

      torus.position.y = 1 + Math.sin(time * 0.5) * 0.3;
      icosahedron.position.y = -1 + Math.cos(time * 0.4) * 0.4;
      octahedron.position.y = 2 + Math.sin(time * 0.8) * 0.2;

      renderer.render(scene, camera);
    };

    animate(0);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose geometries and materials
      torusGeometry.dispose();
      torusMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      octaGeometry.dispose();
      octaMaterial.dispose();
    };
  }, [handleResize]);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none" style={{ zIndex: 0, height: '100vh', width: '100%', overflow: 'hidden' }} />;
};

// Optimized FloatingScreens with reduced animations
const FloatingScreens = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Screen 1 - Top Right */}
      <div className="absolute top-20 right-10 w-64 h-40 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl animate-float-slow">
        <div className="p-4 h-full flex flex-col">
          <div className="flex space-x-2 mb-3">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="space-y-2 flex-1">
            <div className="h-2 bg-white/30 rounded w-3/4"></div>
            <div className="h-2 bg-white/20 rounded w-1/2"></div>
            <div className="h-2 bg-white/25 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Screen 2 - Middle Left */}
      <div className="absolute top-1/2 left-10 w-48 h-32 bg-white/8 backdrop-blur-lg rounded-xl border border-white/15 shadow-2xl animate-float-medium transform -translate-y-1/2">
        <div className="p-3 h-full">
          <div className="w-full h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded mb-3"></div>
          <div className="space-y-1.5">
            <div className="h-1.5 bg-white/25 rounded w-full"></div>
            <div className="h-1.5 bg-white/20 rounded w-4/5"></div>
            <div className="h-1.5 bg-white/30 rounded w-3/5"></div>
          </div>
        </div>
      </div>

      {/* Screen 3 - Bottom Right */}
      <div className="absolute bottom-32 right-20 w-56 h-36 bg-white/12 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl animate-float-fast">
        <div className="p-4 h-full">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg"></div>
            <div className="space-y-1">
              <div className="h-1 bg-white/30 rounded w-16"></div>
              <div className="h-1 bg-white/20 rounded w-12"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-8 bg-white/20 rounded"></div>
            <div className="h-8 bg-white/15 rounded"></div>
            <div className="h-8 bg-white/25 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optimized TypewriterText with better performance
const TypewriterText = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
          setShowCursor(false);
        }
      }, 80); // Slower typing for better performance

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Optimized Hero component with React.memo and reduced animations
const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Helper to scroll to a section by id
  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Listen for custom scroll event after navigation
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && e.detail.scrollTo) {
        scrollToSection(e.detail.scrollTo);
      }
    };
    window.addEventListener('nilantheon-scroll', handler);
    return () => window.removeEventListener('nilantheon-scroll', handler);
  }, [scrollToSection]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      () => {
        // Visibility tracking for potential future use
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden hero-bg">
      <div className="absolute inset-0 z-0" style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
        <ThreeScene />
        <FloatingScreens />
        <ParticleField />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 z-10" />
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none z-20" />
      <div className="relative z-30 container mx-auto px-6 mt-20 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900 mb-4">
              <span className="block animate-fade-in-up">Powering the</span>
              <span className="block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Next Generation
                </span>
              </span>
              <span className="block animate-fade-in-up text-4xl md:text-5xl lg:text-6xl text-gray-800" style={{ animationDelay: "0.4s" }}>
                of Intelligent,
              </span>
              <span className="block animate-fade-in-up bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" style={{ animationDelay: "0.6s" }}>
                Sustainable Enterprises
              </span>
            </h1>
          </div>
          <div
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-600 leading-relaxed font-light mb-8 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <TypewriterText
              text="Nilantheon® transforms ESG obligations into profitable outcomes using AI, real-time carbon insights, and browser-based digital twins to optimize efficiency, compliance, and climate impact."
              delay={2000}
              className=""
            />
          </div>
          <div
            className="flex flex-wrap justify-center gap-12 mb-12 animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-center group cursor-pointer transition-transform hover:scale-110">
              <div className="text-4xl leading-relaxed pb-1 overflow-visible align-baseline font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:animate-pulse">
                AI-Powered
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Analytics</div>
            </div>
            <div className="text-center group cursor-pointer transition-transform hover:scale-110">
              <div className="text-4xl leading-relaxed pb-1 overflow-visible align-baseline font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:animate-pulse">
                Real-Time
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Carbon Insights</div>
            </div>
            <div className="text-center group cursor-pointer transition-transform hover:scale-110">
              <div className="text-4xl leading-relaxed pb-1 overflow-visible align-baseline font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:animate-pulse">
                Digital
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Twins</div>
            </div>
          </div>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <button
              className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 overflow-hidden animate-glow"
              onClick={() => scrollToSection('whychooseus-section')}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Solutions
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            <button
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 transform hover:scale-105 overflow-hidden"
              onClick={() => scrollToSection('products-section')}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Products
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-1deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.3), 0 0 50px rgba(139, 92, 246, 0.1); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 7s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;