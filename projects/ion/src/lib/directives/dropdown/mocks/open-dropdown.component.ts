import { Component, input } from '@angular/core';
import { IonDropdownConfig, IonDropdownOption } from '../types';
import { IonButtonComponent } from '../../../button';
import { IonDropdownDirective } from '../dropdown.directive';

export interface Character extends IonDropdownOption {
  name: string;
}

@Component({
  standalone: true,
  selector: 'ion-open-dropdown',
  imports: [IonButtonComponent, IonDropdownDirective],
  template: ` <ion-button
    label="open dropdown"
    ionDropdown
    [dropdownConfig]="dropdownConfig()"
    [dropdownLoading]="dropdownLoading"
    [(dropdownOptions)]="dropdownOptions" />`,
})
export class OpenDropdownComponent {
  dropdownConfig = input<IonDropdownConfig<Character>>({});
  dropdownLoading = false;
  dropdownOptions: Character[] = [];
}
