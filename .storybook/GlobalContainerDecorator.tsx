import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "../components/layout/GlobalContainerContext";

import { fn } from "storybook/test";
import { type Decorator } from "@storybook/react";
import { SearchList } from "../components/search/SearchList";
import { SearchField } from "../components/search/SearchField";
import { EditTaskForm } from "../components/tasks/EditTaskForm";
import { PersonHeader } from "../components/common/PersonHeader";
import { ModalPagination } from "../components/common/ModalPagination";
import { CustomerDetail } from "../components/customer/CustomerDetail";
import { EditProjectForm } from "../components/projects/EditProjectForm";
import { TaskDetailCompact } from "../components/tasks/TaskDetailCompact";
import { EditCustomerForm } from "../components/customer/EditCustomerForm";
import { SearchPresentation } from "../components/search/SearchPresentation";
import { ProjectDetailCompact } from "../components/projects/ProjectDetailCompact";
import { SearchToggleButtonGroup } from "../components/search/SearchToggleButtonGroup";
import { MockedCommentsContainer } from "../components/comments/MockedCommentsContainer";
import { PersonDetailPresentation } from "../components/common/PersonDetailPresentation";
import { NotificationModalContent } from "../components/notifications/NotificationModalContent";
import { Default as TaskFormBaseStory } from "../components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as PersonHeaderStory } from "../components/common/PersonHeader/PersonHeader.stories";
import { UsersSearchList as UsersSearchListStory } from "../components/search/SearchList/SearchList.stories";
import { TasksSearchList as TasksSearchListStory } from "../components/search/SearchList/SearchList.stories";
import { Default as CustomerDetailStory } from "../components/customer/CustomerDetail/CustomerDetail.stories";
import { Default as EditProjectFormStory } from "../components/projects/ProjectFormBase/ProjectFormBase.stories";
import { ProjectsSearchList as ProjectsSearchListStory } from "../components/search/SearchList/SearchList.stories";
import { Default as TaskDetailCompactStory } from "../components/tasks/TaskDetailCompact/TaskDetailCompact.stories";
import { Default as CustomerFormBaseStory } from "../components/customer/CustomerFormBase/CustomerFormBase.stories";
import { Default as ProjectDetailCompactStory } from "../components/projects/ProjectDetailCompact/ProjectDetailCompact.stories";
import { Default as SearchToggleButtonGroupStory } from "../components/search/SearchToggleButtonGroup/SearchToggleButtonGroup.stories";
import { Default as NotificationModalContentStory } from "../components/notifications/NotificationModalContent/NotificationModalContent.stories";

const createSearchContainer = (
  searchResultList: React.ReactNode,
  selectedToggleKey?: string,
) => (
  <SearchPresentation
    totalPages={2}
    searchField={<SearchField value="" onChange={fn()} />}
    searchToggleButtonGroup={
      <SearchToggleButtonGroup
        {...SearchToggleButtonGroupStory.args}
        selectedKeys={[selectedToggleKey]}
      />
    }
    searchResult={searchResultList}
    pagination={
      <ModalPagination
        page={1}
        pageSize={10}
        setPage={fn()}
        totalCount={30}
        totalPages={3}
      />
    }
  />
);

export const context: GlobalContainerContextType = {
  UsersSearchContainer: () =>
    createSearchContainer(
      <SearchList {...UsersSearchListStory.args} />,
      "users",
    ),

  TasksSearchContainer: () =>
    createSearchContainer(
      <SearchList {...TasksSearchListStory.args} />,
      "tasks",
    ),

  ProjectsSearchContainer: () =>
    createSearchContainer(
      <SearchList {...ProjectsSearchListStory.args} />,
      "projects",
    ),

  EditProjectFormContainer: () => (
    <EditProjectForm {...EditProjectFormStory.args} projectId={1} />
  ),
  EditTaskFormContainer: () => (
    <EditTaskForm {...TaskFormBaseStory.args} taskId={1} />
  ),
  CustomerDetailContainer: () => (
    <PersonDetailPresentation
      personHeader={<PersonHeader {...PersonHeaderStory.args} />}
      userDetail={<CustomerDetail {...CustomerDetailStory.args} />}
    />
  ),
  EditCustomerFormContainer: () => (
    <EditCustomerForm
      {...CustomerFormBaseStory.args}
      customerId={1}
      fullNameDefaultValue="John Doe"
      bioDefaultValue="Tech enthusiast based in NYC."
      emailDefaultValue="alex@example.com"
      phoneNumberDefaultValue="555-987-6543"
      publicLinkDefaultValue="https://twitter.com/alex_dev"
    />
  ),
  NotificationModalContentContainer: () => (
    <NotificationModalContent {...NotificationModalContentStory.args} />
  ),
  ProjectDetailCompactContainer: () => (
    <ProjectDetailCompact {...ProjectDetailCompactStory.args} />
  ),
  ProjectCommentsContainer: () => <MockedCommentsContainer />,
  TaskCommentsContainer: () => <MockedCommentsContainer />,
  TaskDetailCompactContainer: () => (
    <TaskDetailCompact {...TaskDetailCompactStory.args} />
  ),
  UserDetailContainer: () => (
    <PersonDetailPresentation
      personHeader={<PersonHeader {...PersonHeaderStory.args} />}
      userDetail={<CustomerDetail {...CustomerDetailStory.args} />}
    />
  ),
};

export const GlobalContainerDecorator: Decorator = (Story) => {
  return (
    <GlobalContainerProvider value={context}>
      <Story />
    </GlobalContainerProvider>
  );
};
