import { IonDropdownOption } from '../directives/dropdown';

export interface SelectOption extends IonDropdownOption {
  multiple?: boolean;
  firstPlaceholder?: string;
  secondPlaceholder?: string;
}

export type ValueToEmmit = {
  optionSelected: SelectOption;
  firstValue: string;
  secondValue?: string;
};

export interface IonInputSelectProps {
  /**
   * @param name - Defines de id of the input.
   * @type {string}
   * @example
   * <ion-input-select [name]="test"></ion-input-select>
   */
  name: string;
  /**
   * @param disabled - Defines the state disabled of the input.
   * @type {boolean}
   * @default `false``
   */
  disabled: boolean;
  /**
   * @param selecteOptions - Defines the options of the select dropdown.
   * @type {SelectOption}
   * @default `defaultSelectOptions`
   */
  selectOptions: SelectOption[];
  /**
   * @param valid - Defines the state of valid or invalid.
   * @type {boolean | null}
   * @default `null`
   */
  valid: boolean | null;
  /**
   * @event valueChange - Event triggered when a change occurs in the input select.
   * @type {ValueToEmmit}
   * @description - This event is trigerred when the input receives a value in any field and/or a option is selected in the dropdown.
   */
  valueChange: ValueToEmmit;
}
