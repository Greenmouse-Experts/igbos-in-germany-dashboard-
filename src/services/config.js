import axios from "axios";
import { getLocalToken } from "./helpers";

const requestAutorization = () => {
  const token  = localStorage.getItem("igbo_token");
  // console.log("custom token",token)
  return `Bearer ${token}`;
};
// console.log(requestAutorization());

export const Custom = axios.create({
  baseURL: "https://api.ndiigbogermany.org/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: requestAutorization(),
  },
});

export const CustomAdd = axios.create({
  baseURL: "https://api.ndiigbogermany.org/api",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: requestAutorization(),
  },
});
