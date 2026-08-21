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
      description: 'Permitir abrir uno solo o múltiples a la vez',
    },
    collapsible: {
      control: 'boolean',
      description: 'Permitir cerrar el elemento activo al cliquearlo de nuevo',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Especificaciones de Producto (Composable)
export const ProductDetails: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Sparkles size={16} className="text-aurora-primary" /> Materiales y Sostenibilidad
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Confeccionado con 100% algodón orgánico peinado de 240 g/m². Certificación GOTS que
          garantiza procesos de teñido libres de químicos nocivos y bajo impacto ambiental.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Truck size={16} className="text-aurora-primary" /> Envíos y Plazos de Entrega
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>Estándar (2-4 días):</strong> Gratis en pedidos superiores a 50€.
            </li>
            <li>
              <strong>Express 24h:</strong> 4.95€ (gratis para miembros Club Aurora).
            </li>
            <li>Seguimiento en tiempo real vía SMS y correo electrónico.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-aurora-primary" /> Devoluciones y Garantía
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Tienes 30 días naturales para probar y devolver tu producto sin coste alguno. Incluye 2
          años de garantía oficial contra cualquier defecto de fabricación.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// 2. Modo Rápido Declarativo (items)
export const DeclarativeItems: Story = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      className="w-[420px]"
      items={[
        {
          value: 'faq-1',
          title: '¿Cómo elijo mi talla adecuada?',
          content:
            'Nuestras prendas tienen un corte regular. Si dudas entre dos tallas, te recomendamos elegir la superior si prefieres un ajuste más holgado.',
        },
        {
          value: 'faq-2',
          title: '¿Qué métodos de pago aceptan?',
          content:
            'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, AMEX), PayPal, Apple Pay, Google Pay y pago a plazos con Klarna.',
        },
        {
          value: 'faq-3',
          title: '¿Puedo modificar mi pedido una vez realizado?',
          content:
            'Dispones de 1 hora desde la confirmación para cancelar o modificar la dirección de entrega desde tu panel de usuario.',
        },
      ]}
    />
  ),
};

// 3. Múltiples Items Abiertos a la vez
export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-[420px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Pregunta Frecuente 1</AccordionTrigger>
        <AccordionContent>
          Este acordeón permite tener abiertos múltiples paneles simultáneamente.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Pregunta Frecuente 2</AccordionTrigger>
        <AccordionContent>Ideal para guías de usuario o documentación extensa.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
