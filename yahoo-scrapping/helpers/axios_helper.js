import axios from "axios";
import UrlProvider from "./url_helper.js";

//INFO: How to create an axios 
export const publicRequest = axios.create({
    baseURL: UrlProvider.getBaseURL(),
})
export const defaultRequest = axios.create();
