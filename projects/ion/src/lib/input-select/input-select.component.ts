import { Component, input, OnInit, output, signal } from '@angular/core';
import { IonInputSelectProps, SelectOption } from './types';
import { IonIconComponent } from '../icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonDropdownDirective } from '../directives/dropdown';

export const defaultSelectOptions: SelectOption[] = [
  {
    key: 'entre',
    value: 'entre',
    label: 'Entre',
    multiple: true,
    firstPlaceholder: 'Valor inicial',
    secondPlaceholder: 'Valor final',
  },
  {
    key: 'igual_a',
    value: 'igual_a',
    label: 'Igual a',
  },
  {
    key: 'maior_ou_igual',
    value: 'maior_ou_igual',
    label: 'Maior ou igual a',
  },
  {
    key: 'maior_que',
    value: 'maior_que',
    label: 'Maior que',
  },
  {
    key: 'menor_ou_igual',
    value: 'menor_ou_igual',
    label: 'Menor ou igual a',
  },
  {
    key: 'menor_que',
    value: 'menor_que',
    label: 'Menor que',
  },
];

@Component({
  standalone: true,
  selector: 'ion-input-select',
  imports: [IonIconComponent, CommonModule, FormsModule, IonDropdownDirective],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class IonInputSelectComponent implements OnInit {
  name = input<IonInputSelectProps['name']>('');
  disabled = input<IonInputSelectProps['disabled']>(false);
  selectOptions =
    input<IonInputSelectProps['selectOptions']>(defaultSelectOptions);
  valid = input<IonInputSelectProps['valid']>(null);
  valueChange = output<IonInputSelectProps['valueChange']>();

  currentOption!: SelectOption;
  value = '';
  secondValue = '';
  isDropdownOpen = signal(false);

  public handleClick(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  public handleSelect(): void {
    this.clearInputs();
    this.currentOption = this.getCurrentOption();
    this.handleChange();
  }

  public handleChange(): void {
    this.valueChange.emit({
      optionSelected: this.currentOption,
      firstValue: this.value,
      secondValue: this.secondValue,
    });
  }

  private clearInputs(): void {
    this.value = '';
    this.secondValue = '';
  }

  private getCurrentOption(): SelectOption {
    return this.selectOptions().filter(option => option.selected)[0];
  }

  public ngOnInit(): void {
    if (!this.getCurrentOption()) {
      this.selectOptions()[0].selected = true;
    }

    this.currentOption = this.getCurrentOption();
  }
}
