import {
  Component,
  input,
  signal,
  output,
  SimpleChanges,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { IonSelectProps } from './types';
import { IonDropdownComponent } from '../directives/dropdown/dropdown.component';
import { SelectItemComponent } from './select-item/select-item.component';
import { IonIconComponent } from '../icon';
import { FormsModule } from '@angular/forms';
import { IonDropdownDirective } from '../directives/dropdown/dropdown.directive';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-select',
  imports: [
    IonDropdownComponent,
    SelectItemComponent,
    IonIconComponent,
    FormsModule,
    IonDropdownDirective,
  ],
  templateUrl: 'select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent implements OnChanges {
  constructor() {}
  @ViewChild('ionSelectInput', { static: true }) ionSelectInput: SafeAny;
  options = input.required<IonSelectProps['options']>();
  placeholder = input<IonSelectProps['placeholder']>('');
  mode = input<IonSelectProps['mode']>('multiple');
  maxSelect? = input<IonSelectProps['maxSelected']>();
  required = input<IonSelectProps['required']>();
  loading = input<IonSelectProps['loading']>();
  disabled = input<IonSelectProps['disabled']>(false);
  propLabel = input<IonSelectProps['propLabel']>('label');
  events = output<IonSelectProps['events']>();
  search = output<IonSelectProps['search']>();
  isDropdownOpen = signal(false);
  inputValue = '';
  visibleOptions: IonSelectProps['options'] = [];
  showPlaceholder = true;
  private touched = false;
  private hasValue = false;

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  selected(selectedOptions: IonSelectProps['options']) {
    this.inputValue = '';
    if (this.mode() === 'default') {
      this.singleSelect(selectedOptions);
    }

    if (this.mode() === 'multiple') {
      // this.multipleSelect(selectedOptions);
    }
  }

  singleSelect(selectedOptions: IonSelectProps['options']) {
    const [optionS] = selectedOptions;
    this.events.emit(selectedOptions);
    this.visibleOptions = this.visibleOptions.map((option: SafeAny) => {
      if (option.key === optionS.key) {
        return { ...option, selected: optionS.selected };
      }
      return option;
    });
  }

  onSearchChange(): void {
    this.visibleOptions = this.options().filter(option => {
      return option.label.toLowerCase().includes(this.inputValue.toLowerCase());
    });

    this.search.emit(this.inputValue);
    this.inputValue = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.visibleOptions = changes['options'].currentValue;
    }
  }

  focusInput(): void {
    this.ionSelectInput.nativeElement.focus();
  }
}
