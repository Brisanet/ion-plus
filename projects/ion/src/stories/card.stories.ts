import { Meta, StoryObj } from '@storybook/angular';
import { IonCardComponent } from '../public-api';
import { BodyMockComponent } from '../lib/card/mock/body-mock.component';
import { SafeAny } from '../lib/utils/safe-any';

const meta: Meta<IonCardComponent> = {
  title: 'Ion/Data Display/Card',
  component: IonCardComponent,
  tags: ['autodocs'],
  render: args => ({
    moduleMetadata: {
      imports: [BodyMockComponent],
    },
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<IonCardComponent>;

export const Default: Story = {
  args: {
    configuration: {
      header: {
        title: 'Com risco de atraso',
        buttons: [],
        icon: '',
      },
      body: undefined,
      footer: undefined,
    },
  },
};

export const WithBody: Story = {
  args: {
    configuration: {
      header: {
        title: 'Com risco de atraso',
        buttons: [],
        icon: '',
      },
      body: BodyMockComponent,
      footer: undefined,
    },
  },
};

export const WithButtons: Story = {
  args: {
    configuration: {
      header: {
        title: 'Com risco de atraso',
        buttons: [
          {
            type: 'ghost',
            label: '',
            shape: 'circle',
            icon: 'refresh',
            nameAction: 'refresh',
          },
          {
            type: 'ghost',
            label: '',
            shape: 'circle',
            icon: 'trash',
            nameAction: 'trash',
          },
        ],
        icon: '',
      },
      body: BodyMockComponent,
      footer: undefined,
    },
  },
};

export const WithIconTitle: Story = {
  args: {
    configuration: {
      header: {
        title: 'Com risco de atraso',
        icon: 'heart',
        buttons: [
          {
            type: 'ghost',
            label: '',
            shape: 'circle',
            icon: 'refresh',
            nameAction: 'refresh',
          },
          {
            type: 'ghost',
            label: '',
            shape: 'circle',
            icon: 'trash',
            nameAction: 'trash',
          },
        ],
      },
      body: BodyMockComponent,
      footer: undefined,
    },
  },
};

export const WithFooter: Story = {
  args: {
    configuration: {
      header: {
        title: 'Com risco de atraso',
        icon: 'heart',
        buttons: [],
      },
      body: BodyMockComponent,
      footer: {
        body: undefined as SafeAny,
        buttons: {
          primary: {
            label: 'Primary',
            shape: 'normal',
            icon: '',
          },
          secondary: {
            label: 'Secondary',
            shape: 'normal',
            icon: '',
          },
          ghost: {
            label: 'Ghost',
            shape: 'normal',
            icon: '',
          },
        },
      },
    },
  },
};
