import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';

const meta = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    aspectRatio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', 'auto'],
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none'],
    },
    lazy: { control: 'boolean' },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

// Usamos imágenes de Lorem Picsum que es un servicio rápido
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Ejemplo de imagen',
    style: { width: '400px' },
  },
};

export const SquareAspect: Story = {
  args: {
    src: 'https://picsum.photos/400/400',
    alt: 'Zapatos deportivos',
    aspectRatio: '1/1',
    style: { width: '300px' },
  },
};

export const FallbackError: Story = {
  args: {
    src: 'https://rutainvalida.com/imagen.jpg',
    alt: 'Imagen rota',
    style: { width: '400px', height: '300px' },
  },
};

export const FallbackWithAlternativeSource: Story = {
  args: {
    src: 'https://rutainvalida.com/imagen.jpg',
    fallbackSrc: 'https://picsum.photos/400/300?grayscale',
    alt: 'Fallo y cargó la imagen de respaldo',
    style: { width: '400px' },
  },
};
