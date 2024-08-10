"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useChats } from "@/providers/ChatProvider";

function Input() {
  const {loading, addChat} = useChats();
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setError(null);

  //   const formData = new FormData(event.currentTarget);

  //   try {
  //     setLoading(true);

  //     const response = await fetch("/api/question", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       setError(response.statusText);
  //     } else {
  //       setMessage(result.message);
  //     }
  //   } catch (err) {
  //     setError("An error occurred. Please try again later.");
  //     console.error("Error sending message:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="h-fit flex flex-col justify-center  items-center px-4 lg:min-w-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={addChat}
        loading= {loading}
        
      />
    </div>
  );
}

export default Input;
