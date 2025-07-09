import type { Meta, StoryObj } from '@storybook/angular';
import { IonBadgeComponent } from '../lib/badge';

const meta: Meta<IonBadgeComponent> = {
  title: 'Ion/Data Display/Badge/Dot',
  component: IonBadgeComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      description: 'Rótulo da badge.',
    },
    dot: {
      description: 'Se verdadeiro, a badge será exibida como um ponto.',
    },
    icon: {
      description: 'Ícone que será exibido na Dot Badge.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md'],
      defaultValue: {
        summary: 'md',
      },
      description: 'Define o tamanho da Dot Badge.',
    },
    status: {
      control: {
        type: 'select',
      },
      options: ['positive', 'negative', 'neutral'],
      defaultValue: {
        summary: 'positive',
      },
      description: 'Define o status da Dot Badge.',
    },
    customColor: {
      description: 'Cor personalizada para a Dot Badge.',
    },
  },
};

type Story = StoryObj<IonBadgeComponent>;

export const Dot: Story = {
  args: {
    dot: true,
    label: 'Badge',
    status: 'positive',
  },
};

export const DotWithIcon = {
  args: {
    dot: true,
    label: 'Badge',
    status: 'positive',
    icon: 'heart',
    size: 'md',
  },
};

export const DotWithCustomColor = {
  args: {
    dot: true,
    label: 'Badge',
    status: 'positive',
    customColor: '#f00',
  },
};

export default meta;
