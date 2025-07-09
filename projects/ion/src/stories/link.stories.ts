import { IonLinkComponent } from '../lib/link';

import type { Meta, StoryObj } from '@storybook/angular';
import { iconsPaths } from '../public-api';

const meta: Meta<IonLinkComponent> = {
  title: 'Ion/Navigation/Link',
  component: IonLinkComponent,
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
      description: 'Rótulo do link.',
    },
    icon: {
      control: {
        type: 'select',
      },
      options: [...Object.keys(iconsPaths)],
      description: 'Ícone do link.',
    },
    iconSide: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      defaultValue: { summary: 'right' },
      description: 'Lado do ícone do link. Pode ser `left` ou `right`.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md'],
      defaultValue: { summary: 'sm' },
      description: 'Tamanho do link. Pode ser `sm` ou `md`.',
    },
    bold: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Fonte em negrito do link.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Link desativado.',
    },
    target: {
      control: {
        type: 'select',
      },
      defaultValue: { summary: '_self' },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'Target do link. Pode ser `_blank`, `_self`, `_parent` ou `_top`.',
    },
    link: {
      control: {
        type: 'text',
      },
      description: 'URL do link.',
    },
  },
};

export default meta;
type Story = StoryObj<IonLinkComponent>;
export const Default: Story = {
  args: {
    label: 'Link',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Link',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    size: 'sm',
  },
};

export const LeftIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    iconSide: 'left',
    size: 'sm',
  },
};

export const Bold: Story = {
  args: {
    label: 'Link',
    bold: true,
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Link',
    disabled: true,
    size: 'sm',
  },
};

export const DisabledWithIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    disabled: true,
    size: 'sm',
  },
};

export const DisabledOnlyIcon: Story = {
  args: {
    icon: 'box',
    disabled: true,
    size: 'sm',
  },
};

export const WithTarget: Story = {
  args: {
    label: 'Link',
    target: '_blank',
    size: 'sm',
  },
};

export const WithLink: Story = {
  args: {
    label: 'Link',
    link: 'https://github.com/Brisanet/ion-plus',
    size: 'sm',
  },
};
