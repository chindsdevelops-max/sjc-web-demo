import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowWeWork from '@/components/HowWeWork';
import RateCalculator from '@/components/RateCalculator';
import ConciergeCalculator from '@/components/ConciergeCalculator';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <HowWeWork />
      <RateCalculator />
      <ConciergeCalculator />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
