interface AppHeaderHeadingProps {
  children: React.ReactNode;
}

export function AppHeaderHeading({ children }: AppHeaderHeadingProps) {
  return <h2 className="text-xl font-extrabold">{children}</h2>;
}
