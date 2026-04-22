import { Badge } from "@/ui/Badge";

export function IntroBadge() {
  return (
    <Badge
      color="blue"
      className="gap-2 px-4 py-2 text-sm font-semibold max-sm:self-start sm:self-center"
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500 dark:bg-blue-300" />
      Менеджер управления задачами
    </Badge>
  );
}
