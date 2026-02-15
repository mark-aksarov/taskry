import { startTransition } from "react";
import { normalizeBooleanFields } from "./formDataUtils";

export function handleActionSubmit(
  event: React.FormEvent<HTMLFormElement>,
  action: (formData: FormData) => void,
  booleanFields?: string[],
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  if (booleanFields) {
    normalizeBooleanFields(formData, booleanFields);
  }

  startTransition(() => {
    action(formData);
  });
}
