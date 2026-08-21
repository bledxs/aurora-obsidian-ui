# ❖ Aurora Obsidian UI

<p align="center">
  <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&auto=format&fit=crop&q=80" alt="Aurora Obsidian UI Banner" width="100%" style="border-radius: 12px; max-height: 280px; object-fit: cover;" />
</p>

<p align="center">
  <strong>A high-fidelity, accessible, and modular design system crafted specifically for modern, high-performance E-Commerce applications.</strong>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-interactive-cli">CLI</a> •
  <a href="#-component-catalog-34">Components</a> •
  <a href="#-design-tokens">Design Tokens</a> •
  <a href="#-storybook">Storybook</a>
</p>

---

## 💎 Key Features

- 🛍️ **E-Commerce First**: Out-of-the-box components for checkout flows, variant selectors (`SkuSelector`), rich product cards with discount badges (`ProductCard`), accurate currency formatting (`Price`), quantity controllers (`QuantitySelector`), and sliding cart drawers (`Sheet` / `CartItem`).
- ♿ **Strict Accessibility (WCAG AAA)**: Contrast ratios exceeding 8:1 - 14:1 across alerts and toasts, full keyboard navigation with arrow loop support (`FloatingFocusManager`), and semantic WAI-ARIA roles.
- ✨ **Fluid Micro-interactions**: GPU-accelerated 60fps animations (`@keyframes shimmer`, `scale-in`, `slide-in`, and smooth toggle transitions).
- 📦 **Dual Distribution Model**:
  - **CLI Mode**: Copy/paste source files directly into your project codebase (`npx aurora-obsidian-ui add ...`).
  - **Package Mode**: Install as a standard npm dependency (`import { Button } from 'aurora-obsidian-ui'`).
- ⚡ **Universal Compatibility**: Supports **React 18 & 19**, **Next.js (App & Pages Router)**, **Vite**, **Tailwind CSS v4 & v3**, and automatic package manager detection (`pnpm`, `npm`, `yarn`, `bun`).

---

## 🚀 Quick Start

### Option 1: Using the Aurora CLI (Recommended)

The CLI adds components directly to your components folder, automatically resolving your project's **path aliases** (`@/*`, `~/*`) and installing only the dependencies your project requires:

```bash
# 1. Initialize configuration in your project
npx aurora-obsidian-ui init

# 2. Add whichever components you need
npx aurora-obsidian-ui add button product-card select toast alert
```

### Option 2: Traditional NPM Package

```bash
# Using npm
npm install aurora-obsidian-ui

# Using pnpm
pnpm add aurora-obsidian-ui

# Using bun
bun add aurora-obsidian-ui
```

Import the stylesheet at your application entry point (`src/main.tsx` or `app/layout.tsx`):

```tsx
import 'aurora-obsidian-ui/dist/style.css';
```

---

## 🛠️ Interactive CLI

The Aurora Obsidian UI CLI includes powerful commands for component management:

```bash
# Initialize project config and create lib/utils.ts helper
npx aurora-obsidian-ui init

# List all 34 available components in the registry
npx aurora-obsidian-ui list

# Add single or multiple components
npx aurora-obsidian-ui add button select toast alert dropdown-menu

# Add all components to a custom directory
npx aurora-obsidian-ui add --all --path ./src/components/ui

# Overwrite existing files
npx aurora-obsidian-ui add button --overwrite

# Skip automatic installation of npm dependencies
npx aurora-obsidian-ui add modal --no-install
```

---

## 📦 Component Catalog (34)

Aurora Obsidian UI is structured following *Atomic Design* principles:

### 🔘 Forms & Inputs
| Component | Type | Description |
| :--- | :--- | :--- |
| **`Button`** | Atom | Interactive buttons with *primary*, *secondary*, *outline*, *ghost*, *danger* variants and loading state (`isLoading`). |
| **`Input`** | Atom | Form input with left/right icon slots, helper text, and validation error states. |
| **`Textarea`** | Atom | Multi-line text field with dynamic height adjustment (`autoResize`) and character counter (`showCount`). |
| **`Checkbox`** | Atom | Accessible checkbox with smooth tick micro-interaction and terms-of-service support. |
| **`RadioGroup`** | Atom | Radio option group featuring rich `<RadioGroupCard />` for checkout payment & shipping selection. |
| **`Switch`** | Atom | Smooth toggle switch with scale variants and integrated preference cards (`<SwitchCard />`). |
| **`Select`** | Atom | Accessible floating dropdown with search filter, `@floating-ui/react` positioning, and keyboard navigation. |
| **`Slider`** | Atom | Single and Dual-Thumb range slider for price and filter bounds with collision prevention. |

### 🛍️ Specialized E-Commerce
| Component | Type | Description |
| :--- | :--- | :--- |
| **`ProductCard`** | Molecule | Showcase card with image gallery, discount badges, review ratings, and quick add-to-cart action. |
| **`Price`** | Atom | High-precision currency formatter (`Intl.NumberFormat`) with strike-through previous prices and savings percentage. |
| **`QuantitySelector`** | Atom | Touch-friendly step controller with `+` / `-` buttons, stock threshold guards, and validation. |
| **`SkuSelector`** | Molecule | Variant picker (Sizes `S, M, L`, Color swatches, and Finishes) with out-of-stock indicators. |
| **`AddToCart`** | Atom | State-driven purchase button (*idle*, *adding*, *added successfully*). |
| **`CartItem`** | Molecule | Cart row item with dynamic pricing, thumbnail image, quantity counter, and remove trigger. |
| **`Rating`** | Atom | Star rating display and interactive review selector with half-star precision (`0.5`). |

### 💬 Feedback & Notifications
| Component | Type | Description |
| :--- | :--- | :--- |
| **`Alert`** | Atom | High-contrast callout banners (*Info*, *Success*, *Warning*, *Error*) passing WCAG AAA contrast rules with inline actions. |
| **`Toast`** | Organism | Floating notification toasts with progress bars, auto-dismiss, and reactive global store (`toast.success(...)`). |
| **`Spinner`** | Atom | Smooth animated loading indicator with customizable size and speed. |
| **`Skeleton`** | Atom | Shimmering placeholder with `@keyframes shimmer` sweep for loading products, cards, and carts. |

### 🧭 Navigation & Layout
| Component | Type | Description |
| :--- | :--- | :--- |
| **`Navbar`** | Organism | Header navigation with predictive search bar, active cart badge counter, and mobile drawer. |
| **`Breadcrumb`** | Molecule | Semantic breadcrumb navigation for multi-level category hierarchies. |
| **`Pagination`** | Molecule | Accessible page controller with smart ellipsis (`...`), current page highlighting, and jump buttons. |
| **`Tabs`** | Molecule | Accessible tabbed navigation for *Description*, *Technical Specs*, and *Customer Reviews*. |
| **`Accordion`** | Molecule | Animated expandable sections for FAQ, shipping policies, and product details. |

### 🪟 Modals & Overlays
| Component | Type | Description |
| :--- | :--- | :--- |
| **`Dialog`** | Organism | Accessible modal window with `backdrop-blur`, focus trap, and scale-in transition. |
| **`Sheet`** | Organism | Sliding side drawer panel optimized for shopping carts and advanced catalog filter sidebars. |
| **`DropdownMenu`** | Molecule | Contextual popup menu with arrow key navigation ($\uparrow \downarrow$), radio/checkbox items, and keyboard shortcuts. |
| **`Popover`** | Molecule | Rich interactive popover for color palette picking, tax breakdowns, and metadata previews. |
| **`Tooltip`** | Atom | Accessible hover tooltip with customizable delay for icons and quick actions. |

### 📊 Data & Display
| Component | Type | Description |
| :--- | :--- | :--- |
| **`Avatar`** | Atom | Profile avatar with smart fallback initials/icon, shapes, and live status indicator badges. |
| **`Badge`** | Atom | Tag indicator for product highlights (*-20%*, *New*, *Out of stock*, *Bestseller*) in multiple variants. |
| **`Card`** | Molecule | Modular surface container with Header, Title, Description, Content, and Footer subcomponents. |
| **`Table`** | Molecule | Semantic HTML5 data tables with responsive horizontal scrollbar (`.scrollbar-aurora`) for orders and invoices. |
| **`Image`** | Atom | Optimized responsive image with skeleton placeholder, broken image fallback, and zoom-on-hover effect. |

---

## 🎨 Design Tokens

Aurora Obsidian UI uses customizable CSS variables compatible with **Tailwind CSS v4** (`@theme`) and **Tailwind CSS v3**:

```css
:root {
  /* Brand & Primary Colors */
  --color-aurora-primary: #0f172a;
  --color-aurora-primary-hover: #1e293b;
  --color-aurora-primary-foreground: #ffffff;

  /* Surfaces & Borders */
  --color-aurora-surface: #ffffff;
  --color-aurora-surface-hover: #f8fafc;
  --color-aurora-border: #e2e8f0;
  --color-aurora-border-hover: #cbd5e1;
  --color-aurora-border-focus: #0f172a;

  /* Typography */
  --color-aurora-text-primary: #0f172a;
  --color-aurora-text-secondary: #64748b;
  --color-aurora-text-disabled: #94a3b8;

  /* Status & Validation */
  --color-aurora-success: #10b981;
  --color-aurora-warning: #f59e0b;
  --color-aurora-error: #ef4444;

  /* Border Radius */
  --radius-aurora: 8px;
}
```

---

## 📖 Storybook

Explore and interact with all components and live interactive states locally:

```bash
# Start Storybook in development mode (port 6006)
npm run storybook

# Build static Storybook site
npm run build-storybook
```

---

## 💻 Development & Contribution

```bash
# Install repository dependencies
npm install

# Build library bundle and TypeScript definitions
npm run build

# Format and lint code with Biome
npm run format
npm run lint

# TypeScript strict typecheck
npm run typecheck
```

---

## 📄 License

Distributed under the **MIT** License. See `LICENSE` for more information.

<p align="center">
  Crafted with ❤️ for the modern e-commerce developer community.
</p>
