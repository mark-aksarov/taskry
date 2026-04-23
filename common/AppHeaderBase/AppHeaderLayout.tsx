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
};

export function AppHeaderLayout({ left, right }: AppHeaderLayoutProps) {
  const s = styles();

  return (
    <div className={s.root()}>
      <div className={s.left()}>{left}</div>
      <div className={s.right()}>{right}</div>
    </div>
  );
}
