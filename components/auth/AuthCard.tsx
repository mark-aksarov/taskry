import { Card } from "../common/Card";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex w-[460px] flex-col justify-center gap-6 p-6 max-md:h-full max-md:w-full max-md:rounded-none max-md:shadow-none">
      {children}
    </Card>
  );
}
