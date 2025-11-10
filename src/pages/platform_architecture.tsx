import { useState } from 'react';
import { Database, Brain, Zap, BarChart3 } from 'lucide-react';

const PlatformArchitecture = () => {
  const [animationRunning] = useState(true);

  const layers = [
    {
      id: 'data',
      title: 'Data Layer',
      subtitle: 'Real-time ingestion from IoT, SCADA, ERP, sensors, CAD',
      icon: Database,
      color: '#f59e0b'
    },
    {
      id: 'intelligence',
      title: 'Intelligence Layer',
      subtitle: 'AI detection of inefficiencies & losses',
      icon: Brain,
      color: '#8b5cf6'
    },
    {
      id: 'optimization',
      title: 'Optimization Layer',
      subtitle: 'AI + rules-based automation',
      icon: Zap,
      color: '#10b981'
    },
    {
      id: 'dashboard',
      title: 'Dashboard Layer',
      subtitle: 'Configurable ESG dashboards',
      icon: BarChart3,
      color: '#06b6d4'
    }
  ];

  return (
    <div className=" hero-bg p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none z-0" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-3 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Platform Architecture
          </h1>
          <p className="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Intelligent ESG optimization through layered AI integration
          </p>
        </div>

        {/* Assembly Line View */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
          {/* Conveyor belt background */}
          <div className="h-20 md:h-32 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 relative overflow-hidden">
            {animationRunning && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            )}
            
            {/* Belt texture */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-full bg-gray-300"
                  style={{ left: `${i * 5}%` }}
                />
              ))}
            </div>
          </div>

          {/* Processing stations */}
          <div className="relative -mt-10 md:-mt-16 px-4 md:px-8 pb-6 md:pb-8">
            <div className="grid grid-cols-2 md:flex md:justify-between gap-4 md:gap-0">
              {layers.map((layer) => {
                const IconComponent = layer.icon;
                
                return (
                  <div key={layer.id} className="flex flex-col items-center relative">
                    {/* Machine/Station */}
                    <div className="relative group">
                      <div 
                        className="w-16 h-20 md:w-24 md:h-32 bg-white border-2 border-gray-300 rounded-t-lg shadow-lg relative overflow-hidden group-hover:border-gray-400 transition-all duration-300 group-hover:shadow-xl"
                        style={{ borderColor: layer.color }}
                      >
                        {/* Machine body */}
                        <div className="absolute inset-2 bg-gradient-to-b from-gray-50 to-gray-100 rounded" />
                        
                        {/* Control panel */}
                        <div className="absolute top-2 md:top-3 left-2 md:left-3 right-2 md:right-3 h-3 md:h-6 bg-black rounded flex items-center justify-center">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse" />
                            <div className="w-1 h-1 md:w-2 md:h-2 bg-yellow-400 rounded-full" />
                            <div className="w-1 h-1 md:w-2 md:h-2 bg-red-400 rounded-full" />
                          </div>
                        </div>
                        
                        {/* Icon display */}
                        <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2">
                          <div
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: layer.color }}
                          >
                            <IconComponent size={12} className="md:w-4 md:h-4" />
                          </div>
                        </div>
                        
                        {/* Processing indicator */}
                        {animationRunning && (
                          <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 right-1 md:right-2 h-0.5 md:h-1 bg-gray-200 rounded overflow-hidden">
                            <div
                              className="h-full rounded animate-pulse"
                              style={{ backgroundColor: layer.color, width: '60%' }}
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Machine base */}
                      <div className="w-18 h-2 md:w-28 md:h-4 bg-gray-400 rounded-b-lg -mt-1" />
                    </div>

                    {/* Station content - Always visible */}
                    <div className="mt-3 md:mt-4 text-center max-w-32 md:max-w-36">
                      <h3 className="font-semibold text-xs md:text-sm text-gray-800 leading-tight mb-1 md:mb-2">
                        {layer.title}
                      </h3>
                      
                      {/* Always show subtitle */}
                      <p className="text-xs md:text-sm font-semibold text-gray-600 leading-tight">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformArchitecture;