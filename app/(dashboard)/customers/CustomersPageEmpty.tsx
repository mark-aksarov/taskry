import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";

export function CustomersPageEmpty() {
  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>No Customers yet</EmptySectionHeading>
        <EmptySectionDescription>
          Add a new customer to start growing your client base
        </EmptySectionDescription>
        <EmptySectionButton href="#">New Customer</EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
