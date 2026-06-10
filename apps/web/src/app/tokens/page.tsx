import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const layers = [
  {
    name: "Primitive（原始值）",
    description: "Open Props + Open Color 提供的原始设计值",
    color: "bg-blue-500",
    items: [
      { token: "--oc-{color}-{shade}", example: "--oc-indigo-7: #4263eb", desc: "Open Color 色值" },
      { token: "--size-{n}", example: "--size-4: 1rem", desc: "间距（n × 4px）" },
      { token: "--shadow-{level}", example: "--shadow-2: ...", desc: "阴影" },
      { token: "--font-size-{size}", example: "--font-size-lg: 1.125rem", desc: "字号" },
      { token: "--radius-{size}", example: "--radius-md: 0.375rem", desc: "圆角" },
    ],
  },
  {
    name: "Semantic（语义层）",
    description: "shadcn background/foreground 配对模式",
    color: "bg-violet-500",
    items: [
      { token: "--background / --foreground", example: "#FFFFFF / #212529", desc: "页面底色/文字" },
      { token: "--primary / --primary-foreground", example: "#4263eb / #FFFFFF", desc: "主色/主色文字" },
      { token: "--secondary / --secondary-foreground", example: "#F1F3F5 / #212529", desc: "次要/次要文字" },
      { token: "--muted / --muted-foreground", example: "#F1F3F5 / #868E96", desc: "弱化/弱化文字" },
      { token: "--destructive / --destructive-foreground", example: "#FA5252 / #FFFFFF", desc: "危险/危险文字" },
      { token: "--border / --input / --ring", example: "#DEE2E6 / #DEE2E6 / #4C6EF5", desc: "边框/输入框/焦点" },
    ],
  },
  {
    name: "Context（场景层）",
    description: "特定用途的 token 覆盖",
    color: "bg-emerald-500",
    items: [
      { token: "--card-*", example: "--card-bg, --card-border, --card-radius", desc: "卡片" },
      { token: "--btn-*", example: "--btn-primary-bg, --btn-radius, --btn-font-size", desc: "按钮" },
      { token: "--input-*", example: "--input-bg, --input-border, --input-radius", desc: "输入框" },
      { token: "--nav-*", example: "--nav-bg, --nav-height, --nav-padding", desc: "导航" },
      { token: "--poster-*", example: "--poster-bg, --poster-title-size, --poster-gradient", desc: "海报" },
      { token: "--ppt-*", example: "--ppt-width, --ppt-height, --ppt-title-size", desc: "演示文稿" },
      { token: "--article-*", example: "--article-max-width, --article-line-height", desc: "文章" },
    ],
  },
];

const semanticColors = [
  { name: "background", value: "var(--background)", label: "页面底色" },
  { name: "foreground", value: "var(--foreground)", label: "默认文字" },
  { name: "card", value: "var(--card)", label: "卡片背景" },
  { name: "primary", value: "var(--primary)", label: "主色" },
  { name: "secondary", value: "var(--secondary)", label: "次要" },
  { name: "muted", value: "var(--muted)", label: "弱化" },
  { name: "accent", value: "var(--accent)", label: "强调" },
  { name: "destructive", value: "var(--destructive)", label: "危险" },
  { name: "border", value: "var(--border)", label: "边框" },
  { name: "ring", value: "var(--ring)", label: "焦点环" },
];

export default function TokensPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Token 体系</h1>
        <p className="text-muted-foreground">
          三层继承架构，参考 CMS Gov Design System。修改 Primitive 层，全链路自动更新。
        </p>
      </section>

      {/* 三层架构 */}
      {layers.map((layer) => (
        <section key={layer.name}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${layer.color}`} />
            <h2 className="text-xl font-semibold">{layer.name}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{layer.description}</p>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2 font-medium">Token</th>
                  <th className="text-left px-4 py-2 font-medium">示例值</th>
                  <th className="text-left px-4 py-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody>
                {layer.items.map((item) => (
                  <tr key={item.token} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 font-mono text-xs">{item.token}</td>
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{item.example}</td>
                    <td className="px-4 py-2 text-muted-foreground">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <Separator />

      {/* 语义色预览 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">语义色预览</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {semanticColors.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div
                className="h-16 rounded-lg border border-border"
                style={{ backgroundColor: c.value }}
              />
              <div>
                <div className="text-xs font-mono">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* 命名规范 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">命名规范</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">类别</th>
                <th className="text-left px-4 py-2 font-medium">格式</th>
                <th className="text-left px-4 py-2 font-medium">示例</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">原始色</td><td className="px-4 py-2 font-mono text-xs">--oc-{'{color}'}-{'{shade}'}</td><td className="px-4 py-2 font-mono text-xs">--oc-indigo-7</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">语义色</td><td className="px-4 py-2 font-mono text-xs">--{'{role}'}</td><td className="px-4 py-2 font-mono text-xs">--primary, --background</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">场景色</td><td className="px-4 py-2 font-mono text-xs">--{'{context}'}-{'{element}'}-{'{prop}'}</td><td className="px-4 py-2 font-mono text-xs">--btn-primary-bg</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">间距</td><td className="px-4 py-2 font-mono text-xs">--size-{'{n}'}</td><td className="px-4 py-2 font-mono text-xs">--size-4（1rem）</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">圆角</td><td className="px-4 py-2 font-mono text-xs">--radius-{'{size}'}</td><td className="px-4 py-2 font-mono text-xs">--radius-md</td></tr>
              <tr><td className="px-4 py-2">阴影</td><td className="px-4 py-2 font-mono text-xs">--shadow-{'{level}'}</td><td className="px-4 py-2 font-mono text-xs">--shadow-2</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
