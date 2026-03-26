import { CreateSubtaskModalProvider } from "@/components/subtasks/CreateSubtaskModal";
import { MockedCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";

interface MockedTaskDetailProvidersProps {
  children: React.ReactNode;
}

export function MockedTaskDetailProviders({
  children,
}: MockedTaskDetailProvidersProps) {
  return (
    <CreateSubtaskModalProvider>
      <MockedCreateSubtaskProvider>{children}</MockedCreateSubtaskProvider>
    </CreateSubtaskModalProvider>
  );
}
