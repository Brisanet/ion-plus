import type { Meta, StoryObj } from '@storybook/angular';
import type { IonAlertComponent } from '../lib/alert';
import { AlertCustomBodyComponent } from '../lib/alert/mocks/alert-custom-body.component';

const meta: Meta<IonAlertComponent> = {
  title: 'Ion/Feedback/Alert',
  component: AlertCustomBodyComponent,
  render: args => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<AlertCustomBodyComponent>;
export const WithCustomBody: Story = {};
