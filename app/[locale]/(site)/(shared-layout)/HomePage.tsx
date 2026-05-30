import { ActionState } from "@/lib/actions/types";
import { DocsSection } from "@/site/home/DocsSection";
import { IntroSection } from "@/site/home/IntroSection";
import { FeatureSection } from "@/site/home/FeatureSection";
import { FinalCtaSection } from "@/site/home/FinalCtaSection";

interface HomePageProps {
  signOut: () => Promise<ActionState>;
}

export function HomePage({ signOut }: HomePageProps) {
  return (
    <main>
      <IntroSection signOut={signOut} />
      <FeatureSection />
      <DocsSection />
      <FinalCtaSection signOut={signOut} />
    </main>
  );
}
