"use client";

import { Navbar } from "@/components/Navbar";

import { useChats } from "@/providers/ChatProvider";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const { chats } = useChats();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 md:p-24 md:pt-0 w-full">
      <Navbar />
      {/* {JSON.stringify(chats)} */}
      <ChatInterface />
    </main>
  );
}
