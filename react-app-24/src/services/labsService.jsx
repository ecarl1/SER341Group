import http from "./httpService";
import { getJwt } from "./authService";
import * as config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "labs";
// const apiEndpoint = "http://localhost:3000/" + "labs";

function labUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getLabs() {
  //console.log(getJwt());
  // http.setJwt(getJwt());
  return http.get(apiEndpoint);
}

export function getLab(labId) {
  // http.setJwt(getJwt());
  return http.get(labUrl(labId));
}

export function saveLab(lab) {
  // http.setJwt(getJwt());
  if (lab._id) {
    const body = { ...lab };
    delete body._id;
    return http.put(labUrl(lab._id), body);
  }

  return http.post(apiEndpoint, lab);
}

export function deleteLab(labId) {
  // http.setJwt(getJwt());
  return http.delete(labUrl(labId));
}