import { environment } from "./environments/environment";

export const ROOT_URL =
  "http://acfd7ed1bea40451186971170c811103-1023436132.us-east-2.elb.amazonaws.com:3000";
//environment.serviceUrl;
export const AUTH_URL = `${ROOT_URL}/auth`;
export const SIGN_IN_URL = `${AUTH_URL}/sign-in`;
export const SIGN_UP_URL = `${AUTH_URL}/sign-up`;
export const CHECK_TOKEN_IF_VALID = `${AUTH_URL}/check-auth`;

console.log(AUTH_URL);
