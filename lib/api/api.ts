import axios from "axios";

export const nextServer = axios.create({
    baseURL:"https://notehub-api.goit.study",
    withCredentials:true,
});



// axios.defaults.baseURL = "https://notehub-api.goit.study";

// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

