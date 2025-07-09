import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { IonRadioComponent } from './radio.component';
import { IonRadioProps } from './types';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
];

const sut = async (customProps: Partial<IonRadioProps> = {}) => {
  const { valueChange, ...rest } = customProps;
  await render(IonRadioComponent, {
    componentInputs: {
      options,
      ...rest,
    },
    componentOutputs: {
      valueChange:
        valueChange ||
        ({
          emit: jest.fn(),
        } as SafeAny),
    },
  });
};

describe('IonRadio', () => {
  it('should render a given option selected', async () => {
    await sut({
      name: 'radio',
      options,
      value: 'option1',
    });

    expect(screen.getByRole('radio', { name: 'Option 1' })).toBeChecked();
  });

  it('should render correctly when disabled', async () => {
    await sut({
      name: 'radio',
      options: [
        ...options,
        { label: 'Option 3', value: 'option3', disabled: true },
      ],
      value: 'option1',
    });

    expect(screen.getByRole('radio', { name: 'Option 3' })).toBeDisabled();
  });

  it('should call onChange when an option is clicked', async () => {
    const onChange = jest.fn();

    await sut({
      name: 'radio',
      options,
      value: 'option1',
      valueChange: { emit: onChange } as SafeAny,
    });

    fireEvent.click(screen.getByLabelText('Option 2'));

    expect(onChange).toHaveBeenCalledWith('option2');
  });
});
