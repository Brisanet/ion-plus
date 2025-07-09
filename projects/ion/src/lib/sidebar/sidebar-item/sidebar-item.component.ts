import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { IonIconComponent } from '../../icon';
import { SidebarItem } from '../types';

@Component({
  imports: [IonIconComponent],
  selector: 'ion-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSidebarItemComponent {
  title = input<SidebarItem['title']>('');
  icon = input<SidebarItem['icon']>('');
  selected = model<SidebarItem['selected']>(false);
  disabled = input<SidebarItem['disabled']>(false);
  selectedChange = output<boolean>();

  public selectItem(): void {
    this.selected.set(true);
    this.selectedChange.emit(true);
  }
}
