"use client";

import { use } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = use(searchParams);

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    authClient.resetPassword(
      {
        newPassword: password,
        token,
      },
      {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error.message || "Something went wrong.");
        },
      },
    );

    router.push("/sign-in");
  }

  if (!token) {
    return (
      <div>
        <p>Invalid token</p>
      </div>
    );
  }

  return (
    <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold text-black">Reset password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-md border border-neutral-700 px-3 py-2 text-black"
        />

        <button
          type="submit"
          className="w-full rounded-md border border-neutral-700 bg-white px-4 py-2 font-medium text-black hover:bg-gray-200 disabled:cursor-default disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wait..." : "Change password"}
        </button>
        <Link
          href="/sign-in"
          type="button"
          className="block w-full rounded-md border border-neutral-700 bg-white px-4 py-2 text-center font-medium text-black hover:bg-gray-200 disabled:cursor-default disabled:opacity-50"
        >
          Sign In
        </Link>
      </form>
    </main>
  );
}
