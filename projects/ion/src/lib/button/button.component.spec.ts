import { render, screen, fireEvent } from '@testing-library/angular';
import { IonButtonProps } from './types';
import { IonButtonComponent } from './button.component';
import { SafeAny } from '../utils/safe-any';

const defaultName = 'button';

const types: Array<IonButtonProps['type']> = [
  'primary',
  'secondary',
  'ghost',
  'dashed',
];

const sizes: Array<IonButtonProps['size']> = ['lg', 'md', 'sm', 'xl'];

const shapes: Array<IonButtonProps['shape']> = ['normal', 'circle', 'rounded'];

const sut = async (
  customProps: Partial<IonButtonProps>
): Promise<HTMLElement> => {
  await render(IonButtonComponent, {
    componentProperties: customProps,
  });

  return screen.getByTestId(`ion-button-${customProps.label}`);
};

describe('IonButtonComponent', () => {
  it('should render a button with a custom label.', async () => {
    const textButton = 'Click here';
    const button = await sut({ label: textButton });
    expect(button.textContent).toContain(textButton);
  });

  it.each(types)('should correctly render button %s types.', async type => {
    expect(await sut({ label: defaultName, type })).toHaveClass(
      `ion-btn--${type}`
    );
  });

  it.each(types)(
    'should correctly render button %s types with the danger property.',
    async type => {
      expect(await sut({ label: defaultName, type, danger: true })).toHaveClass(
        `ion-btn--danger`
      );
    }
  );

  it.each(sizes)('should correctly render button %s sizes.', async size => {
    expect(await sut({ label: defaultName, size })).toHaveClass(
      `ion-btn--${size}`
    );
  });

  it('should render a button with a pencil icon.', async () => {
    const button = await sut({ label: 'Edit', icon: { type: 'pencil' } });
    expect(button.querySelector('ion-icon')).toBeTruthy();
    expect(
      button.querySelector('ion-icon')!.getAttribute('ng-reflect-type')
    ).toContain('pencil');
  });

  it('should render a button with an icon to the right of the label.', async () => {
    const button = await sut({
      label: 'Delete',
      icon: { type: 'trash', rightPosition: true },
    });
    expect(button).toHaveClass('ion-btn--inverter');
  });

  it('should render a button disabled.', async () => {
    const button = await sut({
      label: 'Play',
      disabled: true,
      icon: { type: 'play' },
    });
    expect(button).toBeDisabled();
  });

  it('should render a button loading.', async () => {
    const button = await sut({
      label: 'Play',
      loading: true,
      icon: { type: 'play' },
    });
    expect(button).toHaveClass('ion-btn--loading');
    expect(button).toHaveTextContent('Loading');
  });

  it.each(shapes)('should correctly render button %s shape.', async shape => {
    expect(await sut({ label: defaultName, shape })).toHaveClass(
      `ion-btn--${shape}`
    );
  });

  it('should trigger an event when the button is clicked.', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      ionOnClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(button);
    expect(clickEvent).toHaveBeenCalled();
  });

  it('should not trigger an event when and the button is disabled.', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      disabled: true,
      ionOnClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(button);
    expect(clickEvent).not.toHaveBeenCalled();
  });

  it('should not trigger an event when the button is loading.', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      loading: true,
      ionOnClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(button);
    expect(clickEvent).not.toHaveBeenCalled();
  });
});
