import Cookies from 'js-cookie';
//将时间戳转换为具体的时间,//传给后端的是时间戳
export const timestampToTime = (timestamp) => {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear();
  var M =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var D = date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

export const timestampToMoment = (timestamp, left = false) => {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear();
  var M =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var D = date.getDate();
  if (left) {
    return `${Y}/${M}/${D - 1}`;
  } else {
    return `${Y}/${M}/${D}`;
  }
};

const tokenKey = 'sharedHouse_token';

export function getToken() {
  return Cookies.get(tokenKey);
}

export function setToken(token) {
  return Cookies.set(tokenKey, token);
}

export function removeToken() {
  return Cookies.remove(tokenKey);
}
