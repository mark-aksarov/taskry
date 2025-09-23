interface CardHeadingProps {
  children: React.ReactNode;
}

export const CardHeading = ({ children }: CardHeadingProps) => {
  return (
    <h3 className="text-base font-bold text-black dark:text-white">
      {children}
    </h3>
  );
};
