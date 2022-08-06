//export const API_DOMAIN = 'https://tl-api.tungnt.xyz';
export const API_DOMAIN =
  location.hostname.indexOf("truclamdalat") >= 0
    ? "https://api.truclamdalat.com"
    : "https://tl-api.tungnt.xyz";

export const REGISTRATIONS_STATUS = {
  NEW: 0,
  APPROVED: 1,
  REJECTED: 2,
};
