import {
  mockedCustomerDetail,
  mockedCustomerSummaries,
} from "@/mocks/customers";

import { mockedUserDetail } from "@/mocks/users";
import { ProjectDetail } from "../../ProjectDetail";
import { mockedProjectDetail } from "@/mocks/projects";
import { UserDetail } from "@/components/users/UserDetail";
import { UpdateProjectForm } from "../../UpdateProjectForm";
import { DeleteProjectModal } from "../../DeleteProjectModal";
import { ProjectDetailModal } from "../../ProjectDetailModal";
import { UpdateProjectModal } from "../../UpdateProjectModal";
import { CommentList } from "@/components/comments/CommentList";
import { ProjectCommentsModal } from "../../ProjectCommentsModal";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { CustomerDetail } from "@/components/customer/CustomerDetail";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { CustomerDetailHeader } from "@/components/customer/CustomerDetailHeader";

export function MockedProjectItemModals() {
  return (
    <>
      <ProjectDetailModal
        projectId={mockedProjectDetail.id}
        projectDetailContainer={<ProjectDetail {...mockedProjectDetail} />}
      />

      <CustomerDetailModal
        customerId={mockedCustomerDetail.id}
        customerDetailContainer={<CustomerDetail {...mockedCustomerDetail} />}
        customerDetailHeaderContainer={
          <CustomerDetailHeader
            fullName={mockedCustomerDetail.fullName}
            imageUrl={mockedCustomerDetail.imageUrl}
            companyName={mockedCustomerDetail.company.name}
          />
        }
      />

      <UserDetailModal
        userId={mockedUserDetail.id}
        userDetailContainer={<UserDetail {...mockedUserDetail} />}
        userDetailHeaderContainer={
          <UserDetailHeader
            fullName={mockedUserDetail.fullName}
            imageUrl={mockedUserDetail.imageUrl}
            positionName={mockedUserDetail.position.name}
          />
        }
      />

      <ProjectCommentsModal
        projectId={mockedProjectDetail.id}
        projectCommentsContainer={<CommentList {...CommentListStory.args} />}
        sendComment={() => ({ status: "success" })}
        updateComment={() => ({ status: "success" })}
      />

      <UpdateProjectModal
        updateProjectFormContainer={
          <UpdateProjectForm
            {...mockedProjectDetail}
            projectId={mockedProjectDetail.id}
            projectCategorySelectItems={mockedProjectCategorySummaries}
            customerSelectItems={mockedCustomerSummaries}
          />
        }
      />

      <DeleteProjectModal
        projectId={mockedProjectDetail.id}
        projectTitle={mockedProjectDetail.title}
      />
    </>
  );
}
