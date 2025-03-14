import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseRow, IonTableProps } from './types';
import { IonIconComponent } from '../icon';
import { IonSpinnerComponent } from '../spinner';
import { BaseTable } from '../utils/baseTable';
import { IonButtonComponent } from '../button';

@Component({
  selector: 'ion-table',
  imports: [
    CommonModule,
    IonIconComponent,
    IonSpinnerComponent,
    IonButtonComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTableComponent<RowType extends BaseRow>
  extends BaseTable<RowType>
  implements OnChanges, OnInit
{
  data = input.required<IonTableProps<RowType>['data']>();
  columns = input.required<IonTableProps<RowType>['columns']>();
  loading = input<IonTableProps<RowType>['loading']>();
  actions = input<IonTableProps<RowType>['actions']>();

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
