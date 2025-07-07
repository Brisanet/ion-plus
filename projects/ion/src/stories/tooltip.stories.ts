import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { IonTooltipProps } from '../lib/tooltip';
import {
  IonTooltipComponent,
  IonTooltipDirective,
  TooltipPosition,
  TooltipTrigger,
} from '../lib/tooltip';
import { IonIconComponent } from '../public-api';

const meta: Meta<IonTooltipProps> = {
  title: 'Ion/Data Display/Tooltip',
  component: IonTooltipComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        IonIconComponent,
        IonTooltipDirective,
        IonTooltipComponent,
      ],
    }),
  ],
  argTypes: {
    ionTooltipTitle: {
      name: 'ionTooltipTitle',
      type: { name: 'string' },
      defaultValue: '',
    },
    ionTooltipColorScheme: {
      name: 'ionTooltipColorScheme',
      control: { type: 'radio' },
      options: [`light`, `dark`],
      defaultValue: { summary: `dark` },
    },
    ionTooltipPosition: {
      name: 'ionTooltipPosition',
      control: 'select',
      options: [...Object.values(TooltipPosition)],
    },
    ionTooltipTrigger: {
      name: 'ionTooltipTrigger',
      control: { type: 'radio' },
      options: [...Object.values(TooltipTrigger)],
    },
    ionTooltipShowDelay: {
      name: 'ionTooltipShowDelay',
      control: 'number',
      defaultValue: 0,
    },
    ionTooltipArrowPointAtCenter: {
      name: 'ionTooltipArrowPointAtCenter',
      control: 'boolean',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<IonTooltipComponent>;

const defaultArgs: IonTooltipProps = {
  ionTooltipTitle: 'Eu sou um tooltip',
  ionTooltipPosition: TooltipPosition.TOP_CENTER,
  ionTooltipColorScheme: 'dark',
  ionTooltipTrigger: TooltipTrigger.HOVER,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  } as IonTooltipProps,
  render: (args: Partial<IonTooltipProps>) => ({
    props: {
      ...args,
    },
    template: `
    <style>
        div {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <div>
      <span
        ionTooltip
        ionTooltipTitle="${args.ionTooltipTitle}"
        ionTooltipPosition="${args.ionTooltipPosition}"
        [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
        ionTooltipColorScheme="${args.ionTooltipColorScheme}"
        ionTooltipTrigger="${args.ionTooltipTrigger}"
        ionTooltipShowDelay="${args.ionTooltipShowDelay}"
      >
        Hover me
      </span>
    </div>
  `,
  }),
};

export const WithContent: Story = {
  args: {
    ...defaultArgs,
    ionTooltipTitle: '',
    ionTooltipPosition: TooltipPosition.BOTTOM_CENTER,
  } as IonTooltipProps,
  render: (args: Partial<IonTooltipProps>) => ({
    props: {
      ...args,
    },
    template: `
    <style>
        .tooltip {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            color: white;
        }
    </style>
    <div class="tooltip">
      <span
        ionTooltip
        ionTooltipTitle="${args.ionTooltipTitle}"
        [ionTooltipTemplateRef]="titleTemplate"
        ionTooltipPosition="${args.ionTooltipPosition}"
        [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
        ionTooltipColorScheme="${args.ionTooltipColorScheme}"
        ionTooltipTrigger="${args.ionTooltipTrigger}"
        ionTooltipShowDelay="${args.ionTooltipShowDelay}"
      >
        Hover me
      </span>
      <ng-template #titleTemplate>
        <div class="content">
          <ion-icon type="check-outlined" color="#FCFCFD"></ion-icon>
          <span>Verificado!</span>
        </div>
      </ng-template>
    </div>
  `,
  }),
};

export const WithTitleAndSubtitle: Story = {
  args: {
    ...defaultArgs,
    ionTooltipTitle: 'Explicação do indicador aqui',
  } as IonTooltipProps,
  render: (args: Partial<IonTooltipProps>) => ({
    props: {
      ...args,
    },
    template: `
    <style>
        .tooltip {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
            color: white;
            margin-top: 8px;
            font-size: 12px;
        }
    </style>
    <div class="tooltip">
      <span
        ionTooltip
        ionTooltipTitle="${args.ionTooltipTitle}"
        [ionTooltipTemplateRef]="titleTemplate"
        ionTooltipPosition="${args.ionTooltipPosition}"
        [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
        ionTooltipColorScheme="${args.ionTooltipColorScheme}"
        ionTooltipTrigger="${args.ionTooltipTrigger}"
        ionTooltipShowDelay="${args.ionTooltipShowDelay}"
      >
        Hover me
      </span>
      <ng-template #titleTemplate>
        <div class="content">
          <ion-icon type="wait" size="16" color="#FCFCFD"></ion-icon>
          <span>Atualizado em 18/04/2022 às 16:34</span>
        </div>
      </ng-template>
    </div>
  `,
  }),
};

export const WithHostOnEdge: Story = {
  args: {
    ...defaultArgs,
    ionTooltipTitle: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
      veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
  } as IonTooltipProps,
  render: (args: Partial<IonTooltipProps>) => ({
    props: {
      ...args,
    },
    template: `
    <style>
        main {
            height: 100vh;
            padding: 3.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }

        .row {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
    </style>
    <main>
    <div class="row">
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    </div>
    <div class="row">
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    </div>
    <div class="row">
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    <span
      ionTooltip
      ionTooltipTitle="${args.ionTooltipTitle}"
      ionTooltipPosition="${args.ionTooltipPosition}"
      [ionTooltipArrowPointAtCenter]="${args.ionTooltipArrowPointAtCenter}"
      ionTooltipColorScheme="${args.ionTooltipColorScheme}"
      ionTooltipTrigger="${args.ionTooltipTrigger}"
      ionTooltipShowDelay="${args.ionTooltipShowDelay}"
    >
      Hover me
    </span>
    </div>
    </main>
  `,
  }),
};
