import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { MockedDeleteCommentProvider } from "../../DeleteCommentProvider/__stories__";

export function MockedCommentItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalManagerProvider>
      <MockedDeleteCommentProvider>{children}</MockedDeleteCommentProvider>
    </ModalManagerProvider>
  );
}
