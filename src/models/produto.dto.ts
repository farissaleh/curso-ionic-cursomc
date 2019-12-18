export interface ProdutoDTO {
  id: string;
  nome: string;
  preco: number;
  imageUrl? : string // ? n precisa ter, n quebra se do back n vier
}
