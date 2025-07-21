import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  {
    name: 'Features',
    preview: 'Explore powerful tools to enhance productivity.',
    path: '/features',
  },
  {
    name: 'Docs',
    preview: 'Get started with our comprehensive guides.',
    path: '/docs',
  },
  {
    name: 'Products',
    preview: 'products that built features with Ai.',
    path: '/Products',
  },
  {
    name: 'About',
    preview: 'Learn more about Nilantheon.',
    path: '/about',
  },
];

export default function Topbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const hoveredItem = navItems.find((item) => item.name === hovered);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (itemName: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHovered(itemName);
    setIsPreviewOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHovered(null);
      setIsPreviewOpen(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handlePreviewMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const handlePreviewMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHovered(null);
      setIsPreviewOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  // Add scrollToProducts handler
  const scrollToProducts = () => {
    if (location.pathname === '/' || location.pathname === '/home') {
      const section = document.getElementById('products-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { replace: false });
      setTimeout(() => {
        const section = document.getElementById('products-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400); // Wait for navigation and render
    }
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
        <div className="h-10 w-50 rounded-lg overflow-hidden flex items-center justify-center">
  <img
    src="/assets/logo.png"
    alt="Logo"
    className="h-80 w-full object-contain"
  />
</div>
        </div>

        {/* Navigation */}
        <motion.nav
          className="relative flex gap-6 items-center text-white"
          initial={false}
          animate={isScrollingDown ? { opacity: 0, y: -20, pointerEvents: 'none' } : { opacity: 1, y: 0, pointerEvents: 'auto' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {navItems.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button className="flex items-center gap-1 text-base font-medium hover:text-blue-300 transition-all duration-200 relative group">
                {item.name}
                <motion.div
                  animate={{
                    rotate: hovered === item.name ? 180 : 0
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="text-blue-400 group-hover:text-blue-300"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>
            </div>
          ))}

          {/* Modern Preview Box */}
          <AnimatePresence>
            {isPreviewOpen && hoveredItem && (
              <motion.div
                key="preview-box"
                className="absolute top-full mt-4 left-0 w-72 bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-2xl rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -10,
                  scale: 0.95,
                  transition: { duration: 0.15, ease: 'easeIn' }
                }}
                onMouseEnter={handlePreviewMouseEnter}
                onMouseLeave={handlePreviewMouseLeave}
              >
                {/* Pointer/tooltip arrow */}
                <div className="absolute -top-2 left-8 w-4 h-4 bg-white/10 backdrop-blur-md border-l border-t border-white/20 transform rotate-45" />
                
                {/* Animated Content */}
                <motion.div 
                  className="p-6"
                  key={hoveredItem.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-blue-300 text-lg">{hoveredItem.name}</h3>
                  </div>
                  
                  <p className="text-sm text-white/80 mb-4 leading-relaxed">{hoveredItem.preview}</p>
                  
                  <button className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    onClick={hoveredItem.name === 'Products' ? scrollToProducts : undefined}
                  >
                    Explore {hoveredItem.name}
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </button>
                </motion.div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

      
          
      </div>
    </header>
  );
}