export type ICabecalho = {
    modelo: string | null;
    serie: string;
    numero: string;
    dataEmissao: string | Date | null;
    protocolo: string;
    dataEntradaSaida: Date | null;
    total: number;
    descontoTotal: string;
  }
  
  export type IEmitente = {
    nome: string;
    razaoSocial: string;
    cnpj: string;
    rua: string | null;
    bairro: string | null;
    cep: number | null;
    cidade: string | null;
    ibge: number | null;
    telefone: string | null;
    estado: string;
  }
  
  export type IProduto = {
    descricao: string;
    quantidade: number;
    unidade: string;
    preco: number;
    codigo: number | null;
    NCM: number | null;
    eanComercial: number | null;
    vlTotal: string; 
  }
  
  type IRootObject = {
    cabecalho: ICabecalho;
    emitente: IEmitente;
    produtos: IProduto[];
    chave: string;
  }

  export type CheerioStatic = any
  export default IRootObject