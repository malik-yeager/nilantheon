import { motion } from 'framer-motion';
import { useMemo } from 'react';

const techPillars = [
  {
    title: 'CuttingEdge AI Technology',
    description: 'Harness the power of machine learning and neural networks to transform your business.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-600 group-hover:text-indigo-600 transition-colors duration-300"
      >
        <circle cx="12" cy="12" r="8" fill="rgba(59, 130, 246, 0.1)" />
        <circle cx="8" cy="8" r="1.5" fill="rgba(59, 130, 246, 0.3)" />
        <circle cx="16" cy="8" r="1.5" fill="rgba(59, 130, 246, 0.3)" />
        <circle cx="8" cy="16" r="1.5" fill="rgba(59, 130, 246, 0.3)" />
        <circle cx="16" cy="16" r="1.5" fill="rgba(59, 130, 246, 0.3)" />
        <line x1="8" y1="8" x2="12" y2="12" stroke="rgba(59, 130, 246, 0.5)" />
        <line x1="16" y1="8" x2="12" y2="12" stroke="rgba(59, 130, 246, 0.5)" />
        <line x1="8" y1="16" x2="12" y2="12" stroke="rgba(59, 130, 246, 0.5)" />
        <line x1="16" y1="16" x2="12" y2="12" stroke="rgba(59, 130, 246, 0.5)" />
        <circle cx="12" cy="12" r="1" fill="rgba(59, 130, 246, 0.8)" />
      </svg>
    ),
  },
  {
    title: 'Industry Innovation',
    description: 'Adaptable AI tools driving results in finance, healthcare, manufacturing, and more.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-600 group-hover:text-orange-700 transition-colors duration-300"
      >
        <circle cx="9" cy="9" r="5" fill="rgba(249, 115, 22, 0.1)" />
        <circle cx="15" cy="15" r="5" fill="rgba(249, 115, 22, 0.1)" />
        <path
          d="M9 6v6M6 9h6M15 12v6M12 15h6"
          stroke="rgba(249, 115, 22, 0.5)"
        />
        <circle cx="9" cy="9" r="1" fill="rgba(249, 115, 22, 0.8)" />
        <circle cx="15" cy="15" r="1" fill="rgba(249, 115, 22, 0.8)" />
      </svg>
    ),
  },
  {
    title: 'FutureReady Solutions',
    description: 'Scalable AI implementations built for tomorrow challenges.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300"
      >
        <path d="M12 3l6 15-6-4-6 4z" fill="rgba(147, 51, 234, 0.1)" />
        <path d="M12 3l6 15-6-4-6 4z" stroke="rgba(147, 51, 234, 0.5)" />
        <circle cx="12" cy="8" r="1.5" fill="rgba(147, 51, 234, 0.3)" />
        <path d="M8 15l2-3M16 15l-2-3" stroke="rgba(147, 51, 234, 0.5)" />
        <circle cx="12" cy="8" r="0.8" fill="rgba(147, 51, 234, 0.8)" />
      </svg>
    ),
  },
];

const services = [
  'Predictive Analytics',
  'Machine Learning Automation',
  'Natural Language Processing (NLP)',
  'Advanced Computer Vision',
];

const AIJourney = () => {
  const memoizedServices = useMemo(() => services, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-visible">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative py-10 z-10 w-full px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent font-semibold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            NextGen AI Solutions for Business Transformation
          </motion.h2>
        </div>

        {/* Tech Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {techPillars.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative bg-white/80 rounded-2xl p-6 border border-gray-200/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent font-semibold">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* About + Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-800 font-semibold">
              Your Trusted AI Partner
            </h3>
            <p className="text-gray-600 text-sm sm:text-base font-semibold">
              We're a mission-driven team with deep expertise in responsible, ethical AI—committed to solving real-world business challenges.
            </p>
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {memoizedServices.map((service) => (
              <div
                key={service}
                className="bg-white/90 p-4 rounded-xl border border-amber-200/50 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-amber-600 text-lg font-bold">●</span>
                  <span className="text-slate-800 font-medium text-sm sm:text-base font-semibold">
                    {service}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIJourney;