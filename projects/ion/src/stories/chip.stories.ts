import { Meta, StoryObj } from '@storybook/angular';
import { IonChipComponent } from '../public-api';

const options = [
  {
    label: 'Neutral',
    value: 1,
    selected: false,
    key: '1',
    icon: 'face-neutral',
  },
  { label: 'Smile', value: 2, selected: false, key: '2', icon: 'face-smile' },
  { label: 'Heart', value: 3, selected: false, key: '3', icon: 'heart' },
  { label: 'Frown', value: 4, selected: false, key: '4', icon: 'face-frown' },
];

const meta: Meta<IonChipComponent> = {
  title: 'Ion/Navigation/Chip',
  component: IonChipComponent,
  tags: ['autodocs'],
  render: args => ({
    moduleMetadata: {
      imports: [IonChipComponent],
    },
    props: {
      ...args,
    },
  }),
};

export default meta;

type Story = StoryObj<IonChipComponent>;

export const Default: Story = {
  args: {
    label: 'Custom label',
  },
};

export const ChipSmall: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
};

export const ChipMedium: Story = {
  args: {
    label: 'Medium',
    size: 'md',
  },
};

export const disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const BasicIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'heart',
  },
};

export const InfoBadge: Story = {
  args: {
    label: '9:00 - 12:00',
    infoBadge: { render: true, type: 'info' },
  },
};

export const RightBadge: Story = {
  args: {
    label: 'Badge ao lado',
    rightBadge: { render: true, label: 'novo', type: 'primary' },
  },
};

export const ChipWithDropdown: Story = {
  args: {
    label: 'Faces',
    options: options,
    hasDropdown: true,
  },
};

export const multipleDropdown: Story = {
  args: {
    label: 'Face',
    options: options,
    hasDropdown: true,
    multiple: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Face',
    options: options,
    hasDropdown: true,
    required: true,
  },
};
