"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type msg = {
  role: string;
  content: string;
};

type Chats = {
  loading: boolean;
  error: string | null;
  chats: Array<msg>;
  addChat: (event: React.FormEvent<HTMLFormElement>) => void;
};

const ChatContext = createContext<Chats>({
  loading: false,
  error: null,
  chats: [],
  addChat: async (event: React.FormEvent<HTMLFormElement>) => {},
});

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [chats, setChats] = useState<Array<msg>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addChat = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const query = formData.get("prompt")?.toString();
    // Will set the USER Query Chats here
    query &&
      setChats((prevChats) => [...prevChats, { role: "usr", content: query }]);
    try {
      setLoading(true);

      const response = await fetch("/api/question", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(response.statusText);
      } else {
        // Add the bot's response to the chats array
        setChats((prevChats) => [
          ...prevChats,
          { role: "bot", content: result.message },
        ]);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
      console.log(chats);
    }
  };

  return (
    <ChatContext.Provider value={{ loading, error, chats, addChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChats = () => useContext(ChatContext);
