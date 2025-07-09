import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { IonIconComponent } from '../icon';
import { IonTagProps } from './types';

@Component({
  selector: 'ion-tag',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTagComponent {
  label = input.required<IonTagProps['label']>();
  outline = input<IonTagProps['outline']>(true);
  status = input<IonTagProps['status']>('neutral');
  icon = input<IonTagProps['icon']>();
  color = input<IonTagProps['color']>('');

  protected tagType = computed(
    () => `ion-tag ${this.outline() ? 'outline' : ''} ${this.status()}`
  );

  protected getTagColorAndBackground = computed<string>(() =>
    this.validateHexColor(this.color()) ? this.color() : ''
  );

  private validateHexColor(color?: string): boolean {
    return !!(color && /^#(?:[0-9a-fA-F]{3,4}){1,2}$/.test(color));
  }
}
