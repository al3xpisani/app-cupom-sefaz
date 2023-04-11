import { convertBrazilTimeStampToISO } from "../../../utils/TimeStamp";

export const convertSefazBAResponse = (QRCodeExtraction, loggedUser) => {
    let nfe = {}
    nfe.chave = QRCodeExtraction.chave;
    nfe.consumidor = 'Não informado'
    nfe.email = loggedUser
    nfe.data_emissao = QRCodeExtraction.cabecalho.dataEmissao
    nfe.protocolo = QRCodeExtraction.cabecalho.protocolo
    nfe.status = 100
    nfe.numero = QRCodeExtraction.cabecalho.numero
    nfe.serie = QRCodeExtraction.cabecalho.serie
    nfe.total = Number(QRCodeExtraction.cabecalho.total - QRCodeExtraction.cabecalho.descontoTotal).toFixed(2)
    nfe.razao_social = QRCodeExtraction.emitente.razaoSocial
    nfe.totalSemDesconto = QRCodeExtraction.cabecalho.total
    nfe.emitente = {
        CNPJ: QRCodeExtraction.emitente.cnpj,
        CRT: '',
        IE: '',
        xNome: QRCodeExtraction.emitente.razaoSocial,
        enderEmit: {
            CEP: '',
            UF: 'BA',
            cMun: QRCodeExtraction.emitente.estado,
            cPais: 1058,
            nro: 'SN',
            xBairro: QRCodeExtraction.emitente.bairro,
            xLgr: QRCodeExtraction.emitente.rua,
            xMun: QRCodeExtraction.emitente.cidade,
            xPais: 'Brasil'
        }
    }
    nfe.produtos = QRCodeExtraction.produtos.map((item) => {
        return {
                prod: {
                    CEST: 0,
                    CFOP: 0,
                    NCM: 0,
                    cEAN: '',
                    cEANTrib: '',
                    cProd: item.codigo,
                    indTot: item.quantidade,
                    qTrib: item.quantidade,
                    uTrib: item.unidade,
                    vProd: item.vlTotal,
                    vUnTrib: item.preco,
                    xProd: item.descricao
                }
        }
    })
    return nfe
}
export const convertSefazCEResponse = (QRCodeExtraction, loggedUser) => {
    let nfe = {}
    nfe.chave = QRCodeExtraction.coupon.cfeKey;
    nfe.consumidor = QRCodeExtraction.customer?? 'Não informado'
    nfe.email = loggedUser
    nfe.data_emissao = convertBrazilTimeStampToISO(QRCodeExtraction.coupon.emissionDate)
    nfe.protocolo = QRCodeExtraction.coupon.extractNumber
    nfe.status = 100
    nfe.numero = QRCodeExtraction.coupon.satNumber
    nfe.serie = QRCodeExtraction.coupon.mfe.serialNumber
    nfe.total = Number(QRCodeExtraction.coupon.subTotal).toFixed(2)
    nfe.razao_social = QRCodeExtraction.coupon.companyName

    let totalNoDiscount = QRCodeExtraction.coupon.total.gross?? "0"
    nfe.totalSemDesconto = totalNoDiscount
    nfe.emitente = {
        CNPJ: QRCodeExtraction.coupon.taxIdNumber,
        CRT: '',
        IE: '',
        xNome: QRCodeExtraction.coupon.companyName,
        enderEmit: {
            CEP: QRCodeExtraction.coupon.address.zipCode,
            UF: 'CE',
            cMun: QRCodeExtraction.coupon.address.city.name,
            cPais: 1058,
            nro: QRCodeExtraction.coupon.address.number,
            xBairro: QRCodeExtraction.coupon.address.neighborhood,
            xLgr: QRCodeExtraction.coupon.address.street,
            xMun: QRCodeExtraction.coupon.address.city.name,
            xPais: 'Brasil'
        }
    }
    nfe.produtos = QRCodeExtraction.coupon.items.map((item) => {
        return {
                prod: {
                    CEST: 0,
                    CFOP: 0,
                    NCM: 0,
                    cEAN: '',
                    cEANTrib: '',
                    cProd: item.code,
                    indTot: item.amount,
                    qTrib: item.amount,
                    uTrib: item.un,
                    vProd: item.price * item.amount,
                    vUnTrib: item.price,
                    xProd: item.description
                }
        }
    })
    console.log('nfe .... ', nfe)
    return nfe
}

export const convertSefazPEResponse = (QRCodeExtraction, loggedUser) => {
    let nfe = {}
    nfe.chave = QRCodeExtraction.nfeProc.proc.nfeProc.protNFe.infProt.chNFe
    nfe.consumidor = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.dest?.CPF?? 'Não informado'
    nfe.email = loggedUser
    nfe.data_emissao = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.ide.dhEmi
    nfe.protocolo = QRCodeExtraction.nfeProc.protNFe.infProt.nProt
    nfe.status = QRCodeExtraction.nfeProc.protNFe.infProt.cStat
    nfe.numero = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.ide.nNF
    nfe.serie = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.ide.serie
    nfe.total = Number(QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.total.ICMSTot.vNF).toFixed(2)
    nfe.totalSemDesconto = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.total.ICMSTot.vProd
    nfe.emitente = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.emit
    nfe.produtos = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.det
    nfe.razao_social = QRCodeExtraction.nfeProc.proc.nfeProc.NFe.infNFe.emit.xNome
    return nfe
}