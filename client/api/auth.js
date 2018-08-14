import config from 'config';
import { getCookie, setCookie, eraseCookie } from 'utils';
import moment from 'moment';
import {
  post,
  del,
  get,
  put
} from './utils';

let { apiUrl } = config;


if (!apiUrl) apiUrl = '';

export function getLocalToken() {
  return getCookie('token');
}

export function setLocalToken(token) {
  setCookie('token', token);
}

export function removeLocalToken() {
  eraseCookie('token');
}

export async function registerUserAPI(data) {
  return post(`${apiUrl}/user/register/`, data);
}

export async function setUserCredentialsAPI(data, token) {
  return post(`${apiUrl}/user/create/${token}/`, data);
}

export async function resetPasswordAPI(data, token1, token2) {
  if (data && token1 && token2) {
    return post(`${apiUrl}/user/reset_password/${token1}/${token2}/`, data);
  }
  return post(`${apiUrl}/user/change_password/`, data);
}

export async function verifyResetPwdTokenAPI(token1, token2) {
  return get(`${apiUrl}/user/reset_password/${token1}/${token2}/`);
}

export async function loginUserAPI(data) {
  return post(`${apiUrl}/user/login/`, data);
}

export async function forgotPasswordAPI(data) {
  return post(`${apiUrl}/user/forgot_password/`, data);
}

export async function userLogout() {
  return del(`${apiUrl}/user/logout/`, {});
}

export async function verifyloginAPI() {
  return post(`${apiUrl}/user/verify/`, {});
}

export async function verifyRegTokenAPI(token) {
  return get(`${apiUrl}/user/create/${token}/`);
}

export async function postContactUs(data) {
  return post(`${apiUrl}/contact_us/`, data);
}

export async function getUserEvents() {
  return get(`${apiUrl}/user_moderation/get_user_events/?${moment.now()}`);
}

export async function putUserCalendarFilter(data) {
  return put(`${apiUrl}/user_moderation/get_user_events`, data);
}

export async function postConferenceData(data) {
  return post(`${apiUrl}/user_moderation/get_user_events/`, data);
}

export async function getDisclosureInfo(id) {
  return post(`${apiUrl}/coverage/getDisclosureAndDisclaimer/`, { id });
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

export async function uploadImage(data) {
  return post(`${apiUrl}`, data);
}
