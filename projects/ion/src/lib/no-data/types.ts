import { IconType } from '../icon';

export interface IonNoDataProps {
  /**
   * No data label.
   * @param label - Text that will be displayed on the no data component
   * @type {string}
   * @example
   * <ion-no-data label = `no data text` />
   */
  label: string;

  /**
   * No data icon
   * @param iconType - String with name of the icon that come with no data text.
   * @type {string}
   * @example
   * <ion-no-data [iconType]="play" />
   */
  iconType: IconType;
}
