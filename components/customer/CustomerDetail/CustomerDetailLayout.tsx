import { DetailRow } from "@/components/common/Detail";

export interface CustomerDetailProps {
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
}: CustomerDetailProps) {
  return (
    <div className="flex flex-col gap-4">
      <DetailRow>{bioSlot}</DetailRow>

      <DetailRow>
        {fullNameSlot}
        {emailSlot}
      </DetailRow>

      <DetailRow>
        {emailSlot}
        {phoneNumberSlot}
      </DetailRow>

      <DetailRow>
        {publicLinkSlot}
        {companySlot}
      </DetailRow>
    </div>
  );
}
