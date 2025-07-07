import { TemplateRef, OutputEmitterRef, input, output } from '@angular/core';

import { IconType } from './../icon/types';
import { IonPopoverProps } from './../popover/types';
import { SafeAny } from '../utils/safe-any';
import { Omit } from '../utils/types';
import { IonTagStatus } from './../tag';
import { FontSize, IconSide, LinkTarget } from './../link/types'
import { StatusType  } from './../steps/types'

export enum EventTable {
  SORT = 'sort',
  CHANGE_PAGE = 'change_page',
  ROW_SELECT = 'row_select',
  CELL_SELECT = 'cell_select',
  REFRESH_FILTER = 'refresh_filter',
}

export enum ColumnType {
  TAG = 'tag',
  TEXT = 'text',
  LINK = 'link',
  BOOLEAN = 'boolean',
}

interface TagRow {
  icon?: string;
  iconKey?: string;
  status?: IonTagStatus;
  statusKey?: string;
  tooltipKey?: string;
  color?: string;
  colorKey?: string;
}

interface LinkRow<RowType> {
  label?: (_: RowType) => string;
  icon?: IconType;
  iconSide?: IconSide;
  size?: FontSize;
  bold?: boolean;
  disabled?: (_: RowType) => boolean;
  target?: LinkTarget;
  url?: (_: RowType) => string;
  action?: (_: RowType) => void;
  tooltipConfig?: LinkTooltip<RowType>;
  hide?: (_: RowType) => boolean;
}

interface LinkTooltip<RowType> extends Omit<TooltipProps, 'ionTooltipTitle'> {
  text?: (_: RowType) => string;
}

export interface PipeColumn {
  apply: string;
  format?: string;
}
export interface Column<RowType = SafeAny> {
  label: string;
  key: string;
  sort?: boolean;
  type?: ColumnType;
  tag?: TagRow;
  link?: LinkRow<RowType>;
  desc?: boolean;
  width?: number;
  actions?: ColumnActions;
  configTooltip?: TooltipProps;
  pipe?: PipeColumn;
  hideLongData?: boolean;
  booleanText?: ColumnBooleanText;
}

export interface ColumnBooleanText {
  truthy: string;
  falsy: string;
}

export interface ActionConfirm<RowType> {
  title: string;
  description?: string;
  dynamicDescription?: (row: RowType) => string;
  type?: StatusType;
  confirmText?: string;
  cancelText?: string;
}

export type ActionPopover = IonPopoverProps;

export interface ActionTable<RowType = SafeAny> {
  label: string;
  icon: string;
  disabled?: (row: RowType) => boolean;
  danger?: boolean;
  show?: (row: RowType) => boolean;
  call?: (row: RowType) => void;
  secondCall?: (row: RowType) => void;
  confirm?: ActionConfirm<RowType>;
  tooltipConfig?: TooltipProps;
  showLabel?: boolean;
  rightSideIcon?: boolean;
  popover?: (row?: RowType) => ActionPopover;
}

export interface PaginationConfig {
  total: number;
  itemsPerPage?: number;
  pageSizeOptions?: number[];
  offset?: number;
  page?: number;
  openItemsPerPageAbove?: boolean;
}

export interface BaseRow {
  selected?: boolean;
}

export interface ColumnActions {
  trigger: 'click';
}

/**
 * Interface que define as propriedades e eventos para o componente da Tabela.
 */
export interface IonTableProps<RowType extends BaseRow> {
  // === INPUTS (PROPRIEDADES) ===

  /**
   * Os dados a serem exibidos na tabela.
   * @param data - Array de objetos, onde cada objeto representa uma linha.
   * @type {RowType[]}
   * @required
   */
  data: ReturnType<typeof input.required<RowType[]>>;

  /**
   * A configuração das colunas da tabela.
   * @param columns - Array de objetos que definem cada coluna.
   * @type {Column<RowType>[]}
   * @required
   */
  columns: ReturnType<typeof input.required<Column<RowType>[]>>;

  /**
   * Configuração das ações que aparecem em cada linha.
   * @param actions - Array de objetos de ação.
   * @type {ActionTable<RowType>[]}
   */
  actions: ReturnType<typeof input<ActionTable<RowType>[]>>;

  /**
   * Habilita a seleção de linhas com checkboxes.
   * @param check - Ativa a coluna de seleção.
   * @type {boolean}
   * @default false
   */
  check: ReturnType<typeof input<boolean>>;

  /**
   * Configuração da paginação.
   * @param pagination - Objeto com as configurações de paginação.
   * @type {PaginationConfig}
   */
  pagination: ReturnType<typeof input<PaginationConfig>>;

  /**
   * Exibe o estado de carregamento da tabela.
   * @param loading - Controla a exibição do spinner de loading.
   * @type {boolean}
   * @default false
   */
  loading: ReturnType<typeof input<boolean>>;

  // === OUTPUTS (EVENTOS) ===

  /**
   * Evento emitido quando o usuário clica para ordenar uma coluna.
   * @event IonTableComponent#ionOnSort - Emite um objeto com a chave da coluna e a direção.
   * @type {OutputEmitterRef<{ column: string; desc: boolean | undefined; }>}
   */
  ionOnSort: OutputEmitterRef<{ column: string; desc: boolean | undefined }>;

  /**
   * Evento emitido quando o usuário muda de página.
   * @event IonTableComponent#ionOnChangePage - Emite um objeto com os novos dados da paginação.
   * @type {OutputEmitterRef<PaginationConfig>}
   */
  ionOnChangePage: OutputEmitterRef<PaginationConfig>;

  /**
   * Evento emitido quando uma ou mais linhas são selecionadas/desselecionadas.
   * @event IonTableComponent#ionOnRowSelect - Emite um array com todas as linhas atualmente selecionadas.
   * @type {OutputEmitterRef<RowType[]>}
   */
  ionOnRowSelect: OutputEmitterRef<RowType[]>;
}