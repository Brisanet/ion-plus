import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Badge, IonChipProps } from './types';

import { generateIDs } from '../utils/generateID';
import { IonBadgeComponent } from '../badge';
import {
  IconType,
  IonDropdownDirective,
  IonDropdownOption,
  IonIconComponent,
} from '../../public-api';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ion-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  imports: [IonIconComponent, IonBadgeComponent, IonDropdownDirective, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonChipComponent implements OnInit, OnChanges, DoCheck {
  public label = input<IonChipProps['label']>('');
  public options = input<IonChipProps['options']>([]);
  public disabled = input<IonChipProps['disabled']>(false);
  public size = input<IonChipProps['size']>('sm');
  public icon = input<IonChipProps['icon']>('');
  public multiple = input<IonChipProps['multiple']>(true);
  public iconPosition = input<IonChipProps['iconPosition']>('left');
  public required = input<IonChipProps['required']>(false);
  public hasDropdown = input<IonChipProps['hasDropdown']>(false);

  public infoBadge = input<IonChipProps['infoBadge']>({
    render: false,
    type: 'primary',
  });
  public rightBadge = input<IonChipProps['rightBadge']>({
    render: false,
    label: 'label',
    type: 'primary',
  });
  public chipSelected = output<IonChipProps['chipSelected']>();
  public dropdownEvents = output<IonChipProps['dropdownEvents']>();
  visibleOptions: IonChipProps['options'] = [];
  showDropdown = signal(false);
  selected = signal(false);
  dropdownId!: string;
  chipId!: string;
  dropdownWithIcon = false;
  placeholder = '';
  iconPlaceholder: IconType = '';
  firstCheck = true;
  badge!: Badge;

  select(): void {
    this.selected.set(!this.selected());
    this.showDropdown.set(!this.showDropdown());
    this.chipSelected.emit({
      selected: this.selected(),
      disabled: this.disabled(),
    });
  }

  selectDropdownItem(selecteds: IonDropdownOption[]): void {
    this.visibleOptions = selecteds;
    this.dropdownEvents.emit(selecteds);

    if (this.multiple()) {
      this.setBadgeValue();
      return;
    }
    this.setPlaceHolder(selecteds[0].label, selecteds[0].icon as string);
  }

  setPlaceHolder(label: string, icon: IconType): void {
    this.placeholder = label || this.label();
    this.iconPlaceholder = icon || (this.icon() as string);
    this.selected.set(false);
  }

  private setBadgeValue(): void {
    const newValue = this.getSelectedOptions().length;
    this.badge = { ...this.badge, value: newValue };
  }

  getSelectedOptions(): IonDropdownOption[] {
    return (this.visibleOptions || []).filter(
      (option: IonDropdownOption) => option.selected
    );
  }

  updateLabel(): void {
    this.placeholder = this.label();
    this.iconPlaceholder = '';

    if (this.firstCheck) {
      this.firstUpdateLabel();
      return;
    }

    if (this.multiple() || (this.options() && this.options().length === 0)) {
      return;
    }

    const [selectedOption] = this.getSelectedOptions();
    if (!selectedOption) {
      return;
    }

    this.placeholder = selectedOption.label;
    this.iconPlaceholder = selectedOption.icon as string;
  }

  private updateDropdownWithIcon(): void {
    if ((this.options() && !this.options().length) || !this.options()) {
      return;
    }
    this.dropdownWithIcon = !!this.options()[0].icon;
  }

  firstUpdateLabel(): void {
    if (!this.multiple() && this.options()) {
      const optionSelected = this.options().find(option => option.selected);
      if (optionSelected) {
        this.placeholder = optionSelected.label || '';
        this.iconPlaceholder = optionSelected.icon || '';
      }
    } else {
      this.placeholder = this.label();
      this.iconPlaceholder = '';
    }
    this.firstCheck = false;
  }

  ngDoCheck(): void {
    this.updateLabel();
    this.setBadgeValue();
    this.updateDropdownWithIcon();
  }

  ngOnInit(): void {
    this.chipId = generateIDs('chip-', 'chip');
    this.dropdownId = generateIDs('dropdown-', 'dropdown');
    const selecteds = this.getSelectedOptions();
    if (selecteds && this.multiple()) {
      this.setBadgeValue();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.visibleOptions = changes['options'].currentValue;
    }
  }
}
