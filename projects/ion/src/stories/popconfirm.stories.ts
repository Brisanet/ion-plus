import type { Meta, StoryObj } from '@storybook/angular';
import { IonPopConfirmComponent } from '../public-api';

const meta: Meta<IonPopConfirmComponent> = {
  title: 'Ion/Data Display/PopConfirm',
  component: IonPopConfirmComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    ionPopConfirmTitle: {
      control: {
        type: 'text',
      },
      description: 'Título do popconfirm. Obrigatório.',
    },
    ionPopConfirmType: {
      control: {
        type: 'select',
      },
      options: [`success`, `info`, `warning`, `negative`],
      default: { summary: `warning` },
      description:
        'Tipo do status da notificação. Pode ser `success` , `info` , `warning` ou `negative`.',
    },
    ionPopConfirmDesc: {
      control: {
        type: 'text',
      },
      description: 'Descrição opcional do popconfirm.',
    },
    ionConfirmText: {
      control: {
        type: 'text',
      },
      default: { summary: `Confirmar` },
      description: 'Texto para botão de confirmação.',
    },
    ionCancelText: {
      control: {
        type: 'text',
      },
      default: { summary: `Cancelar` },
      description: 'Texto para botão de cancelamento.',
    },
  },
};

export default meta;

type Story = StoryObj<IonPopConfirmComponent>;

export const Default: Story = {
  args: {
    ionPopConfirmTitle: 'Você tem certeza?',
  },
};

export const withDescription: Story = {
  args: {
    ionPopConfirmTitle: 'Você tem certeza?',
    ionPopConfirmDesc:
      'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  },
};
