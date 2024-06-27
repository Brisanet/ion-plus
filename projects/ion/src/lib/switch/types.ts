import { OutputEmitterRef } from '@angular/core';

/**
 * @typedef {'sm' | 'md' | 'lg'} SwitchSize Size of the switch
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

export type IonSwitchProps = {
  /**
   * Key of the switch
   * @type {string}
   * @example
   * <ion-switch key='switch' />
   */
  key: string;

  /**
   * Value of the switch
   * @type {boolean}
   * @example
   * <ion-switch value={true} />
   */
  value: boolean;

  /**
   * Size of the switch
   * @type {SwitchSize}
   * @default `sm`
   * @example
   * <ion-switch size='md' />
   */
  size: SwitchSize;

  /**
   * Disabled state of the switch
   * @type {boolean}
   * @default false
   * @example
   * <ion-switch disabled={false} />
   */
  disabled: boolean;

  /**
   * Event emitted when the value of the switch changes
   * @event IonSwitchComponent#valueChange - Emit the new value of the switch
   * @param value - New value of the switch
   * @type {EventEmitter<boolean>}
   * @example
   * <ion-switch valueChange={(value) => console.log(value)} />
   */
  valueChange: OutputEmitterRef<boolean>;
};
