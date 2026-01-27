export function normalizeBooleanFields(formData: FormData, fields: string[]) {
  fields.forEach((field) => {
    const checked = formData.get(field) === "on";
    if (checked) {
      formData.set(field, "true");
    } else {
      formData.delete(field);
    }
  });
}

export function formDataToSearchParams(formData: FormData) {
  const params = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && value.trim() !== "") {
      params.append(key, value);
    }
  }

  return params;
}
