import axios from "axios";

const axiosInstance = axios.create({
  // local baseURL
  // baseURL: "http://127.0.0.1:5001/clone-b3273/us-central1/api", 


  // deployed virsion of firebase function
  baseURL:"https://api-ooba33pzba-uc.a.run.app",
});

export { axiosInstance };
