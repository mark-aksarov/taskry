import { Dialog } from "@/components/ui";

interface FormModalDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function FormModalDialog(props: FormModalDialogProps) {
  return <Dialog className="md:max-h-[calc(100dvh-64px)]" {...props} />;
}
