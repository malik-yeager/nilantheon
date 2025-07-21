import { Mail, Phone, MapPin} from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Combined Hero & Contact Section */}
        <section className="py-24 px-6 lg:px-20 bg-gradient-to-br from-purple-700/20 via-slate-800/30 to-slate-900/30 rounded-xl shadow-lg ">
          <div className="max-w-6xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Ready to Build Something Incredible?</h1>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Contact Info */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 p-6 bg-slate-800/40 rounded-lg border border-slate-700/50 hover:bg-slate-800/60 transition-colors duration-300">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Email Us</div>
                    <div className="font-semibold text-white">keerti@nilantheon.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 bg-slate-800/40 rounded-lg border border-slate-700/50 hover:bg-slate-800/60 transition-colors duration-300">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Call Us</div>
                    <div className="font-semibold text-white">+91 8999899989</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 bg-slate-800/40 rounded-lg border border-slate-700/50 hover:bg-slate-800/60 transition-colors duration-300">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Visit Us</div>
                    <div className="font-semibold text-white">Bangalore, KA</div>
                  </div>
                </div>
              </div>

              {/* Right Side - About Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">About Nilantheon</h2>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    We craft purposeful digital solutions that connect, engage, and inspire. Our team of creators, coders, and strategists work together to turn your ideas into impactful experiences.
                  </p>
                  <p className="text-gray-400 mb-8">
                    Reach out and let's start turning your ideas into digital reality.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg">
                    Start Your Project
                  </button>
                  <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
                    View Our Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 lg:px-20 border-t border-slate-800 text-center text-gray-400 text-sm">
          <div className="flex justify-center flex-wrap gap-6 mb-4">
            <a href="#" className="hover:text-blue-400">Our Products</a>
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-400">Contact Us</a>
          </div>
          <p>© {new Date().getFullYear()} Nilantheon. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}