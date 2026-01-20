import { Card } from "../../common/Card";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-6 p-6 max-md:min-h-full max-md:w-full max-md:rounded-none max-md:shadow-none md:w-[460px]">
      {children}
    </Card>
  );
}
