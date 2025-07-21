import { motion } from 'framer-motion';

const techPillars = [
  {
    title: 'CuttingEdge AI Technology',
    description: 'Harness the power of machine learning and neural networks to transform your business.',
    icon: '🤖',
  },
  {
    title: 'Industry Innovation',
    description: 'Adaptable AI tools driving results in finance, healthcare, manufacturing, and more.',
    icon: '🏭',
  },
  {
    title: 'FutureReady Solutions',
    description: 'Scalable AI implementations built for tomorrow challenges.',
    icon: '🚀',
  },
];

const services = [
  'Predictive Analytics',
  'Machine Learning Automation',
  'Natural Language Processing (NLP)',
  'Advanced Computer Vision',
];

export default function NextGenOverview() {
  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Animated Background Elements (from products section) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
      </div>
      {/* Grid overlay (from products section) */}
      <div className="absolute inset-0 grid-overlay opacity-60" />
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">

        {/* Header */}
        <div className="text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            NextGen AI Solutions for Business Transformation
          </motion.h2>
        </div>

        {/* Tech Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techPillars.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-gradient-to-br from-white/90 to-slate-50/80 rounded-2xl p-8 border border-white/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-600 bg-clip-text text-transparent leading-tight">{item.title}</h3>
              <p className="text-slate-600 text-base font-medium leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* About + Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">About Us: Your Trusted AI Partner</h3>
            <p className="text-gray-700 mb-4">
              We're a mission-driven team with deep expertise in responsible, ethical AI—
              committed to solving real-world business challenges.
            </p>
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {services.map((service) => (
              <div
                key={service}
                className="bg-white/70 p-4 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-lg font-bold">●</span>
                  <span className="text-gray-800 font-medium text-sm">{service}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}