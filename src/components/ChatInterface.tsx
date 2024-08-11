"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChats } from "@/providers/ChatProvider";
import { SiGooglegemini } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import quizData from "./TestData/quizData";
import { Cover } from "./ui/cover";

const ChatInterface = () => {
  const { loading, error, chats, addChat } = useChats();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [streamingIndex, setStreamingIndex] = useState(-1);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [chats]);

  useEffect(() => {
    if (chats.length > 0 && chats[chats.length - 1].role === "bot") {
      setStreamingIndex(chats.length - 1);
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
      <div key={index} className={`flex items-end mb-4 ${alignmentClass}`}>
        {isUser && (
          <div className="mr-2 mb-1">
            <FaUser className="text-blue-500" size={24} />
          </div>
        )}
        <div className={`max-w-[70%] rounded-lg p-3 ${bubbleClass}`}>
          {index === streamingIndex ? (
            <StreamingText
              text={msg.content}
              onComplete={() => setStreamingIndex(-1)}
            />
          ) : (
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
                // code: ({node, ...props}) =>
                //   inline
                //     ? <code className="bg-gray-200 text-red-500 px-1 rounded" {...props} />
                //     : <code {...props} />,
              }}
            >
              {msg.content}
            </ReactMarkdown>
          )}
        </div>
        {!isUser && (
          <div className="ml-2 mb-1">
            <SiGooglegemini className="text-red-500" size={24} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-w-4xl bg-muted rounded-lg shadow-md flex flex-col h-[80vh]  md:p-12">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto md:p-4">
        <div className="flex flex-col">
          {[...chats].reverse().map((msg, index) => {
            if (msg.promptType === "MCQ" && msg.role === "bot") {
              console.log(msg.content);
              const quizData: QuizQuestion[] = JSON.parse(msg.content);
              return <Quiz key={index} quizData={quizData} />; // Pass quizData as a prop
            }
            return renderChatBubble(msg, chats.length - 1 - index);
          })}
        </div>
      </div>
    </div>
  );
};

const StreamingText: React.FC<{ text: string; onComplete: () => void }> = ({
  text,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        onComplete();
      }
    }, 20);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, onComplete]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>
  );
};

export default ChatInterface;

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  quizData: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
  // Destructure quizData from props
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string | null>
  >(quizData.reduce((acc, _, index) => ({ ...acc, [index]: null }), {}));
  const [answers, setAnswers] = useState<Record<number, string | null>>(
    quizData.reduce((acc, _, index) => ({ ...acc, [index]: null }), {})
  );

  const handleOptionClick = (questionIndex: number, option: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionIndex]: option,
    }));

    setAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: quizData[questionIndex].answer,
    }));
  };

  return (
    <div className="p-6 bg-muted min-h-screen rounded-xl my-4">
      <h1 className="text-2xl md:text-2xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        <Cover>Objective Questions</Cover>
      </h1>
      {quizData.map((item, index) => (
        <div key={index} className="mb-6 p-4 bg-neutral-700 shadow-lg rounded-lg ">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            {item.question}
          </h3>
          <ul className="list-none pl-0">
            {item.options.map((option, idx) => (
              <li key={idx} className="mb-2">
                <button
                  onClick={() => handleOptionClick(index, option)}
                  className={`w-full text-left p-3 rounded-lg focus:outline-none ${
                    selectedOptions[index] === option
                      ? item.answer === option.split(". ")[0]
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
