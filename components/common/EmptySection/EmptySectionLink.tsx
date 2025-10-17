import { Link } from "@/components/ui";
import { CirclePlus } from "lucide-react";

interface EmptySectionLinkProps {
  href: string;
  children: React.ReactNode;
}

export function EmptySectionLink({ href, children }: EmptySectionLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-500 active:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 dark:active:text-blue-600"
    >
      <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {children}
    </Link>
  );
}
