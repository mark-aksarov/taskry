"use client";

import { SWRConfig } from "swr";
import { FetchError } from "@/lib/swr/types";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);

          if (!res.ok) {
            throw new FetchError(res.status);
          }

          return res.json();
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
