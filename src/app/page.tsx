"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";
import { FaSchool } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { GiArchiveResearch } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";

export default function Home() {
  const links = [
    {
      label: "Secondary",
      href: "#",
      icon: (
        <FaSchool className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Senior Secondary",
      href: "#",
      icon: (
        <GiArchiveResearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Graduate",
      href: "#",
      icon: (
        <FaUniversity className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Post Graduate",
      href: "#",
      icon: (
        <IoIosSchool className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-1 md:p-4 w-full">
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          " md:max-h-[95vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden ">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Ayush Jha",
                  href: "#",
                  icon: (
                    <Image
                      src="https://media.licdn.com/dms/image/D5603AQH8-9soBjEVyA/profile-displayphoto-shrink_200_200/0/1698226937083?e=1729123200&v=beta&t=iymxV16ggEZDO_WYc6uIy1ALWjAHi-eijESyIb234Nc"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        {/* <Dashboard /> */}
        <div className="flex flex-1 flex-col bg-neutral-900 p-4">
          <Navbar />
          <ChatInterface />
        </div>
        <div className="hidden md:flex">
        <Sidebar open={true} >
          <SidebarBody className="h-[95dvh] justify-around gap-6">
            <div className="flex flex-col items-center justify-center  font-bold text-xl bg-neutral-900 rounded-full py-2  ">
              <Image src={'/audio.gif'} alt="audio-gif" height={500} width={500} className=" object-contain h-20 "  />
              <p >Talk To GURU</p>
            </div>
            <div className="flex flex-col items-center justify-center  font-bold text-xl bg-[#1B1919] rounded-full py-2  ">
              <Image src={'/performance.jpg'} alt="perf-gif" height={500} width={500} className=" object-contain h-20  "  />
              <p >Performance</p>
            </div>
            <div className="flex flex-col items-center justify-center  font-bold text-xl bg-neutral-900 rounded-full py-2  ">
              <Image src={'/notes.gif'} alt="notes-gif" height={500} width={500} className=" object-contain h-20  "  />
              <p >Notes</p>
            </div>
            <div className="flex flex-col items-center justify-center  font-bold text-xl bg-[#1880FC] rounded-full py-2  ">
              <Image src={'/exam.gif'} alt="exam-gif" height={500} width={500} className=" object-contain h-20 rounded-full "  />
              <p >Assessment</p>
            </div>
            <div className="flex flex-col items-center justify-center  font-bold text-xl bg-neutral-900 rounded-full py-2  ">
              <Image src={'/game.gif'} alt="game-gif" height={500} width={500} className=" object-contain h-20 rounded-full "  />
              <p >Learn By Game</p>
            </div>
          </SidebarBody>
        </Sidebar>
        </div>
      </div>

    </main>
  );
}
const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={"/AIMandiLogo.png"} alt="Logo" width={50} height={50} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Guru Intelligence
      </motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={"/AIMandiLogo.png"} alt="Logo" width={50} height={50} />
    </Link>
  );
};
