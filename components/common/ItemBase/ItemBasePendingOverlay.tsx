interface ItemBasePendingOverlayProps {
  isPending: boolean;
  children: React.ReactNode;
}

export function ItemBasePendingOverlay({
  isPending,
  children,
}: ItemBasePendingOverlayProps) {
  return (
    <div className={isPending ? "pointer-events-none opacity-50" : undefined}>
      {children}
    </div>
  );
}
