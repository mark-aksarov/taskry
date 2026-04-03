"use client";

import { useRouter } from "@/i18n/navigation";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria";

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ReactAriaRouterProvider
      navigate={(path: string, routerOptions: any) => {
        router.push(path, routerOptions);
      }}
    >
      {children}
    </ReactAriaRouterProvider>
  );
}
