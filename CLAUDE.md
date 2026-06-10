# Frontend Design System

## 自动绑定 open-design-ecosystem

**当在这个项目工作时，自动加载以下关联资源：**

- `~/github/open-design-ecosystem/design-systems/` — 173 个设计系统参考（含 shadcn-base 组件）
- `~/github/open-design-ecosystem/design-templates/` — 海报/PPT/原型/图片模板
- `~/github/open-design-ecosystem/skills/` — Agent 技能（布局、排版、配色、导出等）
- `~/github/open-design-ecosystem/craft/` — 通用设计规则
- `~/github/open-design-ecosystem/prompt-templates/` — AI 设计 prompt 模板

**工作流规则：**

1. 设计前端网页时，先读 `DESIGN.md` 获取 token 规范
2. 组件开发时，参考 `~/github/open-design-ecosystem/design-systems/` 里已有的设计模式
3. 需要设计模板时，从 `~/github/open-design-ecosystem/design-templates/` 获取
4. 修改 token 后，自动运行 `./scripts/sync-to-open-design.mjs` 同步
5. 使用 shadcn 组件时，遵循 `packages/tokens/src/semantic.css` 的语义 token

**Token 使用规则：**

- 必须用语义 token（`--primary`、`--background`），禁止硬编码色值
- 组件样式用 `--{context}-{element}-{prop}` 命名
- 暗色模式通过 `.dark` 类切换，组件自动适配

## 目录结构

```
packages/tokens/src/          # Token 源文件（三层架构）
├── primitive.css             # Layer 1: Open Props + Open Color
├── semantic.css              # Layer 2: shadcn 语义层
├── context.css               # Layer 3: 场景层（海报/PPT/卡片等）
└── tokens.css                # 入口文件

apps/web/src/components/ui/   # shadcn 组件
apps/web/src/app/             # Next.js 页面

scripts/sync-to-open-design.mjs  # 同步脚本
DESIGN.md                        # 设计规范
CHECKLIST.md                     # 检查清单
llms.txt                         # AI 说明书
```

## 关联项目操作

```bash
# 同步到 open-design-ecosystem
node scripts/sync-to-open-design.mjs --target ~/github/open-design-ecosystem

# 查看 open-design-ecosystem 的设计系统
ls ~/github/open-design-ecosystem/design-systems/

# 使用 open-design-ecosystem 的模板
cat ~/github/open-design-ecosystem/design-templates/README.md
```
