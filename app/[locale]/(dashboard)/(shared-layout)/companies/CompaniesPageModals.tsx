import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { CreateCompanyModal } from "@/components/company/CreateCompanyModal";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";

export function CompaniesPageModals() {
  return (
    <>
      <TaskSearchModal
        searchContainer={<LinkSearchContainer pathname="/tasks" />}
      />
      <CreateCompanyModal />
    </>
  );
}
