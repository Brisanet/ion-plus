/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IonSwitchProps } from './types';

@Component({
  imports: [CommonModule, NgClass],
  selector: 'ion-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IonSwitchComponent,
      multi: true,
    },
  ],
  host: {
    '[attr.data-size]': 'size()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSwitchComponent implements ControlValueAccessor {
  key = input<IonSwitchProps['key']>();
  value = model<IonSwitchProps['value']>(false);
  size = input<IonSwitchProps['size']>('sm');
  disabled = model<IonSwitchProps['disabled']>(false);
  valueChange = output<IonSwitchProps['value']>();

  onTouched = (): void => {};

  onChange = (value: boolean): void => {};

  writeValue(value: boolean): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  handleClick(): void {
    this.value.set(!this.value());
    this.valueChange.emit(this.value());
    this.onChange(this.value());
    this.onTouched();
  }
}
