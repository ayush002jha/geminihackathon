"use client";

import { Navbar } from "@/components/Navbar";

import { useChats } from "@/providers/ChatProvider";

export default function Home() {
  const {chats} = useChats();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 pt-0 w-full">

      <Navbar />
      {JSON.stringify(chats)}
    </main>
  );
}
