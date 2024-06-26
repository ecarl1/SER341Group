import { jwtDecode } from "jwt-decode";
import http from "./httpService";
import * as config from "../config.json";

const { apiUrl } = config;
const apiEndpoint = apiUrl + "users/";
const tokenKey = "token";

//http.setJwt(getJwt());

export async function login(username, password) {
  console.log("username", username);
  console.log("password", password);
  const { data: jwt } = await http.post(apiEndpoint + "login", {
    username: username,
    password: password,
  });
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  const respond = await http.get(apiEndpoint + "logout");
  console.log(respond);
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
const exportedMethods = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default exportedMethods;
