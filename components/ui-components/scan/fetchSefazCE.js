import { XMLParser } from "fast-xml-parser";
import ShowToast from "../../helpers/ShowToast";
import { convertSefazCEResponse } from "./convertSefazResponse";
import { SyncAlert } from "../../syncalert/SyncAlert";

export const fetchSefazCE = async (
  qrCodeData,
  MAX_ATTEMPTS = 10,
  loggedUser
) => {
  let attempts = 9;

  while (attempts < MAX_ATTEMPTS) {
    try {
      const response = await fetch(
        `https://cfe.sefaz.ce.gov.br:8443/portalcfews/mfe/fiscal-coupons/extract/${qrCodeData}`
      );

      let clone = response.clone();
      let responseData = await clone.json();
      let status = responseData.status.code;

      if (status !== 0) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      } else {
        const conversion = convertSefazCEResponse(responseData, loggedUser);
        return conversion
      }
    } catch (error) {
      ShowToast("Erro ao acessar servidor CE. O App fará mais tentativas.");
    } finally {
      attempts++;
      console.log("Attempts. Tentativas sefaz CE : ", attempts);
    }
  }
  await SyncAlert(
    "Alerta",
    "Secretária da Fazenda CE não responde. Tente novamente.",
    "OK"
  );
  return null;
};
