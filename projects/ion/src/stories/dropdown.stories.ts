import { Meta, StoryObj } from '@storybook/angular';
import { IonDropdownComponent } from '../lib/directives/dropdown/dropdown.component';
import { IonDropdownOption } from '../lib/directives/dropdown';

interface Character extends IonDropdownOption {
  name?: string;
}

const options = [
  { label: 'Option 1', value: 1, key: 'option 3' },
  { label: 'Option 2', value: 2, key: 'option 3' },
  { label: 'Option 3', value: 3, key: 'option 3' },
];

const optionsWithIcons = options.map(option => {
  return {
    ...option,
    icon: 'box',
  };
});

const disabledOption = [
  { label: 'Option 1', value: 1, key: 'option 3' },
  { label: 'Option 2', value: 2, key: 'option 3' },
  { label: 'Option 3', disabled: true, value: 3, key: 'option 3' },
];

const meta: Meta<IonDropdownComponent<Character>> = {
  title: 'Ion/Navigation/Dropdown',
  component: IonDropdownComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<IonDropdownComponent<Character>>;

export const Default: Story = {
  args: {
    dropdownOptions: options,
  },
};

export const WithIcons: Story = {
  args: {
    dropdownOptions: optionsWithIcons,
  },
};

export const WithDisabledOption: Story = {
  args: {
    dropdownOptions: disabledOption,
  },
};

export const NoData: Story = {};
