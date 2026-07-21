import { Phone } from "lucide-react";
import { GridItemContactText } from "./GridItemContactText";
import { GridItemContactLink, GridItemContact } from "./GridItemContact";
import { GridItemContactIconWrapper } from "./GridItemContactIconWrapper";
import { useTranslations } from "next-intl";

interface GridItemPhoneNumberProps {
  phoneNumber?: string;
}

export function GridItemPhoneNumber({ phoneNumber }: GridItemPhoneNumberProps) {
  const t = useTranslations("dashboard.common.GridItemPhoneNumber");

  if (!phoneNumber) {
    return (
      <GridItemContact>
        <GridItemContactIconWrapper>
          <Phone    />
        </GridItemContactIconWrapper>
        <GridItemContactText>{t("noPhoneNumber")}</GridItemContactText>
      </GridItemContact>
    );
  }

  return (
    <GridItemContactLink href={`tel:${phoneNumber}`}>
      <GridItemContactIconWrapper>
        <Phone    />
      </GridItemContactIconWrapper>
      <GridItemContactText>{phoneNumber}</GridItemContactText>
    </GridItemContactLink>
  );
}
