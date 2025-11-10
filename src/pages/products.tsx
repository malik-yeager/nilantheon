import { useState, useRef, useEffect, useId } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Leaf, BarChart3, CheckCircle, Factory, Play, Pause } from 'lucide-react';

interface AnimatedLineProps {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  delay?: number;
  isMobile?: boolean;
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({ containerRef, fromRef, toRef, isActive, delay = 0, isMobile = false }) => {
  const id = useId();
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      if (isMobile) {
        const startX = rectA.left - containerRect.left + rectA.width / 2;
        const startY = rectA.top - containerRect.top + rectA.height;
        const d = `M ${startX},${startY} L ${startX},${startY + 40}`;
        setPathD(d);
      } else {
        const startX = svgWidth - 20;
        const startY = 10;
        const controlX = svgWidth - 20;
        const controlY = rectA.top - containerRect.top + rectA.height / 2;
        const badgeX = rectA.left - containerRect.left + rectA.width / 2;
        const badgeY = rectA.top - containerRect.top + rectA.height / 2;
        const d = `
          M ${startX},${startY}
          Q ${controlX},${startY} ${controlX},${controlY}
          L ${badgeX},${badgeY}
        `;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    updatePath();

    return () => resizeObserver.disconnect();
  }, [containerRef, fromRef, toRef, isMobile]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      className="pointer-events-none absolute left-0 top-0 z-0"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path d={pathD} stroke="#e5e7eb" strokeWidth={isMobile ? 2 : 3} strokeOpacity={0.3} strokeLinecap="round" />
      {isActive && (
        <motion.path
          d={pathD}
          stroke={`url(#gradient-${id})`}
          strokeLinecap="round"
          strokeWidth={isMobile ? 3 : 4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            delay: delay,
            ease: 'easeInOut',
          }}
        />
      )}
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const PremiumProductsSection = () => {
  const location = useLocation();
  const [activeProduct, setActiveProduct] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);
  const [isLineActive, setIsLineActive] = useState(false);

  const products = [
    {
      id: 1,
      icon: Monitor,
      title: 'Digital Twin Platform',
      subtitle: 'Real-time Facility Intelligence',
      description: 'Browser-based digital twins providing live, interactive facility mirrors with real-time system integration.',
      features: ['Real-time BMS, SCADA, PLCs integration', 'IoT sensor augmentation', '3D & 2D dashboards', 'Predictive simulations'],
      metrics: [
        { value: '99.9%', label: 'Uptime' },
        { value: '847', label: 'Sensors' },
        { value: '< 1s', label: 'Latency' },
      ],
      color: 'from-blue-600 to-blue-800',
      bgGradient: 'from-blue-50 to-indigo-100',
      accentColor: 'blue',
    },
    {
      id: 2,
      icon: Cpu,
      title: 'AI-Powered Predictive Maintenance',
      subtitle: 'Intelligent Maintenance Solutions',
      description: 'Machine learning solutions that transform maintenance from reactive to proactive using real-time data analytics.',
      features: ['Early wear-and-tear detection', 'Predictive scheduling', 'Automated task distribution', 'Cross-facility analytics'],
      metrics: [
        { value: '94%', label: 'Accuracy' },
        { value: '76%', label: 'Cost Reduction' },
        { value: '2.3x', label: 'ROI' },
      ],
      color: 'from-purple-600 to-purple-800',
      bgGradient: 'from-purple-50 to-violet-100',
      accentColor: 'purple',
    },
    {
      id: 3,
      icon: Leaf,
      title: 'Carbon Footprint Tracking',
      subtitle: 'Environmental Intelligence',
      description: 'Real-time carbon intelligence system for comprehensive environmental impact management and optimization.',
      features: ['Per-device emissions tracking', 'Power consumption analysis', 'Anomaly identification', 'Emission heatmaps'],
      metrics: [
        { value: '42%', label: 'CO₂ Reduction' },
        { value: '156T', label: 'Saved' },
        { value: '$89K', label: 'Savings' },
      ],
      color: 'from-emerald-600 to-green-800',
      bgGradient: 'from-emerald-50 to-green-100',
      accentColor: 'emerald',
    },
    {
      id: 4,
      icon: BarChart3,
      title: 'Green Stat ESG Platform',
      subtitle: 'Sustainability & Compliance',
      description: 'Comprehensive ESG platform for automated reporting, compliance, and sustainability metrics with audit-ready documentation.',
      features: ['Automated ESG reporting', 'Immutable audit logs', 'Analytics dashboards', 'Revenue leak identification'],
      metrics: [
        { value: 'AAA', label: 'ESG Rating' },
        { value: '100%', label: 'Compliance' },
        { value: '0', label: 'Issues' },
      ],
      color: 'from-teal-600 to-cyan-800',
      bgGradient: 'from-teal-50 to-cyan-100',
      accentColor: 'teal',
    },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setActiveProduct((prev) => (prev + 1) % products.length);
      }, 5000);
    } else {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isPlaying, products.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sectionRect = containerRef.current.getBoundingClientRect();
      const isVisible = sectionRect.top < window.innerHeight;
      setIsLineActive(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const currentProduct = products[activeProduct];

  interface Metric {
    value: string;
    label: string;
  }

  const MetricCard: React.FC<{ metric: Metric; index: number }> = ({ metric, index }) => (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${currentProduct.color} bg-clip-text text-transparent font-semibold`}>
        {metric.value}
      </div>
      <div className="text-gray-600 text-sm font-medium mt-1 font-semibold">{metric.label}</div>
    </div>
  );

  const FeatureItem: React.FC<{ feature: string; index: number }> = ({ feature, index }) => (
    <div className="flex items-center gap-3 group" style={{ animationDelay: `${index * 100}ms` }}>
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentProduct.color} group-hover:scale-125 transition-transform`} />
      <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm lg:text-base font-semibold">{feature}</span>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      id="products-section" 
              className="relative flex items-center overflow-visible min-h-screen"
    >
      <AnimatedLine 
        containerRef={containerRef} 
        fromRef={badgeRef} 
        toRef={productCardRef} 
        isActive={isLineActive} 
        delay={1.0} 
        isMobile={isMobile} 
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 w-full">
        <div className="text-center mb-12 lg:mb-20 px-4">
          <div ref={badgeRef} className="inline-flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 px-4 lg:px-6 py-2 lg:py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/50">
            <Factory size={isMobile ? 18 : 24} className="text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm lg:text-base font-semibold">Smart Industrial Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 lg:mb-6 font-semibold">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Revolutionary</span>
            <br />
            <span className={`bg-gradient-to-r ${currentProduct.color} bg-clip-text text-transparent transition-all duration-1000`}>
              Industrial Intelligence
            </span>
          </h1>
          <p className="lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-semibold mt-8 lg:mt-12 pl-13">
            Transform your facilities with AI-powered solutions that deliver unprecedented efficiency, sustainability, and operational excellence.
          </p>
        </div>
        <div className="flex justify-center mb-8 lg:mb-12 px-2 lg:px-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-1 lg:p-2 shadow-lg border border-white/50 w-fit overflow-visible">
            <div className="flex gap-1 lg:gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setActiveProduct(index);
                    setIsPlaying(false);
                  }}
                  className={`group flex flex-col items-center gap-1 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl transition-all duration-300 min-w-[80px] lg:min-w-[120px] ${
                    activeProduct === index ? `bg-gradient-to-r ${product.color} text-white shadow-lg` : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <product.icon size={isMobile ? 16 : 20} />
                  <span className="font-medium text-xs lg:text-sm whitespace-nowrap font-semibold">{isMobile ? product.title.split(' ')[0] : product.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <motion.div
          ref={productCardRef}
          animate={{
            borderColor: isLineActive ? '#10b981' : 'rgba(255, 255, 255, 0.5)',
            boxShadow: isLineActive ? '0 0 30px rgba(16, 185, 129, 0.3)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
          transition={{ duration: 0.5 }}
          className="mx-2 lg:mx-0"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 rounded-2xl overflow-visible">
            <div className={`p-4 sm:p-6 lg:p-8 bg-gradient-to-br ${currentProduct.bgGradient}`}>
              <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br ${currentProduct.color} p-3 lg:p-4 shadow-lg`}>
                  <currentProduct.icon size={isMobile ? 24 : 32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2 font-semibold">{currentProduct.title}</h2>
                  <p className={`text-base lg:text-lg font-medium bg-gradient-to-r ${currentProduct.color} bg-clip-text text-transparent font-semibold`}>
                    {currentProduct.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-base lg:text-xl text-gray-700 mb-6 lg:mb-8 leading-relaxed font-semibold">{currentProduct.description}</p>
              <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                {currentProduct.features.map((feature, index) => (
                  <FeatureItem key={index} feature={feature} index={index} />
                ))}
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 bg-white/30 backdrop-blur-sm relative order-first lg:order-none">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 lg:mb-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 font-semibold">Performance Metrics</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-8 h-8 lg:w-10 lg:h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      {isPlaying ? <Pause size={isMobile ? 16 : 20} className="text-emerald-600" /> : <Play size={isMobile ? 16 : 20} className="text-emerald-600" />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-8">
                  {currentProduct.metrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} index={index} />
                  ))}
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-lg border border-white/50">
                  <h4 className="font-semibold text-gray-800 mb-3 lg:mb-4 text-sm lg:text-base font-semibold">System Status</h4>
                  <div className="space-y-2 lg:space-y-3">
                    {['Core Systems', 'Data Integration', 'AI Processing', 'Real-time Analytics'].map((status, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <CheckCircle size={isMobile ? 14 : 16} className="text-green-500" />
                          <span className="text-xs lg:text-sm text-gray-700 font-semibold">{status}</span>
                        </div>
                        <div className="text-xs text-green-600 font-medium font-semibold">Active</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumProductsSection;