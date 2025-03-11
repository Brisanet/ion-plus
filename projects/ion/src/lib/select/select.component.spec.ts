import { fireEvent, render, screen } from '@testing-library/angular';
import { IonSelectProps } from './types';
import { IonSelectComponent } from './select.component';
import { SafeAny } from '../utils/safe-any';
import { ComponentFixture } from '@angular/core/testing';
import userEvent from '@testing-library/user-event';

const sut = async (
  customProps: IonSelectProps
): Promise<ComponentFixture<IonSelectComponent>> => {
  const { selected, searchChange, ...rest } = customProps;
  const { fixture } = await render(IonSelectComponent, {
    componentInputs: {
      ...rest,
    },
    componentOutputs: {
      selected: selected as SafeAny,
      searchChange: searchChange as SafeAny,
    },
  });

  return fixture;
};

const getIonSelect = (): HTMLElement =>
  screen.getByTestId('ion-select-container');

const getIonSelectInput = (): HTMLElement =>
  screen.getByTestId('ion-select-input');

const getCopyOptions = (): IonSelectProps['options'] =>
  JSON.parse(JSON.stringify(options));

const options: IonSelectProps['options'] = [
  { label: 'option 01', key: 'dropdown-item-1', value: 1 },
  { label: 'option 02', key: 'dropdown-item-2', value: 2 },
  { label: 'option 03', key: 'dropdown-item-3', value: 3 },
];

describe('IonSelecComponent - mode: default', () => {
  it('should render select with placeholder', async () => {
    const customPlaceholder = 'Choose an option';
    await sut({
      placeholder: customPlaceholder,
      options,
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
      mode: 'default',
    });
    expect(getIonSelectInput()).toHaveAttribute(
      'placeholder',
      customPlaceholder
    );
  });

  it('should display the correct label when selecting an option', async () => {
    await sut({
      options: getCopyOptions(),
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
      mode: 'default',
    });
    fireEvent.click(getIonSelect());
    fireEvent.click(screen.getByTestId(options[0].key));
    expect(screen.getByTestId('ion-select-item-selected-0')).toHaveTextContent(
      options[0].label
    );
  });

  it('should remove the selected option by clicking on the close icon of the option itself', async () => {
    await sut({
      options: getCopyOptions(),
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
      mode: 'default',
    });
    fireEvent.click(await getIonSelect());
    fireEvent.click(screen.getByTestId(options[1].key));
    fireEvent.click(screen.getByTestId('ion-icon-close'));
    expect(await screen.queryByTestId('ion-select-item-selected-1')).toBeNull();
  });

  it('should remove a selected option when clicking on it in the dropdown', async () => {
    await sut({
      options: getCopyOptions(),
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
      mode: 'default',
    });
    fireEvent.click(getIonSelect());
    fireEvent.click(screen.getByTestId(options[0].key));
    fireEvent.click(getIonSelect());
    fireEvent.click(getIonSelect());
    fireEvent.click(screen.getByTestId(options[0].key));
    expect(screen.queryByTestId('ion-select-item-selected-0')).toBeNull();
  });

  it('should be disabled when informed', async () => {
    await sut({
      options: getCopyOptions(),
      disabled: true,
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      mode: 'default',
    });
    const selectInput = getIonSelectInput();

    expect(selectInput).toBeDisabled();
  });

  it('should not open the dropdown when disabled', async () => {
    await sut({
      options: getCopyOptions(),
      disabled: true,
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      mode: 'default',
    });

    fireEvent.click(getIonSelect());
    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });
});

describe('IonSelecComponent - mode: multiple', () => {
  it('should selected multiple options', async () => {
    await sut({
      options: getCopyOptions(),
      mode: 'multiple',
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
    });
    fireEvent.click(getIonSelect());
    fireEvent.click(screen.getByTestId(options[0].key));
    fireEvent.click(screen.getByTestId(options[2].key));
    expect(
      await screen.getByTestId('ion-select-item-selected-0')
    ).toHaveTextContent(options[0].label);
    expect(
      await screen.getByTestId('ion-select-item-selected-2')
    ).toHaveTextContent(options[2].label);
  });

  it('should remove an option selected by clicking on the "X" icon of the ion-select-tem component', async () => {
    await sut({
      options: getCopyOptions(),
      mode: 'multiple',
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
    });
    fireEvent.click(getIonSelect());
    fireEvent.click(screen.getByTestId(options[0].key));
    fireEvent.click(screen.getByTestId('ion-icon-close'));
    expect(screen.queryByTestId('ion-select-item-selected-0')).toBeNull();
  });

  it('should select an item when searching and then click on it', async () => {
    await sut({
      options: getCopyOptions(),
      mode: 'multiple',
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
    });
    const input = screen.getByTestId('ion-select-input');
    await userEvent.type(input, '01');
    expect(input).toHaveDisplayValue('01');
    expect(document.getElementsByClassName('dropdown-menu__item').length).toBe(
      1
    );
    fireEvent.click(screen.getByTestId(options[0].key));
    expect(screen.getByTestId('ion-select-item-selected-0')).toHaveTextContent(
      options[0].label
    );
  });

  it('should dispatch a event with input value when search', async () => {
    const selectEvent = jest.fn();
    await sut({
      options: getCopyOptions(),
      searchChange: {
        emit: selectEvent,
      } as SafeAny,
      placeholder: '',
      selected: [],
      maxSelected: 0,
      required: false,
      loading: false,
      disabled: false,
      mode: 'multiple',
    });

    const input = screen.getByTestId('ion-select-input');
    const textToType = '01';
    await userEvent.type(input, textToType);
    expect(selectEvent).toHaveBeenCalledWith(textToType);
  });

  describe('IonSelectComponent - required', () => {
    it('should apply class required in select', async () => {
      await sut({
        options: getCopyOptions(),
        required: true,
        placeholder: '',
        selected: [],
        maxSelected: 0,
        loading: false,
        disabled: false,
        mode: 'default',
      });
      const select = await screen.getByTestId('ion-select-container');

      await userEvent.click(select);
      await userEvent.click(select);

      expect(screen.getByTestId('ion-select')).toHaveClass(
        'ion-select--required'
      );
    });

    it('should not apply the required class if the parameter is false', async () => {
      await sut({
        options: getCopyOptions(),
        placeholder: '',
        selected: [],
        maxSelected: 0,
        required: false,
        loading: false,
        disabled: false,
        mode: 'multiple',
      });
      const select = await screen.getByTestId('ion-select-container');

      await userEvent.click(select);
      userEvent.dblClick(document.body);

      expect(select).not.toHaveClass('ion-select--required');
    });

    it('should not apply required class in multiple mode with an option checked', async () => {
      await sut({
        options: getCopyOptions(),
        required: true,
        mode: 'multiple',
        placeholder: '',
        selected: [],
        maxSelected: 0,
        loading: false,
        disabled: false,
      });

      const select = await screen.getByTestId('ion-select-container');

      await userEvent.click(select);
      userEvent.click(screen.getByTestId(options[0].key));
      userEvent.click(screen.getByTestId(options[1].key));

      await userEvent.click(select);
      const selectItem = screen.getAllByTestId('ion-icon-close');

      userEvent.click(selectItem[0]);
      userEvent.dblClick(document.body);

      expect(select).not.toHaveClass('ion-select--required');
    });
  });
});
