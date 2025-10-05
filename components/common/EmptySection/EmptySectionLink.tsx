import { Link } from "@/components/ui/Link";
import { CirclePlus } from "lucide-react";

interface EmptySectionLinkProps {
  href: string;
  children: React.ReactNode;
}

export function EmptySectionLink({ href, children }: EmptySectionLinkProps) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {children}
    </Link>
  );
}
