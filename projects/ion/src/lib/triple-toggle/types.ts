import { OutputEmitterRef } from '@angular/core';
import { Icon, Size } from '../button';
import { SafeAny } from '../utils/safe-any';

export type TripleToggleOptionsToRender = [
  IonTripleToggleOption,
  IonTripleToggleOption,
  IonTripleToggleOption,
];

export type TripleToggleOptions = [
  IonTripleToggleOption,
  IonTripleToggleOption,
];

export interface IonTripleToggleOption {
  /**
   * Triple toggle value
   * @param value - Indicates triple toggle value, that will be emitted when this option be selected.
   * @type {SafeAny}
   * @example
   * <ion-triple-toggle [value] = true />
   */
  value: SafeAny;

  /**
   * Triple toggle label.
   * @param label - Text that will be displayed on tripple togle
   * @type {string}
   * @example
   * <ion-triple-toggle label = `text label` />
   */
  label: string;

  /**
   * Triple toggle tooltip.
   * @param tooltip - Text that will be displayed when user hover component with his mouse.
   * @type {string}
   * @example
   * <ion-triple-toggle tooltip = `text to tooltip` />
   */
  tooltip?: string;

  /**
   * Triple toggle icon
   * @param icon - Object that configures the icon associated with one option of triple toggle.
   * @type {object}
   * @param icon.type - defines the type of icon to be displayed.
   * @param icon.rightPosition - indicates whether the icon will be rendered to the right of the label.
   * @example
   * <ion-triple-toggl [icon]="{type: 'play'}" />
   */
  icon?: Icon;

  /**
   * Triple toggle rightSideIcon
   * @param rightSideIcon - Iindicates whether the icon will be rendered to the right of the label.
   * @type {boolean}
   * @default false
   * @example
   * <ion-triple-toggl [rightSideIcon]=false />
   */
  rightSideIcon?: boolean;

  /**
   * Triple toggle selected
   * @param selected - Indicates whether the triple toggle is selected.
   * @type {boolean}
   * @default false
   * @example
   * <ion-triple-toggle [selected] = false />
   */
  selected?: boolean;
}

export interface IonTripleToggleProps {
  /**
   * Triple toggle value
   * @param value - Indicates value of triple toggle selected.
   * @type {SafeAny}
   * @example
   * <ion-triple-toggle [value] = true />
   */
  value?: SafeAny;

  /**
   * Triple toggle disabled
   * @param disabled - Indicates whether the toggle is disabled.
   * @type {boolean}
   * @default false
   * @example
   * <ion-triple-toggle [disabled] = false />
   */
  disabled?: boolean;

  /**
   * Triple toggle size.
   * @param size - Indicates the size of the triple toggle
   * @type {`sm` | `md` | `lg` | `xl`}
   * @default `md`
   * @example
   * <ion-triple-toggle size = `md`/>
   */
  size?: Size;

  /**
   * Triple toggle options.
   * @param options - Array of objects that configures each option on triple toggle.
   * @type {TripleToggleOptions}
   * @example
   * <ion-triple-toggle options = `[]`/>
   */
  options?: TripleToggleOptions;

  /**
   * Triple toggle onlyShowIcon
   * @param onlyShowIcon - Indicates whether the toggle only showa icon or also includes label.
   * @type {boolean}
   * @default false
   * @example
   * <ion-triple-toggle [onlyShowIcon] = false />
   */
  onlyShowIcon?: boolean;

  /**
   * Triple toggle ionClick
   * @event IonTripleToggleComponent#ionClick - Event triggered when some option on triple toggle is clicked.
   * @type {OutputEmitterRef<SafeAny>}
   * @description This event is emitted when some option on triple toggle is clicked. It will emit option's value.
   * @example
   * <ion-triple-toggle (ionClick) = "yourFunction()"/>
   */
  valueChange: OutputEmitterRef<SafeAny>;
}
