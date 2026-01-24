import { Dialog } from "@/components/ui/Dialog";

interface ToolbarFiltersModalDialogProps {
  className?: string;
  children: React.ReactNode;
}

export function ToolbarFiltersModalDialog(
  props: ToolbarFiltersModalDialogProps,
) {
  return <Dialog className="md:max-h-[calc(100dvh-64px)]" {...props} />;
}
