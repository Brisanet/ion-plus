/* eslint-disable */
import type { Meta, StoryObj } from '@storybook/angular';

import { IonAvatarComponent } from '../lib/avatar';
import { DefaultImageDirective } from '../lib/avatar/defaultImage.directive';

const meta: Meta<IonAvatarComponent> = {
  title: 'Ion/Data Display/Avatar',
  component: IonAvatarComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [DefaultImageDirective],
    },
  }),
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['initials', 'photo', 'icon'],
      default: '',
      description: 'Tipo do avatar. Obrigatório.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xs'],
      defaultValue: { summary: 'md' },
      description: 'Tamanho do botão. Pode ser `sm`, `md`, `lg` ou `xl`.',
    },
    value: {
      control: 'text',
      description:
        'Caso seja do tipo `initials`, o valor exibido será as iniciais do nome.',
    },
    image: {
      control: 'text',
      description: 'Caso seja do tipo `photo`, a imagem a ser exibida.',
    },
    icon: {
      control: 'text',
      description: 'Caso seja do tipo `icon`, o icon a ser exibido.',
    },
    onErrorImage: {
      control: 'text',
      description:
        'Caso seja do tipo `photo` e a imagem não ser exibida é mostrado uma imagem default.',
    },
  },
};

export default meta;
type Story = StoryObj<IonAvatarComponent>;

export const Initials: Story = {
  args: {
    type: 'initials',
    size: 'md',
    value: 'Anakin Skywalker',
  },
};

export const Photo: Story = {
  args: {
    type: 'photo',
    size: 'md',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/is-anakin-skywalker-in-ahsoka-hayden-christensen-star-wars-news-64e37d3227aec.png?crop=0.468xw:0.827xh;0.532xw,0.0510xh&resize=1200:*',
  },
};

export const Icon: Story = {
  args: {
    type: 'icon',
    size: 'md',
    icon: 'union',
  },
};

export const ErrorImage: Story = {
  args: {
    type: 'photo',
    size: 'md',
    image:
      'https://hips..com/hmg-prod/images/is-anakin-skywalker-in-ahsoka-hayden-christensen-star-wars-news-64e37d3227aec.png?crop=0.468xw:0.827xh;0.532xw,0.0510xh&resize=1200:*',
    onErrorImage: require('./assets/default.svg'),
  },
};
