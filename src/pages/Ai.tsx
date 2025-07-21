import React, { useRef, useState, useEffect, useId, RefObject } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Brain, Monitor, Cpu, Leaf, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Factory, Lightbulb } from 'lucide-react';

interface AnimatedLineProps {
  containerRef: RefObject<HTMLDivElement | null>;
  fromRef: RefObject<HTMLDivElement | null>;
  toRef: RefObject<HTMLDivElement | null>;
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

        const startX = rectA.left - containerRect.left + rectA.width / 2;
        const startY = rectA.bottom - containerRect.top;
        const endX = rectB.left - containerRect.left + rectB.width / 2;
        const endY = rectB.top - containerRect.top;

        const midY = (startY + endY) / 2;
        const controlPoint1X = startX;
        const controlPoint1Y = startY + (midY - startY) * 0.5;
        const controlPoint2X = endX;
        const controlPoint2Y = endY - (endY - midY) * 0.5;

        const d = `M ${startX},${startY} C ${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${endX},${endY}`;
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
      className="pointer-events-none absolute left-0 top-0 z-10"
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

interface DataVisualizationProps {
  type: 'metrics' | 'chart' | 'progress' | 'status';
  data: any;
  title: string;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ type, data, title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  if (type === 'metrics') {
    return (
      <motion.div
        ref={ref}
        className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
        <div className="grid grid-cols-2 gap-3">
          {data.map((metric: any, index: number) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl font-bold text-emerald-600">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (type === 'progress') {
    return (
      <motion.div
        ref={ref}
        className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
        {data.map((item: any, index: number) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="flex justify-between text-xs mb-1">
              <span>{item.label}</span>
              <span className="font-semibold">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${item.value}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (type === 'status') {
    return (
      <motion.div
        ref={ref}
        className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
        <div className="space-y-2">
          {data.map((item: any, index: number) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.status === 'active' && <CheckCircle size={16} className="text-green-500" />}
              {item.status === 'warning' && <AlertTriangle size={16} className="text-yellow-500" />}
              {item.status === 'inactive' && <div className="w-4 h-4 rounded-full bg-gray-300" />}
              <span className="text-xs text-gray-700">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      <div className="h-20 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-lg flex items-center justify-center">
        <TrendingUp size={24} className="text-emerald-600" />
      </div>
    </motion.div>
  );
};

interface ProjectCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  benefits: string;
  color: string;
  side: 'left' | 'right';
  dataVisualizations: any[];
  className?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ icon: Icon, title, description, features, benefits, color, side, dataVisualizations, className = '' }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="relative">
        <motion.div
          ref={ref}
          className={`relative group cursor-pointer ${side === 'left' ? 'mr-auto' : 'ml-auto'} ${className}`}
          initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`relative z-10 rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-500 ${color} ${isExpanded ? 'shadow-[0_30px_80px_rgba(0,0,0,0.15)]' : 'group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]'}`}>
            <div className={`flex ${side === 'left' ? 'flex-row' : 'flex-row-reverse'} items-start gap-6`}>
              <div className="flex-shrink-0">
                <div className="rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 p-4 shadow-lg">
                  <Icon size={32} className="text-white" />
                </div>
              </div>
              <div className={`flex-1 ${side === 'left' ? 'text-left' : 'text-right'}`}>
                <h3 className="mb-3 text-2xl font-bold text-gray-800">{title}</h3>
                <p className="mb-4 text-lg text-gray-600 leading-relaxed">{description}</p>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: isExpanded ? 'auto' : 0, 
                    opacity: isExpanded ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    <ul className={`space-y-1 ${side === 'left' ? 'text-left' : 'text-right'}`}>
                      {features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium">{benefits}</p>
                  </div>
                </motion.div>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-blue-700 transition-all">
                  {isExpanded ? 'Show Less' : 'Learn More'}
                </button>
              </div>
            </div>
            <div className={`absolute top-1/2 ${side === 'left' ? '-right-3' : '-left-3'} h-6 w-6 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 shadow-lg border-4 border-white`} />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </motion.div>
        <motion.div
          className={`absolute top-0 ${side === 'left' ? '-right-80' : '-left-80'} w-72 space-y-4`}
          initial={{ opacity: 0, x: side === 'left' ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-200px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {dataVisualizations.map((viz, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.2 }}
            >
              <DataVisualization {...viz} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

const BrainHub = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      ref={ref}
      className="relative z-20 flex justify-center"
      style={{ scale }}
    >
      <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 shadow-[0_0_100px_rgba(5,150,105,0.6)]">
        <Brain size={80} className="text-white" />
        <motion.div
          className="absolute -inset-8 rounded-full border-2 border-emerald-300/50"
          style={{ rotate }}
        />
        <motion.div
          className="absolute -inset-16 rounded-full border border-blue-300/30"
          style={{ rotate: useTransform(rotate, (r) => -r * 0.5) }}
        />
        <div className="absolute -inset-12 rounded-full bg-gradient-to-r from-emerald-500/30 to-blue-600/30 blur-xl animate-pulse" />
        {[Monitor, Cpu, Leaf, BarChart3].map((IconComp, index) => {
          const angle = (index / 4) * 2 * Math.PI;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={index}
              className="absolute w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 360],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              }}
            >
              <IconComp width={20} height={20} className="text-emerald-600" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
});

const ProjectShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);
  const [cardRefs] = useState<React.RefObject<HTMLDivElement | null>[]>(() =>
    Array.from({ length: 4 }, () => React.createRef<HTMLDivElement>())
  );
  const [visibleLines, setVisibleLines] = useState<boolean[]>(new Array(4).fill(false));

  const projects = [
    {
      icon: Monitor,
      title: "Digital Twin Platform",
      description: "Browser-based digital twins providing live, interactive facility mirrors with real-time system integration.",
      features: [
        "Real-time BMS, SCADA, PLCs, and control systems integration",
        "IoT sensor augmentation for comprehensive monitoring",
        "Intuitive 3D & 2D dashboards accessible via any browser",
        "Predictive simulations, alerts, and historical playback",
        "No GPU requirements for seamless accessibility"
      ],
      benefits: "Acts as your facility's virtual command center, helping operations and maintenance teams respond faster, reduce downtime, and collaborate better.",
      color: 'border-blue-200 hover:border-blue-300',
      dataVisualizations: [
        {
          type: 'metrics',
          title: 'Real-time Monitoring',
          data: [
            { value: '99.9%', label: 'Uptime' },
            { value: '847', label: 'Sensors' },
            { value: '24/7', label: 'Live Data' },
            { value: '< 1s', label: 'Latency' }
          ]
        },
        {
          type: 'status',
          title: 'System Status',
          data: [
            { label: 'BMS Integration', status: 'active' },
            { label: 'SCADA Systems', status: 'active' },
            { label: 'PLC Networks', status: 'active' },
            { label: 'IoT Sensors', status: 'warning' }
          ]
        }
      ]
    },
    {
      icon: Cpu,
      title: "AI-Powered Predictive & Preventive Maintenance",
      description: "Machine learning solutions that transform maintenance from reactive to proactive using real-time data analytics.",
      features: [
        "Early detection of wear-and-tear patterns using sensor data",
        "Predictive schedules based on usage and behavior patterns",
        "Automated task distribution for optimal personnel rotation",
        "Cross-facility resource pooling and central analytics",
        "Reduced manpower idle time and operational expenses"
      ],
      benefits: "Ensures maximum uptime while reducing waste in workforce deployment through intelligent preventive task scheduling.",
      color: 'border-purple-200 hover:border-purple-300',
      dataVisualizations: [
        {
          type: 'progress',
          title: 'Maintenance Efficiency',
          data: [
            { label: 'Predictive Accuracy', value: 94 },
            { label: 'Downtime Reduction', value: 87 },
            { label: 'Cost Savings', value: 76 },
            { label: 'Workforce Optimization', value: 91 }
          ]
        },
        {
          type: 'metrics',
          title: 'Performance Metrics',
          data: [
            { value: '76%', label: 'OPEX Reduction' },
            { value: '94%', label: 'Accuracy' },
            { value: '2.3x', label: 'ROI' },
            { value: '15 min', label: 'Avg Response' }
          ]
        }
      ]
    },
    {
      icon: Leaf,
      title: "Carbon Footprint Tracking & Optimization",
      description: "Real-time carbon intelligence system for comprehensive environmental impact management and optimization.",
      features: [
        "Per-device and per-process carbon emissions tracking",
        "Power consumption vs manufacturer benchmarks comparison",
        "Anomaly identification for excess emissions contributors",
        "Underperforming equipment and leak-prone systems analysis",
        "Facility-wide and department-specific emission heatmaps"
      ],
      benefits: "Uncovers hidden energy drains and significantly reduces carbon footprint through intelligent monitoring and optimization.",
      color: 'border-green-200 hover:border-green-300',
      dataVisualizations: [
        {
          type: 'metrics',
          title: 'Carbon Impact',
          data: [
            { value: '42%', label: 'CO₂ Reduction' },
            { value: '156', label: 'Tons Saved' },
            { value: '28%', label: 'Energy Efficiency' },
            { value: '$89K', label: 'Cost Savings' }
          ]
        },
        {
          type: 'progress',
          title: 'Sustainability Goals',
          data: [
            { label: 'Carbon Neutrality', value: 68 },
            { label: 'Energy Efficiency', value: 85 },
            { label: 'Waste Reduction', value: 72 },
            { label: 'Green Compliance', value: 91 }
          ]
        }
      ]
    },
    {
      icon: BarChart3,
      title: "Green Gauge™ – ESG Reporting & Sustainability",
      description: "Comprehensive ESG platform for automated reporting, compliance, and sustainability metrics with audit-ready documentation.",
      features: [
        "Automated ESV report generation from live data streams",
        "Immutable, audit-ready logs for regulators and investors",
        "Emission, energy, and waste analytics dashboards",
        "Revenue leak identification from inefficient systems",
        "Simplified data exports and dashboards for audits"
      ],
      benefits: "Provides transparency and positions your organization as a forward-looking, environmentally responsible leader in sustainability.",
      color: 'border-emerald-200 hover:border-emerald-300',
      dataVisualizations: [
        {
          type: 'status',
          title: 'Compliance Status',
          data: [
            { label: 'ESG Reporting', status: 'active' },
            { label: 'Audit Trails', status: 'active' },
            { label: 'Regulatory Compliance', status: 'active' },
            { label: 'Investor Reports', status: 'active' }
          ]
        },
        {
          type: 'metrics',
          title: 'ESG Performance',
          data: [
            { value: 'AAA', label: 'ESG Rating' },
            { value: '100%', label: 'Compliance' },
            { value: '12', label: 'Reports/Month' },
            { value: '0', label: 'Audit Issues' }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      cardRefs.forEach((ref, index) => {
        if (ref.current) {
          const cardRect = ref.current.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const isVisible = cardCenter < window.innerHeight * 0.8;

          setVisibleLines(prev => {
            const newState = [...prev];
            newState[index] = isVisible;
            return newState;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardRefs]);

  return (
    <section className="min-h-screen flex items-center hero-bg">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Factory size={24} className="text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Smart Industrial Solutions</span>
          </motion.div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Innovation Ecosystem
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover our comprehensive suite of AI-powered industrial solutions designed to transform facilities, optimize operations, and drive sustainable innovation across your entire organization.
          </p>
        </motion.div>
        <div ref={containerRef} className="relative min-h-[5000px] w-full">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            const topPosition = 200 + index * 600;

            return (
              <div key={index}>
                <div
                  className="absolute"
                  style={{
                    left: isLeft ? '5%' : 'auto',
                    right: isLeft ? 'auto' : '5%',
                    top: `${topPosition}px`,
                    width: '500px',
                  }}
                >
                  <ProjectCard
                    ref={cardRefs[index]}
                    icon={project.icon}
                    title={project.title}
                    description={project.description}
                    features={project.features}
                    benefits={project.benefits}
                    color={project.color}
                    side={isLeft ? 'left' : 'right'}
                    dataVisualizations={project.dataVisualizations}
                  />
                </div>
                {index < projects.length - 1 ? (
                  <AnimatedLine
                    containerRef={containerRef}
                    fromRef={cardRefs[index]}
                    toRef={cardRefs[index + 1]}
                    isActive={visibleLines[index]}
                    delay={0.3}
                  />
                ) : (
                  <AnimatedLine
                    containerRef={containerRef}
                    fromRef={cardRefs[index]}
                    toRef={brainRef}
                    isActive={visibleLines[index]}
                    delay={0.3}
                  />
                )}
              </div>
            );
          })}
          <div
            className="absolute w-full flex justify-center"
            style={{ top: `${200 + projects.length * 600 + 200}px` }}
          >
            <BrainHub ref={brainRef} />
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-emerald-200 to-transparent transform -translate-x-1/2 opacity-40" />
        </div>
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-12 border border-emerald-100">
            <Lightbulb size={48} className="text-emerald-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Integrated Intelligence for Tomorrow's Facilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Our four core solutions work together seamlessly, creating a unified ecosystem that transforms traditional facilities into smart, sustainable, and highly efficient operations.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Solutions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;