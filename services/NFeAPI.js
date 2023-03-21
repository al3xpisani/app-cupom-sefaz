import axios from "axios";
import { nfeCredentials } from "../config/nfe-credentials";

const NfeAPI = axios.create({
    baseURL: "https://webmaniabr.com/api/1/nfe/",
    headers: {
        "X-Consumer-Key": nfeCredentials.consumerKey,
        "X-Consumer-Secret": nfeCredentials.consumerSecret,
        "X-Token": nfeCredentials.xToken,
        "Content-Type": "application/json"
    }
});

export default NfeAPI;