export interface CustomerDetailLayoutProps {
  bioSlot: React.ReactNode;
  fullNameSlot: React.ReactNode;
  emailSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  companySlot: React.ReactNode;
}

export function CustomerDetailLayout({
  bioSlot,
  fullNameSlot,
  emailSlot,
  phoneNumberSlot,
  publicLinkSlot,
  companySlot,
}: CustomerDetailLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {bioSlot}
      {fullNameSlot}
      {emailSlot}
      {companySlot}
      {phoneNumberSlot}
      {publicLinkSlot}
    </div>
  );
}
