import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/angular';
import { IonTripleToggleComponent } from '../public-api';

const meta: Meta<IonTripleToggleComponent> = {
  title: 'Ion/Data Entry/Triple Toggle',
  component: IonTripleToggleComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      valueChange: action('valueChange'),
    },
  }),
  argTypes: {
    value: {
      description: 'Indica o valor da opção selecionada.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Desativa o componente de tripla escolha.',
      defaultValue: { summary: false },
    },
    size: {
      control: {
        type: 'select',
      },
      options: [`sm`, `md`, `lg`, `xl`],
      default: { summary: `md` },
      description:
        'Tamanho do componente de tripla escolha. Pode ser `sm`, `md`,`lg` ou `xl`.',
    },
    options: {
      control: 'object',
      description: 'Conjunto de objetos que configuram as opções de escolha.',
    },
    onlyShowIcon: {
      control: {
        type: 'boolean',
      },
      description:
        'Indica se o componente deve exibir apenas ícones como rótulos das opções a serem selecionadas.',
      defaultValue: { summary: false },
    },
    valueChange: {
      action: { handles: 'click' },
      description:
        'Emite um evento quando alguma opção é clicada. Caso o componente esteja desabilitado, nenhum evento será disparado.',
    },
  },
};

export default meta;
type Story = StoryObj<IonTripleToggleComponent>;

export const Default: Story = {
  args: {},
};

export const TripleToggleSmall: Story = {
  args: {
    size: 'sm',
  },
};

export const TripleToggleLarge: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithInitialValue: Story = {
  args: {
    value: true,
  },
};

export const CustomConfiguration: Story = {
  args: {
    options: [
      {
        value: 'box',
        label: 'Box',
        icon: { type: 'box' },
        tooltip: 'Box to exemplify.',
      },
      {
        value: 'star',
        label: 'Star',
        icon: { type: 'star' },
        tooltip: 'Star to exemplify.',
      },
    ],
  },
};

export const OnlyIcons: Story = {
  args: {
    onlyShowIcon: true,
    options: [
      {
        value: true,
        label: 'Check',
        icon: { type: 'check' },
        tooltip: 'Yes',
      },
      {
        value: false,
        label: 'Close',
        icon: { type: 'close' },
        tooltip: 'No',
      },
    ],
  },
};
