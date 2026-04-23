export type NavigationItemProps = {
  isActive?: boolean;
  variant?: "primary" | "secondary";
  iconLeft?: React.ReactNode;
  label: React.ReactNode;
  className?: string;
};
