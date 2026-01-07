import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "../components/layout/GlobalContainerContext";

import { type Decorator } from "@storybook/react";
import { UserDetail } from "../components/users/UserDetail";
import { EditTaskForm } from "../components/tasks/EditTaskForm";
import { PersonHeader } from "../components/common/PersonHeader";
import { CustomerDetail } from "../components/customer/CustomerDetail";
import { EditProjectForm } from "../components/projects/EditProjectForm";
import { TaskDetailCompact } from "../components/tasks/TaskDetailCompact";
import { EditCustomerForm } from "../components/customer/EditCustomerForm";
import { NotificationList } from "../components/notifications/NotificationList";
import { ProjectDetailCompact } from "../components/projects/ProjectDetailCompact";
import { MockedCommentsContainer } from "../components/comments/MockedCommentsContainer";
import { Default as UserDetailStory } from "../components/users/UserDetail/UserDetail.stories";
import { NotificationModalContent } from "../components/notifications/NotificationModalContent";
import { Default as TaskFormBaseStory } from "../components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as PersonHeaderStory } from "../components/common/PersonHeader/PersonHeader.stories";
import { Default as CustomerDetailStory } from "../components/customer/CustomerDetail/CustomerDetail.stories";
import { Default as EditProjectFormStory } from "../components/projects/ProjectFormBase/ProjectFormBase.stories";
import { Default as TaskDetailCompactStory } from "../components/tasks/TaskDetailCompact/TaskDetailCompact.stories";
import { Default as CustomerFormBaseStory } from "../components/customer/CustomerFormBase/CustomerFormBase.stories";
import { NotificationFilterToggleButtonGroup } from "../components/notifications/NotificationFilterToggleButtonGroup";
import { Default as NotificationListStory } from "../components/notifications/NotificationList/NotificationList.stories";
import { Default as ProjectDetailCompactStory } from "../components/projects/ProjectDetailCompact/ProjectDetailCompact.stories";

export const context: GlobalContainerContextType = {
  EditProjectFormContainer: () => (
    <EditProjectForm {...EditProjectFormStory.args} projectId={1} />
  ),
  EditTaskFormContainer: () => (
    <EditTaskForm {...TaskFormBaseStory.args} taskId={1} />
  ),
  CustomerDetailContainer: () => (
    <div className="flex flex-col gap-6">
      <PersonHeader {...PersonHeaderStory.args} />
      <CustomerDetail {...CustomerDetailStory.args} />
    </div>
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
    <NotificationModalContent>
      <NotificationFilterToggleButtonGroup
        selectedKeys={["all"]}
        onSelectionChange={() => {}}
        notificationsCount={10}
        unreadCount={5}
      />
      <NotificationList {...NotificationListStory.args} />
    </NotificationModalContent>
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
    <div className="flex flex-col gap-6">
      <PersonHeader {...PersonHeaderStory.args} />
      <UserDetail {...UserDetailStory.args} />
    </div>
  ),
};

export const GlobalContainerDecorator: Decorator = (Story) => {
  return (
    <GlobalContainerProvider value={context}>
      <Story />
    </GlobalContainerProvider>
  );
};
