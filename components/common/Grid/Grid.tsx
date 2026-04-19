import { ViewMode } from "../ViewMode";
import { twMerge } from "tailwind-merge";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  viewMode?: ViewMode;
  children: React.ReactNode;
}

export function Grid({ className, viewMode, children }: GridProps) {
  return (
    <div data-test="entity-grid" className="@container">
      <div
        className={twMerge(
          "flex flex-col max-md:gap-4 md:gap-2",

          //Grid mode only (from md and up)
          viewMode === "grid" &&
            [
              "md:grid md:gap-4",
              "md:@max-3xl:grid-cols-2",
              "md:@3xl:@max-5xl:grid-cols-3",
              "md:@5xl:@max-7xl:grid-cols-4",
              "md:@7xl:grid-cols-5",
            ].join(" "),
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
