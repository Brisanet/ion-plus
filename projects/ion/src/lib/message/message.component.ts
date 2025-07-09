import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { IconType, IonIconComponent } from '../icon';
import { IonMessageProps, MessageStatusType } from './types';

const iconTypes: Record<MessageStatusType, IconType> = {
  positive: 'check-solid',
  negative_alert: 'exclamation-solid',
  negative_error: 'close-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  custom: 'plus-solid',
};

@Component({
  selector: 'ion-message',
  imports: [IonIconComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  host: {
    '[attr.data-type]': 'type()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonMessageComponent {
  label = input.required<IonMessageProps['label']>();
  type = input<IonMessageProps['type']>('positive');
  iconType = input<IonMessageProps['iconType']>();

  icon = computed(() => this.iconType() || iconTypes[this.type()]);
}
