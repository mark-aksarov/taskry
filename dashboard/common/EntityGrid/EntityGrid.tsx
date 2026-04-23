import { tv } from "tailwind-variants";
import { ViewMode } from "../ViewMode";

const styles = tv({
  base: "flex flex-col max-md:gap-4 md:gap-2",

  variants: {
    viewMode: {
      list: "",
      grid: [
        "md:grid md:gap-4",
        "md:@max-3xl:grid-cols-2",
        "md:@3xl:@max-5xl:grid-cols-3",
        "md:@5xl:@max-7xl:grid-cols-4",
        "md:@7xl:grid-cols-5",
      ],
    },
  },

  defaultVariants: {
    viewMode: "list",
  },
});

interface EntityGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  viewMode?: ViewMode;
  children: React.ReactNode;
}

export function EntityGrid({
  className,
  viewMode = "list",
  children,
}: EntityGridProps) {
  return (
    <div data-test="entity-grid" className="@container">
      <div className={styles({ className, viewMode })}>{children}</div>
    </div>
  );
}
