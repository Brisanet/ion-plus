import {
  TemplateRef,
  EventEmitter,
  input,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { IonButtonProps } from './../button/types';
import { IconType } from './../icon/types';
import { Subject } from 'rxjs';

export enum PopoverPosition {
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  RIGHT_TOP = 'rightTop',
  RIGHT_CENTER = 'rightCenter',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_TOP = 'leftTop',
  LEFT_CENTER = 'leftCenter',
  LEFT_BOTTOM = 'leftBottom',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
  DEFAULT = 'bottomLeft',
}


export interface PopoverButtonsProps extends IonButtonProps {
  keepOpenAfterAction?: boolean;
}

export enum PopoverTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  DEFAULT = 'click',
}


export interface IonPopoverProps {
  /**
   * Título que será exibido no popover.
   * @required
   */
  ionPopoverTitle: string;

  /**
   * Template do corpo do popover.
   * @required
   */
  ionPopoverBody: TemplateRef<void>;

  /**
   * Configuração dos botões de ação no rodapé do popover.
   */
  ionPopoverActions?: PopoverButtonsProps[];

  /**
   * Ícone a ser exibido ao lado do título.
   */
  ionPopoverIcon?: IconType;

  /**
   * Cor do ícone do título.
   */
  ionPopoverIconColor?: string;

  /**
   * Controla a exibição do ícone de fechar.
   * @default false
   */
  ionPopoverIconClose?: boolean;

  /**
   * Posição em que o popover deve aparecer.
   * @default 'bottomLeft'
   */
  ionPopoverPosition: PopoverPosition;

  /**
   * Se verdadeiro, o popover não fecha ao clicar fora.
   * @default false
   */
  ionPopoverKeep?: boolean;

  /**
   * Classe customizada para o popover.
   */
  ionPopoverCustomClass?: string;

  /**
   * Se verdadeiro, o popover não fecha ao rolar a página.
   * @default false
   */
  ionPopoverStopCloseOnScroll?: boolean;

  /**
   * Subject usado para fechar o popover programaticamente.
   */
  ionPopoverClose?: Subject<void>;

  /**
   * Se a seta do popover deve apontar para o centro do elemento de origem.
   * @default true
   */
  ionPopoverArrowPointAtCenter?: boolean;

  /**
   * Gatilho que abre o popover (click ou hover).
   * @default 'click'
   */
  ionPopoverTrigger?: PopoverTrigger;

  /**
   * Se o popover deve se reposicionar automaticamente ao rolar a página.
   * @default true
   */
  ionPopoverAutoReposition?: boolean;

  // === OUTPUTS (EVENTOS) ===

  /**
   * Evento emitido ao clicar no primeiro botão de ação.
   */
  ionOnFirstAction: OutputEmitterRef<void>;

  /**
   * Evento emitido ao clicar no segundo botão de ação.
   */
  ionOnSecondAction: OutputEmitterRef<void>;

  /**
   * Evento emitido quando o popover é fechado.
   */
  ionOnClose: OutputEmitterRef<void>;
}