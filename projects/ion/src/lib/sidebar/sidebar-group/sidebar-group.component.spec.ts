import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonSidebarGroupComponent } from './sidebar-group.component';
import { SidebarGroup } from '../types';
import { OutputEmitterRef } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';

const components = {
  group: 'sidebar-group',
  header: 'sidebar-group__header',
  title: 'sidebar-group__title',
  icon: 'sidebar-group__title-icon',
  toggleIcon: 'sidebar-group__toggle-icon',
  items: 'sidebar-group__items',
  firstItem: 'sidebar-group__item-0',
  secondItem: 'sidebar-group__item-1',
};

const getByTestId = (key: keyof typeof components): HTMLElement => {
  return screen.getByTestId(components[key]);
};

const actionMock = jest.fn();
const emit = jest.fn();

const mockGroup = {
  title: 'Title',
  icon: 'box',
  items: [
    {
      title: 'Item 1',
      icon: 'pencil',
      action: actionMock,
      selected: false,
    },
    {
      title: 'Item 2',
      icon: 'working',
      action: actionMock,
      selected: false,
    },
  ],
  selected: false,
  haveGroupAction: false,
  onItemSelected: { emit } as SafeAny,
  groupSelectedChanged: { emit } as SafeAny,
};

const sut = async (
  props: Partial<SidebarGroup> & {
    selectedChange?: OutputEmitterRef<boolean>;
    groupSelectedChanged?: OutputEmitterRef<void>;
  }
) => {
  const { selectedChange, groupSelectedChanged, ...rest } = props;
  return await render(IonSidebarGroupComponent, {
    componentInputs: { ...rest },
    componentOutputs: { selectedChange, groupSelectedChanged },
  });
};

let detectChangesFn: () => void;

describe('SidebarGroup', () => {
  beforeEach(async () => {
    const { detectChanges } = await sut(mockGroup);
    detectChangesFn = detectChanges;
  });
  afterEach(() => {
    actionMock.mockClear();
  });

  it('should render a sidebar group', () => {
    expect(getByTestId('group')).toBeInTheDocument();
  });
  it('should render a given group title', () => {
    expect(getByTestId('title')).toBeInTheDocument();
    expect(getByTestId('title')).toHaveTextContent(mockGroup.title!);
  });
  it('should render a given group icon', () => {
    const icon = document.getElementById(`ion-icon-${mockGroup.icon}`);
    expect(getByTestId('icon')).toContainElement(icon);
  });
  it('should render toggle icon', () => {
    const icon = getByTestId('toggleIcon');
    expect(getByTestId('header')).toContainElement(icon);
  });
  it('should render group unselected by default', () => {
    expect(getByTestId('group')).toHaveClass('sidebar-group');
    expect(getByTestId('group')).not.toHaveClass('sidebar-group--selected');
  });
  it('should not show items by default', () => {
    expect(getByTestId('items')).not.toBeVisible();
  });
  it('should show items when header is clicked', async () => {
    await userEvent.click(getByTestId('toggleIcon'));
    detectChangesFn();
    expect(getByTestId('items')).toBeVisible();
  });

  describe.each(
    mockGroup.items!.map((item, index) => {
      return {
        index,
        ...item,
      };
    })
  )('option $title', ({ title, icon, index }) => {
    let item: HTMLElement;
    beforeEach(() => {
      item = screen.getByTestId(`sidebar-group__item-${index}`);
    });

    it(`should render option with title ${title}`, () => {
      expect(item).toHaveTextContent(title);
    });
    it(`should render option with icon ${icon}`, () => {
      const itemIcon = document.getElementById(`ion-icon-${icon}`);
      expect(item).toContainElement(itemIcon);
    });
  });

  it('should render group selected when an item is clicked', async () => {
    await userEvent.click(getByTestId('firstItem').firstElementChild!);
    detectChangesFn();
    expect(getByTestId('group')).toHaveClass('sidebar-group--selected');
  });
  it('should render only one item selected at a time', async () => {
    const itemOne = getByTestId('firstItem').firstElementChild;
    const itemTwo = getByTestId('secondItem').firstElementChild;
    const selectedItemClass = 'ion-sidebar-item--selected';

    await userEvent.click(itemOne!);
    detectChangesFn();

    expect(itemOne).toHaveClass(selectedItemClass);
    expect(itemTwo).not.toHaveClass(selectedItemClass);

    await userEvent.click(itemTwo!);
    detectChangesFn();
    expect(itemOne).not.toHaveClass(selectedItemClass);
    expect(itemTwo).toHaveClass(selectedItemClass);
  });
  it('should show only the selected item when group is closed', async () => {
    await userEvent.click(getByTestId('header'));
    await userEvent.click(getByTestId('firstItem').firstElementChild!);
    await userEvent.click(getByTestId('header'));
    detectChangesFn();
    expect(getByTestId('firstItem')).toBeVisible();
    expect(getByTestId('secondItem')).not.toBeVisible();
  });
  it('should call action function when an item is clicked', async () => {
    await userEvent.click(getByTestId('firstItem').firstElementChild!);
    expect(actionMock).toHaveBeenCalledTimes(1);
  });
});
describe('Sidebar Group - with disabled items', () => {
  beforeEach(async () => {
    await sut({
      ...mockGroup,
      items: [
        {
          title: 'Disabled item',
          icon: 'pencil',
          disabled: true,
          action: actionMock,
        },
      ],
    });
  });
  it('should render item disabled', () => {
    expect(getByTestId('firstItem').firstElementChild).toBeDisabled();
  });
});
