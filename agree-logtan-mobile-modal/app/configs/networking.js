/* global fetch:false */
import { API_URL } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';
// import tokenService from '../utils/tokens';
import cacheService from '../utils/cache';
import { STORAGE_KEY } from '../constants';

export const config = {
  baseUrl: API_URL
};

export const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  NO_CONTENT: 204
};

const fetchData = async (url, params, customHeaders, cachedControll) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await AsyncStorage.getItem(STORAGE_KEY.TOKEN)}`,
    ...customHeaders
  };

  // const tokens = await tokenService.get();
  // if (tokens) {
  //   headers = {
  //     ...headers,
  //     Authorization: `Bearer ${tokens.accessToken}`
  //   };
  // }

  const response = await fetch(url, {
    ...params,
    headers
  });
  // for DELETE method case
  if (response.status === STATUS_CODE.NO_CONTENT) return {};
  const json = await response.json();
  // for caching response API
  if (cachedControll) {
    await cacheService.set(cachedControll, json);
  }
  return json;
};

const get = async (endpoint, params = {}, cachedControll = {}, headers = {}, mockup) => {
  const { cached = false, update = false, name } = cachedControll;
  let queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }
  let url;
  if (mockup === true) {
    url = `https://virtserver.swaggerhub.com/telkomdds/AgreeMockupApi/1.0.0${endpoint}${queryString}`;
  } else {
    url = `${config.baseUrl}${endpoint}${queryString}`;
  }
  const fetchParams = {
    method: 'GET'
  };

  if (!update && cached && name) {
    const result = await cacheService.get(name);
    if (result) {
      return result;
    }
  }
  return fetchData(url, fetchParams, headers, cachedControll);
};

// const post = async (endpoint, params = {}, headers = {}) => {
//   const url = `${config.baseUrl}${endpoint}`;
//   const fetchParams = {
//     method: 'POST',
//     body: JSON.stringify(params)
//   };
//   return fetchData(url, fetchParams, headers);
// };

const post = async (endpoint, params = {}, headers = {}) => {
  // if (login === true) {
  //   url = `http://agree-modal-api-dev.vsan-apps.playcourt.id/api/agree-modal/auth0/v1/login`;
  // } else {
  const url = `${config.baseUrl}${endpoint}`;
  // }
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const patch = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PATCH',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const put = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PUT',
    body: JSON.stringify(params)
  };
  return fetchData(url, fetchParams, headers);
};

const remove = async (endpoint, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'DELETE'
  };
  return fetchData(url, fetchParams, headers);
};

export { get, post, put, patch, remove };
