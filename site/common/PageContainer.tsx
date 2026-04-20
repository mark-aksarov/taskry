interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] max-md:px-4 md:px-6">
      {children}
    </div>
  );
}
