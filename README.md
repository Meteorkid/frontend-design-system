# Frontend Design System

基于 **Open Props** + **shadcn-ui** + **Open Color** + **Penpot** 的前端设计系统。

## 架构

```
Token 层（三层继承）
├── Primitive: Open Props + Open Color（500+ 原始值）
├── Semantic: shadcn background/foreground 模式
└── Context: 海报/PPT/卡片/导航等场景 token

设计工具
└── Penpot: Docker 自托管，端口 9001

组件库
└── shadcn-ui: 56 个 React 组件 + 自定义组件
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 构建 Token
pnpm tokens:build

# 导出 Token JSON（供 Penpot 导入）
pnpm tokens:export

# 启动 Next.js 预览站
pnpm dev

# 启动 Penpot
pnpm penpot:up
# 访问 http://localhost:9001
```

## 目录结构

```
├── apps/web/              # Next.js 文档/预览站
├── packages/tokens/       # Token 系统（三层架构）
│   ├── src/
│   │   ├── primitive.css  # Layer 1: 原始值
│   │   ├── semantic.css   # Layer 2: 语义层
│   │   ├── context.css    # Layer 3: 场景层
│   │   └── tokens.css     # 入口文件
│   └── dist/
│       ├── tokens.css     # 合并后的 CSS
│       └── tokens.json    # DTCG 格式（Penpot 导入用）
├── packages/components/   # shadcn 组件
├── penpot/                # Penpot Docker 配置
├── DESIGN.md              # 设计规范
├── CHECKLIST.md           # 设计检查清单
└── llms.txt               # AI 说明书
```

## Token 使用

```css
/* 在你的 CSS/组件中引用 token */
.my-component {
  background: var(--card);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--size-4);
}
```

## Penpot 集成

1. 启动 Penpot：`pnpm penpot:up`
2. 访问 `http://localhost:9001`，创建账户
3. 导入 Token：Assets → Design Tokens → 导入 `packages/tokens/dist/tokens.json`
4. 在设计中使用 Token 绑定元素属性

## 参考项目

- [Open Props](https://github.com/argyleink/open-props) — 500+ CSS 设计 token
- [shadcn-ui](https://github.com/shadcn-ui/ui) — 56 个 React 组件
- [Open Color](https://github.com/yeun/open-color) — 130 个感知一致性色彩
- [Penpot](https://github.com/penpot/penpot) — 开源设计工具
- [CMS Gov Design System](https://github.com/CMSgov/design-system) — 三层 token 架构参考
