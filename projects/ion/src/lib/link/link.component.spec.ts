import { fireEvent, render, screen } from '@testing-library/angular';

import { SafeAny } from '../utils/safe-any';
import { IonLinkComponent } from './link.component';
import { FontSize, IonLinkProps } from './types';

const sizes: FontSize[] = ['sm', 'md'];

const getLinkComponentRef = (): HTMLElement => {
  return screen.getByTestId('ion-link');
};

const defaultProps = { ionOnClick: { emit: jest.fn() } as SafeAny };

const sut = async (customProps: Partial<IonLinkProps> = {}): Promise<void> => {
  const { ionOnClick, ...rest } = customProps;
  await render(IonLinkComponent, {
    componentInputs: { ...rest },
    componentOutputs: { ionOnClick: ionOnClick || defaultProps.ionOnClick },
  });
};

describe('IonLinkComponent', () => {
  const customLabel = 'custom label';

  it('should render the component', async () => {
    await sut();
    const linkComponent = getLinkComponentRef();
    expect(linkComponent).toBeVisible();
  });

  it('should render with the custom label informed', async () => {
    await sut({
      label: customLabel,
    });

    expect(screen.getByText(customLabel)).toBeVisible();
  });

  it('should not render the icon by default', async () => {
    await sut({
      label: customLabel,
    });

    expect(screen.queryByTestId('link-icon')).not.toBeInTheDocument();
  });

  it.each(sizes)('should render the %s size', async size => {
    await sut({
      label: customLabel,
      size: size,
    });

    expect(screen.getByTestId('ion-link-label')).toHaveClass(
      `ion-link__label--${size}`
    );
  });

  it('should not render with the bold font by default', async () => {
    await sut({
      label: customLabel,
    });

    expect(screen.getByTestId('ion-link-label')).not.toHaveClass(
      'ion-link__label--bold'
    );
  });

  it.each(sizes)('should render the %s size bold when informed', async size => {
    await sut({
      label: customLabel,
      size: size,
      bold: true,
    });

    expect(screen.getByTestId('ion-link-label')).toHaveClass(
      `ion-link__label--${size} ion-link__label--bold`
    );
  });

  it('should not be disabled by default', async () => {
    await sut({
      label: customLabel,
    });

    expect(getLinkComponentRef()).toHaveAttribute('disabled', 'false');
  });

  it('should be disabled when informed', async () => {
    await sut({
      label: customLabel,
      disabled: true,
    });

    const linkComponent = getLinkComponentRef();

    expect(linkComponent).toHaveAttribute('disabled', 'true');
  });

  describe('IonLinkComponent - Event Emittion', () => {
    const clickFn = jest.fn();

    afterEach(() => {
      clickFn.mockClear();
    });

    it('should emmit an event when clicked', async () => {
      await sut({
        label: customLabel,
        ionOnClick: { emit: clickFn } as SafeAny,
      });

      fireEvent.click(screen.getByTestId('ion-link'));

      expect(clickFn).toHaveBeenCalled();
    });

    it('should not emmit if the anchor is disabled', async () => {
      await sut({
        label: customLabel,
        disabled: true,
        ionOnClick: { emit: clickFn } as SafeAny,
      });

      fireEvent.click(screen.getByTestId('ion-link'));

      expect(clickFn).not.toHaveBeenCalled();
    });
  });

  describe('IonLinkComponent - With Icon', () => {
    it('should render the icon when informed', async () => {
      await sut({
        label: customLabel,
        icon: 'box',
      });

      expect(screen.queryByTestId('ion-link-icon')).toBeVisible();
    });

    it('should render only the icon when the label is not provided', async () => {
      await sut({
        icon: 'box',
      });

      expect(screen.queryByTestId('ion-link-label')).not.toBeInTheDocument();
    });

    it('should render the icon to the right by default', async () => {
      await sut({
        label: customLabel,
        icon: 'box',
      });

      const linkComponent = getLinkComponentRef();

      expect(linkComponent).toHaveClass('ion-link');
    });

    it('should render the icon to the left when informed', async () => {
      await sut({
        label: customLabel,
        icon: 'box',
        iconSide: 'left',
      });

      const linkComponent = getLinkComponentRef();

      expect(linkComponent).toHaveClass('ion-link ion-link--left-icon');
    });
  });
});
