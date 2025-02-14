import { OutputEmitterRef } from '@angular/core';
import { IconType } from '../../icon';
import { IonNoDataProps } from '../../no-data';

export interface IonDropdownOption {
  /**
   * Option label.
   * @param label - Define the visible label.
   * @type {string}
   */
  label: string;
  /**
   * Option value.
   * @param value - Define the value of that option.
   * @type {unknown}
   */
  value: unknown;
  /**
   * Option value.
   * @param icon - Define the icon to be displayed in that option (when needed).
   * @type {IconType}
   */
  icon?: IconType;
  /**
   * Option value.
   * @param selected - Define if the option is selected.
   * @type {boolean}
   */
  selected?: boolean;
  /**
   * Option value.
   * @param disabled - Define if the option is disabled.
   * @type {boolean}
   */
  disabled?: boolean;
  /**
   * Option value.
   * @param hovered - Define if the option is hovered.
   * @type {boolean}
   */
  hovered?: boolean;
}

export interface IonDropdownConfig<T extends IonDropdownOption> {
  /**
   * Dropdown multiple.
   * @param multiple - Define the dropdown as multiple.
   * @type {boolean}
   */
  multiple?: boolean;
  /**
   * Dropdown clear button.
   * @param clearButton - Define if the dropdown should show a clear button.
   * @type {boolean}
   */
  clearButton?: boolean;
  /**
   * Dropdown max selected.
   * @param maxSelected - Define the maximum amount of selected dropdown options.
   * @type {number}
   */
  maxSelected?: number;
  /**
   * Dropdown required.
   * @param required - Define if the dropdown should have at least one option selected.
   * @type {boolean}
   */
  required?: boolean;
  /**
   * Dropdown close on scroll.
   * @param closeOnScroll - Define if the dropdown should close when user scroll on the page.
   * @type {boolean}
   */
  closeOnScroll?: boolean;
  /**
   * Dropdown prop label.
   * @param propLabel - Define a property from the option so the value will be used as the visible label.
   * @type {keyof T}
   */
  propLabel?: keyof T;
  /**
   * Dropdown no data config.
   * @param noDataConfig - Define the configuration for the no data component.
   * @type {IonNoDataProps}
   */
  noDataConfig?: IonNoDataProps;
}

export interface IonDropdownProps<T extends IonDropdownOption> {
  /**
   * Dropdown options.
   * @param dropdownOptions - Array of options that will be rendered inside the dropdown, regardless of whether it's collapsed or expanded.
   * @type {T[]}
   */
  dropdownOptions: T[];
  /**
   * Dropdown configuration.
   * @param dropdownConfig - Determinate the dropdown behavior.
   * @type {IonDropdownConfig<T>}
   */
  dropdownConfig: IonDropdownConfig<T>;
  /**
   * Dropdown loading.
   * @param dropdownLoading - Set the dropdown loading state.
   * @type {boolean}
   */
  dropdownLoading: boolean;
  /**
   * Dropdown options change
   * @event dropdownOptionsChange - Event triggered when a change occurs on the dropdown options.
   * @type {OutputEmitterRef<T[]>}
   * @description This event is triggered an option is selected, unselected or hovered.
   */
  dropdownOptionsChange: OutputEmitterRef<T[]>;
}
