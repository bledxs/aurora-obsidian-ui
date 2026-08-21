import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'white', 'neutral'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Neutral: Story = {
  args: {
    color: 'neutral',
  },
};

export const White: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0f172a' }],
    },
  },
  args: {
    color: 'white',
  },
};
