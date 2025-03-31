import {
  render,
  RenderResult,
  screen,
  fireEvent,
} from '@testing-library/angular';
import {
  BadgeStatus,
  ChipSize,
  IonBadgeComponent,
  IonChipComponent,
  IonChipProps,
  IonDropdownDirective,
  IonIconComponent,
} from '../../public-api';
import { SafeAny } from '../utils/safe-any';
import { ComponentFixture } from '@angular/core/testing';

const defaultOptions = [
  { label: 'Cat', value: 1, selected: false, key: '1', icon: 'box' },
  { label: 'Dog', value: 2, selected: false, key: '2', icon: 'pencil' },
  { label: 'Option 3', value: 3, selected: false, key: '3', icon: 'box' },
  { label: 'Option 4', value: 4, selected: false, key: '4', icon: 'box' },
];

const sut = async (
  customProps: IonChipProps
): Promise<RenderResult<IonChipComponent>> => {
  const { chipEvents, ...rest } = customProps;
  return await render(IonChipComponent, {
    componentInputs: {
      ...rest,
    },
    componentOutputs: {
      chipEvents: chipEvents as SafeAny,
    },
    imports: [IonBadgeComponent, IonIconComponent, IonDropdownDirective],
  });
};

describe('ChipComponent', () => {
  it('should render chip with options', async () => {
    await sut({
      label: 'Custom label',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'primary' },
      rightBadge: { render: false, label: 'label', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    const iconDinamic = screen.queryAllByTestId('icon-dinamic');
    const iconDefault = screen.queryAllByTestId('icon-default');
    expect(iconDinamic.length).not.toBe(1);
    expect(iconDefault.length).toBe(1);
  });

  it('should not render with info badge by default', async () => {
    await sut({
      label: 'Custom label',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'primary' },
      rightBadge: { render: false, label: 'label', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    expect(screen.queryAllByTestId('ion-dot-badge')).toHaveLength(0);
  });

  it('should render chip component with custom label', async () => {
    await sut({
      label: 'Custom label',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'primary' },
      rightBadge: { render: false, label: 'label', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    expect(screen.getByText('Custom label')).toBeTruthy();
  });

  it.each(['sm', 'md'])(
    'should render chip component with size %s',
    async size => {
      await sut({
        label: 'Custom label',
        options: defaultOptions,
        disabled: false,
        size: size as ChipSize,
        icon: 'close',
        multiple: false,
        iconPosition: 'left',
        required: false,
        hasDropdown: true,
        infoBadge: { render: false, type: 'primary' },
        rightBadge: { render: false, label: 'label', type: 'primary' },
        chipEvents: {
          chipSelected: false,
          chipDisabled: false,
          options: [],
        },
      });
      const element = screen.getByTestId('ion-chip');
      expect(element).toHaveClass('chip-' + size);
    }
  );

  it('should render icon on left', async () => {
    await sut({
      label: 'Custom label',
      options: [],
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: false,
      infoBadge: { render: false, type: 'primary' },
      rightBadge: { render: false, label: 'label', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    const chipIcon = screen.getByTestId('chip-icon-left');
    expect(chipIcon).toHaveClass('icon-color chip-icon-left');
  });

  it('should render chip component disabled', async () => {
    await sut({
      label: 'Custom label',
      options: [],
      disabled: true,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: false,
      infoBadge: { render: false, type: 'primary' },
      rightBadge: { render: false, label: 'label', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    const element = screen.getByTestId('ion-chip');
    expect(element).toHaveAttribute('disabled');
  });

  it('should select chip', async () => {
    const selectEvent = jest.fn();
    await sut({
      label: 'Custom label',
      options: [],
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: false,
      infoBadge: { render: false, type: 'primary' },
      rightBadge: { render: false, label: 'label', type: 'primary' },
      chipEvents: {
        emit: selectEvent,
      } as SafeAny,
    });
    const element = screen.getByTestId('ion-chip');
    fireEvent.click(element);
    expect(element).toHaveClass('chip-selected');
    expect(selectEvent).toHaveBeenCalledWith({
      chipSelected: true,
      chipDisabled: false,
      options: [],
    });
  });

  it.each(['primary', 'success', 'info', 'warning', 'negative'])(
    'should render info badge with status %s',
    async badgeType => {
      await sut({
        label: 'Custom label',
        options: [],
        disabled: false,
        size: 'sm',
        icon: 'close',
        multiple: false,
        iconPosition: 'left',
        required: false,
        hasDropdown: false,
        infoBadge: { render: true, type: badgeType as BadgeStatus },
        rightBadge: { render: false, label: 'label', type: 'primary' },
        chipEvents: {
          chipSelected: false,
          chipDisabled: false,
          options: [],
        },
      });
      expect(screen.getByTestId('ion-dot-badge')).toBeInTheDocument();
    }
  );

  it('should render chip with right badge', async () => {
    const labelBadge = 'novo';
    await sut({
      label: 'Custom label',
      options: [],
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: false,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: true, label: 'novo', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    expect(screen.getByText(labelBadge)).toBeInTheDocument();
  });

  it('should render the label of the first selected option when displaying the chip with dropdown', async () => {
    await sut({
      label: 'Custom label',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    fireEvent.click(screen.getByTestId('ion-chip'));
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    fireEvent.click(document.body);
    expect(screen.getByTestId('ion-chip-label')).toContainHTML(
      defaultOptions[0].label
    );
  });

  it('should render badge with value', async () => {
    await sut({
      label: 'Chip',
      options: [
        { label: 'Cat', value: 1, selected: true, key: '1', icon: 'box' },
        { label: 'Dog', value: 2, selected: false, key: '2', icon: 'pencil' },
      ],
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: true,
      iconPosition: 'left',
      required: false,
      hasDropdown: false,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    expect(screen.getByTestId('ion-badge-1')).toHaveTextContent('1');
  });

  it('should start with badge when an item is already selected', async () => {
    await sut({
      label: 'Chip',
      options: [
        { label: 'Cat', value: 1, selected: true, key: '1', icon: 'box' },
        { label: 'Dog', value: 2, selected: false, key: '2', icon: 'pencil' },
      ],
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: true,
      iconPosition: 'left',
      required: false,
      hasDropdown: false,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        chipSelected: false,
        chipDisabled: false,
        options: [],
      },
    });
    expect(screen.queryAllByTestId('ion-badge-1')).toHaveLength(1);
  });

  describe('With Dropdown', () => {
    const dropdownEvent = jest.fn();
    beforeEach(async () => {
      await sut({
        label: 'dropdown',
        options: defaultOptions,
        disabled: false,
        size: 'sm',
        icon: 'close',
        multiple: true,
        iconPosition: 'left',
        required: false,
        hasDropdown: true,
        infoBadge: { render: false, type: 'negative' },
        rightBadge: { render: false, label: 'novo', type: 'primary' },
        chipEvents: {
          emit: dropdownEvent,
        } as SafeAny,
      });
    });

    it('should render icon semi-down  when has options', async () => {
      const icon = document.getElementById('ion-icon-semi-down');
      expect(icon).toBeInTheDocument();
    });

    it('should render icon semi-down when has options', async () => {
      expect(document.getElementById('ion-icon-semi-down')).toBeInTheDocument();
    });

    it('should render icon semi-up when has options and click in chip', async () => {
      const element = screen.getByText('dropdown');
      fireEvent.click(element);
      expect(screen.getByText(defaultOptions[0].label)).toBeInTheDocument();
    });

    it('should emit options selected when select in chip', async () => {
      const chipToOpen = screen.getByTestId('ion-chip');
      fireEvent.click(chipToOpen);
      fireEvent.click(screen.getByTestId('dropdown-item-1'));
      expect(dropdownEvent).toHaveBeenCalledWith({
        chipDisabled: false,
        chipSelected: true,
        options: defaultOptions,
      });
    });

    it('should render call event only one time when select a option', async () => {
      const chipToOpen = screen.getByTestId('ion-chip');
      fireEvent.click(chipToOpen);
      fireEvent.click(screen.getByTestId('dropdown-item-1'));
      expect(dropdownEvent).toHaveBeenCalledWith({
        chipDisabled: false,
        chipSelected: true,
        options: defaultOptions,
      });
      expect(dropdownEvent).toHaveBeenCalledTimes(2);
    });

    afterEach(() => {
      dropdownEvent.mockClear();
    });
  });
});

describe('Check update label', () => {
  const dropdownEvent = jest.fn();
  const events = jest.fn();
  afterEach(() => {
    dropdownEvent.mockClear();
  });
  it('should change label when select option', async () => {
    await sut({
      label: 'dropdown',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: events,
      } as SafeAny,
    });
    const chip = screen.getByTestId('ion-chip');
    fireEvent.click(chip);
    const option = screen.getByTestId('dropdown-item-2');
    fireEvent.click(option);
    fireEvent.click(document.body);
    expect(screen.getByTestId('ion-chip-label')).toContainHTML(
      defaultOptions[1].label
    );
  });

  it('should change label when deselect option', async () => {
    await sut({
      label: 'Custom label',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: events,
      } as SafeAny,
    });
    const chip = screen.getByTestId('ion-chip');
    fireEvent.click(chip);
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    fireEvent.click(screen.getByTestId('dropdown-item-1'));

    expect(screen.getByText('Custom label')).toBeInTheDocument();
  });
});

describe('With Multiple Dropdown', () => {
  const dropdownEvent = jest.fn();
  const events = jest.fn();
  let fixture: ComponentFixture<IonChipComponent>;
  beforeEach(async () => {
    const result = await sut({
      label: 'dropdown',
      options: defaultOptions,
      multiple: true,
      disabled: false,
      size: 'sm',
      icon: 'close',
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: dropdownEvent,
      } as SafeAny,
    });

    fixture = result.fixture;
  });

  it('should not show badge when dont have item selected', async () => {
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(0);
  });

  it('should show badge with two results when selected two options', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    fireEvent.click(screen.getByTestId('dropdown-item-2'));
    expect(dropdownEvent).toHaveBeenCalled();
    expect(screen.getByText('Limpar')).toBeInTheDocument();
    expect(screen.getByTestId('ion-badge-2')).toContainHTML('2');
  });

  it('should keep dropdown open when an option will be selected', async () => {
    const dropdown = screen.getByTestId('ion-chip');
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    expect(screen.getAllByTestId('ion-dropdown')).toBeTruthy();
    expect(screen.getByText('Limpar')).toBeInTheDocument();
  });

  it('should clear badge when clear button be clicked', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    fireEvent.click(screen.getByText('Limpar'));
    expect(screen.queryAllByTestId('badge-multiple')).toHaveLength(0);
  });

  it('should emit event when click clear button', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    fireEvent.click(screen.getByText('Limpar'));
    expect(dropdownEvent).toHaveBeenCalled();
  });

  it('should reset chip style when dropdown is closed', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(document.body);
    expect(screen.getByText('dropdown')).not.toHaveClass('chip-selected');
  });

  it('should emit event when dropdown is closed', async () => {
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(document.body);
    expect(dropdownEvent).toHaveBeenCalledWith({
      chipSelected: true,
      chipDisabled: false,
      options: defaultOptions,
    });
  });

  afterEach(() => {
    fixture.destroy(); // Destruir o fixture após cada teste
    dropdownEvent.mockClear();
    events.mockClear();
  });
});

describe('With dropdown with icons', () => {
  const events = jest.fn();

  it('should set the icon to the selected option', async () => {
    await sut({
      label: 'dropdown',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: true,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: events,
      } as SafeAny,
    });
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    const chipIcon = document.getElementById(
      `ion-icon-${defaultOptions[0].icon}`
    );
    expect(chipIcon).toBeVisible();
  });

  it('should set icon if hasDropdown is false', async () => {
    await sut({
      label: 'dropdown',
      options: [],
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: false,
      hasDropdown: false,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: events,
      } as SafeAny,
    });
    const chipIcon = document.getElementById(`ion-icon-close`);
    expect(chipIcon).toBeVisible();
  });
});

describe('IonChipComponent / Option showToggle', () => {
  const events = jest.fn();
  it('should not close dropdown when selected option', async () => {
    await sut({
      label: 'dropdown',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: true,
      iconPosition: 'left',
      required: false,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: events,
      } as SafeAny,
    });
    fireEvent.click(screen.getByText('dropdown'));
    fireEvent.click(screen.getByTestId('dropdown-item-1'));
    expect(screen.getByTestId('ion-dropdown')).toBeTruthy();
  });
});

describe('IonChipComponent / Required', () => {
  const events = jest.fn();
  it('should render with correct label', async () => {
    await sut({
      label: 'dropdown',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: true,
      iconPosition: 'left',
      required: true,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: events,
      } as SafeAny,
    });
    expect(screen.getByTestId('ion-chip-label')).toContainHTML('dropdown');
  });

  it('should not change label when selected option is clicked', async () => {
    await sut({
      label: 'dropdown',
      options: defaultOptions,
      disabled: false,
      size: 'sm',
      icon: 'close',
      multiple: false,
      iconPosition: 'left',
      required: true,
      hasDropdown: true,
      infoBadge: { render: false, type: 'negative' },
      rightBadge: { render: false, label: 'novo', type: 'primary' },
      chipEvents: {
        emit: events,
      } as SafeAny,
    });
    const chip = screen.getByText('dropdown');
    for (let index = 0; index < 2; index++) {
      fireEvent.click(chip);
      fireEvent.click(screen.getByTestId('dropdown-item-1'));
      expect(chip).toContainHTML('Cat');
    }
  });
});
