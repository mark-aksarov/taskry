import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";

export function UsersPageEmpty() {
  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>No Users yet</EmptySectionHeading>
        <EmptySectionDescription>
          Add a new user to start building your team
        </EmptySectionDescription>
        <EmptySectionButton href="#">New User</EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
