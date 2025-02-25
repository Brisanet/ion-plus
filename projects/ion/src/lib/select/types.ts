import { EventEmitter } from '@angular/core';
import { IonDropdownOption } from '../../public-api';

export type Mode = 'default' | 'multiple';

export interface IonSelectProps {
  /**
   * @description the `options` parameter receives the options displayed in the select.
   * @type {IonDropdownOption}
   * @default []
   */
  options: IonDropdownOption[];
  /**
   * @description
   * @type {}
   * @default
   */
  placeholder: string;
  events?: IonDropdownOption[];
  maxSelected?: number;
  search?: string;
  required?: boolean;
  loading?: boolean;
  propLabel: string;
  disabled?: boolean;
  mode?: Mode;
}

export interface IonSelectItemProps {
  label: string;
  disabled?: boolean;
  unselect?: EventEmitter<void>;
}
