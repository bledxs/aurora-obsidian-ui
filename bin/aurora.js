#!/usr/bin/env node

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
    `  ${c.cyan}init${c.reset}                    Inicializa la configuración de Aurora en tu proyecto`,
  );
  console.log(
    `  ${c.cyan}add${c.reset} <componente...>     Instala uno o varios componentes en tu proyecto`,
  );
  console.log(
    `  ${c.cyan}list${c.reset}                    Muestra todos los 34 componentes disponibles`,
  );
  console.log(`  ${c.cyan}help${c.reset}                    Muestra este menú de ayuda\n`);

  console.log(`${c.bold}OPCIONES:${c.reset}`);
  console.log(
    `  ${c.yellow}--path <directorio>${c.reset}  Ruta de destino (por defecto: src/components/ui)`,
  );
  console.log(
    `  ${c.yellow}--all${c.reset}                Instala todos los componentes del registro`,
  );
  console.log(`  ${c.yellow}--overwrite${c.reset}          Sobrescribe archivos si ya existen\n`);

  console.log(`${c.bold}EJEMPLOS:${c.reset}`);
  console.log(`  ${c.dim}# Inicializar proyecto:${c.reset}`);
  console.log(`  npx aurora-obsidian-ui init\n`);
  console.log(`  ${c.dim}# Añadir componentes individuales o múltiples:${c.reset}`);
  console.log(`  npx aurora-obsidian-ui add button`);
  console.log(`  npx aurora-obsidian-ui add select toast modal alert navbar\n`);
  console.log(`  ${c.dim}# Añadir todos los componentes a una ruta personalizada:${c.reset}`);
  console.log(`  npx aurora-obsidian-ui add --all --path ./components\n`);
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

// Detectar gestor de paquetes del proyecto consumidor
function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb')) || fs.existsSync(path.join(cwd, 'bun.lock')))
    return 'bun';
  return 'npm';
}

// Detectar directorio destino de componentes
function resolveTargetDir(cwd, customPath) {
  if (customPath) {
    return path.resolve(cwd, customPath);
  }

  // Comprobar archivo de configuración aurora.json si existe
  const configPath = path.join(cwd, 'aurora.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.componentsDir) {
        return path.resolve(cwd, config.componentsDir);
      }
    } catch {}
  }

  // Detección automática según estructura habitual
  if (fs.existsSync(path.join(cwd, 'src', 'components'))) {
    return path.join(cwd, 'src', 'components', 'ui');
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
function runInit(cwd) {
  printBanner();
  console.log(`${c.bold}🚀 Inicializando Aurora Obsidian UI en tu proyecto...${c.reset}\n`);

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

  // Crear archivo de configuración aurora.json
  const configPath = path.join(cwd, 'aurora.json');
  const configContent = {
    $schema: 'https://aurora-obsidian-ui.dev/schema.json',
    componentsDir: fs.existsSync(path.join(cwd, 'src')) ? 'src/components/ui' : 'components/ui',
    utilsPath: path.relative(cwd, utilsFilePath).replace(/\\/g, '/'),
  };

  fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2), 'utf-8');
  console.log(`  ${c.green}✔${c.reset} Creada configuración: ${c.cyan}aurora.json${c.reset}\n`);

  const pm = detectPackageManager(cwd);
  const installCmd =
    pm === 'npm'
      ? 'npm install'
      : pm === 'yarn'
        ? 'yarn add'
        : pm === 'pnpm'
          ? 'pnpm add'
          : 'bun add';

  console.log(`${c.bold}📦 Asegúrate de contar con las dependencias base:${c.reset}`);
  console.log(
    `  ${c.yellow}${installCmd} clsx tailwind-merge class-variance-authority lucide-react${c.reset}\n`,
  );

  console.log(
    `${c.green}${c.bold}✨ ¡Proyecto configurado! Ya puedes instalar componentes con:${c.reset}`,
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
  const requestedComponents = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--path' && args[i + 1]) {
      customPath = args[++i];
    } else if (arg === '--all') {
      installAll = true;
    } else if (arg === '--overwrite') {
      overwrite = true;
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

  const targetDir = resolveTargetDir(cwd, customPath);
  fs.mkdirSync(targetDir, { recursive: true });

  console.log(
    `${c.dim}Directorio de instalación:${c.reset} ${c.cyan}${path.relative(cwd, targetDir) || '.'}${c.reset}\n`,
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
        let content = fs.readFileSync(sourcePath, 'utf-8');

        // Adaptar imports relativos a utils si es necesario
        content = content.replace(/['"]\.\.\/\.\.\/lib\/utils['"]/g, "'@/lib/utils'");

        fs.writeFileSync(targetFilePath, content, 'utf-8');
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

  if (allRequiredDependencies.size > 0) {
    const pm = detectPackageManager(cwd);
    const installCmd =
      pm === 'npm'
        ? 'npm install'
        : pm === 'yarn'
          ? 'yarn add'
          : pm === 'pnpm'
            ? 'pnpm add'
            : 'bun add';
    const depList = Array.from(allRequiredDependencies).join(' ');

    console.log(`${c.bold}📦 Dependencias requeridas detectadas:${c.reset}`);
    console.log(`  ${c.yellow}${installCmd} ${depList}${c.reset}\n`);
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
    runInit(cwd);
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
