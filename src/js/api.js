import { API_DOMAIN } from "../js/constant";
let sid = localStorage.getItem("sid");

export const getCurrentUser = () => {
  return get("/accounts/me");
};

export const login = async (phone, password) => {
  let resp = await post("/accounts/login", { phone, password });
  if (resp.error == 0) {
    sid = resp.data.jwt;
    localStorage.setItem("sid", sid);
    return resp.data;
  }
  return null;
};

export const getListRegistration = (param) => {
  return get("/registration-infos", param);
};
export const getRegistration = (id) => {
  return get(`/registration-infos/${id}`);
};
export const uploadImage = async (data) => {
  return upload("/upload/photo", data);
};
export const register = (data) => {
  return post("/registration-infos", data);
};
export const sendEmail = (data) => {
  return post(`/registration-infos/send-email`, data);
};
export const updateRegistration = (data) => {
  return put(`/registration-infos/${data.id}`, data);
};
const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p] != null) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_DOMAIN}${url}?${serialize(params)}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sid}`,
      },
    })
      .then((body) => body.json())
      .then((resp) => resolve(resp))
      .catch((e) => reject(e));
  });
};

const post = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_DOMAIN}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sid}`,
      },
      processData: false,
      body: JSON.stringify(data),
    })
      .then((body) => body.json())
      .then((resp) => resolve(resp))
      .catch((e) => reject(e));
  });
};

const put = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_DOMAIN}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sid}`,
      },
      body: JSON.stringify(data),
    })
      .then((body) => body.json())
      .then((resp) => resolve(resp))
      .catch((e) => reject(e));
  });
};

const upload = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_DOMAIN}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sid}`,
      },
      body: data,
    })
      .then((body) => body.json())
      .then((resp) => resolve(resp))
      .catch((e) => reject(e));
  });
};
