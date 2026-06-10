#!/usr/bin/env node
/**
 * Export tokens to JSON format for Penpot import
 * 输出 DTCG（Design Token Community Group）兼容格式
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'src');
const distDir = join(root, 'dist');

mkdirSync(distDir, { recursive: true });

// 读取 Open Color JSON
const ocData = JSON.parse(readFileSync(join(srcDir, 'open-color.json'), 'utf8'));

// 构建 DTCG 格式的 token JSON
const tokens = {
  color: {},
  spacing: {},
  radius: {},
  fontSize: {},
  shadow: {}
};

// === 颜色：Open Color ===
const colorNames = ['gray','red','pink','grape','violet','indigo','blue','cyan','teal','green','lime','yellow','orange'];
const colorLabels = ['gray','red','pink','grape','violet','indigo','blue','cyan','teal','green','lime','yellow','orange'];

for (let i = 0; i < colorNames.length; i++) {
  const name = colorNames[i];
  const label = colorLabels[i];
  tokens.color[label] = {};
  for (let shade = 0; shade <= 9; shade++) {
    tokens.color[label][`shade-${shade}`] = {
      $type: 'color',
      $value: ocData[name][shade],
      $description: `Open Color ${label}-${shade}`
    };
  }
}

// 黑白
tokens.color.white = { $type: 'color', $value: '#ffffff' };
tokens.color.black = { $type: 'color', $value: '#000000' };

// === 语义色 ===
const semanticColors = {
  'background': '#f8f9fa',
  'foreground': '#212529',
  'card': '#ffffff',
  'primary': '#4263eb',
  'primary-foreground': '#ffffff',
  'secondary': '#f1f3f5',
  'muted': '#f1f3f5',
  'muted-foreground': '#868e96',
  'accent': '#edf2ff',
  'destructive': '#fa5252',
  'border': '#dee2e6',
  'input': '#dee2e6',
  'ring': '#4c6ef5',
  'success': '#37b24d',
  'warning': '#f59f00',
  'info': '#228be6',
  'error': '#fa5252'
};

tokens.color.semantic = {};
for (const [name, value] of Object.entries(semanticColors)) {
  tokens.color.semantic[name] = {
    $type: 'color',
    $value: value,
    $description: `Semantic color: ${name}`
  };
}

// === 间距 ===
const spacingValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32];
for (const s of spacingValues) {
  tokens.spacing[`space-${s}`] = {
    $type: 'dimension',
    $value: `${s * 4}px`,
    $description: `Spacing ${s} (${s * 4}px)`
  };
}

// === 圆角 ===
const radiusValues = { sm: 4, md: 8, lg: 12, xl: 16, '2xl': 24, full: 9999 };
for (const [name, value] of Object.entries(radiusValues)) {
  tokens.radius[`radius-${name}`] = {
    $type: 'dimension',
    $value: `${value}px`,
    $description: `Border radius: ${name}`
  };
}

// === 字号 ===
const fontSizes = {
  xs: 12, sm: 14, base: 16, lg: 18,
  xl: 20, '2xl': 24, '3xl': 30, '4xl': 36,
  '5xl': 48, '6xl': 60, '7xl': 72
};
for (const [name, value] of Object.entries(fontSizes)) {
  tokens.fontSize[`size-${name}`] = {
    $type: 'dimension',
    $value: `${value}px`,
    $description: `Font size: ${name}`
  };
}

// === 阴影 ===
const shadows = {
  sm: '0 1px 2px -1px rgba(0,0,0,0.1)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
};
for (const [name, value] of Object.entries(shadows)) {
  tokens.shadow[`shadow-${name}`] = {
    $type: 'shadow',
    $value: value,
    $description: `Box shadow: ${name}`
  };
}

// 输出
const output = JSON.stringify(tokens, null, 2);
writeFileSync(join(distDir, 'tokens.json'), output);
console.log(`✅ tokens.json exported (${Object.keys(tokens.color).length} color groups, ${Object.keys(tokens.spacing).length} spacing tokens)`);
console.log(`📁 Output: ${join(distDir, 'tokens.json')}`);
