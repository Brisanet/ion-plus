import { Component, input, TemplateRef } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { ComponentInput } from '@testing-library/angular';
import { IonTooltipDirective } from '../lib/directives/tooltip';
import {
  TooltipPosition,
  TooltipTrigger,
} from '../lib/directives/tooltip/types';
import { SafeAny } from '../lib/utils/safe-any';

@Component({
  standalone: true,
  selector: 'ion-tooltip',
  template: `<div class="container">
    <p
      ionTooltip
      [ionTooltipTitle]="ionTooltipTitle()"
      [ionTooltipTemplateRef]="ionTooltipTemplateRef()"
      [ionTooltipPosition]="ionTooltipPosition()"
      [ionTooltipArrowPointAtCenter]="ionTooltipArrowPointAtCenter()"
      [ionTooltipTrigger]="ionTooltipTrigger()"
      [ionTooltipShowDelay]="ionTooltipShowDelay()"
      [ionTooltipCustomClass]="ionTooltipCustomClass()">
      {{ text() }}
    </p>
  </div>`,
  styles: `
    .container {
      width: fit-content;
    }
  `,
  imports: [IonTooltipDirective],
})
class IonTooltipComponent {
  public text = input<string>();
  public ionTooltipTitle = input<string>();
  public ionTooltipTemplateRef = input<TemplateRef<SafeAny> | null>(null);
  public ionTooltipPosition = input<TooltipPosition>(TooltipPosition.DEFAULT);
  public ionTooltipArrowPointAtCenter = input<boolean>(true);
  public ionTooltipTrigger = input<TooltipTrigger>(TooltipTrigger.DEFAULT);
  public ionTooltipShowDelay = input<number>(0);
  public ionTooltipCustomClass = input<string>();
}

const meta: Meta<ComponentInput<IonTooltipComponent>> = {
  title: 'Ion/Data Display/Tooltip',
  component: IonTooltipComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [IonTooltipDirective],
    },
  }),
  argTypes: {
    ionTooltipPosition: {
      options: Object.values(TooltipPosition),
      control: { type: 'select' },
    },
    ionTooltipTrigger: {
      options: Object.values(TooltipTrigger),
      control: { type: 'select' },
    },
    ionTooltipShowDelay: {
      control: { type: 'number' },
    },
    ionTooltipCustomClass: {
      control: { type: 'text' },
    },
    ionTooltipArrowPointAtCenter: {
      control: { type: 'boolean' },
    },
    ionTooltipTitle: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<IonTooltipComponent>;

export const Default: Story = {
  args: {
    text: 'hover me',
    ionTooltipTitle: 'Hello World',
    ionTooltipTemplateRef: null,
    ionTooltipPosition: TooltipPosition.DEFAULT,
    ionTooltipArrowPointAtCenter: true,
    ionTooltipTrigger: TooltipTrigger.DEFAULT,
    ionTooltipShowDelay: 0,
    ionTooltipCustomClass: '',
  },
};

export const Click: Story = {
  args: {
    text: 'Click me',
    ionTooltipTitle: 'Hello World',
    ionTooltipTemplateRef: null,
    ionTooltipPosition: TooltipPosition.DEFAULT,
    ionTooltipArrowPointAtCenter: true,
    ionTooltipTrigger: TooltipTrigger.CLICK,
    ionTooltipShowDelay: 0,
    ionTooltipCustomClass: '',
  },
};
