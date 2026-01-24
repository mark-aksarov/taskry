import { PositionFormBase } from "../PositionFormBase";
import { PositionFormBaseProps } from "../PositionFormBase/PositionFormBase";

export function NewPositionForm(props: Omit<PositionFormBaseProps, "id">) {
  return <PositionFormBase id="new-position-form" {...props} />;
}
