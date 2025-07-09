import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon';
import { SafeAny } from '../utils/safe-any';
import { IonStepsComponent } from './steps.component';
import { IonStepsProps, Step } from './types';

const defaultSteps: Step[] = [
  {
    label: 'Step 1',
  },
  {
    label: 'Step 2',
  },
  {
    label: 'Step 3',
  },
];

const indexChangeMock = jest.fn();

const defaultProps: Partial<IonStepsProps> = {
  current: 1,
  steps: defaultSteps,
  currentChange: {
    emit: indexChangeMock,
  } as SafeAny,
};

const sut = async (
  customProps: Partial<IonStepsProps> = defaultProps
): Promise<HTMLElement> => {
  const { currentChange, ...rest } = customProps;
  await render(IonStepsComponent, {
    componentInputs: { ...rest },
    componentOutputs: { currentChange },
  });
  return screen.findByTestId('ion-steps');
};

describe('Static IonStepsComponent', () => {
  it('should render step component with 3 steps', async () => {
    await sut();
    defaultSteps.forEach(step => {
      expect(screen.getByText(step.label)).toBeTruthy();
    });
  });
  it('should render first checked', async () => {
    await sut({
      ...defaultProps,
      steps: [
        {
          label: 'Step 1',
          status: 'checked',
        },
        {
          label: 'Step 2',
        },
        {
          label: 'Step 3',
        },
      ],
    });
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(screen.getByTestId('step-1-checked')).toHaveClass(
      'ion-step--checked'
    );
  });
  it('should render first step checked and second with error and description', async () => {
    await sut({
      ...defaultProps,
      steps: [
        {
          label: 'Step 1',
          status: 'checked',
        },
        {
          label: 'Step 2',
          status: 'error',
          description: 'Error',
        },
        {
          label: 'Step 3',
        },
      ],
    });
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(screen.getByTestId('step-1-checked')).toHaveClass(
      'ion-step--checked'
    );
    expect(screen.getByTestId('step-2-error')).toBeTruthy();
    expect(screen.getByTestId('step-2-error')).toHaveClass('ion-step--error');
    expect(screen.getByText('Error')).toHaveClass(`ion-step__description`);
  });
  it('should render step component with 3 checked steps', async () => {
    await sut({
      ...defaultProps,
      steps: [
        {
          label: 'Step 1',
          status: 'checked',
        },
        {
          label: 'Step 2',
          status: 'checked',
        },
        {
          label: 'Step 3',
          status: 'checked',
        },
      ],
    });
    const checkedStepsIds = [
      'step-1-checked',
      'step-2-checked',
      'step-3-checked',
    ];
    checkedStepsIds.forEach(id => {
      expect(screen.getByTestId(id)).toBeTruthy();
      expect(screen.getByTestId(id)).toHaveClass('ion-step--checked');
    });
  });
  it('should go to step 3 when it be clicked', async () => {
    await sut({
      ...defaultProps,
      clickable: true,
      disabled: false,
    });
    fireEvent.click(screen.getByTestId('step-3-default'));
    expect(screen.findByTestId('step-3-selected')).toBeTruthy();
    expect(screen.getByTestId('step-3-selected')).toHaveClass(
      'ion-step--selected'
    );
  });
});

@Component({
  standalone: true,
  template: `<ion-steps [steps]="steps" [(current)]="current"></ion-steps>`,
  imports: [IonStepsComponent, IonIconComponent],
})
class TestHostComponent {
  steps: Step[] = defaultSteps;
  current = 1;
}

describe('Passing through the IonStepsComponent', () => {
  let fixture: SafeAny, testHost: SafeAny;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should pass from step 1 to step 2', async () => {
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
    expect(screen.getByTestId('step-2-default')).toBeTruthy();
    testHost.current = 2;
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(screen.getByTestId('step-2-selected')).toBeTruthy();
  });
  it('should back from step 2 to step 1', async () => {
    fixture.detectChanges();
    testHost.current = 2;
    fixture.detectChanges();
    testHost.current = 1;
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
    expect(screen.getByTestId('step-2-default')).toBeTruthy();
  });
  it('should to keep last step checked when try to pass forward', async () => {
    fixture.detectChanges();
    testHost.current = 2;
    fixture.detectChanges();
    testHost.current = 3;
    fixture.detectChanges();
    testHost.current = 4;
    fixture.detectChanges();
    expect(screen.getByTestId('step-3-selected')).toBeTruthy();
  });
  it('should to keep first step default when try to pass back', async () => {
    fixture.detectChanges();
    testHost.current = 2;
    fixture.detectChanges();
    testHost.current = 1;
    fixture.detectChanges();
    testHost.current = 0;
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
  });
});
