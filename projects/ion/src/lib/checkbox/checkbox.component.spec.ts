import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { IonCheckboxComponent } from './checkbox.component';
import { IonCheckboxProps } from './types';

const sut = async (customProps: Partial<IonCheckboxProps>) => {
  const { checkedChange, ...rest } = customProps;
  await render(IonCheckboxComponent, {
    componentInputs: {
      ...rest,
    },
    componentOutputs: {
      checkedChange: {
        emit: checkedChange || jest.fn(),
      } as SafeAny,
    },
  });
};

describe('IonCheckboxComponent', () => {
  it('should render a checkbox with a custom label', async () => {
    const textLabel = 'Checkbox';
    await sut({ label: textLabel });
    expect(
      screen.getByRole('checkbox', { name: textLabel })
    ).toBeInTheDocument();
  });
  it('should render a checked checkbox', async () => {
    await sut({ checked: true });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
  it('should render a indeterminate checkbox when the checked is false', async () => {
    await sut({ checked: false, indeterminate: true });
    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
  });
  it('should render a indeterminate checkbox when the checked is true', async () => {
    await sut({ checked: true, indeterminate: true });
    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
  });
  it('should render a disabled checkbox', async () => {
    await sut({ disabled: true });
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
  it('should emit a checkedChange event when the checkbox is clicked', async () => {
    const checkedChange = jest.fn();
    await sut({ checkedChange: checkedChange as SafeAny, checked: false });
    fireEvent.click(screen.getByRole('checkbox'));
    expect(checkedChange).toHaveBeenCalledWith(true);
    expect(checkedChange).toHaveBeenCalledTimes(1);
  });
  it('should emit a checkedChange event when the label is clicked', async () => {
    const checkedChange = jest.fn();
    const textLabel = 'Checkbox';
    await sut({ label: textLabel, checkedChange: checkedChange as SafeAny });
    fireEvent.click(screen.getByText(textLabel));
    expect(checkedChange).toHaveBeenCalledWith(true);
    expect(checkedChange).toHaveBeenCalledTimes(1);
  });
  it('should not emit a checkedChange event when the checkbox is disabled', async () => {
    const checkedChange = jest.fn();
    await sut({ disabled: true, checkedChange: checkedChange as SafeAny });
    fireEvent.click(screen.getByRole('checkbox'));
    expect(checkedChange).not.toHaveBeenCalled();
  });
  it('should change indeterminate to false when the checkbox is checked', async () => {
    await sut({ indeterminate: true });
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', false);
  });
  it('should change indeterminate to false when the checkbox is unchecked', async () => {
    await sut({ checked: true, indeterminate: true });
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', false);
  });
});
