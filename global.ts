import { routing } from "@/i18n/routing";
import messagesEn from "./messages/en";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messagesEn;
  }
}
