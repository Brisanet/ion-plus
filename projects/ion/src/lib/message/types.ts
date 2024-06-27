import { IconType } from '../icon';

export type MessageStatusType =
  | 'positive'
  | 'negative_alert'
  | 'negative_error'
  | 'warning'
  | 'info'
  | 'custom';

export interface IonMessageProps {
  /**
   * @description The `label` parameter represents the message that will be displayed.
   * @type {string}
   */
  label: string;
  /**
   * @description The `type` parameter represents the message type that will be displayed. Can be 'positive', 'negative_alert', 'negative_error', 'warning', 'info' or 'custom'.
   * @type {MessageStatusType}
   * @default 'positive'
   */
  type: MessageStatusType;
  /**
   * @description The `iconType` parameter represents the icon that will be displayed.
   * @type {IconType}
   */
  iconType: IconType;
}
