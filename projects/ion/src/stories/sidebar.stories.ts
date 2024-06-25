import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/angular';

import { IonSidebarComponent } from './../lib/sidebar/sidebar.component';

const meta: Meta<IonSidebarComponent> = {
  title: 'Ion/Navigation/Sidebar',
  component: IonSidebarComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    logo: {
      description: 'Caminho para arquivo da logo a ser renderizada.',
    },
    logoAction: {
      description: 'Ação a ser executada ao clicar na logo.',
    },
    items: {
      description:
        'Items a serem renderizados na sidebar, podendo ser indivuais ou em grupo.',
    },
    closeOnSelect: {
      description:
        'Define se a sidebar vai ser fechada após a seleção de um item.',
      defaultValue: { summary: false },
    },
  },
};

export default meta;
type Story = StoryObj<IonSidebarComponent>;
export const Default: Story = {
  args: {
    logo: require('./assets/sidebar-logo.svg'),
    closeOnSelect: false,
    items: [
      {
        title: 'Fila de atendimento',
        icon: 'headset',
        action: action('Fila de atendimento'),
      },
      { title: 'Cadastros', icon: 'plus-solid', action: action('Cadastros') },
      {
        title: 'Comissões',
        icon: 'calendar-money',
        action: action('Comissões'),
        disabled: true,
      },
      {
        title: 'Permissões',
        icon: 'config',
        action: action('Permissões'),
        options: [
          {
            title: 'Gerência',
            icon: 'user',
            action: action('Gerência'),
          },
          {
            title: 'Grupos',
            icon: 'union',
            action: action('Grupos'),
          },
          {
            title: 'Pausas',
            icon: 'wait',
            action: action('Pausas'),
          },
          {
            title: 'Comissões',
            icon: 'calendar-money',
            action: action('Comissões'),
            disabled: true,
          },
        ],
      },
      {
        title: 'Gerenciamento',
        icon: 'working',
        options: [
          {
            title: 'Gerência',
            icon: 'user',
            action: action('Gerência'),
          },
          {
            title: 'Grupos',
            icon: 'union',
            action: action('Grupos'),
          },
          {
            title: 'Pausas',
            icon: 'wait',
            action: action('Pausas'),
          },
          {
            title: 'Comissões',
            icon: 'calendar-money',
            action: action('Comissões'),
            disabled: true,
          },
        ],
      },
    ],
  },
};
