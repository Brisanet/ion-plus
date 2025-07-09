import type { Meta, StoryObj } from '@storybook/angular';
import { IonMessageComponent } from '../lib/message/message.component';

const meta: Meta<IonMessageComponent> = {
  title: 'Ion/Feedback/Message',
  component: IonMessageComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      description: 'O parâmetro `label` indica o conteúdo que será mostrado.',
      control: 'text',
    },
    type: {
      defaultValue: { summary: 'positive' },
      options: [
        'positive',
        'negative_alert',
        'negative_error',
        'warning',
        'info',
        'custom',
      ],
      control: { type: 'select' },
      description:
        'O parâmetro `type` indica o tipo da mensagem, podendo ser `positive`, `negative_alert`, `negative_error`, `warning`, `info`, `custom`',
    },
    iconType: {
      description:
        'O parâmetro `iconType` indica o ícone que será mostrado. O tipo da mensagem já define o ícone que será mostrado.',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<IonMessageComponent>;
export const Default: Story = {
  args: {
    label: `Positive message`,
    type: 'positive',
  },
};

export const NegativeAlert: Story = {
  args: {
    label: 'Negative alert message',
    type: 'negative_alert',
  },
};

export const NegativeError: Story = {
  args: {
    label: 'Negative error message',
    type: 'negative_error',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning message',
    type: 'warning',
  },
};

export const Info: Story = {
  args: {
    label: 'Info message',
    type: 'info',
  },
};

export const Custom: Story = {
  args: {
    label: 'Custom message',
    type: 'custom',
  },
};
