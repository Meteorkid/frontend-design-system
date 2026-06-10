import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Design System",
  description: "基于 Open Props + shadcn-ui + Open Color 的设计系统文档",
};

const navItems = [
  { href: "/", label: "首页" },
  { href: "/tokens", label: "Tokens" },
  { href: "/components", label: "组件" },
  { href: "/colors", label: "色彩" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}>
        <TooltipProvider>
          {/* 导航栏 */}
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
              <Link href="/" className="text-lg font-semibold">
                🎨 Design System
              </Link>
              <nav className="flex gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          {/* 内容 */}
          <main className="mx-auto max-w-5xl px-6 py-10">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
