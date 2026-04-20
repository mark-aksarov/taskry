import { FormBaseModalDialog } from "./FormBaseModal";

export function FilterModalDialog({ children }: { children: React.ReactNode }) {
  return (
    <FormBaseModalDialog className="md:h-[calc(100dvh-64px)]">
      {children}
    </FormBaseModalDialog>
  );
}
