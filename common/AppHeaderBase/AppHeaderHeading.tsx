interface AppHeaderHeadingProps {
  children: React.ReactNode;
}

export function AppHeaderHeading({ children }: AppHeaderHeadingProps) {
  return (
    <h2 className="text-xl font-extrabold text-black dark:text-white">
      {children}
    </h2>
  );
}
