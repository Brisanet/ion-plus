import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { TooltipPosition, TooltipTrigger } from './types';

@Component({
  standalone: true,
  selector: 'ion-tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrl: 'tooltip.component.scss',
  imports: [CommonModule],
})
export class IonTooltipComponent {
  public title = input<string>();
  public contentTemplate = input<TemplateRef<SafeAny> | null>(null);
  public ionTooltipPosition = input<TooltipPosition>(TooltipPosition.DEFAULT);
  public ionTooltipArrowPointAtCenter = input<boolean>(true);
  public ionTooltipTrigger = input<TooltipTrigger>(TooltipTrigger.DEFAULT);
  public ionTooltipShowDelay = input<number>(0);
  public ionTooltipCustomClass = input<string>('');
  public ionTooltipVisible = input<boolean>(true);
}
