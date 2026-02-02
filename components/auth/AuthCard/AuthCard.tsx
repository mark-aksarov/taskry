import { Card } from "../../common/Card";

interface AuthCardProps {
  "data-test"?: string;
  children: React.ReactNode;
}

export function AuthCard({ "data-test": dataTest, children }: AuthCardProps) {
  return (
    <Card
      data-test={dataTest}
      className="flex flex-col gap-6 p-6 max-md:min-h-full max-md:w-full max-md:rounded-none max-md:shadow-none md:w-[460px]"
    >
      {children}
    </Card>
  );
}
