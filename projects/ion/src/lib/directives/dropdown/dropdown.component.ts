import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  output,
  signal,
} from '@angular/core';

import { IonDropdownOption, IonDropdownProps } from './types';
import { IonIconComponent } from '../../icon';
import { IonNoDataComponent } from '../../no-data';
import { IonSpinnerComponent } from '../../spinner';
import { IonButtonComponent } from '../../button';

@Component({
  standalone: true,
  selector: 'ion-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss'],
  imports: [
    IonIconComponent,
    IonNoDataComponent,
    IonSpinnerComponent,
    IonButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonDropdownComponent<T extends IonDropdownOption> {
  dropdownConfig = signal<IonDropdownProps<T>['dropdownConfig']>({});
  dropdownLoading = signal<IonDropdownProps<T>['dropdownLoading']>(false);
  dropdownOptions = model<IonDropdownProps<T>['dropdownOptions']>([]);
  dropdownOptionsChange = output<IonDropdownProps<T>['dropdownOptions']>();

  public selectedOptions = computed(() =>
    this.dropdownOptions().filter(option => option.selected)
  );

  public handleHover(hoveredOption: T, mouseEnter: boolean): void {
    if (hoveredOption.disabled || !hoveredOption.selected) {
      return;
    }

    hoveredOption.hovered = mouseEnter;
  }

  public clearOptions(): void {
    this.dropdownOptions.update(oldOptions =>
      oldOptions.map(option => ({
        ...option,
        selected: option.disabled ? option.selected : false,
      }))
    );

    this.dropdownOptionsChange.emit(this.dropdownOptions());
  }

  public selectOption(selectedOption: T): void {
    if (selectedOption.disabled) {
      return;
    }

    if (this.dropdownConfig().multiple) {
      this.handleMultipleOptions(selectedOption);
    } else {
      this.handleSingleOptions(selectedOption);
    }

    this.dropdownOptionsChange.emit(this.dropdownOptions());
  }

  private handleMultipleOptions(selectedOption: T): void {
    if (
      (this.isAtSelectedMaxLength() && !selectedOption.selected) ||
      (this.dropdownConfig().required &&
        selectedOption.selected &&
        this.selectedOptions().length === 1)
    ) {
      return;
    }

    this.dropdownOptions.update(options => {
      return options.map(option =>
        option.value === selectedOption.value
          ? { ...option, selected: !option.selected }
          : option
      );
    });
  }

  private isAtSelectedMaxLength(): boolean {
    if (!this.dropdownConfig().maxSelected) {
      return false;
    }

    const selectedOptions = this.dropdownOptions().filter(
      option => option.selected
    );

    return selectedOptions.length === this.dropdownConfig().maxSelected;
  }

  private handleSingleOptions(selectedOption: T): void {
    if (
      this.dropdownConfig().required &&
      selectedOption.selected &&
      this.selectedOptions().length === 1
    ) {
      return;
    }
    this.dropdownOptions.update(oldOptions =>
      oldOptions.map(option => ({
        ...option,
        selected: option.value === selectedOption.value && !option.selected,
      }))
    );
  }
}
