"use client";

import { Children } from "react";
import { GridMobile } from "@/components/common/Grid";
import { UserGridMobileSkeleton } from "./UserGridMobileSkeleton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function UserGridMobile({ children }: { children: React.ReactNode }) {
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isPageTransitionPending) {
    return <UserGridMobileSkeleton items={Children.count(children)} />;
  }

  return <GridMobile data-test="user-grid-mobile">{children}</GridMobile>;
}
