import ConsultaBA from "../../sefaz/ba";
import { convertSefazBAResponse } from "./convertSefazResponse";

export const fetchSefazBA = async (
  qrCodeURL,
  MAX_ATTEMPTS = 10,
  loggedUser
) => {
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    try {
      const queryBASefaz = new ConsultaBA(qrCodeURL);
      const resultData = await queryBASefaz.get();

      //100 fixo pois o sefaz nfce da Bahia não retorna status no html
      let status = 100;

      if (status !== 100) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      } else {
        return convertSefazBAResponse(resultData, loggedUser);
      }
    } catch (error) {
      ShowToast("Erro ao acessar servidor BA. O App fará mais tentativas.");
    } finally {
      attempts++;
      console.log("Attempts. Tentativas sefaz BA : ", attempts);
    }
  }
  await SyncAlert(
    "Alerta",
    "Secretária da Fazenda BA não responde. Tente novamente.",
    "OK"
  );
  return null;
};
