export interface UserDetailProps {
  bioSlot: React.ReactNode;
  fullNameSlot: React.ReactNode;
  positionSlot: React.ReactNode;
  emailSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  addressSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  birthdateSlot: React.ReactNode;
}

export function UserDetailLayout({
  bioSlot,
  fullNameSlot,
  positionSlot,
  emailSlot,
  phoneNumberSlot,
  addressSlot,
  publicLinkSlot,
  birthdateSlot,
}: UserDetailProps) {
  return (
    <div className="flex flex-col gap-4">
      {bioSlot}
      {fullNameSlot}
      {positionSlot}
      {emailSlot}
      {phoneNumberSlot}
      {addressSlot}
      {publicLinkSlot}
      {birthdateSlot}
    </div>
  );
}
