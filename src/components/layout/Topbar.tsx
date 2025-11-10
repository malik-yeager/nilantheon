import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Zap, 
  Calculator, 
  Package, 
  Info 
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const navItems = [
  {
    name: 'Features',
    preview: 'Explore powerful tools to enhance productivity.',
    path: '/',
    sectionId: 'second-section',
    icon: Zap,
  },
  {
    name: 'Calculator',
    preview: 'Explore powerful tools to enhance productivity.',
    path: '/',
    sectionId: 'calculator-section',
    icon: Calculator,
  },
  {
    name: 'Products',
    preview: 'Products that built features with AI.',
    path: '/',
    sectionId: 'products-section',
    icon: Package,
  },
  {
    name: 'About',
    preview: 'Learn more about Nilantheon.',
    path: '/',
    sectionId: 'about-section',
    icon: Info,
  },
];

export default function Topbar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoClicked, setIsLogoClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mobile header visibility
      if (window.innerWidth < 768) {
        setIsVisible(currentScrollY <= 50);
      }

      // Nav links only visible at top
      if (currentScrollY > 20) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === '/' || location.pathname === '/home') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    setIsLogoClicked(true);
    setTimeout(() => setIsLogoClicked(false), 1000);
    
    if (window.scrollY > 0) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    if (item.sectionId) {
      scrollToSection(item.sectionId);
    } else {
      navigate(item.path);
    }
  };
  
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with animation - mobile visibility control */}
        <motion.div 
          className="flex items-center"
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            className="h-10 w-50 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <motion.img
              src="/assets/logo.png"
              alt="Logo"
              className="h-80 w-full object-contain"
              animate={{
                rotate: isLogoClicked ? [0, 10, -10, 0] : 0,
                scale: isLogoClicked ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation - Simplified styling */}
        <motion.nav
          className="hidden md:flex relative gap-2 items-center"
          initial={false}
          animate={
            isScrolling
              ? { 
                  opacity: 0, 
                  y: -30, 
                  pointerEvents: 'none'
                }
              : { 
                  opacity: 1, 
                  y: 0, 
                  pointerEvents: 'auto'
                }
          }
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={item.name}
                className="relative"
                whileHover="hover"
                initial="rest"
              >
                <button
                  className="group flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-[#BD7EC6] transition-colors duration-200"
                  onClick={() => handleNavClick(item)}
                >
                  <IconComponent 
                    size={16} 
                    className="text-gray-500 group-hover:text-[#BD7EC6] transition-colors duration-200" 
                  />
                  <span className="font-medium text-sm">
                    {item.name}
                  </span>
                </button>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#BD7EC6] origin-left"
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Mobile Menu Button - with visibility control */}
        <motion.div 
          className="md:hidden"
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            onClick={() => setIsMobileMenuOpen((prev) => !prev)} 
            className="text-gray-600 p-2 rounded-lg transition-all duration-200 hover:text-[#BD7EC6]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mobile-menu-container absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white tracking-wide">NILANTHEON</h2>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-[#BD7EC6] rounded-full transition-all duration-200"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col p-6 space-y-3">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <motion.button
                        onClick={() => handleNavClick(item)}
                        className="w-full group relative p-4 text-left rounded-xl transition-all duration-300 hover:bg-gray-800 text-gray-300"
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ 
                          scale: 1.02,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 p-2 rounded-lg bg-gray-700/30 text-gray-300 group-hover:text-[#BD7EC6] transition-colors duration-300">
                              <IconComponent size={18} />
                            </div>
                            <div className="relative">
                              <h3 className="font-semibold text-lg text-gray-300 group-hover:text-[#BD7EC6] transition-colors duration-300">
                                {item.name}
                              </h3>
                              <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-[#BD7EC6]"
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                              />
                              <p className="text-sm mt-1 text-gray-400/80 leading-relaxed">
                                {item.preview}
                              </p>
                            </div>
                          </div>
                          <ArrowRight size={20} className="text-gray-500 group-hover:text-[#BD7EC6] transition-colors duration-300" />
                        </div>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}