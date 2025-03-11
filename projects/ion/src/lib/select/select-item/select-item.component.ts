import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IonIconComponent } from '../../icon';
import { IonSelectItemProps } from '../types';

@Component({
  standalone: true,
  selector: 'ion-select-item',
  imports: [IonIconComponent],
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSelectItemComponent {
  label = input<IonSelectItemProps['label']>();
  disabled = input<IonSelectItemProps['disabled']>(false);
  unselect = output<IonSelectItemProps['unselect']>();
  iconSize = 15;

  onUnselect(): void {
    this.unselect.emit();
  }
}
