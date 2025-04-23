import { CommonModule, NgClass } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  model,
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
import { ClickOutsideDirective } from '../click-outside.directive';

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
    ClickOutsideDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonPopoverComponent implements AfterViewChecked {
  @ViewChild('popover', { static: true }) popover!: ElementRef;

  ionPopoverTitle = model<IonPopoverProps['ionPopoverTitle']>('');
  ionPopoverKeep = model<IonPopoverProps['ionPopoverKeep']>(false);
  ionPopoverBody = model<IonPopoverProps['ionPopoverBody']>(null);
  ionPopoverActions = model<IonPopoverProps['ionPopoverActions']>(undefined);
  ionPopoverIcon = model<IonPopoverProps['ionPopoverIcon']>('');
  ionPopoverPosition = model<IonPopoverProps['ionPopoverPosition']>(
    IonPositions.BOTTOM_LEFT
  );
  ionPopoverIconColor =
    model<IonPopoverProps['ionPopoverIconColor']>(PRIMARY_6);
  ionPopoverIconClose = model<IonPopoverProps['ionPopoverIconClose']>(false);
  ionPopoverCustomClass = model<IonPopoverProps['ionPopoverCustomClass']>('');

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
