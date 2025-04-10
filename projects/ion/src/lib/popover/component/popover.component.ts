import { CommonModule, NgClass } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  IonButtonComponent,
  IonDividerComponent,
  IonIconComponent,
} from '../../../public-api';
import { IonPositionService } from '../../position/position.service';
import { IonPositions } from '../../position/types';
import { IonPopoverProps, PopoverTrigger } from '../types';

const PRIMARY_6 = '#0858ce';

@Component({
  standalone: true,
  selector: 'ion-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  imports: [
    NgClass,
    CommonModule,
    IonIconComponent,
    IonButtonComponent,
    IonDividerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonPopoverComponent implements AfterViewChecked {
  @ViewChild('popover', { static: true }) popover!: ElementRef;

  ionPopoverTitle = signal<IonPopoverProps['ionPopoverTitle']>('');
  ionPopoverKeep = signal<IonPopoverProps['ionPopoverKeep']>(false);
  ionPopoverBody = signal<IonPopoverProps['ionPopoverBody']>(null);
  ionPopoverActions = signal<IonPopoverProps['ionPopoverActions']>(undefined);
  ionPopoverIcon = signal<IonPopoverProps['ionPopoverIcon']>('');
  ionPopoverPosition = signal<IonPopoverProps['ionPopoverPosition']>(
    IonPositions.BOTTOM_LEFT
  );
  ionPopoverIconColor =
    signal<IonPopoverProps['ionPopoverIconColor']>(PRIMARY_6);
  ionPopoverIconClose = signal<IonPopoverProps['ionPopoverIconClose']>(false);
  ionPopoverCustomClass = signal<IonPopoverProps['ionPopoverCustomClass']>('');

  ionPopoverVisible: boolean = false;
  ionPopoverTrigger = PopoverTrigger.DEFAULT;
  left = 0;
  top = 0;
  position!: IonPositions;
  readonly ionOnClose = new Subject<void>();
  readonly ionOnFirstAction = new Subject<void>();
  readonly ionOnSecondAction = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private positionService: IonPositionService
  ) {}

  close(): void {
    this.ionOnClose.next();
  }

  onClickOutside(): void {
    if (
      this.ionPopoverKeep() ||
      this.ionPopoverTrigger === PopoverTrigger.HOVER
    ) {
      return;
    }

    this.close();
  }

  firstAction(): void {
    this.ionOnFirstAction.next();
  }

  secondAction(): void {
    this.ionOnSecondAction.next();
  }

  private repositionPopover(): void {
    const coordinates = this.popover.nativeElement.getBoundingClientRect();

    this.positionService.setComponentCoordinates(coordinates);
    this.positionService.setChoosedPosition(this.ionPopoverPosition());
    this.position = this.positionService.getCurrentPosition() as IonPositions;
  }

  ngAfterViewChecked(): void {
    this.repositionPopover();
    this.cdr.detectChanges();
  }
}
