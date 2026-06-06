import { DisclosurePanel } from "@/ui/Disclosure";

export function AccordionPanel({ children }: { children: React.ReactNode }) {
  return <DisclosurePanel className="px-6">{children}</DisclosurePanel>;
}
