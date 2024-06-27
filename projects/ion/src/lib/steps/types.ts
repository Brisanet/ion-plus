import { OutputEmitterRef } from '@angular/core';

export type StatusType = 'default' | 'selected' | 'checked' | 'error';
export type LineType = 'initial' | 'final';

export enum Status {
  default = 'default',
  selected = 'selected',
  checked = 'checked',
  error = 'error',
}

export interface Step {
  /**
   * Step label.
   * @param label - Text that will be displayed below circle draw
   * @type {string}
   * @example
   * <ion-steps steps = [{label: `label text`}] />
   */
  label: string;

  /**
   * Step description.
   * @param description - Text that will be displayed below label of step
   * @type {string}
   * @example
   * <ion-steps steps = [{label: `label text`, description: `Example of description`}] />
   */
  description?: string;

  /**
   * Step index.
   * @param index - Index of step, inside an array of steps
   * @type {number}
   * @example
   * <ion-steps steps = [{label: `label text`, index: 2}] />
   */
  index?: number;

  /**
   * Step status.
   * @param status - Defines the step style
   * @type {`default` | `selected` | `checked` | `error`}
   * @example
   * <ion-steps steps = [{label: `label text`, status: `selected`}] />
   */
  status?: StatusType;
}

export type IonStepsProps = {
  /**
   * Step current index.
   * @param current - Indicates which step will be displayed on style of selected
   * @type {number}
   * @default 1
   * @example
   * <ion-steps current = 2 />
   */
  current: number;

  /**
   * Steps disabled
   * @param disabled - Indicates whether the steps is disabled.
   * @type {boolean}
   * @default false
   * @example
   * <ion-steps [disabled] = false />
   */
  disabled: boolean;

  /**
   * Set of steps
   * @param icon - Object that configures each step in a steps group.
   * @type {Array<Step>}
   * @example
   * <ion-steps [steps]="[{label: `fiist step`}, {label: `second step`}]" />
   */
  steps: Step[];

  /**
   * Clickable selection between steps
   * @param clickable - Indicates that user can select a step by clicking on it.
   * @type {boolean}
   * @default false
   * @example
   * <ion-steps [clickable] = false />
   */
  clickable: boolean;

  /**
   * Steps indexChange
   * @event IonStepsComponent#indexChange - Event triggered when some step is selected by click.
   * @type {EventEmitter<number>}
   * @description To use this, "clickable" property should be true. This event emits an index of selected step.
   * @example
   * <ion-steps (ionOnClik) = "yourFunction()"/>
   */
  currentChange: OutputEmitterRef<number>;
};
