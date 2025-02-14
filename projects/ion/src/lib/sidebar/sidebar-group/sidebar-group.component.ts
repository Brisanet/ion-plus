import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  input,
  model,
  output,
} from '@angular/core';
import { IonIconComponent } from '../../icon';
import { IonSidebarItemComponent } from '../public-api';
import { SidebarGroup } from '../types';
import { selectItemByIndex, unselectAllItems } from '../utils';

@Component({
  imports: [CommonModule, IonSidebarItemComponent, IonIconComponent],
  selector: 'ion-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSidebarGroupComponent implements OnChanges {
  title = input<SidebarGroup['title']>('');
  icon = input.required<SidebarGroup['icon']>();
  items = input<SidebarGroup['items']>([]);
  selected = model<SidebarGroup['selected']>(false);
  haveGroupAction = input<SidebarGroup['haveGroupAction']>(false);
  selectedChange = output<boolean>();
  groupSelectedChanged = output();

  public closed = true;

  public toggleItemsVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number): void {
    this.selected.set(true);
    selectItemByIndex(this.items(), itemIndex);
    this.selectedChange.emit(true);
  }

  public groupSelected(): void {
    this.groupSelectedChanged.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedChangedToFalse(changes)) {
      unselectAllItems(this.items());
    }
  }

  private selectedChangedToFalse(changes: SimpleChanges): boolean {
    return (
      !changes['firstChange'] &&
      changes['selected'] &&
      !changes['selected'].currentValue
    );
  }
}
