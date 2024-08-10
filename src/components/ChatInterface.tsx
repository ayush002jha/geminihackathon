"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useChats } from '@/providers/ChatProvider';
import { SiGooglegemini } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    if (chats.length > 0 && chats[chats.length - 1].role === 'bot') {
      setStreamingIndex(chats.length - 1);
    }
  }, [chats]);

  const renderChatBubble = (msg: { role: string; content: string }, index: number) => {
    const isUser = msg.role === 'usr';
    const bubbleClass = isUser
      ? 'bg-blue-500 text-white'
      : 'bg-gray-200 text-black';
    const alignmentClass = isUser ? 'justify-start' : 'justify-end';

    return (
      <div
        key={index}
        className={`flex items-end mb-4 ${alignmentClass}`}
      >
        {isUser && (
          <div className="mr-2 mb-1">
            <FaUser className="text-blue-500" size={24} />
          </div>
        )}
        <div className={`max-w-[70%] rounded-lg p-3 ${bubbleClass}`}>
          {index === streamingIndex ? (
            <StreamingText text={msg.content} onComplete={() => setStreamingIndex(-1)} />
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <p className="mb-2" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-300 underline" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-gray-800 text-white p-2 rounded mb-2 overflow-x-auto" {...props} />,
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
    <div className="w-full min-w-4xl bg-muted rounded-lg shadow-md flex flex-col h-[80vh] mt-48 p-12">
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4"
      >
        <div className="flex flex-col">
          {[...chats].reverse().map((msg, index) => renderChatBubble(msg, chats.length - 1 - index))}
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

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>;
};

export default ChatInterface;