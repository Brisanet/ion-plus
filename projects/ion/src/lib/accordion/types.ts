import { EventEmitter, TemplateRef } from '@angular/core';
import { SafeAny } from '../utils/safe-any';

export type AccordionItem<T = SafeAny> = T;

export type AccordionItemOutput<T = SafeAny> = T & {
  key: number;
  show: boolean;
};

export interface IonAccordionItemProps {
  /**
   * Accordion Header.
   * @param templateHeader - Template component to shows at accordion, regardless of whether it's collapsed or expanded.
   * @type {TemplateRef<HTMLElement>}
   * @example
   * <ion-accordion-item [templateHeader] = `templateHeaderName` />
   */
  templateHeader: TemplateRef<HTMLElement>;

  /**
   * Accordion data.
   * @param data - Data with accordion content.
   * @type {Record<string, SafeAny>}
   * @example
   * <ion-accordion-item [data] = `data` />
   */
  data: Record<string, SafeAny>;

  /**
   * Accordion show.
   * @param show - Determinates if accordion is collapsed or expanded.
   * @type {boolean}
   * @default false
   * @example
   * <ion-accordion-item show = false />
   */
  show: boolean;

  /**
   * Accordion activeChange
   * @event IonAccordionItemComponent#activeChange - Event triggered when acordion is expanded or collapsed.
   * @type {EventEmitter<void>}
   * @description This event is triggered when acordion is expanded or collapsed. It emits an empty value.
   * @example
   * <ion-accordion-item (activeChange) = "yourFunction()"/>
   */
  activeChange: EventEmitter<void>;
}

export interface IonAccordionProps {
  /**
   * Accordions data
   * @param accordions - Array of object content to display at accordion. The way it's show can be custom at templates component.
   * @type {Array<object>}
   * @example
   * <ion-accordion [accordions]="[{title: 'Accordion title', content: 'Content text when expanded'}]" />
   */
  accordions: AccordionItem[];

  /**
   * Accordion Header.
   * @param templateHeader - Template component to shows at accordion, regardless of whether it's collapsed or expanded.
   * @type {TemplateRef<HTMLElement>}
   * @example
   * <ion-accordion [templateHeader] = `templateHeaderName` />
   */
  templateHeader: TemplateRef<HTMLElement>;

  /**
   * Accordion Body.
   * @param templateBody - Template component to shows at accordion when it is expanded.
   * @type {TemplateRef<HTMLElement>}
   * @example
   * <ion-accordion [templateBody] = `templateBodyame` />
   */
  templateBody: TemplateRef<HTMLElement>;

  /**
   * Accordion mode.
   * @param modeAccordion - Determinants that once an accordion is expanded, all others can be collapsed or not.
   * @type {boolean}
   * @default true
   * @example
   * <ion-accordion-item modeAccordion = true />
   */
  modeAccordion: boolean;

  /**
   * Accordion activeChange
   * @event IonAccordionComponent#activeChange - Event triggered when acordion is expanded or collapsed.
   * @type {EventEmitter<AccordionItemOutput>}
   * @description This event is triggered when acordion is expanded or collapsed. It emits an empty value.
   * @example
   * <ion-accordion (activeChange) = "yourFunction()"/>
   */
  activeChange: EventEmitter<AccordionItemOutput>;
}
