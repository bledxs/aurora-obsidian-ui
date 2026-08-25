#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// ANSI console color palette
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

function printBanner() {
  console.log(`
${c.cyan}${c.bold}  ❖ AURORA OBSIDIAN UI${c.reset} ${c.dim}v0.1.1${c.reset}
  ${c.dim}High-fidelity, accessible design system for modern e-commerce${c.reset}
`);
}

function printHelp() {
  printBanner();
  console.log(`${c.bold}USAGE:${c.reset}`);
  console.log(`  ${c.green}npx aurora-obsidian-ui${c.reset} <command> [options]\n`);

  console.log(`${c.bold}AVAILABLE COMMANDS:${c.reset}`);
  console.log(
    `  ${c.cyan}init${c.reset}                    Initialize Aurora configuration and aliases in your project`,
  );
  console.log(
    `  ${c.cyan}add${c.reset} <component...>      Install components and automatically resolve dependencies`,
  );
  console.log(`  ${c.cyan}list${c.reset}                    Display all available components`);
  console.log(`  ${c.cyan}help${c.reset}                    Show this help menu\n`);

  console.log(`${c.bold}OPTIONS:${c.reset}`);
  console.log(
    `  ${c.yellow}--path <directory>${c.reset}   Custom target directory (default: src/components/ui)`,
  );
  console.log(
    `  ${c.yellow}--all${c.reset}                Install all components from the registry`,
  );
  console.log(`  ${c.yellow}--overwrite${c.reset}          Overwrite existing files`);
  console.log(
    `  ${c.yellow}--no-install${c.reset}         Skip automatic installation of npm dependencies\n`,
  );

  console.log(`${c.bold}EXAMPLES:${c.reset}`);
  console.log(
    `  ${c.dim}# Initialize project (detects Tailwind, aliases, and structure):${c.reset}`,
  );
  console.log(`  npx aurora-obsidian-ui init\n`);
  console.log(`  ${c.dim}# Add single or multiple components:${c.reset}`);
  console.log(`  npx aurora-obsidian-ui add button`);
  console.log(`  npx aurora-obsidian-ui add select toast alert dropdown-menu navbar\n`);
  console.log(`  ${c.dim}# Install all components to a custom directory:${c.reset}`);
  console.log(`  npx aurora-obsidian-ui add --all --path ./src/components/ui\n`);
}

// Load registry.json
function loadRegistry() {
  const registryPath = path.join(projectRoot, 'registry.json');
  if (!fs.existsSync(registryPath)) {
    console.error(`${c.red}❌ Error: registry.json file not found.${c.reset}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
}

// Detect package manager of the consumer project (pnpm, yarn, bun, npm)
function detectPackageManager(cwd) {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.startsWith('pnpm')) return 'pnpm';
  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('bun')) return 'bun';

  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb')) || fs.existsSync(path.join(cwd, 'bun.lock')))
    return 'bun';
  if (fs.existsSync(path.join(cwd, 'package-lock.json'))) return 'npm';

  return 'npm';
}

// Detect Tailwind CSS installation and version with high precision
function detectTailwind(cwd, installedDeps) {
  let isInstalled = false;
  let version = null;

  const pkgPath = path.join(cwd, 'package.json');
  let tailwindVersionStr = '';
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      tailwindVersionStr =
        pkg.dependencies?.tailwindcss ||
        pkg.devDependencies?.tailwindcss ||
        pkg.peerDependencies?.tailwindcss ||
        '';
    } catch {}
  }

  const hasTailwindPkg =
    installedDeps.has('tailwindcss') ||
    installedDeps.has('@tailwindcss/vite') ||
    installedDeps.has('@tailwindcss/postcss') ||
    Boolean(tailwindVersionStr);

  const configFiles = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.mjs',
    'tailwind.config.cjs',
  ];
  let foundConfig = null;
  for (const file of configFiles) {
    if (fs.existsSync(path.join(cwd, file))) {
      foundConfig = file;
      break;
    }
  }

  // Detect main CSS entry point
  const candidateCss = [
    'src/index.css',
    'src/globals.css',
    'src/app/globals.css',
    'src/styles/globals.css',
    'app/globals.css',
    'styles/globals.css',
    'index.css',
  ];
  let foundCss = null;
  let hasTailwindInCss = false;
  let isV4FromCss = false;

  for (const relCss of candidateCss) {
    const fullCss = path.join(cwd, relCss);
    if (fs.existsSync(fullCss)) {
      foundCss = relCss;
      const content = fs.readFileSync(fullCss, 'utf-8');
      if (
        content.includes('@import "tailwindcss"') ||
        content.includes("@import 'tailwindcss'") ||
        content.includes('@theme')
      ) {
        hasTailwindInCss = true;
        isV4FromCss = true;
        break;
      }
      if (content.includes('@tailwind base') || content.includes('@tailwind utilities')) {
        hasTailwindInCss = true;
        break;
      }
    }
  }

  // Determine if Tailwind is truly installed
  if (hasTailwindPkg || foundConfig || hasTailwindInCss) {
    isInstalled = true;
  }

  if (isInstalled) {
    if (
      isV4FromCss ||
      installedDeps.has('@tailwindcss/vite') ||
      installedDeps.has('@tailwindcss/postcss') ||
      tailwindVersionStr.startsWith('^4') ||
      tailwindVersionStr.startsWith('~4') ||
      tailwindVersionStr.startsWith('4')
    ) {
      version = 'v4';
    } else {
      version = 'v3';
    }
  }

  return {
    isInstalled,
    version,
    configFile: foundConfig,
    cssFile: foundCss,
  };
}

// Detect if the project has a components.json file for seamless compatibility
function detectExistingComponentConfig(cwd) {
  const configPath = path.join(cwd, 'components.json');
  if (!fs.existsSync(configPath)) {
    return { isInstalled: false, config: null };
  }

  try {
    const rawContent = fs.readFileSync(configPath, 'utf-8');
    const cleanContent = rawContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const config = JSON.parse(cleanContent);
    return {
      isInstalled: true,
      config,
    };
  } catch {
    return { isInstalled: true, config: null };
  }
}

// Detect path aliases in tsconfig.json or jsconfig.json
function detectPathAliases(cwd) {
  const tsConfigPath = path.join(cwd, 'tsconfig.json');
  const jsConfigPath = path.join(cwd, 'jsconfig.json');
  const configFile = fs.existsSync(tsConfigPath)
    ? tsConfigPath
    : fs.existsSync(jsConfigPath)
      ? jsConfigPath
      : null;

  let aliasPrefix = '@';
  const hasSrc = fs.existsSync(path.join(cwd, 'src'));

  if (configFile) {
    try {
      const rawContent = fs.readFileSync(configFile, 'utf-8');
      const cleanContent = rawContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
      const config = JSON.parse(cleanContent);
      const paths = config.compilerOptions?.paths || {};

      for (const key of Object.keys(paths)) {
        if (key.endsWith('/*')) {
          aliasPrefix = key.slice(0, -2);
          break;
        } else if (key.endsWith('*')) {
          aliasPrefix = key.slice(0, -1);
          break;
        }
      }
    } catch {}
  }

  const prefix = aliasPrefix ? `${aliasPrefix}/` : '@/';

  return {
    prefix: aliasPrefix,
    components: `${prefix}components/ui`,
    utils: `${prefix}lib/utils`,
    componentsDir: hasSrc ? 'src/components/ui' : 'components/ui',
    utilsPath: hasSrc ? 'src/lib/utils.ts' : 'lib/utils.ts',
  };
}

// Load aurora.json or fall back to detected project structure
function loadAuroraConfig(cwd) {
  const configPath = path.join(cwd, 'aurora.json');
  const existingConfig = detectExistingComponentConfig(cwd);
  const detected = detectPathAliases(cwd);

  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      return {
        componentsDir:
          config.componentsDir ||
          config.aliases?.components?.replace(/^[@~#]\//, 'src/') ||
          detected.componentsDir,
        aliases: {
          components: config.aliases?.components || detected.components,
          utils: config.aliases?.utils || detected.utils,
        },
      };
    } catch {}
  }

  // If existing components.json is detected, inherit its paths smoothly
  if (existingConfig.isInstalled && existingConfig.config) {
    const aliases = existingConfig.config.aliases || {};
    const uiAlias = aliases.ui || aliases.components || detected.components;
    const utilsAlias = aliases.utils || detected.utils;

    return {
      componentsDir: uiAlias.replace(/^[@~#]\//, 'src/'),
      aliases: {
        components: uiAlias,
        utils: utilsAlias,
      },
    };
  }

  return {
    componentsDir: detected.componentsDir,
    aliases: {
      components: detected.components,
      utils: detected.utils,
    },
  };
}

// Get set of currently installed dependencies in consumer package.json
function getInstalledDependencies(cwd) {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) return new Set();

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const allDeps = [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ];
    return new Set(allDeps);
  } catch {
    return new Set();
  }
}

// Install missing dependencies automatically based on detected package manager
function installMissingDependencies(depsToInstall, cwd, skipInstall = false) {
  if (depsToInstall.length === 0) return;

  const pm = detectPackageManager(cwd);
  const addCmd =
    pm === 'npm'
      ? 'npm install'
      : pm === 'yarn'
        ? 'yarn add'
        : pm === 'pnpm'
          ? 'pnpm add'
          : 'bun add';

  const fullCommand = `${addCmd} ${depsToInstall.join(' ')}`;

  if (skipInstall) {
    console.log(`${c.bold}📦 Required dependencies detected:${c.reset}`);
    console.log(`  ${c.yellow}${fullCommand}${c.reset}\n`);
    return;
  }

  console.log(
    `${c.bold}📦 Installing dependencies with ${c.cyan}${pm}${c.reset}${c.bold}...${c.reset}`,
  );
  console.log(`  ${c.dim}$ ${fullCommand}${c.reset}\n`);

  try {
    execSync(fullCommand, { cwd, stdio: 'inherit' });
    console.log(
      `\n  ${c.green}✔${c.reset} Dependencies successfully installed with ${c.bold}${pm}${c.reset}.\n`,
    );
  } catch {
    console.log(`\n  ${c.yellow}⚠ Could not automatically install dependencies.${c.reset}`);
    console.log('  You can install them manually using:');
    console.log(`  ${c.yellow}${fullCommand}${c.reset}\n`);
  }
}

// Dynamically rewrite internal component imports to match consumer aliases
function transformImports(content, aliases) {
  let transformed = content;

  // 1. Replace relative utils imports (../../lib/utils -> configured alias)
  const utilsAlias = aliases.utils || '@/lib/utils';
  transformed = transformed.replace(
    /from\s+['"](?:\.\.\/)+lib\/utils['"]/g,
    `from '${utilsAlias}'`,
  );

  // 2. Replace sibling component imports (../Button -> ./Button)
  transformed = transformed.replace(/from\s+['"]\.\.\/([A-Z][a-zA-Z0-9]+)['"]/g, "from './$1'");

  return transformed;
}

// Resolve component output directory
function resolveTargetDir(cwd, customPath, config) {
  if (customPath) {
    return path.resolve(cwd, customPath);
  }

  if (config.componentsDir) {
    return path.resolve(cwd, config.componentsDir);
  }

  if (fs.existsSync(path.join(cwd, 'src', 'components', 'ui'))) {
    return path.join(cwd, 'src', 'components', 'ui');
  }
  if (fs.existsSync(path.join(cwd, 'src', 'components'))) {
    return path.join(cwd, 'src', 'components', 'ui');
  }
  if (fs.existsSync(path.join(cwd, 'components', 'ui'))) {
    return path.join(cwd, 'components', 'ui');
  }
  if (fs.existsSync(path.join(cwd, 'components'))) {
    return path.join(cwd, 'components', 'ui');
  }
  if (fs.existsSync(path.join(cwd, 'src'))) {
    return path.join(cwd, 'src', 'components', 'ui');
  }
  return path.join(cwd, 'components', 'ui');
}

// Design tokens, animations and utilities for Aurora Obsidian UI
const AURORA_CSS_TOKENS = `
/* =============================================================
 * ❖ AURORA OBSIDIAN UI - DESIGN SYSTEM TOKENS & ANIMATIONS
 * ============================================================= */

@theme {
  --color-aurora-primary: #0f172a;
  --color-aurora-primary-hover: #1e293b;
  --color-aurora-surface: #f1f5f9;
  --color-aurora-surface-hover: #e2e8f0;
  --color-aurora-surface-active: #f8fafc;
  --color-aurora-border: #cbd5e1;
  --color-aurora-border-hover: #94a3b8;
  --color-aurora-border-focus: #3b82f6;

  --color-aurora-error: #ef4444;
  --color-aurora-error-bg: #fee2e2;
  --color-aurora-success: #10b981;
  --color-aurora-success-bg: #d1fae5;
  --color-aurora-warning: #f59e0b;
  --color-aurora-warning-bg: #fef3c7;
  --color-aurora-primary-bg: #e0e7ff;
  --color-aurora-neutral: #64748b;
  --color-aurora-neutral-bg: #f1f5f9;

  --color-aurora-text-on-primary: #ffffff;
  --color-aurora-text-primary: #0f172a;
  --color-aurora-text-secondary: #64748b;
  --color-aurora-text-disabled: #94a3b8;
  --color-aurora-bg-disabled: #f1f5f9;

  --font-sans:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  --radius-aurora: 6px;
}

:root {
  --color-aurora-primary: #0f172a;
  --color-aurora-primary-hover: #1e293b;
  --color-aurora-surface: #f1f5f9;
  --color-aurora-surface-hover: #e2e8f0;
  --color-aurora-surface-active: #f8fafc;
  --color-aurora-border: #cbd5e1;
  --color-aurora-border-hover: #94a3b8;
  --color-aurora-border-focus: #3b82f6;

  --color-aurora-error: #ef4444;
  --color-aurora-error-bg: #fee2e2;
  --color-aurora-success: #10b981;
  --color-aurora-success-bg: #d1fae5;
  --color-aurora-warning: #f59e0b;
  --color-aurora-warning-bg: #fef3c7;
  --color-aurora-primary-bg: #e0e7ff;
  --color-aurora-neutral: #64748b;
  --color-aurora-neutral-bg: #f1f5f9;

  --color-aurora-text-on-primary: #ffffff;
  --color-aurora-text-primary: #0f172a;
  --color-aurora-text-secondary: #64748b;
  --color-aurora-text-disabled: #94a3b8;
  --color-aurora-bg-disabled: #f1f5f9;

  --radius-aurora: 6px;
}

@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-slide-in-right {
    animation: slideInFromRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-slide-in-left {
    animation: slideInFromLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-slide-in-top {
    animation: slideInFromTop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-slide-in-bottom {
    animation: slideInFromBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-scale-in {
    animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-shimmer {
    animation: shimmer 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Custom elegant scrollbar */
  .scrollbar-aurora {
    scrollbar-width: thin;
    scrollbar-color: var(--color-aurora-border) transparent;
  }
  .scrollbar-aurora::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .scrollbar-aurora::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-aurora::-webkit-scrollbar-thumb {
    background-color: var(--color-aurora-border);
    border-radius: 9999px;
  }
  .scrollbar-aurora::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-aurora-border-hover);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInFromTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideInFromBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;

// Inject Aurora CSS variables and animations into consumer CSS file
function injectAuroraCssTokens(cwd, tailwind) {
  let cssRelativePath = tailwind.cssFile;
  if (!cssRelativePath) {
    const candidateDirs = ['src', 'app', 'styles'];
    const candidateNames = ['globals.css', 'index.css', 'app.css', 'style.css'];

    for (const d of candidateDirs) {
      if (fs.existsSync(path.join(cwd, d))) {
        for (const name of candidateNames) {
          const checkPath = path.join(d, name);
          if (fs.existsSync(path.join(cwd, checkPath))) {
            cssRelativePath = checkPath;
            break;
          }
        }
      }
      if (cssRelativePath) break;
    }
  }

  if (!cssRelativePath) {
    cssRelativePath = fs.existsSync(path.join(cwd, 'src')) ? 'src/index.css' : 'src/globals.css';
  }

  const fullCssPath = path.join(cwd, cssRelativePath);
  fs.mkdirSync(path.dirname(fullCssPath), { recursive: true });

  let existingContent = '';
  if (fs.existsSync(fullCssPath)) {
    existingContent = fs.readFileSync(fullCssPath, 'utf-8');
  } else {
    existingContent = '@import "tailwindcss";\n';
  }

  if (
    existingContent.includes('--color-aurora-primary') ||
    existingContent.includes('scrollbar-aurora')
  ) {
    console.log(
      `  ${c.dim}ℹ Aurora design tokens already present in: ${path.relative(cwd, fullCssPath)}${c.reset}`,
    );
    return cssRelativePath;
  }

  const updatedContent = `${existingContent.trimEnd()}\n\n${AURORA_CSS_TOKENS.trim()}\n`;
  fs.writeFileSync(fullCssPath, updatedContent, 'utf-8');
  console.log(
    `  ${c.green}✔${c.reset} Injected Aurora tokens & animations into: ${c.cyan}${path.relative(cwd, fullCssPath)}${c.reset}`,
  );

  return cssRelativePath;
}

// Command: INIT
function runInit(cwd, args) {
  printBanner();
  console.log(`${c.bold}🚀 Initializing Aurora Obsidian UI in your project...${c.reset}\n`);

  const skipInstall = args.includes('--no-install');
  const installed = getInstalledDependencies(cwd);
  const tailwind = detectTailwind(cwd, installed);
  const existingConfig = detectExistingComponentConfig(cwd);
  const detected = detectPathAliases(cwd);

  // 1. Environment Diagnostics
  console.log(`${c.bold}🔍 Environment Diagnostics:${c.reset}`);

  if (tailwind.isInstalled) {
    console.log(
      `  ${c.green}✔${c.reset} ${c.bold}Tailwind CSS detected${c.reset} ${c.dim}(${tailwind.version}${tailwind.configFile ? ` • ${tailwind.configFile}` : ''})${c.reset}`,
    );
  } else {
    console.log(
      `  ${c.yellow}⚠ Tailwind CSS not detected.${c.reset} ${c.dim}(Aurora Obsidian UI relies on Tailwind utility classes)${c.reset}`,
    );
  }

  console.log(
    `  ${c.green}✔${c.reset} ${c.bold}Components directory:${c.reset} ${c.cyan}${detected.components}${c.reset}`,
  );
  console.log(
    `  ${c.green}✔${c.reset} ${c.bold}Utils file path:     ${c.reset} ${c.cyan}${detected.utils}${c.reset}\n`,
  );

  // 2. Ensure cn(...) utils helper file exists
  const utilsDir = fs.existsSync(path.join(cwd, 'src'))
    ? path.join(cwd, 'src', 'lib')
    : path.join(cwd, 'lib');

  fs.mkdirSync(utilsDir, { recursive: true });
  const utilsFilePath = path.join(utilsDir, 'utils.ts');

  const utilsContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

  if (!fs.existsSync(utilsFilePath)) {
    fs.writeFileSync(utilsFilePath, utilsContent, 'utf-8');
    console.log(
      `  ${c.green}✔${c.reset} Created utility helper: ${c.cyan}${path.relative(cwd, utilsFilePath)}${c.reset}`,
    );
  } else {
    console.log(
      `  ${c.dim}ℹ Utility helper already exists: ${path.relative(cwd, utilsFilePath)}${c.reset}`,
    );
  }

  // 3. Inject CSS Tokens and Keyframes into consumer CSS entry point
  const actualCssPath = injectAuroraCssTokens(cwd, tailwind);

  // 4. Create or update aurora.json
  const configPath = path.join(cwd, 'aurora.json');
  const targetComponentsAlias =
    existingConfig.isInstalled && existingConfig.config?.aliases?.ui
      ? existingConfig.config.aliases.ui
      : detected.components;
  const targetUtilsAlias =
    existingConfig.isInstalled && existingConfig.config?.aliases?.utils
      ? existingConfig.config.aliases.utils
      : detected.utils;

  const configContent = {
    $schema: 'https://aurora-obsidian-ui.dev/schema.json',
    style: 'default',
    tailwind: {
      css: actualCssPath,
    },
    aliases: {
      components: targetComponentsAlias,
      utils: targetUtilsAlias,
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2), 'utf-8');
  console.log(`  ${c.green}✔${c.reset} Configuration created: ${c.cyan}aurora.json${c.reset}\n`);

  // 5. Install base dependencies automatically
  const baseDeps = ['clsx', 'tailwind-merge', 'class-variance-authority', 'lucide-react'];

  const missingBaseDeps = baseDeps.filter((dep) => !installed.has(dep));

  if (missingBaseDeps.length > 0) {
    installMissingDependencies(missingBaseDeps, cwd, skipInstall);
  } else {
    console.log(
      `  ${c.green}✔${c.reset} All base dependencies are already installed in your project.\n`,
    );
  }

  console.log(
    `${c.green}${c.bold}✨ Project successfully configured! You can now add components using:${c.reset}`,
  );
  console.log(`  ${c.cyan}npx aurora-obsidian-ui add button product-card select${c.reset}\n`);
}

// Command: LIST
function runList(registry) {
  printBanner();
  console.log(
    `${c.bold}📦 AVAILABLE COMPONENTS IN REGISTRY (${Object.keys(registry).length}):${c.reset}\n`,
  );

  const componentNames = Object.keys(registry).sort();
  for (const name of componentNames) {
    const comp = registry[name];
    const deps = comp.dependencies?.length
      ? `${c.dim}[${comp.dependencies.join(', ')}]${c.reset}`
      : '';
    console.log(`  ${c.green}•${c.reset} ${c.bold}${name.padEnd(20)}${c.reset} ${deps}`);
  }

  console.log(
    `\n${c.dim}Install any component with: npx aurora-obsidian-ui add <name>${c.reset}\n`,
  );
}

// Command: ADD
function runAdd(args, registry, cwd) {
  printBanner();

  let customPath = null;
  let installAll = false;
  let overwrite = false;
  let skipInstall = false;
  const requestedComponents = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--path' && args[i + 1]) {
      customPath = args[++i];
    } else if (arg === '--all') {
      installAll = true;
    } else if (arg === '--overwrite') {
      overwrite = true;
    } else if (arg === '--no-install') {
      skipInstall = true;
    } else if (!arg.startsWith('-')) {
      requestedComponents.push(arg.toLowerCase());
    }
  }

  const componentsToInstall = installAll ? Object.keys(registry) : requestedComponents;

  if (componentsToInstall.length === 0) {
    console.log(`${c.red}❌ No components specified to add.${c.reset}`);
    console.log(`💡 Try: ${c.green}npx aurora-obsidian-ui add button${c.reset}`);
    console.log(`   Or see the list with: ${c.cyan}npx aurora-obsidian-ui list${c.reset}\n`);
    process.exit(1);
  }

  const config = loadAuroraConfig(cwd);
  const targetDir = resolveTargetDir(cwd, customPath, config);
  fs.mkdirSync(targetDir, { recursive: true });

  console.log(
    `${c.dim}Installation directory:${c.reset} ${c.cyan}${path.relative(cwd, targetDir) || '.'}${c.reset}`,
  );
  console.log(
    `${c.dim}Utils import alias:${c.reset}     ${c.cyan}${config.aliases.utils}${c.reset}\n`,
  );

  const allRequiredDependencies = new Set();
  let installedCount = 0;

  for (const name of componentsToInstall) {
    const component = registry[name];

    if (!component) {
      console.log(
        `  ${c.red}✖${c.reset} Component "${c.bold}${name}${c.reset}" not found in registry.`,
      );
      continue;
    }

    console.log(`  ${c.cyan}↓${c.reset} Adding ${c.bold}${name}${c.reset}...`);

    for (const relFile of component.files) {
      const sourcePath = path.join(projectRoot, relFile);
      const fileName = path.basename(relFile);
      const targetFilePath = path.join(targetDir, fileName);

      if (!fs.existsSync(sourcePath)) {
        console.log(`    ${c.red}⚠ Source file not found:${c.reset} ${sourcePath}`);
        continue;
      }

      if (fs.existsSync(targetFilePath) && !overwrite) {
        console.log(
          `    ${c.yellow}ℹ ${fileName} already exists (use --overwrite to replace)${c.reset}`,
        );
      } else {
        const rawContent = fs.readFileSync(sourcePath, 'utf-8');

        // Transform imports with configured aliases
        const transformedContent = transformImports(rawContent, config.aliases);

        fs.writeFileSync(targetFilePath, transformedContent, 'utf-8');
        console.log(
          `    ${c.green}✔${c.reset} ${c.dim}${path.relative(cwd, targetFilePath)}${c.reset}`,
        );
      }
    }

    if (component.dependencies) {
      for (const dep of component.dependencies) {
        allRequiredDependencies.add(dep);
      }
    }
    installedCount++;
  }

  console.log(
    `\n${c.green}${c.bold}✨ Successfully processed ${installedCount} component(s)!${c.reset}\n`,
  );

  // Check which dependencies are missing in consumer project
  if (allRequiredDependencies.size > 0) {
    const installed = getInstalledDependencies(cwd);
    const missingDependencies = Array.from(allRequiredDependencies).filter(
      (dep) => !installed.has(dep),
    );

    if (missingDependencies.length > 0) {
      installMissingDependencies(missingDependencies, cwd, skipInstall);
    } else {
      console.log(
        `  ${c.green}✔${c.reset} All dependencies (${Array.from(allRequiredDependencies).join(', ')}) are already installed in your project.\n`,
      );
    }
  }
}

// Main CLI Entrypoint
function main() {
  const rawArgs = process.argv.slice(2);
  const command = rawArgs[0]?.toLowerCase();
  const cwd = process.cwd();

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  const registry = loadRegistry();

  if (command === 'list' || command === 'ls') {
    runList(registry);
    return;
  }

  if (command === 'init') {
    runInit(cwd, rawArgs.slice(1));
    return;
  }

  if (command === 'add') {
    runAdd(rawArgs.slice(1), registry, cwd);
    return;
  }

  console.log(`\n${c.red}❌ Unknown command:${c.reset} "${command}"`);
  console.log(
    `💡 Run ${c.cyan}npx aurora-obsidian-ui --help${c.reset} to see available commands.\n`,
  );
  process.exit(1);
}

main();
