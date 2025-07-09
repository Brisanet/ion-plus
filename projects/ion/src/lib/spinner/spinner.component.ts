import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IonSpinnerProps } from './types';

@Component({
  selector: 'ion-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSpinnerComponent {
  size = input<IonSpinnerProps['size']>(24);
  color = input<IonSpinnerProps['color']>('primary');
  customColor = input<IonSpinnerProps['customColor']>();
  text = input<IonSpinnerProps['text']>('');
  textSize = input<IonSpinnerProps['textSize']>('sm');
}
