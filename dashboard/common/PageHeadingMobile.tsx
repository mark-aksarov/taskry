interface PageHeadingMobileProps {
  children: React.ReactNode;
}

export function PageHeadingMobile({ children }: PageHeadingMobileProps) {
  return (
    <h2 className="py-2 text-xl font-extrabold text-(--text-primary)">
      {children}
    </h2>
  );
}
