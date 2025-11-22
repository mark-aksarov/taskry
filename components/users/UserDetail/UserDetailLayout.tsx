import { DetailRow } from "@/components/common/Detail";

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
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-4">
      <DetailRow className={rowStyles}>{bioSlot}</DetailRow>

      <DetailRow className={rowStyles}>
        {fullNameSlot}
        {positionSlot}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {emailSlot}
        {phoneNumberSlot}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {addressSlot}
        {publicLinkSlot}
      </DetailRow>

      <DetailRow className={rowStyles}>{birthdateSlot}</DetailRow>
    </div>
  );
}
