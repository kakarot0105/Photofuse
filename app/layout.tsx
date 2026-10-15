import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhotoFuse — One Gallery for All Your Photos",
  description:
    "Connect iCloud, Google Photos, and Amazon Photos into a single, beautiful, privacy-first gallery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* CloudKit JS loaded on demand by CloudKitSync; preconnect for faster sync */}
        <link rel="preconnect" href="https://cdn.apple-cloudkit.com" />
      </head>
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
