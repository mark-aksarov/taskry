export function CommentFormHiddenInput({
  name,
  value,
}: {
  name: string;
  value: number;
}) {
  return <input type="hidden" name={name} value={value} />;
}
