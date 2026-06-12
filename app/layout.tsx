import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aviralshukla.dev"),
  title: {
    default: "Aviral Shukla — Full Stack Developer",
    template: "%s — Aviral Shukla",
  },
  description:
    "Full Stack Developer building secure web products, scalable APIs, and reliable backend systems with React, Node.js, MongoDB, and Redis.",
  keywords: [
    "Aviral Shukla",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Aviral Shukla" }],
  creator: "Aviral Shukla",
  openGraph: {
    title: "Aviral Shukla — Full Stack Developer",
    description:
      "Software engineer focused on reliable products, backend systems, and thoughtful interfaces.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aviral Shukla — Full Stack Developer",
    description:
      "Software engineer focused on reliable products, backend systems, and thoughtful interfaces.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
