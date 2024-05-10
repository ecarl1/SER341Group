import http from "./httpService";
import { getJwt } from "./authService";
import * as config from "../config.json";

const { apiUrl } = config;

const apiEndpoint = apiUrl + "students";

function studentUrl(id) {
    return `${apiEndpoint}/${id}`;
  };

  export function getStudents() {
    //console.log(getJwt());
    // http.setJwt(getJwt());
    return http.get(apiEndpoint);
  };

  export function getStudent(studentID) {
    return http.get(studentUrl(studentID));
  };

  export function saveStudent(student) {
    if (student._id) {
      const body = { ...student };
      delete body._id;
      return http.put(studentUrl(student._id), body);
    }
  
    return http.post(apiEndpoint, student);
  };

  

