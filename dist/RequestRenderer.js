"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestRenderer = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

var _react = _interopRequireDefault(require("react"));

var _RequestStatus = _interopRequireDefault(require("./RequestStatus"));

var _RestContext = require("./RestContext");

var _Utils = require("./Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RequestRenderer extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: _RequestStatus.default.LOADING
    };
  }

  async sendRequest(url) {
    const preHeaders = {};

    if (this.context.auth) {
      const token = this.context.auth();

      if (token) {
        preHeaders["Authorization"] = token;
      }
    }

    const request = await fetch(url, {
      method: this.props.method || "get",
      body: this.props.body ? JSON.stringify(this.props.body) : null,
      headers: _objectSpread(_objectSpread({}, preHeaders), this.props.headers)
    }).catch(e => {
      this.setState({
        status: _RequestStatus.default.ERROR,
        error: e
      });
      return null;
    });

    if (request) {
      const statusCode = await request.status;
      const data = await request.json();
      this.setState({
        status: _RequestStatus.default.DATA,
        data,
        statusCode
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state === prevState && this.props.static !== true) {
      this.setState({
        status: _RequestStatus.default.LOADING
      });
    }
  }

  render() {
    if (this.state.status === _RequestStatus.default.LOADING) {
      this.sendRequest(new URL(this.props.path + (0, _Utils.objectToQuery)(this.props.query), this.context.url).href);
    }

    const {
      onData,
      onLoading,
      onError
    } = this.props;

    switch (this.state.status) {
      case _RequestStatus.default.DATA:
        return onData ? onData(this.state.data, this.state.statusCode) : null;

      case _RequestStatus.default.ERROR:
        return onError ? onError(this.state.error) : null;

      default:
        return onLoading ? onLoading() : null;
    }
  }

}

exports.RequestRenderer = RequestRenderer;

_defineProperty(RequestRenderer, "contextType", _RestContext.RestContext.Context);