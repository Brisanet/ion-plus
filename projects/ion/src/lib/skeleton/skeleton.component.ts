import { Component, Input } from '@angular/core';
import { IonSkeletonProps } from './types';

@Component({
  selector: 'ion-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class IonSkeletonComponent {
  @Input({ required: true }) variant!: IonSkeletonProps['variant'];
  @Input() radius?: IonSkeletonProps['radius'];
  @Input() width: IonSkeletonProps['width'] = 50;
  @Input() height: IonSkeletonProps['height'] = 50;

  variantRadius = {
    circular: '50%',
    rect: '0',
  };
}
