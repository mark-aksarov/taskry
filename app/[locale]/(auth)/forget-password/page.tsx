"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    authClient.requestPasswordReset(
      {
        email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error.message || "Something went wrong.");
        },
      },
    );
  };

  if (isSubmitted) {
    return (
      <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
        <h1 className="text-2xl font-bold text-black">Check your email</h1>
        <p className="text-center text-sm text-black">
          We have sent a password reset link to your email.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-200"
        >
          Back to reset password
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold text-black">Forget Password</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md border border-neutral-700 px-3 py-2 text-black"
        />

        <button
          type="submit"
          className="w-full rounded-md border border-neutral-700 bg-white px-4 py-2 font-medium text-black hover:bg-gray-200 disabled:cursor-default disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wait..." : "Send reset link"}
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
