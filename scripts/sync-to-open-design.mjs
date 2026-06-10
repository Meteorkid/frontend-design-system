#!/usr/bin/env node
/**
 * sync-to-open-design.mjs
 *
 * 将 frontend-design-system 的 token 和组件同步到 open-design-ecosystem
 *
 * 用法：
 *   node scripts/sync-to-open-design.mjs --target ~/github/open-design-ecosystem
 *   node scripts/sync-to-open-design.mjs --tokens-only
 *   node scripts/sync-to-open-design.mjs --component button
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── 参数解析 ──────────────────────────────────────────────
const args = process.argv.slice(2);
const targetIdx = args.indexOf('--target');
const TARGET = targetIdx >= 0 ? args[targetIdx + 1] : join(ROOT, '..', 'open-design-ecosystem');
const TOKENS_ONLY = args.includes('--tokens-only');
const COMPONENT_FILTER = args.includes('--component') ? args[args.indexOf('--component') + 1] : null;

console.log(`\n🔄 同步到: ${TARGET}\n`);

// ── 验证目标目录 ──────────────────────────────────────────
const dsDir = join(TARGET, 'design-systems');
if (!existsSync(dsDir)) {
  console.error(`❌ 目标目录不存在: ${dsDir}`);
  process.exit(1);
}

// ── 读取源 Token ──────────────────────────────────────────
const primitiveCSS = readFileSync(join(ROOT, 'packages/tokens/src/primitive.css'), 'utf8');
const semanticCSS = readFileSync(join(ROOT, 'packages/tokens/src/semantic.css'), 'utf8');
const contextCSS = readFileSync(join(ROOT, 'packages/tokens/src/context.css'), 'utf8');

// ── 工具函数 ──────────────────────────────────────────────

/**
 * 从 CSS 中提取变量定义
 */
function extractVars(css) {
  const vars = {};
  const regex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

/**
 * 映射语义 token 到 --od-* 格式（解析为实际色值）
 */
function mapToOdTokens(semanticVars, primitiveVars) {
  const mapping = {
    'bg': 'background',
    'surface': 'card',
    'text': 'foreground',
    'text-muted': 'muted-foreground',
    'border': 'border',
    'focus': 'ring',
    'danger': 'destructive',
    'disabled-bg': 'muted',
    'disabled-text': 'muted-foreground',
    'accent': 'primary',
    'accent-on': 'primary-foreground',
  };

  // 颜色解析：将 var(--oc-*) 解析为实际 hex 值
  const colorMap = {};
  for (const [k, v] of Object.entries(primitiveVars)) {
    if (k.startsWith('oc-') && v.match(/^#[0-9a-fA-F]/)) {
      colorMap[`var(--${k})`] = v;
    }
  }

  function resolveValue(val) {
    return colorMap[val] || val;
  }

  const odVars = {};
  for (const [odKey, semanticKey] of Object.entries(mapping)) {
    if (semanticVars[semanticKey]) {
      odVars[`od-${odKey}`] = resolveValue(semanticVars[semanticKey]);
    }
  }
  return odVars;
}

// ── 1. 同步 shadcn-base/tokens.css ──────────────────────
function syncBaseTokens() {
  console.log('📦 同步 shadcn-base/tokens.css ...');

  const semanticVars = extractVars(semanticCSS);
  const primitiveVars = extractVars(primitiveCSS);
  const odVars = mapToOdTokens(semanticVars, primitiveVars);

  // 提取字体和间距
  const contextVars = extractVars(contextCSS);

  const baseCSS = `/* ─────────────────────────────────────────────────────────────────────────
 * shadcn-base/tokens.css
 *
 * 由 frontend-design-system 自动生成
 * 源：Open Props + Open Color + shadcn 语义层
 * 同步时间：${new Date().toISOString()}
 * ───────────────────────────────────────────────────────────────────────── */

:root {
  /* ── 语义色（映射自三层 token 架构） ── */
${Object.entries(odVars).map(([k, v]) => `  --${k}: ${v};`).join('\n')}

  /* ── 字体 ── */
  --od-font-family: 'Geist', 'Geist Sans', -apple-system, system-ui, sans-serif;
  --od-font-size-sm: 14px;
  --od-font-size-base: 16px;
  --od-font-weight-normal: 400;
  --od-font-weight-medium: 500;

  /* ── 间距（源自 Open Props） ── */
  --od-space-1: 4px;
  --od-space-2: 8px;
  --od-space-3: 12px;
  --od-space-4: 16px;
  --od-space-6: 24px;

  /* ── 尺寸 ── */
  --od-height-sm: 32px;
  --od-height-default: 40px;
  --od-height-lg: 48px;

  /* ── 圆角 ── */
  --od-radius-sm: 6px;
  --od-radius-md: 8px;

  /* ── 动效 ── */
  --od-transition: 150ms ease-in-out;

  /* ── 焦点环 ── */
  --od-focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* ── 暗色模式 ── */
@media (prefers-color-scheme: dark) {
  :root {
    --od-bg: #09090B;
    --od-surface: #18181B;
    --od-text: #FAFAFA;
    --od-text-muted: #71717A;
    --od-border: #27272A;
    --od-focus: #845EF7;
    --od-danger: #F03E3E;
    --od-disabled-bg: #18181B;
    --od-disabled-text: #71717A;
    --od-accent: #FAFAFA;
    --od-accent-on: #09090B;
  }
}
`;

  const outDir = join(dsDir, 'shadcn-base');
  writeFileSync(join(outDir, 'tokens.css'), baseCSS);
  console.log('  ✅ shadcn-base/tokens.css');
}

// ── 2. 同步组件 tokens ───────────────────────────────────
const COMPONENT_DEFS = {
  button: {
    name: 'Shadcn Button',
    description: 'shadcn-ui Button component plugin, supporting 6 variants (default, destructive, outline, secondary, ghost, link) with 3 sizes.',
    variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    sizes: ['sm', 'default', 'lg'],
    semanticMap: {
      default: { bg: 'primary', fg: 'primary-foreground', hover: 'primary' },
      destructive: { bg: 'destructive', fg: 'destructive-foreground', hover: 'destructive' },
      outline: { bg: 'transparent', fg: 'primary', border: 'border' },
      secondary: { bg: 'secondary', fg: 'secondary-foreground', hover: 'secondary' },
      ghost: { bg: 'transparent', fg: 'foreground', hover: 'muted' },
      link: { bg: 'transparent', fg: 'primary', underline: true },
    },
  },
  input: {
    name: 'Shadcn Input',
    description: 'shadcn-ui Text Input component, supporting 7 types with 3 sizes.',
    variants: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    sizes: ['sm', 'default', 'lg'],
    semanticMap: {
      default: { bg: 'background', border: 'input', focus: 'ring' },
    },
  },
  textarea: {
    name: 'Shadcn Textarea',
    description: 'shadcn-ui Multi-line Text Input component with 3 sizes.',
    variants: ['default'],
    sizes: ['sm', 'default', 'lg'],
    semanticMap: {
      default: { bg: 'background', border: 'input', focus: 'ring' },
    },
  },
  select: {
    name: 'Shadcn Select',
    description: 'shadcn-ui Dropdown Select menu with 3 sizes.',
    variants: ['default'],
    sizes: ['sm', 'default', 'lg'],
    semanticMap: {
      default: { bg: 'background', border: 'input', focus: 'ring' },
    },
  },
  checkbox: {
    name: 'Shadcn Checkbox',
    description: 'shadcn-ui Multi-select Checkbox with indeterminate state and 3 sizes.',
    variants: ['default'],
    sizes: ['sm', 'default', 'lg'],
    semanticMap: {
      default: { bg: 'primary', border: 'input', focus: 'ring' },
    },
  },
  radio: {
    name: 'Shadcn Radio',
    description: 'shadcn-ui Single-select Radio group with 3 sizes.',
    variants: ['default'],
    sizes: ['sm', 'default', 'lg'],
    semanticMap: {
      default: { bg: 'primary', border: 'input', focus: 'ring' },
    },
  },
};

function syncComponent(name) {
  const def = COMPONENT_DEFS[name];
  if (!def) {
    console.log(`  ⚠️  未知组件: ${name}`);
    return;
  }

  const outDir = join(dsDir, `shadcn-${name}`);
  mkdirSync(outDir, { recursive: true });

  const semanticVars = extractVars(semanticCSS);
  const primitiveVars = extractVars(primitiveCSS);

  // 颜色解析：var(--oc-*) → hex
  const colorMap = {};
  for (const [k, v] of Object.entries(primitiveVars)) {
    if (k.startsWith('oc-') && v.match(/^#[0-9a-fA-F]/)) {
      colorMap[`var(--${k})`] = v;
    }
  }
  function resolve(val) {
    if (val === 'transparent') return 'transparent';
    const resolved = semanticVars[val] || `var(--${val})`;
    return colorMap[resolved] || resolved;
  }

  // ── tokens.css ──
  const tokenLines = [];
  for (const [variant, map] of Object.entries(def.semanticMap)) {
    const prefix = variant === 'default' ? '' : `${variant}-`;
    for (const [prop, semanticKey] of Object.entries(map)) {
      if (prop === 'underline') continue;
      tokenLines.push(`  --${name}-${prefix}${prop}: ${resolve(semanticKey)};`);
    }
  }

  // 尺寸 tokens
  const sizeTokens = {
    sm: { height: '32px', padding: '8px 12px', fontSize: '14px', iconSize: '14px' },
    default: { height: '40px', padding: '8px 16px', fontSize: '16px', iconSize: '16px' },
    lg: { height: '48px', padding: '12px 24px', fontSize: '16px', iconSize: '16px' },
  };

  for (const [size, vals] of Object.entries(sizeTokens)) {
    const suffix = size === 'default' ? '' : `-${size}`;
    tokenLines.push(`  --${name}-height${suffix}: ${vals.height};`);
    tokenLines.push(`  --${name}-padding${suffix}: ${vals.padding};`);
    tokenLines.push(`  --${name}-font-size${suffix}: ${vals.fontSize};`);
    tokenLines.push(`  --${name}-icon-size${suffix}: ${vals.iconSize};`);
  }

  // 通用 tokens
  tokenLines.push(`  --${name}-radius: 6px;`);
  tokenLines.push(`  --${name}-radius-sm: 4px;`);
  tokenLines.push(`  --${name}-radius-lg: 8px;`);
  tokenLines.push(`  --${name}-font-weight: 500;`);
  tokenLines.push(`  --${name}-line-height: 1.5;`);
  tokenLines.push(`  --${name}-focus-ring: 0 0 0 2px #FFFFFF, 0 0 0 4px var(--${name}-bg, #3B82F6);`);
  tokenLines.push(`  --${name}-focus-offset: 2px;`);
  tokenLines.push(`  --${name}-transition: all 150ms ease-in-out;`);
  tokenLines.push(`  --${name}-disabled-opacity: 0.5;`);
  tokenLines.push(`  --${name}-disabled-cursor: not-allowed;`);
  tokenLines.push(`  --${name}-icon-gap: 8px;`);

  const tokensCSS = `/* ${def.name} Tokens */
/* Generated from frontend-design-system three-layer token architecture */
/* 源：packages/tokens/src/semantic.css */

@import url('../shadcn-base/tokens.css');

:root {
${tokenLines.join('\n')}
}
`;

  writeFileSync(join(outDir, 'tokens.css'), tokensCSS);

  // ── manifest.json ──
  const manifest = {
    schemaVersion: 'od-design-system-project/v1',
    id: `shadcn-${name}`,
    name: def.name,
    category: 'Components',
    description: def.description,
    source: { type: 'bundled', origin: 'shadcn-ui component converted to Open Design format' },
    files: {
      design: 'DESIGN.md',
      tokens: 'tokens.css',
      designTokens: 'design-tokens.json',
      components: 'components.html',
    },
    usage: 'USAGE.md',
    importMode: 'normalized',
    craft: {
      applies: [],
      suggested: ['color', 'accessibility-baseline'],
      exemptions: [],
    },
  };
  writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // ── design-tokens.json ──
  const designTokens = {
    schemaVersion: 'od-design-tokens/v1',
    id: `shadcn-${name}-tokens`,
    name: `${def.name} Design Tokens`,
    description: `Design tokens for ${def.name}`,
    color: { [name]: {} },
  };

  for (const [variant, map] of Object.entries(def.semanticMap)) {
    designTokens.color[name][variant] = {};
    for (const [prop, semanticKey] of Object.entries(map)) {
      if (prop === 'underline') continue;
      designTokens.color[name][variant][prop] = resolve(semanticKey);
    }
  }

  writeFileSync(join(outDir, 'design-tokens.json'), JSON.stringify(designTokens, null, 2));

  // ── DESIGN.md ──
  const designMd = `# Design System: ${def.name}

> Category: Components
> ${def.description}

## 1. Visual Theme & Atmosphere

shadcn-ui ${name} component with minimal, clean design, monochrome palette, and utility-first patterns.

- **Visual style:** minimal, clean
- **Design intent:** Keep outputs recognizable to shadcn style while preserving usability and accessibility.

## 2. Color

${def.variants.map(v => {
  const map = def.semanticMap[v] || def.semanticMap.default;
  return `- **${v}:** \`${semanticVars[map.bg] || map.bg}\` — ${v} variant background.`;
}).join('\n')}
- **Border:** \`${semanticVars.border || '#E5E7EB'}\` — Default border color.
- **Focus Ring:** \`${semanticVars.ring || '#3B82F6'}\` — Focus ring color.

## 3. Typography

- **Scale:** 14/16
- **Families:** primary=Geist, display=Geist, mono=Fira Code
- **Weights:** 500, 600

## 4. Spacing & Grid

- **Component padding:** 8px 16px (default), 8px 12px (sm), 12px 24px (lg)
- **Icon gap:** 8px

## 5. Sizing

- **Heights:** 32px (sm), 40px (default), 48px (lg)
- **Border radius:** 6px (default), 4px (sm), 8px (lg)

## 6. States & Interactions

- **Hover:** background darkens or lightens depending on variant
- **Focus:** 2px focus ring with offset
- **Disabled:** 50% opacity, not-allowed cursor
- **Transition:** 150ms ease-in-out

## 7. Accessibility

- Minimum touch target: 44px (WCAG 2.5.5)
- Focus visible for keyboard navigation
- Color contrast: ≥ 4.5:1 for text on backgrounds

## 8. Variants

${def.variants.map(v => `- **${v}**`).join('\n')}

## 9. Sizes

${def.sizes.map(s => `- **${s}**`).join('\n')}
`;

  writeFileSync(join(outDir, 'DESIGN.md'), designMd);

  // ── USAGE.md ──
  const usageMd = `# ${def.name} Usage

## Import

\`\`\`css
@import url('../shadcn-base/tokens.css');
@import url('./tokens.css');
\`\`\`

## CSS Variables

All tokens are prefixed with \`--${name}-\`. Override them to customize:

\`\`\`css
:root {
  --${name}-bg: var(--primary);
  --${name}-fg: var(--primary-foreground);
}
\`\`\`

## Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 32px | 8px 12px | 14px |
| default | 40px | 8px 16px | 16px |
| lg | 48px | 12px 24px | 16px |

## Dark Mode

Tokens automatically adapt via the base \`shadcn-base/tokens.css\` dark mode rules.
`;

  writeFileSync(join(outDir, 'USAGE.md'), usageMd);

  console.log(`  ✅ shadcn-${name}/`);
}

// ── 执行同步 ──────────────────────────────────────────────
console.log('━'.repeat(50));

// 1. 同步 base tokens
syncBaseTokens();

// 2. 同步组件
if (!TOKENS_ONLY) {
  console.log('\n📦 同步组件 ...');
  const components = COMPONENT_FILTER ? [COMPONENT_FILTER] : Object.keys(COMPONENT_DEFS);
  for (const name of components) {
    syncComponent(name);
  }
}

console.log('\n' + '━'.repeat(50));
console.log('✅ 同步完成！');
console.log(`\n📁 目标: ${dsDir}`);
console.log(`📦 组件: ${TOKENS_ONLY ? '跳过' : (COMPONENT_FILTER ? COMPONENT_FILTER : Object.keys(COMPONENT_DEFS).length + ' 个')}`);
console.log(`🎨 Token: shadcn-base/tokens.css\n`);
