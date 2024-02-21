import { render, screen } from '@testing-library/angular';
import { IonSidebarComponent } from './sidebar.component';
import { IonSidebarProps } from './types';
import userEvent from '@testing-library/user-event';

const actionMock = jest.fn();

const components = {
  sidebar: 'ion-sidebar',
  group: 'sidebar-group',
  toggleVisibility: 'ion-sidebar__toggle-visibility',
  outsideContainer: 'ion-sidebar__outside-container',
};

const getByTestId = (key: keyof typeof components): HTMLElement => {
  return screen.getByTestId(components[key]);
};
const logo: IonSidebarProps['logo'] = 'logo.svg';
const items: IonSidebarProps['items'] = [
  {
    title: 'Item 1',
    icon: 'user',
    action: actionMock,
  },
  {
    title: 'Item 2',
    icon: 'pencil',
    action: actionMock,
  },
  {
    title: 'Group 1',
    icon: 'star-solid',
    action: actionMock,
    options: [
      {
        title: 'Item group 1',
        icon: 'box',
        action: actionMock,
      },
      {
        title: 'Item group 2',
        icon: 'working',
        action: actionMock,
      },
    ],
  },
];
const defaultProps = { logo: '', items: [], closeOnSelect: false };

const sut = async (props: IonSidebarProps = defaultProps) => {
  return await render(IonSidebarComponent, {
    componentProperties: props,
  });
};

describe('Sidebar', () => {
  describe('Not visible', () => {
    beforeEach(async () => {
      await sut({ ...defaultProps, items, logo });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should not show sidebar by default', () => {
      expect(getByTestId('sidebar')).not.toHaveClass('ion-sidebar--opened');
    });
    it('should show sidebar after clicking on toggle visibility button', async () => {
      await userEvent.click(getByTestId('toggleVisibility').firstElementChild!);
      expect(getByTestId('sidebar')).toHaveClass('ion-sidebar--opened');
    });
  });
  describe('Visible', () => {
    beforeEach(async () => {
      await sut({ ...defaultProps, items, logo, logoAction: actionMock });
      await userEvent.click(getByTestId('toggleVisibility').firstElementChild!);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render sidebar', () => {
      expect(getByTestId('sidebar')).toBeInTheDocument();
    });
    it('should render logo on sidebar', () => {
      expect(screen.getByRole('img')).toHaveAttribute('src', logo);
    });
    it('shoud call sidebar logo action', async () => {
      await userEvent.click(screen.getByRole('img'));
      expect(actionMock).toHaveBeenCalledTimes(1);
    });
    it('should render toggle sidebar visibility button', () => {
      const toggleVisibilityBtn = screen.queryAllByTestId(
        'ion-sidebar__toggle-visibility'
      );
      expect(getByTestId('sidebar')).toContainElement(toggleVisibilityBtn[0]);
    });
    describe.each(
      items
        .map((item, index) => {
          return { ...item, index };
        })
        .filter(item => !item.options || !item.options.length)
    )('item $title', ({ title, icon, index }) => {
      const defaultItemTestId = `ion-sidebar__item-${index}`;
      it(`should render item ${title}`, () => {
        expect(screen.getByTestId(defaultItemTestId)).toHaveTextContent(title);
      });
      it(`should render icon ${icon}`, () => {
        const itemIcon = document.getElementById(`ion-icon-${icon}`);
        expect(screen.getByTestId(defaultItemTestId)).toContainElement(
          itemIcon
        );
      });
    });
    describe.each(
      items
        .map((item, index) => {
          return { ...item, index };
        })
        .filter(item => item.options && item.options.length)
    )('group $title', ({ title, icon, index, options }) => {
      const defaultGroupTestId = `ion-sidebar__group-${index}`;
      it(`should render group with ${title}`, () => {
        expect(screen.getByTestId(defaultGroupTestId)).toHaveTextContent(title);
      });
      it(`should render group with icon ${icon}`, () => {
        const itemIcon = document.getElementById(`ion-icon-${icon}`);
        expect(screen.getByTestId(defaultGroupTestId)).toContainElement(
          itemIcon
        );
      });
      it.each(options!)(
        '$title should be visible after clicking on group',
        async ({ title: itemTitle }) => {
          await userEvent.click(
            screen.getByTestId('sidebar-group__toggle-icon')
          );
          expect(screen.getByText(itemTitle)).toBeVisible();
        }
      );
    });

    describe('clicking on items', () => {
      const selectedItemClass = 'ion-sidebar-item--selected';
      const selectedGroupClass = 'sidebar-group--selected';
      let item1: HTMLElement;
      let item2: HTMLElement;
      let groupName: HTMLElement;
      let itemGroup2: HTMLElement;
      beforeEach(async () => {
        item1 = screen.getByRole('button', {
          name: items[0].title,
        });
        item2 = screen.getByRole('button', {
          name: items[1].title,
        });
        groupName = screen.getByText('Group 1');
        await userEvent.click(screen.getByTestId('sidebar-group__toggle-icon'));
        itemGroup2 = screen.getByRole('button', {
          name: items[2].options![1].title,
        });
      });
      afterEach(() => {
        actionMock.mockClear();
      });
      it('should render an item selected when click on an item', async () => {
        await userEvent.click(item1);
        expect(item1).toHaveClass(selectedItemClass);
      });
      it('should render only one item selected at a time', async () => {
        await userEvent.click(item1);
        await userEvent.click(item2);
        expect(item1).not.toHaveClass(selectedItemClass);
        expect(item2).toHaveClass(selectedItemClass);
      });
      it('should render a group selected when click on an item inside a group', async () => {
        await userEvent.click(itemGroup2);
        expect(itemGroup2).toHaveClass(selectedItemClass);
        expect(getByTestId('group')).toHaveClass(selectedGroupClass);
      });
      it('should render only group or item selected at a time', async () => {
        await userEvent.click(item1);
        await userEvent.click(itemGroup2);
        expect(item1).not.toHaveClass(selectedItemClass);
        expect(itemGroup2).toHaveClass(selectedItemClass);
        expect(getByTestId('group')).toHaveClass(selectedGroupClass);
      });
      it('should render item selected and group not selected', async () => {
        await userEvent.click(itemGroup2);
        await userEvent.click(item1);
        expect(item1).toHaveClass(selectedItemClass);
        expect(itemGroup2).not.toHaveClass(selectedItemClass);
        expect(getByTestId('group')).not.toHaveClass(selectedGroupClass);
      });
      it('should call action function when click on an item', async () => {
        await userEvent.click(item1);
        expect(actionMock).toHaveBeenCalledTimes(1);
      });
      it('should call action function when click on an item inside a group', async () => {
        await userEvent.click(itemGroup2);
        expect(actionMock).toHaveBeenCalledTimes(1);
      });
      it('should call action function when click on a group title', async () => {
        await userEvent.click(groupName);
        expect(actionMock).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Group without action', () => {
    beforeEach(async () => {
      items[2].action = undefined;
      await sut({ ...defaultProps, items: [...items], logo });
      await userEvent.click(getByTestId('toggleVisibility').firstElementChild!);
    });
    describe.each(
      items
        .map((item, index) => {
          return { ...item, index };
        })
        .filter(item => item.options && item.options.length)
    )('group $title', ({ title, icon, index, options }) => {
      const defaultGroupTestId = `ion-sidebar__group-${index}`;
      it(`should render group with ${title}`, () => {
        expect(screen.getByTestId(defaultGroupTestId)).toHaveTextContent(title);
      });
      it(`should render group with icon ${icon}`, () => {
        const itemIcon = document.getElementById(`ion-icon-${icon}`);
        expect(screen.getByTestId(defaultGroupTestId)).toContainElement(
          itemIcon
        );
      });
      it.each(options!)(
        '$title should be visible after clicking on group',
        async ({ title: itemTitle }) => {
          await userEvent.click(screen.getByTestId('sidebar-group__header'));
          expect(screen.getByText(itemTitle)).toBeVisible();
        }
      );
    });
    it('should not call an action when clicking on group title', async () => {
      await userEvent.click(screen.getByText('Group 1'));
      expect(actionMock).not.toHaveBeenCalled();
    });
  });
  describe('Close on select config', () => {
    const selectedItemClass = 'ion-sidebar-item--selected';
    let item1: HTMLElement;
    let itemGroup2: HTMLElement;
    beforeEach(async () => {
      await sut({
        ...defaultProps,
        items: items,
        logo,
        closeOnSelect: true,
      });
      await userEvent.click(getByTestId('toggleVisibility').firstElementChild!);
      expect(getByTestId('sidebar')).toHaveClass('ion-sidebar--opened');
    });
    it('should close sidebar when option is clicked', async () => {
      item1 = screen.getByRole('button', {
        name: items[0].title,
      });

      await userEvent.click(item1);
      expect(item1).toHaveClass(selectedItemClass);
      expect(getByTestId('sidebar')).not.toHaveClass('ion-sidebar--opened');
    });
    it('should close sidebar when options is clicked', async () => {
      await userEvent.click(screen.getByTestId('sidebar-group__toggle-icon'));

      itemGroup2 = screen.getByRole('button', {
        name: items[2].options![1].title,
      });

      await userEvent.click(itemGroup2);
      expect(itemGroup2).toHaveClass(selectedItemClass);
      expect(getByTestId('sidebar')).not.toHaveClass('ion-sidebar--opened');
    });
    it('should close sidebar when logo is clicked', async () => {
      await userEvent.click(screen.getByRole('img'));
      expect(getByTestId('sidebar')).not.toHaveClass('ion-sidebar--opened');
    });
  });
});
