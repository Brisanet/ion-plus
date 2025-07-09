import type { Meta, StoryObj } from '@storybook/angular';
import { IonSkeletonComponent } from '../lib/skeleton';

const meta: Meta<IonSkeletonComponent> = {
  title: 'Ion/Feedback/Skeleton',
  component: IonSkeletonComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    radius: {
      description:
        'Define o border-radius do skeleton. Podendo receber um valor do tipo `number` ou `string`. Quando `number`, uma conversão é realizada para `px`.',
    },
    height: {
      description:
        'Define a altura do skeleton. Podendo receber um valor do tipo `number` ou `string`. Quando `number`, uma conversão é realizada para `px`.',
      defaultValue: { summary: '50' },
    },
    width: {
      description:
        'Define a largura do skeleton. Podendo receber um valor do tipo `number` ou `string`. Quando `number`, uma conversão é realizada para `px`.',
      defaultValue: { summary: '50' },
    },
  },
};

export default meta;
type Story = StoryObj<IonSkeletonComponent>;
export const Rectangular: Story = {
  args: {
    width: 400,
    height: 100,
  },
};

export const Circular: Story = {
  args: {
    width: 100,
    height: 100,
    radius: '50%',
  },
};

export const CustomRadius: Story = {
  args: {
    width: 400,
    height: 50,
    radius: 12,
  },
};

export const BasedOnContainer: Story = {
  args: {
    width: '100%',
    height: '100%',
  },
  render: args => ({
    props: {
      ...args,
    },
    template: `
      <div style="width: 400px; height: 400px;">
        <ion-skeleton [width]="width" [height]="height"></ion-skeleton>
      </div>
    `,
  }),
};
