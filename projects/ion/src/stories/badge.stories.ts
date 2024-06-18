import type { Meta, StoryObj } from '@storybook/angular';
import { IonBadgeComponent } from '../lib/badge';

const meta: Meta<IonBadgeComponent> = {
  title: 'Ion/Data Display/Badge',
  component: IonBadgeComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      description: 'Rótulo da badge. Obrigatório.',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'neutral', 'negative'],
      defaultValue: {
        summary: 'primary',
      },
      description: 'Define o estilo do badge.',
    },
  },
};

export default meta;
type Story = StoryObj<IonBadgeComponent>;
export const Default: Story = {
  args: {
    label: 'Error',
    type: 'negative',
  },
};
