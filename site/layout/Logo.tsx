import { BaseLink } from "@/ui/Link";
import { tv } from "tailwind-variants";
import { CheckCircle2 } from "lucide-react";

const logoStyles = tv({
  slots: {
    root: "flex w-fit items-center gap-3",
    iconWrap:
      "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600",
    icon: "h-5 w-5 text-white",
    text: "text-xl font-extrabold text-black dark:text-white",
  },
});

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const styles = logoStyles();

  return (
    <BaseLink href="/" className={styles.root({ className })}>
      <div className={styles.iconWrap()}>
        <CheckCircle2 className={styles.icon()} />
      </div>
      <div className={styles.text()}>Taskry</div>
    </BaseLink>
  );
}
