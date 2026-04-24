import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    root: "flex items-center gap-8",
    left: "flex flex-none items-center gap-4",
    right: "flex flex-auto items-center justify-end gap-4",
  },
});

type AppHeaderLayoutProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
};

export function AppHeaderLayout({
  className,
  leftClassName,
  rightClassName,
  left,
  right,
}: AppHeaderLayoutProps) {
  const s = styles();

  return (
    <div className={s.root({ className })}>
      <div className={s.left({ className: leftClassName })}>{left}</div>
      <div className={s.right({ className: rightClassName })}>{right}</div>
    </div>
  );
}
