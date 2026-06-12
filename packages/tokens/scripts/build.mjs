#!/usr/bin/env node
/**
 * Build script: 合并三层 token CSS 并导出 JSON
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'src');
const distDir = join(root, 'dist');

mkdirSync(distDir, { recursive: true });

// 读取三层 CSS
let primitive = readFileSync(join(srcDir, 'primitive.css'), 'utf8');
const semantic = readFileSync(join(srcDir, 'semantic.css'), 'utf8');
const context = readFileSync(join(srcDir, 'context.css'), 'utf8');

// 内联 open-props，消除嵌套 @import 依赖
const openPropsPath = join(root, 'node_modules/open-props/open-props.min.css');
const openProps = readFileSync(openPropsPath, 'utf8');
primitive = primitive.replace(/^@import "open-props";$/m, openProps);

// 合并为一个 CSS 文件
const combined = `/*
 * Frontend Design System — Design Tokens
 * 自动生成，请勿手动编辑
 *
 * 三层架构：
 *   1. Primitive: Open Props + Open Color 原始值
 *   2. Semantic: shadcn 风格的语义 token
 *   3. Context: 海报/PPT/卡片等场景 token
 */

/* ============================================
   Layer 1: Primitive Tokens
   ============================================ */
${primitive}

/* ============================================
   Layer 2: Semantic Tokens
   ============================================ */
${semantic}

/* ============================================
   Layer 3: Context Tokens
   ============================================ */
${context}
`;

writeFileSync(join(distDir, 'tokens.css'), combined);
console.log('✅ tokens.css built');
