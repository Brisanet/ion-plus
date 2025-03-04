import {
  Component,
  input,
  signal,
  output,
  SimpleChanges,
  OnChanges,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { IonSelectProps } from './types';
import { IonIconComponent } from '../icon';
import { FormsModule } from '@angular/forms';
import { IonDropdownDirective } from '../directives/dropdown/dropdown.directive';
import { SafeAny } from '../utils/safe-any';
import { IonDropdownOption } from '../directives/dropdown';

@Component({
  selector: 'ion-select',
  imports: [IonIconComponent, FormsModule, IonDropdownDirective],
  templateUrl: 'select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnChanges {
  constructor() {}
  @ViewChild('ionSelectInput', { static: true }) ionSelectInput: SafeAny;
  options = input.required<IonSelectProps['options']>();
  placeholder = input<IonSelectProps['placeholder']>('');
  mode = input<IonSelectProps['mode']>('default');
  maxSelect = input<IonSelectProps['maxSelected']>();
  required = input<IonSelectProps['required']>(true);
  loading = input<IonSelectProps['loading']>(false);
  disabled = input<IonSelectProps['disabled']>(false);
  propLabel = input<IonSelectProps['propLabel']>('label');
  events = output<IonSelectProps['events']>();
  search = output<IonSelectProps['search']>();
  isDropdownOpen = signal(false);
  inputValue = '';
  visibleOptions: IonSelectProps['options'] = [];
  private touched = false;
  private hasValue = false;

  selected(selectedOptions: IonSelectProps['options']) {
    this.inputValue = '';
    this.visibleOptions = selectedOptions;
    this.hasValue = !!selectedOptions.length;
  }

  hasSelectedOption = (): boolean => {
    return this.options().some(option => !!option.selected);
  };

  unselectOption(currentOption: IonDropdownOption): void {
    currentOption.selected = false;
    this.events.emit(this.options().filter(option => option.selected));
    this.hasValue =
      this.mode() === 'default' ? false : this.hasSelectedOption();
  }

  onSearchChange(): void {
    this.visibleOptions = this.options().filter(option => {
      return option.label.toLowerCase().includes(this.inputValue.toLowerCase());
    });

    this.search.emit(this.inputValue);
  }

  focusInput(): void {
    this.ionSelectInput.nativeElement.focus();
  }

  handleClick(event: boolean) {
    this.isDropdownOpen.set(!this.isDropdownOpen());
    this.focusInput();
    if (!event) {
      this.touched = true;
      this.inputValue = '';
      this.visibleOptions = this.options();
    }
  }

  @HostBinding('class.ion-select__required')
  get isValid(): boolean {
    if (!this.required()) {
      return false;
    }
    return this.touched && !this.hasValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.visibleOptions = changes['options'].currentValue;
    }
  }
}
