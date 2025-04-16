import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  HostListener,
  Inject,
  model,
  OnDestroy,
  output,
  ViewContainerRef,
} from '@angular/core';

import { IonPositionService } from '../position/position.service';
import { IonPositions } from '../position/types';
import { getPositionsPopover } from '../utils/popover';
import { SafeAny } from './../utils/safe-any';
import { IonPopoverComponent } from './component/popover.component';
import { PopoverDirectiveProps, PopoverTrigger } from './types';

@Directive({
  selector: '[ionPopover]',
  standalone: true,
})
export class IonPopoverDirective implements OnDestroy {
  ionPopoverTitle = model<PopoverDirectiveProps['ionPopoverTitle']>('');
  ionPopoverKeep = model<PopoverDirectiveProps['ionPopoverKeep']>(false);
  ionPopoverBody = model<PopoverDirectiveProps['ionPopoverBody']>(null);
  ionPopoverActions = model<PopoverDirectiveProps['ionPopoverActions']>();
  ionPopoverIcon = model<PopoverDirectiveProps['ionPopoverIcon']>('');
  ionPopoverIconColor = model<PopoverDirectiveProps['ionPopoverIconColor']>('');
  ionPopoverIconClose =
    model<PopoverDirectiveProps['ionPopoverIconClose']>(false);
  ionPopoverPosition = model<PopoverDirectiveProps['ionPopoverPosition']>(
    IonPositions.BOTTOM_LEFT
  );
  ionPopoverArrowPointAtCenter =
    model<PopoverDirectiveProps['ionPopoverArrowPointAtCenter']>(true);
  ionPopoverCustomClass =
    model<PopoverDirectiveProps['ionPopoverCustomClass']>();
  ionPopoverTrigger = model<PopoverDirectiveProps['ionPopoverTrigger']>(
    PopoverTrigger.DEFAULT
  );
  ionPopoverClose = model<PopoverDirectiveProps['ionPopoverClose']>();
  ionPopoverStopCloseOnScroll =
    model<PopoverDirectiveProps['ionPopoverStopCloseOnScroll']>(false);
  ionOnFirstAction = output<PopoverDirectiveProps['ionOnFirstAction']>();
  ionOnSecondAction = output<PopoverDirectiveProps['ionOnSecondAction']>();
  ionOnClose = output<PopoverDirectiveProps['ionOnClose']>();

  private popoverComponentRef: ComponentRef<IonPopoverComponent> | null = null;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private appRef: ApplicationRef,
    private positionService: IonPositionService,
    private readonly viewRef: ViewContainerRef,
    private elementRef: ElementRef,
    private injector: EnvironmentInjector
  ) {}

  open(): void {
    this.closeAllPopovers();
    this.createPopover();
  }

  createPopover(): void {
    this.popoverComponentRef = this.viewRef.createComponent(
      IonPopoverComponent,
      { injector: this.injector }
    );

    const popoverElement = this.popoverComponentRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popoverElement);

    this.popoverComponentRef.changeDetectorRef.detectChanges();
    this.updatePopoverDirectiveProps(this.popoverComponentRef.instance);

    this.showPopover();
    this.setComponentPosition();

    if (this.ionPopoverClose()) {
      this.ionPopoverClose()!.subscribe(() => {
        this.closeAllPopovers();
        this.ionOnClose.emit();
      });
    }
  }

  updatePopoverDirectiveProps(popoverInstance: IonPopoverComponent): void {
    popoverInstance.ionPopoverTitle.set(this.ionPopoverTitle());
    popoverInstance.ionPopoverKeep.set(this.ionPopoverKeep());
    popoverInstance.ionPopoverBody.set(this.ionPopoverBody());
    popoverInstance.ionPopoverActions.set(this.ionPopoverActions());
    popoverInstance.ionPopoverIcon.set(this.ionPopoverIcon());
    popoverInstance.ionPopoverIconColor.set(this.ionPopoverIconColor());
    popoverInstance.ionPopoverIconClose.set(this.ionPopoverIconClose());
    popoverInstance.ionPopoverPosition.set(this.ionPopoverPosition());
    popoverInstance.ionPopoverCustomClass.set(this.ionPopoverCustomClass());

    popoverInstance.ionOnFirstAction.subscribe(() => {
      this.handlePopoverAction(0);
      this.ionOnFirstAction.emit();
    });

    popoverInstance.ionOnSecondAction.subscribe(() => {
      this.handlePopoverAction(1);
      this.ionOnSecondAction.emit();
    });

    popoverInstance.ionOnClose.subscribe(() => {
      this.handlePopoverAction(2);
      this.ionOnClose.emit();
    });
  }

  handlePopoverAction(index: number): void {
    const actions = this.ionPopoverActions();
    const action = actions && actions[index];
    if (!action || !action.keepOpenAfterAction) {
      this.destroyComponent();
    }
  }

  setComponentPosition(): void {
    const hostElement = this.elementRef.nativeElement.getBoundingClientRect();
    this.positionService.setHostPosition(hostElement);
    this.positionService.setChoosedPosition(this.ionPopoverPosition());
    this.positionService.setPointAtCenter(
      this.ionPopoverArrowPointAtCenter() as boolean
    );

    const popoverElement =
      this.popoverComponentRef?.instance.popover?.nativeElement;
    if (popoverElement) {
      const popoverRect = popoverElement.getBoundingClientRect();
      this.positionService.setComponentCoordinates(popoverRect);
    }

    const ionPopoverPosition =
      this.positionService.getNewPosition(getPositionsPopover);

    if (ionPopoverPosition) {
      const props = {
        top: ionPopoverPosition.top + window.scrollY,
        left: ionPopoverPosition.left + window.scrollX,
        position: 'absolute',
        ionPopoverTrigger: this.ionPopoverTrigger(),
      };

      Object.assign(this.popoverComponentRef!.instance, props);
    }
  }

  showPopover(): void {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.instance.ionPopoverVisible = true;
    }
  }

  closeAllPopovers(): void {
    const existingPopovers = this.document.querySelectorAll('ion-popover');
    existingPopovers?.forEach((popover: SafeAny) => popover.remove());
    this.destroyComponent();
  }

  elementIsEnabled(element: HTMLElement): boolean {
    const disabled = element.getAttribute('ng-reflect-disabled');
    return !disabled || disabled === 'false';
  }

  @HostListener('click') onClick(): void {
    this.handlePopoverTrigger(PopoverTrigger.DEFAULT);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.handlePopoverTrigger(PopoverTrigger.HOVER);
    if (
      this.isPopoverTrigger(PopoverTrigger.HOVER) &&
      this.popoverComponentRef
    ) {
      this.popoverComponentRef.location.nativeElement.addEventListener(
        'mouseleave',
        (e: MouseEvent) => this.handleHoverOutside(e)
      );
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(
    event: MouseEvent
  ): void {
    if (this.isPopoverTrigger(PopoverTrigger.HOVER)) {
      this.handleHoverOutside(event);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !this.ionPopoverStopCloseOnScroll() &&
      !target?.closest('ion-popover')
    ) {
      this.destroyComponent();
    }
  }

  handleHoverOutside(event: MouseEvent): void {
    if (!this.popoverComponentRef) return;

    const popoverElement = this.popoverComponentRef.location.nativeElement;
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;
    const relatedTarget = event.relatedTarget as Node;

    const isInside =
      popoverElement.contains(relatedTarget) ||
      hostElement.contains(relatedTarget);

    if (!isInside) {
      this.destroyComponent();
    }
  }

  handlePopoverTrigger(trigger: PopoverTrigger): void {
    const hostElement = this.viewRef.element.nativeElement as HTMLElement;

    if (this.isPopoverTrigger(trigger) && this.elementIsEnabled(hostElement)) {
      this.open();
    }
  }

  destroyComponent(): void {
    if (this.popoverComponentRef) {
      this.appRef.detachView(this.popoverComponentRef.hostView);
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
  }

  isPopoverTrigger(trigger: PopoverTrigger): boolean {
    return this.ionPopoverTrigger() === trigger;
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
