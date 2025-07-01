'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>

      <p className="text-lg">
        {user?.firstName ? `Hello, ${user.firstName}!` : "You're signed in."}
      </p>

      <SignOutButton>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Sign Out
        </button>
      </SignOutButton>
    </main>
  );
}
