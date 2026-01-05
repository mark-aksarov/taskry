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
  NewProjectFormContainer: React.ComponentType;
}

export function ProjectsPageEmpty({
  NewProjectFormContainer,
}: ProjectsPageEmptyProps) {
  const t = useTranslations("app.ProjectsPageEmpty");

  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton
          createNewModal={
            <NewProjectModal newProjectForm={<NewProjectFormContainer />} />
          }
        >
          {t("addButtonLabel")}
        </EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
