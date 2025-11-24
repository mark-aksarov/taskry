import {
  BottomSheet,
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { OverlayTriggerState } from "react-stately";

export interface DetailBottomSheetProps {
  state: OverlayTriggerState;
  title: string;
  children: React.ReactNode;
}

export function DetailBottomSheet({
  state,
  title,
  children,
}: DetailBottomSheetProps) {
  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>{title}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <Button
            as="a"
            href="/tasks/1"
            variant="primary"
            size="medium"
            label="Open in Full Page"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
