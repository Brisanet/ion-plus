import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SafeAny } from '../../utils/safe-any';
import { IonTooltipComponent } from '../component/tooltip.component';
import { IonTooltipService } from '../service/tooltip.service';
import { TooltipColorScheme, TooltipPosition, TooltipTrigger } from '../types';
import { getPositions } from '../utils/utilsTooltip';

@Directive({
  standalone: true,
  selector: '[ionTooltip]',
})
export class IonTooltipDirective implements OnDestroy, OnInit {
  @Input() ionTooltipTitle = '';
  @Input() ionTooltipTemplateRef!: TemplateRef<void>;
  @Input() ionTooltipColorScheme: TooltipColorScheme = 'dark';
  @Input() ionTooltipPosition: TooltipPosition = TooltipPosition.TOP_CENTER;
  @Input() ionTooltipArrowPointAtCenter = true;
  @Input() ionTooltipTrigger: TooltipTrigger = TooltipTrigger.HOVER;
  @Input() ionTooltipShowDelay = 0;

  public subscription$!: Subscription;
  private componentRef: ComponentRef<IonTooltipComponent> | null = null;
  private delayTimeout!: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private elementRef: ElementRef,
    private tooltipService: IonTooltipService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.tooltipService.reposition.subscribe(() => {
      if (!this.isComponentRefNull()) {
        this.setComponentPosition();
      }
    });
  }

  isComponentRefNull(): boolean {
    return this.componentRef === null;
  }

  isTooltipTrigger(trigger: TooltipTrigger): boolean {
    return this.ionTooltipTrigger === trigger;
  }

  createComponent(): HTMLElement {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        IonTooltipComponent
      );

    this.componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);

    return (this.componentRef.hostView as EmbeddedViewRef<SafeAny>)
      .rootNodes[0];
  }

  setComponentProperties(): void {
    if (!this.isComponentRefNull() && this.componentRef) {
      this.componentRef.instance.ionTooltipTitle = this.ionTooltipTitle;
      this.componentRef.instance.ionTooltipTemplateRef =
        this.ionTooltipTemplateRef;
      this.componentRef.instance.ionTooltipColorScheme =
        this.ionTooltipColorScheme;
      this.componentRef.instance.ionTooltipPosition = this.ionTooltipPosition;

      this.delayTimeout = window.setTimeout(
        this.showTooltip.bind(this),
        this.ionTooltipShowDelay
      );
      this.setComponentPosition();
    }
  }

  setComponentPosition(): void {
    const { left, right, top, bottom } =
      this.elementRef.nativeElement.getBoundingClientRect();

    const hostPositions = { left, right, top, bottom };

    this.tooltipService.setHostPosition(hostPositions);

    const positions = getPositions(
      hostPositions,
      this.ionTooltipArrowPointAtCenter
    );

    if (this.componentRef) {
      const positionInstance = this.componentRef.instance.ionTooltipPosition;
      if (positionInstance) {
        this.componentRef.instance.left = positions[positionInstance].left;
        this.componentRef.instance.top = positions[positionInstance].top;
      }
    }
  }

  attachComponentToView(): void {
    if (this.ionTooltipTitle || this.ionTooltipTemplateRef) {
      document.body.appendChild(this.createComponent());
      this.setComponentProperties();
    }
  }

  showTooltip(): void {
    if (!this.isComponentRefNull() && this.componentRef) {
      this.componentRef.instance.ionTooltipVisible = true;
    }
  }

  shouldAttachComponent(): boolean {
    const ionDropdownElement =
      this.elementRef.nativeElement.querySelector('ion-dropdown');

    return this.isComponentRefNull() && !ionDropdownElement;
  }

  destroyComponent(): void {
    if (!this.isComponentRefNull() && this.componentRef) {
      window.clearTimeout(this.delayTimeout);
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    if (
      this.shouldAttachComponent() &&
      this.isTooltipTrigger(TooltipTrigger.HOVER)
    ) {
      this.attachComponentToView();
    }
  }

  @HostListener('click') onClick(): void {
    if (this.isTooltipTrigger(TooltipTrigger.CLICK)) {
      this.shouldAttachComponent()
        ? this.attachComponentToView()
        : this.destroyComponent();
    } else {
      this.destroyComponent();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.isTooltipTrigger(TooltipTrigger.HOVER)) {
      this.destroyComponent();
    }
  }

  @HostListener('window:scroll') onScroll(): void {
    this.destroyComponent();
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    this.subscription$.unsubscribe();
  }
}
