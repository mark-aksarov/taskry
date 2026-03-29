import { MockedDeleteTaskProvider } from "../../DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "../../UpdateTaskProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "../../UpdateTaskStatusProvider/__stories__";

export function MockedTaskItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockedDeleteTaskProvider>
      <MockedUpdateTaskProvider>
        <MockedUpdateTaskStatusProvider>
          {children}
        </MockedUpdateTaskStatusProvider>
      </MockedUpdateTaskProvider>
    </MockedDeleteTaskProvider>
  );
}
