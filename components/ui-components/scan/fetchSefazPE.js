
import { XMLParser,XMLBuilder } from "fast-xml-parser";
import ShowToast from "../../helpers/ShowToast";
import { convertSefazPEResponse } from './convertSefazResponse'
import { SyncAlert } from "../../syncalert/SyncAlert";

export const fetchSefazPE = async (qrCodeData,MAX_ATTEMPTS=10, loggedUser) => {
let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      try {
        const response = await fetch(qrCodeData);
        const options = 
        {
          numberParseOptions: {
              leadingZeros: true,
              eNotation: false
          }
      }
        const parser = new XMLParser(options);
        let responseData = parser.parse(await response.text());
        let status = responseData?.nfeProc.protNFe.infProt.cStat;
        
        if (status !== 100) {
            await new Promise((resolve) => setTimeout(resolve, 300));
        } else {
            // console.log('status PE...... ', responseData?.nfeProc.protNFe.infProt.cStat)
          const conversion = convertSefazPEResponse(responseData, loggedUser);
          return conversion
        }
      } catch (error) {
        ShowToast("Erro ao acessar servidor PE. O App fará mais tentativas.");
      } finally {
        attempts++;
        console.log("Attempts. Tentativas sefaz PE : ", attempts);
      }
    }
    await SyncAlert(
      "Alerta",
      "Secretária da Fazenda PE não responde. Tente novamente.",
      "OK"
    );
    return null;
}