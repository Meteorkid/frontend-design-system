# 设计规范

## Token 三层架构

本系统采用 CMS Gov Design System 的三层 token 继承模式：

```
Layer 1: Primitive（原始值）
  ├── Open Props：500+ CSS 变量（字体/阴影/渐变/动画/间距/断点）
  ├── Open Color：130 个感知一致性色彩（13 色相 × 10 亮度）
  └── 命名：--oc-{color}-{shade}、--size-{n}、--shadow-{n}

Layer 2: Semantic（语义层）
  ├── shadcn 模式：background/foreground 配对
  ├── 命名：--background、--foreground、--primary、--secondary
  └── 暗色主题：通过 .dark 类切换

Layer 3: Context（场景层）
  ├── 网站：--card-*、--nav-*、--btn-*、--input-*
  ├── 海报：--poster-*
  ├── PPT：--ppt-*
  └── 文章：--article-*
```

**修改规则**：只修改 Primitive 层的值，全链路自动级联更新。

## 命名规范

| 类别 | 格式 | 示例 |
|------|------|------|
| 原始色 | `--oc-{color}-{shade}` | `--oc-indigo-7` |
| 语义色 | `--{role}` | `--primary`、`--background` |
| 场景色 | `--{context}-{element}-{prop}` | `--btn-primary-bg` |
| 间距 | `--size-{n}` | `--size-4`（1rem） |
| 圆角 | `--radius-{size}` | `--radius-md` |
| 阴影 | `--shadow-{level}` | `--shadow-2` |
| 字号 | `--font-size-{size}` | `--font-size-lg` |

## 色彩使用规则

| 色阶 | 用途 |
|------|------|
| 0-1 | 极浅背景、hover 态 |
| 2-3 | 次要背景、边框 |
| 4-5 | 中间态、辅助文字 |
| 6-7 | 主色、交互色（链接、按钮） |
| 8-9 | 深色文字、强调 |

## 组件规范

- 每个组件使用语义 token，不直接使用原始色值
- 暗色模式通过 `.dark` 类切换，组件自动适配
- 所有交互元素需要焦点环（`--ring` token）
- 对比度要求：正文 ≥ 4.5:1，大标题 ≥ 3:1（WCAG AA）
