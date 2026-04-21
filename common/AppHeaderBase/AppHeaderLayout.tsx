interface AppHeaderLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function AppHeaderLayout({ left, right }: AppHeaderLayoutProps) {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-none items-center gap-4">{left}</div>

      <div className="flex flex-auto items-center justify-end gap-4">
        {right}
      </div>
    </div>
  );
}
