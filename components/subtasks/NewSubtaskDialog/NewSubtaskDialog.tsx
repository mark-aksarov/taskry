import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { NewSubtaskForm } from "../NewSubtaskForm";

export function NewSubtaskDialog() {
  return (
    <Dialog className="p-0 md:w-[300px]">
      <DialogHeader className="p-3">
        <DialogHeading className="text-sm">New Subtask</DialogHeading>
        <DialogCloseButton iconSize={16} />
      </DialogHeader>
      <DialogBody className="p-3">
        <NewSubtaskForm />
      </DialogBody>
      <DialogFooter className="p-3">
        <Button
          variant="primary"
          size="medium"
          label="Add Subtask"
          className="w-full justify-center p-3"
        />
      </DialogFooter>
    </Dialog>
  );
}
