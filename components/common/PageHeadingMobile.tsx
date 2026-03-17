interface PageHeadingMobileProps {
  children: React.ReactNode;
}

export function PageHeadingMobile({ children }: PageHeadingMobileProps) {
  return (
    <h2 className="text-xl font-extrabold text-black dark:text-white">
      {children}
    </h2>
  );
}
