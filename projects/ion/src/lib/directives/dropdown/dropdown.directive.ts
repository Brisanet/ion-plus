import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  input,
  model,
  OnChanges,
  OnDestroy,
  OutputRefSubscription,
  SimpleChanges,
  output,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { IonDropdownOption, IonDropdownProps } from '.';
import { IonDropdownComponent } from './dropdown.component';

@Directive({
  selector: '[ionDropdown]',
  standalone: true,
})
export class IonDropdownDirective<T extends IonDropdownOption>
  implements OnChanges, OnDestroy
{
  dropdownConfig = input.required<IonDropdownProps<T>['dropdownConfig']>({});
  dropdownLoading = input<IonDropdownProps<T>['dropdownLoading']>(false);
  dropdownOptions = model<IonDropdownProps<T>['dropdownOptions']>([]);
  dropdownEvent = output<IonDropdownProps<T>['dropdownOptions']>();
  private overlayRef: OverlayRef | null = null;
  private dropdownRef?: ComponentRef<IonDropdownComponent<T>>;
  private optionsSubscription?: OutputRefSubscription;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dropdownOptions'] || changes['dropdownLoading']) {
      this.updateProperties();
    }
  }

  ngOnDestroy(): void {
    this.destroyOverlay();
    this.optionsSubscription?.unsubscribe();
  }

  @HostListener('click', ['$event']) handleClick(): void {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.destroyOverlay();
    }

    if (this.overlayRef) {
      this.destroyOverlay();
    } else {
      this.createOverlay();
    }
  }

  private createOverlay(): void {
    const repositionOnScroll = this.overlay.scrollStrategies.reposition();
    const closeOnScroll = this.overlay.scrollStrategies.close();
    const nativeElement = this.elementRef.nativeElement;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(nativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ])
      .withPush(false);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: positionStrategy,
      scrollStrategy: this.dropdownConfig().closeOnScroll
        ? closeOnScroll
        : repositionOnScroll,
    });

    const dropdownComponent = IonDropdownComponent<T>;

    const component = new ComponentPortal(dropdownComponent);

    this.dropdownRef = this.overlayRef.attach(component);
    if (this.dropdownRef) {
      this.optionsSubscription =
        this.dropdownRef.instance.dropdownOptions.subscribe(data => {
          this.dropdownOptions.set(data);
        });
    }
    this.updateProperties();

    this.dropdownRef.instance.dropdownOptionsChange.subscribe(
      (event: IonDropdownProps<T>['dropdownOptions']) => {
        this.dropdownEvent.emit(event);
      }
    );

    this.overlayRef.backdropClick().subscribe(() => {
      this.destroyOverlay();
    });
  }

  private destroyOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private updateProperties(): void {
    if (!this.dropdownRef) return;

    this.dropdownRef.instance.dropdownLoading.set(this.dropdownLoading());
    this.dropdownRef.instance.dropdownConfig.set(this.dropdownConfig());
    this.dropdownRef.instance.dropdownOptions.set(this.dropdownOptions());
  }
}
