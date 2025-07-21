import { Player } from '@lottiefiles/react-lottie-player';

const MetaSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
    className="h-16 w-auto"
    fill="currentColor"
  >
    <path
      fill="#1877F2"
      d="M200 0C89.6 0 0 89.6 0 200c0 99.2 72.4 181.3 167.1 197.9V259.4h-50.3v-59.4h50.3v-45.2c0-49.8 29.6-77.4 75-77.4 21.8 0 44.7 3.9 44.7 3.9v49.1h-25.2c-24.8 0-32.6 15.4-32.6 31.2v37.4h55.5l-8.9 59.4h-46.6v138.5C327.6 381.3 400 299.2 400 200 400 89.6 310.4 0 200 0z"
    />
  </svg>
);

export default function Information() {
  const companies = [
    "Google", "Meta", "Hyundai", "Netflix", "Stripe", "Spotify", "Microsoft", "Tesla"
  ];

  return (
    <section className="relative min-h-screen flex items-center hero-bg">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60" />

      {/* Lottie Animation */}
      <div className="absolute -bottom-42 right-8 w-[280px] h-[280px] z-20 pointer-events-none">
        <Player
          autoplay
          loop
          src="/assets/ai-lottie.json"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Powering Innovation
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Join the world's most forward-thinking companies in revolutionizing the future
          </p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {companies.map((name, index) => (
            <div
              key={`${name}-${index}`}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-indigo-400 transition-all duration-500 hover:bg-white/70 hover:scale-105 hover:-translate-y-2 shadow-md">
                <div className="relative flex items-center justify-center h-14 mb-4 z-10">
                  <div className="opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                    <MetaSVG />
                  </div>
                </div>
                <p className="text-center text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300 z-10 relative">
                  {name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
