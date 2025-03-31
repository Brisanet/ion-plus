import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SafeAny } from '../utils/safe-any';
import { IonPaginationComponent } from './pagination.component';
import type { IonPaginationProps } from './types';

const pageEvent = jest.fn();
const defaultComponent: IonPaginationProps = {
  total: 46,
  events: {
    emit: pageEvent,
  } as SafeAny,
  page: 1,
};

const getPageButton = (page: number): HTMLElement | null => {
  return screen.queryByTestId(`page-${page}`);
};

const getClickButton = (page: number, pageTestId: string = ''): HTMLElement => {
  if (page) {
    const container = getPageButton(page);
    if (container) {
      return within(container).getByRole('button');
    }
  }
  const container = screen.getByTestId(pageTestId);
  return within(container).getByRole('button');
};

const sut = async (
  customProps: Partial<IonPaginationProps> = defaultComponent
): Promise<void> => {
  await render(IonPaginationComponent, {
    componentProperties: customProps,
    declarations: [],
  });
};

describe('IonPaginationComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it.each(['1', '2', '3', '4'])(
    'should render page %s',
    async (page: string) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    }
  );

  it('should be selected in first page by default', async () => {
    expect(getPageButton(1)).toHaveClass('ion-pagination__button--selected');
  });

  it.each(['left', 'right'])(
    'should render arrow %s',
    async (direction: string) => {
      expect(screen.getByTestId(`arrow-${direction}`)).toBeInTheDocument();
    }
  );

  it('should select a other page', async () => {
    fireEvent.click(getClickButton(2));
    expect(getPageButton(2)).toHaveClass('ion-pagination__button--selected');
    expect(screen.getByTestId('page-1')).not.toHaveClass(
      'ion-pagination__button--selected'
    );
  });

  it('should render arrow right enabled when have more pages', async () => {
    expect(screen.getByTestId('arrow-right')).toBeEnabled();
  });

  it('should render arrow left enabled when has previous page', async () => {
    fireEvent.click(screen.getByTestId('page-2'));
    expect(screen.getByTestId('arrow-left')).toBeEnabled();
  });

  it('should go to the previous page when click in arrow left', async () => {
    fireEvent.click(getClickButton(3));
    fireEvent.click(getClickButton(0, 'arrow-left'));
    expect(getPageButton(2)).toHaveClass('ion-pagination__button--selected');
  });

  it('should go to the next page when click in arrow right', async () => {
    fireEvent.click(getClickButton(0, 'arrow-right'));
    expect(screen.getByTestId('page-2')).toHaveClass(
      'ion-pagination__button--selected'
    );
  });

  afterEach(() => {
    pageEvent.mockClear();
  });
});

describe('Pagination > Page', () => {
  it.each([1, 2, 3, 4])(
    'should select a page %s from the table',
    async page => {
      await sut({
        total: page * 10,
        page: page,
      });
      expect(getPageButton(page)).toHaveClass(
        'ion-pagination__button--selected'
      );
    }
  );

  it('should select first page when page prop is set with an higher number of page', async () => {
    await sut({
      total: 10,
      page: 5,
    });
    expect(getPageButton(1)).toHaveClass('ion-pagination__button--selected');
  });
});

describe('Pagination > Events', () => {
  it('should emit the page selected when selected page', async () => {
    const event = jest.fn();
    await sut({
      total: 16,
      events: {
        emit: event,
      } as SafeAny,
    });
    fireEvent.click(getClickButton(2));
    expect(event).toHaveBeenCalledTimes(2);
  });

  it('should not emit an event when the selected page is already selected', async () => {
    const event = jest.fn();
    await sut({
      total: 16,
      events: {
        emit: event,
      } as SafeAny,
    });
    event.mockClear();
    expect(getPageButton(1)).toHaveClass('ion-pagination__button--selected');
    fireEvent.click(getClickButton(1));
    expect(event).not.toHaveBeenCalled();
  });
});

describe('Advanced Pagination', () => {
  it('should show advanced pagination when total pages is more than 10', async () => {
    await sut({ ...defaultComponent, total: 110 });
    expect(screen.getByTestId('advanced-pagination')).toBeVisible();
  });
  describe('basics - more right button', () => {
    beforeEach(async () => {
      await sut({ ...defaultComponent, total: 110 });
    });
    it('should show right more button with more icon', () => {
      expect(screen.getByTestId('more-right')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should not show left more button', () => {
      expect(screen.queryByTestId('more-left')).toBeNull();
    });
    it('should show arrow right icon when hover on more right button', async () => {
      userEvent.hover(screen.getByTestId('more-right'));
      expect(document.getElementById('ion-icon-right3')).toBeVisible();
    });
    it('should skip five pages when click on more right button', () => {
      fireEvent.click(getClickButton(0, 'more-right'));
      expect(getPageButton(6)).toHaveClass('ion-pagination__button--selected');
    });
  });
  describe('basics - more left button', () => {
    beforeEach(async () => {
      await sut({ ...defaultComponent, total: 110 });
      fireEvent.click(getClickButton(11));
    });
    it('should show left more button with more icon', () => {
      expect(screen.getByTestId('more-left')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should not show right more button', () => {
      expect(screen.queryByTestId('more-right')).toBeNull();
    });
    it('should show arrow left icon when hover on more left button', async () => {
      userEvent.hover(screen.getByTestId('more-left'));
      expect(document.getElementById('ion-icon-left3')).toBeVisible();
    });
    it('should go back five pages when click on more left button', () => {
      fireEvent.click(getClickButton(0, 'more-left'));
      expect(getPageButton(6)).toHaveClass('ion-pagination__button--selected');
    });
  });
  describe('more left and right button', () => {
    beforeEach(async () => {
      await sut({ ...defaultComponent, total: 110 });
      fireEvent.click(getClickButton(5));
    });
    it('should show left more button with more icon', () => {
      expect(screen.getByTestId('more-left')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should show right more button with more icon', () => {
      expect(screen.getByTestId('more-right')).toBeVisible();
      expect(document.getElementById('ion-icon-more')).toBeVisible();
    });
    it('should go back to first page when its not possible to go back five pages', () => {
      fireEvent.click(getClickButton(0, 'more-left'));
      expect(getPageButton(1)).toHaveClass('ion-pagination__button--selected');
    });
    it('should go to last page when its not possible to go forward five pages', () => {
      fireEvent.click(getClickButton(7));
      fireEvent.click(getClickButton(0, 'more-right'));
      expect(getPageButton(11)).toHaveClass('ion-pagination__button--selected');
    });
  });
  describe('buttons visibility', () => {
    describe('first three pages selected', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
      });
      it('should show first and last page', () => {
        expect(getPageButton(1)).toBeVisible();
        expect(getPageButton(11)).toBeVisible();
      });
      it.each([2, 3, 4, 5])('should show page %s', page => {
        expect(getPageButton(page)).toBeVisible();
      });
      it.each([6, 7, 8, 9, 10])('should not show page %s', page => {
        expect(getPageButton(page)).toBeNull();
      });
    });
    describe('when page 4 is selected', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        fireEvent.click(getClickButton(4));
      });
      it('should show first and last page', () => {
        expect(getPageButton(1)).toBeVisible();
        expect(getPageButton(11)).toBeVisible();
      });
      it.each([2, 3, 4, 5])('should show page %s', page => {
        expect(getPageButton(page)).toBeVisible();
      });
      it.each([6, 7, 8, 9, 10])('should not show page %s', page => {
        expect(getPageButton(page)).toBeNull();
      });
    });
    describe('when a middle page is selected', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        fireEvent.click(getClickButton(5));
      });
      it('should show first and last page', () => {
        expect(getPageButton(1)).toBeVisible();
        expect(getPageButton(11)).toBeVisible();
      });
      it.each([3, 4, 5, 6, 7])('should show page %s', page => {
        expect(getPageButton(page)).toBeVisible();
      });
      it.each([2, 8, 9, 10])('should not show page %s', page => {
        expect(getPageButton(page)).toBeNull();
      });
    });
    describe('when page selected is three pages before last page', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        fireEvent.click(getClickButton(3));
        fireEvent.click(getClickButton(0, 'more-right'));
      });
      it('should show first and last page', () => {
        expect(getPageButton(1)).toBeVisible();
        expect(getPageButton(11)).toBeVisible();
      });
      it.each([7, 8, 9, 10])('should show page %s', page => {
        expect(getPageButton(page)).toBeVisible();
      });
      it.each([2, 3, 4, 5, 6])('should not show page %s', page => {
        expect(getPageButton(page)).toBeNull();
      });
    });
    describe('when page selected is two pages before last page', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        fireEvent.click(getClickButton(11));
        fireEvent.click(getClickButton(9));
      });
      it('should show first and last page', () => {
        expect(getPageButton(1)).toBeVisible();
        expect(getPageButton(11)).toBeVisible();
      });
      it.each([7, 8, 9, 10])('should show page %s', page => {
        expect(getPageButton(page)).toBeVisible();
      });
      it.each([2, 3, 4, 5, 6])('should not show page %s', page => {
        expect(getPageButton(page)).toBeNull();
      });
    });
    describe('when page selected is the page before the last', () => {
      beforeEach(async () => {
        await sut({ ...defaultComponent, total: 110 });
        fireEvent.click(getClickButton(11));
        fireEvent.click(getClickButton(10));
      });
      it('should show first and last page', () => {
        expect(getPageButton(1)).toBeVisible();
        expect(getPageButton(11)).toBeVisible();
      });
      it.each([7, 8, 9, 10])('should show page %s', page => {
        expect(getPageButton(page)).toBeVisible();
      });
      it.each([2, 3, 4, 5, 6])('should not show page %s', page => {
        expect(getPageButton(page)).toBeNull();
      });
    });
  });
});

const PAGE_SELECTED = 2;
const TOTAL_ITEMS = 50;
@Component({
  standalone: true,
  imports: [IonPaginationComponent],
  template: `<ion-pagination [total]="total" [page]="page" />`,
})
class PaginationTestComponent {
  total = TOTAL_ITEMS;
  page = PAGE_SELECTED;
}

describe('Pagination / Setting current page after total change', () => {
  let paginationComponent!: PaginationTestComponent;
  let fixture!: ComponentFixture<PaginationTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [PaginationTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PaginationTestComponent);
    paginationComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show that after setting a page, even with a change in total, the selected page is the same as previously chosen', async () => {
    paginationComponent.total = TOTAL_ITEMS + 1;
    fixture.detectChanges();
    expect(screen.getByTestId(`page-${PAGE_SELECTED}`)).toHaveClass(
      'ion-pagination__button--selected'
    );
    expect(
      document.getElementsByClassName('ion-pagination__button--selected')
    ).toHaveLength(1);
  });

  it('should keep the previous page selected when the page property is change to a value below zero', async () => {
    paginationComponent.page = -5;
    fixture.detectChanges();
    expect(screen.getByTestId(`page-${PAGE_SELECTED}`)).toHaveClass(
      'ion-pagination__button--selected'
    );
    expect(
      document.getElementsByClassName('ion-pagination__button--selected')
    ).toHaveLength(1);
  });
});
