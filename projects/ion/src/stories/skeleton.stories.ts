import type { Meta, StoryObj } from '@storybook/angular';
import { IonSkeletonComponent } from '../lib/skeleton';

const meta: Meta<IonSkeletonComponent> = {
  title: 'Ion/Feedback/Skeleton',
  component: IonSkeletonComponent,
  tags: ['autodocs'],
  render: (args: IonSkeletonComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    variant: {
      description:
        'Define o formato do skeleton. Podendo ser `rect` ou `circular`.',
      control: { type: 'select' },
      options: ['rect', 'circular'],
    },
    radius: {
      description:
        'Define o border-radius do skeleton. Podendo receber um valor do tipo `number`.',
      control: { type: 'number' },
    },
    height: {
      description:
        'Define a altura do skeleton. Podendo receber um valor do tipo `number`.',
      control: { type: 'number' },
      defaultValue: { summary: '50' },
    },
    width: {
      description:
        'Define a largura do skeleton. Podendo receber um valor do tipo `number`.',
      control: { type: 'number' },
      defaultValue: { summary: '50' },
    },
  },
};

export default meta;
type Story = StoryObj<IonSkeletonComponent>;
export const Rectangular: Story = {
  args: {
    variant: 'rect',
    width: 400,
    height: 100,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 100,
    height: 100,
  },
};

export const CustomRadius: Story = {
  args: {
    width: 400,
    height: 50,
    radius: 50,
  },
};
