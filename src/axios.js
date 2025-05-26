import axios from "axios";

const intance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

intance.interceptors.request.use((config)=>{
    config.headers.authorization = window.localStorage.getItem('token');
    return config
});


export default intance;
// process.env.REACT_APP_API_URL