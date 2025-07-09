import { IconType } from '../icon';

export type TabSize = 'sm' | 'md' | 'lg';
export type Direction = 'bottom' | 'top' | 'right' | 'left';

export interface IonTabProps {
  /**
   * Tab label.
   * @param label - Text that will be displayed on the tab
   * @type {string}
   * @example
   * <ion-tab label = `text tab` />
   */
  label: string;

  /**
   * Tab size.
   * @param tabSize - Indicates the size of the tab
   * @type {`sm` | `md` | `lg`}
   * @default `sm`
   * @example
   * <ion-tab size = `sm`/>
   */
  tabSize: TabSize;

  /**
   * Tab disabled
   * @param disabled - Indicates whether the tab is disabled.
   * @type {boolean}
   * @default false
   * @example
   * <ion-tab [disabled] = false />
   */
  disabled: boolean;

  /**
   * Tab selected
   * @param selected - Indicates whether the tab is selected.
   * @type {boolean}
   * @default false
   * @example
   * <ion-tab [selected] = false />
   */
  selected: boolean;

  /**
   * Tab direction
   * @param direction - Indicates where border of tab is located.
   * @type {'bottom' | 'top' | 'right' | 'left'}
   * @default 'bottom'
   * @example
   * <ion-tab [direction] = 'bottom' />
   */
  direction: Direction;

  /**
   * Tab icon
   * @param icon - String with name of the icon associated with the tab.
   * @type {string}
   * @example
   * <ion-tab [iconType]="play" />
   */
  iconType: IconType;

  /**
   * Tab with badge
   * @param badge - Number that represents badge value.
   * @type {number}
   * @example
   * <ion-tab [badge] = '5' />
   */
  badge: number;
}
