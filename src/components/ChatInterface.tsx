"use client";
import React, { useEffect, useRef } from "react";
import { useChats } from "@/providers/ChatProvider";
import { SiGooglegemini } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Quiz from "./Quiz";
import { QuizQuestion } from "./Quiz";

const ChatInterface = () => {
  const { loading, error, chats, addChat } = useChats();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [chats]);

  const renderChatBubble = (
    msg: { role: string; content: string },
    index: number
  ) => {
    const isUser = msg.role === "usr";
    const bubbleClass = isUser
      ? "bg-blue-500 text-white"
      : "bg-neutral-300 text-black";
    const alignmentClass = isUser ? "justify-start" : "justify-end";

    return (
      <div
        key={index}
        className={`flex items-end mb-4 ${alignmentClass} animate-fadeIn`}
      >
        {isUser && (
          <div className="mr-2 mb-1">
            <FaUser className="text-blue-500" size={24} />
          </div>
        )}
        <div className={`max-w-[70%] rounded-lg p-3 ${bubbleClass}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-blue-300 underline" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside mb-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside mb-2" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-gray-800 text-white p-2 rounded mb-2 overflow-x-auto"
                  {...props}
                />
              ),
            }}
          >
            {msg.content}
          </ReactMarkdown>
        </div>
        {!isUser && (
          <div className="ml-2 mb-1">
            <SiGooglegemini className="text-red-500" size={24} />
          </div>
        )}
      </div>
    );
  };
  const handlePromptClick = (prompt: string) => {
    if (formRef.current) {
      const input = formRef.current.querySelector('input[name="prompt"]') as HTMLInputElement;
      if (input) {
        input.value = prompt;
        formRef.current.requestSubmit();
      }
    }
  };


  const prompts = [
    "📝 Summarize this research paper in simple terms",
    "📚 Generate a study guide for my upcoming exam",
    "🧠 Explain a complex concept from my course material",
    "❓ Create practice questions for my subject"
  ];

  return (
    <div className="w-full min-w-4xl bg-muted rounded-lg shadow-md flex flex-col h-[80vh]  md:p-12 ">
      {chats.length !== 0 ? (
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto md:p-4"
        >
          <div className="flex flex-col">
            {[...chats].reverse().map((msg, index) => {
              if (msg.promptType === "MCQ" && msg.role === "bot") {
                const quizData: QuizQuestion[] = JSON.parse(msg.content);
                return <Quiz key={"mcq" + index} quizData={quizData} />;
              } else {
                return renderChatBubble(msg, chats.length - 1 - index);
              }
            })}
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={addChat} className="flex-grow overflow-y-auto md:p-4 md:mt-24">
          <h2 className="text-4xl my-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">CAPABILITIES</h2>
          <div className="flex gap-10 p-2 flex-wrap md:flex-nowrap">
            {prompts.map((prompt, index) => (
              <button
                key={index}
                type="button"
                className=" text-white  rounded-lg hover:bg-blue-950 transition-colors   p-4 text-center text-base font-medium tracking-tight md:text-xl bg-neutral-900 "
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <input type="hidden" name="prompt" />
        </form>
      )}
    </div>
  );
};
export default ChatInterface;
