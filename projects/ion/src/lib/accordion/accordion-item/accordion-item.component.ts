import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { IonIconComponent } from '../../icon';
import { SafeAny } from '../../utils/safe-any';
import { IonAccordionItemProps } from '../types';

@Component({
  imports: [CommonModule, IonIconComponent],
  selector: 'ion-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonAccordionItemComponent {
  templateHeader = input.required<IonAccordionItemProps['templateHeader']>();
  data = input<IonAccordionItemProps['data']>();
  show = model<IonAccordionItemProps['show']>(false);

  public iconSize = 24;

  public toggle(): void {
    this.show.set(!this.show());
  }

  public generateContext(element: SafeAny): SafeAny {
    return {
      $implicit: element,
    };
  }
}
