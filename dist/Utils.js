"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectToQuery = objectToQuery;

require("core-js/modules/web.dom-collections.iterator.js");

function objectToQuery() {
  let object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let str = "";

  for (let key of Object.keys(object)) {
    if (str === "") {
      str = "?";
    }

    str += key + "=" + object[key];
  }

  return str;
}