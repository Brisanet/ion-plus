import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/angular';
import { IonCheckboxComponent } from '../lib/checkbox';

const meta: Meta<IonCheckboxComponent> = {
  title: 'Ion/Data Entry/Checkbox',
  component: IonCheckboxComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      checkedChange: action('checked'),
    },
  }),
  argTypes: {
    label: {
      description: 'Rótulo do checkbox.',
      control: {
        type: 'text',
      },
    },
    value: {
      description: 'Valor do checkbox. Útil quando utilizado em um formulário.',
    },
    checked: {
      description: 'Se verdadeiro, o checkbox será marcado.',
      control: {
        type: 'boolean',
        defaultValue: {
          summary: false,
        },
      },
    },
    indeterminate: {
      description:
        'Se verdadeiro, o checkbox será exibido como indeterminado. Esse valor sobrescreve o valor de `checked`.',
      control: {
        type: 'boolean',
        defaultValue: {
          summary: false,
        },
      },
    },
    disabled: {
      description: 'Indica se o checkbox está desativado.',
      control: {
        type: 'boolean',
        defaultValue: {
          summary: false,
        },
      },
    },
    checkedChange: {
      action: { handles: 'click' },
      description:
        'Emite um evento com o valor do checkbox quando o mesmo é clicado.',
    },
  },
};
export default meta;

type Story = StoryObj<IonCheckboxComponent>;
export const Default: Story = {
  args: {
    label: 'Label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Label',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Label',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
};
