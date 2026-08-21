#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0];
const componentName = args[1];

if (command !== 'add' || !componentName) {
  console.log('\n❌ Uso incorrecto.');
  console.log('💡 Prueba: node bin/aurora.js add <componente>');
  console.log('Ejemplo: node bin/aurora.js add button\n');
  process.exit(1);
}

const registryPath = path.join(projectRoot, 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

const component = registry[componentName];

if (!component) {
  console.error(`\n❌ Componente "${componentName}" no encontrado en el registro.\n`);
  process.exit(1);
}

console.log(`\n🚀 Instalando componente: \x1b[32m${componentName}\x1b[0m...`);

// Para esta prueba, vamos a simular que el usuario está en otro proyecto
// Creando una carpeta "mi-proyecto-consumidor"
const consumerRoot = path.join(projectRoot, 'mi-proyecto-consumidor');
const targetDir = path.join(consumerRoot, 'src', 'components', 'ui');
fs.mkdirSync(targetDir, { recursive: true });

// Copiar archivos del componente
for (const file of component.files) {
  const sourcePath = path.join(projectRoot, file);
  const fileName = path.basename(file);
  const targetPath = path.join(targetDir, fileName);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Archivo copiado a: \x1b[36m${path.relative(consumerRoot, targetPath)}\x1b[0m`);
  } else {
    console.error(`⚠️ Archivo fuente no encontrado: ${sourcePath}`);
  }
}

// Mostrar dependencias a instalar
if (component.dependencies && component.dependencies.length > 0) {
  console.log(`\n📦 Dependencias requeridas detectadas. En un escenario real ejecutaríamos:`);
  console.log(`   \x1b[33mnpm install ${component.dependencies.join(' ')}\x1b[0m`);
}

console.log(`\n✨ ¡${componentName} instalado con éxito en tu proyecto!\n`);
