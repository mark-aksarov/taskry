import { MockedUpdateTaskCategoryProvider } from "../../UpdateTaskCategoryProvider/__stories__";
import { MockedDeleteTaskCategoryProvider } from "../../DeleteTaskCategoryProvider/__stories__";

export function MockedTaskCategoryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockedUpdateTaskCategoryProvider>
      <MockedDeleteTaskCategoryProvider>
        {children}
      </MockedDeleteTaskCategoryProvider>
    </MockedUpdateTaskCategoryProvider>
  );
}
