import { Dialog } from "@/components/ui";

interface CommentsModalDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function CommentsModalDialog(props: CommentsModalDialogProps) {
  return <Dialog className="md:h-[calc(100dvh-64px)]" {...props} />;
}
