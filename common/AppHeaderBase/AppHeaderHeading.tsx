interface AppHeaderHeadingProps {
  children: React.ReactNode;
}

export function AppHeaderHeading({ children }: AppHeaderHeadingProps) {
  return (
    <h2 className="text-xl font-extrabold text-(--text-primary)">{children}</h2>
  );
}
