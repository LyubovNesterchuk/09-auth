
 import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// const nextServer = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   withCredentials: true, 
// });