import { Meta, StoryObj } from '@storybook/angular';
import { IonSelectComponent } from '../lib/select';

const options = [
  { label: 'Option 1', value: 1, selected: false, key: '1' },
  { label: 'Option 2', value: 2, selected: false, key: '2' },
  { label: 'Option 3', value: 3, selected: false, key: '3' },
  { label: 'Option 4', value: 4, selected: false, key: '4' },
];

const fruitOptions = [
  { label: 'Apple', value: 1, selected: true, key: 'Apple' },
  { label: 'Banana', value: 2, selected: true, key: 'Banana' },
  { label: 'Grape', value: 3, selected: true, key: 'Grape' },
];

const meta: Meta<IonSelectComponent> = {
  title: 'Ion/Data Entry/Select',
  component: IonSelectComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
};

export default meta;

type Story = StoryObj<IonSelectComponent>;

export const Default: Story = {
  args: {
    options: options,
  },
};

export const MultipleMax3: Story = {
  args: {
    options: options,
    mode: 'multiple',
    placeholder: 'Select 3 options',
    maxSelect: 3,
  },
};

export const Required: Story = {
  args: {
    options,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
  },
};

export const DisabledSelectedOptions: Story = {
  args: {
    options: fruitOptions,
    disabled: true,
  },
};

export const CustomLabel: Story = {
  args: {
    options,
    placeholder: 'Select a option',
    propLabel: 'name',
  },
};
