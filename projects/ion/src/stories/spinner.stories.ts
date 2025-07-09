import { IonSpinnerComponent } from '../lib/spinner';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IonSpinnerComponent> = {
  title: 'Ion/Feedback/Spinner',
  component: IonSpinnerComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
      defaultValue: { summary: 24 },
      description: 'Tamanho do spinner. Pode ser um número.',
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'danger'],
      defaultValue: { summary: 'primary' },
      description:
        'Cor do spinner. Pode ser `primary`, `secondary` ou `danger`.',
    },
    customColor: {
      control: {
        type: 'color',
      },
      description: 'Cor customizada do spinner.',
    },
    text: {
      control: {
        type: 'text',
      },
      description: 'Texto do spinner.',
    },
    textSize: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      defaultValue: { summary: 'sm' },
      description: 'Tamanho do texto do spinner. Pode ser `sm`, `md` ou `lg`.',
    },
  },
};

export default meta;
type Story = StoryObj<IonSpinnerComponent>;
export const Default: Story = {
  args: {
    size: 24,
    color: 'primary',
    textSize: 'sm',
  },
};

export const Secondary: Story = {
  args: {
    size: 24,
    color: 'secondary',
    customColor: '',
    text: '',
    textSize: 'sm',
  },
};

export const Danger: Story = {
  args: {
    size: 24,
    color: 'danger',
    customColor: '',
    text: '',
    textSize: 'sm',
  },
};

export const CustomColor: Story = {
  args: {
    size: 24,
    customColor: 'purple',
    text: '',
    textSize: 'sm',
  },
};

export const Text: Story = {
  args: {
    size: 24,
    color: 'primary',
    customColor: '',
    text: 'Carregando...',
    textSize: 'sm',
  },
};
