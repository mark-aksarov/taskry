import "../app/globals.css";

import { sb } from "storybook/test";
import type { Preview } from "@storybook/nextjs-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import { withThemedBackground } from "./withThemedBackground";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { withRootLayoutProviders } from "./withRootLayoutProviders";

sb.mock(import("../lib/actions/auth/signIn.ts"));
sb.mock(import("../lib/actions/auth/signUp.ts"));
sb.mock(import("../lib/actions/auth/signOut.ts"));
sb.mock(import("../lib/actions/auth/resetPassword.ts"));
sb.mock(import("../lib/actions/auth/forgetPassword.ts"));
sb.mock(import("../lib/actions/auth/sendVerificationEmail.ts"));
sb.mock(import("../lib/actions/auth/createInvitation.ts"));
sb.mock(import("../lib/actions/auth/createOrganization.ts"));
sb.mock(import("../lib/actions/auth/acceptInvitation.ts"));

sb.mock(import("../lib/actions/comment/deleteComment.ts"));
sb.mock(import("../lib/actions/comment/sendComment.ts"));
sb.mock(import("../lib/actions/comment/updateComment.ts"));

sb.mock(import("../lib/actions/position/createPosition.ts"));
sb.mock(import("../lib/actions/position/deletePosition.ts"));
sb.mock(import("../lib/actions/position/deletePositions.ts"));
sb.mock(import("../lib/actions/position/importPositions.ts"));
sb.mock(import("../lib/actions/position/updatePosition.ts"));

sb.mock(import("../lib/actions/project/createProject.ts"));
sb.mock(import("../lib/actions/project/deleteProject.ts"));
sb.mock(import("../lib/actions/project/deleteProjects.ts"));
sb.mock(import("../lib/actions/project/importProjects.ts"));
sb.mock(import("../lib/actions/project/updateProject.ts"));
sb.mock(import("../lib/actions/project/updateProjectStatus.ts"));
sb.mock(import("../lib/actions/project/updateProjectStatuses.ts"));

sb.mock(import("../lib/actions/projectCategory/createProjectCategory.ts"));
sb.mock(import("../lib/actions/projectCategory/deleteProjectCategory.ts"));
sb.mock(import("../lib/actions/projectCategory/deleteProjectCategories.ts"));
sb.mock(import("../lib/actions/projectCategory/importProjectCategories.ts"));
sb.mock(import("../lib/actions/projectCategory/updateProjectCategory.ts"));

sb.mock(import("../lib/actions/company/createCompany.ts"));
sb.mock(import("../lib/actions/company/deleteCompanies.ts"));
sb.mock(import("../lib/actions/company/deleteCompany.ts"));
sb.mock(import("../lib/actions/company/importCompanies.ts"));
sb.mock(import("../lib/actions/company/updateCompany.ts"));

sb.mock(import("../lib/actions/client/createClient.ts"));
sb.mock(import("../lib/actions/client/deleteClient.ts"));
sb.mock(import("../lib/actions/client/deleteClients.ts"));
sb.mock(import("../lib/actions/client/importClients.ts"));
sb.mock(import("../lib/actions/client/updateClient.ts"));
sb.mock(import("../lib/actions/client/updateClientImageUrl.ts"));

sb.mock(import("../lib/actions/subtask/createSubtask.ts"));
sb.mock(import("../lib/actions/subtask/deleteSubtask.ts"));
sb.mock(import("../lib/actions/subtask/toggleSubtask.ts"));
sb.mock(import("../lib/actions/subtask/updateSubtask.ts"));

sb.mock(import("../lib/actions/taskCategory/createTaskCategory.ts"));
sb.mock(import("../lib/actions/taskCategory/deleteTaskCategory.ts"));
sb.mock(import("../lib/actions/taskCategory/deleteTaskCategories.ts"));
sb.mock(import("../lib/actions/taskCategory/importTaskCategories.ts"));
sb.mock(import("../lib/actions/taskCategory/updateTaskCategory.ts"));

sb.mock(import("../lib/actions/task/createTask.ts"));
sb.mock(import("../lib/actions/task/deleteTask.ts"));
sb.mock(import("../lib/actions/task/deleteTasks.ts"));
sb.mock(import("../lib/actions/task/importTasks.ts"));
sb.mock(import("../lib/actions/task/updateTask.ts"));
sb.mock(import("../lib/actions/task/updateTaskStatus.ts"));
sb.mock(import("../lib/actions/task/updateTaskStatuses.ts"));

sb.mock(import("../lib/actions/user/changePassword.ts"));
sb.mock(import("../lib/actions/user/deleteUser.ts"));
sb.mock(import("../lib/actions/user/updateUser.ts"));
sb.mock(import("../lib/actions/user/updateUserImageUrl.ts"));

sb.mock(import("../lib/hooks/useUpdateImageActionState.ts"));

const preview: Preview = {
  decorators: [
    withThemedBackground,
    withRootLayoutProviders,
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],

  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", right: "en", title: "English" },
          { value: "ru", right: "ru", title: "Русский" },
        ],
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    nextjs: {
      appDirectory: true,
    },

    options: {
      storySort: {
        order: ["UI", "dashboard", "site", "pages"],
      },
    },

    backgrounds: { disabled: true },

    viewport: {
      options: MINIMAL_VIEWPORTS,
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
