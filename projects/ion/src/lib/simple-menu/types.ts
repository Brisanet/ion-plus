import { EventEmitter } from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { TabInGroup } from '../tab-group/types';

interface MenuProfile {
  imageUrl: string;
  name: string;
}

interface Image {
  src: string;
  alt: string;
}

export interface SimpleMenuProps {
  /**
   * @description The `options` parameter is required and represents the list of options that will be displayed in the menu.
   * @types {TabInGroup[]}
   */
  options: TabInGroup[];
  /**
   * @description The `profile` parameter represents the user's profile that will be displayed in the menu.
   * @types {MenuProfile}
   */
  profile: MenuProfile;
  /**
   * @description The `selected` parameter is an event that is triggered when an option is selected.
   * @types {EventEmitter<TabInGroup>}
   */
  selected?: EventEmitter<TabInGroup>;
  /**
   * @description The `logoutClick` parameter is an event that is triggered when the logout button is clicked.
   * @types {EventEmitter<SafeAny>}
   */
  logoutClick?: EventEmitter<SafeAny>;
  /**
   * @description The `logo` parameter represents the logo that will be displayed in the menu.
   * @types {Image}
   */
  logo?: Image;
}
