import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "./components/SignoutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto flex h-screen max-w-md flex-col items-center justify-center space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      <p className="text-black">Welcome, {session.user.name || "User"}!</p>
      <p className="text-black">Email: {session.user.email}</p>
      <SignOutButton />
    </main>
  );
}
