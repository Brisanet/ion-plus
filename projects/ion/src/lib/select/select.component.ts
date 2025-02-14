import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class IonSelectComponent {
  isDropdownOpen = signal(false);
  options = input<{ label: string; value: string }[]>();
  placeholder = input('');

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }
}
