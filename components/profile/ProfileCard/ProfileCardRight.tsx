interface ProfileCardRightProps {
  children: React.ReactNode;
}

export function ProfileCardRight({ children }: ProfileCardRightProps) {
  return (
    <div className="flex w-[20rem] flex-none flex-col gap-6 px-4 py-6">
      {children}
    </div>
  );
}
