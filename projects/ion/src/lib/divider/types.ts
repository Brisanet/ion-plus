import { DirectionType } from '../utils/commonTypes';

/**
 * @typedef {'solid' | 'dashed' | 'text'}  DividerType - The type of the divider
 */
export type DividerType = 'solid' | 'dashed' | 'text';

export interface IonDividerProps {
  /**
   * Divider label.
   * @type {string}
   * */
  label: string;

  /**
   * Divider direction. Can be 'horizontal' or 'vertical'.
   * @type {DirectionType}
   * @default 'horizontal'
   * */
  direction: DirectionType;

  /**
   * Divider type. Can be 'solid', 'dashed' or 'text'.
   * @type {DividerType}
   * @default 'solid'
   * */
  type: DividerType;
}
