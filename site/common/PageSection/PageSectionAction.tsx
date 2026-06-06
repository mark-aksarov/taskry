import { Button, ButtonProps, ButtonLink, ButtonLinkProps } from "@/ui/Button";
import { twMerge } from "tailwind-merge";

export const styles = "justify-center rounded-xl py-3 max-sm:w-full";

export function PageSectionActionButton({ className, ...props }: ButtonProps) {
  return (
    <Button size="large" className={twMerge(styles, className)} {...props} />
  );
}

export function PageSectionActionLink({
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <ButtonLink
      size="large"
      className={twMerge(styles, className)}
      {...props}
    />
  );
}
