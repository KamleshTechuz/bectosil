// variables
import { ENVIRONMENT } from "../../environments/emvironment.local";
import axios from "axios";
// variables
const apiUrl = ENVIRONMENT.apiUrl;

// Get request
export const getData = async (reqUrl, params) => {
  const url = apiUrl + reqUrl;
  const response = await axios.get(url, { params });
  return response;
};

//  post request
export const postData = async (reqUrl, data) => {
  const url = apiUrl + reqUrl;
  const response = await axios.post(url, data);
  return response;
  // try {
  // } catch (error) {
  //   return error.response.data;
  // }
};

//  Put request
export const putData = async (reqUrl, data) => {
  const url = apiUrl + reqUrl;
  const response = await axios.put(url, data);
  return response;
};

// Delete request
export const deleteData = async (reqUrl, params) => {
  const url = apiUrl + reqUrl;

  const response = await axios.delete(url, { params });
  return response;
};
