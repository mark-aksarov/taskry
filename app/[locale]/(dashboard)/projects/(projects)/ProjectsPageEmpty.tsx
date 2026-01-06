import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";
import { NewProjectModal } from "@/components/projects/NewProjectModal";

interface ProjectsPageEmptyProps {
  newProjectFormContainer: React.ReactNode;
}

export function ProjectsPageEmpty({
  newProjectFormContainer,
}: ProjectsPageEmptyProps) {
  const t = useTranslations("app.ProjectsPageEmpty");

  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton
          createNewModal={
            <NewProjectModal newProjectForm={newProjectFormContainer} />
          }
        >
          {t("addButtonLabel")}
        </EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
