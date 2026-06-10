import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const colorNames = [
  "gray", "red", "pink", "grape", "violet",
  "indigo", "blue", "cyan", "teal", "green",
  "lime", "yellow", "orange",
];

const colorLabels: Record<string, string> = {
  gray: "灰色", red: "红色", pink: "粉色", grape: "葡萄紫",
  violet: "紫罗兰", indigo: "靛蓝", blue: "蓝色", cyan: "青色",
  teal: "水鸭绿", green: "绿色", lime: "黄绿", yellow: "黄色", orange: "橙色",
};

const colorValues: Record<string, string[]> = {
  gray:   ["#f8f9fa","#f1f3f5","#e9ecef","#dee2e6","#ced4da","#adb5bd","#868e96","#495057","#343a40","#212529"],
  red:    ["#fff5f5","#ffe3e3","#ffc9c9","#ffa8a8","#ff8787","#ff6b6b","#fa5252","#f03e3e","#e03131","#c92a2a"],
  pink:   ["#fff0f6","#ffdeeb","#fcc2d7","#faa2c1","#f783ac","#f06595","#e64980","#d6336c","#c2255c","#a61e4d"],
  grape:  ["#f8f0fc","#f3d9fa","#eebefa","#e599f7","#da77f2","#cc5de8","#be4bdb","#ae3ec9","#9c36b5","#862e9c"],
  violet: ["#f3f0ff","#e5dbff","#d0bfff","#b197fc","#9775fa","#845ef7","#7950f2","#7048e8","#6741d9","#5f3dc4"],
  indigo: ["#edf2ff","#dbe4ff","#bac8ff","#91a7ff","#748ffc","#5c7cfa","#4c6ef5","#4263eb","#3b5bdb","#364fc7"],
  blue:   ["#e7f5ff","#d0ebff","#a5d8ff","#74c0fc","#4dabf7","#339af0","#228be6","#1c7ed6","#1971c2","#1864ab"],
  cyan:   ["#e3fafc","#c5f6fa","#99e9f2","#66d9e8","#3bc9db","#22b8cf","#15aabf","#1098ad","#0c8599","#0b7285"],
  teal:   ["#e6fcf5","#c3fae8","#96f2d7","#63e6be","#38d9a9","#20c997","#12b886","#0ca678","#099268","#087f5b"],
  green:  ["#ebfbee","#d3f9d8","#b2f2bb","#8ce99a","#69db7c","#51cf66","#40c057","#37b24d","#2f9e44","#2b8a3e"],
  lime:   ["#f4fce3","#e9fac8","#d8f5a2","#c0eb75","#a9e34b","#94d82d","#82c91e","#74b816","#66a80f","#5c940d"],
  yellow: ["#fff9db","#fff3bf","#ffec99","#ffe066","#ffd43b","#fcc419","#fab005","#f59f00","#f08c00","#e67700"],
  orange: ["#fff4e6","#ffe8cc","#ffd8a8","#ffc078","#ffa94d","#ff922b","#fd7e14","#f76707","#e8590c","#d9480f"],
};

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export default function ColorsPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Open Color 色彩系统</h1>
        <p className="text-muted-foreground">
          130 个感知一致性色彩。13 色相 × 10 亮度级别（0 最浅，9 最深）。
          同亮度级别的颜色在视觉上保持恒定亮度。
        </p>
      </section>

      {/* 色阶说明 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">色阶使用指南</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2 font-medium">色阶</th>
                <th className="text-left px-4 py-2 font-medium">用途</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="px-4 py-2">0-1</td><td className="px-4 py-2 text-muted-foreground">极浅背景、hover 态</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">2-3</td><td className="px-4 py-2 text-muted-foreground">次要背景、边框</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">4-5</td><td className="px-4 py-2 text-muted-foreground">中间态、辅助文字</td></tr>
              <tr className="border-b border-border"><td className="px-4 py-2">6-7</td><td className="px-4 py-2 text-muted-foreground">主色、交互色（链接、按钮）</td></tr>
              <tr><td className="px-4 py-2">8-9</td><td className="px-4 py-2 text-muted-foreground">深色文字、强调</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* 色板 */}
      {colorNames.map((name) => (
        <section key={name}>
          <h2 className="text-lg font-semibold mb-3">
            {colorLabels[name]} <span className="text-muted-foreground font-normal text-sm">({name})</span>
          </h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-1">
            {colorValues[name].map((hex, i) => (
              <div key={hex} className="flex flex-col">
                <div
                  className="h-12 rounded-md border border-border flex items-center justify-center text-[10px] font-mono"
                  style={{ backgroundColor: hex, color: getTextColor(hex) }}
                >
                  {i}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground text-center mt-1">
                  {hex}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
