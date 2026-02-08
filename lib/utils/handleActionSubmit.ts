import { startTransition } from "react";

export function handleActionSubmit(
  event: React.FormEvent<HTMLFormElement>,
  action: (formData: FormData) => void,
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  startTransition(() => {
    action(formData);
  });
}
