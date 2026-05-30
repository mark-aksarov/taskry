import { HomePage } from "./HomePage";
import { signOut } from "@/lib/actions/auth/signOut";
import { SwitchToDemoModal } from "@/site/home/SwitchToDemoModal";
import { ModalManagerProvider } from "@/common/ModalManagerContext";

export default function AppHomePage() {
  return (
    <ModalManagerProvider>
      <HomePage signOut={signOut} />
      <SwitchToDemoModal signOut={signOut} />
    </ModalManagerProvider>
  );
}
