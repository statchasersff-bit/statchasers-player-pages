function Vy(t, r) {
  for (var o = 0; o < r.length; o++) {
    const l = r[o];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const c in l)
        if (c !== "default" && !(c in t)) {
          const u = Object.getOwnPropertyDescriptor(l, c);
          u && Object.defineProperty(t, c, u.get ? u : {
            enumerable: !0,
            get: () => l[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function Yy(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var wl = { exports: {} }, ks = {}, bl = { exports: {} }, we = {};
var Pf;
function Gy() {
  if (Pf) return we;
  Pf = 1;
  var t = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), l = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), u = /* @__PURE__ */ Symbol.for("react.provider"), f = /* @__PURE__ */ Symbol.for("react.context"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), y = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), v = Symbol.iterator;
  function w(E) {
    return E === null || typeof E != "object" ? null : (E = v && E[v] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var S = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, P = Object.assign, k = {};
  function j(E, B, ce) {
    this.props = E, this.context = B, this.refs = k, this.updater = ce || S;
  }
  j.prototype.isReactComponent = {}, j.prototype.setState = function(E, B) {
    if (typeof E != "object" && typeof E != "function" && E != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, E, B, "setState");
  }, j.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function A() {
  }
  A.prototype = j.prototype;
  function _(E, B, ce) {
    this.props = E, this.context = B, this.refs = k, this.updater = ce || S;
  }
  var C = _.prototype = new A();
  C.constructor = _, P(C, j.prototype), C.isPureReactComponent = !0;
  var F = Array.isArray, U = Object.prototype.hasOwnProperty, H = { current: null }, Y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function X(E, B, ce) {
    var le, pe = {}, ve = null, me = null;
    if (B != null) for (le in B.ref !== void 0 && (me = B.ref), B.key !== void 0 && (ve = "" + B.key), B) U.call(B, le) && !Y.hasOwnProperty(le) && (pe[le] = B[le]);
    var je = arguments.length - 2;
    if (je === 1) pe.children = ce;
    else if (1 < je) {
      for (var _e = Array(je), tt = 0; tt < je; tt++) _e[tt] = arguments[tt + 2];
      pe.children = _e;
    }
    if (E && E.defaultProps) for (le in je = E.defaultProps, je) pe[le] === void 0 && (pe[le] = je[le]);
    return { $$typeof: t, type: E, key: ve, ref: me, props: pe, _owner: H.current };
  }
  function se(E, B) {
    return { $$typeof: t, type: E.type, key: B, ref: E.ref, props: E.props, _owner: E._owner };
  }
  function ne(E) {
    return typeof E == "object" && E !== null && E.$$typeof === t;
  }
  function ie(E) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(ce) {
      return B[ce];
    });
  }
  var Q = /\/+/g;
  function z(E, B) {
    return typeof E == "object" && E !== null && E.key != null ? ie("" + E.key) : B.toString(36);
  }
  function Z(E, B, ce, le, pe) {
    var ve = typeof E;
    (ve === "undefined" || ve === "boolean") && (E = null);
    var me = !1;
    if (E === null) me = !0;
    else switch (ve) {
      case "string":
      case "number":
        me = !0;
        break;
      case "object":
        switch (E.$$typeof) {
          case t:
          case r:
            me = !0;
        }
    }
    if (me) return me = E, pe = pe(me), E = le === "" ? "." + z(me, 0) : le, F(pe) ? (ce = "", E != null && (ce = E.replace(Q, "$&/") + "/"), Z(pe, B, ce, "", function(tt) {
      return tt;
    })) : pe != null && (ne(pe) && (pe = se(pe, ce + (!pe.key || me && me.key === pe.key ? "" : ("" + pe.key).replace(Q, "$&/") + "/") + E)), B.push(pe)), 1;
    if (me = 0, le = le === "" ? "." : le + ":", F(E)) for (var je = 0; je < E.length; je++) {
      ve = E[je];
      var _e = le + z(ve, je);
      me += Z(ve, B, ce, _e, pe);
    }
    else if (_e = w(E), typeof _e == "function") for (E = _e.call(E), je = 0; !(ve = E.next()).done; ) ve = ve.value, _e = le + z(ve, je++), me += Z(ve, B, ce, _e, pe);
    else if (ve === "object") throw B = String(E), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
    return me;
  }
  function ge(E, B, ce) {
    if (E == null) return E;
    var le = [], pe = 0;
    return Z(E, le, "", "", function(ve) {
      return B.call(ce, ve, pe++);
    }), le;
  }
  function fe(E) {
    if (E._status === -1) {
      var B = E._result;
      B = B(), B.then(function(ce) {
        (E._status === 0 || E._status === -1) && (E._status = 1, E._result = ce);
      }, function(ce) {
        (E._status === 0 || E._status === -1) && (E._status = 2, E._result = ce);
      }), E._status === -1 && (E._status = 0, E._result = B);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var M = { current: null }, L = { transition: null }, K = { ReactCurrentDispatcher: M, ReactCurrentBatchConfig: L, ReactCurrentOwner: H };
  function D() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return we.Children = { map: ge, forEach: function(E, B, ce) {
    ge(E, function() {
      B.apply(this, arguments);
    }, ce);
  }, count: function(E) {
    var B = 0;
    return ge(E, function() {
      B++;
    }), B;
  }, toArray: function(E) {
    return ge(E, function(B) {
      return B;
    }) || [];
  }, only: function(E) {
    if (!ne(E)) throw Error("React.Children.only expected to receive a single React element child.");
    return E;
  } }, we.Component = j, we.Fragment = o, we.Profiler = c, we.PureComponent = _, we.StrictMode = l, we.Suspense = m, we.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K, we.act = D, we.cloneElement = function(E, B, ce) {
    if (E == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + E + ".");
    var le = P({}, E.props), pe = E.key, ve = E.ref, me = E._owner;
    if (B != null) {
      if (B.ref !== void 0 && (ve = B.ref, me = H.current), B.key !== void 0 && (pe = "" + B.key), E.type && E.type.defaultProps) var je = E.type.defaultProps;
      for (_e in B) U.call(B, _e) && !Y.hasOwnProperty(_e) && (le[_e] = B[_e] === void 0 && je !== void 0 ? je[_e] : B[_e]);
    }
    var _e = arguments.length - 2;
    if (_e === 1) le.children = ce;
    else if (1 < _e) {
      je = Array(_e);
      for (var tt = 0; tt < _e; tt++) je[tt] = arguments[tt + 2];
      le.children = je;
    }
    return { $$typeof: t, type: E.type, key: pe, ref: ve, props: le, _owner: me };
  }, we.createContext = function(E) {
    return E = { $$typeof: f, _currentValue: E, _currentValue2: E, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, E.Provider = { $$typeof: u, _context: E }, E.Consumer = E;
  }, we.createElement = X, we.createFactory = function(E) {
    var B = X.bind(null, E);
    return B.type = E, B;
  }, we.createRef = function() {
    return { current: null };
  }, we.forwardRef = function(E) {
    return { $$typeof: h, render: E };
  }, we.isValidElement = ne, we.lazy = function(E) {
    return { $$typeof: g, _payload: { _status: -1, _result: E }, _init: fe };
  }, we.memo = function(E, B) {
    return { $$typeof: y, type: E, compare: B === void 0 ? null : B };
  }, we.startTransition = function(E) {
    var B = L.transition;
    L.transition = {};
    try {
      E();
    } finally {
      L.transition = B;
    }
  }, we.unstable_act = D, we.useCallback = function(E, B) {
    return M.current.useCallback(E, B);
  }, we.useContext = function(E) {
    return M.current.useContext(E);
  }, we.useDebugValue = function() {
  }, we.useDeferredValue = function(E) {
    return M.current.useDeferredValue(E);
  }, we.useEffect = function(E, B) {
    return M.current.useEffect(E, B);
  }, we.useId = function() {
    return M.current.useId();
  }, we.useImperativeHandle = function(E, B, ce) {
    return M.current.useImperativeHandle(E, B, ce);
  }, we.useInsertionEffect = function(E, B) {
    return M.current.useInsertionEffect(E, B);
  }, we.useLayoutEffect = function(E, B) {
    return M.current.useLayoutEffect(E, B);
  }, we.useMemo = function(E, B) {
    return M.current.useMemo(E, B);
  }, we.useReducer = function(E, B, ce) {
    return M.current.useReducer(E, B, ce);
  }, we.useRef = function(E) {
    return M.current.useRef(E);
  }, we.useState = function(E) {
    return M.current.useState(E);
  }, we.useSyncExternalStore = function(E, B, ce) {
    return M.current.useSyncExternalStore(E, B, ce);
  }, we.useTransition = function() {
    return M.current.useTransition();
  }, we.version = "18.3.1", we;
}
var Ef;
function gi() {
  return Ef || (Ef = 1, bl.exports = Gy()), bl.exports;
}
var Rf;
function Qy() {
  if (Rf) return ks;
  Rf = 1;
  var t = gi(), r = /* @__PURE__ */ Symbol.for("react.element"), o = /* @__PURE__ */ Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, c = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(h, m, y) {
    var g, v = {}, w = null, S = null;
    y !== void 0 && (w = "" + y), m.key !== void 0 && (w = "" + m.key), m.ref !== void 0 && (S = m.ref);
    for (g in m) l.call(m, g) && !u.hasOwnProperty(g) && (v[g] = m[g]);
    if (h && h.defaultProps) for (g in m = h.defaultProps, m) v[g] === void 0 && (v[g] = m[g]);
    return { $$typeof: r, type: h, key: w, ref: S, props: v, _owner: c.current };
  }
  return ks.Fragment = o, ks.jsx = f, ks.jsxs = f, ks;
}
var Tf;
function Ky() {
  return Tf || (Tf = 1, wl.exports = Qy()), wl.exports;
}
var i = Ky(), Ko = {}, kl = { exports: {} }, ct = {}, jl = { exports: {} }, Nl = {};
var Af;
function qy() {
  return Af || (Af = 1, (function(t) {
    function r(L, K) {
      var D = L.length;
      L.push(K);
      e: for (; 0 < D; ) {
        var E = D - 1 >>> 1, B = L[E];
        if (0 < c(B, K)) L[E] = K, L[D] = B, D = E;
        else break e;
      }
    }
    function o(L) {
      return L.length === 0 ? null : L[0];
    }
    function l(L) {
      if (L.length === 0) return null;
      var K = L[0], D = L.pop();
      if (D !== K) {
        L[0] = D;
        e: for (var E = 0, B = L.length, ce = B >>> 1; E < ce; ) {
          var le = 2 * (E + 1) - 1, pe = L[le], ve = le + 1, me = L[ve];
          if (0 > c(pe, D)) ve < B && 0 > c(me, pe) ? (L[E] = me, L[ve] = D, E = ve) : (L[E] = pe, L[le] = D, E = le);
          else if (ve < B && 0 > c(me, D)) L[E] = me, L[ve] = D, E = ve;
          else break e;
        }
      }
      return K;
    }
    function c(L, K) {
      var D = L.sortIndex - K.sortIndex;
      return D !== 0 ? D : L.id - K.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, h = f.now();
      t.unstable_now = function() {
        return f.now() - h;
      };
    }
    var m = [], y = [], g = 1, v = null, w = 3, S = !1, P = !1, k = !1, j = typeof setTimeout == "function" ? setTimeout : null, A = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function C(L) {
      for (var K = o(y); K !== null; ) {
        if (K.callback === null) l(y);
        else if (K.startTime <= L) l(y), K.sortIndex = K.expirationTime, r(m, K);
        else break;
        K = o(y);
      }
    }
    function F(L) {
      if (k = !1, C(L), !P) if (o(m) !== null) P = !0, fe(U);
      else {
        var K = o(y);
        K !== null && M(F, K.startTime - L);
      }
    }
    function U(L, K) {
      P = !1, k && (k = !1, A(X), X = -1), S = !0;
      var D = w;
      try {
        for (C(K), v = o(m); v !== null && (!(v.expirationTime > K) || L && !ie()); ) {
          var E = v.callback;
          if (typeof E == "function") {
            v.callback = null, w = v.priorityLevel;
            var B = E(v.expirationTime <= K);
            K = t.unstable_now(), typeof B == "function" ? v.callback = B : v === o(m) && l(m), C(K);
          } else l(m);
          v = o(m);
        }
        if (v !== null) var ce = !0;
        else {
          var le = o(y);
          le !== null && M(F, le.startTime - K), ce = !1;
        }
        return ce;
      } finally {
        v = null, w = D, S = !1;
      }
    }
    var H = !1, Y = null, X = -1, se = 5, ne = -1;
    function ie() {
      return !(t.unstable_now() - ne < se);
    }
    function Q() {
      if (Y !== null) {
        var L = t.unstable_now();
        ne = L;
        var K = !0;
        try {
          K = Y(!0, L);
        } finally {
          K ? z() : (H = !1, Y = null);
        }
      } else H = !1;
    }
    var z;
    if (typeof _ == "function") z = function() {
      _(Q);
    };
    else if (typeof MessageChannel < "u") {
      var Z = new MessageChannel(), ge = Z.port2;
      Z.port1.onmessage = Q, z = function() {
        ge.postMessage(null);
      };
    } else z = function() {
      j(Q, 0);
    };
    function fe(L) {
      Y = L, H || (H = !0, z());
    }
    function M(L, K) {
      X = j(function() {
        L(t.unstable_now());
      }, K);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, t.unstable_continueExecution = function() {
      P || S || (P = !0, fe(U));
    }, t.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : se = 0 < L ? Math.floor(1e3 / L) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_getFirstCallbackNode = function() {
      return o(m);
    }, t.unstable_next = function(L) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var K = 3;
          break;
        default:
          K = w;
      }
      var D = w;
      w = K;
      try {
        return L();
      } finally {
        w = D;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(L, K) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var D = w;
      w = L;
      try {
        return K();
      } finally {
        w = D;
      }
    }, t.unstable_scheduleCallback = function(L, K, D) {
      var E = t.unstable_now();
      switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? E + D : E) : D = E, L) {
        case 1:
          var B = -1;
          break;
        case 2:
          B = 250;
          break;
        case 5:
          B = 1073741823;
          break;
        case 4:
          B = 1e4;
          break;
        default:
          B = 5e3;
      }
      return B = D + B, L = { id: g++, callback: K, priorityLevel: L, startTime: D, expirationTime: B, sortIndex: -1 }, D > E ? (L.sortIndex = D, r(y, L), o(m) === null && L === o(y) && (k ? (A(X), X = -1) : k = !0, M(F, D - E))) : (L.sortIndex = B, r(m, L), P || S || (P = !0, fe(U))), L;
    }, t.unstable_shouldYield = ie, t.unstable_wrapCallback = function(L) {
      var K = w;
      return function() {
        var D = w;
        w = K;
        try {
          return L.apply(this, arguments);
        } finally {
          w = D;
        }
      };
    };
  })(Nl)), Nl;
}
var Lf;
function Xy() {
  return Lf || (Lf = 1, jl.exports = qy()), jl.exports;
}
var Of;
function Zy() {
  if (Of) return ct;
  Of = 1;
  var t = gi(), r = Xy();
  function o(e) {
    for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, s = 1; s < arguments.length; s++) n += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var l = /* @__PURE__ */ new Set(), c = {};
  function u(e, n) {
    f(e, n), f(e + "Capture", n);
  }
  function f(e, n) {
    for (c[e] = n, e = 0; e < n.length; e++) l.add(n[e]);
  }
  var h = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, y = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, v = {};
  function w(e) {
    return m.call(v, e) ? !0 : m.call(g, e) ? !1 : y.test(e) ? v[e] = !0 : (g[e] = !0, !1);
  }
  function S(e, n, s, a) {
    if (s !== null && s.type === 0) return !1;
    switch (typeof n) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return a ? !1 : s !== null ? !s.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function P(e, n, s, a) {
    if (n === null || typeof n > "u" || S(e, n, s, a)) return !0;
    if (a) return !1;
    if (s !== null) switch (s.type) {
      case 3:
        return !n;
      case 4:
        return n === !1;
      case 5:
        return isNaN(n);
      case 6:
        return isNaN(n) || 1 > n;
    }
    return !1;
  }
  function k(e, n, s, a, d, p, x) {
    this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = a, this.attributeNamespace = d, this.mustUseProperty = s, this.propertyName = e, this.type = n, this.sanitizeURL = p, this.removeEmptyString = x;
  }
  var j = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    j[e] = new k(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var n = e[0];
    j[n] = new k(n, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    j[e] = new k(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    j[e] = new k(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    j[e] = new k(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    j[e] = new k(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    j[e] = new k(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    j[e] = new k(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    j[e] = new k(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var A = /[\-:]([a-z])/g;
  function _(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var n = e.replace(
      A,
      _
    );
    j[n] = new k(n, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var n = e.replace(A, _);
    j[n] = new k(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var n = e.replace(A, _);
    j[n] = new k(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    j[e] = new k(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), j.xlinkHref = new k("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    j[e] = new k(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function C(e, n, s, a) {
    var d = j.hasOwnProperty(n) ? j[n] : null;
    (d !== null ? d.type !== 0 : a || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (P(n, s, d, a) && (s = null), a || d === null ? w(n) && (s === null ? e.removeAttribute(n) : e.setAttribute(n, "" + s)) : d.mustUseProperty ? e[d.propertyName] = s === null ? d.type === 3 ? !1 : "" : s : (n = d.attributeName, a = d.attributeNamespace, s === null ? e.removeAttribute(n) : (d = d.type, s = d === 3 || d === 4 && s === !0 ? "" : "" + s, a ? e.setAttributeNS(a, n, s) : e.setAttribute(n, s))));
  }
  var F = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, U = /* @__PURE__ */ Symbol.for("react.element"), H = /* @__PURE__ */ Symbol.for("react.portal"), Y = /* @__PURE__ */ Symbol.for("react.fragment"), X = /* @__PURE__ */ Symbol.for("react.strict_mode"), se = /* @__PURE__ */ Symbol.for("react.profiler"), ne = /* @__PURE__ */ Symbol.for("react.provider"), ie = /* @__PURE__ */ Symbol.for("react.context"), Q = /* @__PURE__ */ Symbol.for("react.forward_ref"), z = /* @__PURE__ */ Symbol.for("react.suspense"), Z = /* @__PURE__ */ Symbol.for("react.suspense_list"), ge = /* @__PURE__ */ Symbol.for("react.memo"), fe = /* @__PURE__ */ Symbol.for("react.lazy"), M = /* @__PURE__ */ Symbol.for("react.offscreen"), L = Symbol.iterator;
  function K(e) {
    return e === null || typeof e != "object" ? null : (e = L && e[L] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var D = Object.assign, E;
  function B(e) {
    if (E === void 0) try {
      throw Error();
    } catch (s) {
      var n = s.stack.trim().match(/\n( *(at )?)/);
      E = n && n[1] || "";
    }
    return `
` + E + e;
  }
  var ce = !1;
  function le(e, n) {
    if (!e || ce) return "";
    ce = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (n) if (n = function() {
        throw Error();
      }, Object.defineProperty(n.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(n, []);
        } catch ($) {
          var a = $;
        }
        Reflect.construct(e, [], n);
      } else {
        try {
          n.call();
        } catch ($) {
          a = $;
        }
        e.call(n.prototype);
      }
      else {
        try {
          throw Error();
        } catch ($) {
          a = $;
        }
        e();
      }
    } catch ($) {
      if ($ && a && typeof $.stack == "string") {
        for (var d = $.stack.split(`
`), p = a.stack.split(`
`), x = d.length - 1, N = p.length - 1; 1 <= x && 0 <= N && d[x] !== p[N]; ) N--;
        for (; 1 <= x && 0 <= N; x--, N--) if (d[x] !== p[N]) {
          if (x !== 1 || N !== 1)
            do
              if (x--, N--, 0 > N || d[x] !== p[N]) {
                var R = `
` + d[x].replace(" at new ", " at ");
                return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), R;
              }
            while (1 <= x && 0 <= N);
          break;
        }
      }
    } finally {
      ce = !1, Error.prepareStackTrace = s;
    }
    return (e = e ? e.displayName || e.name : "") ? B(e) : "";
  }
  function pe(e) {
    switch (e.tag) {
      case 5:
        return B(e.type);
      case 16:
        return B("Lazy");
      case 13:
        return B("Suspense");
      case 19:
        return B("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = le(e.type, !1), e;
      case 11:
        return e = le(e.type.render, !1), e;
      case 1:
        return e = le(e.type, !0), e;
      default:
        return "";
    }
  }
  function ve(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Y:
        return "Fragment";
      case H:
        return "Portal";
      case se:
        return "Profiler";
      case X:
        return "StrictMode";
      case z:
        return "Suspense";
      case Z:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case ie:
        return (e.displayName || "Context") + ".Consumer";
      case ne:
        return (e._context.displayName || "Context") + ".Provider";
      case Q:
        var n = e.render;
        return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ge:
        return n = e.displayName || null, n !== null ? n : ve(e.type) || "Memo";
      case fe:
        n = e._payload, e = e._init;
        try {
          return ve(e(n));
        } catch {
        }
    }
    return null;
  }
  function me(e) {
    var n = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (n.displayName || "Context") + ".Consumer";
      case 10:
        return (n._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = n.render, e = e.displayName || e.name || "", n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return n;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ve(n);
      case 8:
        return n === X ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof n == "function") return n.displayName || n.name || null;
        if (typeof n == "string") return n;
    }
    return null;
  }
  function je(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function _e(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function tt(e) {
    var n = _e(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), a = "" + e[n];
    if (!e.hasOwnProperty(n) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var d = s.get, p = s.set;
      return Object.defineProperty(e, n, { configurable: !0, get: function() {
        return d.call(this);
      }, set: function(x) {
        a = "" + x, p.call(this, x);
      } }), Object.defineProperty(e, n, { enumerable: s.enumerable }), { getValue: function() {
        return a;
      }, setValue: function(x) {
        a = "" + x;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[n];
      } };
    }
  }
  function tr(e) {
    e._valueTracker || (e._valueTracker = tt(e));
  }
  function Ds(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var s = n.getValue(), a = "";
    return e && (a = _e(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== s ? (n.setValue(e), !0) : !1;
  }
  function Qt(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Ci(e, n) {
    var s = n.checked;
    return D({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function Oc(e, n) {
    var s = n.defaultValue == null ? "" : n.defaultValue, a = n.checked != null ? n.checked : n.defaultChecked;
    s = je(n.value != null ? n.value : s), e._wrapperState = { initialChecked: a, initialValue: s, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
  }
  function Mc(e, n) {
    n = n.checked, n != null && C(e, "checked", n, !1);
  }
  function Pi(e, n) {
    Mc(e, n);
    var s = je(n.value), a = n.type;
    if (s != null) a === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (a === "submit" || a === "reset") {
      e.removeAttribute("value");
      return;
    }
    n.hasOwnProperty("value") ? Ei(e, n.type, s) : n.hasOwnProperty("defaultValue") && Ei(e, n.type, je(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
  }
  function Ic(e, n, s) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var a = n.type;
      if (!(a !== "submit" && a !== "reset" || n.value !== void 0 && n.value !== null)) return;
      n = "" + e._wrapperState.initialValue, s || n === e.value || (e.value = n), e.defaultValue = n;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function Ei(e, n, s) {
    (n !== "number" || Qt(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var $r = Array.isArray;
  function nr(e, n, s, a) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < s.length; d++) n["$" + s[d]] = !0;
      for (s = 0; s < e.length; s++) d = n.hasOwnProperty("$" + e[s].value), e[s].selected !== d && (e[s].selected = d), d && a && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + je(s), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === s) {
          e[d].selected = !0, a && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Ri(e, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(o(91));
    return D({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function $c(e, n) {
    var s = n.value;
    if (s == null) {
      if (s = n.children, n = n.defaultValue, s != null) {
        if (n != null) throw Error(o(92));
        if ($r(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        n = s;
      }
      n == null && (n = ""), s = n;
    }
    e._wrapperState = { initialValue: je(s) };
  }
  function Fc(e, n) {
    var s = je(n.value), a = je(n.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), n.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), a != null && (e.defaultValue = "" + a);
  }
  function Dc(e) {
    var n = e.textContent;
    n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
  }
  function Bc(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ti(e, n) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Bc(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Bs, zc = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, s, a, d) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(n, s, a, d);
      });
    } : e;
  })(function(e, n) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
    else {
      for (Bs = Bs || document.createElement("div"), Bs.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = Bs.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; n.firstChild; ) e.appendChild(n.firstChild);
    }
  });
  function Fr(e, n) {
    if (n) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Dr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Km = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Dr).forEach(function(e) {
    Km.forEach(function(n) {
      n = n + e.charAt(0).toUpperCase() + e.substring(1), Dr[n] = Dr[e];
    });
  });
  function Uc(e, n, s) {
    return n == null || typeof n == "boolean" || n === "" ? "" : s || typeof n != "number" || n === 0 || Dr.hasOwnProperty(e) && Dr[e] ? ("" + n).trim() : n + "px";
  }
  function Wc(e, n) {
    e = e.style;
    for (var s in n) if (n.hasOwnProperty(s)) {
      var a = s.indexOf("--") === 0, d = Uc(s, n[s], a);
      s === "float" && (s = "cssFloat"), a ? e.setProperty(s, d) : e[s] = d;
    }
  }
  var qm = D({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Ai(e, n) {
    if (n) {
      if (qm[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(o(137, e));
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(o(60));
        if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(o(61));
      }
      if (n.style != null && typeof n.style != "object") throw Error(o(62));
    }
  }
  function Li(e, n) {
    if (e.indexOf("-") === -1) return typeof n.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Oi = null;
  function Mi(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ii = null, rr = null, sr = null;
  function Hc(e) {
    if (e = as(e)) {
      if (typeof Ii != "function") throw Error(o(280));
      var n = e.stateNode;
      n && (n = co(n), Ii(e.stateNode, e.type, n));
    }
  }
  function Vc(e) {
    rr ? sr ? sr.push(e) : sr = [e] : rr = e;
  }
  function Yc() {
    if (rr) {
      var e = rr, n = sr;
      if (sr = rr = null, Hc(e), n) for (e = 0; e < n.length; e++) Hc(n[e]);
    }
  }
  function Gc(e, n) {
    return e(n);
  }
  function Qc() {
  }
  var $i = !1;
  function Kc(e, n, s) {
    if ($i) return e(n, s);
    $i = !0;
    try {
      return Gc(e, n, s);
    } finally {
      $i = !1, (rr !== null || sr !== null) && (Qc(), Yc());
    }
  }
  function Br(e, n) {
    var s = e.stateNode;
    if (s === null) return null;
    var a = co(s);
    if (a === null) return null;
    s = a[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (s && typeof s != "function") throw Error(o(231, n, typeof s));
    return s;
  }
  var Fi = !1;
  if (h) try {
    var zr = {};
    Object.defineProperty(zr, "passive", { get: function() {
      Fi = !0;
    } }), window.addEventListener("test", zr, zr), window.removeEventListener("test", zr, zr);
  } catch {
    Fi = !1;
  }
  function Xm(e, n, s, a, d, p, x, N, R) {
    var $ = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(s, $);
    } catch (V) {
      this.onError(V);
    }
  }
  var Ur = !1, zs = null, Us = !1, Di = null, Zm = { onError: function(e) {
    Ur = !0, zs = e;
  } };
  function Jm(e, n, s, a, d, p, x, N, R) {
    Ur = !1, zs = null, Xm.apply(Zm, arguments);
  }
  function eg(e, n, s, a, d, p, x, N, R) {
    if (Jm.apply(this, arguments), Ur) {
      if (Ur) {
        var $ = zs;
        Ur = !1, zs = null;
      } else throw Error(o(198));
      Us || (Us = !0, Di = $);
    }
  }
  function Mn(e) {
    var n = e, s = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (s = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? s : null;
  }
  function qc(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function Xc(e) {
    if (Mn(e) !== e) throw Error(o(188));
  }
  function tg(e) {
    var n = e.alternate;
    if (!n) {
      if (n = Mn(e), n === null) throw Error(o(188));
      return n !== e ? null : e;
    }
    for (var s = e, a = n; ; ) {
      var d = s.return;
      if (d === null) break;
      var p = d.alternate;
      if (p === null) {
        if (a = d.return, a !== null) {
          s = a;
          continue;
        }
        break;
      }
      if (d.child === p.child) {
        for (p = d.child; p; ) {
          if (p === s) return Xc(d), e;
          if (p === a) return Xc(d), n;
          p = p.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== a.return) s = d, a = p;
      else {
        for (var x = !1, N = d.child; N; ) {
          if (N === s) {
            x = !0, s = d, a = p;
            break;
          }
          if (N === a) {
            x = !0, a = d, s = p;
            break;
          }
          N = N.sibling;
        }
        if (!x) {
          for (N = p.child; N; ) {
            if (N === s) {
              x = !0, s = p, a = d;
              break;
            }
            if (N === a) {
              x = !0, a = p, s = d;
              break;
            }
            N = N.sibling;
          }
          if (!x) throw Error(o(189));
        }
      }
      if (s.alternate !== a) throw Error(o(190));
    }
    if (s.tag !== 3) throw Error(o(188));
    return s.stateNode.current === s ? e : n;
  }
  function Zc(e) {
    return e = tg(e), e !== null ? Jc(e) : null;
  }
  function Jc(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var n = Jc(e);
      if (n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var eu = r.unstable_scheduleCallback, tu = r.unstable_cancelCallback, ng = r.unstable_shouldYield, rg = r.unstable_requestPaint, Ie = r.unstable_now, sg = r.unstable_getCurrentPriorityLevel, Bi = r.unstable_ImmediatePriority, nu = r.unstable_UserBlockingPriority, Ws = r.unstable_NormalPriority, og = r.unstable_LowPriority, ru = r.unstable_IdlePriority, Hs = null, Dt = null;
  function ig(e) {
    if (Dt && typeof Dt.onCommitFiberRoot == "function") try {
      Dt.onCommitFiberRoot(Hs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Pt = Math.clz32 ? Math.clz32 : cg, ag = Math.log, lg = Math.LN2;
  function cg(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ag(e) / lg | 0) | 0;
  }
  var Vs = 64, Ys = 4194304;
  function Wr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Gs(e, n) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var a = 0, d = e.suspendedLanes, p = e.pingedLanes, x = s & 268435455;
    if (x !== 0) {
      var N = x & ~d;
      N !== 0 ? a = Wr(N) : (p &= x, p !== 0 && (a = Wr(p)));
    } else x = s & ~d, x !== 0 ? a = Wr(x) : p !== 0 && (a = Wr(p));
    if (a === 0) return 0;
    if (n !== 0 && n !== a && (n & d) === 0 && (d = a & -a, p = n & -n, d >= p || d === 16 && (p & 4194240) !== 0)) return n;
    if ((a & 4) !== 0 && (a |= s & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= a; 0 < n; ) s = 31 - Pt(n), d = 1 << s, a |= e[s], n &= ~d;
    return a;
  }
  function ug(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return n + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function dg(e, n) {
    for (var s = e.suspendedLanes, a = e.pingedLanes, d = e.expirationTimes, p = e.pendingLanes; 0 < p; ) {
      var x = 31 - Pt(p), N = 1 << x, R = d[x];
      R === -1 ? ((N & s) === 0 || (N & a) !== 0) && (d[x] = ug(N, n)) : R <= n && (e.expiredLanes |= N), p &= ~N;
    }
  }
  function zi(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function su() {
    var e = Vs;
    return Vs <<= 1, (Vs & 4194240) === 0 && (Vs = 64), e;
  }
  function Ui(e) {
    for (var n = [], s = 0; 31 > s; s++) n.push(e);
    return n;
  }
  function Hr(e, n, s) {
    e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - Pt(n), e[n] = s;
  }
  function fg(e, n) {
    var s = e.pendingLanes & ~n;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
    var a = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var d = 31 - Pt(s), p = 1 << d;
      n[d] = 0, a[d] = -1, e[d] = -1, s &= ~p;
    }
  }
  function Wi(e, n) {
    var s = e.entangledLanes |= n;
    for (e = e.entanglements; s; ) {
      var a = 31 - Pt(s), d = 1 << a;
      d & n | e[a] & n && (e[a] |= n), s &= ~d;
    }
  }
  var Se = 0;
  function ou(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var iu, Hi, au, lu, cu, Vi = !1, Qs = [], ln = null, cn = null, un = null, Vr = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map(), dn = [], pg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function uu(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        ln = null;
        break;
      case "dragenter":
      case "dragleave":
        cn = null;
        break;
      case "mouseover":
      case "mouseout":
        un = null;
        break;
      case "pointerover":
      case "pointerout":
        Vr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Yr.delete(n.pointerId);
    }
  }
  function Gr(e, n, s, a, d, p) {
    return e === null || e.nativeEvent !== p ? (e = { blockedOn: n, domEventName: s, eventSystemFlags: a, nativeEvent: p, targetContainers: [d] }, n !== null && (n = as(n), n !== null && Hi(n)), e) : (e.eventSystemFlags |= a, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function hg(e, n, s, a, d) {
    switch (n) {
      case "focusin":
        return ln = Gr(ln, e, n, s, a, d), !0;
      case "dragenter":
        return cn = Gr(cn, e, n, s, a, d), !0;
      case "mouseover":
        return un = Gr(un, e, n, s, a, d), !0;
      case "pointerover":
        var p = d.pointerId;
        return Vr.set(p, Gr(Vr.get(p) || null, e, n, s, a, d)), !0;
      case "gotpointercapture":
        return p = d.pointerId, Yr.set(p, Gr(Yr.get(p) || null, e, n, s, a, d)), !0;
    }
    return !1;
  }
  function du(e) {
    var n = In(e.target);
    if (n !== null) {
      var s = Mn(n);
      if (s !== null) {
        if (n = s.tag, n === 13) {
          if (n = qc(s), n !== null) {
            e.blockedOn = n, cu(e.priority, function() {
              au(s);
            });
            return;
          }
        } else if (n === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ks(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var s = Gi(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var a = new s.constructor(s.type, s);
        Oi = a, s.target.dispatchEvent(a), Oi = null;
      } else return n = as(s), n !== null && Hi(n), e.blockedOn = s, !1;
      n.shift();
    }
    return !0;
  }
  function fu(e, n, s) {
    Ks(e) && s.delete(n);
  }
  function mg() {
    Vi = !1, ln !== null && Ks(ln) && (ln = null), cn !== null && Ks(cn) && (cn = null), un !== null && Ks(un) && (un = null), Vr.forEach(fu), Yr.forEach(fu);
  }
  function Qr(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Vi || (Vi = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, mg)));
  }
  function Kr(e) {
    function n(d) {
      return Qr(d, e);
    }
    if (0 < Qs.length) {
      Qr(Qs[0], e);
      for (var s = 1; s < Qs.length; s++) {
        var a = Qs[s];
        a.blockedOn === e && (a.blockedOn = null);
      }
    }
    for (ln !== null && Qr(ln, e), cn !== null && Qr(cn, e), un !== null && Qr(un, e), Vr.forEach(n), Yr.forEach(n), s = 0; s < dn.length; s++) a = dn[s], a.blockedOn === e && (a.blockedOn = null);
    for (; 0 < dn.length && (s = dn[0], s.blockedOn === null); ) du(s), s.blockedOn === null && dn.shift();
  }
  var or = F.ReactCurrentBatchConfig, qs = !0;
  function gg(e, n, s, a) {
    var d = Se, p = or.transition;
    or.transition = null;
    try {
      Se = 1, Yi(e, n, s, a);
    } finally {
      Se = d, or.transition = p;
    }
  }
  function yg(e, n, s, a) {
    var d = Se, p = or.transition;
    or.transition = null;
    try {
      Se = 4, Yi(e, n, s, a);
    } finally {
      Se = d, or.transition = p;
    }
  }
  function Yi(e, n, s, a) {
    if (qs) {
      var d = Gi(e, n, s, a);
      if (d === null) ua(e, n, a, Xs, s), uu(e, a);
      else if (hg(d, e, n, s, a)) a.stopPropagation();
      else if (uu(e, a), n & 4 && -1 < pg.indexOf(e)) {
        for (; d !== null; ) {
          var p = as(d);
          if (p !== null && iu(p), p = Gi(e, n, s, a), p === null && ua(e, n, a, Xs, s), p === d) break;
          d = p;
        }
        d !== null && a.stopPropagation();
      } else ua(e, n, a, null, s);
    }
  }
  var Xs = null;
  function Gi(e, n, s, a) {
    if (Xs = null, e = Mi(a), e = In(e), e !== null) if (n = Mn(e), n === null) e = null;
    else if (s = n.tag, s === 13) {
      if (e = qc(n), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
      e = null;
    } else n !== e && (e = null);
    return Xs = e, null;
  }
  function pu(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (sg()) {
          case Bi:
            return 1;
          case nu:
            return 4;
          case Ws:
          case og:
            return 16;
          case ru:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var fn = null, Qi = null, Zs = null;
  function hu() {
    if (Zs) return Zs;
    var e, n = Qi, s = n.length, a, d = "value" in fn ? fn.value : fn.textContent, p = d.length;
    for (e = 0; e < s && n[e] === d[e]; e++) ;
    var x = s - e;
    for (a = 1; a <= x && n[s - a] === d[p - a]; a++) ;
    return Zs = d.slice(e, 1 < a ? 1 - a : void 0);
  }
  function Js(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function eo() {
    return !0;
  }
  function mu() {
    return !1;
  }
  function ft(e) {
    function n(s, a, d, p, x) {
      this._reactName = s, this._targetInst = d, this.type = a, this.nativeEvent = p, this.target = x, this.currentTarget = null;
      for (var N in e) e.hasOwnProperty(N) && (s = e[N], this[N] = s ? s(p) : p[N]);
      return this.isDefaultPrevented = (p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1) ? eo : mu, this.isPropagationStopped = mu, this;
    }
    return D(n.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = eo);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = eo);
    }, persist: function() {
    }, isPersistent: eo }), n;
  }
  var ir = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ki = ft(ir), qr = D({}, ir, { view: 0, detail: 0 }), xg = ft(qr), qi, Xi, Xr, to = D({}, qr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ji, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Xr && (Xr && e.type === "mousemove" ? (qi = e.screenX - Xr.screenX, Xi = e.screenY - Xr.screenY) : Xi = qi = 0, Xr = e), qi);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Xi;
  } }), gu = ft(to), vg = D({}, to, { dataTransfer: 0 }), wg = ft(vg), bg = D({}, qr, { relatedTarget: 0 }), Zi = ft(bg), kg = D({}, ir, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), jg = ft(kg), Ng = D({}, ir, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Sg = ft(Ng), _g = D({}, ir, { data: 0 }), yu = ft(_g), Cg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Pg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Eg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Rg(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Eg[e]) ? !!n[e] : !1;
  }
  function Ji() {
    return Rg;
  }
  var Tg = D({}, qr, { key: function(e) {
    if (e.key) {
      var n = Cg[e.key] || e.key;
      if (n !== "Unidentified") return n;
    }
    return e.type === "keypress" ? (e = Js(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pg[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ji, charCode: function(e) {
    return e.type === "keypress" ? Js(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Js(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Ag = ft(Tg), Lg = D({}, to, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), xu = ft(Lg), Og = D({}, qr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ji }), Mg = ft(Og), Ig = D({}, ir, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), $g = ft(Ig), Fg = D({}, to, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Dg = ft(Fg), Bg = [9, 13, 27, 32], ea = h && "CompositionEvent" in window, Zr = null;
  h && "documentMode" in document && (Zr = document.documentMode);
  var zg = h && "TextEvent" in window && !Zr, vu = h && (!ea || Zr && 8 < Zr && 11 >= Zr), wu = " ", bu = !1;
  function ku(e, n) {
    switch (e) {
      case "keyup":
        return Bg.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ju(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ar = !1;
  function Ug(e, n) {
    switch (e) {
      case "compositionend":
        return ju(n);
      case "keypress":
        return n.which !== 32 ? null : (bu = !0, wu);
      case "textInput":
        return e = n.data, e === wu && bu ? null : e;
      default:
        return null;
    }
  }
  function Wg(e, n) {
    if (ar) return e === "compositionend" || !ea && ku(e, n) ? (e = hu(), Zs = Qi = fn = null, ar = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return vu && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Hg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Nu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Hg[e.type] : n === "textarea";
  }
  function Su(e, n, s, a) {
    Vc(a), n = io(n, "onChange"), 0 < n.length && (s = new Ki("onChange", "change", null, s, a), e.push({ event: s, listeners: n }));
  }
  var Jr = null, es = null;
  function Vg(e) {
    Wu(e, 0);
  }
  function no(e) {
    var n = fr(e);
    if (Ds(n)) return e;
  }
  function Yg(e, n) {
    if (e === "change") return n;
  }
  var _u = !1;
  if (h) {
    var ta;
    if (h) {
      var na = "oninput" in document;
      if (!na) {
        var Cu = document.createElement("div");
        Cu.setAttribute("oninput", "return;"), na = typeof Cu.oninput == "function";
      }
      ta = na;
    } else ta = !1;
    _u = ta && (!document.documentMode || 9 < document.documentMode);
  }
  function Pu() {
    Jr && (Jr.detachEvent("onpropertychange", Eu), es = Jr = null);
  }
  function Eu(e) {
    if (e.propertyName === "value" && no(es)) {
      var n = [];
      Su(n, es, e, Mi(e)), Kc(Vg, n);
    }
  }
  function Gg(e, n, s) {
    e === "focusin" ? (Pu(), Jr = n, es = s, Jr.attachEvent("onpropertychange", Eu)) : e === "focusout" && Pu();
  }
  function Qg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return no(es);
  }
  function Kg(e, n) {
    if (e === "click") return no(n);
  }
  function qg(e, n) {
    if (e === "input" || e === "change") return no(n);
  }
  function Xg(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Et = typeof Object.is == "function" ? Object.is : Xg;
  function ts(e, n) {
    if (Et(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
    var s = Object.keys(e), a = Object.keys(n);
    if (s.length !== a.length) return !1;
    for (a = 0; a < s.length; a++) {
      var d = s[a];
      if (!m.call(n, d) || !Et(e[d], n[d])) return !1;
    }
    return !0;
  }
  function Ru(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Tu(e, n) {
    var s = Ru(e);
    e = 0;
    for (var a; s; ) {
      if (s.nodeType === 3) {
        if (a = e + s.textContent.length, e <= n && a >= n) return { node: s, offset: n - e };
        e = a;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = Ru(s);
    }
  }
  function Au(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Au(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Lu() {
    for (var e = window, n = Qt(); n instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof n.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = n.contentWindow;
      else break;
      n = Qt(e.document);
    }
    return n;
  }
  function ra(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  function Zg(e) {
    var n = Lu(), s = e.focusedElem, a = e.selectionRange;
    if (n !== s && s && s.ownerDocument && Au(s.ownerDocument.documentElement, s)) {
      if (a !== null && ra(s)) {
        if (n = a.start, e = a.end, e === void 0 && (e = n), "selectionStart" in s) s.selectionStart = n, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (n = s.ownerDocument || document) && n.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var d = s.textContent.length, p = Math.min(a.start, d);
          a = a.end === void 0 ? p : Math.min(a.end, d), !e.extend && p > a && (d = a, a = p, p = d), d = Tu(s, p);
          var x = Tu(
            s,
            a
          );
          d && x && (e.rangeCount !== 1 || e.anchorNode !== d.node || e.anchorOffset !== d.offset || e.focusNode !== x.node || e.focusOffset !== x.offset) && (n = n.createRange(), n.setStart(d.node, d.offset), e.removeAllRanges(), p > a ? (e.addRange(n), e.extend(x.node, x.offset)) : (n.setEnd(x.node, x.offset), e.addRange(n)));
        }
      }
      for (n = [], e = s; e = e.parentNode; ) e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof s.focus == "function" && s.focus(), s = 0; s < n.length; s++) e = n[s], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Jg = h && "documentMode" in document && 11 >= document.documentMode, lr = null, sa = null, ns = null, oa = !1;
  function Ou(e, n, s) {
    var a = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    oa || lr == null || lr !== Qt(a) || (a = lr, "selectionStart" in a && ra(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), ns && ts(ns, a) || (ns = a, a = io(sa, "onSelect"), 0 < a.length && (n = new Ki("onSelect", "select", null, n, s), e.push({ event: n, listeners: a }), n.target = lr)));
  }
  function ro(e, n) {
    var s = {};
    return s[e.toLowerCase()] = n.toLowerCase(), s["Webkit" + e] = "webkit" + n, s["Moz" + e] = "moz" + n, s;
  }
  var cr = { animationend: ro("Animation", "AnimationEnd"), animationiteration: ro("Animation", "AnimationIteration"), animationstart: ro("Animation", "AnimationStart"), transitionend: ro("Transition", "TransitionEnd") }, ia = {}, Mu = {};
  h && (Mu = document.createElement("div").style, "AnimationEvent" in window || (delete cr.animationend.animation, delete cr.animationiteration.animation, delete cr.animationstart.animation), "TransitionEvent" in window || delete cr.transitionend.transition);
  function so(e) {
    if (ia[e]) return ia[e];
    if (!cr[e]) return e;
    var n = cr[e], s;
    for (s in n) if (n.hasOwnProperty(s) && s in Mu) return ia[e] = n[s];
    return e;
  }
  var Iu = so("animationend"), $u = so("animationiteration"), Fu = so("animationstart"), Du = so("transitionend"), Bu = /* @__PURE__ */ new Map(), zu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function pn(e, n) {
    Bu.set(e, n), u(n, [e]);
  }
  for (var aa = 0; aa < zu.length; aa++) {
    var la = zu[aa], ey = la.toLowerCase(), ty = la[0].toUpperCase() + la.slice(1);
    pn(ey, "on" + ty);
  }
  pn(Iu, "onAnimationEnd"), pn($u, "onAnimationIteration"), pn(Fu, "onAnimationStart"), pn("dblclick", "onDoubleClick"), pn("focusin", "onFocus"), pn("focusout", "onBlur"), pn(Du, "onTransitionEnd"), f("onMouseEnter", ["mouseout", "mouseover"]), f("onMouseLeave", ["mouseout", "mouseover"]), f("onPointerEnter", ["pointerout", "pointerover"]), f("onPointerLeave", ["pointerout", "pointerover"]), u("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), u("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), u("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), u("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), u("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), u("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var rs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ny = new Set("cancel close invalid load scroll toggle".split(" ").concat(rs));
  function Uu(e, n, s) {
    var a = e.type || "unknown-event";
    e.currentTarget = s, eg(a, n, void 0, e), e.currentTarget = null;
  }
  function Wu(e, n) {
    n = (n & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var a = e[s], d = a.event;
      a = a.listeners;
      e: {
        var p = void 0;
        if (n) for (var x = a.length - 1; 0 <= x; x--) {
          var N = a[x], R = N.instance, $ = N.currentTarget;
          if (N = N.listener, R !== p && d.isPropagationStopped()) break e;
          Uu(d, N, $), p = R;
        }
        else for (x = 0; x < a.length; x++) {
          if (N = a[x], R = N.instance, $ = N.currentTarget, N = N.listener, R !== p && d.isPropagationStopped()) break e;
          Uu(d, N, $), p = R;
        }
      }
    }
    if (Us) throw e = Di, Us = !1, Di = null, e;
  }
  function Pe(e, n) {
    var s = n[ga];
    s === void 0 && (s = n[ga] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    s.has(a) || (Hu(n, e, 2, !1), s.add(a));
  }
  function ca(e, n, s) {
    var a = 0;
    n && (a |= 4), Hu(s, e, a, n);
  }
  var oo = "_reactListening" + Math.random().toString(36).slice(2);
  function ss(e) {
    if (!e[oo]) {
      e[oo] = !0, l.forEach(function(s) {
        s !== "selectionchange" && (ny.has(s) || ca(s, !1, e), ca(s, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[oo] || (n[oo] = !0, ca("selectionchange", !1, n));
    }
  }
  function Hu(e, n, s, a) {
    switch (pu(n)) {
      case 1:
        var d = gg;
        break;
      case 4:
        d = yg;
        break;
      default:
        d = Yi;
    }
    s = d.bind(null, n, s, e), d = void 0, !Fi || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), a ? d !== void 0 ? e.addEventListener(n, s, { capture: !0, passive: d }) : e.addEventListener(n, s, !0) : d !== void 0 ? e.addEventListener(n, s, { passive: d }) : e.addEventListener(n, s, !1);
  }
  function ua(e, n, s, a, d) {
    var p = a;
    if ((n & 1) === 0 && (n & 2) === 0 && a !== null) e: for (; ; ) {
      if (a === null) return;
      var x = a.tag;
      if (x === 3 || x === 4) {
        var N = a.stateNode.containerInfo;
        if (N === d || N.nodeType === 8 && N.parentNode === d) break;
        if (x === 4) for (x = a.return; x !== null; ) {
          var R = x.tag;
          if ((R === 3 || R === 4) && (R = x.stateNode.containerInfo, R === d || R.nodeType === 8 && R.parentNode === d)) return;
          x = x.return;
        }
        for (; N !== null; ) {
          if (x = In(N), x === null) return;
          if (R = x.tag, R === 5 || R === 6) {
            a = p = x;
            continue e;
          }
          N = N.parentNode;
        }
      }
      a = a.return;
    }
    Kc(function() {
      var $ = p, V = Mi(s), G = [];
      e: {
        var W = Bu.get(e);
        if (W !== void 0) {
          var ee = Ki, re = e;
          switch (e) {
            case "keypress":
              if (Js(s) === 0) break e;
            case "keydown":
            case "keyup":
              ee = Ag;
              break;
            case "focusin":
              re = "focus", ee = Zi;
              break;
            case "focusout":
              re = "blur", ee = Zi;
              break;
            case "beforeblur":
            case "afterblur":
              ee = Zi;
              break;
            case "click":
              if (s.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ee = gu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ee = wg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ee = Mg;
              break;
            case Iu:
            case $u:
            case Fu:
              ee = jg;
              break;
            case Du:
              ee = $g;
              break;
            case "scroll":
              ee = xg;
              break;
            case "wheel":
              ee = Dg;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = Sg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = xu;
          }
          var oe = (n & 4) !== 0, $e = !oe && e === "scroll", O = oe ? W !== null ? W + "Capture" : null : W;
          oe = [];
          for (var T = $, I; T !== null; ) {
            I = T;
            var q = I.stateNode;
            if (I.tag === 5 && q !== null && (I = q, O !== null && (q = Br(T, O), q != null && oe.push(os(T, q, I)))), $e) break;
            T = T.return;
          }
          0 < oe.length && (W = new ee(W, re, null, s, V), G.push({ event: W, listeners: oe }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (W = e === "mouseover" || e === "pointerover", ee = e === "mouseout" || e === "pointerout", W && s !== Oi && (re = s.relatedTarget || s.fromElement) && (In(re) || re[Kt])) break e;
          if ((ee || W) && (W = V.window === V ? V : (W = V.ownerDocument) ? W.defaultView || W.parentWindow : window, ee ? (re = s.relatedTarget || s.toElement, ee = $, re = re ? In(re) : null, re !== null && ($e = Mn(re), re !== $e || re.tag !== 5 && re.tag !== 6) && (re = null)) : (ee = null, re = $), ee !== re)) {
            if (oe = gu, q = "onMouseLeave", O = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (oe = xu, q = "onPointerLeave", O = "onPointerEnter", T = "pointer"), $e = ee == null ? W : fr(ee), I = re == null ? W : fr(re), W = new oe(q, T + "leave", ee, s, V), W.target = $e, W.relatedTarget = I, q = null, In(V) === $ && (oe = new oe(O, T + "enter", re, s, V), oe.target = I, oe.relatedTarget = $e, q = oe), $e = q, ee && re) t: {
              for (oe = ee, O = re, T = 0, I = oe; I; I = ur(I)) T++;
              for (I = 0, q = O; q; q = ur(q)) I++;
              for (; 0 < T - I; ) oe = ur(oe), T--;
              for (; 0 < I - T; ) O = ur(O), I--;
              for (; T--; ) {
                if (oe === O || O !== null && oe === O.alternate) break t;
                oe = ur(oe), O = ur(O);
              }
              oe = null;
            }
            else oe = null;
            ee !== null && Vu(G, W, ee, oe, !1), re !== null && $e !== null && Vu(G, $e, re, oe, !0);
          }
        }
        e: {
          if (W = $ ? fr($) : window, ee = W.nodeName && W.nodeName.toLowerCase(), ee === "select" || ee === "input" && W.type === "file") var ae = Yg;
          else if (Nu(W)) if (_u) ae = qg;
          else {
            ae = Qg;
            var ue = Gg;
          }
          else (ee = W.nodeName) && ee.toLowerCase() === "input" && (W.type === "checkbox" || W.type === "radio") && (ae = Kg);
          if (ae && (ae = ae(e, $))) {
            Su(G, ae, s, V);
            break e;
          }
          ue && ue(e, W, $), e === "focusout" && (ue = W._wrapperState) && ue.controlled && W.type === "number" && Ei(W, "number", W.value);
        }
        switch (ue = $ ? fr($) : window, e) {
          case "focusin":
            (Nu(ue) || ue.contentEditable === "true") && (lr = ue, sa = $, ns = null);
            break;
          case "focusout":
            ns = sa = lr = null;
            break;
          case "mousedown":
            oa = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            oa = !1, Ou(G, s, V);
            break;
          case "selectionchange":
            if (Jg) break;
          case "keydown":
          case "keyup":
            Ou(G, s, V);
        }
        var de;
        if (ea) e: {
          switch (e) {
            case "compositionstart":
              var he = "onCompositionStart";
              break e;
            case "compositionend":
              he = "onCompositionEnd";
              break e;
            case "compositionupdate":
              he = "onCompositionUpdate";
              break e;
          }
          he = void 0;
        }
        else ar ? ku(e, s) && (he = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (he = "onCompositionStart");
        he && (vu && s.locale !== "ko" && (ar || he !== "onCompositionStart" ? he === "onCompositionEnd" && ar && (de = hu()) : (fn = V, Qi = "value" in fn ? fn.value : fn.textContent, ar = !0)), ue = io($, he), 0 < ue.length && (he = new yu(he, e, null, s, V), G.push({ event: he, listeners: ue }), de ? he.data = de : (de = ju(s), de !== null && (he.data = de)))), (de = zg ? Ug(e, s) : Wg(e, s)) && ($ = io($, "onBeforeInput"), 0 < $.length && (V = new yu("onBeforeInput", "beforeinput", null, s, V), G.push({ event: V, listeners: $ }), V.data = de));
      }
      Wu(G, n);
    });
  }
  function os(e, n, s) {
    return { instance: e, listener: n, currentTarget: s };
  }
  function io(e, n) {
    for (var s = n + "Capture", a = []; e !== null; ) {
      var d = e, p = d.stateNode;
      d.tag === 5 && p !== null && (d = p, p = Br(e, s), p != null && a.unshift(os(e, p, d)), p = Br(e, n), p != null && a.push(os(e, p, d))), e = e.return;
    }
    return a;
  }
  function ur(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Vu(e, n, s, a, d) {
    for (var p = n._reactName, x = []; s !== null && s !== a; ) {
      var N = s, R = N.alternate, $ = N.stateNode;
      if (R !== null && R === a) break;
      N.tag === 5 && $ !== null && (N = $, d ? (R = Br(s, p), R != null && x.unshift(os(s, R, N))) : d || (R = Br(s, p), R != null && x.push(os(s, R, N)))), s = s.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var ry = /\r\n?/g, sy = /\u0000|\uFFFD/g;
  function Yu(e) {
    return (typeof e == "string" ? e : "" + e).replace(ry, `
`).replace(sy, "");
  }
  function ao(e, n, s) {
    if (n = Yu(n), Yu(e) !== n && s) throw Error(o(425));
  }
  function lo() {
  }
  var da = null, fa = null;
  function pa(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var ha = typeof setTimeout == "function" ? setTimeout : void 0, oy = typeof clearTimeout == "function" ? clearTimeout : void 0, Gu = typeof Promise == "function" ? Promise : void 0, iy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Gu < "u" ? function(e) {
    return Gu.resolve(null).then(e).catch(ay);
  } : ha;
  function ay(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ma(e, n) {
    var s = n, a = 0;
    do {
      var d = s.nextSibling;
      if (e.removeChild(s), d && d.nodeType === 8) if (s = d.data, s === "/$") {
        if (a === 0) {
          e.removeChild(d), Kr(n);
          return;
        }
        a--;
      } else s !== "$" && s !== "$?" && s !== "$!" || a++;
      s = d;
    } while (s);
    Kr(n);
  }
  function hn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = e.data, n === "$" || n === "$!" || n === "$?") break;
        if (n === "/$") return null;
      }
    }
    return e;
  }
  function Qu(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var s = e.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (n === 0) return e;
          n--;
        } else s === "/$" && n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var dr = Math.random().toString(36).slice(2), Bt = "__reactFiber$" + dr, is = "__reactProps$" + dr, Kt = "__reactContainer$" + dr, ga = "__reactEvents$" + dr, ly = "__reactListeners$" + dr, cy = "__reactHandles$" + dr;
  function In(e) {
    var n = e[Bt];
    if (n) return n;
    for (var s = e.parentNode; s; ) {
      if (n = s[Kt] || s[Bt]) {
        if (s = n.alternate, n.child !== null || s !== null && s.child !== null) for (e = Qu(e); e !== null; ) {
          if (s = e[Bt]) return s;
          e = Qu(e);
        }
        return n;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function as(e) {
    return e = e[Bt] || e[Kt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function fr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(o(33));
  }
  function co(e) {
    return e[is] || null;
  }
  var ya = [], pr = -1;
  function mn(e) {
    return { current: e };
  }
  function Ee(e) {
    0 > pr || (e.current = ya[pr], ya[pr] = null, pr--);
  }
  function Ce(e, n) {
    pr++, ya[pr] = e.current, e.current = n;
  }
  var gn = {}, Xe = mn(gn), st = mn(!1), $n = gn;
  function hr(e, n) {
    var s = e.type.contextTypes;
    if (!s) return gn;
    var a = e.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === n) return a.__reactInternalMemoizedMaskedChildContext;
    var d = {}, p;
    for (p in s) d[p] = n[p];
    return a && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = d), d;
  }
  function ot(e) {
    return e = e.childContextTypes, e != null;
  }
  function uo() {
    Ee(st), Ee(Xe);
  }
  function Ku(e, n, s) {
    if (Xe.current !== gn) throw Error(o(168));
    Ce(Xe, n), Ce(st, s);
  }
  function qu(e, n, s) {
    var a = e.stateNode;
    if (n = n.childContextTypes, typeof a.getChildContext != "function") return s;
    a = a.getChildContext();
    for (var d in a) if (!(d in n)) throw Error(o(108, me(e) || "Unknown", d));
    return D({}, s, a);
  }
  function fo(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gn, $n = Xe.current, Ce(Xe, e), Ce(st, st.current), !0;
  }
  function Xu(e, n, s) {
    var a = e.stateNode;
    if (!a) throw Error(o(169));
    s ? (e = qu(e, n, $n), a.__reactInternalMemoizedMergedChildContext = e, Ee(st), Ee(Xe), Ce(Xe, e)) : Ee(st), Ce(st, s);
  }
  var qt = null, po = !1, xa = !1;
  function Zu(e) {
    qt === null ? qt = [e] : qt.push(e);
  }
  function uy(e) {
    po = !0, Zu(e);
  }
  function yn() {
    if (!xa && qt !== null) {
      xa = !0;
      var e = 0, n = Se;
      try {
        var s = qt;
        for (Se = 1; e < s.length; e++) {
          var a = s[e];
          do
            a = a(!0);
          while (a !== null);
        }
        qt = null, po = !1;
      } catch (d) {
        throw qt !== null && (qt = qt.slice(e + 1)), eu(Bi, yn), d;
      } finally {
        Se = n, xa = !1;
      }
    }
    return null;
  }
  var mr = [], gr = 0, ho = null, mo = 0, bt = [], kt = 0, Fn = null, Xt = 1, Zt = "";
  function Dn(e, n) {
    mr[gr++] = mo, mr[gr++] = ho, ho = e, mo = n;
  }
  function Ju(e, n, s) {
    bt[kt++] = Xt, bt[kt++] = Zt, bt[kt++] = Fn, Fn = e;
    var a = Xt;
    e = Zt;
    var d = 32 - Pt(a) - 1;
    a &= ~(1 << d), s += 1;
    var p = 32 - Pt(n) + d;
    if (30 < p) {
      var x = d - d % 5;
      p = (a & (1 << x) - 1).toString(32), a >>= x, d -= x, Xt = 1 << 32 - Pt(n) + d | s << d | a, Zt = p + e;
    } else Xt = 1 << p | s << d | a, Zt = e;
  }
  function va(e) {
    e.return !== null && (Dn(e, 1), Ju(e, 1, 0));
  }
  function wa(e) {
    for (; e === ho; ) ho = mr[--gr], mr[gr] = null, mo = mr[--gr], mr[gr] = null;
    for (; e === Fn; ) Fn = bt[--kt], bt[kt] = null, Zt = bt[--kt], bt[kt] = null, Xt = bt[--kt], bt[kt] = null;
  }
  var pt = null, ht = null, Te = !1, Rt = null;
  function ed(e, n) {
    var s = _t(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = n, s.return = e, n = e.deletions, n === null ? (e.deletions = [s], e.flags |= 16) : n.push(s);
  }
  function td(e, n) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return n = n.nodeType !== 1 || s.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, pt = e, ht = hn(n.firstChild), !0) : !1;
      case 6:
        return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, pt = e, ht = null, !0) : !1;
      case 13:
        return n = n.nodeType !== 8 ? null : n, n !== null ? (s = Fn !== null ? { id: Xt, overflow: Zt } : null, e.memoizedState = { dehydrated: n, treeContext: s, retryLane: 1073741824 }, s = _t(18, null, null, 0), s.stateNode = n, s.return = e, e.child = s, pt = e, ht = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ba(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ka(e) {
    if (Te) {
      var n = ht;
      if (n) {
        var s = n;
        if (!td(e, n)) {
          if (ba(e)) throw Error(o(418));
          n = hn(s.nextSibling);
          var a = pt;
          n && td(e, n) ? ed(a, s) : (e.flags = e.flags & -4097 | 2, Te = !1, pt = e);
        }
      } else {
        if (ba(e)) throw Error(o(418));
        e.flags = e.flags & -4097 | 2, Te = !1, pt = e;
      }
    }
  }
  function nd(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    pt = e;
  }
  function go(e) {
    if (e !== pt) return !1;
    if (!Te) return nd(e), Te = !0, !1;
    var n;
    if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !pa(e.type, e.memoizedProps)), n && (n = ht)) {
      if (ba(e)) throw rd(), Error(o(418));
      for (; n; ) ed(e, n), n = hn(n.nextSibling);
    }
    if (nd(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (n === 0) {
                ht = hn(e.nextSibling);
                break e;
              }
              n--;
            } else s !== "$" && s !== "$!" && s !== "$?" || n++;
          }
          e = e.nextSibling;
        }
        ht = null;
      }
    } else ht = pt ? hn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function rd() {
    for (var e = ht; e; ) e = hn(e.nextSibling);
  }
  function yr() {
    ht = pt = null, Te = !1;
  }
  function ja(e) {
    Rt === null ? Rt = [e] : Rt.push(e);
  }
  var dy = F.ReactCurrentBatchConfig;
  function ls(e, n, s) {
    if (e = s.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(o(309));
          var a = s.stateNode;
        }
        if (!a) throw Error(o(147, e));
        var d = a, p = "" + e;
        return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === p ? n.ref : (n = function(x) {
          var N = d.refs;
          x === null ? delete N[p] : N[p] = x;
        }, n._stringRef = p, n);
      }
      if (typeof e != "string") throw Error(o(284));
      if (!s._owner) throw Error(o(290, e));
    }
    return e;
  }
  function yo(e, n) {
    throw e = Object.prototype.toString.call(n), Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
  }
  function sd(e) {
    var n = e._init;
    return n(e._payload);
  }
  function od(e) {
    function n(O, T) {
      if (e) {
        var I = O.deletions;
        I === null ? (O.deletions = [T], O.flags |= 16) : I.push(T);
      }
    }
    function s(O, T) {
      if (!e) return null;
      for (; T !== null; ) n(O, T), T = T.sibling;
      return null;
    }
    function a(O, T) {
      for (O = /* @__PURE__ */ new Map(); T !== null; ) T.key !== null ? O.set(T.key, T) : O.set(T.index, T), T = T.sibling;
      return O;
    }
    function d(O, T) {
      return O = Sn(O, T), O.index = 0, O.sibling = null, O;
    }
    function p(O, T, I) {
      return O.index = I, e ? (I = O.alternate, I !== null ? (I = I.index, I < T ? (O.flags |= 2, T) : I) : (O.flags |= 2, T)) : (O.flags |= 1048576, T);
    }
    function x(O) {
      return e && O.alternate === null && (O.flags |= 2), O;
    }
    function N(O, T, I, q) {
      return T === null || T.tag !== 6 ? (T = hl(I, O.mode, q), T.return = O, T) : (T = d(T, I), T.return = O, T);
    }
    function R(O, T, I, q) {
      var ae = I.type;
      return ae === Y ? V(O, T, I.props.children, q, I.key) : T !== null && (T.elementType === ae || typeof ae == "object" && ae !== null && ae.$$typeof === fe && sd(ae) === T.type) ? (q = d(T, I.props), q.ref = ls(O, T, I), q.return = O, q) : (q = zo(I.type, I.key, I.props, null, O.mode, q), q.ref = ls(O, T, I), q.return = O, q);
    }
    function $(O, T, I, q) {
      return T === null || T.tag !== 4 || T.stateNode.containerInfo !== I.containerInfo || T.stateNode.implementation !== I.implementation ? (T = ml(I, O.mode, q), T.return = O, T) : (T = d(T, I.children || []), T.return = O, T);
    }
    function V(O, T, I, q, ae) {
      return T === null || T.tag !== 7 ? (T = Gn(I, O.mode, q, ae), T.return = O, T) : (T = d(T, I), T.return = O, T);
    }
    function G(O, T, I) {
      if (typeof T == "string" && T !== "" || typeof T == "number") return T = hl("" + T, O.mode, I), T.return = O, T;
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case U:
            return I = zo(T.type, T.key, T.props, null, O.mode, I), I.ref = ls(O, null, T), I.return = O, I;
          case H:
            return T = ml(T, O.mode, I), T.return = O, T;
          case fe:
            var q = T._init;
            return G(O, q(T._payload), I);
        }
        if ($r(T) || K(T)) return T = Gn(T, O.mode, I, null), T.return = O, T;
        yo(O, T);
      }
      return null;
    }
    function W(O, T, I, q) {
      var ae = T !== null ? T.key : null;
      if (typeof I == "string" && I !== "" || typeof I == "number") return ae !== null ? null : N(O, T, "" + I, q);
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case U:
            return I.key === ae ? R(O, T, I, q) : null;
          case H:
            return I.key === ae ? $(O, T, I, q) : null;
          case fe:
            return ae = I._init, W(
              O,
              T,
              ae(I._payload),
              q
            );
        }
        if ($r(I) || K(I)) return ae !== null ? null : V(O, T, I, q, null);
        yo(O, I);
      }
      return null;
    }
    function ee(O, T, I, q, ae) {
      if (typeof q == "string" && q !== "" || typeof q == "number") return O = O.get(I) || null, N(T, O, "" + q, ae);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case U:
            return O = O.get(q.key === null ? I : q.key) || null, R(T, O, q, ae);
          case H:
            return O = O.get(q.key === null ? I : q.key) || null, $(T, O, q, ae);
          case fe:
            var ue = q._init;
            return ee(O, T, I, ue(q._payload), ae);
        }
        if ($r(q) || K(q)) return O = O.get(I) || null, V(T, O, q, ae, null);
        yo(T, q);
      }
      return null;
    }
    function re(O, T, I, q) {
      for (var ae = null, ue = null, de = T, he = T = 0, Ve = null; de !== null && he < I.length; he++) {
        de.index > he ? (Ve = de, de = null) : Ve = de.sibling;
        var Ne = W(O, de, I[he], q);
        if (Ne === null) {
          de === null && (de = Ve);
          break;
        }
        e && de && Ne.alternate === null && n(O, de), T = p(Ne, T, he), ue === null ? ae = Ne : ue.sibling = Ne, ue = Ne, de = Ve;
      }
      if (he === I.length) return s(O, de), Te && Dn(O, he), ae;
      if (de === null) {
        for (; he < I.length; he++) de = G(O, I[he], q), de !== null && (T = p(de, T, he), ue === null ? ae = de : ue.sibling = de, ue = de);
        return Te && Dn(O, he), ae;
      }
      for (de = a(O, de); he < I.length; he++) Ve = ee(de, O, he, I[he], q), Ve !== null && (e && Ve.alternate !== null && de.delete(Ve.key === null ? he : Ve.key), T = p(Ve, T, he), ue === null ? ae = Ve : ue.sibling = Ve, ue = Ve);
      return e && de.forEach(function(_n) {
        return n(O, _n);
      }), Te && Dn(O, he), ae;
    }
    function oe(O, T, I, q) {
      var ae = K(I);
      if (typeof ae != "function") throw Error(o(150));
      if (I = ae.call(I), I == null) throw Error(o(151));
      for (var ue = ae = null, de = T, he = T = 0, Ve = null, Ne = I.next(); de !== null && !Ne.done; he++, Ne = I.next()) {
        de.index > he ? (Ve = de, de = null) : Ve = de.sibling;
        var _n = W(O, de, Ne.value, q);
        if (_n === null) {
          de === null && (de = Ve);
          break;
        }
        e && de && _n.alternate === null && n(O, de), T = p(_n, T, he), ue === null ? ae = _n : ue.sibling = _n, ue = _n, de = Ve;
      }
      if (Ne.done) return s(
        O,
        de
      ), Te && Dn(O, he), ae;
      if (de === null) {
        for (; !Ne.done; he++, Ne = I.next()) Ne = G(O, Ne.value, q), Ne !== null && (T = p(Ne, T, he), ue === null ? ae = Ne : ue.sibling = Ne, ue = Ne);
        return Te && Dn(O, he), ae;
      }
      for (de = a(O, de); !Ne.done; he++, Ne = I.next()) Ne = ee(de, O, he, Ne.value, q), Ne !== null && (e && Ne.alternate !== null && de.delete(Ne.key === null ? he : Ne.key), T = p(Ne, T, he), ue === null ? ae = Ne : ue.sibling = Ne, ue = Ne);
      return e && de.forEach(function(Hy) {
        return n(O, Hy);
      }), Te && Dn(O, he), ae;
    }
    function $e(O, T, I, q) {
      if (typeof I == "object" && I !== null && I.type === Y && I.key === null && (I = I.props.children), typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case U:
            e: {
              for (var ae = I.key, ue = T; ue !== null; ) {
                if (ue.key === ae) {
                  if (ae = I.type, ae === Y) {
                    if (ue.tag === 7) {
                      s(O, ue.sibling), T = d(ue, I.props.children), T.return = O, O = T;
                      break e;
                    }
                  } else if (ue.elementType === ae || typeof ae == "object" && ae !== null && ae.$$typeof === fe && sd(ae) === ue.type) {
                    s(O, ue.sibling), T = d(ue, I.props), T.ref = ls(O, ue, I), T.return = O, O = T;
                    break e;
                  }
                  s(O, ue);
                  break;
                } else n(O, ue);
                ue = ue.sibling;
              }
              I.type === Y ? (T = Gn(I.props.children, O.mode, q, I.key), T.return = O, O = T) : (q = zo(I.type, I.key, I.props, null, O.mode, q), q.ref = ls(O, T, I), q.return = O, O = q);
            }
            return x(O);
          case H:
            e: {
              for (ue = I.key; T !== null; ) {
                if (T.key === ue) if (T.tag === 4 && T.stateNode.containerInfo === I.containerInfo && T.stateNode.implementation === I.implementation) {
                  s(O, T.sibling), T = d(T, I.children || []), T.return = O, O = T;
                  break e;
                } else {
                  s(O, T);
                  break;
                }
                else n(O, T);
                T = T.sibling;
              }
              T = ml(I, O.mode, q), T.return = O, O = T;
            }
            return x(O);
          case fe:
            return ue = I._init, $e(O, T, ue(I._payload), q);
        }
        if ($r(I)) return re(O, T, I, q);
        if (K(I)) return oe(O, T, I, q);
        yo(O, I);
      }
      return typeof I == "string" && I !== "" || typeof I == "number" ? (I = "" + I, T !== null && T.tag === 6 ? (s(O, T.sibling), T = d(T, I), T.return = O, O = T) : (s(O, T), T = hl(I, O.mode, q), T.return = O, O = T), x(O)) : s(O, T);
    }
    return $e;
  }
  var xr = od(!0), id = od(!1), xo = mn(null), vo = null, vr = null, Na = null;
  function Sa() {
    Na = vr = vo = null;
  }
  function _a(e) {
    var n = xo.current;
    Ee(xo), e._currentValue = n;
  }
  function Ca(e, n, s) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, a !== null && (a.childLanes |= n)) : a !== null && (a.childLanes & n) !== n && (a.childLanes |= n), e === s) break;
      e = e.return;
    }
  }
  function wr(e, n) {
    vo = e, Na = vr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & n) !== 0 && (it = !0), e.firstContext = null);
  }
  function jt(e) {
    var n = e._currentValue;
    if (Na !== e) if (e = { context: e, memoizedValue: n, next: null }, vr === null) {
      if (vo === null) throw Error(o(308));
      vr = e, vo.dependencies = { lanes: 0, firstContext: e };
    } else vr = vr.next = e;
    return n;
  }
  var Bn = null;
  function Pa(e) {
    Bn === null ? Bn = [e] : Bn.push(e);
  }
  function ad(e, n, s, a) {
    var d = n.interleaved;
    return d === null ? (s.next = s, Pa(n)) : (s.next = d.next, d.next = s), n.interleaved = s, Jt(e, a);
  }
  function Jt(e, n) {
    e.lanes |= n;
    var s = e.alternate;
    for (s !== null && (s.lanes |= n), s = e, e = e.return; e !== null; ) e.childLanes |= n, s = e.alternate, s !== null && (s.childLanes |= n), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var xn = !1;
  function Ea(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function ld(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function en(e, n) {
    return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
  }
  function vn(e, n, s) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ke & 2) !== 0) {
      var d = a.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), a.pending = n, Jt(e, s);
    }
    return d = a.interleaved, d === null ? (n.next = n, Pa(a)) : (n.next = d.next, d.next = n), a.interleaved = n, Jt(e, s);
  }
  function wo(e, n, s) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (s & 4194240) !== 0)) {
      var a = n.lanes;
      a &= e.pendingLanes, s |= a, n.lanes = s, Wi(e, s);
    }
  }
  function cd(e, n) {
    var s = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, s === a)) {
      var d = null, p = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var x = { eventTime: s.eventTime, lane: s.lane, tag: s.tag, payload: s.payload, callback: s.callback, next: null };
          p === null ? d = p = x : p = p.next = x, s = s.next;
        } while (s !== null);
        p === null ? d = p = n : p = p.next = n;
      } else d = p = n;
      s = { baseState: a.baseState, firstBaseUpdate: d, lastBaseUpdate: p, shared: a.shared, effects: a.effects }, e.updateQueue = s;
      return;
    }
    e = s.lastBaseUpdate, e === null ? s.firstBaseUpdate = n : e.next = n, s.lastBaseUpdate = n;
  }
  function bo(e, n, s, a) {
    var d = e.updateQueue;
    xn = !1;
    var p = d.firstBaseUpdate, x = d.lastBaseUpdate, N = d.shared.pending;
    if (N !== null) {
      d.shared.pending = null;
      var R = N, $ = R.next;
      R.next = null, x === null ? p = $ : x.next = $, x = R;
      var V = e.alternate;
      V !== null && (V = V.updateQueue, N = V.lastBaseUpdate, N !== x && (N === null ? V.firstBaseUpdate = $ : N.next = $, V.lastBaseUpdate = R));
    }
    if (p !== null) {
      var G = d.baseState;
      x = 0, V = $ = R = null, N = p;
      do {
        var W = N.lane, ee = N.eventTime;
        if ((a & W) === W) {
          V !== null && (V = V.next = {
            eventTime: ee,
            lane: 0,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null
          });
          e: {
            var re = e, oe = N;
            switch (W = n, ee = s, oe.tag) {
              case 1:
                if (re = oe.payload, typeof re == "function") {
                  G = re.call(ee, G, W);
                  break e;
                }
                G = re;
                break e;
              case 3:
                re.flags = re.flags & -65537 | 128;
              case 0:
                if (re = oe.payload, W = typeof re == "function" ? re.call(ee, G, W) : re, W == null) break e;
                G = D({}, G, W);
                break e;
              case 2:
                xn = !0;
            }
          }
          N.callback !== null && N.lane !== 0 && (e.flags |= 64, W = d.effects, W === null ? d.effects = [N] : W.push(N));
        } else ee = { eventTime: ee, lane: W, tag: N.tag, payload: N.payload, callback: N.callback, next: null }, V === null ? ($ = V = ee, R = G) : V = V.next = ee, x |= W;
        if (N = N.next, N === null) {
          if (N = d.shared.pending, N === null) break;
          W = N, N = W.next, W.next = null, d.lastBaseUpdate = W, d.shared.pending = null;
        }
      } while (!0);
      if (V === null && (R = G), d.baseState = R, d.firstBaseUpdate = $, d.lastBaseUpdate = V, n = d.shared.interleaved, n !== null) {
        d = n;
        do
          x |= d.lane, d = d.next;
        while (d !== n);
      } else p === null && (d.shared.lanes = 0);
      Wn |= x, e.lanes = x, e.memoizedState = G;
    }
  }
  function ud(e, n, s) {
    if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
      var a = e[n], d = a.callback;
      if (d !== null) {
        if (a.callback = null, a = s, typeof d != "function") throw Error(o(191, d));
        d.call(a);
      }
    }
  }
  var cs = {}, zt = mn(cs), us = mn(cs), ds = mn(cs);
  function zn(e) {
    if (e === cs) throw Error(o(174));
    return e;
  }
  function Ra(e, n) {
    switch (Ce(ds, n), Ce(us, e), Ce(zt, cs), e = n.nodeType, e) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : Ti(null, "");
        break;
      default:
        e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = Ti(n, e);
    }
    Ee(zt), Ce(zt, n);
  }
  function br() {
    Ee(zt), Ee(us), Ee(ds);
  }
  function dd(e) {
    zn(ds.current);
    var n = zn(zt.current), s = Ti(n, e.type);
    n !== s && (Ce(us, e), Ce(zt, s));
  }
  function Ta(e) {
    us.current === e && (Ee(zt), Ee(us));
  }
  var Ae = mn(0);
  function ko(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var s = n.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || s.data === "$?" || s.data === "$!")) return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Aa = [];
  function La() {
    for (var e = 0; e < Aa.length; e++) Aa[e]._workInProgressVersionPrimary = null;
    Aa.length = 0;
  }
  var jo = F.ReactCurrentDispatcher, Oa = F.ReactCurrentBatchConfig, Un = 0, Le = null, Be = null, We = null, No = !1, fs = !1, ps = 0, fy = 0;
  function Ze() {
    throw Error(o(321));
  }
  function Ma(e, n) {
    if (n === null) return !1;
    for (var s = 0; s < n.length && s < e.length; s++) if (!Et(e[s], n[s])) return !1;
    return !0;
  }
  function Ia(e, n, s, a, d, p) {
    if (Un = p, Le = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, jo.current = e === null || e.memoizedState === null ? gy : yy, e = s(a, d), fs) {
      p = 0;
      do {
        if (fs = !1, ps = 0, 25 <= p) throw Error(o(301));
        p += 1, We = Be = null, n.updateQueue = null, jo.current = xy, e = s(a, d);
      } while (fs);
    }
    if (jo.current = Co, n = Be !== null && Be.next !== null, Un = 0, We = Be = Le = null, No = !1, n) throw Error(o(300));
    return e;
  }
  function $a() {
    var e = ps !== 0;
    return ps = 0, e;
  }
  function Ut() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return We === null ? Le.memoizedState = We = e : We = We.next = e, We;
  }
  function Nt() {
    if (Be === null) {
      var e = Le.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Be.next;
    var n = We === null ? Le.memoizedState : We.next;
    if (n !== null) We = n, Be = e;
    else {
      if (e === null) throw Error(o(310));
      Be = e, e = { memoizedState: Be.memoizedState, baseState: Be.baseState, baseQueue: Be.baseQueue, queue: Be.queue, next: null }, We === null ? Le.memoizedState = We = e : We = We.next = e;
    }
    return We;
  }
  function hs(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Fa(e) {
    var n = Nt(), s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = e;
    var a = Be, d = a.baseQueue, p = s.pending;
    if (p !== null) {
      if (d !== null) {
        var x = d.next;
        d.next = p.next, p.next = x;
      }
      a.baseQueue = d = p, s.pending = null;
    }
    if (d !== null) {
      p = d.next, a = a.baseState;
      var N = x = null, R = null, $ = p;
      do {
        var V = $.lane;
        if ((Un & V) === V) R !== null && (R = R.next = { lane: 0, action: $.action, hasEagerState: $.hasEagerState, eagerState: $.eagerState, next: null }), a = $.hasEagerState ? $.eagerState : e(a, $.action);
        else {
          var G = {
            lane: V,
            action: $.action,
            hasEagerState: $.hasEagerState,
            eagerState: $.eagerState,
            next: null
          };
          R === null ? (N = R = G, x = a) : R = R.next = G, Le.lanes |= V, Wn |= V;
        }
        $ = $.next;
      } while ($ !== null && $ !== p);
      R === null ? x = a : R.next = N, Et(a, n.memoizedState) || (it = !0), n.memoizedState = a, n.baseState = x, n.baseQueue = R, s.lastRenderedState = a;
    }
    if (e = s.interleaved, e !== null) {
      d = e;
      do
        p = d.lane, Le.lanes |= p, Wn |= p, d = d.next;
      while (d !== e);
    } else d === null && (s.lanes = 0);
    return [n.memoizedState, s.dispatch];
  }
  function Da(e) {
    var n = Nt(), s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = e;
    var a = s.dispatch, d = s.pending, p = n.memoizedState;
    if (d !== null) {
      s.pending = null;
      var x = d = d.next;
      do
        p = e(p, x.action), x = x.next;
      while (x !== d);
      Et(p, n.memoizedState) || (it = !0), n.memoizedState = p, n.baseQueue === null && (n.baseState = p), s.lastRenderedState = p;
    }
    return [p, a];
  }
  function fd() {
  }
  function pd(e, n) {
    var s = Le, a = Nt(), d = n(), p = !Et(a.memoizedState, d);
    if (p && (a.memoizedState = d, it = !0), a = a.queue, Ba(gd.bind(null, s, a, e), [e]), a.getSnapshot !== n || p || We !== null && We.memoizedState.tag & 1) {
      if (s.flags |= 2048, ms(9, md.bind(null, s, a, d, n), void 0, null), He === null) throw Error(o(349));
      (Un & 30) !== 0 || hd(s, n, d);
    }
    return d;
  }
  function hd(e, n, s) {
    e.flags |= 16384, e = { getSnapshot: n, value: s }, n = Le.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Le.updateQueue = n, n.stores = [e]) : (s = n.stores, s === null ? n.stores = [e] : s.push(e));
  }
  function md(e, n, s, a) {
    n.value = s, n.getSnapshot = a, yd(n) && xd(e);
  }
  function gd(e, n, s) {
    return s(function() {
      yd(n) && xd(e);
    });
  }
  function yd(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var s = n();
      return !Et(e, s);
    } catch {
      return !0;
    }
  }
  function xd(e) {
    var n = Jt(e, 1);
    n !== null && Ot(n, e, 1, -1);
  }
  function vd(e) {
    var n = Ut();
    return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: hs, lastRenderedState: e }, n.queue = e, e = e.dispatch = my.bind(null, Le, e), [n.memoizedState, e];
  }
  function ms(e, n, s, a) {
    return e = { tag: e, create: n, destroy: s, deps: a, next: null }, n = Le.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Le.updateQueue = n, n.lastEffect = e.next = e) : (s = n.lastEffect, s === null ? n.lastEffect = e.next = e : (a = s.next, s.next = e, e.next = a, n.lastEffect = e)), e;
  }
  function wd() {
    return Nt().memoizedState;
  }
  function So(e, n, s, a) {
    var d = Ut();
    Le.flags |= e, d.memoizedState = ms(1 | n, s, void 0, a === void 0 ? null : a);
  }
  function _o(e, n, s, a) {
    var d = Nt();
    a = a === void 0 ? null : a;
    var p = void 0;
    if (Be !== null) {
      var x = Be.memoizedState;
      if (p = x.destroy, a !== null && Ma(a, x.deps)) {
        d.memoizedState = ms(n, s, p, a);
        return;
      }
    }
    Le.flags |= e, d.memoizedState = ms(1 | n, s, p, a);
  }
  function bd(e, n) {
    return So(8390656, 8, e, n);
  }
  function Ba(e, n) {
    return _o(2048, 8, e, n);
  }
  function kd(e, n) {
    return _o(4, 2, e, n);
  }
  function jd(e, n) {
    return _o(4, 4, e, n);
  }
  function Nd(e, n) {
    if (typeof n == "function") return e = e(), n(e), function() {
      n(null);
    };
    if (n != null) return e = e(), n.current = e, function() {
      n.current = null;
    };
  }
  function Sd(e, n, s) {
    return s = s != null ? s.concat([e]) : null, _o(4, 4, Nd.bind(null, n, e), s);
  }
  function za() {
  }
  function _d(e, n) {
    var s = Nt();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && Ma(n, a[1]) ? a[0] : (s.memoizedState = [e, n], e);
  }
  function Cd(e, n) {
    var s = Nt();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && Ma(n, a[1]) ? a[0] : (e = e(), s.memoizedState = [e, n], e);
  }
  function Pd(e, n, s) {
    return (Un & 21) === 0 ? (e.baseState && (e.baseState = !1, it = !0), e.memoizedState = s) : (Et(s, n) || (s = su(), Le.lanes |= s, Wn |= s, e.baseState = !0), n);
  }
  function py(e, n) {
    var s = Se;
    Se = s !== 0 && 4 > s ? s : 4, e(!0);
    var a = Oa.transition;
    Oa.transition = {};
    try {
      e(!1), n();
    } finally {
      Se = s, Oa.transition = a;
    }
  }
  function Ed() {
    return Nt().memoizedState;
  }
  function hy(e, n, s) {
    var a = jn(e);
    if (s = { lane: a, action: s, hasEagerState: !1, eagerState: null, next: null }, Rd(e)) Td(n, s);
    else if (s = ad(e, n, s, a), s !== null) {
      var d = rt();
      Ot(s, e, a, d), Ad(s, n, a);
    }
  }
  function my(e, n, s) {
    var a = jn(e), d = { lane: a, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (Rd(e)) Td(n, d);
    else {
      var p = e.alternate;
      if (e.lanes === 0 && (p === null || p.lanes === 0) && (p = n.lastRenderedReducer, p !== null)) try {
        var x = n.lastRenderedState, N = p(x, s);
        if (d.hasEagerState = !0, d.eagerState = N, Et(N, x)) {
          var R = n.interleaved;
          R === null ? (d.next = d, Pa(n)) : (d.next = R.next, R.next = d), n.interleaved = d;
          return;
        }
      } catch {
      }
      s = ad(e, n, d, a), s !== null && (d = rt(), Ot(s, e, a, d), Ad(s, n, a));
    }
  }
  function Rd(e) {
    var n = e.alternate;
    return e === Le || n !== null && n === Le;
  }
  function Td(e, n) {
    fs = No = !0;
    var s = e.pending;
    s === null ? n.next = n : (n.next = s.next, s.next = n), e.pending = n;
  }
  function Ad(e, n, s) {
    if ((s & 4194240) !== 0) {
      var a = n.lanes;
      a &= e.pendingLanes, s |= a, n.lanes = s, Wi(e, s);
    }
  }
  var Co = { readContext: jt, useCallback: Ze, useContext: Ze, useEffect: Ze, useImperativeHandle: Ze, useInsertionEffect: Ze, useLayoutEffect: Ze, useMemo: Ze, useReducer: Ze, useRef: Ze, useState: Ze, useDebugValue: Ze, useDeferredValue: Ze, useTransition: Ze, useMutableSource: Ze, useSyncExternalStore: Ze, useId: Ze, unstable_isNewReconciler: !1 }, gy = { readContext: jt, useCallback: function(e, n) {
    return Ut().memoizedState = [e, n === void 0 ? null : n], e;
  }, useContext: jt, useEffect: bd, useImperativeHandle: function(e, n, s) {
    return s = s != null ? s.concat([e]) : null, So(
      4194308,
      4,
      Nd.bind(null, n, e),
      s
    );
  }, useLayoutEffect: function(e, n) {
    return So(4194308, 4, e, n);
  }, useInsertionEffect: function(e, n) {
    return So(4, 2, e, n);
  }, useMemo: function(e, n) {
    var s = Ut();
    return n = n === void 0 ? null : n, e = e(), s.memoizedState = [e, n], e;
  }, useReducer: function(e, n, s) {
    var a = Ut();
    return n = s !== void 0 ? s(n) : n, a.memoizedState = a.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, a.queue = e, e = e.dispatch = hy.bind(null, Le, e), [a.memoizedState, e];
  }, useRef: function(e) {
    var n = Ut();
    return e = { current: e }, n.memoizedState = e;
  }, useState: vd, useDebugValue: za, useDeferredValue: function(e) {
    return Ut().memoizedState = e;
  }, useTransition: function() {
    var e = vd(!1), n = e[0];
    return e = py.bind(null, e[1]), Ut().memoizedState = e, [n, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, n, s) {
    var a = Le, d = Ut();
    if (Te) {
      if (s === void 0) throw Error(o(407));
      s = s();
    } else {
      if (s = n(), He === null) throw Error(o(349));
      (Un & 30) !== 0 || hd(a, n, s);
    }
    d.memoizedState = s;
    var p = { value: s, getSnapshot: n };
    return d.queue = p, bd(gd.bind(
      null,
      a,
      p,
      e
    ), [e]), a.flags |= 2048, ms(9, md.bind(null, a, p, s, n), void 0, null), s;
  }, useId: function() {
    var e = Ut(), n = He.identifierPrefix;
    if (Te) {
      var s = Zt, a = Xt;
      s = (a & ~(1 << 32 - Pt(a) - 1)).toString(32) + s, n = ":" + n + "R" + s, s = ps++, 0 < s && (n += "H" + s.toString(32)), n += ":";
    } else s = fy++, n = ":" + n + "r" + s.toString(32) + ":";
    return e.memoizedState = n;
  }, unstable_isNewReconciler: !1 }, yy = {
    readContext: jt,
    useCallback: _d,
    useContext: jt,
    useEffect: Ba,
    useImperativeHandle: Sd,
    useInsertionEffect: kd,
    useLayoutEffect: jd,
    useMemo: Cd,
    useReducer: Fa,
    useRef: wd,
    useState: function() {
      return Fa(hs);
    },
    useDebugValue: za,
    useDeferredValue: function(e) {
      var n = Nt();
      return Pd(n, Be.memoizedState, e);
    },
    useTransition: function() {
      var e = Fa(hs)[0], n = Nt().memoizedState;
      return [e, n];
    },
    useMutableSource: fd,
    useSyncExternalStore: pd,
    useId: Ed,
    unstable_isNewReconciler: !1
  }, xy = { readContext: jt, useCallback: _d, useContext: jt, useEffect: Ba, useImperativeHandle: Sd, useInsertionEffect: kd, useLayoutEffect: jd, useMemo: Cd, useReducer: Da, useRef: wd, useState: function() {
    return Da(hs);
  }, useDebugValue: za, useDeferredValue: function(e) {
    var n = Nt();
    return Be === null ? n.memoizedState = e : Pd(n, Be.memoizedState, e);
  }, useTransition: function() {
    var e = Da(hs)[0], n = Nt().memoizedState;
    return [e, n];
  }, useMutableSource: fd, useSyncExternalStore: pd, useId: Ed, unstable_isNewReconciler: !1 };
  function Tt(e, n) {
    if (e && e.defaultProps) {
      n = D({}, n), e = e.defaultProps;
      for (var s in e) n[s] === void 0 && (n[s] = e[s]);
      return n;
    }
    return n;
  }
  function Ua(e, n, s, a) {
    n = e.memoizedState, s = s(a, n), s = s == null ? n : D({}, n, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var Po = { isMounted: function(e) {
    return (e = e._reactInternals) ? Mn(e) === e : !1;
  }, enqueueSetState: function(e, n, s) {
    e = e._reactInternals;
    var a = rt(), d = jn(e), p = en(a, d);
    p.payload = n, s != null && (p.callback = s), n = vn(e, p, d), n !== null && (Ot(n, e, d, a), wo(n, e, d));
  }, enqueueReplaceState: function(e, n, s) {
    e = e._reactInternals;
    var a = rt(), d = jn(e), p = en(a, d);
    p.tag = 1, p.payload = n, s != null && (p.callback = s), n = vn(e, p, d), n !== null && (Ot(n, e, d, a), wo(n, e, d));
  }, enqueueForceUpdate: function(e, n) {
    e = e._reactInternals;
    var s = rt(), a = jn(e), d = en(s, a);
    d.tag = 2, n != null && (d.callback = n), n = vn(e, d, a), n !== null && (Ot(n, e, a, s), wo(n, e, a));
  } };
  function Ld(e, n, s, a, d, p, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, p, x) : n.prototype && n.prototype.isPureReactComponent ? !ts(s, a) || !ts(d, p) : !0;
  }
  function Od(e, n, s) {
    var a = !1, d = gn, p = n.contextType;
    return typeof p == "object" && p !== null ? p = jt(p) : (d = ot(n) ? $n : Xe.current, a = n.contextTypes, p = (a = a != null) ? hr(e, d) : gn), n = new n(s, p), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Po, e.stateNode = n, n._reactInternals = e, a && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = d, e.__reactInternalMemoizedMaskedChildContext = p), n;
  }
  function Md(e, n, s, a) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(s, a), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(s, a), n.state !== e && Po.enqueueReplaceState(n, n.state, null);
  }
  function Wa(e, n, s, a) {
    var d = e.stateNode;
    d.props = s, d.state = e.memoizedState, d.refs = {}, Ea(e);
    var p = n.contextType;
    typeof p == "object" && p !== null ? d.context = jt(p) : (p = ot(n) ? $n : Xe.current, d.context = hr(e, p)), d.state = e.memoizedState, p = n.getDerivedStateFromProps, typeof p == "function" && (Ua(e, n, p, s), d.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (n = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), n !== d.state && Po.enqueueReplaceState(d, d.state, null), bo(e, s, d, a), d.state = e.memoizedState), typeof d.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function kr(e, n) {
    try {
      var s = "", a = n;
      do
        s += pe(a), a = a.return;
      while (a);
      var d = s;
    } catch (p) {
      d = `
Error generating stack: ` + p.message + `
` + p.stack;
    }
    return { value: e, source: n, stack: d, digest: null };
  }
  function Ha(e, n, s) {
    return { value: e, source: null, stack: s ?? null, digest: n ?? null };
  }
  function Va(e, n) {
    try {
      console.error(n.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var vy = typeof WeakMap == "function" ? WeakMap : Map;
  function Id(e, n, s) {
    s = en(-1, s), s.tag = 3, s.payload = { element: null };
    var a = n.value;
    return s.callback = function() {
      Mo || (Mo = !0, il = a), Va(e, n);
    }, s;
  }
  function $d(e, n, s) {
    s = en(-1, s), s.tag = 3;
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var d = n.value;
      s.payload = function() {
        return a(d);
      }, s.callback = function() {
        Va(e, n);
      };
    }
    var p = e.stateNode;
    return p !== null && typeof p.componentDidCatch == "function" && (s.callback = function() {
      Va(e, n), typeof a != "function" && (bn === null ? bn = /* @__PURE__ */ new Set([this]) : bn.add(this));
      var x = n.stack;
      this.componentDidCatch(n.value, { componentStack: x !== null ? x : "" });
    }), s;
  }
  function Fd(e, n, s) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new vy();
      var d = /* @__PURE__ */ new Set();
      a.set(n, d);
    } else d = a.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), a.set(n, d));
    d.has(s) || (d.add(s), e = Ly.bind(null, e, n, s), n.then(e, e));
  }
  function Dd(e) {
    do {
      var n;
      if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Bd(e, n, s, a, d) {
    return (e.mode & 1) === 0 ? (e === n ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (n = en(-1, 1), n.tag = 2, vn(s, n, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = d, e);
  }
  var wy = F.ReactCurrentOwner, it = !1;
  function nt(e, n, s, a) {
    n.child = e === null ? id(n, null, s, a) : xr(n, e.child, s, a);
  }
  function zd(e, n, s, a, d) {
    s = s.render;
    var p = n.ref;
    return wr(n, d), a = Ia(e, n, s, a, p, d), s = $a(), e !== null && !it ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~d, tn(e, n, d)) : (Te && s && va(n), n.flags |= 1, nt(e, n, a, d), n.child);
  }
  function Ud(e, n, s, a, d) {
    if (e === null) {
      var p = s.type;
      return typeof p == "function" && !pl(p) && p.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (n.tag = 15, n.type = p, Wd(e, n, p, a, d)) : (e = zo(s.type, null, a, n, n.mode, d), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (p = e.child, (e.lanes & d) === 0) {
      var x = p.memoizedProps;
      if (s = s.compare, s = s !== null ? s : ts, s(x, a) && e.ref === n.ref) return tn(e, n, d);
    }
    return n.flags |= 1, e = Sn(p, a), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Wd(e, n, s, a, d) {
    if (e !== null) {
      var p = e.memoizedProps;
      if (ts(p, a) && e.ref === n.ref) if (it = !1, n.pendingProps = a = p, (e.lanes & d) !== 0) (e.flags & 131072) !== 0 && (it = !0);
      else return n.lanes = e.lanes, tn(e, n, d);
    }
    return Ya(e, n, s, a, d);
  }
  function Hd(e, n, s) {
    var a = n.pendingProps, d = a.children, p = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden") if ((n.mode & 1) === 0) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ce(Nr, mt), mt |= s;
    else {
      if ((s & 1073741824) === 0) return e = p !== null ? p.baseLanes | s : s, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, Ce(Nr, mt), mt |= e, null;
      n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, a = p !== null ? p.baseLanes : s, Ce(Nr, mt), mt |= a;
    }
    else p !== null ? (a = p.baseLanes | s, n.memoizedState = null) : a = s, Ce(Nr, mt), mt |= a;
    return nt(e, n, d, s), n.child;
  }
  function Vd(e, n) {
    var s = n.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (n.flags |= 512, n.flags |= 2097152);
  }
  function Ya(e, n, s, a, d) {
    var p = ot(s) ? $n : Xe.current;
    return p = hr(n, p), wr(n, d), s = Ia(e, n, s, a, p, d), a = $a(), e !== null && !it ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~d, tn(e, n, d)) : (Te && a && va(n), n.flags |= 1, nt(e, n, s, d), n.child);
  }
  function Yd(e, n, s, a, d) {
    if (ot(s)) {
      var p = !0;
      fo(n);
    } else p = !1;
    if (wr(n, d), n.stateNode === null) Ro(e, n), Od(n, s, a), Wa(n, s, a, d), a = !0;
    else if (e === null) {
      var x = n.stateNode, N = n.memoizedProps;
      x.props = N;
      var R = x.context, $ = s.contextType;
      typeof $ == "object" && $ !== null ? $ = jt($) : ($ = ot(s) ? $n : Xe.current, $ = hr(n, $));
      var V = s.getDerivedStateFromProps, G = typeof V == "function" || typeof x.getSnapshotBeforeUpdate == "function";
      G || typeof x.UNSAFE_componentWillReceiveProps != "function" && typeof x.componentWillReceiveProps != "function" || (N !== a || R !== $) && Md(n, x, a, $), xn = !1;
      var W = n.memoizedState;
      x.state = W, bo(n, a, x, d), R = n.memoizedState, N !== a || W !== R || st.current || xn ? (typeof V == "function" && (Ua(n, s, V, a), R = n.memoizedState), (N = xn || Ld(n, s, N, a, W, R, $)) ? (G || typeof x.UNSAFE_componentWillMount != "function" && typeof x.componentWillMount != "function" || (typeof x.componentWillMount == "function" && x.componentWillMount(), typeof x.UNSAFE_componentWillMount == "function" && x.UNSAFE_componentWillMount()), typeof x.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof x.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = a, n.memoizedState = R), x.props = a, x.state = R, x.context = $, a = N) : (typeof x.componentDidMount == "function" && (n.flags |= 4194308), a = !1);
    } else {
      x = n.stateNode, ld(e, n), N = n.memoizedProps, $ = n.type === n.elementType ? N : Tt(n.type, N), x.props = $, G = n.pendingProps, W = x.context, R = s.contextType, typeof R == "object" && R !== null ? R = jt(R) : (R = ot(s) ? $n : Xe.current, R = hr(n, R));
      var ee = s.getDerivedStateFromProps;
      (V = typeof ee == "function" || typeof x.getSnapshotBeforeUpdate == "function") || typeof x.UNSAFE_componentWillReceiveProps != "function" && typeof x.componentWillReceiveProps != "function" || (N !== G || W !== R) && Md(n, x, a, R), xn = !1, W = n.memoizedState, x.state = W, bo(n, a, x, d);
      var re = n.memoizedState;
      N !== G || W !== re || st.current || xn ? (typeof ee == "function" && (Ua(n, s, ee, a), re = n.memoizedState), ($ = xn || Ld(n, s, $, a, W, re, R) || !1) ? (V || typeof x.UNSAFE_componentWillUpdate != "function" && typeof x.componentWillUpdate != "function" || (typeof x.componentWillUpdate == "function" && x.componentWillUpdate(a, re, R), typeof x.UNSAFE_componentWillUpdate == "function" && x.UNSAFE_componentWillUpdate(a, re, R)), typeof x.componentDidUpdate == "function" && (n.flags |= 4), typeof x.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof x.componentDidUpdate != "function" || N === e.memoizedProps && W === e.memoizedState || (n.flags |= 4), typeof x.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && W === e.memoizedState || (n.flags |= 1024), n.memoizedProps = a, n.memoizedState = re), x.props = a, x.state = re, x.context = R, a = $) : (typeof x.componentDidUpdate != "function" || N === e.memoizedProps && W === e.memoizedState || (n.flags |= 4), typeof x.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && W === e.memoizedState || (n.flags |= 1024), a = !1);
    }
    return Ga(e, n, s, a, p, d);
  }
  function Ga(e, n, s, a, d, p) {
    Vd(e, n);
    var x = (n.flags & 128) !== 0;
    if (!a && !x) return d && Xu(n, s, !1), tn(e, n, p);
    a = n.stateNode, wy.current = n;
    var N = x && typeof s.getDerivedStateFromError != "function" ? null : a.render();
    return n.flags |= 1, e !== null && x ? (n.child = xr(n, e.child, null, p), n.child = xr(n, null, N, p)) : nt(e, n, N, p), n.memoizedState = a.state, d && Xu(n, s, !0), n.child;
  }
  function Gd(e) {
    var n = e.stateNode;
    n.pendingContext ? Ku(e, n.pendingContext, n.pendingContext !== n.context) : n.context && Ku(e, n.context, !1), Ra(e, n.containerInfo);
  }
  function Qd(e, n, s, a, d) {
    return yr(), ja(d), n.flags |= 256, nt(e, n, s, a), n.child;
  }
  var Qa = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ka(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Kd(e, n, s) {
    var a = n.pendingProps, d = Ae.current, p = !1, x = (n.flags & 128) !== 0, N;
    if ((N = x) || (N = e !== null && e.memoizedState === null ? !1 : (d & 2) !== 0), N ? (p = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (d |= 1), Ce(Ae, d & 1), e === null)
      return ka(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((n.mode & 1) === 0 ? n.lanes = 1 : e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824, null) : (x = a.children, e = a.fallback, p ? (a = n.mode, p = n.child, x = { mode: "hidden", children: x }, (a & 1) === 0 && p !== null ? (p.childLanes = 0, p.pendingProps = x) : p = Uo(x, a, 0, null), e = Gn(e, a, s, null), p.return = n, e.return = n, p.sibling = e, n.child = p, n.child.memoizedState = Ka(s), n.memoizedState = Qa, e) : qa(n, x));
    if (d = e.memoizedState, d !== null && (N = d.dehydrated, N !== null)) return by(e, n, x, a, N, d, s);
    if (p) {
      p = a.fallback, x = n.mode, d = e.child, N = d.sibling;
      var R = { mode: "hidden", children: a.children };
      return (x & 1) === 0 && n.child !== d ? (a = n.child, a.childLanes = 0, a.pendingProps = R, n.deletions = null) : (a = Sn(d, R), a.subtreeFlags = d.subtreeFlags & 14680064), N !== null ? p = Sn(N, p) : (p = Gn(p, x, s, null), p.flags |= 2), p.return = n, a.return = n, a.sibling = p, n.child = a, a = p, p = n.child, x = e.child.memoizedState, x = x === null ? Ka(s) : { baseLanes: x.baseLanes | s, cachePool: null, transitions: x.transitions }, p.memoizedState = x, p.childLanes = e.childLanes & ~s, n.memoizedState = Qa, a;
    }
    return p = e.child, e = p.sibling, a = Sn(p, { mode: "visible", children: a.children }), (n.mode & 1) === 0 && (a.lanes = s), a.return = n, a.sibling = null, e !== null && (s = n.deletions, s === null ? (n.deletions = [e], n.flags |= 16) : s.push(e)), n.child = a, n.memoizedState = null, a;
  }
  function qa(e, n) {
    return n = Uo({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
  }
  function Eo(e, n, s, a) {
    return a !== null && ja(a), xr(n, e.child, null, s), e = qa(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
  }
  function by(e, n, s, a, d, p, x) {
    if (s)
      return n.flags & 256 ? (n.flags &= -257, a = Ha(Error(o(422))), Eo(e, n, x, a)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (p = a.fallback, d = n.mode, a = Uo({ mode: "visible", children: a.children }, d, 0, null), p = Gn(p, d, x, null), p.flags |= 2, a.return = n, p.return = n, a.sibling = p, n.child = a, (n.mode & 1) !== 0 && xr(n, e.child, null, x), n.child.memoizedState = Ka(x), n.memoizedState = Qa, p);
    if ((n.mode & 1) === 0) return Eo(e, n, x, null);
    if (d.data === "$!") {
      if (a = d.nextSibling && d.nextSibling.dataset, a) var N = a.dgst;
      return a = N, p = Error(o(419)), a = Ha(p, a, void 0), Eo(e, n, x, a);
    }
    if (N = (x & e.childLanes) !== 0, it || N) {
      if (a = He, a !== null) {
        switch (x & -x) {
          case 4:
            d = 2;
            break;
          case 16:
            d = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            d = 32;
            break;
          case 536870912:
            d = 268435456;
            break;
          default:
            d = 0;
        }
        d = (d & (a.suspendedLanes | x)) !== 0 ? 0 : d, d !== 0 && d !== p.retryLane && (p.retryLane = d, Jt(e, d), Ot(a, e, d, -1));
      }
      return fl(), a = Ha(Error(o(421))), Eo(e, n, x, a);
    }
    return d.data === "$?" ? (n.flags |= 128, n.child = e.child, n = Oy.bind(null, e), d._reactRetry = n, null) : (e = p.treeContext, ht = hn(d.nextSibling), pt = n, Te = !0, Rt = null, e !== null && (bt[kt++] = Xt, bt[kt++] = Zt, bt[kt++] = Fn, Xt = e.id, Zt = e.overflow, Fn = n), n = qa(n, a.children), n.flags |= 4096, n);
  }
  function qd(e, n, s) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n), Ca(e.return, n, s);
  }
  function Xa(e, n, s, a, d) {
    var p = e.memoizedState;
    p === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: a, tail: s, tailMode: d } : (p.isBackwards = n, p.rendering = null, p.renderingStartTime = 0, p.last = a, p.tail = s, p.tailMode = d);
  }
  function Xd(e, n, s) {
    var a = n.pendingProps, d = a.revealOrder, p = a.tail;
    if (nt(e, n, a.children, s), a = Ae.current, (a & 2) !== 0) a = a & 1 | 2, n.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = n.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && qd(e, s, n);
        else if (e.tag === 19) qd(e, s, n);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === n) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      a &= 1;
    }
    if (Ce(Ae, a), (n.mode & 1) === 0) n.memoizedState = null;
    else switch (d) {
      case "forwards":
        for (s = n.child, d = null; s !== null; ) e = s.alternate, e !== null && ko(e) === null && (d = s), s = s.sibling;
        s = d, s === null ? (d = n.child, n.child = null) : (d = s.sibling, s.sibling = null), Xa(n, !1, d, s, p);
        break;
      case "backwards":
        for (s = null, d = n.child, n.child = null; d !== null; ) {
          if (e = d.alternate, e !== null && ko(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = s, s = d, d = e;
        }
        Xa(n, !0, s, null, p);
        break;
      case "together":
        Xa(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ro(e, n) {
    (n.mode & 1) === 0 && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
  }
  function tn(e, n, s) {
    if (e !== null && (n.dependencies = e.dependencies), Wn |= n.lanes, (s & n.childLanes) === 0) return null;
    if (e !== null && n.child !== e.child) throw Error(o(153));
    if (n.child !== null) {
      for (e = n.child, s = Sn(e, e.pendingProps), n.child = s, s.return = n; e.sibling !== null; ) e = e.sibling, s = s.sibling = Sn(e, e.pendingProps), s.return = n;
      s.sibling = null;
    }
    return n.child;
  }
  function ky(e, n, s) {
    switch (n.tag) {
      case 3:
        Gd(n), yr();
        break;
      case 5:
        dd(n);
        break;
      case 1:
        ot(n.type) && fo(n);
        break;
      case 4:
        Ra(n, n.stateNode.containerInfo);
        break;
      case 10:
        var a = n.type._context, d = n.memoizedProps.value;
        Ce(xo, a._currentValue), a._currentValue = d;
        break;
      case 13:
        if (a = n.memoizedState, a !== null)
          return a.dehydrated !== null ? (Ce(Ae, Ae.current & 1), n.flags |= 128, null) : (s & n.child.childLanes) !== 0 ? Kd(e, n, s) : (Ce(Ae, Ae.current & 1), e = tn(e, n, s), e !== null ? e.sibling : null);
        Ce(Ae, Ae.current & 1);
        break;
      case 19:
        if (a = (s & n.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (a) return Xd(e, n, s);
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), Ce(Ae, Ae.current), a) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, Hd(e, n, s);
    }
    return tn(e, n, s);
  }
  var Zd, Za, Jd, ef;
  Zd = function(e, n) {
    for (var s = n.child; s !== null; ) {
      if (s.tag === 5 || s.tag === 6) e.appendChild(s.stateNode);
      else if (s.tag !== 4 && s.child !== null) {
        s.child.return = s, s = s.child;
        continue;
      }
      if (s === n) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === n) return;
        s = s.return;
      }
      s.sibling.return = s.return, s = s.sibling;
    }
  }, Za = function() {
  }, Jd = function(e, n, s, a) {
    var d = e.memoizedProps;
    if (d !== a) {
      e = n.stateNode, zn(zt.current);
      var p = null;
      switch (s) {
        case "input":
          d = Ci(e, d), a = Ci(e, a), p = [];
          break;
        case "select":
          d = D({}, d, { value: void 0 }), a = D({}, a, { value: void 0 }), p = [];
          break;
        case "textarea":
          d = Ri(e, d), a = Ri(e, a), p = [];
          break;
        default:
          typeof d.onClick != "function" && typeof a.onClick == "function" && (e.onclick = lo);
      }
      Ai(s, a);
      var x;
      s = null;
      for ($ in d) if (!a.hasOwnProperty($) && d.hasOwnProperty($) && d[$] != null) if ($ === "style") {
        var N = d[$];
        for (x in N) N.hasOwnProperty(x) && (s || (s = {}), s[x] = "");
      } else $ !== "dangerouslySetInnerHTML" && $ !== "children" && $ !== "suppressContentEditableWarning" && $ !== "suppressHydrationWarning" && $ !== "autoFocus" && (c.hasOwnProperty($) ? p || (p = []) : (p = p || []).push($, null));
      for ($ in a) {
        var R = a[$];
        if (N = d?.[$], a.hasOwnProperty($) && R !== N && (R != null || N != null)) if ($ === "style") if (N) {
          for (x in N) !N.hasOwnProperty(x) || R && R.hasOwnProperty(x) || (s || (s = {}), s[x] = "");
          for (x in R) R.hasOwnProperty(x) && N[x] !== R[x] && (s || (s = {}), s[x] = R[x]);
        } else s || (p || (p = []), p.push(
          $,
          s
        )), s = R;
        else $ === "dangerouslySetInnerHTML" ? (R = R ? R.__html : void 0, N = N ? N.__html : void 0, R != null && N !== R && (p = p || []).push($, R)) : $ === "children" ? typeof R != "string" && typeof R != "number" || (p = p || []).push($, "" + R) : $ !== "suppressContentEditableWarning" && $ !== "suppressHydrationWarning" && (c.hasOwnProperty($) ? (R != null && $ === "onScroll" && Pe("scroll", e), p || N === R || (p = [])) : (p = p || []).push($, R));
      }
      s && (p = p || []).push("style", s);
      var $ = p;
      (n.updateQueue = $) && (n.flags |= 4);
    }
  }, ef = function(e, n, s, a) {
    s !== a && (n.flags |= 4);
  };
  function gs(e, n) {
    if (!Te) switch (e.tailMode) {
      case "hidden":
        n = e.tail;
        for (var s = null; n !== null; ) n.alternate !== null && (s = n), n = n.sibling;
        s === null ? e.tail = null : s.sibling = null;
        break;
      case "collapsed":
        s = e.tail;
        for (var a = null; s !== null; ) s.alternate !== null && (a = s), s = s.sibling;
        a === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
    }
  }
  function Je(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, s = 0, a = 0;
    if (n) for (var d = e.child; d !== null; ) s |= d.lanes | d.childLanes, a |= d.subtreeFlags & 14680064, a |= d.flags & 14680064, d.return = e, d = d.sibling;
    else for (d = e.child; d !== null; ) s |= d.lanes | d.childLanes, a |= d.subtreeFlags, a |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= a, e.childLanes = s, n;
  }
  function jy(e, n, s) {
    var a = n.pendingProps;
    switch (wa(n), n.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Je(n), null;
      case 1:
        return ot(n.type) && uo(), Je(n), null;
      case 3:
        return a = n.stateNode, br(), Ee(st), Ee(Xe), La(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (go(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Rt !== null && (cl(Rt), Rt = null))), Za(e, n), Je(n), null;
      case 5:
        Ta(n);
        var d = zn(ds.current);
        if (s = n.type, e !== null && n.stateNode != null) Jd(e, n, s, a, d), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
        else {
          if (!a) {
            if (n.stateNode === null) throw Error(o(166));
            return Je(n), null;
          }
          if (e = zn(zt.current), go(n)) {
            a = n.stateNode, s = n.type;
            var p = n.memoizedProps;
            switch (a[Bt] = n, a[is] = p, e = (n.mode & 1) !== 0, s) {
              case "dialog":
                Pe("cancel", a), Pe("close", a);
                break;
              case "iframe":
              case "object":
              case "embed":
                Pe("load", a);
                break;
              case "video":
              case "audio":
                for (d = 0; d < rs.length; d++) Pe(rs[d], a);
                break;
              case "source":
                Pe("error", a);
                break;
              case "img":
              case "image":
              case "link":
                Pe(
                  "error",
                  a
                ), Pe("load", a);
                break;
              case "details":
                Pe("toggle", a);
                break;
              case "input":
                Oc(a, p), Pe("invalid", a);
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!p.multiple }, Pe("invalid", a);
                break;
              case "textarea":
                $c(a, p), Pe("invalid", a);
            }
            Ai(s, p), d = null;
            for (var x in p) if (p.hasOwnProperty(x)) {
              var N = p[x];
              x === "children" ? typeof N == "string" ? a.textContent !== N && (p.suppressHydrationWarning !== !0 && ao(a.textContent, N, e), d = ["children", N]) : typeof N == "number" && a.textContent !== "" + N && (p.suppressHydrationWarning !== !0 && ao(
                a.textContent,
                N,
                e
              ), d = ["children", "" + N]) : c.hasOwnProperty(x) && N != null && x === "onScroll" && Pe("scroll", a);
            }
            switch (s) {
              case "input":
                tr(a), Ic(a, p, !0);
                break;
              case "textarea":
                tr(a), Dc(a);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof p.onClick == "function" && (a.onclick = lo);
            }
            a = d, n.updateQueue = a, a !== null && (n.flags |= 4);
          } else {
            x = d.nodeType === 9 ? d : d.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Bc(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = x.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof a.is == "string" ? e = x.createElement(s, { is: a.is }) : (e = x.createElement(s), s === "select" && (x = e, a.multiple ? x.multiple = !0 : a.size && (x.size = a.size))) : e = x.createElementNS(e, s), e[Bt] = n, e[is] = a, Zd(e, n, !1, !1), n.stateNode = e;
            e: {
              switch (x = Li(s, a), s) {
                case "dialog":
                  Pe("cancel", e), Pe("close", e), d = a;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Pe("load", e), d = a;
                  break;
                case "video":
                case "audio":
                  for (d = 0; d < rs.length; d++) Pe(rs[d], e);
                  d = a;
                  break;
                case "source":
                  Pe("error", e), d = a;
                  break;
                case "img":
                case "image":
                case "link":
                  Pe(
                    "error",
                    e
                  ), Pe("load", e), d = a;
                  break;
                case "details":
                  Pe("toggle", e), d = a;
                  break;
                case "input":
                  Oc(e, a), d = Ci(e, a), Pe("invalid", e);
                  break;
                case "option":
                  d = a;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!a.multiple }, d = D({}, a, { value: void 0 }), Pe("invalid", e);
                  break;
                case "textarea":
                  $c(e, a), d = Ri(e, a), Pe("invalid", e);
                  break;
                default:
                  d = a;
              }
              Ai(s, d), N = d;
              for (p in N) if (N.hasOwnProperty(p)) {
                var R = N[p];
                p === "style" ? Wc(e, R) : p === "dangerouslySetInnerHTML" ? (R = R ? R.__html : void 0, R != null && zc(e, R)) : p === "children" ? typeof R == "string" ? (s !== "textarea" || R !== "") && Fr(e, R) : typeof R == "number" && Fr(e, "" + R) : p !== "suppressContentEditableWarning" && p !== "suppressHydrationWarning" && p !== "autoFocus" && (c.hasOwnProperty(p) ? R != null && p === "onScroll" && Pe("scroll", e) : R != null && C(e, p, R, x));
              }
              switch (s) {
                case "input":
                  tr(e), Ic(e, a, !1);
                  break;
                case "textarea":
                  tr(e), Dc(e);
                  break;
                case "option":
                  a.value != null && e.setAttribute("value", "" + je(a.value));
                  break;
                case "select":
                  e.multiple = !!a.multiple, p = a.value, p != null ? nr(e, !!a.multiple, p, !1) : a.defaultValue != null && nr(
                    e,
                    !!a.multiple,
                    a.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof d.onClick == "function" && (e.onclick = lo);
              }
              switch (s) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break e;
                case "img":
                  a = !0;
                  break e;
                default:
                  a = !1;
              }
            }
            a && (n.flags |= 4);
          }
          n.ref !== null && (n.flags |= 512, n.flags |= 2097152);
        }
        return Je(n), null;
      case 6:
        if (e && n.stateNode != null) ef(e, n, e.memoizedProps, a);
        else {
          if (typeof a != "string" && n.stateNode === null) throw Error(o(166));
          if (s = zn(ds.current), zn(zt.current), go(n)) {
            if (a = n.stateNode, s = n.memoizedProps, a[Bt] = n, (p = a.nodeValue !== s) && (e = pt, e !== null)) switch (e.tag) {
              case 3:
                ao(a.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && ao(a.nodeValue, s, (e.mode & 1) !== 0);
            }
            p && (n.flags |= 4);
          } else a = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(a), a[Bt] = n, n.stateNode = a;
        }
        return Je(n), null;
      case 13:
        if (Ee(Ae), a = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Te && ht !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0) rd(), yr(), n.flags |= 98560, p = !1;
          else if (p = go(n), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!p) throw Error(o(318));
              if (p = n.memoizedState, p = p !== null ? p.dehydrated : null, !p) throw Error(o(317));
              p[Bt] = n;
            } else yr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Je(n), p = !1;
          } else Rt !== null && (cl(Rt), Rt = null), p = !0;
          if (!p) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0 ? (n.lanes = s, n) : (a = a !== null, a !== (e !== null && e.memoizedState !== null) && a && (n.child.flags |= 8192, (n.mode & 1) !== 0 && (e === null || (Ae.current & 1) !== 0 ? ze === 0 && (ze = 3) : fl())), n.updateQueue !== null && (n.flags |= 4), Je(n), null);
      case 4:
        return br(), Za(e, n), e === null && ss(n.stateNode.containerInfo), Je(n), null;
      case 10:
        return _a(n.type._context), Je(n), null;
      case 17:
        return ot(n.type) && uo(), Je(n), null;
      case 19:
        if (Ee(Ae), p = n.memoizedState, p === null) return Je(n), null;
        if (a = (n.flags & 128) !== 0, x = p.rendering, x === null) if (a) gs(p, !1);
        else {
          if (ze !== 0 || e !== null && (e.flags & 128) !== 0) for (e = n.child; e !== null; ) {
            if (x = ko(e), x !== null) {
              for (n.flags |= 128, gs(p, !1), a = x.updateQueue, a !== null && (n.updateQueue = a, n.flags |= 4), n.subtreeFlags = 0, a = s, s = n.child; s !== null; ) p = s, e = a, p.flags &= 14680066, x = p.alternate, x === null ? (p.childLanes = 0, p.lanes = e, p.child = null, p.subtreeFlags = 0, p.memoizedProps = null, p.memoizedState = null, p.updateQueue = null, p.dependencies = null, p.stateNode = null) : (p.childLanes = x.childLanes, p.lanes = x.lanes, p.child = x.child, p.subtreeFlags = 0, p.deletions = null, p.memoizedProps = x.memoizedProps, p.memoizedState = x.memoizedState, p.updateQueue = x.updateQueue, p.type = x.type, e = x.dependencies, p.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return Ce(Ae, Ae.current & 1 | 2), n.child;
            }
            e = e.sibling;
          }
          p.tail !== null && Ie() > Sr && (n.flags |= 128, a = !0, gs(p, !1), n.lanes = 4194304);
        }
        else {
          if (!a) if (e = ko(x), e !== null) {
            if (n.flags |= 128, a = !0, s = e.updateQueue, s !== null && (n.updateQueue = s, n.flags |= 4), gs(p, !0), p.tail === null && p.tailMode === "hidden" && !x.alternate && !Te) return Je(n), null;
          } else 2 * Ie() - p.renderingStartTime > Sr && s !== 1073741824 && (n.flags |= 128, a = !0, gs(p, !1), n.lanes = 4194304);
          p.isBackwards ? (x.sibling = n.child, n.child = x) : (s = p.last, s !== null ? s.sibling = x : n.child = x, p.last = x);
        }
        return p.tail !== null ? (n = p.tail, p.rendering = n, p.tail = n.sibling, p.renderingStartTime = Ie(), n.sibling = null, s = Ae.current, Ce(Ae, a ? s & 1 | 2 : s & 1), n) : (Je(n), null);
      case 22:
      case 23:
        return dl(), a = n.memoizedState !== null, e !== null && e.memoizedState !== null !== a && (n.flags |= 8192), a && (n.mode & 1) !== 0 ? (mt & 1073741824) !== 0 && (Je(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Je(n), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function Ny(e, n) {
    switch (wa(n), n.tag) {
      case 1:
        return ot(n.type) && uo(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return br(), Ee(st), Ee(Xe), La(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 5:
        return Ta(n), null;
      case 13:
        if (Ee(Ae), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null) throw Error(o(340));
          yr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return Ee(Ae), null;
      case 4:
        return br(), null;
      case 10:
        return _a(n.type._context), null;
      case 22:
      case 23:
        return dl(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var To = !1, et = !1, Sy = typeof WeakSet == "function" ? WeakSet : Set, te = null;
  function jr(e, n) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (a) {
      Me(e, n, a);
    }
    else s.current = null;
  }
  function Ja(e, n, s) {
    try {
      s();
    } catch (a) {
      Me(e, n, a);
    }
  }
  var tf = !1;
  function _y(e, n) {
    if (da = qs, e = Lu(), ra(e)) {
      if ("selectionStart" in e) var s = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        s = (s = e.ownerDocument) && s.defaultView || window;
        var a = s.getSelection && s.getSelection();
        if (a && a.rangeCount !== 0) {
          s = a.anchorNode;
          var d = a.anchorOffset, p = a.focusNode;
          a = a.focusOffset;
          try {
            s.nodeType, p.nodeType;
          } catch {
            s = null;
            break e;
          }
          var x = 0, N = -1, R = -1, $ = 0, V = 0, G = e, W = null;
          t: for (; ; ) {
            for (var ee; G !== s || d !== 0 && G.nodeType !== 3 || (N = x + d), G !== p || a !== 0 && G.nodeType !== 3 || (R = x + a), G.nodeType === 3 && (x += G.nodeValue.length), (ee = G.firstChild) !== null; )
              W = G, G = ee;
            for (; ; ) {
              if (G === e) break t;
              if (W === s && ++$ === d && (N = x), W === p && ++V === a && (R = x), (ee = G.nextSibling) !== null) break;
              G = W, W = G.parentNode;
            }
            G = ee;
          }
          s = N === -1 || R === -1 ? null : { start: N, end: R };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (fa = { focusedElem: e, selectionRange: s }, qs = !1, te = n; te !== null; ) if (n = te, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, te = e;
    else for (; te !== null; ) {
      n = te;
      try {
        var re = n.alternate;
        if ((n.flags & 1024) !== 0) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (re !== null) {
              var oe = re.memoizedProps, $e = re.memoizedState, O = n.stateNode, T = O.getSnapshotBeforeUpdate(n.elementType === n.type ? oe : Tt(n.type, oe), $e);
              O.__reactInternalSnapshotBeforeUpdate = T;
            }
            break;
          case 3:
            var I = n.stateNode.containerInfo;
            I.nodeType === 1 ? I.textContent = "" : I.nodeType === 9 && I.documentElement && I.removeChild(I.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(o(163));
        }
      } catch (q) {
        Me(n, n.return, q);
      }
      if (e = n.sibling, e !== null) {
        e.return = n.return, te = e;
        break;
      }
      te = n.return;
    }
    return re = tf, tf = !1, re;
  }
  function ys(e, n, s) {
    var a = n.updateQueue;
    if (a = a !== null ? a.lastEffect : null, a !== null) {
      var d = a = a.next;
      do {
        if ((d.tag & e) === e) {
          var p = d.destroy;
          d.destroy = void 0, p !== void 0 && Ja(n, s, p);
        }
        d = d.next;
      } while (d !== a);
    }
  }
  function Ao(e, n) {
    if (n = n.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
      var s = n = n.next;
      do {
        if ((s.tag & e) === e) {
          var a = s.create;
          s.destroy = a();
        }
        s = s.next;
      } while (s !== n);
    }
  }
  function el(e) {
    var n = e.ref;
    if (n !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof n == "function" ? n(e) : n.current = e;
    }
  }
  function nf(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, nf(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[Bt], delete n[is], delete n[ga], delete n[ly], delete n[cy])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function rf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function sf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || rf(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function tl(e, n, s) {
    var a = e.tag;
    if (a === 5 || a === 6) e = e.stateNode, n ? s.nodeType === 8 ? s.parentNode.insertBefore(e, n) : s.insertBefore(e, n) : (s.nodeType === 8 ? (n = s.parentNode, n.insertBefore(e, s)) : (n = s, n.appendChild(e)), s = s._reactRootContainer, s != null || n.onclick !== null || (n.onclick = lo));
    else if (a !== 4 && (e = e.child, e !== null)) for (tl(e, n, s), e = e.sibling; e !== null; ) tl(e, n, s), e = e.sibling;
  }
  function nl(e, n, s) {
    var a = e.tag;
    if (a === 5 || a === 6) e = e.stateNode, n ? s.insertBefore(e, n) : s.appendChild(e);
    else if (a !== 4 && (e = e.child, e !== null)) for (nl(e, n, s), e = e.sibling; e !== null; ) nl(e, n, s), e = e.sibling;
  }
  var Qe = null, At = !1;
  function wn(e, n, s) {
    for (s = s.child; s !== null; ) of(e, n, s), s = s.sibling;
  }
  function of(e, n, s) {
    if (Dt && typeof Dt.onCommitFiberUnmount == "function") try {
      Dt.onCommitFiberUnmount(Hs, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        et || jr(s, n);
      case 6:
        var a = Qe, d = At;
        Qe = null, wn(e, n, s), Qe = a, At = d, Qe !== null && (At ? (e = Qe, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : Qe.removeChild(s.stateNode));
        break;
      case 18:
        Qe !== null && (At ? (e = Qe, s = s.stateNode, e.nodeType === 8 ? ma(e.parentNode, s) : e.nodeType === 1 && ma(e, s), Kr(e)) : ma(Qe, s.stateNode));
        break;
      case 4:
        a = Qe, d = At, Qe = s.stateNode.containerInfo, At = !0, wn(e, n, s), Qe = a, At = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!et && (a = s.updateQueue, a !== null && (a = a.lastEffect, a !== null))) {
          d = a = a.next;
          do {
            var p = d, x = p.destroy;
            p = p.tag, x !== void 0 && ((p & 2) !== 0 || (p & 4) !== 0) && Ja(s, n, x), d = d.next;
          } while (d !== a);
        }
        wn(e, n, s);
        break;
      case 1:
        if (!et && (jr(s, n), a = s.stateNode, typeof a.componentWillUnmount == "function")) try {
          a.props = s.memoizedProps, a.state = s.memoizedState, a.componentWillUnmount();
        } catch (N) {
          Me(s, n, N);
        }
        wn(e, n, s);
        break;
      case 21:
        wn(e, n, s);
        break;
      case 22:
        s.mode & 1 ? (et = (a = et) || s.memoizedState !== null, wn(e, n, s), et = a) : wn(e, n, s);
        break;
      default:
        wn(e, n, s);
    }
  }
  function af(e) {
    var n = e.updateQueue;
    if (n !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Sy()), n.forEach(function(a) {
        var d = My.bind(null, e, a);
        s.has(a) || (s.add(a), a.then(d, d));
      });
    }
  }
  function Lt(e, n) {
    var s = n.deletions;
    if (s !== null) for (var a = 0; a < s.length; a++) {
      var d = s[a];
      try {
        var p = e, x = n, N = x;
        e: for (; N !== null; ) {
          switch (N.tag) {
            case 5:
              Qe = N.stateNode, At = !1;
              break e;
            case 3:
              Qe = N.stateNode.containerInfo, At = !0;
              break e;
            case 4:
              Qe = N.stateNode.containerInfo, At = !0;
              break e;
          }
          N = N.return;
        }
        if (Qe === null) throw Error(o(160));
        of(p, x, d), Qe = null, At = !1;
        var R = d.alternate;
        R !== null && (R.return = null), d.return = null;
      } catch ($) {
        Me(d, n, $);
      }
    }
    if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) lf(n, e), n = n.sibling;
  }
  function lf(e, n) {
    var s = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Lt(n, e), Wt(e), a & 4) {
          try {
            ys(3, e, e.return), Ao(3, e);
          } catch (oe) {
            Me(e, e.return, oe);
          }
          try {
            ys(5, e, e.return);
          } catch (oe) {
            Me(e, e.return, oe);
          }
        }
        break;
      case 1:
        Lt(n, e), Wt(e), a & 512 && s !== null && jr(s, s.return);
        break;
      case 5:
        if (Lt(n, e), Wt(e), a & 512 && s !== null && jr(s, s.return), e.flags & 32) {
          var d = e.stateNode;
          try {
            Fr(d, "");
          } catch (oe) {
            Me(e, e.return, oe);
          }
        }
        if (a & 4 && (d = e.stateNode, d != null)) {
          var p = e.memoizedProps, x = s !== null ? s.memoizedProps : p, N = e.type, R = e.updateQueue;
          if (e.updateQueue = null, R !== null) try {
            N === "input" && p.type === "radio" && p.name != null && Mc(d, p), Li(N, x);
            var $ = Li(N, p);
            for (x = 0; x < R.length; x += 2) {
              var V = R[x], G = R[x + 1];
              V === "style" ? Wc(d, G) : V === "dangerouslySetInnerHTML" ? zc(d, G) : V === "children" ? Fr(d, G) : C(d, V, G, $);
            }
            switch (N) {
              case "input":
                Pi(d, p);
                break;
              case "textarea":
                Fc(d, p);
                break;
              case "select":
                var W = d._wrapperState.wasMultiple;
                d._wrapperState.wasMultiple = !!p.multiple;
                var ee = p.value;
                ee != null ? nr(d, !!p.multiple, ee, !1) : W !== !!p.multiple && (p.defaultValue != null ? nr(
                  d,
                  !!p.multiple,
                  p.defaultValue,
                  !0
                ) : nr(d, !!p.multiple, p.multiple ? [] : "", !1));
            }
            d[is] = p;
          } catch (oe) {
            Me(e, e.return, oe);
          }
        }
        break;
      case 6:
        if (Lt(n, e), Wt(e), a & 4) {
          if (e.stateNode === null) throw Error(o(162));
          d = e.stateNode, p = e.memoizedProps;
          try {
            d.nodeValue = p;
          } catch (oe) {
            Me(e, e.return, oe);
          }
        }
        break;
      case 3:
        if (Lt(n, e), Wt(e), a & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Kr(n.containerInfo);
        } catch (oe) {
          Me(e, e.return, oe);
        }
        break;
      case 4:
        Lt(n, e), Wt(e);
        break;
      case 13:
        Lt(n, e), Wt(e), d = e.child, d.flags & 8192 && (p = d.memoizedState !== null, d.stateNode.isHidden = p, !p || d.alternate !== null && d.alternate.memoizedState !== null || (ol = Ie())), a & 4 && af(e);
        break;
      case 22:
        if (V = s !== null && s.memoizedState !== null, e.mode & 1 ? (et = ($ = et) || V, Lt(n, e), et = $) : Lt(n, e), Wt(e), a & 8192) {
          if ($ = e.memoizedState !== null, (e.stateNode.isHidden = $) && !V && (e.mode & 1) !== 0) for (te = e, V = e.child; V !== null; ) {
            for (G = te = V; te !== null; ) {
              switch (W = te, ee = W.child, W.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ys(4, W, W.return);
                  break;
                case 1:
                  jr(W, W.return);
                  var re = W.stateNode;
                  if (typeof re.componentWillUnmount == "function") {
                    a = W, s = W.return;
                    try {
                      n = a, re.props = n.memoizedProps, re.state = n.memoizedState, re.componentWillUnmount();
                    } catch (oe) {
                      Me(a, s, oe);
                    }
                  }
                  break;
                case 5:
                  jr(W, W.return);
                  break;
                case 22:
                  if (W.memoizedState !== null) {
                    df(G);
                    continue;
                  }
              }
              ee !== null ? (ee.return = W, te = ee) : df(G);
            }
            V = V.sibling;
          }
          e: for (V = null, G = e; ; ) {
            if (G.tag === 5) {
              if (V === null) {
                V = G;
                try {
                  d = G.stateNode, $ ? (p = d.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none") : (N = G.stateNode, R = G.memoizedProps.style, x = R != null && R.hasOwnProperty("display") ? R.display : null, N.style.display = Uc("display", x));
                } catch (oe) {
                  Me(e, e.return, oe);
                }
              }
            } else if (G.tag === 6) {
              if (V === null) try {
                G.stateNode.nodeValue = $ ? "" : G.memoizedProps;
              } catch (oe) {
                Me(e, e.return, oe);
              }
            } else if ((G.tag !== 22 && G.tag !== 23 || G.memoizedState === null || G === e) && G.child !== null) {
              G.child.return = G, G = G.child;
              continue;
            }
            if (G === e) break e;
            for (; G.sibling === null; ) {
              if (G.return === null || G.return === e) break e;
              V === G && (V = null), G = G.return;
            }
            V === G && (V = null), G.sibling.return = G.return, G = G.sibling;
          }
        }
        break;
      case 19:
        Lt(n, e), Wt(e), a & 4 && af(e);
        break;
      case 21:
        break;
      default:
        Lt(
          n,
          e
        ), Wt(e);
    }
  }
  function Wt(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        e: {
          for (var s = e.return; s !== null; ) {
            if (rf(s)) {
              var a = s;
              break e;
            }
            s = s.return;
          }
          throw Error(o(160));
        }
        switch (a.tag) {
          case 5:
            var d = a.stateNode;
            a.flags & 32 && (Fr(d, ""), a.flags &= -33);
            var p = sf(e);
            nl(e, p, d);
            break;
          case 3:
          case 4:
            var x = a.stateNode.containerInfo, N = sf(e);
            tl(e, N, x);
            break;
          default:
            throw Error(o(161));
        }
      } catch (R) {
        Me(e, e.return, R);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Cy(e, n, s) {
    te = e, cf(e);
  }
  function cf(e, n, s) {
    for (var a = (e.mode & 1) !== 0; te !== null; ) {
      var d = te, p = d.child;
      if (d.tag === 22 && a) {
        var x = d.memoizedState !== null || To;
        if (!x) {
          var N = d.alternate, R = N !== null && N.memoizedState !== null || et;
          N = To;
          var $ = et;
          if (To = x, (et = R) && !$) for (te = d; te !== null; ) x = te, R = x.child, x.tag === 22 && x.memoizedState !== null ? ff(d) : R !== null ? (R.return = x, te = R) : ff(d);
          for (; p !== null; ) te = p, cf(p), p = p.sibling;
          te = d, To = N, et = $;
        }
        uf(e);
      } else (d.subtreeFlags & 8772) !== 0 && p !== null ? (p.return = d, te = p) : uf(e);
    }
  }
  function uf(e) {
    for (; te !== null; ) {
      var n = te;
      if ((n.flags & 8772) !== 0) {
        var s = n.alternate;
        try {
          if ((n.flags & 8772) !== 0) switch (n.tag) {
            case 0:
            case 11:
            case 15:
              et || Ao(5, n);
              break;
            case 1:
              var a = n.stateNode;
              if (n.flags & 4 && !et) if (s === null) a.componentDidMount();
              else {
                var d = n.elementType === n.type ? s.memoizedProps : Tt(n.type, s.memoizedProps);
                a.componentDidUpdate(d, s.memoizedState, a.__reactInternalSnapshotBeforeUpdate);
              }
              var p = n.updateQueue;
              p !== null && ud(n, p, a);
              break;
            case 3:
              var x = n.updateQueue;
              if (x !== null) {
                if (s = null, n.child !== null) switch (n.child.tag) {
                  case 5:
                    s = n.child.stateNode;
                    break;
                  case 1:
                    s = n.child.stateNode;
                }
                ud(n, x, s);
              }
              break;
            case 5:
              var N = n.stateNode;
              if (s === null && n.flags & 4) {
                s = N;
                var R = n.memoizedProps;
                switch (n.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    R.autoFocus && s.focus();
                    break;
                  case "img":
                    R.src && (s.src = R.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (n.memoizedState === null) {
                var $ = n.alternate;
                if ($ !== null) {
                  var V = $.memoizedState;
                  if (V !== null) {
                    var G = V.dehydrated;
                    G !== null && Kr(G);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(o(163));
          }
          et || n.flags & 512 && el(n);
        } catch (W) {
          Me(n, n.return, W);
        }
      }
      if (n === e) {
        te = null;
        break;
      }
      if (s = n.sibling, s !== null) {
        s.return = n.return, te = s;
        break;
      }
      te = n.return;
    }
  }
  function df(e) {
    for (; te !== null; ) {
      var n = te;
      if (n === e) {
        te = null;
        break;
      }
      var s = n.sibling;
      if (s !== null) {
        s.return = n.return, te = s;
        break;
      }
      te = n.return;
    }
  }
  function ff(e) {
    for (; te !== null; ) {
      var n = te;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var s = n.return;
            try {
              Ao(4, n);
            } catch (R) {
              Me(n, s, R);
            }
            break;
          case 1:
            var a = n.stateNode;
            if (typeof a.componentDidMount == "function") {
              var d = n.return;
              try {
                a.componentDidMount();
              } catch (R) {
                Me(n, d, R);
              }
            }
            var p = n.return;
            try {
              el(n);
            } catch (R) {
              Me(n, p, R);
            }
            break;
          case 5:
            var x = n.return;
            try {
              el(n);
            } catch (R) {
              Me(n, x, R);
            }
        }
      } catch (R) {
        Me(n, n.return, R);
      }
      if (n === e) {
        te = null;
        break;
      }
      var N = n.sibling;
      if (N !== null) {
        N.return = n.return, te = N;
        break;
      }
      te = n.return;
    }
  }
  var Py = Math.ceil, Lo = F.ReactCurrentDispatcher, rl = F.ReactCurrentOwner, St = F.ReactCurrentBatchConfig, ke = 0, He = null, Fe = null, Ke = 0, mt = 0, Nr = mn(0), ze = 0, xs = null, Wn = 0, Oo = 0, sl = 0, vs = null, at = null, ol = 0, Sr = 1 / 0, nn = null, Mo = !1, il = null, bn = null, Io = !1, kn = null, $o = 0, ws = 0, al = null, Fo = -1, Do = 0;
  function rt() {
    return (ke & 6) !== 0 ? Ie() : Fo !== -1 ? Fo : Fo = Ie();
  }
  function jn(e) {
    return (e.mode & 1) === 0 ? 1 : (ke & 2) !== 0 && Ke !== 0 ? Ke & -Ke : dy.transition !== null ? (Do === 0 && (Do = su()), Do) : (e = Se, e !== 0 || (e = window.event, e = e === void 0 ? 16 : pu(e.type)), e);
  }
  function Ot(e, n, s, a) {
    if (50 < ws) throw ws = 0, al = null, Error(o(185));
    Hr(e, s, a), ((ke & 2) === 0 || e !== He) && (e === He && ((ke & 2) === 0 && (Oo |= s), ze === 4 && Nn(e, Ke)), lt(e, a), s === 1 && ke === 0 && (n.mode & 1) === 0 && (Sr = Ie() + 500, po && yn()));
  }
  function lt(e, n) {
    var s = e.callbackNode;
    dg(e, n);
    var a = Gs(e, e === He ? Ke : 0);
    if (a === 0) s !== null && tu(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (n = a & -a, e.callbackPriority !== n) {
      if (s != null && tu(s), n === 1) e.tag === 0 ? uy(hf.bind(null, e)) : Zu(hf.bind(null, e)), iy(function() {
        (ke & 6) === 0 && yn();
      }), s = null;
      else {
        switch (ou(a)) {
          case 1:
            s = Bi;
            break;
          case 4:
            s = nu;
            break;
          case 16:
            s = Ws;
            break;
          case 536870912:
            s = ru;
            break;
          default:
            s = Ws;
        }
        s = kf(s, pf.bind(null, e));
      }
      e.callbackPriority = n, e.callbackNode = s;
    }
  }
  function pf(e, n) {
    if (Fo = -1, Do = 0, (ke & 6) !== 0) throw Error(o(327));
    var s = e.callbackNode;
    if (_r() && e.callbackNode !== s) return null;
    var a = Gs(e, e === He ? Ke : 0);
    if (a === 0) return null;
    if ((a & 30) !== 0 || (a & e.expiredLanes) !== 0 || n) n = Bo(e, a);
    else {
      n = a;
      var d = ke;
      ke |= 2;
      var p = gf();
      (He !== e || Ke !== n) && (nn = null, Sr = Ie() + 500, Vn(e, n));
      do
        try {
          Ty();
          break;
        } catch (N) {
          mf(e, N);
        }
      while (!0);
      Sa(), Lo.current = p, ke = d, Fe !== null ? n = 0 : (He = null, Ke = 0, n = ze);
    }
    if (n !== 0) {
      if (n === 2 && (d = zi(e), d !== 0 && (a = d, n = ll(e, d))), n === 1) throw s = xs, Vn(e, 0), Nn(e, a), lt(e, Ie()), s;
      if (n === 6) Nn(e, a);
      else {
        if (d = e.current.alternate, (a & 30) === 0 && !Ey(d) && (n = Bo(e, a), n === 2 && (p = zi(e), p !== 0 && (a = p, n = ll(e, p))), n === 1)) throw s = xs, Vn(e, 0), Nn(e, a), lt(e, Ie()), s;
        switch (e.finishedWork = d, e.finishedLanes = a, n) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            Yn(e, at, nn);
            break;
          case 3:
            if (Nn(e, a), (a & 130023424) === a && (n = ol + 500 - Ie(), 10 < n)) {
              if (Gs(e, 0) !== 0) break;
              if (d = e.suspendedLanes, (d & a) !== a) {
                rt(), e.pingedLanes |= e.suspendedLanes & d;
                break;
              }
              e.timeoutHandle = ha(Yn.bind(null, e, at, nn), n);
              break;
            }
            Yn(e, at, nn);
            break;
          case 4:
            if (Nn(e, a), (a & 4194240) === a) break;
            for (n = e.eventTimes, d = -1; 0 < a; ) {
              var x = 31 - Pt(a);
              p = 1 << x, x = n[x], x > d && (d = x), a &= ~p;
            }
            if (a = d, a = Ie() - a, a = (120 > a ? 120 : 480 > a ? 480 : 1080 > a ? 1080 : 1920 > a ? 1920 : 3e3 > a ? 3e3 : 4320 > a ? 4320 : 1960 * Py(a / 1960)) - a, 10 < a) {
              e.timeoutHandle = ha(Yn.bind(null, e, at, nn), a);
              break;
            }
            Yn(e, at, nn);
            break;
          case 5:
            Yn(e, at, nn);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return lt(e, Ie()), e.callbackNode === s ? pf.bind(null, e) : null;
  }
  function ll(e, n) {
    var s = vs;
    return e.current.memoizedState.isDehydrated && (Vn(e, n).flags |= 256), e = Bo(e, n), e !== 2 && (n = at, at = s, n !== null && cl(n)), e;
  }
  function cl(e) {
    at === null ? at = e : at.push.apply(at, e);
  }
  function Ey(e) {
    for (var n = e; ; ) {
      if (n.flags & 16384) {
        var s = n.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var a = 0; a < s.length; a++) {
          var d = s[a], p = d.getSnapshot;
          d = d.value;
          try {
            if (!Et(p(), d)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (s = n.child, n.subtreeFlags & 16384 && s !== null) s.return = n, n = s;
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Nn(e, n) {
    for (n &= ~sl, n &= ~Oo, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
      var s = 31 - Pt(n), a = 1 << s;
      e[s] = -1, n &= ~a;
    }
  }
  function hf(e) {
    if ((ke & 6) !== 0) throw Error(o(327));
    _r();
    var n = Gs(e, 0);
    if ((n & 1) === 0) return lt(e, Ie()), null;
    var s = Bo(e, n);
    if (e.tag !== 0 && s === 2) {
      var a = zi(e);
      a !== 0 && (n = a, s = ll(e, a));
    }
    if (s === 1) throw s = xs, Vn(e, 0), Nn(e, n), lt(e, Ie()), s;
    if (s === 6) throw Error(o(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = n, Yn(e, at, nn), lt(e, Ie()), null;
  }
  function ul(e, n) {
    var s = ke;
    ke |= 1;
    try {
      return e(n);
    } finally {
      ke = s, ke === 0 && (Sr = Ie() + 500, po && yn());
    }
  }
  function Hn(e) {
    kn !== null && kn.tag === 0 && (ke & 6) === 0 && _r();
    var n = ke;
    ke |= 1;
    var s = St.transition, a = Se;
    try {
      if (St.transition = null, Se = 1, e) return e();
    } finally {
      Se = a, St.transition = s, ke = n, (ke & 6) === 0 && yn();
    }
  }
  function dl() {
    mt = Nr.current, Ee(Nr);
  }
  function Vn(e, n) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, oy(s)), Fe !== null) for (s = Fe.return; s !== null; ) {
      var a = s;
      switch (wa(a), a.tag) {
        case 1:
          a = a.type.childContextTypes, a != null && uo();
          break;
        case 3:
          br(), Ee(st), Ee(Xe), La();
          break;
        case 5:
          Ta(a);
          break;
        case 4:
          br();
          break;
        case 13:
          Ee(Ae);
          break;
        case 19:
          Ee(Ae);
          break;
        case 10:
          _a(a.type._context);
          break;
        case 22:
        case 23:
          dl();
      }
      s = s.return;
    }
    if (He = e, Fe = e = Sn(e.current, null), Ke = mt = n, ze = 0, xs = null, sl = Oo = Wn = 0, at = vs = null, Bn !== null) {
      for (n = 0; n < Bn.length; n++) if (s = Bn[n], a = s.interleaved, a !== null) {
        s.interleaved = null;
        var d = a.next, p = s.pending;
        if (p !== null) {
          var x = p.next;
          p.next = d, a.next = x;
        }
        s.pending = a;
      }
      Bn = null;
    }
    return e;
  }
  function mf(e, n) {
    do {
      var s = Fe;
      try {
        if (Sa(), jo.current = Co, No) {
          for (var a = Le.memoizedState; a !== null; ) {
            var d = a.queue;
            d !== null && (d.pending = null), a = a.next;
          }
          No = !1;
        }
        if (Un = 0, We = Be = Le = null, fs = !1, ps = 0, rl.current = null, s === null || s.return === null) {
          ze = 1, xs = n, Fe = null;
          break;
        }
        e: {
          var p = e, x = s.return, N = s, R = n;
          if (n = Ke, N.flags |= 32768, R !== null && typeof R == "object" && typeof R.then == "function") {
            var $ = R, V = N, G = V.tag;
            if ((V.mode & 1) === 0 && (G === 0 || G === 11 || G === 15)) {
              var W = V.alternate;
              W ? (V.updateQueue = W.updateQueue, V.memoizedState = W.memoizedState, V.lanes = W.lanes) : (V.updateQueue = null, V.memoizedState = null);
            }
            var ee = Dd(x);
            if (ee !== null) {
              ee.flags &= -257, Bd(ee, x, N, p, n), ee.mode & 1 && Fd(p, $, n), n = ee, R = $;
              var re = n.updateQueue;
              if (re === null) {
                var oe = /* @__PURE__ */ new Set();
                oe.add(R), n.updateQueue = oe;
              } else re.add(R);
              break e;
            } else {
              if ((n & 1) === 0) {
                Fd(p, $, n), fl();
                break e;
              }
              R = Error(o(426));
            }
          } else if (Te && N.mode & 1) {
            var $e = Dd(x);
            if ($e !== null) {
              ($e.flags & 65536) === 0 && ($e.flags |= 256), Bd($e, x, N, p, n), ja(kr(R, N));
              break e;
            }
          }
          p = R = kr(R, N), ze !== 4 && (ze = 2), vs === null ? vs = [p] : vs.push(p), p = x;
          do {
            switch (p.tag) {
              case 3:
                p.flags |= 65536, n &= -n, p.lanes |= n;
                var O = Id(p, R, n);
                cd(p, O);
                break e;
              case 1:
                N = R;
                var T = p.type, I = p.stateNode;
                if ((p.flags & 128) === 0 && (typeof T.getDerivedStateFromError == "function" || I !== null && typeof I.componentDidCatch == "function" && (bn === null || !bn.has(I)))) {
                  p.flags |= 65536, n &= -n, p.lanes |= n;
                  var q = $d(p, N, n);
                  cd(p, q);
                  break e;
                }
            }
            p = p.return;
          } while (p !== null);
        }
        xf(s);
      } catch (ae) {
        n = ae, Fe === s && s !== null && (Fe = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function gf() {
    var e = Lo.current;
    return Lo.current = Co, e === null ? Co : e;
  }
  function fl() {
    (ze === 0 || ze === 3 || ze === 2) && (ze = 4), He === null || (Wn & 268435455) === 0 && (Oo & 268435455) === 0 || Nn(He, Ke);
  }
  function Bo(e, n) {
    var s = ke;
    ke |= 2;
    var a = gf();
    (He !== e || Ke !== n) && (nn = null, Vn(e, n));
    do
      try {
        Ry();
        break;
      } catch (d) {
        mf(e, d);
      }
    while (!0);
    if (Sa(), ke = s, Lo.current = a, Fe !== null) throw Error(o(261));
    return He = null, Ke = 0, ze;
  }
  function Ry() {
    for (; Fe !== null; ) yf(Fe);
  }
  function Ty() {
    for (; Fe !== null && !ng(); ) yf(Fe);
  }
  function yf(e) {
    var n = bf(e.alternate, e, mt);
    e.memoizedProps = e.pendingProps, n === null ? xf(e) : Fe = n, rl.current = null;
  }
  function xf(e) {
    var n = e;
    do {
      var s = n.alternate;
      if (e = n.return, (n.flags & 32768) === 0) {
        if (s = jy(s, n, mt), s !== null) {
          Fe = s;
          return;
        }
      } else {
        if (s = Ny(s, n), s !== null) {
          s.flags &= 32767, Fe = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          ze = 6, Fe = null;
          return;
        }
      }
      if (n = n.sibling, n !== null) {
        Fe = n;
        return;
      }
      Fe = n = e;
    } while (n !== null);
    ze === 0 && (ze = 5);
  }
  function Yn(e, n, s) {
    var a = Se, d = St.transition;
    try {
      St.transition = null, Se = 1, Ay(e, n, s, a);
    } finally {
      St.transition = d, Se = a;
    }
    return null;
  }
  function Ay(e, n, s, a) {
    do
      _r();
    while (kn !== null);
    if ((ke & 6) !== 0) throw Error(o(327));
    s = e.finishedWork;
    var d = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(o(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var p = s.lanes | s.childLanes;
    if (fg(e, p), e === He && (Fe = He = null, Ke = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || Io || (Io = !0, kf(Ws, function() {
      return _r(), null;
    })), p = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || p) {
      p = St.transition, St.transition = null;
      var x = Se;
      Se = 1;
      var N = ke;
      ke |= 4, rl.current = null, _y(e, s), lf(s, e), Zg(fa), qs = !!da, fa = da = null, e.current = s, Cy(s), rg(), ke = N, Se = x, St.transition = p;
    } else e.current = s;
    if (Io && (Io = !1, kn = e, $o = d), p = e.pendingLanes, p === 0 && (bn = null), ig(s.stateNode), lt(e, Ie()), n !== null) for (a = e.onRecoverableError, s = 0; s < n.length; s++) d = n[s], a(d.value, { componentStack: d.stack, digest: d.digest });
    if (Mo) throw Mo = !1, e = il, il = null, e;
    return ($o & 1) !== 0 && e.tag !== 0 && _r(), p = e.pendingLanes, (p & 1) !== 0 ? e === al ? ws++ : (ws = 0, al = e) : ws = 0, yn(), null;
  }
  function _r() {
    if (kn !== null) {
      var e = ou($o), n = St.transition, s = Se;
      try {
        if (St.transition = null, Se = 16 > e ? 16 : e, kn === null) var a = !1;
        else {
          if (e = kn, kn = null, $o = 0, (ke & 6) !== 0) throw Error(o(331));
          var d = ke;
          for (ke |= 4, te = e.current; te !== null; ) {
            var p = te, x = p.child;
            if ((te.flags & 16) !== 0) {
              var N = p.deletions;
              if (N !== null) {
                for (var R = 0; R < N.length; R++) {
                  var $ = N[R];
                  for (te = $; te !== null; ) {
                    var V = te;
                    switch (V.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ys(8, V, p);
                    }
                    var G = V.child;
                    if (G !== null) G.return = V, te = G;
                    else for (; te !== null; ) {
                      V = te;
                      var W = V.sibling, ee = V.return;
                      if (nf(V), V === $) {
                        te = null;
                        break;
                      }
                      if (W !== null) {
                        W.return = ee, te = W;
                        break;
                      }
                      te = ee;
                    }
                  }
                }
                var re = p.alternate;
                if (re !== null) {
                  var oe = re.child;
                  if (oe !== null) {
                    re.child = null;
                    do {
                      var $e = oe.sibling;
                      oe.sibling = null, oe = $e;
                    } while (oe !== null);
                  }
                }
                te = p;
              }
            }
            if ((p.subtreeFlags & 2064) !== 0 && x !== null) x.return = p, te = x;
            else e: for (; te !== null; ) {
              if (p = te, (p.flags & 2048) !== 0) switch (p.tag) {
                case 0:
                case 11:
                case 15:
                  ys(9, p, p.return);
              }
              var O = p.sibling;
              if (O !== null) {
                O.return = p.return, te = O;
                break e;
              }
              te = p.return;
            }
          }
          var T = e.current;
          for (te = T; te !== null; ) {
            x = te;
            var I = x.child;
            if ((x.subtreeFlags & 2064) !== 0 && I !== null) I.return = x, te = I;
            else e: for (x = T; te !== null; ) {
              if (N = te, (N.flags & 2048) !== 0) try {
                switch (N.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ao(9, N);
                }
              } catch (ae) {
                Me(N, N.return, ae);
              }
              if (N === x) {
                te = null;
                break e;
              }
              var q = N.sibling;
              if (q !== null) {
                q.return = N.return, te = q;
                break e;
              }
              te = N.return;
            }
          }
          if (ke = d, yn(), Dt && typeof Dt.onPostCommitFiberRoot == "function") try {
            Dt.onPostCommitFiberRoot(Hs, e);
          } catch {
          }
          a = !0;
        }
        return a;
      } finally {
        Se = s, St.transition = n;
      }
    }
    return !1;
  }
  function vf(e, n, s) {
    n = kr(s, n), n = Id(e, n, 1), e = vn(e, n, 1), n = rt(), e !== null && (Hr(e, 1, n), lt(e, n));
  }
  function Me(e, n, s) {
    if (e.tag === 3) vf(e, e, s);
    else for (; n !== null; ) {
      if (n.tag === 3) {
        vf(n, e, s);
        break;
      } else if (n.tag === 1) {
        var a = n.stateNode;
        if (typeof n.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (bn === null || !bn.has(a))) {
          e = kr(s, e), e = $d(n, e, 1), n = vn(n, e, 1), e = rt(), n !== null && (Hr(n, 1, e), lt(n, e));
          break;
        }
      }
      n = n.return;
    }
  }
  function Ly(e, n, s) {
    var a = e.pingCache;
    a !== null && a.delete(n), n = rt(), e.pingedLanes |= e.suspendedLanes & s, He === e && (Ke & s) === s && (ze === 4 || ze === 3 && (Ke & 130023424) === Ke && 500 > Ie() - ol ? Vn(e, 0) : sl |= s), lt(e, n);
  }
  function wf(e, n) {
    n === 0 && ((e.mode & 1) === 0 ? n = 1 : (n = Ys, Ys <<= 1, (Ys & 130023424) === 0 && (Ys = 4194304)));
    var s = rt();
    e = Jt(e, n), e !== null && (Hr(e, n, s), lt(e, s));
  }
  function Oy(e) {
    var n = e.memoizedState, s = 0;
    n !== null && (s = n.retryLane), wf(e, s);
  }
  function My(e, n) {
    var s = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode, d = e.memoizedState;
        d !== null && (s = d.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(n), wf(e, s);
  }
  var bf;
  bf = function(e, n, s) {
    if (e !== null) if (e.memoizedProps !== n.pendingProps || st.current) it = !0;
    else {
      if ((e.lanes & s) === 0 && (n.flags & 128) === 0) return it = !1, ky(e, n, s);
      it = (e.flags & 131072) !== 0;
    }
    else it = !1, Te && (n.flags & 1048576) !== 0 && Ju(n, mo, n.index);
    switch (n.lanes = 0, n.tag) {
      case 2:
        var a = n.type;
        Ro(e, n), e = n.pendingProps;
        var d = hr(n, Xe.current);
        wr(n, s), d = Ia(null, n, a, e, d, s);
        var p = $a();
        return n.flags |= 1, typeof d == "object" && d !== null && typeof d.render == "function" && d.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, ot(a) ? (p = !0, fo(n)) : p = !1, n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, Ea(n), d.updater = Po, n.stateNode = d, d._reactInternals = n, Wa(n, a, e, s), n = Ga(null, n, a, !0, p, s)) : (n.tag = 0, Te && p && va(n), nt(null, n, d, s), n = n.child), n;
      case 16:
        a = n.elementType;
        e: {
          switch (Ro(e, n), e = n.pendingProps, d = a._init, a = d(a._payload), n.type = a, d = n.tag = $y(a), e = Tt(a, e), d) {
            case 0:
              n = Ya(null, n, a, e, s);
              break e;
            case 1:
              n = Yd(null, n, a, e, s);
              break e;
            case 11:
              n = zd(null, n, a, e, s);
              break e;
            case 14:
              n = Ud(null, n, a, Tt(a.type, e), s);
              break e;
          }
          throw Error(o(
            306,
            a,
            ""
          ));
        }
        return n;
      case 0:
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : Tt(a, d), Ya(e, n, a, d, s);
      case 1:
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : Tt(a, d), Yd(e, n, a, d, s);
      case 3:
        e: {
          if (Gd(n), e === null) throw Error(o(387));
          a = n.pendingProps, p = n.memoizedState, d = p.element, ld(e, n), bo(n, a, null, s);
          var x = n.memoizedState;
          if (a = x.element, p.isDehydrated) if (p = { element: a, isDehydrated: !1, cache: x.cache, pendingSuspenseBoundaries: x.pendingSuspenseBoundaries, transitions: x.transitions }, n.updateQueue.baseState = p, n.memoizedState = p, n.flags & 256) {
            d = kr(Error(o(423)), n), n = Qd(e, n, a, s, d);
            break e;
          } else if (a !== d) {
            d = kr(Error(o(424)), n), n = Qd(e, n, a, s, d);
            break e;
          } else for (ht = hn(n.stateNode.containerInfo.firstChild), pt = n, Te = !0, Rt = null, s = id(n, null, a, s), n.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (yr(), a === d) {
              n = tn(e, n, s);
              break e;
            }
            nt(e, n, a, s);
          }
          n = n.child;
        }
        return n;
      case 5:
        return dd(n), e === null && ka(n), a = n.type, d = n.pendingProps, p = e !== null ? e.memoizedProps : null, x = d.children, pa(a, d) ? x = null : p !== null && pa(a, p) && (n.flags |= 32), Vd(e, n), nt(e, n, x, s), n.child;
      case 6:
        return e === null && ka(n), null;
      case 13:
        return Kd(e, n, s);
      case 4:
        return Ra(n, n.stateNode.containerInfo), a = n.pendingProps, e === null ? n.child = xr(n, null, a, s) : nt(e, n, a, s), n.child;
      case 11:
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : Tt(a, d), zd(e, n, a, d, s);
      case 7:
        return nt(e, n, n.pendingProps, s), n.child;
      case 8:
        return nt(e, n, n.pendingProps.children, s), n.child;
      case 12:
        return nt(e, n, n.pendingProps.children, s), n.child;
      case 10:
        e: {
          if (a = n.type._context, d = n.pendingProps, p = n.memoizedProps, x = d.value, Ce(xo, a._currentValue), a._currentValue = x, p !== null) if (Et(p.value, x)) {
            if (p.children === d.children && !st.current) {
              n = tn(e, n, s);
              break e;
            }
          } else for (p = n.child, p !== null && (p.return = n); p !== null; ) {
            var N = p.dependencies;
            if (N !== null) {
              x = p.child;
              for (var R = N.firstContext; R !== null; ) {
                if (R.context === a) {
                  if (p.tag === 1) {
                    R = en(-1, s & -s), R.tag = 2;
                    var $ = p.updateQueue;
                    if ($ !== null) {
                      $ = $.shared;
                      var V = $.pending;
                      V === null ? R.next = R : (R.next = V.next, V.next = R), $.pending = R;
                    }
                  }
                  p.lanes |= s, R = p.alternate, R !== null && (R.lanes |= s), Ca(
                    p.return,
                    s,
                    n
                  ), N.lanes |= s;
                  break;
                }
                R = R.next;
              }
            } else if (p.tag === 10) x = p.type === n.type ? null : p.child;
            else if (p.tag === 18) {
              if (x = p.return, x === null) throw Error(o(341));
              x.lanes |= s, N = x.alternate, N !== null && (N.lanes |= s), Ca(x, s, n), x = p.sibling;
            } else x = p.child;
            if (x !== null) x.return = p;
            else for (x = p; x !== null; ) {
              if (x === n) {
                x = null;
                break;
              }
              if (p = x.sibling, p !== null) {
                p.return = x.return, x = p;
                break;
              }
              x = x.return;
            }
            p = x;
          }
          nt(e, n, d.children, s), n = n.child;
        }
        return n;
      case 9:
        return d = n.type, a = n.pendingProps.children, wr(n, s), d = jt(d), a = a(d), n.flags |= 1, nt(e, n, a, s), n.child;
      case 14:
        return a = n.type, d = Tt(a, n.pendingProps), d = Tt(a.type, d), Ud(e, n, a, d, s);
      case 15:
        return Wd(e, n, n.type, n.pendingProps, s);
      case 17:
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : Tt(a, d), Ro(e, n), n.tag = 1, ot(a) ? (e = !0, fo(n)) : e = !1, wr(n, s), Od(n, a, d), Wa(n, a, d, s), Ga(null, n, a, !0, e, s);
      case 19:
        return Xd(e, n, s);
      case 22:
        return Hd(e, n, s);
    }
    throw Error(o(156, n.tag));
  };
  function kf(e, n) {
    return eu(e, n);
  }
  function Iy(e, n, s, a) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, n, s, a) {
    return new Iy(e, n, s, a);
  }
  function pl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function $y(e) {
    if (typeof e == "function") return pl(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Q) return 11;
      if (e === ge) return 14;
    }
    return 2;
  }
  function Sn(e, n) {
    var s = e.alternate;
    return s === null ? (s = _t(e.tag, n, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = n, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, n = e.dependencies, s.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function zo(e, n, s, a, d, p) {
    var x = 2;
    if (a = e, typeof e == "function") pl(e) && (x = 1);
    else if (typeof e == "string") x = 5;
    else e: switch (e) {
      case Y:
        return Gn(s.children, d, p, n);
      case X:
        x = 8, d |= 8;
        break;
      case se:
        return e = _t(12, s, n, d | 2), e.elementType = se, e.lanes = p, e;
      case z:
        return e = _t(13, s, n, d), e.elementType = z, e.lanes = p, e;
      case Z:
        return e = _t(19, s, n, d), e.elementType = Z, e.lanes = p, e;
      case M:
        return Uo(s, d, p, n);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case ne:
            x = 10;
            break e;
          case ie:
            x = 9;
            break e;
          case Q:
            x = 11;
            break e;
          case ge:
            x = 14;
            break e;
          case fe:
            x = 16, a = null;
            break e;
        }
        throw Error(o(130, e == null ? e : typeof e, ""));
    }
    return n = _t(x, s, n, d), n.elementType = e, n.type = a, n.lanes = p, n;
  }
  function Gn(e, n, s, a) {
    return e = _t(7, e, a, n), e.lanes = s, e;
  }
  function Uo(e, n, s, a) {
    return e = _t(22, e, a, n), e.elementType = M, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function hl(e, n, s) {
    return e = _t(6, e, null, n), e.lanes = s, e;
  }
  function ml(e, n, s) {
    return n = _t(4, e.children !== null ? e.children : [], e.key, n), n.lanes = s, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
  }
  function Fy(e, n, s, a, d) {
    this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ui(0), this.expirationTimes = Ui(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ui(0), this.identifierPrefix = a, this.onRecoverableError = d, this.mutableSourceEagerHydrationData = null;
  }
  function gl(e, n, s, a, d, p, x, N, R) {
    return e = new Fy(e, n, s, N, R), n === 1 ? (n = 1, p === !0 && (n |= 8)) : n = 0, p = _t(3, null, null, n), e.current = p, p.stateNode = e, p.memoizedState = { element: a, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ea(p), e;
  }
  function Dy(e, n, s) {
    var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: H, key: a == null ? null : "" + a, children: e, containerInfo: n, implementation: s };
  }
  function jf(e) {
    if (!e) return gn;
    e = e._reactInternals;
    e: {
      if (Mn(e) !== e || e.tag !== 1) throw Error(o(170));
      var n = e;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (ot(n.type)) {
              n = n.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        n = n.return;
      } while (n !== null);
      throw Error(o(171));
    }
    if (e.tag === 1) {
      var s = e.type;
      if (ot(s)) return qu(e, s, n);
    }
    return n;
  }
  function Nf(e, n, s, a, d, p, x, N, R) {
    return e = gl(s, a, !0, e, d, p, x, N, R), e.context = jf(null), s = e.current, a = rt(), d = jn(s), p = en(a, d), p.callback = n ?? null, vn(s, p, d), e.current.lanes = d, Hr(e, d, a), lt(e, a), e;
  }
  function Wo(e, n, s, a) {
    var d = n.current, p = rt(), x = jn(d);
    return s = jf(s), n.context === null ? n.context = s : n.pendingContext = s, n = en(p, x), n.payload = { element: e }, a = a === void 0 ? null : a, a !== null && (n.callback = a), e = vn(d, n, x), e !== null && (Ot(e, d, x, p), wo(e, d, x)), x;
  }
  function Ho(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function Sf(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < n ? s : n;
    }
  }
  function yl(e, n) {
    Sf(e, n), (e = e.alternate) && Sf(e, n);
  }
  function By() {
    return null;
  }
  var _f = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function xl(e) {
    this._internalRoot = e;
  }
  Vo.prototype.render = xl.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(o(409));
    Wo(e, n, null, null);
  }, Vo.prototype.unmount = xl.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Hn(function() {
        Wo(null, e, null, null);
      }), n[Kt] = null;
    }
  };
  function Vo(e) {
    this._internalRoot = e;
  }
  Vo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = lu();
      e = { blockedOn: null, target: e, priority: n };
      for (var s = 0; s < dn.length && n !== 0 && n < dn[s].priority; s++) ;
      dn.splice(s, 0, e), s === 0 && du(e);
    }
  };
  function vl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Yo(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Cf() {
  }
  function zy(e, n, s, a, d) {
    if (d) {
      if (typeof a == "function") {
        var p = a;
        a = function() {
          var $ = Ho(x);
          p.call($);
        };
      }
      var x = Nf(n, a, e, 0, null, !1, !1, "", Cf);
      return e._reactRootContainer = x, e[Kt] = x.current, ss(e.nodeType === 8 ? e.parentNode : e), Hn(), x;
    }
    for (; d = e.lastChild; ) e.removeChild(d);
    if (typeof a == "function") {
      var N = a;
      a = function() {
        var $ = Ho(R);
        N.call($);
      };
    }
    var R = gl(e, 0, !1, null, null, !1, !1, "", Cf);
    return e._reactRootContainer = R, e[Kt] = R.current, ss(e.nodeType === 8 ? e.parentNode : e), Hn(function() {
      Wo(n, R, s, a);
    }), R;
  }
  function Go(e, n, s, a, d) {
    var p = s._reactRootContainer;
    if (p) {
      var x = p;
      if (typeof d == "function") {
        var N = d;
        d = function() {
          var R = Ho(x);
          N.call(R);
        };
      }
      Wo(n, x, e, d);
    } else x = zy(s, n, e, d, a);
    return Ho(x);
  }
  iu = function(e) {
    switch (e.tag) {
      case 3:
        var n = e.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var s = Wr(n.pendingLanes);
          s !== 0 && (Wi(n, s | 1), lt(n, Ie()), (ke & 6) === 0 && (Sr = Ie() + 500, yn()));
        }
        break;
      case 13:
        Hn(function() {
          var a = Jt(e, 1);
          if (a !== null) {
            var d = rt();
            Ot(a, e, 1, d);
          }
        }), yl(e, 1);
    }
  }, Hi = function(e) {
    if (e.tag === 13) {
      var n = Jt(e, 134217728);
      if (n !== null) {
        var s = rt();
        Ot(n, e, 134217728, s);
      }
      yl(e, 134217728);
    }
  }, au = function(e) {
    if (e.tag === 13) {
      var n = jn(e), s = Jt(e, n);
      if (s !== null) {
        var a = rt();
        Ot(s, e, n, a);
      }
      yl(e, n);
    }
  }, lu = function() {
    return Se;
  }, cu = function(e, n) {
    var s = Se;
    try {
      return Se = e, n();
    } finally {
      Se = s;
    }
  }, Ii = function(e, n, s) {
    switch (n) {
      case "input":
        if (Pi(e, s), n = s.name, s.type === "radio" && n != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < s.length; n++) {
            var a = s[n];
            if (a !== e && a.form === e.form) {
              var d = co(a);
              if (!d) throw Error(o(90));
              Ds(a), Pi(a, d);
            }
          }
        }
        break;
      case "textarea":
        Fc(e, s);
        break;
      case "select":
        n = s.value, n != null && nr(e, !!s.multiple, n, !1);
    }
  }, Gc = ul, Qc = Hn;
  var Uy = { usingClientEntryPoint: !1, Events: [as, fr, co, Vc, Yc, ul] }, bs = { findFiberByHostInstance: In, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Wy = { bundleType: bs.bundleType, version: bs.version, rendererPackageName: bs.rendererPackageName, rendererConfig: bs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: F.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Zc(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: bs.findFiberByHostInstance || By, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qo.isDisabled && Qo.supportsFiber) try {
      Hs = Qo.inject(Wy), Dt = Qo;
    } catch {
    }
  }
  return ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Uy, ct.createPortal = function(e, n) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!vl(n)) throw Error(o(200));
    return Dy(e, n, null, s);
  }, ct.createRoot = function(e, n) {
    if (!vl(e)) throw Error(o(299));
    var s = !1, a = "", d = _f;
    return n != null && (n.unstable_strictMode === !0 && (s = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onRecoverableError !== void 0 && (d = n.onRecoverableError)), n = gl(e, 1, !1, null, null, s, !1, a, d), e[Kt] = n.current, ss(e.nodeType === 8 ? e.parentNode : e), new xl(n);
  }, ct.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = Zc(n), e = e === null ? null : e.stateNode, e;
  }, ct.flushSync = function(e) {
    return Hn(e);
  }, ct.hydrate = function(e, n, s) {
    if (!Yo(n)) throw Error(o(200));
    return Go(null, e, n, !0, s);
  }, ct.hydrateRoot = function(e, n, s) {
    if (!vl(e)) throw Error(o(405));
    var a = s != null && s.hydratedSources || null, d = !1, p = "", x = _f;
    if (s != null && (s.unstable_strictMode === !0 && (d = !0), s.identifierPrefix !== void 0 && (p = s.identifierPrefix), s.onRecoverableError !== void 0 && (x = s.onRecoverableError)), n = Nf(n, null, e, 1, s ?? null, d, !1, p, x), e[Kt] = n.current, ss(e), a) for (e = 0; e < a.length; e++) s = a[e], d = s._getVersion, d = d(s._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [s, d] : n.mutableSourceEagerHydrationData.push(
      s,
      d
    );
    return new Vo(n);
  }, ct.render = function(e, n, s) {
    if (!Yo(n)) throw Error(o(200));
    return Go(null, e, n, !1, s);
  }, ct.unmountComponentAtNode = function(e) {
    if (!Yo(e)) throw Error(o(40));
    return e._reactRootContainer ? (Hn(function() {
      Go(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Kt] = null;
      });
    }), !0) : !1;
  }, ct.unstable_batchedUpdates = ul, ct.unstable_renderSubtreeIntoContainer = function(e, n, s, a) {
    if (!Yo(s)) throw Error(o(200));
    if (e == null || e._reactInternals === void 0) throw Error(o(38));
    return Go(e, n, s, !1, a);
  }, ct.version = "18.3.1-next-f1338f8080-20240426", ct;
}
var Mf;
function Op() {
  if (Mf) return kl.exports;
  Mf = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (r) {
        console.error(r);
      }
  }
  return t(), kl.exports = Zy(), kl.exports;
}
var If;
function Jy() {
  if (If) return Ko;
  If = 1;
  var t = Op();
  return Ko.createRoot = t.createRoot, Ko.hydrateRoot = t.hydrateRoot, Ko;
}
var ex = Jy(), As = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(t) {
    return this.listeners.add(t), this.onSubscribe(), () => {
      this.listeners.delete(t), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, tx = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (t, r) => setTimeout(t, r),
  clearTimeout: (t) => clearTimeout(t),
  setInterval: (t, r) => setInterval(t, r),
  clearInterval: (t) => clearInterval(t)
}, nx = class {
  // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
  // type at app boot; and if we leave that type, then any new timer provider
  // would need to support ReturnType<typeof setTimeout>, which is infeasible.
  //
  // We settle for type safety for the TimeoutProvider type, and accept that
  // this class is unsafe internally to allow for extension.
  #e = tx;
  #t = !1;
  setTimeoutProvider(t) {
    this.#e = t;
  }
  setTimeout(t, r) {
    return this.#e.setTimeout(t, r);
  }
  clearTimeout(t) {
    this.#e.clearTimeout(t);
  }
  setInterval(t, r) {
    return this.#e.setInterval(t, r);
  }
  clearInterval(t) {
    this.#e.clearInterval(t);
  }
}, Kn = new nx();
function rx(t) {
  setTimeout(t, 0);
}
var Xn = typeof window > "u" || "Deno" in globalThis;
function ut() {
}
function sx(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function Ml(t) {
  return typeof t == "number" && t >= 0 && t !== 1 / 0;
}
function Mp(t, r) {
  return Math.max(t + (r || 0) - Date.now(), 0);
}
function Tn(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function Ct(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function $f(t, r) {
  const {
    type: o = "all",
    exact: l,
    fetchStatus: c,
    predicate: u,
    queryKey: f,
    stale: h
  } = t;
  if (f) {
    if (l) {
      if (r.queryHash !== ec(f, r.options))
        return !1;
    } else if (!Es(r.queryKey, f))
      return !1;
  }
  if (o !== "all") {
    const m = r.isActive();
    if (o === "active" && !m || o === "inactive" && m)
      return !1;
  }
  return !(typeof h == "boolean" && r.isStale() !== h || c && c !== r.state.fetchStatus || u && !u(r));
}
function Ff(t, r) {
  const { exact: o, status: l, predicate: c, mutationKey: u } = t;
  if (u) {
    if (!r.options.mutationKey)
      return !1;
    if (o) {
      if (Ps(r.options.mutationKey) !== Ps(u))
        return !1;
    } else if (!Es(r.options.mutationKey, u))
      return !1;
  }
  return !(l && r.state.status !== l || c && !c(r));
}
function ec(t, r) {
  return (r?.queryKeyHashFn || Ps)(t);
}
function Ps(t) {
  return JSON.stringify(
    t,
    (r, o) => $l(o) ? Object.keys(o).sort().reduce((l, c) => (l[c] = o[c], l), {}) : o
  );
}
function Es(t, r) {
  return t === r ? !0 : typeof t != typeof r ? !1 : t && r && typeof t == "object" && typeof r == "object" ? Object.keys(r).every((o) => Es(t[o], r[o])) : !1;
}
var ox = Object.prototype.hasOwnProperty;
function Ip(t, r, o = 0) {
  if (t === r)
    return t;
  if (o > 500) return r;
  const l = Df(t) && Df(r);
  if (!l && !($l(t) && $l(r))) return r;
  const u = (l ? t : Object.keys(t)).length, f = l ? r : Object.keys(r), h = f.length, m = l ? new Array(h) : {};
  let y = 0;
  for (let g = 0; g < h; g++) {
    const v = l ? g : f[g], w = t[v], S = r[v];
    if (w === S) {
      m[v] = w, (l ? g < u : ox.call(t, v)) && y++;
      continue;
    }
    if (w === null || S === null || typeof w != "object" || typeof S != "object") {
      m[v] = S;
      continue;
    }
    const P = Ip(w, S, o + 1);
    m[v] = P, P === w && y++;
  }
  return u === h && y === u ? t : m;
}
function Il(t, r) {
  if (!r || Object.keys(t).length !== Object.keys(r).length)
    return !1;
  for (const o in t)
    if (t[o] !== r[o])
      return !1;
  return !0;
}
function Df(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function $l(t) {
  if (!Bf(t))
    return !1;
  const r = t.constructor;
  if (r === void 0)
    return !0;
  const o = r.prototype;
  return !(!Bf(o) || !o.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(t) !== Object.prototype);
}
function Bf(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function ix(t) {
  return new Promise((r) => {
    Kn.setTimeout(r, t);
  });
}
function Fl(t, r, o) {
  return typeof o.structuralSharing == "function" ? o.structuralSharing(t, r) : o.structuralSharing !== !1 ? Ip(t, r) : r;
}
function ax(t, r, o = 0) {
  const l = [...t, r];
  return o && l.length > o ? l.slice(1) : l;
}
function lx(t, r, o = 0) {
  const l = [r, ...t];
  return o && l.length > o ? l.slice(0, -1) : l;
}
var tc = /* @__PURE__ */ Symbol();
function $p(t, r) {
  return !t.queryFn && r?.initialPromise ? () => r.initialPromise : !t.queryFn || t.queryFn === tc ? () => Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)) : t.queryFn;
}
function Fp(t, r) {
  return typeof t == "function" ? t(...r) : !!t;
}
function cx(t, r, o) {
  let l = !1, c;
  return Object.defineProperty(t, "signal", {
    enumerable: !0,
    get: () => (c ??= r(), l || (l = !0, c.aborted ? o() : c.addEventListener("abort", o, { once: !0 })), c)
  }), t;
}
var ux = class extends As {
  #e;
  #t;
  #n;
  constructor() {
    super(), this.#n = (t) => {
      if (!Xn && window.addEventListener) {
        const r = () => t();
        return window.addEventListener("visibilitychange", r, !1), () => {
          window.removeEventListener("visibilitychange", r);
        };
      }
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#n);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  setEventListener(t) {
    this.#n = t, this.#t?.(), this.#t = t((r) => {
      typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
    });
  }
  setFocused(t) {
    this.#e !== t && (this.#e = t, this.onFocus());
  }
  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((r) => {
      r(t);
    });
  }
  isFocused() {
    return typeof this.#e == "boolean" ? this.#e : globalThis.document?.visibilityState !== "hidden";
  }
}, nc = new ux();
function Dl() {
  let t, r;
  const o = new Promise((c, u) => {
    t = c, r = u;
  });
  o.status = "pending", o.catch(() => {
  });
  function l(c) {
    Object.assign(o, c), delete o.resolve, delete o.reject;
  }
  return o.resolve = (c) => {
    l({
      status: "fulfilled",
      value: c
    }), t(c);
  }, o.reject = (c) => {
    l({
      status: "rejected",
      reason: c
    }), r(c);
  }, o;
}
var dx = rx;
function fx() {
  let t = [], r = 0, o = (h) => {
    h();
  }, l = (h) => {
    h();
  }, c = dx;
  const u = (h) => {
    r ? t.push(h) : c(() => {
      o(h);
    });
  }, f = () => {
    const h = t;
    t = [], h.length && c(() => {
      l(() => {
        h.forEach((m) => {
          o(m);
        });
      });
    });
  };
  return {
    batch: (h) => {
      let m;
      r++;
      try {
        m = h();
      } finally {
        r--, r || f();
      }
      return m;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (h) => (...m) => {
      u(() => {
        h(...m);
      });
    },
    schedule: u,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (h) => {
      o = h;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (h) => {
      l = h;
    },
    setScheduler: (h) => {
      c = h;
    }
  };
}
var qe = fx(), px = class extends As {
  #e = !0;
  #t;
  #n;
  constructor() {
    super(), this.#n = (t) => {
      if (!Xn && window.addEventListener) {
        const r = () => t(!0), o = () => t(!1);
        return window.addEventListener("online", r, !1), window.addEventListener("offline", o, !1), () => {
          window.removeEventListener("online", r), window.removeEventListener("offline", o);
        };
      }
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#n);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  setEventListener(t) {
    this.#n = t, this.#t?.(), this.#t = t(this.setOnline.bind(this));
  }
  setOnline(t) {
    this.#e !== t && (this.#e = t, this.listeners.forEach((o) => {
      o(t);
    }));
  }
  isOnline() {
    return this.#e;
  }
}, ii = new px();
function hx(t) {
  return Math.min(1e3 * 2 ** t, 3e4);
}
function Dp(t) {
  return (t ?? "online") === "online" ? ii.isOnline() : !0;
}
var Bl = class extends Error {
  constructor(t) {
    super("CancelledError"), this.revert = t?.revert, this.silent = t?.silent;
  }
};
function Bp(t) {
  let r = !1, o = 0, l;
  const c = Dl(), u = () => c.status !== "pending", f = (k) => {
    if (!u()) {
      const j = new Bl(k);
      w(j), t.onCancel?.(j);
    }
  }, h = () => {
    r = !0;
  }, m = () => {
    r = !1;
  }, y = () => nc.isFocused() && (t.networkMode === "always" || ii.isOnline()) && t.canRun(), g = () => Dp(t.networkMode) && t.canRun(), v = (k) => {
    u() || (l?.(), c.resolve(k));
  }, w = (k) => {
    u() || (l?.(), c.reject(k));
  }, S = () => new Promise((k) => {
    l = (j) => {
      (u() || y()) && k(j);
    }, t.onPause?.();
  }).then(() => {
    l = void 0, u() || t.onContinue?.();
  }), P = () => {
    if (u())
      return;
    let k;
    const j = o === 0 ? t.initialPromise : void 0;
    try {
      k = j ?? t.fn();
    } catch (A) {
      k = Promise.reject(A);
    }
    Promise.resolve(k).then(v).catch((A) => {
      if (u())
        return;
      const _ = t.retry ?? (Xn ? 0 : 3), C = t.retryDelay ?? hx, F = typeof C == "function" ? C(o, A) : C, U = _ === !0 || typeof _ == "number" && o < _ || typeof _ == "function" && _(o, A);
      if (r || !U) {
        w(A);
        return;
      }
      o++, t.onFail?.(o, A), ix(F).then(() => y() ? void 0 : S()).then(() => {
        r ? w(A) : P();
      });
    });
  };
  return {
    promise: c,
    status: () => c.status,
    cancel: f,
    continue: () => (l?.(), c),
    cancelRetry: h,
    continueRetry: m,
    canStart: g,
    start: () => (g() ? P() : S().then(P), c)
  };
}
var zp = class {
  #e;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), Ml(this.gcTime) && (this.#e = Kn.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(t) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      t ?? (Xn ? 1 / 0 : 300 * 1e3)
    );
  }
  clearGcTimeout() {
    this.#e && (Kn.clearTimeout(this.#e), this.#e = void 0);
  }
}, mx = class extends zp {
  #e;
  #t;
  #n;
  #s;
  #r;
  #a;
  #i;
  constructor(t) {
    super(), this.#i = !1, this.#a = t.defaultOptions, this.setOptions(t.options), this.observers = [], this.#s = t.client, this.#n = this.#s.getQueryCache(), this.queryKey = t.queryKey, this.queryHash = t.queryHash, this.#e = Uf(this.options), this.state = t.state ?? this.#e, this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#r?.promise;
  }
  setOptions(t) {
    if (this.options = { ...this.#a, ...t }, this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const r = Uf(this.options);
      r.data !== void 0 && (this.setState(
        zf(r.data, r.dataUpdatedAt)
      ), this.#e = r);
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && this.#n.remove(this);
  }
  setData(t, r) {
    const o = Fl(this.state.data, t, this.options);
    return this.#o({
      data: o,
      type: "success",
      dataUpdatedAt: r?.updatedAt,
      manual: r?.manual
    }), o;
  }
  setState(t, r) {
    this.#o({ type: "setState", state: t, setStateOptions: r });
  }
  cancel(t) {
    const r = this.#r?.promise;
    return this.#r?.cancel(t), r ? r.then(ut).catch(ut) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(this.#e);
  }
  isActive() {
    return this.observers.some(
      (t) => Ct(t.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === tc || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => Tn(t.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => t.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(t = 0) {
    return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !Mp(this.state.dataUpdatedAt, t);
  }
  onFocus() {
    this.observers.find((r) => r.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#r?.continue();
  }
  onOnline() {
    this.observers.find((r) => r.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#r?.continue();
  }
  addObserver(t) {
    this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), this.#n.notify({ type: "observerAdded", query: this, observer: t }));
  }
  removeObserver(t) {
    this.observers.includes(t) && (this.observers = this.observers.filter((r) => r !== t), this.observers.length || (this.#r && (this.#i ? this.#r.cancel({ revert: !0 }) : this.#r.cancelRetry()), this.scheduleGc()), this.#n.notify({ type: "observerRemoved", query: this, observer: t }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || this.#o({ type: "invalidate" });
  }
  async fetch(t, r) {
    if (this.state.fetchStatus !== "idle" && // If the promise in the retryer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    this.#r?.status() !== "rejected") {
      if (this.state.data !== void 0 && r?.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.#r)
        return this.#r.continueRetry(), this.#r.promise;
    }
    if (t && this.setOptions(t), !this.options.queryFn) {
      const h = this.observers.find((m) => m.options.queryFn);
      h && this.setOptions(h.options);
    }
    const o = new AbortController(), l = (h) => {
      Object.defineProperty(h, "signal", {
        enumerable: !0,
        get: () => (this.#i = !0, o.signal)
      });
    }, c = () => {
      const h = $p(this.options, r), y = (() => {
        const g = {
          client: this.#s,
          queryKey: this.queryKey,
          meta: this.meta
        };
        return l(g), g;
      })();
      return this.#i = !1, this.options.persister ? this.options.persister(
        h,
        y,
        this
      ) : h(y);
    }, f = (() => {
      const h = {
        fetchOptions: r,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#s,
        state: this.state,
        fetchFn: c
      };
      return l(h), h;
    })();
    this.options.behavior?.onFetch(f, this), this.#t = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== f.fetchOptions?.meta) && this.#o({ type: "fetch", meta: f.fetchOptions?.meta }), this.#r = Bp({
      initialPromise: r?.initialPromise,
      fn: f.fetchFn,
      onCancel: (h) => {
        h instanceof Bl && h.revert && this.setState({
          ...this.#t,
          fetchStatus: "idle"
        }), o.abort();
      },
      onFail: (h, m) => {
        this.#o({ type: "failed", failureCount: h, error: m });
      },
      onPause: () => {
        this.#o({ type: "pause" });
      },
      onContinue: () => {
        this.#o({ type: "continue" });
      },
      retry: f.options.retry,
      retryDelay: f.options.retryDelay,
      networkMode: f.options.networkMode,
      canRun: () => !0
    });
    try {
      const h = await this.#r.start();
      if (h === void 0)
        throw new Error(`${this.queryHash} data is undefined`);
      return this.setData(h), this.#n.config.onSuccess?.(h, this), this.#n.config.onSettled?.(
        h,
        this.state.error,
        this
      ), h;
    } catch (h) {
      if (h instanceof Bl) {
        if (h.silent)
          return this.#r.promise;
        if (h.revert) {
          if (this.state.data === void 0)
            throw h;
          return this.state.data;
        }
      }
      throw this.#o({
        type: "error",
        error: h
      }), this.#n.config.onError?.(
        h,
        this
      ), this.#n.config.onSettled?.(
        this.state.data,
        h,
        this
      ), h;
    } finally {
      this.scheduleGc();
    }
  }
  #o(t) {
    const r = (o) => {
      switch (t.type) {
        case "failed":
          return {
            ...o,
            fetchFailureCount: t.failureCount,
            fetchFailureReason: t.error
          };
        case "pause":
          return {
            ...o,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...o,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...o,
            ...Up(o.data, this.options),
            fetchMeta: t.meta ?? null
          };
        case "success":
          const l = {
            ...o,
            ...zf(t.data, t.dataUpdatedAt),
            dataUpdateCount: o.dataUpdateCount + 1,
            ...!t.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          return this.#t = t.manual ? l : void 0, l;
        case "error":
          const c = t.error;
          return {
            ...o,
            error: c,
            errorUpdateCount: o.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: o.fetchFailureCount + 1,
            fetchFailureReason: c,
            fetchStatus: "idle",
            status: "error",
            // flag existing data as invalidated if we get a background error
            // note that "no data" always means stale so we can set unconditionally here
            isInvalidated: !0
          };
        case "invalidate":
          return {
            ...o,
            isInvalidated: !0
          };
        case "setState":
          return {
            ...o,
            ...t.state
          };
      }
    };
    this.state = r(this.state), qe.batch(() => {
      this.observers.forEach((o) => {
        o.onQueryUpdate();
      }), this.#n.notify({ query: this, type: "updated", action: t });
    });
  }
};
function Up(t, r) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Dp(r.networkMode) ? "fetching" : "paused",
    ...t === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function zf(t, r) {
  return {
    data: t,
    dataUpdatedAt: r ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function Uf(t) {
  const r = typeof t.initialData == "function" ? t.initialData() : t.initialData, o = r !== void 0, l = o ? typeof t.initialDataUpdatedAt == "function" ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt : 0;
  return {
    data: r,
    dataUpdateCount: 0,
    dataUpdatedAt: o ? l ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: o ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var gx = class extends As {
  constructor(t, r) {
    super(), this.options = r, this.#e = t, this.#o = null, this.#i = Dl(), this.bindMethods(), this.setOptions(r);
  }
  #e;
  #t = void 0;
  #n = void 0;
  #s = void 0;
  #r;
  #a;
  #i;
  #o;
  #m;
  #f;
  // This property keeps track of the last query with defined data.
  // It will be used to pass the previous data and query to the placeholder function between renders.
  #p;
  #c;
  #u;
  #l;
  #h = /* @__PURE__ */ new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (this.#t.addObserver(this), Wf(this.#t, this.options) ? this.#d() : this.updateResult(), this.#v());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return zl(
      this.#t,
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return zl(
      this.#t,
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), this.#w(), this.#b(), this.#t.removeObserver(this);
  }
  setOptions(t) {
    const r = this.options, o = this.#t;
    if (this.options = this.#e.defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Ct(this.options.enabled, this.#t) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    this.#k(), this.#t.setOptions(this.options), r._defaulted && !Il(this.options, r) && this.#e.getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: this.#t,
      observer: this
    });
    const l = this.hasListeners();
    l && Hf(
      this.#t,
      o,
      this.options,
      r
    ) && this.#d(), this.updateResult(), l && (this.#t !== o || Ct(this.options.enabled, this.#t) !== Ct(r.enabled, this.#t) || Tn(this.options.staleTime, this.#t) !== Tn(r.staleTime, this.#t)) && this.#g();
    const c = this.#y();
    l && (this.#t !== o || Ct(this.options.enabled, this.#t) !== Ct(r.enabled, this.#t) || c !== this.#l) && this.#x(c);
  }
  getOptimisticResult(t) {
    const r = this.#e.getQueryCache().build(this.#e, t), o = this.createResult(r, t);
    return xx(this, o) && (this.#s = o, this.#a = this.options, this.#r = this.#t.state), o;
  }
  getCurrentResult() {
    return this.#s;
  }
  trackResult(t, r) {
    return new Proxy(t, {
      get: (o, l) => (this.trackProp(l), r?.(l), l === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && this.#i.status === "pending" && this.#i.reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(o, l))
    });
  }
  trackProp(t) {
    this.#h.add(t);
  }
  getCurrentQuery() {
    return this.#t;
  }
  refetch({ ...t } = {}) {
    return this.fetch({
      ...t
    });
  }
  fetchOptimistic(t) {
    const r = this.#e.defaultQueryOptions(t), o = this.#e.getQueryCache().build(this.#e, r);
    return o.fetch().then(() => this.createResult(o, r));
  }
  fetch(t) {
    return this.#d({
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), this.#s));
  }
  #d(t) {
    this.#k();
    let r = this.#t.fetch(
      this.options,
      t
    );
    return t?.throwOnError || (r = r.catch(ut)), r;
  }
  #g() {
    this.#w();
    const t = Tn(
      this.options.staleTime,
      this.#t
    );
    if (Xn || this.#s.isStale || !Ml(t))
      return;
    const o = Mp(this.#s.dataUpdatedAt, t) + 1;
    this.#c = Kn.setTimeout(() => {
      this.#s.isStale || this.updateResult();
    }, o);
  }
  #y() {
    return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(this.#t) : this.options.refetchInterval) ?? !1;
  }
  #x(t) {
    this.#b(), this.#l = t, !(Xn || Ct(this.options.enabled, this.#t) === !1 || !Ml(this.#l) || this.#l === 0) && (this.#u = Kn.setInterval(() => {
      (this.options.refetchIntervalInBackground || nc.isFocused()) && this.#d();
    }, this.#l));
  }
  #v() {
    this.#g(), this.#x(this.#y());
  }
  #w() {
    this.#c && (Kn.clearTimeout(this.#c), this.#c = void 0);
  }
  #b() {
    this.#u && (Kn.clearInterval(this.#u), this.#u = void 0);
  }
  createResult(t, r) {
    const o = this.#t, l = this.options, c = this.#s, u = this.#r, f = this.#a, m = t !== o ? t.state : this.#n, { state: y } = t;
    let g = { ...y }, v = !1, w;
    if (r._optimisticResults) {
      const X = this.hasListeners(), se = !X && Wf(t, r), ne = X && Hf(t, o, r, l);
      (se || ne) && (g = {
        ...g,
        ...Up(y.data, t.options)
      }), r._optimisticResults === "isRestoring" && (g.fetchStatus = "idle");
    }
    let { error: S, errorUpdatedAt: P, status: k } = g;
    w = g.data;
    let j = !1;
    if (r.placeholderData !== void 0 && w === void 0 && k === "pending") {
      let X;
      c?.isPlaceholderData && r.placeholderData === f?.placeholderData ? (X = c.data, j = !0) : X = typeof r.placeholderData == "function" ? r.placeholderData(
        this.#p?.state.data,
        this.#p
      ) : r.placeholderData, X !== void 0 && (k = "success", w = Fl(
        c?.data,
        X,
        r
      ), v = !0);
    }
    if (r.select && w !== void 0 && !j)
      if (c && w === u?.data && r.select === this.#m)
        w = this.#f;
      else
        try {
          this.#m = r.select, w = r.select(w), w = Fl(c?.data, w, r), this.#f = w, this.#o = null;
        } catch (X) {
          this.#o = X;
        }
    this.#o && (S = this.#o, w = this.#f, P = Date.now(), k = "error");
    const A = g.fetchStatus === "fetching", _ = k === "pending", C = k === "error", F = _ && A, U = w !== void 0, Y = {
      status: k,
      fetchStatus: g.fetchStatus,
      isPending: _,
      isSuccess: k === "success",
      isError: C,
      isInitialLoading: F,
      isLoading: F,
      data: w,
      dataUpdatedAt: g.dataUpdatedAt,
      error: S,
      errorUpdatedAt: P,
      failureCount: g.fetchFailureCount,
      failureReason: g.fetchFailureReason,
      errorUpdateCount: g.errorUpdateCount,
      isFetched: g.dataUpdateCount > 0 || g.errorUpdateCount > 0,
      isFetchedAfterMount: g.dataUpdateCount > m.dataUpdateCount || g.errorUpdateCount > m.errorUpdateCount,
      isFetching: A,
      isRefetching: A && !_,
      isLoadingError: C && !U,
      isPaused: g.fetchStatus === "paused",
      isPlaceholderData: v,
      isRefetchError: C && U,
      isStale: rc(t, r),
      refetch: this.refetch,
      promise: this.#i,
      isEnabled: Ct(r.enabled, t) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const X = Y.data !== void 0, se = Y.status === "error" && !X, ne = (z) => {
        se ? z.reject(Y.error) : X && z.resolve(Y.data);
      }, ie = () => {
        const z = this.#i = Y.promise = Dl();
        ne(z);
      }, Q = this.#i;
      switch (Q.status) {
        case "pending":
          t.queryHash === o.queryHash && ne(Q);
          break;
        case "fulfilled":
          (se || Y.data !== Q.value) && ie();
          break;
        case "rejected":
          (!se || Y.error !== Q.reason) && ie();
          break;
      }
    }
    return Y;
  }
  updateResult() {
    const t = this.#s, r = this.createResult(this.#t, this.options);
    if (this.#r = this.#t.state, this.#a = this.options, this.#r.data !== void 0 && (this.#p = this.#t), Il(r, t))
      return;
    this.#s = r;
    const o = () => {
      if (!t)
        return !0;
      const { notifyOnChangeProps: l } = this.options, c = typeof l == "function" ? l() : l;
      if (c === "all" || !c && !this.#h.size)
        return !0;
      const u = new Set(
        c ?? this.#h
      );
      return this.options.throwOnError && u.add("error"), Object.keys(this.#s).some((f) => {
        const h = f;
        return this.#s[h] !== t[h] && u.has(h);
      });
    };
    this.#j({ listeners: o() });
  }
  #k() {
    const t = this.#e.getQueryCache().build(this.#e, this.options);
    if (t === this.#t)
      return;
    const r = this.#t;
    this.#t = t, this.#n = t.state, this.hasListeners() && (r?.removeObserver(this), t.addObserver(this));
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && this.#v();
  }
  #j(t) {
    qe.batch(() => {
      t.listeners && this.listeners.forEach((r) => {
        r(this.#s);
      }), this.#e.getQueryCache().notify({
        query: this.#t,
        type: "observerResultsUpdated"
      });
    });
  }
};
function yx(t, r) {
  return Ct(r.enabled, t) !== !1 && t.state.data === void 0 && !(t.state.status === "error" && r.retryOnMount === !1);
}
function Wf(t, r) {
  return yx(t, r) || t.state.data !== void 0 && zl(t, r, r.refetchOnMount);
}
function zl(t, r, o) {
  if (Ct(r.enabled, t) !== !1 && Tn(r.staleTime, t) !== "static") {
    const l = typeof o == "function" ? o(t) : o;
    return l === "always" || l !== !1 && rc(t, r);
  }
  return !1;
}
function Hf(t, r, o, l) {
  return (t !== r || Ct(l.enabled, t) === !1) && (!o.suspense || t.state.status !== "error") && rc(t, o);
}
function rc(t, r) {
  return Ct(r.enabled, t) !== !1 && t.isStaleByTime(Tn(r.staleTime, t));
}
function xx(t, r) {
  return !Il(t.getCurrentResult(), r);
}
function Vf(t) {
  return {
    onFetch: (r, o) => {
      const l = r.options, c = r.fetchOptions?.meta?.fetchMore?.direction, u = r.state.data?.pages || [], f = r.state.data?.pageParams || [];
      let h = { pages: [], pageParams: [] }, m = 0;
      const y = async () => {
        let g = !1;
        const v = (P) => {
          cx(
            P,
            () => r.signal,
            () => g = !0
          );
        }, w = $p(r.options, r.fetchOptions), S = async (P, k, j) => {
          if (g)
            return Promise.reject();
          if (k == null && P.pages.length)
            return Promise.resolve(P);
          const _ = (() => {
            const H = {
              client: r.client,
              queryKey: r.queryKey,
              pageParam: k,
              direction: j ? "backward" : "forward",
              meta: r.options.meta
            };
            return v(H), H;
          })(), C = await w(_), { maxPages: F } = r.options, U = j ? lx : ax;
          return {
            pages: U(P.pages, C, F),
            pageParams: U(P.pageParams, k, F)
          };
        };
        if (c && u.length) {
          const P = c === "backward", k = P ? vx : Yf, j = {
            pages: u,
            pageParams: f
          }, A = k(l, j);
          h = await S(j, A, P);
        } else {
          const P = t ?? u.length;
          do {
            const k = m === 0 ? f[0] ?? l.initialPageParam : Yf(l, h);
            if (m > 0 && k == null)
              break;
            h = await S(h, k), m++;
          } while (m < P);
        }
        return h;
      };
      r.options.persister ? r.fetchFn = () => r.options.persister?.(
        y,
        {
          client: r.client,
          queryKey: r.queryKey,
          meta: r.options.meta,
          signal: r.signal
        },
        o
      ) : r.fetchFn = y;
    }
  };
}
function Yf(t, { pages: r, pageParams: o }) {
  const l = r.length - 1;
  return r.length > 0 ? t.getNextPageParam(
    r[l],
    r,
    o[l],
    o
  ) : void 0;
}
function vx(t, { pages: r, pageParams: o }) {
  return r.length > 0 ? t.getPreviousPageParam?.(r[0], r, o[0], o) : void 0;
}
var wx = class extends zp {
  #e;
  #t;
  #n;
  #s;
  constructor(t) {
    super(), this.#e = t.client, this.mutationId = t.mutationId, this.#n = t.mutationCache, this.#t = [], this.state = t.state || bx(), this.setOptions(t.options), this.scheduleGc();
  }
  setOptions(t) {
    this.options = t, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(t) {
    this.#t.includes(t) || (this.#t.push(t), this.clearGcTimeout(), this.#n.notify({
      type: "observerAdded",
      mutation: this,
      observer: t
    }));
  }
  removeObserver(t) {
    this.#t = this.#t.filter((r) => r !== t), this.scheduleGc(), this.#n.notify({
      type: "observerRemoved",
      mutation: this,
      observer: t
    });
  }
  optionalRemove() {
    this.#t.length || (this.state.status === "pending" ? this.scheduleGc() : this.#n.remove(this));
  }
  continue() {
    return this.#s?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(t) {
    const r = () => {
      this.#r({ type: "continue" });
    }, o = {
      client: this.#e,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    this.#s = Bp({
      fn: () => this.options.mutationFn ? this.options.mutationFn(t, o) : Promise.reject(new Error("No mutationFn found")),
      onFail: (u, f) => {
        this.#r({ type: "failed", failureCount: u, error: f });
      },
      onPause: () => {
        this.#r({ type: "pause" });
      },
      onContinue: r,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#n.canRun(this)
    });
    const l = this.state.status === "pending", c = !this.#s.canStart();
    try {
      if (l)
        r();
      else {
        this.#r({ type: "pending", variables: t, isPaused: c }), this.#n.config.onMutate && await this.#n.config.onMutate(
          t,
          this,
          o
        );
        const f = await this.options.onMutate?.(
          t,
          o
        );
        f !== this.state.context && this.#r({
          type: "pending",
          context: f,
          variables: t,
          isPaused: c
        });
      }
      const u = await this.#s.start();
      return await this.#n.config.onSuccess?.(
        u,
        t,
        this.state.context,
        this,
        o
      ), await this.options.onSuccess?.(
        u,
        t,
        this.state.context,
        o
      ), await this.#n.config.onSettled?.(
        u,
        null,
        this.state.variables,
        this.state.context,
        this,
        o
      ), await this.options.onSettled?.(
        u,
        null,
        t,
        this.state.context,
        o
      ), this.#r({ type: "success", data: u }), u;
    } catch (u) {
      try {
        await this.#n.config.onError?.(
          u,
          t,
          this.state.context,
          this,
          o
        );
      } catch (f) {
        Promise.reject(f);
      }
      try {
        await this.options.onError?.(
          u,
          t,
          this.state.context,
          o
        );
      } catch (f) {
        Promise.reject(f);
      }
      try {
        await this.#n.config.onSettled?.(
          void 0,
          u,
          this.state.variables,
          this.state.context,
          this,
          o
        );
      } catch (f) {
        Promise.reject(f);
      }
      try {
        await this.options.onSettled?.(
          void 0,
          u,
          t,
          this.state.context,
          o
        );
      } catch (f) {
        Promise.reject(f);
      }
      throw this.#r({ type: "error", error: u }), u;
    } finally {
      this.#n.runNext(this);
    }
  }
  #r(t) {
    const r = (o) => {
      switch (t.type) {
        case "failed":
          return {
            ...o,
            failureCount: t.failureCount,
            failureReason: t.error
          };
        case "pause":
          return {
            ...o,
            isPaused: !0
          };
        case "continue":
          return {
            ...o,
            isPaused: !1
          };
        case "pending":
          return {
            ...o,
            context: t.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: t.isPaused,
            status: "pending",
            variables: t.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...o,
            data: t.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1
          };
        case "error":
          return {
            ...o,
            data: void 0,
            error: t.error,
            failureCount: o.failureCount + 1,
            failureReason: t.error,
            isPaused: !1,
            status: "error"
          };
      }
    };
    this.state = r(this.state), qe.batch(() => {
      this.#t.forEach((o) => {
        o.onMutationUpdate(t);
      }), this.#n.notify({
        mutation: this,
        type: "updated",
        action: t
      });
    });
  }
};
function bx() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var kx = class extends As {
  constructor(t = {}) {
    super(), this.config = t, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
  }
  #e;
  #t;
  #n;
  build(t, r, o) {
    const l = new wx({
      client: t,
      mutationCache: this,
      mutationId: ++this.#n,
      options: t.defaultMutationOptions(r),
      state: o
    });
    return this.add(l), l;
  }
  add(t) {
    this.#e.add(t);
    const r = qo(t);
    if (typeof r == "string") {
      const o = this.#t.get(r);
      o ? o.push(t) : this.#t.set(r, [t]);
    }
    this.notify({ type: "added", mutation: t });
  }
  remove(t) {
    if (this.#e.delete(t)) {
      const r = qo(t);
      if (typeof r == "string") {
        const o = this.#t.get(r);
        if (o)
          if (o.length > 1) {
            const l = o.indexOf(t);
            l !== -1 && o.splice(l, 1);
          } else o[0] === t && this.#t.delete(r);
      }
    }
    this.notify({ type: "removed", mutation: t });
  }
  canRun(t) {
    const r = qo(t);
    if (typeof r == "string") {
      const l = this.#t.get(r)?.find(
        (c) => c.state.status === "pending"
      );
      return !l || l === t;
    } else
      return !0;
  }
  runNext(t) {
    const r = qo(t);
    return typeof r == "string" ? this.#t.get(r)?.find((l) => l !== t && l.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve();
  }
  clear() {
    qe.batch(() => {
      this.#e.forEach((t) => {
        this.notify({ type: "removed", mutation: t });
      }), this.#e.clear(), this.#t.clear();
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(t) {
    const r = { exact: !0, ...t };
    return this.getAll().find(
      (o) => Ff(r, o)
    );
  }
  findAll(t = {}) {
    return this.getAll().filter((r) => Ff(t, r));
  }
  notify(t) {
    qe.batch(() => {
      this.listeners.forEach((r) => {
        r(t);
      });
    });
  }
  resumePausedMutations() {
    const t = this.getAll().filter((r) => r.state.isPaused);
    return qe.batch(
      () => Promise.all(
        t.map((r) => r.continue().catch(ut))
      )
    );
  }
};
function qo(t) {
  return t.options.scope?.id;
}
var jx = class extends As {
  constructor(t = {}) {
    super(), this.config = t, this.#e = /* @__PURE__ */ new Map();
  }
  #e;
  build(t, r, o) {
    const l = r.queryKey, c = r.queryHash ?? ec(l, r);
    let u = this.get(c);
    return u || (u = new mx({
      client: t,
      queryKey: l,
      queryHash: c,
      options: t.defaultQueryOptions(r),
      state: o,
      defaultOptions: t.getQueryDefaults(l)
    }), this.add(u)), u;
  }
  add(t) {
    this.#e.has(t.queryHash) || (this.#e.set(t.queryHash, t), this.notify({
      type: "added",
      query: t
    }));
  }
  remove(t) {
    const r = this.#e.get(t.queryHash);
    r && (t.destroy(), r === t && this.#e.delete(t.queryHash), this.notify({ type: "removed", query: t }));
  }
  clear() {
    qe.batch(() => {
      this.getAll().forEach((t) => {
        this.remove(t);
      });
    });
  }
  get(t) {
    return this.#e.get(t);
  }
  getAll() {
    return [...this.#e.values()];
  }
  find(t) {
    const r = { exact: !0, ...t };
    return this.getAll().find(
      (o) => $f(r, o)
    );
  }
  findAll(t = {}) {
    const r = this.getAll();
    return Object.keys(t).length > 0 ? r.filter((o) => $f(t, o)) : r;
  }
  notify(t) {
    qe.batch(() => {
      this.listeners.forEach((r) => {
        r(t);
      });
    });
  }
  onFocus() {
    qe.batch(() => {
      this.getAll().forEach((t) => {
        t.onFocus();
      });
    });
  }
  onOnline() {
    qe.batch(() => {
      this.getAll().forEach((t) => {
        t.onOnline();
      });
    });
  }
}, Nx = class {
  #e;
  #t;
  #n;
  #s;
  #r;
  #a;
  #i;
  #o;
  constructor(t = {}) {
    this.#e = t.queryCache || new jx(), this.#t = t.mutationCache || new kx(), this.#n = t.defaultOptions || {}, this.#s = /* @__PURE__ */ new Map(), this.#r = /* @__PURE__ */ new Map(), this.#a = 0;
  }
  mount() {
    this.#a++, this.#a === 1 && (this.#i = nc.subscribe(async (t) => {
      t && (await this.resumePausedMutations(), this.#e.onFocus());
    }), this.#o = ii.subscribe(async (t) => {
      t && (await this.resumePausedMutations(), this.#e.onOnline());
    }));
  }
  unmount() {
    this.#a--, this.#a === 0 && (this.#i?.(), this.#i = void 0, this.#o?.(), this.#o = void 0);
  }
  isFetching(t) {
    return this.#e.findAll({ ...t, fetchStatus: "fetching" }).length;
  }
  isMutating(t) {
    return this.#t.findAll({ ...t, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(t) {
    const r = this.defaultQueryOptions({ queryKey: t });
    return this.#e.get(r.queryHash)?.state.data;
  }
  ensureQueryData(t) {
    const r = this.defaultQueryOptions(t), o = this.#e.build(this, r), l = o.state.data;
    return l === void 0 ? this.fetchQuery(t) : (t.revalidateIfStale && o.isStaleByTime(Tn(r.staleTime, o)) && this.prefetchQuery(r), Promise.resolve(l));
  }
  getQueriesData(t) {
    return this.#e.findAll(t).map(({ queryKey: r, state: o }) => {
      const l = o.data;
      return [r, l];
    });
  }
  setQueryData(t, r, o) {
    const l = this.defaultQueryOptions({ queryKey: t }), u = this.#e.get(
      l.queryHash
    )?.state.data, f = sx(r, u);
    if (f !== void 0)
      return this.#e.build(this, l).setData(f, { ...o, manual: !0 });
  }
  setQueriesData(t, r, o) {
    return qe.batch(
      () => this.#e.findAll(t).map(({ queryKey: l }) => [
        l,
        this.setQueryData(l, r, o)
      ])
    );
  }
  getQueryState(t) {
    const r = this.defaultQueryOptions({ queryKey: t });
    return this.#e.get(
      r.queryHash
    )?.state;
  }
  removeQueries(t) {
    const r = this.#e;
    qe.batch(() => {
      r.findAll(t).forEach((o) => {
        r.remove(o);
      });
    });
  }
  resetQueries(t, r) {
    const o = this.#e;
    return qe.batch(() => (o.findAll(t).forEach((l) => {
      l.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...t
      },
      r
    )));
  }
  cancelQueries(t, r = {}) {
    const o = { revert: !0, ...r }, l = qe.batch(
      () => this.#e.findAll(t).map((c) => c.cancel(o))
    );
    return Promise.all(l).then(ut).catch(ut);
  }
  invalidateQueries(t, r = {}) {
    return qe.batch(() => (this.#e.findAll(t).forEach((o) => {
      o.invalidate();
    }), t?.refetchType === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...t,
        type: t?.refetchType ?? t?.type ?? "active"
      },
      r
    )));
  }
  refetchQueries(t, r = {}) {
    const o = {
      ...r,
      cancelRefetch: r.cancelRefetch ?? !0
    }, l = qe.batch(
      () => this.#e.findAll(t).filter((c) => !c.isDisabled() && !c.isStatic()).map((c) => {
        let u = c.fetch(void 0, o);
        return o.throwOnError || (u = u.catch(ut)), c.state.fetchStatus === "paused" ? Promise.resolve() : u;
      })
    );
    return Promise.all(l).then(ut);
  }
  fetchQuery(t) {
    const r = this.defaultQueryOptions(t);
    r.retry === void 0 && (r.retry = !1);
    const o = this.#e.build(this, r);
    return o.isStaleByTime(
      Tn(r.staleTime, o)
    ) ? o.fetch(r) : Promise.resolve(o.state.data);
  }
  prefetchQuery(t) {
    return this.fetchQuery(t).then(ut).catch(ut);
  }
  fetchInfiniteQuery(t) {
    return t.behavior = Vf(t.pages), this.fetchQuery(t);
  }
  prefetchInfiniteQuery(t) {
    return this.fetchInfiniteQuery(t).then(ut).catch(ut);
  }
  ensureInfiniteQueryData(t) {
    return t.behavior = Vf(t.pages), this.ensureQueryData(t);
  }
  resumePausedMutations() {
    return ii.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return this.#e;
  }
  getMutationCache() {
    return this.#t;
  }
  getDefaultOptions() {
    return this.#n;
  }
  setDefaultOptions(t) {
    this.#n = t;
  }
  setQueryDefaults(t, r) {
    this.#s.set(Ps(t), {
      queryKey: t,
      defaultOptions: r
    });
  }
  getQueryDefaults(t) {
    const r = [...this.#s.values()], o = {};
    return r.forEach((l) => {
      Es(t, l.queryKey) && Object.assign(o, l.defaultOptions);
    }), o;
  }
  setMutationDefaults(t, r) {
    this.#r.set(Ps(t), {
      mutationKey: t,
      defaultOptions: r
    });
  }
  getMutationDefaults(t) {
    const r = [...this.#r.values()], o = {};
    return r.forEach((l) => {
      Es(t, l.mutationKey) && Object.assign(o, l.defaultOptions);
    }), o;
  }
  defaultQueryOptions(t) {
    if (t._defaulted)
      return t;
    const r = {
      ...this.#n.queries,
      ...this.getQueryDefaults(t.queryKey),
      ...t,
      _defaulted: !0
    };
    return r.queryHash || (r.queryHash = ec(
      r.queryKey,
      r
    )), r.refetchOnReconnect === void 0 && (r.refetchOnReconnect = r.networkMode !== "always"), r.throwOnError === void 0 && (r.throwOnError = !!r.suspense), !r.networkMode && r.persister && (r.networkMode = "offlineFirst"), r.queryFn === tc && (r.enabled = !1), r;
  }
  defaultMutationOptions(t) {
    return t?._defaulted ? t : {
      ...this.#n.mutations,
      ...t?.mutationKey && this.getMutationDefaults(t.mutationKey),
      ...t,
      _defaulted: !0
    };
  }
  clear() {
    this.#e.clear(), this.#t.clear();
  }
}, b = gi();
const En = /* @__PURE__ */ Yy(b), yi = /* @__PURE__ */ Vy({
  __proto__: null,
  default: En
}, [b]);
var Wp = b.createContext(
  void 0
), Sx = (t) => {
  const r = b.useContext(Wp);
  if (!r)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return r;
}, _x = ({
  client: t,
  children: r
}) => (b.useEffect(() => (t.mount(), () => {
  t.unmount();
}), [t]), /* @__PURE__ */ i.jsx(Wp.Provider, { value: t, children: r })), Hp = b.createContext(!1), Cx = () => b.useContext(Hp);
Hp.Provider;
function Px() {
  let t = !1;
  return {
    clearReset: () => {
      t = !1;
    },
    reset: () => {
      t = !0;
    },
    isReset: () => t
  };
}
var Ex = b.createContext(Px()), Rx = () => b.useContext(Ex), Tx = (t, r, o) => {
  const l = o?.state.error && typeof t.throwOnError == "function" ? Fp(t.throwOnError, [o.state.error, o]) : t.throwOnError;
  (t.suspense || t.experimental_prefetchInRender || l) && (r.isReset() || (t.retryOnMount = !1));
}, Ax = (t) => {
  b.useEffect(() => {
    t.clearReset();
  }, [t]);
}, Lx = ({
  result: t,
  errorResetBoundary: r,
  throwOnError: o,
  query: l,
  suspense: c
}) => t.isError && !r.isReset() && !t.isFetching && l && (c && t.data === void 0 || Fp(o, [t.error, l])), Ox = (t) => {
  if (t.suspense) {
    const o = (c) => c === "static" ? c : Math.max(c ?? 1e3, 1e3), l = t.staleTime;
    t.staleTime = typeof l == "function" ? (...c) => o(l(...c)) : o(l), typeof t.gcTime == "number" && (t.gcTime = Math.max(
      t.gcTime,
      1e3
    ));
  }
}, Mx = (t, r) => t.isLoading && t.isFetching && !r, Ix = (t, r) => t?.suspense && r.isPending, Gf = (t, r, o) => r.fetchOptimistic(t).catch(() => {
  o.clearReset();
});
function $x(t, r, o) {
  const l = Cx(), c = Rx(), u = Sx(), f = u.defaultQueryOptions(t);
  u.getDefaultOptions().queries?._experimental_beforeQuery?.(
    f
  );
  const h = u.getQueryCache().get(f.queryHash);
  f._optimisticResults = l ? "isRestoring" : "optimistic", Ox(f), Tx(f, c, h), Ax(c);
  const m = !u.getQueryCache().get(f.queryHash), [y] = b.useState(
    () => new r(
      u,
      f
    )
  ), g = y.getOptimisticResult(f), v = !l && t.subscribed !== !1;
  if (b.useSyncExternalStore(
    b.useCallback(
      (w) => {
        const S = v ? y.subscribe(qe.batchCalls(w)) : ut;
        return y.updateResult(), S;
      },
      [y, v]
    ),
    () => y.getCurrentResult(),
    () => y.getCurrentResult()
  ), b.useEffect(() => {
    y.setOptions(f);
  }, [f, y]), Ix(f, g))
    throw Gf(f, y, c);
  if (Lx({
    result: g,
    errorResetBoundary: c,
    throwOnError: f.throwOnError,
    query: h,
    suspense: f.suspense
  }))
    throw g.error;
  return u.getDefaultOptions().queries?._experimental_afterQuery?.(
    f,
    g
  ), f.experimental_prefetchInRender && !Xn && Mx(g, l) && (m ? (
    // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
    Gf(f, y, c)
  ) : (
    // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
    h?.promise
  ))?.catch(ut).finally(() => {
    y.updateResult();
  }), f.notifyOnChangeProps ? g : y.trackResult(g);
}
function Mt(t, r) {
  return $x(t, gx);
}
function Fx(t, r) {
  if (t instanceof RegExp) return { keys: !1, pattern: t };
  var o, l, c, u, f = [], h = "", m = t.split("/");
  for (m[0] || m.shift(); c = m.shift(); )
    o = c[0], o === "*" ? (f.push(o), h += c[1] === "?" ? "(?:/(.*))?" : "/(.*)") : o === ":" ? (l = c.indexOf("?", 1), u = c.indexOf(".", 1), f.push(c.substring(1, ~l ? l : ~u ? u : c.length)), h += ~l && !~u ? "(?:/([^/]+?))?" : "/([^/]+?)", ~u && (h += (~l ? "?" : "") + "\\" + c.substring(u))) : h += "/" + c;
  return {
    keys: f,
    pattern: new RegExp("^" + h + (r ? "(?=$|/)" : "/?$"), "i")
  };
}
var Sl = { exports: {} }, _l = {};
var Qf;
function Dx() {
  if (Qf) return _l;
  Qf = 1;
  var t = gi();
  function r(v, w) {
    return v === w && (v !== 0 || 1 / v === 1 / w) || v !== v && w !== w;
  }
  var o = typeof Object.is == "function" ? Object.is : r, l = t.useState, c = t.useEffect, u = t.useLayoutEffect, f = t.useDebugValue;
  function h(v, w) {
    var S = w(), P = l({ inst: { value: S, getSnapshot: w } }), k = P[0].inst, j = P[1];
    return u(
      function() {
        k.value = S, k.getSnapshot = w, m(k) && j({ inst: k });
      },
      [v, S, w]
    ), c(
      function() {
        return m(k) && j({ inst: k }), v(function() {
          m(k) && j({ inst: k });
        });
      },
      [v]
    ), f(S), S;
  }
  function m(v) {
    var w = v.getSnapshot;
    v = v.value;
    try {
      var S = w();
      return !o(v, S);
    } catch {
      return !0;
    }
  }
  function y(v, w) {
    return w();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : h;
  return _l.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : g, _l;
}
var Kf;
function Bx() {
  return Kf || (Kf = 1, Sl.exports = Dx()), Sl.exports;
}
var zx = Bx();
const Ux = yi.useInsertionEffect, Wx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Hx = Wx ? b.useLayoutEffect : b.useEffect, Vx = Ux || Hx, Vp = (t) => {
  const r = b.useRef([t, (...o) => r[0](...o)]).current;
  return Vx(() => {
    r[0] = t;
  }), r[1];
}, Yx = "popstate", sc = "pushState", oc = "replaceState", Gx = "hashchange", qf = [
  Yx,
  sc,
  oc,
  Gx
], Qx = (t) => {
  for (const r of qf)
    addEventListener(r, t);
  return () => {
    for (const r of qf)
      removeEventListener(r, t);
  };
}, Yp = (t, r) => zx.useSyncExternalStore(Qx, t, r), Xf = () => location.search, Kx = ({ ssrSearch: t } = {}) => Yp(
  Xf,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  t != null ? () => t : Xf
), Zf = () => location.pathname, qx = ({ ssrPath: t } = {}) => Yp(
  Zf,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  t != null ? () => t : Zf
), Xx = (t, { replace: r = !1, state: o = null } = {}) => history[r ? oc : sc](o, "", t), Zx = (t = {}) => [qx(t), Xx], Jf = /* @__PURE__ */ Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Jf] > "u") {
  for (const t of [sc, oc]) {
    const r = history[t];
    history[t] = function() {
      const o = r.apply(this, arguments), l = new Event(t);
      return l.arguments = arguments, dispatchEvent(l), o;
    };
  }
  Object.defineProperty(window, Jf, { value: !0 });
}
const Jx = (t, r) => r.toLowerCase().indexOf(t.toLowerCase()) ? "~" + r : r.slice(t.length) || "/", Gp = (t = "") => t === "/" ? "" : t, e0 = (t, r) => t[0] === "~" ? t.slice(1) : Gp(r) + t, t0 = (t = "", r) => Jx(ep(Gp(t)), ep(r)), ep = (t) => {
  try {
    return decodeURI(t);
  } catch {
    return t;
  }
}, Qp = {
  hook: Zx,
  searchHook: Kx,
  parser: Fx,
  base: "",
  // this option is used to override the current location during SSR
  ssrPath: void 0,
  ssrSearch: void 0,
  // optional context to track render state during SSR
  ssrContext: void 0,
  // customizes how `href` props are transformed for <Link />
  hrefs: (t) => t,
  // wraps navigate calls, useful for view transitions
  aroundNav: (t, r, o) => t(r, o)
}, Kp = b.createContext(Qp), Ls = () => b.useContext(Kp), qp = {}, Xp = b.createContext(qp), Zp = () => b.useContext(Xp), xi = (t) => {
  const [r, o] = t.hook(t);
  return [
    t0(t.base, r),
    Vp(
      (l, c) => t.aroundNav(o, e0(l, t.base), c)
    )
  ];
}, ic = () => xi(Ls()), Jp = (t, r, o, l) => {
  const { pattern: c, keys: u } = r instanceof RegExp ? { keys: !1, pattern: r } : t(r || "*", l), f = c.exec(o) || [], [h, ...m] = f;
  return h !== void 0 ? [
    !0,
    (() => {
      const y = u !== !1 ? Object.fromEntries(u.map((v, w) => [v, m[w]])) : f.groups;
      let g = { ...m };
      return y && Object.assign(g, y), g;
    })(),
    // the third value if only present when parser is in "loose" mode,
    // so that we can extract the base path for nested routes
    ...l ? [h] : []
  ] : [!1, null];
}, eh = ({ children: t, ...r }) => {
  const o = Ls(), l = r.hook ? Qp : o;
  let c = l;
  const [u, f = r.ssrSearch ?? ""] = r.ssrPath?.split("?") ?? [];
  u && (r.ssrSearch = f, r.ssrPath = u), r.hrefs = r.hrefs ?? r.hook?.hrefs, r.searchHook = r.searchHook ?? r.hook?.searchHook;
  let h = b.useRef({}), m = h.current, y = m;
  for (let g in l) {
    const v = g === "base" ? (
      /* base is special case, it is appended to the parent's base */
      l[g] + (r[g] ?? "")
    ) : r[g] ?? l[g];
    m === y && v !== y[g] && (h.current = y = { ...y }), y[g] = v, (v !== l[g] || v !== c[g]) && (c = y);
  }
  return b.createElement(Kp.Provider, { value: c, children: t });
}, tp = ({ children: t, component: r }, o) => r ? b.createElement(r, { params: o }) : typeof t == "function" ? t(o) : t, n0 = (t) => {
  let r = b.useRef(qp);
  const o = r.current;
  return r.current = // Update cache if number of params changed or any value changed
  Object.keys(t).length !== Object.keys(o).length || Object.entries(t).some(([l, c]) => c !== o[l]) ? t : o;
}, Xo = ({ path: t, nest: r, match: o, ...l }) => {
  const c = Ls(), [u] = xi(c), [f, h, m] = (
    // `match` is a special prop to give up control to the parent,
    // it is used by the `Switch` to avoid double matching
    o ?? Jp(c.parser, t, u, r)
  ), y = n0({ ...Zp(), ...h });
  if (!f) return null;
  const g = m ? b.createElement(eh, { base: m }, tp(l, y)) : tp(l, y);
  return b.createElement(Xp.Provider, { value: y, children: g });
}, Zn = b.forwardRef((t, r) => {
  const o = Ls(), [l, c] = xi(o), {
    to: u = "",
    href: f = u,
    onClick: h,
    asChild: m,
    children: y,
    className: g,
    /* eslint-disable no-unused-vars */
    replace: v,
    state: w,
    transition: S,
    /* eslint-enable no-unused-vars */
    ...P
  } = t, k = Vp((A) => {
    A.ctrlKey || A.metaKey || A.altKey || A.shiftKey || A.button !== 0 || (h?.(A), A.defaultPrevented || (A.preventDefault(), c(f, t)));
  }), j = o.hrefs(
    f[0] === "~" ? f.slice(1) : o.base + f,
    o
    // pass router as a second argument for convinience
  );
  return m && b.isValidElement(y) ? b.cloneElement(y, { onClick: k, href: j }) : b.createElement("a", {
    ...P,
    onClick: k,
    href: j,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(l === f) : g,
    children: y,
    ref: r
  });
}), th = (t) => Array.isArray(t) ? t.flatMap(
  (r) => th(r && r.type === b.Fragment ? r.props.children : r)
) : [t], r0 = ({ children: t, location: r }) => {
  const o = Ls(), [l] = xi(o);
  for (const c of th(t)) {
    let u = 0;
    if (b.isValidElement(c) && // we don't require an element to be of type Route,
    // but we do require it to contain a truthy `path` prop.
    // this allows to use different components that wrap Route
    // inside of a switch, for example <AnimatedRoute />.
    (u = Jp(
      o.parser,
      c.props.path,
      r || l,
      c.props.nest
    ))[0])
      return b.cloneElement(c, { match: u });
  }
  return null;
};
function Ye(t, r, { checkForDefaultPrevented: o = !0 } = {}) {
  return function(c) {
    if (t?.(c), o === !1 || !c.defaultPrevented)
      return r?.(c);
  };
}
function np(t, r) {
  if (typeof t == "function")
    return t(r);
  t != null && (t.current = r);
}
function vi(...t) {
  return (r) => {
    let o = !1;
    const l = t.map((c) => {
      const u = np(c, r);
      return !o && typeof u == "function" && (o = !0), u;
    });
    if (o)
      return () => {
        for (let c = 0; c < l.length; c++) {
          const u = l[c];
          typeof u == "function" ? u() : np(t[c], null);
        }
      };
  };
}
function Yt(...t) {
  return b.useCallback(vi(...t), t);
}
function Os(t, r = []) {
  let o = [];
  function l(u, f) {
    const h = b.createContext(f), m = o.length;
    o = [...o, f];
    const y = (v) => {
      const { scope: w, children: S, ...P } = v, k = w?.[t]?.[m] || h, j = b.useMemo(() => P, Object.values(P));
      return /* @__PURE__ */ i.jsx(k.Provider, { value: j, children: S });
    };
    y.displayName = u + "Provider";
    function g(v, w) {
      const S = w?.[t]?.[m] || h, P = b.useContext(S);
      if (P) return P;
      if (f !== void 0) return f;
      throw new Error(`\`${v}\` must be used within \`${u}\``);
    }
    return [y, g];
  }
  const c = () => {
    const u = o.map((f) => b.createContext(f));
    return function(h) {
      const m = h?.[t] || u;
      return b.useMemo(
        () => ({ [`__scope${t}`]: { ...h, [t]: m } }),
        [h, m]
      );
    };
  };
  return c.scopeName = t, [l, s0(c, ...r)];
}
function s0(...t) {
  const r = t[0];
  if (t.length === 1) return r;
  const o = () => {
    const l = t.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return function(u) {
      const f = l.reduce((h, { useScope: m, scopeName: y }) => {
        const v = m(u)[`__scope${y}`];
        return { ...h, ...v };
      }, {});
      return b.useMemo(() => ({ [`__scope${r.scopeName}`]: f }), [f]);
    };
  };
  return o.scopeName = r.scopeName, o;
}
var ac = Op();
// @__NO_SIDE_EFFECTS__
function o0(t) {
  const r = /* @__PURE__ */ i0(t), o = b.forwardRef((l, c) => {
    const { children: u, ...f } = l, h = b.Children.toArray(u), m = h.find(l0);
    if (m) {
      const y = m.props.children, g = h.map((v) => v === m ? b.Children.count(y) > 1 ? b.Children.only(null) : b.isValidElement(y) ? y.props.children : null : v);
      return /* @__PURE__ */ i.jsx(r, { ...f, ref: c, children: b.isValidElement(y) ? b.cloneElement(y, void 0, g) : null });
    }
    return /* @__PURE__ */ i.jsx(r, { ...f, ref: c, children: u });
  });
  return o.displayName = `${t}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function i0(t) {
  const r = b.forwardRef((o, l) => {
    const { children: c, ...u } = o;
    if (b.isValidElement(c)) {
      const f = u0(c), h = c0(u, c.props);
      return c.type !== b.Fragment && (h.ref = l ? vi(l, f) : f), b.cloneElement(c, h);
    }
    return b.Children.count(c) > 1 ? b.Children.only(null) : null;
  });
  return r.displayName = `${t}.SlotClone`, r;
}
var a0 = /* @__PURE__ */ Symbol("radix.slottable");
function l0(t) {
  return b.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === a0;
}
function c0(t, r) {
  const o = { ...r };
  for (const l in r) {
    const c = t[l], u = r[l];
    /^on[A-Z]/.test(l) ? c && u ? o[l] = (...h) => {
      const m = u(...h);
      return c(...h), m;
    } : c && (o[l] = c) : l === "style" ? o[l] = { ...c, ...u } : l === "className" && (o[l] = [c, u].filter(Boolean).join(" "));
  }
  return { ...t, ...o };
}
function u0(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
var d0 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], xt = d0.reduce((t, r) => {
  const o = /* @__PURE__ */ o0(`Primitive.${r}`), l = b.forwardRef((c, u) => {
    const { asChild: f, ...h } = c, m = f ? o : r;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ i.jsx(m, { ...h, ref: u });
  });
  return l.displayName = `Primitive.${r}`, { ...t, [r]: l };
}, {});
function f0(t, r) {
  t && ac.flushSync(() => t.dispatchEvent(r));
}
function Ms(t) {
  const r = b.useRef(t);
  return b.useEffect(() => {
    r.current = t;
  }), b.useMemo(() => (...o) => r.current?.(...o), []);
}
function p0(t, r = globalThis?.document) {
  const o = Ms(t);
  b.useEffect(() => {
    const l = (c) => {
      c.key === "Escape" && o(c);
    };
    return r.addEventListener("keydown", l, { capture: !0 }), () => r.removeEventListener("keydown", l, { capture: !0 });
  }, [o, r]);
}
var h0 = "DismissableLayer", Ul = "dismissableLayer.update", m0 = "dismissableLayer.pointerDownOutside", g0 = "dismissableLayer.focusOutside", rp, nh = b.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), rh = b.forwardRef(
  (t, r) => {
    const {
      disableOutsidePointerEvents: o = !1,
      onEscapeKeyDown: l,
      onPointerDownOutside: c,
      onFocusOutside: u,
      onInteractOutside: f,
      onDismiss: h,
      ...m
    } = t, y = b.useContext(nh), [g, v] = b.useState(null), w = g?.ownerDocument ?? globalThis?.document, [, S] = b.useState({}), P = Yt(r, (Y) => v(Y)), k = Array.from(y.layers), [j] = [...y.layersWithOutsidePointerEventsDisabled].slice(-1), A = k.indexOf(j), _ = g ? k.indexOf(g) : -1, C = y.layersWithOutsidePointerEventsDisabled.size > 0, F = _ >= A, U = v0((Y) => {
      const X = Y.target, se = [...y.branches].some((ne) => ne.contains(X));
      !F || se || (c?.(Y), f?.(Y), Y.defaultPrevented || h?.());
    }, w), H = w0((Y) => {
      const X = Y.target;
      [...y.branches].some((ne) => ne.contains(X)) || (u?.(Y), f?.(Y), Y.defaultPrevented || h?.());
    }, w);
    return p0((Y) => {
      _ === y.layers.size - 1 && (l?.(Y), !Y.defaultPrevented && h && (Y.preventDefault(), h()));
    }, w), b.useEffect(() => {
      if (g)
        return o && (y.layersWithOutsidePointerEventsDisabled.size === 0 && (rp = w.body.style.pointerEvents, w.body.style.pointerEvents = "none"), y.layersWithOutsidePointerEventsDisabled.add(g)), y.layers.add(g), sp(), () => {
          o && y.layersWithOutsidePointerEventsDisabled.size === 1 && (w.body.style.pointerEvents = rp);
        };
    }, [g, w, o, y]), b.useEffect(() => () => {
      g && (y.layers.delete(g), y.layersWithOutsidePointerEventsDisabled.delete(g), sp());
    }, [g, y]), b.useEffect(() => {
      const Y = () => S({});
      return document.addEventListener(Ul, Y), () => document.removeEventListener(Ul, Y);
    }, []), /* @__PURE__ */ i.jsx(
      xt.div,
      {
        ...m,
        ref: P,
        style: {
          pointerEvents: C ? F ? "auto" : "none" : void 0,
          ...t.style
        },
        onFocusCapture: Ye(t.onFocusCapture, H.onFocusCapture),
        onBlurCapture: Ye(t.onBlurCapture, H.onBlurCapture),
        onPointerDownCapture: Ye(
          t.onPointerDownCapture,
          U.onPointerDownCapture
        )
      }
    );
  }
);
rh.displayName = h0;
var y0 = "DismissableLayerBranch", x0 = b.forwardRef((t, r) => {
  const o = b.useContext(nh), l = b.useRef(null), c = Yt(r, l);
  return b.useEffect(() => {
    const u = l.current;
    if (u)
      return o.branches.add(u), () => {
        o.branches.delete(u);
      };
  }, [o.branches]), /* @__PURE__ */ i.jsx(xt.div, { ...t, ref: c });
});
x0.displayName = y0;
function v0(t, r = globalThis?.document) {
  const o = Ms(t), l = b.useRef(!1), c = b.useRef(() => {
  });
  return b.useEffect(() => {
    const u = (h) => {
      if (h.target && !l.current) {
        let m = function() {
          sh(
            m0,
            o,
            y,
            { discrete: !0 }
          );
        };
        const y = { originalEvent: h };
        h.pointerType === "touch" ? (r.removeEventListener("click", c.current), c.current = m, r.addEventListener("click", c.current, { once: !0 })) : m();
      } else
        r.removeEventListener("click", c.current);
      l.current = !1;
    }, f = window.setTimeout(() => {
      r.addEventListener("pointerdown", u);
    }, 0);
    return () => {
      window.clearTimeout(f), r.removeEventListener("pointerdown", u), r.removeEventListener("click", c.current);
    };
  }, [r, o]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => l.current = !0
  };
}
function w0(t, r = globalThis?.document) {
  const o = Ms(t), l = b.useRef(!1);
  return b.useEffect(() => {
    const c = (u) => {
      u.target && !l.current && sh(g0, o, { originalEvent: u }, {
        discrete: !1
      });
    };
    return r.addEventListener("focusin", c), () => r.removeEventListener("focusin", c);
  }, [r, o]), {
    onFocusCapture: () => l.current = !0,
    onBlurCapture: () => l.current = !1
  };
}
function sp() {
  const t = new CustomEvent(Ul);
  document.dispatchEvent(t);
}
function sh(t, r, o, { discrete: l }) {
  const c = o.originalEvent.target, u = new CustomEvent(t, { bubbles: !1, cancelable: !0, detail: o });
  r && c.addEventListener(t, r, { once: !0 }), l ? f0(c, u) : c.dispatchEvent(u);
}
var Jn = globalThis?.document ? b.useLayoutEffect : () => {
}, b0 = yi[" useId ".trim().toString()] || (() => {
}), k0 = 0;
function oh(t) {
  const [r, o] = b.useState(b0());
  return Jn(() => {
    o((l) => l ?? String(k0++));
  }, [t]), r ? `radix-${r}` : "";
}
const j0 = ["top", "right", "bottom", "left"], An = Math.min, gt = Math.max, ai = Math.round, Zo = Math.floor, Vt = (t) => ({
  x: t,
  y: t
}), N0 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Wl(t, r, o) {
  return gt(t, An(r, o));
}
function sn(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function on(t) {
  return t.split("-")[0];
}
function Lr(t) {
  return t.split("-")[1];
}
function lc(t) {
  return t === "x" ? "y" : "x";
}
function cc(t) {
  return t === "y" ? "height" : "width";
}
function Ht(t) {
  const r = t[0];
  return r === "t" || r === "b" ? "y" : "x";
}
function uc(t) {
  return lc(Ht(t));
}
function S0(t, r, o) {
  o === void 0 && (o = !1);
  const l = Lr(t), c = uc(t), u = cc(c);
  let f = c === "x" ? l === (o ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return r.reference[u] > r.floating[u] && (f = li(f)), [f, li(f)];
}
function _0(t) {
  const r = li(t);
  return [Hl(t), r, Hl(r)];
}
function Hl(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const op = ["left", "right"], ip = ["right", "left"], C0 = ["top", "bottom"], P0 = ["bottom", "top"];
function E0(t, r, o) {
  switch (t) {
    case "top":
    case "bottom":
      return o ? r ? ip : op : r ? op : ip;
    case "left":
    case "right":
      return r ? C0 : P0;
    default:
      return [];
  }
}
function R0(t, r, o, l) {
  const c = Lr(t);
  let u = E0(on(t), o === "start", l);
  return c && (u = u.map((f) => f + "-" + c), r && (u = u.concat(u.map(Hl)))), u;
}
function li(t) {
  const r = on(t);
  return N0[r] + t.slice(r.length);
}
function T0(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ih(t) {
  return typeof t != "number" ? T0(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ci(t) {
  const {
    x: r,
    y: o,
    width: l,
    height: c
  } = t;
  return {
    width: l,
    height: c,
    top: o,
    left: r,
    right: r + l,
    bottom: o + c,
    x: r,
    y: o
  };
}
function ap(t, r, o) {
  let {
    reference: l,
    floating: c
  } = t;
  const u = Ht(r), f = uc(r), h = cc(f), m = on(r), y = u === "y", g = l.x + l.width / 2 - c.width / 2, v = l.y + l.height / 2 - c.height / 2, w = l[h] / 2 - c[h] / 2;
  let S;
  switch (m) {
    case "top":
      S = {
        x: g,
        y: l.y - c.height
      };
      break;
    case "bottom":
      S = {
        x: g,
        y: l.y + l.height
      };
      break;
    case "right":
      S = {
        x: l.x + l.width,
        y: v
      };
      break;
    case "left":
      S = {
        x: l.x - c.width,
        y: v
      };
      break;
    default:
      S = {
        x: l.x,
        y: l.y
      };
  }
  switch (Lr(r)) {
    case "start":
      S[f] -= w * (o && y ? -1 : 1);
      break;
    case "end":
      S[f] += w * (o && y ? -1 : 1);
      break;
  }
  return S;
}
async function A0(t, r) {
  var o;
  r === void 0 && (r = {});
  const {
    x: l,
    y: c,
    platform: u,
    rects: f,
    elements: h,
    strategy: m
  } = t, {
    boundary: y = "clippingAncestors",
    rootBoundary: g = "viewport",
    elementContext: v = "floating",
    altBoundary: w = !1,
    padding: S = 0
  } = sn(r, t), P = ih(S), j = h[w ? v === "floating" ? "reference" : "floating" : v], A = ci(await u.getClippingRect({
    element: (o = await (u.isElement == null ? void 0 : u.isElement(j))) == null || o ? j : j.contextElement || await (u.getDocumentElement == null ? void 0 : u.getDocumentElement(h.floating)),
    boundary: y,
    rootBoundary: g,
    strategy: m
  })), _ = v === "floating" ? {
    x: l,
    y: c,
    width: f.floating.width,
    height: f.floating.height
  } : f.reference, C = await (u.getOffsetParent == null ? void 0 : u.getOffsetParent(h.floating)), F = await (u.isElement == null ? void 0 : u.isElement(C)) ? await (u.getScale == null ? void 0 : u.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, U = ci(u.convertOffsetParentRelativeRectToViewportRelativeRect ? await u.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: h,
    rect: _,
    offsetParent: C,
    strategy: m
  }) : _);
  return {
    top: (A.top - U.top + P.top) / F.y,
    bottom: (U.bottom - A.bottom + P.bottom) / F.y,
    left: (A.left - U.left + P.left) / F.x,
    right: (U.right - A.right + P.right) / F.x
  };
}
const L0 = 50, O0 = async (t, r, o) => {
  const {
    placement: l = "bottom",
    strategy: c = "absolute",
    middleware: u = [],
    platform: f
  } = o, h = f.detectOverflow ? f : {
    ...f,
    detectOverflow: A0
  }, m = await (f.isRTL == null ? void 0 : f.isRTL(r));
  let y = await f.getElementRects({
    reference: t,
    floating: r,
    strategy: c
  }), {
    x: g,
    y: v
  } = ap(y, l, m), w = l, S = 0;
  const P = {};
  for (let k = 0; k < u.length; k++) {
    const j = u[k];
    if (!j)
      continue;
    const {
      name: A,
      fn: _
    } = j, {
      x: C,
      y: F,
      data: U,
      reset: H
    } = await _({
      x: g,
      y: v,
      initialPlacement: l,
      placement: w,
      strategy: c,
      middlewareData: P,
      rects: y,
      platform: h,
      elements: {
        reference: t,
        floating: r
      }
    });
    g = C ?? g, v = F ?? v, P[A] = {
      ...P[A],
      ...U
    }, H && S < L0 && (S++, typeof H == "object" && (H.placement && (w = H.placement), H.rects && (y = H.rects === !0 ? await f.getElementRects({
      reference: t,
      floating: r,
      strategy: c
    }) : H.rects), {
      x: g,
      y: v
    } = ap(y, w, m)), k = -1);
  }
  return {
    x: g,
    y: v,
    placement: w,
    strategy: c,
    middlewareData: P
  };
}, M0 = (t) => ({
  name: "arrow",
  options: t,
  async fn(r) {
    const {
      x: o,
      y: l,
      placement: c,
      rects: u,
      platform: f,
      elements: h,
      middlewareData: m
    } = r, {
      element: y,
      padding: g = 0
    } = sn(t, r) || {};
    if (y == null)
      return {};
    const v = ih(g), w = {
      x: o,
      y: l
    }, S = uc(c), P = cc(S), k = await f.getDimensions(y), j = S === "y", A = j ? "top" : "left", _ = j ? "bottom" : "right", C = j ? "clientHeight" : "clientWidth", F = u.reference[P] + u.reference[S] - w[S] - u.floating[P], U = w[S] - u.reference[S], H = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(y));
    let Y = H ? H[C] : 0;
    (!Y || !await (f.isElement == null ? void 0 : f.isElement(H))) && (Y = h.floating[C] || u.floating[P]);
    const X = F / 2 - U / 2, se = Y / 2 - k[P] / 2 - 1, ne = An(v[A], se), ie = An(v[_], se), Q = ne, z = Y - k[P] - ie, Z = Y / 2 - k[P] / 2 + X, ge = Wl(Q, Z, z), fe = !m.arrow && Lr(c) != null && Z !== ge && u.reference[P] / 2 - (Z < Q ? ne : ie) - k[P] / 2 < 0, M = fe ? Z < Q ? Z - Q : Z - z : 0;
    return {
      [S]: w[S] + M,
      data: {
        [S]: ge,
        centerOffset: Z - ge - M,
        ...fe && {
          alignmentOffset: M
        }
      },
      reset: fe
    };
  }
}), I0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(r) {
      var o, l;
      const {
        placement: c,
        middlewareData: u,
        rects: f,
        initialPlacement: h,
        platform: m,
        elements: y
      } = r, {
        mainAxis: g = !0,
        crossAxis: v = !0,
        fallbackPlacements: w,
        fallbackStrategy: S = "bestFit",
        fallbackAxisSideDirection: P = "none",
        flipAlignment: k = !0,
        ...j
      } = sn(t, r);
      if ((o = u.arrow) != null && o.alignmentOffset)
        return {};
      const A = on(c), _ = Ht(h), C = on(h) === h, F = await (m.isRTL == null ? void 0 : m.isRTL(y.floating)), U = w || (C || !k ? [li(h)] : _0(h)), H = P !== "none";
      !w && H && U.push(...R0(h, k, P, F));
      const Y = [h, ...U], X = await m.detectOverflow(r, j), se = [];
      let ne = ((l = u.flip) == null ? void 0 : l.overflows) || [];
      if (g && se.push(X[A]), v) {
        const Z = S0(c, f, F);
        se.push(X[Z[0]], X[Z[1]]);
      }
      if (ne = [...ne, {
        placement: c,
        overflows: se
      }], !se.every((Z) => Z <= 0)) {
        var ie, Q;
        const Z = (((ie = u.flip) == null ? void 0 : ie.index) || 0) + 1, ge = Y[Z];
        if (ge && (!(v === "alignment" ? _ !== Ht(ge) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ne.every((L) => Ht(L.placement) === _ ? L.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Z,
              overflows: ne
            },
            reset: {
              placement: ge
            }
          };
        let fe = (Q = ne.filter((M) => M.overflows[0] <= 0).sort((M, L) => M.overflows[1] - L.overflows[1])[0]) == null ? void 0 : Q.placement;
        if (!fe)
          switch (S) {
            case "bestFit": {
              var z;
              const M = (z = ne.filter((L) => {
                if (H) {
                  const K = Ht(L.placement);
                  return K === _ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  K === "y";
                }
                return !0;
              }).map((L) => [L.placement, L.overflows.filter((K) => K > 0).reduce((K, D) => K + D, 0)]).sort((L, K) => L[1] - K[1])[0]) == null ? void 0 : z[0];
              M && (fe = M);
              break;
            }
            case "initialPlacement":
              fe = h;
              break;
          }
        if (c !== fe)
          return {
            reset: {
              placement: fe
            }
          };
      }
      return {};
    }
  };
};
function lp(t, r) {
  return {
    top: t.top - r.height,
    right: t.right - r.width,
    bottom: t.bottom - r.height,
    left: t.left - r.width
  };
}
function cp(t) {
  return j0.some((r) => t[r] >= 0);
}
const $0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(r) {
      const {
        rects: o,
        platform: l
      } = r, {
        strategy: c = "referenceHidden",
        ...u
      } = sn(t, r);
      switch (c) {
        case "referenceHidden": {
          const f = await l.detectOverflow(r, {
            ...u,
            elementContext: "reference"
          }), h = lp(f, o.reference);
          return {
            data: {
              referenceHiddenOffsets: h,
              referenceHidden: cp(h)
            }
          };
        }
        case "escaped": {
          const f = await l.detectOverflow(r, {
            ...u,
            altBoundary: !0
          }), h = lp(f, o.floating);
          return {
            data: {
              escapedOffsets: h,
              escaped: cp(h)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ah = /* @__PURE__ */ new Set(["left", "top"]);
async function F0(t, r) {
  const {
    placement: o,
    platform: l,
    elements: c
  } = t, u = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), f = on(o), h = Lr(o), m = Ht(o) === "y", y = ah.has(f) ? -1 : 1, g = u && m ? -1 : 1, v = sn(r, t);
  let {
    mainAxis: w,
    crossAxis: S,
    alignmentAxis: P
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return h && typeof P == "number" && (S = h === "end" ? P * -1 : P), m ? {
    x: S * g,
    y: w * y
  } : {
    x: w * y,
    y: S * g
  };
}
const D0 = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(r) {
      var o, l;
      const {
        x: c,
        y: u,
        placement: f,
        middlewareData: h
      } = r, m = await F0(r, t);
      return f === ((o = h.offset) == null ? void 0 : o.placement) && (l = h.arrow) != null && l.alignmentOffset ? {} : {
        x: c + m.x,
        y: u + m.y,
        data: {
          ...m,
          placement: f
        }
      };
    }
  };
}, B0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(r) {
      const {
        x: o,
        y: l,
        placement: c,
        platform: u
      } = r, {
        mainAxis: f = !0,
        crossAxis: h = !1,
        limiter: m = {
          fn: (A) => {
            let {
              x: _,
              y: C
            } = A;
            return {
              x: _,
              y: C
            };
          }
        },
        ...y
      } = sn(t, r), g = {
        x: o,
        y: l
      }, v = await u.detectOverflow(r, y), w = Ht(on(c)), S = lc(w);
      let P = g[S], k = g[w];
      if (f) {
        const A = S === "y" ? "top" : "left", _ = S === "y" ? "bottom" : "right", C = P + v[A], F = P - v[_];
        P = Wl(C, P, F);
      }
      if (h) {
        const A = w === "y" ? "top" : "left", _ = w === "y" ? "bottom" : "right", C = k + v[A], F = k - v[_];
        k = Wl(C, k, F);
      }
      const j = m.fn({
        ...r,
        [S]: P,
        [w]: k
      });
      return {
        ...j,
        data: {
          x: j.x - o,
          y: j.y - l,
          enabled: {
            [S]: f,
            [w]: h
          }
        }
      };
    }
  };
}, z0 = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(r) {
      const {
        x: o,
        y: l,
        placement: c,
        rects: u,
        middlewareData: f
      } = r, {
        offset: h = 0,
        mainAxis: m = !0,
        crossAxis: y = !0
      } = sn(t, r), g = {
        x: o,
        y: l
      }, v = Ht(c), w = lc(v);
      let S = g[w], P = g[v];
      const k = sn(h, r), j = typeof k == "number" ? {
        mainAxis: k,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...k
      };
      if (m) {
        const C = w === "y" ? "height" : "width", F = u.reference[w] - u.floating[C] + j.mainAxis, U = u.reference[w] + u.reference[C] - j.mainAxis;
        S < F ? S = F : S > U && (S = U);
      }
      if (y) {
        var A, _;
        const C = w === "y" ? "width" : "height", F = ah.has(on(c)), U = u.reference[v] - u.floating[C] + (F && ((A = f.offset) == null ? void 0 : A[v]) || 0) + (F ? 0 : j.crossAxis), H = u.reference[v] + u.reference[C] + (F ? 0 : ((_ = f.offset) == null ? void 0 : _[v]) || 0) - (F ? j.crossAxis : 0);
        P < U ? P = U : P > H && (P = H);
      }
      return {
        [w]: S,
        [v]: P
      };
    }
  };
}, U0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(r) {
      var o, l;
      const {
        placement: c,
        rects: u,
        platform: f,
        elements: h
      } = r, {
        apply: m = () => {
        },
        ...y
      } = sn(t, r), g = await f.detectOverflow(r, y), v = on(c), w = Lr(c), S = Ht(c) === "y", {
        width: P,
        height: k
      } = u.floating;
      let j, A;
      v === "top" || v === "bottom" ? (j = v, A = w === (await (f.isRTL == null ? void 0 : f.isRTL(h.floating)) ? "start" : "end") ? "left" : "right") : (A = v, j = w === "end" ? "top" : "bottom");
      const _ = k - g.top - g.bottom, C = P - g.left - g.right, F = An(k - g[j], _), U = An(P - g[A], C), H = !r.middlewareData.shift;
      let Y = F, X = U;
      if ((o = r.middlewareData.shift) != null && o.enabled.x && (X = C), (l = r.middlewareData.shift) != null && l.enabled.y && (Y = _), H && !w) {
        const ne = gt(g.left, 0), ie = gt(g.right, 0), Q = gt(g.top, 0), z = gt(g.bottom, 0);
        S ? X = P - 2 * (ne !== 0 || ie !== 0 ? ne + ie : gt(g.left, g.right)) : Y = k - 2 * (Q !== 0 || z !== 0 ? Q + z : gt(g.top, g.bottom));
      }
      await m({
        ...r,
        availableWidth: X,
        availableHeight: Y
      });
      const se = await f.getDimensions(h.floating);
      return P !== se.width || k !== se.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function wi() {
  return typeof window < "u";
}
function Or(t) {
  return lh(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function yt(t) {
  var r;
  return (t == null || (r = t.ownerDocument) == null ? void 0 : r.defaultView) || window;
}
function Gt(t) {
  var r;
  return (r = (lh(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : r.documentElement;
}
function lh(t) {
  return wi() ? t instanceof Node || t instanceof yt(t).Node : !1;
}
function It(t) {
  return wi() ? t instanceof Element || t instanceof yt(t).Element : !1;
}
function an(t) {
  return wi() ? t instanceof HTMLElement || t instanceof yt(t).HTMLElement : !1;
}
function up(t) {
  return !wi() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof yt(t).ShadowRoot;
}
function Is(t) {
  const {
    overflow: r,
    overflowX: o,
    overflowY: l,
    display: c
  } = $t(t);
  return /auto|scroll|overlay|hidden|clip/.test(r + l + o) && c !== "inline" && c !== "contents";
}
function W0(t) {
  return /^(table|td|th)$/.test(Or(t));
}
function bi(t) {
  try {
    if (t.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return t.matches(":modal");
  } catch {
    return !1;
  }
}
const H0 = /transform|translate|scale|rotate|perspective|filter/, V0 = /paint|layout|strict|content/, Qn = (t) => !!t && t !== "none";
let Cl;
function dc(t) {
  const r = It(t) ? $t(t) : t;
  return Qn(r.transform) || Qn(r.translate) || Qn(r.scale) || Qn(r.rotate) || Qn(r.perspective) || !fc() && (Qn(r.backdropFilter) || Qn(r.filter)) || H0.test(r.willChange || "") || V0.test(r.contain || "");
}
function Y0(t) {
  let r = Ln(t);
  for (; an(r) && !Rr(r); ) {
    if (dc(r))
      return r;
    if (bi(r))
      return null;
    r = Ln(r);
  }
  return null;
}
function fc() {
  return Cl == null && (Cl = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Cl;
}
function Rr(t) {
  return /^(html|body|#document)$/.test(Or(t));
}
function $t(t) {
  return yt(t).getComputedStyle(t);
}
function ki(t) {
  return It(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Ln(t) {
  if (Or(t) === "html")
    return t;
  const r = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    up(t) && t.host || // Fallback.
    Gt(t)
  );
  return up(r) ? r.host : r;
}
function ch(t) {
  const r = Ln(t);
  return Rr(r) ? t.ownerDocument ? t.ownerDocument.body : t.body : an(r) && Is(r) ? r : ch(r);
}
function Rs(t, r, o) {
  var l;
  r === void 0 && (r = []), o === void 0 && (o = !0);
  const c = ch(t), u = c === ((l = t.ownerDocument) == null ? void 0 : l.body), f = yt(c);
  if (u) {
    const h = Vl(f);
    return r.concat(f, f.visualViewport || [], Is(c) ? c : [], h && o ? Rs(h) : []);
  } else
    return r.concat(c, Rs(c, [], o));
}
function Vl(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function uh(t) {
  const r = $t(t);
  let o = parseFloat(r.width) || 0, l = parseFloat(r.height) || 0;
  const c = an(t), u = c ? t.offsetWidth : o, f = c ? t.offsetHeight : l, h = ai(o) !== u || ai(l) !== f;
  return h && (o = u, l = f), {
    width: o,
    height: l,
    $: h
  };
}
function pc(t) {
  return It(t) ? t : t.contextElement;
}
function Cr(t) {
  const r = pc(t);
  if (!an(r))
    return Vt(1);
  const o = r.getBoundingClientRect(), {
    width: l,
    height: c,
    $: u
  } = uh(r);
  let f = (u ? ai(o.width) : o.width) / l, h = (u ? ai(o.height) : o.height) / c;
  return (!f || !Number.isFinite(f)) && (f = 1), (!h || !Number.isFinite(h)) && (h = 1), {
    x: f,
    y: h
  };
}
const G0 = /* @__PURE__ */ Vt(0);
function dh(t) {
  const r = yt(t);
  return !fc() || !r.visualViewport ? G0 : {
    x: r.visualViewport.offsetLeft,
    y: r.visualViewport.offsetTop
  };
}
function Q0(t, r, o) {
  return r === void 0 && (r = !1), !o || r && o !== yt(t) ? !1 : r;
}
function er(t, r, o, l) {
  r === void 0 && (r = !1), o === void 0 && (o = !1);
  const c = t.getBoundingClientRect(), u = pc(t);
  let f = Vt(1);
  r && (l ? It(l) && (f = Cr(l)) : f = Cr(t));
  const h = Q0(u, o, l) ? dh(u) : Vt(0);
  let m = (c.left + h.x) / f.x, y = (c.top + h.y) / f.y, g = c.width / f.x, v = c.height / f.y;
  if (u) {
    const w = yt(u), S = l && It(l) ? yt(l) : l;
    let P = w, k = Vl(P);
    for (; k && l && S !== P; ) {
      const j = Cr(k), A = k.getBoundingClientRect(), _ = $t(k), C = A.left + (k.clientLeft + parseFloat(_.paddingLeft)) * j.x, F = A.top + (k.clientTop + parseFloat(_.paddingTop)) * j.y;
      m *= j.x, y *= j.y, g *= j.x, v *= j.y, m += C, y += F, P = yt(k), k = Vl(P);
    }
  }
  return ci({
    width: g,
    height: v,
    x: m,
    y
  });
}
function ji(t, r) {
  const o = ki(t).scrollLeft;
  return r ? r.left + o : er(Gt(t)).left + o;
}
function fh(t, r) {
  const o = t.getBoundingClientRect(), l = o.left + r.scrollLeft - ji(t, o), c = o.top + r.scrollTop;
  return {
    x: l,
    y: c
  };
}
function K0(t) {
  let {
    elements: r,
    rect: o,
    offsetParent: l,
    strategy: c
  } = t;
  const u = c === "fixed", f = Gt(l), h = r ? bi(r.floating) : !1;
  if (l === f || h && u)
    return o;
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  }, y = Vt(1);
  const g = Vt(0), v = an(l);
  if ((v || !v && !u) && ((Or(l) !== "body" || Is(f)) && (m = ki(l)), v)) {
    const S = er(l);
    y = Cr(l), g.x = S.x + l.clientLeft, g.y = S.y + l.clientTop;
  }
  const w = f && !v && !u ? fh(f, m) : Vt(0);
  return {
    width: o.width * y.x,
    height: o.height * y.y,
    x: o.x * y.x - m.scrollLeft * y.x + g.x + w.x,
    y: o.y * y.y - m.scrollTop * y.y + g.y + w.y
  };
}
function q0(t) {
  return Array.from(t.getClientRects());
}
function X0(t) {
  const r = Gt(t), o = ki(t), l = t.ownerDocument.body, c = gt(r.scrollWidth, r.clientWidth, l.scrollWidth, l.clientWidth), u = gt(r.scrollHeight, r.clientHeight, l.scrollHeight, l.clientHeight);
  let f = -o.scrollLeft + ji(t);
  const h = -o.scrollTop;
  return $t(l).direction === "rtl" && (f += gt(r.clientWidth, l.clientWidth) - c), {
    width: c,
    height: u,
    x: f,
    y: h
  };
}
const dp = 25;
function Z0(t, r) {
  const o = yt(t), l = Gt(t), c = o.visualViewport;
  let u = l.clientWidth, f = l.clientHeight, h = 0, m = 0;
  if (c) {
    u = c.width, f = c.height;
    const g = fc();
    (!g || g && r === "fixed") && (h = c.offsetLeft, m = c.offsetTop);
  }
  const y = ji(l);
  if (y <= 0) {
    const g = l.ownerDocument, v = g.body, w = getComputedStyle(v), S = g.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight) || 0, P = Math.abs(l.clientWidth - v.clientWidth - S);
    P <= dp && (u -= P);
  } else y <= dp && (u += y);
  return {
    width: u,
    height: f,
    x: h,
    y: m
  };
}
function J0(t, r) {
  const o = er(t, !0, r === "fixed"), l = o.top + t.clientTop, c = o.left + t.clientLeft, u = an(t) ? Cr(t) : Vt(1), f = t.clientWidth * u.x, h = t.clientHeight * u.y, m = c * u.x, y = l * u.y;
  return {
    width: f,
    height: h,
    x: m,
    y
  };
}
function fp(t, r, o) {
  let l;
  if (r === "viewport")
    l = Z0(t, o);
  else if (r === "document")
    l = X0(Gt(t));
  else if (It(r))
    l = J0(r, o);
  else {
    const c = dh(t);
    l = {
      x: r.x - c.x,
      y: r.y - c.y,
      width: r.width,
      height: r.height
    };
  }
  return ci(l);
}
function ph(t, r) {
  const o = Ln(t);
  return o === r || !It(o) || Rr(o) ? !1 : $t(o).position === "fixed" || ph(o, r);
}
function ev(t, r) {
  const o = r.get(t);
  if (o)
    return o;
  let l = Rs(t, [], !1).filter((h) => It(h) && Or(h) !== "body"), c = null;
  const u = $t(t).position === "fixed";
  let f = u ? Ln(t) : t;
  for (; It(f) && !Rr(f); ) {
    const h = $t(f), m = dc(f);
    !m && h.position === "fixed" && (c = null), (u ? !m && !c : !m && h.position === "static" && !!c && (c.position === "absolute" || c.position === "fixed") || Is(f) && !m && ph(t, f)) ? l = l.filter((g) => g !== f) : c = h, f = Ln(f);
  }
  return r.set(t, l), l;
}
function tv(t) {
  let {
    element: r,
    boundary: o,
    rootBoundary: l,
    strategy: c
  } = t;
  const f = [...o === "clippingAncestors" ? bi(r) ? [] : ev(r, this._c) : [].concat(o), l], h = fp(r, f[0], c);
  let m = h.top, y = h.right, g = h.bottom, v = h.left;
  for (let w = 1; w < f.length; w++) {
    const S = fp(r, f[w], c);
    m = gt(S.top, m), y = An(S.right, y), g = An(S.bottom, g), v = gt(S.left, v);
  }
  return {
    width: y - v,
    height: g - m,
    x: v,
    y: m
  };
}
function nv(t) {
  const {
    width: r,
    height: o
  } = uh(t);
  return {
    width: r,
    height: o
  };
}
function rv(t, r, o) {
  const l = an(r), c = Gt(r), u = o === "fixed", f = er(t, !0, u, r);
  let h = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const m = Vt(0);
  function y() {
    m.x = ji(c);
  }
  if (l || !l && !u)
    if ((Or(r) !== "body" || Is(c)) && (h = ki(r)), l) {
      const S = er(r, !0, u, r);
      m.x = S.x + r.clientLeft, m.y = S.y + r.clientTop;
    } else c && y();
  u && !l && c && y();
  const g = c && !l && !u ? fh(c, h) : Vt(0), v = f.left + h.scrollLeft - m.x - g.x, w = f.top + h.scrollTop - m.y - g.y;
  return {
    x: v,
    y: w,
    width: f.width,
    height: f.height
  };
}
function Pl(t) {
  return $t(t).position === "static";
}
function pp(t, r) {
  if (!an(t) || $t(t).position === "fixed")
    return null;
  if (r)
    return r(t);
  let o = t.offsetParent;
  return Gt(t) === o && (o = o.ownerDocument.body), o;
}
function hh(t, r) {
  const o = yt(t);
  if (bi(t))
    return o;
  if (!an(t)) {
    let c = Ln(t);
    for (; c && !Rr(c); ) {
      if (It(c) && !Pl(c))
        return c;
      c = Ln(c);
    }
    return o;
  }
  let l = pp(t, r);
  for (; l && W0(l) && Pl(l); )
    l = pp(l, r);
  return l && Rr(l) && Pl(l) && !dc(l) ? o : l || Y0(t) || o;
}
const sv = async function(t) {
  const r = this.getOffsetParent || hh, o = this.getDimensions, l = await o(t.floating);
  return {
    reference: rv(t.reference, await r(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: l.width,
      height: l.height
    }
  };
};
function ov(t) {
  return $t(t).direction === "rtl";
}
const iv = {
  convertOffsetParentRelativeRectToViewportRelativeRect: K0,
  getDocumentElement: Gt,
  getClippingRect: tv,
  getOffsetParent: hh,
  getElementRects: sv,
  getClientRects: q0,
  getDimensions: nv,
  getScale: Cr,
  isElement: It,
  isRTL: ov
};
function mh(t, r) {
  return t.x === r.x && t.y === r.y && t.width === r.width && t.height === r.height;
}
function av(t, r) {
  let o = null, l;
  const c = Gt(t);
  function u() {
    var h;
    clearTimeout(l), (h = o) == null || h.disconnect(), o = null;
  }
  function f(h, m) {
    h === void 0 && (h = !1), m === void 0 && (m = 1), u();
    const y = t.getBoundingClientRect(), {
      left: g,
      top: v,
      width: w,
      height: S
    } = y;
    if (h || r(), !w || !S)
      return;
    const P = Zo(v), k = Zo(c.clientWidth - (g + w)), j = Zo(c.clientHeight - (v + S)), A = Zo(g), C = {
      rootMargin: -P + "px " + -k + "px " + -j + "px " + -A + "px",
      threshold: gt(0, An(1, m)) || 1
    };
    let F = !0;
    function U(H) {
      const Y = H[0].intersectionRatio;
      if (Y !== m) {
        if (!F)
          return f();
        Y ? f(!1, Y) : l = setTimeout(() => {
          f(!1, 1e-7);
        }, 1e3);
      }
      Y === 1 && !mh(y, t.getBoundingClientRect()) && f(), F = !1;
    }
    try {
      o = new IntersectionObserver(U, {
        ...C,
        // Handle <iframe>s
        root: c.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(U, C);
    }
    o.observe(t);
  }
  return f(!0), u;
}
function lv(t, r, o, l) {
  l === void 0 && (l = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: u = !0,
    elementResize: f = typeof ResizeObserver == "function",
    layoutShift: h = typeof IntersectionObserver == "function",
    animationFrame: m = !1
  } = l, y = pc(t), g = c || u ? [...y ? Rs(y) : [], ...r ? Rs(r) : []] : [];
  g.forEach((A) => {
    c && A.addEventListener("scroll", o, {
      passive: !0
    }), u && A.addEventListener("resize", o);
  });
  const v = y && h ? av(y, o) : null;
  let w = -1, S = null;
  f && (S = new ResizeObserver((A) => {
    let [_] = A;
    _ && _.target === y && S && r && (S.unobserve(r), cancelAnimationFrame(w), w = requestAnimationFrame(() => {
      var C;
      (C = S) == null || C.observe(r);
    })), o();
  }), y && !m && S.observe(y), r && S.observe(r));
  let P, k = m ? er(t) : null;
  m && j();
  function j() {
    const A = er(t);
    k && !mh(k, A) && o(), k = A, P = requestAnimationFrame(j);
  }
  return o(), () => {
    var A;
    g.forEach((_) => {
      c && _.removeEventListener("scroll", o), u && _.removeEventListener("resize", o);
    }), v?.(), (A = S) == null || A.disconnect(), S = null, m && cancelAnimationFrame(P);
  };
}
const cv = D0, uv = B0, dv = I0, fv = U0, pv = $0, hp = M0, hv = z0, mv = (t, r, o) => {
  const l = /* @__PURE__ */ new Map(), c = {
    platform: iv,
    ...o
  }, u = {
    ...c.platform,
    _c: l
  };
  return O0(t, r, {
    ...c,
    platform: u
  });
};
var gv = typeof document < "u", yv = function() {
}, ni = gv ? b.useLayoutEffect : yv;
function ui(t, r) {
  if (t === r)
    return !0;
  if (typeof t != typeof r)
    return !1;
  if (typeof t == "function" && t.toString() === r.toString())
    return !0;
  let o, l, c;
  if (t && r && typeof t == "object") {
    if (Array.isArray(t)) {
      if (o = t.length, o !== r.length) return !1;
      for (l = o; l-- !== 0; )
        if (!ui(t[l], r[l]))
          return !1;
      return !0;
    }
    if (c = Object.keys(t), o = c.length, o !== Object.keys(r).length)
      return !1;
    for (l = o; l-- !== 0; )
      if (!{}.hasOwnProperty.call(r, c[l]))
        return !1;
    for (l = o; l-- !== 0; ) {
      const u = c[l];
      if (!(u === "_owner" && t.$$typeof) && !ui(t[u], r[u]))
        return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}
function gh(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function mp(t, r) {
  const o = gh(t);
  return Math.round(r * o) / o;
}
function El(t) {
  const r = b.useRef(t);
  return ni(() => {
    r.current = t;
  }), r;
}
function xv(t) {
  t === void 0 && (t = {});
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: l = [],
    platform: c,
    elements: {
      reference: u,
      floating: f
    } = {},
    transform: h = !0,
    whileElementsMounted: m,
    open: y
  } = t, [g, v] = b.useState({
    x: 0,
    y: 0,
    strategy: o,
    placement: r,
    middlewareData: {},
    isPositioned: !1
  }), [w, S] = b.useState(l);
  ui(w, l) || S(l);
  const [P, k] = b.useState(null), [j, A] = b.useState(null), _ = b.useCallback((L) => {
    L !== H.current && (H.current = L, k(L));
  }, []), C = b.useCallback((L) => {
    L !== Y.current && (Y.current = L, A(L));
  }, []), F = u || P, U = f || j, H = b.useRef(null), Y = b.useRef(null), X = b.useRef(g), se = m != null, ne = El(m), ie = El(c), Q = El(y), z = b.useCallback(() => {
    if (!H.current || !Y.current)
      return;
    const L = {
      placement: r,
      strategy: o,
      middleware: w
    };
    ie.current && (L.platform = ie.current), mv(H.current, Y.current, L).then((K) => {
      const D = {
        ...K,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: Q.current !== !1
      };
      Z.current && !ui(X.current, D) && (X.current = D, ac.flushSync(() => {
        v(D);
      }));
    });
  }, [w, r, o, ie, Q]);
  ni(() => {
    y === !1 && X.current.isPositioned && (X.current.isPositioned = !1, v((L) => ({
      ...L,
      isPositioned: !1
    })));
  }, [y]);
  const Z = b.useRef(!1);
  ni(() => (Z.current = !0, () => {
    Z.current = !1;
  }), []), ni(() => {
    if (F && (H.current = F), U && (Y.current = U), F && U) {
      if (ne.current)
        return ne.current(F, U, z);
      z();
    }
  }, [F, U, z, ne, se]);
  const ge = b.useMemo(() => ({
    reference: H,
    floating: Y,
    setReference: _,
    setFloating: C
  }), [_, C]), fe = b.useMemo(() => ({
    reference: F,
    floating: U
  }), [F, U]), M = b.useMemo(() => {
    const L = {
      position: o,
      left: 0,
      top: 0
    };
    if (!fe.floating)
      return L;
    const K = mp(fe.floating, g.x), D = mp(fe.floating, g.y);
    return h ? {
      ...L,
      transform: "translate(" + K + "px, " + D + "px)",
      ...gh(fe.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: o,
      left: K,
      top: D
    };
  }, [o, h, fe.floating, g.x, g.y]);
  return b.useMemo(() => ({
    ...g,
    update: z,
    refs: ge,
    elements: fe,
    floatingStyles: M
  }), [g, z, ge, fe, M]);
}
const vv = (t) => {
  function r(o) {
    return {}.hasOwnProperty.call(o, "current");
  }
  return {
    name: "arrow",
    options: t,
    fn(o) {
      const {
        element: l,
        padding: c
      } = typeof t == "function" ? t(o) : t;
      return l && r(l) ? l.current != null ? hp({
        element: l.current,
        padding: c
      }).fn(o) : {} : l ? hp({
        element: l,
        padding: c
      }).fn(o) : {};
    }
  };
}, wv = (t, r) => {
  const o = cv(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, bv = (t, r) => {
  const o = uv(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, kv = (t, r) => ({
  fn: hv(t).fn,
  options: [t, r]
}), jv = (t, r) => {
  const o = dv(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, Nv = (t, r) => {
  const o = fv(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, Sv = (t, r) => {
  const o = pv(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, _v = (t, r) => {
  const o = vv(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
};
var Cv = "Arrow", yh = b.forwardRef((t, r) => {
  const { children: o, width: l = 10, height: c = 5, ...u } = t;
  return /* @__PURE__ */ i.jsx(
    xt.svg,
    {
      ...u,
      ref: r,
      width: l,
      height: c,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: t.asChild ? o : /* @__PURE__ */ i.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
yh.displayName = Cv;
var Pv = yh;
function Ev(t) {
  const [r, o] = b.useState(void 0);
  return Jn(() => {
    if (t) {
      o({ width: t.offsetWidth, height: t.offsetHeight });
      const l = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const u = c[0];
        let f, h;
        if ("borderBoxSize" in u) {
          const m = u.borderBoxSize, y = Array.isArray(m) ? m[0] : m;
          f = y.inlineSize, h = y.blockSize;
        } else
          f = t.offsetWidth, h = t.offsetHeight;
        o({ width: f, height: h });
      });
      return l.observe(t, { box: "border-box" }), () => l.unobserve(t);
    } else
      o(void 0);
  }, [t]), r;
}
var xh = "Popper", [vh, wh] = Os(xh), [Jj, bh] = vh(xh), kh = "PopperAnchor", jh = b.forwardRef(
  (t, r) => {
    const { __scopePopper: o, virtualRef: l, ...c } = t, u = bh(kh, o), f = b.useRef(null), h = Yt(r, f), m = b.useRef(null);
    return b.useEffect(() => {
      const y = m.current;
      m.current = l?.current || f.current, y !== m.current && u.onAnchorChange(m.current);
    }), l ? null : /* @__PURE__ */ i.jsx(xt.div, { ...c, ref: h });
  }
);
jh.displayName = kh;
var hc = "PopperContent", [Rv, Tv] = vh(hc), Nh = b.forwardRef(
  (t, r) => {
    const {
      __scopePopper: o,
      side: l = "bottom",
      sideOffset: c = 0,
      align: u = "center",
      alignOffset: f = 0,
      arrowPadding: h = 0,
      avoidCollisions: m = !0,
      collisionBoundary: y = [],
      collisionPadding: g = 0,
      sticky: v = "partial",
      hideWhenDetached: w = !1,
      updatePositionStrategy: S = "optimized",
      onPlaced: P,
      ...k
    } = t, j = bh(hc, o), [A, _] = b.useState(null), C = Yt(r, (me) => _(me)), [F, U] = b.useState(null), H = Ev(F), Y = H?.width ?? 0, X = H?.height ?? 0, se = l + (u !== "center" ? "-" + u : ""), ne = typeof g == "number" ? g : { top: 0, right: 0, bottom: 0, left: 0, ...g }, ie = Array.isArray(y) ? y : [y], Q = ie.length > 0, z = {
      padding: ne,
      boundary: ie.filter(Lv),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: Q
    }, { refs: Z, floatingStyles: ge, placement: fe, isPositioned: M, middlewareData: L } = xv({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: se,
      whileElementsMounted: (...me) => lv(...me, {
        animationFrame: S === "always"
      }),
      elements: {
        reference: j.anchor
      },
      middleware: [
        wv({ mainAxis: c + X, alignmentAxis: f }),
        m && bv({
          mainAxis: !0,
          crossAxis: !1,
          limiter: v === "partial" ? kv() : void 0,
          ...z
        }),
        m && jv({ ...z }),
        Nv({
          ...z,
          apply: ({ elements: me, rects: je, availableWidth: _e, availableHeight: tt }) => {
            const { width: tr, height: Ds } = je.reference, Qt = me.floating.style;
            Qt.setProperty("--radix-popper-available-width", `${_e}px`), Qt.setProperty("--radix-popper-available-height", `${tt}px`), Qt.setProperty("--radix-popper-anchor-width", `${tr}px`), Qt.setProperty("--radix-popper-anchor-height", `${Ds}px`);
          }
        }),
        F && _v({ element: F, padding: h }),
        Ov({ arrowWidth: Y, arrowHeight: X }),
        w && Sv({ strategy: "referenceHidden", ...z })
      ]
    }), [K, D] = Ch(fe), E = Ms(P);
    Jn(() => {
      M && E?.();
    }, [M, E]);
    const B = L.arrow?.x, ce = L.arrow?.y, le = L.arrow?.centerOffset !== 0, [pe, ve] = b.useState();
    return Jn(() => {
      A && ve(window.getComputedStyle(A).zIndex);
    }, [A]), /* @__PURE__ */ i.jsx(
      "div",
      {
        ref: Z.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...ge,
          transform: M ? ge.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: pe,
          "--radix-popper-transform-origin": [
            L.transformOrigin?.x,
            L.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...L.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: t.dir,
        children: /* @__PURE__ */ i.jsx(
          Rv,
          {
            scope: o,
            placedSide: K,
            onArrowChange: U,
            arrowX: B,
            arrowY: ce,
            shouldHideArrow: le,
            children: /* @__PURE__ */ i.jsx(
              xt.div,
              {
                "data-side": K,
                "data-align": D,
                ...k,
                ref: C,
                style: {
                  ...k.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: M ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Nh.displayName = hc;
var Sh = "PopperArrow", Av = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, _h = b.forwardRef(function(r, o) {
  const { __scopePopper: l, ...c } = r, u = Tv(Sh, l), f = Av[u.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ i.jsx(
      "span",
      {
        ref: u.onArrowChange,
        style: {
          position: "absolute",
          left: u.arrowX,
          top: u.arrowY,
          [f]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[u.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[u.placedSide],
          visibility: u.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ i.jsx(
          Pv,
          {
            ...c,
            ref: o,
            style: {
              ...c.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
_h.displayName = Sh;
function Lv(t) {
  return t !== null;
}
var Ov = (t) => ({
  name: "transformOrigin",
  options: t,
  fn(r) {
    const { placement: o, rects: l, middlewareData: c } = r, f = c.arrow?.centerOffset !== 0, h = f ? 0 : t.arrowWidth, m = f ? 0 : t.arrowHeight, [y, g] = Ch(o), v = { start: "0%", center: "50%", end: "100%" }[g], w = (c.arrow?.x ?? 0) + h / 2, S = (c.arrow?.y ?? 0) + m / 2;
    let P = "", k = "";
    return y === "bottom" ? (P = f ? v : `${w}px`, k = `${-m}px`) : y === "top" ? (P = f ? v : `${w}px`, k = `${l.floating.height + m}px`) : y === "right" ? (P = `${-m}px`, k = f ? v : `${S}px`) : y === "left" && (P = `${l.floating.width + m}px`, k = f ? v : `${S}px`), { data: { x: P, y: k } };
  }
});
function Ch(t) {
  const [r, o = "center"] = t.split("-");
  return [r, o];
}
var Mv = jh, Iv = Nh, $v = _h;
function Fv(t, r) {
  return b.useReducer((o, l) => r[o][l] ?? o, t);
}
var mc = (t) => {
  const { present: r, children: o } = t, l = Dv(r), c = typeof o == "function" ? o({ present: l.isPresent }) : b.Children.only(o), u = Yt(l.ref, Bv(c));
  return typeof o == "function" || l.isPresent ? b.cloneElement(c, { ref: u }) : null;
};
mc.displayName = "Presence";
function Dv(t) {
  const [r, o] = b.useState(), l = b.useRef(null), c = b.useRef(t), u = b.useRef("none"), f = t ? "mounted" : "unmounted", [h, m] = Fv(f, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return b.useEffect(() => {
    const y = Jo(l.current);
    u.current = h === "mounted" ? y : "none";
  }, [h]), Jn(() => {
    const y = l.current, g = c.current;
    if (g !== t) {
      const w = u.current, S = Jo(y);
      t ? m("MOUNT") : S === "none" || y?.display === "none" ? m("UNMOUNT") : m(g && w !== S ? "ANIMATION_OUT" : "UNMOUNT"), c.current = t;
    }
  }, [t, m]), Jn(() => {
    if (r) {
      let y;
      const g = r.ownerDocument.defaultView ?? window, v = (S) => {
        const k = Jo(l.current).includes(CSS.escape(S.animationName));
        if (S.target === r && k && (m("ANIMATION_END"), !c.current)) {
          const j = r.style.animationFillMode;
          r.style.animationFillMode = "forwards", y = g.setTimeout(() => {
            r.style.animationFillMode === "forwards" && (r.style.animationFillMode = j);
          });
        }
      }, w = (S) => {
        S.target === r && (u.current = Jo(l.current));
      };
      return r.addEventListener("animationstart", w), r.addEventListener("animationcancel", v), r.addEventListener("animationend", v), () => {
        g.clearTimeout(y), r.removeEventListener("animationstart", w), r.removeEventListener("animationcancel", v), r.removeEventListener("animationend", v);
      };
    } else
      m("ANIMATION_END");
  }, [r, m]), {
    isPresent: ["mounted", "unmountSuspended"].includes(h),
    ref: b.useCallback((y) => {
      l.current = y ? getComputedStyle(y) : null, o(y);
    }, [])
  };
}
function Jo(t) {
  return t?.animationName || "none";
}
function Bv(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
var zv = /* @__PURE__ */ Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Uv(t) {
  const r = ({ children: o }) => /* @__PURE__ */ i.jsx(i.Fragment, { children: o });
  return r.displayName = `${t}.Slottable`, r.__radixId = zv, r;
}
var Wv = yi[" useInsertionEffect ".trim().toString()] || Jn;
function Ph({
  prop: t,
  defaultProp: r,
  onChange: o = () => {
  },
  caller: l
}) {
  const [c, u, f] = Hv({
    defaultProp: r,
    onChange: o
  }), h = t !== void 0, m = h ? t : c;
  {
    const g = b.useRef(t !== void 0);
    b.useEffect(() => {
      const v = g.current;
      v !== h && console.warn(
        `${l} is changing from ${v ? "controlled" : "uncontrolled"} to ${h ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), g.current = h;
    }, [h, l]);
  }
  const y = b.useCallback(
    (g) => {
      if (h) {
        const v = Vv(g) ? g(t) : g;
        v !== t && f.current?.(v);
      } else
        u(g);
    },
    [h, t, u, f]
  );
  return [m, y];
}
function Hv({
  defaultProp: t,
  onChange: r
}) {
  const [o, l] = b.useState(t), c = b.useRef(o), u = b.useRef(r);
  return Wv(() => {
    u.current = r;
  }, [r]), b.useEffect(() => {
    c.current !== o && (u.current?.(o), c.current = o);
  }, [o, c]), [o, l, u];
}
function Vv(t) {
  return typeof t == "function";
}
var Yv = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), Gv = "VisuallyHidden", Eh = b.forwardRef(
  (t, r) => /* @__PURE__ */ i.jsx(
    xt.span,
    {
      ...t,
      ref: r,
      style: { ...Yv, ...t.style }
    }
  )
);
Eh.displayName = Gv;
var Qv = Eh, [Ni] = Os("Tooltip", [
  wh
]), gc = wh(), Rh = "TooltipProvider", Kv = 700, gp = "tooltip.open", [qv, Th] = Ni(Rh), Ah = (t) => {
  const {
    __scopeTooltip: r,
    delayDuration: o = Kv,
    skipDelayDuration: l = 300,
    disableHoverableContent: c = !1,
    children: u
  } = t, f = b.useRef(!0), h = b.useRef(!1), m = b.useRef(0);
  return b.useEffect(() => {
    const y = m.current;
    return () => window.clearTimeout(y);
  }, []), /* @__PURE__ */ i.jsx(
    qv,
    {
      scope: r,
      isOpenDelayedRef: f,
      delayDuration: o,
      onOpen: b.useCallback(() => {
        window.clearTimeout(m.current), f.current = !1;
      }, []),
      onClose: b.useCallback(() => {
        window.clearTimeout(m.current), m.current = window.setTimeout(
          () => f.current = !0,
          l
        );
      }, [l]),
      isPointerInTransitRef: h,
      onPointerInTransitChange: b.useCallback((y) => {
        h.current = y;
      }, []),
      disableHoverableContent: c,
      children: u
    }
  );
};
Ah.displayName = Rh;
var Lh = "Tooltip", [eN, Si] = Ni(Lh), Yl = "TooltipTrigger", Xv = b.forwardRef(
  (t, r) => {
    const { __scopeTooltip: o, ...l } = t, c = Si(Yl, o), u = Th(Yl, o), f = gc(o), h = b.useRef(null), m = Yt(r, h, c.onTriggerChange), y = b.useRef(!1), g = b.useRef(!1), v = b.useCallback(() => y.current = !1, []);
    return b.useEffect(() => () => document.removeEventListener("pointerup", v), [v]), /* @__PURE__ */ i.jsx(Mv, { asChild: !0, ...f, children: /* @__PURE__ */ i.jsx(
      xt.button,
      {
        "aria-describedby": c.open ? c.contentId : void 0,
        "data-state": c.stateAttribute,
        ...l,
        ref: m,
        onPointerMove: Ye(t.onPointerMove, (w) => {
          w.pointerType !== "touch" && !g.current && !u.isPointerInTransitRef.current && (c.onTriggerEnter(), g.current = !0);
        }),
        onPointerLeave: Ye(t.onPointerLeave, () => {
          c.onTriggerLeave(), g.current = !1;
        }),
        onPointerDown: Ye(t.onPointerDown, () => {
          c.open && c.onClose(), y.current = !0, document.addEventListener("pointerup", v, { once: !0 });
        }),
        onFocus: Ye(t.onFocus, () => {
          y.current || c.onOpen();
        }),
        onBlur: Ye(t.onBlur, c.onClose),
        onClick: Ye(t.onClick, c.onClose)
      }
    ) });
  }
);
Xv.displayName = Yl;
var Zv = "TooltipPortal", [tN, Jv] = Ni(Zv, {
  forceMount: void 0
}), Tr = "TooltipContent", Oh = b.forwardRef(
  (t, r) => {
    const o = Jv(Tr, t.__scopeTooltip), { forceMount: l = o.forceMount, side: c = "top", ...u } = t, f = Si(Tr, t.__scopeTooltip);
    return /* @__PURE__ */ i.jsx(mc, { present: l || f.open, children: f.disableHoverableContent ? /* @__PURE__ */ i.jsx(Mh, { side: c, ...u, ref: r }) : /* @__PURE__ */ i.jsx(ew, { side: c, ...u, ref: r }) });
  }
), ew = b.forwardRef((t, r) => {
  const o = Si(Tr, t.__scopeTooltip), l = Th(Tr, t.__scopeTooltip), c = b.useRef(null), u = Yt(r, c), [f, h] = b.useState(null), { trigger: m, onClose: y } = o, g = c.current, { onPointerInTransitChange: v } = l, w = b.useCallback(() => {
    h(null), v(!1);
  }, [v]), S = b.useCallback(
    (P, k) => {
      const j = P.currentTarget, A = { x: P.clientX, y: P.clientY }, _ = ow(A, j.getBoundingClientRect()), C = iw(A, _), F = aw(k.getBoundingClientRect()), U = cw([...C, ...F]);
      h(U), v(!0);
    },
    [v]
  );
  return b.useEffect(() => () => w(), [w]), b.useEffect(() => {
    if (m && g) {
      const P = (j) => S(j, g), k = (j) => S(j, m);
      return m.addEventListener("pointerleave", P), g.addEventListener("pointerleave", k), () => {
        m.removeEventListener("pointerleave", P), g.removeEventListener("pointerleave", k);
      };
    }
  }, [m, g, S, w]), b.useEffect(() => {
    if (f) {
      const P = (k) => {
        const j = k.target, A = { x: k.clientX, y: k.clientY }, _ = m?.contains(j) || g?.contains(j), C = !lw(A, f);
        _ ? w() : C && (w(), y());
      };
      return document.addEventListener("pointermove", P), () => document.removeEventListener("pointermove", P);
    }
  }, [m, g, f, y, w]), /* @__PURE__ */ i.jsx(Mh, { ...t, ref: u });
}), [tw, nw] = Ni(Lh, { isInside: !1 }), rw = /* @__PURE__ */ Uv("TooltipContent"), Mh = b.forwardRef(
  (t, r) => {
    const {
      __scopeTooltip: o,
      children: l,
      "aria-label": c,
      onEscapeKeyDown: u,
      onPointerDownOutside: f,
      ...h
    } = t, m = Si(Tr, o), y = gc(o), { onClose: g } = m;
    return b.useEffect(() => (document.addEventListener(gp, g), () => document.removeEventListener(gp, g)), [g]), b.useEffect(() => {
      if (m.trigger) {
        const v = (w) => {
          w.target?.contains(m.trigger) && g();
        };
        return window.addEventListener("scroll", v, { capture: !0 }), () => window.removeEventListener("scroll", v, { capture: !0 });
      }
    }, [m.trigger, g]), /* @__PURE__ */ i.jsx(
      rh,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: u,
        onPointerDownOutside: f,
        onFocusOutside: (v) => v.preventDefault(),
        onDismiss: g,
        children: /* @__PURE__ */ i.jsxs(
          Iv,
          {
            "data-state": m.stateAttribute,
            ...y,
            ...h,
            ref: r,
            style: {
              ...h.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ i.jsx(rw, { children: l }),
              /* @__PURE__ */ i.jsx(tw, { scope: o, isInside: !0, children: /* @__PURE__ */ i.jsx(Qv, { id: m.contentId, role: "tooltip", children: c || l }) })
            ]
          }
        )
      }
    );
  }
);
Oh.displayName = Tr;
var Ih = "TooltipArrow", sw = b.forwardRef(
  (t, r) => {
    const { __scopeTooltip: o, ...l } = t, c = gc(o);
    return nw(
      Ih,
      o
    ).isInside ? null : /* @__PURE__ */ i.jsx($v, { ...c, ...l, ref: r });
  }
);
sw.displayName = Ih;
function ow(t, r) {
  const o = Math.abs(r.top - t.y), l = Math.abs(r.bottom - t.y), c = Math.abs(r.right - t.x), u = Math.abs(r.left - t.x);
  switch (Math.min(o, l, c, u)) {
    case u:
      return "left";
    case c:
      return "right";
    case o:
      return "top";
    case l:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function iw(t, r, o = 5) {
  const l = [];
  switch (r) {
    case "top":
      l.push(
        { x: t.x - o, y: t.y + o },
        { x: t.x + o, y: t.y + o }
      );
      break;
    case "bottom":
      l.push(
        { x: t.x - o, y: t.y - o },
        { x: t.x + o, y: t.y - o }
      );
      break;
    case "left":
      l.push(
        { x: t.x + o, y: t.y - o },
        { x: t.x + o, y: t.y + o }
      );
      break;
    case "right":
      l.push(
        { x: t.x - o, y: t.y - o },
        { x: t.x - o, y: t.y + o }
      );
      break;
  }
  return l;
}
function aw(t) {
  const { top: r, right: o, bottom: l, left: c } = t;
  return [
    { x: c, y: r },
    { x: o, y: r },
    { x: o, y: l },
    { x: c, y: l }
  ];
}
function lw(t, r) {
  const { x: o, y: l } = t;
  let c = !1;
  for (let u = 0, f = r.length - 1; u < r.length; f = u++) {
    const h = r[u], m = r[f], y = h.x, g = h.y, v = m.x, w = m.y;
    g > l != w > l && o < (v - y) * (l - g) / (w - g) + y && (c = !c);
  }
  return c;
}
function cw(t) {
  const r = t.slice();
  return r.sort((o, l) => o.x < l.x ? -1 : o.x > l.x ? 1 : o.y < l.y ? -1 : o.y > l.y ? 1 : 0), uw(r);
}
function uw(t) {
  if (t.length <= 1) return t.slice();
  const r = [];
  for (let l = 0; l < t.length; l++) {
    const c = t[l];
    for (; r.length >= 2; ) {
      const u = r[r.length - 1], f = r[r.length - 2];
      if ((u.x - f.x) * (c.y - f.y) >= (u.y - f.y) * (c.x - f.x)) r.pop();
      else break;
    }
    r.push(c);
  }
  r.pop();
  const o = [];
  for (let l = t.length - 1; l >= 0; l--) {
    const c = t[l];
    for (; o.length >= 2; ) {
      const u = o[o.length - 1], f = o[o.length - 2];
      if ((u.x - f.x) * (c.y - f.y) >= (u.y - f.y) * (c.x - f.x)) o.pop();
      else break;
    }
    o.push(c);
  }
  return o.pop(), r.length === 1 && o.length === 1 && r[0].x === o[0].x && r[0].y === o[0].y ? r : r.concat(o);
}
var dw = Ah, $h = Oh;
function Fh(t) {
  var r, o, l = "";
  if (typeof t == "string" || typeof t == "number") l += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var c = t.length;
    for (r = 0; r < c; r++) t[r] && (o = Fh(t[r])) && (l && (l += " "), l += o);
  } else for (o in t) t[o] && (l && (l += " "), l += o);
  return l;
}
function Dh() {
  for (var t, r, o = 0, l = "", c = arguments.length; o < c; o++) (t = arguments[o]) && (r = Fh(t)) && (l && (l += " "), l += r);
  return l;
}
const yc = "-", fw = (t) => {
  const r = hw(t), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: l
  } = t;
  return {
    getClassGroupId: (f) => {
      const h = f.split(yc);
      return h[0] === "" && h.length !== 1 && h.shift(), Bh(h, r) || pw(f);
    },
    getConflictingClassGroupIds: (f, h) => {
      const m = o[f] || [];
      return h && l[f] ? [...m, ...l[f]] : m;
    }
  };
}, Bh = (t, r) => {
  if (t.length === 0)
    return r.classGroupId;
  const o = t[0], l = r.nextPart.get(o), c = l ? Bh(t.slice(1), l) : void 0;
  if (c)
    return c;
  if (r.validators.length === 0)
    return;
  const u = t.join(yc);
  return r.validators.find(({
    validator: f
  }) => f(u))?.classGroupId;
}, yp = /^\[(.+)\]$/, pw = (t) => {
  if (yp.test(t)) {
    const r = yp.exec(t)[1], o = r?.substring(0, r.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, hw = (t) => {
  const {
    theme: r,
    prefix: o
  } = t, l = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return gw(Object.entries(t.classGroups), o).forEach(([u, f]) => {
    Gl(f, l, u, r);
  }), l;
}, Gl = (t, r, o, l) => {
  t.forEach((c) => {
    if (typeof c == "string") {
      const u = c === "" ? r : xp(r, c);
      u.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (mw(c)) {
        Gl(c(l), r, o, l);
        return;
      }
      r.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([u, f]) => {
      Gl(f, xp(r, u), o, l);
    });
  });
}, xp = (t, r) => {
  let o = t;
  return r.split(yc).forEach((l) => {
    o.nextPart.has(l) || o.nextPart.set(l, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(l);
  }), o;
}, mw = (t) => t.isThemeGetter, gw = (t, r) => r ? t.map(([o, l]) => {
  const c = l.map((u) => typeof u == "string" ? r + u : typeof u == "object" ? Object.fromEntries(Object.entries(u).map(([f, h]) => [r + f, h])) : u);
  return [o, c];
}) : t, yw = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, o = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  const c = (u, f) => {
    o.set(u, f), r++, r > t && (r = 0, l = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(u) {
      let f = o.get(u);
      if (f !== void 0)
        return f;
      if ((f = l.get(u)) !== void 0)
        return c(u, f), f;
    },
    set(u, f) {
      o.has(u) ? o.set(u, f) : c(u, f);
    }
  };
}, zh = "!", xw = (t) => {
  const {
    separator: r,
    experimentalParseClassName: o
  } = t, l = r.length === 1, c = r[0], u = r.length, f = (h) => {
    const m = [];
    let y = 0, g = 0, v;
    for (let j = 0; j < h.length; j++) {
      let A = h[j];
      if (y === 0) {
        if (A === c && (l || h.slice(j, j + u) === r)) {
          m.push(h.slice(g, j)), g = j + u;
          continue;
        }
        if (A === "/") {
          v = j;
          continue;
        }
      }
      A === "[" ? y++ : A === "]" && y--;
    }
    const w = m.length === 0 ? h : h.substring(g), S = w.startsWith(zh), P = S ? w.substring(1) : w, k = v && v > g ? v - g : void 0;
    return {
      modifiers: m,
      hasImportantModifier: S,
      baseClassName: P,
      maybePostfixModifierPosition: k
    };
  };
  return o ? (h) => o({
    className: h,
    parseClassName: f
  }) : f;
}, vw = (t) => {
  if (t.length <= 1)
    return t;
  const r = [];
  let o = [];
  return t.forEach((l) => {
    l[0] === "[" ? (r.push(...o.sort(), l), o = []) : o.push(l);
  }), r.push(...o.sort()), r;
}, ww = (t) => ({
  cache: yw(t.cacheSize),
  parseClassName: xw(t),
  ...fw(t)
}), bw = /\s+/, kw = (t, r) => {
  const {
    parseClassName: o,
    getClassGroupId: l,
    getConflictingClassGroupIds: c
  } = r, u = [], f = t.trim().split(bw);
  let h = "";
  for (let m = f.length - 1; m >= 0; m -= 1) {
    const y = f[m], {
      modifiers: g,
      hasImportantModifier: v,
      baseClassName: w,
      maybePostfixModifierPosition: S
    } = o(y);
    let P = !!S, k = l(P ? w.substring(0, S) : w);
    if (!k) {
      if (!P) {
        h = y + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (k = l(w), !k) {
        h = y + (h.length > 0 ? " " + h : h);
        continue;
      }
      P = !1;
    }
    const j = vw(g).join(":"), A = v ? j + zh : j, _ = A + k;
    if (u.includes(_))
      continue;
    u.push(_);
    const C = c(k, P);
    for (let F = 0; F < C.length; ++F) {
      const U = C[F];
      u.push(A + U);
    }
    h = y + (h.length > 0 ? " " + h : h);
  }
  return h;
};
function jw() {
  let t = 0, r, o, l = "";
  for (; t < arguments.length; )
    (r = arguments[t++]) && (o = Uh(r)) && (l && (l += " "), l += o);
  return l;
}
const Uh = (t) => {
  if (typeof t == "string")
    return t;
  let r, o = "";
  for (let l = 0; l < t.length; l++)
    t[l] && (r = Uh(t[l])) && (o && (o += " "), o += r);
  return o;
};
function Nw(t, ...r) {
  let o, l, c, u = f;
  function f(m) {
    const y = r.reduce((g, v) => v(g), t());
    return o = ww(y), l = o.cache.get, c = o.cache.set, u = h, h(m);
  }
  function h(m) {
    const y = l(m);
    if (y)
      return y;
    const g = kw(m, o);
    return c(m, g), g;
  }
  return function() {
    return u(jw.apply(null, arguments));
  };
}
const Re = (t) => {
  const r = (o) => o[t] || [];
  return r.isThemeGetter = !0, r;
}, Wh = /^\[(?:([a-z-]+):)?(.+)\]$/i, Sw = /^\d+\/\d+$/, _w = /* @__PURE__ */ new Set(["px", "full", "screen"]), Cw = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Pw = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ew = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Rw = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Tw = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rn = (t) => Pr(t) || _w.has(t) || Sw.test(t), Cn = (t) => Mr(t, "length", Dw), Pr = (t) => !!t && !Number.isNaN(Number(t)), Rl = (t) => Mr(t, "number", Pr), js = (t) => !!t && Number.isInteger(Number(t)), Aw = (t) => t.endsWith("%") && Pr(t.slice(0, -1)), ye = (t) => Wh.test(t), Pn = (t) => Cw.test(t), Lw = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ow = (t) => Mr(t, Lw, Hh), Mw = (t) => Mr(t, "position", Hh), Iw = /* @__PURE__ */ new Set(["image", "url"]), $w = (t) => Mr(t, Iw, zw), Fw = (t) => Mr(t, "", Bw), Ns = () => !0, Mr = (t, r, o) => {
  const l = Wh.exec(t);
  return l ? l[1] ? typeof r == "string" ? l[1] === r : r.has(l[1]) : o(l[2]) : !1;
}, Dw = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Pw.test(t) && !Ew.test(t)
), Hh = () => !1, Bw = (t) => Rw.test(t), zw = (t) => Tw.test(t), Uw = () => {
  const t = Re("colors"), r = Re("spacing"), o = Re("blur"), l = Re("brightness"), c = Re("borderColor"), u = Re("borderRadius"), f = Re("borderSpacing"), h = Re("borderWidth"), m = Re("contrast"), y = Re("grayscale"), g = Re("hueRotate"), v = Re("invert"), w = Re("gap"), S = Re("gradientColorStops"), P = Re("gradientColorStopPositions"), k = Re("inset"), j = Re("margin"), A = Re("opacity"), _ = Re("padding"), C = Re("saturate"), F = Re("scale"), U = Re("sepia"), H = Re("skew"), Y = Re("space"), X = Re("translate"), se = () => ["auto", "contain", "none"], ne = () => ["auto", "hidden", "clip", "visible", "scroll"], ie = () => ["auto", ye, r], Q = () => [ye, r], z = () => ["", rn, Cn], Z = () => ["auto", Pr, ye], ge = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], fe = () => ["solid", "dashed", "dotted", "double", "none"], M = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], K = () => ["", "0", ye], D = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], E = () => [Pr, ye];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ns],
      spacing: [rn, Cn],
      blur: ["none", "", Pn, ye],
      brightness: E(),
      borderColor: [t],
      borderRadius: ["none", "", "full", Pn, ye],
      borderSpacing: Q(),
      borderWidth: z(),
      contrast: E(),
      grayscale: K(),
      hueRotate: E(),
      invert: K(),
      gap: Q(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Aw, Cn],
      inset: ie(),
      margin: ie(),
      opacity: E(),
      padding: Q(),
      saturate: E(),
      scale: E(),
      sepia: K(),
      skew: E(),
      space: Q(),
      translate: Q()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", ye]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Pn]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": D()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": D()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...ge(), ye]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: ne()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": ne()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": ne()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: se()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": se()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": se()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [k]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [k]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [k]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [k]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [k]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [k]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [k]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [k]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [k]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", js, ye]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: ie()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", ye]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: K()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: K()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", js, ye]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Ns]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", js, ye]
        }, ye]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Z()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Z()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Ns]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [js, ye]
        }, ye]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Z()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Z()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", ye]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", ye]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [w]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [w]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [w]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...L()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...L(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...L(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [_]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [_]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [_]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [_]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [_]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [_]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [_]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [_]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [_]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [j]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [j]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [j]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [j]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [j]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [j]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [j]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [j]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [j]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [Y]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [Y]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", ye, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [ye, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [ye, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [Pn]
        }, Pn]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [ye, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [ye, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [ye, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [ye, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Pn, Cn]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Rl]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ns]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", ye]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Pr, Rl]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", rn, ye]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ye]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", ye]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [t]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [A]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [t]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [A]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...fe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", rn, Cn]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", rn, ye]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [t]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: Q()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ye]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ye]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [A]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...ge(), Mw]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Ow]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, $w]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [t]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [P]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [P]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [P]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [S]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [S]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [S]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [u]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [u]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [u]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [u]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [u]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [u]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [u]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [u]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [u]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [u]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [u]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [u]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [u]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [u]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [u]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [h]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [h]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [h]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [h]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [h]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [h]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [h]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [h]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [h]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [A]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...fe(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [h]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [h]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [A]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: fe()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [c]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [c]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [c]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [c]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [c]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [c]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [c]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [c]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [c]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [c]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...fe()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [rn, ye]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [rn, Cn]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [t]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: z()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [t]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [A]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [rn, Cn]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", Pn, Fw]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Ns]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [A]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...M(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": M()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [o]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [l]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [m]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Pn, ye]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [y]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [g]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [v]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [C]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [U]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [o]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [l]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [m]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [y]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [g]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [v]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [A]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [C]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [U]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [f]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [f]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [f]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", ye]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: E()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", ye]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: E()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", ye]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [F]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [F]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [F]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [js, ye]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [X]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [X]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [H]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [H]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", ye]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", t]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ye]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [t]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": Q()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": Q()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": Q()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": Q()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": Q()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": Q()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": Q()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": Q()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": Q()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": Q()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": Q()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": Q()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": Q()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": Q()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": Q()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": Q()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": Q()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": Q()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ye]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [t, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [rn, Cn, Rl]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [t, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Ww = /* @__PURE__ */ Nw(Uw);
function vt(...t) {
  return Ww(Dh(t));
}
const Hw = dw, Vw = b.forwardRef(({ className: t, sideOffset: r = 4, ...o }, l) => /* @__PURE__ */ i.jsx(
  $h,
  {
    ref: l,
    sideOffset: r,
    className: vt(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      t
    ),
    ...o
  }
));
Vw.displayName = $h.displayName;
var Yw = /* @__PURE__ */ Symbol.for("react.lazy"), di = yi[" use ".trim().toString()];
function Gw(t) {
  return typeof t == "object" && t !== null && "then" in t;
}
function Vh(t) {
  return t != null && typeof t == "object" && "$$typeof" in t && t.$$typeof === Yw && "_payload" in t && Gw(t._payload);
}
// @__NO_SIDE_EFFECTS__
function Qw(t) {
  const r = /* @__PURE__ */ qw(t), o = b.forwardRef((l, c) => {
    let { children: u, ...f } = l;
    Vh(u) && typeof di == "function" && (u = di(u._payload));
    const h = b.Children.toArray(u), m = h.find(Zw);
    if (m) {
      const y = m.props.children, g = h.map((v) => v === m ? b.Children.count(y) > 1 ? b.Children.only(null) : b.isValidElement(y) ? y.props.children : null : v);
      return /* @__PURE__ */ i.jsx(r, { ...f, ref: c, children: b.isValidElement(y) ? b.cloneElement(y, void 0, g) : null });
    }
    return /* @__PURE__ */ i.jsx(r, { ...f, ref: c, children: u });
  });
  return o.displayName = `${t}.Slot`, o;
}
var Kw = /* @__PURE__ */ Qw("Slot");
// @__NO_SIDE_EFFECTS__
function qw(t) {
  const r = b.forwardRef((o, l) => {
    let { children: c, ...u } = o;
    if (Vh(c) && typeof di == "function" && (c = di(c._payload)), b.isValidElement(c)) {
      const f = e1(c), h = Jw(u, c.props);
      return c.type !== b.Fragment && (h.ref = l ? vi(l, f) : f), b.cloneElement(c, h);
    }
    return b.Children.count(c) > 1 ? b.Children.only(null) : null;
  });
  return r.displayName = `${t}.SlotClone`, r;
}
var Xw = /* @__PURE__ */ Symbol("radix.slottable");
function Zw(t) {
  return b.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === Xw;
}
function Jw(t, r) {
  const o = { ...r };
  for (const l in r) {
    const c = t[l], u = r[l];
    /^on[A-Z]/.test(l) ? c && u ? o[l] = (...h) => {
      const m = u(...h);
      return c(...h), m;
    } : c && (o[l] = c) : l === "style" ? o[l] = { ...c, ...u } : l === "className" && (o[l] = [c, u].filter(Boolean).join(" "));
  }
  return { ...t, ...o };
}
function e1(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
const vp = (t) => typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t, wp = Dh, t1 = (t, r) => (o) => {
  var l;
  if (r?.variants == null) return wp(t, o?.class, o?.className);
  const { variants: c, defaultVariants: u } = r, f = Object.keys(c).map((y) => {
    const g = o?.[y], v = u?.[y];
    if (g === null) return null;
    const w = vp(g) || vp(v);
    return c[y][w];
  }), h = o && Object.entries(o).reduce((y, g) => {
    let [v, w] = g;
    return w === void 0 || (y[v] = w), y;
  }, {}), m = r == null || (l = r.compoundVariants) === null || l === void 0 ? void 0 : l.reduce((y, g) => {
    let { class: v, className: w, ...S } = g;
    return Object.entries(S).every((P) => {
      let [k, j] = P;
      return Array.isArray(j) ? j.includes({
        ...u,
        ...h
      }[k]) : {
        ...u,
        ...h
      }[k] === j;
    }) ? [
      ...y,
      v,
      w
    ] : y;
  }, []);
  return wp(t, f, m, o?.class, o?.className);
}, n1 = t1(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border border-primary-border",
        destructive: "bg-destructive text-destructive-foreground border border-destructive-border",
        outline: (
          // Shows the background color of whatever card / sidebar / accent background it is inside of.
          // Inherits the current text color.
          " border [border-color:var(--button-outline)]  shadow-xs active:shadow-none "
        ),
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border ",
        // Add a transparent border so that when someone toggles a border on later, it doesn't shift layout/size.
        ghost: "border border-transparent"
      },
      // Heights are set as "min" heights, because sometimes Ai will place large amount of content
      // inside buttons. With a min-height they will look appropriate with small amounts of content,
      // but will expand to fit large amounts of content.
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Yh = b.forwardRef(
  ({ className: t, variant: r, size: o, asChild: l = !1, ...c }, u) => {
    const f = l ? Kw : "button";
    return /* @__PURE__ */ i.jsx(
      f,
      {
        className: vt(n1({ variant: r, size: o, className: t })),
        ref: u,
        ...c
      }
    );
  }
);
Yh.displayName = "Button";
function be({
  className: t,
  ...r
}) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: vt("animate-pulse rounded-md bg-muted", t),
      ...r
    }
  );
}
const r1 = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Gh = (...t) => t.filter((r, o, l) => !!r && l.indexOf(r) === o).join(" ");
var s1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const o1 = b.forwardRef(
  ({
    color: t = "currentColor",
    size: r = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: l,
    className: c = "",
    children: u,
    iconNode: f,
    ...h
  }, m) => b.createElement(
    "svg",
    {
      ref: m,
      ...s1,
      width: r,
      height: r,
      stroke: t,
      strokeWidth: l ? Number(o) * 24 / Number(r) : o,
      className: Gh("lucide", c),
      ...h
    },
    [
      ...f.map(([y, g]) => b.createElement(y, g)),
      ...Array.isArray(u) ? u : [u]
    ]
  )
);
const Oe = (t, r) => {
  const o = b.forwardRef(
    ({ className: l, ...c }, u) => b.createElement(o1, {
      ref: u,
      iconNode: r,
      className: Gh(`lucide-${r1(t)}`, l),
      ...c
    })
  );
  return o.displayName = `${t}`, o;
};
const xc = Oe("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
const i1 = Oe("ArrowDownAZ", [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
]);
const a1 = Oe("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
Oe("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
const l1 = Oe("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
const Qh = Oe("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const vc = Oe("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
Oe("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const bp = Oe("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
const c1 = Oe("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
const Ql = Oe("HeartPulse", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }]
]);
const Kh = Oe("Keyboard", [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
]);
const qh = Oe("Layers", [
  [
    "path",
    {
      d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
      key: "8b97xw"
    }
  ],
  ["path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65", key: "dd6zsq" }],
  ["path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65", key: "ep9fru" }]
]);
const u1 = Oe("RefreshCcw", [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
]);
const Er = Oe("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const d1 = Oe("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
const f1 = Oe("Table", [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
]);
const wc = Oe("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const p1 = Oe("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
const bc = Oe("Trophy", [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
]);
const kc = Oe("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
const h1 = Oe("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const Xh = Oe("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
async function m1(t, r) {
  const o = await fetch(`/api/players/${t}/production?scoring=${r}`);
  if (!o.ok) throw new Error(`production ${o.status}`);
  const l = await o.json();
  return Array.isArray(l?.seasons) ? l.seasons : [];
}
async function g1(t, r, o) {
  const l = await fetch(`/api/players/${t}/game-logs?season=${r}&type=${o}`);
  if (!l.ok) throw new Error(`game-logs ${l.status}`);
  const c = await l.json();
  return Array.isArray(c?.logs) ? c.logs : [];
}
const y1 = {
  JAC: "JAX",
  WSH: "WAS",
  OAK: "LV",
  STL: "LAR",
  SD: "LAC",
  LA: "LAR"
}, Kl = {
  ARI: "Arizona Cardinals",
  ATL: "Atlanta Falcons",
  BAL: "Baltimore Ravens",
  BUF: "Buffalo Bills",
  CAR: "Carolina Panthers",
  CHI: "Chicago Bears",
  CIN: "Cincinnati Bengals",
  CLE: "Cleveland Browns",
  DAL: "Dallas Cowboys",
  DEN: "Denver Broncos",
  DET: "Detroit Lions",
  GB: "Green Bay Packers",
  HOU: "Houston Texans",
  IND: "Indianapolis Colts",
  JAX: "Jacksonville Jaguars",
  KC: "Kansas City Chiefs",
  LAC: "Los Angeles Chargers",
  LAR: "Los Angeles Rams",
  LV: "Las Vegas Raiders",
  MIA: "Miami Dolphins",
  MIN: "Minnesota Vikings",
  NE: "New England Patriots",
  NO: "New Orleans Saints",
  NYG: "New York Giants",
  NYJ: "New York Jets",
  PHI: "Philadelphia Eagles",
  PIT: "Pittsburgh Steelers",
  SEA: "Seattle Seahawks",
  SF: "San Francisco 49ers",
  TB: "Tampa Bay Buccaneers",
  TEN: "Tennessee Titans",
  WAS: "Washington Commanders"
}, jc = {
  ARI: "#97233F",
  ATL: "#A71930",
  BAL: "#241773",
  BUF: "#00338D",
  CAR: "#0085CA",
  CHI: "#C83200",
  CIN: "#FB4F14",
  CLE: "#311D00",
  DAL: "#003594",
  DEN: "#FB4F14",
  DET: "#0076B6",
  GB: "#203731",
  HOU: "#03202F",
  IND: "#002C5F",
  JAX: "#006778",
  KC: "#E31837",
  LAC: "#0080C6",
  LAR: "#003594",
  LV: "#A5ACAF",
  MIA: "#008E97",
  MIN: "#4F2683",
  NE: "#002244",
  NO: "#D3BC8D",
  NYG: "#0B2265",
  NYJ: "#125740",
  PHI: "#004C54",
  PIT: "#FFB612",
  SEA: "#002244",
  SF: "#AA0000",
  TB: "#D50A0A",
  TEN: "#0C2340",
  WAS: "#5A1414"
}, x1 = {
  QB: "Quarterback",
  RB: "Running Back",
  WR: "Wide Receiver",
  TE: "Tight End",
  K: "Kicker",
  DEF: "Defense"
};
function ei(t) {
  const r = t.toUpperCase().trim();
  return y1[r] || r;
}
function v1(t, r) {
  if (!t || t.length === 0)
    return r ? ei(r) : null;
  const o = {};
  for (const f of t) {
    if (!f || !f.team) continue;
    const h = ei(f.team);
    !h || h === "FA" || (o[h] = (o[h] || 0) + 1);
  }
  const l = Object.keys(o);
  if (l.length === 0)
    return r ? ei(r) : null;
  let c = "", u = 0;
  for (const f of l) {
    const h = o[f];
    h > u && (c = f, u = h);
  }
  return c || (r ? ei(r) : null);
}
const w1 = {
  standard: "Standard",
  half: "Half-PPR",
  ppr: "PPR"
};
function b1(t, r) {
  let o = 0;
  return o += (t.pass_yd ?? 0) * 0.04, o += (t.pass_td ?? 0) * 4, o += (t.pass_int ?? 0) * -1, o += (t.rush_yd ?? 0) * 0.1, o += (t.rush_td ?? 0) * 6, o += (t.rec_yd ?? 0) * 0.1, o += (t.rec_td ?? 0) * 6, o += (t.fgm ?? 0) * 3, o += (t.xpm ?? 0) * 1, r === "ppr" ? o += (t.rec ?? 0) * 1 : r === "half" && (o += (t.rec ?? 0) * 0.5), Math.round(o * 100) / 100;
}
function k1(t, r) {
  return r === "ppr" ? t.pts_ppr : r === "half" && t.pts_half_ppr != null ? t.pts_half_ppr : b1(t, r);
}
const j1 = /* @__PURE__ */ new Set(["rank", "playerName", "player_name", "name", "team", "nfl_team"]), N1 = /* @__PURE__ */ new Set([
  "playerId",
  "player_id",
  "sleeper_id",
  "sleeperId",
  "season",
  "position",
  "age",
  "contestedCatchRate",
  "yardsAfterContactPerReception"
]), S1 = {
  attempts: "Volume / Usage",
  completions: "Volume / Usage",
  passingYards: "Volume / Usage",
  airYards: "Volume / Usage",
  completedAirYards: "Volume / Usage",
  redZoneAttempts: "Volume / Usage",
  passingTouchdowns: "Volume / Usage",
  rushAttempts: "Volume / Usage",
  rushYards: "Volume / Usage",
  rushTouchdowns: "Volume / Usage",
  games: "Volume / Usage",
  completedAirYardsPerCompletion: "Aggressiveness",
  yardsPerCatch: "Aggressiveness",
  completionPct: "Efficiency",
  onTargetPct: "Efficiency",
  poorThrows: "Efficiency",
  badThrowPct: "Efficiency",
  interceptions: "Efficiency",
  epaPerPlay: "Efficiency",
  successRate: "Efficiency",
  cpoe: "Efficiency",
  passes10Plus: "Explosiveness",
  passes20Plus: "Explosiveness",
  passes30Plus: "Explosiveness",
  passes40Plus: "Explosiveness",
  passes50Plus: "Explosiveness",
  longestPass: "Explosiveness",
  deepAttemptPct: "Explosiveness",
  pocketTime: "Pressure & Pocket",
  timeToThrow: "Pressure & Pocket",
  throwaways: "Pressure & Pocket",
  battedPasses: "Pressure & Pocket",
  scrambleRate: "Pressure & Pocket",
  yardsPerScramble: "Pressure & Pocket",
  hurries: "Pressure & Pocket",
  blitzes: "Pressure & Pocket",
  knockdowns: "Pressure & Pocket",
  sacks: "Pressure & Pocket",
  sackYardsLost: "Pressure & Pocket",
  fumbles: "Pressure & Pocket",
  pressurePct: "Pressure & Pocket",
  fantasyPoints: "Scoring"
}, _1 = {
  snapPct: "Usage / Workload",
  routes: "Usage / Workload",
  rushAttempts: "Usage / Workload",
  redZoneOpportunities: "Usage / Workload",
  goalLineCarries: "Usage / Workload",
  targets: "Usage / Workload",
  targetSharePct: "Usage / Workload",
  receptions: "Usage / Workload",
  redZoneTargets: "Usage / Workload",
  endZoneTargets: "Usage / Workload",
  games: "Usage / Workload",
  rushYards: "Production",
  yardsPerCarry: "Production",
  rushTouchdowns: "Production",
  receivingYards: "Production",
  yardsPerReception: "Production",
  receivingYardsAfterCatch: "Production",
  yardsPerRouteRun: "Production",
  receivingTouchdowns: "Production",
  epaPerPlay: "Production",
  rushes10Plus: "Explosive Play Ability",
  rushes20Plus: "Explosive Play Ability",
  rushes30Plus: "Explosive Play Ability",
  rushes40Plus: "Explosive Play Ability",
  rushes50Plus: "Explosive Play Ability",
  explosiveRunPct: "Explosive Play Ability",
  breakawayRunPct: "Explosive Play Ability",
  longestRush: "Explosive Play Ability",
  longestRushTouchdown: "Explosive Play Ability",
  brokenTackles: "Contact & Tackle Breaking",
  rushAttemptsPerBrokenTackle: "Contact & Tackle Breaking",
  yardsBeforeContactPerAttempt: "Contact & Tackle Breaking",
  yardsAfterContactPerAttempt: "Contact & Tackle Breaking",
  tackleEludedRate: "Contact & Tackle Breaking",
  fumbles: "Ball Security",
  tacklesForLoss: "Ball Security",
  tacklesForLossYards: "Ball Security",
  rushAttForNegativeYards: "Ball Security",
  fantasyPoints: "Scoring"
}, kp = {
  snapPct: "Usage / Role",
  routes: "Usage / Role",
  routePct: "Usage / Role",
  targets: "Usage / Role",
  targetsPerRouteRun: "Usage / Role",
  targetSharePct: "Usage / Role",
  airYardsPerTarget: "Usage / Role",
  airYardsPerReception: "Usage / Role",
  airYardsSharePct: "Usage / Role",
  wopr: "Usage / Role",
  redZoneTargets: "Usage / Role",
  endZoneTargets: "Usage / Role",
  games: "Usage / Role",
  receptions: "Production",
  receivingYards: "Production",
  totalYards: "Production",
  yardsBeforeCatchPerReception: "Production",
  yardsAfterCatchPerReception: "Production",
  yardsPerReception: "Production",
  yardsPerRouteRun: "Production",
  receivingTouchdowns: "Production",
  epaPerPlay: "Production",
  successRate: "Production",
  catchPct: "Hands",
  catchableTargets: "Hands",
  drops: "Hands",
  dropPct: "Hands",
  interceptionsWhenTargeted: "Hands",
  fumbles: "Hands",
  avoidedTackleRate: "Elusiveness",
  brokenTackles: "Elusiveness",
  receptions10Plus: "Explosiveness",
  receptions20Plus: "Explosiveness",
  receptions30Plus: "Explosiveness",
  receptions40Plus: "Explosiveness",
  receptions50Plus: "Explosiveness",
  longestReception: "Explosiveness",
  fantasyPoints: "Scoring"
}, C1 = {
  qb: S1,
  rb: _1,
  wr: kp,
  te: kp
}, P1 = {
  Scoring: "#d4af37",
  "Volume / Usage": "#f59e0b",
  "Usage / Workload": "#f59e0b",
  "Usage / Role": "#f59e0b",
  Aggressiveness: "#fb923c",
  Efficiency: "#60a5fa",
  Production: "#34d399",
  Explosiveness: "#c084fc",
  "Explosive Play Ability": "#c084fc",
  "Pressure & Pocket": "#22d3ee",
  Hands: "#2dd4bf",
  Elusiveness: "#fb7185",
  "Contact & Tackle Breaking": "#22d3ee",
  "Ball Security": "#f87171"
}, E1 = (t) => P1[t] ?? "#94a3b8";
function Zh(t, r) {
  return t == null ? "—" : typeof t == "number" ? Number.isFinite(t) ? r === "decimal" ? t.toFixed(2) : Number.isInteger(t) || Math.abs(t) >= 1e3 ? t.toLocaleString() : t.toFixed(2) : "—" : typeof t == "string" ? t || "—" : String(t);
}
function R1(t, r) {
  const o = C1[t], l = [], c = /* @__PURE__ */ new Map();
  for (const u of r) {
    if (j1.has(u.key) || N1.has(u.key)) continue;
    const f = o?.[u.key] ?? "Other";
    c.has(f) || (c.set(f, []), l.push(f)), c.get(f).push(u);
  }
  return l.map((u) => ({ label: u, accent: E1(u), cols: c.get(u) }));
}
function Jh(...t) {
  return t.filter(Boolean).join(" ");
}
function $s({ className: t, children: r }) {
  return /* @__PURE__ */ i.jsx("div", { className: Jh("sc-card", t), children: r });
}
function T1({ n: t = 4 }) {
  return /* @__PURE__ */ i.jsx("div", { className: "space-y-2.5 animate-pulse", children: Array.from({ length: t }).map((r, o) => /* @__PURE__ */ i.jsx("div", { className: "h-4 rounded bg-muted/60", style: { width: `${90 - o * 7}%` } }, o)) });
}
function A1({ icon: t, title: r, body: o }) {
  return /* @__PURE__ */ i.jsxs($s, { className: "flex flex-col items-center text-center gap-2 py-10", children: [
    /* @__PURE__ */ i.jsx(t, { className: "w-8 h-8 text-muted-foreground/60" }),
    /* @__PURE__ */ i.jsx("div", { className: "text-sm font-black text-foreground", children: r }),
    /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground max-w-sm", children: o })
  ] });
}
const Nc = {
  elite: { text: "#16a34a", bar: "#16a34a", border: "rgba(22,163,74,0.4)" },
  great: { text: "#0b3a7a", bar: "#0b3a7a", border: "rgba(11,58,122,0.3)" },
  solid: { text: "#d4af37", bar: "#d4af37", border: "rgba(212,175,55,0.45)" },
  average: { text: "#ea580c", bar: "#fb923c", border: "rgba(234,88,12,0.4)" },
  poor: { text: "#dc2626", bar: "#ef4444", border: "rgba(220,38,38,0.4)" }
};
function L1(t) {
  return t <= 10 ? "elite" : t <= 25 ? "great" : t <= 45 ? "solid" : t <= 65 ? "average" : "poor";
}
const O1 = {
  overview: "Overview",
  production: "Production",
  usage: "Usage",
  efficiency: "Efficiency",
  advanced: "Advanced"
}, M1 = [2025, 2024, 2023, "all"];
function I1({ card: t }) {
  const r = Nc[t.tier], o = Math.max(1, Math.round(t.rank / t.total * 100));
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: "rounded-xl border bg-card p-3.5 flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
      style: { borderColor: r.border },
      "data-testid": `rank-card-${t.key}`,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-baseline justify-between gap-1", children: [
          /* @__PURE__ */ i.jsxs("span", { className: "text-[26px] font-black leading-none tabular-nums", style: { color: r.text }, children: [
            "#",
            t.rank
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "text-[15px] font-black tabular-nums text-foreground", children: t.value })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] mt-1", children: [
          /* @__PURE__ */ i.jsxs("span", { className: "font-bold", style: { color: r.text }, children: [
            "Top ",
            o,
            "%"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground", children: [
            " · of ",
            t.total,
            " ",
            t.position,
            "s"
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "text-[11px] font-bold text-foreground mt-2.5 leading-tight", children: t.label }),
        /* @__PURE__ */ i.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-muted/50 overflow-hidden", children: /* @__PURE__ */ i.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: { width: `${t.percentile}%`, background: r.bar } }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "mt-2.5 space-y-0.5 text-[10px] text-muted-foreground leading-snug", children: [
          t.behindPlayer && /* @__PURE__ */ i.jsxs("div", { className: "truncate", children: [
            /* @__PURE__ */ i.jsx("span", { className: "opacity-60", children: "Behind:" }),
            " ",
            t.behindPlayer
          ] }),
          t.aheadPlayer && /* @__PURE__ */ i.jsxs("div", { className: "truncate", children: [
            /* @__PURE__ */ i.jsx("span", { className: "opacity-60", children: "Ahead of:" }),
            " ",
            t.aheadPlayer
          ] })
        ] })
      ]
    }
  );
}
function $1({ cards: t, pos: r }) {
  const o = b.useMemo(() => {
    const h = new Set(t.map((m) => m.category));
    return ["production", "usage", "efficiency", "advanced"].filter((m) => h.has(m));
  }, [t]), [l, c] = b.useState("overview"), u = ["overview", ...o], f = l === "overview" ? t.filter((h) => h.overview) : t.filter((h) => h.category === l);
  return /* @__PURE__ */ i.jsxs($s, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ i.jsx("h3", { className: "sc-sectitle", children: "Player Rank Snapshot" }),
      /* @__PURE__ */ i.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
        "How this ",
        r,
        " ranks among qualifying ",
        r,
        "s."
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: u.map((h) => {
      const m = l === h;
      return /* @__PURE__ */ i.jsx(
        "button",
        {
          onClick: () => c(h),
          "data-testid": `rank-tab-${h}`,
          className: "text-[11px] font-bold px-3 py-1 rounded-full border transition-colors",
          style: m ? { background: "#0b3a7a", color: "#fff", borderColor: "#0b3a7a" } : { background: "transparent", borderColor: "rgba(11,58,122,0.25)", color: "#64748b" },
          children: O1[h]
        },
        h
      );
    }) }),
    /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3", children: f.map((h) => /* @__PURE__ */ i.jsx(I1, { card: h }, h.key)) })
  ] });
}
function F1({ composites: t, pos: r }) {
  return t.length ? /* @__PURE__ */ i.jsxs($s, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ i.jsx("h3", { className: "sc-sectitle", children: "Metric Scores" }),
      /* @__PURE__ */ i.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
        "Where this ",
        r,
        " ranks on each role-based composite metric."
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3", children: t.map((o) => {
      const l = o.percentile != null && o.rank != null && o.total != null ? Math.max(1, Math.round(o.rank / o.total * 100)) : null, c = l != null ? Nc[L1(l)] : null;
      return /* @__PURE__ */ i.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: o.label }),
          /* @__PURE__ */ i.jsx("div", { className: "text-2xl font-black tabular-nums leading-none", style: { color: c?.text ?? "#94a3b8" }, children: o.rank != null ? `${r}${o.rank}` : "—" })
        ] }),
        l != null && o.total != null ? /* @__PURE__ */ i.jsxs("div", { className: "mt-1.5 text-[11px] font-semibold", children: [
          /* @__PURE__ */ i.jsxs("span", { className: "font-bold", style: { color: c?.text }, children: [
            "Top ",
            l,
            "%"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "text-foreground/55", children: [
            " · of ",
            o.total,
            " ",
            r,
            "s"
          ] })
        ] }) : /* @__PURE__ */ i.jsx("div", { className: "mt-1.5 text-[11px] text-muted-foreground/60", children: "Not enough data" }),
        /* @__PURE__ */ i.jsx("div", { className: "mt-2 text-[11px] text-muted-foreground leading-snug", children: o.explanation })
      ] }, o.label);
    }) })
  ] }) : null;
}
const D1 = /* @__PURE__ */ new Set(["Other", "Composite Grades", "Player Info"]);
function B1({ section: t, latest: r, pos: o, statRanks: l }) {
  const [c, u] = b.useState(!1);
  return /* @__PURE__ */ i.jsxs($s, { children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        onClick: () => u((f) => !f),
        "aria-expanded": c,
        "data-testid": `adv-section-toggle-${t.label}`,
        className: "w-full flex items-center justify-between gap-2 text-left",
        children: [
          /* @__PURE__ */ i.jsx("h3", { className: "sc-sectitle", children: t.label }),
          /* @__PURE__ */ i.jsx(Qh, { className: Jh("w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0", c && "rotate-180") })
        ]
      }
    ),
    c && /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-3", children: t.cols.map((f) => {
      const h = Zh(r.row[f.key], f.type), m = l[f.key];
      if (!m)
        return /* @__PURE__ */ i.jsxs("div", { className: "rounded-xl border border-border bg-card p-3.5 flex flex-col", "data-testid": `adv-cell-${f.key}`, children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-[22px] font-black leading-none tabular-nums text-foreground", children: h }),
          /* @__PURE__ */ i.jsx("div", { className: "text-[11px] font-bold text-muted-foreground mt-2.5 leading-tight uppercase tracking-wider", children: f.label })
        ] }, f.key);
      const y = Nc[m.tier], g = Math.max(1, Math.round(m.rank / m.total * 100));
      return /* @__PURE__ */ i.jsxs("div", { className: "rounded-xl border bg-card p-3.5 flex flex-col", style: { borderColor: y.border }, "data-testid": `adv-cell-${f.key}`, children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-baseline justify-between gap-1", children: [
          /* @__PURE__ */ i.jsxs("span", { className: "text-[26px] font-black leading-none tabular-nums", style: { color: y.text }, children: [
            "#",
            m.rank
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "text-[15px] font-black tabular-nums text-foreground", children: h })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] mt-1", children: [
          /* @__PURE__ */ i.jsxs("span", { className: "font-bold", style: { color: y.text }, children: [
            "Top ",
            g,
            "%"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground", children: [
            " · of ",
            m.total,
            " ",
            o,
            "s"
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "text-[11px] font-bold text-foreground mt-2.5 leading-tight", children: f.label })
      ] }, f.key);
    }) })
  ] });
}
function z1({ latest: t, pos: r, statRanks: o }) {
  const l = r.toLowerCase(), c = b.useMemo(() => ["qb", "rb", "wr", "te"].includes(l) ? R1(l, t.columns).filter(
    (u) => !D1.has(u.label) && u.cols.length > 0
  ) : [], [l, t.columns]);
  return c.length ? /* @__PURE__ */ i.jsx(i.Fragment, { children: c.map((u) => /* @__PURE__ */ i.jsx(B1, { section: u, latest: t, pos: r, statRanks: o }, u.label)) }) : null;
}
function U1({ season: t, onChange: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
    /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground font-semibold", children: "Season:" }),
    /* @__PURE__ */ i.jsx("div", { className: "flex gap-1 flex-wrap", children: M1.map((o) => {
      const l = t === o;
      return /* @__PURE__ */ i.jsx(
        "button",
        {
          onClick: () => r(o),
          "data-testid": `adv-season-${o}`,
          className: "text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors",
          style: l ? { background: "#d4af37", color: "#0b3a7a", borderColor: "#d4af37" } : { background: "transparent", borderColor: "rgba(11,58,122,0.2)", color: "#64748b" },
          children: o === "all" ? "All Seasons" : o
        },
        String(o)
      );
    }) })
  ] });
}
function W1({
  adv: t,
  advLoading: r,
  pos: o,
  season: l,
  onSeasonChange: c
}) {
  const u = o.toUpperCase();
  return /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", "data-testid": "advanced-tab", children: [
    /* @__PURE__ */ i.jsx(U1, { season: l, onChange: c }),
    r && /* @__PURE__ */ i.jsx($s, { children: /* @__PURE__ */ i.jsx(T1, { n: 6 }) }),
    !r && !t?.latest && /* @__PURE__ */ i.jsx(
      A1,
      {
        icon: qh,
        title: "No advanced stats available",
        body: `Advanced metrics for this ${u} will appear once it has qualifying usage in our dataset.`
      }
    ),
    !r && t?.latest && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      t.rankCards.length > 0 && /* @__PURE__ */ i.jsx($1, { cards: t.rankCards, pos: u }),
      /* @__PURE__ */ i.jsx(F1, { composites: t.composites, pos: u }),
      /* @__PURE__ */ i.jsx(z1, { latest: t.latest, pos: u, statRanks: t.statRanks })
    ] })
  ] });
}
function em(t, r) {
  if (!r.length) return 0;
  let o = 0;
  for (const l of r) l < t && o++;
  return Math.round(o / r.length * 100);
}
function H1(t, r) {
  return 100 - em(t, r);
}
function Ge(t) {
  return Math.max(0, Math.min(100, Math.round(t)));
}
function J(t) {
  const r = typeof t == "number" ? t : parseFloat(String(t));
  return Number.isFinite(r) ? r : 0;
}
function Sc(t, r, o, l = "higherIsBetter") {
  const c = (o.length ? o : t).map(r);
  return t.map((u) => {
    const f = r(u);
    return l === "lowerIsBetter" ? H1(f, c) : em(f, c);
  });
}
function V1(t) {
  return J(t.games) >= 5 && J(t.attempts) >= 100;
}
const tm = [
  {
    key: "overallQBGrade",
    label: "Overall QB Grade",
    shortLabel: "Overall",
    description: "Overall QB Grade (0-100): equal blend of Volume, Accuracy, Explosiveness, Mobility, and Efficiency. Percentile-based across all QBs in the selected season."
  },
  {
    key: "volumeScore",
    label: "Volume",
    shortLabel: "Vol",
    description: "Volume (0-100): workload & opportunity. Attempts 35%, RZ Attempts 25%, Passing Yds 20%, Rush Attempts 10%, Rush Yds 10%."
  },
  {
    key: "accuracyScore",
    label: "Accuracy",
    shortLabel: "Acc",
    description: "Accuracy (0-100): throwing precision & ball placement. Comp% 25%, On-Target% 25%, CPOE 25%, Bad-Throw% 15% (inv), Poor Throws 10% (inv)."
  },
  {
    key: "explosivenessScore",
    label: "Explosiveness",
    shortLabel: "Exp",
    description: "Explosiveness (0-100): aggressiveness & deep-ball upside. AY/Att 20%, Deep-Att% 20%, 20+ 20%, 30+ 15%, 40+ 10%, 50+ 5%, Longest 10%."
  },
  {
    key: "mobilityScore",
    label: "Mobility",
    shortLabel: "Mob",
    description: "Mobility (0-100): rushing & scrambling value. Rush Yds 30%, Rush Attempts 25%, Rush TDs 20%, Scramble Rate 15%, Yds/Scramble 10%."
  },
  {
    key: "efficiencyScore",
    label: "Efficiency",
    shortLabel: "Eff",
    description: "Efficiency (0-100): offensive effectiveness on a rate basis. EPA/Play 35%, Success Rate 25%, TD Rate 20%, Yards/Attempt 15%, Completed AY/Completion 5%."
  }
];
tm.map((t) => t.key);
const Y1 = (t) => {
  const r = J(t.attempts);
  return r > 0 ? J(t.passingTouchdowns) / r : 0;
}, G1 = (t) => {
  const r = J(t.attempts);
  return r > 0 ? J(t.passingYards) / r : 0;
}, Q1 = (t) => {
  const r = J(t.attempts);
  return r > 0 ? J(t.airYards) / r : 0;
}, K1 = (t) => {
  const r = J(t.completions);
  return r > 0 ? J(t.completedAirYards) / r : 0;
};
function q1(t) {
  if (!t.length) return [];
  const r = t.filter(V1), o = (c, u = "higherIsBetter") => Sc(t, c, r, u), l = {
    attempts: o((c) => J(c.attempts)),
    passingYards: o((c) => J(c.passingYards)),
    redZoneAttempts: o((c) => J(c.redZoneAttempts)),
    rushAttempts: o((c) => J(c.rushAttempts)),
    rushYards: o((c) => J(c.rushYards)),
    rushTouchdowns: o((c) => J(c.rushTouchdowns)),
    completionPct: o((c) => J(c.completionPct)),
    onTargetPct: o((c) => J(c.onTargetPct)),
    cpoe: o((c) => J(c.cpoe)),
    badThrowPct: o((c) => J(c.badThrowPct), "lowerIsBetter"),
    poorThrows: o((c) => J(c.poorThrows), "lowerIsBetter"),
    airYardsPerAttempt: o(Q1),
    deepAttemptPct: o((c) => J(c.deepAttemptPct)),
    passes20Plus: o((c) => J(c.passes20Plus)),
    passes30Plus: o((c) => J(c.passes30Plus)),
    passes40Plus: o((c) => J(c.passes40Plus)),
    passes50Plus: o((c) => J(c.passes50Plus)),
    longestPass: o((c) => J(c.longestPass)),
    scrambleRate: o((c) => J(c.scrambleRate)),
    yardsPerScramble: o((c) => J(c.yardsPerScramble)),
    epaPerPlay: o((c) => J(c.epaPerPlay)),
    successRate: o((c) => J(c.successRate)),
    tdRate: o(Y1),
    yardsPerAttempt: o(G1),
    compAirYardsPerCompletion: o(K1)
  };
  return t.map((c, u) => {
    const f = Ge(
      l.attempts[u] * 0.35 + l.redZoneAttempts[u] * 0.25 + l.passingYards[u] * 0.2 + l.rushAttempts[u] * 0.1 + l.rushYards[u] * 0.1
    ), h = Ge(
      l.completionPct[u] * 0.25 + l.onTargetPct[u] * 0.25 + l.cpoe[u] * 0.25 + l.badThrowPct[u] * 0.15 + l.poorThrows[u] * 0.1
    ), m = Ge(
      l.airYardsPerAttempt[u] * 0.2 + l.deepAttemptPct[u] * 0.2 + l.passes20Plus[u] * 0.2 + l.passes30Plus[u] * 0.15 + l.passes40Plus[u] * 0.1 + l.passes50Plus[u] * 0.05 + l.longestPass[u] * 0.1
    ), y = Ge(
      l.rushAttempts[u] * 0.25 + l.rushYards[u] * 0.3 + l.rushTouchdowns[u] * 0.2 + l.scrambleRate[u] * 0.15 + l.yardsPerScramble[u] * 0.1
    ), g = Ge(
      l.epaPerPlay[u] * 0.35 + l.successRate[u] * 0.25 + l.tdRate[u] * 0.2 + l.yardsPerAttempt[u] * 0.15 + l.compAirYardsPerCompletion[u] * 0.05
    ), v = Ge(
      f * 0.2 + h * 0.2 + m * 0.2 + y * 0.2 + g * 0.2
    );
    return { volumeScore: f, accuracyScore: h, explosivenessScore: m, mobilityScore: y, efficiencyScore: g, overallQBGrade: v };
  });
}
function X1(t) {
  return J(t.rushAttempts) >= 50 || J(t.targets) >= 25;
}
const nm = [
  {
    key: "overallRBGrade",
    label: "Overall RB Grade",
    shortLabel: "Overall",
    description: "Overall RB Grade (0-100): Volume 25%, Efficiency 20%, Explosiveness 20%, Receiving 20%, Elusiveness 15%."
  },
  {
    key: "volumeScore",
    label: "Volume",
    shortLabel: "Vol",
    description: "Volume (0-100): workload & opportunity. Rush Att 30%, Snap% 20%, Targets 20%, RZ Opp 15%, GL Carries 10%, Routes 5%."
  },
  {
    key: "efficiencyScore",
    label: "Efficiency",
    shortLabel: "Eff",
    description: "Efficiency (0-100): per-touch effectiveness. Y/C 30%, EPA/Play 25%, YPRR 20%, YBC/Att 15%, Neg-rush rate 10% (inv)."
  },
  {
    key: "explosivenessScore",
    label: "Explosiveness",
    shortLabel: "Exp",
    description: "Explosiveness (0-100): home-run ability. Explosive% 25%, Breakaway% 20%, 10+ 20%, 20+ 15%, 30+ 10%, LNG 5%, LNG TD 5%."
  },
  {
    key: "receivingScore",
    label: "Receiving",
    shortLabel: "Rec",
    description: "Receiving (0-100): pass-game value. Targets 20%, Target Share% 20%, Receptions 15%, Rec Yds 15%, Y/R 10%, Rec YAC 10%, YPRR 5%, Rec TDs 5%."
  },
  {
    key: "elusivenessScore",
    label: "Elusiveness",
    shortLabel: "Elu",
    description: "Elusiveness (0-100): self-created yardage. Broken Tackles 25%, Broken-tackle rate 25%, YAC/Att 25%, Tackle-eluded rate 15%, Rec YAC 5%, Fumble rate 5% (inv)."
  }
];
nm.map((t) => t.key);
const Z1 = (t) => {
  const r = J(t.rushAttempts);
  return r > 0 ? J(t.rushAttForNegativeYards) / r : 0;
}, J1 = (t) => {
  const r = J(t.rushAttempts);
  return r > 0 ? J(t.fumbles) / r : 0;
}, eb = (t) => {
  const r = J(t.rushAttemptsPerBrokenTackle);
  return r > 0 ? 1 / r : 0;
};
function tb(t) {
  if (!t.length) return [];
  const r = t.filter(X1), o = (c, u = "higherIsBetter") => Sc(t, c, r, u), l = {
    rushAttempts: o((c) => J(c.rushAttempts)),
    snapPct: o((c) => J(c.snapPct)),
    targets: o((c) => J(c.targets)),
    redZoneOpportunities: o((c) => J(c.redZoneOpportunities)),
    goalLineCarries: o((c) => J(c.goalLineCarries)),
    routes: o((c) => J(c.routes)),
    yardsPerCarry: o((c) => J(c.yardsPerCarry)),
    epaPerPlay: o((c) => J(c.epaPerPlay)),
    yardsPerRouteRun: o((c) => J(c.yardsPerRouteRun)),
    yardsBeforeContactPerAttempt: o((c) => J(c.yardsBeforeContactPerAttempt)),
    negativeRushRate: o(Z1, "lowerIsBetter"),
    explosiveRunPct: o((c) => J(c.explosiveRunPct)),
    breakawayRunPct: o((c) => J(c.breakawayRunPct)),
    rushes10Plus: o((c) => J(c.rushes10Plus)),
    rushes20Plus: o((c) => J(c.rushes20Plus)),
    rushes30Plus: o((c) => J(c.rushes30Plus)),
    longestRush: o((c) => J(c.longestRush)),
    longestRushTouchdown: o((c) => J(c.longestRushTouchdown)),
    targetSharePct: o((c) => J(c.targetSharePct)),
    receptions: o((c) => J(c.receptions)),
    receivingYards: o((c) => J(c.receivingYards)),
    yardsPerReception: o((c) => J(c.yardsPerReception)),
    receivingYardsAfterCatch: o((c) => J(c.receivingYardsAfterCatch)),
    receivingTouchdowns: o((c) => J(c.receivingTouchdowns)),
    brokenTackles: o((c) => J(c.brokenTackles)),
    brokenTackleRate: o(eb),
    yardsAfterContactPerAttempt: o((c) => J(c.yardsAfterContactPerAttempt)),
    tackleEludedRate: o((c) => J(c.tackleEludedRate)),
    fumbleRate: o(J1, "lowerIsBetter")
  };
  return t.map((c, u) => {
    const f = Ge(
      l.rushAttempts[u] * 0.3 + l.snapPct[u] * 0.2 + l.targets[u] * 0.2 + l.redZoneOpportunities[u] * 0.15 + l.goalLineCarries[u] * 0.1 + l.routes[u] * 0.05
    ), h = Ge(
      l.yardsPerCarry[u] * 0.3 + l.epaPerPlay[u] * 0.25 + l.yardsPerRouteRun[u] * 0.2 + l.yardsBeforeContactPerAttempt[u] * 0.15 + l.negativeRushRate[u] * 0.1
    ), m = Ge(
      l.explosiveRunPct[u] * 0.25 + l.breakawayRunPct[u] * 0.2 + l.rushes10Plus[u] * 0.2 + l.rushes20Plus[u] * 0.15 + l.rushes30Plus[u] * 0.1 + l.longestRush[u] * 0.05 + l.longestRushTouchdown[u] * 0.05
    ), y = Ge(
      l.targets[u] * 0.2 + l.targetSharePct[u] * 0.2 + l.receptions[u] * 0.15 + l.receivingYards[u] * 0.15 + l.yardsPerReception[u] * 0.1 + l.receivingYardsAfterCatch[u] * 0.1 + l.yardsPerRouteRun[u] * 0.05 + l.receivingTouchdowns[u] * 0.05
    ), g = Ge(
      l.brokenTackles[u] * 0.25 + l.brokenTackleRate[u] * 0.25 + l.yardsAfterContactPerAttempt[u] * 0.25 + l.tackleEludedRate[u] * 0.15 + l.receivingYardsAfterCatch[u] * 0.05 + l.fumbleRate[u] * 0.05
    ), v = Ge(
      f * 0.25 + h * 0.2 + m * 0.2 + y * 0.2 + g * 0.15
    );
    return { volumeScore: f, efficiencyScore: h, explosivenessScore: m, receivingScore: y, elusivenessScore: g, overallRBGrade: v };
  });
}
const nb = /* @__PURE__ */ new Set(["drops", "dropPct", "interceptionsWhenTargeted", "fumbles"]), rb = {
  recYardsPerTarget: (t) => {
    const r = J(t.targets);
    return r > 0 ? J(t.receivingYards) / r : 0;
  }
}, sb = (t) => rb[t] ?? ((r) => J(r[t]));
function rm(t, r) {
  if (!r.length) return [];
  const o = r.filter(t.qualify), l = /* @__PURE__ */ new Set();
  for (const h of Object.values(t.weights)) for (const m of Object.keys(h)) l.add(m);
  const c = {};
  for (const h of l) {
    const m = nb.has(h) ? "lowerIsBetter" : "higherIsBetter";
    c[h] = Sc(r, sb(h), o, m);
  }
  const u = (h, m) => {
    let y = 0;
    for (const g in h) y += c[g][m] * h[g];
    return y;
  }, f = t.overall;
  return r.map((h, m) => {
    const y = Ge(u(t.weights.volume, m)), g = Ge(u(t.weights.efficiency, m)), v = Ge(u(t.weights.explosiveness, m)), w = Ge(u(t.weights.hands, m)), S = Ge(u(t.weights.elusiveness, m)), P = Ge(
      y * f.volume + g * f.efficiency + v * f.explosiveness + w * f.hands + S * f.elusiveness
    );
    return { volumeScore: y, efficiencyScore: g, explosivenessScore: v, handsScore: w, elusivenessScore: S, [t.overallKey]: P };
  });
}
const ob = {
  overallKey: "overallWRGrade",
  qualify: (t) => J(t.targets) >= 40 || J(t.routes) >= 150,
  weights: {
    volume: { targets: 0.25, targetSharePct: 0.2, wopr: 0.15, routes: 0.15, targetsPerRouteRun: 0.1, airYardsSharePct: 0.1, redZoneTargets: 0.03, endZoneTargets: 0.02 },
    efficiency: { yardsPerRouteRun: 0.3, epaPerPlay: 0.2, successRate: 0.2, catchPct: 0.1, yardsPerReception: 0.1, recYardsPerTarget: 0.05, yardsBeforeCatchPerReception: 0.05 },
    explosiveness: { airYardsPerTarget: 0.25, airYardsPerReception: 0.2, receptions20Plus: 0.2, receptions30Plus: 0.15, receptions40Plus: 0.1, receptions50Plus: 0.05, longestReception: 0.05 },
    hands: { catchPct: 0.4, catchableTargets: 0.2, drops: 0.2, dropPct: 0.15, interceptionsWhenTargeted: 0.05 },
    elusiveness: { avoidedTackleRate: 0.4, brokenTackles: 0.3, yardsAfterCatchPerReception: 0.25, fumbles: 0.05 }
  },
  overall: { volume: 0.25, efficiency: 0.25, explosiveness: 0.2, hands: 0.15, elusiveness: 0.15 }
}, ib = {
  overallKey: "overallTEGrade",
  qualify: (t) => J(t.targets) >= 25 || J(t.routes) >= 100,
  weights: {
    volume: { targets: 0.25, routes: 0.2, targetSharePct: 0.2, wopr: 0.15, targetsPerRouteRun: 0.1, redZoneTargets: 0.05, endZoneTargets: 0.05 },
    efficiency: { yardsPerRouteRun: 0.35, epaPerPlay: 0.2, successRate: 0.2, catchPct: 0.1, recYardsPerTarget: 0.1, yardsBeforeCatchPerReception: 0.05 },
    explosiveness: { airYardsPerTarget: 0.3, airYardsPerReception: 0.25, receptions20Plus: 0.2, receptions30Plus: 0.1, receptions40Plus: 0.1, longestReception: 0.05 },
    hands: { catchPct: 0.45, catchableTargets: 0.2, drops: 0.2, dropPct: 0.075, interceptionsWhenTargeted: 0.075 },
    elusiveness: { avoidedTackleRate: 0.4, brokenTackles: 0.35, yardsAfterCatchPerReception: 0.2, fumbles: 0.05 }
  },
  overall: { volume: 0.3, efficiency: 0.25, hands: 0.2, explosiveness: 0.15, elusiveness: 0.1 }
}, sm = [
  { key: "overallWRGrade", label: "Overall WR Grade", shortLabel: "Overall", description: "Overall WR Grade (0-100): Volume 25%, Efficiency 25%, Explosiveness 20%, Hands 15%, Elusiveness 15%." },
  { key: "volumeScore", label: "Volume", shortLabel: "Vol", description: "Volume (0-100): offensive role & opportunity. Targets 25%, Target Share% 20%, WOPR 15%, Routes 15%, TPRR 10%, AY Share% 10%, RZ TGT 3%, EZ TGT 2%." },
  { key: "efficiencyScore", label: "Efficiency", shortLabel: "Eff", description: "Efficiency (0-100): per-route/target effectiveness. YPRR 30%, EPA/Play 20%, Success% 20%, Catch% 10%, Y/R 10%, Rec Yds/TGT 5%, YBC/R 5%." },
  { key: "explosivenessScore", label: "Explosiveness", shortLabel: "Exp", description: "Explosiveness (0-100): vertical threat & big-play. AY/TGT 25%, AY/Rec 20%, 20+ 20%, 30+ 15%, 40+ 10%, 50+ 5%, Longest 5%." },
  { key: "handsScore", label: "Hands", shortLabel: "Hnd", description: "Hands (0-100): reliability & catch consistency. Catch% 40%, Catchable TGT 20%, Drops 20% (inv), Drop% 15% (inv), INT-tgt 5% (inv)." },
  { key: "elusivenessScore", label: "Elusiveness", shortLabel: "Elu", description: "Elusiveness (0-100): YAC creation & tackle-breaking. Avoided-tackle% 40%, Broken Tackles 30%, YAC/R 25%, Fumbles 5% (inv)." }
], om = [
  { key: "overallTEGrade", label: "Overall TE Grade", shortLabel: "Overall", description: "Overall TE Grade (0-100): Volume 30%, Efficiency 25%, Hands 20%, Explosiveness 15%, Elusiveness 10%." },
  { key: "volumeScore", label: "Volume", shortLabel: "Vol", description: "Volume (0-100): opportunity — paramount for TEs. Targets 25%, Routes 20%, Target Share% 20%, WOPR 15%, TPRR 10%, RZ TGT 5%, EZ TGT 5%." },
  { key: "efficiencyScore", label: "Efficiency", shortLabel: "Eff", description: "Efficiency (0-100): per-route/target effectiveness. YPRR 35%, EPA/Play 20%, Success% 20%, Catch% 10%, Rec Yds/TGT 10%, YBC/R 5%." },
  { key: "explosivenessScore", label: "Explosiveness", shortLabel: "Exp", description: "Explosiveness (0-100): downfield & big-play (weighted lighter for TEs). AY/TGT 30%, AY/Rec 25%, 20+ 20%, 30+ 10%, 40+ 10%, Longest 5%." },
  { key: "handsScore", label: "Hands", shortLabel: "Hnd", description: "Hands (0-100): reliability — weighted heavier for TEs. Catch% 45%, Catchable TGT 20%, Drops 20% (inv), Drop% 7.5% (inv), INT-tgt 7.5% (inv)." },
  { key: "elusivenessScore", label: "Elusiveness", shortLabel: "Elu", description: "Elusiveness (0-100): YAC & tackle-breaking. Avoided-tackle% 40%, Broken Tackles 35%, YAC/R 20%, Fumbles 5% (inv)." }
];
sm.map((t) => t.key);
om.map((t) => t.key);
const ab = (t) => rm(ob, t), lb = (t) => rm(ib, t), cb = [
  { key: "fantasyPoints", label: "Fantasy Points", category: "production", overview: !0 },
  { key: "passingYards", label: "Passing Yards", category: "production", overview: !0 },
  { key: "passingTouchdowns", label: "Pass TDs", category: "production", overview: !0 },
  { key: "completionPct", label: "Completion %", category: "efficiency", overview: !0 },
  { key: "epaPerPlay", label: "EPA / Play", category: "efficiency", overview: !0 },
  { key: "cpoe", label: "CPOE", category: "efficiency", overview: !0 },
  { key: "deepAttemptPct", label: "Deep Att %", category: "advanced", overview: !0 },
  { key: "rushYards", label: "Rush Yards", category: "production" },
  { key: "attempts", label: "Attempts", category: "usage" },
  { key: "onTargetPct", label: "On-Target %", category: "efficiency" },
  { key: "badThrowPct", label: "Bad Throw %", category: "efficiency", inverted: !0 },
  { key: "pressurePct", label: "Pressure %", category: "advanced", inverted: !0 }
], ub = [
  { key: "fantasyPoints", label: "Fantasy Points", category: "production", overview: !0 },
  { key: "rushYards", label: "Rush Yards", category: "production", overview: !0 },
  { key: "rushAttempts", label: "Rush Att", category: "usage", overview: !0 },
  { key: "targets", label: "Targets", category: "usage", overview: !0 },
  { key: "yardsPerCarry", label: "Y / Carry", category: "efficiency", overview: !0 },
  { key: "epaPerPlay", label: "EPA / Play", category: "efficiency", overview: !0 },
  { key: "explosiveRunPct", label: "Explosive %", category: "advanced", overview: !0 },
  { key: "yardsAfterContactPerAttempt", label: "YAC / Att", category: "advanced", overview: !0 },
  { key: "snapPct", label: "Snap %", category: "usage" },
  { key: "brokenTackles", label: "Broken Tackles", category: "advanced" },
  { key: "redZoneOpportunities", label: "RZ Opp", category: "usage" },
  { key: "targetSharePct", label: "Target Share %", category: "usage" }
], db = [
  { key: "fantasyPoints", label: "Fantasy Points", category: "production", overview: !0 },
  { key: "targets", label: "Targets", category: "usage", overview: !0 },
  { key: "targetsPerRouteRun", label: "TPRR", category: "usage", overview: !0 },
  { key: "targetSharePct", label: "Target Share %", category: "usage", overview: !0 },
  { key: "receivingYards", label: "Rec Yards", category: "production", overview: !0 },
  { key: "yardsPerRouteRun", label: "YPRR", category: "efficiency", overview: !0 },
  { key: "wopr", label: "WOPR", category: "advanced", overview: !0 },
  { key: "epaPerPlay", label: "EPA / Play", category: "efficiency", overview: !0 },
  { key: "airYardsSharePct", label: "Air Yards Share %", category: "advanced" },
  { key: "catchPct", label: "Catch %", category: "efficiency" },
  { key: "receptions20Plus", label: "20+ Rec", category: "advanced" },
  { key: "dropPct", label: "Drop %", category: "efficiency", inverted: !0 }
], fb = [
  { key: "fantasyPoints", label: "Fantasy Points", category: "production", overview: !0 },
  { key: "targets", label: "Targets", category: "usage", overview: !0 },
  { key: "targetsPerRouteRun", label: "TPRR", category: "usage", overview: !0 },
  { key: "targetSharePct", label: "Target Share %", category: "usage", overview: !0 },
  { key: "receivingYards", label: "Rec Yards", category: "production", overview: !0 },
  { key: "yardsPerRouteRun", label: "YPRR", category: "efficiency", overview: !0 },
  { key: "wopr", label: "WOPR", category: "advanced", overview: !0 },
  { key: "catchPct", label: "Catch %", category: "efficiency", overview: !0 },
  { key: "epaPerPlay", label: "EPA / Play", category: "efficiency" },
  { key: "routes", label: "Routes", category: "usage" },
  { key: "dropPct", label: "Drop %", category: "efficiency", inverted: !0 }
], pb = {
  qb: cb,
  rb: ub,
  wr: db,
  te: fb
}, hb = {
  qb: /* @__PURE__ */ new Set(["badThrowPct", "poorThrows", "interceptions", "fumbles", "pressurePct", "sacks", "battedPasses"]),
  rb: /* @__PURE__ */ new Set(["fumbles", "tacklesForLoss", "rushAttForNegativeYards"]),
  wr: /* @__PURE__ */ new Set(["drops", "dropPct", "interceptionsWhenTargeted", "fumbles"]),
  te: /* @__PURE__ */ new Set(["drops", "dropPct", "interceptionsWhenTargeted", "fumbles"])
};
function mb(t, r) {
  const o = t / r * 100;
  return o <= 10 ? "elite" : o <= 25 ? "great" : o <= 45 ? "solid" : o <= 65 ? "average" : "poor";
}
function jp(t, r, o, l) {
  const c = r.filter((y) => {
    const g = y[o];
    return g != null && typeof g == "number" && Number.isFinite(g);
  });
  if (!c.length) return null;
  const u = [...c].sort(
    (y, g) => l ? y[o] - g[o] : g[o] - y[o]
  ), f = u.findIndex((y) => String(y.playerId) === t);
  if (f < 0) return null;
  const h = f + 1, m = u.length;
  return {
    rank: h,
    total: m,
    tier: mb(h, m),
    behindPlayer: f > 0 ? String(u[f - 1].playerName ?? "") : void 0,
    aheadPlayer: f < m - 1 ? String(u[f + 1].playerName ?? "") : void 0
  };
}
function gb(t, r) {
  const o = Number(t.games ?? 0);
  return r === "qb" ? o >= 5 && Number(t.attempts ?? 0) >= 100 : r === "rb" ? Number(t.rushAttempts ?? 0) >= 50 || Number(t.targets ?? 0) >= 25 : r === "wr" ? Number(t.targets ?? 0) >= 40 || Number(t.routes ?? 0) >= 150 : r === "te" ? Number(t.targets ?? 0) >= 25 || Number(t.routes ?? 0) >= 100 : !0;
}
function ti(t, r, o, l) {
  return l.map((c) => {
    const u = o.map((w) => w[c.key]).filter((w) => w != null), f = r.findIndex((w) => String(w.playerId) === t), h = f >= 0 ? o[f]?.[c.key] : null;
    if (h == null || !u.length)
      return { label: c.label, rank: null, total: null, percentile: null, explanation: c.description };
    const m = [...u].sort((w, S) => S - w), y = m.findIndex((w) => w <= h) + 1 || m.length, g = m.length, v = Math.max(1, Math.round(y / g * 100));
    return { label: c.label, rank: y, total: g, percentile: v, explanation: c.description };
  });
}
async function yb(t, r, o) {
  const l = r.toLowerCase();
  if (!["qb", "rb", "wr", "te"].includes(l)) return null;
  const c = await fetch(`/api/advanced-stats/${l}/${o}`);
  if (!c.ok) return null;
  const u = await c.json(), { columns: f, rows: h } = u, m = h.find((C) => String(C.playerId) === String(t)) ?? null;
  if (!m)
    return { latest: null, composites: [], rankCards: [], statRanks: {} };
  const y = { season: o, row: m, columns: f }, g = h.filter((C) => gb(C, l)), w = g.some((C) => String(C.playerId) === String(t)) ? g : h, S = pb[l] ?? [], P = new Map(f.map((C) => [C.key, C])), k = [];
  for (const C of S) {
    const F = P.get(C.key);
    if (!F) continue;
    const U = jp(String(t), w, C.key, !!C.inverted);
    if (!U) continue;
    const H = Math.max(1, Math.round((U.total - U.rank + 1) / U.total * 100));
    k.push({
      key: C.key,
      label: C.label,
      value: Zh(m[C.key], F.type),
      rank: U.rank,
      total: U.total,
      tier: U.tier,
      percentile: H,
      category: C.category,
      overview: !!C.overview,
      position: l.toUpperCase(),
      behindPlayer: U.behindPlayer,
      aheadPlayer: U.aheadPlayer
    });
  }
  const j = hb[l] ?? /* @__PURE__ */ new Set(), A = {};
  for (const C of f) {
    if (C.type === "string" || ["rank", "games", "playerId", "season", "position", "age"].includes(C.key)) continue;
    const F = jp(String(t), w, C.key, j.has(C.key));
    F && (A[C.key] = { rank: F.rank, total: F.total, tier: F.tier });
  }
  let _ = [];
  if (l === "qb") {
    const C = q1(h);
    _ = ti(String(t), h, C, tm);
  } else if (l === "rb") {
    const C = tb(h);
    _ = ti(String(t), h, C, nm);
  } else if (l === "wr") {
    const C = ab(h);
    _ = ti(String(t), h, C, sm);
  } else if (l === "te") {
    const C = lb(h);
    _ = ti(String(t), h, C, om);
  }
  return { latest: y, composites: _, rankCards: k, statRanks: A };
}
function xe(...t) {
  return t.filter(Boolean).join(" ");
}
function qn({ className: t, children: r }) {
  return /* @__PURE__ */ i.jsx("div", { className: xe("rounded-2xl border border-border bg-card text-card-foreground shadow-sm", t), children: r });
}
function xb({ n: t }) {
  return /* @__PURE__ */ i.jsx("div", { className: "space-y-2", children: Array.from({ length: t }).map((r, o) => /* @__PURE__ */ i.jsx("div", { className: "h-3.5 rounded bg-muted/40 animate-pulse", style: { width: `${60 + o * 13 % 35}%` } }, o)) });
}
function Np({ icon: t, title: r, body: o }) {
  return /* @__PURE__ */ i.jsxs(qn, { className: "p-10 text-center", children: [
    /* @__PURE__ */ i.jsx(t, { className: "w-7 h-7 text-muted-foreground/50 mx-auto mb-3" }),
    /* @__PURE__ */ i.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: r }),
    /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto leading-relaxed", children: o })
  ] });
}
function Sp({ title: t, noMargin: r }) {
  return /* @__PURE__ */ i.jsx("div", { className: xe("sc-sectitle", r && "!mb-0"), children: /* @__PURE__ */ i.jsx("h3", { children: t }) });
}
const im = b.createContext({ open: !1, rect: null });
function am({ children: t }) {
  const r = b.useRef(null), [o, l] = b.useState(!1), [c, u] = b.useState(null), f = () => {
    r.current && u(r.current.getBoundingClientRect()), l(!0);
  }, h = () => l(!1);
  return /* @__PURE__ */ i.jsx(im.Provider, { value: { open: o, rect: c }, children: /* @__PURE__ */ i.jsx(
    "span",
    {
      ref: r,
      className: "relative inline-flex",
      onMouseEnter: f,
      onMouseLeave: h,
      onFocus: f,
      onBlur: h,
      children: t
    }
  ) });
}
function lm({ children: t }) {
  return /* @__PURE__ */ i.jsx(i.Fragment, { children: t });
}
function cm({
  children: t,
  className: r,
  side: o = "top",
  collisionPadding: l = 8
}) {
  const { open: c, rect: u } = b.useContext(im);
  if (!c || !u || typeof document > "u") return null;
  const f = 8, h = o === "bottom", m = 130, g = {
    position: "fixed",
    left: Math.min(
      Math.max(u.left + u.width / 2, l + m),
      window.innerWidth - l - m
    ),
    top: h ? u.bottom + f : u.top - f,
    transform: h ? "translate(-50%, 0)" : "translate(-50%, -100%)",
    zIndex: 60
  };
  return ac.createPortal(
    /* @__PURE__ */ i.jsx(
      "span",
      {
        role: "tooltip",
        style: g,
        className: xe(
          "pointer-events-none whitespace-normal rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
          r
        ),
        children: t
      }
    ),
    document.body
  );
}
function um(t) {
  return t.replace(/\b\w/g, (r) => r.toUpperCase());
}
const vb = [
  { region: "Head/Neck", keywords: ["head", "neck", "concussion", "face", "jaw", "skull", "nose", "eye"] },
  { region: "Back/Spine", keywords: ["back", "spine", "spinal", "lumbar", "disc", "vertebra"] },
  { region: "Shoulder", keywords: ["shoulder", "clavicle", "collarbone", "ac joint", "rotator"] },
  { region: "Arm/Elbow", keywords: ["arm", "elbow", "bicep", "tricep", "forearm"] },
  { region: "Hand/Wrist", keywords: ["hand", "wrist", "thumb", "finger"] },
  { region: "Chest/Ribs", keywords: ["chest", "rib", "pec", "sternum", "abdomen", "oblique", "core"] },
  { region: "Hip/Groin", keywords: ["hip", "groin", "pelvis", "glute"] },
  { region: "Upper Leg", keywords: ["hamstring", "quad", "thigh", "femur"] },
  { region: "Knee", keywords: ["knee", "acl", "mcl", "pcl", "patella", "meniscus"] },
  { region: "Lower Leg/Foot", keywords: ["calf", "shin", "ankle", "foot", "achilles", "toe", "heel", "tibia", "fibula"] }
];
function dm(t) {
  const r = `${t.bodyPart ?? ""} ${t.type ?? ""}`.toLowerCase();
  for (const o of vb)
    if (o.keywords.some((l) => r.includes(l))) return o.region;
  return t.bodyPart ? um(t.bodyPart) : "Other";
}
const wb = { major: 3, moderate: 2, minor: 1 }, bb = {
  low: { label: "Low", text: "text-emerald-600", bar: "bg-emerald-500", score: 25 },
  moderate: { label: "Moderate", text: "text-amber-600", bar: "bg-amber-500", score: 60 },
  high: { label: "High", text: "text-rose-600", bar: "bg-rose-500", score: 90 }
};
function kb(t) {
  const r = t.nfl.reduce((h, m) => h + (m.gamesMissed ?? 0), 0), o = t.nfl.length + t.college.length, l = new Set(t.nfl.map(dm)).size;
  let c = null;
  for (const h of t.nfl)
    (c == null || h.season > c) && (c = h.season);
  let u = null, f = -1;
  for (const h of t.nfl) {
    const m = h.gamesMissed ?? 0, y = m * 100 + (h.severity ? wb[h.severity] : 0);
    y > f && (f = y, u = { label: `${h.season} ${h.type}`, missed: m });
  }
  return { totalMissed: r, injuriesLogged: o, affectedRegions: l, lastSeason: c, primaryDriver: u };
}
function jb(t) {
  const r = (f) => f.length <= 1 ? f[0] ?? "" : `${f.slice(0, -1).join(", ")} and ${f[f.length - 1]}`, o = (f) => f.bodyPart ? `${f.bodyPart.toLowerCase()} injury` : f.type.toLowerCase(), l = t.filter((f) => (f.gamesMissed ?? 0) > 0).sort((f, h) => (h.gamesMissed ?? 0) - (f.gamesMissed ?? 0)).slice(0, 2).map((f) => `${f.season} ${o(f)}`), c = Array.from(
    new Set(t.filter((f) => (f.gamesMissed ?? 0) === 0).map((f) => dm(f).toLowerCase()))
  ).slice(0, 3);
  let u = "";
  return l.length && (u = `Most missed time came from the ${r(l)}`), c.length && (u += u ? ", while several " : "Several ", u += `${r(c)} ${c.length > 1 ? "issues were" : "issue was"} played through`), u ? `${u}.` : "";
}
function Nb(t) {
  const r = t.nfl, o = [], l = r.reduce((g, v) => Math.max(g, v.season), 0), c = l > 0 ? r.filter((g) => g.season >= l - 1).length : 0;
  o.push({ label: "Recent Injury Risk", level: c >= 3 ? "high" : c >= 1 ? "moderate" : "low" });
  const u = /* @__PURE__ */ new Map();
  for (const g of r)
    g.bodyPart && u.set(g.bodyPart, (u.get(g.bodyPart) ?? 0) + 1);
  const f = Math.max(0, ...Array.from(u.values()));
  o.push({ label: "Recurring Injury Risk", level: f >= 3 ? "high" : f >= 2 ? "moderate" : "low" });
  const h = r.reduce((g, v) => g + (v.gamesMissed ?? 0), 0);
  o.push({ label: "Games Missed Impact", level: h >= 10 ? "high" : h >= 4 ? "moderate" : "low" });
  const m = r.filter((g) => g.bodyPart).length, y = m > 0 ? f / m : 0;
  return o.push({ label: "Body Part Concentration", level: y >= 0.5 ? "high" : y >= 0.34 ? "moderate" : "low" }), o;
}
function Sb(t) {
  return t >= 80 ? { word: "Low", className: "text-emerald-600" } : t >= 60 ? { word: "Moderate", className: "text-amber-600" } : t >= 40 ? { word: "Elevated", className: "text-orange-600" } : { word: "High", className: "text-rose-600" };
}
const Ft = 18, _b = {
  played: {
    label: "Played Through",
    pillBg: "bg-emerald-500/10",
    pillText: "text-emerald-600",
    pillBorder: "border-emerald-500/30",
    cell: "bg-emerald-500/55 border-emerald-500/50 text-white",
    swatch: "bg-emerald-500"
  },
  minor: {
    label: "Minor",
    pillBg: "bg-sky-500/10",
    pillText: "text-sky-600",
    pillBorder: "border-sky-500/30",
    cell: "bg-sky-500/55 border-sky-500/50 text-white",
    swatch: "bg-sky-500"
  },
  moderate: {
    label: "Moderate",
    pillBg: "bg-yellow-500/10",
    pillText: "text-yellow-600",
    pillBorder: "border-yellow-500/30",
    cell: "bg-yellow-400/80 border-yellow-500/60 text-yellow-950",
    swatch: "bg-yellow-400"
  },
  major: {
    label: "Major",
    pillBg: "bg-orange-600/10",
    pillText: "text-orange-600",
    pillBorder: "border-orange-600/30",
    cell: "bg-orange-600/75 border-orange-600/60 text-white",
    swatch: "bg-orange-600"
  },
  "season-ending": {
    label: "Season-Ending",
    pillBg: "bg-rose-500/10",
    pillText: "text-rose-600",
    pillBorder: "border-rose-500/30",
    cell: "bg-rose-500/80 border-rose-500/60 text-white",
    swatch: "bg-rose-500"
  }
}, fi = {
  played: 1,
  minor: 2,
  moderate: 3,
  major: 4,
  "season-ending": 5
};
function Ue(t) {
  return _b[t];
}
function Ar(t) {
  return t.replace(/\b\w/g, (r) => r.toUpperCase());
}
const Cb = ["season-ending", "season ending", "torn", "acl", "achilles", "rupture", "ir", "out for season"];
function Pb(t) {
  if (t.severity === "season-ending" || (t.gamesMissed ?? 0) >= 8) return !0;
  const o = `${t.injury} ${t.description ?? ""} ${t.status ?? ""}`.toLowerCase();
  return Cb.some((l) => o.includes(l));
}
function wt(t) {
  return (t.gamesMissed ?? 0) <= 0 ? "played" : Pb(t) ? "season-ending" : t.severity === "major" ? "major" : t.severity === "moderate" ? "moderate" : t.severity === "minor" ? "minor" : "moderate";
}
function _c(t) {
  const r = t.gamesMissed ?? 0, o = (t.severity ?? "").toLowerCase(), l = o === "minor" || o === "moderate" || o === "major" || o === "season-ending" ? o : t.severity ?? null;
  return {
    season: t.season,
    week: t.week ?? null,
    injury: (t.injury ?? t.type ?? "Injury").trim() || "Injury",
    bodyPart: t.bodyPart ?? null,
    side: t.side ?? null,
    severity: l,
    status: t.status ?? null,
    gamesMissed: r,
    description: t.description ?? null,
    playedThrough: t.playedThrough ?? r <= 0,
    missedWeeks: t.missedWeeks ?? null
  };
}
function Eb(t) {
  if (t.missedWeeks && t.missedWeeks.length)
    return t.missedWeeks.filter((c) => c >= 1 && c <= Ft);
  const r = t.gamesMissed ?? 0;
  if (r <= 0 || t.week == null) return [];
  const o = t.week < 1 ? 1 : t.week, l = [];
  for (let c = 0; c < r; c++) {
    const u = o + c;
    u >= 1 && u <= Ft && l.push(u);
  }
  return l;
}
function Rb(t, r) {
  const o = t.reduce((l, c) => l + (c.gamesMissed ?? 0), 0);
  return t.length === 0 && r ? { label: "Full season", cls: "bg-emerald-500/10 text-emerald-600" } : o === 0 ? { label: "0 games missed", cls: "bg-emerald-500/10 text-emerald-600" } : { label: `${o} game${o === 1 ? "" : "s"} missed`, cls: "bg-rose-500/10 text-rose-600" };
}
function Tb(t) {
  const r = {};
  for (const o of t)
    (r[o.season] ??= []).push(o);
  return r;
}
function Ab(t) {
  const r = {}, o = (l, c, u) => {
    if (l < 1 || l > Ft) return;
    const f = (u ? 10 : 0) + fi[c], h = r[l], m = h ? (h.missed ? 10 : 0) + fi[h.sev] : -1;
    f > m && (r[l] = { sev: c, missed: u });
  };
  for (const l of t) {
    const c = wt(l), u = Eb(l);
    u.length ? u.forEach((f) => o(f, c, !0)) : l.week != null && l.week >= 1 && o(l.week, "played", !1);
  }
  return r;
}
const fm = (t) => t >= 2021 ? 18 : 17;
function pm(t, r, o) {
  const l = fm(t), c = {};
  if (o && o.size > 0) {
    const f = [];
    for (let k = 1; k <= l; k++) o.has(k) || f.push(k);
    const h = Math.max(0, l - 1 - o.size), m = new Set(f), y = {};
    let g = h;
    const v = r.filter((k) => (k.gamesMissed ?? 0) > 0).slice().sort((k, j) => (k.week ?? 1) - (j.week ?? 1));
    for (const k of v) {
      if (g <= 0) break;
      const j = wt(k);
      let A = Math.min(k.gamesMissed ?? 0, g);
      for (let _ = k.week && k.week >= 1 ? k.week : 1; _ <= l && A > 0; _++)
        m.has(_) && (y[_] = j, m.delete(_), A--, g--);
    }
    const w = Math.max(0, f.length - h), S = (k) => k < 1 || k > l || o.has(k), P = new Set(
      Array.from(m).sort((k, j) => {
        const A = (S(k - 1) ? 1 : 0) + (S(k + 1) ? 1 : 0);
        return (S(j - 1) ? 1 : 0) + (S(j + 1) ? 1 : 0) - A || j - k;
      }).slice(0, w)
    );
    for (let k = 1; k <= Ft; k++)
      k > l ? c[k] = { status: "na" } : o.has(k) ? c[k] = { status: "played" } : y[k] ? c[k] = { status: "missed", sev: y[k] } : P.has(k) ? c[k] = { status: "off" } : c[k] = { status: "out" };
    return c;
  }
  const u = Ab(r);
  for (let f = 1; f <= Ft; f++)
    f > l ? c[f] = { status: "na" } : u[f]?.missed ? c[f] = { status: "missed", sev: u[f].sev } : c[f] = { status: "played" };
  return c;
}
function hm(t) {
  switch (t.status) {
    case "missed":
      return Ue(t.sev ?? "moderate").cell;
    case "out":
      return "border border-rose-500/30 bg-rose-500/15 text-rose-600/80";
    case "off":
      return "border border-dashed border-border/50 bg-transparent text-muted-foreground/30";
    case "na":
      return "border border-transparent bg-transparent text-transparent";
    default:
      return "border border-border/60 bg-muted/40 text-muted-foreground/55";
  }
}
function mm(t, r, o, l) {
  if (l && l.size > 0) {
    const c = fm(t) - 1, u = Math.max(0, c - l.size);
    return u === 0 ? { label: r.length > 0 ? "0 games missed" : "Full season", cls: "bg-emerald-500/10 text-emerald-600" } : { label: `${u} game${u === 1 ? "" : "s"} missed`, cls: "bg-rose-500/10 text-rose-600" };
  }
  return Rb(r, o);
}
function On(t) {
  return t == null ? "" : t < 1 ? "Preseason" : `Wk ${t}`;
}
function Cc(t) {
  return `${t.side && t.side !== "unknown" ? `${Ar(t.side)} ` : ""}${t.injury}`;
}
const Lb = ["questionable", "doubtful", "probable", "game-time", "day-to-day"];
function Ir(t) {
  const r = (t.injury ?? t.type ?? "").trim(), o = r.toLowerCase(), l = t.gamesMissed ?? 0, c = t.week == null ? `in ${t.season}` : t.week < 1 ? `during the ${t.season} preseason` : `in Week ${t.week} of ${t.season}`;
  if (!r || Lb.some((y) => o.includes(y)))
    return l > 0 ? `Landed on the injury report ${c} and sat out ${l} game${l === 1 ? "" : "s"}.` : `Appeared on the injury report ${c} but suited up.`;
  const u = t.side && t.side !== "unknown" ? t.side.toLowerCase() : "", f = t.bodyPart ? t.bodyPart.toLowerCase() : "", h = [];
  u && !o.includes(u) && h.push(u), f && !o.includes(f) && h.push(f), h.push(o);
  const m = h.join(" ");
  return l > 0 ? `A ${m} ${c} kept him out for ${l} game${l === 1 ? "" : "s"}.` : `Battled a ${m} ${c} without missing any time.`;
}
function gm(t) {
  return t == null ? { left: "0%", centered: !1, kind: "unk" } : t < 1 ? { left: "0%", centered: !1, kind: "pre" } : { left: `${(Math.min(Math.max(t, 1), Ft) - 0.5) / Ft * 100}%`, centered: !0, kind: "week" };
}
function Ob(t) {
  const r = {};
  for (const o of t) {
    const l = gm(o.week), c = l.kind === "week" ? `w${Math.min(Math.max(o.week, 1), Ft)}` : l.kind;
    (r[c] ??= []).push(o);
  }
  return Object.entries(r).map(([o, l]) => {
    const c = o.startsWith("w") ? "week" : o, u = c === "week" ? Number(o.slice(1)) : null;
    let f = "played";
    for (const h of l) {
      const m = wt(h);
      fi[m] > fi[f] && (f = m);
    }
    return { key: o, kind: c, week: u, injuries: l, severity: f, anyMissed: l.some((h) => (h.gamesMissed ?? 0) > 0) };
  }).sort((o, l) => (o.week ?? -1) - (l.week ?? -1));
}
function pi({ summary: t }) {
  return /* @__PURE__ */ i.jsx("span", { className: xe("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", t.cls), children: t.label });
}
function Mb({ week: t, avail: r }) {
  const o = r.status === "missed" ? `Week ${t} — missed (${Ue(r.sev ?? "moderate").label})` : r.status === "out" ? `Week ${t} — did not play` : r.status === "off" ? `Week ${t} — bye` : r.status === "na" ? `No Week ${t} this season` : `Week ${t} — played`;
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      title: o,
      className: xe(
        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[5px] text-[9px] font-semibold tabular-nums sm:h-7 sm:w-7",
        hm(r)
      ),
      children: r.status === "na" ? "" : t
    }
  );
}
function Ib({ ev: t, open: r, onToggle: o }) {
  const l = Ue(wt(t)), c = On(t.week), u = t.gamesMissed ?? 0, f = [
    t.injury,
    t.bodyPart ? Ar(t.bodyPart) : null,
    c || "Week unknown",
    l.label,
    u > 0 ? `${u} games missed` : "Played through"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      onClick: o,
      "aria-expanded": r,
      title: f,
      className: xe(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
        l.pillBg,
        l.pillText,
        l.pillBorder,
        "hover:brightness-110",
        r && "ring-1 ring-[#d4af37]/60"
      ),
      children: [
        c && /* @__PURE__ */ i.jsx("span", { className: "opacity-80", children: c }),
        /* @__PURE__ */ i.jsx("span", { className: "text-foreground", children: Cc(t) }),
        /* @__PURE__ */ i.jsx("span", { "aria-hidden": !0, className: "opacity-40", children: "·" }),
        u > 0 ? /* @__PURE__ */ i.jsxs("span", { className: "font-bold text-rose-600", children: [
          u,
          " missed"
        ] }) : /* @__PURE__ */ i.jsx("span", { className: "opacity-80", children: "Played through" })
      ]
    }
  );
}
function $b({ ev: t, onClose: r }) {
  const o = Ue(wt(t)), l = On(t.week), c = t.gamesMissed ?? 0;
  return /* @__PURE__ */ i.jsxs("div", { className: "mt-2 rounded-lg border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ i.jsx("div", { className: "text-sm font-bold text-foreground", children: t.injury }),
        /* @__PURE__ */ i.jsxs("div", { className: "mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground", children: [
          t.bodyPart && /* @__PURE__ */ i.jsxs("span", { children: [
            Ar(t.bodyPart),
            t.side && t.side !== "unknown" ? ` (${Ar(t.side)})` : ""
          ] }),
          /* @__PURE__ */ i.jsx("span", { children: l || "Week unknown" }),
          /* @__PURE__ */ i.jsx("span", { className: xe("font-semibold", o.pillText), children: o.label }),
          /* @__PURE__ */ i.jsx("span", { className: xe(c > 0 && "font-semibold text-rose-600"), children: c > 0 ? `${c} games missed` : "Played through" })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: r, className: "flex-shrink-0 text-[11px] text-muted-foreground hover:text-foreground", children: "Close" })
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: "mt-2 text-[12px] leading-relaxed text-muted-foreground", children: Ir(t) })
  ] });
}
function Fb({ events: t }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "max-w-[250px] space-y-2 p-2", children: [
    t.length > 1 && /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
      t.length,
      " injuries this week"
    ] }),
    t.map((r, o) => {
      const l = Ue(wt(r)), c = r.gamesMissed ?? 0, u = On(r.week);
      return /* @__PURE__ */ i.jsxs("div", { className: xe(o > 0 && "border-t border-border/60 pt-2"), children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-[13px] font-bold leading-tight text-foreground", children: Cc(r) }),
          /* @__PURE__ */ i.jsx("span", { className: xe("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", l.pillBg, l.pillText), children: l.label })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "mt-0.5 text-[11px] tabular-nums text-muted-foreground", children: [
          r.season,
          u ? ` · ${u}` : "",
          r.bodyPart ? ` · ${Ar(r.bodyPart)}` : "",
          c > 0 ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            " · ",
            /* @__PURE__ */ i.jsxs("span", { className: "font-semibold text-rose-600", children: [
              c,
              " ",
              c === 1 ? "game" : "games",
              " missed"
            ] })
          ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            " · ",
            /* @__PURE__ */ i.jsx("span", { className: "text-emerald-600", children: "played through" })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-muted-foreground/90", children: Ir(r) })
      ] }, o);
    })
  ] });
}
function Db({ week: t, avail: r }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: xe("flex h-7 items-start justify-center rounded-[3px] pt-0.5 text-[8px] font-semibold leading-none tabular-nums", hm(r)),
      style: { margin: "0 1.5px" },
      children: r.status === "na" ? "" : t
    }
  );
}
function Bb({ group: t, selected: r, onSelect: o }) {
  const l = gm(t.kind === "week" ? t.week : t.kind === "pre" ? 0 : null), c = Ue(t.severity), u = t.injuries.length, f = t.kind === "week" ? `Week ${t.week} injuries` : t.kind === "pre" ? "Preseason injury" : "Unknown-week injury";
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: "absolute bottom-[3px]",
      style: { left: l.left, transform: l.centered ? "translateX(-50%)" : "translateX(0)" },
      children: /* @__PURE__ */ i.jsxs(am, { children: [
        /* @__PURE__ */ i.jsx(lm, { asChild: !0, children: /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-label": f,
            className: "pointer-events-auto flex items-center justify-center transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]",
            children: t.kind !== "week" ? /* @__PURE__ */ i.jsx("span", { className: xe("rounded px-1 text-[8px] font-bold uppercase leading-tight text-white", c.swatch, r && "ring-2 ring-[#d4af37]"), children: t.kind === "pre" ? "PRE" : "UNK" }) : u > 1 ? /* @__PURE__ */ i.jsx("span", { className: xe("flex h-4 w-4 items-center justify-center rounded-full border border-background text-[8px] font-bold text-white", c.swatch, r && "ring-2 ring-[#d4af37]"), children: u }) : /* @__PURE__ */ i.jsx("span", { className: xe("block h-2.5 w-2.5 rounded-full border border-background", c.swatch, t.anyMissed && "ring-1 ring-background", r && "ring-2 ring-[#d4af37]") })
          }
        ) }),
        /* @__PURE__ */ i.jsx(cm, { side: "top", collisionPadding: 10, children: /* @__PURE__ */ i.jsx(Fb, { events: t.injuries }) })
      ] })
    }
  );
}
function zb({
  season: t,
  events: r,
  isKnownSeason: o,
  playedWeeks: l,
  selectedKey: c,
  onSelect: u
}) {
  const f = mm(t, r, o, l), h = b.useMemo(() => pm(t, r, l), [t, r, l]), m = b.useMemo(() => Ob(r), [r]);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2 rounded-lg border border-border bg-card/40 px-2.5 py-2.5 md:flex-row md:items-center md:gap-3", "data-testid": `timeline-season-${t}`, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between md:block md:w-10 md:flex-shrink-0", children: [
      /* @__PURE__ */ i.jsx("span", { className: "text-sm font-black tabular-nums text-foreground", children: t }),
      /* @__PURE__ */ i.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ i.jsx(pi, { summary: f }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "min-w-0 flex-1 overflow-x-auto", children: /* @__PURE__ */ i.jsxs("div", { className: "relative min-w-[392px]", children: [
      /* @__PURE__ */ i.jsx("div", { className: "grid gap-0", style: { gridTemplateColumns: `repeat(${Ft}, minmax(0, 1fr))` }, children: Array.from({ length: Ft }, (y, g) => g + 1).map((y) => /* @__PURE__ */ i.jsx(Db, { week: y, avail: h[y] }, y)) }),
      /* @__PURE__ */ i.jsx("div", { className: "pointer-events-none absolute inset-0", children: m.map((y) => {
        const g = `${t}:${y.key}`, v = `${t}${y.kind === "week" ? ` · Week ${y.week}` : y.kind === "pre" ? " · Preseason" : " · Week unknown"}`;
        return /* @__PURE__ */ i.jsx(
          Bb,
          {
            group: y,
            selected: c === g,
            onSelect: () => u(c === g ? null : g, y.injuries, v)
          },
          g
        );
      }) })
    ] }) }),
    /* @__PURE__ */ i.jsx("div", { className: "hidden flex-shrink-0 text-right md:block", children: /* @__PURE__ */ i.jsx(pi, { summary: f }) })
  ] });
}
function Ub({ title: t, injuries: r, onClose: o }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "mt-3 rounded-lg border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-1.5 flex items-center justify-between", children: [
      /* @__PURE__ */ i.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: t }),
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: o, className: "text-[11px] text-muted-foreground hover:text-foreground", children: "Close" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "space-y-2", children: r.map((l, c) => {
      const u = Ue(wt(l)), f = l.gamesMissed ?? 0, h = On(l.week);
      return /* @__PURE__ */ i.jsxs("div", { className: xe(c > 0 && "border-t border-border/60 pt-2"), children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-[13px] font-bold text-foreground", children: Cc(l) }),
          /* @__PURE__ */ i.jsx("span", { className: xe("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", u.pillBg, u.pillText), children: u.label })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
          l.season,
          h ? ` · ${h}` : "",
          l.bodyPart ? ` · ${Ar(l.bodyPart)}` : "",
          f > 0 ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            " · ",
            /* @__PURE__ */ i.jsxs("span", { className: "font-semibold text-rose-600", children: [
              f,
              " games missed"
            ] })
          ] }) : " · played through"
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "mt-1 text-[12px] leading-relaxed text-muted-foreground", children: Ir(l) })
      ] }, c);
    }) })
  ] });
}
function Wb({
  season: t,
  events: r,
  isKnownSeason: o,
  playedWeeks: l,
  openKey: c,
  setOpenKey: u
}) {
  const f = mm(t, r, o, l), h = b.useMemo(() => pm(t, r, l), [t, r, l]), m = c?.startsWith(`${t}:`) ? Number(c.slice(c.indexOf(":") + 1)) : -1, y = m >= 0 ? r[m] : void 0;
  return /* @__PURE__ */ i.jsx("div", { className: "rounded-lg border border-border bg-card/40 p-3", "data-testid": `timeline-season-${t}`, children: /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2 md:flex-row md:items-start md:gap-4", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between md:block md:w-12 md:flex-shrink-0 md:pt-0.5", children: [
      /* @__PURE__ */ i.jsx("span", { className: "text-base font-black tabular-nums text-foreground", children: t }),
      /* @__PURE__ */ i.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ i.jsx(pi, { summary: f }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ i.jsx("div", { className: "-mx-0.5 overflow-x-auto px-0.5 pb-1", children: /* @__PURE__ */ i.jsx("div", { className: "flex min-w-min gap-1", children: Array.from({ length: Ft }, (g, v) => v + 1).map((g) => /* @__PURE__ */ i.jsx(Mb, { week: g, avail: h[g] }, g)) }) }),
      r.length > 0 && /* @__PURE__ */ i.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: r.map((g, v) => {
        const w = `${t}:${v}`;
        return /* @__PURE__ */ i.jsx(
          Ib,
          {
            ev: g,
            open: c === w,
            onToggle: () => u(c === w ? null : w)
          },
          w
        );
      }) }),
      y && /* @__PURE__ */ i.jsx($b, { ev: y, onClose: () => u(null) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "hidden md:block md:w-28 md:flex-shrink-0 md:pt-0.5 md:text-right", children: /* @__PURE__ */ i.jsx(pi, { summary: f }) })
  ] }) });
}
const Hb = ["minor", "moderate", "major", "season-ending", "played"];
function Vb({
  injuries: t,
  knownSeasons: r = [],
  weeklyPlayed: o,
  insight: l,
  className: c
}) {
  const u = b.useMemo(() => t.map(_c), [t]), f = b.useMemo(() => Tb(u), [u]), h = b.useMemo(() => new Set(r.filter((j) => Number.isFinite(j))), [r]), m = b.useMemo(() => {
    const j = {};
    for (const [A, _] of Object.entries(o ?? {}))
      _ && _.length > 0 && (j[Number(A)] = new Set(_));
    return j;
  }, [o]), y = b.useMemo(() => {
    const j = new Set(h);
    return u.forEach((A) => j.add(A.season)), Array.from(j).sort((A, _) => _ - A);
  }, [u, h]), [g, v] = b.useState("compact"), [w, S] = b.useState(null), [P, k] = b.useState(null);
  return y.length === 0 ? null : /* @__PURE__ */ i.jsxs(qn, { className: xe("p-5", c), children: [
    /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ i.jsx("h3", { className: "sc-sectitle", children: "Availability Timeline" }),
        /* @__PURE__ */ i.jsx("div", { className: "inline-flex flex-shrink-0 items-center rounded-md border border-border p-0.5", children: ["compact", "detailed"].map((j) => /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            onClick: () => v(j),
            className: xe(
              "rounded px-2 py-0.5 text-[11px] font-semibold capitalize transition-colors",
              g === j ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            ),
            children: j
          },
          j
        )) })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: "Season-by-season injury and missed-time history" }),
      l && /* @__PURE__ */ i.jsx("p", { className: "mt-2 max-w-2xl text-[12px] leading-relaxed text-muted-foreground", children: l }),
      /* @__PURE__ */ i.jsx("div", { className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1", children: Hb.map((j) => /* @__PURE__ */ i.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx("span", { className: xe("h-2.5 w-2.5 rounded-[3px]", Ue(j).swatch) }),
        Ue(j).label
      ] }, j)) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: xe("mt-4", g === "compact" ? "space-y-2" : "space-y-2.5"), children: y.map(
      (j) => g === "compact" ? /* @__PURE__ */ i.jsx(
        zb,
        {
          season: j,
          events: f[j] ?? [],
          isKnownSeason: h.has(j),
          playedWeeks: m[j] ?? null,
          selectedKey: P?.key ?? null,
          onSelect: (A, _, C) => k(A ? { key: A, title: C, injuries: _ } : null)
        },
        j
      ) : /* @__PURE__ */ i.jsx(
        Wb,
        {
          season: j,
          events: f[j] ?? [],
          isKnownSeason: h.has(j),
          playedWeeks: m[j] ?? null,
          openKey: w,
          setOpenKey: S
        },
        j
      )
    ) }),
    g === "compact" && P && /* @__PURE__ */ i.jsx(Ub, { title: P.title, injuries: P.injuries, onClose: () => k(null) }),
    /* @__PURE__ */ i.jsx("p", { className: "mt-3 text-[10px] leading-relaxed text-muted-foreground/80", children: "Played/missed is sourced from weekly game logs where available. Filled cells are games played; colored cells are weeks missed to a logged injury; red cells are other games not played; dashed cells are byes." })
  ] });
}
const Yb = /* @__PURE__ */ new Set(["head", "neck", "chest", "ribs", "back", "hip"]), Gb = {
  head: { x: 50, y: 9 },
  neck: { x: 50, y: 18 },
  leftShoulder: { x: 34, y: 24 },
  rightShoulder: { x: 66, y: 24 },
  shoulder: { x: 50, y: 22 },
  leftArm: { x: 26, y: 39 },
  rightArm: { x: 74, y: 39 },
  arm: { x: 50, y: 39 },
  leftHand: { x: 20, y: 56 },
  rightHand: { x: 80, y: 56 },
  hand: { x: 50, y: 50 },
  chest: { x: 50, y: 33 },
  ribs: { x: 50, y: 42 },
  back: { x: 50, y: 45 },
  hip: { x: 50, y: 58 },
  leftUpperLeg: { x: 42, y: 69 },
  rightUpperLeg: { x: 58, y: 69 },
  upperLeg: { x: 50, y: 69 },
  leftKnee: { x: 42, y: 80 },
  rightKnee: { x: 58, y: 80 },
  knee: { x: 50, y: 80 },
  leftLowerLeg: { x: 42, y: 89 },
  rightLowerLeg: { x: 58, y: 89 },
  lowerLeg: { x: 50, y: 89 },
  leftFoot: { x: 39, y: 96 },
  rightFoot: { x: 61, y: 96 },
  foot: { x: 50, y: 96 }
}, Qb = [
  { region: "head", keywords: ["head", "concussion", "skull", "face", "jaw", "eye", "nose"] },
  { region: "neck", keywords: ["neck", "stinger", "burner"] },
  { region: "shoulder", keywords: ["shoulder", "clavicle", "collarbone", "ac joint", "rotator"] },
  { region: "hand", keywords: ["wrist", "hand", "thumb", "finger"] },
  { region: "arm", keywords: ["arm", "elbow", "bicep", "tricep", "forearm", "ucl"] },
  { region: "chest", keywords: ["chest", "pec", "sternum"] },
  { region: "ribs", keywords: ["rib", "abdomen", "oblique", "core", "ab "] },
  { region: "back", keywords: ["back", "spine", "spinal", "lumbar", "disc", "vertebra"] },
  { region: "hip", keywords: ["hip", "groin", "pelvis", "glute"] },
  { region: "upperLeg", keywords: ["hamstring", "quad", "thigh", "femur"] },
  { region: "knee", keywords: ["knee", "acl", "mcl", "pcl", "patella", "meniscus"] },
  { region: "lowerLeg", keywords: ["calf", "shin", "achilles", "tibia", "fibula"] },
  { region: "foot", keywords: ["ankle", "foot", "toe", "heel", "plantar", "lisfranc"] }
], ql = {
  head: "head",
  neck: "neck",
  shoulder: "shoulder",
  arm: "arm/elbow",
  hand: "hand/wrist",
  chest: "chest",
  ribs: "rib/core",
  back: "back",
  hip: "hip/groin",
  upperLeg: "hamstring/thigh",
  knee: "knee",
  lowerLeg: "calf/shin",
  foot: "foot/ankle"
}, Kb = /* @__PURE__ */ new Set(["head", "neck", "shoulder", "arm", "hand", "chest", "ribs", "back"]);
function hi(t) {
  const r = `${t.bodyPart ?? ""} ${t.injury ?? ""}`.toLowerCase();
  for (const { region: o, keywords: l } of Qb)
    if (l.some((c) => r.includes(c))) return o;
  return null;
}
function qb(t) {
  const r = (t.side ?? "").toLowerCase();
  if (r === "left" || r === "right") return r;
  const o = `${t.bodyPart ?? ""} ${t.injury ?? ""} ${t.description ?? ""}`.toLowerCase();
  return /\bleft\b/.test(o) ? "left" : /\bright\b/.test(o) ? "right" : null;
}
const ym = (t) => t.charAt(0).toUpperCase() + t.slice(1);
function Xb(t) {
  const r = hi(t);
  if (!r) return null;
  if (Yb.has(r)) return r;
  const o = qb(t);
  return o ? `${o}${ym(r)}` : r;
}
function Zb(t) {
  return Gb[t] ?? null;
}
const _p = ["played", "minor", "moderate", "major", "season-ending"];
function Pc(t) {
  let r = "played";
  for (const o of t) {
    const l = wt(o);
    _p.indexOf(l) > _p.indexOf(r) && (r = l);
  }
  return r;
}
function xm(t) {
  return t === "played" ? "minor" : t;
}
function Jb(t, r = 6) {
  const o = {};
  for (const l of t) {
    const c = hi(l);
    c && (o[c] ??= []).push(l);
  }
  return Object.entries(o).map(([l, c]) => {
    const u = c.reduce((m, y) => m + (y.gamesMissed ?? 0), 0), f = c.length, h = u >= 6 || f >= 3 ? "high" : u >= 2 || f >= 2 ? "moderate" : "low";
    return { region: l, count: f, gamesMissed: u, severity: Pc(c), level: h };
  }).sort((l, c) => c.gamesMissed - l.gamesMissed || c.count - l.count).slice(0, r);
}
const Cp = {
  low: { label: "Low", text: "text-emerald-600" },
  moderate: { label: "Moderate", text: "text-amber-600" },
  high: { label: "High", text: "text-rose-600" }
};
function ek(t) {
  const r = {};
  for (const o of t) {
    const l = Xb(o);
    l && (r[l] ??= []).push(o);
  }
  return r;
}
const tk = {
  minor: "ring-teal-300/70",
  moderate: "ring-amber-300/70",
  major: "ring-orange-300/80",
  "season-ending": "ring-rose-300/80"
};
function nk(t, r) {
  const o = xm(t);
  return xe(
    "flex items-center justify-center rounded-full border border-black/25 font-bold tabular-nums text-white shadow-sm transition-transform",
    Ue(o).swatch,
    r && `ring-2 ring-offset-2 ring-offset-background ${tk[o]}`
  );
}
const rk = (t) => t.length <= 1 ? t[0] ?? "" : `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}`;
function sk(t) {
  const r = t.filter((g) => hi(g));
  if (r.length === 0) return "No body-region-tagged injuries to map yet.";
  const o = {};
  let l = 0, c = 0, u = null, f = 0;
  for (const g of r) {
    const v = hi(g);
    o[v] = (o[v] ?? 0) + 1, Kb.has(v) ? l++ : c++;
    const w = g.gamesMissed ?? 0;
    w > f && (f = w, u = v);
  }
  const h = l > c ? "upper body" : c > l ? "lower body" : "upper and lower body", m = Object.entries(o).sort((g, v) => v[1] - g[1]).slice(0, 2).map(([g, v]) => `${v} ${ql[g]} ${v === 1 ? "injury" : "injuries"}`);
  let y = `Injury history is concentrated in the ${h}`;
  return m.length && (y += `, with ${rk(m)}`), y += ".", y += f > 0 && u ? ` Missed time stems mainly from ${ql[u]} issues.` : " None of these injuries cost regular-season games.", y;
}
function ok(t) {
  if (t.length === 1) {
    const o = t[0], l = o.gamesMissed ?? 0;
    return [
      o.injury,
      `${o.season}${On(o.week) ? ` ${On(o.week)}` : ""}`,
      Ue(wt(o)).label,
      l > 0 ? `${l} games missed` : "played through"
    ].filter(Boolean).join(" · ");
  }
  const r = t.reduce((o, l) => o + (l.gamesMissed ?? 0), 0);
  return `${t.length} injuries · ${Ue(Pc(t)).label} worst · ${r} games missed`;
}
function ik({ events: t }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "max-w-[250px] space-y-2 p-2", children: [
    t.length > 1 && /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
      t.length,
      " injuries logged here"
    ] }),
    t.map((r, o) => {
      const l = Ue(wt(r)), c = r.gamesMissed ?? 0, u = On(r.week);
      return /* @__PURE__ */ i.jsxs("div", { className: xe(o > 0 && "border-t border-border/60 pt-2"), children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-[13px] font-bold leading-tight text-foreground", children: r.injury }),
          /* @__PURE__ */ i.jsx("span", { className: xe("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", l.pillBg, l.pillText), children: l.label })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "mt-0.5 text-[11px] tabular-nums text-muted-foreground", children: [
          r.season,
          u ? ` · ${u}` : "",
          c > 0 ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            " · ",
            /* @__PURE__ */ i.jsxs("span", { className: "font-semibold text-rose-600", children: [
              c,
              " ",
              c === 1 ? "game" : "games",
              " missed"
            ] })
          ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            " · ",
            /* @__PURE__ */ i.jsx("span", { className: "text-emerald-600", children: "played through" })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-muted-foreground/90", children: Ir(r) })
      ] }, o);
    })
  ] });
}
function ak({ regionKey: t, events: r, selected: o, onToggle: l }) {
  const c = Zb(t);
  if (!c) return null;
  const u = Pc(r), f = r.some((g) => (g.gamesMissed ?? 0) > 0), h = r.length, m = h > 1 ? 24 : 18, y = h === 1 ? r[0] : null;
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5",
      style: { left: `${c.x}%`, top: `${c.y}%` },
      children: [
        /* @__PURE__ */ i.jsxs(am, { children: [
          /* @__PURE__ */ i.jsx(lm, { asChild: !0, children: /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              onClick: l,
              "aria-expanded": o,
              "aria-label": ok(r),
              className: xe(
                nk(u, f),
                "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]",
                o && "scale-110 ring-2 ring-offset-2 ring-offset-background ring-[#d4af37]"
              ),
              style: { width: m, height: m, fontSize: m > 20 ? 11 : 9 },
              children: h > 1 ? h : ""
            }
          ) }),
          /* @__PURE__ */ i.jsx(cm, { side: "top", collisionPadding: 10, children: /* @__PURE__ */ i.jsx(ik, { events: r }) })
        ] }),
        y && /* @__PURE__ */ i.jsx("span", { className: "rounded bg-background/70 px-1 text-[8px] font-semibold leading-tight tabular-nums text-muted-foreground backdrop-blur-sm", children: y.season })
      ]
    }
  );
}
function lk({ events: t, onClose: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "mt-3 rounded-lg border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-1.5 flex items-center justify-between", children: [
      /* @__PURE__ */ i.jsxs("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: [
        t.length,
        " ",
        t.length === 1 ? "injury" : "injuries",
        " at this region"
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: r, className: "text-[11px] text-muted-foreground hover:text-foreground", children: "Close" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "space-y-1.5", children: t.map((o, l) => {
      const c = Ue(wt(o)), u = o.gamesMissed ?? 0, f = On(o.week);
      return /* @__PURE__ */ i.jsxs("div", { className: "text-[12px] leading-snug", children: [
        /* @__PURE__ */ i.jsx("span", { className: "font-semibold text-foreground", children: o.injury }),
        /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground", children: [
          " ",
          "· ",
          o.season,
          f ? ` ${f}` : "",
          " · ",
          /* @__PURE__ */ i.jsx("span", { className: c.pillText, children: c.label }),
          " ",
          "· ",
          u > 0 ? /* @__PURE__ */ i.jsxs("span", { className: "font-semibold text-rose-600", children: [
            u,
            " games missed"
          ] }) : "played through"
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground/80", children: Ir(o) })
      ] }, l);
    }) })
  ] });
}
const ck = ["season-ending", "major", "moderate", "minor"], uk = {
  "season-ending": "Season-Ending",
  major: "Major / IR",
  moderate: "Moderate",
  minor: "Minor"
};
function dk() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 100 100", className: "absolute inset-0 h-full w-full text-muted-foreground/70", "aria-hidden": !0, children: [
    /* @__PURE__ */ i.jsxs("g", { stroke: "currentColor", strokeOpacity: 0.16, strokeLinecap: "round", fill: "none", children: [
      /* @__PURE__ */ i.jsx("line", { x1: 50, y1: 15, x2: 50, y2: 20, strokeWidth: 3 }),
      /* @__PURE__ */ i.jsx("line", { x1: 40, y1: 24, x2: 60, y2: 24, strokeWidth: 4 }),
      /* @__PURE__ */ i.jsx("line", { x1: 39, y1: 25, x2: 25, y2: 53, strokeWidth: 3.5 }),
      /* @__PURE__ */ i.jsx("line", { x1: 61, y1: 25, x2: 75, y2: 53, strokeWidth: 3.5 }),
      /* @__PURE__ */ i.jsx("line", { x1: 46, y1: 58, x2: 43, y2: 94, strokeWidth: 4 }),
      /* @__PURE__ */ i.jsx("line", { x1: 54, y1: 58, x2: 57, y2: 94, strokeWidth: 4 })
    ] }),
    /* @__PURE__ */ i.jsxs("g", { fill: "currentColor", fillOpacity: 0.09, stroke: "currentColor", strokeOpacity: 0.14, strokeWidth: 0.5, children: [
      /* @__PURE__ */ i.jsx("circle", { cx: 50, cy: 9, r: 6 }),
      /* @__PURE__ */ i.jsx("path", { d: "M41 23 Q40 23 40 25 L42 56 Q42 59 45 59 L55 59 Q58 59 58 56 L60 25 Q60 23 59 23 Z" }),
      /* @__PURE__ */ i.jsx("ellipse", { cx: 42.5, cy: 95.5, rx: 3.5, ry: 2 }),
      /* @__PURE__ */ i.jsx("ellipse", { cx: 57.5, cy: 95.5, rx: 3.5, ry: 2 })
    ] })
  ] });
}
function fk({ injuries: t, className: r }) {
  const o = b.useMemo(() => t.map(_c), [t]), l = b.useMemo(() => ek(o), [o]), c = b.useMemo(() => sk(o), [o]), u = b.useMemo(() => Jb(o), [o]), [f, h] = b.useState(null), m = Object.keys(l);
  if (m.length === 0) return null;
  const y = f ? l[f] : null;
  return /* @__PURE__ */ i.jsxs(qn, { className: xe("p-5", r), children: [
    /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx("h3", { className: "sc-sectitle", children: "Body Map" }),
      /* @__PURE__ */ i.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: "Career injury locations by body region" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "relative mx-auto mt-4 aspect-square w-full max-w-[230px] rounded-xl border border-border/60 bg-muted/10", children: [
      /* @__PURE__ */ i.jsx(dk, {}),
      m.map((g) => /* @__PURE__ */ i.jsx(
        ak,
        {
          regionKey: g,
          events: l[g],
          selected: f === g,
          onToggle: () => h(f === g ? null : g)
        },
        g
      ))
    ] }),
    y && /* @__PURE__ */ i.jsx(lk, { events: y, onClose: () => h(null) }),
    u.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ i.jsx("div", { className: "mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Most Affected Regions" }),
      /* @__PURE__ */ i.jsx("div", { className: "space-y-1", children: u.map((g) => /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2 text-[12px]", children: [
        /* @__PURE__ */ i.jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [
          /* @__PURE__ */ i.jsx("span", { className: xe("h-2 w-2 flex-shrink-0 rounded-full", Ue(xm(g.severity)).swatch) }),
          /* @__PURE__ */ i.jsx("span", { className: "truncate font-semibold text-foreground", children: ym(ql[g.region]) })
        ] }),
        /* @__PURE__ */ i.jsxs("span", { className: "flex-shrink-0 text-right text-[11px] tabular-nums text-muted-foreground", children: [
          g.count,
          " ",
          g.count === 1 ? "injury" : "injuries",
          " · ",
          g.gamesMissed,
          " missed ·",
          " ",
          /* @__PURE__ */ i.jsx("span", { className: xe("font-semibold", Cp[g.level].text), children: Cp[g.level].label })
        ] })
      ] }, g.region)) })
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: "mt-3 text-[12px] leading-relaxed text-muted-foreground", children: c }),
    /* @__PURE__ */ i.jsx("div", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-3", children: ck.map((g) => /* @__PURE__ */ i.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ i.jsx("span", { className: xe("h-2.5 w-2.5 rounded-full", Ue(g).swatch) }),
      uk[g]
    ] }, g)) })
  ] });
}
const _s = "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap", pk = "bg-slate-500/10 text-slate-600", hk = "bg-rose-500/10 text-rose-600";
function mk({ label: t, value: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 px-3 py-2", children: [
    /* @__PURE__ */ i.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: t }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[13px] font-bold text-foreground mt-0.5 leading-tight", children: r })
  ] });
}
function gk({ label: t, level: r }) {
  const o = bb[r];
  return /* @__PURE__ */ i.jsxs("div", { "data-testid": `risk-${t.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-+|-+$/g, "")}`, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ i.jsx("span", { className: "text-[12px] font-semibold text-foreground", children: t }),
      /* @__PURE__ */ i.jsx("span", { className: xe("text-[11px] font-bold uppercase tracking-wider", o.text), children: o.label })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ i.jsx("div", { className: xe("h-full rounded-full", o.bar), style: { width: `${o.score}%` } }) })
  ] });
}
function yk(t) {
  const r = t.significance === "high" ? "significant" : t.significance === "medium" ? "moderate" : t.significance === "low" ? "minor" : "documented";
  return t.year ? `A ${r} pre-NFL injury during the ${t.year} season.` : `A ${r} pre-NFL injury.`;
}
function vm(t) {
  return (t.gamesMissed ?? 0) > 0 ? wt(t) : t.severity === "major" ? "major" : t.severity === "moderate" ? "moderate" : "minor";
}
function xk(t) {
  return t == null ? "Wk —" : t < 1 ? "Preseason" : `Wk ${t}`;
}
function vk({ ev: t }) {
  const r = t.gamesMissed ?? 0, o = Ue(vm(t));
  return /* @__PURE__ */ i.jsxs("span", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: [
    /* @__PURE__ */ i.jsx("span", { className: xe(_s, pk), children: t.bodyPart ? um(t.bodyPart) : "Unknown" }),
    /* @__PURE__ */ i.jsx("span", { className: xe(_s, o.pillBg, o.pillText), children: o.label }),
    r > 0 ? /* @__PURE__ */ i.jsxs("span", { className: xe(_s, hk), children: [
      r,
      " game",
      r === 1 ? "" : "s",
      " missed"
    ] }) : /* @__PURE__ */ i.jsx("span", { className: xe(_s, "bg-emerald-500/10 text-emerald-600"), children: "Played through" })
  ] });
}
function wk({ ev: t, open: r, onToggle: o }) {
  const l = Ue(vm(t));
  return /* @__PURE__ */ i.jsxs("div", { className: "border-t border-border/50 first:border-t-0", children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        onClick: o,
        "aria-expanded": r,
        className: "flex w-full flex-wrap items-center gap-x-2 gap-y-1 px-2 py-2 text-left transition-colors hover:bg-muted/30",
        children: [
          /* @__PURE__ */ i.jsx("span", { className: xe("h-2 w-2 flex-shrink-0 rounded-full", l.swatch), "aria-hidden": !0 }),
          /* @__PURE__ */ i.jsx("span", { className: "w-16 flex-shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground", children: xk(t.week) }),
          /* @__PURE__ */ i.jsx("span", { className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground", children: t.injury }),
          /* @__PURE__ */ i.jsx(vk, { ev: t })
        ]
      }
    ),
    r && /* @__PURE__ */ i.jsxs("div", { className: "px-2 pb-2.5 pl-7 text-[12px] leading-relaxed text-muted-foreground", children: [
      Ir(t),
      t.status && /* @__PURE__ */ i.jsxs("span", { className: "mt-1 block text-[11px]", children: [
        "Status: ",
        t.status
      ] })
    ] })
  ] });
}
function bk({ season: t, events: r, prefix: o, openKeys: l, onToggle: c }) {
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("div", { className: "px-2 pb-1 pt-2 text-[11px] font-black tabular-nums text-foreground", children: t }),
    /* @__PURE__ */ i.jsx("div", { className: "overflow-hidden rounded-lg border border-border/60", children: r.map((u, f) => {
      const h = `${o}-${t}-${f}`;
      return /* @__PURE__ */ i.jsx(wk, { ev: u, open: l.has(h), onToggle: () => c(h) }, h);
    }) })
  ] });
}
function kk({ college: t, openKeys: r, onToggle: o }) {
  const l = (u) => u === "high" ? "major" : u === "medium" ? "moderate" : "minor", c = (u) => u === "high" ? "Major" : u === "medium" ? "Moderate" : "Minor";
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-1.5 px-2 pb-1 pt-2", children: /* @__PURE__ */ i.jsx("span", { className: "text-[11px] font-black uppercase tracking-wider text-muted-foreground", children: "College & Pre-NFL" }) }),
    /* @__PURE__ */ i.jsx("div", { className: "overflow-hidden rounded-lg border border-border/60", children: t.map((u, f) => {
      const h = `col-${f}`, m = r.has(h), y = Ue(l(u.significance));
      return /* @__PURE__ */ i.jsxs("div", { className: "border-t border-border/50 first:border-t-0", children: [
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            onClick: () => o(h),
            "aria-expanded": m,
            className: "flex w-full flex-wrap items-center gap-x-2 gap-y-1 px-2 py-2 text-left transition-colors hover:bg-muted/30",
            children: [
              /* @__PURE__ */ i.jsx("span", { className: xe("h-2 w-2 flex-shrink-0 rounded-full", y.swatch), "aria-hidden": !0 }),
              /* @__PURE__ */ i.jsx("span", { className: "w-16 flex-shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground", children: u.year ?? "—" }),
              /* @__PURE__ */ i.jsx("span", { className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground", children: u.description || "Pre-NFL injury" }),
              /* @__PURE__ */ i.jsx("span", { className: xe(_s, y.pillBg, y.pillText, "ml-auto"), children: c(u.significance) })
            ]
          }
        ),
        m && /* @__PURE__ */ i.jsx("div", { className: "px-2 pb-2.5 pl-7 text-[12px] leading-relaxed text-muted-foreground", children: u.description || yk(u) })
      ] }, h);
    }) })
  ] });
}
const jk = [
  { key: "all", label: "All" },
  { key: "missed", label: "Missed Games" },
  { key: "major", label: "Major+" },
  { key: "played", label: "Played Through" },
  { key: "last3", label: "Last 3 Seasons" }
];
function Nk({ injury: t }) {
  const [r, o] = b.useState(!1), [l, c] = b.useState("all"), [u, f] = b.useState(/* @__PURE__ */ new Set()), h = (k) => f((j) => {
    const A = new Set(j);
    return A.has(k) ? A.delete(k) : A.add(k), A;
  }), m = t.nfl.length + t.college.length, y = b.useMemo(() => t.nfl.map(_c), [t.nfl]), g = b.useMemo(() => y.reduce((k, j) => Math.max(k, j.season), 0), [y]), v = b.useMemo(() => y.filter((k) => {
    switch (l) {
      case "missed":
        return (k.gamesMissed ?? 0) > 0;
      case "major": {
        const j = wt(k);
        return j === "major" || j === "season-ending";
      }
      case "played":
        return (k.gamesMissed ?? 0) === 0;
      case "last3":
        return k.season >= g - 2;
      default:
        return !0;
    }
  }), [y, l, g]), w = b.useMemo(() => {
    const k = {};
    for (const j of v) (k[j.season] ??= []).push(j);
    return Object.entries(k).map(([j, A]) => [Number(j), A.slice().sort((_, C) => (C.week ?? -1) - (_.week ?? -1))]).sort((j, A) => A[0] - j[0]);
  }, [v]), S = l === "all" && t.college.length > 0, P = w.length === 0 && !S;
  return /* @__PURE__ */ i.jsxs(qn, { className: "p-5", children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        onClick: () => o((k) => !k),
        "aria-expanded": r,
        className: "flex w-full items-center gap-1.5 text-left",
        children: [
          /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-bold", style: { color: "var(--sc-blue, #0b3a7a)" }, children: "Full Injury Log" }),
          /* @__PURE__ */ i.jsxs("span", { className: "text-[11px] font-semibold text-muted-foreground tabular-nums", children: [
            "(",
            m,
            ")"
          ] }),
          /* @__PURE__ */ i.jsx(Qh, { className: xe("ml-auto w-4 h-4 text-muted-foreground transition-transform", r && "rotate-180") })
        ]
      }
    ),
    r && /* @__PURE__ */ i.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ i.jsx("div", { className: "mb-2 flex flex-wrap gap-1.5", children: jk.map((k) => /* @__PURE__ */ i.jsx(
        "button",
        {
          type: "button",
          onClick: () => c(k.key),
          className: xe(
            "rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors",
            l === k.key ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37]" : "border-border text-muted-foreground hover:text-foreground"
          ),
          children: k.label
        },
        k.key
      )) }),
      P ? /* @__PURE__ */ i.jsx("p", { className: "px-2 py-3 text-[12px] text-muted-foreground", children: "No injuries match this filter." }) : /* @__PURE__ */ i.jsxs("div", { className: "space-y-2", children: [
        w.map(([k, j]) => /* @__PURE__ */ i.jsx(bk, { season: k, events: j, prefix: "nfl", openKeys: u, onToggle: h }, k)),
        S && /* @__PURE__ */ i.jsx(kk, { college: t.college, openKeys: u, onToggle: h })
      ] })
    ] })
  ] });
}
function Sk({ injury: t, loading: r, error: o, playerName: l, knownSeasons: c = [], weeklyPlayed: u }) {
  if (r && !t) return /* @__PURE__ */ i.jsx(qn, { className: "p-6", children: /* @__PURE__ */ i.jsx(xb, { n: 6 }) });
  if (o)
    return /* @__PURE__ */ i.jsx(Np, { icon: Ql, title: "Injury history unavailable", body: "We couldn't load injury history right now. Please try again later." });
  if (!t || !t.nfl.length && !t.college.length)
    return /* @__PURE__ */ i.jsx(Np, { icon: Ql, title: "No injury history found", body: `No documented NFL or college injuries for ${l}.` });
  const f = kb(t), h = t.score != null ? Sb(t.score) : null, m = t.nfl.length > 0 ? Nb(t) : [], y = t.nfl.length > 0 ? jb(t.nfl) : "", g = [
    { label: "Injuries Logged", value: `${f.injuriesLogged}` },
    { label: "Games Missed", value: `${f.totalMissed}` },
    { label: "Affected Regions", value: `${f.affectedRegions}` },
    ...f.lastSeason != null ? [{ label: "Last Injury", value: `${f.lastSeason}` }] : []
  ], v = `${f.injuriesLogged} logged ${f.injuriesLogged === 1 ? "injury" : "injuries"}` + (f.affectedRegions > 0 ? ` across ${f.affectedRegions} affected ${f.affectedRegions === 1 ? "region" : "regions"}` : "") + (f.totalMissed > 0 ? `, with ${f.totalMissed} total ${f.totalMissed === 1 ? "game" : "games"} missed.` : ", with no games missed to date."), w = f.primaryDriver ? f.primaryDriver.missed > 0 ? `${f.primaryDriver.label} caused the most missed time (${f.primaryDriver.missed} game${f.primaryDriver.missed === 1 ? "" : "s"}).` : `${f.primaryDriver.label} is the most significant logged injury.` : null;
  return /* @__PURE__ */ i.jsxs("div", { className: "space-y-5", children: [
    t.grade && /* @__PURE__ */ i.jsxs(qn, { className: "p-4", children: [
      /* @__PURE__ */ i.jsx(Sp, { title: "Injury Risk Profile" }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex gap-3.5", children: [
        /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center rounded-2xl border-2 w-[68px] h-[68px] flex-shrink-0",
            style: { borderColor: t.gradeColor ?? void 0 },
            children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-2xl font-black leading-none", style: { color: t.gradeColor ?? void 0 }, "data-testid": "injury-grade", children: t.grade }),
              t.score != null && /* @__PURE__ */ i.jsxs("span", { className: "text-[11px] font-bold text-muted-foreground mt-0.5 tabular-nums", children: [
                t.score,
                "/100"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ i.jsx("h3", { className: xe("text-base font-black leading-tight", h?.className ?? "text-foreground"), children: h ? `${h.word} Injury Risk` : "Injury Risk" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-[13px] text-muted-foreground mt-0.5 leading-relaxed", children: v })
        ] })
      ] }),
      g.length > 0 && /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3", children: g.map((S) => /* @__PURE__ */ i.jsx(mk, { label: S.label, value: S.value }, S.label)) }),
      w && /* @__PURE__ */ i.jsxs("div", { className: "mt-2 rounded-lg border border-border bg-muted/30 px-3 py-2", children: [
        /* @__PURE__ */ i.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Primary Risk Driver" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-[13px] text-foreground mt-0.5 leading-snug", children: w })
      ] })
    ] }),
    t.nfl.length > 0 && /* @__PURE__ */ i.jsx(Vb, { injuries: t.nfl, knownSeasons: c, weeklyPlayed: u, insight: y }),
    (t.nfl.length > 0 || m.length > 0) && /* @__PURE__ */ i.jsxs("div", { className: "grid gap-5 md:grid-cols-2 md:items-start", children: [
      t.nfl.length > 0 && /* @__PURE__ */ i.jsx(fk, { injuries: t.nfl }),
      m.length > 0 && /* @__PURE__ */ i.jsxs(qn, { className: "p-5", children: [
        /* @__PURE__ */ i.jsx(Sp, { title: "Risk Breakdown" }),
        /* @__PURE__ */ i.jsx("div", { className: "space-y-3.5", children: m.map((S) => /* @__PURE__ */ i.jsx(gk, { label: S.label, level: S.level }, S.label)) }),
        /* @__PURE__ */ i.jsx("p", { className: "text-[11px] text-muted-foreground mt-4 leading-relaxed", children: "Derived from this player's documented injury log — recency, recurrence, games lost, and how concentrated injuries are in one area." })
      ] })
    ] }),
    (t.nfl.length > 0 || t.college.length > 0) && /* @__PURE__ */ i.jsx(Nk, { injury: t })
  ] });
}
const _k = "";
async function Ck(t, r) {
  const o = await fetch(
    `${_k}/api/players/${encodeURIComponent(t)}/injuries?name=${encodeURIComponent(r)}`,
    { credentials: "include" }
  );
  return o.ok ? (await o.json())?.injuries ?? null : null;
}
const mi = b.forwardRef(
  ({ className: t, type: r, ...o }, l) => /* @__PURE__ */ i.jsx(
    "input",
    {
      type: r,
      className: vt(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        t
      ),
      ref: l,
      ...o
    }
  )
);
mi.displayName = "Input";
const Pp = ["QB", "RB", "WR", "TE"];
function Pk({ playerId: t, position: r, team: o }) {
  const [l, c] = b.useState(!1), u = o ? /* @__PURE__ */ i.jsx(
    "img",
    {
      src: `https://sleepercdn.com/images/team_logos/nfl/${o.toLowerCase()}.png`,
      alt: "",
      loading: "lazy",
      className: "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 object-contain",
      onError: (f) => {
        f.currentTarget.style.display = "none";
      }
    }
  ) : null;
  return l || !t ? /* @__PURE__ */ i.jsxs("div", { className: "relative flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center overflow-visible", children: [
    /* @__PURE__ */ i.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: r || "?" }),
    u
  ] }) : /* @__PURE__ */ i.jsxs("div", { className: "relative flex-shrink-0 w-8 h-8", children: [
    /* @__PURE__ */ i.jsx(
      "img",
      {
        src: `https://sleepercdn.com/content/nfl/players/thumb/${t}.jpg`,
        alt: "",
        loading: "lazy",
        className: "w-full h-full rounded-md bg-muted object-cover object-top",
        onError: () => c(!0)
      }
    ),
    u
  ] });
}
const Ek = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def"
};
function Tl({ scoringControl: t } = {}) {
  const [r, o] = b.useState(""), [l, c] = b.useState(!1), [u, f] = b.useState(-1), h = b.useRef(null), m = b.useRef(null), y = b.useRef(null), [, g] = ic(), { data: v } = Mt({
    queryKey: ["/api/players"]
  }), { data: w } = Mt({
    queryKey: ["/api/indexed-players"]
  }), S = b.useMemo(() => {
    if (!w?.byTeam) return [];
    const _ = [];
    for (const C of Object.values(w.byTeam))
      for (const F of Object.values(C))
        _.push(...F);
    return _;
  }, [w]), P = b.useMemo(() => {
    const _ = {};
    for (const C of Pp)
      _[C] = S.filter((F) => F.position === C).length;
    return _;
  }, [S]), k = b.useMemo(() => {
    if (!r.trim()) return [];
    const _ = r.toLowerCase().trim(), C = S.filter((H) => H.name.toLowerCase().includes(_) || H.team.toLowerCase().includes(_)).slice(0, 8);
    if (C.length >= 4) return C;
    const F = new Set(C.map((H) => H.slug)), U = (v || []).filter(
      (H) => !F.has(H.slug) && (H.name.toLowerCase().includes(_) || H.team.toLowerCase().includes(_))
    ).slice(0, 8 - C.length);
    return [...C, ...U];
  }, [S, v, r]), j = w?.slugs?.length || 0;
  b.useEffect(() => {
    function _(C) {
      h.current && !h.current.contains(C.target) && c(!1);
    }
    return document.addEventListener("mousedown", _), () => document.removeEventListener("mousedown", _);
  }, []), b.useEffect(() => {
    f(-1);
  }, [r]), b.useEffect(() => {
    if (u >= 0 && y.current) {
      const _ = y.current.children[u];
      _ && _.scrollIntoView({ block: "nearest" });
    }
  }, [u]), b.useEffect(() => {
    function _(C) {
      if (C.key === "/" && !C.ctrlKey && !C.metaKey) {
        const F = C.target?.tagName;
        F !== "INPUT" && F !== "TEXTAREA" && (C.preventDefault(), m.current?.focus());
      }
    }
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, []);
  const A = b.useCallback(
    (_) => {
      if (!(!l || k.length === 0))
        if (_.key === "ArrowDown")
          _.preventDefault(), f((C) => C < k.length - 1 ? C + 1 : 0);
        else if (_.key === "ArrowUp")
          _.preventDefault(), f((C) => C > 0 ? C - 1 : k.length - 1);
        else if (_.key === "Enter" && u >= 0) {
          _.preventDefault();
          const C = k[u];
          c(!1), g(`/nfl/players/${C.slug}/`);
        } else _.key === "Escape" && c(!1);
    },
    [l, k, u, g]
  );
  return /* @__PURE__ */ i.jsx("div", { className: "sc-header", "data-testid": "hero-section", children: /* @__PURE__ */ i.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar", ref: h, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__top", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__search relative group", children: [
        /* @__PURE__ */ i.jsx(Er, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sc-search__icon z-10" }),
        /* @__PURE__ */ i.jsx(
          mi,
          {
            ref: m,
            type: "search",
            placeholder: "Search any player, team, or position...",
            value: r,
            onChange: (_) => {
              o(_.target.value), c(!0);
            },
            onFocus: () => {
              r.trim() && c(!0);
            },
            onKeyDown: A,
            className: "sc-search",
            autoComplete: "off",
            role: "combobox",
            "aria-expanded": l && k.length > 0,
            "aria-controls": "autocomplete-list",
            "aria-activedescendant": u >= 0 ? `autocomplete-item-${u}` : void 0,
            "data-testid": "input-player-search"
          }
        ),
        /* @__PURE__ */ i.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5", children: /* @__PURE__ */ i.jsxs("kbd", { className: "sc-search__kbd", children: [
          /* @__PURE__ */ i.jsx(Kh, { className: "w-2.5 h-2.5" }),
          "/"
        ] }) }),
        l && r.trim() && k.length > 0 && /* @__PURE__ */ i.jsx(
          "div",
          {
            id: "autocomplete-list",
            ref: y,
            role: "listbox",
            className: "absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto",
            "data-testid": "autocomplete-dropdown",
            children: k.map((_, C) => /* @__PURE__ */ i.jsx(Zn, { href: `/nfl/players/${_.slug}/`, children: /* @__PURE__ */ i.jsxs(
              "div",
              {
                id: `autocomplete-item-${C}`,
                role: "option",
                "aria-selected": C === u,
                className: `flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${C === u ? "bg-muted" : "hover:bg-muted/50"}`,
                onMouseEnter: () => f(C),
                onClick: () => c(!1),
                "data-testid": `autocomplete-item-${_.slug}`,
                children: [
                  /* @__PURE__ */ i.jsx(Pk, { playerId: _.id, position: _.position || "", team: _.team || "" }),
                  /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ i.jsx("span", { className: "font-medium text-sm text-foreground truncate block", children: _.name }),
                    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                      /* @__PURE__ */ i.jsx("span", { className: Ek[_.position || ""] || "", children: _.position }),
                      /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: _.team })
                    ] })
                  ] }),
                  /* @__PURE__ */ i.jsx(wc, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
                ]
              }
            ) }, _.id))
          }
        )
      ] }),
      j > 0 && /* @__PURE__ */ i.jsxs("div", { className: "sc-stat-card", "data-testid": "badge-player-count", children: [
        /* @__PURE__ */ i.jsx(xc, { className: "w-4 h-4 sc-header__gold-icon" }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("p", { className: "sc-stat-card__number", children: j }),
          /* @__PURE__ */ i.jsx("p", { className: "sc-stat-card__label", children: "Fantasy Starters" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__bottom", children: [
      /* @__PURE__ */ i.jsx("div", { className: "sc-controlbar__filters", children: Pp.map((_) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          type: "button",
          className: "sc-filter-pill",
          onClick: () => g(`/nfl/players?pos=${_}`),
          "data-testid": `button-filter-${_}`,
          children: [
            _,
            P[_] ? /* @__PURE__ */ i.jsx("span", { className: "sc-filter-pill__count", children: P[_] }) : null
          ]
        },
        _
      )) }),
      /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__bottom-right", children: [
        /* @__PURE__ */ i.jsx("div", { className: "sc-segment", role: "group", "aria-label": "Conference filter", "data-testid": "tabs-conference", children: ["AFC", "NFC"].map((_) => /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "sc-segment__btn",
            onClick: () => g(`/nfl/players?conf=${_}`),
            "data-testid": `tab-${_.toLowerCase()}`,
            children: _
          },
          _
        )) }),
        t
      ] })
    ] })
  ] }) }) });
}
function Rk(t) {
  if (!t) return "";
  const r = parseInt(t, 10);
  if (isNaN(r) || r <= 0) return t;
  const o = Math.floor(r / 12), l = r % 12;
  return `${o}'${l}"`;
}
const Tk = [
  { key: "overview", label: "Overview", icon: xc },
  { key: "gamelog", label: "Game Log", icon: f1 },
  { key: "advanced", label: "Advanced Stats", icon: qh },
  { key: "rankings", label: "Rankings & Value", icon: bc },
  { key: "injury", label: "Injury & Health", icon: Ql }
];
function Ec(t) {
  return `https://sleepercdn.com/content/nfl/players/thumb/${t}.jpg`;
}
function Ak(t) {
  const r = t.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : "11,58,122";
}
function Lk({ playerId: t, name: r, team: o }) {
  const [l, c] = b.useState(0), u = l === 0 ? `https://sleepercdn.com/content/nfl/players/${t}.jpg` : Ec(t);
  return /* @__PURE__ */ i.jsx("div", { className: "player-photo-card", "data-testid": "img-headshot", children: l < 2 ? /* @__PURE__ */ i.jsx(
    "img",
    {
      src: u,
      alt: `${r} headshot`,
      className: "player-photo-card__img",
      onError: () => c((f) => f === 0 ? 1 : 2)
    }
  ) : /* @__PURE__ */ i.jsx("div", { className: "player-photo-card__fallback", "data-testid": "img-headshot-fallback", children: /* @__PURE__ */ i.jsx(kc, { className: "w-16 h-16 text-slate-400" }) }) });
}
function Ok({ playerId: t, name: r, teamAbbr: o }) {
  const [l, c] = b.useState(!1), u = Ec(t), f = jc[o] || "#6B7280";
  return l ? /* @__PURE__ */ i.jsx(
    "div",
    {
      className: "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800",
      style: { border: `2px solid ${f}` },
      "data-testid": `img-neighbor-${t}`,
      children: /* @__PURE__ */ i.jsx(kc, { className: "w-4 h-4 text-slate-400 dark:text-slate-500" })
    }
  ) : /* @__PURE__ */ i.jsx(
    "img",
    {
      src: u,
      alt: r,
      className: "flex-shrink-0 w-9 h-9 rounded-full object-cover bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800",
      style: { border: `2px solid ${f}` },
      onError: () => c(!0),
      "data-testid": `img-neighbor-${t}`
    }
  );
}
function Xl({ title: t, subtitle: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-section-header", children: [
    /* @__PURE__ */ i.jsx("p", { className: "sc-section-header__title", children: t }),
    /* @__PURE__ */ i.jsx("div", { className: "sc-section-header__bar" }),
    r && /* @__PURE__ */ i.jsx("p", { className: "sc-section-header__subtitle", children: r })
  ] });
}
function Mk(t) {
  return { bust: 36, hasTier3: !0 };
}
function Ik(t, r) {
  const o = t;
  return (o.off_snp ?? 0) > 0 ? !0 : r === "QB" ? (o.pass_att ?? 0) > 0 || (o.rush_att ?? 0) > 0 : r === "K" ? (o.fga ?? 0) > 0 || (o.xpa ?? 0) > 0 : (o.rec_tgt ?? 0) > 0 || (o.rec ?? 0) > 0 || (o.rush_att ?? 0) > 0 || (o.pass_att ?? 0) > 0;
}
function Rn(t, r) {
  return k1(t.stats, r);
}
function wm(t, r = null, o = "ppr") {
  if (t.length === 0) return null;
  const l = t.filter((z) => z.game_status === "active"), c = l.length > 0 ? l : t.filter((z) => Ik(z.stats, r)), u = c.length, f = c.reduce((z, Z) => z + Rn(Z, o), 0), h = u > 0 ? f / u : 0, m = c.length > 0 ? c.reduce((z, Z) => Rn(Z, o) > Rn(z, o) ? Z : z, c[0]) : t[0], y = c.slice(-4), g = y.reduce((z, Z) => z + Rn(Z, o), 0), v = y.length > 0 ? g / y.length : 0, { bust: w, hasTier3: S } = Mk(), P = c.filter((z) => z.pos_rank != null), k = P.filter((z) => z.pos_rank >= 1 && z.pos_rank <= 12).length, j = 24, A = P.filter((z) => z.pos_rank >= 13 && z.pos_rank <= j).length, _ = S ? P.filter((z) => z.pos_rank >= 25 && z.pos_rank <= w).length : 0, C = P.filter((z) => z.pos_rank > w).length, F = u > 0 ? k / u * 100 : 0, U = u > 0 ? A / u * 100 : 0, H = u > 0 ? _ / u * 100 : 0, Y = u > 0 ? C / u * 100 : 0, X = c.map((z) => Rn(z, o)), se = X.length > 0 ? X.reduce((z, Z) => z + Z, 0) / X.length : 0, ne = X.length > 1 ? Math.sqrt(X.reduce((z, Z) => z + (Z - se) ** 2, 0) / (X.length - 1)) : 0, ie = c.filter((z) => Rn(z, o) === 0).length, Q = u > 0 ? ie / u * 100 : 0;
  return { gamesPlayed: u, totalPts: f, ppg: h, bestWeek: m, last4Ppg: v, pos1Pct: F, pos2Pct: U, pos3Pct: H, bustPct: Y, pos1Games: k, pos2Games: A, pos3Games: _, bustGames: C, volatility: ne, gooseEggPct: Q };
}
function $k(t, r) {
  if (!t) return null;
  const o = (r || "").toUpperCase(), l = "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400", c = "bg-green-500/15 text-green-600 dark:text-green-400", u = "bg-blue-500/15 text-blue-600 dark:text-blue-400", f = "bg-slate-400/15 text-slate-500 dark:text-slate-300", h = "bg-amber-600/15 text-amber-700 dark:text-amber-500", m = "bg-red-500/15 text-red-500 dark:text-red-400";
  return o === "QB" || o === "TE" ? t <= 5 ? { label: "Elite", className: l } : t <= 12 ? { label: "Starter", className: c } : t <= 20 ? { label: "Streaming", className: u } : t <= 32 ? { label: "Depth", className: f } : { label: "Poor", className: m } : t <= 12 ? { label: "Elite", className: l } : t <= 24 ? { label: "Strong Starter", className: c } : t <= 36 ? { label: "Flex", className: u } : t <= 60 ? { label: "Depth", className: f } : t <= 90 ? { label: "Bench", className: h } : { label: "Poor", className: m };
}
function Fk(t) {
  return t ? t <= 8 ? "text-red-500 dark:text-red-400" : t >= 25 ? "text-green-600 dark:text-green-400" : "text-muted-foreground" : "text-muted-foreground";
}
function Dk(t, r, o) {
  if (!r || r.gamesPlayed === 0) return [];
  const l = t.position || "", c = t.name || "This player", u = t.team || "", f = t.seasonTeam || v1(t.gameLog || [], u) || u, h = f, m = Kl[h] || h, y = u ? Kl[u] || u : "", g = !!(f && u && f !== u && u !== "FA"), v = t.season || 2025, w = r.ppg.toFixed(1), S = r.gamesPlayed, P = r.pos1Pct, k = P.toFixed(0), j = r.pos1Pct + r.pos2Pct, A = r.bustPct.toFixed(0), _ = r.ppg > 0 ? (r.last4Ppg - r.ppg) / r.ppg * 100 : 0, C = _ > 8 ? "trending upward" : _ < -12 ? "cooling late in the year" : "relatively steady", F = j >= 60 ? "a reliable weekly starter" : j >= 35 ? "a flex-range contributor" : "a situational option", U = r.ppg > 0 ? r.volatility / r.ppg : 2, H = U < 0.4 ? "low week-to-week variance" : U < 0.7 ? "moderate week-to-week variance" : "high week-to-week variance", Y = t.careerProfile, X = Y ? Y.seasons : 1, se = [];
  se.push(`${c} finished the ${v} season as ${F} at the ${l} position`), m && se.push(`playing for the ${m}`), se.push(`averaging ${w} fantasy points per game across ${S} games`), t.seasonRank && se.push(`and finishing as the ${l}${t.seasonRank} overall`);
  const ne = se.join(", ") + ".";
  let ie = "";
  if (l === "QB")
    P >= 50 ? ie = `He finished inside the top-12 at quarterback in ${k}% of his starts, showing strong weekly reliability with ${H}. Production was ${C} heading into the final stretch of the season. That ceiling rate places him firmly in QB1 territory for redraft formats heading into 2026.` : P >= 25 ? ie = `He landed in the top-12 at quarterback ${k}% of the time, with ${H} in weekly output. Production was ${C} late in the season. That finish rate puts him in the QB2 range for most formats, with upside in favorable matchups.` : P > 0 ? ie = `He reached the top-12 at quarterback in just ${k}% of starts, with ${H} around a below-starter scoring baseline. Production was ${C} heading into the final stretch. At this volume and finish rate, he projects as a streaming option rather than a reliable weekly starter for 2026.` : ie = `He did not finish inside the top-12 at quarterback in any of his ${S} active games this season, with ${H} around a below-starter scoring level. Production was ${C} late in the season. That output places him outside reliable starter range heading into 2026 planning.`;
  else if (l === "RB") {
    const Z = j >= 60 ? "24" : "36";
    j >= 40 ? ie = `His scoring profile showed ${H}, finishing as a top-${Z} back ${k}% of the time. Production was ${C} late in the season. The bust rate of ${A}% is an important floor signal for lineup decisions, particularly in PPR formats where receiving work adds a secondary scoring lane.` : ie = `He finished as a top-${Z} back in just ${k}% of games, with ${H} around a below-starter workload. Production was ${C} late in the season. A bust rate of ${A}% reflects the limited upside weeks and signals a depth or handcuff profile rather than a consistent starter.`;
  } else l === "WR" ? P >= 30 ? ie = `His weekly profile showed ${H}, converting into a top-24 receiver finish ${k}% of the time. Scoring was ${C} over the second half of the schedule. Both ceiling and floor are tied closely to target volume and red-zone looks, making matchup awareness more impactful than for run-first options.` : ie = `He reached a top-24 receiver finish in just ${k}% of games, with ${H} around a limited target role. Scoring was ${C} over the second half of the schedule. At this finish rate, he fits a depth or matchup-play profile rather than a reliable flex option.` : l === "TE" ? P >= 30 ? ie = `His weekly output showed ${H}, landing inside the top-12 at tight end ${k}% of the time. Scoring was ${C} as the season progressed. At tight end, where positional depth is thin, consistent target volume and red-zone involvement carry outsized value.` : ie = `He finished inside the top-12 at tight end in just ${k}% of games, with ${H} around a limited role. Scoring was ${C} as the season progressed. That finish rate reflects a depth profile rather than a reliable starting tight end option.` : ie = `His weekly output showed ${H}, finishing in a startable range ${k}% of the time. Production was ${C} late in the season.`;
  let Q = "";
  if (Y && X >= 2) {
    const Z = Y.durabilityPct.toFixed(0), ge = Y.ppg.toFixed(1);
    Q = `Across ${Y.seasons} seasons, ${c} has averaged ${ge} points per game with a durability rate of ${Z}%, appearing in ${Y.gamesPlayed} of ${Y.maxGames} possible games. That track record provides helpful context for evaluating whether the ${v} production reflects a true baseline or a short-term variance window.`;
  }
  const z = g ? `He is now with the ${y} after spending the ${v} season with the ${m}.` : "";
  return [ne, z, ie, Q].filter(Boolean);
}
function Bk(t, r) {
  if (!r || r.gamesPlayed === 0) return { strengths: [], risks: [] };
  const o = t.position || "", l = r.pos1Pct + r.pos2Pct, c = r.ppg > 0 ? r.volatility / r.ppg : 2, u = r.ppg > 0 ? (r.last4Ppg - r.ppg) / r.ppg * 100 : 0, f = t.careerProfile, h = [], m = [];
  return l >= 60 && h.push(`Finishes in startable range ${l.toFixed(0)}% of weeks`), r.pos1Pct >= 40 && h.push(`Top-tier finish rate of ${r.pos1Pct.toFixed(0)}% creates ceiling upside`), r.bustPct < 20 && h.push("Reliable weekly floor with minimal bust risk"), c < 0.5 && h.push("Consistent scoring with low week-to-week variance"), f && f.durabilityPct >= 85 && h.push(`Strong availability, appearing in ${f.durabilityPct.toFixed(0)}% of possible games`), u > 8 && h.push("Trending upward heading into the offseason"), o === "QB" && r.ppg >= 22 && h.push("Dual-threat ability protects scoring floor each week"), o === "RB" && (t.careerSeasonStats?.[0]?.receptions ?? 0) >= 50 && h.push("Receiving role adds PPR value on top of rushing work"), h.length < 3 && h.push(`Established ${o} role with meaningful snap share`), c >= 0.7 && m.push("High week-to-week variance makes lineup decisions difficult"), r.bustPct >= 30 && m.push(`Bust rate of ${r.bustPct.toFixed(0)}% is a real concern for floor-sensitive formats`), u < -12 && m.push("Late-season scoring decline raises questions about role consistency"), r.pos1Pct < 25 && m.push("Limited ceiling weeks reduce upside in tournaments and daily formats"), f && f.durabilityPct < 80 && m.push(`Availability concerns, playing just ${f.durabilityPct.toFixed(0)}% of games in career`), (o === "WR" || o === "TE") && m.push("Production tied to target volume and quarterback efficiency"), m.length < 3 && m.push("Scheme or usage changes could shift value meaningfully"), { strengths: h.slice(0, 5), risks: m.slice(0, 5) };
}
function zk({ player: t, entries: r, format: o = "ppr" }) {
  const l = wm(r, t.position, o), c = t.fantasyOutlook2026?.body ? t.fantasyOutlook2026 : null, u = c ? c.body.split(/\n\n+/).map((w) => w.trim()).filter(Boolean) : Dk(t, l), { strengths: f, risks: h } = Bk(t, l), m = t.bio ?? null;
  (m?.snapshot_bullets ?? []).filter((w) => !/^Drafted\b/.test(w));
  const y = m?.career_context_tiles?.find((w) => w.title === "Ceiling driver"), g = m?.career_context_tiles?.find((w) => w.title === "Floor driver"), v = m?.style ? [
    {
      id: "on-field",
      label: "On-field style",
      icon: Xh,
      iconColor: "#6366f1",
      text: m.style.how_he_wins,
      tags: m.style.how_he_wins_tags,
      tagClass: "sc-bio__tag",
      testId: "bio-how-he-wins"
    },
    {
      id: "fantasy-translation",
      label: "Fantasy translation",
      icon: bc,
      iconColor: "#F5C01A",
      text: m.style.fantasy_translation,
      tags: m.style.fantasy_translation_tags,
      tagClass: "sc-bio__tag sc-bio__tag--gold",
      testId: "bio-fantasy-impact"
    },
    {
      id: "best-case",
      label: "Best-case weekly outcome",
      icon: wc,
      iconColor: "#22c55e",
      text: m.style.best_case ?? (y ? y.text : null),
      tags: [],
      tagClass: "sc-bio__tag",
      testId: "bio-best-case"
    },
    {
      id: "floor-driver",
      label: "Floor driver",
      icon: d1,
      iconColor: "#64748b",
      text: m.style.floor_driver ?? (g ? g.text : null),
      tags: [],
      tagClass: "sc-bio__tag",
      testId: "bio-floor-driver"
    }
  ].filter((w) => w.text) : [];
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-overview", style: { display: "flex", flexDirection: "column", gap: "32px" }, children: [
    u.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, children: [
      /* @__PURE__ */ i.jsx(Xl, { title: "2026 Fantasy Outlook" }),
      c?.headline && /* @__PURE__ */ i.jsx("p", { style: { fontSize: "15px", fontWeight: 600, lineHeight: "1.6", color: "var(--sc-heading, #1e293b)", marginBottom: "12px" }, children: c.headline }),
      u.map((w, S) => /* @__PURE__ */ i.jsx("p", { style: { fontSize: "14px", lineHeight: "1.75", color: "var(--sc-body, #475569)", marginBottom: S < u.length - 1 ? "12px" : 0 }, children: w }, S))
    ] }),
    m && v.length > 0 ? /* @__PURE__ */ i.jsx("div", { className: "sc-bio", children: v.length > 0 && /* @__PURE__ */ i.jsxs("section", { className: "sc-bio__section", "data-testid": "bio-style", children: [
      /* @__PURE__ */ i.jsx("div", { className: "sc-bio__section-header", children: /* @__PURE__ */ i.jsx("h3", { children: "Play Style and Fantasy Translation" }) }),
      /* @__PURE__ */ i.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }, children: v.map((w) => {
        const S = w.icon;
        return /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "sc-bio__style-card",
            style: { display: "flex", flexDirection: "column", gap: "10px" },
            "data-testid": w.testId,
            children: [
              /* @__PURE__ */ i.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "7px" }, children: [
                /* @__PURE__ */ i.jsx(S, { className: "w-3.5 h-3.5", style: { color: w.iconColor, flexShrink: 0 } }),
                /* @__PURE__ */ i.jsx("div", { className: "sc-bio__style-card-label", style: { marginBottom: 0 }, children: w.label })
              ] }),
              /* @__PURE__ */ i.jsx("p", { className: "sc-bio__style-card-text", children: w.text }),
              w.tags.length > 0 && /* @__PURE__ */ i.jsx("div", { className: "sc-bio__tags", children: w.tags.map((P, k) => /* @__PURE__ */ i.jsx("span", { className: w.tagClass, "data-testid": `bio-tag-${w.id}-${k}`, children: P }, k)) })
            ]
          },
          w.id
        );
      }) })
    ] }) }) : null,
    (f.length > 0 || h.length > 0) && /* @__PURE__ */ i.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, "data-testid": "section-strengths-risks", children: [
      /* @__PURE__ */ i.jsx(Xl, { title: "Fantasy Strengths and Risk Factors", subtitle: "Key production drivers and downside factors heading into 2026." }),
      /* @__PURE__ */ i.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("p", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#16a34a", marginBottom: "10px" }, children: "Strengths" }),
          /* @__PURE__ */ i.jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }, children: f.map((w, S) => /* @__PURE__ */ i.jsxs("li", { style: { display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--foreground)", lineHeight: "1.5" }, children: [
            /* @__PURE__ */ i.jsx("span", { style: { color: "#16a34a", fontWeight: 700, marginTop: "1px", flexShrink: 0 }, children: "+" }),
            w
          ] }, S)) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("p", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#ef4444", marginBottom: "10px" }, children: "Risk Factors" }),
          /* @__PURE__ */ i.jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }, children: h.map((w, S) => /* @__PURE__ */ i.jsxs("li", { style: { display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--foreground)", lineHeight: "1.5" }, children: [
            /* @__PURE__ */ i.jsx("span", { style: { color: "#ef4444", fontWeight: 700, marginTop: "1px", flexShrink: 0 }, children: "-" }),
            w
          ] }, S)) })
        ] })
      ] })
    ] })
  ] });
}
function Uk(t) {
  const r = t || "FLEX";
  return t === "QB" || t === "TE" ? { top: `${r}1`, mid: `${r}2`, flex: `${r}3`, bust: "Bust" } : { top: `${r}1`, mid: `${r}2`, flex: `${r}3`, bust: "Bust" };
}
function Wk(t) {
  return !t || t.gamesPlayed === 0 ? { top: 0, mid: 0, flex: 0, bust: 0 } : {
    top: t.pos1Pct,
    mid: t.pos2Pct,
    flex: t.pos3Pct,
    bust: t.bustPct
  };
}
function Hk({ pcts: t, labels: r }) {
  const o = Math.max(t.top + t.mid + t.flex + t.bust, 1e-3), l = [
    { key: "top", cls: "ov2-stack-seg--top", swatch: "linear-gradient(90deg, #F5C01A, #FFD166)", label: r.top, pct: t.top },
    { key: "mid", cls: "ov2-stack-seg--mid", swatch: "linear-gradient(90deg, #1d4ed8, #3b82f6)", label: r.mid, pct: t.mid },
    { key: "flex", cls: "ov2-stack-seg--flex", swatch: "linear-gradient(90deg, #475569, #64748b)", label: r.flex, pct: t.flex },
    { key: "bust", cls: "ov2-stack-seg--bust", swatch: "linear-gradient(90deg, #b91c1c, #ef4444)", label: r.bust, pct: t.bust }
  ];
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("div", { className: "ov2-stack-bar", children: l.map((c) => {
      const u = c.pct / o * 100;
      return u < 0.5 ? null : /* @__PURE__ */ i.jsx(
        "div",
        {
          title: `${c.label}: ${c.pct.toFixed(0)}%`,
          className: `ov2-stack-seg ${c.cls}`,
          style: { width: `${u}%` },
          children: u >= 9 ? `${c.pct.toFixed(0)}%` : ""
        },
        c.key
      );
    }) }),
    /* @__PURE__ */ i.jsx("div", { className: "ov2-legend", children: l.map((c) => /* @__PURE__ */ i.jsxs("div", { className: "ov2-legend__item", children: [
      /* @__PURE__ */ i.jsx("span", { className: "ov2-legend__swatch", style: { background: c.swatch } }),
      /* @__PURE__ */ i.jsx("span", { className: "ov2-legend__label", children: c.label }),
      /* @__PURE__ */ i.jsxs("span", { className: "ov2-legend__pct", children: [
        c.pct.toFixed(0),
        "%"
      ] })
    ] }, c.key)) })
  ] });
}
function Vk(t) {
  return t === "ppr" ? "ppr" : t === "half" ? "half_ppr" : "std";
}
const Yk = 4, Gk = 2, Ep = 4, Qk = 17;
function Kk({ seasons: t, position: r, format: o }) {
  const [l, c] = b.useState("ppg"), u = (r || "").toUpperCase(), f = o === "ppr" ? "PPR" : o === "half" ? "Half-PPR" : "Standard", h = /* @__PURE__ */ new Date(), m = h.getMonth(), y = m >= 8 || m === 0, g = m === 0 ? h.getFullYear() - 1 : h.getFullYear(), v = (_) => o === "ppr" ? _.ppr : o === "half" ? _.half : _.std, w = [...t].sort((_, C) => _.season - C.season).map((_) => {
    const C = v(_), F = y && _.season >= g && _.gamesPlayed < Qk, U = F ? Gk : Yk, H = l === "ppg" ? C.posFinishPpg : C.posFinishTotal, Y = l === "total" || _.gamesPlayed >= U ? H : null, X = F && _.gamesPlayed < Ep;
    return { s: _, line: C, inProgress: F, rank: Y, smallSample: X, badge: $k(Y, r) };
  }), S = w.filter((_) => !_.inProgress).length, P = [...w].reverse().find((_) => _.inProgress) || null, k = !!P && P.s.gamesPlayed < Ep, j = w.length >= 12 ? "sc-finish2__timeline--ultra" : w.length >= 9 ? "sc-finish2__timeline--dense" : w.length >= 7 ? "sc-finish2__timeline--compact" : "", A = /* @__PURE__ */ i.jsxs("div", { className: "sc-finish2__heading", children: [
    /* @__PURE__ */ i.jsx("div", { className: "sc-finish2__title-row", children: /* @__PURE__ */ i.jsx("h3", { className: "sc-finish2__title", children: "Season-End Finishes" }) }),
    /* @__PURE__ */ i.jsxs("p", { className: "sc-finish2__subtitle", children: [
      f,
      " positional finishes by season."
    ] })
  ] });
  return S === 0 && P ? /* @__PURE__ */ i.jsxs("div", { className: "sc-finish2", "data-testid": "section-season-finishes", children: [
    A,
    /* @__PURE__ */ i.jsx("p", { className: "sc-finish2__empty", children: "Rookie season in progress. Season-end finish will update as games are played." })
  ] }) : w.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "sc-finish2", "data-testid": "section-season-finishes", children: [
    A,
    /* @__PURE__ */ i.jsx("p", { className: "sc-finish2__empty", children: "Not enough fantasy history yet. View weekly game logs below to evaluate recent usage and opportunity." })
  ] }) : /* @__PURE__ */ i.jsxs("div", { className: "sc-finish2", "data-testid": "section-season-finishes", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "sc-finish2__header", children: [
      A,
      /* @__PURE__ */ i.jsx("div", { className: "sc-finish2__toggle", "data-testid": "filter-finish-metric", children: [["ppg", "PPG Finish"], ["total", "Total Finish"]].map(([_, C]) => /* @__PURE__ */ i.jsx(
        "button",
        {
          className: `sc-finish2__seg ${l === _ ? "sc-finish2__seg--active" : ""}`,
          onClick: () => c(_),
          "data-testid": `button-finish-metric-${_}`,
          children: C
        },
        _
      )) })
    ] }),
    k && /* @__PURE__ */ i.jsx("p", { className: "sc-finish2__caution", "data-testid": "text-finish-caution", children: "Current-season rank may be unstable due to limited games played." }),
    /* @__PURE__ */ i.jsx("div", { className: `sc-finish2__timeline ${j}`, "data-testid": "season-finish-cards", children: /* @__PURE__ */ i.jsx("div", { className: "sc-finish2__track", children: w.map((_) => /* @__PURE__ */ i.jsxs("div", { className: `sc-finish2__card ${_.inProgress ? "sc-finish2__card--now" : ""}`, "data-testid": `card-finish-${_.s.season}`, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "sc-finish2__card-top", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sc-finish2__card-season", children: _.s.season }),
        _.inProgress && /* @__PURE__ */ i.jsx("span", { className: "sc-finish2__now", children: "NOW" })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "sc-finish2__card-rank", children: _.rank != null ? `${u}${_.rank}` : "—" }),
      /* @__PURE__ */ i.jsxs("p", { className: "sc-finish2__card-ppg", children: [
        _.line.ppg.toFixed(1),
        " PPG"
      ] }),
      _.badge && /* @__PURE__ */ i.jsx("span", { className: `sc-finish2__status ${_.badge.className}`, children: _.badge.label })
    ] }, _.s.season)) }) })
  ] });
}
function qk({ player: t, format: r = "ppr" }) {
  const o = t.availableSeasons || (t.season ? [t.season] : []), l = Vk(r), { data: c } = Mt({
    queryKey: ["/api/players", t.id, "production", l],
    queryFn: () => m1(t.id, l)
  }), u = (() => {
    const f = (c || []).map((y) => {
      const g = r === "ppr" ? y.ppr : r === "half" ? y.half : y.std, v = y.totals;
      return {
        season: y.season,
        gp: y.gamesPlayed,
        ppg: g.ppg,
        posRank: g.posFinishPpg,
        pass_att: v.passAtt,
        pass_cmp: v.passCmp,
        pass_yd: v.passYd,
        pass_td: v.passTd,
        pass_int: v.passInt,
        rush_att: v.rushAtt,
        rush_yd: v.rushYd,
        rush_td: v.rushTd,
        targets: v.tgt,
        receptions: v.rec,
        rec_yd: v.recYd,
        rec_td: v.recTd,
        total_td: v.passTd + v.rushTd + v.recTd,
        scrimmage_yd: v.rushYd + v.recYd
      };
    }), h = new Set(f.map((y) => y.season)), m = (t.careerSeasonStats || []).filter((y) => !h.has(y.season));
    return [...f, ...m];
  })();
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-gamelog", style: { display: "flex", flexDirection: "column", gap: "32px" }, children: [
    c && c.length > 0 && /* @__PURE__ */ i.jsx(Kk, { seasons: c, position: t.position, format: r }),
    u.length > 0 && /* @__PURE__ */ i.jsx(ij, { stats: u, position: t.position, format: r, player: t, defaultSeason: o[0] })
  ] });
}
const De = (t) => t ?? 0, dt = (t) => (t ?? 0).toLocaleString();
function Xk(t) {
  const r = ["th", "st", "nd", "rd"], o = t % 100;
  return t + (r[(o - 20) % 10] || r[o] || r[0]);
}
function Zk(t, r) {
  if (!t) return null;
  const o = (r || "FLEX").toUpperCase();
  return t <= 12 ? { label: `${o}1`, cls: "sc-finb--t1" } : t <= 24 ? { label: `${o}2`, cls: "sc-finb--t2" } : t <= 36 ? { label: `${o}3`, cls: "sc-finb--t3" } : { label: "Bust", cls: "sc-finb--bust" };
}
function bm(t, r) {
  if (!t) return null;
  const o = (r || "FLEX").toUpperCase(), l = t <= 12 ? "sc-finb--t1" : t <= 24 ? "sc-finb--t2" : t <= 36 ? "sc-finb--t3" : "sc-finb--bust";
  return { label: `${o}${t}`, cls: l };
}
function Jk(t, r) {
  const o = t || "", l = r.some((c) => De(c.stats.rush_att) > 0 || De(c.stats.rush_yd) > 0);
  if (o === "QB")
    return [
      { label: "Passing", primary: (c) => `${dt(c.pass_yd)} yds`, secondary: (c) => `${De(c.pass_td)} TD · ${De(c.pass_int)} INT` },
      { label: "Rushing", primary: (c) => `${dt(c.rush_yd)} yds`, secondary: (c) => `${De(c.rush_att)} car · ${De(c.rush_td)} TD` }
    ];
  if (o === "RB")
    return [
      { label: "Rushing", primary: (c) => `${dt(c.rush_yd)} yds`, secondary: (c) => `${De(c.rush_att)} car · ${De(c.rush_td)} TD` },
      { label: "Receiving", primary: (c) => `${dt(c.rec_yd)} yds`, secondary: (c) => `${De(c.rec)}/${De(c.rec_tgt)} · ${De(c.rec_td)} TD` }
    ];
  if (o === "WR" || o === "TE") {
    const c = [
      { label: "Receiving", primary: (u) => `${dt(u.rec_yd)} yds`, secondary: (u) => `${De(u.rec)}/${De(u.rec_tgt)} rec · ${De(u.rec_td)} TD` }
    ];
    return l && c.push({ label: "Rushing", primary: (u) => `${dt(u.rush_yd)} yds`, secondary: (u) => `${De(u.rush_att)} car · ${De(u.rush_td)} TD` }), c;
  }
  return o === "K" ? [
    { label: "Kicking", primary: (c) => `${De(c.fgm)}/${De(c.fga)} FG`, secondary: (c) => `${De(c.xpm)}/${De(c.xpa)} XP` }
  ] : [];
}
function ej({ entries: t, position: r, format: o }) {
  const l = (r || "").toUpperCase(), c = t.filter((m) => m.game_status === "active"), u = Jk(r, c), f = `48px minmax(120px,1.3fr) minmax(96px,1fr) ${u.map(() => "minmax(116px,1.2fr)").join(" ")} 92px`, h = (m) => m === "W" ? "sc-wlog__wl--w" : m === "L" ? "sc-wlog__wl--l" : "sc-wlog__wl--t";
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-wlog", "data-testid": "weekly-game-log", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "sc-wlog__head", style: { gridTemplateColumns: f }, children: [
      /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__h", children: "Wk" }),
      /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__h", children: "Matchup" }),
      /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__h", children: "Result" }),
      u.map((m) => /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__h", children: m.label }, m.label)),
      /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__h sc-wlog__h--r", children: "Fantasy" })
    ] }),
    t.map((m) => {
      const y = m.game_status === "bye", g = m.game_status === "out";
      if (y || g)
        return /* @__PURE__ */ i.jsxs("div", { className: "sc-wlog__row sc-wlog__row--inactive", style: { gridTemplateColumns: f }, "data-testid": `row-week-${m.week}`, children: [
          /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell sc-wlog__wk", "data-label": "Wk", children: m.week }),
          /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell", "data-label": "Matchup", children: /* @__PURE__ */ i.jsx("span", { className: "sc-wlog__opp", children: y ? "BYE" : "—" }) }),
          /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell", "data-label": "Result", children: /* @__PURE__ */ i.jsx("span", { className: "sc-finb sc-finb--bye", children: y ? "BYE" : "OUT" }) }),
          u.map((k) => /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell sc-wlog__muted", "data-label": k.label, children: "—" }, k.label)),
          /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell sc-wlog__cell--r sc-wlog__muted", "data-label": "Fantasy", children: "—" })
        ] }, m.week);
      const v = Rn(m, o), w = Zk(m.pos_rank, r), S = m.score, P = m.opp_rank_vs_pos;
      return /* @__PURE__ */ i.jsxs("div", { className: "sc-wlog__row", style: { gridTemplateColumns: f }, "data-testid": `row-week-${m.week}`, children: [
        /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell sc-wlog__wk", "data-label": "Wk", children: m.week }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell", "data-label": "Matchup", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-wlog__match", children: [
          /* @__PURE__ */ i.jsx("span", { className: "sc-wlog__opp", children: m.opp }),
          P ? /* @__PURE__ */ i.jsxs("span", { className: `sc-wlog__opprank ${Fk(P)}`, children: [
            Xk(P),
            " vs ",
            l
          ] }) : null
        ] }) }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell", "data-label": "Result", children: S ? /* @__PURE__ */ i.jsxs("span", { className: "sc-wlog__result", children: [
          /* @__PURE__ */ i.jsx("span", { className: `sc-wlog__wl ${h(S.r)}`, children: S.r }),
          /* @__PURE__ */ i.jsxs("span", { className: "sc-wlog__score", children: [
            S.tm,
            "–",
            S.opp
          ] })
        ] }) : /* @__PURE__ */ i.jsx("span", { className: "sc-wlog__muted", children: "—" }) }),
        u.map((k) => /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell", "data-label": k.label, children: /* @__PURE__ */ i.jsxs("div", { className: "sc-wlog__stat", children: [
          /* @__PURE__ */ i.jsx("span", { className: "sc-wlog__stat-main", children: k.primary(m.stats) }),
          /* @__PURE__ */ i.jsx("span", { className: "sc-wlog__stat-sub", children: k.secondary(m.stats) })
        ] }) }, k.label)),
        /* @__PURE__ */ i.jsx("div", { className: "sc-wlog__cell sc-wlog__cell--r", "data-label": "Fantasy", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-wlog__fantasy", children: [
          /* @__PURE__ */ i.jsx("span", { className: "sc-wlog__fpts", children: v.toFixed(1) }),
          w ? /* @__PURE__ */ i.jsx("span", { className: `sc-finb ${w.cls}`, children: w.label }) : null
        ] }) })
      ] }, m.week);
    })
  ] });
}
function tj(t, r) {
  const o = r || "";
  return o === "QB" ? [
    { label: "GP", value: String(t.gp) },
    { label: "Pass Yds", value: dt(t.pass_yd) },
    { label: "Pass TD", value: String(t.pass_td) },
    { label: "INT", value: String(t.pass_int) },
    { label: "Rush Yds", value: dt(t.rush_yd) },
    { label: "Rush TD", value: String(t.rush_td) }
  ] : o === "RB" ? [
    { label: "GP", value: String(t.gp) },
    { label: "Rush Yds", value: dt(t.rush_yd) },
    { label: "Rush TD", value: String(t.rush_td) },
    { label: "Rec", value: String(t.receptions) },
    { label: "Rec Yds", value: dt(t.rec_yd) },
    { label: "Total TD", value: String(t.total_td) }
  ] : o === "WR" || o === "TE" ? [
    { label: "GP", value: String(t.gp) },
    { label: "Targets", value: String(t.targets) },
    { label: "Rec", value: String(t.receptions) },
    { label: "Rec Yds", value: dt(t.rec_yd) },
    { label: "Rec TD", value: String(t.rec_td) },
    { label: "Total TD", value: String(t.total_td) }
  ] : [
    { label: "GP", value: String(t.gp) },
    { label: "Total TD", value: String(t.total_td) }
  ];
}
function nj(t, r, o, l) {
  if (r.length === 0) return null;
  const c = (o || "FLEX").toUpperCase(), u = r.map((S) => Rn(S, l)), f = u.length ? Math.max(...u) : 0, h = r.filter((S) => S.pos_rank != null && S.pos_rank <= 12).length, m = t.posRank, y = m ? m <= 5 ? "An elite" : m <= 12 ? "A strong" : m <= 24 ? "A steady" : m <= 36 ? "A streaming-level" : "A depth" : "A", g = m ? ` ${c}${m}` : "";
  let v = `${y}${g} season across ${t.gp} game${t.gp === 1 ? "" : "s"}`;
  const w = [];
  return h > 0 && w.push(`${h} ${c}1 week${h === 1 ? "" : "s"}`), f > 0 && w.push(`a ${f.toFixed(1)}-point ceiling`), w.length && (v += ` with ${w.join(" and ")}`), v + ".";
}
function km({ stat: t, entries: r, position: o, format: l, title: c }) {
  const u = bm(t.posRank, o), f = tj(t, o), h = r.filter((g) => g.game_status === "active"), m = nj(t, h, o, l), y = wm(r, o, l);
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-dash", "data-testid": "season-summary-card", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "sc-dash__head", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "sc-dash__titlewrap", children: [
        /* @__PURE__ */ i.jsx("h4", { className: "sc-dash__title", children: c }),
        m && /* @__PURE__ */ i.jsx("p", { className: "sc-dash__insight", children: m })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "sc-dash__headline", children: [
        /* @__PURE__ */ i.jsxs("span", { className: "sc-dash__ppg", children: [
          t.ppg.toFixed(1),
          /* @__PURE__ */ i.jsx("i", { children: "PPG" })
        ] }),
        u && /* @__PURE__ */ i.jsx("span", { className: `sc-finb ${u.cls}`, children: u.label })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "sc-dash__metrics", children: f.map((g) => /* @__PURE__ */ i.jsxs("div", { className: "sc-dash__metric", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sc-dash__metric-val", children: g.value }),
      /* @__PURE__ */ i.jsx("span", { className: "sc-dash__metric-lbl", children: g.label })
    ] }, g.label)) }),
    y && y.gamesPlayed > 0 && /* @__PURE__ */ i.jsx("div", { className: "sc-dash__profile", "data-testid": "weekly-finish-profile", children: /* @__PURE__ */ i.jsx(Hk, { pcts: Wk(y), labels: Uk(o) }) })
  ] });
}
function rj({ player: t, season: r, stat: o, position: l, format: c, isDefaultSeason: u }) {
  const { data: f, isLoading: h } = Mt({
    queryKey: ["/api/players", t.slug, "game-log", r, c],
    queryFn: async () => {
      const g = await fetch(`/api/players/${t.slug}/game-log?season=${r}&format=${c}`);
      if (!g.ok) throw new Error("Failed to fetch game log");
      return g.json();
    },
    enabled: !u
  }), m = u ? t.gameLog || [] : f || [], y = !u && h;
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-glbody", children: [
    /* @__PURE__ */ i.jsx(km, { stat: o, entries: m, position: l, format: c, title: `${r} Season` }),
    y ? /* @__PURE__ */ i.jsxs("div", { className: "sc-glpad py-2 text-center", children: [
      /* @__PURE__ */ i.jsx(be, { className: "h-4 w-48 mx-auto mb-2" }),
      /* @__PURE__ */ i.jsx(be, { className: "h-4 w-32 mx-auto" })
    ] }) : m.length > 0 ? /* @__PURE__ */ i.jsx(ej, { entries: m, position: l, format: c }) : /* @__PURE__ */ i.jsxs("p", { className: "sc-glpad text-center text-xs text-muted-foreground", children: [
      "No weekly game log available for ",
      r,
      "."
    ] })
  ] });
}
function sj(t) {
  const r = (c) => t.reduce((u, f) => u + (Number(f[c]) || 0), 0), o = r("gp"), l = t.reduce((c, u) => c + u.ppg * u.gp, 0);
  return {
    season: 0,
    gp: o,
    ppg: o > 0 ? l / o : 0,
    posRank: null,
    pass_att: r("pass_att"),
    pass_cmp: r("pass_cmp"),
    pass_yd: r("pass_yd"),
    pass_td: r("pass_td"),
    pass_int: r("pass_int"),
    rush_att: r("rush_att"),
    rush_yd: r("rush_yd"),
    rush_td: r("rush_td"),
    targets: r("targets"),
    receptions: r("receptions"),
    rec_yd: r("rec_yd"),
    rec_td: r("rec_td"),
    total_td: r("total_td"),
    scrimmage_yd: r("scrimmage_yd")
  };
}
function oj({ stats: t, position: r, format: o, onPick: l }) {
  const c = sj(t), u = (f) => r === "QB" ? `${dt(f.pass_yd)} pass yds · ${f.pass_td} TD` : r === "RB" ? `${dt(f.rush_yd)} rush yds · ${f.total_td} TD` : `${f.receptions} rec · ${dt(f.rec_yd)} yds · ${f.total_td} TD`;
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-glbody", children: [
    /* @__PURE__ */ i.jsx(km, { stat: c, entries: [], position: r, format: o, title: "Career Totals" }),
    /* @__PURE__ */ i.jsx("div", { className: "sc-slog__seasons", children: t.map((f) => {
      const h = bm(f.posRank, r);
      return /* @__PURE__ */ i.jsxs("button", { type: "button", className: "sc-slog__srow", onClick: () => l(f.season), "data-testid": `career-season-${f.season}`, children: [
        /* @__PURE__ */ i.jsx("span", { className: "sc-slog__syear", children: f.season }),
        /* @__PURE__ */ i.jsxs("span", { className: "sc-slog__sgp", children: [
          f.gp,
          " GP"
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "sc-slog__skey", children: u(f) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sc-slog__sppg", children: [
          f.ppg.toFixed(1),
          " ",
          /* @__PURE__ */ i.jsx("i", { children: "PPG" })
        ] }),
        h ? /* @__PURE__ */ i.jsx("span", { className: `sc-finb ${h.cls}`, children: h.label }) : /* @__PURE__ */ i.jsx("span", { className: "sc-wlog__muted", children: "—" }),
        /* @__PURE__ */ i.jsx(vc, { className: "sc-slog__sarrow" })
      ] }, f.season);
    }) })
  ] });
}
function ij({ player: t, stats: r, position: o, format: l, defaultSeason: c }) {
  const u = b.useMemo(() => [...r].sort((y, g) => g.season - y.season), [r]), f = c != null && u.some((y) => y.season === c) ? c : u[0]?.season ?? "career", [h, m] = b.useState(f);
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-glcard", "data-testid": "career-stats-table", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "sc-glcard__header", children: [
      /* @__PURE__ */ i.jsx("h3", { className: "sc-glcard__title", children: "Game Log" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sc-slog__selector", role: "tablist", "data-testid": "season-selector", children: [
        u.map((y) => /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: `sc-slog__seg ${h === y.season ? "sc-slog__seg--active" : ""}`,
            onClick: () => m(y.season),
            "data-testid": `season-tab-${y.season}`,
            children: y.season
          },
          y.season
        )),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: `sc-slog__seg ${h === "career" ? "sc-slog__seg--active" : ""}`,
            onClick: () => m("career"),
            "data-testid": "season-tab-career",
            children: "Career"
          }
        )
      ] })
    ] }),
    h === "career" ? /* @__PURE__ */ i.jsx(oj, { stats: u, position: o, format: l, onPick: (y) => m(y) }) : /* @__PURE__ */ i.jsx(
      rj,
      {
        player: t,
        season: h,
        stat: u.find((y) => y.season === h) ?? u[0],
        position: o,
        format: l,
        isDefaultSeason: c != null && h === c
      },
      h
    )
  ] });
}
function aj({ player: t }) {
  const r = t.dynasty, [o, l] = b.useState("1qb");
  if (!r)
    return /* @__PURE__ */ i.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ i.jsxs("div", { className: "rounded-md border border-dashed border-muted-foreground/25 p-12 text-center", children: [
      /* @__PURE__ */ i.jsx(bc, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Dynasty rankings not available for this player" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground/60 text-xs mt-1", children: "This player is not currently ranked in consensus dynasty rankings." })
    ] }) });
  const c = o === "sf" && r.sf ? { ...r, ...r.sf } : r, u = `${r.position}${c.positionalTier <= 1 ? "1" : c.positionalTier <= 3 ? "2" : "3+"}`, f = c.positionalTier <= 1 ? "Elite" : c.positionalTier <= 3 ? "Mid" : c.positionalTier <= 6 ? "Low-End" : "Deep", h = r.ageCurveTier === "Rising" ? "text-emerald-500" : r.ageCurveTier === "Prime" ? "text-blue-500" : r.ageCurveTier === "Aging" ? "text-amber-500" : "text-red-400", m = r.ageCurveTier === "Rising" ? "bg-emerald-500/10" : r.ageCurveTier === "Prime" ? "bg-blue-500/10" : r.ageCurveTier === "Aging" ? "bg-amber-500/10" : "bg-red-500/10", y = c.value >= 8e3 ? "text-emerald-500" : c.value >= 6e3 ? "text-blue-500" : c.value >= 4e3 ? "text-foreground" : c.value >= 2e3 ? "text-muted-foreground" : "text-red-400", g = c.value >= 8e3 ? "Elite" : c.value >= 6e3 ? "Premium" : c.value >= 4e3 ? "Solid" : c.value >= 2e3 ? "Roster" : "Fringe", v = r.draftRound, w = r.draftPick, S = r.draftYear, P = v && w && S ? `Round ${v} – Pick ${w} (${S})` : v && S ? `Round ${v} (${S})` : v ? `Round ${v}` : null, k = v ? v === 1 && w && w <= 10 ? { label: "Elite", color: "text-yellow-500 dark:text-yellow-400", bg: "bg-yellow-500/10" } : v === 1 ? { label: "Strong", color: "text-yellow-500 dark:text-yellow-400", bg: "bg-yellow-500/10" } : v === 2 ? { label: "Solid", color: "text-slate-400 dark:text-slate-300", bg: "bg-slate-500/10" } : { label: "Fragile", color: "text-amber-700 dark:text-amber-600", bg: "bg-amber-500/10" } : { label: "Undrafted", color: "text-muted-foreground", bg: "bg-muted/50" };
  return /* @__PURE__ */ i.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "32px" }, "data-testid": "rankings-tab", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "sc-card", style: { padding: "28px" }, "data-testid": "dynasty-market-snapshot", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", style: { marginBottom: "20px" }, children: [
        /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ i.jsx("p", { style: { fontSize: "13px", fontWeight: 700, color: "#0b3a7a", letterSpacing: "-0.01em" }, children: "Dynasty Market Snapshot" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
          r.sf && /* @__PURE__ */ i.jsxs("div", { className: "sc-gamelog__segmented-control", "data-testid": "toggle-dynasty-format", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                onClick: () => l("1qb"),
                className: `sc-gamelog__segment ${o === "1qb" ? "sc-gamelog__segment--active" : ""}`,
                "data-testid": "button-dynasty-1qb",
                children: "1QB"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                onClick: () => l("sf"),
                className: `sc-gamelog__segment ${o === "sf" ? "sc-gamelog__segment--active" : ""}`,
                "data-testid": "button-dynasty-sf",
                children: "SF"
              }
            )
          ] }),
          /* @__PURE__ */ i.jsxs(
            "a",
            {
              href: `https://keeptradecut.com/dynasty-rankings/players/${r.ktcSlug}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[10px] text-muted-foreground/50 hover:text-primary transition-colors flex items-center gap-1",
              "data-testid": "link-ktc-profile",
              children: [
                "KeepTradeCut ",
                /* @__PURE__ */ i.jsx(bp, { className: "w-2.5 h-2.5" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-overall-rank", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Overall Rank" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-3xl font-bold text-foreground mt-1 tabular-nums", children: c.rank }),
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground", children: "of 500+" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-positional-rank", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Positional Rank" }),
          /* @__PURE__ */ i.jsxs("p", { className: "text-3xl font-bold text-foreground mt-1 tabular-nums", children: [
            r.position,
            c.positionalRank
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground", children: [
            "Tier ",
            c.positionalTier
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-age-curve", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Age Curve" }),
          /* @__PURE__ */ i.jsx("span", { className: `inline-block mt-2 px-2 py-1 rounded-md text-xs font-bold ${h} ${m}`, children: r.ageCurveTier }),
          /* @__PURE__ */ i.jsxs("p", { className: "text-[10px] text-muted-foreground tabular-nums mt-1", children: [
            r.age.toFixed(1),
            " yrs"
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-value", className: "relative", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Dynasty Value" }),
          /* @__PURE__ */ i.jsx("p", { className: `text-4xl font-extrabold mt-1 tabular-nums tracking-tight ${y}`, children: c.value.toLocaleString() }),
          /* @__PURE__ */ i.jsx("span", { className: `inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${y} ${c.value >= 8e3 ? "bg-emerald-500/10" : c.value >= 6e3 ? "bg-blue-500/10" : "bg-muted/50"}`, children: g })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "border-t border-border pt-4", children: /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-4", children: [
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-drafted", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Drafted" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-xs font-semibold text-muted-foreground mt-1", children: P || "Undrafted" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-draft-grade", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Capital Grade" }),
          /* @__PURE__ */ i.jsx("span", { className: `inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold ${k.color} ${k.bg}`, children: k.label })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-tier", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Dynasty Tier" }),
          /* @__PURE__ */ i.jsxs("p", { className: "text-xs font-semibold text-muted-foreground mt-1", children: [
            f,
            " ",
            u
          ] })
        ] }),
        c.startupAdp ? /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-startup-adp", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Startup ADP" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-xs font-semibold text-muted-foreground mt-1 tabular-nums", children: c.startupAdp.toFixed(1) })
        ] }) : /* @__PURE__ */ i.jsx("div", {}),
        /* @__PURE__ */ i.jsxs("div", { "data-testid": "dynasty-market-tier", children: [
          /* @__PURE__ */ i.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Market Tier" }),
          /* @__PURE__ */ i.jsx("p", { className: `text-xs font-semibold mt-1 ${y}`, children: g })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ i.jsx(
      "a",
      {
        href: `https://keeptradecut.com/dynasty-rankings/players/${r.ktcSlug}`,
        target: "_blank",
        rel: "noopener noreferrer",
        children: /* @__PURE__ */ i.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 28px", cursor: "pointer" }, children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ i.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(245,192,26,0.1)" }, children: /* @__PURE__ */ i.jsx(l1, { className: "w-4 h-4", style: { color: "#F5C01A" } }) }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "View Full Dynasty Profile" }),
              /* @__PURE__ */ i.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Trade calculator, keep/trade/cut data, and more on KeepTradeCut" })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(bp, { className: "w-4 h-4 flex-shrink-0", style: { color: "#94a3b8" } })
        ] }) })
      }
    ),
    /* @__PURE__ */ i.jsx("div", { className: "px-1 pt-2", "data-testid": "dynasty-disclaimer", children: /* @__PURE__ */ i.jsxs("p", { className: "text-[9px] text-muted-foreground/40 leading-relaxed", children: [
      "Dynasty market data referenced from publicly available consensus rankings at",
      " ",
      /* @__PURE__ */ i.jsx(
        "a",
        {
          href: "https://keeptradecut.com/dynasty-rankings",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-muted-foreground/60 underline",
          children: "KeepTradeCut"
        }
      ),
      ". StatChasers is not affiliated with KeepTradeCut. Rankings are crowdsourced and updated periodically."
    ] }) })
  ] });
}
function lj({ item: t, player: r, teamColor: o, sourceName: l }) {
  const [c, u] = b.useState(!1), f = Ec(r.id), h = o || "#F5C01A", m = `linear-gradient(90deg, ${h}, ${h}88)`;
  return /* @__PURE__ */ i.jsx(
    "a",
    {
      href: t.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "block",
      "data-testid": "link-featured-news",
      children: /* @__PURE__ */ i.jsxs(
        "div",
        {
          className: "sc-player-news",
          style: { "--team-accent": h },
          children: [
            /* @__PURE__ */ i.jsx("div", { style: { height: 4, borderRadius: "6px 6px 0 0", background: m, margin: "-24px -24px 20px -24px" } }),
            /* @__PURE__ */ i.jsxs("div", { className: "sc-player-news__header", children: [
              c ? /* @__PURE__ */ i.jsx("div", { className: "sc-player-news__img-fallback", style: { borderColor: h }, children: /* @__PURE__ */ i.jsx(kc, { className: "w-6 h-6 text-slate-400 dark:text-slate-500" }) }) : /* @__PURE__ */ i.jsx(
                "img",
                {
                  src: f,
                  alt: r.name,
                  className: "sc-player-news__img",
                  style: { borderColor: h },
                  onError: () => u(!0)
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { children: [
                /* @__PURE__ */ i.jsxs("div", { className: "sc-player-news__name", children: [
                  r.name,
                  " – ",
                  r.position
                ] }),
                /* @__PURE__ */ i.jsxs("div", { className: "sc-player-news__posted", children: [
                  t.type === "video" ? "🎥 Video" : "📰 Article",
                  " • ",
                  l
                ] })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "sc-player-news__pills", children: [
              /* @__PURE__ */ i.jsx("span", { className: "sc-pill sc-pill--type", "data-testid": "badge-featured-type", children: (t.type || "news").toUpperCase() }),
              t.impact && /* @__PURE__ */ i.jsx("span", { className: `sc-pill sc-pill--impact sc-pill--impact-${t.impact.toLowerCase()}`, children: t.impact }),
              t.tag && /* @__PURE__ */ i.jsx("span", { className: "sc-pill sc-pill--tag", children: t.tag })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "sc-player-news__body", children: t.ai_blurb || t.title }),
            /* @__PURE__ */ i.jsxs("div", { className: "sc-player-news__footer", children: [
              /* @__PURE__ */ i.jsxs("span", { className: "sc-player-news__source", children: [
                "Source: ",
                l
              ] }),
              /* @__PURE__ */ i.jsx("span", { className: "sc-player-news__link", children: "View Original →" })
            ] })
          ]
        }
      )
    }
  );
}
function cj(t) {
  const r = (t || "").toUpperCase().trim();
  return r === "OUT" ? "sc-injury-pill--out" : r === "DOUBTFUL" ? "sc-injury-pill--doubtful" : r === "QUESTIONABLE" ? "sc-injury-pill--questionable" : "sc-injury-pill--none";
}
function Al(t) {
  const r = (t || "").toUpperCase().trim();
  return r === "FP" ? "sc-injury-chip--fp" : r === "LP" ? "sc-injury-chip--lp" : r === "DNP" ? "sc-injury-chip--dnp" : "";
}
const uj = {
  NE: "Patriots",
  BUF: "Bills",
  MIA: "Dolphins",
  NYJ: "Jets",
  BAL: "Ravens",
  CIN: "Bengals",
  CLE: "Browns",
  PIT: "Steelers"
};
function dj({ player: t }) {
  const r = t.team || "", o = uj[r] || null, l = !!o, c = jc[r] || "#F5C01A", [u, f] = b.useState("articles"), { data: h, isLoading: m, refetch: y, isFetching: g } = Mt({
    queryKey: ["/api/team/news", r, t.name],
    queryFn: async () => {
      const C = await fetch(`/api/team/news?team=${encodeURIComponent(r)}&player_name=${encodeURIComponent(t.name)}&limit=8`);
      if (!C.ok) throw new Error("Failed to load news");
      return C.json();
    },
    enabled: l,
    staleTime: 1800 * 1e3
  }), { data: v, isLoading: w } = Mt({
    queryKey: ["/api/team/injury", r, t.name],
    queryFn: async () => {
      const C = await fetch(`/api/team/injury?team=${encodeURIComponent(r)}&player_name=${encodeURIComponent(t.name)}`);
      if (!C.ok) throw new Error("Failed to load injury");
      return C.json();
    },
    enabled: l && u === "injuries",
    staleTime: 1800 * 1e3
  }), S = t.news || [], P = h?.items || [], k = P[0] || null, j = P.slice(1), A = S.length > 0 || P.length > 0, _ = h?.source || (o ? `${o}.com` : "");
  return /* @__PURE__ */ i.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "32px" }, "data-testid": "news-tab", children: [
    /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx(Xl, { title: "News & Analysis", subtitle: "Latest team reports, injury updates, and player intel" }),
      l && /* @__PURE__ */ i.jsxs("div", { style: { display: "flex", gap: "0", marginTop: "16px" }, "data-testid": "news-filter-toggle", children: [
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: `sc-news-tab ${u === "articles" ? "sc-news-tab--active" : ""}`,
            onClick: () => f("articles"),
            "data-testid": "button-filter-articles",
            children: "Articles"
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: `sc-news-tab ${u === "injuries" ? "sc-news-tab--active" : ""}`,
            onClick: () => f("injuries"),
            "data-testid": "button-filter-injuries",
            children: "Injuries"
          }
        )
      ] })
    ] }),
    l && u === "injuries" && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      w && /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card", children: [
        /* @__PURE__ */ i.jsx(be, { className: "h-4 w-24 mb-3" }),
        /* @__PURE__ */ i.jsx(be, { className: "h-5 w-full mb-2" }),
        /* @__PURE__ */ i.jsx(be, { className: "h-5 w-4/5 mb-3" }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ i.jsx(be, { className: "h-5 w-16 rounded-full" }),
          /* @__PURE__ */ i.jsx(be, { className: "h-5 w-16 rounded-full" }),
          /* @__PURE__ */ i.jsx(be, { className: "h-5 w-16 rounded-full" })
        ] })
      ] }),
      v && !w && (() => {
        const C = (() => {
          const Q = v.position || "";
          let z = v.injury || "";
          return z && !z.toLowerCase().includes("injury") && !z.toLowerCase().includes("illness") && !z.toLowerCase().includes("rest") && !z.toLowerCase().includes("personal") && (z = `${z} Injury`), Q && z ? `${Q} • ${z}` : Q || z;
        })(), F = (Q) => Q.replace(/\w\S*/g, (z) => z.charAt(0).toUpperCase() + z.slice(1).toLowerCase()), U = v.report_label ? `${F(v.report_label)} Injury Report` : "Injury Report", H = (() => {
          const Q = v.blurb || "", z = v.player_name || "";
          if (!z || !Q.includes(z)) return [{ text: Q, bold: !1 }];
          const Z = Q.indexOf(z), ge = [];
          return Z > 0 && ge.push({ text: Q.slice(0, Z), bold: !1 }), ge.push({ text: z, bold: !0 }), Z + z.length < Q.length && ge.push({ text: Q.slice(Z + z.length), bold: !1 }), ge;
        })(), Y = (Q) => {
          const z = new Date(Q);
          if (isNaN(z.getTime())) return "";
          const Z = Math.floor((Date.now() - z.getTime()) / 1e3);
          return Z < 60 ? "just now" : Z < 3600 ? `${Math.floor(Z / 60)}m ago` : Z < 86400 ? `${Math.floor(Z / 3600)}h ago` : `${Math.floor(Z / 86400)}d ago`;
        }, X = (Q) => {
          const z = new Date(Q);
          return isNaN(z.getTime()) ? "" : z.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        }, se = v.report_updated_at ? `Report updated: ${X(v.report_updated_at)}` : null, ne = v.fetched_at ? `Last checked: ${Y(v.fetched_at)}` : null, ie = v.practice && (v.practice.wed || v.practice.thu || v.practice.fri);
        return /* @__PURE__ */ i.jsx("div", { className: `sc-injury-card ${v.found ? "" : "sc-injury-card--empty"}`, "data-testid": "injury-card", children: v.found ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__top", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__title", "data-testid": "text-injury-title", children: [
                /* @__PURE__ */ i.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", verticalAlign: "-2px", marginRight: "5px" }, children: /* @__PURE__ */ i.jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }),
                U
              ] }),
              /* @__PURE__ */ i.jsx("div", { className: "sc-injury-card__meta", "data-testid": "text-injury-meta", children: C })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: `sc-injury-pill ${cj(v.game_status || "")}`, "data-testid": "badge-injury-status", children: (() => {
              const Q = (v.game_status || "").toUpperCase().trim();
              return Q && Q !== "(-)" && Q !== "-" ? Q : "No designation";
            })() })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "sc-injury-card__blurb", "data-testid": "text-injury-blurb", children: H.map((Q, z) => Q.bold ? /* @__PURE__ */ i.jsx("strong", { children: Q.text }, z) : /* @__PURE__ */ i.jsx("span", { children: Q.text }, z)) }),
          ie && /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__bot", children: [
            v.practice?.wed && /* @__PURE__ */ i.jsxs("span", { className: `sc-injury-chip ${Al(v.practice.wed)}`, "data-testid": "chip-practice-wed", children: [
              "WED: ",
              v.practice.wed
            ] }),
            v.practice?.thu && /* @__PURE__ */ i.jsxs("span", { className: `sc-injury-chip ${Al(v.practice.thu)}`, "data-testid": "chip-practice-thu", children: [
              "THU: ",
              v.practice.thu
            ] }),
            v.practice?.fri && /* @__PURE__ */ i.jsxs("span", { className: `sc-injury-chip ${Al(v.practice.fri)}`, "data-testid": "chip-practice-fri", children: [
              "FRI: ",
              v.practice.fri
            ] })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__footer", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__timestamps", children: [
              se && /* @__PURE__ */ i.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-report-date", children: se }),
              ne && /* @__PURE__ */ i.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-checked", children: ne })
            ] }),
            v.source_url && /* @__PURE__ */ i.jsx("a", { className: "sc-injury-card__link", href: v.source_url, target: "_blank", rel: "noopener noreferrer", "data-testid": "link-injury-source", children: "View Full Injury Report →" })
          ] })
        ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__top", children: [
            /* @__PURE__ */ i.jsx("div", { children: /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__title", children: [
              /* @__PURE__ */ i.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", verticalAlign: "-2px", marginRight: "5px" }, children: /* @__PURE__ */ i.jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }),
              U
            ] }) }),
            /* @__PURE__ */ i.jsx("div", { className: "sc-injury-pill sc-injury-pill--none", "data-testid": "badge-injury-status", children: "Not Listed" })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "sc-injury-card__blurb", "data-testid": "text-injury-blurb", children: "No injury designation listed on the latest report." }),
          /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__footer", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "sc-injury-card__timestamps", children: [
              se && /* @__PURE__ */ i.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-report-date", children: se }),
              ne && /* @__PURE__ */ i.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-checked", children: ne })
            ] }),
            v.source_url && /* @__PURE__ */ i.jsx("a", { className: "sc-injury-card__link", href: v.source_url, target: "_blank", rel: "noopener noreferrer", "data-testid": "link-injury-source", children: "View Full Injury Report →" })
          ] })
        ] }) });
      })()
    ] }),
    l && u !== "articles" ? null : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      l && m && /* @__PURE__ */ i.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "sc-player-news", style: { "--team-accent": c }, children: [
          /* @__PURE__ */ i.jsx("div", { style: { height: 4, borderRadius: "6px 6px 0 0", background: `linear-gradient(90deg, ${c}, ${c}88)`, margin: "-24px -24px 20px -24px" } }),
          /* @__PURE__ */ i.jsxs("div", { className: "sc-player-news__header", children: [
            /* @__PURE__ */ i.jsx(be, { className: "w-14 h-14 rounded-full flex-shrink-0" }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ i.jsx(be, { className: "h-5 w-40 mb-2" }),
              /* @__PURE__ */ i.jsx(be, { className: "h-3.5 w-28" })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(be, { className: "h-4 w-20 mb-3" }),
          /* @__PURE__ */ i.jsx(be, { className: "h-5 w-full mb-1.5" }),
          /* @__PURE__ */ i.jsx(be, { className: "h-5 w-4/5 mb-4" }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800", children: [
            /* @__PURE__ */ i.jsx(be, { className: "h-3.5 w-32" }),
            /* @__PURE__ */ i.jsx(be, { className: "h-3.5 w-24" })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews", children: /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__list", children: [1, 2].map((C) => /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__card", style: { pointerEvents: "none" }, children: [
          /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__card-left", children: /* @__PURE__ */ i.jsx(be, { className: "w-[34px] h-[34px] rounded-xl" }) }),
          /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__card-mid", children: [
            /* @__PURE__ */ i.jsx(be, { className: "h-4 w-16 mb-2" }),
            /* @__PURE__ */ i.jsx(be, { className: "h-5 w-full" })
          ] })
        ] }, C)) }) })
      ] }),
      k && /* @__PURE__ */ i.jsx(lj, { item: k, player: t, teamColor: c, sourceName: _ }),
      j.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews", "data-testid": "team-news-list", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__head", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__head-left", children: [
            /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📰" }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__kicker", children: [
                "Latest from ",
                _
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__sub", children: [
                P.length,
                " updates"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx("div", { children: /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "sc-teamnews__btn",
              type: "button",
              onClick: () => y(),
              disabled: g,
              "data-testid": "button-refresh-news",
              children: [
                /* @__PURE__ */ i.jsx(u1, { className: `w-3.5 h-3.5 ${g ? "animate-spin" : ""}` }),
                "Refresh"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__list", children: j.map((C, F) => /* @__PURE__ */ i.jsxs(
          "a",
          {
            className: "sc-teamnews__card",
            href: C.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-testid": `link-team-news-${F}`,
            children: [
              /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__card-left", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__doc", children: /* @__PURE__ */ i.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" }) }) }) }),
              /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__card-mid", children: [
                /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__meta", children: [
                  /* @__PURE__ */ i.jsx("span", { className: "sc-pill sc-pill--type", "data-testid": `badge-news-type-${F}`, children: (C.type || "news").toUpperCase() }),
                  /* @__PURE__ */ i.jsx("span", { className: "sc-teamnews__source", children: _ }),
                  C.impact && /* @__PURE__ */ i.jsx("span", { className: `sc-pill sc-pill--impact sc-pill--impact-${C.impact.toLowerCase()}`, children: C.impact }),
                  C.tag && /* @__PURE__ */ i.jsx("span", { className: "sc-pill sc-pill--tag", children: C.tag })
                ] }),
                /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__title", children: C.title }),
                C.ai_blurb && /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__blurb", children: C.ai_blurb })
              ] }),
              /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__card-right", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) }) })
            ]
          },
          F
        )) }),
        h?.team_profile_url && /* @__PURE__ */ i.jsx("div", { style: { padding: "0 14px 12px" }, children: /* @__PURE__ */ i.jsxs(
          "a",
          {
            href: h.team_profile_url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "sc-teamnews__profile-link",
            "data-testid": "link-team-profile",
            children: [
              "View full profile on ",
              _,
              /* @__PURE__ */ i.jsx("svg", { viewBox: "0 0 24 24", width: "12", height: "12", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) })
            ]
          }
        ) })
      ] }),
      P.length === 1 && h?.team_profile_url && /* @__PURE__ */ i.jsx("div", { style: { marginTop: -8 }, children: /* @__PURE__ */ i.jsxs(
        "a",
        {
          href: h.team_profile_url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "sc-teamnews__profile-link",
          "data-testid": "link-team-profile-single",
          children: [
            "View full profile on ",
            _,
            /* @__PURE__ */ i.jsx("svg", { viewBox: "0 0 24 24", width: "12", height: "12", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) })
          ]
        }
      ) }),
      S.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews", "data-testid": "news-list", children: [
        /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__head", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__head-left", children: [
          /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📄" }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__kicker", children: "Articles" }),
            /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__sub", children: [
              S.length,
              " ",
              S.length === 1 ? "article" : "articles"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__list", children: S.map((C, F) => /* @__PURE__ */ i.jsxs(
          "a",
          {
            className: "sc-teamnews__card",
            href: C.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-testid": `link-news-${F}`,
            children: [
              /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__card-left", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__doc", children: /* @__PURE__ */ i.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" }) }) }) }),
              /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__card-mid", children: [
                /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__meta", children: [
                  /* @__PURE__ */ i.jsx("span", { className: "sc-pill sc-pill--type", children: "NEWS" }),
                  /* @__PURE__ */ i.jsx("span", { className: "sc-teamnews__source", children: C.source }),
                  C.publishedAt && /* @__PURE__ */ i.jsx("span", { className: "sc-teamnews__date", children: new Date(C.publishedAt).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
                ] }),
                /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__title", children: C.title }),
                C.summary && /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__blurb", children: C.summary })
              ] }),
              /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__card-right", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) }) })
            ]
          },
          F
        )) })
      ] }),
      !A && !m && /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews", children: [
        /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__head", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__head-left", children: [
          /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📰" }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__kicker", children: "News & Analysis" }),
            /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__sub", children: "No updates found" })
          ] })
        ] }) }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-teamnews__list", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-teamnews__empty", children: [
          "No recent items available for ",
          t.name,
          ". Check back soon for updates."
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ i.jsx(Zn, { href: "/articles/", children: /* @__PURE__ */ i.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 24px", cursor: "pointer", height: "100%" }, children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ i.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ i.jsx(c1, { className: "w-4 h-4", style: { color: "#0b3a7a" } }) }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "Browse Articles" }),
          /* @__PURE__ */ i.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Expert analysis and insights" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ i.jsx(Zn, { href: "/nfl/players", children: /* @__PURE__ */ i.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 24px", cursor: "pointer", height: "100%" }, children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ i.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ i.jsx(Er, { className: "w-4 h-4", style: { color: "#0b3a7a" } }) }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "Search Players" }),
          /* @__PURE__ */ i.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Find and compare players" })
        ] })
      ] }) }) })
    ] })
  ] });
}
function fj() {
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("div", { className: "bg-slate-50 dark:bg-[#0B1634] border-b-2 border-slate-200 dark:border-slate-700", children: /* @__PURE__ */ i.jsx("div", { className: "max-w-7xl mx-auto px-4 py-10", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-6 flex-wrap", children: [
      /* @__PURE__ */ i.jsx(be, { className: "w-24 h-24 md:w-40 md:h-40 rounded-md" }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx(be, { className: "h-4 w-16 mb-2" }),
        /* @__PURE__ */ i.jsx(be, { className: "h-9 w-56 mb-3" }),
        /* @__PURE__ */ i.jsx(be, { className: "h-[2px] w-20 mb-4" }),
        /* @__PURE__ */ i.jsx(be, { className: "h-5 w-40" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ i.jsx("div", { className: "flex gap-2 mb-6 flex-wrap", children: Array.from({ length: 5 }).map((t, r) => /* @__PURE__ */ i.jsx(be, { className: "h-9 w-24 rounded-md" }, r)) }),
      /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: Array.from({ length: 4 }).map((t, r) => /* @__PURE__ */ i.jsx(be, { className: "h-20 rounded-md" }, r)) }),
      /* @__PURE__ */ i.jsx(be, { className: "h-40 rounded-md" })
    ] })
  ] });
}
function pj({ format: t, onChange: r }) {
  const o = ["standard", "half", "ppr"];
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-scoring", "data-testid": "scoring-format-toggle", children: [
    /* @__PURE__ */ i.jsx("span", { className: "sc-scoring__label", children: "Scoring" }),
    /* @__PURE__ */ i.jsx("div", { className: "sc-segment", role: "group", "aria-label": "Scoring format", children: o.map((l) => /* @__PURE__ */ i.jsx(
      "button",
      {
        type: "button",
        className: `sc-segment__btn ${t === l ? "sc-segment__btn--active" : ""}`,
        onClick: () => r(l),
        "data-testid": `button-format-${l}`,
        children: w1[l]
      },
      l
    )) })
  ] });
}
function Rp() {
  const r = Zp().slug, [o, l] = b.useState("overview"), [c, u] = b.useState("ppr"), { data: f, isLoading: h, error: m } = Mt({
    queryKey: ["/api/players", r, { format: c }],
    queryFn: () => fetch(`/api/players/${r}?format=${c}`).then((D) => D.json())
  }), { data: y } = Mt({
    queryKey: ["/api/players", r, "related", { format: c }],
    queryFn: () => fetch(`/api/players/${r}/related?format=${c}`).then((D) => D.json()),
    enabled: !!f
  }), [g, v] = b.useState(null), [w, S] = b.useState(!1), [P, k] = b.useState(!1), j = b.useRef(null), [A, _] = b.useState({}), C = b.useRef(null), [F, U] = b.useState(2025), H = f?.position?.toLowerCase(), { data: Y, isLoading: X } = Mt({
    queryKey: ["/api/advanced-stats", H, F, f?.id],
    queryFn: () => yb(f.id, f.position || "", F),
    enabled: o === "advanced" && !!f?.id && !!f?.position && ["QB", "RB", "WR", "TE"].includes(f.position || ""),
    staleTime: 1e3 * 60 * 60
  });
  if (b.useEffect(() => {
    l("overview"), v(null), k(!1), j.current = null, _({}), C.current = null;
  }, [r]), b.useEffect(() => {
    if (o !== "injury" || !f?.id || !f?.name) return;
    const D = f.id;
    j.current !== D && (j.current = D, S(!0), k(!1), Ck(f.id, f.name).then((E) => {
      v(E), S(!1);
    }).catch(() => {
      k(!0), S(!1);
    }));
  }, [o, f?.id, f?.name]), b.useEffect(() => {
    if (o !== "injury" || !f?.id || !g) return;
    const D = Array.from(
      /* @__PURE__ */ new Set([
        ...g.nfl.map((le) => le.season),
        ...f.availableSeasons ?? []
      ])
    ).filter((le) => Number.isFinite(le));
    if (D.length === 0) return;
    const E = `${f.id}|${D.slice().sort().join(",")}`;
    if (C.current === E) return;
    C.current = E;
    const B = f.id;
    let ce = !1;
    return Promise.all(
      D.map(
        (le) => g1(B, le, "regular").then((pe) => {
          const ve = pe.filter(
            (me) => (me.passAtt || 0) + (me.rushAtt || 0) + (me.tgt || 0) + (me.rec || 0) + (me.passYd || 0) + (me.rushYd || 0) + (me.recYd || 0) > 0
          ).map((me) => me.week);
          return [le, ve];
        }).catch(() => [le, []])
      )
    ).then((le) => {
      if (ce) return;
      const pe = {};
      for (const [ve, me] of le) me.length && (pe[ve] = me);
      _(pe);
    }), () => {
      ce = !0;
    };
  }, [o, f?.id, g, f?.availableSeasons]), b.useEffect(() => {
    if (!f) return;
    document.title = `${f.name} Fantasy Football Stats, Rankings & Analysis | StatChasers`;
    const D = `View ${f.name} fantasy football stats, trends, rankings, projections, and analysis. Updated for ${f.season} NFL season.`, E = `https://statchasers.com/nfl/players/${f.slug}/`;
    let B = document.querySelector('meta[name="description"]');
    B || (B = document.createElement("meta"), B.setAttribute("name", "description"), document.head.appendChild(B)), B.setAttribute("content", D);
    let ce = document.querySelector('link[rel="canonical"]');
    ce || (ce = document.createElement("link"), ce.setAttribute("rel", "canonical"), document.head.appendChild(ce)), ce.setAttribute("href", E);
    const le = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: f.name,
      sport: "American Football",
      url: E
    };
    f.team && f.team !== "FA" && (le.affiliation = { "@type": "SportsTeam", name: f.team });
    let pe = document.getElementById("sc-jsonld");
    return pe || (pe = document.createElement("script"), pe.id = "sc-jsonld", pe.setAttribute("type", "application/ld+json"), document.head.appendChild(pe)), pe.textContent = JSON.stringify(le), () => {
      document.title = "StatChasers", B?.setAttribute("content", ""), ce?.setAttribute("href", ""), pe?.remove();
    };
  }, [f]), h)
    return /* @__PURE__ */ i.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ i.jsx(Tl, {}),
      /* @__PURE__ */ i.jsx(fj, {})
    ] });
  if (m || !f)
    return /* @__PURE__ */ i.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ i.jsx(Tl, {}),
      /* @__PURE__ */ i.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-16 text-center", children: [
        /* @__PURE__ */ i.jsx(p1, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ i.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2", "data-testid": "text-not-found", children: "Player Not Found" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground mb-6", children: "We couldn't find a player with that profile. They may not be in our database." }),
        /* @__PURE__ */ i.jsx(Zn, { href: "/nfl/players", children: /* @__PURE__ */ i.jsxs(Yh, { "data-testid": "button-search-again", children: [
          /* @__PURE__ */ i.jsx(Er, { className: "w-4 h-4 mr-2" }),
          "Search Players"
        ] }) })
      ] })
    ] });
  const se = f.team && jc[f.team] || "#6B7280", ne = f.team ? Kl[f.team] || f.team : "Free Agent", ie = f.position ? x1[f.position] || f.position : "", Q = f, z = f.gameLog || [], Z = f.name.trim().split(/\s+/), ge = Z.slice(0, -1).join(" ").toUpperCase(), fe = Z.slice(-1)[0].toUpperCase();
  f.position;
  const M = (f.bio?.snapshot_bullets ?? []).find((D) => /^Drafted\b/.test(D)) ?? null, L = [
    f.age ? `Age ${f.age}` : null,
    f.height ? Rk(f.height) : null,
    f.weight ? `${f.weight} lbs` : null,
    f.years_exp != null ? `Exp ${f.years_exp} yr${f.years_exp !== 1 ? "s" : ""}` : null
  ].filter(Boolean).join("  ·  "), K = Ak(se);
  return /* @__PURE__ */ i.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ i.jsx(Tl, { scoringControl: /* @__PURE__ */ i.jsx(pj, { format: c, onChange: u }) }),
    /* @__PURE__ */ i.jsx(
      "section",
      {
        className: "max-w-7xl mx-auto px-4 pt-4 pb-2",
        "data-testid": "section-player-header",
        children: /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "relative overflow-hidden rounded-2xl border shadow-sm bg-white dark:bg-[#0B1634]",
            style: { borderColor: "rgba(11,58,122,0.10)" },
            children: [
              /* @__PURE__ */ i.jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(135deg, rgba(11,58,122,0.05) 0%, rgba(255,255,255,0) 60%)" } }),
              /* @__PURE__ */ i.jsx("div", { className: "absolute inset-0 hidden dark:block", style: { background: "linear-gradient(135deg, #0B1634 0%, #111D42 40%, #0F172A 100%)" } }),
              /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[3px]", style: { background: `linear-gradient(90deg, transparent 0%, ${se}88 20%, ${se} 50%, ${se}88 80%, transparent 100%)` } }),
              /* @__PURE__ */ i.jsx("div", { className: "relative px-4 sm:px-6 pt-0 pb-1", children: /* @__PURE__ */ i.jsxs(
                "div",
                {
                  className: "player-hero",
                  style: { "--team-color": se, "--team-rgb": K },
                  children: [
                    /* @__PURE__ */ i.jsx(Lk, { playerId: f.id, name: f.name, teamColor: se, team: f.team || void 0 }),
                    /* @__PURE__ */ i.jsxs("div", { className: "player-identity", children: [
                      ge && /* @__PURE__ */ i.jsx("p", { className: "player-first-name", children: ge }),
                      /* @__PURE__ */ i.jsx("h1", { className: "player-last-name", "data-testid": "text-player-name", children: fe }),
                      /* @__PURE__ */ i.jsxs("p", { className: "player-team-line", "data-testid": "text-team", children: [
                        ne,
                        f.number ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                          " · #",
                          f.number
                        ] }) : null,
                        ie ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                          " · ",
                          ie
                        ] }) : null
                      ] }),
                      L && /* @__PURE__ */ i.jsx("p", { className: "player-meta-line", "data-testid": "text-player-meta", children: L }),
                      M && /* @__PURE__ */ i.jsx("p", { className: "player-draft-line", "data-testid": "text-player-drafted", children: M }),
                      /* @__PURE__ */ i.jsx("div", { "data-testid": "text-player-status", children: f.injury_status ? /* @__PURE__ */ i.jsxs("span", { className: "player-status player-status--warn", children: [
                        /* @__PURE__ */ i.jsx("span", { className: "player-status-dot", style: { background: "#f59e0b" } }),
                        f.injury_status
                      ] }) : /* @__PURE__ */ i.jsxs("span", { className: "player-status player-status--active", children: [
                        /* @__PURE__ */ i.jsx("span", { className: "player-status-dot", style: { background: "#10b981" } }),
                        f.status || "Active"
                      ] }) })
                    ] }),
                    f.team && /* @__PURE__ */ i.jsx(
                      "img",
                      {
                        src: `https://sleepercdn.com/images/team_logos/nfl/${f.team.toLowerCase()}.png`,
                        alt: "",
                        "aria-hidden": "true",
                        className: "team-watermark"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsx("div", { className: "border-b", style: { background: "rgba(255,255,255,0.97)", borderColor: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ i.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ i.jsx(
      "nav",
      {
        className: "flex gap-0.5 overflow-x-auto -mb-px scrollbar-hide",
        style: { WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" },
        "data-testid": "profile-tabs",
        children: Tk.map((D) => {
          const E = o === D.key;
          return /* @__PURE__ */ i.jsxs(
            "button",
            {
              onClick: () => l(D.key),
              className: "relative",
              style: {
                fontWeight: E ? 700 : 500,
                fontSize: "13px",
                lineHeight: "1.2",
                padding: "14px 18px",
                color: E ? "#0b3a7a" : "#94a3b8",
                transition: "color 0.2s ease",
                cursor: "pointer",
                background: "none",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: 0,
                boxShadow: "none",
                outline: "none",
                flex: "none",
                display: "inline-block",
                whiteSpace: "nowrap",
                margin: 0,
                verticalAlign: "bottom",
                textTransform: "none",
                letterSpacing: "normal",
                textDecoration: "none",
                appearance: "none",
                WebkitAppearance: "none"
              },
              onMouseEnter: (B) => {
                E || (B.currentTarget.style.color = "#0b3a7a");
              },
              onMouseLeave: (B) => {
                E || (B.currentTarget.style.color = "#94a3b8");
              },
              "data-testid": `tab-${D.key}`,
              children: [
                D.label,
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: "absolute bottom-0 left-1 right-1 sm:left-2 sm:right-2 rounded-full",
                    style: {
                      height: E ? "3px" : "0px",
                      background: "linear-gradient(90deg, #F5C01A, #FFD166, #F5C01A)",
                      opacity: E ? 1 : 0,
                      transform: E ? "scaleX(1)" : "scaleX(0.3)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }
                  }
                )
              ]
            },
            D.key
          );
        })
      }
    ) }) }),
    /* @__PURE__ */ i.jsxs("main", { className: "max-w-7xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ i.jsxs(
        "div",
        {
          className: "animate-in fade-in duration-300",
          style: { animation: "fadeSlideIn 0.3s ease-out" },
          children: [
            o === "overview" && /* @__PURE__ */ i.jsx(zk, { player: Q, entries: z, format: c }),
            o === "gamelog" && /* @__PURE__ */ i.jsx(qk, { player: Q, format: c }),
            o === "advanced" && /* @__PURE__ */ i.jsx(
              W1,
              {
                adv: Y ?? null,
                advLoading: X,
                pos: f.position || "",
                season: F,
                onSeasonChange: U
              }
            ),
            o === "rankings" && /* @__PURE__ */ i.jsx(aj, { player: f }),
            o === "injury" && /* @__PURE__ */ i.jsx(
              Sk,
              {
                injury: g,
                loading: w,
                error: P,
                playerName: f.name,
                knownSeasons: Q.availableSeasons ?? [],
                weeklyPlayed: A
              }
            ),
            o === "news" && /* @__PURE__ */ i.jsx(dj, { player: f })
          ]
        },
        o
      ),
      y && y.neighbors && y.neighbors.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: /* @__PURE__ */ i.jsxs("h2", { className: "text-lg font-semibold text-foreground", "data-testid": "text-related-heading", children: [
          "Rank Neighbors (",
          f.position,
          ")"
        ] }) }),
        /* @__PURE__ */ i.jsxs("p", { className: "text-xs text-muted-foreground mb-4", "data-testid": "text-related-subtitle", children: [
          "Based on ",
          y.season,
          " ",
          y.format.toUpperCase(),
          " season rank · Showing ",
          f.position,
          Math.min(...y.neighbors.map((D) => D.posRank)),
          "–",
          f.position,
          Math.max(...y.neighbors.map((D) => D.posRank))
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: y.neighbors.map((D) => /* @__PURE__ */ i.jsx(Zn, { href: `/nfl/players/${D.slug}/`, children: /* @__PURE__ */ i.jsx("div", { className: "sc-card hover-elevate", style: { padding: "12px 16px", cursor: "pointer", height: "100%" }, "data-testid": `card-related-${D.slug}`, children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ i.jsx(Ok, { playerId: D.id, name: D.name, teamAbbr: D.team }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsx("p", { style: { fontWeight: 600, fontSize: "14px", color: "#0b3a7a" }, className: "truncate", children: D.name }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 flex-wrap", children: [
              /* @__PURE__ */ i.jsxs("span", { style: { fontSize: "10px", fontWeight: 700, color: "#1a4fa0" }, children: [
                D.position,
                D.posRank
              ] }),
              /* @__PURE__ */ i.jsx("span", { style: { fontSize: "12px", color: "#94a3b8" }, children: "·" }),
              /* @__PURE__ */ i.jsx("span", { style: { fontSize: "12px", color: "#94a3b8" }, children: D.team })
            ] })
          ] })
        ] }) }) }, D.id)) })
      ] })
    ] })
  ] });
}
const ri = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  "div",
  {
    ref: o,
    className: vt(
      "shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm",
      t
    ),
    ...r
  }
));
ri.displayName = "Card";
const hj = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  "div",
  {
    ref: o,
    className: vt("flex flex-col space-y-1.5 p-6", t),
    ...r
  }
));
hj.displayName = "CardHeader";
const mj = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  "div",
  {
    ref: o,
    className: vt(
      "text-2xl font-semibold leading-none tracking-tight",
      t
    ),
    ...r
  }
));
mj.displayName = "CardTitle";
const gj = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  "div",
  {
    ref: o,
    className: vt("text-sm text-muted-foreground", t),
    ...r
  }
));
gj.displayName = "CardDescription";
const si = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx("div", { ref: o, className: vt("p-6 pt-0", t), ...r }));
si.displayName = "CardContent";
const yj = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  "div",
  {
    ref: o,
    className: vt("flex items-center p-6 pt-0", t),
    ...r
  }
));
yj.displayName = "CardFooter";
// @__NO_SIDE_EFFECTS__
function Tp(t) {
  const r = /* @__PURE__ */ xj(t), o = b.forwardRef((l, c) => {
    const { children: u, ...f } = l, h = b.Children.toArray(u), m = h.find(wj);
    if (m) {
      const y = m.props.children, g = h.map((v) => v === m ? b.Children.count(y) > 1 ? b.Children.only(null) : b.isValidElement(y) ? y.props.children : null : v);
      return /* @__PURE__ */ i.jsx(r, { ...f, ref: c, children: b.isValidElement(y) ? b.cloneElement(y, void 0, g) : null });
    }
    return /* @__PURE__ */ i.jsx(r, { ...f, ref: c, children: u });
  });
  return o.displayName = `${t}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function xj(t) {
  const r = b.forwardRef((o, l) => {
    const { children: c, ...u } = o;
    if (b.isValidElement(c)) {
      const f = kj(c), h = bj(u, c.props);
      return c.type !== b.Fragment && (h.ref = l ? vi(l, f) : f), b.cloneElement(c, h);
    }
    return b.Children.count(c) > 1 ? b.Children.only(null) : null;
  });
  return r.displayName = `${t}.SlotClone`, r;
}
var vj = /* @__PURE__ */ Symbol("radix.slottable");
function wj(t) {
  return b.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === vj;
}
function bj(t, r) {
  const o = { ...r };
  for (const l in r) {
    const c = t[l], u = r[l];
    /^on[A-Z]/.test(l) ? c && u ? o[l] = (...h) => {
      const m = u(...h);
      return c(...h), m;
    } : c && (o[l] = c) : l === "style" ? o[l] = { ...c, ...u } : l === "className" && (o[l] = [c, u].filter(Boolean).join(" "));
  }
  return { ...t, ...o };
}
function kj(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
function jj(t) {
  const r = t + "CollectionProvider", [o, l] = Os(r), [c, u] = o(
    r,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), f = (k) => {
    const { scope: j, children: A } = k, _ = En.useRef(null), C = En.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ i.jsx(c, { scope: j, itemMap: C, collectionRef: _, children: A });
  };
  f.displayName = r;
  const h = t + "CollectionSlot", m = /* @__PURE__ */ Tp(h), y = En.forwardRef(
    (k, j) => {
      const { scope: A, children: _ } = k, C = u(h, A), F = Yt(j, C.collectionRef);
      return /* @__PURE__ */ i.jsx(m, { ref: F, children: _ });
    }
  );
  y.displayName = h;
  const g = t + "CollectionItemSlot", v = "data-radix-collection-item", w = /* @__PURE__ */ Tp(g), S = En.forwardRef(
    (k, j) => {
      const { scope: A, children: _, ...C } = k, F = En.useRef(null), U = Yt(j, F), H = u(g, A);
      return En.useEffect(() => (H.itemMap.set(F, { ref: F, ...C }), () => {
        H.itemMap.delete(F);
      })), /* @__PURE__ */ i.jsx(w, { [v]: "", ref: U, children: _ });
    }
  );
  S.displayName = g;
  function P(k) {
    const j = u(t + "CollectionConsumer", k);
    return En.useCallback(() => {
      const _ = j.collectionRef.current;
      if (!_) return [];
      const C = Array.from(_.querySelectorAll(`[${v}]`));
      return Array.from(j.itemMap.values()).sort(
        (H, Y) => C.indexOf(H.ref.current) - C.indexOf(Y.ref.current)
      );
    }, [j.collectionRef, j.itemMap]);
  }
  return [
    { Provider: f, Slot: y, ItemSlot: S },
    P,
    l
  ];
}
var Nj = b.createContext(void 0);
function jm(t) {
  const r = b.useContext(Nj);
  return t || r || "ltr";
}
var Ll = "rovingFocusGroup.onEntryFocus", Sj = { bubbles: !1, cancelable: !0 }, Fs = "RovingFocusGroup", [Zl, Nm, _j] = jj(Fs), [Cj, Sm] = Os(
  Fs,
  [_j]
), [Pj, Ej] = Cj(Fs), _m = b.forwardRef(
  (t, r) => /* @__PURE__ */ i.jsx(Zl.Provider, { scope: t.__scopeRovingFocusGroup, children: /* @__PURE__ */ i.jsx(Zl.Slot, { scope: t.__scopeRovingFocusGroup, children: /* @__PURE__ */ i.jsx(Rj, { ...t, ref: r }) }) })
);
_m.displayName = Fs;
var Rj = b.forwardRef((t, r) => {
  const {
    __scopeRovingFocusGroup: o,
    orientation: l,
    loop: c = !1,
    dir: u,
    currentTabStopId: f,
    defaultCurrentTabStopId: h,
    onCurrentTabStopIdChange: m,
    onEntryFocus: y,
    preventScrollOnEntryFocus: g = !1,
    ...v
  } = t, w = b.useRef(null), S = Yt(r, w), P = jm(u), [k, j] = Ph({
    prop: f,
    defaultProp: h ?? null,
    onChange: m,
    caller: Fs
  }), [A, _] = b.useState(!1), C = Ms(y), F = Nm(o), U = b.useRef(!1), [H, Y] = b.useState(0);
  return b.useEffect(() => {
    const X = w.current;
    if (X)
      return X.addEventListener(Ll, C), () => X.removeEventListener(Ll, C);
  }, [C]), /* @__PURE__ */ i.jsx(
    Pj,
    {
      scope: o,
      orientation: l,
      dir: P,
      loop: c,
      currentTabStopId: k,
      onItemFocus: b.useCallback(
        (X) => j(X),
        [j]
      ),
      onItemShiftTab: b.useCallback(() => _(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => Y((X) => X + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => Y((X) => X - 1),
        []
      ),
      children: /* @__PURE__ */ i.jsx(
        xt.div,
        {
          tabIndex: A || H === 0 ? -1 : 0,
          "data-orientation": l,
          ...v,
          ref: S,
          style: { outline: "none", ...t.style },
          onMouseDown: Ye(t.onMouseDown, () => {
            U.current = !0;
          }),
          onFocus: Ye(t.onFocus, (X) => {
            const se = !U.current;
            if (X.target === X.currentTarget && se && !A) {
              const ne = new CustomEvent(Ll, Sj);
              if (X.currentTarget.dispatchEvent(ne), !ne.defaultPrevented) {
                const ie = F().filter((fe) => fe.focusable), Q = ie.find((fe) => fe.active), z = ie.find((fe) => fe.id === k), ge = [Q, z, ...ie].filter(
                  Boolean
                ).map((fe) => fe.ref.current);
                Em(ge, g);
              }
            }
            U.current = !1;
          }),
          onBlur: Ye(t.onBlur, () => _(!1))
        }
      )
    }
  );
}), Cm = "RovingFocusGroupItem", Pm = b.forwardRef(
  (t, r) => {
    const {
      __scopeRovingFocusGroup: o,
      focusable: l = !0,
      active: c = !1,
      tabStopId: u,
      children: f,
      ...h
    } = t, m = oh(), y = u || m, g = Ej(Cm, o), v = g.currentTabStopId === y, w = Nm(o), { onFocusableItemAdd: S, onFocusableItemRemove: P, currentTabStopId: k } = g;
    return b.useEffect(() => {
      if (l)
        return S(), () => P();
    }, [l, S, P]), /* @__PURE__ */ i.jsx(
      Zl.ItemSlot,
      {
        scope: o,
        id: y,
        focusable: l,
        active: c,
        children: /* @__PURE__ */ i.jsx(
          xt.span,
          {
            tabIndex: v ? 0 : -1,
            "data-orientation": g.orientation,
            ...h,
            ref: r,
            onMouseDown: Ye(t.onMouseDown, (j) => {
              l ? g.onItemFocus(y) : j.preventDefault();
            }),
            onFocus: Ye(t.onFocus, () => g.onItemFocus(y)),
            onKeyDown: Ye(t.onKeyDown, (j) => {
              if (j.key === "Tab" && j.shiftKey) {
                g.onItemShiftTab();
                return;
              }
              if (j.target !== j.currentTarget) return;
              const A = Lj(j, g.orientation, g.dir);
              if (A !== void 0) {
                if (j.metaKey || j.ctrlKey || j.altKey || j.shiftKey) return;
                j.preventDefault();
                let C = w().filter((F) => F.focusable).map((F) => F.ref.current);
                if (A === "last") C.reverse();
                else if (A === "prev" || A === "next") {
                  A === "prev" && C.reverse();
                  const F = C.indexOf(j.currentTarget);
                  C = g.loop ? Oj(C, F + 1) : C.slice(F + 1);
                }
                setTimeout(() => Em(C));
              }
            }),
            children: typeof f == "function" ? f({ isCurrentTabStop: v, hasTabStop: k != null }) : f
          }
        )
      }
    );
  }
);
Pm.displayName = Cm;
var Tj = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Aj(t, r) {
  return r !== "rtl" ? t : t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function Lj(t, r, o) {
  const l = Aj(t.key, o);
  if (!(r === "vertical" && ["ArrowLeft", "ArrowRight"].includes(l)) && !(r === "horizontal" && ["ArrowUp", "ArrowDown"].includes(l)))
    return Tj[l];
}
function Em(t, r = !1) {
  const o = document.activeElement;
  for (const l of t)
    if (l === o || (l.focus({ preventScroll: r }), document.activeElement !== o)) return;
}
function Oj(t, r) {
  return t.map((o, l) => t[(r + l) % t.length]);
}
var Mj = _m, Ij = Pm, _i = "Tabs", [$j] = Os(_i, [
  Sm
]), Rm = Sm(), [Fj, Rc] = $j(_i), Tm = b.forwardRef(
  (t, r) => {
    const {
      __scopeTabs: o,
      value: l,
      onValueChange: c,
      defaultValue: u,
      orientation: f = "horizontal",
      dir: h,
      activationMode: m = "automatic",
      ...y
    } = t, g = jm(h), [v, w] = Ph({
      prop: l,
      onChange: c,
      defaultProp: u ?? "",
      caller: _i
    });
    return /* @__PURE__ */ i.jsx(
      Fj,
      {
        scope: o,
        baseId: oh(),
        value: v,
        onValueChange: w,
        orientation: f,
        dir: g,
        activationMode: m,
        children: /* @__PURE__ */ i.jsx(
          xt.div,
          {
            dir: g,
            "data-orientation": f,
            ...y,
            ref: r
          }
        )
      }
    );
  }
);
Tm.displayName = _i;
var Am = "TabsList", Lm = b.forwardRef(
  (t, r) => {
    const { __scopeTabs: o, loop: l = !0, ...c } = t, u = Rc(Am, o), f = Rm(o);
    return /* @__PURE__ */ i.jsx(
      Mj,
      {
        asChild: !0,
        ...f,
        orientation: u.orientation,
        dir: u.dir,
        loop: l,
        children: /* @__PURE__ */ i.jsx(
          xt.div,
          {
            role: "tablist",
            "aria-orientation": u.orientation,
            ...c,
            ref: r
          }
        )
      }
    );
  }
);
Lm.displayName = Am;
var Om = "TabsTrigger", Mm = b.forwardRef(
  (t, r) => {
    const { __scopeTabs: o, value: l, disabled: c = !1, ...u } = t, f = Rc(Om, o), h = Rm(o), m = Fm(f.baseId, l), y = Dm(f.baseId, l), g = l === f.value;
    return /* @__PURE__ */ i.jsx(
      Ij,
      {
        asChild: !0,
        ...h,
        focusable: !c,
        active: g,
        children: /* @__PURE__ */ i.jsx(
          xt.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": g,
            "aria-controls": y,
            "data-state": g ? "active" : "inactive",
            "data-disabled": c ? "" : void 0,
            disabled: c,
            id: m,
            ...u,
            ref: r,
            onMouseDown: Ye(t.onMouseDown, (v) => {
              !c && v.button === 0 && v.ctrlKey === !1 ? f.onValueChange(l) : v.preventDefault();
            }),
            onKeyDown: Ye(t.onKeyDown, (v) => {
              [" ", "Enter"].includes(v.key) && f.onValueChange(l);
            }),
            onFocus: Ye(t.onFocus, () => {
              const v = f.activationMode !== "manual";
              !g && !c && v && f.onValueChange(l);
            })
          }
        )
      }
    );
  }
);
Mm.displayName = Om;
var Im = "TabsContent", $m = b.forwardRef(
  (t, r) => {
    const { __scopeTabs: o, value: l, forceMount: c, children: u, ...f } = t, h = Rc(Im, o), m = Fm(h.baseId, l), y = Dm(h.baseId, l), g = l === h.value, v = b.useRef(g);
    return b.useEffect(() => {
      const w = requestAnimationFrame(() => v.current = !1);
      return () => cancelAnimationFrame(w);
    }, []), /* @__PURE__ */ i.jsx(mc, { present: c || g, children: ({ present: w }) => /* @__PURE__ */ i.jsx(
      xt.div,
      {
        "data-state": g ? "active" : "inactive",
        "data-orientation": h.orientation,
        role: "tabpanel",
        "aria-labelledby": m,
        hidden: !w,
        id: y,
        tabIndex: 0,
        ...f,
        ref: r,
        style: {
          ...t.style,
          animationDuration: v.current ? "0s" : void 0
        },
        children: w && u
      }
    ) });
  }
);
$m.displayName = Im;
function Fm(t, r) {
  return `${t}-trigger-${r}`;
}
function Dm(t, r) {
  return `${t}-content-${r}`;
}
var Dj = Tm, Bm = Lm, zm = Mm, Um = $m;
const Bj = Dj, zj = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  Bm,
  {
    ref: o,
    className: vt(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      t
    ),
    ...r
  }
));
zj.displayName = Bm.displayName;
const Uj = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  zm,
  {
    ref: o,
    className: vt(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      t
    ),
    ...r
  }
));
Uj.displayName = zm.displayName;
const Wm = b.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ i.jsx(
  Um,
  {
    ref: o,
    className: vt(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      t
    ),
    ...r
  }
));
Wm.displayName = Um.displayName;
const Hm = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def"
}, Tc = {
  ARI: "#97233F",
  ATL: "#A71930",
  BAL: "#241773",
  BUF: "#00338D",
  CAR: "#0085CA",
  CHI: "#0B162A",
  CIN: "#FB4F14",
  CLE: "#311D00",
  DAL: "#003594",
  DEN: "#FB4F14",
  DET: "#0076B6",
  GB: "#203731",
  HOU: "#03202F",
  IND: "#002C5F",
  JAX: "#006778",
  KC: "#E31837",
  LAC: "#0080C6",
  LAR: "#003594",
  LV: "#A5ACAF",
  MIA: "#008E97",
  MIN: "#4F2683",
  NE: "#002244",
  NO: "#D3BC8D",
  NYG: "#0B2265",
  NYJ: "#125740",
  PHI: "#004C54",
  PIT: "#FFB612",
  SEA: "#002244",
  SF: "#AA0000",
  TB: "#D50A0A",
  TEN: "#0C2340",
  WAS: "#5A1414"
}, Ac = {
  ARI: "Cardinals",
  ATL: "Falcons",
  BAL: "Ravens",
  BUF: "Bills",
  CAR: "Panthers",
  CHI: "Bears",
  CIN: "Bengals",
  CLE: "Browns",
  DAL: "Cowboys",
  DEN: "Broncos",
  DET: "Lions",
  GB: "Packers",
  HOU: "Texans",
  IND: "Colts",
  JAX: "Jaguars",
  KC: "Chiefs",
  LAC: "Chargers",
  LAR: "Rams",
  LV: "Raiders",
  MIA: "Dolphins",
  MIN: "Vikings",
  NE: "Patriots",
  NO: "Saints",
  NYG: "Giants",
  NYJ: "Jets",
  PHI: "Eagles",
  PIT: "Steelers",
  SEA: "Seahawks",
  SF: "49ers",
  TB: "Buccaneers",
  TEN: "Titans",
  WAS: "Commanders"
}, Wj = {
  ARI: "Arizona",
  ATL: "Atlanta",
  BAL: "Baltimore",
  BUF: "Buffalo",
  CAR: "Carolina",
  CHI: "Chicago",
  CIN: "Cincinnati",
  CLE: "Cleveland",
  DAL: "Dallas",
  DEN: "Denver",
  DET: "Detroit",
  GB: "Green Bay",
  HOU: "Houston",
  IND: "Indianapolis",
  JAX: "Jacksonville",
  KC: "Kansas City",
  LAC: "Los Angeles",
  LAR: "Los Angeles",
  LV: "Las Vegas",
  MIA: "Miami",
  MIN: "Minnesota",
  NE: "New England",
  NO: "New Orleans",
  NYG: "New York",
  NYJ: "New York",
  PHI: "Philadelphia",
  PIT: "Pittsburgh",
  SEA: "Seattle",
  SF: "San Francisco",
  TB: "Tampa Bay",
  TEN: "Tennessee",
  WAS: "Washington"
}, Hj = 2025, Vm = {
  AFC: {
    East: ["BUF", "MIA", "NE", "NYJ"],
    North: ["BAL", "CIN", "CLE", "PIT"],
    South: ["HOU", "IND", "JAX", "TEN"],
    West: ["DEN", "KC", "LAC", "LV"]
  },
  NFC: {
    East: ["DAL", "NYG", "PHI", "WAS"],
    North: ["CHI", "DET", "GB", "MIN"],
    South: ["ATL", "CAR", "NO", "TB"],
    West: ["ARI", "LAR", "SEA", "SF"]
  }
}, Cs = ["QB", "RB", "WR", "TE"], Vj = {
  QB: "Quarterbacks",
  RB: "Running Backs",
  WR: "Wide Receivers",
  TE: "Tight Ends"
}, Yj = {
  QB: 2,
  RB: 4,
  WR: 6,
  TE: 3
};
function Gj(t) {
  for (const [r, o] of Object.entries(Vm))
    for (const [l, c] of Object.entries(o))
      if (c.includes(t)) return `${r} ${l}`;
  return "";
}
function Ym(t, r) {
  const o = (t.status || "").toLowerCase();
  if (/injured reserve|\bir\b|\bpup\b|out|suspend|non[- ]football|did not|inactive|reserve/.test(o))
    return "IR";
  const l = parseInt(r.replace(/[^0-9]/g, "") || "1", 10);
  return l <= 1 ? "Starter" : l === 2 ? "Backup" : "Depth";
}
function Jl(t) {
  return `https://sleepercdn.com/images/team_logos/nfl/${t.toLowerCase()}.png`;
}
function Gm(t) {
  return `https://sleepercdn.com/content/nfl/players/thumb/${t}.jpg`;
}
function Qj({
  team: t,
  onClick: r
}) {
  const o = Tc[t] || "#666", l = Ac[t] || t;
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: "sc-team-tile",
      style: { "--tile-color": o },
      onClick: r,
      "data-testid": `tile-team-${t}`,
      children: [
        /* @__PURE__ */ i.jsx("div", { className: "sc-team-tile__accent", style: { backgroundColor: o } }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-team-tile__logo", children: /* @__PURE__ */ i.jsx(
          "img",
          {
            src: Jl(t),
            alt: `${t} ${l} logo`,
            loading: "lazy",
            "data-testid": `img-team-logo-${t}`
          }
        ) }),
        /* @__PURE__ */ i.jsxs("div", { className: "sc-team-tile__meta", children: [
          /* @__PURE__ */ i.jsx("div", { className: "sc-team-tile__abbr", "data-testid": `text-team-abbr-${t}`, children: t }),
          /* @__PURE__ */ i.jsx("div", { className: "sc-team-tile__name", "data-testid": `text-team-name-${t}`, children: l })
        ] }),
        /* @__PURE__ */ i.jsx(vc, { className: "sc-team-tile__arrow" })
      ]
    }
  );
}
function Ap({
  player: t,
  pos: r,
  depthLabel: o,
  onClick: l
}) {
  const c = Ym(t, o), u = c.toLowerCase(), f = t.years_exp === 0;
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `sc-card sc-card--${r.toLowerCase()} sc-card--role-${u}`,
      onClick: l,
      "data-testid": `card-player-${t.slug}`,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "sc-card__img", children: [
          /* @__PURE__ */ i.jsx(
            "img",
            {
              src: Gm(t.id),
              alt: t.name,
              loading: "lazy",
              onError: (h) => {
                const m = h.currentTarget;
                m.onerror = null, m.style.display = "none", m.parentElement?.classList.add("sc-card__img--fallback");
              },
              "data-testid": `img-headshot-${t.slug}`
            }
          ),
          /* @__PURE__ */ i.jsx("div", { className: `sc-card__role sc-card__role--${u}`, "data-testid": `card-role-${t.slug}`, children: c }),
          /* @__PURE__ */ i.jsx("div", { className: "sc-card__fallback-initials", children: t.name.split(" ").map((h) => h[0]).join("") })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-card__gold" }),
        /* @__PURE__ */ i.jsxs("div", { className: "sc-card__body", children: [
          /* @__PURE__ */ i.jsx("div", { className: "sc-card__name", "data-testid": `card-name-${t.slug}`, children: t.name }),
          /* @__PURE__ */ i.jsxs("div", { className: "sc-card__meta", children: [
            /* @__PURE__ */ i.jsx("span", { className: Hm[r] || "", "data-testid": `card-depth-${t.slug}`, children: o }),
            /* @__PURE__ */ i.jsx("span", { className: "sc-card__tier", "data-testid": `card-tier-${t.slug}`, children: c }),
            f && /* @__PURE__ */ i.jsx("span", { className: "sc-card__rookie", "data-testid": `card-rookie-${t.slug}`, children: "Rookie" })
          ] })
        ] })
      ]
    }
  );
}
function Kj({
  team: t,
  positions: r,
  onBack: o
}) {
  const [, l] = ic(), [c, u] = b.useState(!1), f = Tc[t] || "#666", h = Ac[t] || t, y = `${Wj[t] || ""} ${h}`.trim(), g = Gj(t), v = b.useMemo(() => Cs.map((P) => {
    const k = r[P] || [], j = Yj[P] || 1, A = k.slice(0, j), _ = k.slice(j), C = A.reduce((F, U) => {
      const H = Ym(U, U.rank_label);
      return F[H] = (F[H] || 0) + 1, F;
    }, {});
    return { pos: P, starters: A, bench: _, roleCounts: C };
  }), [r]), w = v.reduce((P, k) => P + k.bench.length, 0), S = v.reduce((P, k) => P + k.starters.length, 0);
  return /* @__PURE__ */ i.jsxs("div", { className: "sc-board sc-directory", "data-testid": "team-board-view", children: [
    /* @__PURE__ */ i.jsx("div", { className: "sc-board__header", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-board__header-inner", children: [
      /* @__PURE__ */ i.jsxs(
        "button",
        {
          type: "button",
          className: "sc-board__back",
          onClick: o,
          "data-testid": "button-back-league",
          children: [
            /* @__PURE__ */ i.jsx(a1, { className: "w-3.5 h-3.5" }),
            "League View"
          ]
        }
      ),
      /* @__PURE__ */ i.jsxs(
        "div",
        {
          className: "sc-teamstrip",
          style: { "--team-color": f },
          "data-testid": "team-context-bar",
          children: [
            /* @__PURE__ */ i.jsx("img", { src: Jl(t), alt: "", className: "sc-teamstrip__watermark", "aria-hidden": "true" }),
            /* @__PURE__ */ i.jsxs("div", { className: "sc-teamstrip__main", children: [
              /* @__PURE__ */ i.jsx("img", { src: Jl(t), alt: "", className: "sc-teamstrip__logo" }),
              /* @__PURE__ */ i.jsxs("div", { className: "sc-teamstrip__id", children: [
                /* @__PURE__ */ i.jsx("h2", { className: "sc-teamstrip__name", "data-testid": "text-team-board-name", children: y }),
                /* @__PURE__ */ i.jsxs("div", { className: "sc-teamstrip__sub", "data-testid": "text-board-subtitle", children: [
                  /* @__PURE__ */ i.jsxs("span", { className: "sc-teamstrip__board", children: [
                    /* @__PURE__ */ i.jsx(Xh, { className: "w-3.5 h-3.5" }),
                    "Fantasy Roster Board"
                  ] }),
                  g && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                    /* @__PURE__ */ i.jsx("span", { className: "sc-teamstrip__dot" }),
                    g
                  ] }),
                  /* @__PURE__ */ i.jsx("span", { className: "sc-teamstrip__dot" }),
                  Hj,
                  " Season",
                  /* @__PURE__ */ i.jsx("span", { className: "sc-teamstrip__dot" }),
                  S,
                  " Fantasy-Relevant Players"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "sc-teamstrip__summary", "data-testid": "roster-summary", children: v.map(({ pos: P, starters: k }) => k.length > 0 && /* @__PURE__ */ i.jsxs("span", { className: `sc-teamstrip__chip sc-teamstrip__chip--${P.toLowerCase()}`, children: [
              /* @__PURE__ */ i.jsx("strong", { children: k.length }),
              " ",
              P
            ] }, P)) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "sc-board__wall", "data-testid": "board-grid", children: [
      v.map(({ pos: P, starters: k, roleCounts: j }) => k.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "sc-board__section", "data-testid": `board-section-${P}`, children: [
        /* @__PURE__ */ i.jsxs("h3", { className: "sc-board__section-title", children: [
          /* @__PURE__ */ i.jsx("span", { className: `sc-board__section-pos sc-board__section-pos--${P.toLowerCase()}`, children: P }),
          /* @__PURE__ */ i.jsxs("span", { className: "sc-board__section-count", children: [
            k.length,
            " ",
            k.length === 1 ? "Player" : "Players"
          ] }),
          ["Starter", "Backup", "Depth", "IR"].filter((A) => j[A]).map((A) => /* @__PURE__ */ i.jsxs("span", { className: "sc-board__section-role", children: [
            /* @__PURE__ */ i.jsx("span", { className: "sc-board__section-roledot" }),
            j[A],
            " ",
            A
          ] }, A))
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-board__cards", children: k.map((A) => /* @__PURE__ */ i.jsx(
          Ap,
          {
            player: A,
            pos: P,
            depthLabel: A.rank_label,
            onClick: () => l(`/nfl/players/${A.slug}/`)
          },
          A.slug
        )) })
      ] }, P)),
      w > 0 && /* @__PURE__ */ i.jsxs("div", { className: "sc-bench", "data-testid": "bench-section", children: [
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            className: "sc-bench__toggle",
            onClick: () => u(!c),
            "data-testid": "button-toggle-bench",
            children: [
              /* @__PURE__ */ i.jsx(vc, { className: `sc-bench__toggle-icon ${c ? "sc-bench__toggle-icon--open" : ""}` }),
              /* @__PURE__ */ i.jsx("span", { children: c ? "Hide Full Roster" : "Show Full Roster" }),
              /* @__PURE__ */ i.jsx("span", { className: "sc-bench__count", children: w })
            ]
          }
        ),
        c && /* @__PURE__ */ i.jsx("div", { className: "sc-bench__cards", "data-testid": "bench-list", children: v.map(
          ({ pos: P, bench: k }) => k.map((j) => /* @__PURE__ */ i.jsx(
            Ap,
            {
              player: j,
              pos: P,
              depthLabel: j.rank_label,
              onClick: () => l(`/nfl/players/${j.slug}/`)
            },
            j.slug
          ))
        ) })
      ] })
    ] })
  ] });
}
function Lp() {
  const [t, r] = b.useState(""), [o, l] = b.useState(() => {
    const M = new URLSearchParams(window.location.search).get("pos");
    return M && Cs.includes(M) ? M : "ALL";
  }), [c, u] = b.useState(!1), [f, h] = b.useState(-1), [m, y] = b.useState(() => {
    const M = new URLSearchParams(window.location.search).get("conf");
    return M === "NFC" || M === "AFC" ? M : "AFC";
  }), [g, v] = b.useState(!1), [w, S] = b.useState(null), P = b.useRef(null), k = b.useRef(null), j = b.useRef(null), A = b.useRef(null), [, _] = ic(), { data: C, isLoading: F } = Mt({
    queryKey: ["/api/players"]
  }), { data: U, isLoading: H } = Mt({
    queryKey: ["/api/indexed-players"]
  }), Y = t.trim().length > 0 || o !== "ALL", X = b.useMemo(() => {
    if (!U?.byTeam) return [];
    const M = [];
    for (const L of Object.values(U.byTeam))
      for (const K of Object.values(L))
        M.push(...K);
    return M;
  }, [U]), se = b.useMemo(() => {
    const M = {};
    for (const L of Cs)
      M[L] = X.filter((K) => K.position === L).length;
    return M;
  }, [X]), ne = b.useMemo(() => {
    if (!t.trim()) return [];
    const M = t.toLowerCase().trim(), L = X.filter((E) => E.name.toLowerCase().includes(M) || E.team.toLowerCase().includes(M)).slice(0, 8);
    if (L.length >= 4) return L;
    const K = new Set(L.map((E) => E.slug)), D = (C || []).filter((E) => !K.has(E.slug) && (E.name.toLowerCase().includes(M) || E.team.toLowerCase().includes(M))).slice(0, 8 - L.length);
    return [...L, ...D];
  }, [X, C, t]), ie = b.useMemo(() => {
    let M = X;
    if (o !== "ALL" && (M = M.filter((L) => L.position === o)), t.trim()) {
      const L = t.toLowerCase().trim();
      M = M.filter(
        (K) => K.name.toLowerCase().includes(L) || K.team.toLowerCase().includes(L)
      );
    }
    return M = [...M].sort((L, K) => L.name.localeCompare(K.name)), M.slice(0, 100);
  }, [X, t, o]);
  b.useEffect(() => {
    function M(L) {
      P.current && !P.current.contains(L.target) && u(!1);
    }
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, []), b.useEffect(() => {
    h(-1);
  }, [t]), b.useEffect(() => {
    if (f >= 0 && j.current) {
      const M = j.current.children[f];
      M && M.scrollIntoView({ block: "nearest" });
    }
  }, [f]), b.useEffect(() => {
    function M(L) {
      if (L.key === "/" && !L.ctrlKey && !L.metaKey) {
        const K = L.target?.tagName;
        K !== "INPUT" && K !== "TEXTAREA" && (L.preventDefault(), k.current?.focus());
      }
    }
    return document.addEventListener("keydown", M), () => document.removeEventListener("keydown", M);
  }, []), b.useEffect(() => {
    const M = new IntersectionObserver(
      ([L]) => {
        v(!L.isIntersecting);
      },
      { threshold: 0 }
    );
    return A.current && M.observe(A.current), () => M.disconnect();
  }, []);
  const Q = b.useCallback(
    (M) => {
      if (!(!c || ne.length === 0))
        if (M.key === "ArrowDown")
          M.preventDefault(), h(
            (L) => L < ne.length - 1 ? L + 1 : 0
          );
        else if (M.key === "ArrowUp")
          M.preventDefault(), h(
            (L) => L > 0 ? L - 1 : ne.length - 1
          );
        else if (M.key === "Enter" && f >= 0) {
          M.preventDefault();
          const L = ne[f];
          u(!1), _(`/nfl/players/${L.slug}/`);
        } else M.key === "Escape" && u(!1);
    },
    [c, ne, f, _]
  ), z = U?.slugs?.length || 352, Z = o !== "ALL" && Vj[o] || "Players", ge = ie.length === 100, fe = t.trim() ? `Matching “${t.trim()}”${o !== "ALL" ? ` · ${Z}` : ""}` : o !== "ALL" ? `Showing ${Z.toLowerCase()} only` : "All fantasy-relevant players";
  return /* @__PURE__ */ i.jsxs("div", { className: "min-h-screen bg-background", children: [
    g && !Y && /* @__PURE__ */ i.jsx("div", { className: "sc-sticky-bar", "data-testid": "sticky-filter-bar", children: /* @__PURE__ */ i.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-2 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
        /* @__PURE__ */ i.jsx(Er, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ i.jsx(
          mi,
          {
            type: "search",
            placeholder: "Quick search...",
            value: t,
            onChange: (M) => {
              r(M.target.value), u(!0);
            },
            className: "pl-10",
            "data-testid": "input-sticky-search"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-1 flex-wrap", children: Cs.map((M) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          type: "button",
          className: `sc-filter-pill ${o === M ? "sc-filter-pill--active" : ""}`,
          onClick: () => l(o === M ? "ALL" : M),
          "data-testid": `button-sticky-filter-${M}`,
          children: [
            M,
            se[M] ? /* @__PURE__ */ i.jsx("span", { className: "sc-filter-pill__count", children: se[M] }) : null
          ]
        },
        M
      )) })
    ] }) }),
    /* @__PURE__ */ i.jsx(
      "div",
      {
        ref: A,
        className: "sc-header",
        "data-testid": "hero-section",
        children: /* @__PURE__ */ i.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar", ref: P, children: [
          /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__top", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__search relative group", children: [
              /* @__PURE__ */ i.jsx(Er, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sc-search__icon z-10" }),
              /* @__PURE__ */ i.jsx(
                mi,
                {
                  ref: k,
                  type: "search",
                  placeholder: "Search any player, team, or position...",
                  value: t,
                  onChange: (M) => {
                    r(M.target.value), u(!0);
                  },
                  onFocus: () => {
                    t.trim() && u(!0);
                  },
                  onKeyDown: Q,
                  className: "sc-search",
                  autoComplete: "off",
                  role: "combobox",
                  "aria-expanded": c && ne.length > 0,
                  "aria-controls": "autocomplete-list",
                  "aria-activedescendant": f >= 0 ? `autocomplete-item-${f}` : void 0,
                  "data-testid": "input-player-search"
                }
              ),
              /* @__PURE__ */ i.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5", children: /* @__PURE__ */ i.jsxs("kbd", { className: "sc-search__kbd", children: [
                /* @__PURE__ */ i.jsx(Kh, { className: "w-2.5 h-2.5" }),
                "/"
              ] }) }),
              c && t.trim() && ne.length > 0 && /* @__PURE__ */ i.jsx(
                "div",
                {
                  id: "autocomplete-list",
                  ref: j,
                  role: "listbox",
                  className: "absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto",
                  "data-testid": "autocomplete-dropdown",
                  children: ne.map((M, L) => /* @__PURE__ */ i.jsx(Zn, { href: `/nfl/players/${M.slug}/`, children: /* @__PURE__ */ i.jsxs(
                    "div",
                    {
                      id: `autocomplete-item-${L}`,
                      role: "option",
                      "aria-selected": L === f,
                      className: `flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${L === f ? "bg-muted" : "hover:bg-muted/50"}`,
                      onMouseEnter: () => h(L),
                      onClick: () => u(!1),
                      "data-testid": `autocomplete-item-${M.slug}`,
                      children: [
                        /* @__PURE__ */ i.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center", children: /* @__PURE__ */ i.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: M.position || "?" }) }),
                        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ i.jsx("span", { className: "font-medium text-sm text-foreground truncate block", children: M.name }),
                          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                            /* @__PURE__ */ i.jsx("span", { className: Hm[M.position || ""] || "", children: M.position }),
                            /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: M.team })
                          ] })
                        ] }),
                        /* @__PURE__ */ i.jsx(wc, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
                      ]
                    }
                  ) }, M.id))
                }
              )
            ] }),
            U?.byTeam && /* @__PURE__ */ i.jsxs("div", { className: "sc-stat-card", "data-testid": "badge-player-count", children: [
              /* @__PURE__ */ i.jsx(xc, { className: "w-4 h-4 sc-header__gold-icon" }),
              /* @__PURE__ */ i.jsxs("div", { children: [
                /* @__PURE__ */ i.jsx("p", { className: "sc-stat-card__number", children: z }),
                /* @__PURE__ */ i.jsx("p", { className: "sc-stat-card__label", children: "Fantasy Starters" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__bottom", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "sc-controlbar__filters", children: [
              Cs.map((M) => /* @__PURE__ */ i.jsxs(
                "button",
                {
                  type: "button",
                  className: `sc-filter-pill ${o === M ? "sc-filter-pill--active" : ""}`,
                  onClick: () => l(o === M ? "ALL" : M),
                  "data-testid": `button-filter-${M}`,
                  children: [
                    M,
                    se[M] ? /* @__PURE__ */ i.jsx("span", { className: "sc-filter-pill__count", children: se[M] }) : null
                  ]
                },
                M
              )),
              (o !== "ALL" || t.trim()) && /* @__PURE__ */ i.jsxs(
                "button",
                {
                  type: "button",
                  className: "sc-clear-btn",
                  onClick: () => {
                    l("ALL"), r("");
                  },
                  "data-testid": "button-clear-filter",
                  children: [
                    /* @__PURE__ */ i.jsx(h1, { className: "w-3 h-3" }),
                    "Clear Filters"
                  ]
                }
              )
            ] }),
            U?.byTeam && /* @__PURE__ */ i.jsx("div", { className: "sc-segment", role: "group", "aria-label": "Conference filter", "data-testid": "tabs-conference", children: ["AFC", "NFC"].map((M) => /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `sc-segment__btn ${m === M ? "sc-segment__btn--active" : ""}`,
                onClick: () => {
                  y(M), S(null), l("ALL"), r("");
                },
                "data-testid": `tab-${M.toLowerCase()}`,
                children: M
              },
              M
            )) })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ i.jsx("main", { className: w ? "" : "max-w-7xl mx-auto px-4 py-8", children: Y ? H ? /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 12 }).map((M, L) => /* @__PURE__ */ i.jsx(ri, { children: /* @__PURE__ */ i.jsx(si, { className: "p-5", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ i.jsx(be, { className: "w-10 h-10 rounded-md" }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ i.jsx(be, { className: "h-4 w-32 mb-2" }),
        /* @__PURE__ */ i.jsx(be, { className: "h-3 w-20" })
      ] })
    ] }) }) }, L)) }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      ie.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "sc-results-toolbar", "data-testid": "results-toolbar", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "sc-results-toolbar__count", "data-testid": "text-results-count", children: [
            ie.length,
            ge ? "+" : "",
            " ",
            /* @__PURE__ */ i.jsx("span", { className: "sc-results-toolbar__noun", children: Z })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "sc-results-toolbar__sub", children: [
            fe,
            ge ? " · top 100 shown" : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "sc-results-toolbar__right", children: /* @__PURE__ */ i.jsxs("span", { className: "sc-results-sort", "data-testid": "results-sort", children: [
          /* @__PURE__ */ i.jsx(i1, { className: "w-3.5 h-3.5" }),
          "Sorted A–Z"
        ] }) })
      ] }),
      ie.length === 0 ? /* @__PURE__ */ i.jsx(ri, { children: /* @__PURE__ */ i.jsxs(si, { className: "py-12 text-center", children: [
        /* @__PURE__ */ i.jsx(Er, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground font-medium", children: "No players found" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your search or filter" })
      ] }) }) : /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: ie.map((M) => {
        const L = M.position || "", K = "rank_label" in M ? M.rank_label : L, D = Tc[M.team] || "#64748b", E = Ac[M.team] || M.team, B = parseInt(K.replace(/[^0-9]/g, "") || "0", 10), ce = B === 1 ? "t1" : B === 2 ? "t2" : B >= 3 ? "t3" : "t0";
        return /* @__PURE__ */ i.jsx(Zn, { href: `/nfl/players/${M.slug}/`, children: /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: `sc-result-card sc-result-card--${L.toLowerCase()}`,
            style: { "--team-color": D },
            "data-testid": `card-player-${M.slug}`,
            children: [
              /* @__PURE__ */ i.jsxs("div", { className: "sc-result-card__img", children: [
                /* @__PURE__ */ i.jsx(
                  "img",
                  {
                    src: Gm(M.id),
                    alt: M.name,
                    loading: "lazy",
                    onError: (le) => {
                      const pe = le.currentTarget;
                      pe.onerror = null, pe.style.display = "none", pe.parentElement?.classList.add("sc-result-card__img--fallback");
                    }
                  }
                ),
                /* @__PURE__ */ i.jsx("div", { className: "sc-result-card__initials", children: M.name.split(" ").map((le) => le[0]).join("") }),
                K && /* @__PURE__ */ i.jsx("span", { className: `sc-rank-badge sc-rank-badge--${ce}`, "data-testid": `badge-rank-${M.slug}`, children: K })
              ] }),
              /* @__PURE__ */ i.jsx("div", { className: "sc-result-card__accent" }),
              /* @__PURE__ */ i.jsxs("div", { className: "sc-result-card__body", children: [
                /* @__PURE__ */ i.jsx("div", { className: "sc-result-card__name", "data-testid": `text-player-name-${M.slug}`, children: M.name }),
                /* @__PURE__ */ i.jsx("div", { className: "sc-result-card__meta", children: /* @__PURE__ */ i.jsxs("span", { className: "sc-result-card__team", children: [
                  /* @__PURE__ */ i.jsx("span", { className: "sc-team-dot" }),
                  /* @__PURE__ */ i.jsx("span", { className: "sc-result-card__team-abbr", children: M.team }),
                  /* @__PURE__ */ i.jsx("span", { className: "sc-result-card__team-name", children: E })
                ] }) })
              ] })
            ]
          }
        ) }, M.id);
      }) })
    ] }) : H ? /* @__PURE__ */ i.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ i.jsx(be, { className: "h-10 w-64 mx-auto" }),
      Array.from({ length: 2 }).map((M, L) => /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx(be, { className: "h-6 w-32 mb-3" }),
        /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((K, D) => /* @__PURE__ */ i.jsx(ri, { children: /* @__PURE__ */ i.jsxs(si, { className: "p-5", children: [
          /* @__PURE__ */ i.jsx(be, { className: "h-5 w-12 mb-3" }),
          /* @__PURE__ */ i.jsx("div", { className: "space-y-2", children: Array.from({ length: 6 }).map((E, B) => /* @__PURE__ */ i.jsx(be, { className: "h-4 w-full" }, B)) })
        ] }) }, D)) })
      ] }, L))
    ] }) : U && U.byTeam ? w && U.byTeam[w] ? /* @__PURE__ */ i.jsx(
      Kj,
      {
        team: w,
        positions: U.byTeam[w],
        onBack: () => S(null)
      }
    ) : /* @__PURE__ */ i.jsx("div", { children: /* @__PURE__ */ i.jsx(Bj, { defaultValue: "AFC", value: m, onValueChange: y, children: ["AFC", "NFC"].map((M) => /* @__PURE__ */ i.jsx(Wm, { value: M, children: /* @__PURE__ */ i.jsx("div", { className: "space-y-8", children: Object.entries(Vm[M]).map(([L, K]) => /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsxs(
        "h2",
        {
          className: "sc-division-heading",
          "data-testid": `text-division-${M.toLowerCase()}-${L.toLowerCase()}`,
          children: [
            M,
            " ",
            L,
            /* @__PURE__ */ i.jsx("div", { className: "flex-1 h-px bg-amber-400/30 ml-2" })
          ]
        }
      ),
      /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4", children: K.map((D) => U.byTeam[D] ? /* @__PURE__ */ i.jsx(
        Qj,
        {
          team: D,
          onClick: () => S(D)
        },
        D
      ) : null) })
    ] }, L)) }) }, M)) }) }) : null })
  ] });
}
const Ts = window.scPlayersConfig || {}, Ss = (Ts.restBase || "/wp-json/statchasers/v1").replace(/\/+$/, "");
function qj(t) {
  try {
    const r = new URL(t, window.location.origin), o = r.pathname, l = r.searchParams;
    if (o === "/api/players" || o === "/api/players/") {
      const m = l.get("q") || "";
      return `${Ss}/players?q=${encodeURIComponent(m)}`;
    }
    if (o === "/api/indexed-players" || o === "/api/indexed-players/")
      return `${Ss}/indexed-players`;
    const c = o.match(/^\/api\/players\/([^/]+)\/?$/);
    if (c) {
      const m = c[1], y = l.get("format") || "ppr", g = l.get("season") || "";
      let v = `${Ss}/player/${encodeURIComponent(m)}?format=${y}`;
      return g && (v += `&season=${g}`), v;
    }
    const u = o.match(/^\/api\/players\/([^/]+)\/game-log\/?$/);
    if (u) {
      const m = u[1], y = l.get("season") || "", g = l.get("format") || "ppr";
      let v = `${Ss}/player/${encodeURIComponent(m)}/game-log?format=${g}`;
      return y && (v += `&season=${y}`), v;
    }
    const f = o.match(/^\/api\/players\/([^/]+)\/related\/?$/);
    if (f) {
      const m = f[1], y = l.get("format") || "ppr", g = l.get("season") || "";
      let v = `${Ss}/player/${encodeURIComponent(m)}/related?format=${y}`;
      return g && (v += `&season=${g}`), v;
    }
    if (o.match(/^\/api\/players\/([^/]+)\/news\/?$/))
      return "data:application/json,[]";
  } catch {
  }
  return t;
}
function oi(t) {
  return t.startsWith("/api/") ? qj(t) : t;
}
const Qm = window.fetch.bind(window);
window.fetch = function(t, r) {
  if (typeof t == "string")
    t = oi(t);
  else if (t instanceof Request) {
    const o = t.url, l = window.location.origin, c = o.startsWith(l) ? o.slice(l.length) : o;
    if (c.startsWith("/api/")) {
      const u = oi(c);
      t = new Request(u, t);
    }
  } else t instanceof URL && t.pathname.startsWith("/api/") && (t = oi(t.pathname + t.search));
  return Qm(t, r);
};
const Xj = async ({ queryKey: t }) => {
  const r = t.join("/"), o = oi(r), l = await Qm(o);
  if (!l.ok) {
    const c = await l.text() || l.statusText;
    throw new Error(`${l.status}: ${c}`);
  }
  return l.json();
}, Lc = new Nx({
  defaultOptions: {
    queries: {
      queryFn: Xj,
      refetchInterval: !1,
      refetchOnWindowFocus: !1,
      staleTime: 1 / 0,
      retry: !1
    },
    mutations: {
      retry: !1
    }
  }
}), Zj = () => [window.location.pathname + window.location.search, (r) => {
  window.location.href = r;
}];
Ts.preloadedIndexed && Lc.setQueryData(["/api/indexed-players"], Ts.preloadedIndexed);
Ts.preloadedPlayers && Lc.setQueryData(["/api/players"], Ts.preloadedPlayers);
const Ol = document.querySelector(".scpp-root");
Ol && (Ol.innerHTML = "", ex.createRoot(Ol).render(
  /* @__PURE__ */ i.jsx(_x, { client: Lc, children: /* @__PURE__ */ i.jsx(Hw, { children: /* @__PURE__ */ i.jsx(eh, { hook: Zj, children: /* @__PURE__ */ i.jsxs(r0, { children: [
    /* @__PURE__ */ i.jsx(Xo, { path: "/nfl/players/:slug", component: Rp }),
    /* @__PURE__ */ i.jsx(Xo, { path: "/nfl/players/:slug/", component: Rp }),
    /* @__PURE__ */ i.jsx(Xo, { path: "/nfl/players", component: Lp }),
    /* @__PURE__ */ i.jsx(Xo, { path: "/nfl/players/", component: Lp })
  ] }) }) }) })
));
