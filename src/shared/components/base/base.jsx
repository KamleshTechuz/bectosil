import Cookies from "js-cookie";
import * as CryptoJS from "crypto-js";

// get token
export const getToken = (key) => {
  const data = Cookies.get(key);
  return data ? JSON.parse(data) : null;
};

// remove token
export const removeToken = (key) => {
  Cookies.remove(key);
};

// navigate to url
export const routingFunction = (param) => {
  this.props.history.push(param);
};

//  set token
export const setToken = (key, value) => {
  Cookies.set(key, JSON.stringify(value));
};

const clearToken = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};

export const logout = () => {
  clearToken();
};

export const encrypt = (id, encryptKey = "bectosil") => {
  const deviceId = encryptKey ? getToken("device-id") : encryptKey;
  return CryptoJS.AES.encrypt(`${id}`, `${deviceId}`).toString();
};

export const decrypt = (id, encryptKey = "bectosil") => {
  const deviceId = encryptKey ? getToken("device-id") : encryptKey;
  const decryptedId = CryptoJS.AES.decrypt(id.replaceAll(' ', '+'), `${deviceId}`);
  return decryptedId.toString(CryptoJS.enc.Utf8);
};
