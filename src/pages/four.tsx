import { Timeline } from "../components/ui/timeline";
import { motion } from "motion/react";
import { useMemo } from "react";
import { 
  Cpu, 
  Brain, 
  Leaf, 
  BarChart3, 
  Monitor, 
  Code, 
  Award,
  Layers,
  Users,
  Building,
  Zap
} from "lucide-react";

const Four = () => {
  const timelineData = useMemo(() => [
    {
      title: "Platform Features",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800"
            >
              <Cpu className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Dynamic Digital Twins</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">GPU-free, browser-native technology</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800"
            >
              <Brain className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">AI PPM</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Preventive Maintenance automation</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
            >
              <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Carbon Intelligence Layer</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Device-level insight and optimization</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800"
            >
              <BarChart3 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Green Stat</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">ESG metrics reporting dashboard</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800"
            >
              <Monitor className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Browser-Based Dashboards</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Historical + real-time data visualization</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800"
            >
              <Code className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Low-Code Integration</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Cloud/sensor agnostic platform</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border-2 border-green-200 dark:border-green-700"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Award className="w-8 h-8 text-green-600" />
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Dual Impact</h4>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-lg">
              Achieve both <span className="font-semibold text-blue-600">compliance</span> and <span className="font-semibold text-green-600">carbon credit monetization</span> in one integrated solution.
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      title: "Enterprise Solutions",
      content: (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Flexible, Scalable. Built for Enterprise.
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.03, rotateY: 2 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-lg"
            >
              <Layers className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h4 className="text-lg font-bold text-center text-neutral-800 dark:text-neutral-200 mb-3">
                SaaS Tiers
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm">
                Flexible pricing based on data ingestion volume
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotateY: 2 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-lg"
            >
              <Zap className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <h4 className="text-lg font-bold text-center text-neutral-800 dark:text-neutral-200 mb-3">
                One-Time Setup
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm">
                Complete implementation and integration service
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotateY: 2 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-700 shadow-lg"
            >
              <Building className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <h4 className="text-lg font-bold text-center text-neutral-800 dark:text-neutral-200 mb-3">
                Ongoing Support
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm">
                Continuous support with AI model updates
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Our Founders",
      content: (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Expert Leadership Team
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Nilantheon® was created by a cross-disciplinary team with <span className="font-bold text-blue-600">20+ years</span> of combined expertise.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-lg"
            >
              <Brain className="w-10 h-10 text-purple-600 mb-4" />
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                AI-Powered Digital Transformation
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Leading organizations through intelligent automation and data-driven insights
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-lg"
            >
              <Building className="w-10 h-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                Smart City Execution
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Implementing large-scale urban technology solutions and infrastructure
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-700 shadow-lg md:col-span-2"
            >
              <Users className="w-10 h-10 text-green-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2 text-center">
                Multi-Sector IT/OT Integration
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-3xl mx-auto">
                Bridging information technology and operational technology across industries including manufacturing, energy, healthcare, and smart infrastructure
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 text-center p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-indigo-200 dark:border-indigo-700"
          >
            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
              Ready to Transform Your Operations?
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-lg">
              Experience the power of intelligent automation, sustainability insights, and enterprise-grade scalability.
            </p>
          </motion.div>
        </div>
      ),
    },
  ], []);

  return (
    <div className="relative z-10 w-full py-10" id="industry-use-cases">
      <div className="w-full">
        <Timeline data={timelineData} />
      </div>
    </div>
  );
};

export default Four;