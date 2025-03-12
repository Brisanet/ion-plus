import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  SimpleChanges,
} from '@angular/core';
import { IonTableProps } from './types';
import { IonIconComponent } from '../icon';
import { IonSpinnerComponent } from '../spinner';

@Component({
  selector: 'ion-table',
  imports: [CommonModule, IonIconComponent, IonSpinnerComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTableComponent<RowType> {
  data = input.required<IonTableProps<RowType>['data']>();
  columns = input.required<IonTableProps<RowType>['columns']>();
  loading = input<IonTableProps<RowType>['loading']>();

  public smartData: RowType[] = [];

  getValueRow(row: RowType, key: string) {
    return row[key as keyof RowType];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataChanged = changes['data'];

    if (dataChanged && !dataChanged.firstChange && dataChanged.currentValue) {
      this.smartData = dataChanged.currentValue();
    }
  }

  ngOnInit(): void {
    this.smartData = this.data();
    console.log('aaa', this.smartData);
  }
  
}
