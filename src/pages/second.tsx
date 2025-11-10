import { useRef } from 'react';
import { motion, useInView, easeInOut, easeOut } from 'framer-motion';
import { Sparkles, TrendingUp, Globe, ArrowUpRight, Leaf, Cpu, Database, Shield } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      text: 'Digital Twins',
      description: 'Precision virtual replicas of physical assets',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      text: 'AI Orchestration',
      description: 'Self-optimizing infrastructure networks',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      text: 'Carbon Insights',
      description: 'Real-time emissions tracking & reduction',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: <Database className="w-6 h-6" />,
      text: 'Data Fusion',
      description: 'Unified sustainability intelligence',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const stats = [
    {
      number: '83%',
      description: 'Investors prioritize ESG in decisions',
      icon: <TrendingUp className="w-5 h-5" />,
      progress: 83,
    },
    {
      number: '$1.4T+',
      description: 'Green funding available',
      icon: <Sparkles className="w-5 h-5" />,
      progress: 100,
    },
    {
      number: '100%',
      description: 'Regulatory compliance',
      icon: <Shield className="w-5 h-5" />,
      progress: 100,
    },
    {
      number: '0%',
      description: 'Tolerance for inefficiency',
      icon: <ArrowUpRight className="w-5 h-5" />,
      progress: 0,
    },
  ];

  return (
    <div
      id="about"
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-8 "
    >
      <div className="relative max-w-7xl mx-auto px-6 mt-4">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div className="text-center mb-12 relative" variants={itemVariants}></motion.div>
          <motion.div className="relative mb-24" variants={cardVariants}>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-visible">
              <div className="relative">
                <motion.p
                  className="text-xl sm:text-2xl md:text-3xl text-slate-700 leading-relaxed mb-6 sm:mb-12 font-light text-center"
                  variants={itemVariants}
                >
                  <span className="font-semibold text-slate-900">Nilantheon</span>
                  <sup className="text-indigo-600">®</sup> transforms{' '}
                  <motion.span
                    className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%'],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    complex infrastructure
                  </motion.span>{' '}
                  into intelligent, compliant, and profitable ecosystems through:
                </motion.p>
                <motion.div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-12" variants={containerVariants}>
                  {features.map((feature, index) => (
                    <motion.div key={index} variants={cardVariants} whileHover="hover">
                      <div className="h-full bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className={`inline-flex p-3 mb-4 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-all`}>
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: easeInOut,
                              delay: index * 0.2,
                            }}
                          >
                            {feature.icon}
                          </motion.div>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-2">{feature.text}</h3>
                        <p className="text-slate-600 text-xs sm:text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="relative bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-indigo-100 shadow-inner overflow-visible"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="relative flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                    <motion.div
                      className="flex-shrink-0"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: easeInOut,
                      }}
                    >
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                    <div className="text-center md:text-left">
                      <p className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 sm:mb-2">Our mission</p>
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        Make sustainability the{' '}
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">most profitable</span> decision
                        your enterprise makes by converting carbon inefficiencies into measurable business value.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mb-24" variants={itemVariants}>
            <motion.h3 className="text-3xl md:text-4xl font-bold text-center mb-6" variants={itemVariants}>
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">The Sustainable Imperative</span>
            </motion.h3>
            <motion.p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12 leading-relaxed" variants={itemVariants}>
              Why enterprises can't afford to delay their sustainability transformation
            </motion.p>
            <motion.div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
              {stats.map((stat, index) => (
                <motion.div key={index} variants={cardVariants} whileHover="hover">
                  <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          duration: 0.6,
                          ease: easeOut,
                        }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">{stat.icon}</div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{stat.description}</p>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${stat.progress}%` } : {}}
                        transition={{
                          delay: 0.8 + index * 0.1,
                          duration: 1.5,
                          ease: easeOut,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;