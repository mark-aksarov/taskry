export interface ClientDetailAltLayoutProps {
  bioSlot: React.ReactNode;
  fullNameSlot: React.ReactNode;
  emailSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  companySlot: React.ReactNode;
}

export function ClientDetailAltLayout({
  bioSlot,
  fullNameSlot,
  emailSlot,
  phoneNumberSlot,
  publicLinkSlot,
  companySlot,
}: ClientDetailAltLayoutProps) {
  return (
    <div className="flex flex-col max-md:gap-4 md:gap-6">
      {bioSlot}
      {fullNameSlot}
      {emailSlot}
      {companySlot}
      {phoneNumberSlot}
      {publicLinkSlot}
    </div>
  );
}
