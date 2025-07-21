import React, { useState, useRef, useEffect, useId, RefObject } from 'react';
import { motion} from 'framer-motion';
import { Monitor, Cpu, Leaf, BarChart3, ArrowRight,  CheckCircle, Factory, Play, Pause } from 'lucide-react';

interface AnimatedLineProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  delay?: number;
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({
  containerRef,
  fromRef,
  toRef,
  isActive,
  delay = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();
  
        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });
  
        // Start point (top right corner)
        const startX = svgWidth - 20;
        const startY = 10;
  
        // Control point for the curve (midpoint between start and badge)
        const controlX = svgWidth - 20;
        const controlY = rectA.top - containerRect.top + rectA.height / 2;
  
        // Badge position (midpoint)
        const badgeX = rectA.left - containerRect.left + rectA.width / 2;
        const badgeY = rectA.top - containerRect.top + rectA.height / 2;
  
        // Card position (end point) - Stop at the top border of the card
        const endX = rectB.left - containerRect.left + rectB.width / 2;
        const endY = rectB.top - containerRect.top; // Stops at the top border
  
        // Optional: Go below the card
        // const endY = rectB.top - containerRect.top + rectB.height + 10; // Adds 10px below the card
  
        // Create a path that goes from start -> control point -> badge -> card
        const d = `
          M ${startX},${startY}
          Q ${controlX},${startY} ${controlX},${controlY}
          L ${badgeX},${badgeY}
          L ${endX},${endY}
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
  }, [containerRef, fromRef, toRef]);
  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      className="pointer-events-none absolute left-0 top-0 z-0"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke="#e5e7eb"
        strokeWidth={3}
        strokeOpacity={0.3}
        strokeLinecap="round"
      />
      {isActive && (
        <motion.path
          d={pathD}
          stroke={`url(#gradient-${id})`}
          strokeLinecap="round"
          strokeWidth={4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            delay: delay,
            ease: "easeInOut"
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
  const [activeProduct, setActiveProduct] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const productCardRef = useRef<HTMLDivElement | null>(null);
  const topRightDotRef = useRef<HTMLDivElement | null>(null);
  const [isLineActive, setIsLineActive] = useState(false);

  const products = [
    {
      id: 1,
      icon: Monitor,
      title: "Digital Twin Platform",
      subtitle: "Real-time Facility Intelligence",
      description: "Browser-based digital twins providing live, interactive facility mirrors with real-time system integration.",
      features: [
        "Real-time BMS, SCADA, PLCs integration",
        "IoT sensor augmentation",
        "3D & 2D dashboards",
        "Predictive simulations"
      ],
      metrics: [
        { value: '99.9%', label: 'Uptime' },
        { value: '847', label: 'Sensors' },
        { value: '< 1s', label: 'Latency' }
      ],
      color: 'from-blue-600 to-blue-800',
      bgGradient: 'from-blue-50 to-indigo-100',
      accentColor: 'blue'
    },
    {
      id: 2,
      icon: Cpu,
      title: "AI-Powered Predictive Maintenance",
      subtitle: "Intelligent Maintenance Solutions",
      description: "Machine learning solutions that transform maintenance from reactive to proactive using real-time data analytics.",
      features: [
        "Early wear-and-tear detection",
        "Predictive scheduling",
        "Automated task distribution",
        "Cross-facility analytics"
      ],
      metrics: [
        { value: '94%', label: 'Accuracy' },
        { value: '76%', label: 'Cost Reduction' },
        { value: '2.3x', label: 'ROI' }
      ],
      color: 'from-purple-600 to-purple-800',
      bgGradient: 'from-purple-50 to-violet-100',
      accentColor: 'purple'
    },
    {
      id: 3,
      icon: Leaf,
      title: "Carbon Footprint Tracking",
      subtitle: "Environmental Intelligence",
      description: "Real-time carbon intelligence system for comprehensive environmental impact management and optimization.",
      features: [
        "Per-device emissions tracking",
        "Power consumption analysis",
        "Anomaly identification",
        "Emission heatmaps"
      ],
      metrics: [
        { value: '42%', label: 'CO₂ Reduction' },
        { value: '156T', label: 'Saved' },
        { value: '$89K', label: 'Savings' }
      ],
      color: 'from-emerald-600 to-green-800',
      bgGradient: 'from-emerald-50 to-green-100',
      accentColor: 'emerald'
    },
    {
      id: 4,
      icon: BarChart3,
      title: "Green Gauge™ ESG Platform",
      subtitle: "Sustainability & Compliance",
      description: "Comprehensive ESG platform for automated reporting, compliance, and sustainability metrics with audit-ready documentation.",
      features: [
        "Automated ESG reporting",
        "Immutable audit logs",
        "Analytics dashboards",
        "Revenue leak identification"
      ],
      metrics: [
        { value: 'AAA', label: 'ESG Rating' },
        { value: '100%', label: 'Compliance' },
        { value: '0', label: 'Issues' }
      ],
      color: 'from-teal-600 to-cyan-800',
      bgGradient: 'from-teal-50 to-cyan-100',
      accentColor: 'teal'
    }
  ];
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setActiveProduct(prev => (prev + 1) % products.length);
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
      // Trigger as soon as any part of the section is visible
      const isVisible = sectionRect.top < window.innerHeight;
      setIsLineActive(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentProduct = products[activeProduct];

  const MetricCard: React.FC<{ metric: { value: string; label: string }; index: number }> = ({ metric, index }) => (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={`text-3xl font-bold bg-gradient-to-r ${currentProduct.color} bg-clip-text text-transparent`}>
        {metric.value}
      </div>
      <div className="text-gray-600 text-sm font-medium mt-1">{metric.label}</div>
    </div>
  );

  const FeatureItem: React.FC<{ feature: string; index: number }> = ({ feature, index }) => (
    <div 
      className="flex items-center gap-3 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentProduct.color} group-hover:scale-125 transition-transform`} />
      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</span>
    </div>
  );
  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center hero-bg">
    {/* Grid overlay */}
    <div className="absolute inset-0 grid-overlay opacity-60" />
    {/* Starting point indicator (top right corner) */}
    <div className="absolute top-20 right-10 w-4 h-4 rounded-full bg-emerald-500 z-20" />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
      </div>

      {/* Starting point for the line (top right corner) */}
      <div ref={topRightDotRef} className="absolute top-20 right-10 w-4 h-4 rounded-full bg-emerald-500 z-20" />

      {/* Animated line */}
      <AnimatedLine
        containerRef={containerRef}
        fromRef={badgeRef}
        toRef={productCardRef}
        isActive={isLineActive}
        delay={1.0} // Slightly delayed to follow after first segment
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-20">
        <div ref={badgeRef} className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/50">
        <Factory size={24} className="text-emerald-600" />
        <span className="text-emerald-700 font-semibold">Smart Industrial Solutions</span>
      </div>
          <h1 className="text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Revolutionary
            </span>
            <br />
            <span className={`bg-gradient-to-r ${currentProduct.color} bg-clip-text text-transparent transition-all duration-1000`}>
              Industrial Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your facilities with AI-powered solutions that deliver unprecedented efficiency, sustainability, and operational excellence.
          </p>
        </div>

      {/* Main Product Display */}
      <motion.div 
        ref={productCardRef}
        animate={{
          borderColor: isLineActive ? '#10b981' : 'rgba(255, 255, 255, 0.5)',
          boxShadow: isLineActive ? '0 0 30px rgba(16, 185, 129, 0.3)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        transition={{ duration: 0.5 }}
      >
  <div className="grid lg:grid-cols-2 gap-0">
    {/* Left Content */}
    <div className="p-12 lg:p-16">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentProduct.color} p-4 shadow-lg`}>
          <currentProduct.icon size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {currentProduct.title}
          </h2>
          <p className={`text-lg font-medium bg-gradient-to-r ${currentProduct.color} bg-clip-text text-transparent`}>
            {currentProduct.subtitle}
          </p>
        </div>
      </div>

      <p className="text-xl text-gray-700 mb-8 leading-relaxed">
        {currentProduct.description}
      </p>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {currentProduct.features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} index={index} />
        ))}
      </div>

      {/* CTA Button */}
      <button className={`group px-8 py-4 bg-gradient-to-r ${currentProduct.color} text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3`}>
        <span>Explore Solution</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    {/* Right Metrics & Visuals */}
    <div className="p-12 lg:p-16 bg-white/30 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Performance Metrics</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              {isPlaying ? <Pause size={20} className="text-emerald-600" /> : <Play size={20} className="text-emerald-600" />}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {currentProduct.metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        {/* Status Indicators */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
          <h4 className="font-semibold text-gray-800 mb-4">System Status</h4>
          <div className="space-y-3">
            {['Core Systems', 'Data Integration', 'AI Processing', 'Real-time Analytics'].map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm text-gray-700">{status}</span>
                </div>
                <div className="text-xs text-green-600 font-medium">Online</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.div>
        {/* Product Navigation */}
        <div className="flex justify-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
            <div className="flex gap-2">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setActiveProduct(index);
                    setIsPlaying(false);
                  }}
                  className={`group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeProduct === index
                      ? `bg-gradient-to-r ${product.color} text-white shadow-lg`
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <product.icon size={20} />
                  <span className="font-medium whitespace-nowrap">{product.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {products.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-1000 ${
                  index === activeProduct ? 'w-12 bg-gradient-to-r ' + currentProduct.color : 'w-3 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumProductsSection;