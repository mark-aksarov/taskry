import {
  SeparatorProps,
  Separator as RACSeparator,
} from "react-aria-components";

import React from "react";

export function Separator(props: SeparatorProps) {
  return (
    <RACSeparator
      {...props}
      className="h-px w-full border-none bg-gray-300 dark:bg-gray-600"
    />
  );
}
