import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/angular';
import { IonBreadcrumbComponent } from '../lib/breadcrumb';
import { IonIconComponent } from '../public-api';

export const actionsData = {
  selected: action('selected'),
};

const meta: Meta<IonBreadcrumbComponent> = {
  title: 'Ion/Navigation/Breadcrumb',
  component: IonBreadcrumbComponent,
  tags: ['autodocs'],
  render: args => ({
    moduleMetadata: {
      imports: [IonIconComponent],
    },
    props: {
      ...args,
      selected: actionsData.selected,
    },
  }),
  argTypes: {
    breadcrumbs: {
      description:
        'Representa os breadcrumbs a serem exibidos. Cada breadcrumb deve conter um `label` e um `link`.',
      control: {
        type: 'object',
      },
    },
  },
};

export default meta;

type Story = StoryObj<IonBreadcrumbComponent>;
export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', link: '/home' },
      { label: 'Recursos', link: '/recursos' },
      { label: 'Técnico', link: '/recursos/1' },
    ],
  },
};
