"use client";

import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export const SignOutButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/sign-in"); // redirect to login page
            },
          },
        })
      }
      className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-200"
    >
      Sign Out
    </button>
  );
};
