import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "三层 Token 架构",
    description: "Primitive → Semantic → Context，改一处全链路更新",
    href: "/tokens",
    badge: "核心",
  },
  {
    title: "Open Props 集成",
    description: "500+ CSS 变量：颜色、字体、阴影、渐变、动画、间距",
    href: "/tokens",
    badge: "500+",
  },
  {
    title: "Open Color 色彩",
    description: "130 个感知一致性色彩，13 色相 × 10 亮度",
    href: "/colors",
    badge: "130",
  },
  {
    title: "shadcn-ui 组件",
    description: "56 个生产级 React 组件，代码直接复制到项目",
    href: "/components",
    badge: "56",
  },
  {
    title: "Penpot 设计工具",
    description: "Docker 自托管，矢量设计，Token 绑定",
    href: "#",
    badge: "Docker",
  },
  {
    title: "暗色模式",
    description: "所有 token 自动适配亮/暗主题",
    href: "#",
    badge: "内置",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Frontend Design System
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          基于 <strong>Open Props</strong> + <strong>shadcn-ui</strong> + <strong>Open Color</strong> + <strong>Penpot</strong> 的前端设计系统。
          三层 token 架构，组件驱动，AI 友好。
        </p>
        <div className="flex gap-3">
          <Link href="/tokens">
            <Button>查看 Tokens</Button>
          </Link>
          <Link href="/components">
            <Button variant="outline">浏览组件</Button>
          </Link>
        </div>
      </section>

      {/* 架构图 */}
      <section className="rounded-xl border border-border bg-muted/50 p-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-4">架构</h2>
        <pre className="text-sm font-mono overflow-x-auto">
{`Token 层（三层继承）
├── Primitive: Open Props + Open Color（500+ 原始值）
├── Semantic: shadcn background/foreground 模式
└── Context: 海报/PPT/卡片/导航等场景 token

设计工具
└── Penpot: Docker 自托管，端口 9001

组件库
└── shadcn-ui: 56 个 React 组件 + 自定义组件`}
        </pre>
      </section>

      {/* 特性卡片 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">核心特性</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Link key={f.title} href={f.href}>
              <Card className="h-full transition-colors hover:border-foreground/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <Badge variant="secondary">{f.badge}</Badge>
                  </div>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 快速开始 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">快速开始</h2>
        <div className="rounded-xl border border-border bg-muted/50 p-6 font-mono text-sm space-y-2">
          <div><span className="text-muted-foreground"># 安装依赖</span></div>
          <div>pnpm install</div>
          <div className="mt-4"><span className="text-muted-foreground"># 构建 Token</span></div>
          <div>pnpm tokens:build</div>
          <div className="mt-4"><span className="text-muted-foreground"># 启动预览站</span></div>
          <div>pnpm dev</div>
          <div className="mt-4"><span className="text-muted-foreground"># 同步到 open-design-ecosystem</span></div>
          <div>pnpm sync</div>
        </div>
      </section>
    </div>
  );
}
