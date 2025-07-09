import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { IonAccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionItem, IonAccordionProps } from './types';

@Component({
  imports: [CommonModule, IonAccordionItemComponent],
  selector: 'ion-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonAccordionComponent {
  accordions = model.required<IonAccordionProps['accordions']>();
  modeAccordion = input<IonAccordionProps['modeAccordion']>(true);
  templateBody = input.required<IonAccordionProps['templateBody']>();
  templateHeader = input.required<IonAccordionProps['templateHeader']>();

  activeChange = output<AccordionItem>();

  public toggle(index: number): void {
    const state: boolean = this.accordions()[index].show;

    if (this.modeAccordion()) {
      this.closeAccordions();
    }

    this.accordions()[index].show = !state;

    this.activeChange.emit(this.accordions()[index]);
  }

  private closeAccordions(): void {
    this.accordions().forEach(accordion => (accordion.show = false));
  }

  public generateContext(element: SafeAny): SafeAny {
    return {
      $implicit: element,
    };
  }
}
