"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Context = /*#__PURE__*/_react.default.createContext();

function Provider(_ref) {
  let {
    children,
    url,
    auth
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Context.Provider, {
    value: {
      url,
      auth
    }
  }, children);
}

const RestContext = {
  Context,
  Provider
};
exports.RestContext = RestContext;