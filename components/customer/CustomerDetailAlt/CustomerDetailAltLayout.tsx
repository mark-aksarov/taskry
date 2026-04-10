export interface CustomerDetailAltLayoutProps {
  bioSlot: React.ReactNode;
  fullNameSlot: React.ReactNode;
  emailSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  companySlot: React.ReactNode;
}

export function CustomerDetailAltLayout({
  bioSlot,
  fullNameSlot,
  emailSlot,
  phoneNumberSlot,
  publicLinkSlot,
  companySlot,
}: CustomerDetailAltLayoutProps) {
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
