import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IonButtonComponent } from '../button/button.component';
import { SimpleMenuProps } from './types';
import { AvatarType, IonAvatarComponent } from '../avatar';
import { TabInGroup } from '../tab-group/types';
import { IonTabGroupComponent } from '../tab-group';

@Component({
  selector: 'ion-simple-menu',
  standalone: true,
  imports: [IonButtonComponent, IonAvatarComponent, IonTabGroupComponent],
  templateUrl: './simple-menu.component.html',
  styleUrl: './simple-menu.component.scss',
})
export class IonSimpleMenuComponent {
  @Input() options!: SimpleMenuProps['options'];
  @Input() profile!: SimpleMenuProps['profile'];
  @Input() logo?: SimpleMenuProps['logo'];

  @Output() selected = new EventEmitter<TabInGroup>();
  @Output() logoutClick = new EventEmitter<SimpleMenuProps['logoutClick']>();

  open = false;
  avatarType = AvatarType.photo;
  initialsType = AvatarType.initials;

  private timeToToAutoClose = 1000;
  private menuTimeout!: ReturnType<typeof setTimeout>;

  changeTab(tabSelected: TabInGroup): void {
    this.selected.emit(tabSelected);
  }

  dismissMenu(): void {
    this.menuTimeout = setTimeout(() => {
      this.open = false;
    }, this.timeToToAutoClose);
  }

  openMenu(): void {
    clearTimeout(this.menuTimeout);
    this.open = true;
  }

  logout(): void {
    this.logoutClick.emit();
  }
}
