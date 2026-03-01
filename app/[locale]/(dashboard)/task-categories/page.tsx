import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { TaskCategoriesPage } from "./TaskCategoriesPage";
import { TaskCategoriesPageEmpty } from "./TaskCategoriesPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";
import { createTaskCategory } from "@/lib/actions/taskCategory/createTaskCategory";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { deleteTaskCategories } from "@/lib/actions/taskCategory/deleteTaskCategories";
import { TaskCategoriesContainer } from "@/components/taskCategory/TaskCategoriesContainer";
import { DeleteTaskCategoriesProvider } from "@/components/taskCategory/DeleteTaskCategoriesContext";

export default async function AppTaskCategoriesPage() {
  // Authorization
  const session = await requireProtectedPage();

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  const taskCategories = await getTaskCategorySummaries();

  // Render the empty page if there are no task categories
  if (!taskCategories.length) {
    return (
      <CurrentUserProvider value={currentUserContextValue}>
        <TaskCategoriesPageEmpty createTaskCategory={createTaskCategory} />
      </CurrentUserProvider>
    );
  }

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <SelectedItemsProvider
        pageItems={taskCategories.map((t) => ({ id: t.id }))}
      >
        <PageTransitionProvider>
          <DeleteTaskCategoriesProvider>
            <TaskCategoriesPage
              taskCategoriesContainer={<TaskCategoriesContainer />}
              createTaskCategory={createTaskCategory}
              deleteTaskCategories={deleteTaskCategories}
            />
          </DeleteTaskCategoriesProvider>
        </PageTransitionProvider>
      </SelectedItemsProvider>
    </CurrentUserProvider>
  );
}
