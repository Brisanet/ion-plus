import { IonDividerComponent } from '../lib/divider';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IonDividerComponent> = {
  title: 'Ion/Design Tokens/Dividers',
  component: IonDividerComponent,
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
      description: 'Texto do divider.',
    },
    direction: {
      control: {
        type: 'select',
      },
      options: ['vertical', 'horizontal'],
      defaultValue: { summary: 'horizontal' },
      description: 'Direção do divider. Pode ser `vertical` ou `horizontal`.',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['solid', 'dashed', 'text'],
      defaultValue: { summary: 'solid' },
      description: 'Tipo do divider. Pode ser `solid`, `dashed` ou `text`.',
    },
  },
};

export default meta;
type Story = StoryObj<IonDividerComponent>;
export const Default: Story = {
  args: {
    label: 'Divider',
    direction: 'horizontal',
    type: 'solid',
  },
};

export const Vertical: Story = {
  args: {
    label: 'Divider',
    direction: 'vertical',
    type: 'solid',
  },
};

export const Dashed: Story = {
  args: {
    label: 'Divider',
    direction: 'horizontal',
    type: 'dashed',
  },
};

export const Text: Story = {
  args: {
    label: 'Divider',
    direction: 'horizontal',
    type: 'text',
  },
};
