import { TemplateRef } from '@angular/core';
import { SafeAny } from '../utils/safe-any';

export type ColumnType = 'tag' | 'text' | 'link' | 'boolean';

export enum EventTable {
  SORT = 'sort',
  CHANGE_PAGE = 'change_page',
  ROW_SELECT = 'row_select',
  CELL_SELECT = 'cell_select',
  REFRESH_FILTER = 'refresh_filter',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Column<RowType> {
  /**
   * Column label.
   * @param label - Text displayed as column header
   * @type {string}
   */
  label: string;

  /**
   * Column key.
   * @param key - Unique identifier for the column
   * @type {string}
   */
  key: string;

  /**
   * Column sorting option.
   * @param sort - Enables sorting for the column
   * @type {boolean}
   * @default false
   */
  sort?: boolean;

  /**
   * Column type.
   * @param type - Defines the column data type
   * @type {`tag` | `text` | `link` | `boolean`}
   */
  type?: ColumnType;

  /**
   * Column tag configuration.
   * @param tag - Defines tag-related properties
   * @type {TagRow}
   */
  tag?: TagRow;

  /**
   * Column sorting direction.
   * @param desc - Defines if sorting is descending
   * @type {boolean}
   * @default false
   */
  desc?: boolean;

  /**
   * Column width.
   * @param width - Defines column width in pixels
   * @type {number}
   */
  width?: number;

  /**
   * Column actions.
   * @param actions - Defines available actions for the column
   * @type {ColumnActions}
   */
  actions?: ColumnActions;

  /**
   * Column pipe transformation.
   * @param pipe - Defines transformation properties
   * @type {PipeColumn}
   */
  pipe?: PipeColumn;

  /**
   * Hide long data.
   * @param hideLongData - Determines if long text should be hidden
   * @type {boolean}
   * @default false
   */
  hideLongData?: boolean;

  /**
   * Boolean column text.
   * @param booleanText - Defines labels for boolean values
   * @type {ColumnBooleanText}
   */
  booleanText?: ColumnBooleanText;
}

export interface IonTableProps<RowType = SafeAny> {
  /**
   * Table data.
   * @param data - Defines the rows data of the table
   * @type {Array<RowType>}
   */
  data: RowType[];

  /**
   * Table columns.
   * @param columns - Defines the columns displayed in the table
   * @type {Array<Column<RowType>>}
   */
  columns: Column<RowType>[];

  /**
   * Table actions.
   * @param actions - Defines available row actions
   * @type {Array<ActionTable<RowType>>}
   */
  actions?: ActionTable<RowType>[];

  /**
   * Table row selection.
   * @param check - Enables row selection
   * @type {boolean}
   * @default false
   */
  check?: boolean;

  /**
   * Table pagination.
   * @param pagination - Defines pagination configuration
   * @type {PaginationConfig}
   */
  pagination?: PaginationConfig;

  /**
   * Table loading state.
   * @param loading - Defines if the table is in loading state
   * @type {boolean}
   * @default false
   */
  loading?: boolean;

  /**
   * Table sorting order.
   * @param order - Defines the column and order direction
   * @type {object}
   */
  order?: {
    column: string;
    desc: boolean | undefined;
  };

  /**
   * Custom row template.
   * @param customRowTemplate - TemplateRef for row customization
   * @type {TemplateRef<HTMLElement>}
   */
  customRowTemplate?: TemplateRef<HTMLElement>;
}

export interface TagRow {
  icon?: string;
  iconKey?: string;
  statusKey?: string;
  tooltipKey?: string;
  color?: string;
  colorKey?: string;
}

export interface PipeColumn {
  apply: string;
  format?: string;
}

export interface ColumnBooleanText {
  truthy: string;
  falsy: string;
}

export interface ActionConfirm<RowType> {
  title: string;
  description?: string;
  dynamicDescription?: (row: RowType) => string;
  confirmText?: string;
  cancelText?: string;
}

export interface ActionTable<RowType = SafeAny> {
  label: string;
  icon: string;
  disabled?: (row: RowType) => boolean;
  danger?: boolean;
  show?: (row: RowType) => boolean;
  call?: (row: RowType) => void;
  secondCall?: (row: RowType) => void;
  confirm?: ActionConfirm<RowType>;
  showLabel?: boolean;
  rightSideIcon?: boolean;
}

export interface PaginationConfig {
  total: number;
  itemsPerPage?: number;
  pageSizeOptions?: number[];
  offset?: number;
  page?: number;
  openItemsPerPageAbove?: boolean;
}

export interface ColumnActions {
  trigger: 'click';
}

export interface BaseRow {
  selected?: boolean;
}
