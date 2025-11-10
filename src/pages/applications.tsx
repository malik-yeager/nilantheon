'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Calculator, TrendingUp, Award } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

const ParticleField = () => {
  const particles = useMemo(
    () =>
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-twinkle"
          style={style}
        />
      ))}
    </div>
  );
};

const industries = [
  {
    title: "Manufacturing",
    applications: "Digital twins, predictive maintenance, energy orchestration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM12 7v10M7 12h10" />
      </svg>
    ),
    color: "bg-blue-50"
  },
  {
    title: "Finance",
    applications: "ESG transparency, carbon-linked inefficiencies",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: "bg-purple-50"
  },
  {
    title: "Healthcare",
    applications: "Facility energy benchmarking, emissions reporting",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    color: "bg-emerald-50"
  },
  {
    title: "Smart Cities",
    applications: "Optimize power/water/transport; predictive alerts",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17" y1="6" x2="17" y2="6.01" />
      </svg>
    ),
    color: "bg-teal-50"
  },
  {
    title: "Data Centers",
    applications: "Device emissions tracking, cooling load reduction",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <rect x="3" y="12" width="18" height="8" rx="2" />
        <line x1="8" y1="4" x2="8" y2="12" />
        <line x1="16" y1="4" x2="16" y2="12" />
      </svg>
    ),
    color: "bg-indigo-50"
  },
  {
    title: "Retail & Real Estate",
    applications: "HVAC, lighting orchestration, tenant energy profiling",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/>
        <path d="M5 10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10H5z"/>
        <path d="M12 5v2"/>
        <path d="M12 13v2"/>
      </svg>
    ),
    color: "bg-cyan-50"
  }
];

export default function IndustryUseCases() {
  const [emissions, setEmissions] = useState("");
  const [calculatedEmissions, setCalculatedEmissions] = useState("");
  const [savings, setSavings] = useState<number | null>(null);
  const [equivalents, setEquivalents] = useState<any>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  const RATE_PER_TON = 7.1;

  const calculateEquivalents = (tons: number) => {
    return {
      trees: Math.round(tons * 16.5),
      cars: Math.round(tons * 0.22),
      homes: Math.round(tons * 0.19),
      flights: Math.round(tons * 0.125)
    };
  };

  const handleCalculate = () => {
    const num = parseFloat(emissions);
    if (!isNaN(num) && num > 0) {
      const calculatedSavings = parseFloat((num * RATE_PER_TON).toFixed(2));
      setCalculatedEmissions(emissions);
      setSavings(calculatedSavings);
      setEquivalents(calculateEquivalents(num));
    } else {
      setSavings(null);
      setEquivalents(null);
      setCalculatedEmissions("");
    }
  };
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    // Set initial height to prevent layout shifts
    const setInitialHeight = () => {
      if (sectionRef.current) {
        const viewportHeight = window.innerHeight;
        const headerHeight = document.querySelector('header')?.clientHeight || 0;
        sectionRef.current.style.minHeight = `calc(${viewportHeight}px - ${headerHeight}px)`;
      }
    };

    setInitialHeight();
    window.addEventListener('resize', setInitialHeight);

    return () => {
      window.removeEventListener('resize', setInitialHeight);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
              className="relative px-4 sm:px-6 lg:px-8 overflow-visible min-h-screen"
      id="industry-use-cases"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 hero-bg"
        style={{
          y: yBg
        }}
      />
      
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full py-12">
        {/* Header with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 pt-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-poppins tracking-tight bg-gradient-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">
            Industry Solutions & Impact
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Nilantheon transforms operations across industries while quantifying your environmental impact.
          </p>
        </motion.div>

        {/* Carbon Calculator with scroll animation */}
        <motion.div
          ref={calculatorRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 mb-20"
        >
          <div className="md:flex">
            <div className="p-8 md:p-10 md:w-1/2 bg-gradient-to-br from-teal-50 to-emerald-50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Carbon Impact Calculator</h3>
              </div>
              
              <div className="mb-6">
                <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  CO₂ Emissions Reduced (tons)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emissions}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty string or valid decimal numbers
                      if (value === "" || /^\d*\.?\d*$/.test(value)) {
                        const floatValue = parseFloat(value);
                        // Only check limit if there's actually a number
                        if (value === "" || !isNaN(floatValue)) {
                          if (value === "" || floatValue <= 1000000000) {
                            setEmissions(value);
                          }
                        }
                      }
                    }}
                    placeholder="Enter amount (e.g., 25.5)"
                    className="w-full px-6 py-4 text-lg text-black border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 bg-white shadow-sm"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calculator className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Rate: ${RATE_PER_TON}/ton CO₂ for carbon credits. Max allowed: 1B+ tons.
                </p>
              </div>

              <button
                onClick={handleCalculate}
                disabled={
                  !emissions || parseFloat(emissions) <= 0 || parseFloat(emissions) > 1000000000
                }
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate Impact & Value
              </button>
            </div>

            <div className="p-8 md:p-10 md:w-1/2 bg-white">
              {savings !== null && equivalents ? (
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Your Environmental Impact</h3>
                  
                  <div className="flex-1 space-y-6">
                    <div className="bg-emerald-50 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Carbon Credit Value</h4>
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">
                        ${savings.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        From {parseFloat(calculatedEmissions)} tons CO₂ reduced
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Award className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Your Impact Awaits</h3>
                  <p className="text-gray-400 max-w-xs">
                    Enter your CO₂ emissions data to see your potential environmental and financial impact.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Industry Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-20"
        >
          {industries.map((item, index) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    delay: index * 0.1
                  }
                }
              }}
              whileHover={{ 
                y: -8,
                transition: { 
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 400
                } 
              }}
              className={`${item.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden`}
            >
              <div className="text-2xl mb-4 text-teal-600">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.applications}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}








