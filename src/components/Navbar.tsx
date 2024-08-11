"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Input from "./Input";
import { Toggle } from "@/components/ui/toggle";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { Cover } from "@/components/ui/cover";
import { useChats } from "@/providers/ChatProvider";
import { Prompts, PromptType } from "@/providers/PromptProvider";

export function Navbar({ className }: { className?: string }) {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const { setMenu } = useChats();

  const handleToggleChange = (prompt:PromptType) => {
    setSelectedPrompt(prompt.type);
    setMenu(prompt.type);
  };

  return (
    <Cover className={cn(" top-0 w-full flex flex-col items-center ", className)}>
      <div className={" w-full"}>
        <FilePond
          server={{
            process: "/api/upload",
            fetch: null,
            revert: null,
          }}
          credits={false}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action"> Browse </span> To Interact With Them'
        />
      </div>
      <Input />
        <div className="flex gap-4 items-center justify-center my-2 flex-wrap">
          {Prompts.map((prompt, idx) => (
            <Toggle
              key={idx}
              aria-label={`Toggle ${prompt.type}`}
              pressed={selectedPrompt === prompt.type}
              onPressedChange={() => handleToggleChange(prompt)}
              className={cn(
                "px-3 py-2 rounded-md transition-colors",
                "bg-muted ",
                "data-[state=on]:bg-blue-500 data-[state=on]:text-white"
              )}
            >
              {prompt.type}
            </Toggle>
          ))}
        </div>
    </Cover>
  );
}