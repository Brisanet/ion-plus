import { BadgeStatus } from '../badge/types';
import { IonDropdownOption } from '../../public-api';

export type ChipSize = 'sm' | 'md';

export interface ChipEvent {
  /**
   * @param selected - Indicates that the chip is selected.
   * @type {boolean}
   * @default false
   */
  selected: boolean;
  /**
   * @param disabled - Indicates whether the chip is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
}

export interface RightBadge {
  /**
   * @param render - Defines is the badge is should be displayed.
   * @type {boolean}
   * @default false
   */
  render: boolean;
  /**
   * @param label - Defines the text displayed with in the badge.
   * @type {string}
   */
  label: string;
  /**
   * @param type - Defines the type of the badge.
   * @type {'primary' | 'secondary' | 'neutral' | 'negative' }
   * @default `primary``
   */
  type: 'primary' | 'secondary' | 'neutral' | 'negative';
}

export interface InfoBadge {
  /**
   * @param render - Defines if the badge will be displayed.
   * @type {boolean}
   * @default `false`
   */
  render: boolean;
  /**
   * @param type - Defines the type of the badge.
   * @type {'primary' | 'negative' | 'positive' | 'warning' | 'info'}
   * @default `primary`
   */
  type: BadgeStatus;
}

export type Badge = {
  /**
   * @param value - Defined the number displayed in the badge.
   * @type {number}
   */
  value: number;
};

export interface IonChipProps {
  /**
   * @param label - Text that will be displayed on the chip.
   * @type {string}
   * @example
   * <ion-chip label="example"></ion-chip>
   */
  label: string;
  /**
   * @param disabled - Indicates whether the chip is disabled.
   * @type {boolean}
   * @default false
   * @example
   * <ion-chip [disabled]="true"></ion-chip>
   */
  disabled: boolean;
  /**
   * @param size - Defines the size of the chip.
   * @type {'sm' | 'md'}
   * @default `sm`
   * @example
   * <ion-chip size="md"></ion-chip>
   */
  size: ChipSize;
  /**
   * @event chipSelected - Event triggered when chip is clicked.
   * @type {ChipEvent}
   * @description - This event is emitted when the chip is clicked, emitting an event with a selected value and a disabled value. The event will not be fired is `disabled` propertie is set to `true`.
   */
  chipSelected: ChipEvent;
  /**
   * @param options - Defines the options displayed in the chip dropdown.
   * @type {IonDropdownOption[]}
   * @default `[]`
   * @description - This propertie needs to be passed with the propertie hasDropdown to render the dropdown.
   */
  options: IonDropdownOption[];
  /**
   * @param icon - Defines the icon that will be displayed in the placeholder if a option is selected.
   * @type {string}
   * @example
   * <ion-chip icon="heart"></ion-chip>
   */
  icon: string;
  /**
   * @param multiple - Defines if the dropdown is multiple select or single select.
   * @type {boolean}
   * @default `false`
   * @example
   * <ion-chip [multiple]="true"></ion-chip>
   */
  multiple: boolean;
  /**
   * @param infoBadge - Defines if the chip receives a infoBadge.
   * @type {InfoBadge}
   * @example
   * <ion-chip [infoBadge]="{render: true, label: 'novo', type: 'primary'}"></ion-chip>
   */
  infoBadge: InfoBadge;
  /**
   * @param iconPosition - Defines which side the icon will be displayed
   * @type {'left' | 'right'}
   * @default `left``
   */
  iconPosition: string;
  /**
   * @param rightBadge - Defines if the chip receives a rightBadge.
   * @type {RightBadge}
   * @example
   * <ion-chip [rightBadge]="{ render: true, type: 'info' }"></ion-chip>
   */
  rightBadge: RightBadge;
  /**
   * @param hasDropdown - Defines if the chip will have a dropdown.
   * @type {boolean}
   * @default `false`
   * @description - This propertie needs to be passed with the propertie options to the dropdown be render with the options.
   */
  hasDropdown: boolean;
  /**
   * @param required - Defined if is mandatory to select a option in the dropdown.
   * @type {boolean}
   * @default `false``
   */
  required: boolean;
  /**
   * @event dropdownEvents - Event triggered when a change occurs in the dropdown options.
   * @type {IonDropdownOption[]}
   * @description - This event is triggered when a option is clicked in the dropdown.
   */
  dropdownEvents: IonDropdownOption[];
}
