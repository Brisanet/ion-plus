import { render, RenderResult, screen } from '@testing-library/angular';
import { IonInputDirective } from './input.directive';

const sut = async (
  invalid = false,
  disabled = false
): Promise<RenderResult<HTMLElement>> => {
  return await render(
    `<input placeholder="ion-input" ionInput [invalid]="${invalid}" [disabled]="${disabled}">`,
    {
      imports: [IonInputDirective],
    }
  );
};

const getInputElement = () => screen.getByPlaceholderText('ion-input');

describe('IonInputDirective', () => {
  it('should render the default input', async () => {
    await sut();
    expect(getInputElement()).toBeInTheDocument();
  });

  it('should render the input with the invalid class', async () => {
    await sut(true);
    expect(getInputElement()).toHaveClass('ion-input--invalid');
  });

  it('should render the input with the disabled class', async () => {
    await sut(false, true);
    expect(getInputElement()).toBeDisabled();
  });
});
