export interface UserDetailAltProps {
  bioSlot: React.ReactNode;
  fullNameSlot: React.ReactNode;
  positionSlot: React.ReactNode;
  emailSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  addressSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  birthdateSlot: React.ReactNode;
}

export function UserDetailAltLayout({
  bioSlot,
  fullNameSlot,
  positionSlot,
  emailSlot,
  phoneNumberSlot,
  addressSlot,
  publicLinkSlot,
  birthdateSlot,
}: UserDetailAltProps) {
  return (
    <div className="flex flex-col max-md:gap-4 md:gap-6">
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
