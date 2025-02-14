import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonButtonComponent } from '../button';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { IonSidebarProps } from './types';
import { callItemAction, selectItemByIndex, unselectAllItems } from './utils';

@Component({
  imports: [
    IonButtonComponent,
    IonSidebarItemComponent,
    IonSidebarGroupComponent,
    CommonModule,
  ],
  selector: 'ion-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSidebarComponent {
  logoConfig = input<IonSidebarProps['logoConfig']>();
  items = input<IonSidebarProps['items']>([]);
  closeOnSelect = input<IonSidebarProps['closeOnSelect']>(false);

  public closed = true;

  public toggleSidebarVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number): void {
    selectItemByIndex(this.items(), itemIndex);
    if (this.closeOnSelect()) {
      this.toggleSidebarVisibility();
    }
  }

  public itemOnGroupSelected(groupIndex: number): void {
    unselectAllItems(this.items(), groupIndex);
    if (this.closeOnSelect()) {
      this.toggleSidebarVisibility();
    }
  }

  public groupSelected(groupIndex: number): void {
    unselectAllItems(this.items());
    callItemAction(this.items(), groupIndex);
  }

  public handleLogoClick(): void {
    if (this.logoConfig()?.action) {
      this.logoConfig()!.action();
    }

    if (this.closeOnSelect()) {
      this.toggleSidebarVisibility();
    }
  }
}
