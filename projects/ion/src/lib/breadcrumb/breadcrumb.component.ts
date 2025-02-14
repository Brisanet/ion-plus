import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IonIconComponent, IonIconProps } from '../icon';
import { BreadcrumbItem, BreadcrumbProps } from './types';

@Component({
  selector: 'ion-breadcrumb',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonBreadcrumbComponent {
  breadcrumbs = input.required<BreadcrumbProps['breadcrumbItems']>();
  selected = output<BreadcrumbItem>();

  icon: Pick<IonIconProps, 'type' | 'size'> = { type: 'right2', size: 16 };

  onSelected(selectedBreadcrumb: BreadcrumbItem): void {
    if (
      selectedBreadcrumb !== this.breadcrumbs()[this.breadcrumbs().length - 1]
    ) {
      this.selected.emit(selectedBreadcrumb);
    }
  }
}
