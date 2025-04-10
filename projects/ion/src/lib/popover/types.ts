import { TemplateRef } from '@angular/core';

import { IonPositions } from '../position/types';
import { Subject } from 'rxjs';
import { IonButtonProps } from '../button';

export interface PopoverButtonsProps extends IonButtonProps {
  keepOpenAfterAction?: boolean;
}

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
}

export enum PopoverTrigger {
  DEFAULT = 'click',
  HOVER = 'hover',
}

export interface IonPopoverProps {
  /**
   * @param ionPopoverTitle - Defines the title of the popover.
   * @type {string}
   */
  ionPopoverTitle: string;
  /**
   * @param ionPopoverBody -
   * @type {TemplareRef<void>}
   */
  ionPopoverBody: TemplateRef<void> | null;
  /**
   * @param ionPopoverActions -  Defines the actions of the buttons displayed in the popover.
   * @type {PopoverButtonsProps}
   */
  ionPopoverActions?: PopoverButtonsProps[];
  /**
   * @param ionPopoverIcon - Defines the icon the appears with the popover title.
   * @type {string}
   */
  ionPopoverIcon: string;
  /**
   * @param ionPopoverIconColor - Defines the color of the icon.
   * @type {string}
   */
  ionPopoverIconColor: string;
  /**
   * @param ionPopoverIconClose - Defines if the close icon will be displayed or not.
   * @type {boolena}
   * @default `false`
   */
  ionPopoverIconClose: false;
  /**
   * @param ionPopoverPosition - Controlls the position of the popover.
   * @type {PopoverPosition}
   * @default `DEFAULT`
   */
  ionPopoverPosition: IonPositions;
  /**
   * @param ionPopoverKeep
   * @type {boolean}
   */
  ionPopoverKeep: boolean;
  /**
   * @param ionPopoverCustomClass
   * @type {string}
   */
  ionPopoverCustomClass?: string;

  ionOnFirstAction: void;
  ionOnSecondAction: void;
  ionOnClose?: void;
}

export interface PopoverDirectiveProps extends IonPopoverProps {
  ionPopoverStopCloseOnScroll?: boolean;
  ionPopoverClose?: Subject<void>;
  ionPopoverArrowPointAtCenter?: boolean;
  ionPopoverTrigger?: PopoverTrigger;
}
