import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Topbar from '../components/layout/Topbar';

const Hero = lazy(() => import('../pages/Hero'));
const About = lazy(() => import('../pages/About'));
const Information = lazy(() => import('./Information'));
const PremiumProductsSection = lazy(() => import('./products'));
const WhyChooseUs = lazy(() => import('./whychooseus'));
const AIProductsSection = lazy(() => import('./circle'));
const AIJourney = lazy(() => import('./corosel'));

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ minHeight: '40vh' }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="hero-bg text-white">
      <Topbar />
      <Suspense fallback={<div className="hero-bg" style={{ minHeight: '40vh' }}></div>}>
        <AnimatedSection>
          <Hero />
        </AnimatedSection>
        <AnimatedSection>
          <Information />
        </AnimatedSection>
        <div id="products-section">
          <AnimatedSection>
            <PremiumProductsSection />
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <AIProductsSection />
        </AnimatedSection>
        <AnimatedSection>
          <AIJourney />
        </AnimatedSection>
        <AnimatedSection>
          <WhyChooseUs />
        </AnimatedSection>
        <AnimatedSection>
          <About />
        </AnimatedSection>
      </Suspense>
    </div>
  );
}
