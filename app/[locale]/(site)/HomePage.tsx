import { DocsSection } from "@/site/sections/DocsSection";
import { IntroSection } from "@/site/sections/IntroSection";
import { FeatureSection } from "@/site/sections/FeatureSection";
import { FinalCtaSection } from "@/site/sections/FinalCtaSection";

export function HomePage() {
  return (
    <main>
      <IntroSection />
      <FeatureSection />
      <DocsSection />
      <FinalCtaSection />
    </main>
  );
}
