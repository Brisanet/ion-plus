import type { Meta, StoryObj } from '@storybook/angular';

import { iconsPaths } from '../lib/icon';
import { IonIconComponent } from '../lib/icon/icon.component';

const meta: Meta<IonIconComponent> = {
  title: 'Ion/Design Tokens/Icons',
  component: IonIconComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    type: {
      options: Object.keys(iconsPaths),
      control: { type: 'select' },
      description:
        'O parâmetro `type` é obrigatório e representa o tipo de ícone que será exibido.',
    },
    size: {
      defaultValue: { summary: '24' },
      description:
        'O parâmetro `size`  é opcional e controla o tamanho do ícone. Fornece um valor numérico para definir o tamanho.',
    },
    color: {
      control: {
        type: 'color',
      },
      defaultValue: { summary: '#282b33' },
      description:
        'O parâmetro `color`  é opcional e permite personalizar a cor do ícone. Você pode passar um valor de cor diretamente, como um código hexadecimal (#RRGGBB) ou um nome de cor. Certifique-se de fornecer um valor válido para garantir que a cor seja aplicada corretamente.',
    },
    highlight: {
      options: ['simple', 'double', 'none'],
      control: { type: 'select' },
      description:
        'O parâmetro `highlight` é opcional e destaca o ícone de alguma forma.',
      defaultValue: { summary: 'NONE' },
    },
  },
};

export default meta;
type Story = StoryObj<IonIconComponent>;
export const Default: Story = {
  args: {
    type: 'pencil',
    size: 24,
    color: '#282b33',
    highlight: 'none',
  },
};
