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
    <Dialog className="md:w-[300px]">
      <DialogHeader className="p-4">
        <DialogHeading className="text-base">New Subtask</DialogHeading>
        <DialogCloseButton iconSize={16} />
      </DialogHeader>
      <DialogBody className="p-4">
        <NewSubtaskForm />
      </DialogBody>
      <DialogFooter className="border-none px-4 pt-0 pb-3">
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
