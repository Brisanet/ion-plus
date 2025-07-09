import type { Meta, StoryObj } from '@storybook/angular';

import { IonNotificationComponent } from '../lib/notification';
import { iconsPaths } from '../public-api';

const meta: Meta<IonNotificationComponent> = {
  title: 'Ion/Feedback/Notification',
  component: IonNotificationComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    title: {
      description: 'Título a ser exibido na notificação. Obrigatório.',
    },
    message: {
      description:
        'Conteúdo da mensagem apresentada abaixo do título. Obrigatório.',
    },
    type: {
      control: {
        type: 'select',
      },
      options: [`success`, `info`, `warning`, `negative`],
      default: { summary: `success` },
      description:
        'Tipo do status da notificação. Pode ser `success`, `info`, `warning` ou `negative`.',
    },
    icon: {
      control: {
        type: 'select',
      },
      options: Object.keys(iconsPaths),
      description:
        'Nome de ícone exibido à esquerda do título. Pode ser qualquer ícone da biblioteca Ion. Sua cor será cinza claro.',
    },
    fixed: {
      control: {
        type: 'boolean',
      },
      description:
        'Indica se a notificação só deverá ser fechada através do botão fechar.',
      defaultValue: { summary: false },
    },
    fadeIn: {
      control: {
        type: 'select',
      },
      options: [
        `fadeIn`,
        `fadeInUp`,
        `fadeInRigth`,
        `fadeInLeft`,
        `fadeInDown`,
      ],
      defaultValue: { summary: `fadeIn` },
      description:
        'Indica a direção de início do efeito fade in ao exibir notificação.',
    },
    fadeOut: {
      control: {
        type: 'select',
      },
      options: [
        `fadeOutUp`,
        `fadeOutRigth`,
        `fadeOutLeft`,
        `fadeOutDown`,
        `fadeOut`,
      ],
      defaultValue: { summary: `fadeOut` },
      description:
        'Indica a direção de finalização do efeito fade out ao fechar a notificação.',
    },
    ionOnClose: {
      action: { handles: 'click' },
      description: 'Emite um evento quando a notificação é fechada.',
    },
  },
};

export default meta;
type Story = StoryObj<IonNotificationComponent>;

export const Basic: Story = {
  args: {
    title: 'Parabéns',
    message: 'Seu cadastro foi realizado com sucesso!',
  },
};

export const Fixed: Story = {
  args: {
    title: 'Notificação Fixa',
    message:
      'Você precisa fechar essa notificação, ela não desaparece automaticamente.',
    type: 'negative',
    fixed: true,
  },
};

export const Info: Story = {
  args: {
    title: 'Informação',
    message: 'Seu cadastro está regular!',
    type: 'info',
  },
};

export const Warning: Story = {
  args: {
    title: 'Cuidado',
    message: 'Seu cadastro será excluído em 5 dias!',
    type: 'warning',
  },
};

export const Negative: Story = {
  args: {
    title: 'Falha',
    message: 'Houve um erro com seu login!',
    type: 'negative',
  },
};

export const CustomIcon: Story = {
  args: {
    title: 'Editado',
    message: 'Um item foi editado no seu inventário',
    icon: 'pencil',
  },
};

export const CustomAnimation: Story = {
  args: {
    title: 'Editado',
    message: 'Um item foi editado no seu inventário',
    fadeIn: 'fadeInUp',
    fadeOut: 'fadeOutDown',
  },
};
