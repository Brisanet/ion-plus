import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/angular';

import { IonStepsComponent } from '../lib/steps';

const meta: Meta<IonStepsComponent> = {
  title: 'Ion/Navigation/Steps',
  component: IonStepsComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      currentChange: action('currentChange'),
    },
  }),
  argTypes: {
    current: {
      control: {
        type: 'number',
        min: 1,
      },
      description:
        'Indica qual passo deverá ser exibido como selecionado. Útil para inicializar em algum passo específico, ou o fazé-lo de acordo com regra externa.',
      defaultValue: { summary: 1 },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Indica se o conjunto de passos está desativado.',
      defaultValue: { summary: false },
    },
    steps: {
      control: 'object',
      description:
        'Recebe um array de objetos do tipo Step, cada um com a configuração individual de cada passo.',
    },
    clickable: {
      control: {
        type: 'boolean',
      },
      description:
        'Indica se usuário pode selecionar um passo através de um clique nele.',
      defaultValue: { summary: false },
    },
    currentChange: {
      action: { handles: 'click' },
      description:
        'Emite um evento quando algum passo é selecionado pelo clique. Para usá-lo, a propriedade "clickable" deve estar ativada. Ele emite o índex da etapa selecionada.',
    },
  },
};

export default meta;
type Story = StoryObj<IonStepsComponent>;

export const Default: Story = {
  args: {
    steps: [
      {
        label: 'First',
      },
      {
        label: 'Second',
      },
      {
        label: 'Third',
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    steps: [
      {
        label: 'First',
        status: 'checked',
      },
      {
        label: 'Second',
      },
      {
        label: 'Third',
      },
    ],
    disabled: true,
  },
};

export const Checked: Story = {
  args: {
    steps: [
      {
        label: 'First',
        status: 'checked',
      },
      {
        label: 'Second',
        status: 'checked',
      },
      {
        label: 'Third',
      },
      {
        label: 'Fourty',
      },
    ],
  },
};

export const WithError: Story = {
  args: {
    steps: [
      {
        label: 'First',
        status: 'checked',
      },
      {
        label: 'Second',
        status: 'error',
        description: 'Atenção neste passo',
      },
      {
        label: 'Third',
      },
      {
        label: 'Fourty',
      },
    ],
  },
};

export const Clickable: Story = {
  args: {
    steps: [
      {
        label: 'First',
        status: 'checked',
      },
      {
        label: 'Second',
      },
      {
        label: 'Third',
      },
    ],
    clickable: true,
  },
};
