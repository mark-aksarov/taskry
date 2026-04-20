"use client";

import { Link, LinkProps } from "react-aria-components";
import { toggleButtonStyles } from "@/ui/ToggleButtonGroup";

interface UserNavigationMobileLinkProps extends LinkProps {
  isSelected: boolean;
}

export function UserNavigationMobileLink({
  isSelected,
  ...props
}: UserNavigationMobileLinkProps) {
  return (
    <Link
      {...props}
      className={(renderProps) =>
        toggleButtonStyles({ ...renderProps, variant: "contrast", isSelected })
      }
    />
  );
}
