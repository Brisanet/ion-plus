import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IonDividerProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  host: {
    '[attr.data-type]': 'type()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonDividerComponent {
  label = input<IonDividerProps['label']>();
  direction = input<IonDividerProps['direction']>('horizontal');
  type = input<IonDividerProps['type']>('solid');
}
