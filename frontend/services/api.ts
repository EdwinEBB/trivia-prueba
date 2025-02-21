import axios from "axios";


const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BACKEND || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});


export default Api