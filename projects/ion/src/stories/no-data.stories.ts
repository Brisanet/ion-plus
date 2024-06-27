import type { Meta, StoryObj } from '@storybook/angular';

import { IonNoDataComponent, iconsPaths } from '../public-api';

const meta: Meta<IonNoDataComponent> = {
  title: 'Ion/Data Display/No Data',
  component: IonNoDataComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Texto a ser exibido quando não houver dados.',
    },
    iconType: {
      control: {
        type: 'select',
      },
      options: Object.keys(iconsPaths),
      description:
        'Nome válido de ícone associado que aparece à esquerda do texto sobre não haver dados. Pode ser qualquer ícone da biblioteca Ion.',
    },
  },
};

export default meta;
type Story = StoryObj<IonNoDataComponent>;
export const Default: Story = {};
