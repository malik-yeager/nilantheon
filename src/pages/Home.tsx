import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Topbar from '../components/layout/Topbar';
import { useLocation } from 'react-router-dom';
import Hero from '../pages/Hero';
import About from '../pages/About';
import PremiumProductsSection from './products';
import WhyChooseUs from './whychooseus';
import AIJourney from './corosel';
import AboutSection from './second';
import Four from './four';
import { CarbonCalculatorSection } from './calculator';
import { IndustrySolutionsSection } from './industry';

// Optimized ParticleField with reduced particles
const ParticleField = () => {
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-twinkle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

interface SectionWithBgProps {
  children: React.ReactNode;
  id?: string;
  hasParticles?: boolean;
}

const SectionWithBg = ({ children, id, hasParticles = true }: SectionWithBgProps) => {
  return (
    <section className="relative overflow-hidden" id={id}>
      {hasParticles && <ParticleField />}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />
      <div className="relative z-0 w-full">{children}</div>
    </section>
  );
};

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  return (
    <div className="text-white ">
      <Topbar />
      <section id="hero-section" className="relative overflow-hidden">
        <AnimatedSection>
          <Hero />
        </AnimatedSection>
      </section>
      <SectionWithBg id="second-section" hasParticles={false}>
        <AnimatedSection>
          <AboutSection />
        </AnimatedSection>
      </SectionWithBg>
      <SectionWithBg id="products-section" hasParticles={false}>
        <AnimatedSection>
          <PremiumProductsSection />
        </AnimatedSection>
      </SectionWithBg>
      <SectionWithBg id="calculator-section" hasParticles={false}>
        <AnimatedSection>
          <CarbonCalculatorSection />
        </AnimatedSection>
      </SectionWithBg>
      <SectionWithBg id="industry-section" hasParticles={false}>
        <AnimatedSection>
          <IndustrySolutionsSection />
        </AnimatedSection>
      </SectionWithBg>
      <SectionWithBg id="four-section" hasParticles={false}>
        <AnimatedSection>
          <Four />
        </AnimatedSection>
      </SectionWithBg>
      <SectionWithBg id="corosel-section" hasParticles={false}>
        <AnimatedSection>
          <AIJourney />
        </AnimatedSection>
      </SectionWithBg>
      <SectionWithBg id="whychooseus-section" hasParticles={false}>
        <AnimatedSection>
          <WhyChooseUs />
        </AnimatedSection>
      </SectionWithBg>
      <SectionWithBg id="about-section" hasParticles={false}>
        <AnimatedSection>
          <About />
        </AnimatedSection>
      </SectionWithBg>
    </div>
  );
};

export default Home;