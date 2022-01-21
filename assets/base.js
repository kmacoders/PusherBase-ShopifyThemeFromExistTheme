/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/dawn/global.js":
/*!************************************!*\
  !*** ./src/scripts/dawn/global.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"));
}

document.querySelectorAll('[id^="Details-"] summary').forEach(function (summary) {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', 'false');

  if (summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', function (event) {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });
  if (summary.closest('header-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});
var trapFocusHandlers = {};

function trapFocus(container) {
  var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];
  removeTrapFocus();

  trapFocusHandlers.focusin = function (event) {
    if (event.target !== container && event.target !== last && event.target !== first) return;
    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function () {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.

    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    } //  On the first focusable element and tab backward, focus the last element.


    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);
  elementToFocus.focus();
} // Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.


try {
  document.querySelector(":focus-visible");
} catch (_unused) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  var navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN'];
  var currentFocusedElement = null;
  var mouseClick = null;
  window.addEventListener('keydown', function (event) {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });
  window.addEventListener('mousedown', function (event) {
    mouseClick = true;
  });
  window.addEventListener('focus', function () {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');
    if (mouseClick) return;
    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');
  }, true);
}

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach(function (video) {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach(function (video) {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach(function (video) {
    return video.pause();
  });
  document.querySelectorAll('product-model').forEach(function (model) {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

function removeTrapFocus() {
  var elementToFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;
  var openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;
  var summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}

var QuantityInput = /*#__PURE__*/function (_HTMLElement) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(QuantityInput, _HTMLElement);

  var _super = _createSuper(QuantityInput);

  function QuantityInput() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, QuantityInput);

    _this = _super.call(this);
    _this.input = _this.querySelector('input');
    _this.changeEvent = new Event('change', {
      bubbles: true
    });

    _this.querySelectorAll('button').forEach(function (button) {
      return button.addEventListener('click', _this.onButtonClick.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this)));
    });

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(QuantityInput, [{
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var previousValue = this.input.value;
      event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
      if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
    }
  }]);

  return QuantityInput;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(HTMLElement));

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  var _this2 = this;

  var t;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(t);
    t = setTimeout(function () {
      return fn.apply(_this2, args);
    }, wait);
  };
}

function fetchConfig() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/".concat(type)
    }
  };
}
/*
 * Shopify Common JS
 *
 */


if (typeof window.Shopify == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];

    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on' + eventName, callback);
};

Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);
  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));
  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function initCountry() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },
  initProvince: function initProvince() {
    var value = this.provinceEl.getAttribute('data-default');

    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },
  countryHandler: function countryHandler(e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);
    this.clearOptions(this.provinceEl);

    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },
  clearOptions: function clearOptions(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },
  setOptions: function setOptions(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

var MenuDrawer = /*#__PURE__*/function (_HTMLElement2) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(MenuDrawer, _HTMLElement2);

  var _super2 = _createSuper(MenuDrawer);

  function MenuDrawer() {
    var _this3;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, MenuDrawer);

    _this3 = _super2.call(this);
    _this3.mainDetailsToggle = _this3.querySelector('details');
    if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', "".concat(window.innerHeight, "px"));

    _this3.addEventListener('keyup', _this3.onKeyUp.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this3)));

    _this3.addEventListener('focusout', _this3.onFocusOut.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this3)));

    _this3.bindEvents();

    return _this3;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(MenuDrawer, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this4 = this;

      this.querySelectorAll('summary').forEach(function (summary) {
        return summary.addEventListener('click', _this4.onSummaryClick.bind(_this4));
      });
      this.querySelectorAll('button').forEach(function (button) {
        return button.addEventListener('click', _this4.onCloseButtonClick.bind(_this4));
      });
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;
      var openDetailsElement = event.target.closest('details[open]');
      if (!openDetailsElement) return;
      openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
    }
  }, {
    key: "onSummaryClick",
    value: function onSummaryClick(event) {
      var summaryElement = event.currentTarget;
      var detailsElement = summaryElement.parentNode;
      var isOpen = detailsElement.hasAttribute('open');
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      function addTrapFocus() {
        trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
        summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
      }

      if (detailsElement === this.mainDetailsToggle) {
        if (isOpen) event.preventDefault();
        isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
      } else {
        setTimeout(function () {
          detailsElement.classList.add('menu-opening');
          summaryElement.setAttribute('aria-expanded', true);
          !reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
        }, 100);
      }
    }
  }, {
    key: "openMenuDrawer",
    value: function openMenuDrawer(summaryElement) {
      var _this5 = this;

      setTimeout(function () {
        _this5.mainDetailsToggle.classList.add('menu-opening');
      });
      summaryElement.setAttribute('aria-expanded', true);
      trapFocus(this.mainDetailsToggle, summaryElement);
      document.body.classList.add("overflow-hidden-".concat(this.dataset.breakpoint));
    }
  }, {
    key: "closeMenuDrawer",
    value: function closeMenuDrawer(event) {
      var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (event !== undefined) {
        this.mainDetailsToggle.classList.remove('menu-opening');
        this.mainDetailsToggle.querySelectorAll('details').forEach(function (details) {
          details.removeAttribute('open');
          details.classList.remove('menu-opening');
        });
        document.body.classList.remove("overflow-hidden-".concat(this.dataset.breakpoint));
        removeTrapFocus(elementToFocus);
        this.closeAnimation(this.mainDetailsToggle);
      }
    }
  }, {
    key: "onFocusOut",
    value: function onFocusOut(event) {
      var _this6 = this;

      setTimeout(function () {
        if (_this6.mainDetailsToggle.hasAttribute('open') && !_this6.mainDetailsToggle.contains(document.activeElement)) _this6.closeMenuDrawer();
      });
    }
  }, {
    key: "onCloseButtonClick",
    value: function onCloseButtonClick(event) {
      var detailsElement = event.currentTarget.closest('details');
      this.closeSubmenu(detailsElement);
    }
  }, {
    key: "closeSubmenu",
    value: function closeSubmenu(detailsElement) {
      detailsElement.classList.remove('menu-opening');
      detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
      removeTrapFocus();
      this.closeAnimation(detailsElement);
    }
  }, {
    key: "closeAnimation",
    value: function closeAnimation(detailsElement) {
      var animationStart;

      var handleAnimation = function handleAnimation(time) {
        if (animationStart === undefined) {
          animationStart = time;
        }

        var elapsedTime = time - animationStart;

        if (elapsedTime < 400) {
          window.requestAnimationFrame(handleAnimation);
        } else {
          detailsElement.removeAttribute('open');

          if (detailsElement.closest('details[open]')) {
            trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
          }
        }
      };

      window.requestAnimationFrame(handleAnimation);
    }
  }]);

  return MenuDrawer;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(HTMLElement));

customElements.define('menu-drawer', MenuDrawer);

var HeaderDrawer = /*#__PURE__*/function (_MenuDrawer) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(HeaderDrawer, _MenuDrawer);

  var _super3 = _createSuper(HeaderDrawer);

  function HeaderDrawer() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, HeaderDrawer);

    return _super3.call(this);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(HeaderDrawer, [{
    key: "openMenuDrawer",
    value: function openMenuDrawer(summaryElement) {
      var _this7 = this;

      this.header = this.header || document.getElementById('shopify-section-header');
      this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
      document.documentElement.style.setProperty('--header-bottom-position', "".concat(parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset), "px"));
      this.header.classList.add('menu-open');
      setTimeout(function () {
        _this7.mainDetailsToggle.classList.add('menu-opening');
      });
      summaryElement.setAttribute('aria-expanded', true);
      trapFocus(this.mainDetailsToggle, summaryElement);
      document.body.classList.add("overflow-hidden-".concat(this.dataset.breakpoint));
    }
  }, {
    key: "closeMenuDrawer",
    value: function closeMenuDrawer(event, elementToFocus) {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(HeaderDrawer.prototype), "closeMenuDrawer", this).call(this, event, elementToFocus);

      this.header.classList.remove('menu-open');
    }
  }]);

  return HeaderDrawer;
}(MenuDrawer);

customElements.define('header-drawer', HeaderDrawer);

var ModalDialog = /*#__PURE__*/function (_HTMLElement3) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ModalDialog, _HTMLElement3);

  var _super4 = _createSuper(ModalDialog);

  function ModalDialog() {
    var _this8;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ModalDialog);

    _this8 = _super4.call(this);

    _this8.querySelector('[id^="ModalClose-"]').addEventListener('click', _this8.hide.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this8)));

    _this8.addEventListener('keyup', function (event) {
      if (event.code.toUpperCase() === 'ESCAPE') _this8.hide();
    });

    if (_this8.classList.contains('media-modal')) {
      _this8.addEventListener('pointerup', function (event) {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) _this8.hide();
      });
    } else {
      _this8.addEventListener('click', function (event) {
        if (event.target.nodeName === 'MODAL-DIALOG') _this8.hide();
      });
    }

    return _this8;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ModalDialog, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.moved) return;
      this.moved = true;
      document.body.appendChild(this);
    }
  }, {
    key: "show",
    value: function show(opener) {
      this.openedBy = opener;
      var popup = this.querySelector('.template-popup');
      document.body.classList.add('overflow-hidden');
      this.setAttribute('open', '');
      if (popup) popup.loadContent();
      trapFocus(this, this.querySelector('[role="dialog"]'));
      window.pauseAllMedia();
    }
  }, {
    key: "hide",
    value: function hide() {
      document.body.classList.remove('overflow-hidden');
      this.removeAttribute('open');
      removeTrapFocus(this.openedBy);
      window.pauseAllMedia();
    }
  }]);

  return ModalDialog;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(HTMLElement));

customElements.define('modal-dialog', ModalDialog);

var ModalOpener = /*#__PURE__*/function (_HTMLElement4) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ModalOpener, _HTMLElement4);

  var _super5 = _createSuper(ModalOpener);

  function ModalOpener() {
    var _this9;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ModalOpener);

    _this9 = _super5.call(this);

    var button = _this9.querySelector('button');

    if (!button) return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(_this9);
    button.addEventListener('click', function () {
      var modal = document.querySelector(_this9.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
    return _this9;
  }

  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ModalOpener);
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(HTMLElement));

customElements.define('modal-opener', ModalOpener);

var DeferredMedia = /*#__PURE__*/function (_HTMLElement5) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(DeferredMedia, _HTMLElement5);

  var _super6 = _createSuper(DeferredMedia);

  function DeferredMedia() {
    var _this10;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, DeferredMedia);

    _this10 = _super6.call(this);

    var poster = _this10.querySelector('[id^="Deferred-Poster-"]');

    if (!poster) return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(_this10);
    poster.addEventListener('click', _this10.loadContent.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this10)));
    return _this10;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(DeferredMedia, [{
    key: "loadContent",
    value: function loadContent() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      window.pauseAllMedia();

      if (!this.getAttribute('loaded')) {
        var content = document.createElement('div');
        content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));
        this.setAttribute('loaded', true);
        var deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
        if (focus) deferredElement.focus();
      }
    }
  }]);

  return DeferredMedia;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(HTMLElement));

customElements.define('deferred-media', DeferredMedia);

var SliderComponent = /*#__PURE__*/function (_HTMLElement6) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(SliderComponent, _HTMLElement6);

  var _super7 = _createSuper(SliderComponent);

  function SliderComponent() {
    var _this11;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SliderComponent);

    _this11 = _super7.call(this);
    _this11.slider = _this11.querySelector('[id^="Slider-"]');
    _this11.sliderItems = _this11.querySelectorAll('[id^="Slide-"]');
    _this11.enableSliderLooping = false;
    _this11.currentPageElement = _this11.querySelector('.slider-counter--current');
    _this11.pageTotalElement = _this11.querySelector('.slider-counter--total');
    _this11.prevButton = _this11.querySelector('button[name="previous"]');
    _this11.nextButton = _this11.querySelector('button[name="next"]');
    if (!_this11.slider || !_this11.nextButton) return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(_this11);

    _this11.initPages();

    var resizeObserver = new ResizeObserver(function (entries) {
      return _this11.initPages();
    });
    resizeObserver.observe(_this11.slider);

    _this11.slider.addEventListener('scroll', _this11.update.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this11)));

    _this11.prevButton.addEventListener('click', _this11.onButtonClick.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this11)));

    _this11.nextButton.addEventListener('click', _this11.onButtonClick.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this11)));

    return _this11;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SliderComponent, [{
    key: "initPages",
    value: function initPages() {
      this.sliderItemsToShow = Array.from(this.sliderItems).filter(function (element) {
        return element.clientWidth > 0;
      });
      this.sliderLastItem = this.sliderItemsToShow[this.sliderItemsToShow.length - 1];
      if (this.sliderItemsToShow.length === 0) return;
      this.slidesPerPage = Math.floor(this.slider.clientWidth / this.sliderItemsToShow[0].clientWidth);
      this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
      this.update();
    }
  }, {
    key: "resetPages",
    value: function resetPages() {
      this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
      this.initPages();
    }
  }, {
    key: "update",
    value: function update() {
      var previousPage = this.currentPage;
      this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;

      if (this.currentPageElement && this.pageTotalElement) {
        this.currentPageElement.textContent = this.currentPage;
        this.pageTotalElement.textContent = this.totalPages;
      }

      if (this.currentPage != previousPage) {
        this.dispatchEvent(new CustomEvent('slideChanged', {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1]
          }
        }));
      }

      if (this.enableSliderLooping) return;

      if (this.isSlideVisible(this.sliderItemsToShow[0])) {
        this.prevButton.setAttribute('disabled', 'disabled');
      } else {
        this.prevButton.removeAttribute('disabled');
      }

      if (this.isSlideVisible(this.sliderLastItem)) {
        this.nextButton.setAttribute('disabled', 'disabled');
      } else {
        this.nextButton.removeAttribute('disabled');
      }
    }
  }, {
    key: "isSlideVisible",
    value: function isSlideVisible(element) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
      return element.offsetLeft + element.clientWidth <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var step = event.currentTarget.dataset.step || 1;
      this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + step * this.sliderLastItem.clientWidth : this.slider.scrollLeft - step * this.sliderLastItem.clientWidth;
      this.slider.scrollTo({
        left: this.slideScrollPosition
      });
    }
  }]);

  return SliderComponent;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(HTMLElement));

customElements.define('slider-component', SliderComponent);

var SlideshowComponent = /*#__PURE__*/function (_SliderComponent) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(SlideshowComponent, _SliderComponent);

  var _super8 = _createSuper(SlideshowComponent);

  function SlideshowComponent() {
    var _this12;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SlideshowComponent);

    _this12 = _super8.call(this);
    _this12.sliderControlWrapper = _this12.querySelector('.slider-buttons');
    _this12.enableSliderLooping = true;
    if (!_this12.sliderControlWrapper) return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(_this12);
    _this12.sliderFirstItemNode = _this12.slider.querySelector('.slideshow__slide');
    if (_this12.sliderItemsToShow.length > 0) _this12.currentPage = 1;
    _this12.sliderControlLinksArray = Array.from(_this12.sliderControlWrapper.querySelectorAll('.slider-counter__link'));

    _this12.sliderControlLinksArray.forEach(function (link) {
      return link.addEventListener('click', _this12.linkToSlide.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this12)));
    });

    _this12.slider.addEventListener('scroll', _this12.setSlideVisibility.bind((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this12)));

    _this12.setSlideVisibility();

    if (_this12.slider.getAttribute('data-autoplay') === 'true') _this12.setAutoPlay();
    return _this12;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SlideshowComponent, [{
    key: "setAutoPlay",
    value: function setAutoPlay() {
      this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
      this.autoplaySpeed = this.slider.dataset.speed * 1000;
      this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
      this.addEventListener('mouseover', this.focusInHandling.bind(this));
      this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
      this.addEventListener('focusin', this.focusInHandling.bind(this));
      this.addEventListener('focusout', this.focusOutHandling.bind(this));
      this.play();
      this.autoplayButtonIsSetToPlay = true;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(SlideshowComponent.prototype), "onButtonClick", this).call(this, event);

      var isFirstSlide = this.currentPage === 1;
      var isLastSlide = this.currentPage === this.sliderItemsToShow.length;
      if (!isFirstSlide && !isLastSlide) return;

      if (isFirstSlide && event.currentTarget.name === 'previous') {
        this.slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
      } else if (isLastSlide && event.currentTarget.name === 'next') {
        this.slideScrollPosition = 0;
      }

      this.slider.scrollTo({
        left: this.slideScrollPosition
      });
    }
  }, {
    key: "update",
    value: function update() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(SlideshowComponent.prototype), "update", this).call(this);

      this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
      this.prevButton.removeAttribute('disabled');
      if (!this.sliderControlButtons.length) return;
      this.sliderControlButtons.forEach(function (link) {
        link.classList.remove('slider-counter__link--active');
        link.removeAttribute('aria-current');
      });
      this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
      this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
    }
  }, {
    key: "autoPlayToggle",
    value: function autoPlayToggle() {
      this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
      this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
      this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
    }
  }, {
    key: "focusOutHandling",
    value: function focusOutHandling(event) {
      var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
      this.play();
    }
  }, {
    key: "focusInHandling",
    value: function focusInHandling(event) {
      var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);

      if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
        this.play();
      } else if (this.autoplayButtonIsSetToPlay) {
        this.pause();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.slider.setAttribute('aria-live', 'off');
      clearInterval(this.autoplay);
      this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.slider.setAttribute('aria-live', 'polite');
      clearInterval(this.autoplay);
    }
  }, {
    key: "togglePlayButtonState",
    value: function togglePlayButtonState(pauseAutoplay) {
      if (pauseAutoplay) {
        this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
      } else {
        this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
      }
    }
  }, {
    key: "autoRotateSlides",
    value: function autoRotateSlides() {
      var slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.slider.querySelector('.slideshow__slide').clientWidth;
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }, {
    key: "setSlideVisibility",
    value: function setSlideVisibility() {
      var _this13 = this;

      this.sliderItemsToShow.forEach(function (item, index) {
        var button = item.querySelector('a');

        if (index === _this13.currentPage - 1) {
          if (button) button.removeAttribute('tabindex');
          item.setAttribute('aria-hidden', 'false');
          item.removeAttribute('tabindex');
        } else {
          if (button) button.setAttribute('tabindex', '-1');
          item.setAttribute('aria-hidden', 'true');
          item.setAttribute('tabindex', '-1');
        }
      });
    }
  }, {
    key: "linkToSlide",
    value: function linkToSlide(event) {
      event.preventDefault();
      var slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }]);

  return SlideshowComponent;
}(SliderComponent);

customElements.define('slideshow-component', SlideshowComponent);

var VariantSelects = /*#__PURE__*/function (_HTMLElement7) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(VariantSelects, _HTMLElement7);

  var _super9 = _createSuper(VariantSelects);

  function VariantSelects() {
    var _this14;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, VariantSelects);

    _this14 = _super9.call(this);

    _this14.addEventListener('change', _this14.onVariantChange);

    return _this14;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(VariantSelects, [{
    key: "onVariantChange",
    value: function onVariantChange() {
      this.updateOptions();
      this.updateMasterId();
      this.toggleAddButton(true, '', false);
      this.updatePickupAvailability();
      this.removeErrorMessage();

      if (!this.currentVariant) {
        this.toggleAddButton(true, '', true);
        this.setUnavailable();
      } else {
        this.updateMedia();
        this.updateURL();
        this.updateVariantInput();
        this.renderProductInfo();
        this.updateShareUrl();
      }
    }
  }, {
    key: "updateOptions",
    value: function updateOptions() {
      this.options = Array.from(this.querySelectorAll('select'), function (select) {
        return select.value;
      });
    }
  }, {
    key: "updateMasterId",
    value: function updateMasterId() {
      var _this15 = this;

      this.currentVariant = this.getVariantData().find(function (variant) {
        return !variant.options.map(function (option, index) {
          return _this15.options[index] === option;
        }).includes(false);
      });
    }
  }, {
    key: "updateMedia",
    value: function updateMedia() {
      if (!this.currentVariant) return;
      if (!this.currentVariant.featured_media) return;
      var mediaGallery = document.getElementById("MediaGallery-".concat(this.dataset.section));
      mediaGallery.setActiveMedia("".concat(this.dataset.section, "-").concat(this.currentVariant.featured_media.id), true);
      var modalContent = document.querySelector("#ProductModal-".concat(this.dataset.section, " .product-media-modal__content"));
      var newMediaModal = modalContent.querySelector("[data-media-id=\"".concat(this.currentVariant.featured_media.id, "\"]"));
      modalContent.prepend(newMediaModal);
    }
  }, {
    key: "updateURL",
    value: function updateURL() {
      if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
      window.history.replaceState({}, '', "".concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updateShareUrl",
    value: function updateShareUrl() {
      var shareButton = document.getElementById("Share-".concat(this.dataset.section));
      if (!shareButton) return;
      shareButton.updateUrl("".concat(window.shopUrl).concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updateVariantInput",
    value: function updateVariantInput() {
      var _this16 = this;

      var productForms = document.querySelectorAll("#product-form-".concat(this.dataset.section, ", #product-form-installment"));
      productForms.forEach(function (productForm) {
        var input = productForm.querySelector('input[name="id"]');
        input.value = _this16.currentVariant.id;
        input.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      });
    }
  }, {
    key: "updatePickupAvailability",
    value: function updatePickupAvailability() {
      var pickUpAvailability = document.querySelector('pickup-availability');
      if (!pickUpAvailability) return;

      if (this.currentVariant && this.currentVariant.available) {
        pickUpAvailability.fetchAvailability(this.currentVariant.id);
      } else {
        pickUpAvailability.removeAttribute('available');
        pickUpAvailability.innerHTML = '';
      }
    }
  }, {
    key: "removeErrorMessage",
    value: function removeErrorMessage() {
      var section = this.closest('section');
      if (!section) return;
      var productForm = section.querySelector('product-form');
      if (productForm) productForm.handleErrorMessage();
    }
  }, {
    key: "renderProductInfo",
    value: function renderProductInfo() {
      var _this17 = this;

      fetch("".concat(this.dataset.url, "?variant=").concat(this.currentVariant.id, "&section_id=").concat(this.dataset.section)).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var id = "price-".concat(_this17.dataset.section);
        var html = new DOMParser().parseFromString(responseText, 'text/html');
        var destination = document.getElementById(id);
        var source = html.getElementById(id);
        if (source && destination) destination.innerHTML = source.innerHTML;
        var price = document.getElementById("price-".concat(_this17.dataset.section));
        if (price) price.classList.remove('visibility-hidden');

        _this17.toggleAddButton(!_this17.currentVariant.available, window.variantStrings.soldOut);
      });
    }
  }, {
    key: "toggleAddButton",
    value: function toggleAddButton() {
      var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var text = arguments.length > 1 ? arguments[1] : undefined;
      var modifyClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var productForm = document.getElementById("product-form-".concat(this.dataset.section));
      if (!productForm) return;
      var addButton = productForm.querySelector('[name="add"]');
      var addButtonText = productForm.querySelector('[name="add"] > span');
      if (!addButton) return;

      if (disable) {
        addButton.setAttribute('disabled', 'disabled');
        if (text) addButtonText.textContent = text;
      } else {
        addButton.removeAttribute('disabled');
        addButtonText.textContent = window.variantStrings.addToCart;
      }

      if (!modifyClass) return;
    }
  }, {
    key: "setUnavailable",
    value: function setUnavailable() {
      var button = document.getElementById("product-form-".concat(this.dataset.section));
      var addButton = button.querySelector('[name="add"]');
      var addButtonText = button.querySelector('[name="add"] > span');
      var price = document.getElementById("price-".concat(this.dataset.section));
      if (!addButton) return;
      addButtonText.textContent = window.variantStrings.unavailable;
      if (price) price.classList.add('visibility-hidden');
    }
  }, {
    key: "getVariantData",
    value: function getVariantData() {
      this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }
  }]);

  return VariantSelects;
}( /*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(HTMLElement));

customElements.define('variant-selects', VariantSelects);

var VariantRadios = /*#__PURE__*/function (_VariantSelects) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(VariantRadios, _VariantSelects);

  var _super10 = _createSuper(VariantRadios);

  function VariantRadios() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, VariantRadios);

    return _super10.call(this);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(VariantRadios, [{
    key: "updateOptions",
    value: function updateOptions() {
      var fieldsets = Array.from(this.querySelectorAll('fieldset'));
      this.options = fieldsets.map(function (fieldset) {
        return Array.from(fieldset.querySelectorAll('input')).find(function (radio) {
          return radio.checked;
        }).value;
      });
    }
  }]);

  return VariantRadios;
}(VariantSelects);

customElements.define('variant-radios', VariantRadios);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _assertThisInitialized; }
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classCallCheck; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/construct.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/construct.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _construct; }
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");


function _construct(Parent, args, Class) {
  if ((0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _createClass; }
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/get.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/get.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _get; }
/* harmony export */ });
/* harmony import */ var _superPropBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./superPropBase.js */ "./node_modules/@babel/runtime/helpers/esm/superPropBase.js");

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = (0,_superPropBase_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _getPrototypeOf; }
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _inherits; }
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _isNativeFunction; }
/* harmony export */ });
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _isNativeReflectConstruct; }
/* harmony export */ });
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _possibleConstructorReturn; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _setPrototypeOf; }
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/superPropBase.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/superPropBase.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _superPropBase; }
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object);
    if (object === null) break;
  }

  return object;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _wrapNativeSuper; }
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNativeFunction.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js");
/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./construct.js */ "./node_modules/@babel/runtime/helpers/esm/construct.js");




function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !(0,_isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return (0,_construct_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Class, arguments, (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/scripts/base.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dawn_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dawn/global */ "./src/scripts/dawn/global.js");

console.log('Base file js');
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!******************************!*\
  !*** ./src/styles/base.scss ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQyxHQUFSLENBQVksY0FBWixFOzs7Ozs7OztBQ0ZBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29ya2Zsb3cvLi9zcmMvc2NyaXB0cy9kYXduL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY29uc3RydWN0LmpzIiwid2VicGFjazovL3dvcmtmbG93Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL3dvcmtmbG93Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2dldC5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pc05hdGl2ZUZ1bmN0aW9uLmpzIiwid2VicGFjazovL3dvcmtmbG93Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdC5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL3dvcmtmbG93Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL3dvcmtmbG93Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3N1cGVyUHJvcEJhc2UuanMiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL3dvcmtmbG93Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3dyYXBOYXRpdmVTdXBlci5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93b3JrZmxvdy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd29ya2Zsb3cvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93b3JrZmxvdy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dvcmtmbG93Ly4vc3JjL3NjcmlwdHMvYmFzZS5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy8uL3NyYy9zdHlsZXMvYmFzZS5zY3NzP2JjMDkiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlRWxlbWVudHMoY29udGFpbmVyKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKFxuICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgXCJzdW1tYXJ5LCBhW2hyZWZdLCBidXR0b246ZW5hYmxlZCwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj0nLSddKSwgW2RyYWdnYWJsZV0sIGFyZWEsIGlucHV0Om5vdChbdHlwZT1oaWRkZW5dKTplbmFibGVkLCBzZWxlY3Q6ZW5hYmxlZCwgdGV4dGFyZWE6ZW5hYmxlZCwgb2JqZWN0LCBpZnJhbWVcIlxuICAgIClcbiAgKTtcbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2lkXj1cIkRldGFpbHMtXCJdIHN1bW1hcnknKS5mb3JFYWNoKChzdW1tYXJ5KSA9PiB7XG4gIHN1bW1hcnkuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuICBzdW1tYXJ5LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4gIGlmKHN1bW1hcnkubmV4dEVsZW1lbnRTaWJsaW5nLmdldEF0dHJpYnV0ZSgnaWQnKSkge1xuICAgIHN1bW1hcnkuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgc3VtbWFyeS5uZXh0RWxlbWVudFNpYmxpbmcuaWQpO1xuICB9XG5cbiAgc3VtbWFyeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgIWV2ZW50LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnZGV0YWlscycpLmhhc0F0dHJpYnV0ZSgnb3BlbicpKTtcbiAgfSk7XG5cbiAgaWYgKHN1bW1hcnkuY2xvc2VzdCgnaGVhZGVyLWRyYXdlcicpKSByZXR1cm47XG4gIHN1bW1hcnkucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXBFc2NhcGUpO1xufSk7XG5cbmNvbnN0IHRyYXBGb2N1c0hhbmRsZXJzID0ge307XG5cbmZ1bmN0aW9uIHRyYXBGb2N1cyhjb250YWluZXIsIGVsZW1lbnRUb0ZvY3VzID0gY29udGFpbmVyKSB7XG4gIHZhciBlbGVtZW50cyA9IGdldEZvY3VzYWJsZUVsZW1lbnRzKGNvbnRhaW5lcik7XG4gIHZhciBmaXJzdCA9IGVsZW1lbnRzWzBdO1xuICB2YXIgbGFzdCA9IGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdO1xuXG4gIHJlbW92ZVRyYXBGb2N1cygpO1xuXG4gIHRyYXBGb2N1c0hhbmRsZXJzLmZvY3VzaW4gPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoXG4gICAgICBldmVudC50YXJnZXQgIT09IGNvbnRhaW5lciAmJlxuICAgICAgZXZlbnQudGFyZ2V0ICE9PSBsYXN0ICYmXG4gICAgICBldmVudC50YXJnZXQgIT09IGZpcnN0XG4gICAgKVxuICAgICAgcmV0dXJuO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBGb2N1c0hhbmRsZXJzLmtleWRvd24pO1xuICB9O1xuXG4gIHRyYXBGb2N1c0hhbmRsZXJzLmZvY3Vzb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBGb2N1c0hhbmRsZXJzLmtleWRvd24pO1xuICB9O1xuXG4gIHRyYXBGb2N1c0hhbmRsZXJzLmtleWRvd24gPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5jb2RlLnRvVXBwZXJDYXNlKCkgIT09ICdUQUInKSByZXR1cm47IC8vIElmIG5vdCBUQUIga2V5XG4gICAgLy8gT24gdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnQgYW5kIHRhYiBmb3J3YXJkLCBmb2N1cyB0aGUgZmlyc3QgZWxlbWVudC5cbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBsYXN0ICYmICFldmVudC5zaGlmdEtleSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy8gIE9uIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudCBhbmQgdGFiIGJhY2t3YXJkLCBmb2N1cyB0aGUgbGFzdCBlbGVtZW50LlxuICAgIGlmIChcbiAgICAgIChldmVudC50YXJnZXQgPT09IGNvbnRhaW5lciB8fCBldmVudC50YXJnZXQgPT09IGZpcnN0KSAmJlxuICAgICAgZXZlbnQuc2hpZnRLZXlcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsYXN0LmZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdHJhcEZvY3VzSGFuZGxlcnMuZm9jdXNvdXQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJhcEZvY3VzSGFuZGxlcnMuZm9jdXNpbik7XG5cbiAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbn1cblxuLy8gSGVyZSBydW4gdGhlIHF1ZXJ5U2VsZWN0b3IgdG8gZmlndXJlIG91dCBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyA6Zm9jdXMtdmlzaWJsZSBvciBub3QgYW5kIHJ1biBjb2RlIGJhc2VkIG9uIGl0LlxudHJ5IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIjpmb2N1cy12aXNpYmxlXCIpO1xufSBjYXRjaCB7XG4gIGZvY3VzVmlzaWJsZVBvbHlmaWxsKCk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzVmlzaWJsZVBvbHlmaWxsKCkge1xuICBjb25zdCBuYXZLZXlzID0gWydBUlJPV1VQJywgJ0FSUk9XRE9XTicsICdBUlJPV0xFRlQnLCAnQVJST1dSSUdIVCcsICdUQUInLCAnRU5URVInLCAnU1BBQ0UnLCAnRVNDQVBFJywgJ0hPTUUnLCAnRU5EJywgJ1BBR0VVUCcsICdQQUdFRE9XTiddXG4gIGxldCBjdXJyZW50Rm9jdXNlZEVsZW1lbnQgPSBudWxsO1xuICBsZXQgbW91c2VDbGljayA9IG51bGw7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICBpZihuYXZLZXlzLmluY2x1ZGVzKGV2ZW50LmNvZGUudG9VcHBlckNhc2UoKSkpIHtcbiAgICAgIG1vdXNlQ2xpY2sgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICBtb3VzZUNsaWNrID0gdHJ1ZTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICAgIGlmIChjdXJyZW50Rm9jdXNlZEVsZW1lbnQpIGN1cnJlbnRGb2N1c2VkRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1c2VkJyk7XG5cbiAgICBpZiAobW91c2VDbGljaykgcmV0dXJuO1xuXG4gICAgY3VycmVudEZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBjdXJyZW50Rm9jdXNlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuXG4gIH0sIHRydWUpO1xufVxuXG5mdW5jdGlvbiBwYXVzZUFsbE1lZGlhKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMteW91dHViZScpLmZvckVhY2goKHZpZGVvKSA9PiB7XG4gICAgdmlkZW8uY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcIicgKyAncGF1c2VWaWRlbycgKyAnXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXZpbWVvJykuZm9yRWFjaCgodmlkZW8pID0+IHtcbiAgICB2aWRlby5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJtZXRob2RcIjpcInBhdXNlXCJ9JywgJyonKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJykuZm9yRWFjaCgodmlkZW8pID0+IHZpZGVvLnBhdXNlKCkpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdwcm9kdWN0LW1vZGVsJykuZm9yRWFjaCgobW9kZWwpID0+IHtcbiAgICBpZiAobW9kZWwubW9kZWxWaWV3ZXJVSSkgbW9kZWwubW9kZWxWaWV3ZXJVSS5wYXVzZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVHJhcEZvY3VzKGVsZW1lbnRUb0ZvY3VzID0gbnVsbCkge1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJhcEZvY3VzSGFuZGxlcnMuZm9jdXNpbik7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdHJhcEZvY3VzSGFuZGxlcnMuZm9jdXNvdXQpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcEZvY3VzSGFuZGxlcnMua2V5ZG93bik7XG5cbiAgaWYgKGVsZW1lbnRUb0ZvY3VzKSBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBvbktleVVwRXNjYXBlKGV2ZW50KSB7XG4gIGlmIChldmVudC5jb2RlLnRvVXBwZXJDYXNlKCkgIT09ICdFU0NBUEUnKSByZXR1cm47XG5cbiAgY29uc3Qgb3BlbkRldGFpbHNFbGVtZW50ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2RldGFpbHNbb3Blbl0nKTtcbiAgaWYgKCFvcGVuRGV0YWlsc0VsZW1lbnQpIHJldHVybjtcblxuICBjb25zdCBzdW1tYXJ5RWxlbWVudCA9IG9wZW5EZXRhaWxzRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzdW1tYXJ5Jyk7XG4gIG9wZW5EZXRhaWxzRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ29wZW4nKTtcbiAgc3VtbWFyeUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICBzdW1tYXJ5RWxlbWVudC5mb2N1cygpO1xufVxuXG5jbGFzcyBRdWFudGl0eUlucHV0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgdGhpcy5jaGFuZ2VFdmVudCA9IG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pXG5cbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpLmZvckVhY2goXG4gICAgICAoYnV0dG9uKSA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnV0dG9uQ2xpY2suYmluZCh0aGlzKSlcbiAgICApO1xuICB9XG5cbiAgb25CdXR0b25DbGljayhldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG5cbiAgICBldmVudC50YXJnZXQubmFtZSA9PT0gJ3BsdXMnID8gdGhpcy5pbnB1dC5zdGVwVXAoKSA6IHRoaXMuaW5wdXQuc3RlcERvd24oKTtcbiAgICBpZiAocHJldmlvdXNWYWx1ZSAhPT0gdGhpcy5pbnB1dC52YWx1ZSkgdGhpcy5pbnB1dC5kaXNwYXRjaEV2ZW50KHRoaXMuY2hhbmdlRXZlbnQpO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncXVhbnRpdHktaW5wdXQnLCBRdWFudGl0eUlucHV0KTtcblxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIHdhaXQpIHtcbiAgbGV0IHQ7XG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICB0ID0gc2V0VGltZW91dCgoKSA9PiBmbi5hcHBseSh0aGlzLCBhcmdzKSwgd2FpdCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZldGNoQ29uZmlnKHR5cGUgPSAnanNvbicpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsICdBY2NlcHQnOiBgYXBwbGljYXRpb24vJHt0eXBlfWAgfVxuICB9O1xufVxuXG4vKlxuICogU2hvcGlmeSBDb21tb24gSlNcbiAqXG4gKi9cbmlmICgodHlwZW9mIHdpbmRvdy5TaG9waWZ5KSA9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuU2hvcGlmeSA9IHt9O1xufVxuXG5TaG9waWZ5LmJpbmQgPSBmdW5jdGlvbihmbiwgc2NvcGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmbi5hcHBseShzY29wZSwgYXJndW1lbnRzKTtcbiAgfVxufTtcblxuU2hvcGlmeS5zZXRTZWxlY3RvckJ5VmFsdWUgPSBmdW5jdGlvbihzZWxlY3RvciwgdmFsdWUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGNvdW50ID0gc2VsZWN0b3Iub3B0aW9ucy5sZW5ndGg7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgdmFyIG9wdGlvbiA9IHNlbGVjdG9yLm9wdGlvbnNbaV07XG4gICAgaWYgKHZhbHVlID09IG9wdGlvbi52YWx1ZSB8fCB2YWx1ZSA9PSBvcHRpb24uaW5uZXJIVE1MKSB7XG4gICAgICBzZWxlY3Rvci5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufTtcblxuU2hvcGlmeS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lciA/IHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGZhbHNlKSA6IHRhcmdldC5hdHRhY2hFdmVudCgnb24nK2V2ZW50TmFtZSwgY2FsbGJhY2spO1xufTtcblxuU2hvcGlmeS5wb3N0TGluayA9IGZ1bmN0aW9uKHBhdGgsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBtZXRob2QgPSBvcHRpb25zWydtZXRob2QnXSB8fCAncG9zdCc7XG4gIHZhciBwYXJhbXMgPSBvcHRpb25zWydwYXJhbWV0ZXJzJ10gfHwge307XG5cbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJtZXRob2RcIiwgbWV0aG9kKTtcbiAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIiwgcGF0aCk7XG5cbiAgZm9yKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgdmFyIGhpZGRlbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZGRlbkZpZWxkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJoaWRkZW5cIik7XG4gICAgaGlkZGVuRmllbGQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBrZXkpO1xuICAgIGhpZGRlbkZpZWxkLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHBhcmFtc1trZXldKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGhpZGRlbkZpZWxkKTtcbiAgfVxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICBmb3JtLnN1Ym1pdCgpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGZvcm0pO1xufTtcblxuU2hvcGlmeS5Db3VudHJ5UHJvdmluY2VTZWxlY3RvciA9IGZ1bmN0aW9uKGNvdW50cnlfZG9taWQsIHByb3ZpbmNlX2RvbWlkLCBvcHRpb25zKSB7XG4gIHRoaXMuY291bnRyeUVsICAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb3VudHJ5X2RvbWlkKTtcbiAgdGhpcy5wcm92aW5jZUVsICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByb3ZpbmNlX2RvbWlkKTtcbiAgdGhpcy5wcm92aW5jZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdGlvbnNbJ2hpZGVFbGVtZW50J10gfHwgcHJvdmluY2VfZG9taWQpO1xuXG4gIFNob3BpZnkuYWRkTGlzdGVuZXIodGhpcy5jb3VudHJ5RWwsICdjaGFuZ2UnLCBTaG9waWZ5LmJpbmQodGhpcy5jb3VudHJ5SGFuZGxlcix0aGlzKSk7XG5cbiAgdGhpcy5pbml0Q291bnRyeSgpO1xuICB0aGlzLmluaXRQcm92aW5jZSgpO1xufTtcblxuU2hvcGlmeS5Db3VudHJ5UHJvdmluY2VTZWxlY3Rvci5wcm90b3R5cGUgPSB7XG4gIGluaXRDb3VudHJ5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmNvdW50cnlFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGVmYXVsdCcpO1xuICAgIFNob3BpZnkuc2V0U2VsZWN0b3JCeVZhbHVlKHRoaXMuY291bnRyeUVsLCB2YWx1ZSk7XG4gICAgdGhpcy5jb3VudHJ5SGFuZGxlcigpO1xuICB9LFxuXG4gIGluaXRQcm92aW5jZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5wcm92aW5jZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1kZWZhdWx0Jyk7XG4gICAgaWYgKHZhbHVlICYmIHRoaXMucHJvdmluY2VFbC5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIFNob3BpZnkuc2V0U2VsZWN0b3JCeVZhbHVlKHRoaXMucHJvdmluY2VFbCwgdmFsdWUpO1xuICAgIH1cbiAgfSxcblxuICBjb3VudHJ5SGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIHZhciBvcHQgICAgICAgPSB0aGlzLmNvdW50cnlFbC5vcHRpb25zW3RoaXMuY291bnRyeUVsLnNlbGVjdGVkSW5kZXhdO1xuICAgIHZhciByYXcgICAgICAgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb3ZpbmNlcycpO1xuICAgIHZhciBwcm92aW5jZXMgPSBKU09OLnBhcnNlKHJhdyk7XG5cbiAgICB0aGlzLmNsZWFyT3B0aW9ucyh0aGlzLnByb3ZpbmNlRWwpO1xuICAgIGlmIChwcm92aW5jZXMgJiYgcHJvdmluY2VzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnByb3ZpbmNlQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmluY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgb3B0LnZhbHVlID0gcHJvdmluY2VzW2ldWzBdO1xuICAgICAgICBvcHQuaW5uZXJIVE1MID0gcHJvdmluY2VzW2ldWzFdO1xuICAgICAgICB0aGlzLnByb3ZpbmNlRWwuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm92aW5jZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICB9XG4gIH0sXG5cbiAgY2xlYXJPcHRpb25zOiBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgIHdoaWxlIChzZWxlY3Rvci5maXJzdENoaWxkKSB7XG4gICAgICBzZWxlY3Rvci5yZW1vdmVDaGlsZChzZWxlY3Rvci5maXJzdENoaWxkKTtcbiAgICB9XG4gIH0sXG5cbiAgc2V0T3B0aW9uczogZnVuY3Rpb24oc2VsZWN0b3IsIHZhbHVlcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBjb3VudCA9IHZhbHVlcy5sZW5ndGg7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdC52YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSB2YWx1ZXNbaV07XG4gICAgICBzZWxlY3Rvci5hcHBlbmRDaGlsZChvcHQpO1xuICAgIH1cbiAgfVxufTtcblxuY2xhc3MgTWVudURyYXdlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubWFpbkRldGFpbHNUb2dnbGUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2RldGFpbHMnKTtcblxuICAgIGlmIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09ICdpUGhvbmUnKSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdmlld3BvcnQtaGVpZ2h0JywgYCR7d2luZG93LmlubmVySGVpZ2h0fXB4YCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5vbktleVVwLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uRm9jdXNPdXQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMucXVlcnlTZWxlY3RvckFsbCgnc3VtbWFyeScpLmZvckVhY2goc3VtbWFyeSA9PiBzdW1tYXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblN1bW1hcnlDbGljay5iaW5kKHRoaXMpKSk7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKS5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xvc2VCdXR0b25DbGljay5iaW5kKHRoaXMpKSk7XG4gIH1cblxuICBvbktleVVwKGV2ZW50KSB7XG4gICAgaWYoZXZlbnQuY29kZS50b1VwcGVyQ2FzZSgpICE9PSAnRVNDQVBFJykgcmV0dXJuO1xuXG4gICAgY29uc3Qgb3BlbkRldGFpbHNFbGVtZW50ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2RldGFpbHNbb3Blbl0nKTtcbiAgICBpZighb3BlbkRldGFpbHNFbGVtZW50KSByZXR1cm47XG5cbiAgICBvcGVuRGV0YWlsc0VsZW1lbnQgPT09IHRoaXMubWFpbkRldGFpbHNUb2dnbGUgPyB0aGlzLmNsb3NlTWVudURyYXdlcihldmVudCwgdGhpcy5tYWluRGV0YWlsc1RvZ2dsZS5xdWVyeVNlbGVjdG9yKCdzdW1tYXJ5JykpIDogdGhpcy5jbG9zZVN1Ym1lbnUob3BlbkRldGFpbHNFbGVtZW50KTtcbiAgfVxuXG4gIG9uU3VtbWFyeUNsaWNrKGV2ZW50KSB7XG4gICAgY29uc3Qgc3VtbWFyeUVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGRldGFpbHNFbGVtZW50ID0gc3VtbWFyeUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICBjb25zdCBpc09wZW4gPSBkZXRhaWxzRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ29wZW4nKTtcbiAgICBjb25zdCByZWR1Y2VkTW90aW9uID0gd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKTtcblxuICAgIGZ1bmN0aW9uIGFkZFRyYXBGb2N1cygpIHtcbiAgICAgIHRyYXBGb2N1cyhzdW1tYXJ5RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcsIGRldGFpbHNFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpKTtcbiAgICAgIHN1bW1hcnlFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYWRkVHJhcEZvY3VzKTtcbiAgICB9XG5cbiAgICBpZiAoZGV0YWlsc0VsZW1lbnQgPT09IHRoaXMubWFpbkRldGFpbHNUb2dnbGUpIHtcbiAgICAgIGlmKGlzT3BlbikgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlzT3BlbiA/IHRoaXMuY2xvc2VNZW51RHJhd2VyKGV2ZW50LCBzdW1tYXJ5RWxlbWVudCkgOiB0aGlzLm9wZW5NZW51RHJhd2VyKHN1bW1hcnlFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRldGFpbHNFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lbnUtb3BlbmluZycpO1xuICAgICAgICBzdW1tYXJ5RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgICAgICAgIXJlZHVjZWRNb3Rpb24gfHwgcmVkdWNlZE1vdGlvbi5tYXRjaGVzID8gYWRkVHJhcEZvY3VzKCkgOiBzdW1tYXJ5RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFkZFRyYXBGb2N1cyk7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5NZW51RHJhd2VyKHN1bW1hcnlFbGVtZW50KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1haW5EZXRhaWxzVG9nZ2xlLmNsYXNzTGlzdC5hZGQoJ21lbnUtb3BlbmluZycpO1xuICAgIH0pO1xuICAgIHN1bW1hcnlFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgIHRyYXBGb2N1cyh0aGlzLm1haW5EZXRhaWxzVG9nZ2xlLCBzdW1tYXJ5RWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGBvdmVyZmxvdy1oaWRkZW4tJHt0aGlzLmRhdGFzZXQuYnJlYWtwb2ludH1gKTtcbiAgfVxuXG4gIGNsb3NlTWVudURyYXdlcihldmVudCwgZWxlbWVudFRvRm9jdXMgPSBmYWxzZSkge1xuICAgIGlmIChldmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1haW5EZXRhaWxzVG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtb3BlbmluZycpO1xuICAgICAgdGhpcy5tYWluRGV0YWlsc1RvZ2dsZS5xdWVyeVNlbGVjdG9yQWxsKCdkZXRhaWxzJykuZm9yRWFjaChkZXRhaWxzID0+ICB7XG4gICAgICAgIGRldGFpbHMucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgICAgIGRldGFpbHMuY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1vcGVuaW5nJyk7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShgb3ZlcmZsb3ctaGlkZGVuLSR7dGhpcy5kYXRhc2V0LmJyZWFrcG9pbnR9YCk7XG4gICAgICByZW1vdmVUcmFwRm9jdXMoZWxlbWVudFRvRm9jdXMpO1xuICAgICAgdGhpcy5jbG9zZUFuaW1hdGlvbih0aGlzLm1haW5EZXRhaWxzVG9nZ2xlKTtcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzT3V0KGV2ZW50KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5tYWluRGV0YWlsc1RvZ2dsZS5oYXNBdHRyaWJ1dGUoJ29wZW4nKSAmJiAhdGhpcy5tYWluRGV0YWlsc1RvZ2dsZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkgdGhpcy5jbG9zZU1lbnVEcmF3ZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2xvc2VCdXR0b25DbGljayhldmVudCkge1xuICAgIGNvbnN0IGRldGFpbHNFbGVtZW50ID0gZXZlbnQuY3VycmVudFRhcmdldC5jbG9zZXN0KCdkZXRhaWxzJyk7XG4gICAgdGhpcy5jbG9zZVN1Ym1lbnUoZGV0YWlsc0VsZW1lbnQpO1xuICB9XG5cbiAgY2xvc2VTdWJtZW51KGRldGFpbHNFbGVtZW50KSB7XG4gICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1vcGVuaW5nJyk7XG4gICAgZGV0YWlsc0VsZW1lbnQucXVlcnlTZWxlY3Rvcignc3VtbWFyeScpLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICByZW1vdmVUcmFwRm9jdXMoKTtcbiAgICB0aGlzLmNsb3NlQW5pbWF0aW9uKGRldGFpbHNFbGVtZW50KTtcbiAgfVxuXG4gIGNsb3NlQW5pbWF0aW9uKGRldGFpbHNFbGVtZW50KSB7XG4gICAgbGV0IGFuaW1hdGlvblN0YXJ0O1xuXG4gICAgY29uc3QgaGFuZGxlQW5pbWF0aW9uID0gKHRpbWUpID0+IHtcbiAgICAgIGlmIChhbmltYXRpb25TdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFuaW1hdGlvblN0YXJ0ID0gdGltZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSB0aW1lIC0gYW5pbWF0aW9uU3RhcnQ7XG5cbiAgICAgIGlmIChlbGFwc2VkVGltZSA8IDQwMCkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZUFuaW1hdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXRhaWxzRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ29wZW4nKTtcbiAgICAgICAgaWYgKGRldGFpbHNFbGVtZW50LmNsb3Nlc3QoJ2RldGFpbHNbb3Blbl0nKSkge1xuICAgICAgICAgIHRyYXBGb2N1cyhkZXRhaWxzRWxlbWVudC5jbG9zZXN0KCdkZXRhaWxzW29wZW5dJyksIGRldGFpbHNFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N1bW1hcnknKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZUFuaW1hdGlvbik7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtZW51LWRyYXdlcicsIE1lbnVEcmF3ZXIpO1xuXG5jbGFzcyBIZWFkZXJEcmF3ZXIgZXh0ZW5kcyBNZW51RHJhd2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG9wZW5NZW51RHJhd2VyKHN1bW1hcnlFbGVtZW50KSB7XG4gICAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlciB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvcGlmeS1zZWN0aW9uLWhlYWRlcicpO1xuICAgIHRoaXMuYm9yZGVyT2Zmc2V0ID0gdGhpcy5ib3JkZXJPZmZzZXQgfHwgdGhpcy5jbG9zZXN0KCcuaGVhZGVyLXdyYXBwZXInKS5jbGFzc0xpc3QuY29udGFpbnMoJ2hlYWRlci13cmFwcGVyLS1ib3JkZXItYm90dG9tJykgPyAxIDogMDtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWJvdHRvbS1wb3NpdGlvbicsIGAke3BhcnNlSW50KHRoaXMuaGVhZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSAtIHRoaXMuYm9yZGVyT2Zmc2V0KX1weGApO1xuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ21lbnUtb3BlbicpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1haW5EZXRhaWxzVG9nZ2xlLmNsYXNzTGlzdC5hZGQoJ21lbnUtb3BlbmluZycpO1xuICAgIH0pO1xuXG4gICAgc3VtbWFyeUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgdHJhcEZvY3VzKHRoaXMubWFpbkRldGFpbHNUb2dnbGUsIHN1bW1hcnlFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoYG92ZXJmbG93LWhpZGRlbi0ke3RoaXMuZGF0YXNldC5icmVha3BvaW50fWApO1xuICB9XG5cbiAgY2xvc2VNZW51RHJhd2VyKGV2ZW50LCBlbGVtZW50VG9Gb2N1cykge1xuICAgIHN1cGVyLmNsb3NlTWVudURyYXdlcihldmVudCwgZWxlbWVudFRvRm9jdXMpO1xuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtb3BlbicpO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaGVhZGVyLWRyYXdlcicsIEhlYWRlckRyYXdlcik7XG5cbmNsYXNzIE1vZGFsRGlhbG9nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucXVlcnlTZWxlY3RvcignW2lkXj1cIk1vZGFsQ2xvc2UtXCJdJykuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICB0aGlzLmhpZGUuYmluZCh0aGlzKVxuICAgICk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmNvZGUudG9VcHBlckNhc2UoKSA9PT0gJ0VTQ0FQRScpIHRoaXMuaGlkZSgpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWVkaWEtbW9kYWwnKSkge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlID09PSAnbW91c2UnICYmICFldmVudC50YXJnZXQuY2xvc2VzdCgnZGVmZXJyZWQtbWVkaWEsIHByb2R1Y3QtbW9kZWwnKSkgdGhpcy5oaWRlKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnTU9EQUwtRElBTE9HJykgdGhpcy5oaWRlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5tb3ZlZCkgcmV0dXJuO1xuICAgIHRoaXMubW92ZWQgPSB0cnVlO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcyk7XG4gIH1cblxuICBzaG93KG9wZW5lcikge1xuICAgIHRoaXMub3BlbmVkQnkgPSBvcGVuZXI7XG4gICAgY29uc3QgcG9wdXAgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZS1wb3B1cCcpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgaWYgKHBvcHVwKSBwb3B1cC5sb2FkQ29udGVudCgpO1xuICAgIHRyYXBGb2N1cyh0aGlzLCB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiZGlhbG9nXCJdJykpO1xuICAgIHdpbmRvdy5wYXVzZUFsbE1lZGlhKCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ29wZW4nKTtcbiAgICByZW1vdmVUcmFwRm9jdXModGhpcy5vcGVuZWRCeSk7XG4gICAgd2luZG93LnBhdXNlQWxsTWVkaWEoKTtcbiAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtb2RhbC1kaWFsb2cnLCBNb2RhbERpYWxvZyk7XG5cbmNsYXNzIE1vZGFsT3BlbmVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcblxuICAgIGlmICghYnV0dG9uKSByZXR1cm47XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsJykpO1xuICAgICAgaWYgKG1vZGFsKSBtb2RhbC5zaG93KGJ1dHRvbik7XG4gICAgfSk7XG4gIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbW9kYWwtb3BlbmVyJywgTW9kYWxPcGVuZXIpO1xuXG5jbGFzcyBEZWZlcnJlZE1lZGlhIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHBvc3RlciA9IHRoaXMucXVlcnlTZWxlY3RvcignW2lkXj1cIkRlZmVycmVkLVBvc3Rlci1cIl0nKTtcbiAgICBpZiAoIXBvc3RlcikgcmV0dXJuO1xuICAgIHBvc3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubG9hZENvbnRlbnQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBsb2FkQ29udGVudChmb2N1cyA9IHRydWUpIHtcbiAgICB3aW5kb3cucGF1c2VBbGxNZWRpYSgpO1xuICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ2xvYWRlZCcpKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsb2FkZWQnLCB0cnVlKTtcbiAgICAgIGNvbnN0IGRlZmVycmVkRWxlbWVudCA9IHRoaXMuYXBwZW5kQ2hpbGQoY29udGVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbywgbW9kZWwtdmlld2VyLCBpZnJhbWUnKSk7XG4gICAgICBpZiAoZm9jdXMpIGRlZmVycmVkRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2RlZmVycmVkLW1lZGlhJywgRGVmZXJyZWRNZWRpYSk7XG5cbmNsYXNzIFNsaWRlckNvbXBvbmVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNsaWRlciA9IHRoaXMucXVlcnlTZWxlY3RvcignW2lkXj1cIlNsaWRlci1cIl0nKTtcbiAgICB0aGlzLnNsaWRlckl0ZW1zID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwiU2xpZGUtXCJdJyk7XG4gICAgdGhpcy5lbmFibGVTbGlkZXJMb29waW5nID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50UGFnZUVsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItY291bnRlci0tY3VycmVudCcpO1xuICAgIHRoaXMucGFnZVRvdGFsRWxlbWVudCA9IHRoaXMucXVlcnlTZWxlY3RvcignLnNsaWRlci1jb3VudGVyLS10b3RhbCcpO1xuICAgIHRoaXMucHJldkJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJwcmV2aW91c1wiXScpO1xuICAgIHRoaXMubmV4dEJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJuZXh0XCJdJyk7XG5cbiAgICBpZiAoIXRoaXMuc2xpZGVyIHx8ICF0aGlzLm5leHRCdXR0b24pIHJldHVybjtcblxuICAgIHRoaXMuaW5pdFBhZ2VzKCk7XG4gICAgY29uc3QgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB0aGlzLmluaXRQYWdlcygpKTtcbiAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuc2xpZGVyKTtcblxuICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMucHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25CdXR0b25DbGljay5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQnV0dG9uQ2xpY2suYmluZCh0aGlzKSk7XG4gIH1cblxuICBpbml0UGFnZXMoKSB7XG4gICAgdGhpcy5zbGlkZXJJdGVtc1RvU2hvdyA9IEFycmF5LmZyb20odGhpcy5zbGlkZXJJdGVtcykuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5jbGllbnRXaWR0aCA+IDApO1xuICAgIHRoaXMuc2xpZGVyTGFzdEl0ZW0gPSB0aGlzLnNsaWRlckl0ZW1zVG9TaG93W3RoaXMuc2xpZGVySXRlbXNUb1Nob3cubGVuZ3RoIC0gMV07XG4gICAgaWYgKHRoaXMuc2xpZGVySXRlbXNUb1Nob3cubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgdGhpcy5zbGlkZXNQZXJQYWdlID0gTWF0aC5mbG9vcih0aGlzLnNsaWRlci5jbGllbnRXaWR0aCAvIHRoaXMuc2xpZGVySXRlbXNUb1Nob3dbMF0uY2xpZW50V2lkdGgpO1xuICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuc2xpZGVySXRlbXNUb1Nob3cubGVuZ3RoIC0gdGhpcy5zbGlkZXNQZXJQYWdlICsgMTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcmVzZXRQYWdlcygpIHtcbiAgICB0aGlzLnNsaWRlckl0ZW1zID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwiU2xpZGUtXCJdJyk7XG4gICAgdGhpcy5pbml0UGFnZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBNYXRoLnJvdW5kKHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgLyB0aGlzLnNsaWRlckxhc3RJdGVtLmNsaWVudFdpZHRoKSArIDE7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZUVsZW1lbnQgJiYgdGhpcy5wYWdlVG90YWxFbGVtZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudFBhZ2U7XG4gICAgICB0aGlzLnBhZ2VUb3RhbEVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLnRvdGFsUGFnZXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgIT0gcHJldmlvdXNQYWdlKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzbGlkZUNoYW5nZWQnLCB7IGRldGFpbDoge1xuICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5jdXJyZW50UGFnZSxcbiAgICAgICAgY3VycmVudEVsZW1lbnQ6IHRoaXMuc2xpZGVySXRlbXNUb1Nob3dbdGhpcy5jdXJyZW50UGFnZSAtIDFdXG4gICAgICB9fSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVuYWJsZVNsaWRlckxvb3BpbmcpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmlzU2xpZGVWaXNpYmxlKHRoaXMuc2xpZGVySXRlbXNUb1Nob3dbMF0pKSB7XG4gICAgICB0aGlzLnByZXZCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByZXZCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzU2xpZGVWaXNpYmxlKHRoaXMuc2xpZGVyTGFzdEl0ZW0pKSB7XG4gICAgICB0aGlzLm5leHRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5leHRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgfVxuXG4gIGlzU2xpZGVWaXNpYmxlKGVsZW1lbnQsIG9mZnNldCA9IDApIHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZVNsaWRlID0gdGhpcy5zbGlkZXIuY2xpZW50V2lkdGggKyB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0IC0gb2Zmc2V0O1xuICAgIHJldHVybiAoZWxlbWVudC5vZmZzZXRMZWZ0ICsgZWxlbWVudC5jbGllbnRXaWR0aCkgPD0gbGFzdFZpc2libGVTbGlkZSAmJiBlbGVtZW50Lm9mZnNldExlZnQgPj0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdDtcbiAgfVxuXG4gIG9uQnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHN0ZXAgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuc3RlcCB8fCAxO1xuICAgIHRoaXMuc2xpZGVTY3JvbGxQb3NpdGlvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZSA9PT0gJ25leHQnID8gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCArIChzdGVwICogdGhpcy5zbGlkZXJMYXN0SXRlbS5jbGllbnRXaWR0aCkgOiB0aGlzLnNsaWRlci5zY3JvbGxMZWZ0IC0gKHN0ZXAgKiB0aGlzLnNsaWRlckxhc3RJdGVtLmNsaWVudFdpZHRoKTtcbiAgICB0aGlzLnNsaWRlci5zY3JvbGxUbyh7XG4gICAgICBsZWZ0OiB0aGlzLnNsaWRlU2Nyb2xsUG9zaXRpb25cbiAgICB9KTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NsaWRlci1jb21wb25lbnQnLCBTbGlkZXJDb21wb25lbnQpO1xuXG5jbGFzcyBTbGlkZXNob3dDb21wb25lbnQgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2xpZGVyQ29udHJvbFdyYXBwZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYnV0dG9ucycpO1xuICAgIHRoaXMuZW5hYmxlU2xpZGVyTG9vcGluZyA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMuc2xpZGVyQ29udHJvbFdyYXBwZXIpIHJldHVybjtcblxuICAgIHRoaXMuc2xpZGVyRmlyc3RJdGVtTm9kZSA9IHRoaXMuc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXNob3dfX3NsaWRlJyk7XG4gICAgaWYgKHRoaXMuc2xpZGVySXRlbXNUb1Nob3cubGVuZ3RoID4gMCkgdGhpcy5jdXJyZW50UGFnZSA9IDE7XG5cbiAgICB0aGlzLnNsaWRlckNvbnRyb2xMaW5rc0FycmF5ID0gQXJyYXkuZnJvbSh0aGlzLnNsaWRlckNvbnRyb2xXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXItY291bnRlcl9fbGluaycpKTtcbiAgICB0aGlzLnNsaWRlckNvbnRyb2xMaW5rc0FycmF5LmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5saW5rVG9TbGlkZS5iaW5kKHRoaXMpKSk7XG4gICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zZXRTbGlkZVZpc2liaWxpdHkuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zZXRTbGlkZVZpc2liaWxpdHkoKTtcblxuICAgIGlmICh0aGlzLnNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0b3BsYXknKSA9PT0gJ3RydWUnKSB0aGlzLnNldEF1dG9QbGF5KCk7XG4gIH1cblxuICBzZXRBdXRvUGxheSgpIHtcbiAgICB0aGlzLnNsaWRlckF1dG9wbGF5QnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuc2xpZGVzaG93X19hdXRvcGxheScpO1xuICAgIHRoaXMuYXV0b3BsYXlTcGVlZCA9IHRoaXMuc2xpZGVyLmRhdGFzZXQuc3BlZWQgKiAxMDAwO1xuXG4gICAgdGhpcy5zbGlkZXJBdXRvcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYXV0b1BsYXlUb2dnbGUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLmZvY3VzSW5IYW5kbGluZy5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLmZvY3VzT3V0SGFuZGxpbmcuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5mb2N1c0luSGFuZGxpbmcuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuZm9jdXNPdXRIYW5kbGluZy5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMucGxheSgpO1xuICAgIHRoaXMuYXV0b3BsYXlCdXR0b25Jc1NldFRvUGxheSA9IHRydWU7XG4gIH1cblxuICBvbkJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgc3VwZXIub25CdXR0b25DbGljayhldmVudCk7XG4gICAgY29uc3QgaXNGaXJzdFNsaWRlID0gdGhpcy5jdXJyZW50UGFnZSA9PT0gMTtcbiAgICBjb25zdCBpc0xhc3RTbGlkZSA9IHRoaXMuY3VycmVudFBhZ2UgPT09IHRoaXMuc2xpZGVySXRlbXNUb1Nob3cubGVuZ3RoO1xuXG4gICAgaWYgKCFpc0ZpcnN0U2xpZGUgJiYgIWlzTGFzdFNsaWRlKSByZXR1cm47XG5cbiAgICBpZiAoaXNGaXJzdFNsaWRlICYmIGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZSA9PT0gJ3ByZXZpb3VzJykge1xuICAgICAgdGhpcy5zbGlkZVNjcm9sbFBvc2l0aW9uID0gdGhpcy5zbGlkZXIuc2Nyb2xsTGVmdCArIHRoaXMuc2xpZGVyRmlyc3RJdGVtTm9kZS5jbGllbnRXaWR0aCAqIHRoaXMuc2xpZGVySXRlbXNUb1Nob3cubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoaXNMYXN0U2xpZGUgJiYgZXZlbnQuY3VycmVudFRhcmdldC5uYW1lID09PSAnbmV4dCcpIHtcbiAgICAgIHRoaXMuc2xpZGVTY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgfVxuICAgIHRoaXMuc2xpZGVyLnNjcm9sbFRvKHtcbiAgICAgIGxlZnQ6IHRoaXMuc2xpZGVTY3JvbGxQb3NpdGlvblxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgIHRoaXMuc2xpZGVyQ29udHJvbEJ1dHRvbnMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXItY291bnRlcl9fbGluaycpO1xuICAgIHRoaXMucHJldkJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbiAgICBpZiAoIXRoaXMuc2xpZGVyQ29udHJvbEJ1dHRvbnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICB0aGlzLnNsaWRlckNvbnRyb2xCdXR0b25zLmZvckVhY2gobGluayA9PiB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlci1jb3VudGVyX19saW5rLS1hY3RpdmUnKTtcbiAgICAgIGxpbmsucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKTtcbiAgICB9KTtcbiAgICB0aGlzLnNsaWRlckNvbnRyb2xCdXR0b25zW3RoaXMuY3VycmVudFBhZ2UgLSAxXS5jbGFzc0xpc3QuYWRkKCdzbGlkZXItY291bnRlcl9fbGluay0tYWN0aXZlJyk7XG4gICAgdGhpcy5zbGlkZXJDb250cm9sQnV0dG9uc1t0aGlzLmN1cnJlbnRQYWdlIC0gMV0uc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCB0cnVlKTtcbiAgfVxuXG4gIGF1dG9QbGF5VG9nZ2xlKCkge1xuICAgIHRoaXMudG9nZ2xlUGxheUJ1dHRvblN0YXRlKHRoaXMuYXV0b3BsYXlCdXR0b25Jc1NldFRvUGxheSk7XG4gICAgdGhpcy5hdXRvcGxheUJ1dHRvbklzU2V0VG9QbGF5ID8gdGhpcy5wYXVzZSgpIDogdGhpcy5wbGF5KCk7XG4gICAgdGhpcy5hdXRvcGxheUJ1dHRvbklzU2V0VG9QbGF5ID0gIXRoaXMuYXV0b3BsYXlCdXR0b25Jc1NldFRvUGxheTtcbiAgfVxuXG4gIGZvY3VzT3V0SGFuZGxpbmcoZXZlbnQpIHtcbiAgICBjb25zdCBmb2N1c2VkT25BdXRvcGxheUJ1dHRvbiA9IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5zbGlkZXJBdXRvcGxheUJ1dHRvbiB8fCB0aGlzLnNsaWRlckF1dG9wbGF5QnV0dG9uLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG4gICAgaWYgKCF0aGlzLmF1dG9wbGF5QnV0dG9uSXNTZXRUb1BsYXkgfHwgZm9jdXNlZE9uQXV0b3BsYXlCdXR0b24pIHJldHVybjtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIGZvY3VzSW5IYW5kbGluZyhldmVudCkge1xuICAgIGNvbnN0IGZvY3VzZWRPbkF1dG9wbGF5QnV0dG9uID0gZXZlbnQudGFyZ2V0ID09PSB0aGlzLnNsaWRlckF1dG9wbGF5QnV0dG9uIHx8IHRoaXMuc2xpZGVyQXV0b3BsYXlCdXR0b24uY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcbiAgICBpZiAoZm9jdXNlZE9uQXV0b3BsYXlCdXR0b24gJiYgdGhpcy5hdXRvcGxheUJ1dHRvbklzU2V0VG9QbGF5KSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b3BsYXlCdXR0b25Jc1NldFRvUGxheSkge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5zbGlkZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAnb2ZmJyk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9wbGF5KTtcbiAgICB0aGlzLmF1dG9wbGF5ID0gc2V0SW50ZXJ2YWwodGhpcy5hdXRvUm90YXRlU2xpZGVzLmJpbmQodGhpcyksIHRoaXMuYXV0b3BsYXlTcGVlZCk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLnNsaWRlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b3BsYXkpO1xuICB9XG5cbiAgdG9nZ2xlUGxheUJ1dHRvblN0YXRlKHBhdXNlQXV0b3BsYXkpIHtcbiAgICBpZiAocGF1c2VBdXRvcGxheSkge1xuICAgICAgdGhpcy5zbGlkZXJBdXRvcGxheUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzbGlkZXNob3dfX2F1dG9wbGF5LS1wYXVzZWQnKTtcbiAgICAgIHRoaXMuc2xpZGVyQXV0b3BsYXlCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgd2luZG93LmFjY2Vzc2liaWxpdHlTdHJpbmdzLnBsYXlTbGlkZXNob3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNsaWRlckF1dG9wbGF5QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlc2hvd19fYXV0b3BsYXktLXBhdXNlZCcpO1xuICAgICAgdGhpcy5zbGlkZXJBdXRvcGxheUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB3aW5kb3cuYWNjZXNzaWJpbGl0eVN0cmluZ3MucGF1c2VTbGlkZXNob3cpO1xuICAgIH1cbiAgfVxuXG4gIGF1dG9Sb3RhdGVTbGlkZXMoKSB7XG4gICAgY29uc3Qgc2xpZGVTY3JvbGxQb3NpdGlvbiA9IHRoaXMuY3VycmVudFBhZ2UgPT09IHRoaXMuc2xpZGVySXRlbXMubGVuZ3RoID8gMCA6IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgKyB0aGlzLnNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc2xpZGVzaG93X19zbGlkZScpLmNsaWVudFdpZHRoO1xuICAgIHRoaXMuc2xpZGVyLnNjcm9sbFRvKHtcbiAgICAgIGxlZnQ6IHNsaWRlU2Nyb2xsUG9zaXRpb25cbiAgICB9KTtcbiAgfVxuXG4gIHNldFNsaWRlVmlzaWJpbGl0eSgpIHtcbiAgICB0aGlzLnNsaWRlckl0ZW1zVG9TaG93LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBidXR0b24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcbiAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5jdXJyZW50UGFnZSAtIDEpIHtcbiAgICAgICAgaWYgKGJ1dHRvbikgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGJ1dHRvbikgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBsaW5rVG9TbGlkZShldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2xpZGVTY3JvbGxQb3NpdGlvbiA9IHRoaXMuc2xpZGVyLnNjcm9sbExlZnQgKyB0aGlzLnNsaWRlckZpcnN0SXRlbU5vZGUuY2xpZW50V2lkdGggKiAodGhpcy5zbGlkZXJDb250cm9sTGlua3NBcnJheS5pbmRleE9mKGV2ZW50LmN1cnJlbnRUYXJnZXQpICsgMSAtIHRoaXMuY3VycmVudFBhZ2UpO1xuICAgIHRoaXMuc2xpZGVyLnNjcm9sbFRvKHtcbiAgICAgIGxlZnQ6IHNsaWRlU2Nyb2xsUG9zaXRpb25cbiAgICB9KTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NsaWRlc2hvdy1jb21wb25lbnQnLCBTbGlkZXNob3dDb21wb25lbnQpO1xuXG5jbGFzcyBWYXJpYW50U2VsZWN0cyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25WYXJpYW50Q2hhbmdlKTtcbiAgfVxuXG4gIG9uVmFyaWFudENoYW5nZSgpIHtcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICB0aGlzLnVwZGF0ZU1hc3RlcklkKCk7XG4gICAgdGhpcy50b2dnbGVBZGRCdXR0b24odHJ1ZSwgJycsIGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZVBpY2t1cEF2YWlsYWJpbGl0eSgpO1xuICAgIHRoaXMucmVtb3ZlRXJyb3JNZXNzYWdlKCk7XG5cbiAgICBpZiAoIXRoaXMuY3VycmVudFZhcmlhbnQpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWRkQnV0dG9uKHRydWUsICcnLCB0cnVlKTtcbiAgICAgIHRoaXMuc2V0VW5hdmFpbGFibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVNZWRpYSgpO1xuICAgICAgdGhpcy51cGRhdGVVUkwoKTtcbiAgICAgIHRoaXMudXBkYXRlVmFyaWFudElucHV0KCk7XG4gICAgICB0aGlzLnJlbmRlclByb2R1Y3RJbmZvKCk7XG4gICAgICB0aGlzLnVwZGF0ZVNoYXJlVXJsKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlT3B0aW9ucygpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JyksIChzZWxlY3QpID0+IHNlbGVjdC52YWx1ZSk7XG4gIH1cblxuICB1cGRhdGVNYXN0ZXJJZCgpIHtcbiAgICB0aGlzLmN1cnJlbnRWYXJpYW50ID0gdGhpcy5nZXRWYXJpYW50RGF0YSgpLmZpbmQoKHZhcmlhbnQpID0+IHtcbiAgICAgIHJldHVybiAhdmFyaWFudC5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW2luZGV4XSA9PT0gb3B0aW9uO1xuICAgICAgfSkuaW5jbHVkZXMoZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWVkaWEoKSB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRWYXJpYW50KSByZXR1cm47XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRWYXJpYW50LmZlYXR1cmVkX21lZGlhKSByZXR1cm47XG5cbiAgICBjb25zdCBtZWRpYUdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgTWVkaWFHYWxsZXJ5LSR7dGhpcy5kYXRhc2V0LnNlY3Rpb259YCk7XG4gICAgbWVkaWFHYWxsZXJ5LnNldEFjdGl2ZU1lZGlhKGAke3RoaXMuZGF0YXNldC5zZWN0aW9ufS0ke3RoaXMuY3VycmVudFZhcmlhbnQuZmVhdHVyZWRfbWVkaWEuaWR9YCwgdHJ1ZSk7XG5cbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjUHJvZHVjdE1vZGFsLSR7dGhpcy5kYXRhc2V0LnNlY3Rpb259IC5wcm9kdWN0LW1lZGlhLW1vZGFsX19jb250ZW50YCk7XG4gICAgY29uc3QgbmV3TWVkaWFNb2RhbCA9IG1vZGFsQ29udGVudC5xdWVyeVNlbGVjdG9yKCBgW2RhdGEtbWVkaWEtaWQ9XCIke3RoaXMuY3VycmVudFZhcmlhbnQuZmVhdHVyZWRfbWVkaWEuaWR9XCJdYCk7XG4gICAgbW9kYWxDb250ZW50LnByZXBlbmQobmV3TWVkaWFNb2RhbCk7XG4gIH1cblxuICB1cGRhdGVVUkwoKSB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRWYXJpYW50IHx8IHRoaXMuZGF0YXNldC51cGRhdGVVcmwgPT09ICdmYWxzZScpIHJldHVybjtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyB9LCAnJywgYCR7dGhpcy5kYXRhc2V0LnVybH0/dmFyaWFudD0ke3RoaXMuY3VycmVudFZhcmlhbnQuaWR9YCk7XG4gIH1cblxuICB1cGRhdGVTaGFyZVVybCgpIHtcbiAgICBjb25zdCBzaGFyZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBTaGFyZS0ke3RoaXMuZGF0YXNldC5zZWN0aW9ufWApO1xuICAgIGlmICghc2hhcmVCdXR0b24pIHJldHVybjtcbiAgICBzaGFyZUJ1dHRvbi51cGRhdGVVcmwoYCR7d2luZG93LnNob3BVcmx9JHt0aGlzLmRhdGFzZXQudXJsfT92YXJpYW50PSR7dGhpcy5jdXJyZW50VmFyaWFudC5pZH1gKTtcbiAgfVxuXG4gIHVwZGF0ZVZhcmlhbnRJbnB1dCgpIHtcbiAgICBjb25zdCBwcm9kdWN0Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjcHJvZHVjdC1mb3JtLSR7dGhpcy5kYXRhc2V0LnNlY3Rpb259LCAjcHJvZHVjdC1mb3JtLWluc3RhbGxtZW50YCk7XG4gICAgcHJvZHVjdEZvcm1zLmZvckVhY2goKHByb2R1Y3RGb3JtKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHByb2R1Y3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpZFwiXScpO1xuICAgICAgaW5wdXQudmFsdWUgPSB0aGlzLmN1cnJlbnRWYXJpYW50LmlkO1xuICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQaWNrdXBBdmFpbGFiaWxpdHkoKSB7XG4gICAgY29uc3QgcGlja1VwQXZhaWxhYmlsaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGlja3VwLWF2YWlsYWJpbGl0eScpO1xuICAgIGlmICghcGlja1VwQXZhaWxhYmlsaXR5KSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5jdXJyZW50VmFyaWFudCAmJiB0aGlzLmN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSkge1xuICAgICAgcGlja1VwQXZhaWxhYmlsaXR5LmZldGNoQXZhaWxhYmlsaXR5KHRoaXMuY3VycmVudFZhcmlhbnQuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaWNrVXBBdmFpbGFiaWxpdHkucmVtb3ZlQXR0cmlidXRlKCdhdmFpbGFibGUnKTtcbiAgICAgIHBpY2tVcEF2YWlsYWJpbGl0eS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICByZW1vdmVFcnJvck1lc3NhZ2UoKSB7XG4gICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuY2xvc2VzdCgnc2VjdGlvbicpO1xuICAgIGlmICghc2VjdGlvbikgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJvZHVjdEZvcm0gPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJ3Byb2R1Y3QtZm9ybScpO1xuICAgIGlmIChwcm9kdWN0Rm9ybSkgcHJvZHVjdEZvcm0uaGFuZGxlRXJyb3JNZXNzYWdlKCk7XG4gIH1cblxuICByZW5kZXJQcm9kdWN0SW5mbygpIHtcbiAgICBmZXRjaChgJHt0aGlzLmRhdGFzZXQudXJsfT92YXJpYW50PSR7dGhpcy5jdXJyZW50VmFyaWFudC5pZH0mc2VjdGlvbl9pZD0ke3RoaXMuZGF0YXNldC5zZWN0aW9ufWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgIC50aGVuKChyZXNwb25zZVRleHQpID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBgcHJpY2UtJHt0aGlzLmRhdGFzZXQuc2VjdGlvbn1gO1xuICAgICAgICBjb25zdCBodG1sID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZVRleHQsICd0ZXh0L2h0bWwnKVxuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gaHRtbC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICAgICAgaWYgKHNvdXJjZSAmJiBkZXN0aW5hdGlvbikgZGVzdGluYXRpb24uaW5uZXJIVE1MID0gc291cmNlLmlubmVySFRNTDtcblxuICAgICAgICBjb25zdCBwcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcmljZS0ke3RoaXMuZGF0YXNldC5zZWN0aW9ufWApO1xuXG4gICAgICAgIGlmIChwcmljZSkgcHJpY2UuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJpbGl0eS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy50b2dnbGVBZGRCdXR0b24oIXRoaXMuY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlLCB3aW5kb3cudmFyaWFudFN0cmluZ3Muc29sZE91dCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZUFkZEJ1dHRvbihkaXNhYmxlID0gdHJ1ZSwgdGV4dCwgbW9kaWZ5Q2xhc3MgPSB0cnVlKSB7XG4gICAgY29uc3QgcHJvZHVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvZHVjdC1mb3JtLSR7dGhpcy5kYXRhc2V0LnNlY3Rpb259YCk7XG4gICAgaWYgKCFwcm9kdWN0Rm9ybSkgcmV0dXJuO1xuICAgIGNvbnN0IGFkZEJ1dHRvbiA9IHByb2R1Y3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiYWRkXCJdJyk7XG4gICAgY29uc3QgYWRkQnV0dG9uVGV4dCA9IHByb2R1Y3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiYWRkXCJdID4gc3BhbicpO1xuXG4gICAgaWYgKCFhZGRCdXR0b24pIHJldHVybjtcblxuICAgIGlmIChkaXNhYmxlKSB7XG4gICAgICBhZGRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgaWYgKHRleHQpIGFkZEJ1dHRvblRleHQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgYWRkQnV0dG9uVGV4dC50ZXh0Q29udGVudCA9IHdpbmRvdy52YXJpYW50U3RyaW5ncy5hZGRUb0NhcnQ7XG4gICAgfVxuXG4gICAgaWYgKCFtb2RpZnlDbGFzcykgcmV0dXJuO1xuICB9XG5cbiAgc2V0VW5hdmFpbGFibGUoKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2R1Y3QtZm9ybS0ke3RoaXMuZGF0YXNldC5zZWN0aW9ufWApO1xuICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImFkZFwiXScpO1xuICAgIGNvbnN0IGFkZEJ1dHRvblRleHQgPSBidXR0b24ucXVlcnlTZWxlY3RvcignW25hbWU9XCJhZGRcIl0gPiBzcGFuJyk7XG4gICAgY29uc3QgcHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJpY2UtJHt0aGlzLmRhdGFzZXQuc2VjdGlvbn1gKTtcbiAgICBpZiAoIWFkZEJ1dHRvbikgcmV0dXJuO1xuICAgIGFkZEJ1dHRvblRleHQudGV4dENvbnRlbnQgPSB3aW5kb3cudmFyaWFudFN0cmluZ3MudW5hdmFpbGFibGU7XG4gICAgaWYgKHByaWNlKSBwcmljZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmlsaXR5LWhpZGRlbicpO1xuICB9XG5cbiAgZ2V0VmFyaWFudERhdGEoKSB7XG4gICAgdGhpcy52YXJpYW50RGF0YSA9IHRoaXMudmFyaWFudERhdGEgfHwgSlNPTi5wYXJzZSh0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwiYXBwbGljYXRpb24vanNvblwiXScpLnRleHRDb250ZW50KTtcbiAgICByZXR1cm4gdGhpcy52YXJpYW50RGF0YTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZhcmlhbnQtc2VsZWN0cycsIFZhcmlhbnRTZWxlY3RzKTtcblxuY2xhc3MgVmFyaWFudFJhZGlvcyBleHRlbmRzIFZhcmlhbnRTZWxlY3RzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMoKSB7XG4gICAgY29uc3QgZmllbGRzZXRzID0gQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ZpZWxkc2V0JykpO1xuICAgIHRoaXMub3B0aW9ucyA9IGZpZWxkc2V0cy5tYXAoKGZpZWxkc2V0KSA9PiB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShmaWVsZHNldC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpKS5maW5kKChyYWRpbykgPT4gcmFkaW8uY2hlY2tlZCkudmFsdWU7XG4gICAgfSk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2YXJpYW50LXJhZGlvcycsIFZhcmlhbnRSYWRpb3MpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tIFwiLi9zZXRQcm90b3R5cGVPZi5qc1wiO1xuaW1wb3J0IGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCBmcm9tIFwiLi9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICBpZiAoaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7XG4gIH0gZWxzZSB7XG4gICAgX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgdmFyIGEgPSBbbnVsbF07XG4gICAgICBhLnB1c2guYXBwbHkoYSwgYXJncyk7XG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICAgIGlmIChDbGFzcykgc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiaW1wb3J0IHN1cGVyUHJvcEJhc2UgZnJvbSBcIi4vc3VwZXJQcm9wQmFzZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2dldCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIFJlZmxlY3QuZ2V0KSB7XG4gICAgX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICB2YXIgYmFzZSA9IHN1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoIWJhc2UpIHJldHVybjtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHRhcmdldCA6IHJlY2VpdmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufSIsImltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tIFwiLi9zZXRQcm90b3R5cGVPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3ViQ2xhc3MsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2lzTmF0aXZlRnVuY3Rpb24oZm4pIHtcbiAgcmV0dXJuIEZ1bmN0aW9uLnRvU3RyaW5nLmNhbGwoZm4pLmluZGV4T2YoXCJbbmF0aXZlIGNvZGVdXCIpICE9PSAtMTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7XG5cbiAgdHJ5IHtcbiAgICBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmltcG9ydCBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgZnJvbSBcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH0gZWxzZSBpZiAoY2FsbCAhPT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn0iLCJpbXBvcnQgZ2V0UHJvdG90eXBlT2YgZnJvbSBcIi4vZ2V0UHJvdG90eXBlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zdXBlclByb3BCYXNlKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgd2hpbGUgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIGlmIChvYmplY3QgPT09IG51bGwpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsImltcG9ydCBnZXRQcm90b3R5cGVPZiBmcm9tIFwiLi9nZXRQcm90b3R5cGVPZi5qc1wiO1xuaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gXCIuL3NldFByb3RvdHlwZU9mLmpzXCI7XG5pbXBvcnQgaXNOYXRpdmVGdW5jdGlvbiBmcm9tIFwiLi9pc05hdGl2ZUZ1bmN0aW9uLmpzXCI7XG5pbXBvcnQgY29uc3RydWN0IGZyb20gXCIuL2NvbnN0cnVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcihDbGFzcykge1xuICB2YXIgX2NhY2hlID0gdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiID8gbmV3IE1hcCgpIDogdW5kZWZpbmVkO1xuXG4gIF93cmFwTmF0aXZlU3VwZXIgPSBmdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKSB7XG4gICAgaWYgKENsYXNzID09PSBudWxsIHx8ICFpc05hdGl2ZUZ1bmN0aW9uKENsYXNzKSkgcmV0dXJuIENsYXNzO1xuXG4gICAgaWYgKHR5cGVvZiBDbGFzcyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBfY2FjaGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChfY2FjaGUuaGFzKENsYXNzKSkgcmV0dXJuIF9jYWNoZS5nZXQoQ2xhc3MpO1xuXG4gICAgICBfY2FjaGUuc2V0KENsYXNzLCBXcmFwcGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBXcmFwcGVyKCkge1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdChDbGFzcywgYXJndW1lbnRzLCBnZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuXG4gICAgV3JhcHBlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENsYXNzLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IFdyYXBwZXIsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNldFByb3RvdHlwZU9mKFdyYXBwZXIsIENsYXNzKTtcbiAgfTtcblxuICByZXR1cm4gX3dyYXBOYXRpdmVTdXBlcihDbGFzcyk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2Rhd24vZ2xvYmFsJztcblxuY29uc29sZS5sb2coJ0Jhc2UgZmlsZSBqcycpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJnZXRGb2N1c2FibGVFbGVtZW50cyIsImNvbnRhaW5lciIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkb2N1bWVudCIsImZvckVhY2giLCJzdW1tYXJ5Iiwic2V0QXR0cmlidXRlIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZ2V0QXR0cmlidXRlIiwiaWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiY2xvc2VzdCIsImhhc0F0dHJpYnV0ZSIsInBhcmVudEVsZW1lbnQiLCJvbktleVVwRXNjYXBlIiwidHJhcEZvY3VzSGFuZGxlcnMiLCJ0cmFwRm9jdXMiLCJlbGVtZW50VG9Gb2N1cyIsImVsZW1lbnRzIiwiZmlyc3QiLCJsYXN0IiwibGVuZ3RoIiwicmVtb3ZlVHJhcEZvY3VzIiwiZm9jdXNpbiIsInRhcmdldCIsImtleWRvd24iLCJmb2N1c291dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2RlIiwidG9VcHBlckNhc2UiLCJzaGlmdEtleSIsInByZXZlbnREZWZhdWx0IiwiZm9jdXMiLCJxdWVyeVNlbGVjdG9yIiwiZm9jdXNWaXNpYmxlUG9seWZpbGwiLCJuYXZLZXlzIiwiY3VycmVudEZvY3VzZWRFbGVtZW50IiwibW91c2VDbGljayIsIndpbmRvdyIsImluY2x1ZGVzIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWN0aXZlRWxlbWVudCIsImFkZCIsInBhdXNlQWxsTWVkaWEiLCJ2aWRlbyIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsInBhdXNlIiwibW9kZWwiLCJtb2RlbFZpZXdlclVJIiwib3BlbkRldGFpbHNFbGVtZW50Iiwic3VtbWFyeUVsZW1lbnQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJRdWFudGl0eUlucHV0IiwiaW5wdXQiLCJjaGFuZ2VFdmVudCIsIkV2ZW50IiwiYnViYmxlcyIsImJ1dHRvbiIsIm9uQnV0dG9uQ2xpY2siLCJiaW5kIiwicHJldmlvdXNWYWx1ZSIsInZhbHVlIiwibmFtZSIsInN0ZXBVcCIsInN0ZXBEb3duIiwiZGlzcGF0Y2hFdmVudCIsIkhUTUxFbGVtZW50IiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJkZWJvdW5jZSIsImZuIiwid2FpdCIsInQiLCJhcmdzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImFwcGx5IiwiZmV0Y2hDb25maWciLCJ0eXBlIiwibWV0aG9kIiwiaGVhZGVycyIsIlNob3BpZnkiLCJzY29wZSIsImFyZ3VtZW50cyIsInNldFNlbGVjdG9yQnlWYWx1ZSIsInNlbGVjdG9yIiwiaSIsImNvdW50Iiwib3B0aW9ucyIsIm9wdGlvbiIsImlubmVySFRNTCIsInNlbGVjdGVkSW5kZXgiLCJhZGRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwiYXR0YWNoRXZlbnQiLCJwb3N0TGluayIsInBhdGgiLCJwYXJhbXMiLCJmb3JtIiwiY3JlYXRlRWxlbWVudCIsImtleSIsImhpZGRlbkZpZWxkIiwiYXBwZW5kQ2hpbGQiLCJib2R5Iiwic3VibWl0IiwicmVtb3ZlQ2hpbGQiLCJDb3VudHJ5UHJvdmluY2VTZWxlY3RvciIsImNvdW50cnlfZG9taWQiLCJwcm92aW5jZV9kb21pZCIsImNvdW50cnlFbCIsImdldEVsZW1lbnRCeUlkIiwicHJvdmluY2VFbCIsInByb3ZpbmNlQ29udGFpbmVyIiwiY291bnRyeUhhbmRsZXIiLCJpbml0Q291bnRyeSIsImluaXRQcm92aW5jZSIsInByb3RvdHlwZSIsImUiLCJvcHQiLCJyYXciLCJwcm92aW5jZXMiLCJKU09OIiwicGFyc2UiLCJjbGVhck9wdGlvbnMiLCJzdHlsZSIsImRpc3BsYXkiLCJmaXJzdENoaWxkIiwic2V0T3B0aW9ucyIsInZhbHVlcyIsIk1lbnVEcmF3ZXIiLCJtYWluRGV0YWlsc1RvZ2dsZSIsIm5hdmlnYXRvciIsInBsYXRmb3JtIiwiZG9jdW1lbnRFbGVtZW50Iiwic2V0UHJvcGVydHkiLCJpbm5lckhlaWdodCIsIm9uS2V5VXAiLCJvbkZvY3VzT3V0IiwiYmluZEV2ZW50cyIsIm9uU3VtbWFyeUNsaWNrIiwib25DbG9zZUJ1dHRvbkNsaWNrIiwiY2xvc2VNZW51RHJhd2VyIiwiY2xvc2VTdWJtZW51IiwiZGV0YWlsc0VsZW1lbnQiLCJwYXJlbnROb2RlIiwiaXNPcGVuIiwicmVkdWNlZE1vdGlvbiIsIm1hdGNoTWVkaWEiLCJhZGRUcmFwRm9jdXMiLCJvcGVuTWVudURyYXdlciIsIm1hdGNoZXMiLCJkYXRhc2V0IiwiYnJlYWtwb2ludCIsInVuZGVmaW5lZCIsImRldGFpbHMiLCJjbG9zZUFuaW1hdGlvbiIsImNvbnRhaW5zIiwiYW5pbWF0aW9uU3RhcnQiLCJoYW5kbGVBbmltYXRpb24iLCJ0aW1lIiwiZWxhcHNlZFRpbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJIZWFkZXJEcmF3ZXIiLCJoZWFkZXIiLCJib3JkZXJPZmZzZXQiLCJwYXJzZUludCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsIk1vZGFsRGlhbG9nIiwiaGlkZSIsInBvaW50ZXJUeXBlIiwibm9kZU5hbWUiLCJtb3ZlZCIsIm9wZW5lciIsIm9wZW5lZEJ5IiwicG9wdXAiLCJsb2FkQ29udGVudCIsIk1vZGFsT3BlbmVyIiwibW9kYWwiLCJzaG93IiwiRGVmZXJyZWRNZWRpYSIsInBvc3RlciIsImNvbnRlbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImNsb25lTm9kZSIsImRlZmVycmVkRWxlbWVudCIsIlNsaWRlckNvbXBvbmVudCIsInNsaWRlciIsInNsaWRlckl0ZW1zIiwiZW5hYmxlU2xpZGVyTG9vcGluZyIsImN1cnJlbnRQYWdlRWxlbWVudCIsInBhZ2VUb3RhbEVsZW1lbnQiLCJwcmV2QnV0dG9uIiwibmV4dEJ1dHRvbiIsImluaXRQYWdlcyIsInJlc2l6ZU9ic2VydmVyIiwiUmVzaXplT2JzZXJ2ZXIiLCJlbnRyaWVzIiwib2JzZXJ2ZSIsInVwZGF0ZSIsInNsaWRlckl0ZW1zVG9TaG93IiwiZmlsdGVyIiwiZWxlbWVudCIsImNsaWVudFdpZHRoIiwic2xpZGVyTGFzdEl0ZW0iLCJzbGlkZXNQZXJQYWdlIiwiTWF0aCIsImZsb29yIiwidG90YWxQYWdlcyIsInByZXZpb3VzUGFnZSIsImN1cnJlbnRQYWdlIiwicm91bmQiLCJzY3JvbGxMZWZ0IiwidGV4dENvbnRlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImN1cnJlbnRFbGVtZW50IiwiaXNTbGlkZVZpc2libGUiLCJvZmZzZXQiLCJsYXN0VmlzaWJsZVNsaWRlIiwib2Zmc2V0TGVmdCIsInN0ZXAiLCJzbGlkZVNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsVG8iLCJsZWZ0IiwiU2xpZGVzaG93Q29tcG9uZW50Iiwic2xpZGVyQ29udHJvbFdyYXBwZXIiLCJzbGlkZXJGaXJzdEl0ZW1Ob2RlIiwic2xpZGVyQ29udHJvbExpbmtzQXJyYXkiLCJsaW5rIiwibGlua1RvU2xpZGUiLCJzZXRTbGlkZVZpc2liaWxpdHkiLCJzZXRBdXRvUGxheSIsInNsaWRlckF1dG9wbGF5QnV0dG9uIiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwiYXV0b1BsYXlUb2dnbGUiLCJmb2N1c0luSGFuZGxpbmciLCJmb2N1c091dEhhbmRsaW5nIiwicGxheSIsImF1dG9wbGF5QnV0dG9uSXNTZXRUb1BsYXkiLCJpc0ZpcnN0U2xpZGUiLCJpc0xhc3RTbGlkZSIsInNsaWRlckNvbnRyb2xCdXR0b25zIiwidG9nZ2xlUGxheUJ1dHRvblN0YXRlIiwiZm9jdXNlZE9uQXV0b3BsYXlCdXR0b24iLCJjbGVhckludGVydmFsIiwiYXV0b3BsYXkiLCJzZXRJbnRlcnZhbCIsImF1dG9Sb3RhdGVTbGlkZXMiLCJwYXVzZUF1dG9wbGF5IiwiYWNjZXNzaWJpbGl0eVN0cmluZ3MiLCJwbGF5U2xpZGVzaG93IiwicGF1c2VTbGlkZXNob3ciLCJpdGVtIiwiaW5kZXgiLCJpbmRleE9mIiwiVmFyaWFudFNlbGVjdHMiLCJvblZhcmlhbnRDaGFuZ2UiLCJ1cGRhdGVPcHRpb25zIiwidXBkYXRlTWFzdGVySWQiLCJ0b2dnbGVBZGRCdXR0b24iLCJ1cGRhdGVQaWNrdXBBdmFpbGFiaWxpdHkiLCJyZW1vdmVFcnJvck1lc3NhZ2UiLCJjdXJyZW50VmFyaWFudCIsInNldFVuYXZhaWxhYmxlIiwidXBkYXRlTWVkaWEiLCJ1cGRhdGVVUkwiLCJ1cGRhdGVWYXJpYW50SW5wdXQiLCJyZW5kZXJQcm9kdWN0SW5mbyIsInVwZGF0ZVNoYXJlVXJsIiwic2VsZWN0IiwiZ2V0VmFyaWFudERhdGEiLCJmaW5kIiwidmFyaWFudCIsIm1hcCIsImZlYXR1cmVkX21lZGlhIiwibWVkaWFHYWxsZXJ5Iiwic2VjdGlvbiIsInNldEFjdGl2ZU1lZGlhIiwibW9kYWxDb250ZW50IiwibmV3TWVkaWFNb2RhbCIsInByZXBlbmQiLCJ1cGRhdGVVcmwiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidXJsIiwic2hhcmVCdXR0b24iLCJzaG9wVXJsIiwicHJvZHVjdEZvcm1zIiwicHJvZHVjdEZvcm0iLCJwaWNrVXBBdmFpbGFiaWxpdHkiLCJhdmFpbGFibGUiLCJmZXRjaEF2YWlsYWJpbGl0eSIsImhhbmRsZUVycm9yTWVzc2FnZSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwidGV4dCIsInJlc3BvbnNlVGV4dCIsImh0bWwiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJkZXN0aW5hdGlvbiIsInNvdXJjZSIsInByaWNlIiwidmFyaWFudFN0cmluZ3MiLCJzb2xkT3V0IiwiZGlzYWJsZSIsIm1vZGlmeUNsYXNzIiwiYWRkQnV0dG9uIiwiYWRkQnV0dG9uVGV4dCIsImFkZFRvQ2FydCIsInVuYXZhaWxhYmxlIiwidmFyaWFudERhdGEiLCJWYXJpYW50UmFkaW9zIiwiZmllbGRzZXRzIiwiZmllbGRzZXQiLCJyYWRpbyIsImNoZWNrZWQiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==