import { Disclosure } from "@/ui/Disclosure";

export function AccordionItem({ children }: { children: React.ReactNode }) {
  return (
    <Disclosure className="rounded-xl bg-white dark:bg-gray-800">
      {children}
    </Disclosure>
  );
}
