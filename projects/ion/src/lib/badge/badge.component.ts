import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { IonIconComponent } from '../icon';
import { IonBadgeProps } from './types';

const ICON_SIZE = {
  xs: 0,
  sm: 12,
  md: 16,
};

@Component({
  selector: 'ion-badge',
  imports: [IonIconComponent],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  host: {
    '[attr.data-type]': 'type()',
    '[class.ion-dot-badge]': 'dot()',
    '[attr.data-testid]': `'ion-badge-' + label()`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonBadgeComponent {
  dot = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  type = input<IonBadgeProps['type']>('primary');
  label = input<IonBadgeProps['label']>('');
  icon = input<IonBadgeProps['icon']>();
  size = input<IonBadgeProps['size']>('xs');
  status = input<IonBadgeProps['status']>('primary');
  customColor = input<IonBadgeProps['customColor']>();

  showLabel = computed(
    () => this.label() && (!this.icon() || this.size() === 'xs')
  );
  showIcon = computed(() => !!this.icon() && this.size() !== 'xs');
  iconSize = computed(() => ICON_SIZE[this.size()]);
  displayLabel = computed(() => {
    return Number(this.label()) > 99 ? '99+' : this.label();
  });

  defaultDotSize = 8;
  defaultIconColor = '#FCFCFD';
}
