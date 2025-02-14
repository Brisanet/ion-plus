import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import { IonIconComponent } from '../icon';
import { IonLinkProps } from './types';

const SIZES = {
  sm: 16,
  md: 24,
};

@Component({
  imports: [CommonModule, IonIconComponent, NgClass],
  selector: 'ion-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonLinkComponent {
  label = input<IonLinkProps['label']>();
  icon = input<IonLinkProps['icon']>();
  iconSide = input<IonLinkProps['iconSide']>('right');
  size = input<IonLinkProps['size']>('sm');
  bold = input<IonLinkProps['bold']>(false);
  disabled = input<IonLinkProps['disabled']>(false);
  target = input<IonLinkProps['target']>('_self');
  link = input<IonLinkProps['link']>();

  ionOnClick = output();

  iconSize = computed(() => SIZES[this.size()]);

  public onClick(): void {
    if (!this.disabled()) {
      this.ionOnClick.emit();
    }
  }
}
