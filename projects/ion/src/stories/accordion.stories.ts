import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/angular';

import type { AccordionItem } from '../lib/accordion';
import { IonAccordionComponent } from '../lib/accordion';

const accordions: AccordionItem[] = [
  {
    name: 'Grupo 01: pastores e boiadeiros, exceto os suíços',
    origin:
      'Embora tenham surgido em diferentes países e ocasiões, essas raças têm em comum o fato de serem desenvolvidas a partir de cruzamentos seletivos com o objetivo de atenuar o instinto de predador com o rebanho. Assim, passaram a juntar as ovelhas sem o ímpeto de atacá-las.',
    characteristics:
      'Os pastores e os boiadeiros são inteligentes, ativos e adoram ter tarefas para cumprir. Não à toa, são muito usados pela polícia e pelos bombeiros, como é o caso do cachorro boiadeiro-australiano. Também são carinhosos e se adaptam bem à família. As raças mais conhecidas são: Pastor Alemão, Pastor de Shetland, Border Collie e Welsh Corgi Pembroke.',
  },
  {
    name: 'Grupo 02: Pinscher e Schnauzer, molossoides, cães de montanha e boiadeiros suíços',
    origin:
      'Os cães desse grupo também foram desenvolvidos para ajudar no rebanho. No entanto, enquanto os pastores e os boiadeiros eram usados para reunir os animais, essas raças serviam para proteger o rebanho de outros predadores. Além disso, eram usados para trabalhos pesados, como puxar carroças.',
    characteristics:
      'Aprendizes vorazes, esses cães trabalhadores são fortes, ativos e muito inteligentes. Por isso, embora se adaptem bem ao convívio familiar, alguns deles precisam gastar bastante energia. O instinto é de defesa, como é o caso do cachorro Boxer. Os mais conhecidos são: Doberman, Rottweiler, Boxer, Fila, São Bernardo, Schnauzer e Pinscher.',
  },
];

export const actionsData = {
  activeChange: action('activeChange'),
};

const meta: Meta<IonAccordionComponent> = {
  title: 'Ion/Data Display/Accordion',
  component: IonAccordionComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
      activeChange: actionsData.activeChange,
    },
    template: `
      <ion-accordion
      [accordions]="accordions"
      [modeAccordion]="modeAccordion"
      [templateHeader]="customHeader"
      [templateBody]="customBody"
      (activeChange)="activeChange($event)"
    >
    </ion-accordion>

    <ng-template #customHeader let-data>
      {{ data.name }}
    </ng-template>

    <ng-template #customBody let-data>
      <h3>Origem</h3>
      <p>{{ data.origin }}</p>
      <h3>Características</h3>
      <p>{{ data.characteristics }}</p>
    </ng-template>
  `,
  }),
  argTypes: {
    accordions: {
      control: 'object',
      description:
        'Array de objetos com os valores a serem exibidos nos acordeões. A forma como serão apresentados pode ser personalizada nos componentes templates.',
    },
    templateHeader: {
      control: 'object',
      description:
        'Componente template que informa como o conteúdo fixo será exibido. Conteúdo fixo é o conteúdo que permanece visível independente do acordeão estar recolhido ou expandido.',
    },
    templateBody: {
      control: 'object',
      description:
        'Componente template que informa como o conteúdo expansível será exibido.',
    },
    modeAccordion: {
      control: {
        type: 'boolean',
      },
      description:
        'Indica que, ao abrir um acordeão, os outros serrão recolhidos automaticamente ou permanecerão como estão.',
      defaultValue: { summary: true },
    },
    activeChange: {
      action: { handles: 'click' },
      description:
        'Emite um evento sem valor especificado quando algum acordeão é clicado.',
    },
  },
};

export default meta;
type Story = StoryObj<IonAccordionComponent>;

export const Default: Story = {
  args: {
    accordions,
  },
};

export const AccordionWithModeAccordionFalse: Story = {
  args: {
    accordions,
    modeAccordion: false,
  },
};
