import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { IonButtonComponent } from '../button';
import {
  IonTripleToggleOption,
  IonTripleToggleProps,
  TripleToggleOptionsToRender,
} from './types';

const FIRST_INDEX = 0;
const SECOND_INDEX = 1;
const DEFAULT_LEFT_OPTION: IonTripleToggleOption = {
  value: true,
  label: 'Sim',
};
const DEFAULT_MIDDLE_OPTION: IonTripleToggleOption = {
  value: undefined,
  label: '-',
  selected: true,
};
const DEFAULT_RIGHT_OPTION: IonTripleToggleOption = {
  value: false,
  label: 'Não',
};

@Component({
  standalone: true,
  imports: [IonButtonComponent],
  selector: 'ion-triple-toggle',
  templateUrl: './triple-toggle.component.html',
  styleUrls: ['./triple-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTripleToggleComponent {
  value = model<IonTripleToggleProps['value']>();
  disabled = input<IonTripleToggleProps['disabled']>(false);
  size = input<IonTripleToggleProps['size']>('md');
  options = input<IonTripleToggleProps['options']>();
  onlyShowIcon = input<IonTripleToggleProps['onlyShowIcon']>(false);

  valueChange = output<IonTripleToggleProps['value']>();

  optionsToRender = computed<TripleToggleOptionsToRender>(() => {
    const options: TripleToggleOptionsToRender = [
      this.options()?.length && this.options()![FIRST_INDEX]
        ? this.options()![FIRST_INDEX]
        : DEFAULT_LEFT_OPTION,
      DEFAULT_MIDDLE_OPTION,
      this.options()?.length && this.options()![SECOND_INDEX]
        ? this.options()![SECOND_INDEX]
        : DEFAULT_RIGHT_OPTION,
    ];
    options.forEach(option => {
      option.selected = this.value() === option.value;
    });
    return options;
  });

  public middleOptionIndex = 1;

  handleClick(option: IonTripleToggleOption): void {
    this.value.set(option.value);
    this.valueChange.emit(option.value);
  }
}
