import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

import { IonPositionService } from '../../position/position.service';
import { PopoverPosition, IonPopoverProps, PopoverTrigger } from '../types';

const PRIMARY_6 = '#0858ce';

@Component({
  selector: 'ion-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  exportAs: 'PopoverComponent',
})
export class IonPopoverComponent {
  ionPopoverTitle = input<IonPopoverProps['ionPopoverTitle']>();
  ionPopoverKeep = input<IonPopoverProps['ionPopoverKeep']>(false);
  ionPopoverBody = input.required<IonPopoverProps['ionPopoverBody']>();
  ionPopoverActions = input<IonPopoverProps['ionPopoverActions']>();
  ionPopoverIcon = input<IonPopoverProps['ionPopoverIcon']>();
  ionPopoverIconColor = input<IonPopoverProps['ionPopoverIconColor']>(PRIMARY_6);
  ionPopoverIconClose = input<IonPopoverProps['ionPopoverIconClose']>(false);
  ionPopoverPosition = input<IonPopoverProps['ionPopoverPosition']>(PopoverPosition.DEFAULT);
  ionPopoverCustomClass = input<IonPopoverProps['ionPopoverCustomClass']>();
  
  public ionPopoverTrigger: PopoverTrigger = PopoverTrigger.DEFAULT;

  @Output() ionOnClose = new EventEmitter<void>();
  @Output() ionOnFirstAction = new EventEmitter<void>();
  @Output() ionOnSecondAction = new EventEmitter<void>();

  @ViewChild('popover', { static: true }) popover!: ElementRef<HTMLDivElement>;

  readonly isVisible = signal(false);
  readonly left = signal(0);
  readonly top = signal(0);
  readonly position = signal('');

  readonly popoverStyles = computed(() => ({
    left: `${this.left()}px`,
    top: `${this.top()}px`,
  }));

  readonly popoverClasses = computed(() => {
    return `ion-popover--${this.position()} ${this.ionPopoverCustomClass()}`;
  });

  constructor(private positionService: IonPositionService) {
    effect(() => {
      if (this.isVisible()) {
        queueMicrotask(() => {
          this.updatePosition();
        });
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.popover.nativeElement.contains(event.target as Node);
    if (clickedInside || this.ionPopoverKeep() || this.ionPopoverTrigger === PopoverTrigger.HOVER) {
      return;
    }
    this.close();
  }
  
  // --- Métodos da API Pública ---

  /** Exibe o popover e define sua posição inicial. */
  public show(hostElement: HTMLElement): void {
    this.positionService.setHostPosition(hostElement.getBoundingClientRect());
    this.isVisible.set(true);
  }

  /** Esconde o popover. */
  public close(): void {
    if (this.isVisible()) {
      this.isVisible.set(false);
      this.ionOnClose.emit();
    }
  }

  // --- Métodos de Ação ---

  firstAction(): void {
    this.ionOnFirstAction.emit();
    this.close();
  }

  secondAction(): void {
    this.ionOnSecondAction.emit();
    this.close();
  }

  private updatePosition(): void {
    const popoverRect = this.popover.nativeElement.getBoundingClientRect();
    this.positionService.setComponentCoordinates(popoverRect);
    this.positionService.setChosenPosition(this.ionPopoverPosition());
    
    const newPosition = this.positionService.getNewPosition(getPositionsPopover);
    
    if (newPosition) {
      this.position.set(newPosition.key);
      this.left.set(newPosition.left);
      this.top.set(newPosition.top);
    }
    
    this.positionService.emitReposition();
  }
}