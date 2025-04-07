import { Meta, StoryObj } from '@storybook/angular';
import { IonInputSelectComponent } from '../lib/input-select';
import { action } from '@storybook/addon-actions';

const customSelectOptions = [
  {
    key: 'acima_de',
    value: 'acima_de',
    label: 'Acima de',
    multiple: true,
  },
  {
    key: 'abaixo_de',
    value: 'abaixo_de',
    label: 'Abaixo de',
  },
];

const meta: Meta<IonInputSelectComponent> = {
  title: 'Ion/Data Entry/Input Select',
  component: IonInputSelectComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      valueChange: action('valueChange'),
    },
  }),
};

export default meta;

type Story = StoryObj<IonInputSelectComponent>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomOptions: Story = {
  args: {
    selectOptions: customSelectOptions,
  },
};
