# Agent 工作指南

## 双项目联动模式

当你在这个项目工作时，你同时拥有两个项目的资源：

### 你的设计语言（frontend-design-system）

| 资源 | 路径 | 用途 |
|------|------|------|
| Token 定义 | `packages/tokens/src/` | 三层 token 架构 |
| shadcn 组件 | `apps/web/src/components/ui/` | 11 个 React 组件 |
| 设计规范 | `DESIGN.md` | 命名规则、色彩使用 |
| 检查清单 | `CHECKLIST.md` | 发布前检查项 |

### 可参考的素材库（open-design-ecosystem）

| 资源 | 路径 | 用途 |
|------|------|------|
| 173 个设计系统 | `~/github/open-design-ecosystem/design-systems/` | 参考其他设计系统的实现 |
| 设计模板 | `~/github/open-design-ecosystem/design-templates/` | 海报/PPT/原型模板 |
| Agent 技能 | `~/github/open-design-ecosystem/skills/` | 布局/排版/配色技巧 |
| 设计规则 | `~/github/open-design-ecosystem/craft/` | 通用设计约束 |
| Prompt 模板 | `~/github/open-design-ecosystem/prompt-templates/` | AI 设计 prompt |

## 工作流程

### 创建新页面

1. 读 `DESIGN.md` → 确定用哪些 token
2. 读 `packages/tokens/src/semantic.css` → 确定可用的语义 token
3. 读 `~/github/open-design-ecosystem/design-systems/` → 参考类似页面的实现
4. 用 shadcn 组件 + token 生成代码
5. 运行 `CHECKLIST.md` 检查

### 修改 Token

1. 编辑 `packages/tokens/src/semantic.css`（语义层）
2. 运行 `node scripts/sync-to-open-design.mjs` 同步
3. 在 Next.js 预览站验证效果

### 设计海报/PPT

1. 读 `packages/tokens/src/context.css` → 用 `--poster-*` / `--ppt-*` token
2. 读 `~/github/open-design-ecosystem/design-templates/` → 参考模板
3. 生成 HTML + CSS
4. 用 Puppeteer 渲染为图片

## Token 使用规则

```css
/* ✅ 正确：用语义 token */
.my-component {
  background: var(--card);
  color: var(--foreground);
  border: 1px solid var(--border);
}

/* ❌ 错误：硬编码色值 */
.my-component {
  background: #ffffff;
  color: #212529;
}
```

## 同步规则

修改 token 后必须同步：
```bash
node scripts/sync-to-open-design.mjs --target ~/github/open-design-ecosystem
```

这会更新 open-design-ecosystem 的 shadcn-base/tokens.css 和所有 shadcn 组件的 token。
