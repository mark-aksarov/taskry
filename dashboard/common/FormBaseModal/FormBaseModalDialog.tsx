import { Dialog } from "@/ui/Dialog";

interface FormBaseModalDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function FormBaseModalDialog(props: FormBaseModalDialogProps) {
  return <Dialog className="md:max-h-[calc(100dvh-64px)]" {...props} />;
}
