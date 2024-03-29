import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IonTabComponent } from '../tab/tab.component';
import { BorderDirectionType } from '../utils/commonTypes';
import { IonTabGroupProps, TabInGroup } from './types';

@Component({
  standalone: true,
  selector: 'ion-tab-group',
  imports: [CommonModule, IonTabComponent],
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class IonTabGroupComponent implements OnInit, OnChanges {
  @Input({ required: true }) tabs!: IonTabGroupProps['tabs'];
  @Input() direction: IonTabGroupProps['direction'] = 'horizontal';
  @Input() border: IonTabGroupProps['border'] = 'bottom';
  @Input() size: IonTabGroupProps['size'] = 'sm';
  @Output() selected: IonTabGroupProps['selected'] =
    new EventEmitter<TabInGroup>();

  ngOnInit(): void {
    this.border = this.getBorderByDirection(this.direction || 'horizontal');
    this.direction = this.getDirectionByBorder(this.border);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { direction, border } = changes;
    if (direction) {
      this.border = this.getBorderByDirection(this.direction || 'horizontal');
    }
    if (border) {
      this.direction = this.getDirectionByBorder(this.border);
    }
  }

  public handleClick(tabSelected: TabInGroup): void {
    this.clearTabs();
    tabSelected.selected = true;
    this.selected.emit(tabSelected);
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
      return this.border;
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

    return directions[border || 'bottom'];
  }

  private isBorderDirectionCorrect(
    direction: IonTabGroupProps['direction']
  ): boolean {
    if (!this.border) {
      return false;
    }
    const directions = {
      horizontal: ['top', 'bottom'].includes(this.border),
      vertical: ['left', 'right'].includes(this.border),
    };

    return directions[direction];
  }

  private clearTabs(): void {
    this.tabs.forEach(tab => {
      tab.selected = false;
    });
  }
}
