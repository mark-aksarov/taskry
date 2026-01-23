import { Dialog } from "@/components/ui";
import { NewSubtaskForm } from "../NewSubtaskForm";
import { NewSubtaskDialogBody } from "./NewSubtaskDialogBody";
import { NewSubtaskDialogHeader } from "./NewSubtaskDialogHeader";
import { NewSubtaskDialogFooter } from "./NewSubtaskDialogFooter";
import { NewSubtaskDialogAddButton } from "./NewSubtaskDialogAddButton";

export function NewSubtaskDialog() {
  return (
    <Dialog className="md:w-[300px]">
      <NewSubtaskDialogHeader />
      <NewSubtaskDialogBody>
        <NewSubtaskForm />
      </NewSubtaskDialogBody>
      <NewSubtaskDialogFooter>
        <NewSubtaskDialogAddButton />
      </NewSubtaskDialogFooter>
    </Dialog>
  );
}
