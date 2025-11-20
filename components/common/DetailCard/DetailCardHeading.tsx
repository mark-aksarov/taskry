export function DetailCardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-black max-lg:text-base max-lg:font-bold lg:text-lg lg:font-extrabold dark:text-white">
      {children}
    </h3>
  );
}
