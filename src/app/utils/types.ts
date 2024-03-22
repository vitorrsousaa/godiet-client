/**
 * Interface que define o status padrão da página.
 */
export interface PageStatus {
  /**
   * Indica se a página está carregando.
   */
  isLoading: boolean;
  /**
   * Indica se ocorreu um erro na página.
   */
  isError: boolean;
  /**
   * Indica se não há dados para exibir na página.
   */
  noData: boolean;
}

/**
 * Interface que define o retorno inicial de um hook.
 */
interface DefaultReturnHookPage {
  /**
   * O status da página, incluindo isLoading, isError e noData.
   */
  pageStatus: PageStatus;
}

/**
 * Retorna um objeto que inclui o status da página padrão (isLoading, isError, noData) e outros itens especificados pelo usuário.
 *
 * Este tipo é útil para definir o retorno de hooks personalizados que fornecem informações sobre o estado da página e outros dados relevantes.
 *
 * @template T - Tipo dos outros itens específicos do usuário.
 */
export type ReturnHookPage<T> = DefaultReturnHookPage & T;
