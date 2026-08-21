import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Page activa actual',
    },
    totalPages: {
      control: 'number',
      description: 'Total of páginas',
    },
    siblingCount: {
      control: 'number',
      description: 'Pages contiguas visibles',
    },
    showControls: {
      control: 'boolean',
      description: 'Muestra botones of anterior y siguiente',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Paginación Interactiva of Catálogo (Modo Inteligente/Declarativo)
export const CatalogInteractive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(4);
    const totalPages = 15;

    return (
      <div className="flex flex-col items-center gap-4 font-sans">
        <span className="text-xs text-aurora-text-secondary">
          Mostrando productos of la página{' '}
          <strong className="text-aurora-text-primary">{currentPage}</strong> of {totalPages}
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

// 2. Primera Page
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

// 3. Última Page
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

// 4. Modo Composable (Personalizado)
export const Composable: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">25</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

// 5. Tamaños
export const Sizes = () => (
  <div className="flex flex-col gap-6 items-center">
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-xs text-aurora-text-secondary">Small</span>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size="small" href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="small" href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="small" href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext size="small" href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>

    <div className="flex flex-col items-center gap-1.5">
      <span className="text-xs text-aurora-text-secondary">Medium</span>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size="medium" href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="medium" href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="medium" href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext size="medium" href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>

    <div className="flex flex-col items-center gap-1.5">
      <span className="text-xs text-aurora-text-secondary">Large</span>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size="large" href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="large" href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="large" href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext size="large" href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
);
