import type { Meta, StoryObj } from '@storybook/angular';
import { IonPaginationComponent } from '../lib/pagination';

const meta: Meta<IonPaginationComponent> = {
  title: 'Ion/Navigation/Pagination',
  component: IonPaginationComponent,
  tags: ['autodocs'],
  render: (args: IonPaginationComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    total: {
      control: {
        type: 'number',
      },
      description: 'Quantidade total de itens a serem paginados.',
    },
    itemsPerPage: {
      control: {
        type: 'number',
      },
      defaultValue: { summary: 10 },
      description: 'Quantidade de itens a serem exibidos por página.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: [`sm`, `md`, `lg`, `xl`],
      defaultValue: { summary: `md` },
      description:
        'Tamanho dos botões da paginação. Podem ser `sm`, `md`, `lg` ou `xl`.',
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description:
        'Indica que a paginação está em espera e com seus botões desabilitados enquanto espera algum processo terminar até que esteja pronto para uso.',
    },
    page: {
      control: {
        type: 'number',
      },
      defaultValue: { summary: 0 },
      description: 'Página atualmente selecionada.',
    },
    events: {
      action: { handles: 'click' },
      description:
        'Emite um evento quando algum botão é clicado. Caso a paginação esteja desabilitada, nenhum botão estará apto a disparar este evento.',
    },
  },
};

export default meta;
type Story = StoryObj<IonPaginationComponent>;

export const Default: Story = {
  args: {
    total: 46,
  } as IonPaginationComponent,
};

export const WithBigTotal: Story = {
  args: {
    total: 460,
  } as IonPaginationComponent,
};

export const SmallSize: Story = {
  args: {
    total: 46,
    size: 'sm',
  } as IonPaginationComponent,
};
