import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { GridItemContactText } from "./GridItemContactText";
import { GridItemContactLink, GridItemContact } from "./GridItemContact";
import { GridItemContactIconWrapper } from "./GridItemContactIconWrapper";

interface GridItemPublicLinkProps {
  publicLink?: string;
}

export function GridItemPublicLink({ publicLink }: GridItemPublicLinkProps) {
  const t = useTranslations("dashboard.common.GridItemPublicLink");

  if (!publicLink) {
    return (
      <GridItemContact>
        <GridItemContactIconWrapper>
          <Link2    />
        </GridItemContactIconWrapper>
        <GridItemContactText>{t("noPublicLink")}</GridItemContactText>
      </GridItemContact>
    );
  }

  return (
    <GridItemContactLink href={publicLink}>
      <GridItemContactIconWrapper>
        <Link2    />
      </GridItemContactIconWrapper>
      <GridItemContactText>{publicLink}</GridItemContactText>
    </GridItemContactLink>
  );
}
