import { routing } from "@/i18n/routing";
import messagesEn from "./messages/en";
import messagesRu from "./messages/ru";

type CommonKeys<A, B> = {
  [K in keyof A & keyof B]: A[K] & B[K];
};

type Messages = CommonKeys<typeof messagesEn, typeof messagesRu>;

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
