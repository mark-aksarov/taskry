interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  children: React.ReactNode;
}

export function PageSection({
  tag: Tag = "section",
  children,
}: PageSectionProps) {
  return <Tag className="flex flex-col gap-4">{children}</Tag>;
}
