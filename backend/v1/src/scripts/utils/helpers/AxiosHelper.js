import axios from "axios";
import UrlHelper from "./UrlHelper.js";

export const publicRequest = axios.create({
    baseURL: UrlHelper.getBaseURL(),
})

export const finnHubRequest = axios.create({
})
