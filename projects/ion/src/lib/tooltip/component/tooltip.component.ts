import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IonTooltipService } from '../service/tooltip.service';
import { IonTooltipProps, TooltipPosition } from '../types';

@Component({
  standalone: true,
  selector: 'ion-tooltip',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class IonTooltipComponent implements AfterViewChecked {
  @ViewChild('tooltip', { static: true }) tooltip!: ElementRef;
  ionTooltipTitle!: IonTooltipProps['ionTooltipTitle'];
  ionTooltipTemplateRef!: IonTooltipProps['ionTooltipTemplateRef'];
  ionTooltipColorScheme: IonTooltipProps['ionTooltipColorScheme'] = 'dark';
  ionTooltipPosition: IonTooltipProps['ionTooltipPosition'] =
    TooltipPosition.TOP_CENTER;

  ionTooltipVisible = false;
  left = 0;
  top = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private tooltipService: IonTooltipService
  ) {}

  ngAfterViewChecked(): void {
    this.repositionTooltip();
    this.cdr.detectChanges();
  }

  private repositionTooltip(): void {
    const coordinates = this.tooltip.nativeElement.getBoundingClientRect();

    this.tooltipService.setTooltipCoordinates(coordinates);
    this.tooltipService.setCurrentPosition(this.ionTooltipPosition!);
    this.ionTooltipPosition = this.tooltipService.getNewPosition();
    this.tooltipService.emitReposition();
  }
}
