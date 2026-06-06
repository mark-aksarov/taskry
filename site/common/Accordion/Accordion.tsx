import { DisclosureGroup } from "@/ui/Disclosure";

export function Accordion({ children }: { children: React.ReactNode }) {
  return (
    <DisclosureGroup className="flex w-full max-w-[800px] flex-col gap-4">
      {children}
    </DisclosureGroup>
  );
}
