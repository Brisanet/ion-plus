import { IonDropdownConfig } from './types';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonDropdownComponent } from './dropdown.component';
import { IonDropdownProps, IonDropdownOption } from '.';
import { SafeAny } from '../../utils/safe-any';
import { ComponentFixture } from '@angular/core/testing';

interface MockOption extends IonDropdownOption {
  name?: string;
}

const mockOptions: MockOption[] = [
  { label: 'Option 1', key: 'option_1', value: 1 },
  { label: 'Option 2', key: 'option_1', value: 2 },
  { label: 'Option 3', key: 'option_1', value: 3 },
];

const mockOptionsWithDisabled: MockOption[] = [
  {
    label: 'Option 1',
    key: 'option_1',
    disabled: true,
    selected: true,
    value: 1,
  },
  { label: 'Option 2', key: 'option_1', value: 2 },
  { label: 'Option 3', key: 'option_1', value: 3 },
];

const mockOptionsWithSelected: MockOption[] = [
  { label: 'Option 1', key: 'option_1', selected: true, value: 1 },
  { label: 'Option 2', key: 'option_1', selected: false, value: 2 },
  { label: 'Option 3', key: 'option_1', selected: false, value: 3 },
];

const mockOptionsWithPropLabel: MockOption[] = [
  { label: 'Option 1', key: 'option_1', name: 'Name 1', value: 1 },
  { label: 'Option 2', key: 'option_2', name: 'Name 2', value: 2 },
  { label: 'Option 3', key: 'option_2', name: 'Name 3', value: 3 },
];

const MockOptionsWithIcons = mockOptions.map(option => {
  return {
    ...option,
    icon: 'box',
  };
});

const sut = async (customProps: Partial<IonDropdownProps<MockOption>> = {}) => {
  const { dropdownOptionsChange: optionsChange, ...rest } = customProps;
  const { fixture } = await render(IonDropdownComponent, {
    componentInputs: {
      ...rest,
    },
    componentOutputs: {
      dropdownOptionsChange: {
        emit: optionsChange || jest.fn(),
      } as SafeAny,
    },
  });
  return fixture;
};

describe('IonDropdownComponent', () => {
  let fixture: ComponentFixture<IonDropdownComponent<IonDropdownOption>>;
  const mockEmission = jest.fn();

  describe('Default props', () => {
    beforeEach(async () => {
      fixture = await sut({
        dropdownOptions: mockOptions,
        dropdownOptionsChange: mockEmission as SafeAny,
      });
    });

    afterEach(() => {
      mockEmission.mockClear();
    });

    it('should render the dropdown component', () => {
      expect(screen.getByTestId('ion-dropdown')).toBeVisible();
    });

    it.each(mockOptions)('should render $label label', ({ label }) => {
      expect(screen.getByText(label)).toBeVisible();
    });

    it('should select an option', () => {
      fireEvent.click(screen.getByTestId(`dropdown-item-1`));

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(1);
    });

    it('should show a check icon when an option is selected', () => {
      fireEvent.click(screen.getByTestId(`dropdown-item-1`));
      expect(document.getElementById('ion-icon-check')).toBeVisible();
    });

    it('should change the check icon to close when hovering a selected option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);
      fireEvent.mouseEnter(firstOption);

      const closeIcon = document.getElementById('ion-icon-close');

      expect(closeIcon).toBeVisible();
    });

    it('should not show an icon when hovering an unselected option', () => {
      fireEvent.mouseEnter(screen.getByTestId(`dropdown-item-1`));
      expect(document.getElementById('ion-icon-close')).toBeFalsy();
    });

    it('should unselect an option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);
      fireEvent.click(firstOption);

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(0);
    });

    it('should not render options with icons when no icon is provided', () => {
      expect(document.getElementById('ion-icon-box')).toBeFalsy();
    });

    it('should emit the options array when option changes', () => {
      fireEvent.click(screen.getByTestId(`dropdown-item-1`));
      expect(mockEmission).toHaveBeenCalledWith(mockOptionsWithSelected);
    });

    it('should show the loading spinner when loading', () => {
      fixture.componentInstance.dropdownLoading.set(true);
      fixture.detectChanges();
      expect(screen.getByTestId('ion-spinner')).toBeVisible();
    });
  });

  describe('Without data', () => {
    it('should show the no data component when an empty array of options is provided', async () => {
      await sut({
        dropdownOptions: [],
      });

      expect(screen.getByTestId('no-data-component')).toBeVisible();
    });
  });

  describe('Option with icon', () => {
    it('should render options with icons when informed', async () => {
      await sut({
        dropdownOptions: MockOptionsWithIcons,
      });

      expect(document.getElementById('ion-icon-box')).toBeVisible();
    });
  });

  describe('Disabled option', () => {
    beforeEach(async () => {
      fixture = await sut({
        dropdownOptions: mockOptionsWithDisabled,
        dropdownOptionsChange: mockEmission as SafeAny,
      });
    });

    it('should disable an option when informed', async () => {
      expect(screen.getByTestId(`dropdown-item-1`)).toHaveClass(
        'dropdown-menu__item--disabled'
      );
    });

    it('should not show the close icon when hovering a disabled option', () => {
      fireEvent.mouseEnter(screen.getByTestId(`dropdown-item-1`));
      expect(document.getElementById('ion-icon-close')).toBeFalsy();
    });

    it('should not emit when clicking a disabled option', async () => {
      fireEvent.click(screen.getByTestId(`dropdown-item-1`));
      expect(mockEmission).not.toHaveBeenCalled();
    });

    it('should not unselect a disabled option that is selected', () => {
      fixture.componentInstance.dropdownConfig.set({
        multiple: true,
        clearButton: true,
      });

      fixture.detectChanges();

      fireEvent.click(screen.getByTestId('ion-button-Limpar'));

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(1);
    });
  });

  describe('PropLabel', () => {
    it.each(mockOptionsWithPropLabel)(
      'should render propLabel $name as label',
      async ({ name }) => {
        fixture = await sut({
          dropdownOptions: mockOptionsWithPropLabel,
          dropdownOptionsChange: mockEmission as SafeAny,
        });

        const config: IonDropdownConfig<MockOption> = {
          propLabel: 'name',
        };

        fixture.componentInstance.dropdownConfig.set(config);
        fixture.detectChanges();

        const currentOption = screen.getByText(name!);

        expect(currentOption).toBeVisible();
      }
    );
  });

  describe('Required', () => {
    it('should not unselect when there is only one option selected and is required mode', async () => {
      fixture = await sut({
        dropdownOptions: mockOptions,
      });

      fixture.componentInstance.dropdownConfig.set({
        required: true,
      });

      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);
      fireEvent.click(firstOption);

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(1);
    });
  });

  describe('Multiple selection', () => {
    beforeEach(async () => {
      fixture = await sut({
        dropdownOptions: mockOptions,
        dropdownOptionsChange: mockEmission as SafeAny,
      });

      fixture.componentInstance.dropdownConfig.set({ multiple: true });
    });

    afterEach(() => {
      mockEmission.mockClear();
    });

    it('should select more than one option', () => {
      fireEvent.click(screen.getByTestId(`dropdown-item-1`));
      fireEvent.click(screen.getByTestId(`dropdown-item-2`));

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(2);
    });

    it('should emit the options array when option changes', () => {
      fireEvent.click(screen.getByTestId(`dropdown-item-1`));
      fireEvent.click(screen.getByTestId(`dropdown-item-2`));
      expect(mockEmission).toHaveBeenCalledTimes(2);
    });

    it('should not show clear button by default', () => {
      fireEvent.click(screen.getByTestId(`dropdown-item-1`));
      expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
    });

    describe('With clear button', () => {
      beforeEach(() => {
        fixture.componentInstance.dropdownConfig.update(prevOptions => {
          return {
            ...prevOptions,
            clearButton: true,
          };
        });
      });

      it('should not show clear button when informed and no option is selected', () => {
        expect(
          screen.queryByTestId('ion-button-Limpar')
        ).not.toBeInTheDocument();
      });

      it('should show clear button when informed and an option is selected', () => {
        fireEvent.click(screen.getByTestId(`dropdown-item-1`));
        expect(screen.getByTestId('ion-button-Limpar')).toBeInTheDocument();
      });

      it('should clear all options when clicked', () => {
        fireEvent.click(screen.getByTestId(`dropdown-item-1`));
        fireEvent.click(screen.getByTestId(`dropdown-item-2`));
        fireEvent.click(screen.getByTestId('ion-button-Limpar'));

        const selectedOptions = document.getElementsByClassName(
          'dropdown-menu__item--selected'
        );

        expect(selectedOptions.length).toBeFalsy();
      });
    });

    describe('With Max Selected', () => {
      it('should not select after the max selected is reached', () => {
        fixture.componentInstance.dropdownConfig.update(prevOptions => {
          return {
            ...prevOptions,
            maxSelected: 2,
          };
        });

        fireEvent.click(screen.getByTestId(`dropdown-item-1`));
        fireEvent.click(screen.getByTestId(`dropdown-item-2`));
        fireEvent.click(screen.getByTestId(`dropdown-item-3`));

        const selectedOptions = document.getElementsByClassName(
          'dropdown-menu__item--selected'
        );

        expect(selectedOptions.length).toBe(2);
      });
    });

    describe('Required', () => {
      it('should not unselect when there is only one option selected and is required mode', () => {
        fixture.componentInstance.dropdownConfig.update(prevOptions => {
          return {
            ...prevOptions,
            required: true,
          };
        });

        const firstOption = screen.getByTestId(`dropdown-item-1`);
        const secondOption = screen.getByTestId(`dropdown-item-2`);

        fireEvent.click(firstOption);
        fireEvent.click(secondOption);
        fireEvent.click(firstOption);
        fireEvent.click(secondOption);

        const selectedOptions = document.getElementsByClassName(
          'dropdown-menu__item--selected'
        );

        expect(selectedOptions.length).toBe(1);
      });
    });
  });
});
