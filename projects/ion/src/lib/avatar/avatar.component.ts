import { Component, computed, input } from '@angular/core';

import { IonIconComponent } from '../icon';
import { IconType } from '../icon/types';
import { DefaultImageDirective } from './defaultImage.directive';
import { IonAvatarProps } from './types';

@Component({
  selector: 'ion-avatar',
  imports: [IonIconComponent, DefaultImageDirective],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  host: {
    '[attr.data-size]': 'size()',
  },
})
export class IonAvatarComponent {
  type = input.required<IonAvatarProps['type']>();
  size = input<IonAvatarProps['size']>('md');
  value = input<IonAvatarProps['value']>('');
  image = input<IonAvatarProps['image']>('');
  onErrorImage = input<IonAvatarProps['onErrorImage']>('');
  icon = input<IconType>('union');

  initials = computed(() =>
    this.value().length > 0 ? this.getInitials(this.value()) : '--'
  );

  private getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
