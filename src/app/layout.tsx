import type { Metadata } from "next";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { IdentitySidebar } from "@/components/portfolio/IdentitySidebar";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yudeat.vercel.app"),
  title: "Yudeat — Full-Stack Developer & DevOps",
  description:
    "Full-stack development and DevOps — building fast, clean web apps for real users. Open for freelance or full-time based in Kathmandu Valley, Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <LenisProvider>
          <IdentitySidebar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
