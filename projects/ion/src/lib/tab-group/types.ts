import { OutputEmitterRef } from '@angular/core';
import { IonTabProps, TabSize } from '../tab/types';
import { BorderDirectionType, DirectionType } from '../utils/commonTypes';

type Tab = Partial<IonTabProps> & Pick<IonTabProps, 'label'>;

export interface TabInGroup extends Tab {
  /**
   * Tab selected
   * @param selected - Indicates whether the tab is selected. In this type (TabInGroup), it is mandatory to use.
   * @type {boolean}
   * @default false
   * @example
   * <ion-tab-group [tabs] = [{label: 'Tab 1', selected: false}] />
   */
  selected: boolean;
}

export interface IonTabGroupProps {
  /**
   * Tabs group
   * @param tabs - Set of tabs that show next to each other.
   * @type {'Array<TabInGroup>'}
   * @example
   * <ion-tab-group [tabs] = [{label: 'Tab 1', selected: false}] />
   */
  tabs: TabInGroup[];

  /**
   * Tabs border
   * @param border - Indicates where border of tabs is located.
   * @type {`bottom` | `top` | `right` | `left`}
   * @default `bottom`
   * @example
   * <ion-tab-group border = 'bottom' />
   */
  border: BorderDirectionType;

  /**
   * Tabs direction
   * @param direction - Indicates where tabs direction should show.
   * @type {`horizontal` | `vertical`}
   * @default `horizontal`
   * @example
   * <ion-tab-group direction = 'horizontal' />
   */
  direction: DirectionType;

  /**
   * Tabs size.
   * @param size - Indicates the size of the tabs
   * @type {`sm` | `md` | `lg`}
   * @default `sm`
   * @example
   * <ion-tab-group size = `sm`/>
   */
  size: TabSize;

  /**
   * Tabs selected event
   * @event IonTabGroupComponent#selected - Event triggered when some tab is clicked.
   * @type {'OutputEmitterRef<TabInGroup>'}
   * @description This event is emitted when some tab is clicked. It returns tab properties of clicked tab.
   * @example
   * <ion-tab-group (selected)="yourFunction()" />
   */
  tabSelected: OutputEmitterRef<TabInGroup>;
}
