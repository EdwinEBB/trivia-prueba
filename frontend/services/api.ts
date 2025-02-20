import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLICA_URL_BACKEND || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config)=>{
    const Tk= localStorage.getItem('token');
    if (Tk){
        config.headers.Authorization= `Bearer ${Tk}`;
    }

    return config
})

export default api