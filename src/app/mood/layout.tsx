// app/chat/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MoodLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth(); // ✅ Await it!

  if (!userId) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
