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
          <DialogHeading className="text-base">{title}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Edit Task"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
