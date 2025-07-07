import { EventEmitter } from '@angular/core';
import { Size } from '../button';

export interface Page {
  /**
   * Pagination page number.
   * @param currentPage - It is numeric content displayed on a pagination button that indicates a page number.
   * @type {number}
   */
  page_number: number;

  /**
   * Pagination selected.
   * @param selected - Indicates whether the button's page is the currently selected page.
   * @type {boolean}
   */
  selected: boolean;
}

export interface PageEvent {
  /**
   * Pagination event return currentPage.
   * @param currentPage - Indicates current page when an event is emitted from pagination component.
   * @type {number}
   */
  currentPage: number;

  /**
   * Pagination event return itemsPerPage.
   * @param itemsPerPage - Indicates how many itens are show per page at pagination component.
   * @type {number}
   */
  itemsPerPage: number;

  /**
   * Pagination event return offset.
   * @param offset - Indicates where in the list the server should start when returning items for a particular query.
   * @type {number}
   */
  offset: number;
}

export interface IonPaginationProps {
  /**
   * Pagination total.
   * @param total - Indicates the total of itens to paginate.
   * @type {number}
   * @example
   * <ion-pagination total = 42/>
   */
  total: number;

  /**
   * Pagination items per page.
   * @param itemsPerPage - Indicates how many items will be show per page, respecting total items.
   * @type {number}
   * @default 10
   * @example
   * <ion-pagination itemsPerPage = 10/>
   */
  itemsPerPage?: number;

  /**
   * Pagination buttons size.
   * @param size - Indicates the size of the buttons
   * @type {`sm` | `md` | `lg` | `xl`}
   * @default `md`
   * @example
   * <ion-pagination size = `md`/>
   */
  size: Size;

  /**
   * Pagination loading
   * @param loading - Indicates to disable buttons while parent component is loading data.
   * @type {boolean}
   * @default false
   * @example
   * <ion-pagination loading = false />
   */
  loading: boolean;

  /**
   * Pagination page.
   * @param page - Indicates current page to be shown in selected style.
   * @type {number}
   * @default 0
   * @example
   * <ion-pagination page = 0/>
   */
  page?: number;

  /**
   * Pagination events
   * @event IonPaginationComponent#events - Event triggered when any button within pagination is clicked.
   * @type {EventEmitter<PageEvent>}
   * @description This event is emitted when any button is clicked. It emits an object that informs values of current page, items per page and offset.
   * @example
   * <ion-pagination (events) = "yourFunction()"/>
   */
  events: EventEmitter<PageEvent>;
}
