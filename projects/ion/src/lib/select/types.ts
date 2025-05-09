import { IonDropdownOption } from '../../public-api';

export type Mode = 'default' | 'multiple';

export interface IonSelectProps {
  /**
   * @param option - Receives the options displayed in the select.
   * @type {IonDropdownOption}
   * @default []
   */
  options: IonDropdownOption[];
  /**
   * @param placeholder - Defines the text that will be in the select input.
   * @type {string}
   * @default 'placeholder'
   */
  placeholder: string;
  /**
   * @event selected - Event triggered when a change occurs on the select options.
   * @type {IonDropdownOption[]}
   * @description This event is triggered when a option is selected or unselected.
   */
  selected: IonDropdownOption[];
  /**
   * @param maxSelected - Defines the maximum number of selected options if the select component is multiple.
   * @type {number}
   */
  maxSelected: number;
  /**
   * @event searchChange - Event triggered when a change occurs on select input.
   * @type {string}
   * @description - This event is triggered when the input receives a value.
   */
  searchChange?: string;
  /**
   * @param required - Defines if is mandatory a option being selected when select component is clicked.
   * @type {boolean}
   */
  required: boolean;
  /**
   * @param loading - Set the loading state.
   * @type {boolean}
   */
  loading: boolean;
  /**
   * @param disabled - Set the disabled state.
   * @type {boolean}
   */
  disabled: boolean;
  /**
   * @param mode - Defines the select as multiple or default.
   * @type {Mode}
   */
  mode: Mode;
}

export interface IonSelectItemProps {
  /**
   * @param label - Defines the text that will be displayed.
   * @type {string}
   */
  label: string;
  /**
   * @param disabled - Set the disabled state.
   * @type {string}
   */
  disabled?: boolean;
  /**
   * @event unselect - Event triggered when the options is unselected.
   * @type {void}
   * @description - The event is triggered when the close icon is clicked.
   */
  unselect?: void;
}
