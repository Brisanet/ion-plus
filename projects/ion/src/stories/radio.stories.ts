import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/angular';
import { IonRadioComponent } from '../lib/radio';

const meta: Meta<IonRadioComponent> = {
  title: 'Ion/Data Entry/Radio',
  component: IonRadioComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      valueChange: action('valueChange'),
    },
  }),
  argTypes: {
    options: {
      control: {
        type: 'object',
      },
      description:
        'Recebe um array de objetos com as opções do radio. Cada objeto recebe uma label e um value, e opcionalmente um disabled.',
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'Nome do conjunto de inputs radio.',
      defaultValue: { summary: 'ion-radio' },
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'Valor do radio selecionado.',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Evento emitido quando o valor do radio é alterado.',
    },
  },
};

export default meta;
type Story = StoryObj<IonRadioComponent>;
export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  },
};
