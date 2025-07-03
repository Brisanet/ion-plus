import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/angular';

import { IonButtonComponent } from '../lib/button';

export const actionsData = {
  args: {
    label: 'Button',
  },
  ionOnClick: action('ionOnClick'),
};

const meta: Meta<IonButtonComponent> = {
  title: 'Ion/Navigation/Button',
  component: IonButtonComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      ionOnClick: actionsData.ionOnClick,
    },
  }),
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Rótulo do botão.',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'ghost', 'dashed'],
      defaultValue: { summary: 'primary' },
      description:
        'Tipo do botão. Pode ser `primary`, `secondary`, `ghost` ou `dashed`.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: { summary: 'md' },
      description: 'Tamanho do botão. Pode ser `sm`, `md`, `lg` ou `xl`.',
    },
    danger: {
      control: {
        type: 'boolean',
      },
      description: 'Indica se o botão representa um perigo.',
      defaultValue: { summary: false },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Indica se o botão está desativado.',
      defaultValue: { summary: false },
    },
    loading: {
      control: {
        type: 'boolean',
      },
      description:
        'Indica que o botão está em espera. Ou seja, esperando algum processo terminar para que possa está pronto para uso.',
      defaultValue: { summary: false },
    },
    shape: {
      control: {
        type: 'select',
      },
      options: ['normal', 'circle', 'rounded'],
      defaultValue: { summary: 'normal' },
      description: 'Altera a forma do botão.',
    },
    icon: {
      control: 'object',
      description:
        'Recebe um objeto que configura o ícone associado ao botão. `type` define o tipo de ícone a ser rederizado. `rightPosition` indica se o ícone deve ser renderizado a direita da label.',
    },
    ionOnClick: {
      action: { handles: 'click' },
      description:
        'Emite um evento quando o botão é clicado. Caso o botão esteja desabilitado, nenhum evento será disparado.',
    },
  },
};

export default meta;
type Story = StoryObj<IonButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    type: 'secondary',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    label: 'Secondary',
    type: 'secondary',
    icon: {
      type: 'left3',
    },
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost',
    type: 'ghost',
  },
};

export const Dashed: Story = {
  args: {
    label: 'Dashed',
    type: 'dashed',
  },
};

export const SizeSm: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
};

export const SizeMd: Story = {
  args: {
    label: 'Medium',
    size: 'md',
  },
};

export const SizeLg: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
};

export const SizeXl: Story = {
  args: {
    label: 'Extra large',
    size: 'xl',
  },
};

export const IconOnly: Story = {
  args: {
    icon: {
      type: 'pencil',
    },
  },
};

export const DangerIconOnly: Story = {
  args: {
    icon: {
      type: 'pencil',
    },
    danger: true,
  },
};

export const LgSizeWithIcon: Story = {
  args: {
    label: 'Delete',
    icon: {
      type: 'trash',
    },
    size: 'lg',
  },
};

export const OnlyIconLoading: Story = {
  args: {
    icon: {
      type: 'pencil',
    },
    shape: 'circle',
    loading: true,
  },
};

export const WithIconLoading: Story = {
  args: {
    label: 'Edit',
    icon: {
      type: 'pencil',
    },
    loading: true,
  },
};

export const DangerWithIcon: Story = {
  args: {
    label: 'Delete',
    icon: {
      type: 'trash',
    },
    danger: true,
  },
};

export const WithRightSideIcon: Story = {
  args: {
    label: 'Edit',
    icon: {
      type: 'pencil',
      rightPosition: true,
    },
    danger: true,
  },
};

export const NormalShape: Story = {
  args: {
    label: 'Edit',
    icon: {
      type: 'pencil',
      rightPosition: true,
    },
    shape: 'normal',
  },
};

export const CircularShape: Story = {
  args: {
    label: 'Edit',
    icon: {
      type: 'pencil',
      rightPosition: true,
    },
    shape: 'circle',
  },
};

export const RoundedShape: Story = {
  args: {
    label: 'Edit',
    icon: {
      type: 'pencil',
      rightPosition: true,
    },
    shape: 'rounded',
  },
};
