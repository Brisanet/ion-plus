import {
  Overlay,
  OverlayModule,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import userEvent from '@testing-library/user-event';

import { fireEvent, render, screen } from '@testing-library/angular';
import { IonTooltipComponent } from './tooltip.component';
import { IonTooltipDirective } from './tooltip.directive';
import { TooltipTrigger } from './types';

@Component({
  standalone: true,
  imports: [IonTooltipDirective],
  template: `
    <button
      ionTooltip
      [ionTooltipTitle]="title"
      [ionTooltipTrigger]="trigger"
      [ionTooltipShowDelay]="delay">
      Passe o mouse aqui
    </button>
  `,
})
class TestHostComponent {
  title: string | undefined = 'Título do Tooltip';
  trigger: TooltipTrigger = TooltipTrigger.HOVER;
  delay = 0;
}

const mockOverlayRef = {
  attach: jest.fn().mockReturnValue({
    instance: {},
    setInput: jest.fn(),
  }),
  dispose: jest.fn(),
  hasAttached: jest.fn(() => false),
};

const mockOverlay = {
  create: jest.fn().mockReturnValue(mockOverlayRef),
};

const mockPositionBuilder = {
  flexibleConnectedTo: jest.fn().mockReturnThis(),
  withPositions: jest.fn().mockReturnThis(),
};

describe('IonTooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostElement: HTMLElement;
  const user = userEvent.setup();

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        IonTooltipDirective,
        TestHostComponent,
        IonTooltipComponent,
        OverlayModule,
      ],
      providers: [
        { provide: Overlay, useValue: mockOverlay },
        { provide: OverlayPositionBuilder, useValue: mockPositionBuilder },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostElement = fixture.nativeElement.querySelector('button');
  });

  describe('Behavior: Trigger HOVER (default)', () => {
    it('should create and attach the tooltip on hover', async () => {
      await user.hover(hostElement);
      fixture.detectChanges();

      expect(mockOverlay.create).toHaveBeenCalledTimes(1);
      expect(mockOverlayRef.attach).toHaveBeenCalledTimes(1);
    });

    it('should dispose the tooltip on unhover', async () => {
      await user.hover(hostElement);
      fixture.detectChanges();
      await user.unhover(hostElement);
      fixture.detectChanges();

      expect(mockOverlayRef.dispose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Behavior: Trigger CLICK', () => {
    beforeEach(() => {
      fixture.componentInstance.trigger = TooltipTrigger.CLICK;
      fixture.detectChanges();
    });

    it('should create tooltip on the first click', async () => {
      await user.click(hostElement);
      fixture.detectChanges();

      expect(mockOverlay.create).toHaveBeenCalledTimes(1);
    });

    it('should dispose tooltip on the second click', async () => {
      await user.click(hostElement);
      fixture.detectChanges();
      await user.click(hostElement);
      fixture.detectChanges();

      expect(mockOverlayRef.dispose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases & Guards', () => {
    it('should destroy tooltip on window scroll', async () => {
      await user.hover(hostElement);
      fixture.detectChanges();
      expect(mockOverlay.create).toHaveBeenCalledTimes(1);

      fireEvent.scroll(window);
      fixture.detectChanges();

      expect(mockOverlayRef.dispose).toHaveBeenCalledTimes(1);
    });

    it('should destroy tooltip on window resize', async () => {
      await user.hover(hostElement);
      fixture.detectChanges();
      expect(mockOverlay.create).toHaveBeenCalledTimes(1);

      fireEvent.resize(window);
      fixture.detectChanges();

      expect(mockOverlayRef.dispose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Behavior: Show Delay', () => {
    it('should show tooltip after the specified delay', async () => {
      const delay = 500;
      fixture.componentInstance.delay = delay;
      fixture.detectChanges();

      await user.hover(hostElement);
      await new Promise(resolve => setTimeout(resolve, delay + 100));
      fixture.detectChanges();
      expect(mockOverlay.create).toHaveBeenCalledTimes(1);
    });
  });
});

describe('IonTooltipDirective: Behavior: Tooltip templateRef', () => {
  it('should render content from a TemplateRef instead of the title', async () => {
    const user = userEvent.setup();
    const template = `
      <button
        ionTooltip
        [ionTooltipTemplateRef]="customTemplate"
        [ionTooltipTrigger]="'hover'"
        [ionTooltipShowDelay]="0">
        Passe o mouse aqui
      </button>
      <ng-template #customTemplate>
        <div data-testid="custom-content">Conteúdo customizado</div>
      </ng-template>
    `;

    await render(template, {
      imports: [
        IonTooltipDirective,
        IonTooltipComponent,
        OverlayModule,
        NoopAnimationsModule, // <-- Adicione esta linha
      ],
    });

    const triggerElement = screen.getByText('Passe o mouse aqui');
    await user.hover(triggerElement);

    const customContent = await screen.findByTestId('custom-content');

    expect(customContent).toBeVisible();
    expect(customContent).toHaveTextContent('Conteúdo customizado');
  });
});
