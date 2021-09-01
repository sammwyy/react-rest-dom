export function objectToQuery(object = {}) {
  let str = "";

  for (let key of Object.keys(object)) {
    if (str === "") {
      str = "?";
    }

    str += key + "=" + object[key];
  }

  return str;
}
