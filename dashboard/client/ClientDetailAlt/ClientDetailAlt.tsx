import { ClientDetailAltLayout } from "./ClientDetailAltLayout";
import { ClientBioDetailInfoAlt } from "./ClientBioDetailInfoAlt";
import { ClientEmailDetailInfoAlt } from "./ClientEmailDetailInfoAlt";
import { ClientCompanyDetailInfoAlt } from "./ClientCompanyDetailInfoAlt";
import { ClientFullNameDetailInfoAlt } from "./ClientFullNameDetailInfoAlt";
import { ClientPublicLinkDetailInfoAlt } from "./ClientPublicLinkDetailInfoAlt";
import { ClientPhoneNumberDetailInfoAlt } from "./ClientPhoneNumberDetailInfoAlt";

export interface ClientDetailAltProps {
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  company?: {
    name: string;
  };
}

export function ClientDetailAlt({
  bio,
  fullName,
  email,
  phoneNumber,
  publicLink,
  company,
}: ClientDetailAltProps) {
  return (
    <ClientDetailAltLayout
      bioSlot={<ClientBioDetailInfoAlt bio={bio} />}
      fullNameSlot={<ClientFullNameDetailInfoAlt fullName={fullName} />}
      emailSlot={<ClientEmailDetailInfoAlt email={email} />}
      phoneNumberSlot={
        <ClientPhoneNumberDetailInfoAlt phoneNumber={phoneNumber} />
      }
      companySlot={<ClientCompanyDetailInfoAlt company={company} />}
      publicLinkSlot={
        <ClientPublicLinkDetailInfoAlt publicLink={publicLink} />
      }
    />
  );
}
