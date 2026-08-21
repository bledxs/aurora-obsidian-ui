import type { Meta, StoryObj } from '@storybook/react';
import { Eye } from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Price } from '../Price';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

const meta = {
  title: 'Molecules/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Historial of Pedidos of Cliente (E-Commerce)
export const OrderHistory: Story = {
  render: () => (
    <div className="w-full max-w-4xl font-sans">
      <Table>
        <TableCaption>Historial of los últimos pedidos realizados en tu cuenta.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nº Pedido</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Artículos</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">#AUR-89412</TableCell>
            <TableCell className="text-aurora-text-secondary">21 Ago 2026</TableCell>
            <TableCell>
              <Badge variant="success">Entregado</Badge>
            </TableCell>
            <TableCell>2 productos</TableCell>
            <TableCell className="text-right font-medium">
              <Price value={149.99} />
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="outline"
                size="small"
                aria-label="View Details ofl pedido #AUR-89412"
              >
                <Eye size={14} className="mr-1" />
                Ver
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-semibold">#AUR-89390</TableCell>
            <TableCell className="text-aurora-text-secondary">15 Ago 2026</TableCell>
            <TableCell>
              <Badge variant="warning">En tránsito</Badge>
            </TableCell>
            <TableCell>1 producto</TableCell>
            <TableCell className="text-right font-medium">
              <Price value={89.5} />
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="outline"
                size="small"
                aria-label="View Details ofl pedido #AUR-89390"
              >
                <Eye size={14} className="mr-1" />
                Ver
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-semibold">#AUR-89104</TableCell>
            <TableCell className="text-aurora-text-secondary">02 Ago 2026</TableCell>
            <TableCell>
              <Badge variant="danger">Cancelado</Badge>
            </TableCell>
            <TableCell>3 productos</TableCell>
            <TableCell className="text-right font-medium">
              <Price value={210.0} />
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="outline"
                size="small"
                aria-label="View Details ofl pedido #AUR-89104"
              >
                <Eye size={14} className="mr-1" />
                Ver
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Gasto Total Acumulado</TableCell>
            <TableCell className="text-right font-bold">
              <Price value={449.49} />
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

// 2. Gestión of Inventario con Selección
export const ProductInventory: Story = {
  render: () => (
    <div className="w-full max-w-4xl font-sans">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox aria-label="Select todos" />
            </TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Precio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox aria-label="Select Zapatillas Running" />
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&auto=format&fit=crop&q=80"
                  alt="Zapatillas"
                  className="h-9 w-9 rounded-xs object-cover"
                />
                <span>Aurora Speed Pro</span>
              </div>
            </TableCell>
            <TableCell className="text-aurora-text-secondary font-mono text-xs">
              AUR-SPD-001
            </TableCell>
            <TableCell>Calzado</TableCell>
            <TableCell>
              <span className="font-semibold text-emerald-600">48 uds</span>
            </TableCell>
            <TableCell className="text-right font-semibold">
              <Price value={129.99} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Checkbox aria-label="Select Camiseta Técnica" />
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=60&auto=format&fit=crop&q=80"
                  alt="Camiseta"
                  className="h-9 w-9 rounded-xs object-cover"
                />
                <span>Camiseta Técnica Transpirable</span>
              </div>
            </TableCell>
            <TableCell className="text-aurora-text-secondary font-mono text-xs">
              AUR-TSH-042
            </TableCell>
            <TableCell>Ropa</TableCell>
            <TableCell>
              <span className="font-semibold text-amber-600">3 uds (Bajo)</span>
            </TableCell>
            <TableCell className="text-right font-semibold">
              <Price value={34.99} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

// 3. Ficha Técnica of Producto
export const TechnicalSpecs: Story = {
  render: () => (
    <div className="w-full max-w-md font-sans">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Especificación</TableHead>
            <TableHead>Detalle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">
              Material Superior
            </TableCell>
            <TableCell>Malla técnica transpirable Jacquard</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">Suela</TableCell>
            <TableCell>Goma Vibram® Megagrip of alta tracción</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">
              Amortiguación
            </TableCell>
            <TableCell>Espuma reactiva EVA of doble ofnsidad</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">Drop</TableCell>
            <TableCell>8 mm</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">Peso</TableCell>
            <TableCell>245 g (Talla 42)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
