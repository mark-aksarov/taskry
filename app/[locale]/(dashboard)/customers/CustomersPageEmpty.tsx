import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";
import { NewCustomerModal } from "@/components/customer/NewCustomerModal";

interface CustomersPageEmptyProps {
  NewCustomerFormContainer: React.ComponentType;
}

export function CustomersPageEmpty({
  NewCustomerFormContainer,
}: CustomersPageEmptyProps) {
  const t = useTranslations("app.CustomersPageEmpty");

  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton
          createNewModal={
            <NewCustomerModal newCustomerForm={<NewCustomerFormContainer />} />
          }
        >
          {t("addButtonLabel")}
        </EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
