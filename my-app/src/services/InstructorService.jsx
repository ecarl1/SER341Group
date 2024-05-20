import http from "./httpService";
import { getJwt } from "./authService";
import * as config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "labs/instructors";

function instructorUrl(id) {
    return `${apiEndpoint}/${id}`;
  };

  export function getInstructor(instructorID) {
    return http.get(instructorUrl(instructorID));
  };

