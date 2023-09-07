import axios from "axios";
import { TEST_URL } from "./UrlHepler.js";

const BASE_URL = TEST_URL;

// const currentUser =JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser; 
// let TOKEN =''
// if(currentUser){
//     //INFO: HOW TO DYNAMICALLY GET ACCESSTOKEN WITH REDUX-PERSIST!
//     TOKEN = currentUser.accessToken;
//     //TIP: root: go to store and see key  value of the persistConfig. It's root! 
// }

//INFO: How to create an axios 
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

// export const userRequest = axios.create({
//     baseURL:BASE_URL,
//     header: {
//         token:`Bearer ${TOKEN}`
//     }
// })