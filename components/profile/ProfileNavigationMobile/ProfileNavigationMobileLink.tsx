"use client";

import { toggleButtonStyles, RACLink, RACLinkProps } from "@/components/ui";

interface ProfileNavigationMobileLinkProps extends RACLinkProps {
  isSelected: boolean;
}

export function ProfileNavigationMobileLink({
  isSelected,
  ...props
}: ProfileNavigationMobileLinkProps) {
  return (
    <RACLink
      {...props}
      className={(renderProps) =>
        toggleButtonStyles({ ...renderProps, variant: "contrast", isSelected })
      }
    />
  );
}
