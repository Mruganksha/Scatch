import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`, // your Express backend URL
  withCredentials: true, // allow sending cookies for sessions
});

export default instance;
