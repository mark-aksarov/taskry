"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push(`/verify-email?email=${email}`);
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setError(ctx.error.message || "Something went wrong.");
        },
      },
    );
  }

  return (
    <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold text-black">Sign Up</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded-md border border-neutral-700 px-3 py-2 text-black"
        />
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
          minLength={8}
          className="w-full rounded-md border border-neutral-700 px-3 py-2 text-black"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border border-neutral-700 bg-white px-4 py-2 font-medium text-black hover:bg-gray-200 disabled:cursor-default disabled:opacity-50"
        >
          {isSubmitting ? "Wait..." : "Create Account"}
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
