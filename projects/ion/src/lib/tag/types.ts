import { IconType } from '../icon';

export type IonTagStatus =
  | 'success'
  | 'info'
  | 'warning'
  | 'negative'
  | 'neutral';

export interface IonTagProps {
  /**
   * @description The `label` parameter is mandatory and represents the text that will be displayed in the tag.
   * @type {string}
   */
  label: string;
  /**
   * @description A boolean that defines whether it will have a border (by default it is true, bringing the `tag` with a border)
   * @type {boolean}
   * @default true
   */
  outline: boolean;
  /**
   * @description The `status` parameter represents the default color scheme.
   * @type {IonTagStatus}
   * @default 'neutral'
   */
  status: IonTagStatus;
  /**
   * @description The `icon` parameter represents the type of icon that will be displayed.
   * @type {IconType}
   */
  icon: IconType;
  /**
   * @description The `color` parameter can pass a custom color to the `tag`
   * @type {string}
   */
  color: string;
}
