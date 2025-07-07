import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonTooltipComponent } from '../component/tooltip.component';
import { TooltipColorScheme, TooltipPosition, TooltipTrigger } from '../types';
import { IonTooltipDirective } from './tooltip.directive';

@Component({
  standalone: true,
  imports: [CommonModule, IonTooltipDirective, IonTooltipComponent],
  template: `
    <p
      data-testid="hostTooltip"
      ionTooltip
      [ionTooltipTitle]="ionTooltipTitle"
      [ionTooltipTemplateRef]="ionTooltipTemplateRef ? ref : null"
      [ionTooltipColorScheme]="ionTooltipColorScheme"
      [ionTooltipPosition]="ionTooltipPosition"
      [ionTooltipTrigger]="ionTooltipTrigger"
      [ionTooltipShowDelay]="ionTooltipShowDelay">
      Hover me
    </p>
    <ng-template #ref>
      <span data-testid="templateRef">Im a template ref</span>
    </ng-template>
  `,
})
class HostTestComponent {
  @Input() ionTooltipTitle = 'Tooltip';
  @Input() ionTooltipColorScheme: TooltipColorScheme = 'dark';
  @Input() ionTooltipPosition: TooltipPosition = TooltipPosition.TOP_CENTER;
  @Input() ionTooltipTrigger: TooltipTrigger = TooltipTrigger.HOVER;
  @Input() ionTooltipShowDelay = 0;
  @Input() ionTooltipTemplateRef = true;
}

const sut = async (props: Partial<HostTestComponent> = {}): Promise<void> => {
  await render(HostTestComponent, {
    componentProperties: props,
  });
};

describe('Directive: Tooltip', () => {
  afterEach(async () => {
    fireEvent.mouseLeave(screen.getByTestId('hostTooltip'));
  });

  it('should render without tooltip', async () => {
    await sut();
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  it('should create tooltip', async () => {
    await sut();
    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();
  });

  it('should destroy tooltip', async () => {
    await sut();
    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByTestId('hostTooltip'));
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  it('should render tooltip with correct title', async () => {
    const ionTooltipTitle = 'Hello world!';
    await sut({ ionTooltipTitle });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByText(ionTooltipTitle)).toBeInTheDocument();
  });

  it('should not render tooltip when title and templateRef is empty', async () => {
    const ionTooltipTitle = '';
    await sut({ ionTooltipTitle, ionTooltipTemplateRef: false });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  it('should render tooltip with a template ref', async () => {
    await sut();

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('templateRef')).toBeInTheDocument();
  });

  it.each(['light', 'dark'] as TooltipColorScheme[])(
    'should render tooltip with %s color scheme',
    async ionTooltipColorScheme => {
      await sut({ ionTooltipColorScheme });
      fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
      expect(screen.getByTestId('ion-tooltip')).toHaveClass(
        `ion-tooltip-${ionTooltipColorScheme}`
      );
    }
  );

  it('should show tooltip after delay time setted', async () => {
    jest.useFakeTimers();
    const timeDelay = 300;
    const { detectChanges } = await render(HostTestComponent, {
      componentProperties: {
        ionTooltipShowDelay: timeDelay,
      },
    });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).not.toHaveClass(
      'ion-tooltip--visible'
    );

    jest.advanceTimersByTime(timeDelay);
    detectChanges();
    expect(screen.getByTestId('ion-tooltip')).toHaveClass(
      'ion-tooltip--visible'
    );
  });

  it('should reposition the tooltip when exceed the screen size', async () => {
    await sut();
    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).toHaveClass(
      `ion-tooltip-position--topCenter`
    );
  });

  it('should close the tooltip when scrolling the page', async () => {
    await sut();
    const directive = IonTooltipDirective.prototype;
    jest.spyOn(directive, 'onScroll');

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    fireEvent.scroll(window);
    expect(directive.onScroll).toBeCalled();
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  describe('trigger: click', () => {
    afterEach(async () => {
      fireEvent.click(screen.getByTestId('hostTooltip'));
    });

    it('should activate tooltip when clicking when trigger is click', async () => {
      await sut({ ionTooltipTrigger: TooltipTrigger.CLICK });

      fireEvent.click(screen.getByTestId('hostTooltip'));
      expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();
    });

    it('should remove tooltip when clicking again on element when trigger is click', async () => {
      await sut({ ionTooltipTrigger: TooltipTrigger.CLICK });

      fireEvent.click(screen.getByTestId('hostTooltip'));
      expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('hostTooltip'));
      expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
    });
  });
});
