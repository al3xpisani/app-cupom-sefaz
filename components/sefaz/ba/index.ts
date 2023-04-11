import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto, CheerioStatic } from '../nfe-dados/nfe-dados';

export default class ConsultaBA {
  private axiosConfig: AxiosRequestConfig = {
    method: 'post',
    params: {},
    timeout: 1000 * 60,
    url: '',
  };
  private html!: CheerioStatic;
  private chave: string;

  private extractURLParam(url: string): any {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match: any[];
    while (match = regex.exec(url)) {
      console.log('matchh........................ ', match)
      params[match[1]] = match[2];
  }
  return params["p"].split('|')
}

constructor(qrCodeURL: string) {
  const chaveNFe = this.extractURLParam(qrCodeURL)
  // if (chaveNFe.length === 0) throw new Error('Não foi possível detectar a chave do parâmetro');
  // console.log('params.... ', chaveNFe)

    // this.axiosConfig.data = {
    //   chave_acesso: chaveNFe[0],
    //   versao_qrcode: chaveNFe[1],
    //   tipo_ambiente: chaveNFe[2],
    //   identificador_csc: chaveNFe[3],
    //   codigo_hash: chaveNFe[4],
    // };
    this.axiosConfig.params.HML = false;
    this.axiosConfig.url = qrCodeURL;
    this.chave = chaveNFe[0]
  }

  public async get(): Promise<nfeDados> {
    return this.fetchData()
                  .then(cheerio.load)
                  .then(
                        (html: CheerioStatic): nfeDados => {
                          this.html = html;
                          return {
                            cabecalho: this.getCabecalho(),
                            emitente: this.getEmitente(),
                            produtos: this.getProdutos(),
                            chave: this.chave,
                          };
                        },
                  );
  }

  private getCabecalho(): ICabecalho {
    const $ = this.html;
    const format = 'DD/MM/YYYY HH:mm:ssZ';
    const scope = '#infos > div:nth-child(1) > ul > li';
    const objDataEmissao = moment(
                  $('strong:nth-of-type(4)', scope)[0].next.data || '',
                  format,
            );
    const numero: string =
                  $('strong:nth-of-type(3)', scope)[0].next.data || '';
    const serie: string =
                  $('strong:nth-of-type(4)', scope)[0].next.data || '';
    const protocolo: string =
                  $('strong:nth-of-type(5)', scope)[0].next.data || '';
    const strTotal: string =
                  $('#totalNota > #linhaTotal:nth-child(2) > span').html() ||
                  '0';
    const dataEmissao: string | Date | null = objDataEmissao.isValid()
                  ? objDataEmissao.toISOString(true)
                  : null;

    const total: number = Number(
                  strTotal.split('.').join('').replace(',', '.'),
            );

    let scopeTotalNota = `#totalNota`
    const labelDesconto = $('div:nth-of-type(3) > label', scopeTotalNota)[0].children[0].data;

    let descontoTotal: any = ''
    if(String(labelDesconto).toLowerCase().search('desconto') !== -1){
      descontoTotal = $('div:nth-of-type(3) > span', scopeTotalNota)[0].children[0].data;
      descontoTotal = descontoTotal.split('.').join('').replace(',', '.')
      console.log('$$$$$$$$$$$ desconto ', $('div:nth-of-type(3) > span', scopeTotalNota)[0].children[0].data)
    }
    return {
      dataEmissao,
      numero,
      serie,
      protocolo,
      total,
      dataEntradaSaida: null,
      modelo: null,
      descontoTotal: descontoTotal
    };
  }

  private getEmitente(): IEmitente {
    const $ = this.html;
    const scope = '#conteudo > div:nth-child(2)';

    const nome: string = $('div:nth-child(1)', scope).html() || '';
    const razaoSocial: string =
                  $('div:nth-child(1)', scope).html() || '';

    let cnpj: string = $('div:nth-child(2)', scope).html() || '';
    const endereco: string = $('div:nth-child(3)', scope).html() || '';

    cnpj = cnpj.split(':')[1];
    const aux = endereco.split(',');
    const rua: string = `${aux[0]}, ${aux[1]}`;
    const bairro: string = aux[3];
    const estado: string = aux[4];
    const cidade: string = aux[5];
    
    return {
      nome,
      razaoSocial,
      cnpj,
      rua,
      bairro,
      cidade,
      estado,
      telefone: null,
      cep: null,
      ibge: null,
    };
  }

  private getProdutos(): IProduto[] {
    const $ = this.html;
            // const scope = "#tabResult"
    let scope: string;
    const lista: any = [];

    let count = 0;
    while (true) {
      count += 1;
      scope = `#conteudo > table > tbody > tr:nth-of-type(${count}) > td`;
      const descricao = $('span:nth-of-type(1)', scope).html();
      if (descricao === null) break;
      const codigo = $('span:nth-of-type(2)', scope).text();
                  // console.log($("span:nth-of-type(5) > strong", scope)[0].next.data);
      const quantidade = $('span:nth-of-type(3) > strong', scope)[0]
                        .next.data;
      const unidade = $('span:nth-of-type(4) > strong', scope)[0]
                        .next.data;
      const preco = $('span:nth-of-type(5) > strong', scope)[0].next
                        .data;
      const vlTotal = $('span:nth-of-type(1)', scope)[1].children[0].data

      lista.push({
        descricao,
        quantidade,
        unidade,
        preco,
        codigo,
        NCM: null,
        eanComercial: null,
        vlTotal: vlTotal,
      });
    }
    return lista.map(
                  (produto: any): IProduto => {
                    const descricao: string = produto.descricao
                              .split('&amp;')
                              .join('');
                    const quantidade: number = Number(
                              produto.quantidade
                                    .split('.')
                                    .join()
                                    .replace(',', '.'),
                        );
                    const unidade: string = produto.unidade.trim();
                    const preco: number = Number(
                              produto.preco.split('.').join().replace(',', '.'),
                        );
                    const codigo: number | null =
                              Number(
                                    produto.codigo
                                          .split(':')[1]
                                          .split(')')[0]
                                          .trim(),
                              ) || null;
                    const vlTotal: string = produto.vlTotal;
                    return {
                      descricao,
                      quantidade,
                      unidade,
                      preco,
                      codigo,
                      NCM: null,
                      eanComercial: null,
                      vlTotal: vlTotal,
                    };
                  },
            );
  }
  private fetchData(): any {
    return axios(this.axiosConfig)
                  .then(res => {
                    console.log('res axios...... ', res.data)
                    return res.data})
                  .catch(() => {
                    throw new Error(
                              'Não foi possível efetuar o download da NFE',
                        );
                  });
  }
}