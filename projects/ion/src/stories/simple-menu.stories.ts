/* eslint-disable */
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/angular';

import { IonSimpleMenuComponent } from '../lib/simple-menu';
import {
  IonAvatarComponent,
  IonButtonComponent,
  IonTabGroupComponent,
} from '../public-api';

const meta: Meta<IonSimpleMenuComponent> = {
  title: 'Ion/Data Display/Simple Menu',
  component: IonSimpleMenuComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      selected: action('selected'),
      logoutClick: action('logoutClick'),
    },
    moduleMetadata: {
      imports: [IonButtonComponent, IonAvatarComponent, IonTabGroupComponent],
    },
  }),
  argTypes: {
    options: {
      description:
        'O parametro `options` representa a lista de opções que será exibida no menu.',
    },
    profile: {
      description:
        'O parametro `profile` representa o perfil do usuário que será exibido no menu. ',
    },
    logo: {
      description:
        'O parametro `logo` representa a logo que será exibido no menu.',
    },
  },
};

export default meta;
type Story = StoryObj<IonSimpleMenuComponent>;
export const Basic: Story = {
  args: {
    options: [
      {
        label: 'Agendamentos',
        iconType: 'calendar',
        selected: false,
      },
      {
        label: 'Recursos',
        iconType: 'pencil',
        selected: false,
      },
    ],
    profile: {
      imageUrl:
        'https://ovicio.com.br/wp-content/uploads/2022/01/20220123-rocket-raccoon-guardians-of-the-galaxy.jpeg',
      name: 'Rocket Raccoon',
    },
  },
};

export const WithLogo: Story = {
  args: {
    ...Basic.args,
    logo: {
      src: require('./assets/sidebar-logo.svg'),
      alt: 'Logo Exemplo',
    },
  },
};

export const withoutImage: Story = {
  args: {
    options: [{ label: 'Agendamentos', iconType: 'calendar', selected: false }],
    profile: {
      imageUrl: '',
      name: 'Jennie Kim',
    },
  },
};
