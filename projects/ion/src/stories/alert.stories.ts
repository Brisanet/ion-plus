import type { Meta, StoryObj } from '@storybook/angular';
import type { IonAlertStatus } from '../lib/alert';
import { IonAlertComponent } from '../lib/alert';

const statusOptions: IonAlertStatus[] = [
  'success',
  'info',
  'warning',
  'negative',
];

const meta: Meta<IonAlertComponent> = {
  title: 'Ion/Feedback/Alert',
  component: IonAlertComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    message: {
      description:
        'O parâmetro `message` indica o conteúdo que será mostrado no alerta, podendo ser uma string ou um TemplateRef.',
    },
    description: {
      description:
        'O parâmetro `description` indica o texto do corpo do alerta na sua variação de Alerta com descrição.',
      control: { type: 'text' },
    },
    type: {
      defaultValue: { summary: 'success' },
      options: statusOptions,
      control: { type: 'select' },
      description: 'O parâmetro `type` indica o tipo do alerta',
    },
    closable: {
      defaultValue: { summary: 'true' },
      control: { type: 'boolean' },
      description: 'O parâmetro `closable` indica se o alerta pode ser fechado',
    },
    hideBackground: {
      defaultValue: { summary: 'true' },
      control: { type: 'boolean' },
      description:
        'O parâmetro `hideBackground` indica se deve esconder o background do alerta',
    },
    noRadius: {
      defaultValue: { summary: 'false' },
      control: { type: 'boolean' },
      description:
        'O parâmetro `noRadius` indica se deve remover o border radius',
    },
  },
};

export default meta;
type Story = StoryObj<IonAlertComponent>;
export const Default: Story = {
  args: {
    message: 'Exemplo de Alerta teste',
    type: 'info',
  },
};

export const WithDescription: Story = {
  args: {
    message: 'Sobre o novo cliente',
    description:
      'Para garantir uma troca de titularidade sem complicações, registre o nome completo e telefone do novo titular com cuidado. Verifique as informações para garantir que estejam corretas antes de continuar.',
    type: 'info',
    noRadius: true,
  },
};
