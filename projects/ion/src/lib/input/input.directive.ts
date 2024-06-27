import { Directive, HostBinding, Input } from '@angular/core';

import { IonInputProps } from './types';

@Directive({
  selector: 'input[ionInput]',
  exportAs: 'ionInput',
  standalone: true,
})
export class IonInputDirective {
  @HostBinding('class')
  class = 'ion-input';

  @HostBinding('class.ion-input--invalid')
  @Input()
  invalid: IonInputProps['invalid'] = false;
}
