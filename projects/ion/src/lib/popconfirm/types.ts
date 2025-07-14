export type PopConfirmStatusType = 'success' | 'info' | 'warning' | 'negative';

export interface IonPopConfirmProps {
  /**
   * Popconfirm title.
   * @param ionPopConfirmTitle - Text that will be at top of popconfirm component.
   * @type {string}
   * @example
   * <ion-popconfirm ionPopConfirmTitle = `text of popconfirm` />
   */
  ionPopConfirmTitle: string;

  /**
   * Popconfirm type.
   * @param ionPopConfirmType - Defines the popconfirm style.
   * @type {`success` | `info` | `warning` | `negative`}
   * @default `warning`
   * @example
   * <ion-popconfirm ionPopConfirmType = `warning`/>
   */
  ionPopConfirmType?: PopConfirmStatusType;

  /**
   * Popconfirm description.
   * @param ionPopConfirmDesc - Text that will be displayed inside popconfirm component.
   * @type {string}
   * @example
   * <ion-popconfirm ionPopConfirmDesc = `Content of popconfirm description` />
   */
  ionPopConfirmDesc?: string;

  /**
   * Popconfirm text to confirmation button.
   * @param ionConfirmText - Text that will be displayed on confirmation button.
   * @type {string}
   * @default `Confirmar`
   * @example
   * <ion-popconfirm ionConfirmText = `Confirm` />
   */
  ionConfirmText?: string;

  /**
   * Popconfirm text to cancel button.
   * @param ionCancelText - Text that will be displayed on cancel button.
   * @type {string}
   * @default `Cancelar`
   * @example
   * <ion-popconfirm ionCancelText = `Cancel` />
   */
  ionCancelText?: string;
}
