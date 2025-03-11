import {
  Component,
  input,
  signal,
  output,
  SimpleChanges,
  OnChanges,
  ViewChild,
  HostBinding,
  ElementRef,
} from '@angular/core';
import { IonSelectProps } from './types';
import { IonIconComponent } from '../icon';
import { FormsModule } from '@angular/forms';
import { IonDropdownDirective } from '../directives/dropdown/dropdown.directive';
import { IonDropdownOption } from '../directives/dropdown';
import { IonSelectItemComponent } from './select-item/select-item.component';

@Component({
  selector: 'ion-select',
  imports: [
    FormsModule,
    IonIconComponent,
    IonSelectItemComponent,
    IonDropdownDirective,
  ],
  templateUrl: 'select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnChanges {
  constructor() {}
  @ViewChild('ionSelectInput', { static: true }) ionSelectInput!: ElementRef;
  options = input.required<IonSelectProps['options']>();
  placeholder = input<IonSelectProps['placeholder']>('');
  mode = input<IonSelectProps['mode']>('default');
  maxSelect = input<IonSelectProps['maxSelected']>();
  required = input<IonSelectProps['required']>(false);
  loading = input<IonSelectProps['loading']>(false);
  disabled = input<IonSelectProps['disabled']>(false);
  selected = output<IonSelectProps['selected']>();
  searchChange = output<IonSelectProps['searchChange']>();
  isDropdownOpen = signal(false);
  inputValue = '';
  visibleOptions: IonSelectProps['options'] = [];
  private touched = false;
  private hasValue = false;

  onSelect(selectedOptions: IonSelectProps['options']) {
    this.selected.emit(selectedOptions);
    this.inputValue = '';
    this.visibleOptions = selectedOptions;
    this.hasValue = !!selectedOptions.length;
  }

  hasSelectedOption = (): boolean => {
    return this.options().some(option => !!option.selected);
  };

  unselectOption(currentOption: IonDropdownOption): void {
    currentOption.selected = false;
    this.selected.emit(this.options().filter(option => option.selected));
    this.hasValue =
      this.mode() === 'default' ? false : this.hasSelectedOption();
  }

  onSearchChange(): void {
    this.visibleOptions = this.options().filter(option => {
      return option.label.toLowerCase().includes(this.inputValue.toLowerCase());
    });

    this.searchChange.emit(this.inputValue);
  }

  focusInput(): void {
    this.ionSelectInput.nativeElement.focus();
  }

  handleClick(event: boolean) {
    if (this.disabled()) {
      return;
    }

    if (!event) {
      this.touched = true;
      this.inputValue = '';
      this.visibleOptions = this.options();
    }

    this.isDropdownOpen.set(!this.isDropdownOpen());
    this.focusInput();
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
