import {
  NEXT_PUBLIC_EIGHT_BASE_BASE_URL,
  NEXT_PUBLIC_EIGHT_BASE_WORKSPACE_ID,
  NEXT_PUBLIC_EIGHT_BASE_BRANCH_NAME,
  NEXT_PUBLIC_EIGHT_BASE_API_TOKEN,
  AUTH0_CLIENT_ID,
} from '../../environment';

/* eslint-disable no-useless-escape */
export const BASE_URL = NEXT_PUBLIC_EIGHT_BASE_BASE_URL;
export const WORKSPACE_ID = NEXT_PUBLIC_EIGHT_BASE_WORKSPACE_ID;
export const ENVIRONMENT_NAME = NEXT_PUBLIC_EIGHT_BASE_BRANCH_NAME || '';
export const EIGHT_BASE_PUBLIC_TOKEN = NEXT_PUBLIC_EIGHT_BASE_API_TOKEN;
export const WORKSPACE_ENDPOINT = `${BASE_URL}/${WORKSPACE_ID}${
  ENVIRONMENT_NAME !== '' ? `_${ENVIRONMENT_NAME}` : ''
}`;
export const AUTH_PROFILE_ID = process.env.AUTH0_PROFILE_ID;
export const AUTH_CLIENT_ID = AUTH0_CLIENT_ID || '';
export const AUTH_CLIENT_DOMAIN = process.env.AUTH0_CLIENT_DOMAIN || '';
export const EIGHTBASE_WS_ENDPOINT = 'wss://ws.8base.com';
export const AUTH_CLIENT_REDIRECT_URI = '';
export const AUTH_CLIENT_REDIRECT_LOGOUT = '';
// export const AUTH_CLIENT_REDIRECT_URI = (typeof window.location.origin != 'undefined')?`${window.location.origin}/auth/callback`:'';
// export const AUTH_CLIENT_REDIRECT_LOGOUT = (typeof window.location.origin != 'undefined')?`${window.location.origin}/logout`:'';

export const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const PASSWORD_REGEX = new RegExp('^(?=.{8,})');
export const PHONE_NUMBER_REGEX = /^\+(?:[0-9] ?){6,14}[0-9]$/;
export const INVERT_EMAIL_REGEX =
  /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/gi;
export const Days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
