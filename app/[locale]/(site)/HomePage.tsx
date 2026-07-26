import { FaqSection } from "@/site/home/FaqSection";
import { DocsSection } from "@/site/home/DocsSection";
import { IntroSection } from "@/site/home/IntroSection";
import { RoadmapSection } from "@/site/home/RoadmapSection";
import { FeatureSection } from "@/site/home/FeatureSection";
import { FinalCtaSection } from "@/site/home/FinalCtaSection";
import { SecuritySection } from "@/site/home/SecuritySection";
import { AdvantagesSection } from "@/site/home/AdvantagesSection";

export function HomePage() {
  return (
    <main>
      <IntroSection />
      <FeatureSection />
      <DocsSection />
      <SecuritySection />
      <AdvantagesSection />
      <RoadmapSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
