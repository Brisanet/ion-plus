import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  input,
  model,
  output,
} from '@angular/core';
import { IonTabComponent } from '../tab/tab.component';
import { BorderDirectionType } from '../utils/commonTypes';
import { IonTabGroupProps, TabInGroup } from './types';

@Component({
  selector: 'ion-tab-group',
  imports: [IonTabComponent],
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTabGroupComponent implements OnInit, OnChanges {
  tabs = input.required<IonTabGroupProps['tabs']>();
  direction = model<IonTabGroupProps['direction']>('horizontal');
  border = model<IonTabGroupProps['border']>('bottom');
  size = input<IonTabGroupProps['size']>('sm');

  tabSelected = output<TabInGroup>();

  ngOnInit(): void {
    this.border.set(this.getBorderByDirection(this.direction()));
    this.direction.set(this.getDirectionByBorder(this.border()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { direction, border } = changes;
    if (direction) {
      this.border.set(this.getBorderByDirection(this.direction()));
    }
    if (border) {
      this.direction.set(this.getDirectionByBorder(this.border()));
    }
  }

  public handleSelectedTab(tabSelected: TabInGroup): void {
    this.clearTabs();
    tabSelected.selected = true;
    this.tabSelected.emit(tabSelected);
  }

  private getBorderByDirection(
    direction: IonTabGroupProps['direction']
  ): IonTabGroupProps['border'] {
    const directions: {
      [key in IonTabGroupProps['direction']]: IonTabGroupProps['border'];
    } = {
      horizontal: 'bottom',
      vertical: 'right',
    };

    if (this.isBorderDirectionCorrect(direction)) {
      return this.border();
    }

    return directions[direction];
  }

  private getDirectionByBorder(
    border: IonTabGroupProps['border']
  ): IonTabGroupProps['direction'] {
    const directions: {
      [key in BorderDirectionType]: IonTabGroupProps['direction'];
    } = {
      left: 'vertical',
      right: 'vertical',
      top: 'horizontal',
      bottom: 'horizontal',
    };

    return directions[border];
  }

  private isBorderDirectionCorrect(
    direction: IonTabGroupProps['direction']
  ): boolean {
    const directions = {
      horizontal: ['top', 'bottom'].includes(this.border()),
      vertical: ['left', 'right'].includes(this.border()),
    };

    return directions[direction];
  }

  private clearTabs(): void {
    this.tabs().forEach(tab => {
      tab.selected = false;
    });
  }
}
