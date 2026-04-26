import { HomePage } from "./HomePage";
import { signInAsDemoUser } from "@/lib/actions/auth/signInAsDemoUser";

export default function AppHomePage() {
  return <HomePage signInAsDemoUser={signInAsDemoUser} />;
}
