import config from 'config';
import { getCookie, setCookie, eraseCookie } from 'utils';
import {
  post,
  del,
  get,
  uploadFile,
} from './utils';

let { apiUrl, dataAPIUrl } = config;


if (!apiUrl) apiUrl = '';

if (!dataAPIUrl) dataAPIUrl = '';

export function getLocalToken() {
  return getCookie('token');
}

export function setLocalToken(token) {
  setCookie('token', token);
}

export function removeLocalToken() {
  eraseCookie('token');
}

export async function loginUserAPI(data) {
  return post(`${apiUrl}/user/login/`, data);
}

export async function userLogout() {
  return del(`${apiUrl}/user/logout/`, {});
}

export async function verifyloginAPI() {
  return post(`${apiUrl}/user/verify/`, {});
}

export async function getUnchainedAppData(page) {
  return get(`${apiUrl}/unchained/build/get-json/${page}/`);
}

/*
  body: {
    type: "blog.BlogPage",
    body: [] // page body
  }
*/

export async function updateCMDData(id, json) {
  return post(`${apiUrl}/save-page/${id}/`, json);
}

/*
  {
    title: name of image.
    file: file,
  }
*/

export async function uploadImage(data) {
  return uploadFile(data, '/upload-image/');
}

export async function getImages() {
  return get(`${dataAPIUrl}/images`);
}

export async function errorLogger(data) {
  return post(`${apiUrl}/log`, data);
}
