import { HomePage } from "./HomePage";
import { ModalManagerProvider } from "@/common/ModalManagerContext";

export default function AppHomePage() {
  return (
    <ModalManagerProvider>
      <HomePage />
    </ModalManagerProvider>
  );
}
