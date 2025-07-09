import { IonInputDirective } from '../lib/input';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<unknown> = {
  title: 'Ion/Data Entry/Input',
  render: args => ({
    props: {
      ...args,
    },
    template: `<input ionInput placeholder="Digite aqui" [invalid]="invalid" [disabled]="disabled">`,
    moduleMetadata: {
      imports: [IonInputDirective],
    },
  }),
  argTypes: {
    invalid: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Input inválido',
    },
  },
};

export default meta;
type Story = StoryObj;

export const basic: Story = {};

export const invalid: Story = {
  args: {
    invalid: true,
  },
};

export const disabled: Story = {
  args: {
    disabled: true,
  },
};
