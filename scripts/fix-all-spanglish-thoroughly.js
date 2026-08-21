import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');

const replacements = [
  // Corrupted artifacts
  [/unidaofs/g, 'units'],
  [/propiedaofs/g, 'properties'],
  [/ofclarativo/g, 'declarative'],
  [/fiofidad/g, 'fidelity'],
  [/ofslizante/g, 'slider'],
  [/ofrecha/g, 'right'],
  [/ofntro/g, 'inside'],
  [/ofben/g, 'must'],
  [/ofbe/g, 'must'],
  [/ofseos/g, 'wishlist'],
  [/ofshacer/g, 'undo'],
  [/ofshecha/g, 'undone'],
  [/ofspués/g, 'after'],
  [/ofjar/g, 'leave'],
  [/ofl/g, 'of'],
  [/ofso/g, 'from'],
  [/offects/g, 'defects'],

  // Select
  [/España \(Península\)/g, 'United States (Mainland)'],
  [/Pequeño \(small - 32px\)/g, 'Small (32px)'],
  [/Mediano \(medium - 40px\)/g, 'Medium (40px)'],
  [/Grande \(large - 48px\)/g, 'Large (48px)'],

  // Sheet
  [/<SheetTitle>Categorías<\/SheetTitle>/g, '<SheetTitle>Categories</SheetTitle>'],
  [/Electrónica & Audio/g, 'Electronics & Audio'],
  [/Ropa & Calzado/g, 'Clothing & Footwear'],
  [/Hogar & Decoración/g, 'Home & Living'],

  // Skeleton
  [/Tipo of animación/g, 'Animation type'],
  [/Pulse \(Pulsación of opacidad\)/g, 'Pulse (Opacity pulsation)'],
  [/None \(Estático\)/g, 'None (Static)'],

  // SkuSelector
  [/Negro Obsidiana/g, 'Obsidian Black'],
  [/Blanco Nieve/g, 'Pure White'],
  [/Azul Espacial/g, 'Space Blue'],
  [
    /Matriz of variantes y stock \(directo of la base of datos o API\)/g,
    'Variant and stock matrix (direct from database or API)',
  ],
  [
    /Added to cart: SKU "\$\{selectedVariant\.sku\}" \(\$\{qty\} un\.\) por/g,
    'Added to cart: SKU "${selectedVariant.sku}" (x${qty}) for',
  ],
  [/AUTOMÁTICO/g, 'AUTOMATIC'],
  [
    /Un solo componente gestiona todas las opciones y calcula el stock cruzado\./g,
    'A single component handles all options and cross-calculates available stock.',
  ],
  [/{\/\* UN SOLO COMPONENTE PARA TODO \*\/}/g, '{/* ALL-IN-ONE COMPONENT */}'],
  [/Sin Existencias/g, 'Out of Stock'],
  [/Add al Carrito/g, 'Add to Cart'],
  [/✅ ¡Añadido con éxito!/g, '✅ Successfully added to cart!'],
  [
    /\/\/ SUBCOMPONENTE MODO 1: AUTOMÁTICO MULTI-ATRIBUTO/g,
    '// INTERNAL SUBCOMPONENT MODE 1: MULTI-ATTRIBUTE MATRIX',
  ],
  [
    /\/\/ SUBCOMPONENTE MODO 2: SIMPLE \(Un solo grupo\)/g,
    '// INTERNAL SUBCOMPONENT MODE 2: SIMPLE (Single Group)',
  ],
  [
    /\/\/ Subcomponente interno para renderizar un grupo of opciones individual/g,
    '// Internal subcomponent to render an individual option group',
  ],

  // Slider
  [/Valor mínimo/g, 'Minimum value'],
  [/Valor máximo/g, 'Maximum value'],
  [
    /<span className="text-\[10px\] uppercase">Mínimo<\/span>/g,
    '<span className="text-[10px] uppercase">Min</span>',
  ],
  [
    /<span className="text-\[10px\] uppercase">Máximo<\/span>/g,
    '<span className="text-[10px] uppercase">Max</span>',
  ],

  // Table
  [
    /<TableHead className="text-center">Acción<\/TableHead>/g,
    '<TableHead className="text-center">Action</TableHead>',
  ],
  [/<Badge variant="warning">En tránsito<\/Badge>/g, '<Badge variant="warning">In Transit</Badge>'],
  [/<Badge variant="success">Entregado<\/Badge>/g, '<Badge variant="success">Delivered</Badge>'],
  [/<Badge variant="error">Cancelado<\/Badge>/g, '<Badge variant="error">Cancelled</Badge>'],
  [/<TableHead>Categoría<\/TableHead>/g, '<TableHead>Category</TableHead>'],
  [/Select Camiseta Técnica/g, 'Select Performance T-Shirt'],
  [/Camiseta Técnica Transpirable/g, 'Breathable Performance T-Shirt'],
  [/\/\/ 3\. Ficha Técnica of Product/g, '// 3. Product Specifications Table'],
  [/<TableHead>Especificación<\/TableHead>/g, '<TableHead>Specification</TableHead>'],
  [/<TableHead>Detalle<\/TableHead>/g, '<TableHead>Detail</TableHead>'],
  [/Malla técnica transpirable Jacquard/g, 'Breathable Jacquard technical mesh'],
  [/Goma Vibram® Megagrip of alta tracción/g, 'Vibram® Megagrip high-traction rubber'],
  [/Amortiguación/g, 'Cushioning'],
  [/Espuma Nitro Foam de doble densidad/g, 'Dual-density Nitro Foam cushioning'],
  [/Peso/g, 'Weight'],
  [/245g \(Talla 42\)/g, '245g (Size 9 US)'],

  // Tabs
  [/Carlos M\. - Hace 2 días/g, 'Carlos M. - 2 days ago'],
  [
    /<TabsTrigger value="kids">Niños<\/TabsTrigger>/g,
    '<TabsTrigger value="kids">Kids</TabsTrigger>',
  ],
  [/\/\/ 3\. Modo Declarativo Rápido \(items\)/g, '// 3. Quick Declarative Mode (items)'],
  [
    /Dispones of 30 días para realizar devoluciones gratuitas\./g,
    '30-day free returns on all orders.',
  ],
  [/label: 'Garantía',/g, "label: 'Warranty',"],
  [/3 años of garantía oficial of fabricante\./g, '3-year manufacturer warranty.'],
  [/Callback invocado al cambiar of pestaña/g, 'Callback fired when active tab changes'],
  [/Modo ofclarativo rápido: lista of pestañas/g, 'Quick declarative mode: tab list'],

  // Textarea
  [/Estado of error of validación/g, 'Validation error state'],
  [/\/\/ 3\. Error of Validación/g, '// 3. Validation Error'],

  // Toast
  [/\/\/ 1\. Variantes Básicas/g, '// 1. Basic Variants'],
  [/toast\('Acción ofshecha'\)/g, "toast('Action undone')"],
  [
    /\/\/ 3\. Notificación Asíncrona \(toast\.promise\)/g,
    '// 3. Async Notification (toast.promise)',
  ],
  [/Procesando pago y generando pedido\.\.\./g, 'Processing payment and generating order...'],
  [
    /¡Pedido #\$\{data\.orderId\} confirmado con éxito!/g,
    'Order #${data.orderId} confirmed successfully!',
  ],
  [/No se pudo completar la transacción\./g, 'Transaction could not be completed.'],

  // Accordion
  [/Garantía y Devoluciones/g, 'Warranty & Returns'],
  [/Envíos y Plazos/g, 'Shipping & Delivery'],
  [/Guía de Tallas/g, 'Size Guide'],
  [/Materiales y Cuidados/g, 'Materials & Care'],
  [/Lavar a máquina en frío/g, 'Machine wash cold (30°C) with similar colors'],
  [/No usar secadora/g, 'Do not tumble dry'],
  [/Planchar a baja temperatura/g, 'Iron at low temperature if needed'],

  // Dialog
  [
    /¿Estás seguro de que deseas cancelar este pedido\?/g,
    'Are you sure you want to cancel this order?',
  ],
  [
    /Esta acción liberará los artículos reservados y reembolsará el importe íntegro a tu método de pago original\./g,
    'This will release the reserved items and issue a full refund to your original payment method.',
  ],
  [/No, mantener pedido/g, 'No, keep order'],
  [/Sí, cancelar pedido/g, 'Yes, cancel order'],

  // Navbar
  [/Buscar productos\.\.\./g, 'Search products, brands...'],
  [/Inicio/g, 'Home'],
  [/Catálogo/g, 'Catalog'],
  [/Hombre/g, 'Men'],
  [/Mujer/g, 'Women'],
  [/Novedades/g, 'New Arrivals'],
  [/Ofertas/g, 'Sale'],
  [/Contacto/g, 'Contact'],

  // Pagination
  [/Página \$\{page\} de \$\{totalPages\}/g, 'Page ${page} of ${totalPages}'],
  [/Ir a la primera página/g, 'Go to first page'],
  [/Ir a la página anterior/g, 'Go to previous page'],
  [/Ir a la página siguiente/g, 'Go to next page'],
  [/Ir a la última página/g, 'Go to last page'],

  // DropdownMenu
  [/Perfil de usuario/g, 'User Profile'],
  [/Configuración de cuenta/g, 'Account Settings'],
  [/Facturación y pagos/g, 'Billing & Payments'],
  [/Cerrar sesión segura/g, 'Secure Log Out'],
];

function processAllFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processAllFiles(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let modified = false;

      for (const [pattern, replacement] of replacements) {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Cleaned: ${path.relative(projectRoot, fullPath)}`);
      }
    }
  }
}

console.log('Replacing all remaining Spanglish and corrupted terms in src/...');
processAllFiles(srcDir);
console.log('Complete.');
