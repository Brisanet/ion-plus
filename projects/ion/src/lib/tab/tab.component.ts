import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { IonBadgeComponent } from '../badge';
import { IonIconComponent } from '../icon';
import { IonTabProps } from './types';

@Component({
  selector: 'ion-tab',
  imports: [CommonModule, IonIconComponent, IonBadgeComponent, NgClass],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  host: {
    '[attr.data-size]': 'tabSize()',
    '[attr.data-direction]': 'direction()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTabComponent {
  label = input.required<IonTabProps['label']>();
  tabSize = input<IonTabProps['tabSize']>('sm');
  disabled = input<IonTabProps['disabled']>(false);
  selected = model<IonTabProps['selected']>(false);
  direction = input<IonTabProps['direction']>('bottom');
  iconType = input<IonTabProps['iconType']>();
  badge = input<IonTabProps['badge']>();

  public handleClick(): void {
    if (!this.disabled()) {
      this.selected.set(true);
    }
  }
}
