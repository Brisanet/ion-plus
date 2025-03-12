import type { Meta, StoryObj } from '@storybook/angular';

import { IonTableComponent } from '../lib/table';

interface Disco {
  id: number;
  name: string;
  deleted: boolean;
  release_date?: string;
  value?: number;
  year?: number;
  icon?: string;
  active?: boolean;
}

const meta: Meta<IonTableComponent<Disco>> = {
  title: 'Ion/Navigation/Table',
  component: IonTableComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    // config: {
    //   control: {
    //     type: 'object'
    //   }
    // },
  },
};

const columns = [
  {
    key: 'id',
    label: 'Código',
    sort: true,
  },
  {
    key: 'name',
    label: 'Nome',
    sort: true,
  },
];

const data: Disco[] = [
  { id: 1, name: 'Meteora', deleted: false, year: 2003 },
  { id: 2, name: 'One More Light', deleted: false, year: 2017 },
  {
    id: 3,
    name: 'Hybrid Theory',
    deleted: true,
    year: 2000,
    icon: 'star-solid',
  },
  {
    id: 4,
    name: 'Minutes to Midnight',
    deleted: false,
    year: 2007,
    icon: 'union',
  },
];

export default meta;
type Story = StoryObj<IonTableComponent<Disco>>;
export const Default: Story = {
  args: {
    data,
    columns,
  },
};


export const NoData: Story = {
  args: {
    data: [],
    columns,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true
  },
};
