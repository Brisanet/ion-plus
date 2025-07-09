import { fireEvent, render, screen } from '@testing-library/angular';
import { TabSize } from '../tab/types';
import { SafeAny } from '../utils/safe-any';
import { IonTabGroupComponent } from './tab-group.component';
import { IonTabGroupProps, TabInGroup } from './types';

const selectEvent = jest.fn();
const mockTabs: TabInGroup[] = [
  {
    label: 'Tab 1',
    selected: false,
  },
  {
    label: 'Tab 2',
    selected: false,
  },
];
const defaultProps: Partial<IonTabGroupProps> = {
  tabs: mockTabs,
  tabSelected: {
    emit: selectEvent,
  } as SafeAny,
};

const getTab = (indexTab: number = 0): HTMLElement => {
  return screen.getByTestId('ion-tab-in-group-' + mockTabs[indexTab].label);
};

const sut = async (
  customProps: Partial<IonTabGroupProps> = defaultProps
): Promise<{ element: HTMLElement; event: jest.Mock }> => {
  const { tabSelected, ...rest } = customProps;
  await render(IonTabGroupComponent, {
    componentInputs: rest,
    componentOutputs: {
      tabSelected,
    },
  });
  return { element: screen.getByTestId('ion-tab-group'), event: selectEvent };
};

describe('IonTabGroupComponent', () => {
  it('should render component in horizontal by default', async () => {
    const { element } = await sut();
    expect(element).not.toHaveClass('ion-tab-group__column-inner');
    expect(getTab()).toHaveAttribute('data-direction', 'bottom');
  });

  it('should render tabs with border bottom by default', async () => {
    await sut();
    expect(getTab()).toHaveAttribute('data-direction', 'bottom');
  });

  it('should render component in vertical', async () => {
    const { element } = await sut({
      direction: 'vertical',
      tabs: mockTabs,
      tabSelected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(element.childNodes[0]).toHaveClass('ion-tab-group__column-inner');
  });

  it('should emit tab selected when clicked', async () => {
    const { event } = await sut();
    fireEvent.click(screen.getByText(mockTabs[0].label));
    expect(event).toHaveBeenCalledWith({
      label: mockTabs[0].label,
      selected: true,
    });
  });

  it('should has border right when direction is vertical', async () => {
    await sut({
      direction: 'vertical',
      tabs: mockTabs,
      tabSelected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(getTab()).toHaveAttribute('data-direction', 'right');
  });

  it('should has border left when left is informed', async () => {
    await sut({
      direction: 'vertical',
      border: 'left',
      tabs: mockTabs,
      tabSelected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(getTab()).toHaveAttribute('data-direction', 'left');
  });

  it.each(['sm', 'md', 'lg'])(
    'should render tabs with %s size',
    async (size: string) => {
      await sut({
        direction: 'vertical',
        tabs: mockTabs,
        size: size as TabSize,
        tabSelected: {
          emit: selectEvent,
        } as SafeAny,
      });
      expect(getTab()).toHaveAttribute('data-size', size);
    }
  );

  it('should emit selected tab when double clicked', async () => {
    const { event } = await sut();
    fireEvent.click(screen.getByText(mockTabs[1].label));
    fireEvent.click(screen.getByText(mockTabs[1].label));
    expect(event).toHaveBeenCalledWith({
      label: mockTabs[1].label,
      selected: true,
    });
  });

  it('should show a tab with badge', async () => {
    const badgeValue = 10;
    await sut({
      direction: 'vertical',
      tabs: [
        ...mockTabs,
        {
          label: 'Guardians of the galaxy',
          selected: false,
          badge: badgeValue,
        },
      ],
      tabSelected: {
        emit: selectEvent,
      } as SafeAny,
    });
    expect(screen.getByTestId('ion-badge-' + badgeValue)).toBeInTheDocument();
    expect(screen.getByText(badgeValue)).toBeInTheDocument();
  });

  it('should have a disabled tab when informed', async () => {
    const disabledTabLabel = 'disabled tab';
    await sut({
      direction: 'horizontal',
      tabs: [
        ...mockTabs,
        {
          label: disabledTabLabel,
          selected: false,
          disabled: true,
        },
      ],
      tabSelected: {
        emit: selectEvent,
      } as SafeAny,
    });

    expect(screen.getByText(disabledTabLabel)).toBeDisabled();
  });
});
