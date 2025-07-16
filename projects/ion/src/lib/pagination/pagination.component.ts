import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { IonButtonComponent } from '../button';
import { IonDropdownOption } from '../directives/dropdown';
import { IonPaginationProps, Page, PageEvent } from './types';

export const ITEMS_PER_PAGE_DEFAULT = 10;
export const LIST_OF_PAGE_OPTIONS = [10, 25, 50, 100];
const VISIBLE_PAGES_DEFAULT_AMOUNT = 5;
const MIN_PAGES_SHOW_ADVANCED_PAG = 10;
const FIRST_PAGE = 1;

@Component({
  standalone: true,
  selector: 'ion-pagination',
  templateUrl: './pagination.component.html',
  imports: [IonButtonComponent],
})
export class IonPaginationComponent implements OnChanges, OnInit {
  public total = input.required<IonPaginationProps['total']>();
  public itemsPerPage = input<IonPaginationProps['itemsPerPage']>(
    ITEMS_PER_PAGE_DEFAULT
  );
  public pageSizeOptions =
    input<IonPaginationProps['pageSizeOptions']>(LIST_OF_PAGE_OPTIONS);
  public size = input<IonPaginationProps['size']>();
  public allowChangeQtdItems =
    input<IonPaginationProps['allowChangeQtdItems']>();
  public loading = input<IonPaginationProps['loading']>();
  public page = input<IonPaginationProps['page']>();
  public openItemsPerPageAbove =
    input<IonPaginationProps['openItemsPerPageAbove']>();

  public events = output<PageEvent>();

  public _itemsPerPage: WritableSignal<number> = signal(ITEMS_PER_PAGE_DEFAULT);
  public _currentPage: WritableSignal<number> = signal(FIRST_PAGE);
  public optionsPage: IonDropdownOption[] = [];
  public labelPerPage = '';

  public pages: Page[] = [];

  public isAdvanced!: boolean;

  public moreBtnsConfig = {
    left: { hover: false, visible: true },
    right: { hover: false, visible: true },
  };

  public currentVisibleButtons: Page[] = [];

  /**
   * @description Altera o estado de hover dos botões de "mais páginas".
   * @param side Lado do botão ('left' ou 'right').
   * @param value Novo estado de hover.
   */
  changeIconHover(side: 'left' | 'right', value: boolean): void {
    this.moreBtnsConfig[side].hover = value;
  }

  /**
   * @description Atualiza a visibilidade dos botões de "mais páginas" (avançar/voltar blocos).
   */
  updateMoreBtnsVisibility(): void {
    const currentPageNumber = this._currentPage();
    const totalPages = this.totalPages();

    // const isFirstFourPages =
    //   currentPageNumber <= VISIBLE_PAGES_DEFAULT_AMOUNT - 1; // Ajustado para considerar as 4 primeiras

    // // Verifica se estamos nas últimas 4 páginas ou menos
    // const isLastFourPages =
    //   currentPageNumber >= totalPages - (VISIBLE_PAGES_DEFAULT_AMOUNT - 1) &&
    //   totalPages > VISIBLE_PAGES_DEFAULT_AMOUNT;

    this.moreBtnsConfig.left.visible =
      currentPageNumber > VISIBLE_PAGES_DEFAULT_AMOUNT - 1; // Visível se não estiver nas primeiras N páginas
    this.moreBtnsConfig.right.visible =
      currentPageNumber < totalPages - (VISIBLE_PAGES_DEFAULT_AMOUNT - 1); // Visível se não estiver nas últimas N páginas
  }

  /**
   * @description Altera a quantidade de itens por página com base na seleção do dropdown.
   * @param itemsSelected Opção selecionada do dropdown.
   */
  changeItemsPerPage(itemsSelected: IonDropdownOption[]): void {
    if (this.loading()) {
      return;
    }
    const newItemsPerPage = Number(
      itemsSelected[0].label.split(' / página')[0]
    );
    if (this._itemsPerPage() === newItemsPerPage) {
      return;
    }
    this._itemsPerPage.set(newItemsPerPage);
    this.remountPages();
    this.labelPerPage = this.getSelectedItemsPerPageLabel(this.optionsPage);
    this.updateIsAdvanced();
  }

  /**
   * @description Hook de ciclo de vida para detectar mudanças nos inputs.
   * @param changes Objeto contendo as mudanças.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total']) {
      this.remountPages(false);
    }

    if (changes['page'] && changes['page'].currentValue !== undefined) {
      this.setPage(changes['page'].currentValue);
    }

    if (changes['itemsPerPage']) {
      this._itemsPerPage.set(this.itemsPerPage() || 0);
      this.remountPages(false);
      this.optionsPage = this.getOptionsPage();
      this.labelPerPage = this.getSelectedItemsPerPageLabel(this.optionsPage);
    }
  }

  ngOnInit(): void {
    this._itemsPerPage.set(this.itemsPerPage() || 0);
    this._currentPage.set(this.page() || FIRST_PAGE);

    this.remountPages(false);
    this.optionsPage = this.getOptionsPage();
    this.labelPerPage = this.getSelectedItemsPerPageLabel(this.optionsPage);

    this.updateIsAdvanced();
    this.updateMoreBtnsVisibility();
    this.currentVisibleButtons = this.nextVisibleButtons();
  }

  /**
   * @description Define a página atual.
   * @param page Número da página para definir.
   */
  setPage(page = FIRST_PAGE): void {
    if (page === FIRST_PAGE && this._currentPage() !== FIRST_PAGE) {
      this.remountPages();
    } else {
      this.selectPage(page);
    }
  }

  /**
   * @description Seleciona uma página ao clique.
   * @param pageNumber Número da página a ser selecionada.
   */
  selectPageOnClick(pageNumber: number): void {
    if (pageNumber === this._currentPage() || this.loading()) {
      return;
    }
    this.selectPage(pageNumber);
  }

  /**
   * @description Seleciona uma página e emite o evento correspondente.
   * @param pageNumber Número da página a ser selecionada.
   * @param emitEvent Se deve emitir o evento de mudança de página (padrão: true).
   */
  selectPage(pageNumber = FIRST_PAGE, emitEvent = true): void {
    if (this.loading()) {
      return;
    }

    if (pageNumber < FIRST_PAGE || pageNumber > this.totalPages()) {
      console.warn(`Página ${pageNumber} está fora do range válido.`);
      return;
    }

    this.pages.forEach(pageEach => {
      pageEach.selected = false;
    });

    const pageIndex = pageNumber - 1;
    if (this.pages[pageIndex]) {
      this.pages[pageIndex].selected = true;
    }

    this._currentPage.set(pageNumber);

    if (emitEvent) {
      this.events.emit({
        actual: pageNumber,
        itemsPerPage: this._itemsPerPage(),
        offset: (pageNumber - 1) * this._itemsPerPage(),
      });
    }

    this.updateMoreBtnsVisibility();
    this.currentVisibleButtons = this.nextVisibleButtons();
  }

  /**
   * @description Atualiza a propriedade `isAdvanced` para determinar se a paginação avançada deve ser exibida.
   */
  updateIsAdvanced(): void {
    this.isAdvanced = this.pages.length > MIN_PAGES_SHOW_ADVANCED_PAG;
  }

  /**
   * @description Verifica se há uma página anterior.
   * @returns `true` se houver página anterior, `false` caso contrário.
   */
  hasPrevious(): boolean {
    return !this.inFirstPage();
  }

  /**
   * @description Verifica se há uma próxima página.
   * @returns `true` se houver próxima página, `false` caso contrário.
   */
  hasNext(): boolean {
    return !this.inLastPage();
  }

  /**
   * @description Navega para a página anterior.
   */
  previous(): void {
    if (!this.inFirstPage() && !this.loading()) {
      this.selectPage(this._currentPage() - 1);
    }
  }

  /**
   * @description Navega para a próxima página.
   */
  next(): void {
    if (!this.inLastPage() && !this.loading()) {
      this.selectPage(this._currentPage() + 1);
    }
  }

  /**
   * @description Recria a lista de páginas e seleciona a página atual.
   * @param emitEvent Se deve emitir o evento de mudança de página (padrão: true).
   */
  remountPages(emitEvent = true): void {
    const totalPagesCount = this.totalPages();
    this.createPages(totalPagesCount);

    if (this.pages.length) {
      let pageToSelect = this._currentPage();
      if (pageToSelect > totalPagesCount) {
        pageToSelect = totalPagesCount;
      } else if (pageToSelect < FIRST_PAGE) {
        pageToSelect = FIRST_PAGE;
      }
      this.selectPage(pageToSelect || FIRST_PAGE, emitEvent);
    } else {
      this.selectPage(FIRST_PAGE, emitEvent);
    }
    this.updateIsAdvanced();
    this.updateMoreBtnsVisibility();
    this.currentVisibleButtons = this.nextVisibleButtons();
  }

  /**
   * @description Calcula o número total de páginas.
   * @returns Número total de páginas.
   */
  totalPages(): number {
    if (this.total() === 0 || this._itemsPerPage() === 0) {
      return 0;
    }
    const numberOfPages = Math.ceil(this.total() / this._itemsPerPage());
    return numberOfPages;
  }

  /**
   * @description Obtém o rótulo da opção de itens por página selecionada.
   * @param options Lista de opções do dropdown.
   * @returns Rótulo da opção selecionada.
   */
  getSelectedItemsPerPageLabel(options: IonDropdownOption[]): string {
    const option = options.find(pageOption => pageOption.selected);
    return (option && option.label) || this.generateLabel(this._itemsPerPage());
  }

  /**
   * @description Determina quais botões de página devem ser visíveis na paginação avançada.
   * @returns Array de objetos Page visíveis.
   */
  nextVisibleButtons(): Page[] {
    const totalPages = this.pages.length;
    if (totalPages <= VISIBLE_PAGES_DEFAULT_AMOUNT) {
      return this.pages;
    }

    const currentPageNumber = this._currentPage();
    let startPageIndex: number;
    let endPageIndex: number;

    const middle = Math.floor(VISIBLE_PAGES_DEFAULT_AMOUNT / 2);

    if (currentPageNumber <= middle + FIRST_PAGE) {
      startPageIndex = 0;
      endPageIndex = VISIBLE_PAGES_DEFAULT_AMOUNT - 1;
    } else if (currentPageNumber >= totalPages - middle) {
      startPageIndex = totalPages - VISIBLE_PAGES_DEFAULT_AMOUNT;
      endPageIndex = totalPages - 1;
    } else {
      startPageIndex = currentPageNumber - 1 - middle;
      endPageIndex = currentPageNumber - 1 + middle;
    }

    startPageIndex = Math.max(0, startPageIndex);
    endPageIndex = Math.min(totalPages - 1, endPageIndex);

    if (endPageIndex - startPageIndex + 1 < VISIBLE_PAGES_DEFAULT_AMOUNT) {
      endPageIndex = Math.min(
        totalPages - 1,
        startPageIndex + VISIBLE_PAGES_DEFAULT_AMOUNT - 1
      );
      if (endPageIndex - startPageIndex + 1 < VISIBLE_PAGES_DEFAULT_AMOUNT) {
        startPageIndex = Math.max(
          0,
          endPageIndex - VISIBLE_PAGES_DEFAULT_AMOUNT + 1
        );
      }
    }

    return this.pages.slice(startPageIndex, endPageIndex + 1);
  }

  /**
   * @description Salta um bloco de páginas para frente.
   */
  jumpPagesForward(): void {
    this.moreBtnsConfig.right.hover = false;
    const pageDestination = Math.min(
      this.pages.length,
      this._currentPage() + VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
  }

  /**
   * @description Salta um bloco de páginas para trás.
   */
  jumpPagesBackward(): void {
    this.moreBtnsConfig.left.hover = false;
    const pageDestination = Math.max(
      FIRST_PAGE,
      this._currentPage() - VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
  }

  /**
   * @private
   * @description Cria a estrutura de objetos Page com base na quantidade total de páginas.
   * @param qtdOfPages Quantidade total de páginas.
   */
  private createPages(qtdOfPages: number): void {
    this.pages = [];
    for (let index = 0; index < qtdOfPages; index++) {
      this.pages.push({
        selected: false,
        page_number: index + 1,
      });
    }
  }

  /**
   * @private
   * @description Retorna o objeto da página atualmente selecionada.
   * @returns Objeto Page da página atual.
   */
  private currentPage(): Page {
    // Usamos o _currentPage signal para determinar a página atual de forma mais confiável
    return this.pages[this._currentPage() - 1];
  }

  /**
   * @private
   * @description Verifica se a página atual é a última.
   * @returns `true` se for a última página, `false` caso contrário.
   */
  private inLastPage(): boolean {
    return this._currentPage() === this.totalPages();
  }

  /**
   * @private
   * @description Verifica se a página atual é a primeira.
   * @returns `true` se for a primeira página, `false` caso contrário.
   */
  private inFirstPage(): boolean {
    return this._currentPage() === FIRST_PAGE;
  }

  /**
   * @private
   * @description Gera o rótulo formatado para a quantidade de itens por página.
   * @param page Quantidade de itens por página.
   * @returns Rótulo formatado.
   */
  private generateLabel(page: number): string {
    return `${page} / página`;
  }

  /**
   * @private
   * @description Obtém as opções para o dropdown de "itens por página".
   * @returns Array de IonDropdownOption.
   */
  private getOptionsPage(): IonDropdownOption[] {
    return (
      this.pageSizeOptions()?.map((quantityOfPages: number) => {
        return {
          key: quantityOfPages.toString(),
          value: quantityOfPages,
          label: this.generateLabel(quantityOfPages),
          selected: this.isASelectedOption(quantityOfPages),
        };
      }) || []
    );
  }

  /**
   * @private
   * @description Verifica se uma opção de quantidade de páginas é a atualmente selecionada.
   * @param quantityOfPages Quantidade de páginas a ser verificada.
   * @returns `true` se for a opção selecionada, `false` caso contrário.
   */
  private isASelectedOption(quantityOfPages: number): boolean {
    return (
      (this.pageSizeOptions()?.includes(this._itemsPerPage()) &&
        this._itemsPerPage() === quantityOfPages) ||
      false
    );
  }
}
