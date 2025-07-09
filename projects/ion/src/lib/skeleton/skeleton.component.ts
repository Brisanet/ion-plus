import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { IonSkeletonProps } from './types';

@Component({
  selector: 'ion-skeleton',
  standalone: true,
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonSkeletonComponent {
  radius = input<IonSkeletonProps['radius']>();
  width = input<IonSkeletonProps['width']>(50);
  height = input<IonSkeletonProps['height']>(50);

  properties = computed(() => ({
    width: this.convertUnit(this.width()),
    height: this.convertUnit(this.height()),
    borderRadius: this.convertUnit(this.radius()),
  }));

  private isString(value?: number | string): value is string {
    return typeof value === 'string';
  }

  private convertUnit(value?: number | string): string | undefined {
    if (value === undefined) return value;

    return this.isString(value) ? value : `${value}px`;
  }
}
