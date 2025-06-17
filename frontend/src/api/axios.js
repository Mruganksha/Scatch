import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // your Express backend URL
  withCredentials: true, // allow sending cookies for sessions
});

export default instance;
