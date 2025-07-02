import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { IonRadioProps, Option } from './types';

@Component({
  standalone: true,
  selector: 'ion-radio',
  imports: [NgClass],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonRadioComponent {
  options = input.required<IonRadioProps['options']>();
  name = input<IonRadioProps['name']>('ion-radio');
  value = model<IonRadioProps['value']>();
  valueChange = output<Option['value']>();

  public onChange(value: string): void {
    this.value.set(value);
    this.valueChange.emit(value);
  }
}
