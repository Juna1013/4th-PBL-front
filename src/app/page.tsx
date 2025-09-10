import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ArchitectureSection from '@/components/home/ArchitectureSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <CTASection />
    </div>
  );
}