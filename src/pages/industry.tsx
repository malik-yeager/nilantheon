'use client';

import { motion } from 'framer-motion';

const industries = [
  {
    title: "Manufacturing",
    applications: "Digital twins, predictive maintenance, energy orchestration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM12 7v10M7 12h10" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Finance",
    applications: "ESG transparency, carbon-linked inefficiencies",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: "from-purple-500 to-violet-500"
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
    color: "from-emerald-500 to-green-500"
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
    color: "from-teal-500 to-cyan-500"
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
    color: "from-indigo-500 to-blue-500"
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
    color: "from-cyan-500 to-teal-500"
  }
];

export const IndustrySolutionsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">
          Industry Solutions
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how we transform operations across industries
        </p>
      </motion.div>

        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover="hover"
              className="relative"
            >
              <div className={`h-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/60`}>
                {/* Animated gradient border - always visible */}
                <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-blue-50/10  to-emerald-500/10 opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className={`inline-flex p-3 mb-4 rounded-xl bg-gradient-to-r ${item.color} shadow-lg group-hover:shadow-xl transition-all`}>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.applications}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
    </div>
  );
};