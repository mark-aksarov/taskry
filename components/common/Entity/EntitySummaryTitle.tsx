export const titleStyles =
  "text-xl font-extrabold text-black dark:text-white max-md:text-center";

interface EntitySummaryTitleProps {
  children: React.ReactNode;
}

export function EntitySummaryTitle({ children }: EntitySummaryTitleProps) {
  return <h2 className={titleStyles}>{children}</h2>;
}
