import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

import { AvatarType, IonAvatarComponent } from '../avatar';
import { IonButtonComponent } from '../button/button.component';
import { IonTabGroupComponent } from '../tab-group';
import { TabInGroup } from '../tab-group/types';
import { SimpleMenuProps } from './types';

@Component({
  selector: 'ion-simple-menu',
  imports: [IonButtonComponent, IonAvatarComponent, IonTabGroupComponent],
  templateUrl: './simple-menu.component.html',
  styleUrl: './simple-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSimpleMenuComponent {
  options = input.required<SimpleMenuProps['options']>();
  profile = input.required<SimpleMenuProps['profile']>();
  logo = input<SimpleMenuProps['logo']>();

  selected = output<TabInGroup>();
  logoutClick = output();

  open = signal(false);
  avatarType = computed<AvatarType>(() =>
    this.profile().imageUrl ? 'photo' : 'initials'
  );

  private timeToToAutoClose = 1000;
  private menuTimeout!: ReturnType<typeof setTimeout>;

  changeTab(tabSelected: TabInGroup): void {
    this.selected.emit(tabSelected);
  }

  dismissMenu(): void {
    this.menuTimeout = setTimeout(() => {
      this.open.set(false);
    }, this.timeToToAutoClose);
  }

  openMenu(): void {
    clearTimeout(this.menuTimeout);
    this.open.set(true);
  }

  logout(): void {
    this.logoutClick.emit();
  }
}
