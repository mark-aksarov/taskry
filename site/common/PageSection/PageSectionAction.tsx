import { ButtonLink, ButtonLinkProps } from "@/ui/Button";
import { twMerge } from "tailwind-merge";

export function PageSectionActionLink({
  className,
  size = "large",
  ...props
}: ButtonLinkProps) {
  return (
    <ButtonLink
      size={size}
      className={twMerge(
        "justify-center rounded-xl py-3 max-sm:w-full",
        className,
      )}
      {...props}
    />
  );
}
