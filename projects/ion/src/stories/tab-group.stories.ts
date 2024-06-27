import type { Meta, StoryObj } from '@storybook/angular';
import { IonTabGroupComponent } from '../lib/tab-group';
import { iconsPaths } from '../public-api';

const tabs = [];
for (let index = 1; index <= 8; index++) {
  tabs.push({
    label: 'Tab ' + index,
    selected: false,
  });
}

const meta: Meta<IonTabGroupComponent> = {
  title: 'Ion/Navigation/TabGroup',
  component: IonTabGroupComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    tabs: {
      control: 'object',
      description:
        'Recebe um conjunto de objetos do tipo TabInGroup, cada um com sua respectiva configuração de aba.',
    },
    border: {
      control: {
        type: 'select',
      },
      options: [`bottom`, `top`, `right`, `left`],
      default: { summary: `bottom` },
      description:
        'Indica onde a borda da tab está localizada. Pode ser `bottom`, `top`, `right` ou `left`.',
    },
    direction: {
      control: {
        type: 'select',
      },
      options: [`horizontal`, `vertical`],
      default: { summary: `horizontal` },
      description:
        'Indica em que direção as tabs devem ser alinhadas. Pode ser `horizontal` ou `vertical`.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: [`sm`, `md`, `lg`],
      defaultValue: { summary: `sm` },
      description: 'Tamanho da tab. Pode ser `sm`, `md` ou `lg`.',
    },
    tabSelected: {
      action: { handles: 'click' },
      description:
        'Emite um evento quando alguma tab é clicada. Caso a tab esteja desabilitada, nenhum evento será disparado.',
    },
  },
};

export default meta;
type Story = StoryObj<IonTabGroupComponent>;

export const Horizontal: Story = {
  args: {
    tabs,
  },
};

export const HorizontalDisabled: Story = {
  args: {
    tabs: [...tabs, { label: 'disabled tab', disabled: true, selected: false }],
  },
};

export const Vertical: Story = {
  args: {
    tabs,
    direction: 'vertical',
  },
};

export const VerticalWithBorderLeft: Story = {
  args: {
    tabs,
    border: 'left',
    direction: 'vertical',
  },
};

export const SelectedByDefault: Story = {
  args: {
    tabs: [
      {
        label: 'Selected',
        selected: true,
      },
      {
        label: 'Not Selected',
        selected: false,
      },
    ],
  },
};

export const mediumSize: Story = {
  args: {
    tabs,
    direction: 'vertical',
    size: 'md',
  },
};

export const largeSize: Story = {
  args: {
    tabs,
    direction: 'vertical',
    size: 'lg',
  },
};

export const differentSizes: Story = {
  args: {
    tabs: [
      {
        label: 'Selected',
        selected: true,
      },
      {
        label: 'Not Selected',
        selected: false,
      },
    ],
    direction: 'vertical',
    size: 'lg',
  },
};

const tabsIcons = Object.keys(iconsPaths).map(icon => {
  return {
    label: icon,
    selected: false,
    iconType: icon,
  };
});
export const tabsWithIcons: Story = {
  args: {
    tabs: tabsIcons,
    direction: 'vertical',
  },
};

export const WithBadges: Story = {
  args: {
    tabs: [
      {
        label: 'With badge',
        selected: true,
        badge: 20,
      },
      {
        label: 'Without badge',
        selected: false,
      },
    ],
  },
};
