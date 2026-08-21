#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Paleta de colores ANSI para la consola
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
${c.cyan}${c.bold}  ❖ AURORA OBSIDIAN UI${c.reset} ${c.dim}v0.1.0${c.reset}
  ${c.dim}Sistema de diseño moderno para E-Commerce de alto rendimiento${c.reset}
`);
}

function printHelp() {
  printBanner();
  console.log(`${c.bold}USO:${c.reset}`);
  console.log(`  ${c.green}npx aurora-obsidian-ui${c.reset} <comando> [opciones]\n`);

  console.log(`${c.bold}COMANDOS DISPONIBLES:${c.reset}`);
  console.log(
    `  ${c.cyan}init${c.reset}                    Inicializa la configuración y alias en tu proyecto`,
  );
  console.log(
    `  ${c.cyan}add${c.reset} <componente...>     Instala componentes y sus dependencias automáticamente`,
  );
  console.log(
    `  ${c.cyan}list${c.reset}                    Muestra todos los 34 componentes disponibles`,
  );
  console.log(`  ${c.cyan}help${c.reset}                    Muestra este menú de ayuda\n`);

  console.log(`${c.bold}OPCIONES:${c.reset}`);
  console.log(
    `  ${c.yellow}--path <directorio>${c.reset}  Ruta de destino personalizada (ej: src/components/ui)`,
  );
  console.log(
    `  ${c.yellow}--all${c.reset}                Instala todos los componentes del registro`,
  );
  console.log(`  ${c.yellow}--overwrite${c.reset}          Sobrescribe archivos si ya existen`);
  console.log(
    `  ${c.yellow}--no-install${c.reset}         Omite la instalación automática de dependencias npm\n`,
  );

  console.log(`${c.bold}EJEMPLOS:${c.reset}`);
  console.log(
    `  ${c.dim}# Inicializar proyecto (detecta Shadcn / Tailwind / Aliases automáticos):${c.reset}`,
  );
  console.log(`  npx aurora-obsidian-ui init\n`);
  console.log(`  ${c.dim}# Añadir componentes individuales o múltiples:${c.reset}`);
  console.log(`  npx aurora-obsidian-ui add button`);
  console.log(`  npx aurora-obsidian-ui add select toast alert dropdown-menu navbar\n`);
  console.log(`  ${c.dim}# Añadir todos los componentes:${c.reset}`);
  console.log(`  npx aurora-obsidian-ui add --all\n`);
}

// Cargar registry.json
function loadRegistry() {
  const registryPath = path.join(projectRoot, 'registry.json');
  if (!fs.existsSync(registryPath)) {
    console.error(`${c.red}❌ Error: No se encontró el archivo registry.json.${c.reset}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
}

// Detectar gestor de paquetes del proyecto consumidor (pnpm, yarn, bun, npm)
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

// Detectar instalación de Tailwind CSS y versión
function detectTailwind(cwd, installedDeps) {
  const isInstalled =
    installedDeps.has('tailwindcss') ||
    installedDeps.has('@tailwindcss/vite') ||
    installedDeps.has('@tailwindcss/postcss');

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

  // Detectar archivo CSS principal
  const candidateCss = [
    'src/index.css',
    'src/globals.css',
    'src/app/globals.css',
    'src/styles/globals.css',
    'app/globals.css',
    'styles/globals.css',
  ];
  let foundCss = null;
  let isV4 = false;

  for (const relCss of candidateCss) {
    const fullCss = path.join(cwd, relCss);
    if (fs.existsSync(fullCss)) {
      foundCss = relCss;
      const content = fs.readFileSync(fullCss, 'utf-8');
      if (content.includes('@import "tailwindcss"') || content.includes("@import 'tailwindcss'")) {
        isV4 = true;
      }
      break;
    }
  }

  return {
    isInstalled: isInstalled || Boolean(foundConfig) || Boolean(foundCss),
    version: isV4 ? 'v4' : 'v3',
    configFile: foundConfig,
    cssFile: foundCss,
  };
}

// Detectar si el proyecto tiene Shadcn UI instalado (components.json)
function detectShadcn(cwd) {
  const shadcnConfigPath = path.join(cwd, 'components.json');
  if (!fs.existsSync(shadcnConfigPath)) {
    return { isInstalled: false, config: null };
  }

  try {
    const rawContent = fs.readFileSync(shadcnConfigPath, 'utf-8');
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

// Detectar configuración de Path Aliases en tsconfig.json o jsconfig.json
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

// Cargar configuración de aurora.json o sincronizar con Shadcn UI si existe
function loadAuroraConfig(cwd) {
  const configPath = path.join(cwd, 'aurora.json');
  const shadcn = detectShadcn(cwd);
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

  // Si existe Shadcn UI pero no aurora.json, sincronizar con sus alias
  if (shadcn.isInstalled && shadcn.config) {
    const aliases = shadcn.config.aliases || {};
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

// Obtener lista de dependencias ya instaladas en el package.json del consumidor
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

// Instalar dependencias faltantes automáticamente según el gestor detectado
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
    console.log(`${c.bold}📦 Dependencias requeridas detectadas:${c.reset}`);
    console.log(`  ${c.yellow}${fullCommand}${c.reset}\n`);
    return;
  }

  console.log(
    `${c.bold}📦 Instalando dependencias con ${c.cyan}${pm}${c.reset}${c.bold}...${c.reset}`,
  );
  console.log(`  ${c.dim}$ ${fullCommand}${c.reset}\n`);

  try {
    execSync(fullCommand, { cwd, stdio: 'inherit' });
    console.log(
      `\n  ${c.green}✔${c.reset} Dependencias instaladas correctamente con ${c.bold}${pm}${c.reset}.\n`,
    );
  } catch {
    console.log(
      `\n  ${c.yellow}⚠ No se pudieron instalar automáticamente las dependencias.${c.reset}`,
    );
    console.log('  Puedes ejecutarlas manualmente con:');
    console.log(`  ${c.yellow}${fullCommand}${c.reset}\n`);
  }
}

// Adaptar imports dinámicamente según los alias configurados en el proyecto
function transformImports(content, aliases) {
  let transformed = content;

  // 1. Reemplazar imports de utils (../../lib/utils -> alias configurado)
  const utilsAlias = aliases.utils || '@/lib/utils';
  transformed = transformed.replace(
    /from\s+['"](?:\.\.\/)+lib\/utils['"]/g,
    `from '${utilsAlias}'`,
  );

  // 2. Reemplazar imports entre componentes vecinos (../Button -> ./Button)
  transformed = transformed.replace(/from\s+['"]\.\.\/([A-Z][a-zA-Z0-9]+)['"]/g, "from './$1'");

  return transformed;
}

// Detectar directorio destino de componentes
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

// Comando: INIT
function runInit(cwd, args) {
  printBanner();
  console.log(`${c.bold}🚀 Inicializando Aurora Obsidian UI en tu proyecto...${c.reset}\n`);

  const skipInstall = args.includes('--no-install');
  const installed = getInstalledDependencies(cwd);
  const tailwind = detectTailwind(cwd, installed);
  const shadcn = detectShadcn(cwd);
  const detected = detectPathAliases(cwd);

  // 1. Diagnóstico del Entorno
  console.log(`${c.bold}🔍 Diagnóstico del entorno:${c.reset}`);

  if (tailwind.isInstalled) {
    console.log(
      `  ${c.green}✔${c.reset} ${c.bold}Tailwind CSS detectado${c.reset} ${c.dim}(${tailwind.version}${tailwind.configFile ? ` • ${tailwind.configFile}` : ''})${c.reset}`,
    );
  } else {
    console.log(
      `  ${c.yellow}⚠ Tailwind CSS no detectado.${c.reset} ${c.dim}Se añadirá a las dependencias recomendadas.${c.reset}`,
    );
  }

  console.log(
    `  ${c.green}✔${c.reset} ${c.bold}Estructura de componentes:${c.reset} ${c.cyan}${detected.components}${c.reset}`,
  );
  console.log(
    `  ${c.green}✔${c.reset} ${c.bold}Archivo de utilidades:${c.reset}    ${c.cyan}${detected.utils}${c.reset}\n`,
  );

  // 2. Comprobar / Crear archivo utilitario cn(...)
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
      `  ${c.green}✔${c.reset} Creado archivo utilitario: ${c.cyan}${path.relative(cwd, utilsFilePath)}${c.reset}`,
    );
  } else {
    console.log(
      `  ${c.dim}ℹ Archivo utilitario ya existente: ${path.relative(cwd, utilsFilePath)}${c.reset}`,
    );
  }

  // 3. Crear o actualizar aurora.json
  const configPath = path.join(cwd, 'aurora.json');
  const targetComponentsAlias =
    shadcn.isInstalled && shadcn.config?.aliases?.ui
      ? shadcn.config.aliases.ui
      : detected.components;
  const targetUtilsAlias =
    shadcn.isInstalled && shadcn.config?.aliases?.utils
      ? shadcn.config.aliases.utils
      : detected.utils;

  const configContent = {
    $schema: 'https://aurora-obsidian-ui.dev/schema.json',
    style: 'default',
    tailwind: {
      css:
        tailwind.cssFile || (fs.existsSync(path.join(cwd, 'src')) ? 'src/index.css' : 'index.css'),
    },
    aliases: {
      components: targetComponentsAlias,
      utils: targetUtilsAlias,
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2), 'utf-8');
  console.log(`  ${c.green}✔${c.reset} Creada configuración: ${c.cyan}aurora.json${c.reset}\n`);

  // 4. Instalar dependencias base automáticamente
  const baseDeps = ['clsx', 'tailwind-merge', 'class-variance-authority', 'lucide-react'];
  if (!tailwind.isInstalled) {
    baseDeps.push('tailwindcss');
  }

  const missingBaseDeps = baseDeps.filter((dep) => !installed.has(dep));

  if (missingBaseDeps.length > 0) {
    installMissingDependencies(missingBaseDeps, cwd, skipInstall);
  } else {
    console.log(
      `  ${c.green}✔${c.reset} Todas las dependencias base ya están presentes en tu proyecto.\n`,
    );
  }

  console.log(
    `${c.green}${c.bold}✨ ¡Proyecto configurado con éxito! Ya puedes instalar componentes con:${c.reset}`,
  );
  console.log(`  ${c.cyan}npx aurora-obsidian-ui add button product-card select${c.reset}\n`);
}

// Comando: LIST
function runList(registry) {
  printBanner();
  console.log(
    `${c.bold}📦 COMPONENTES DISPONIBLES EN EL REGISTRO (${Object.keys(registry).length}):${c.reset}\n`,
  );

  const componentNames = Object.keys(registry).sort();
  for (const name of componentNames) {
    const comp = registry[name];
    const deps = comp.dependencies?.length
      ? `${c.dim}[${comp.dependencies.join(', ')}]${c.reset}`
      : '';
    console.log(`  ${c.green}•${c.reset} ${c.bold}${name.padEnd(20)}${c.reset} ${deps}`);
  }

  console.log(`\n${c.dim}Instala cualquiera con: npx aurora-obsidian-ui add <nombre>${c.reset}\n`);
}

// Comando: ADD
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
    console.log(`${c.red}❌ No especificaste ningún componente para añadir.${c.reset}`);
    console.log(`💡 Prueba: ${c.green}npx aurora-obsidian-ui add button${c.reset}`);
    console.log(`   O consulta la lista con: ${c.cyan}npx aurora-obsidian-ui list${c.reset}\n`);
    process.exit(1);
  }

  const config = loadAuroraConfig(cwd);
  const targetDir = resolveTargetDir(cwd, customPath, config);
  fs.mkdirSync(targetDir, { recursive: true });

  console.log(
    `${c.dim}Directorio de instalación:${c.reset}    ${c.cyan}${path.relative(cwd, targetDir) || '.'}${c.reset}`,
  );
  console.log(
    `${c.dim}Alias de utilidades:${c.reset}          ${c.cyan}${config.aliases.utils}${c.reset}\n`,
  );

  const allRequiredDependencies = new Set();
  let installedCount = 0;

  for (const name of componentsToInstall) {
    const component = registry[name];

    if (!component) {
      console.log(
        `  ${c.red}✖${c.reset} Componente "${c.bold}${name}${c.reset}" no encontrado en el registro.`,
      );
      continue;
    }

    console.log(`  ${c.cyan}↓${c.reset} Añadiendo ${c.bold}${name}${c.reset}...`);

    for (const relFile of component.files) {
      const sourcePath = path.join(projectRoot, relFile);
      const fileName = path.basename(relFile);
      const targetFilePath = path.join(targetDir, fileName);

      if (!fs.existsSync(sourcePath)) {
        console.log(`    ${c.red}⚠ No se encontró el archivo fuente:${c.reset} ${sourcePath}`);
        continue;
      }

      if (fs.existsSync(targetFilePath) && !overwrite) {
        console.log(
          `    ${c.yellow}ℹ ${fileName} ya existe (usa --overwrite para reemplazar)${c.reset}`,
        );
      } else {
        const rawContent = fs.readFileSync(sourcePath, 'utf-8');

        // Transformar imports con la función de alias
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
    `\n${c.green}${c.bold}✨ ¡${installedCount} componente(s) procesado(s) con éxito!${c.reset}\n`,
  );

  // Comprobar qué dependencias faltan en el proyecto consumidor
  if (allRequiredDependencies.size > 0) {
    const installed = getInstalledDependencies(cwd);
    const missingDependencies = Array.from(allRequiredDependencies).filter(
      (dep) => !installed.has(dep),
    );

    if (missingDependencies.length > 0) {
      installMissingDependencies(missingDependencies, cwd, skipInstall);
    } else {
      console.log(
        `  ${c.green}✔${c.reset} Todas las dependencias (${Array.from(allRequiredDependencies).join(', ')}) ya están instaladas en tu proyecto.\n`,
      );
    }
  }
}

// Punto de Entrada Principal
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

  console.log(`\n${c.red}❌ Comando desconocido:${c.reset} "${command}"`);
  console.log(
    `💡 Ejecuta ${c.cyan}npx aurora-obsidian-ui --help${c.reset} para ver la lista de comandos disponibles.\n`,
  );
  process.exit(1);
}

main();
