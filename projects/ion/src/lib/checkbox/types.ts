import { OutputEmitterRef } from '@angular/core';

export interface IonCheckboxProps {
  /**
   * Checkbox label.
   * @param label - Text that will be displayed with the checkbox
   * @type {string}
   * @example
   * <ion-checkbox label="text checkbox" />
   */
  label: string;

  /**
   * Checkbox value.
   * @param value - Value of the checkbox. It is used to identify the checkbox when submitting the form.
   * @type {string}
   * @example
   * <ion-checkbox value="value" />
   */
  value: string;

  /**
   * Checkbox disabled.
   * @param disabled - Indicates whether the checkbox is disabled.
   * @type {boolean}
   * @default false
   * @example
   * <ion-checkbox [disabled]="true" />
   */
  disabled: boolean;

  /**
   * Checkbox checked.
   * @param checked - Indicates whether the checkbox is checked. Accepts double binding.
   * @type {boolean}
   * @default false
   * @example
   * <ion-checkbox [checked]="true" />
   * <ion-checkbox [(checked)]="variable" />
   */
  checked: boolean;

  /**
   * Checkbox indeterminate.
   * @param indeterminate - Indicates whether the checkbox is indeterminate. Accepts double binding.
   * @type {boolean}
   * @default false
   * @example
   * <ion-checkbox [indeterminate]="true" />
   * <ion-checkbox [(indeterminate)]="variable" />
   */
  indeterminate: boolean;

  /**
   * Checkbox checked change.
   * @param checkedChange - Event that is triggered when the checkbox is checked or unchecked.
   * @type {OutputEmitterRef<boolean>}
   * @example
   * <ion-checkbox (checkedChange)="function($event)" />
   */
  checkedChange: OutputEmitterRef<boolean>;
}
