import React, { useState, useEffect } from 'react';
import { Zap, Target, Shield, Headphones, ArrowRight, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const features = [
    {
      icon: Zap,
      title: "Scalable, Future-Proof AI",
      subtitle: "Infrastructure That Grows",
      description: "Enterprise-grade architecture that adapts to your evolving needs",
      stats: "99.9% Uptime",
      color: "from-blue-500 to-cyan-400",
      delay: 0
    },
    {
      icon: Target,
      title: "Expertise Across Sectors",
      subtitle: "Industry Veterans",
      description: "Deep domain knowledge spanning finance, healthcare, and beyond",
      stats: "50+ Industries",
      color: "from-purple-500 to-pink-400",
      delay: 1000
    },
    {
      icon: Shield,
      title: "Ethical & Data-Driven",
      subtitle: "Transparent & Secure",
      description: "Responsible AI practices with enterprise-grade security protocols",
      stats: "ISO 27001 Certified",
      color: "from-emerald-500 to-teal-400",
      delay: 2000
    },
    {
      icon: Headphones,
      title: "End-to-End Support",
      subtitle: "Complete Journey",
      description: "From strategy to deployment, monitoring, and optimization",
      stats: "24/7 Support",
      color: "from-orange-500 to-yellow-400",
      delay: 3000
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const nextStep = (prev + 1) % features.length;
        if (nextStep === 0) {
          setCompletedSteps([]);
        } else {
          setCompletedSteps(prevSteps => [...prevSteps, prev]);
        }
        return nextStep;
      });
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center hero-bg">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      {/* Main Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 ">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Our Advantage</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Us?</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Experience our comprehensive approach through an interactive journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mt-0 overflow-visible">
            {/* Left Side - Circle Diagram Only */}
            <div className="relative overflow-visible ml-32">
              {/* Feature Nodes in Circle Layout */}
              <div className="relative h-[40rem] overflow-visible">
                {/* Central Hub - YOU node absolutely centered in the circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl">
                      <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">YOU</span>
                      </div>
                    </div>
                    {/* Pulse rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-purple-400/20 animate-ping" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const angle = (index * 90) - 90; // Start from top (0° is up)
                  const radius = 240;
                  const x = Math.cos(angle * Math.PI / 180) * radius;
                  const y = Math.sin(angle * Math.PI / 180) * radius;
                  
                  const isActive = activeStep === index;
                  const isCompleted = completedSteps.includes(index);
                  
                  return (
                    <div key={index}>
                      {/* Connection Line */}
                      <div 
                        className="absolute top-1/2 left-1/2 origin-left h-px bg-gradient-to-r from-gray-600 to-transparent transform -translate-y-px"
                        style={{
                          width: `${radius}px`,
                          transform: `translate(-0%, -50%) rotate(${angle}deg)`,
                          background: isActive || isCompleted 
                            ? `linear-gradient(to right, rgb(34, 197, 94), transparent)` 
                            : `linear-gradient(to right, rgb(75, 85, 99), transparent)`
                        }}
                      />
                      
                      {/* Data Flow Animation */}
                      {(isActive || isCompleted) && (
                        <div 
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse transform -translate-y-1"
                          style={{
                            transform: `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`,
                            animation: isActive ? 'flowPulse 2s infinite' : 'none'
                          }}
                        />
                      )}
                      
                      {/* Feature Node */}
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
                            ? `bg-gradient-to-br ${feature.color} shadow-2xl shadow-cyan-500/50` 
                            : isCompleted
                            ? 'bg-gradient-to-br from-green-500 to-emerald-400 shadow-lg shadow-green-500/30'
                            : 'bg-slate-700 hover:bg-slate-600 shadow-lg'
                        }`}>
                          {isCompleted && !isActive ? (
                            <CheckCircle className="w-8 h-8 text-white" />
                          ) : (
                            <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                          )}
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute -inset-2 rounded-full border-2 border-cyan-400 animate-ping"></div>
                          )}
                        </div>
                        {/* Feature Label */}
                        <div className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}>
                          <div className={`text-sm font-semibold mb-1 ${isActive ? 'text-cyan-400' : 'text-white'}`}>
                            {feature.subtitle}
                          </div>
                          <div className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                            {feature.stats}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Mac Window Panel and Progress Dots */}
            <div className="flex flex-col items-center ml-24">
              {/* Mac Window Style Panel */}
              <div className="bg-slate-800/90 backdrop-blur-xl right-10 rounded-xl border border-slate-600 shadow-2xl overflow-hidden w-full max-w-xl">
                {/* Mac Window Header */}
                <div className="bg-slate-700/80 px-4 py-3 border-b border-slate-600 flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-300 text-sm font-medium">Feature Details</span>
                  </div>
                </div>
                {/* Mac Window Content */}
                <div className="p-8">
                  <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>  
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${features[activeStep].color} shadow-lg`}>
                        {React.createElement(features[activeStep].icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {features[activeStep].title}
                        </h3>
                        <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                          {features[activeStep].description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${features[activeStep].color} text-white shadow-lg`}>
                            {features[activeStep].stats}
                          </span>
                          <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-all duration-200 hover:gap-3">
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Progress Indicator Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeStep === index 
                        ? 'bg-cyan-400 w-8' 
                        : completedSteps.includes(index)
                        ? 'bg-green-400'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flowPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default WhyChooseUs;