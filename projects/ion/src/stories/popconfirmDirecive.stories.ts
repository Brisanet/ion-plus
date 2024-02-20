import type { Meta, StoryObj } from '@storybook/angular';
import { OpenPopconfirmComponent } from '../public-api';

const meta: Meta<OpenPopconfirmComponent> = {
  title: 'Ion/Data Display/PopConfirm',
  component: OpenPopconfirmComponent,
  tags: ['autodocs'],
  render: (args: OpenPopconfirmComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {},
};

export default meta;
type Story = StoryObj<OpenPopconfirmComponent>;

export const Directive: Story = {
  args: {} as OpenPopconfirmComponent,
};
