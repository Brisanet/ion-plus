import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { IonCheckboxProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-checkbox',
  imports: [NgClass],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCheckboxComponent {
  label = input<IonCheckboxProps['label']>();
  value = input<IonCheckboxProps['value']>();
  disabled = input<IonCheckboxProps['disabled']>(false);
  checked = model<IonCheckboxProps['checked']>(false);
  indeterminate = model<IonCheckboxProps['indeterminate']>(false);
  checkedChange = output<IonCheckboxProps['checked']>();

  change(): void {
    if (!this.disabled()) {
      this.checked.update(prev => !prev);
      this.checkedChange.emit(this.checked());

      if (this.indeterminate()) {
        this.indeterminate.update(() => false);
      }
    }
  }
}
