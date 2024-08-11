"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Input from "./Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { Beam, Cover } from "@/components/ui/cover";
import { useChats } from "@/providers/ChatProvider";

export function Navbar({ className }: { className?: string }) {
  const [selected, setSelected] = useState("explain");
  const {setMenu} = useChats();
  return (
    <div
      className={cn(
        " top-0 w-full flex flex-col items-center ",
        className
      )}
    >
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
      <div className="flex justify-center items-center max-w-2xl">
        <Select
          onValueChange={(value) => {setSelected(value); setMenu(value)}}
          defaultValue={selected}
        >
          <Cover>
            <SelectTrigger className="md:w-[180px]  bg-white dark:bg-zinc-800 h-12 rounded-full  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] text-muted-foreground ">
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
          </Cover>
          <SelectContent className="md:w-[180px] rounded-xl">
            <SelectGroup>
              <SelectLabel>Actions</SelectLabel>
              <SelectItem value="mcq">MCQ</SelectItem>
              <SelectItem value="explain">Explain</SelectItem>
              <SelectItem value="summary">Summarize</SelectItem>
              <SelectItem value="bullet">Bullet Points</SelectItem>
              <SelectItem value="table">Comparison</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input />
      </div>
    </div>
  );
}
