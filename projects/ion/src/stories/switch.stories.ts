import { action } from 'storybook/actions';
import { IonSwitchComponent } from '../lib/switch';

import type { Meta, StoryObj } from '@storybook/angular';

export const actionsData = {
  valueChange: action('valueChange'),
};

const meta: Meta<IonSwitchComponent> = {
  title: 'Ion/Data Entry/Switch',
  component: IonSwitchComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      valueChange: actionsData.valueChange,
    },
  }),
  argTypes: {
    key: {
      control: {
        type: 'text',
      },
      description: 'Chave do switch.',
    },
    value: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Valor do switch.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      defaultValue: { summary: 'sm' },
      description: 'Tamanho do switch. Pode ser `sm`, `md` ou `lg`.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Desabilita o switch.',
    },
  },
};

export default meta;
type Story = StoryObj<IonSwitchComponent>;
export const Default: Story = {
  args: {
    key: 'Default',
  },
};

export const Medium: Story = {
  args: {
    key: 'Medium',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    key: 'Large',
    size: 'lg',
  },
};

export const Checked: Story = {
  args: {
    key: 'Checked',
    value: true,
  },
};

export const Disabled: Story = {
  args: {
    key: 'Disabled',
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    key: 'CheckedDisabled',
    value: true,
    disabled: true,
  },
};
