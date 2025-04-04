import { fireEvent, render, screen } from '@testing-library/angular';
import { IonInputSelectProps, SelectOption, ValueToEmmit } from './types';
import { IonInputSelectComponent } from './input-select.component';
import { SafeAny } from '../utils/safe-any';
import userEvent from '@testing-library/user-event';
import { ComponentFixture } from '@angular/core/testing';

const resetComponentState = (): void => {
  const selectButton = screen.getByTestId('ion-select-button');
  fireEvent.click(selectButton);
  const firstOption = document.getElementById('option-0');
  if (firstOption) {
    fireEvent.click(firstOption);
  }
  fireEvent.click(document.body);
};

const selectOption = async (optionTestId: string): Promise<void> => {
  const selectButton = screen.getByTestId('ion-select-button');
  await userEvent.click(selectButton);
  const option = await screen.findByTestId(optionTestId);
  userEvent.click(option);
};

const getInputFields = (): {
  firstInput: HTMLElement;
  secondInput: HTMLElement | null;
} => {
  const firstInput = screen.getByTestId('first-input');
  const secondInput = screen.queryByTestId('second-input');
  return { firstInput, secondInput };
};

const sut = async (
  customProps: Partial<IonInputSelectProps>
): Promise<ComponentFixture<IonInputSelectComponent>> => {
  const { valueChange, ...rest } = customProps;
  const { fixture } = await render(IonInputSelectComponent, {
    componentInputs: {
      ...rest,
    },
    componentOutputs: {
      valueChange: valueChange as SafeAny,
    },
  });

  return fixture;
};

describe('IonInputSelectComponent', () => {
  afterEach(() => {
    resetComponentState();
  });

  it('should render the input select', async () => {
    await sut({});

    const inputSelect = screen.getByTestId('ion-input-select');

    expect(inputSelect).toBeVisible();
  });

  it('should render the select button', async () => {
    await sut({});

    const selectButton = screen.getByTestId('ion-select-button');

    expect(selectButton).toBeVisible();
  });

  it('should render without the dropdown', async () => {
    await sut({});

    const dropdown = screen.queryByTestId('ion-dropdown');

    expect(dropdown).not.toBeInTheDocument();
  });

  it('should open the dropdown when the select button is clicked', async () => {
    await sut({});

    const selectButton = screen.getByTestId('ion-select-button');
    fireEvent.click(selectButton);
    const dropdown = screen.getByTestId('ion-dropdown');

    expect(dropdown).toBeVisible();
  });

  it('should close the dropdown when clicking outside', async () => {
    await sut({});

    const selectButton = screen.getByTestId('ion-select-button');
    fireEvent.click(selectButton);
    fireEvent.click(document.body);
    const dropdown = screen.queryByText('ion-dropdown');

    expect(dropdown).not.toBeInTheDocument();
  });

  describe('Event emission', () => {
    const valueChange = jest.fn();

    afterEach(() => {
      valueChange.mockClear();
    });

    it('should emit the option selected and the input value on input', async () => {
      await sut({
        valueChange: { emit: valueChange } as SafeAny,
      });

      const valueToEmmit: ValueToEmmit = {
        optionSelected: {
          key: 'igual_a',
          value: 'igual_a',
          label: 'Igual a',
          selected: true,
        },
        firstValue: '',
        secondValue: '',
      };

      await selectOption('dropdown-item-igual_a');
      const { firstInput } = getInputFields();
      await userEvent.type(firstInput, 'input');
      expect(valueChange).toHaveBeenCalledWith(valueToEmmit);
    });
    it('should emit the option selected and the input value on both inputs when multiple', async () => {
      await sut({
        name: 'test',
        valueChange: { emit: valueChange } as SafeAny,
      });

      const valueToEmmit: ValueToEmmit = {
        optionSelected: {
          key: 'entre',
          value: 'entre',
          label: 'Entre',
          multiple: true,
          firstPlaceholder: 'Valor inicial',
          secondPlaceholder: 'Valor final',
          selected: true,
        },
        firstValue: 'input',
        secondValue: 'input 2',
      };

      await selectOption('dropdown-item-entre');
      const { firstInput } = getInputFields();

      await userEvent.type(firstInput, 'input');
      await userEvent.type(screen.getByTestId('second-input'), 'input 2');
      expect(valueChange).toHaveBeenCalledWith(valueToEmmit);
    });
  });

  describe('IonInputSelectComponent - Default options', () => {
    it('should render the first option as the default button label', async () => {
      await sut({});

      const selectButtonLabel = screen
        .getByTestId('ion-select-button')
        .textContent?.trim();

      expect(selectButtonLabel).toBe('Entre');
    });

    it('should change the button label', async () => {
      await sut({});
      await userEvent.click(screen.getByTestId('ion-select-button'));
      const selectButton = screen.getByTestId('dropdown-item-igual_a');
      await userEvent.click(selectButton);

      expect(screen.getByTestId('dropdown-item-igual_a')).toHaveClass(
        'dropdown-menu__item--selected'
      );
    });

    it('should render only the single input when the option is not multiple', async () => {
      await sut({});

      selectOption('dropdown-item-igual_a');
      const { firstInput, secondInput } = getInputFields();

      expect(firstInput).toBeVisible();
      expect(secondInput).not.toBeInTheDocument();
    });
  });

  describe('IonInputSelectComponent - Custom options', () => {
    const customSelectOptions: SelectOption[] = [
      {
        key: 'acima_de',
        value: 'acima_de',
        label: 'Acima de',
        multiple: true,
      },
      {
        key: 'abaixo_de',
        value: 'abaixo_de',
        label: 'Abaixo de',
      },
    ];

    it('should render select button with the label from the informed options', async () => {
      await sut({
        name: 'test',
        selectOptions: customSelectOptions,
      });

      expect(
        screen.getByText(customSelectOptions[0].label)
      ).toBeInTheDocument();
    });
  });
});
