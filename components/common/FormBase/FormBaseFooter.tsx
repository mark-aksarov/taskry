interface FormBaseFooterProps {
  children: React.ReactNode;
}

export function FormBaseFooter({ children }: FormBaseFooterProps) {
  return (
    <div className="sticky bottom-0 flex gap-4 border-t-1 border-gray-300 bg-white py-3 max-md:px-4 md:px-5 dark:border-gray-600 dark:bg-gray-800">
      {children}
    </div>
  );
}
