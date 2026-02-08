interface FormBaseBodyProps {
  children: React.ReactNode;
}

export function FormBaseBody({ children }: FormBaseBodyProps) {
  return (
    <div className="flex flex-auto flex-col gap-4 pt-4 max-md:px-4 md:px-5 md:pt-5">
      {children}
    </div>
  );
}
