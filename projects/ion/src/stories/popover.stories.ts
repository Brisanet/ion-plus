import { Meta, StoryObj } from '@storybook/angular';

import { OpenPopoverComponent } from '../lib/directives/popover/mock/open-popover.component';
import { IonPopoverDirective } from '../lib/directives/popover/popover.directive';
import { PopoverTrigger } from '../lib/directives/popover/types';
import {
  iconsPaths,
  IonButtonComponent,
  IonDividerComponent,
  IonIconComponent,
  IonPositions,
} from '../public-api';

const meta: Meta<OpenPopoverComponent> = {
  title: 'Ion/Data Display/Popover/Directive',
  component: OpenPopoverComponent,
  tags: ['autodocs'],
  render: args => ({
    moduleMetadata: {
      imports: [
        IonIconComponent,
        IonDividerComponent,
        IonButtonComponent,
        IonPopoverDirective,
      ],
    },
    props: {
      ...args,
    },
  }),
};

export default meta;

type Story = StoryObj<OpenPopoverComponent>;

export const Directive: Story = {
  args: {
    label: 'click me',
    ionPopoverIcon: 'historic',
    ionPopoverIconColor: '#0858ce',
    ionPopoverTitle: 'Título do popover',
    ionPopoverArrowPointAtCenter: true,
    ionPopoverCustomClass: 'popover-custom-class',
    ionPopoverIconClose: false,
    ionPopoverActions: [
      { label: 'cancelar', shape: 'normal', keepOpenAfterAction: false },
      { label: 'concluir', shape: 'normal', keepOpenAfterAction: false },
    ],
    ionPopoverBody:
      'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs. Haha',

    ionPopoverTrigger: PopoverTrigger.DEFAULT,
    ionPopoverPosition: IonPositions.BOTTOM_LEFT,
  },
};

export const DirectiveWithTriggerHover: Story = {
  args: {
    label: 'hover me',
    ionPopoverIcon: 'award',
    ionPopoverIconColor: '#0858ce',
    ionPopoverTitle: 'Flow',
    ionPopoverArrowPointAtCenter: true,
    ionPopoverCustomClass: 'popover-custom-class',

    ionPopoverIconClose: true,
    ionPopoverBody:
      'Gato é um animal solitário, mas quando seu lar é destruído por uma grande inundação, ele encontra refúgio em um barco habitado por diversas espécies, tendo que se juntar a elas apesar das diferenças Classificação indicativa Livre. Contém sem restrições.',
    ionPopoverTrigger: PopoverTrigger.DEFAULT,
    ionPopoverPosition: IonPositions.TOP_RIGHT,
  },
};

export const DirectiveWithoutHeader: Story = {
  args: {
    label: 'click me',
    ionPopoverArrowPointAtCenter: true,
    ionPopoverCustomClass: 'popover-custom-class',

    ionPopoverBody:
      '"In the End" é uma música icônica do Linkin Park, lançada em 2001. Combinando rock alternativo e nu-metal, a canção aborda a luta e a inevitabilidade da mudança. A letra reflexiva destaca a importância de esforços, mesmo que os resultados nem sempre sejam como desejado. A fusão de vocais intensos e arranjos emotivos faz de "In the End" uma experiência atemporal, ressoando com milhões de fãs ao redor do mundo.',
    ionPopoverTrigger: PopoverTrigger.DEFAULT,
    ionPopoverPosition: IonPositions.BOTTOM_CENTER,
  },
};

export const KeepOpen: Story = {
  args: {
    label: 'hover me',
    ionPopoverTitle: 'Título do popover',
    ionPopoverKeep: true,
    ionPopoverIconClose: true,
    ionPopoverArrowPointAtCenter: true,
    ionPopoverCustomClass: 'popover-custom-class',

    ionPopoverBody:
      '"In the End" é uma música icônica do Linkin Park, lançada em 2001. Combinando rock alternativo e nu-metal, a canção aborda a luta e a inevitabilidade da mudança. A letra reflexiva destaca a importância de esforços, mesmo que os resultados nem sempre sejam como desejado. A fusão de vocais intensos e arranjos emotivos faz de "In the End" uma experiência atemporal, ressoando com milhões de fãs ao redor do mundo.',
    ionPopoverTrigger: PopoverTrigger.DEFAULT,
    ionPopoverPosition: IonPositions.BOTTOM_CENTER,
  },
};

export const DirectiveWithActions: Story = {
  args: {
    label: 'click me',
    ionPopoverTitle: 'Título do popover',
    ionPopoverIconClose: false,
    ionPopoverArrowPointAtCenter: true,
    ionPopoverCustomClass: 'popover-custom-class',

    ionPopoverActions: [
      { label: 'cancelar', shape: 'normal', keepOpenAfterAction: false },
      { label: 'concluir', shape: 'normal', keepOpenAfterAction: false },
    ],
    ionPopoverBody:
      'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs. Haha',
    ionPopoverTrigger: PopoverTrigger.DEFAULT,
    ionPopoverPosition: IonPositions.TOP_RIGHT,
  },
};
export const DirectiveWithActionsKeepAction: Story = {
  args: {
    label: 'click me',
    ionPopoverTitle: 'Desafio na Jornada',
    ionPopoverArrowPointAtCenter: true,
    ionPopoverCustomClass: 'popover-custom-class',
    ionPopoverIconClose: true,
    ionPopoverActions: [
      { label: 'voltar', shape: 'normal', keepOpenAfterAction: true },
      { label: 'concluir', shape: 'normal', keepOpenAfterAction: true },
    ],
    ionPopoverBody:
      'Você pode escolher avançar corajosamente para a próxima etapa da jornada ou optar por explorar o caminho anterior.',
    ionPopoverTrigger: PopoverTrigger.DEFAULT,
    ionPopoverPosition: IonPositions.TOP_RIGHT,
  },
};

export const Placements: Story = {
  args: {
    label: 'click me',
    ionPopoverTitle: 'Desafio na Jornada',
    ionPopoverArrowPointAtCenter: true,
    ionPopoverCustomClass: 'popover-custom-class',
    ionPopoverIconClose: true,
    ionPopoverActions: [
      { label: 'voltar', shape: 'normal', keepOpenAfterAction: false },
      { label: 'concluir', shape: 'normal', keepOpenAfterAction: false },
    ],
    ionPopoverBody:
      'Você pode escolher avançar corajosamente para a próxima etapa da jornada ou optar por explorar o caminho anterior.',
    ionPopoverTrigger: PopoverTrigger.DEFAULT,
    ionPopoverPosition: IonPositions.TOP_RIGHT,
  },
  argTypes: {
    ionPopoverIcon: {
      name: 'ionPopoverIcon',
      control: 'select',
      options: [...Object.keys(iconsPaths)],
    },
    ionPopoverArrowPointAtCenter: {
      name: 'ionPopoverPointAtCenter',
      control: 'boolean',
    },
    ionPopoverPosition: {
      name: 'ionPopoverPosition',
      control: 'select',
      options: [...Object.values(IonPositions)],
    },
    ionPopoverTrigger: {
      name: 'ionPopoverTrigger',
      control: 'select',
      options: [...Object.values(PopoverTrigger)],
    },
  },
};
