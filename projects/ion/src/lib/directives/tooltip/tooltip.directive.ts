import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { IonTooltipComponent } from './tooltip.component';
import { TooltipPosition, TooltipTrigger } from './types';

@Directive({
  selector: '[ionTooltip]',
})
export class IonTooltipDirective implements OnDestroy {
  public ionTooltipTitle = input<string>();
  public ionTooltipTemplateRef = input<TemplateRef<SafeAny> | null>(null);
  public ionTooltipPosition = input<TooltipPosition>(TooltipPosition.DEFAULT);
  public ionTooltipArrowPointAtCenter = input<boolean>(true);
  public ionTooltipTrigger = input<TooltipTrigger>(TooltipTrigger.DEFAULT);
  public ionTooltipShowDelay = input<number>(0);
  public ionTooltipCustomClass = input<string>();

  private overlayRef: OverlayRef | null = null;
  private componentRef: ComponentRef<IonTooltipComponent> | null = null;
  private delayTimeout!: number;

  private readonly elementRef = inject(ElementRef);
  private readonly overlayPositionBuilder = inject(OverlayPositionBuilder);
  private readonly overlay = inject(Overlay);

  private showTooltip(): void {
    if (this.overlayRef) {
      return;
    }

    if (!this.ionTooltipTitle() && !this.ionTooltipTemplateRef()) {
      return;
    }

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: -5,
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
    const tooltipPortal = new ComponentPortal(IonTooltipComponent);
    const componentRef = this.overlayRef.attach(tooltipPortal);

    if (this.ionTooltipTitle()) {
      componentRef.instance.title = this.ionTooltipTitle;
    }

    if (this.ionTooltipTemplateRef()) {
      componentRef.instance.contentTemplate = this.ionTooltipTemplateRef;
    }

    if (this.ionTooltipShowDelay() > 0) {
      componentRef.setInput('ionTooltipVisible', false);

      this.delayTimeout = window.setTimeout(() => {
        componentRef.setInput('ionTooltipVisible', true);
      }, this.ionTooltipShowDelay());
    }
  }

  isComponentRefNull(): boolean {
    return this.componentRef === null;
  }

  private shouldAttachComponent(): boolean {
    const ionDropdownElement =
      this.elementRef.nativeElement.querySelector('ion-dropdown');

    return this.isComponentRefNull() && !ionDropdownElement;
  }

  @HostListener('click')
  onClick() {
    if (this.overlayRef !== null) {
      this.destroyTooltip();
      return;
    }

    if (this.ionTooltipTrigger() === TooltipTrigger.CLICK) {
      if (this.shouldAttachComponent()) {
        this.showTooltip();
      } else {
        this.destroyTooltip();
      }
    } else {
      this.destroyTooltip();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (
      this.ionTooltipTrigger() === TooltipTrigger.HOVER &&
      this.shouldAttachComponent()
    ) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.ionTooltipTrigger() === TooltipTrigger.HOVER) {
      this.destroyTooltip();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.destroyTooltip();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.destroyTooltip();
  }

  private destroyTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.componentRef = null;

      if (this.delayTimeout) {
        window.clearTimeout(this.delayTimeout);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }
}
