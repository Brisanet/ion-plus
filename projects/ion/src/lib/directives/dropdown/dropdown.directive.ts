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
  dropdownOpened = output<IonDropdownProps<T>['dropdownOpened']>();

  private overlayRef: OverlayRef | null = null;
  private dropdownRef?: ComponentRef<IonDropdownComponent<T>>;
  private optionsSubscription?: OutputRefSubscription;
  private optionsRef!: IonDropdownProps<T>['dropdownOptions'];
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

  @HostListener('click', ['$event']) async handleClick(): Promise<void> {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      await this.destroyOverlay();
    }

    if (!this.overlayRef && this.dropdownConfig().shouldRender) {
      this.createOverlay();
    } else {
      await this.destroyOverlay();
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

    this.dropdownRef.instance.dropdownOptionsChange.subscribe(() => {
      this.dropdownOptions().forEach(option => {
        this.optionsRef.forEach(ref => {
          if (option.key === ref.key) {
            ref.selected = option.selected;
          }
        });
      });
      this.dropdownEvent.emit(this.optionsRef);
    });

    this.dropdownOpened.emit(true);
    this.updateProperties();

    this.overlayRef.backdropClick().subscribe(async () => {
      await this.destroyOverlay();
    });
  }

  private async destroyOverlay(): Promise<void> {
    this.dropdownOpened.emit(false);

    await new Promise(resolve => setTimeout(resolve, 50));
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
    this.optionsRef = [...this.dropdownOptions()];
  }
}
