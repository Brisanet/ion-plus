import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  viewChild,
} from '@angular/core';
import { IconType, IonIconComponent } from '../icon';
import { IonAlertProps, IonAlertStatus } from './types';

export const alertIconTypes: Record<IonAlertStatus, IconType> = {
  success: 'check-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  negative: 'close-solid',
};

@Component({
  selector: 'ion-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  imports: [CommonModule, IonIconComponent],
  host: { '[attr.data-type]': 'type()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonAlertComponent {
  message = input<IonAlertProps['message']>();
  customBody = input<IonAlertProps['customBody']>();
  description = input<IonAlertProps['description']>();
  closable = input<IonAlertProps['closable']>(false);
  hideBackground = input<IonAlertProps['hideBackground']>(false);
  noRadius = input<IonAlertProps['noRadius']>(false);
  type = input<IonAlertProps['type']>('success');

  ionAlert = viewChild<ElementRef>('ionAlert');

  iconType = computed<IconType>(() => alertIconTypes[this.type()]);

  closeEvent(): void {
    this.ionAlert()?.nativeElement.remove();
  }
}
