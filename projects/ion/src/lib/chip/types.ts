import { BadgeStatus } from '../badge/types';
import { IonDropdownOption } from '../../public-api';

export type ChipSize = 'sm' | 'md';

export interface ChipEvent {
  selected: boolean;
  disabled?: boolean;
  closeDropdown?: boolean;
}

export interface IonChipProps {
  label: string;
  disabled: boolean;
  size: ChipSize;
  chipSelected: ChipEvent;
  options: IonDropdownOption[];
  icon: string;
  multiple: boolean;
  infoBadge: InfoBadge;
  iconPosition: string;
  rightBadge: RightBadge;
  hasDropdown: boolean;
  required: boolean;
  dropdownEvents: IonDropdownOption[];
}

export type Badge = {
  value: number;
};

export interface RightBadge {
  render: boolean;
  label: string;
  type: 'primary' | 'secondary' | 'neutral' | 'negative';
}

export interface InfoBadge {
  render: boolean;
  type: BadgeStatus;
}
