import { type Decorator } from "@storybook/react";

export const withContainerWidth =
  (width: string = "500px"): Decorator =>
  (Story) => (
    <div style={{ maxWidth: width }}>
      <Story />
    </div>
  );
