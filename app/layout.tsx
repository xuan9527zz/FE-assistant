import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "万缕千丝 · 招募规划册",
  description: "《Fire Emblem: Fortune's Weave（万缕千丝）》角色资料、礼物喜好与四路线招募规划工具。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
