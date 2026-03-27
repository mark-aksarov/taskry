import { UpdateTaskCategoryModalProvider } from "../../UpdateTaskCategoryModal";
import { MockedUpdateTaskCategoryProvider } from "../../UpdateTaskCategoryProvider/__stories__";
import { MockedDeleteTaskCategoryProvider } from "../../DeleteTaskCategoryProvider/__stories__";
import { DeleteTaskCategoryModalProvider } from "../../DeleteTaskCategoryModal";

export function MockedTaskCategoryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UpdateTaskCategoryModalProvider>
      <MockedUpdateTaskCategoryProvider>
        <DeleteTaskCategoryModalProvider>
          <MockedDeleteTaskCategoryProvider>
            {children}
          </MockedDeleteTaskCategoryProvider>
        </DeleteTaskCategoryModalProvider>
      </MockedUpdateTaskCategoryProvider>
    </UpdateTaskCategoryModalProvider>
  );
}
