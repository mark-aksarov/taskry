import { Card } from "../Card";

export function GridItem({ children }: { children: React.ReactNode }) {
  return <Card className="flex flex-col gap-4 rounded-md">{children}</Card>;
}
