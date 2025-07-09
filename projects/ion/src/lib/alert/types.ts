import { TemplateRef } from '@angular/core';

export type IonAlertStatus = 'success' | 'info' | 'warning' | 'negative';

export interface IonAlertProps {
  /**
   * Alert message.
   * @param message - Text that will be displayed on the Alert.
   * @type {string}
   */
  message: string;
  /**
   * Alert custom body.
   * @param customBody - HTML content that will be rendered instead of the simple message.
   * @type {TemplateRef<void>}
   * @example
   * <ion-alert [customBody]="customBody" />
   *  <ng-template #customBody>
        <h1>Custom alert</h1>
      </ng-template>
   */
  customBody: TemplateRef<void>;
  /**
   * Alert description.
   * @param description - Text that will be displayed in below the main alert text.
   * @type {string}
   */
  description: string;
  /**
   * Alert type.
   * @param type - Defines the Alert style.
   * @type {'success' | 'info' | 'warning' | 'negative'}
   * @default `success`
   */
  type: IonAlertStatus;
  /**
   * Alert closable.
   * @param type - Defines if the Alert can be closed.
   * @type {boolean}
   * @default `false`
   */
  closable: boolean;
  /**
   * Alert hideBackground.
   * @param hideBackground - Defines if the Alert will have a transparent background.
   * @type {boolean}
   * @default `false`
   */
  hideBackground: boolean;
  /**
   * Alert noRadius.
   * @param noRadius - Defines if the Alert won't have a border radius.
   * @type {boolean}
   * @default `false`
   */
  noRadius: boolean;
}
