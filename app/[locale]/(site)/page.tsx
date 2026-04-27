import { HomePage } from "./HomePage";
import { signOut } from "@/lib/actions/auth/signOut";
import { SwitchToDemoModal } from "@/site/home/SwitchToDemoModal";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { CtaActionsContainer } from "@/site/home/CtaActionsContainer";

export default function AppHomePage() {
  return (
    <ModalManagerProvider>
      <HomePage ctaActionsContainer={<CtaActionsContainer />} />
      <SwitchToDemoModal signOut={signOut} />
    </ModalManagerProvider>
  );
}
