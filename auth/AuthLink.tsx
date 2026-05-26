import { Link } from "@/ui/Link";
import { twMerge } from "tailwind-merge";
import { LinkProps } from "react-aria-components";

interface AuthLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
}

export function AuthLink({ className, ...props }: AuthLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge(className, "font-bold")}
      variant="primary"
    />
  );
}
