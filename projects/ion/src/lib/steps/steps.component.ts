
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
} from '@angular/core';
import { IonIconComponent } from '../icon';
import { IonStepsProps, Status, StepStatusType } from './types';

@Component({
  selector: 'ion-steps',
  imports: [IonIconComponent],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonStepsComponent {
  steps = input.required<IonStepsProps['steps']>();
  current = model<IonStepsProps['current']>(1);
  currentChange = output<IonStepsProps['current']>();
  disabled = input<IonStepsProps['disabled']>(false);
  clickable = input<IonStepsProps['clickable']>(false);

  constructor() {
    effect(
      () => {
        if (this.current() < this.FIRST_STEP) this.current.set(this.FIRST_STEP);
        if (this.current() > this.steps().length)
          this.current.set(this.steps().length);
      },
      { allowSignalWrites: true }
    );
  }

  displaySteps = computed(() => {
    const steps = this.steps().map((step, index) => ({
      ...step,
      index: index + 1,
      status:
        this.isFirstComputed && step.status
          ? step.status
          : this.stepStatus(index + 1, this.current()),
    }));
    this.isFirstComputed = false;
    return steps;
  });

  public FIRST_STEP = 1;
  public isFirstComputed = true;

  public handleClick(index?: number): void {
    if (index && this.clickable() && !this.disabled()) {
      this.goToStep(index);
    }
  }

  private goToStep(index: number) {
    this.current.set(index);
    this.currentChange.emit(index);
  }

  private stepStatus(stepIndex: number, currentIndex: number): StepStatusType {
    if (stepIndex && stepIndex < currentIndex) return Status.checked;
    if (stepIndex === currentIndex) return Status.selected;
    return Status.default;
  }
}
