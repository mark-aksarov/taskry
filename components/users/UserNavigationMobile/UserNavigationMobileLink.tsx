"use client";

import { toggleButtonStyles, RACLink, RACLinkProps } from "@/components/ui";

interface UserNavigationMobileLinkProps extends RACLinkProps {
  isSelected: boolean;
}

export function UserNavigationMobileLink({
  isSelected,
  ...props
}: UserNavigationMobileLinkProps) {
  return (
    <RACLink
      {...props}
      className={(renderProps) =>
        toggleButtonStyles({ ...renderProps, variant: "contrast", isSelected })
      }
    />
  );
}
