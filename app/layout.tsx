import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhotoFuse — One Gallery for All Your Photos",
  description: "Connect iCloud, Google Photos, and Amazon Photos into a single, beautiful, privacy-first gallery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
