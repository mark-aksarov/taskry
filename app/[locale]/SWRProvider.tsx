"use client";

import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res.ok) {
            throw new Error("An error occurred while fetching the data.");
          }
          return res.json();
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
