import type { Meta, StoryObj } from '@storybook/react';
import { ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Allow opening single or multiple items simultaneously',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow closing the active item by clicking on it again',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Especificaciones of Product (Composable)
export const ProductDetails: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-112.5">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Sparkles size={16} className="text-aurora-primary" /> Matterials and sustainability
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Crafted from 100% organic combed cotton (240 gsm). GOTS certified ensuring non-toxic
          dyeing processes and low environmental impact.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Truck size={16} className="text-aurora-primary" /> Shipping & Delivery Times
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>Standard (2-4 business days):</strong> Free for orders over 50€.
            </li>
            <li>
              <strong>Express 24h:</strong> $4.95 (free for Club Aurora members).
            </li>
            <li>Real-time tracking via SMS and email.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-aurora-primary" /> Returns & Warranty
          </span>
        </AccordionTrigger>
        <AccordionContent>
          You have 30 days to test and return your product hassle-free. Includes 2 years official
          manufacturer warranty against defects.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// 2. Quick Declarative Mode (items)
export const DeclarativeItems: Story = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      className="w-105"
      items={[
        {
          value: 'faq-1',
          title: 'How do I choose my size?',
          content:
            'Our garments have a regular fit. If you are between sizes, we recommend sizing up for a relaxed fit.',
        },
        {
          value: 'faq-2',
          title: 'What payment methods do you accept?',
          content:
            'We accept credit/ofbit cards (Visa, Mastercard, AMEX), PayPal, Apple Pay, Google Pay, and Klarna installments.',
        },
        {
          value: 'faq-3',
          title: 'Can I modify my order after placing it?',
          content:
            'You have 1 hour from confirmation to modify the delivery address or cancel from your dashboard.',
        },
      ]}
    />
  ),
};

// 3. Multiple Open Items Simultaneously
export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-112.5">
      <AccordionItem value="item-1">
        <AccordionTrigger>First question</AccordionTrigger>
        <AccordionContent>
          This accordion allows opening multiple panels at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second question</AccordionTrigger>
        <AccordionContent>Ideal for user guides or extensive documentation.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
