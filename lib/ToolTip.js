"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("./Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var portalNodes = {};

var getReactDomClient = function getReactDomClient() {
  try {
    // eslint-disable-next-line global-require
    return require('react-dom/client');
  } catch (e) {
    return null;
  }
};

var ToolTip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ToolTip, _React$Component);

  function ToolTip() {
    _classCallCheck(this, ToolTip);

    return _possibleConstructorReturn(this, _getPrototypeOf(ToolTip).apply(this, arguments));
  }

  _createClass(ToolTip, [{
    key: "createPortal",
    value: function createPortal() {
      var node = document.createElement('div');
      node.className = 'ToolTipPortal';
      document.body.appendChild(node);
      var portal = {
        node: node,
        timeout: false,
        root: null
      };
      var ReactDOMClient = getReactDomClient();

      if (ReactDOMClient && typeof ReactDOMClient.createRoot === 'function') {
        portal.root = ReactDOMClient.createRoot(node);
      }

      portalNodes[this.props.group] = portal;
    }
  }, {
    key: "renderPortal",
    value: function renderPortal(props) {
      if (!portalNodes[this.props.group]) {
        this.createPortal();
      }

      var parent = props.parent,
          other = _objectWithoutProperties(props, ["parent"]);

      var parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
      var portal = portalNodes[this.props.group];

      var element = _react.default.createElement(_Card.default, _extends({
        parentEl: parentEl
      }, other));

      if (portal.root) {
        portal.root.render(element);
      } else {
        _reactDom.default.render(element, portal.node);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.active) {
        return;
      }

      this.renderPortal(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this = this;

      var nextProps = this.props;

      if (!portalNodes[this.props.group] && !nextProps.active || !prevProps.active && !nextProps.active) {
        return;
      }

      var props = _objectSpread({}, nextProps);

      var newProps = _objectSpread({}, nextProps);

      if (portalNodes[this.props.group] && portalNodes[this.props.group].timeout) {
        clearTimeout(portalNodes[this.props.group].timeout);
      }

      if (prevProps.active && !props.active) {
        newProps.active = true;
        portalNodes[this.props.group].timeout = setTimeout(function () {
          props.active = false;

          _this.renderPortal(props);
        }, nextProps.tooltipTimeout);
      }

      this.renderPortal(newProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (portalNodes[this.props.group]) {
        var portal = portalNodes[this.props.group];

        if (portal.root) {
          portal.root.unmount();
        } else {
          _reactDom.default.unmountComponentAtNode(portal.node);
        }

        clearTimeout(portalNodes[this.props.group].timeout);

        try {
          document.body.removeChild(portal.node);
        } catch (e) {}

        portalNodes[this.props.group] = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return ToolTip;
}(_react.default.Component);

exports.default = ToolTip;

_defineProperty(ToolTip, "propTypes", {
  parent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired,
  active: _propTypes.default.bool,
  group: _propTypes.default.string,
  tooltipTimeout: _propTypes.default.number
});

_defineProperty(ToolTip, "defaultProps", {
  active: false,
  group: 'main',
  tooltipTimeout: 500
});