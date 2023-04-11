import ConsultaBA from "../../sefaz/ba"
import { convertSefazBAResponse } from "./convertSefazResponse"

export const fetchSefazBA = async(qrCodeURL, loggedUser) => {
    const queryBASefaz = new ConsultaBA(qrCodeURL)
    const resultData = await queryBASefaz.get()
    return convertSefazBAResponse(resultData, loggedUser)
}