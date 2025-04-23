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
   * @param ionPopoverBody - Defines the content of the popover body.
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
  ionPopoverIconClose: boolean;
  /**
   * @param ionPopoverPosition - Controlls the position of the popover.
   * @type {PopoverPosition}
   * @default `DEFAULT`
   */
  ionPopoverPosition: IonPositions;
  /**
   * @param ionPopoverKeep - Defines if the popover close or not.
   * @description - Controlls if the popover should close when the click event its outside the popover.
   * @type {boolean}
   */
  ionPopoverKeep: boolean;
  /**
   * @param ionPopoverCustomClass - Add a custom class to the popover.
   * @type {string}
   */
  ionPopoverCustomClass?: string;
  /**
   * @param ionOnFirstAction - Defines the action of the first button on the popover.
   * @type {void}
   */
  ionOnFirstAction?: void;
  /**
   * @param ionOnSecondAction - Defines the action of the second button on the popover.
   * @type {void}
   */
  ionOnSecondAction?: void;
  /**
   * @param ionOnClose -Defines when the popover should close.
   * @type {void}
   */
  ionOnClose?: void;
}

export interface PopoverDirectiveProps extends IonPopoverProps {
  /**
   * @param ionPopoverStopCloseOnScroll - Defines if the popover close or not.
   * @description - Controlls if the popover close when a scroll event occurs.
   * @type {boolean}
   */
  ionPopoverStopCloseOnScroll?: boolean;
  /**
   * @param ionPopoverClose - Controlls if the popover should close.
   * @type {Subject<void>}
   */
  ionPopoverClose?: Subject<void>;
  /**
   * @param ionPopoverArrowPointAtCenter - Defines if the popover arrown points at center.
   * @type {boolean}
   */
  ionPopoverArrowPointAtCenter?: boolean;
  /**
   * @param ionPopoverStopCloseOnScroll - Defines the trigger the opens the popover.
   * @type {'default' | 'hover'}
   */
  ionPopoverTrigger?: PopoverTrigger;
}
