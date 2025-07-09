import type { Meta, StoryObj } from '@storybook/angular';

import { IonTabComponent } from '../lib/tab';
import { iconsPaths } from '../public-api';

const meta: Meta<IonTabComponent> = {
  title: 'Ion/Navigation/Tab',
  component: IonTabComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      description: 'Rótulo da tab. Obrigatório.',
    },
    tabSize: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      defaultValue: { summary: 'sm' },
      description: 'Tamanho da tab. Pode ser `sm`, `md` ou `lg`.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Indica se a tab está desativada.',
      defaultValue: { summary: false },
    },
    selected: {
      control: {
        type: 'boolean',
      },
      description: 'Indica se a tab está selecionada.',
      defaultValue: { summary: false },
    },
    direction: {
      control: {
        type: 'select',
      },
      options: ['bottom', 'top', 'right', 'left'],
      default: { summary: 'bottom' },
      description:
        'Indica onde a borda da tab está localizada. Pode ser `bottom`, `top`, `right` ou `left`.',
    },
    iconType: {
      control: {
        type: 'select',
      },
      options: Object.keys(iconsPaths),
      description:
        'Nome válido de ícone associado a tab. Pode ser qualquer ícone da biblioteca Ion.',
    },
    badge: {
      control: {
        type: 'number',
      },
      description: 'Número que representa valor em badge da tab.',
    },
  },
};

export default meta;
type Story = StoryObj<IonTabComponent>;
export const Default: Story = {
  args: {
    label: 'Custom label',
  },
};
