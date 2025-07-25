import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Inject,
  Injector,
  input,
  OnDestroy,
  output,
  ViewContainerRef,
} from '@angular/core';

import { SafeAny } from '../../utils/safe-any';
import { IonPopConfirmComponent } from '../component/popconfirm.component';
import { IonPopConfirmProps, PopConfirmStatusType } from '../types';

export interface PopPosition {
  top: number;
  left: number;
  width: number;
  hostHeight?: number;
}

export interface PopOffset {
  top: number;
  left: number;
  width: number;
  screenOffset: number;
}

@Directive({
  standalone: true,
  selector: '[ionPopConfirm]',
})
export class IonPopConfirmDirective implements OnDestroy {
  public ionPopConfirmTitle =
    input<IonPopConfirmProps['ionPopConfirmTitle']>('Tem certeza?');
  public ionPopConfirmDesc = input<string>('');
  public ionPopConfirmType = input<PopConfirmStatusType>('warning');
  public ionConfirmText =
    input<IonPopConfirmProps['ionConfirmText']>('Confirmar');
  public ionCancelText = input<IonPopConfirmProps['ionCancelText']>('Cancelar');

  public ionOnConfirm = output<void>();
  public ionOnClose = output<void>();

  private IonPopConfirmComponentRef!: ComponentRef<IonPopConfirmComponent> | null;
  private isBottomIcon = false;
  private marginBetweenComponents = 10;
  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {}

  open(): void {
    this.closeAllPopsConfirm();
    this.createPopConfirm();
    if (this.IonPopConfirmComponentRef) {
      this.IonPopConfirmComponentRef.instance.ionOnClose.subscribe(() => {
        this.closePopConfirm();
        this.ionOnClose.emit();
      });
    }
  }

  closePopConfirm(): void {
    if (this.IonPopConfirmComponentRef) {
      this.appRef.detachView(this.IonPopConfirmComponentRef.hostView);
      this.IonPopConfirmComponentRef.destroy();
      this.IonPopConfirmComponentRef = null;
    }
  }

  setPosition(
    element: HTMLElement,
    docWidth: number,
    position: PopPosition
  ): PopOffset {
    const popConfirmWidth = element.offsetWidth;

    const arrowSpacing = 24;

    const offsetToLeft =
      position.left + arrowSpacing - popConfirmWidth + position.width / 2;

    const offsetToRight = position.left - arrowSpacing + position.width / 2;

    const screenOffset = docWidth - position.left;

    const leftOffset =
      screenOffset < popConfirmWidth ? offsetToLeft : offsetToRight;

    const indicatorIcon = 9;

    const elementSize = element.offsetHeight + indicatorIcon;

    this.isBottomIcon = false;

    if (this.isBiggerThenWindow(position, elementSize)) {
      this.isBottomIcon = true;
      this.setUpPositionPopconfirm(position, elementSize);
    }

    const scrollDocument = document.scrollingElement
      ? document.scrollingElement.scrollTop
      : 0;

    const offset = {
      top: position.top + scrollDocument,
      left: leftOffset,
      width: popConfirmWidth,
      screenOffset: screenOffset,
    };

    return offset;
  }

  isBiggerThenWindow(position: PopPosition, elementSize: number): boolean {
    return position.top + elementSize >= window.innerHeight;
  }

  setUpPositionPopconfirm(position: PopPosition, elementSize: number): void {
    position.top =
      position.top -
      elementSize -
      (position.hostHeight || 0) -
      this.marginBetweenComponents;
  }

  closeAllPopsConfirm(): void {
    const existingPopConfirms = document.querySelectorAll('ion-popconfirm');
    if (existingPopConfirms) {
      this.closePopConfirm();
      existingPopConfirms.forEach(popConfirm => {
        popConfirm.remove();
      });
    }
  }

  createPopConfirm(): void {
    const popover = this.componentFactoryResolver
      .resolveComponentFactory(IonPopConfirmComponent)
      .create(this.injector);

    this.IonPopConfirmComponentRef = popover;

    this.appRef.attachView(this.IonPopConfirmComponentRef.hostView);
    this.IonPopConfirmComponentRef.changeDetectorRef.detectChanges();

    const popconfirmElement = this.IonPopConfirmComponentRef.location
      .nativeElement as HTMLElement;

    this.document.body.appendChild(popconfirmElement);

    this.IonPopConfirmComponentRef.setInput(
      'ionPopConfirmTitle',
      this.ionPopConfirmTitle()
    );
    this.IonPopConfirmComponentRef.setInput(
      'ionPopConfirmDesc',
      this.ionPopConfirmDesc
    );

    this.IonPopConfirmComponentRef.setInput(
      'ionPopConfirmType',
      this.ionPopConfirmType
    );

    this.IonPopConfirmComponentRef.setInput(
      'ionConfirmText',
      this.ionConfirmText
    );

    this.IonPopConfirmComponentRef.setInput(
      'ionCancelText',
      this.ionCancelText
    );

    this.IonPopConfirmComponentRef.instance.ionOnConfirm.subscribe(() => {
      this.closePopConfirm();
      this.ionOnConfirm.emit();
    });
  }

  setStyle(element: HTMLElement, offset: PopOffset): void {
    const supContainerEl = document.querySelector('.sup-container');
    if (!supContainerEl) {
      return;
    }
    element.style.position = 'absolute';
    element.style.left = offset.left + 'px';
    element.style.top = offset.top + 'px';

    if (offset.screenOffset < offset.width) {
      supContainerEl.classList.replace('sup-container', 'sup-container-right');
    }

    if (this.isBottomIcon) {
      supContainerEl.classList.add('sup-container-bottom');
    }
  }

  elementChildIsEnabled(element: HTMLElement): boolean {
    if (!element.firstElementChild) {
      return true;
    }
    return element.firstElementChild.getAttribute('disabled') !== '';
  }

  elementChildIsLoading(element: HTMLElement): boolean {
    if (!element.firstElementChild) {
      return false;
    }
    return element.firstElementChild.getAttribute('loading') === 'true';
  }

  hostElementIsEnabled(element: HTMLElement): boolean {
    return element.getAttribute('disabled') !== '';
  }

  elementsAreEnabled(element: HTMLElement): boolean {
    return (
      this.elementChildIsEnabled(element) &&
      !this.elementChildIsLoading(element) &&
      this.hostElementIsEnabled(element)
    );
  }

  ngOnDestroy(): void {
    this.closePopConfirm();
  }

  @HostListener('click') onClick(): void {
    const docWidth = document.body.clientWidth;

    const hostElement = this.viewRef.element.nativeElement as HTMLElement;

    const position = hostElement.getBoundingClientRect() as DOMRect;

    if (this.elementsAreEnabled(hostElement)) {
      this.open();

      requestAnimationFrame(() => {
        const popconfirmElement = document.querySelector(
          '.sup-container'
        ) as HTMLElement;

        if (popconfirmElement) {
          const offsetPosition = this.setPosition(popconfirmElement, docWidth, {
            top: position.top + position.height,
            left: position.left,
            width: position.width,
            hostHeight: position.height,
          });
          this.setStyle(popconfirmElement, offsetPosition);
        }
      });
    }
  }
}
