import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IonIconComponent } from '../../icon';

@Component({
  standalone: true,
  selector: 'ion-select-item',
  imports: [IonIconComponent],
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItemComponent {
  label = input<string>('');
  disabled = input<boolean>(false);
  unselect = output<void>();

  onUnselect(): void {
    this.unselect.emit();
  }
}
