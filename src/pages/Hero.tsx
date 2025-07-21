import{ useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ scene: any; camera: any; renderer: any; objects: any[] } | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create floating geometric objects
    const objects = [];
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);
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

    // Icosahedron
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

    // Octahedron
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
    if (sceneRef.current) {
      sceneRef.current = { scene, camera, renderer, objects };
    }

    // Animation loop
    const animate = () => {
      if (frameId.current !== null) {
        frameId.current = requestAnimationFrame(animate);
      }
      
      const time = Date.now() * 0.001;
      
      // Animate objects
      torus.rotation.x = time * 0.5;
      torus.rotation.y = time * 0.3;
      
      icosahedron.rotation.x = time * 0.3;
      icosahedron.rotation.z = time * 0.4;
      
      octahedron.rotation.y = time * 0.4;
      octahedron.rotation.x = time * 0.2;

      // Floating motion
      torus.position.y = 1 + Math.sin(time * 0.8) * 0.3;
      icosahedron.position.y = -1 + Math.cos(time * 0.6) * 0.4;
      octahedron.position.y = 2 + Math.sin(time * 1.2) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !sceneRef.current) return;
      
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = newWidth / newHeight;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 opacity-40" />;
};

const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden hero-bg">
      
      {/* Animated background elements */}
      <ThreeScene />
      <FloatingScreens />
      <ParticleField />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 mt-20 lg:px-8">
        <div className="max-w-5xl sticky top-24">
          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none text-gray-900 mb-6 animate-fade-in">
            Crafting
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
              Digital
            </span>
            <br />
            <span className="text-5xl md:text-6xl lg:text-7xl text-gray-800">Excellence</span>
          </h1>
          
          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl max-w-3xl text-gray-600 leading-relaxed font-light animate-fade-in mb-8"
            style={{ animationDelay: "0.2s" }}
          >
            We transform visionary concepts into breathtaking digital realities. 
            Through cutting-edge design and innovative technology, we create 
            experiences that captivate, inspire, and deliver exceptional results.
          </p>
          
          {/* Stats */}
          <div
            className="flex flex-wrap gap-8 mb-10 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">150+</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5+</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Years</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <span className="relative z-10">View Our Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
              Start a Project
            </button>
          </div>
          
          {/* Design accent */}
          <div
            className={`flex items-center gap-6 animate-fade-in${inView ? ' animate' : ''}`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
            <span className="text-white/70 tracking-[0.2em] uppercase font-medium text-sm">
              Design • Innovation • Excellence
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full p-1">
          <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in.animate {
          animation-play-state: running;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;