import { CustomerDetailAltLayout } from "./CustomerDetailAltLayout";
import { CustomerBioDetailInfoAlt } from "./CustomerBioDetailInfoAlt";
import { CustomerEmailDetailInfoAlt } from "./CustomerEmailDetailInfoAlt";
import { CustomerCompanyDetailInfoAlt } from "./CustomerCompanyDetailInfoAlt";
import { CustomerFullNameDetailInfoAlt } from "./CustomerFullNameDetailInfoAlt";
import { CustomerPublicLinkDetailInfoAlt } from "./CustomerPublicLinkDetailInfoAlt";
import { CustomerPhoneNumberDetailInfoAlt } from "./CustomerPhoneNumberDetailInfoAlt";

export interface CustomerDetailAltProps {
  fullName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  company?: {
    name: string;
  };
}

export function CustomerDetailAlt({
  bio,
  fullName,
  email,
  phoneNumber,
  publicLink,
  company,
}: CustomerDetailAltProps) {
  return (
    <CustomerDetailAltLayout
      bioSlot={<CustomerBioDetailInfoAlt bio={bio} />}
      fullNameSlot={<CustomerFullNameDetailInfoAlt fullName={fullName} />}
      emailSlot={<CustomerEmailDetailInfoAlt email={email} />}
      phoneNumberSlot={
        <CustomerPhoneNumberDetailInfoAlt phoneNumber={phoneNumber} />
      }
      companySlot={<CustomerCompanyDetailInfoAlt company={company} />}
      publicLinkSlot={
        <CustomerPublicLinkDetailInfoAlt publicLink={publicLink} />
      }
    />
  );
}
