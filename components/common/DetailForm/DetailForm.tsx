import { RACForm } from "@/components/ui";

export function DetailForm({ children }: { children: React.ReactNode }) {
  return (
    <RACForm className="flex w-[350px] flex-col gap-4">{children}</RACForm>
  );
}
