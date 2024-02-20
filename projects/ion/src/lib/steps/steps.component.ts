import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IonIconComponent } from '../icon';
import { IonStepsProps, Status, Step, StepStatusType } from './types';

@Component({
  standalone: true,
  selector: 'ion-steps',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class IonStepsComponent implements OnInit, OnChanges {
  @Input() current: IonStepsProps['current'] = 1;
  @Input({ required: true }) steps!: IonStepsProps['steps'];
  @Input() disabled: IonStepsProps['disabled'] = false;
  @Input() clickable: IonStepsProps['clickable'] = false;
  @Output() indexChange: IonStepsProps['indexChange'] =
    new EventEmitter<number>();
  public FIRST_STEP = 1;
  private firstCatchStatus = true;

  ngOnInit(): void {
    this.generateIndexesForStep();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { current } = changes;
    if (current && !current.firstChange) {
      this.changeStep(current.currentValue);
    }
  }

  public handleClick(index: number | undefined): void {
    if (index && this.clickable && !this.disabled) {
      this.goToStep(index);
    }
  }

  private goToStep(index: number) {
    this.indexChange.emit(index);
    this.changeStep(index);
  }

  private stepStatus(step: Step, currentIndex: number): StepStatusType {
    if (step.index && step.index < currentIndex) return Status.checked;
    if (step.index === currentIndex) return Status.selected;
    return Status.default;
  }

  private checkStartedStatus(step: Step, currentIndex: number): StepStatusType {
    return step.status ? step.status : this.stepStatus(step, currentIndex);
  }

  private changeStep(currentIndex: number): void {
    if (currentIndex < 1 || currentIndex > this.steps.length) {
      return;
    }

    this.steps = this.steps.map(step => {
      return {
        ...step,
        status: this.firstCatchStatus
          ? this.checkStartedStatus(step, currentIndex)
          : this.stepStatus(step, currentIndex),
      };
    });

    this.firstCatchStatus = false;
  }

  private generateIndexesForStep(): void {
    this.steps.forEach((step, index) => {
      step.index = index + 1;
    });
    this.changeStep(this.current);
  }
}
