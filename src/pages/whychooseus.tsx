import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Link, BarChart2, Cpu, ChevronDown, ChevronUp, Database, Activity, RefreshCw, LayoutDashboard } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const activeStepRef = useRef(activeStep);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    // Function to check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const steps = [-1, 0, 1, 2, 3];
    let interval = setInterval(() => {
      const currentIndex = steps.indexOf(activeStepRef.current);
      const nextIndex = (currentIndex + 1) % steps.length;
      setActiveStep(steps[nextIndex]);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
      setExpandedFeature(null);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const features = [
    {
      icon: Monitor,
      title: "Visibility",
      subtitle: "Real-time Monitoring",
      description: "Real-time emissions and asset monitoring with live data visualization",
      stats: "100+ Data Points",
      color: "from-blue-500 to-cyan-400",
      detailedContent: {
        points: [
          "Live dashboards with configurable widgets",
          "Historical data trends and comparisons",
          "Anomaly detection alerts",
          "Customizable thresholds and notifications"
        ],
        benefits: [
          "Reduce manual reporting by 80%",
          "Identify issues 5x faster",
          "Achieve 99.9% data accuracy"
        ]
      }
    },
    {
      icon: Link,
      title: "Bridge the Gap",
      subtitle: "System Connectivity",
      description: "Connect siloed systems and sensors for unified data integration",
      stats: "30+ Integrations",
      color: "from-purple-500 to-pink-400",
      detailedContent: {
        points: [
          "Pre-built connectors for common systems",
          "API-based integration framework",
          "Data normalization engine",
          "Bi-directional sync capabilities"
        ],
        benefits: [
          "Reduce integration time from weeks to hours",
          "Eliminate 90% of manual data transfers",
          "Maintain single source of truth"
        ]
      }
    },
    {
      icon: BarChart2,
      title: "Insight + Remediation",
      subtitle: "Diagnostic Reporting",
      description: "Diagnostic reporting with AI-driven fix plans for inefficiencies",
      stats: "90% Accuracy",
      color: "from-emerald-500 to-teal-400",
      detailedContent: {
        points: [
          "Automated root cause analysis",
          "Prioritized action plans",
          "Impact simulation modeling",
          "Collaborative workflow tools"
        ],
        benefits: [
          "Reduce diagnostic time by 75%",
          "Improve fix success rate to 95%",
          "Cut recurring issues by 60%"
        ]
      }
    },
    {
      icon: Cpu,
      title: "Autonomous Control",
      subtitle: "AI Optimization",
      description: "AI-powered energy optimization for continuous efficiency gains",
      stats: "15-30% Savings",
      color: "from-orange-500 to-yellow-400",
      detailedContent: {
        points: [
          "Predictive load balancing",
          "Automated setpoint adjustments",
          "Self-learning algorithms",
          "Continuous performance tuning"
        ],
        benefits: [
          "Achieve 15-30% energy savings",
          "Reduce carbon footprint by 20-40%",
          "Maintain peak efficiency 24/7"
        ]
      }
    }
  ];

  const architecture = [
    {
      icon: Database,
      name: "Data Layer",
      description: "Real-time ingestion from IoT, SCADA, ERP, sensors, CAD"
    },
    {
      icon: Activity,
      name: "Intelligence Layer",
      description: "AI detection of inefficiencies & losses"
    },
    {
      icon: RefreshCw,
      name: "Optimization Layer",
      description: "AI + rules-based automation"
    },
    {
      icon: LayoutDashboard,
      name: "Dashboard Layer",
      description: "Configurable ESG dashboards"
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    if (index > activeStep || activeStep === -1) {
      setCompletedSteps(prev => {
        const newCompleted = [...prev];
        for (let i = 0; i < index; i++) {
          if (!newCompleted.includes(i)) {
            newCompleted.push(i);
          }
        }
        return newCompleted;
      });
    } else if (index === 0 && activeStep === features.length - 1) {
      setCompletedSteps([]);
    } else {
      setCompletedSteps(prev => prev.filter(step => step < index));
    }
    
    setExpandedFeature(null);
  };

  const handleCenterClick = () => {
    setActiveStep(-1);
    setCompletedSteps([]);
    setExpandedFeature(null);
  };

  const toggleExpand = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <div className="relative h-[700px] md:h-[1000px] flex items-start overflow-x-hidden pt-4 pb-4 md:pt-0 md:pb-2 mt-0 md:mt-0 rounded-2xl">
      <div className="relative z-10 px-4 sm:p-8 w-full h-full rounded-2xl">
        <div className="max-w-7xl mx-auto h-full rounded-2xl">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-emerald-400"></div>
              <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Platform Capabilities</span>
              <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-emerald-400"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-indigo-400 mb-4 md:mb-6">
              Carbon Intelligence
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Model</span>
            </h1>
            <p className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto px-2">
              Nilantheon® delivers digital-first carbon accountability with AI-powered optimization
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-4 items-center mt-16 md:mt-35 overflow-visible h-[500px] rounded-2xl">
            <div className="hidden lg:block relative overflow-visible ml-0 md:ml-32 h-full rounded-2xl" style={{ marginTop: '-30px' }}>
              <div className="relative h-full overflow-visible rounded-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative cursor-pointer" onClick={handleCenterClick}>
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                      <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-white font-bold text-sm text-center">Carbon Model</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-cyan-400/20 animate-ping" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const angle = (index * 90) - 90;
                  const radius = 240;
                  const x = Math.cos(angle * Math.PI / 180) * radius;
                  const y = Math.sin(angle * Math.PI / 180) * radius;
                  const isActive = activeStep === index;
                  const isCompleted = completedSteps.includes(index);

                  return (
                    <div key={index}>
                      <div 
                        className="absolute top-1/2 left-1/2 origin-left h-px bg-gradient-to-r from-gray-600 to-transparent transform -translate-y-px rounded-full"
                        style={{
                          width: `${radius}px`,
                          transform: `translate(-0%, -50%) rotate(${angle}deg)`,
                          background: isActive || isCompleted 
                            ? `linear-gradient(to right, rgb(16, 185, 129), transparent)` 
                            : `linear-gradient(to right, rgb(75, 85, 99), transparent)`
                        }}
                      />
                      {(isActive || isCompleted) && (
                        <div 
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse transform -translate-y-1"
                          style={{
                            transform: `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`,
                            animation: isActive ? 'flowPulse 2s infinite' : 'none'
                          }}
                        />
                      )}
                      <div
                        className={`absolute top-1/2 left-1/2 cursor-pointer transition-all duration-500 ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ${isActive ? 'scale(1.1)' : 'scale(1)'}`
                        }}
                        onClick={() => handleStepClick(index)}
                      >
                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? `bg-gradient-to-br ${feature.color} shadow-2xl shadow-emerald-500/50` 
                            : isCompleted
                            ? 'bg-gradient-to-br from-green-500 to-emerald-400 shadow-lg shadow-green-500/30'
                            : 'bg-slate-700 hover:bg-slate-600 shadow-lg'
                        }`}>
                          {isCompleted && !isActive ? (
                            <CheckCircle className="w-8 h-8 text-white" />
                          ) : (
                            <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-slate-300'}`} /> 
                          )}
                          {isActive && (
                            <div className="absolute -inset-2 rounded-full border-2 border-emerald-400 animate-ping"></div>
                          )}
                        </div>
                        <div className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}>
                          <div className={`text-sm font-semibold mb-1 ${isActive ? 'text-emerald-800' : 'text-black'}`}>
                            {feature.subtitle}
                          </div>
                          <div className={`text-xs ${isActive ? 'text-gray-900' : 'text-gray-900'}`}>
                            {feature.stats}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full flex flex-col items-center lg:items-start lg:ml-18 px-0 sm:px-4 mt-0 lg:mt-0 h-full rounded-2xl">
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl border border-slate-600 shadow-2xl w-full max-w-xl mx-0 sm:mx-4 transition-all duration-500">
                <div className="bg-slate-700/80 px-3 sm:px-4 py-2 sm:py-3 border-b border-slate-600 flex items-center gap-2 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-300 text-xs sm:text-sm text-center font-medium">
                      {activeStep === -1 ? 'Platform Architecture' : 'Carbon Intelligence'}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8">
                  {activeStep === -1 ? (
                    <div className="space-y-6">
                      {architecture.map((layer, index) => (
                        <div key={index} className="flex items-start gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 rounded-lg bg-slate-700/50">
                            {React.createElement(layer.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" })}
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm sm:text-base">{layer.name}</h5>
                            <p className="text-gray-400 text-xs sm:text-sm">{layer.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                          <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${features[activeStep].color} shadow-lg`}>
                            {React.createElement(features[activeStep].icon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-white" })}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                              {features[activeStep].title}
                            </h3>
                            <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
                              {features[activeStep].description}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r ${features[activeStep].color} text-white shadow-lg`}>
                                {features[activeStep].stats}
                              </span>
                              <button 
                                onClick={() => toggleExpand(activeStep)}
                                className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-slate-700 hover:bg-slate-600 text-white transition-all"
                              >
                                Learn More
                                {expandedFeature === activeStep ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {expandedFeature === activeStep && (
                        <div className="mt-6 animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wider">Key Features</h4>
                              <ul className="space-y-2">
                                {features[activeStep].detailedContent.points.map((point, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-emerald-400 flex-shrink-0"></div>
                                    <p className="text-gray-300 text-sm">{point}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">Business Benefits</h4>
                              <ul className="space-y-2">
                                {features[activeStep].detailedContent.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                                    <p className="text-gray-300 text-sm">{benefit}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {activeStep !== -1 && (
                <div className="flex justify-end mt-6 sm:mt-8 gap-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStepClick(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        activeStep === index 
                          ? 'bg-emerald-400 w-6 sm:w-8' 
                          : completedSteps.includes(index)
                          ? 'bg-green-400'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flowPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WhyChooseUs;