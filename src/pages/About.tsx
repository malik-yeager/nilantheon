import { Mail} from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative bg-gray-900 py-12 overflow-visible">
      {/* Dots Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-semibold leading-tight pb-2">
            Ready to Build Something Incredible?
          </h1>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          {/* Left contact column */}
          <div className="space-y-4">
  <div className="flex items-start space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50">
    <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
    <div>
      <div className="text-xs text-gray-400 uppercase mb-1 font-semibold">EMAIL US</div>
      <a
        href="mailto:contact@nilantheon.com"
        className="text-sm hover:text-blue-400 transition-colors font-semibold"
      >
        contact@nilantheon.com
      </a>
    </div>
  </div>

  <div className="flex items-start space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50">
  <img 
    src="assets/linked_in.png" 
    alt="LinkedIn" 
    className="w-5 h-5 mt-0.5 flex-shrink-0"
  />
  <div>
    <div className="text-xs text-gray-400 uppercase mb-1 font-semibold">CONNECT WITH US</div>
    <a 
      href="https://linkedin.com/company/nilantheon" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-sm hover:text-sky-400 transition-colors font-semibold"
    >
      linkedin.com/company/nilantheon
    </a>
  </div>
</div>
</div>


          {/* Right about column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white font-semibold">About Nilantheon</h2>
            <p className="text-gray-300 text-sm leading-relaxed font-semibold">
            We believe sustainability isn’t just a moral choice—it’s a monetizable asset. Nilantheon transforms complex, wasteful infrastructure into efficient, compliant, and profitable ecosystems by using Digital Twins, AI-powered orchestration, and real-time emissions intelligence.  Our goal is simple: make sustainability the smartest financial decision for any enterprise.
            </p>
            <p className="text-gray-400 text-sm font-semibold">
              Reach out and let's start turning your ideas into digital reality.
            </p>
          </div>
        </div>
      </div>

      {/* Footer pushed to bottom */}
      <footer className="py-6 border-t border-slate-800 text-center text-xs text-gray-400 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-semibold">© {new Date().getFullYear()} Nilantheon. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}