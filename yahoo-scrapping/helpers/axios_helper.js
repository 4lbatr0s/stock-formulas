import axios from "axios";
import { BASE_URL, getScrappingURL } from "./url_helper.js";


//INFO: How to create an axios 
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

// export const userRequest = axios.get({
//     baseURL:getScrappingURL(),
//     header: {
//         token:`Bearer ${TOKEN}`
//     }
// })

