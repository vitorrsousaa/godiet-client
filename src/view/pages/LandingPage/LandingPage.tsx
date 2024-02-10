import { Faq } from './Faq';
import { Features } from './Features';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Pricing } from './Pricing';

export function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Footer />
    </>
  );
}
