/**
 * @typedef {'sm' | 'md' | 'lg'} IonSpinnerTextSize - Spinner text size.
 */
export type IonSpinnerTextSize = 'sm' | 'md' | 'lg';

/**
 * @typedef {'primary' | 'secondary' | 'danger'} IonSpinnerColor - Spinner color.
 */
export type IonSpinnerColor = 'primary' | 'secondary' | 'danger';

export interface IonSpinnerProps {
  /**
   * Spinner size. Can be any number.
   * @type {number}
   * @default 24
   * */
  size: number;

  /**
   * Spinner color. Can be 'primary', 'secondary' or 'danger'.
   * @type {IonSpinnerColor}
   * @default 'primary'
   * */
  color: IonSpinnerColor;

  /**
   * Custom spinner color.
   * @type {string}
   * */
  customColor: string;

  /**
   * Spinner text.
   * @type {string}
   * */
  text: string;

  /**
   * Spinner text size. Can be 'sm', 'md' or 'lg'.
   * @type {IonSpinnerTextSize}
   * @default 'sm'
   * */
  textSize: IonSpinnerTextSize;
}
