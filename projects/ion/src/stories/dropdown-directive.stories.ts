import { Meta, StoryObj } from '@storybook/angular';
import { OpenDropdownComponent } from '../lib/directives/dropdown/mocks/open-dropdown.component';

const meta: Meta<OpenDropdownComponent> = {
  title: 'Ion/Navigation/Dropdown/Directive',
  component: OpenDropdownComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
};

const options = [
  { label: 'Rem', name: 'Name 1', icon: 'config', value: 0, key: 'name 1' },
  { label: 'Ram', name: 'Name 2', icon: 'star', value: 1, key: 'name 2' },
  { label: 'Emilia', name: 'Name 3', icon: 'star', value: 3, key: 'name 3' },
  {
    label: 'Beatrice',
    name: 'Name 4',
    icon: 'star',
    value: 4,
    key: 'name 4',
  },
];

export default meta;
type Story = StoryObj<OpenDropdownComponent>;

export const Default: Story = {
  args: {
    dropdownOptions: options,
    dropdownConfig: {
      shouldRender: true,
    },
  },
};

export const Loading: Story = {
  args: {
    dropdownOptions: options,
    dropdownLoading: true,
    dropdownConfig: {
      shouldRender: true,
    },
  },
};

export const Multiple: Story = {
  args: {
    dropdownOptions: options,
    dropdownConfig: {
      multiple: true,
      shouldRender: true,
    },
  },
};

export const MultipleWithMaxSelected: Story = {
  args: {
    dropdownOptions: options,
    dropdownConfig: {
      multiple: true,
      maxSelected: 2,
      shouldRender: true,
    },
  },
};

export const MultipleWithClearButton: Story = {
  args: {
    dropdownOptions: options,
    dropdownConfig: {
      multiple: true,
      clearButton: true,
      shouldRender: true,
    },
  },
};

export const MultipleRequired: Story = {
  args: {
    dropdownOptions: options,
    dropdownConfig: {
      multiple: true,
      required: true,
      shouldRender: true,
    },
  },
};

export const WithPropLabel: Story = {
  args: {
    dropdownOptions: options,
    dropdownConfig: {
      multiple: true,
      propLabel: 'name',
      shouldRender: true,
    },
  },
};

export const WithCloseOnScroll: Story = {
  args: {
    dropdownOptions: options,
    dropdownConfig: {
      closeOnScroll: true,
      shouldRender: true,
    },
  },
};
