import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarImage } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Geometric shape of the avatar',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away'],
      description: 'Insignia of disponibilidad',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Basic Gallery with Fallbacks
export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-4 font-sans">
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        alt="Sara Connor"
        status="online"
      />
      <Avatar fallback="MG" status="away" />
      <Avatar fallback="AL" shape="square" status="busy" />
      <Avatar status="offline" />
    </div>
  ),
};

// 2. All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-3 font-sans">
      <Avatar
        size="xs"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        status="online"
      />
      <Avatar
        size="sm"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        status="online"
      />
      <Avatar
        size="md"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        status="online"
      />
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        status="online"
      />
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        status="online"
      />
      <Avatar
        size="2xl"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        status="online"
      />
    </div>
  ),
};

// 3. Insignias of Estado
export const StatusBadges: Story = {
  render: () => (
    <div className="flex items-center gap-6 font-sans">
      <div className="flex flex-col items-center gap-1.5">
        <Avatar size="lg" fallback="ON" status="online" />
        <span className="text-xs text-aurora-text-secondary">Online</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Avatar size="lg" fallback="AW" status="away" />
        <span className="text-xs text-aurora-text-secondary">Away</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Avatar size="lg" fallback="BS" status="busy" />
        <span className="text-xs text-aurora-text-secondary">Busy</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Avatar size="lg" fallback="OF" status="offline" />
        <span className="text-xs text-aurora-text-secondary">Defline</span>
      </div>
    </div>
  ),
};

// 4. Grupo of Avatares (E-Commerce Reviewers)
export const ReviewersGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-3 font-sans">
      <div className="flex items-center gap-3">
        <AvatarGroup max={4} size="md">
          <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" />
          <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" />
          <Avatar fallback="JS" />
          <Avatar fallback="LM" />
          <Avatar fallback="KP" />
        </AvatarGroup>
        <span className="text-xs font-semibold text-aurora-text-secondary">
          Over <strong className="text-aurora-text-primary">1,400+ customers</strong> verificados
        </span>
      </div>
    </div>
  ),
};

// 5. Modo Composable
export const Composable: Story = {
  render: () => (
    <div className="flex items-center gap-4 font-sans">
      <Avatar size="lg">
        <AvatarImage
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          alt="Elena Rostova"
        />
        <AvatarFallback>ER</AvatarFallback>
        <AvatarBadge status="online" size="lg" />
      </Avatar>

      <Avatar size="lg" shape="square">
        <AvatarFallback>OBS</AvatarFallback>
        <AvatarBadge status="busy" size="lg" />
      </Avatar>
    </div>
  ),
};
