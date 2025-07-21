import React, { useRef, useState, useEffect, useId, RefObject, ForwardRefExoticComponent, SVGProps } from 'react';
import { Brain, MessageSquare, Image, Code, Mic, BarChart3, FileText, Shield, Sparkles } from 'lucide-react';

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLDivElement>;
  fromRef: RefObject<HTMLDivElement>;
  toRef: RefObject<HTMLDivElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  className?: string;
  index?: number;
  totalBeams?: number;
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 3,
  delay = 0,
  pathColor = '#e5e7eb',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#6366f1',
  gradientStopColor = '#8b5cf6',
  className = '',
  index = 0,
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

        // Center of the hub
        const startX = rectA.left - containerRect.left + rectA.width / 2;
        const startY = rectA.top - containerRect.top + rectA.height / 2;

        // Center of the target card
        const cardCenterX = rectB.left - containerRect.left + rectB.width / 2;
        const cardCenterY = rectB.top - containerRect.top + rectB.height / 2;

        // Calculate direction vector
        const dx = cardCenterX - startX;
        const dy = cardCenterY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector
        const normalizedDx = dx / distance;
        const normalizedDy = dy / distance;

        // Card dimensions
        const cardWidth = rectB.width;
        const cardHeight = rectB.height;

        // Find intersection point with rounded rectangle border
        let endX, endY;

        // Determine which side of the card the line should connect to
        const absNormalizedDx = Math.abs(normalizedDx);
        const absNormalizedDy = Math.abs(normalizedDy);

        if (absNormalizedDx > absNormalizedDy) {
          // Connect to left or right side
          if (normalizedDx > 0) {
            // Right side
            endX = rectB.left - containerRect.left;
            endY = cardCenterY;
          } else {
            // Left side
            endX = rectB.left - containerRect.left + cardWidth;
            endY = cardCenterY;
          }
        } else {
          // Connect to top or bottom side
          if (normalizedDy > 0) {
            // Bottom side
            endX = cardCenterX;
            endY = rectB.top - containerRect.top;
          } else {
            // Top side
            endX = cardCenterX;
            endY = rectB.top - containerRect.top + cardHeight;
          }
        }

        // Add some curvature for visual appeal
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const controlX = midX + curvature * Math.sin(Math.atan2(dy, dx) + Math.PI / 2);
        const controlY = midY - curvature * Math.cos(Math.atan2(dy, dx) + Math.PI / 2);

        const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    updatePath();

    return () => resizeObserver.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      className={`pointer-events-none absolute left-0 top-0 ${className}`}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="20%" stopColor={gradientStartColor} />
          <stop offset="50%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        fill="none"
      />
      
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeLinecap="round"
        strokeWidth={pathWidth}
        fill="none"
        strokeDasharray="20 10"
        strokeDashoffset="0"
        style={{
          animation: `beam-flow-${index} ${duration}s ease-in-out ${delay}s infinite`,
        }}
      />
      
      <style >{`
        @keyframes beam-flow-${index} {
          0% {
            stroke-dashoffset: 30;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -30;
            opacity: 0;
          }
        }
      `}</style>
    </svg>
  );
};

interface ProductNodeProps {
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
  className?: string;
  delay?: number;
}

const ProductNode = React.forwardRef<HTMLDivElement, ProductNodeProps>(
  ({ icon: Icon, title, description, color, className = '', delay = 0 }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div
        ref={ref}
        className={`relative group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: `fadeInScale 0.6s ease-out ${delay}s both`,
        }}
      >
        <div
          className={`relative z-10 flex flex-col items-center justify-center rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] ${color}`}
          style={{
            boxShadow: isHovered 
              ? '0 0 30px rgba(99, 102, 241, 0.4), 0 20px 60px rgba(0,0,0,0.15)' 
              : undefined,
            borderColor: isHovered 
              ? 'rgba(99, 102, 241, 0.5)' 
              : undefined,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          <div className="mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg">
            <Icon width={24} height={24} className="text-white" />
          </div>
          <h3 className="mb-2 text-center font-semibold text-gray-800">{title}</h3>
          <p className="text-center text-sm text-gray-600 leading-relaxed">{description}</p>
          
          {/* Glow effect overlay */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          />
        </div>
        
        <style >{`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.8) translateY(20px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }
);

const CentralHub = React.forwardRef<HTMLDivElement>((_ , ref) => (
  <div
    ref={ref}
    className="relative z-20"
    style={{
      animation: 'hubAppear 0.8s ease-out 0.5s both',
    }}
  >
    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[0_0_50px_rgba(99,102,241,0.4)]">
      <Brain width={48} height={48} className="text-white" />
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl animate-pulse" />
    </div>
    <div
      className="absolute -inset-4 rounded-full border border-blue-300/30"
      style={{
        animation: 'rotate 20s linear infinite',
      }}
    />
    
    <style>{`
      @keyframes hubAppear {
        0% {
          opacity: 0;
          transform: scale(0.5);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
));

interface Product {
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
}

const AIProductsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const [nodeRefs] = useState(() =>
    Array.from({ length: 8 }, () => React.createRef<HTMLDivElement>())
  );

  const products: Product[] = [
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Advanced conversational AI for customer support and engagement',
      color: 'border-blue-200 hover:border-blue-300',
    },
    {
      icon: Image,
      title: 'Vision AI',
      description: 'Intelligent image recognition and visual content analysis',
      color: 'border-green-200 hover:border-green-300',
    },
    {
      icon: Code,
      title: 'Code Generator',
      description: 'AI-powered code generation and development assistance',
      color: 'border-purple-200 hover:border-purple-300',
    },
    {
      icon: Mic,
      title: 'Voice AI',
      description: 'Natural language processing for voice interactions',
      color: 'border-orange-200 hover:border-orange-300',
    },
    {
      icon: BarChart3,
      title: 'Analytics AI',
      description: 'Smart data analysis and predictive insights',
      color: 'border-teal-200 hover:border-teal-300',
    },
    {
      icon: FileText,
      title: 'Document AI',
      description: 'Automated document processing and content extraction',
      color: 'border-rose-200 hover:border-rose-300',
    },
    {
      icon: Shield,
      title: 'Security AI',
      description: 'Intelligent threat detection and cybersecurity solutions',
      color: 'border-red-200 hover:border-red-300',
    },
    {
      icon: Sparkles,
      title: 'Creative AI',
      description: 'AI-powered content creation and design automation',
      color: 'border-yellow-200 hover:border-yellow-300',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-bg">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div 
          className="text-center mb-20"
          style={{
            animation: 'fadeInUp 0.8s ease-out both',
          }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of AI-powered solutions designed to transform your business operations and drive innovation across every aspect of your organization.
          </p>
        </div>

        {/* Products Circle with Animated Beams */}
        <div ref={containerRef} className="relative min-h-[800px] w-full">
          {/* Central Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <CentralHub ref={hubRef} />
          </div>

          {/* Product Nodes in a Circle */}
          {products.map((product, index) => {
            const angle = (index / products.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 320;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <ProductNode
                  ref={nodeRefs[index]}
                  icon={product.icon}
                  title={product.title}
                  description={product.description}
                  color={product.color}
                  className="w-56"
                  delay={0.8 + index * 0.1}
                />
              </div>
            );
          })}

          {/* Animated Beams */}
          {nodeRefs.map((nodeRef, index) => (
            <AnimatedBeam
              key={index}
              containerRef={containerRef as React.RefObject<HTMLDivElement>}
              fromRef={hubRef as React.RefObject<HTMLDivElement>}
              toRef={nodeRef as React.RefObject<HTMLDivElement>}
              curvature={30}
              delay={1.5 + index * 0.3}
              duration={2.5}
              gradientStartColor={index % 3 === 0 ? '#6366f1' : index % 3 === 1 ? '#8b5cf6' : '#ec4899'}
              gradientStopColor={index % 3 === 0 ? '#8b5cf6' : index % 3 === 1 ? '#ec4899' : '#f59e0b'}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="text-center mt-20"
          style={{
            animation: 'fadeInUp 0.8s ease-out 2s both',
          }}
        >
        </div>
      </div>
      
      <style >{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AIProductsSection;