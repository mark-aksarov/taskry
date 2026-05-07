interface AuthCardFooterProps {
  text: string;
  link: React.ReactNode;
}

export function AuthCardFooter({ text, link }: AuthCardFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-1.5">
      <div className="text-sm font-normal text-(--text-primary)">{text}</div>
      {link}
    </div>
  );
}
