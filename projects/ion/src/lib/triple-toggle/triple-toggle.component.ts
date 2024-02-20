import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
})
export class IonTripleToggleComponent implements OnInit, OnChanges {
  @Input() value: IonTripleToggleProps['value'];
  @Input() disabled: IonTripleToggleProps['disabled'] = false;
  @Input() size: IonTripleToggleProps['size'] = 'md';
  @Input() options!: IonTripleToggleProps['options'];
  @Input() onlyShowIcon: IonTripleToggleProps['onlyShowIcon'] = false;
  @Output() ionClick: IonTripleToggleProps['ionClick'] = new EventEmitter();

  public optionsToRender!: TripleToggleOptionsToRender;
  public middleOptionIndex = 1;

  handleClick(option: IonTripleToggleOption): void {
    this.selectOption(option);
  }

  ngOnInit(): void {
    this.buildOptionsToRender();
    if (this.value !== undefined) {
      this.changeOptionByValue();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (value && !value.firstChange) {
      this.changeOptionByValue();
    }
  }

  private unselectAllOptions(): void {
    this.optionsToRender.forEach(option => {
      option.selected = false;
    });
  }

  private selectOption(option: IonTripleToggleOption): void {
    this.value = option.value;
    this.unselectAllOptions();
    option.selected = true;
    this.ionClick.emit(option.value);
  }

  private changeOptionByValue(): void {
    if (!this.disabled && this.optionsToRender) {
      const validatedOption = this.optionsToRender.find(
        option => option.value === this.value
      );
      if (validatedOption) {
        this.selectOption(validatedOption);
      }
    }
  }

  private buildOptionsToRender(): void {
    this.optionsToRender = [
      this.options && this.options[FIRST_INDEX]
        ? this.options[FIRST_INDEX]
        : DEFAULT_LEFT_OPTION,

      DEFAULT_MIDDLE_OPTION,

      this.options && this.options[SECOND_INDEX]
        ? this.options[SECOND_INDEX]
        : DEFAULT_RIGHT_OPTION,
    ];
  }
}
