import { Card } from "../Card";

export function EntityCard({ children }: { children: React.ReactNode }) {
  return <Card className="flex flex-col gap-4">{children}</Card>;
}
