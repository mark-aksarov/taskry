import { ActionState } from "@/lib/actions/types";
import { DocsSection } from "@/site/home/DocsSection";
import { IntroSection } from "@/site/home/IntroSection";
import { FeatureSection } from "@/site/home/FeatureSection";
import { FinalCtaSection } from "@/site/home/FinalCtaSection";

interface HomePageProps {
  signInAsDemoUser: () => Promise<ActionState>;
}

export function HomePage({ signInAsDemoUser }: HomePageProps) {
  return (
    <main>
      <IntroSection signInAsDemoUser={signInAsDemoUser} />
      <FeatureSection />
      <DocsSection />
      <FinalCtaSection signInAsDemoUser={signInAsDemoUser} />
    </main>
  );
}
