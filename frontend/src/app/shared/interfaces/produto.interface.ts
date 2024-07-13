export interface IProduto {
  id: number;
  descricao: string;
  custo: number;
  imagem: string;
  produtoloja: IProdutoLoja[];
}

export interface IProdutoLoja {
  id: number;
  idProduto: number;
  idLoja: number;
  precoVenda: number;
}

export interface ILoja {
  id: number;
  descricao: string;
  produtoloja: IProdutoLoja[];
}
