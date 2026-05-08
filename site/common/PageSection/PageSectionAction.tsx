import { Button, ButtonProps, ButtonLink, ButtonLinkProps } from "@/ui/Button";

export const styles = "justify-center rounded-xl py-3 max-sm:w-full";

export function PageSectionActionButton(props: ButtonProps) {
  return <Button size="large" className={styles} {...props} />;
}

export function PageSectionActionLink(props: ButtonLinkProps) {
  return <ButtonLink size="large" className={styles} {...props} />;
}
