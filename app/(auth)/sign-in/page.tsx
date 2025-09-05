"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BetterFetchError } from "better-auth/react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<
    (BetterFetchError & Record<string, any>) | null
  >(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
        rememberMe,
      },
      {
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error);
        },
      },
    );
  }

  const sendVerificationEmail = async () => {
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/",
    });
  };

  return (
    <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold text-black">Sign In</h1>

      {error && (
        <div className="flex w-100 flex-row flex-nowrap justify-between gap-1">
          <p className="text-red-500">
            {error.message || "Something went wrong."}
          </p>
          {error.code === "EMAIL_NOT_VERIFIED" && (
            <button
              type="button"
              onClick={sendVerificationEmail}
              className="bg-white p-0 font-medium text-black hover:text-blue-900"
            >
              Send again
            </button>
          )}
        </div>
      )}

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
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-md border border-neutral-700 px-3 py-2 text-black"
        />
        <div className="flex flex-row items-center justify-between">
          <label className="text-black">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            Remember me
          </label>

          <Link href="/forget-password" className="text-black">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border border-neutral-700 bg-white px-4 py-2 font-medium text-black hover:bg-gray-200 disabled:cursor-default disabled:opacity-50"
        >
          {isSubmitting ? "Wait..." : "Sign In"}
        </button>
        <Link
          href="/sign-up"
          type="button"
          className="block w-full rounded-md border border-neutral-700 bg-white px-4 py-2 text-center font-medium text-black hover:bg-gray-200 disabled:cursor-default disabled:opacity-50"
        >
          Sign Up
        </Link>
      </form>
    </main>
  );
}
