import { OutputEmitterRef } from '@angular/core';

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface IonRadioProps {
  /**
   * Radio options.
   * @param options - Array of options to be displayed.
   * @type {Option[]}
   * @example
   * <ion-radio [options]="[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]" />
   */
  options: Option[];

  /**
   * Radio name.
   * @param name - Name of the radio.
   * @type {string}
   * @default `ion-radio`
   * @example
   * <ion-radio name='ion-radio' />
   */
  name: string;

  /**
   * Radio value.
   * @param value - Value of the selected radio.
   * @type {Option['value']}
   * @example
   * <ion-radio value='1' />
   */
  value: Option['value'];

  /**
   * Radio value change.
   * @param valueChange - Event emitted when the radio value changes.
   * @type {OutputEmitterRef<Option['value']>}
   * @example
   * <ion-radio (valueChange)='onChange($event)' />
   */
  valueChange: OutputEmitterRef<Option['value']>;
}
