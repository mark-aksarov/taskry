import { DocsSection } from "@/site/home/DocsSection";
import { IntroSection } from "@/site/home/IntroSection";
import { FeatureSection } from "@/site/home/FeatureSection";
import { FinalCtaSection } from "@/site/home/FinalCtaSection";

interface HomePageProps {
  ctaActionsContainer: React.ReactNode;
}

export function HomePage({ ctaActionsContainer }: HomePageProps) {
  return (
    <main>
      <IntroSection ctaActionsContainer={ctaActionsContainer} />
      <FeatureSection />
      <DocsSection />
      <FinalCtaSection ctaActionsContainer={ctaActionsContainer} />
    </main>
  );
}
