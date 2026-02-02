import { DetailRow } from "@/components/common/Detail";

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
      <DetailRow>{bioSlot}</DetailRow>

      <DetailRow>
        {fullNameSlot}
        {emailSlot}
      </DetailRow>

      <DetailRow>
        {companySlot}
        {phoneNumberSlot}
      </DetailRow>

      <DetailRow>{publicLinkSlot}</DetailRow>
    </div>
  );
}
