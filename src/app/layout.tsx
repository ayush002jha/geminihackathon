import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatProvider from "@/providers/ChatProvider";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Guru Intelligence",
  description: "Your AI Guru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
