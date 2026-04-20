interface AppHeaderLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  mobile: React.ReactNode;
}

export function AppHeaderLayout({ left, right, mobile }: AppHeaderLayoutProps) {
  return (
    <>
      <div className="flex items-center gap-8 max-md:hidden">
        <div className="flex flex-none items-center gap-4">{left}</div>

        <div className="flex flex-auto items-center justify-end gap-4">
          {right}
        </div>
      </div>

      <div className="flex items-center justify-between md:hidden">
        {mobile}
      </div>
    </>
  );
}
