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

// 1. Customer Order History (E-Commerce)
export const OrderHistory: Story = {
  render: () => (
    <div className="w-full max-w-4xl font-sans">
      <Table>
        <TableCaption>History of recent orders placed in your account.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">#AUR-89412</TableCell>
            <TableCell className="text-aurora-text-secondary">21 Ago 2026</TableCell>
            <TableCell>
              <Badge variant="success">Delivered</Badge>
            </TableCell>
            <TableCell>2 items</TableCell>
            <TableCell className="text-right font-medium">
              <Price value={149.99} />
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" size="small" aria-label="View Details ofpedido #AUR-89412">
                <Eye size={14} className="mr-1" />
                Ver
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-semibold">#AUR-89390</TableCell>
            <TableCell className="text-aurora-text-secondary">15 Ago 2026</TableCell>
            <TableCell>
              <Badge variant="warning">In Transit</Badge>
            </TableCell>
            <TableCell>1 item</TableCell>
            <TableCell className="text-right font-medium">
              <Price value={89.5} />
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" size="small" aria-label="View Details ofpedido #AUR-89390">
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
            <TableCell>3 items</TableCell>
            <TableCell className="text-right font-medium">
              <Price value={210.0} />
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" size="small" aria-label="View Details ofpedido #AUR-89104">
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

// 2. Inventory Management with Selection
export const ProductInventory: Story = {
  render: () => (
    <div className="w-full max-w-4xl font-sans">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Price</TableHead>
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
              <Checkbox aria-label="Select Performance T-Shirt" />
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=60&auto=format&fit=crop&q=80"
                  alt="Camiseta"
                  className="h-9 w-9 rounded-xs object-cover"
                />
                <span>Breathable Performance T-Shirt</span>
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

// 3. Product Specifications Table
export const TechnicalSpecs: Story = {
  render: () => (
    <div className="w-full max-w-md font-sans">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Specification</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">
              Matterial Superior
            </TableCell>
            <TableCell>Breathable Jacquard technical mesh</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">Suela</TableCell>
            <TableCell>Vibram® Megagrip high-traction rubber</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">Cushioning</TableCell>
            <TableCell>Espuma reactiva EVA of doble ofnsidad</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">Drop</TableCell>
            <TableCell>8 mm</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-aurora-text-secondary">Weight</TableCell>
            <TableCell>245 g (Size 42)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
