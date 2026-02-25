import { Link, LinkProps } from "@/components/ui/Link";
import { twMerge } from "tailwind-merge";

export function DetailLink({ className, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={twMerge("pressed:underline hover:underline", className)}
    />
  );
}
