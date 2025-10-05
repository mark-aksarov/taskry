interface ToolbarMobileHeadingProps {
  children: React.ReactNode;
}

export function ToolbarMobileHeading({ children }: ToolbarMobileHeadingProps) {
  return <h2 className="mr-auto text-xl font-extrabold">{children}</h2>;
}
