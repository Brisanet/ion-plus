import { ComponentInput, render, screen } from '@testing-library/angular';
import { IonTooltipComponent } from './tooltip.component';
import { TooltipPosition } from './types';

const defaultTitle = 'Eu sou um tooltip';

const sut = async (props: ComponentInput<IonTooltipComponent> = {}) => {
  return await render(IonTooltipComponent, {
    inputs: {
      title: defaultTitle,
      ...props,
    },
  });
};
describe('IonTooltipComponent', () => {
  it('should render the component with the default title', async () => {
    await sut();
    const tooltipElement = screen.getByTestId('ion-tooltip-component');
    expect(tooltipElement).toBeInTheDocument();
    expect(screen.getByText(defaultTitle)).toBeInTheDocument();
  });

  it('should not render the title element when title is not provided', async () => {
    await sut({ title: undefined });
    const titleElement = screen.queryByTestId('ion-tooltip-component-title');
    expect(titleElement).not.toBeInTheDocument();
  });

  describe('ionTooltipPosition', () => {
    it.each([
      [TooltipPosition.BOTTOM_CENTER],
      [TooltipPosition.BOTTOM_LEFT],
      [TooltipPosition.BOTTOM_RIGHT],
      [TooltipPosition.CENTER_LEFT],
      [TooltipPosition.CENTER_RIGHT],
      [TooltipPosition.DEFAULT],
      [TooltipPosition.TOP_CENTER],
      [TooltipPosition.TOP_LEFT],
      [TooltipPosition.TOP_RIGHT],
    ])('should apply the correct class for position "%s"', async position => {
      await sut({ ionTooltipPosition: position });
      const tooltipElement = screen.getByTestId('ion-tooltip-component');
      expect(tooltipElement).toHaveClass(`ion-tooltip-position--${position}`);
    });

    it('should apply the default position class when no position is provided', async () => {
      await sut();
      const tooltipElement = screen.getByTestId('ion-tooltip-component');
      expect(tooltipElement).toHaveClass(
        `ion-tooltip-position--${TooltipPosition.DEFAULT}`
      );
    });
  });

  describe('contentTemplate', () => {
    it('should render content from a TemplateRef instead of the title', async () => {
      const template = `
        <ion-tooltip [contentTemplate]="customTemplate"></ion-tooltip>
        <ng-template #customTemplate>
          <div data-testid="custom-content">Conteúdo customizado</div>
        </ng-template>
      `;

      await render(template, {
        imports: [IonTooltipComponent],
      });

      const customContent = screen.getByTestId('custom-content');
      expect(customContent).toBeInTheDocument();
      expect(customContent).toHaveTextContent('Conteúdo customizado');

      const titleElement = screen.queryByTestId('ion-tooltip-component-title');
      expect(titleElement).not.toBeInTheDocument();
    });
  });

  describe('ionTooltipCustomClass', () => {
    it('should apply a custom CSS class to the component', async () => {
      const customClass = 'my-special-tooltip';
      await sut({ ionTooltipCustomClass: customClass || '' });
      const tooltipElement = screen.getByTestId('ion-tooltip-component');
      expect(tooltipElement).toHaveClass(customClass);
    });
  });
});
