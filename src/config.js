import { environment } from "./environments/environment";

export const ROOT_URL = environment.serviceUrl;
export const AUTH_URL = `${ROOT_URL}/auth`;
export const SIGN_IN_URL = `${AUTH_URL}/sign-in`;
export const SIGN_UP_URL = `${AUTH_URL}/sign-up`;
export const CHECK_TOKEN_IF_VALID = `${AUTH_URL}/check-auth`;

console.log(AUTH_URL);
