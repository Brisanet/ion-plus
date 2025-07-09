import { IconType } from '../icon';

type Type = 'primary' | 'secondary' | 'neutral' | 'negative';
type BadgeDotSizes = 'xs' | 'sm' | 'md';
export type BadgeStatus =
  | 'primary'
  | 'negative'
  | 'positive'
  | 'warning'
  | 'info';

export interface IonBadgeProps {
  /**
   * Badge label.
   * @param label - Text that will be displayed on the Badge. If the value passed is a number and it is greater than 99, 99+ will be displayed.
   * @type {string | number}
   * @example
   * <ion-button label="Text badge" />
   * <ion-button label="99" />
   * <ion-button [label]="300" />
   */
  label: string | number;

  /**
   * Badge type.
   * @param type - Defines the badge style.
   * @type {'primary' | 'secondary' | 'neutral' | 'negative'}
   * @default `primary`
   * @example
   * <ion-badge type="neutral" />
   */
  type: Type;

  /**
   * Dot badge.
   * @param dot - If true or any string, the badge will be displayed as a dot.
   * @type {boolean}
   * @default `false`
   * @example
   * <ion-badge dot />
   * @example
   * <ion-badge dot="true" />
   */
  dot: boolean | string;

  /**
   * Badge icon.
   * @param icon - Icon that will be displayed on the Dot Badge.
   * @type {IconType}
   * @example
   * <ion-badge dot icon="heart" />
   */
  icon: IconType;

  /**
   * Badge size.
   * @param size - Defines the dot badge size.
   * @type {'xs' | 'sm' | 'md'}
   * @default `md`
   * @example
   * <ion-badge dot size="lg" />
   */
  size: BadgeDotSizes;

  /**
   * Badge status.
   * @param status - Defines the dot badge status.
   * @type {BadgeStatus}
   * @example
   * <ion-badge dot status="positive" />
   */
  status: BadgeStatus;

  /**
   * Custom color.
   * @param customColor - Custom color for the dot badge.
   * @type {string}
   * @example
   * <ion-badge dot customColor="#f00" />
   */
  customColor: string;
}
