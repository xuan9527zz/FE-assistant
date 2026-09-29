import type { Metadata, Viewport } from "next";
import PwaRegistrar from "@/components/pwa-registrar";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "万缕千丝 · 招募规划册",
  description: "《Fire Emblem: Fortune's Weave（万缕千丝）》角色资料、礼物喜好与四路线招募规划工具。",
  applicationName: "FE Assistant",
  manifest: `${basePath}/manifest.webmanifest`,
  appleWebApp: { capable: true, title: "FE Assistant", statusBarStyle: "default" },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#17394a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        <PwaRegistrar />
      </body>
    </html>
  );
}
