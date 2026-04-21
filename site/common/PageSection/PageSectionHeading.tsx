interface PageSectionHeadingProps {
  children: React.ReactNode;
}

export function PageSectionHeading({ children }: PageSectionHeadingProps) {
  return (
    <h2 className="mb-4 font-bold text-black max-md:text-3xl md:text-4xl dark:text-white">
      {children}
    </h2>
  );
}
