import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonIconComponent } from '../icon';
import { IonNoDataProps } from './types';

@Component({
  selector: 'ion-no-data',
  imports: [IonIconComponent],
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonNoDataComponent {
  label = input<IonNoDataProps['label']>('Não há dados');
  iconType = input<IonNoDataProps['iconType']>('exclamation-solid');
}
