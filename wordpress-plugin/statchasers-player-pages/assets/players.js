function vv(n, r) {
  for (var a = 0; a < r.length; a++) {
    const i = r[a];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const c in i)
        if (c !== "default" && !(c in n)) {
          const d = Object.getOwnPropertyDescriptor(i, c);
          d && Object.defineProperty(n, c, d.get ? d : {
            enumerable: !0,
            get: () => i[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function Lh(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Tc = { exports: {} }, No = {}, Rc = { exports: {} }, Be = {};
var _p;
function yv() {
  if (_p) return Be;
  _p = 1;
  var n = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), a = /* @__PURE__ */ Symbol.for("react.fragment"), i = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), p = /* @__PURE__ */ Symbol.for("react.context"), f = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), x = Symbol.iterator;
  function w(A) {
    return A === null || typeof A != "object" ? null : (A = x && A[x] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var k = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, S = Object.assign, j = {};
  function _(A, ee, ve) {
    this.props = A, this.context = ee, this.refs = j, this.updater = ve || k;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(A, ee) {
    if (typeof A != "object" && typeof A != "function" && A != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, A, ee, "setState");
  }, _.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function P() {
  }
  P.prototype = _.prototype;
  function T(A, ee, ve) {
    this.props = A, this.context = ee, this.refs = j, this.updater = ve || k;
  }
  var C = T.prototype = new P();
  C.constructor = T, S(C, _.prototype), C.isPureReactComponent = !0;
  var $ = Array.isArray, V = Object.prototype.hasOwnProperty, Z = { current: null }, H = { key: !0, ref: !0, __self: !0, __source: !0 };
  function L(A, ee, ve) {
    var be, q = {}, de = null, ce = null;
    if (ee != null) for (be in ee.ref !== void 0 && (ce = ee.ref), ee.key !== void 0 && (de = "" + ee.key), ee) V.call(ee, be) && !H.hasOwnProperty(be) && (q[be] = ee[be]);
    var z = arguments.length - 2;
    if (z === 1) q.children = ve;
    else if (1 < z) {
      for (var oe = Array(z), se = 0; se < z; se++) oe[se] = arguments[se + 2];
      q.children = oe;
    }
    if (A && A.defaultProps) for (be in z = A.defaultProps, z) q[be] === void 0 && (q[be] = z[be]);
    return { $$typeof: n, type: A, key: de, ref: ce, props: q, _owner: Z.current };
  }
  function re(A, ee) {
    return { $$typeof: n, type: A.type, key: ee, ref: A.ref, props: A.props, _owner: A._owner };
  }
  function I(A) {
    return typeof A == "object" && A !== null && A.$$typeof === n;
  }
  function K(A) {
    var ee = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(ve) {
      return ee[ve];
    });
  }
  var B = /\/+/g;
  function G(A, ee) {
    return typeof A == "object" && A !== null && A.key != null ? K("" + A.key) : ee.toString(36);
  }
  function M(A, ee, ve, be, q) {
    var de = typeof A;
    (de === "undefined" || de === "boolean") && (A = null);
    var ce = !1;
    if (A === null) ce = !0;
    else switch (de) {
      case "string":
      case "number":
        ce = !0;
        break;
      case "object":
        switch (A.$$typeof) {
          case n:
          case r:
            ce = !0;
        }
    }
    if (ce) return ce = A, q = q(ce), A = be === "" ? "." + G(ce, 0) : be, $(q) ? (ve = "", A != null && (ve = A.replace(B, "$&/") + "/"), M(q, ee, ve, "", function(se) {
      return se;
    })) : q != null && (I(q) && (q = re(q, ve + (!q.key || ce && ce.key === q.key ? "" : ("" + q.key).replace(B, "$&/") + "/") + A)), ee.push(q)), 1;
    if (ce = 0, be = be === "" ? "." : be + ":", $(A)) for (var z = 0; z < A.length; z++) {
      de = A[z];
      var oe = be + G(de, z);
      ce += M(de, ee, ve, oe, q);
    }
    else if (oe = w(A), typeof oe == "function") for (A = oe.call(A), z = 0; !(de = A.next()).done; ) de = de.value, oe = be + G(de, z++), ce += M(de, ee, ve, oe, q);
    else if (de === "object") throw ee = String(A), Error("Objects are not valid as a React child (found: " + (ee === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : ee) + "). If you meant to render a collection of children, use an array instead.");
    return ce;
  }
  function Y(A, ee, ve) {
    if (A == null) return A;
    var be = [], q = 0;
    return M(A, be, "", "", function(de) {
      return ee.call(ve, de, q++);
    }), be;
  }
  function X(A) {
    if (A._status === -1) {
      var ee = A._result;
      ee = ee(), ee.then(function(ve) {
        (A._status === 0 || A._status === -1) && (A._status = 1, A._result = ve);
      }, function(ve) {
        (A._status === 0 || A._status === -1) && (A._status = 2, A._result = ve);
      }), A._status === -1 && (A._status = 0, A._result = ee);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var te = { current: null }, D = { transition: null }, ne = { ReactCurrentDispatcher: te, ReactCurrentBatchConfig: D, ReactCurrentOwner: Z };
  function J() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Be.Children = { map: Y, forEach: function(A, ee, ve) {
    Y(A, function() {
      ee.apply(this, arguments);
    }, ve);
  }, count: function(A) {
    var ee = 0;
    return Y(A, function() {
      ee++;
    }), ee;
  }, toArray: function(A) {
    return Y(A, function(ee) {
      return ee;
    }) || [];
  }, only: function(A) {
    if (!I(A)) throw Error("React.Children.only expected to receive a single React element child.");
    return A;
  } }, Be.Component = _, Be.Fragment = a, Be.Profiler = c, Be.PureComponent = T, Be.StrictMode = i, Be.Suspense = m, Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ne, Be.act = J, Be.cloneElement = function(A, ee, ve) {
    if (A == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + A + ".");
    var be = S({}, A.props), q = A.key, de = A.ref, ce = A._owner;
    if (ee != null) {
      if (ee.ref !== void 0 && (de = ee.ref, ce = Z.current), ee.key !== void 0 && (q = "" + ee.key), A.type && A.type.defaultProps) var z = A.type.defaultProps;
      for (oe in ee) V.call(ee, oe) && !H.hasOwnProperty(oe) && (be[oe] = ee[oe] === void 0 && z !== void 0 ? z[oe] : ee[oe]);
    }
    var oe = arguments.length - 2;
    if (oe === 1) be.children = ve;
    else if (1 < oe) {
      z = Array(oe);
      for (var se = 0; se < oe; se++) z[se] = arguments[se + 2];
      be.children = z;
    }
    return { $$typeof: n, type: A.type, key: q, ref: de, props: be, _owner: ce };
  }, Be.createContext = function(A) {
    return A = { $$typeof: p, _currentValue: A, _currentValue2: A, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, A.Provider = { $$typeof: d, _context: A }, A.Consumer = A;
  }, Be.createElement = L, Be.createFactory = function(A) {
    var ee = L.bind(null, A);
    return ee.type = A, ee;
  }, Be.createRef = function() {
    return { current: null };
  }, Be.forwardRef = function(A) {
    return { $$typeof: f, render: A };
  }, Be.isValidElement = I, Be.lazy = function(A) {
    return { $$typeof: g, _payload: { _status: -1, _result: A }, _init: X };
  }, Be.memo = function(A, ee) {
    return { $$typeof: v, type: A, compare: ee === void 0 ? null : ee };
  }, Be.startTransition = function(A) {
    var ee = D.transition;
    D.transition = {};
    try {
      A();
    } finally {
      D.transition = ee;
    }
  }, Be.unstable_act = J, Be.useCallback = function(A, ee) {
    return te.current.useCallback(A, ee);
  }, Be.useContext = function(A) {
    return te.current.useContext(A);
  }, Be.useDebugValue = function() {
  }, Be.useDeferredValue = function(A) {
    return te.current.useDeferredValue(A);
  }, Be.useEffect = function(A, ee) {
    return te.current.useEffect(A, ee);
  }, Be.useId = function() {
    return te.current.useId();
  }, Be.useImperativeHandle = function(A, ee, ve) {
    return te.current.useImperativeHandle(A, ee, ve);
  }, Be.useInsertionEffect = function(A, ee) {
    return te.current.useInsertionEffect(A, ee);
  }, Be.useLayoutEffect = function(A, ee) {
    return te.current.useLayoutEffect(A, ee);
  }, Be.useMemo = function(A, ee) {
    return te.current.useMemo(A, ee);
  }, Be.useReducer = function(A, ee, ve) {
    return te.current.useReducer(A, ee, ve);
  }, Be.useRef = function(A) {
    return te.current.useRef(A);
  }, Be.useState = function(A) {
    return te.current.useState(A);
  }, Be.useSyncExternalStore = function(A, ee, ve) {
    return te.current.useSyncExternalStore(A, ee, ve);
  }, Be.useTransition = function() {
    return te.current.useTransition();
  }, Be.version = "18.3.1", Be;
}
var Sp;
function Ti() {
  return Sp || (Sp = 1, Rc.exports = yv()), Rc.exports;
}
var Np;
function wv() {
  if (Np) return No;
  Np = 1;
  var n = Ti(), r = /* @__PURE__ */ Symbol.for("react.element"), a = /* @__PURE__ */ Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, c = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(f, m, v) {
    var g, x = {}, w = null, k = null;
    v !== void 0 && (w = "" + v), m.key !== void 0 && (w = "" + m.key), m.ref !== void 0 && (k = m.ref);
    for (g in m) i.call(m, g) && !d.hasOwnProperty(g) && (x[g] = m[g]);
    if (f && f.defaultProps) for (g in m = f.defaultProps, m) x[g] === void 0 && (x[g] = m[g]);
    return { $$typeof: r, type: f, key: w, ref: k, props: x, _owner: c.current };
  }
  return No.Fragment = a, No.jsx = p, No.jsxs = p, No;
}
var Cp;
function bv() {
  return Cp || (Cp = 1, Tc.exports = wv()), Tc.exports;
}
var s = bv(), si = {}, Ac = { exports: {} }, Gt = {}, Fc = { exports: {} }, Mc = {};
var Pp;
function jv() {
  return Pp || (Pp = 1, (function(n) {
    function r(D, ne) {
      var J = D.length;
      D.push(ne);
      e: for (; 0 < J; ) {
        var A = J - 1 >>> 1, ee = D[A];
        if (0 < c(ee, ne)) D[A] = ne, D[J] = ee, J = A;
        else break e;
      }
    }
    function a(D) {
      return D.length === 0 ? null : D[0];
    }
    function i(D) {
      if (D.length === 0) return null;
      var ne = D[0], J = D.pop();
      if (J !== ne) {
        D[0] = J;
        e: for (var A = 0, ee = D.length, ve = ee >>> 1; A < ve; ) {
          var be = 2 * (A + 1) - 1, q = D[be], de = be + 1, ce = D[de];
          if (0 > c(q, J)) de < ee && 0 > c(ce, q) ? (D[A] = ce, D[de] = J, A = de) : (D[A] = q, D[be] = J, A = be);
          else if (de < ee && 0 > c(ce, J)) D[A] = ce, D[de] = J, A = de;
          else break e;
        }
      }
      return ne;
    }
    function c(D, ne) {
      var J = D.sortIndex - ne.sortIndex;
      return J !== 0 ? J : D.id - ne.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      n.unstable_now = function() {
        return d.now();
      };
    } else {
      var p = Date, f = p.now();
      n.unstable_now = function() {
        return p.now() - f;
      };
    }
    var m = [], v = [], g = 1, x = null, w = 3, k = !1, S = !1, j = !1, _ = typeof setTimeout == "function" ? setTimeout : null, P = typeof clearTimeout == "function" ? clearTimeout : null, T = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function C(D) {
      for (var ne = a(v); ne !== null; ) {
        if (ne.callback === null) i(v);
        else if (ne.startTime <= D) i(v), ne.sortIndex = ne.expirationTime, r(m, ne);
        else break;
        ne = a(v);
      }
    }
    function $(D) {
      if (j = !1, C(D), !S) if (a(m) !== null) S = !0, X(V);
      else {
        var ne = a(v);
        ne !== null && te($, ne.startTime - D);
      }
    }
    function V(D, ne) {
      S = !1, j && (j = !1, P(L), L = -1), k = !0;
      var J = w;
      try {
        for (C(ne), x = a(m); x !== null && (!(x.expirationTime > ne) || D && !K()); ) {
          var A = x.callback;
          if (typeof A == "function") {
            x.callback = null, w = x.priorityLevel;
            var ee = A(x.expirationTime <= ne);
            ne = n.unstable_now(), typeof ee == "function" ? x.callback = ee : x === a(m) && i(m), C(ne);
          } else i(m);
          x = a(m);
        }
        if (x !== null) var ve = !0;
        else {
          var be = a(v);
          be !== null && te($, be.startTime - ne), ve = !1;
        }
        return ve;
      } finally {
        x = null, w = J, k = !1;
      }
    }
    var Z = !1, H = null, L = -1, re = 5, I = -1;
    function K() {
      return !(n.unstable_now() - I < re);
    }
    function B() {
      if (H !== null) {
        var D = n.unstable_now();
        I = D;
        var ne = !0;
        try {
          ne = H(!0, D);
        } finally {
          ne ? G() : (Z = !1, H = null);
        }
      } else Z = !1;
    }
    var G;
    if (typeof T == "function") G = function() {
      T(B);
    };
    else if (typeof MessageChannel < "u") {
      var M = new MessageChannel(), Y = M.port2;
      M.port1.onmessage = B, G = function() {
        Y.postMessage(null);
      };
    } else G = function() {
      _(B, 0);
    };
    function X(D) {
      H = D, Z || (Z = !0, G());
    }
    function te(D, ne) {
      L = _(function() {
        D(n.unstable_now());
      }, ne);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(D) {
      D.callback = null;
    }, n.unstable_continueExecution = function() {
      S || k || (S = !0, X(V));
    }, n.unstable_forceFrameRate = function(D) {
      0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : re = 0 < D ? Math.floor(1e3 / D) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, n.unstable_getFirstCallbackNode = function() {
      return a(m);
    }, n.unstable_next = function(D) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var ne = 3;
          break;
        default:
          ne = w;
      }
      var J = w;
      w = ne;
      try {
        return D();
      } finally {
        w = J;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(D, ne) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var J = w;
      w = D;
      try {
        return ne();
      } finally {
        w = J;
      }
    }, n.unstable_scheduleCallback = function(D, ne, J) {
      var A = n.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? A + J : A) : J = A, D) {
        case 1:
          var ee = -1;
          break;
        case 2:
          ee = 250;
          break;
        case 5:
          ee = 1073741823;
          break;
        case 4:
          ee = 1e4;
          break;
        default:
          ee = 5e3;
      }
      return ee = J + ee, D = { id: g++, callback: ne, priorityLevel: D, startTime: J, expirationTime: ee, sortIndex: -1 }, J > A ? (D.sortIndex = J, r(v, D), a(m) === null && D === a(v) && (j ? (P(L), L = -1) : j = !0, te($, J - A))) : (D.sortIndex = ee, r(m, D), S || k || (S = !0, X(V))), D;
    }, n.unstable_shouldYield = K, n.unstable_wrapCallback = function(D) {
      var ne = w;
      return function() {
        var J = w;
        w = ne;
        try {
          return D.apply(this, arguments);
        } finally {
          w = J;
        }
      };
    };
  })(Mc)), Mc;
}
var Ep;
function kv() {
  return Ep || (Ep = 1, Fc.exports = jv()), Fc.exports;
}
var Tp;
function _v() {
  if (Tp) return Gt;
  Tp = 1;
  var n = Ti(), r = kv();
  function a(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, o = 1; o < arguments.length; o++) t += "&args[]=" + encodeURIComponent(arguments[o]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var i = /* @__PURE__ */ new Set(), c = {};
  function d(e, t) {
    p(e, t), p(e + "Capture", t);
  }
  function p(e, t) {
    for (c[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
  }
  var f = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, v = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, x = {};
  function w(e) {
    return m.call(x, e) ? !0 : m.call(g, e) ? !1 : v.test(e) ? x[e] = !0 : (g[e] = !0, !1);
  }
  function k(e, t, o, l) {
    if (o !== null && o.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return l ? !1 : o !== null ? !o.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function S(e, t, o, l) {
    if (t === null || typeof t > "u" || k(e, t, o, l)) return !0;
    if (l) return !1;
    if (o !== null) switch (o.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function j(e, t, o, l, u, h, b) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = l, this.attributeNamespace = u, this.mustUseProperty = o, this.propertyName = e, this.type = t, this.sanitizeURL = h, this.removeEmptyString = b;
  }
  var _ = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    _[e] = new j(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    _[t] = new j(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    _[e] = new j(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    _[e] = new j(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    _[e] = new j(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    _[e] = new j(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    _[e] = new j(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    _[e] = new j(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    _[e] = new j(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var P = /[\-:]([a-z])/g;
  function T(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      P,
      T
    );
    _[t] = new j(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(P, T);
    _[t] = new j(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(P, T);
    _[t] = new j(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    _[e] = new j(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), _.xlinkHref = new j("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    _[e] = new j(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function C(e, t, o, l) {
    var u = _.hasOwnProperty(t) ? _[t] : null;
    (u !== null ? u.type !== 0 : l || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (S(t, o, u, l) && (o = null), l || u === null ? w(t) && (o === null ? e.removeAttribute(t) : e.setAttribute(t, "" + o)) : u.mustUseProperty ? e[u.propertyName] = o === null ? u.type === 3 ? !1 : "" : o : (t = u.attributeName, l = u.attributeNamespace, o === null ? e.removeAttribute(t) : (u = u.type, o = u === 3 || u === 4 && o === !0 ? "" : "" + o, l ? e.setAttributeNS(l, t, o) : e.setAttribute(t, o))));
  }
  var $ = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, V = /* @__PURE__ */ Symbol.for("react.element"), Z = /* @__PURE__ */ Symbol.for("react.portal"), H = /* @__PURE__ */ Symbol.for("react.fragment"), L = /* @__PURE__ */ Symbol.for("react.strict_mode"), re = /* @__PURE__ */ Symbol.for("react.profiler"), I = /* @__PURE__ */ Symbol.for("react.provider"), K = /* @__PURE__ */ Symbol.for("react.context"), B = /* @__PURE__ */ Symbol.for("react.forward_ref"), G = /* @__PURE__ */ Symbol.for("react.suspense"), M = /* @__PURE__ */ Symbol.for("react.suspense_list"), Y = /* @__PURE__ */ Symbol.for("react.memo"), X = /* @__PURE__ */ Symbol.for("react.lazy"), te = /* @__PURE__ */ Symbol.for("react.offscreen"), D = Symbol.iterator;
  function ne(e) {
    return e === null || typeof e != "object" ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var J = Object.assign, A;
  function ee(e) {
    if (A === void 0) try {
      throw Error();
    } catch (o) {
      var t = o.stack.trim().match(/\n( *(at )?)/);
      A = t && t[1] || "";
    }
    return `
` + A + e;
  }
  var ve = !1;
  function be(e, t) {
    if (!e || ve) return "";
    ve = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (Q) {
          var l = Q;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (Q) {
          l = Q;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (Q) {
          l = Q;
        }
        e();
      }
    } catch (Q) {
      if (Q && l && typeof Q.stack == "string") {
        for (var u = Q.stack.split(`
`), h = l.stack.split(`
`), b = u.length - 1, N = h.length - 1; 1 <= b && 0 <= N && u[b] !== h[N]; ) N--;
        for (; 1 <= b && 0 <= N; b--, N--) if (u[b] !== h[N]) {
          if (b !== 1 || N !== 1)
            do
              if (b--, N--, 0 > N || u[b] !== h[N]) {
                var R = `
` + u[b].replace(" at new ", " at ");
                return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), R;
              }
            while (1 <= b && 0 <= N);
          break;
        }
      }
    } finally {
      ve = !1, Error.prepareStackTrace = o;
    }
    return (e = e ? e.displayName || e.name : "") ? ee(e) : "";
  }
  function q(e) {
    switch (e.tag) {
      case 5:
        return ee(e.type);
      case 16:
        return ee("Lazy");
      case 13:
        return ee("Suspense");
      case 19:
        return ee("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = be(e.type, !1), e;
      case 11:
        return e = be(e.type.render, !1), e;
      case 1:
        return e = be(e.type, !0), e;
      default:
        return "";
    }
  }
  function de(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case H:
        return "Fragment";
      case Z:
        return "Portal";
      case re:
        return "Profiler";
      case L:
        return "StrictMode";
      case G:
        return "Suspense";
      case M:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case K:
        return (e.displayName || "Context") + ".Consumer";
      case I:
        return (e._context.displayName || "Context") + ".Provider";
      case B:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Y:
        return t = e.displayName || null, t !== null ? t : de(e.type) || "Memo";
      case X:
        t = e._payload, e = e._init;
        try {
          return de(e(t));
        } catch {
        }
    }
    return null;
  }
  function ce(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return de(t);
      case 8:
        return t === L ? "StrictMode" : "Mode";
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
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function z(e) {
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
  function oe(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function se(e) {
    var t = oe(e) ? "checked" : "value", o = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), l = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var u = o.get, h = o.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return u.call(this);
      }, set: function(b) {
        l = "" + b, h.call(this, b);
      } }), Object.defineProperty(e, t, { enumerable: o.enumerable }), { getValue: function() {
        return l;
      }, setValue: function(b) {
        l = "" + b;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Pe(e) {
    e._valueTracker || (e._valueTracker = se(e));
  }
  function Ae(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var o = t.getValue(), l = "";
    return e && (l = oe(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== o ? (t.setValue(e), !0) : !1;
  }
  function Ie(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function qe(e, t) {
    var o = t.checked;
    return J({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: o ?? e._wrapperState.initialChecked });
  }
  function St(e, t) {
    var o = t.defaultValue == null ? "" : t.defaultValue, l = t.checked != null ? t.checked : t.defaultChecked;
    o = z(t.value != null ? t.value : o), e._wrapperState = { initialChecked: l, initialValue: o, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function tt(e, t) {
    t = t.checked, t != null && C(e, "checked", t, !1);
  }
  function Ee(e, t) {
    tt(e, t);
    var o = z(t.value), l = t.type;
    if (o != null) l === "number" ? (o === 0 && e.value === "" || e.value != o) && (e.value = "" + o) : e.value !== "" + o && (e.value = "" + o);
    else if (l === "submit" || l === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? st(e, t.type, o) : t.hasOwnProperty("defaultValue") && st(e, t.type, z(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Ge(e, t, o) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var l = t.type;
      if (!(l !== "submit" && l !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, o || t === e.value || (e.value = t), e.defaultValue = t;
    }
    o = e.name, o !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, o !== "" && (e.name = o);
  }
  function st(e, t, o) {
    (t !== "number" || Ie(e.ownerDocument) !== e) && (o == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + o && (e.defaultValue = "" + o));
  }
  var E = Array.isArray;
  function W(e, t, o, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < o.length; u++) t["$" + o[u]] = !0;
      for (o = 0; o < e.length; o++) u = t.hasOwnProperty("$" + e[o].value), e[o].selected !== u && (e[o].selected = u), u && l && (e[o].defaultSelected = !0);
    } else {
      for (o = "" + z(o), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === o) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function he(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(a(91));
    return J({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function we(e, t) {
    var o = t.value;
    if (o == null) {
      if (o = t.children, t = t.defaultValue, o != null) {
        if (t != null) throw Error(a(92));
        if (E(o)) {
          if (1 < o.length) throw Error(a(93));
          o = o[0];
        }
        t = o;
      }
      t == null && (t = ""), o = t;
    }
    e._wrapperState = { initialValue: z(o) };
  }
  function Te(e, t) {
    var o = z(t.value), l = z(t.defaultValue);
    o != null && (o = "" + o, o !== e.value && (e.value = o), t.defaultValue == null && e.defaultValue !== o && (e.defaultValue = o)), l != null && (e.defaultValue = "" + l);
  }
  function Se(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Le(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function _e(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Le(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Fe, me = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, o, l, u) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, o, l, u);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Fe = Fe || document.createElement("div"), Fe.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Fe.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Me(e, t) {
    if (t) {
      var o = e.firstChild;
      if (o && o === e.lastChild && o.nodeType === 3) {
        o.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var De = {
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
  }, je = ["Webkit", "ms", "Moz", "O"];
  Object.keys(De).forEach(function(e) {
    je.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), De[t] = De[e];
    });
  });
  function Re(e, t, o) {
    return t == null || typeof t == "boolean" || t === "" ? "" : o || typeof t != "number" || t === 0 || De.hasOwnProperty(e) && De[e] ? ("" + t).trim() : t + "px";
  }
  function Qe(e, t) {
    e = e.style;
    for (var o in t) if (t.hasOwnProperty(o)) {
      var l = o.indexOf("--") === 0, u = Re(o, t[o], l);
      o === "float" && (o = "cssFloat"), l ? e.setProperty(o, u) : e[o] = u;
    }
  }
  var We = J({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function pt(e, t) {
    if (t) {
      if (We[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(a(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(a(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(a(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(a(62));
    }
  }
  function gt(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
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
  var tn = null;
  function nn(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var rn = null, xt = null, lt = null;
  function nt(e) {
    if (e = uo(e)) {
      if (typeof rn != "function") throw Error(a(280));
      var t = e.stateNode;
      t && (t = ya(t), rn(e.stateNode, e.type, t));
    }
  }
  function At(e) {
    xt ? lt ? lt.push(e) : lt = [e] : xt = e;
  }
  function Fn() {
    if (xt) {
      var e = xt, t = lt;
      if (lt = xt = null, nt(e), t) for (e = 0; e < t.length; e++) nt(t[e]);
    }
  }
  function Qn(e, t) {
    return e(t);
  }
  function Tr() {
  }
  var pn = !1;
  function Go(e, t, o) {
    if (pn) return e(t, o);
    pn = !0;
    try {
      return Qn(e, t, o);
    } finally {
      pn = !1, (xt !== null || lt !== null) && (Tr(), Fn());
    }
  }
  function Kn(e, t) {
    var o = e.stateNode;
    if (o === null) return null;
    var l = ya(o);
    if (l === null) return null;
    o = l[t];
    e: switch (t) {
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
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (o && typeof o != "function") throw Error(a(231, t, typeof o));
    return o;
  }
  var Qo = !1;
  if (f) try {
    var Rr = {};
    Object.defineProperty(Rr, "passive", { get: function() {
      Qo = !0;
    } }), window.addEventListener("test", Rr, Rr), window.removeEventListener("test", Rr, Rr);
  } catch {
    Qo = !1;
  }
  function Ws(e, t, o, l, u, h, b, N, R) {
    var Q = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(o, Q);
    } catch (ie) {
      this.onError(ie);
    }
  }
  var Yn = !1, Us = null, qn = !1, Hs = null, Ko = { onError: function(e) {
    Yn = !0, Us = e;
  } };
  function Qi(e, t, o, l, u, h, b, N, R) {
    Yn = !1, Us = null, Ws.apply(Ko, arguments);
  }
  function Ju(e, t, o, l, u, h, b, N, R) {
    if (Qi.apply(this, arguments), Yn) {
      if (Yn) {
        var Q = Us;
        Yn = !1, Us = null;
      } else throw Error(a(198));
      qn || (qn = !0, Hs = Q);
    }
  }
  function Mn(e) {
    var t = e, o = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (o = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? o : null;
  }
  function Yo(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function qo(e) {
    if (Mn(e) !== e) throw Error(a(188));
  }
  function Xo(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Mn(e), t === null) throw Error(a(188));
      return t !== e ? null : e;
    }
    for (var o = e, l = t; ; ) {
      var u = o.return;
      if (u === null) break;
      var h = u.alternate;
      if (h === null) {
        if (l = u.return, l !== null) {
          o = l;
          continue;
        }
        break;
      }
      if (u.child === h.child) {
        for (h = u.child; h; ) {
          if (h === o) return qo(u), e;
          if (h === l) return qo(u), t;
          h = h.sibling;
        }
        throw Error(a(188));
      }
      if (o.return !== l.return) o = u, l = h;
      else {
        for (var b = !1, N = u.child; N; ) {
          if (N === o) {
            b = !0, o = u, l = h;
            break;
          }
          if (N === l) {
            b = !0, l = u, o = h;
            break;
          }
          N = N.sibling;
        }
        if (!b) {
          for (N = h.child; N; ) {
            if (N === o) {
              b = !0, o = h, l = u;
              break;
            }
            if (N === l) {
              b = !0, l = h, o = u;
              break;
            }
            N = N.sibling;
          }
          if (!b) throw Error(a(189));
        }
      }
      if (o.alternate !== l) throw Error(a(190));
    }
    if (o.tag !== 3) throw Error(a(188));
    return o.stateNode.current === o ? e : t;
  }
  function Zo(e) {
    return e = Xo(e), e !== null ? Ft(e) : null;
  }
  function Ft(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Ft(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Jo = r.unstable_scheduleCallback, Vs = r.unstable_cancelCallback, Ki = r.unstable_shouldYield, Yi = r.unstable_requestPaint, Xe = r.unstable_now, ke = r.unstable_getCurrentPriorityLevel, Je = r.unstable_ImmediatePriority, bt = r.unstable_UserBlockingPriority, Xn = r.unstable_NormalPriority, qi = r.unstable_LowPriority, ss = r.unstable_IdlePriority, ea = null, _n = null;
  function Fx(e) {
    if (_n && typeof _n.onCommitFiberRoot == "function") try {
      _n.onCommitFiberRoot(ea, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var hn = Math.clz32 ? Math.clz32 : Lx, Mx = Math.log, $x = Math.LN2;
  function Lx(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Mx(e) / $x | 0) | 0;
  }
  var ta = 64, na = 4194304;
  function Gs(e) {
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
  function ra(e, t) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var l = 0, u = e.suspendedLanes, h = e.pingedLanes, b = o & 268435455;
    if (b !== 0) {
      var N = b & ~u;
      N !== 0 ? l = Gs(N) : (h &= b, h !== 0 && (l = Gs(h)));
    } else b = o & ~u, b !== 0 ? l = Gs(b) : h !== 0 && (l = Gs(h));
    if (l === 0) return 0;
    if (t !== 0 && t !== l && (t & u) === 0 && (u = l & -l, h = t & -t, u >= h || u === 16 && (h & 4194240) !== 0)) return t;
    if ((l & 4) !== 0 && (l |= o & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= l; 0 < t; ) o = 31 - hn(t), u = 1 << o, l |= e[o], t &= ~u;
    return l;
  }
  function Dx(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
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
        return t + 5e3;
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
  function Ix(e, t) {
    for (var o = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, h = e.pendingLanes; 0 < h; ) {
      var b = 31 - hn(h), N = 1 << b, R = u[b];
      R === -1 ? ((N & o) === 0 || (N & l) !== 0) && (u[b] = Dx(N, t)) : R <= t && (e.expiredLanes |= N), h &= ~N;
    }
  }
  function Xi(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function ed() {
    var e = ta;
    return ta <<= 1, (ta & 4194240) === 0 && (ta = 64), e;
  }
  function Zi(e) {
    for (var t = [], o = 0; 31 > o; o++) t.push(e);
    return t;
  }
  function Qs(e, t, o) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - hn(t), e[t] = o;
  }
  function Ox(e, t) {
    var o = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var l = e.eventTimes;
    for (e = e.expirationTimes; 0 < o; ) {
      var u = 31 - hn(o), h = 1 << u;
      t[u] = 0, l[u] = -1, e[u] = -1, o &= ~h;
    }
  }
  function Ji(e, t) {
    var o = e.entangledLanes |= t;
    for (e = e.entanglements; o; ) {
      var l = 31 - hn(o), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), o &= ~u;
    }
  }
  var Ze = 0;
  function td(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var nd, el, rd, sd, od, tl = !1, sa = [], Zn = null, Jn = null, er = null, Ks = /* @__PURE__ */ new Map(), Ys = /* @__PURE__ */ new Map(), tr = [], zx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ad(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Zn = null;
        break;
      case "dragenter":
      case "dragleave":
        Jn = null;
        break;
      case "mouseover":
      case "mouseout":
        er = null;
        break;
      case "pointerover":
      case "pointerout":
        Ks.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ys.delete(t.pointerId);
    }
  }
  function qs(e, t, o, l, u, h) {
    return e === null || e.nativeEvent !== h ? (e = { blockedOn: t, domEventName: o, eventSystemFlags: l, nativeEvent: h, targetContainers: [u] }, t !== null && (t = uo(t), t !== null && el(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function Bx(e, t, o, l, u) {
    switch (t) {
      case "focusin":
        return Zn = qs(Zn, e, t, o, l, u), !0;
      case "dragenter":
        return Jn = qs(Jn, e, t, o, l, u), !0;
      case "mouseover":
        return er = qs(er, e, t, o, l, u), !0;
      case "pointerover":
        var h = u.pointerId;
        return Ks.set(h, qs(Ks.get(h) || null, e, t, o, l, u)), !0;
      case "gotpointercapture":
        return h = u.pointerId, Ys.set(h, qs(Ys.get(h) || null, e, t, o, l, u)), !0;
    }
    return !1;
  }
  function id(e) {
    var t = Ar(e.target);
    if (t !== null) {
      var o = Mn(t);
      if (o !== null) {
        if (t = o.tag, t === 13) {
          if (t = Yo(o), t !== null) {
            e.blockedOn = t, od(e.priority, function() {
              rd(o);
            });
            return;
          }
        } else if (t === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function oa(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var o = rl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (o === null) {
        o = e.nativeEvent;
        var l = new o.constructor(o.type, o);
        tn = l, o.target.dispatchEvent(l), tn = null;
      } else return t = uo(o), t !== null && el(t), e.blockedOn = o, !1;
      t.shift();
    }
    return !0;
  }
  function ld(e, t, o) {
    oa(e) && o.delete(t);
  }
  function Wx() {
    tl = !1, Zn !== null && oa(Zn) && (Zn = null), Jn !== null && oa(Jn) && (Jn = null), er !== null && oa(er) && (er = null), Ks.forEach(ld), Ys.forEach(ld);
  }
  function Xs(e, t) {
    e.blockedOn === t && (e.blockedOn = null, tl || (tl = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, Wx)));
  }
  function Zs(e) {
    function t(u) {
      return Xs(u, e);
    }
    if (0 < sa.length) {
      Xs(sa[0], e);
      for (var o = 1; o < sa.length; o++) {
        var l = sa[o];
        l.blockedOn === e && (l.blockedOn = null);
      }
    }
    for (Zn !== null && Xs(Zn, e), Jn !== null && Xs(Jn, e), er !== null && Xs(er, e), Ks.forEach(t), Ys.forEach(t), o = 0; o < tr.length; o++) l = tr[o], l.blockedOn === e && (l.blockedOn = null);
    for (; 0 < tr.length && (o = tr[0], o.blockedOn === null); ) id(o), o.blockedOn === null && tr.shift();
  }
  var os = $.ReactCurrentBatchConfig, aa = !0;
  function Ux(e, t, o, l) {
    var u = Ze, h = os.transition;
    os.transition = null;
    try {
      Ze = 1, nl(e, t, o, l);
    } finally {
      Ze = u, os.transition = h;
    }
  }
  function Hx(e, t, o, l) {
    var u = Ze, h = os.transition;
    os.transition = null;
    try {
      Ze = 4, nl(e, t, o, l);
    } finally {
      Ze = u, os.transition = h;
    }
  }
  function nl(e, t, o, l) {
    if (aa) {
      var u = rl(e, t, o, l);
      if (u === null) wl(e, t, l, ia, o), ad(e, l);
      else if (Bx(u, e, t, o, l)) l.stopPropagation();
      else if (ad(e, l), t & 4 && -1 < zx.indexOf(e)) {
        for (; u !== null; ) {
          var h = uo(u);
          if (h !== null && nd(h), h = rl(e, t, o, l), h === null && wl(e, t, l, ia, o), h === u) break;
          u = h;
        }
        u !== null && l.stopPropagation();
      } else wl(e, t, l, null, o);
    }
  }
  var ia = null;
  function rl(e, t, o, l) {
    if (ia = null, e = nn(l), e = Ar(e), e !== null) if (t = Mn(e), t === null) e = null;
    else if (o = t.tag, o === 13) {
      if (e = Yo(t), e !== null) return e;
      e = null;
    } else if (o === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return ia = e, null;
  }
  function cd(e) {
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
        switch (ke()) {
          case Je:
            return 1;
          case bt:
            return 4;
          case Xn:
          case qi:
            return 16;
          case ss:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var nr = null, sl = null, la = null;
  function ud() {
    if (la) return la;
    var e, t = sl, o = t.length, l, u = "value" in nr ? nr.value : nr.textContent, h = u.length;
    for (e = 0; e < o && t[e] === u[e]; e++) ;
    var b = o - e;
    for (l = 1; l <= b && t[o - l] === u[h - l]; l++) ;
    return la = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function ca(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ua() {
    return !0;
  }
  function dd() {
    return !1;
  }
  function Kt(e) {
    function t(o, l, u, h, b) {
      this._reactName = o, this._targetInst = u, this.type = l, this.nativeEvent = h, this.target = b, this.currentTarget = null;
      for (var N in e) e.hasOwnProperty(N) && (o = e[N], this[N] = o ? o(h) : h[N]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? ua : dd, this.isPropagationStopped = dd, this;
    }
    return J(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var o = this.nativeEvent;
      o && (o.preventDefault ? o.preventDefault() : typeof o.returnValue != "unknown" && (o.returnValue = !1), this.isDefaultPrevented = ua);
    }, stopPropagation: function() {
      var o = this.nativeEvent;
      o && (o.stopPropagation ? o.stopPropagation() : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0), this.isPropagationStopped = ua);
    }, persist: function() {
    }, isPersistent: ua }), t;
  }
  var as = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ol = Kt(as), Js = J({}, as, { view: 0, detail: 0 }), Vx = Kt(Js), al, il, eo, da = J({}, Js, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: cl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== eo && (eo && e.type === "mousemove" ? (al = e.screenX - eo.screenX, il = e.screenY - eo.screenY) : il = al = 0, eo = e), al);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : il;
  } }), fd = Kt(da), Gx = J({}, da, { dataTransfer: 0 }), Qx = Kt(Gx), Kx = J({}, Js, { relatedTarget: 0 }), ll = Kt(Kx), Yx = J({}, as, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), qx = Kt(Yx), Xx = J({}, as, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Zx = Kt(Xx), Jx = J({}, as, { data: 0 }), pd = Kt(Jx), e0 = {
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
  }, t0 = {
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
  }, n0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function r0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = n0[e]) ? !!t[e] : !1;
  }
  function cl() {
    return r0;
  }
  var s0 = J({}, Js, { key: function(e) {
    if (e.key) {
      var t = e0[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = ca(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? t0[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: cl, charCode: function(e) {
    return e.type === "keypress" ? ca(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? ca(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), o0 = Kt(s0), a0 = J({}, da, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), hd = Kt(a0), i0 = J({}, Js, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: cl }), l0 = Kt(i0), c0 = J({}, as, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), u0 = Kt(c0), d0 = J({}, da, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), f0 = Kt(d0), p0 = [9, 13, 27, 32], ul = f && "CompositionEvent" in window, to = null;
  f && "documentMode" in document && (to = document.documentMode);
  var h0 = f && "TextEvent" in window && !to, md = f && (!ul || to && 8 < to && 11 >= to), gd = " ", xd = !1;
  function vd(e, t) {
    switch (e) {
      case "keyup":
        return p0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function yd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var is = !1;
  function m0(e, t) {
    switch (e) {
      case "compositionend":
        return yd(t);
      case "keypress":
        return t.which !== 32 ? null : (xd = !0, gd);
      case "textInput":
        return e = t.data, e === gd && xd ? null : e;
      default:
        return null;
    }
  }
  function g0(e, t) {
    if (is) return e === "compositionend" || !ul && vd(e, t) ? (e = ud(), la = sl = nr = null, is = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return md && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var x0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function wd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!x0[e.type] : t === "textarea";
  }
  function bd(e, t, o, l) {
    At(l), t = ga(t, "onChange"), 0 < t.length && (o = new ol("onChange", "change", null, o, l), e.push({ event: o, listeners: t }));
  }
  var no = null, ro = null;
  function v0(e) {
    Od(e, 0);
  }
  function fa(e) {
    var t = fs(e);
    if (Ae(t)) return e;
  }
  function y0(e, t) {
    if (e === "change") return t;
  }
  var jd = !1;
  if (f) {
    var dl;
    if (f) {
      var fl = "oninput" in document;
      if (!fl) {
        var kd = document.createElement("div");
        kd.setAttribute("oninput", "return;"), fl = typeof kd.oninput == "function";
      }
      dl = fl;
    } else dl = !1;
    jd = dl && (!document.documentMode || 9 < document.documentMode);
  }
  function _d() {
    no && (no.detachEvent("onpropertychange", Sd), ro = no = null);
  }
  function Sd(e) {
    if (e.propertyName === "value" && fa(ro)) {
      var t = [];
      bd(t, ro, e, nn(e)), Go(v0, t);
    }
  }
  function w0(e, t, o) {
    e === "focusin" ? (_d(), no = t, ro = o, no.attachEvent("onpropertychange", Sd)) : e === "focusout" && _d();
  }
  function b0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return fa(ro);
  }
  function j0(e, t) {
    if (e === "click") return fa(t);
  }
  function k0(e, t) {
    if (e === "input" || e === "change") return fa(t);
  }
  function _0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var mn = typeof Object.is == "function" ? Object.is : _0;
  function so(e, t) {
    if (mn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var o = Object.keys(e), l = Object.keys(t);
    if (o.length !== l.length) return !1;
    for (l = 0; l < o.length; l++) {
      var u = o[l];
      if (!m.call(t, u) || !mn(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Nd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Cd(e, t) {
    var o = Nd(e);
    e = 0;
    for (var l; o; ) {
      if (o.nodeType === 3) {
        if (l = e + o.textContent.length, e <= t && l >= t) return { node: o, offset: t - e };
        e = l;
      }
      e: {
        for (; o; ) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = Nd(o);
    }
  }
  function Pd(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Pd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ed() {
    for (var e = window, t = Ie(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var o = typeof t.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) e = t.contentWindow;
      else break;
      t = Ie(e.document);
    }
    return t;
  }
  function pl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function S0(e) {
    var t = Ed(), o = e.focusedElem, l = e.selectionRange;
    if (t !== o && o && o.ownerDocument && Pd(o.ownerDocument.documentElement, o)) {
      if (l !== null && pl(o)) {
        if (t = l.start, e = l.end, e === void 0 && (e = t), "selectionStart" in o) o.selectionStart = t, o.selectionEnd = Math.min(e, o.value.length);
        else if (e = (t = o.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var u = o.textContent.length, h = Math.min(l.start, u);
          l = l.end === void 0 ? h : Math.min(l.end, u), !e.extend && h > l && (u = l, l = h, h = u), u = Cd(o, h);
          var b = Cd(
            o,
            l
          );
          u && b && (e.rangeCount !== 1 || e.anchorNode !== u.node || e.anchorOffset !== u.offset || e.focusNode !== b.node || e.focusOffset !== b.offset) && (t = t.createRange(), t.setStart(u.node, u.offset), e.removeAllRanges(), h > l ? (e.addRange(t), e.extend(b.node, b.offset)) : (t.setEnd(b.node, b.offset), e.addRange(t)));
        }
      }
      for (t = [], e = o; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof o.focus == "function" && o.focus(), o = 0; o < t.length; o++) e = t[o], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var N0 = f && "documentMode" in document && 11 >= document.documentMode, ls = null, hl = null, oo = null, ml = !1;
  function Td(e, t, o) {
    var l = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    ml || ls == null || ls !== Ie(l) || (l = ls, "selectionStart" in l && pl(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = { anchorNode: l.anchorNode, anchorOffset: l.anchorOffset, focusNode: l.focusNode, focusOffset: l.focusOffset }), oo && so(oo, l) || (oo = l, l = ga(hl, "onSelect"), 0 < l.length && (t = new ol("onSelect", "select", null, t, o), e.push({ event: t, listeners: l }), t.target = ls)));
  }
  function pa(e, t) {
    var o = {};
    return o[e.toLowerCase()] = t.toLowerCase(), o["Webkit" + e] = "webkit" + t, o["Moz" + e] = "moz" + t, o;
  }
  var cs = { animationend: pa("Animation", "AnimationEnd"), animationiteration: pa("Animation", "AnimationIteration"), animationstart: pa("Animation", "AnimationStart"), transitionend: pa("Transition", "TransitionEnd") }, gl = {}, Rd = {};
  f && (Rd = document.createElement("div").style, "AnimationEvent" in window || (delete cs.animationend.animation, delete cs.animationiteration.animation, delete cs.animationstart.animation), "TransitionEvent" in window || delete cs.transitionend.transition);
  function ha(e) {
    if (gl[e]) return gl[e];
    if (!cs[e]) return e;
    var t = cs[e], o;
    for (o in t) if (t.hasOwnProperty(o) && o in Rd) return gl[e] = t[o];
    return e;
  }
  var Ad = ha("animationend"), Fd = ha("animationiteration"), Md = ha("animationstart"), $d = ha("transitionend"), Ld = /* @__PURE__ */ new Map(), Dd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function rr(e, t) {
    Ld.set(e, t), d(t, [e]);
  }
  for (var xl = 0; xl < Dd.length; xl++) {
    var vl = Dd[xl], C0 = vl.toLowerCase(), P0 = vl[0].toUpperCase() + vl.slice(1);
    rr(C0, "on" + P0);
  }
  rr(Ad, "onAnimationEnd"), rr(Fd, "onAnimationIteration"), rr(Md, "onAnimationStart"), rr("dblclick", "onDoubleClick"), rr("focusin", "onFocus"), rr("focusout", "onBlur"), rr($d, "onTransitionEnd"), p("onMouseEnter", ["mouseout", "mouseover"]), p("onMouseLeave", ["mouseout", "mouseover"]), p("onPointerEnter", ["pointerout", "pointerover"]), p("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ao = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), E0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(ao));
  function Id(e, t, o) {
    var l = e.type || "unknown-event";
    e.currentTarget = o, Ju(l, t, void 0, e), e.currentTarget = null;
  }
  function Od(e, t) {
    t = (t & 4) !== 0;
    for (var o = 0; o < e.length; o++) {
      var l = e[o], u = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (t) for (var b = l.length - 1; 0 <= b; b--) {
          var N = l[b], R = N.instance, Q = N.currentTarget;
          if (N = N.listener, R !== h && u.isPropagationStopped()) break e;
          Id(u, N, Q), h = R;
        }
        else for (b = 0; b < l.length; b++) {
          if (N = l[b], R = N.instance, Q = N.currentTarget, N = N.listener, R !== h && u.isPropagationStopped()) break e;
          Id(u, N, Q), h = R;
        }
      }
    }
    if (qn) throw e = Hs, qn = !1, Hs = null, e;
  }
  function ot(e, t) {
    var o = t[Nl];
    o === void 0 && (o = t[Nl] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    o.has(l) || (zd(t, e, 2, !1), o.add(l));
  }
  function yl(e, t, o) {
    var l = 0;
    t && (l |= 4), zd(o, e, l, t);
  }
  var ma = "_reactListening" + Math.random().toString(36).slice(2);
  function io(e) {
    if (!e[ma]) {
      e[ma] = !0, i.forEach(function(o) {
        o !== "selectionchange" && (E0.has(o) || yl(o, !1, e), yl(o, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ma] || (t[ma] = !0, yl("selectionchange", !1, t));
    }
  }
  function zd(e, t, o, l) {
    switch (cd(t)) {
      case 1:
        var u = Ux;
        break;
      case 4:
        u = Hx;
        break;
      default:
        u = nl;
    }
    o = u.bind(null, t, o, e), u = void 0, !Qo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, o, { capture: !0, passive: u }) : e.addEventListener(t, o, !0) : u !== void 0 ? e.addEventListener(t, o, { passive: u }) : e.addEventListener(t, o, !1);
  }
  function wl(e, t, o, l, u) {
    var h = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null) e: for (; ; ) {
      if (l === null) return;
      var b = l.tag;
      if (b === 3 || b === 4) {
        var N = l.stateNode.containerInfo;
        if (N === u || N.nodeType === 8 && N.parentNode === u) break;
        if (b === 4) for (b = l.return; b !== null; ) {
          var R = b.tag;
          if ((R === 3 || R === 4) && (R = b.stateNode.containerInfo, R === u || R.nodeType === 8 && R.parentNode === u)) return;
          b = b.return;
        }
        for (; N !== null; ) {
          if (b = Ar(N), b === null) return;
          if (R = b.tag, R === 5 || R === 6) {
            l = h = b;
            continue e;
          }
          N = N.parentNode;
        }
      }
      l = l.return;
    }
    Go(function() {
      var Q = h, ie = nn(o), le = [];
      e: {
        var ae = Ld.get(e);
        if (ae !== void 0) {
          var fe = ol, ge = e;
          switch (e) {
            case "keypress":
              if (ca(o) === 0) break e;
            case "keydown":
            case "keyup":
              fe = o0;
              break;
            case "focusin":
              ge = "focus", fe = ll;
              break;
            case "focusout":
              ge = "blur", fe = ll;
              break;
            case "beforeblur":
            case "afterblur":
              fe = ll;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              fe = fd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              fe = Qx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              fe = l0;
              break;
            case Ad:
            case Fd:
            case Md:
              fe = qx;
              break;
            case $d:
              fe = u0;
              break;
            case "scroll":
              fe = Vx;
              break;
            case "wheel":
              fe = f0;
              break;
            case "copy":
            case "cut":
            case "paste":
              fe = Zx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              fe = hd;
          }
          var xe = (t & 4) !== 0, vt = !xe && e === "scroll", O = xe ? ae !== null ? ae + "Capture" : null : ae;
          xe = [];
          for (var F = Q, U; F !== null; ) {
            U = F;
            var ue = U.stateNode;
            if (U.tag === 5 && ue !== null && (U = ue, O !== null && (ue = Kn(F, O), ue != null && xe.push(lo(F, ue, U)))), vt) break;
            F = F.return;
          }
          0 < xe.length && (ae = new fe(ae, ge, null, o, ie), le.push({ event: ae, listeners: xe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (ae = e === "mouseover" || e === "pointerover", fe = e === "mouseout" || e === "pointerout", ae && o !== tn && (ge = o.relatedTarget || o.fromElement) && (Ar(ge) || ge[$n])) break e;
          if ((fe || ae) && (ae = ie.window === ie ? ie : (ae = ie.ownerDocument) ? ae.defaultView || ae.parentWindow : window, fe ? (ge = o.relatedTarget || o.toElement, fe = Q, ge = ge ? Ar(ge) : null, ge !== null && (vt = Mn(ge), ge !== vt || ge.tag !== 5 && ge.tag !== 6) && (ge = null)) : (fe = null, ge = Q), fe !== ge)) {
            if (xe = fd, ue = "onMouseLeave", O = "onMouseEnter", F = "mouse", (e === "pointerout" || e === "pointerover") && (xe = hd, ue = "onPointerLeave", O = "onPointerEnter", F = "pointer"), vt = fe == null ? ae : fs(fe), U = ge == null ? ae : fs(ge), ae = new xe(ue, F + "leave", fe, o, ie), ae.target = vt, ae.relatedTarget = U, ue = null, Ar(ie) === Q && (xe = new xe(O, F + "enter", ge, o, ie), xe.target = U, xe.relatedTarget = vt, ue = xe), vt = ue, fe && ge) t: {
              for (xe = fe, O = ge, F = 0, U = xe; U; U = us(U)) F++;
              for (U = 0, ue = O; ue; ue = us(ue)) U++;
              for (; 0 < F - U; ) xe = us(xe), F--;
              for (; 0 < U - F; ) O = us(O), U--;
              for (; F--; ) {
                if (xe === O || O !== null && xe === O.alternate) break t;
                xe = us(xe), O = us(O);
              }
              xe = null;
            }
            else xe = null;
            fe !== null && Bd(le, ae, fe, xe, !1), ge !== null && vt !== null && Bd(le, vt, ge, xe, !0);
          }
        }
        e: {
          if (ae = Q ? fs(Q) : window, fe = ae.nodeName && ae.nodeName.toLowerCase(), fe === "select" || fe === "input" && ae.type === "file") var ye = y0;
          else if (wd(ae)) if (jd) ye = k0;
          else {
            ye = b0;
            var Ne = w0;
          }
          else (fe = ae.nodeName) && fe.toLowerCase() === "input" && (ae.type === "checkbox" || ae.type === "radio") && (ye = j0);
          if (ye && (ye = ye(e, Q))) {
            bd(le, ye, o, ie);
            break e;
          }
          Ne && Ne(e, ae, Q), e === "focusout" && (Ne = ae._wrapperState) && Ne.controlled && ae.type === "number" && st(ae, "number", ae.value);
        }
        switch (Ne = Q ? fs(Q) : window, e) {
          case "focusin":
            (wd(Ne) || Ne.contentEditable === "true") && (ls = Ne, hl = Q, oo = null);
            break;
          case "focusout":
            oo = hl = ls = null;
            break;
          case "mousedown":
            ml = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ml = !1, Td(le, o, ie);
            break;
          case "selectionchange":
            if (N0) break;
          case "keydown":
          case "keyup":
            Td(le, o, ie);
        }
        var Ce;
        if (ul) e: {
          switch (e) {
            case "compositionstart":
              var $e = "onCompositionStart";
              break e;
            case "compositionend":
              $e = "onCompositionEnd";
              break e;
            case "compositionupdate":
              $e = "onCompositionUpdate";
              break e;
          }
          $e = void 0;
        }
        else is ? vd(e, o) && ($e = "onCompositionEnd") : e === "keydown" && o.keyCode === 229 && ($e = "onCompositionStart");
        $e && (md && o.locale !== "ko" && (is || $e !== "onCompositionStart" ? $e === "onCompositionEnd" && is && (Ce = ud()) : (nr = ie, sl = "value" in nr ? nr.value : nr.textContent, is = !0)), Ne = ga(Q, $e), 0 < Ne.length && ($e = new pd($e, e, null, o, ie), le.push({ event: $e, listeners: Ne }), Ce ? $e.data = Ce : (Ce = yd(o), Ce !== null && ($e.data = Ce)))), (Ce = h0 ? m0(e, o) : g0(e, o)) && (Q = ga(Q, "onBeforeInput"), 0 < Q.length && (ie = new pd("onBeforeInput", "beforeinput", null, o, ie), le.push({ event: ie, listeners: Q }), ie.data = Ce));
      }
      Od(le, t);
    });
  }
  function lo(e, t, o) {
    return { instance: e, listener: t, currentTarget: o };
  }
  function ga(e, t) {
    for (var o = t + "Capture", l = []; e !== null; ) {
      var u = e, h = u.stateNode;
      u.tag === 5 && h !== null && (u = h, h = Kn(e, o), h != null && l.unshift(lo(e, h, u)), h = Kn(e, t), h != null && l.push(lo(e, h, u))), e = e.return;
    }
    return l;
  }
  function us(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Bd(e, t, o, l, u) {
    for (var h = t._reactName, b = []; o !== null && o !== l; ) {
      var N = o, R = N.alternate, Q = N.stateNode;
      if (R !== null && R === l) break;
      N.tag === 5 && Q !== null && (N = Q, u ? (R = Kn(o, h), R != null && b.unshift(lo(o, R, N))) : u || (R = Kn(o, h), R != null && b.push(lo(o, R, N)))), o = o.return;
    }
    b.length !== 0 && e.push({ event: t, listeners: b });
  }
  var T0 = /\r\n?/g, R0 = /\u0000|\uFFFD/g;
  function Wd(e) {
    return (typeof e == "string" ? e : "" + e).replace(T0, `
`).replace(R0, "");
  }
  function xa(e, t, o) {
    if (t = Wd(t), Wd(e) !== t && o) throw Error(a(425));
  }
  function va() {
  }
  var bl = null, jl = null;
  function kl(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var _l = typeof setTimeout == "function" ? setTimeout : void 0, A0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Ud = typeof Promise == "function" ? Promise : void 0, F0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ud < "u" ? function(e) {
    return Ud.resolve(null).then(e).catch(M0);
  } : _l;
  function M0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Sl(e, t) {
    var o = t, l = 0;
    do {
      var u = o.nextSibling;
      if (e.removeChild(o), u && u.nodeType === 8) if (o = u.data, o === "/$") {
        if (l === 0) {
          e.removeChild(u), Zs(t);
          return;
        }
        l--;
      } else o !== "$" && o !== "$?" && o !== "$!" || l++;
      o = u;
    } while (o);
    Zs(t);
  }
  function sr(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Hd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var o = e.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (t === 0) return e;
          t--;
        } else o === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var ds = Math.random().toString(36).slice(2), Sn = "__reactFiber$" + ds, co = "__reactProps$" + ds, $n = "__reactContainer$" + ds, Nl = "__reactEvents$" + ds, $0 = "__reactListeners$" + ds, L0 = "__reactHandles$" + ds;
  function Ar(e) {
    var t = e[Sn];
    if (t) return t;
    for (var o = e.parentNode; o; ) {
      if (t = o[$n] || o[Sn]) {
        if (o = t.alternate, t.child !== null || o !== null && o.child !== null) for (e = Hd(e); e !== null; ) {
          if (o = e[Sn]) return o;
          e = Hd(e);
        }
        return t;
      }
      e = o, o = e.parentNode;
    }
    return null;
  }
  function uo(e) {
    return e = e[Sn] || e[$n], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function fs(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(a(33));
  }
  function ya(e) {
    return e[co] || null;
  }
  var Cl = [], ps = -1;
  function or(e) {
    return { current: e };
  }
  function at(e) {
    0 > ps || (e.current = Cl[ps], Cl[ps] = null, ps--);
  }
  function rt(e, t) {
    ps++, Cl[ps] = e.current, e.current = t;
  }
  var ar = {}, Mt = or(ar), Bt = or(!1), Fr = ar;
  function hs(e, t) {
    var o = e.type.contextTypes;
    if (!o) return ar;
    var l = e.stateNode;
    if (l && l.__reactInternalMemoizedUnmaskedChildContext === t) return l.__reactInternalMemoizedMaskedChildContext;
    var u = {}, h;
    for (h in o) u[h] = t[h];
    return l && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = u), u;
  }
  function Wt(e) {
    return e = e.childContextTypes, e != null;
  }
  function wa() {
    at(Bt), at(Mt);
  }
  function Vd(e, t, o) {
    if (Mt.current !== ar) throw Error(a(168));
    rt(Mt, t), rt(Bt, o);
  }
  function Gd(e, t, o) {
    var l = e.stateNode;
    if (t = t.childContextTypes, typeof l.getChildContext != "function") return o;
    l = l.getChildContext();
    for (var u in l) if (!(u in t)) throw Error(a(108, ce(e) || "Unknown", u));
    return J({}, o, l);
  }
  function ba(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ar, Fr = Mt.current, rt(Mt, e), rt(Bt, Bt.current), !0;
  }
  function Qd(e, t, o) {
    var l = e.stateNode;
    if (!l) throw Error(a(169));
    o ? (e = Gd(e, t, Fr), l.__reactInternalMemoizedMergedChildContext = e, at(Bt), at(Mt), rt(Mt, e)) : at(Bt), rt(Bt, o);
  }
  var Ln = null, ja = !1, Pl = !1;
  function Kd(e) {
    Ln === null ? Ln = [e] : Ln.push(e);
  }
  function D0(e) {
    ja = !0, Kd(e);
  }
  function ir() {
    if (!Pl && Ln !== null) {
      Pl = !0;
      var e = 0, t = Ze;
      try {
        var o = Ln;
        for (Ze = 1; e < o.length; e++) {
          var l = o[e];
          do
            l = l(!0);
          while (l !== null);
        }
        Ln = null, ja = !1;
      } catch (u) {
        throw Ln !== null && (Ln = Ln.slice(e + 1)), Jo(Je, ir), u;
      } finally {
        Ze = t, Pl = !1;
      }
    }
    return null;
  }
  var ms = [], gs = 0, ka = null, _a = 0, sn = [], on = 0, Mr = null, Dn = 1, In = "";
  function $r(e, t) {
    ms[gs++] = _a, ms[gs++] = ka, ka = e, _a = t;
  }
  function Yd(e, t, o) {
    sn[on++] = Dn, sn[on++] = In, sn[on++] = Mr, Mr = e;
    var l = Dn;
    e = In;
    var u = 32 - hn(l) - 1;
    l &= ~(1 << u), o += 1;
    var h = 32 - hn(t) + u;
    if (30 < h) {
      var b = u - u % 5;
      h = (l & (1 << b) - 1).toString(32), l >>= b, u -= b, Dn = 1 << 32 - hn(t) + u | o << u | l, In = h + e;
    } else Dn = 1 << h | o << u | l, In = e;
  }
  function El(e) {
    e.return !== null && ($r(e, 1), Yd(e, 1, 0));
  }
  function Tl(e) {
    for (; e === ka; ) ka = ms[--gs], ms[gs] = null, _a = ms[--gs], ms[gs] = null;
    for (; e === Mr; ) Mr = sn[--on], sn[on] = null, In = sn[--on], sn[on] = null, Dn = sn[--on], sn[on] = null;
  }
  var Yt = null, qt = null, ct = !1, gn = null;
  function qd(e, t) {
    var o = un(5, null, null, 0);
    o.elementType = "DELETED", o.stateNode = t, o.return = e, t = e.deletions, t === null ? (e.deletions = [o], e.flags |= 16) : t.push(o);
  }
  function Xd(e, t) {
    switch (e.tag) {
      case 5:
        var o = e.type;
        return t = t.nodeType !== 1 || o.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Yt = e, qt = sr(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Yt = e, qt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (o = Mr !== null ? { id: Dn, overflow: In } : null, e.memoizedState = { dehydrated: t, treeContext: o, retryLane: 1073741824 }, o = un(18, null, null, 0), o.stateNode = t, o.return = e, e.child = o, Yt = e, qt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Rl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Al(e) {
    if (ct) {
      var t = qt;
      if (t) {
        var o = t;
        if (!Xd(e, t)) {
          if (Rl(e)) throw Error(a(418));
          t = sr(o.nextSibling);
          var l = Yt;
          t && Xd(e, t) ? qd(l, o) : (e.flags = e.flags & -4097 | 2, ct = !1, Yt = e);
        }
      } else {
        if (Rl(e)) throw Error(a(418));
        e.flags = e.flags & -4097 | 2, ct = !1, Yt = e;
      }
    }
  }
  function Zd(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Yt = e;
  }
  function Sa(e) {
    if (e !== Yt) return !1;
    if (!ct) return Zd(e), ct = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !kl(e.type, e.memoizedProps)), t && (t = qt)) {
      if (Rl(e)) throw Jd(), Error(a(418));
      for (; t; ) qd(e, t), t = sr(t.nextSibling);
    }
    if (Zd(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var o = e.data;
            if (o === "/$") {
              if (t === 0) {
                qt = sr(e.nextSibling);
                break e;
              }
              t--;
            } else o !== "$" && o !== "$!" && o !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        qt = null;
      }
    } else qt = Yt ? sr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Jd() {
    for (var e = qt; e; ) e = sr(e.nextSibling);
  }
  function xs() {
    qt = Yt = null, ct = !1;
  }
  function Fl(e) {
    gn === null ? gn = [e] : gn.push(e);
  }
  var I0 = $.ReactCurrentBatchConfig;
  function fo(e, t, o) {
    if (e = o.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (o._owner) {
        if (o = o._owner, o) {
          if (o.tag !== 1) throw Error(a(309));
          var l = o.stateNode;
        }
        if (!l) throw Error(a(147, e));
        var u = l, h = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === h ? t.ref : (t = function(b) {
          var N = u.refs;
          b === null ? delete N[h] : N[h] = b;
        }, t._stringRef = h, t);
      }
      if (typeof e != "string") throw Error(a(284));
      if (!o._owner) throw Error(a(290, e));
    }
    return e;
  }
  function Na(e, t) {
    throw e = Object.prototype.toString.call(t), Error(a(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function ef(e) {
    var t = e._init;
    return t(e._payload);
  }
  function tf(e) {
    function t(O, F) {
      if (e) {
        var U = O.deletions;
        U === null ? (O.deletions = [F], O.flags |= 16) : U.push(F);
      }
    }
    function o(O, F) {
      if (!e) return null;
      for (; F !== null; ) t(O, F), F = F.sibling;
      return null;
    }
    function l(O, F) {
      for (O = /* @__PURE__ */ new Map(); F !== null; ) F.key !== null ? O.set(F.key, F) : O.set(F.index, F), F = F.sibling;
      return O;
    }
    function u(O, F) {
      return O = mr(O, F), O.index = 0, O.sibling = null, O;
    }
    function h(O, F, U) {
      return O.index = U, e ? (U = O.alternate, U !== null ? (U = U.index, U < F ? (O.flags |= 2, F) : U) : (O.flags |= 2, F)) : (O.flags |= 1048576, F);
    }
    function b(O) {
      return e && O.alternate === null && (O.flags |= 2), O;
    }
    function N(O, F, U, ue) {
      return F === null || F.tag !== 6 ? (F = _c(U, O.mode, ue), F.return = O, F) : (F = u(F, U), F.return = O, F);
    }
    function R(O, F, U, ue) {
      var ye = U.type;
      return ye === H ? ie(O, F, U.props.children, ue, U.key) : F !== null && (F.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === X && ef(ye) === F.type) ? (ue = u(F, U.props), ue.ref = fo(O, F, U), ue.return = O, ue) : (ue = qa(U.type, U.key, U.props, null, O.mode, ue), ue.ref = fo(O, F, U), ue.return = O, ue);
    }
    function Q(O, F, U, ue) {
      return F === null || F.tag !== 4 || F.stateNode.containerInfo !== U.containerInfo || F.stateNode.implementation !== U.implementation ? (F = Sc(U, O.mode, ue), F.return = O, F) : (F = u(F, U.children || []), F.return = O, F);
    }
    function ie(O, F, U, ue, ye) {
      return F === null || F.tag !== 7 ? (F = Ur(U, O.mode, ue, ye), F.return = O, F) : (F = u(F, U), F.return = O, F);
    }
    function le(O, F, U) {
      if (typeof F == "string" && F !== "" || typeof F == "number") return F = _c("" + F, O.mode, U), F.return = O, F;
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case V:
            return U = qa(F.type, F.key, F.props, null, O.mode, U), U.ref = fo(O, null, F), U.return = O, U;
          case Z:
            return F = Sc(F, O.mode, U), F.return = O, F;
          case X:
            var ue = F._init;
            return le(O, ue(F._payload), U);
        }
        if (E(F) || ne(F)) return F = Ur(F, O.mode, U, null), F.return = O, F;
        Na(O, F);
      }
      return null;
    }
    function ae(O, F, U, ue) {
      var ye = F !== null ? F.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number") return ye !== null ? null : N(O, F, "" + U, ue);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case V:
            return U.key === ye ? R(O, F, U, ue) : null;
          case Z:
            return U.key === ye ? Q(O, F, U, ue) : null;
          case X:
            return ye = U._init, ae(
              O,
              F,
              ye(U._payload),
              ue
            );
        }
        if (E(U) || ne(U)) return ye !== null ? null : ie(O, F, U, ue, null);
        Na(O, U);
      }
      return null;
    }
    function fe(O, F, U, ue, ye) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return O = O.get(U) || null, N(F, O, "" + ue, ye);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case V:
            return O = O.get(ue.key === null ? U : ue.key) || null, R(F, O, ue, ye);
          case Z:
            return O = O.get(ue.key === null ? U : ue.key) || null, Q(F, O, ue, ye);
          case X:
            var Ne = ue._init;
            return fe(O, F, U, Ne(ue._payload), ye);
        }
        if (E(ue) || ne(ue)) return O = O.get(U) || null, ie(F, O, ue, ye, null);
        Na(F, ue);
      }
      return null;
    }
    function ge(O, F, U, ue) {
      for (var ye = null, Ne = null, Ce = F, $e = F = 0, Pt = null; Ce !== null && $e < U.length; $e++) {
        Ce.index > $e ? (Pt = Ce, Ce = null) : Pt = Ce.sibling;
        var Ye = ae(O, Ce, U[$e], ue);
        if (Ye === null) {
          Ce === null && (Ce = Pt);
          break;
        }
        e && Ce && Ye.alternate === null && t(O, Ce), F = h(Ye, F, $e), Ne === null ? ye = Ye : Ne.sibling = Ye, Ne = Ye, Ce = Pt;
      }
      if ($e === U.length) return o(O, Ce), ct && $r(O, $e), ye;
      if (Ce === null) {
        for (; $e < U.length; $e++) Ce = le(O, U[$e], ue), Ce !== null && (F = h(Ce, F, $e), Ne === null ? ye = Ce : Ne.sibling = Ce, Ne = Ce);
        return ct && $r(O, $e), ye;
      }
      for (Ce = l(O, Ce); $e < U.length; $e++) Pt = fe(Ce, O, $e, U[$e], ue), Pt !== null && (e && Pt.alternate !== null && Ce.delete(Pt.key === null ? $e : Pt.key), F = h(Pt, F, $e), Ne === null ? ye = Pt : Ne.sibling = Pt, Ne = Pt);
      return e && Ce.forEach(function(gr) {
        return t(O, gr);
      }), ct && $r(O, $e), ye;
    }
    function xe(O, F, U, ue) {
      var ye = ne(U);
      if (typeof ye != "function") throw Error(a(150));
      if (U = ye.call(U), U == null) throw Error(a(151));
      for (var Ne = ye = null, Ce = F, $e = F = 0, Pt = null, Ye = U.next(); Ce !== null && !Ye.done; $e++, Ye = U.next()) {
        Ce.index > $e ? (Pt = Ce, Ce = null) : Pt = Ce.sibling;
        var gr = ae(O, Ce, Ye.value, ue);
        if (gr === null) {
          Ce === null && (Ce = Pt);
          break;
        }
        e && Ce && gr.alternate === null && t(O, Ce), F = h(gr, F, $e), Ne === null ? ye = gr : Ne.sibling = gr, Ne = gr, Ce = Pt;
      }
      if (Ye.done) return o(
        O,
        Ce
      ), ct && $r(O, $e), ye;
      if (Ce === null) {
        for (; !Ye.done; $e++, Ye = U.next()) Ye = le(O, Ye.value, ue), Ye !== null && (F = h(Ye, F, $e), Ne === null ? ye = Ye : Ne.sibling = Ye, Ne = Ye);
        return ct && $r(O, $e), ye;
      }
      for (Ce = l(O, Ce); !Ye.done; $e++, Ye = U.next()) Ye = fe(Ce, O, $e, Ye.value, ue), Ye !== null && (e && Ye.alternate !== null && Ce.delete(Ye.key === null ? $e : Ye.key), F = h(Ye, F, $e), Ne === null ? ye = Ye : Ne.sibling = Ye, Ne = Ye);
      return e && Ce.forEach(function(xv) {
        return t(O, xv);
      }), ct && $r(O, $e), ye;
    }
    function vt(O, F, U, ue) {
      if (typeof U == "object" && U !== null && U.type === H && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case V:
            e: {
              for (var ye = U.key, Ne = F; Ne !== null; ) {
                if (Ne.key === ye) {
                  if (ye = U.type, ye === H) {
                    if (Ne.tag === 7) {
                      o(O, Ne.sibling), F = u(Ne, U.props.children), F.return = O, O = F;
                      break e;
                    }
                  } else if (Ne.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === X && ef(ye) === Ne.type) {
                    o(O, Ne.sibling), F = u(Ne, U.props), F.ref = fo(O, Ne, U), F.return = O, O = F;
                    break e;
                  }
                  o(O, Ne);
                  break;
                } else t(O, Ne);
                Ne = Ne.sibling;
              }
              U.type === H ? (F = Ur(U.props.children, O.mode, ue, U.key), F.return = O, O = F) : (ue = qa(U.type, U.key, U.props, null, O.mode, ue), ue.ref = fo(O, F, U), ue.return = O, O = ue);
            }
            return b(O);
          case Z:
            e: {
              for (Ne = U.key; F !== null; ) {
                if (F.key === Ne) if (F.tag === 4 && F.stateNode.containerInfo === U.containerInfo && F.stateNode.implementation === U.implementation) {
                  o(O, F.sibling), F = u(F, U.children || []), F.return = O, O = F;
                  break e;
                } else {
                  o(O, F);
                  break;
                }
                else t(O, F);
                F = F.sibling;
              }
              F = Sc(U, O.mode, ue), F.return = O, O = F;
            }
            return b(O);
          case X:
            return Ne = U._init, vt(O, F, Ne(U._payload), ue);
        }
        if (E(U)) return ge(O, F, U, ue);
        if (ne(U)) return xe(O, F, U, ue);
        Na(O, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" ? (U = "" + U, F !== null && F.tag === 6 ? (o(O, F.sibling), F = u(F, U), F.return = O, O = F) : (o(O, F), F = _c(U, O.mode, ue), F.return = O, O = F), b(O)) : o(O, F);
    }
    return vt;
  }
  var vs = tf(!0), nf = tf(!1), Ca = or(null), Pa = null, ys = null, Ml = null;
  function $l() {
    Ml = ys = Pa = null;
  }
  function Ll(e) {
    var t = Ca.current;
    at(Ca), e._currentValue = t;
  }
  function Dl(e, t, o) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === o) break;
      e = e.return;
    }
  }
  function ws(e, t) {
    Pa = e, Ml = ys = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ut = !0), e.firstContext = null);
  }
  function an(e) {
    var t = e._currentValue;
    if (Ml !== e) if (e = { context: e, memoizedValue: t, next: null }, ys === null) {
      if (Pa === null) throw Error(a(308));
      ys = e, Pa.dependencies = { lanes: 0, firstContext: e };
    } else ys = ys.next = e;
    return t;
  }
  var Lr = null;
  function Il(e) {
    Lr === null ? Lr = [e] : Lr.push(e);
  }
  function rf(e, t, o, l) {
    var u = t.interleaved;
    return u === null ? (o.next = o, Il(t)) : (o.next = u.next, u.next = o), t.interleaved = o, On(e, l);
  }
  function On(e, t) {
    e.lanes |= t;
    var o = e.alternate;
    for (o !== null && (o.lanes |= t), o = e, e = e.return; e !== null; ) e.childLanes |= t, o = e.alternate, o !== null && (o.childLanes |= t), o = e, e = e.return;
    return o.tag === 3 ? o.stateNode : null;
  }
  var lr = !1;
  function Ol(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function sf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function zn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function cr(e, t, o) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ke & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, On(e, o);
    }
    return u = l.interleaved, u === null ? (t.next = t, Il(l)) : (t.next = u.next, u.next = t), l.interleaved = t, On(e, o);
  }
  function Ea(e, t, o) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (o & 4194240) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, o |= l, t.lanes = o, Ji(e, o);
    }
  }
  function of(e, t) {
    var o = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, o === l)) {
      var u = null, h = null;
      if (o = o.firstBaseUpdate, o !== null) {
        do {
          var b = { eventTime: o.eventTime, lane: o.lane, tag: o.tag, payload: o.payload, callback: o.callback, next: null };
          h === null ? u = h = b : h = h.next = b, o = o.next;
        } while (o !== null);
        h === null ? u = h = t : h = h.next = t;
      } else u = h = t;
      o = { baseState: l.baseState, firstBaseUpdate: u, lastBaseUpdate: h, shared: l.shared, effects: l.effects }, e.updateQueue = o;
      return;
    }
    e = o.lastBaseUpdate, e === null ? o.firstBaseUpdate = t : e.next = t, o.lastBaseUpdate = t;
  }
  function Ta(e, t, o, l) {
    var u = e.updateQueue;
    lr = !1;
    var h = u.firstBaseUpdate, b = u.lastBaseUpdate, N = u.shared.pending;
    if (N !== null) {
      u.shared.pending = null;
      var R = N, Q = R.next;
      R.next = null, b === null ? h = Q : b.next = Q, b = R;
      var ie = e.alternate;
      ie !== null && (ie = ie.updateQueue, N = ie.lastBaseUpdate, N !== b && (N === null ? ie.firstBaseUpdate = Q : N.next = Q, ie.lastBaseUpdate = R));
    }
    if (h !== null) {
      var le = u.baseState;
      b = 0, ie = Q = R = null, N = h;
      do {
        var ae = N.lane, fe = N.eventTime;
        if ((l & ae) === ae) {
          ie !== null && (ie = ie.next = {
            eventTime: fe,
            lane: 0,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null
          });
          e: {
            var ge = e, xe = N;
            switch (ae = t, fe = o, xe.tag) {
              case 1:
                if (ge = xe.payload, typeof ge == "function") {
                  le = ge.call(fe, le, ae);
                  break e;
                }
                le = ge;
                break e;
              case 3:
                ge.flags = ge.flags & -65537 | 128;
              case 0:
                if (ge = xe.payload, ae = typeof ge == "function" ? ge.call(fe, le, ae) : ge, ae == null) break e;
                le = J({}, le, ae);
                break e;
              case 2:
                lr = !0;
            }
          }
          N.callback !== null && N.lane !== 0 && (e.flags |= 64, ae = u.effects, ae === null ? u.effects = [N] : ae.push(N));
        } else fe = { eventTime: fe, lane: ae, tag: N.tag, payload: N.payload, callback: N.callback, next: null }, ie === null ? (Q = ie = fe, R = le) : ie = ie.next = fe, b |= ae;
        if (N = N.next, N === null) {
          if (N = u.shared.pending, N === null) break;
          ae = N, N = ae.next, ae.next = null, u.lastBaseUpdate = ae, u.shared.pending = null;
        }
      } while (!0);
      if (ie === null && (R = le), u.baseState = R, u.firstBaseUpdate = Q, u.lastBaseUpdate = ie, t = u.shared.interleaved, t !== null) {
        u = t;
        do
          b |= u.lane, u = u.next;
        while (u !== t);
      } else h === null && (u.shared.lanes = 0);
      Or |= b, e.lanes = b, e.memoizedState = le;
    }
  }
  function af(e, t, o) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var l = e[t], u = l.callback;
      if (u !== null) {
        if (l.callback = null, l = o, typeof u != "function") throw Error(a(191, u));
        u.call(l);
      }
    }
  }
  var po = {}, Nn = or(po), ho = or(po), mo = or(po);
  function Dr(e) {
    if (e === po) throw Error(a(174));
    return e;
  }
  function zl(e, t) {
    switch (rt(mo, t), rt(ho, e), rt(Nn, po), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : _e(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = _e(t, e);
    }
    at(Nn), rt(Nn, t);
  }
  function bs() {
    at(Nn), at(ho), at(mo);
  }
  function lf(e) {
    Dr(mo.current);
    var t = Dr(Nn.current), o = _e(t, e.type);
    t !== o && (rt(ho, e), rt(Nn, o));
  }
  function Bl(e) {
    ho.current === e && (at(Nn), at(ho));
  }
  var ut = or(0);
  function Ra(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var o = t.memoizedState;
        if (o !== null && (o = o.dehydrated, o === null || o.data === "$?" || o.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Wl = [];
  function Ul() {
    for (var e = 0; e < Wl.length; e++) Wl[e]._workInProgressVersionPrimary = null;
    Wl.length = 0;
  }
  var Aa = $.ReactCurrentDispatcher, Hl = $.ReactCurrentBatchConfig, Ir = 0, dt = null, jt = null, Nt = null, Fa = !1, go = !1, xo = 0, O0 = 0;
  function $t() {
    throw Error(a(321));
  }
  function Vl(e, t) {
    if (t === null) return !1;
    for (var o = 0; o < t.length && o < e.length; o++) if (!mn(e[o], t[o])) return !1;
    return !0;
  }
  function Gl(e, t, o, l, u, h) {
    if (Ir = h, dt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Aa.current = e === null || e.memoizedState === null ? U0 : H0, e = o(l, u), go) {
      h = 0;
      do {
        if (go = !1, xo = 0, 25 <= h) throw Error(a(301));
        h += 1, Nt = jt = null, t.updateQueue = null, Aa.current = V0, e = o(l, u);
      } while (go);
    }
    if (Aa.current = La, t = jt !== null && jt.next !== null, Ir = 0, Nt = jt = dt = null, Fa = !1, t) throw Error(a(300));
    return e;
  }
  function Ql() {
    var e = xo !== 0;
    return xo = 0, e;
  }
  function Cn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Nt === null ? dt.memoizedState = Nt = e : Nt = Nt.next = e, Nt;
  }
  function ln() {
    if (jt === null) {
      var e = dt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = jt.next;
    var t = Nt === null ? dt.memoizedState : Nt.next;
    if (t !== null) Nt = t, jt = e;
    else {
      if (e === null) throw Error(a(310));
      jt = e, e = { memoizedState: jt.memoizedState, baseState: jt.baseState, baseQueue: jt.baseQueue, queue: jt.queue, next: null }, Nt === null ? dt.memoizedState = Nt = e : Nt = Nt.next = e;
    }
    return Nt;
  }
  function vo(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Kl(e) {
    var t = ln(), o = t.queue;
    if (o === null) throw Error(a(311));
    o.lastRenderedReducer = e;
    var l = jt, u = l.baseQueue, h = o.pending;
    if (h !== null) {
      if (u !== null) {
        var b = u.next;
        u.next = h.next, h.next = b;
      }
      l.baseQueue = u = h, o.pending = null;
    }
    if (u !== null) {
      h = u.next, l = l.baseState;
      var N = b = null, R = null, Q = h;
      do {
        var ie = Q.lane;
        if ((Ir & ie) === ie) R !== null && (R = R.next = { lane: 0, action: Q.action, hasEagerState: Q.hasEagerState, eagerState: Q.eagerState, next: null }), l = Q.hasEagerState ? Q.eagerState : e(l, Q.action);
        else {
          var le = {
            lane: ie,
            action: Q.action,
            hasEagerState: Q.hasEagerState,
            eagerState: Q.eagerState,
            next: null
          };
          R === null ? (N = R = le, b = l) : R = R.next = le, dt.lanes |= ie, Or |= ie;
        }
        Q = Q.next;
      } while (Q !== null && Q !== h);
      R === null ? b = l : R.next = N, mn(l, t.memoizedState) || (Ut = !0), t.memoizedState = l, t.baseState = b, t.baseQueue = R, o.lastRenderedState = l;
    }
    if (e = o.interleaved, e !== null) {
      u = e;
      do
        h = u.lane, dt.lanes |= h, Or |= h, u = u.next;
      while (u !== e);
    } else u === null && (o.lanes = 0);
    return [t.memoizedState, o.dispatch];
  }
  function Yl(e) {
    var t = ln(), o = t.queue;
    if (o === null) throw Error(a(311));
    o.lastRenderedReducer = e;
    var l = o.dispatch, u = o.pending, h = t.memoizedState;
    if (u !== null) {
      o.pending = null;
      var b = u = u.next;
      do
        h = e(h, b.action), b = b.next;
      while (b !== u);
      mn(h, t.memoizedState) || (Ut = !0), t.memoizedState = h, t.baseQueue === null && (t.baseState = h), o.lastRenderedState = h;
    }
    return [h, l];
  }
  function cf() {
  }
  function uf(e, t) {
    var o = dt, l = ln(), u = t(), h = !mn(l.memoizedState, u);
    if (h && (l.memoizedState = u, Ut = !0), l = l.queue, ql(pf.bind(null, o, l, e), [e]), l.getSnapshot !== t || h || Nt !== null && Nt.memoizedState.tag & 1) {
      if (o.flags |= 2048, yo(9, ff.bind(null, o, l, u, t), void 0, null), Ct === null) throw Error(a(349));
      (Ir & 30) !== 0 || df(o, t, u);
    }
    return u;
  }
  function df(e, t, o) {
    e.flags |= 16384, e = { getSnapshot: t, value: o }, t = dt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, dt.updateQueue = t, t.stores = [e]) : (o = t.stores, o === null ? t.stores = [e] : o.push(e));
  }
  function ff(e, t, o, l) {
    t.value = o, t.getSnapshot = l, hf(t) && mf(e);
  }
  function pf(e, t, o) {
    return o(function() {
      hf(t) && mf(e);
    });
  }
  function hf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var o = t();
      return !mn(e, o);
    } catch {
      return !0;
    }
  }
  function mf(e) {
    var t = On(e, 1);
    t !== null && wn(t, e, 1, -1);
  }
  function gf(e) {
    var t = Cn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: vo, lastRenderedState: e }, t.queue = e, e = e.dispatch = W0.bind(null, dt, e), [t.memoizedState, e];
  }
  function yo(e, t, o, l) {
    return e = { tag: e, create: t, destroy: o, deps: l, next: null }, t = dt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, dt.updateQueue = t, t.lastEffect = e.next = e) : (o = t.lastEffect, o === null ? t.lastEffect = e.next = e : (l = o.next, o.next = e, e.next = l, t.lastEffect = e)), e;
  }
  function xf() {
    return ln().memoizedState;
  }
  function Ma(e, t, o, l) {
    var u = Cn();
    dt.flags |= e, u.memoizedState = yo(1 | t, o, void 0, l === void 0 ? null : l);
  }
  function $a(e, t, o, l) {
    var u = ln();
    l = l === void 0 ? null : l;
    var h = void 0;
    if (jt !== null) {
      var b = jt.memoizedState;
      if (h = b.destroy, l !== null && Vl(l, b.deps)) {
        u.memoizedState = yo(t, o, h, l);
        return;
      }
    }
    dt.flags |= e, u.memoizedState = yo(1 | t, o, h, l);
  }
  function vf(e, t) {
    return Ma(8390656, 8, e, t);
  }
  function ql(e, t) {
    return $a(2048, 8, e, t);
  }
  function yf(e, t) {
    return $a(4, 2, e, t);
  }
  function wf(e, t) {
    return $a(4, 4, e, t);
  }
  function bf(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function jf(e, t, o) {
    return o = o != null ? o.concat([e]) : null, $a(4, 4, bf.bind(null, t, e), o);
  }
  function Xl() {
  }
  function kf(e, t) {
    var o = ln();
    t = t === void 0 ? null : t;
    var l = o.memoizedState;
    return l !== null && t !== null && Vl(t, l[1]) ? l[0] : (o.memoizedState = [e, t], e);
  }
  function _f(e, t) {
    var o = ln();
    t = t === void 0 ? null : t;
    var l = o.memoizedState;
    return l !== null && t !== null && Vl(t, l[1]) ? l[0] : (e = e(), o.memoizedState = [e, t], e);
  }
  function Sf(e, t, o) {
    return (Ir & 21) === 0 ? (e.baseState && (e.baseState = !1, Ut = !0), e.memoizedState = o) : (mn(o, t) || (o = ed(), dt.lanes |= o, Or |= o, e.baseState = !0), t);
  }
  function z0(e, t) {
    var o = Ze;
    Ze = o !== 0 && 4 > o ? o : 4, e(!0);
    var l = Hl.transition;
    Hl.transition = {};
    try {
      e(!1), t();
    } finally {
      Ze = o, Hl.transition = l;
    }
  }
  function Nf() {
    return ln().memoizedState;
  }
  function B0(e, t, o) {
    var l = pr(e);
    if (o = { lane: l, action: o, hasEagerState: !1, eagerState: null, next: null }, Cf(e)) Pf(t, o);
    else if (o = rf(e, t, o, l), o !== null) {
      var u = zt();
      wn(o, e, l, u), Ef(o, t, l);
    }
  }
  function W0(e, t, o) {
    var l = pr(e), u = { lane: l, action: o, hasEagerState: !1, eagerState: null, next: null };
    if (Cf(e)) Pf(t, u);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = t.lastRenderedReducer, h !== null)) try {
        var b = t.lastRenderedState, N = h(b, o);
        if (u.hasEagerState = !0, u.eagerState = N, mn(N, b)) {
          var R = t.interleaved;
          R === null ? (u.next = u, Il(t)) : (u.next = R.next, R.next = u), t.interleaved = u;
          return;
        }
      } catch {
      }
      o = rf(e, t, u, l), o !== null && (u = zt(), wn(o, e, l, u), Ef(o, t, l));
    }
  }
  function Cf(e) {
    var t = e.alternate;
    return e === dt || t !== null && t === dt;
  }
  function Pf(e, t) {
    go = Fa = !0;
    var o = e.pending;
    o === null ? t.next = t : (t.next = o.next, o.next = t), e.pending = t;
  }
  function Ef(e, t, o) {
    if ((o & 4194240) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, o |= l, t.lanes = o, Ji(e, o);
    }
  }
  var La = { readContext: an, useCallback: $t, useContext: $t, useEffect: $t, useImperativeHandle: $t, useInsertionEffect: $t, useLayoutEffect: $t, useMemo: $t, useReducer: $t, useRef: $t, useState: $t, useDebugValue: $t, useDeferredValue: $t, useTransition: $t, useMutableSource: $t, useSyncExternalStore: $t, useId: $t, unstable_isNewReconciler: !1 }, U0 = { readContext: an, useCallback: function(e, t) {
    return Cn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: an, useEffect: vf, useImperativeHandle: function(e, t, o) {
    return o = o != null ? o.concat([e]) : null, Ma(
      4194308,
      4,
      bf.bind(null, t, e),
      o
    );
  }, useLayoutEffect: function(e, t) {
    return Ma(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return Ma(4, 2, e, t);
  }, useMemo: function(e, t) {
    var o = Cn();
    return t = t === void 0 ? null : t, e = e(), o.memoizedState = [e, t], e;
  }, useReducer: function(e, t, o) {
    var l = Cn();
    return t = o !== void 0 ? o(t) : t, l.memoizedState = l.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, l.queue = e, e = e.dispatch = B0.bind(null, dt, e), [l.memoizedState, e];
  }, useRef: function(e) {
    var t = Cn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: gf, useDebugValue: Xl, useDeferredValue: function(e) {
    return Cn().memoizedState = e;
  }, useTransition: function() {
    var e = gf(!1), t = e[0];
    return e = z0.bind(null, e[1]), Cn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, o) {
    var l = dt, u = Cn();
    if (ct) {
      if (o === void 0) throw Error(a(407));
      o = o();
    } else {
      if (o = t(), Ct === null) throw Error(a(349));
      (Ir & 30) !== 0 || df(l, t, o);
    }
    u.memoizedState = o;
    var h = { value: o, getSnapshot: t };
    return u.queue = h, vf(pf.bind(
      null,
      l,
      h,
      e
    ), [e]), l.flags |= 2048, yo(9, ff.bind(null, l, h, o, t), void 0, null), o;
  }, useId: function() {
    var e = Cn(), t = Ct.identifierPrefix;
    if (ct) {
      var o = In, l = Dn;
      o = (l & ~(1 << 32 - hn(l) - 1)).toString(32) + o, t = ":" + t + "R" + o, o = xo++, 0 < o && (t += "H" + o.toString(32)), t += ":";
    } else o = O0++, t = ":" + t + "r" + o.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, H0 = {
    readContext: an,
    useCallback: kf,
    useContext: an,
    useEffect: ql,
    useImperativeHandle: jf,
    useInsertionEffect: yf,
    useLayoutEffect: wf,
    useMemo: _f,
    useReducer: Kl,
    useRef: xf,
    useState: function() {
      return Kl(vo);
    },
    useDebugValue: Xl,
    useDeferredValue: function(e) {
      var t = ln();
      return Sf(t, jt.memoizedState, e);
    },
    useTransition: function() {
      var e = Kl(vo)[0], t = ln().memoizedState;
      return [e, t];
    },
    useMutableSource: cf,
    useSyncExternalStore: uf,
    useId: Nf,
    unstable_isNewReconciler: !1
  }, V0 = { readContext: an, useCallback: kf, useContext: an, useEffect: ql, useImperativeHandle: jf, useInsertionEffect: yf, useLayoutEffect: wf, useMemo: _f, useReducer: Yl, useRef: xf, useState: function() {
    return Yl(vo);
  }, useDebugValue: Xl, useDeferredValue: function(e) {
    var t = ln();
    return jt === null ? t.memoizedState = e : Sf(t, jt.memoizedState, e);
  }, useTransition: function() {
    var e = Yl(vo)[0], t = ln().memoizedState;
    return [e, t];
  }, useMutableSource: cf, useSyncExternalStore: uf, useId: Nf, unstable_isNewReconciler: !1 };
  function xn(e, t) {
    if (e && e.defaultProps) {
      t = J({}, t), e = e.defaultProps;
      for (var o in e) t[o] === void 0 && (t[o] = e[o]);
      return t;
    }
    return t;
  }
  function Zl(e, t, o, l) {
    t = e.memoizedState, o = o(l, t), o = o == null ? t : J({}, t, o), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
  }
  var Da = { isMounted: function(e) {
    return (e = e._reactInternals) ? Mn(e) === e : !1;
  }, enqueueSetState: function(e, t, o) {
    e = e._reactInternals;
    var l = zt(), u = pr(e), h = zn(l, u);
    h.payload = t, o != null && (h.callback = o), t = cr(e, h, u), t !== null && (wn(t, e, u, l), Ea(t, e, u));
  }, enqueueReplaceState: function(e, t, o) {
    e = e._reactInternals;
    var l = zt(), u = pr(e), h = zn(l, u);
    h.tag = 1, h.payload = t, o != null && (h.callback = o), t = cr(e, h, u), t !== null && (wn(t, e, u, l), Ea(t, e, u));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var o = zt(), l = pr(e), u = zn(o, l);
    u.tag = 2, t != null && (u.callback = t), t = cr(e, u, l), t !== null && (wn(t, e, l, o), Ea(t, e, l));
  } };
  function Tf(e, t, o, l, u, h, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, b) : t.prototype && t.prototype.isPureReactComponent ? !so(o, l) || !so(u, h) : !0;
  }
  function Rf(e, t, o) {
    var l = !1, u = ar, h = t.contextType;
    return typeof h == "object" && h !== null ? h = an(h) : (u = Wt(t) ? Fr : Mt.current, l = t.contextTypes, h = (l = l != null) ? hs(e, u) : ar), t = new t(o, h), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Da, e.stateNode = t, t._reactInternals = e, l && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = u, e.__reactInternalMemoizedMaskedChildContext = h), t;
  }
  function Af(e, t, o, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(o, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(o, l), t.state !== e && Da.enqueueReplaceState(t, t.state, null);
  }
  function Jl(e, t, o, l) {
    var u = e.stateNode;
    u.props = o, u.state = e.memoizedState, u.refs = {}, Ol(e);
    var h = t.contextType;
    typeof h == "object" && h !== null ? u.context = an(h) : (h = Wt(t) ? Fr : Mt.current, u.context = hs(e, h)), u.state = e.memoizedState, h = t.getDerivedStateFromProps, typeof h == "function" && (Zl(e, t, h, o), u.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (t = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), t !== u.state && Da.enqueueReplaceState(u, u.state, null), Ta(e, o, u, l), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function js(e, t) {
    try {
      var o = "", l = t;
      do
        o += q(l), l = l.return;
      while (l);
      var u = o;
    } catch (h) {
      u = `
Error generating stack: ` + h.message + `
` + h.stack;
    }
    return { value: e, source: t, stack: u, digest: null };
  }
  function ec(e, t, o) {
    return { value: e, source: null, stack: o ?? null, digest: t ?? null };
  }
  function tc(e, t) {
    try {
      console.error(t.value);
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  var G0 = typeof WeakMap == "function" ? WeakMap : Map;
  function Ff(e, t, o) {
    o = zn(-1, o), o.tag = 3, o.payload = { element: null };
    var l = t.value;
    return o.callback = function() {
      Ha || (Ha = !0, gc = l), tc(e, t);
    }, o;
  }
  function Mf(e, t, o) {
    o = zn(-1, o), o.tag = 3;
    var l = e.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var u = t.value;
      o.payload = function() {
        return l(u);
      }, o.callback = function() {
        tc(e, t);
      };
    }
    var h = e.stateNode;
    return h !== null && typeof h.componentDidCatch == "function" && (o.callback = function() {
      tc(e, t), typeof l != "function" && (dr === null ? dr = /* @__PURE__ */ new Set([this]) : dr.add(this));
      var b = t.stack;
      this.componentDidCatch(t.value, { componentStack: b !== null ? b : "" });
    }), o;
  }
  function $f(e, t, o) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new G0();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(o) || (u.add(o), e = av.bind(null, e, t, o), t.then(e, e));
  }
  function Lf(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Df(e, t, o, l, u) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, o.flags |= 131072, o.flags &= -52805, o.tag === 1 && (o.alternate === null ? o.tag = 17 : (t = zn(-1, 1), t.tag = 2, cr(o, t, 1))), o.lanes |= 1), e) : (e.flags |= 65536, e.lanes = u, e);
  }
  var Q0 = $.ReactCurrentOwner, Ut = !1;
  function Ot(e, t, o, l) {
    t.child = e === null ? nf(t, null, o, l) : vs(t, e.child, o, l);
  }
  function If(e, t, o, l, u) {
    o = o.render;
    var h = t.ref;
    return ws(t, u), l = Gl(e, t, o, l, h, u), o = Ql(), e !== null && !Ut ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~u, Bn(e, t, u)) : (ct && o && El(t), t.flags |= 1, Ot(e, t, l, u), t.child);
  }
  function Of(e, t, o, l, u) {
    if (e === null) {
      var h = o.type;
      return typeof h == "function" && !kc(h) && h.defaultProps === void 0 && o.compare === null && o.defaultProps === void 0 ? (t.tag = 15, t.type = h, zf(e, t, h, l, u)) : (e = qa(o.type, null, l, t, t.mode, u), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (h = e.child, (e.lanes & u) === 0) {
      var b = h.memoizedProps;
      if (o = o.compare, o = o !== null ? o : so, o(b, l) && e.ref === t.ref) return Bn(e, t, u);
    }
    return t.flags |= 1, e = mr(h, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function zf(e, t, o, l, u) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (so(h, l) && e.ref === t.ref) if (Ut = !1, t.pendingProps = l = h, (e.lanes & u) !== 0) (e.flags & 131072) !== 0 && (Ut = !0);
      else return t.lanes = e.lanes, Bn(e, t, u);
    }
    return nc(e, t, o, l, u);
  }
  function Bf(e, t, o) {
    var l = t.pendingProps, u = l.children, h = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, rt(_s, Xt), Xt |= o;
    else {
      if ((o & 1073741824) === 0) return e = h !== null ? h.baseLanes | o : o, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, rt(_s, Xt), Xt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, l = h !== null ? h.baseLanes : o, rt(_s, Xt), Xt |= l;
    }
    else h !== null ? (l = h.baseLanes | o, t.memoizedState = null) : l = o, rt(_s, Xt), Xt |= l;
    return Ot(e, t, u, o), t.child;
  }
  function Wf(e, t) {
    var o = t.ref;
    (e === null && o !== null || e !== null && e.ref !== o) && (t.flags |= 512, t.flags |= 2097152);
  }
  function nc(e, t, o, l, u) {
    var h = Wt(o) ? Fr : Mt.current;
    return h = hs(t, h), ws(t, u), o = Gl(e, t, o, l, h, u), l = Ql(), e !== null && !Ut ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~u, Bn(e, t, u)) : (ct && l && El(t), t.flags |= 1, Ot(e, t, o, u), t.child);
  }
  function Uf(e, t, o, l, u) {
    if (Wt(o)) {
      var h = !0;
      ba(t);
    } else h = !1;
    if (ws(t, u), t.stateNode === null) Oa(e, t), Rf(t, o, l), Jl(t, o, l, u), l = !0;
    else if (e === null) {
      var b = t.stateNode, N = t.memoizedProps;
      b.props = N;
      var R = b.context, Q = o.contextType;
      typeof Q == "object" && Q !== null ? Q = an(Q) : (Q = Wt(o) ? Fr : Mt.current, Q = hs(t, Q));
      var ie = o.getDerivedStateFromProps, le = typeof ie == "function" || typeof b.getSnapshotBeforeUpdate == "function";
      le || typeof b.UNSAFE_componentWillReceiveProps != "function" && typeof b.componentWillReceiveProps != "function" || (N !== l || R !== Q) && Af(t, b, l, Q), lr = !1;
      var ae = t.memoizedState;
      b.state = ae, Ta(t, l, b, u), R = t.memoizedState, N !== l || ae !== R || Bt.current || lr ? (typeof ie == "function" && (Zl(t, o, ie, l), R = t.memoizedState), (N = lr || Tf(t, o, N, l, ae, R, Q)) ? (le || typeof b.UNSAFE_componentWillMount != "function" && typeof b.componentWillMount != "function" || (typeof b.componentWillMount == "function" && b.componentWillMount(), typeof b.UNSAFE_componentWillMount == "function" && b.UNSAFE_componentWillMount()), typeof b.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof b.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = R), b.props = l, b.state = R, b.context = Q, l = N) : (typeof b.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      b = t.stateNode, sf(e, t), N = t.memoizedProps, Q = t.type === t.elementType ? N : xn(t.type, N), b.props = Q, le = t.pendingProps, ae = b.context, R = o.contextType, typeof R == "object" && R !== null ? R = an(R) : (R = Wt(o) ? Fr : Mt.current, R = hs(t, R));
      var fe = o.getDerivedStateFromProps;
      (ie = typeof fe == "function" || typeof b.getSnapshotBeforeUpdate == "function") || typeof b.UNSAFE_componentWillReceiveProps != "function" && typeof b.componentWillReceiveProps != "function" || (N !== le || ae !== R) && Af(t, b, l, R), lr = !1, ae = t.memoizedState, b.state = ae, Ta(t, l, b, u);
      var ge = t.memoizedState;
      N !== le || ae !== ge || Bt.current || lr ? (typeof fe == "function" && (Zl(t, o, fe, l), ge = t.memoizedState), (Q = lr || Tf(t, o, Q, l, ae, ge, R) || !1) ? (ie || typeof b.UNSAFE_componentWillUpdate != "function" && typeof b.componentWillUpdate != "function" || (typeof b.componentWillUpdate == "function" && b.componentWillUpdate(l, ge, R), typeof b.UNSAFE_componentWillUpdate == "function" && b.UNSAFE_componentWillUpdate(l, ge, R)), typeof b.componentDidUpdate == "function" && (t.flags |= 4), typeof b.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof b.componentDidUpdate != "function" || N === e.memoizedProps && ae === e.memoizedState || (t.flags |= 4), typeof b.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && ae === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = ge), b.props = l, b.state = ge, b.context = R, l = Q) : (typeof b.componentDidUpdate != "function" || N === e.memoizedProps && ae === e.memoizedState || (t.flags |= 4), typeof b.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && ae === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return rc(e, t, o, l, h, u);
  }
  function rc(e, t, o, l, u, h) {
    Wf(e, t);
    var b = (t.flags & 128) !== 0;
    if (!l && !b) return u && Qd(t, o, !1), Bn(e, t, h);
    l = t.stateNode, Q0.current = t;
    var N = b && typeof o.getDerivedStateFromError != "function" ? null : l.render();
    return t.flags |= 1, e !== null && b ? (t.child = vs(t, e.child, null, h), t.child = vs(t, null, N, h)) : Ot(e, t, N, h), t.memoizedState = l.state, u && Qd(t, o, !0), t.child;
  }
  function Hf(e) {
    var t = e.stateNode;
    t.pendingContext ? Vd(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Vd(e, t.context, !1), zl(e, t.containerInfo);
  }
  function Vf(e, t, o, l, u) {
    return xs(), Fl(u), t.flags |= 256, Ot(e, t, o, l), t.child;
  }
  var sc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function oc(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Gf(e, t, o) {
    var l = t.pendingProps, u = ut.current, h = !1, b = (t.flags & 128) !== 0, N;
    if ((N = b) || (N = e !== null && e.memoizedState === null ? !1 : (u & 2) !== 0), N ? (h = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (u |= 1), rt(ut, u & 1), e === null)
      return Al(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (b = l.children, e = l.fallback, h ? (l = t.mode, h = t.child, b = { mode: "hidden", children: b }, (l & 1) === 0 && h !== null ? (h.childLanes = 0, h.pendingProps = b) : h = Xa(b, l, 0, null), e = Ur(e, l, o, null), h.return = t, e.return = t, h.sibling = e, t.child = h, t.child.memoizedState = oc(o), t.memoizedState = sc, e) : ac(t, b));
    if (u = e.memoizedState, u !== null && (N = u.dehydrated, N !== null)) return K0(e, t, b, l, N, u, o);
    if (h) {
      h = l.fallback, b = t.mode, u = e.child, N = u.sibling;
      var R = { mode: "hidden", children: l.children };
      return (b & 1) === 0 && t.child !== u ? (l = t.child, l.childLanes = 0, l.pendingProps = R, t.deletions = null) : (l = mr(u, R), l.subtreeFlags = u.subtreeFlags & 14680064), N !== null ? h = mr(N, h) : (h = Ur(h, b, o, null), h.flags |= 2), h.return = t, l.return = t, l.sibling = h, t.child = l, l = h, h = t.child, b = e.child.memoizedState, b = b === null ? oc(o) : { baseLanes: b.baseLanes | o, cachePool: null, transitions: b.transitions }, h.memoizedState = b, h.childLanes = e.childLanes & ~o, t.memoizedState = sc, l;
    }
    return h = e.child, e = h.sibling, l = mr(h, { mode: "visible", children: l.children }), (t.mode & 1) === 0 && (l.lanes = o), l.return = t, l.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = l, t.memoizedState = null, l;
  }
  function ac(e, t) {
    return t = Xa({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Ia(e, t, o, l) {
    return l !== null && Fl(l), vs(t, e.child, null, o), e = ac(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function K0(e, t, o, l, u, h, b) {
    if (o)
      return t.flags & 256 ? (t.flags &= -257, l = ec(Error(a(422))), Ia(e, t, b, l)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (h = l.fallback, u = t.mode, l = Xa({ mode: "visible", children: l.children }, u, 0, null), h = Ur(h, u, b, null), h.flags |= 2, l.return = t, h.return = t, l.sibling = h, t.child = l, (t.mode & 1) !== 0 && vs(t, e.child, null, b), t.child.memoizedState = oc(b), t.memoizedState = sc, h);
    if ((t.mode & 1) === 0) return Ia(e, t, b, null);
    if (u.data === "$!") {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var N = l.dgst;
      return l = N, h = Error(a(419)), l = ec(h, l, void 0), Ia(e, t, b, l);
    }
    if (N = (b & e.childLanes) !== 0, Ut || N) {
      if (l = Ct, l !== null) {
        switch (b & -b) {
          case 4:
            u = 2;
            break;
          case 16:
            u = 8;
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
            u = 32;
            break;
          case 536870912:
            u = 268435456;
            break;
          default:
            u = 0;
        }
        u = (u & (l.suspendedLanes | b)) !== 0 ? 0 : u, u !== 0 && u !== h.retryLane && (h.retryLane = u, On(e, u), wn(l, e, u, -1));
      }
      return jc(), l = ec(Error(a(421))), Ia(e, t, b, l);
    }
    return u.data === "$?" ? (t.flags |= 128, t.child = e.child, t = iv.bind(null, e), u._reactRetry = t, null) : (e = h.treeContext, qt = sr(u.nextSibling), Yt = t, ct = !0, gn = null, e !== null && (sn[on++] = Dn, sn[on++] = In, sn[on++] = Mr, Dn = e.id, In = e.overflow, Mr = t), t = ac(t, l.children), t.flags |= 4096, t);
  }
  function Qf(e, t, o) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Dl(e.return, t, o);
  }
  function ic(e, t, o, l, u) {
    var h = e.memoizedState;
    h === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: l, tail: o, tailMode: u } : (h.isBackwards = t, h.rendering = null, h.renderingStartTime = 0, h.last = l, h.tail = o, h.tailMode = u);
  }
  function Kf(e, t, o) {
    var l = t.pendingProps, u = l.revealOrder, h = l.tail;
    if (Ot(e, t, l.children, o), l = ut.current, (l & 2) !== 0) l = l & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Qf(e, o, t);
        else if (e.tag === 19) Qf(e, o, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      l &= 1;
    }
    if (rt(ut, l), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (u) {
      case "forwards":
        for (o = t.child, u = null; o !== null; ) e = o.alternate, e !== null && Ra(e) === null && (u = o), o = o.sibling;
        o = u, o === null ? (u = t.child, t.child = null) : (u = o.sibling, o.sibling = null), ic(t, !1, u, o, h);
        break;
      case "backwards":
        for (o = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Ra(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = o, o = u, u = e;
        }
        ic(t, !0, o, null, h);
        break;
      case "together":
        ic(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Oa(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Bn(e, t, o) {
    if (e !== null && (t.dependencies = e.dependencies), Or |= t.lanes, (o & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(a(153));
    if (t.child !== null) {
      for (e = t.child, o = mr(e, e.pendingProps), t.child = o, o.return = t; e.sibling !== null; ) e = e.sibling, o = o.sibling = mr(e, e.pendingProps), o.return = t;
      o.sibling = null;
    }
    return t.child;
  }
  function Y0(e, t, o) {
    switch (t.tag) {
      case 3:
        Hf(t), xs();
        break;
      case 5:
        lf(t);
        break;
      case 1:
        Wt(t.type) && ba(t);
        break;
      case 4:
        zl(t, t.stateNode.containerInfo);
        break;
      case 10:
        var l = t.type._context, u = t.memoizedProps.value;
        rt(Ca, l._currentValue), l._currentValue = u;
        break;
      case 13:
        if (l = t.memoizedState, l !== null)
          return l.dehydrated !== null ? (rt(ut, ut.current & 1), t.flags |= 128, null) : (o & t.child.childLanes) !== 0 ? Gf(e, t, o) : (rt(ut, ut.current & 1), e = Bn(e, t, o), e !== null ? e.sibling : null);
        rt(ut, ut.current & 1);
        break;
      case 19:
        if (l = (o & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (l) return Kf(e, t, o);
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), rt(ut, ut.current), l) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Bf(e, t, o);
    }
    return Bn(e, t, o);
  }
  var Yf, lc, qf, Xf;
  Yf = function(e, t) {
    for (var o = t.child; o !== null; ) {
      if (o.tag === 5 || o.tag === 6) e.appendChild(o.stateNode);
      else if (o.tag !== 4 && o.child !== null) {
        o.child.return = o, o = o.child;
        continue;
      }
      if (o === t) break;
      for (; o.sibling === null; ) {
        if (o.return === null || o.return === t) return;
        o = o.return;
      }
      o.sibling.return = o.return, o = o.sibling;
    }
  }, lc = function() {
  }, qf = function(e, t, o, l) {
    var u = e.memoizedProps;
    if (u !== l) {
      e = t.stateNode, Dr(Nn.current);
      var h = null;
      switch (o) {
        case "input":
          u = qe(e, u), l = qe(e, l), h = [];
          break;
        case "select":
          u = J({}, u, { value: void 0 }), l = J({}, l, { value: void 0 }), h = [];
          break;
        case "textarea":
          u = he(e, u), l = he(e, l), h = [];
          break;
        default:
          typeof u.onClick != "function" && typeof l.onClick == "function" && (e.onclick = va);
      }
      pt(o, l);
      var b;
      o = null;
      for (Q in u) if (!l.hasOwnProperty(Q) && u.hasOwnProperty(Q) && u[Q] != null) if (Q === "style") {
        var N = u[Q];
        for (b in N) N.hasOwnProperty(b) && (o || (o = {}), o[b] = "");
      } else Q !== "dangerouslySetInnerHTML" && Q !== "children" && Q !== "suppressContentEditableWarning" && Q !== "suppressHydrationWarning" && Q !== "autoFocus" && (c.hasOwnProperty(Q) ? h || (h = []) : (h = h || []).push(Q, null));
      for (Q in l) {
        var R = l[Q];
        if (N = u?.[Q], l.hasOwnProperty(Q) && R !== N && (R != null || N != null)) if (Q === "style") if (N) {
          for (b in N) !N.hasOwnProperty(b) || R && R.hasOwnProperty(b) || (o || (o = {}), o[b] = "");
          for (b in R) R.hasOwnProperty(b) && N[b] !== R[b] && (o || (o = {}), o[b] = R[b]);
        } else o || (h || (h = []), h.push(
          Q,
          o
        )), o = R;
        else Q === "dangerouslySetInnerHTML" ? (R = R ? R.__html : void 0, N = N ? N.__html : void 0, R != null && N !== R && (h = h || []).push(Q, R)) : Q === "children" ? typeof R != "string" && typeof R != "number" || (h = h || []).push(Q, "" + R) : Q !== "suppressContentEditableWarning" && Q !== "suppressHydrationWarning" && (c.hasOwnProperty(Q) ? (R != null && Q === "onScroll" && ot("scroll", e), h || N === R || (h = [])) : (h = h || []).push(Q, R));
      }
      o && (h = h || []).push("style", o);
      var Q = h;
      (t.updateQueue = Q) && (t.flags |= 4);
    }
  }, Xf = function(e, t, o, l) {
    o !== l && (t.flags |= 4);
  };
  function wo(e, t) {
    if (!ct) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var o = null; t !== null; ) t.alternate !== null && (o = t), t = t.sibling;
        o === null ? e.tail = null : o.sibling = null;
        break;
      case "collapsed":
        o = e.tail;
        for (var l = null; o !== null; ) o.alternate !== null && (l = o), o = o.sibling;
        l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
    }
  }
  function Lt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, o = 0, l = 0;
    if (t) for (var u = e.child; u !== null; ) o |= u.lanes | u.childLanes, l |= u.subtreeFlags & 14680064, l |= u.flags & 14680064, u.return = e, u = u.sibling;
    else for (u = e.child; u !== null; ) o |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = o, t;
  }
  function q0(e, t, o) {
    var l = t.pendingProps;
    switch (Tl(t), t.tag) {
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
        return Lt(t), null;
      case 1:
        return Wt(t.type) && wa(), Lt(t), null;
      case 3:
        return l = t.stateNode, bs(), at(Bt), at(Mt), Ul(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Sa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, gn !== null && (yc(gn), gn = null))), lc(e, t), Lt(t), null;
      case 5:
        Bl(t);
        var u = Dr(mo.current);
        if (o = t.type, e !== null && t.stateNode != null) qf(e, t, o, l, u), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(a(166));
            return Lt(t), null;
          }
          if (e = Dr(Nn.current), Sa(t)) {
            l = t.stateNode, o = t.type;
            var h = t.memoizedProps;
            switch (l[Sn] = t, l[co] = h, e = (t.mode & 1) !== 0, o) {
              case "dialog":
                ot("cancel", l), ot("close", l);
                break;
              case "iframe":
              case "object":
              case "embed":
                ot("load", l);
                break;
              case "video":
              case "audio":
                for (u = 0; u < ao.length; u++) ot(ao[u], l);
                break;
              case "source":
                ot("error", l);
                break;
              case "img":
              case "image":
              case "link":
                ot(
                  "error",
                  l
                ), ot("load", l);
                break;
              case "details":
                ot("toggle", l);
                break;
              case "input":
                St(l, h), ot("invalid", l);
                break;
              case "select":
                l._wrapperState = { wasMultiple: !!h.multiple }, ot("invalid", l);
                break;
              case "textarea":
                we(l, h), ot("invalid", l);
            }
            pt(o, h), u = null;
            for (var b in h) if (h.hasOwnProperty(b)) {
              var N = h[b];
              b === "children" ? typeof N == "string" ? l.textContent !== N && (h.suppressHydrationWarning !== !0 && xa(l.textContent, N, e), u = ["children", N]) : typeof N == "number" && l.textContent !== "" + N && (h.suppressHydrationWarning !== !0 && xa(
                l.textContent,
                N,
                e
              ), u = ["children", "" + N]) : c.hasOwnProperty(b) && N != null && b === "onScroll" && ot("scroll", l);
            }
            switch (o) {
              case "input":
                Pe(l), Ge(l, h, !0);
                break;
              case "textarea":
                Pe(l), Se(l);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof h.onClick == "function" && (l.onclick = va);
            }
            l = u, t.updateQueue = l, l !== null && (t.flags |= 4);
          } else {
            b = u.nodeType === 9 ? u : u.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Le(o)), e === "http://www.w3.org/1999/xhtml" ? o === "script" ? (e = b.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof l.is == "string" ? e = b.createElement(o, { is: l.is }) : (e = b.createElement(o), o === "select" && (b = e, l.multiple ? b.multiple = !0 : l.size && (b.size = l.size))) : e = b.createElementNS(e, o), e[Sn] = t, e[co] = l, Yf(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (b = gt(o, l), o) {
                case "dialog":
                  ot("cancel", e), ot("close", e), u = l;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  ot("load", e), u = l;
                  break;
                case "video":
                case "audio":
                  for (u = 0; u < ao.length; u++) ot(ao[u], e);
                  u = l;
                  break;
                case "source":
                  ot("error", e), u = l;
                  break;
                case "img":
                case "image":
                case "link":
                  ot(
                    "error",
                    e
                  ), ot("load", e), u = l;
                  break;
                case "details":
                  ot("toggle", e), u = l;
                  break;
                case "input":
                  St(e, l), u = qe(e, l), ot("invalid", e);
                  break;
                case "option":
                  u = l;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!l.multiple }, u = J({}, l, { value: void 0 }), ot("invalid", e);
                  break;
                case "textarea":
                  we(e, l), u = he(e, l), ot("invalid", e);
                  break;
                default:
                  u = l;
              }
              pt(o, u), N = u;
              for (h in N) if (N.hasOwnProperty(h)) {
                var R = N[h];
                h === "style" ? Qe(e, R) : h === "dangerouslySetInnerHTML" ? (R = R ? R.__html : void 0, R != null && me(e, R)) : h === "children" ? typeof R == "string" ? (o !== "textarea" || R !== "") && Me(e, R) : typeof R == "number" && Me(e, "" + R) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (c.hasOwnProperty(h) ? R != null && h === "onScroll" && ot("scroll", e) : R != null && C(e, h, R, b));
              }
              switch (o) {
                case "input":
                  Pe(e), Ge(e, l, !1);
                  break;
                case "textarea":
                  Pe(e), Se(e);
                  break;
                case "option":
                  l.value != null && e.setAttribute("value", "" + z(l.value));
                  break;
                case "select":
                  e.multiple = !!l.multiple, h = l.value, h != null ? W(e, !!l.multiple, h, !1) : l.defaultValue != null && W(
                    e,
                    !!l.multiple,
                    l.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof u.onClick == "function" && (e.onclick = va);
              }
              switch (o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l = !!l.autoFocus;
                  break e;
                case "img":
                  l = !0;
                  break e;
                default:
                  l = !1;
              }
            }
            l && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Lt(t), null;
      case 6:
        if (e && t.stateNode != null) Xf(e, t, e.memoizedProps, l);
        else {
          if (typeof l != "string" && t.stateNode === null) throw Error(a(166));
          if (o = Dr(mo.current), Dr(Nn.current), Sa(t)) {
            if (l = t.stateNode, o = t.memoizedProps, l[Sn] = t, (h = l.nodeValue !== o) && (e = Yt, e !== null)) switch (e.tag) {
              case 3:
                xa(l.nodeValue, o, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && xa(l.nodeValue, o, (e.mode & 1) !== 0);
            }
            h && (t.flags |= 4);
          } else l = (o.nodeType === 9 ? o : o.ownerDocument).createTextNode(l), l[Sn] = t, t.stateNode = l;
        }
        return Lt(t), null;
      case 13:
        if (at(ut), l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ct && qt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Jd(), xs(), t.flags |= 98560, h = !1;
          else if (h = Sa(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!h) throw Error(a(318));
              if (h = t.memoizedState, h = h !== null ? h.dehydrated : null, !h) throw Error(a(317));
              h[Sn] = t;
            } else xs(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Lt(t), h = !1;
          } else gn !== null && (yc(gn), gn = null), h = !0;
          if (!h) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = o, t) : (l = l !== null, l !== (e !== null && e.memoizedState !== null) && l && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ut.current & 1) !== 0 ? kt === 0 && (kt = 3) : jc())), t.updateQueue !== null && (t.flags |= 4), Lt(t), null);
      case 4:
        return bs(), lc(e, t), e === null && io(t.stateNode.containerInfo), Lt(t), null;
      case 10:
        return Ll(t.type._context), Lt(t), null;
      case 17:
        return Wt(t.type) && wa(), Lt(t), null;
      case 19:
        if (at(ut), h = t.memoizedState, h === null) return Lt(t), null;
        if (l = (t.flags & 128) !== 0, b = h.rendering, b === null) if (l) wo(h, !1);
        else {
          if (kt !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (b = Ra(e), b !== null) {
              for (t.flags |= 128, wo(h, !1), l = b.updateQueue, l !== null && (t.updateQueue = l, t.flags |= 4), t.subtreeFlags = 0, l = o, o = t.child; o !== null; ) h = o, e = l, h.flags &= 14680066, b = h.alternate, b === null ? (h.childLanes = 0, h.lanes = e, h.child = null, h.subtreeFlags = 0, h.memoizedProps = null, h.memoizedState = null, h.updateQueue = null, h.dependencies = null, h.stateNode = null) : (h.childLanes = b.childLanes, h.lanes = b.lanes, h.child = b.child, h.subtreeFlags = 0, h.deletions = null, h.memoizedProps = b.memoizedProps, h.memoizedState = b.memoizedState, h.updateQueue = b.updateQueue, h.type = b.type, e = b.dependencies, h.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), o = o.sibling;
              return rt(ut, ut.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          h.tail !== null && Xe() > Ss && (t.flags |= 128, l = !0, wo(h, !1), t.lanes = 4194304);
        }
        else {
          if (!l) if (e = Ra(b), e !== null) {
            if (t.flags |= 128, l = !0, o = e.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), wo(h, !0), h.tail === null && h.tailMode === "hidden" && !b.alternate && !ct) return Lt(t), null;
          } else 2 * Xe() - h.renderingStartTime > Ss && o !== 1073741824 && (t.flags |= 128, l = !0, wo(h, !1), t.lanes = 4194304);
          h.isBackwards ? (b.sibling = t.child, t.child = b) : (o = h.last, o !== null ? o.sibling = b : t.child = b, h.last = b);
        }
        return h.tail !== null ? (t = h.tail, h.rendering = t, h.tail = t.sibling, h.renderingStartTime = Xe(), t.sibling = null, o = ut.current, rt(ut, l ? o & 1 | 2 : o & 1), t) : (Lt(t), null);
      case 22:
      case 23:
        return bc(), l = t.memoizedState !== null, e !== null && e.memoizedState !== null !== l && (t.flags |= 8192), l && (t.mode & 1) !== 0 ? (Xt & 1073741824) !== 0 && (Lt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Lt(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function X0(e, t) {
    switch (Tl(t), t.tag) {
      case 1:
        return Wt(t.type) && wa(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return bs(), at(Bt), at(Mt), Ul(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Bl(t), null;
      case 13:
        if (at(ut), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(a(340));
          xs();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return at(ut), null;
      case 4:
        return bs(), null;
      case 10:
        return Ll(t.type._context), null;
      case 22:
      case 23:
        return bc(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var za = !1, Dt = !1, Z0 = typeof WeakSet == "function" ? WeakSet : Set, pe = null;
  function ks(e, t) {
    var o = e.ref;
    if (o !== null) if (typeof o == "function") try {
      o(null);
    } catch (l) {
      ht(e, t, l);
    }
    else o.current = null;
  }
  function cc(e, t, o) {
    try {
      o();
    } catch (l) {
      ht(e, t, l);
    }
  }
  var Zf = !1;
  function J0(e, t) {
    if (bl = aa, e = Ed(), pl(e)) {
      if ("selectionStart" in e) var o = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        o = (o = e.ownerDocument) && o.defaultView || window;
        var l = o.getSelection && o.getSelection();
        if (l && l.rangeCount !== 0) {
          o = l.anchorNode;
          var u = l.anchorOffset, h = l.focusNode;
          l = l.focusOffset;
          try {
            o.nodeType, h.nodeType;
          } catch {
            o = null;
            break e;
          }
          var b = 0, N = -1, R = -1, Q = 0, ie = 0, le = e, ae = null;
          t: for (; ; ) {
            for (var fe; le !== o || u !== 0 && le.nodeType !== 3 || (N = b + u), le !== h || l !== 0 && le.nodeType !== 3 || (R = b + l), le.nodeType === 3 && (b += le.nodeValue.length), (fe = le.firstChild) !== null; )
              ae = le, le = fe;
            for (; ; ) {
              if (le === e) break t;
              if (ae === o && ++Q === u && (N = b), ae === h && ++ie === l && (R = b), (fe = le.nextSibling) !== null) break;
              le = ae, ae = le.parentNode;
            }
            le = fe;
          }
          o = N === -1 || R === -1 ? null : { start: N, end: R };
        } else o = null;
      }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (jl = { focusedElem: e, selectionRange: o }, aa = !1, pe = t; pe !== null; ) if (t = pe, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, pe = e;
    else for (; pe !== null; ) {
      t = pe;
      try {
        var ge = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ge !== null) {
              var xe = ge.memoizedProps, vt = ge.memoizedState, O = t.stateNode, F = O.getSnapshotBeforeUpdate(t.elementType === t.type ? xe : xn(t.type, xe), vt);
              O.__reactInternalSnapshotBeforeUpdate = F;
            }
            break;
          case 3:
            var U = t.stateNode.containerInfo;
            U.nodeType === 1 ? U.textContent = "" : U.nodeType === 9 && U.documentElement && U.removeChild(U.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(a(163));
        }
      } catch (ue) {
        ht(t, t.return, ue);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, pe = e;
        break;
      }
      pe = t.return;
    }
    return ge = Zf, Zf = !1, ge;
  }
  function bo(e, t, o) {
    var l = t.updateQueue;
    if (l = l !== null ? l.lastEffect : null, l !== null) {
      var u = l = l.next;
      do {
        if ((u.tag & e) === e) {
          var h = u.destroy;
          u.destroy = void 0, h !== void 0 && cc(t, o, h);
        }
        u = u.next;
      } while (u !== l);
    }
  }
  function Ba(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var o = t = t.next;
      do {
        if ((o.tag & e) === e) {
          var l = o.create;
          o.destroy = l();
        }
        o = o.next;
      } while (o !== t);
    }
  }
  function uc(e) {
    var t = e.ref;
    if (t !== null) {
      var o = e.stateNode;
      e.tag, e = o, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Jf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Jf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Sn], delete t[co], delete t[Nl], delete t[$0], delete t[L0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ep(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function tp(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ep(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function dc(e, t, o) {
    var l = e.tag;
    if (l === 5 || l === 6) e = e.stateNode, t ? o.nodeType === 8 ? o.parentNode.insertBefore(e, t) : o.insertBefore(e, t) : (o.nodeType === 8 ? (t = o.parentNode, t.insertBefore(e, o)) : (t = o, t.appendChild(e)), o = o._reactRootContainer, o != null || t.onclick !== null || (t.onclick = va));
    else if (l !== 4 && (e = e.child, e !== null)) for (dc(e, t, o), e = e.sibling; e !== null; ) dc(e, t, o), e = e.sibling;
  }
  function fc(e, t, o) {
    var l = e.tag;
    if (l === 5 || l === 6) e = e.stateNode, t ? o.insertBefore(e, t) : o.appendChild(e);
    else if (l !== 4 && (e = e.child, e !== null)) for (fc(e, t, o), e = e.sibling; e !== null; ) fc(e, t, o), e = e.sibling;
  }
  var Et = null, vn = !1;
  function ur(e, t, o) {
    for (o = o.child; o !== null; ) np(e, t, o), o = o.sibling;
  }
  function np(e, t, o) {
    if (_n && typeof _n.onCommitFiberUnmount == "function") try {
      _n.onCommitFiberUnmount(ea, o);
    } catch {
    }
    switch (o.tag) {
      case 5:
        Dt || ks(o, t);
      case 6:
        var l = Et, u = vn;
        Et = null, ur(e, t, o), Et = l, vn = u, Et !== null && (vn ? (e = Et, o = o.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(o) : e.removeChild(o)) : Et.removeChild(o.stateNode));
        break;
      case 18:
        Et !== null && (vn ? (e = Et, o = o.stateNode, e.nodeType === 8 ? Sl(e.parentNode, o) : e.nodeType === 1 && Sl(e, o), Zs(e)) : Sl(Et, o.stateNode));
        break;
      case 4:
        l = Et, u = vn, Et = o.stateNode.containerInfo, vn = !0, ur(e, t, o), Et = l, vn = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Dt && (l = o.updateQueue, l !== null && (l = l.lastEffect, l !== null))) {
          u = l = l.next;
          do {
            var h = u, b = h.destroy;
            h = h.tag, b !== void 0 && ((h & 2) !== 0 || (h & 4) !== 0) && cc(o, t, b), u = u.next;
          } while (u !== l);
        }
        ur(e, t, o);
        break;
      case 1:
        if (!Dt && (ks(o, t), l = o.stateNode, typeof l.componentWillUnmount == "function")) try {
          l.props = o.memoizedProps, l.state = o.memoizedState, l.componentWillUnmount();
        } catch (N) {
          ht(o, t, N);
        }
        ur(e, t, o);
        break;
      case 21:
        ur(e, t, o);
        break;
      case 22:
        o.mode & 1 ? (Dt = (l = Dt) || o.memoizedState !== null, ur(e, t, o), Dt = l) : ur(e, t, o);
        break;
      default:
        ur(e, t, o);
    }
  }
  function rp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var o = e.stateNode;
      o === null && (o = e.stateNode = new Z0()), t.forEach(function(l) {
        var u = lv.bind(null, e, l);
        o.has(l) || (o.add(l), l.then(u, u));
      });
    }
  }
  function yn(e, t) {
    var o = t.deletions;
    if (o !== null) for (var l = 0; l < o.length; l++) {
      var u = o[l];
      try {
        var h = e, b = t, N = b;
        e: for (; N !== null; ) {
          switch (N.tag) {
            case 5:
              Et = N.stateNode, vn = !1;
              break e;
            case 3:
              Et = N.stateNode.containerInfo, vn = !0;
              break e;
            case 4:
              Et = N.stateNode.containerInfo, vn = !0;
              break e;
          }
          N = N.return;
        }
        if (Et === null) throw Error(a(160));
        np(h, b, u), Et = null, vn = !1;
        var R = u.alternate;
        R !== null && (R.return = null), u.return = null;
      } catch (Q) {
        ht(u, t, Q);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) sp(t, e), t = t.sibling;
  }
  function sp(e, t) {
    var o = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (yn(t, e), Pn(e), l & 4) {
          try {
            bo(3, e, e.return), Ba(3, e);
          } catch (xe) {
            ht(e, e.return, xe);
          }
          try {
            bo(5, e, e.return);
          } catch (xe) {
            ht(e, e.return, xe);
          }
        }
        break;
      case 1:
        yn(t, e), Pn(e), l & 512 && o !== null && ks(o, o.return);
        break;
      case 5:
        if (yn(t, e), Pn(e), l & 512 && o !== null && ks(o, o.return), e.flags & 32) {
          var u = e.stateNode;
          try {
            Me(u, "");
          } catch (xe) {
            ht(e, e.return, xe);
          }
        }
        if (l & 4 && (u = e.stateNode, u != null)) {
          var h = e.memoizedProps, b = o !== null ? o.memoizedProps : h, N = e.type, R = e.updateQueue;
          if (e.updateQueue = null, R !== null) try {
            N === "input" && h.type === "radio" && h.name != null && tt(u, h), gt(N, b);
            var Q = gt(N, h);
            for (b = 0; b < R.length; b += 2) {
              var ie = R[b], le = R[b + 1];
              ie === "style" ? Qe(u, le) : ie === "dangerouslySetInnerHTML" ? me(u, le) : ie === "children" ? Me(u, le) : C(u, ie, le, Q);
            }
            switch (N) {
              case "input":
                Ee(u, h);
                break;
              case "textarea":
                Te(u, h);
                break;
              case "select":
                var ae = u._wrapperState.wasMultiple;
                u._wrapperState.wasMultiple = !!h.multiple;
                var fe = h.value;
                fe != null ? W(u, !!h.multiple, fe, !1) : ae !== !!h.multiple && (h.defaultValue != null ? W(
                  u,
                  !!h.multiple,
                  h.defaultValue,
                  !0
                ) : W(u, !!h.multiple, h.multiple ? [] : "", !1));
            }
            u[co] = h;
          } catch (xe) {
            ht(e, e.return, xe);
          }
        }
        break;
      case 6:
        if (yn(t, e), Pn(e), l & 4) {
          if (e.stateNode === null) throw Error(a(162));
          u = e.stateNode, h = e.memoizedProps;
          try {
            u.nodeValue = h;
          } catch (xe) {
            ht(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (yn(t, e), Pn(e), l & 4 && o !== null && o.memoizedState.isDehydrated) try {
          Zs(t.containerInfo);
        } catch (xe) {
          ht(e, e.return, xe);
        }
        break;
      case 4:
        yn(t, e), Pn(e);
        break;
      case 13:
        yn(t, e), Pn(e), u = e.child, u.flags & 8192 && (h = u.memoizedState !== null, u.stateNode.isHidden = h, !h || u.alternate !== null && u.alternate.memoizedState !== null || (mc = Xe())), l & 4 && rp(e);
        break;
      case 22:
        if (ie = o !== null && o.memoizedState !== null, e.mode & 1 ? (Dt = (Q = Dt) || ie, yn(t, e), Dt = Q) : yn(t, e), Pn(e), l & 8192) {
          if (Q = e.memoizedState !== null, (e.stateNode.isHidden = Q) && !ie && (e.mode & 1) !== 0) for (pe = e, ie = e.child; ie !== null; ) {
            for (le = pe = ie; pe !== null; ) {
              switch (ae = pe, fe = ae.child, ae.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  bo(4, ae, ae.return);
                  break;
                case 1:
                  ks(ae, ae.return);
                  var ge = ae.stateNode;
                  if (typeof ge.componentWillUnmount == "function") {
                    l = ae, o = ae.return;
                    try {
                      t = l, ge.props = t.memoizedProps, ge.state = t.memoizedState, ge.componentWillUnmount();
                    } catch (xe) {
                      ht(l, o, xe);
                    }
                  }
                  break;
                case 5:
                  ks(ae, ae.return);
                  break;
                case 22:
                  if (ae.memoizedState !== null) {
                    ip(le);
                    continue;
                  }
              }
              fe !== null ? (fe.return = ae, pe = fe) : ip(le);
            }
            ie = ie.sibling;
          }
          e: for (ie = null, le = e; ; ) {
            if (le.tag === 5) {
              if (ie === null) {
                ie = le;
                try {
                  u = le.stateNode, Q ? (h = u.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none") : (N = le.stateNode, R = le.memoizedProps.style, b = R != null && R.hasOwnProperty("display") ? R.display : null, N.style.display = Re("display", b));
                } catch (xe) {
                  ht(e, e.return, xe);
                }
              }
            } else if (le.tag === 6) {
              if (ie === null) try {
                le.stateNode.nodeValue = Q ? "" : le.memoizedProps;
              } catch (xe) {
                ht(e, e.return, xe);
              }
            } else if ((le.tag !== 22 && le.tag !== 23 || le.memoizedState === null || le === e) && le.child !== null) {
              le.child.return = le, le = le.child;
              continue;
            }
            if (le === e) break e;
            for (; le.sibling === null; ) {
              if (le.return === null || le.return === e) break e;
              ie === le && (ie = null), le = le.return;
            }
            ie === le && (ie = null), le.sibling.return = le.return, le = le.sibling;
          }
        }
        break;
      case 19:
        yn(t, e), Pn(e), l & 4 && rp(e);
        break;
      case 21:
        break;
      default:
        yn(
          t,
          e
        ), Pn(e);
    }
  }
  function Pn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var o = e.return; o !== null; ) {
            if (ep(o)) {
              var l = o;
              break e;
            }
            o = o.return;
          }
          throw Error(a(160));
        }
        switch (l.tag) {
          case 5:
            var u = l.stateNode;
            l.flags & 32 && (Me(u, ""), l.flags &= -33);
            var h = tp(e);
            fc(e, h, u);
            break;
          case 3:
          case 4:
            var b = l.stateNode.containerInfo, N = tp(e);
            dc(e, N, b);
            break;
          default:
            throw Error(a(161));
        }
      } catch (R) {
        ht(e, e.return, R);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ev(e, t, o) {
    pe = e, op(e);
  }
  function op(e, t, o) {
    for (var l = (e.mode & 1) !== 0; pe !== null; ) {
      var u = pe, h = u.child;
      if (u.tag === 22 && l) {
        var b = u.memoizedState !== null || za;
        if (!b) {
          var N = u.alternate, R = N !== null && N.memoizedState !== null || Dt;
          N = za;
          var Q = Dt;
          if (za = b, (Dt = R) && !Q) for (pe = u; pe !== null; ) b = pe, R = b.child, b.tag === 22 && b.memoizedState !== null ? lp(u) : R !== null ? (R.return = b, pe = R) : lp(u);
          for (; h !== null; ) pe = h, op(h), h = h.sibling;
          pe = u, za = N, Dt = Q;
        }
        ap(e);
      } else (u.subtreeFlags & 8772) !== 0 && h !== null ? (h.return = u, pe = h) : ap(e);
    }
  }
  function ap(e) {
    for (; pe !== null; ) {
      var t = pe;
      if ((t.flags & 8772) !== 0) {
        var o = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Dt || Ba(5, t);
              break;
            case 1:
              var l = t.stateNode;
              if (t.flags & 4 && !Dt) if (o === null) l.componentDidMount();
              else {
                var u = t.elementType === t.type ? o.memoizedProps : xn(t.type, o.memoizedProps);
                l.componentDidUpdate(u, o.memoizedState, l.__reactInternalSnapshotBeforeUpdate);
              }
              var h = t.updateQueue;
              h !== null && af(t, h, l);
              break;
            case 3:
              var b = t.updateQueue;
              if (b !== null) {
                if (o = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    o = t.child.stateNode;
                    break;
                  case 1:
                    o = t.child.stateNode;
                }
                af(t, b, o);
              }
              break;
            case 5:
              var N = t.stateNode;
              if (o === null && t.flags & 4) {
                o = N;
                var R = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    R.autoFocus && o.focus();
                    break;
                  case "img":
                    R.src && (o.src = R.src);
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
              if (t.memoizedState === null) {
                var Q = t.alternate;
                if (Q !== null) {
                  var ie = Q.memoizedState;
                  if (ie !== null) {
                    var le = ie.dehydrated;
                    le !== null && Zs(le);
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
              throw Error(a(163));
          }
          Dt || t.flags & 512 && uc(t);
        } catch (ae) {
          ht(t, t.return, ae);
        }
      }
      if (t === e) {
        pe = null;
        break;
      }
      if (o = t.sibling, o !== null) {
        o.return = t.return, pe = o;
        break;
      }
      pe = t.return;
    }
  }
  function ip(e) {
    for (; pe !== null; ) {
      var t = pe;
      if (t === e) {
        pe = null;
        break;
      }
      var o = t.sibling;
      if (o !== null) {
        o.return = t.return, pe = o;
        break;
      }
      pe = t.return;
    }
  }
  function lp(e) {
    for (; pe !== null; ) {
      var t = pe;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var o = t.return;
            try {
              Ba(4, t);
            } catch (R) {
              ht(t, o, R);
            }
            break;
          case 1:
            var l = t.stateNode;
            if (typeof l.componentDidMount == "function") {
              var u = t.return;
              try {
                l.componentDidMount();
              } catch (R) {
                ht(t, u, R);
              }
            }
            var h = t.return;
            try {
              uc(t);
            } catch (R) {
              ht(t, h, R);
            }
            break;
          case 5:
            var b = t.return;
            try {
              uc(t);
            } catch (R) {
              ht(t, b, R);
            }
        }
      } catch (R) {
        ht(t, t.return, R);
      }
      if (t === e) {
        pe = null;
        break;
      }
      var N = t.sibling;
      if (N !== null) {
        N.return = t.return, pe = N;
        break;
      }
      pe = t.return;
    }
  }
  var tv = Math.ceil, Wa = $.ReactCurrentDispatcher, pc = $.ReactCurrentOwner, cn = $.ReactCurrentBatchConfig, Ke = 0, Ct = null, wt = null, Tt = 0, Xt = 0, _s = or(0), kt = 0, jo = null, Or = 0, Ua = 0, hc = 0, ko = null, Ht = null, mc = 0, Ss = 1 / 0, Wn = null, Ha = !1, gc = null, dr = null, Va = !1, fr = null, Ga = 0, _o = 0, xc = null, Qa = -1, Ka = 0;
  function zt() {
    return (Ke & 6) !== 0 ? Xe() : Qa !== -1 ? Qa : Qa = Xe();
  }
  function pr(e) {
    return (e.mode & 1) === 0 ? 1 : (Ke & 2) !== 0 && Tt !== 0 ? Tt & -Tt : I0.transition !== null ? (Ka === 0 && (Ka = ed()), Ka) : (e = Ze, e !== 0 || (e = window.event, e = e === void 0 ? 16 : cd(e.type)), e);
  }
  function wn(e, t, o, l) {
    if (50 < _o) throw _o = 0, xc = null, Error(a(185));
    Qs(e, o, l), ((Ke & 2) === 0 || e !== Ct) && (e === Ct && ((Ke & 2) === 0 && (Ua |= o), kt === 4 && hr(e, Tt)), Vt(e, l), o === 1 && Ke === 0 && (t.mode & 1) === 0 && (Ss = Xe() + 500, ja && ir()));
  }
  function Vt(e, t) {
    var o = e.callbackNode;
    Ix(e, t);
    var l = ra(e, e === Ct ? Tt : 0);
    if (l === 0) o !== null && Vs(o), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = l & -l, e.callbackPriority !== t) {
      if (o != null && Vs(o), t === 1) e.tag === 0 ? D0(up.bind(null, e)) : Kd(up.bind(null, e)), F0(function() {
        (Ke & 6) === 0 && ir();
      }), o = null;
      else {
        switch (td(l)) {
          case 1:
            o = Je;
            break;
          case 4:
            o = bt;
            break;
          case 16:
            o = Xn;
            break;
          case 536870912:
            o = ss;
            break;
          default:
            o = Xn;
        }
        o = vp(o, cp.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = o;
    }
  }
  function cp(e, t) {
    if (Qa = -1, Ka = 0, (Ke & 6) !== 0) throw Error(a(327));
    var o = e.callbackNode;
    if (Ns() && e.callbackNode !== o) return null;
    var l = ra(e, e === Ct ? Tt : 0);
    if (l === 0) return null;
    if ((l & 30) !== 0 || (l & e.expiredLanes) !== 0 || t) t = Ya(e, l);
    else {
      t = l;
      var u = Ke;
      Ke |= 2;
      var h = fp();
      (Ct !== e || Tt !== t) && (Wn = null, Ss = Xe() + 500, Br(e, t));
      do
        try {
          sv();
          break;
        } catch (N) {
          dp(e, N);
        }
      while (!0);
      $l(), Wa.current = h, Ke = u, wt !== null ? t = 0 : (Ct = null, Tt = 0, t = kt);
    }
    if (t !== 0) {
      if (t === 2 && (u = Xi(e), u !== 0 && (l = u, t = vc(e, u))), t === 1) throw o = jo, Br(e, 0), hr(e, l), Vt(e, Xe()), o;
      if (t === 6) hr(e, l);
      else {
        if (u = e.current.alternate, (l & 30) === 0 && !nv(u) && (t = Ya(e, l), t === 2 && (h = Xi(e), h !== 0 && (l = h, t = vc(e, h))), t === 1)) throw o = jo, Br(e, 0), hr(e, l), Vt(e, Xe()), o;
        switch (e.finishedWork = u, e.finishedLanes = l, t) {
          case 0:
          case 1:
            throw Error(a(345));
          case 2:
            Wr(e, Ht, Wn);
            break;
          case 3:
            if (hr(e, l), (l & 130023424) === l && (t = mc + 500 - Xe(), 10 < t)) {
              if (ra(e, 0) !== 0) break;
              if (u = e.suspendedLanes, (u & l) !== l) {
                zt(), e.pingedLanes |= e.suspendedLanes & u;
                break;
              }
              e.timeoutHandle = _l(Wr.bind(null, e, Ht, Wn), t);
              break;
            }
            Wr(e, Ht, Wn);
            break;
          case 4:
            if (hr(e, l), (l & 4194240) === l) break;
            for (t = e.eventTimes, u = -1; 0 < l; ) {
              var b = 31 - hn(l);
              h = 1 << b, b = t[b], b > u && (u = b), l &= ~h;
            }
            if (l = u, l = Xe() - l, l = (120 > l ? 120 : 480 > l ? 480 : 1080 > l ? 1080 : 1920 > l ? 1920 : 3e3 > l ? 3e3 : 4320 > l ? 4320 : 1960 * tv(l / 1960)) - l, 10 < l) {
              e.timeoutHandle = _l(Wr.bind(null, e, Ht, Wn), l);
              break;
            }
            Wr(e, Ht, Wn);
            break;
          case 5:
            Wr(e, Ht, Wn);
            break;
          default:
            throw Error(a(329));
        }
      }
    }
    return Vt(e, Xe()), e.callbackNode === o ? cp.bind(null, e) : null;
  }
  function vc(e, t) {
    var o = ko;
    return e.current.memoizedState.isDehydrated && (Br(e, t).flags |= 256), e = Ya(e, t), e !== 2 && (t = Ht, Ht = o, t !== null && yc(t)), e;
  }
  function yc(e) {
    Ht === null ? Ht = e : Ht.push.apply(Ht, e);
  }
  function nv(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var o = t.updateQueue;
        if (o !== null && (o = o.stores, o !== null)) for (var l = 0; l < o.length; l++) {
          var u = o[l], h = u.getSnapshot;
          u = u.value;
          try {
            if (!mn(h(), u)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (o = t.child, t.subtreeFlags & 16384 && o !== null) o.return = t, t = o;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function hr(e, t) {
    for (t &= ~hc, t &= ~Ua, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var o = 31 - hn(t), l = 1 << o;
      e[o] = -1, t &= ~l;
    }
  }
  function up(e) {
    if ((Ke & 6) !== 0) throw Error(a(327));
    Ns();
    var t = ra(e, 0);
    if ((t & 1) === 0) return Vt(e, Xe()), null;
    var o = Ya(e, t);
    if (e.tag !== 0 && o === 2) {
      var l = Xi(e);
      l !== 0 && (t = l, o = vc(e, l));
    }
    if (o === 1) throw o = jo, Br(e, 0), hr(e, t), Vt(e, Xe()), o;
    if (o === 6) throw Error(a(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Wr(e, Ht, Wn), Vt(e, Xe()), null;
  }
  function wc(e, t) {
    var o = Ke;
    Ke |= 1;
    try {
      return e(t);
    } finally {
      Ke = o, Ke === 0 && (Ss = Xe() + 500, ja && ir());
    }
  }
  function zr(e) {
    fr !== null && fr.tag === 0 && (Ke & 6) === 0 && Ns();
    var t = Ke;
    Ke |= 1;
    var o = cn.transition, l = Ze;
    try {
      if (cn.transition = null, Ze = 1, e) return e();
    } finally {
      Ze = l, cn.transition = o, Ke = t, (Ke & 6) === 0 && ir();
    }
  }
  function bc() {
    Xt = _s.current, at(_s);
  }
  function Br(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var o = e.timeoutHandle;
    if (o !== -1 && (e.timeoutHandle = -1, A0(o)), wt !== null) for (o = wt.return; o !== null; ) {
      var l = o;
      switch (Tl(l), l.tag) {
        case 1:
          l = l.type.childContextTypes, l != null && wa();
          break;
        case 3:
          bs(), at(Bt), at(Mt), Ul();
          break;
        case 5:
          Bl(l);
          break;
        case 4:
          bs();
          break;
        case 13:
          at(ut);
          break;
        case 19:
          at(ut);
          break;
        case 10:
          Ll(l.type._context);
          break;
        case 22:
        case 23:
          bc();
      }
      o = o.return;
    }
    if (Ct = e, wt = e = mr(e.current, null), Tt = Xt = t, kt = 0, jo = null, hc = Ua = Or = 0, Ht = ko = null, Lr !== null) {
      for (t = 0; t < Lr.length; t++) if (o = Lr[t], l = o.interleaved, l !== null) {
        o.interleaved = null;
        var u = l.next, h = o.pending;
        if (h !== null) {
          var b = h.next;
          h.next = u, l.next = b;
        }
        o.pending = l;
      }
      Lr = null;
    }
    return e;
  }
  function dp(e, t) {
    do {
      var o = wt;
      try {
        if ($l(), Aa.current = La, Fa) {
          for (var l = dt.memoizedState; l !== null; ) {
            var u = l.queue;
            u !== null && (u.pending = null), l = l.next;
          }
          Fa = !1;
        }
        if (Ir = 0, Nt = jt = dt = null, go = !1, xo = 0, pc.current = null, o === null || o.return === null) {
          kt = 1, jo = t, wt = null;
          break;
        }
        e: {
          var h = e, b = o.return, N = o, R = t;
          if (t = Tt, N.flags |= 32768, R !== null && typeof R == "object" && typeof R.then == "function") {
            var Q = R, ie = N, le = ie.tag;
            if ((ie.mode & 1) === 0 && (le === 0 || le === 11 || le === 15)) {
              var ae = ie.alternate;
              ae ? (ie.updateQueue = ae.updateQueue, ie.memoizedState = ae.memoizedState, ie.lanes = ae.lanes) : (ie.updateQueue = null, ie.memoizedState = null);
            }
            var fe = Lf(b);
            if (fe !== null) {
              fe.flags &= -257, Df(fe, b, N, h, t), fe.mode & 1 && $f(h, Q, t), t = fe, R = Q;
              var ge = t.updateQueue;
              if (ge === null) {
                var xe = /* @__PURE__ */ new Set();
                xe.add(R), t.updateQueue = xe;
              } else ge.add(R);
              break e;
            } else {
              if ((t & 1) === 0) {
                $f(h, Q, t), jc();
                break e;
              }
              R = Error(a(426));
            }
          } else if (ct && N.mode & 1) {
            var vt = Lf(b);
            if (vt !== null) {
              (vt.flags & 65536) === 0 && (vt.flags |= 256), Df(vt, b, N, h, t), Fl(js(R, N));
              break e;
            }
          }
          h = R = js(R, N), kt !== 4 && (kt = 2), ko === null ? ko = [h] : ko.push(h), h = b;
          do {
            switch (h.tag) {
              case 3:
                h.flags |= 65536, t &= -t, h.lanes |= t;
                var O = Ff(h, R, t);
                of(h, O);
                break e;
              case 1:
                N = R;
                var F = h.type, U = h.stateNode;
                if ((h.flags & 128) === 0 && (typeof F.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && (dr === null || !dr.has(U)))) {
                  h.flags |= 65536, t &= -t, h.lanes |= t;
                  var ue = Mf(h, N, t);
                  of(h, ue);
                  break e;
                }
            }
            h = h.return;
          } while (h !== null);
        }
        hp(o);
      } catch (ye) {
        t = ye, wt === o && o !== null && (wt = o = o.return);
        continue;
      }
      break;
    } while (!0);
  }
  function fp() {
    var e = Wa.current;
    return Wa.current = La, e === null ? La : e;
  }
  function jc() {
    (kt === 0 || kt === 3 || kt === 2) && (kt = 4), Ct === null || (Or & 268435455) === 0 && (Ua & 268435455) === 0 || hr(Ct, Tt);
  }
  function Ya(e, t) {
    var o = Ke;
    Ke |= 2;
    var l = fp();
    (Ct !== e || Tt !== t) && (Wn = null, Br(e, t));
    do
      try {
        rv();
        break;
      } catch (u) {
        dp(e, u);
      }
    while (!0);
    if ($l(), Ke = o, Wa.current = l, wt !== null) throw Error(a(261));
    return Ct = null, Tt = 0, kt;
  }
  function rv() {
    for (; wt !== null; ) pp(wt);
  }
  function sv() {
    for (; wt !== null && !Ki(); ) pp(wt);
  }
  function pp(e) {
    var t = xp(e.alternate, e, Xt);
    e.memoizedProps = e.pendingProps, t === null ? hp(e) : wt = t, pc.current = null;
  }
  function hp(e) {
    var t = e;
    do {
      var o = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (o = q0(o, t, Xt), o !== null) {
          wt = o;
          return;
        }
      } else {
        if (o = X0(o, t), o !== null) {
          o.flags &= 32767, wt = o;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          kt = 6, wt = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        wt = t;
        return;
      }
      wt = t = e;
    } while (t !== null);
    kt === 0 && (kt = 5);
  }
  function Wr(e, t, o) {
    var l = Ze, u = cn.transition;
    try {
      cn.transition = null, Ze = 1, ov(e, t, o, l);
    } finally {
      cn.transition = u, Ze = l;
    }
    return null;
  }
  function ov(e, t, o, l) {
    do
      Ns();
    while (fr !== null);
    if ((Ke & 6) !== 0) throw Error(a(327));
    o = e.finishedWork;
    var u = e.finishedLanes;
    if (o === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, o === e.current) throw Error(a(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var h = o.lanes | o.childLanes;
    if (Ox(e, h), e === Ct && (wt = Ct = null, Tt = 0), (o.subtreeFlags & 2064) === 0 && (o.flags & 2064) === 0 || Va || (Va = !0, vp(Xn, function() {
      return Ns(), null;
    })), h = (o.flags & 15990) !== 0, (o.subtreeFlags & 15990) !== 0 || h) {
      h = cn.transition, cn.transition = null;
      var b = Ze;
      Ze = 1;
      var N = Ke;
      Ke |= 4, pc.current = null, J0(e, o), sp(o, e), S0(jl), aa = !!bl, jl = bl = null, e.current = o, ev(o), Yi(), Ke = N, Ze = b, cn.transition = h;
    } else e.current = o;
    if (Va && (Va = !1, fr = e, Ga = u), h = e.pendingLanes, h === 0 && (dr = null), Fx(o.stateNode), Vt(e, Xe()), t !== null) for (l = e.onRecoverableError, o = 0; o < t.length; o++) u = t[o], l(u.value, { componentStack: u.stack, digest: u.digest });
    if (Ha) throw Ha = !1, e = gc, gc = null, e;
    return (Ga & 1) !== 0 && e.tag !== 0 && Ns(), h = e.pendingLanes, (h & 1) !== 0 ? e === xc ? _o++ : (_o = 0, xc = e) : _o = 0, ir(), null;
  }
  function Ns() {
    if (fr !== null) {
      var e = td(Ga), t = cn.transition, o = Ze;
      try {
        if (cn.transition = null, Ze = 16 > e ? 16 : e, fr === null) var l = !1;
        else {
          if (e = fr, fr = null, Ga = 0, (Ke & 6) !== 0) throw Error(a(331));
          var u = Ke;
          for (Ke |= 4, pe = e.current; pe !== null; ) {
            var h = pe, b = h.child;
            if ((pe.flags & 16) !== 0) {
              var N = h.deletions;
              if (N !== null) {
                for (var R = 0; R < N.length; R++) {
                  var Q = N[R];
                  for (pe = Q; pe !== null; ) {
                    var ie = pe;
                    switch (ie.tag) {
                      case 0:
                      case 11:
                      case 15:
                        bo(8, ie, h);
                    }
                    var le = ie.child;
                    if (le !== null) le.return = ie, pe = le;
                    else for (; pe !== null; ) {
                      ie = pe;
                      var ae = ie.sibling, fe = ie.return;
                      if (Jf(ie), ie === Q) {
                        pe = null;
                        break;
                      }
                      if (ae !== null) {
                        ae.return = fe, pe = ae;
                        break;
                      }
                      pe = fe;
                    }
                  }
                }
                var ge = h.alternate;
                if (ge !== null) {
                  var xe = ge.child;
                  if (xe !== null) {
                    ge.child = null;
                    do {
                      var vt = xe.sibling;
                      xe.sibling = null, xe = vt;
                    } while (xe !== null);
                  }
                }
                pe = h;
              }
            }
            if ((h.subtreeFlags & 2064) !== 0 && b !== null) b.return = h, pe = b;
            else e: for (; pe !== null; ) {
              if (h = pe, (h.flags & 2048) !== 0) switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  bo(9, h, h.return);
              }
              var O = h.sibling;
              if (O !== null) {
                O.return = h.return, pe = O;
                break e;
              }
              pe = h.return;
            }
          }
          var F = e.current;
          for (pe = F; pe !== null; ) {
            b = pe;
            var U = b.child;
            if ((b.subtreeFlags & 2064) !== 0 && U !== null) U.return = b, pe = U;
            else e: for (b = F; pe !== null; ) {
              if (N = pe, (N.flags & 2048) !== 0) try {
                switch (N.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ba(9, N);
                }
              } catch (ye) {
                ht(N, N.return, ye);
              }
              if (N === b) {
                pe = null;
                break e;
              }
              var ue = N.sibling;
              if (ue !== null) {
                ue.return = N.return, pe = ue;
                break e;
              }
              pe = N.return;
            }
          }
          if (Ke = u, ir(), _n && typeof _n.onPostCommitFiberRoot == "function") try {
            _n.onPostCommitFiberRoot(ea, e);
          } catch {
          }
          l = !0;
        }
        return l;
      } finally {
        Ze = o, cn.transition = t;
      }
    }
    return !1;
  }
  function mp(e, t, o) {
    t = js(o, t), t = Ff(e, t, 1), e = cr(e, t, 1), t = zt(), e !== null && (Qs(e, 1, t), Vt(e, t));
  }
  function ht(e, t, o) {
    if (e.tag === 3) mp(e, e, o);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        mp(t, e, o);
        break;
      } else if (t.tag === 1) {
        var l = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (dr === null || !dr.has(l))) {
          e = js(o, e), e = Mf(t, e, 1), t = cr(t, e, 1), e = zt(), t !== null && (Qs(t, 1, e), Vt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function av(e, t, o) {
    var l = e.pingCache;
    l !== null && l.delete(t), t = zt(), e.pingedLanes |= e.suspendedLanes & o, Ct === e && (Tt & o) === o && (kt === 4 || kt === 3 && (Tt & 130023424) === Tt && 500 > Xe() - mc ? Br(e, 0) : hc |= o), Vt(e, t);
  }
  function gp(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = na, na <<= 1, (na & 130023424) === 0 && (na = 4194304)));
    var o = zt();
    e = On(e, t), e !== null && (Qs(e, t, o), Vt(e, o));
  }
  function iv(e) {
    var t = e.memoizedState, o = 0;
    t !== null && (o = t.retryLane), gp(e, o);
  }
  function lv(e, t) {
    var o = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode, u = e.memoizedState;
        u !== null && (o = u.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      default:
        throw Error(a(314));
    }
    l !== null && l.delete(t), gp(e, o);
  }
  var xp;
  xp = function(e, t, o) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Bt.current) Ut = !0;
    else {
      if ((e.lanes & o) === 0 && (t.flags & 128) === 0) return Ut = !1, Y0(e, t, o);
      Ut = (e.flags & 131072) !== 0;
    }
    else Ut = !1, ct && (t.flags & 1048576) !== 0 && Yd(t, _a, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var l = t.type;
        Oa(e, t), e = t.pendingProps;
        var u = hs(t, Mt.current);
        ws(t, o), u = Gl(null, t, l, e, u, o);
        var h = Ql();
        return t.flags |= 1, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Wt(l) ? (h = !0, ba(t)) : h = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, Ol(t), u.updater = Da, t.stateNode = u, u._reactInternals = t, Jl(t, l, e, o), t = rc(null, t, l, !0, h, o)) : (t.tag = 0, ct && h && El(t), Ot(null, t, u, o), t = t.child), t;
      case 16:
        l = t.elementType;
        e: {
          switch (Oa(e, t), e = t.pendingProps, u = l._init, l = u(l._payload), t.type = l, u = t.tag = uv(l), e = xn(l, e), u) {
            case 0:
              t = nc(null, t, l, e, o);
              break e;
            case 1:
              t = Uf(null, t, l, e, o);
              break e;
            case 11:
              t = If(null, t, l, e, o);
              break e;
            case 14:
              t = Of(null, t, l, xn(l.type, e), o);
              break e;
          }
          throw Error(a(
            306,
            l,
            ""
          ));
        }
        return t;
      case 0:
        return l = t.type, u = t.pendingProps, u = t.elementType === l ? u : xn(l, u), nc(e, t, l, u, o);
      case 1:
        return l = t.type, u = t.pendingProps, u = t.elementType === l ? u : xn(l, u), Uf(e, t, l, u, o);
      case 3:
        e: {
          if (Hf(t), e === null) throw Error(a(387));
          l = t.pendingProps, h = t.memoizedState, u = h.element, sf(e, t), Ta(t, l, null, o);
          var b = t.memoizedState;
          if (l = b.element, h.isDehydrated) if (h = { element: l, isDehydrated: !1, cache: b.cache, pendingSuspenseBoundaries: b.pendingSuspenseBoundaries, transitions: b.transitions }, t.updateQueue.baseState = h, t.memoizedState = h, t.flags & 256) {
            u = js(Error(a(423)), t), t = Vf(e, t, l, o, u);
            break e;
          } else if (l !== u) {
            u = js(Error(a(424)), t), t = Vf(e, t, l, o, u);
            break e;
          } else for (qt = sr(t.stateNode.containerInfo.firstChild), Yt = t, ct = !0, gn = null, o = nf(t, null, l, o), t.child = o; o; ) o.flags = o.flags & -3 | 4096, o = o.sibling;
          else {
            if (xs(), l === u) {
              t = Bn(e, t, o);
              break e;
            }
            Ot(e, t, l, o);
          }
          t = t.child;
        }
        return t;
      case 5:
        return lf(t), e === null && Al(t), l = t.type, u = t.pendingProps, h = e !== null ? e.memoizedProps : null, b = u.children, kl(l, u) ? b = null : h !== null && kl(l, h) && (t.flags |= 32), Wf(e, t), Ot(e, t, b, o), t.child;
      case 6:
        return e === null && Al(t), null;
      case 13:
        return Gf(e, t, o);
      case 4:
        return zl(t, t.stateNode.containerInfo), l = t.pendingProps, e === null ? t.child = vs(t, null, l, o) : Ot(e, t, l, o), t.child;
      case 11:
        return l = t.type, u = t.pendingProps, u = t.elementType === l ? u : xn(l, u), If(e, t, l, u, o);
      case 7:
        return Ot(e, t, t.pendingProps, o), t.child;
      case 8:
        return Ot(e, t, t.pendingProps.children, o), t.child;
      case 12:
        return Ot(e, t, t.pendingProps.children, o), t.child;
      case 10:
        e: {
          if (l = t.type._context, u = t.pendingProps, h = t.memoizedProps, b = u.value, rt(Ca, l._currentValue), l._currentValue = b, h !== null) if (mn(h.value, b)) {
            if (h.children === u.children && !Bt.current) {
              t = Bn(e, t, o);
              break e;
            }
          } else for (h = t.child, h !== null && (h.return = t); h !== null; ) {
            var N = h.dependencies;
            if (N !== null) {
              b = h.child;
              for (var R = N.firstContext; R !== null; ) {
                if (R.context === l) {
                  if (h.tag === 1) {
                    R = zn(-1, o & -o), R.tag = 2;
                    var Q = h.updateQueue;
                    if (Q !== null) {
                      Q = Q.shared;
                      var ie = Q.pending;
                      ie === null ? R.next = R : (R.next = ie.next, ie.next = R), Q.pending = R;
                    }
                  }
                  h.lanes |= o, R = h.alternate, R !== null && (R.lanes |= o), Dl(
                    h.return,
                    o,
                    t
                  ), N.lanes |= o;
                  break;
                }
                R = R.next;
              }
            } else if (h.tag === 10) b = h.type === t.type ? null : h.child;
            else if (h.tag === 18) {
              if (b = h.return, b === null) throw Error(a(341));
              b.lanes |= o, N = b.alternate, N !== null && (N.lanes |= o), Dl(b, o, t), b = h.sibling;
            } else b = h.child;
            if (b !== null) b.return = h;
            else for (b = h; b !== null; ) {
              if (b === t) {
                b = null;
                break;
              }
              if (h = b.sibling, h !== null) {
                h.return = b.return, b = h;
                break;
              }
              b = b.return;
            }
            h = b;
          }
          Ot(e, t, u.children, o), t = t.child;
        }
        return t;
      case 9:
        return u = t.type, l = t.pendingProps.children, ws(t, o), u = an(u), l = l(u), t.flags |= 1, Ot(e, t, l, o), t.child;
      case 14:
        return l = t.type, u = xn(l, t.pendingProps), u = xn(l.type, u), Of(e, t, l, u, o);
      case 15:
        return zf(e, t, t.type, t.pendingProps, o);
      case 17:
        return l = t.type, u = t.pendingProps, u = t.elementType === l ? u : xn(l, u), Oa(e, t), t.tag = 1, Wt(l) ? (e = !0, ba(t)) : e = !1, ws(t, o), Rf(t, l, u), Jl(t, l, u, o), rc(null, t, l, !0, e, o);
      case 19:
        return Kf(e, t, o);
      case 22:
        return Bf(e, t, o);
    }
    throw Error(a(156, t.tag));
  };
  function vp(e, t) {
    return Jo(e, t);
  }
  function cv(e, t, o, l) {
    this.tag = e, this.key = o, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function un(e, t, o, l) {
    return new cv(e, t, o, l);
  }
  function kc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function uv(e) {
    if (typeof e == "function") return kc(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === B) return 11;
      if (e === Y) return 14;
    }
    return 2;
  }
  function mr(e, t) {
    var o = e.alternate;
    return o === null ? (o = un(e.tag, t, e.key, e.mode), o.elementType = e.elementType, o.type = e.type, o.stateNode = e.stateNode, o.alternate = e, e.alternate = o) : (o.pendingProps = t, o.type = e.type, o.flags = 0, o.subtreeFlags = 0, o.deletions = null), o.flags = e.flags & 14680064, o.childLanes = e.childLanes, o.lanes = e.lanes, o.child = e.child, o.memoizedProps = e.memoizedProps, o.memoizedState = e.memoizedState, o.updateQueue = e.updateQueue, t = e.dependencies, o.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, o.sibling = e.sibling, o.index = e.index, o.ref = e.ref, o;
  }
  function qa(e, t, o, l, u, h) {
    var b = 2;
    if (l = e, typeof e == "function") kc(e) && (b = 1);
    else if (typeof e == "string") b = 5;
    else e: switch (e) {
      case H:
        return Ur(o.children, u, h, t);
      case L:
        b = 8, u |= 8;
        break;
      case re:
        return e = un(12, o, t, u | 2), e.elementType = re, e.lanes = h, e;
      case G:
        return e = un(13, o, t, u), e.elementType = G, e.lanes = h, e;
      case M:
        return e = un(19, o, t, u), e.elementType = M, e.lanes = h, e;
      case te:
        return Xa(o, u, h, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case I:
            b = 10;
            break e;
          case K:
            b = 9;
            break e;
          case B:
            b = 11;
            break e;
          case Y:
            b = 14;
            break e;
          case X:
            b = 16, l = null;
            break e;
        }
        throw Error(a(130, e == null ? e : typeof e, ""));
    }
    return t = un(b, o, t, u), t.elementType = e, t.type = l, t.lanes = h, t;
  }
  function Ur(e, t, o, l) {
    return e = un(7, e, l, t), e.lanes = o, e;
  }
  function Xa(e, t, o, l) {
    return e = un(22, e, l, t), e.elementType = te, e.lanes = o, e.stateNode = { isHidden: !1 }, e;
  }
  function _c(e, t, o) {
    return e = un(6, e, null, t), e.lanes = o, e;
  }
  function Sc(e, t, o) {
    return t = un(4, e.children !== null ? e.children : [], e.key, t), t.lanes = o, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function dv(e, t, o, l, u) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Zi(0), this.expirationTimes = Zi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zi(0), this.identifierPrefix = l, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null;
  }
  function Nc(e, t, o, l, u, h, b, N, R) {
    return e = new dv(e, t, o, N, R), t === 1 ? (t = 1, h === !0 && (t |= 8)) : t = 0, h = un(3, null, null, t), e.current = h, h.stateNode = e, h.memoizedState = { element: l, isDehydrated: o, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ol(h), e;
  }
  function fv(e, t, o) {
    var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Z, key: l == null ? null : "" + l, children: e, containerInfo: t, implementation: o };
  }
  function yp(e) {
    if (!e) return ar;
    e = e._reactInternals;
    e: {
      if (Mn(e) !== e || e.tag !== 1) throw Error(a(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Wt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(a(171));
    }
    if (e.tag === 1) {
      var o = e.type;
      if (Wt(o)) return Gd(e, o, t);
    }
    return t;
  }
  function wp(e, t, o, l, u, h, b, N, R) {
    return e = Nc(o, l, !0, e, u, h, b, N, R), e.context = yp(null), o = e.current, l = zt(), u = pr(o), h = zn(l, u), h.callback = t ?? null, cr(o, h, u), e.current.lanes = u, Qs(e, u, l), Vt(e, l), e;
  }
  function Za(e, t, o, l) {
    var u = t.current, h = zt(), b = pr(u);
    return o = yp(o), t.context === null ? t.context = o : t.pendingContext = o, t = zn(h, b), t.payload = { element: e }, l = l === void 0 ? null : l, l !== null && (t.callback = l), e = cr(u, t, b), e !== null && (wn(e, u, b, h), Ea(e, u, b)), b;
  }
  function Ja(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function bp(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var o = e.retryLane;
      e.retryLane = o !== 0 && o < t ? o : t;
    }
  }
  function Cc(e, t) {
    bp(e, t), (e = e.alternate) && bp(e, t);
  }
  function pv() {
    return null;
  }
  var jp = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Pc(e) {
    this._internalRoot = e;
  }
  ei.prototype.render = Pc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(a(409));
    Za(e, t, null, null);
  }, ei.prototype.unmount = Pc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      zr(function() {
        Za(null, e, null, null);
      }), t[$n] = null;
    }
  };
  function ei(e) {
    this._internalRoot = e;
  }
  ei.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = sd();
      e = { blockedOn: null, target: e, priority: t };
      for (var o = 0; o < tr.length && t !== 0 && t < tr[o].priority; o++) ;
      tr.splice(o, 0, e), o === 0 && id(e);
    }
  };
  function Ec(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function ti(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function kp() {
  }
  function hv(e, t, o, l, u) {
    if (u) {
      if (typeof l == "function") {
        var h = l;
        l = function() {
          var Q = Ja(b);
          h.call(Q);
        };
      }
      var b = wp(t, l, e, 0, null, !1, !1, "", kp);
      return e._reactRootContainer = b, e[$n] = b.current, io(e.nodeType === 8 ? e.parentNode : e), zr(), b;
    }
    for (; u = e.lastChild; ) e.removeChild(u);
    if (typeof l == "function") {
      var N = l;
      l = function() {
        var Q = Ja(R);
        N.call(Q);
      };
    }
    var R = Nc(e, 0, !1, null, null, !1, !1, "", kp);
    return e._reactRootContainer = R, e[$n] = R.current, io(e.nodeType === 8 ? e.parentNode : e), zr(function() {
      Za(t, R, o, l);
    }), R;
  }
  function ni(e, t, o, l, u) {
    var h = o._reactRootContainer;
    if (h) {
      var b = h;
      if (typeof u == "function") {
        var N = u;
        u = function() {
          var R = Ja(b);
          N.call(R);
        };
      }
      Za(t, b, e, u);
    } else b = hv(o, t, e, u, l);
    return Ja(b);
  }
  nd = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var o = Gs(t.pendingLanes);
          o !== 0 && (Ji(t, o | 1), Vt(t, Xe()), (Ke & 6) === 0 && (Ss = Xe() + 500, ir()));
        }
        break;
      case 13:
        zr(function() {
          var l = On(e, 1);
          if (l !== null) {
            var u = zt();
            wn(l, e, 1, u);
          }
        }), Cc(e, 1);
    }
  }, el = function(e) {
    if (e.tag === 13) {
      var t = On(e, 134217728);
      if (t !== null) {
        var o = zt();
        wn(t, e, 134217728, o);
      }
      Cc(e, 134217728);
    }
  }, rd = function(e) {
    if (e.tag === 13) {
      var t = pr(e), o = On(e, t);
      if (o !== null) {
        var l = zt();
        wn(o, e, t, l);
      }
      Cc(e, t);
    }
  }, sd = function() {
    return Ze;
  }, od = function(e, t) {
    var o = Ze;
    try {
      return Ze = e, t();
    } finally {
      Ze = o;
    }
  }, rn = function(e, t, o) {
    switch (t) {
      case "input":
        if (Ee(e, o), t = o.name, o.type === "radio" && t != null) {
          for (o = e; o.parentNode; ) o = o.parentNode;
          for (o = o.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < o.length; t++) {
            var l = o[t];
            if (l !== e && l.form === e.form) {
              var u = ya(l);
              if (!u) throw Error(a(90));
              Ae(l), Ee(l, u);
            }
          }
        }
        break;
      case "textarea":
        Te(e, o);
        break;
      case "select":
        t = o.value, t != null && W(e, !!o.multiple, t, !1);
    }
  }, Qn = wc, Tr = zr;
  var mv = { usingClientEntryPoint: !1, Events: [uo, fs, ya, At, Fn, wc] }, So = { findFiberByHostInstance: Ar, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, gv = { bundleType: So.bundleType, version: So.version, rendererPackageName: So.rendererPackageName, rendererConfig: So.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: $.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Zo(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: So.findFiberByHostInstance || pv, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ri = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ri.isDisabled && ri.supportsFiber) try {
      ea = ri.inject(gv), _n = ri;
    } catch {
    }
  }
  return Gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mv, Gt.createPortal = function(e, t) {
    var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ec(t)) throw Error(a(200));
    return fv(e, t, null, o);
  }, Gt.createRoot = function(e, t) {
    if (!Ec(e)) throw Error(a(299));
    var o = !1, l = "", u = jp;
    return t != null && (t.unstable_strictMode === !0 && (o = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onRecoverableError !== void 0 && (u = t.onRecoverableError)), t = Nc(e, 1, !1, null, null, o, !1, l, u), e[$n] = t.current, io(e.nodeType === 8 ? e.parentNode : e), new Pc(t);
  }, Gt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = Zo(t), e = e === null ? null : e.stateNode, e;
  }, Gt.flushSync = function(e) {
    return zr(e);
  }, Gt.hydrate = function(e, t, o) {
    if (!ti(t)) throw Error(a(200));
    return ni(null, e, t, !0, o);
  }, Gt.hydrateRoot = function(e, t, o) {
    if (!Ec(e)) throw Error(a(405));
    var l = o != null && o.hydratedSources || null, u = !1, h = "", b = jp;
    if (o != null && (o.unstable_strictMode === !0 && (u = !0), o.identifierPrefix !== void 0 && (h = o.identifierPrefix), o.onRecoverableError !== void 0 && (b = o.onRecoverableError)), t = wp(t, null, e, 1, o ?? null, u, !1, h, b), e[$n] = t.current, io(e), l) for (e = 0; e < l.length; e++) o = l[e], u = o._getVersion, u = u(o._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [o, u] : t.mutableSourceEagerHydrationData.push(
      o,
      u
    );
    return new ei(t);
  }, Gt.render = function(e, t, o) {
    if (!ti(t)) throw Error(a(200));
    return ni(null, e, t, !1, o);
  }, Gt.unmountComponentAtNode = function(e) {
    if (!ti(e)) throw Error(a(40));
    return e._reactRootContainer ? (zr(function() {
      ni(null, null, e, !1, function() {
        e._reactRootContainer = null, e[$n] = null;
      });
    }), !0) : !1;
  }, Gt.unstable_batchedUpdates = wc, Gt.unstable_renderSubtreeIntoContainer = function(e, t, o, l) {
    if (!ti(o)) throw Error(a(200));
    if (e == null || e._reactInternals === void 0) throw Error(a(38));
    return ni(e, t, o, !1, l);
  }, Gt.version = "18.3.1-next-f1338f8080-20240426", Gt;
}
var Rp;
function Dh() {
  if (Rp) return Ac.exports;
  Rp = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Ac.exports = _v(), Ac.exports;
}
var Ap;
function Sv() {
  if (Ap) return si;
  Ap = 1;
  var n = Dh();
  return si.createRoot = n.createRoot, si.hydrateRoot = n.hydrateRoot, si;
}
var Nv = Sv(), Oo = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(n) {
    return this.listeners.add(n), this.onSubscribe(), () => {
      this.listeners.delete(n), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Cv = {
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
  setTimeout: (n, r) => setTimeout(n, r),
  clearTimeout: (n) => clearTimeout(n),
  setInterval: (n, r) => setInterval(n, r),
  clearInterval: (n) => clearInterval(n)
}, Pv = class {
  // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
  // type at app boot; and if we leave that type, then any new timer provider
  // would need to support ReturnType<typeof setTimeout>, which is infeasible.
  //
  // We settle for type safety for the TimeoutProvider type, and accept that
  // this class is unsafe internally to allow for extension.
  #e = Cv;
  #t = !1;
  setTimeoutProvider(n) {
    this.#e = n;
  }
  setTimeout(n, r) {
    return this.#e.setTimeout(n, r);
  }
  clearTimeout(n) {
    this.#e.clearTimeout(n);
  }
  setInterval(n, r) {
    return this.#e.setInterval(n, r);
  }
  clearInterval(n) {
    this.#e.clearInterval(n);
  }
}, Yr = new Pv();
function Ev(n) {
  setTimeout(n, 0);
}
var Xr = typeof window > "u" || "Deno" in globalThis;
function Qt() {
}
function Tv(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function Xc(n) {
  return typeof n == "number" && n >= 0 && n !== 1 / 0;
}
function Ih(n, r) {
  return Math.max(n + (r || 0) - Date.now(), 0);
}
function _r(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function dn(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function Fp(n, r) {
  const {
    type: a = "all",
    exact: i,
    fetchStatus: c,
    predicate: d,
    queryKey: p,
    stale: f
  } = n;
  if (p) {
    if (i) {
      if (r.queryHash !== Su(p, r.options))
        return !1;
    } else if (!Fo(r.queryKey, p))
      return !1;
  }
  if (a !== "all") {
    const m = r.isActive();
    if (a === "active" && !m || a === "inactive" && m)
      return !1;
  }
  return !(typeof f == "boolean" && r.isStale() !== f || c && c !== r.state.fetchStatus || d && !d(r));
}
function Mp(n, r) {
  const { exact: a, status: i, predicate: c, mutationKey: d } = n;
  if (d) {
    if (!r.options.mutationKey)
      return !1;
    if (a) {
      if (Ao(r.options.mutationKey) !== Ao(d))
        return !1;
    } else if (!Fo(r.options.mutationKey, d))
      return !1;
  }
  return !(i && r.state.status !== i || c && !c(r));
}
function Su(n, r) {
  return (r?.queryKeyHashFn || Ao)(n);
}
function Ao(n) {
  return JSON.stringify(
    n,
    (r, a) => Jc(a) ? Object.keys(a).sort().reduce((i, c) => (i[c] = a[c], i), {}) : a
  );
}
function Fo(n, r) {
  return n === r ? !0 : typeof n != typeof r ? !1 : n && r && typeof n == "object" && typeof r == "object" ? Object.keys(r).every((a) => Fo(n[a], r[a])) : !1;
}
var Rv = Object.prototype.hasOwnProperty;
function Oh(n, r, a = 0) {
  if (n === r)
    return n;
  if (a > 500) return r;
  const i = $p(n) && $p(r);
  if (!i && !(Jc(n) && Jc(r))) return r;
  const d = (i ? n : Object.keys(n)).length, p = i ? r : Object.keys(r), f = p.length, m = i ? new Array(f) : {};
  let v = 0;
  for (let g = 0; g < f; g++) {
    const x = i ? g : p[g], w = n[x], k = r[x];
    if (w === k) {
      m[x] = w, (i ? g < d : Rv.call(n, x)) && v++;
      continue;
    }
    if (w === null || k === null || typeof w != "object" || typeof k != "object") {
      m[x] = k;
      continue;
    }
    const S = Oh(w, k, a + 1);
    m[x] = S, S === w && v++;
  }
  return d === f && v === d ? n : m;
}
function Zc(n, r) {
  if (!r || Object.keys(n).length !== Object.keys(r).length)
    return !1;
  for (const a in n)
    if (n[a] !== r[a])
      return !1;
  return !0;
}
function $p(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function Jc(n) {
  if (!Lp(n))
    return !1;
  const r = n.constructor;
  if (r === void 0)
    return !0;
  const a = r.prototype;
  return !(!Lp(a) || !a.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(n) !== Object.prototype);
}
function Lp(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function Av(n) {
  return new Promise((r) => {
    Yr.setTimeout(r, n);
  });
}
function eu(n, r, a) {
  return typeof a.structuralSharing == "function" ? a.structuralSharing(n, r) : a.structuralSharing !== !1 ? Oh(n, r) : r;
}
function Fv(n, r, a = 0) {
  const i = [...n, r];
  return a && i.length > a ? i.slice(1) : i;
}
function Mv(n, r, a = 0) {
  const i = [r, ...n];
  return a && i.length > a ? i.slice(0, -1) : i;
}
var Nu = /* @__PURE__ */ Symbol();
function zh(n, r) {
  return !n.queryFn && r?.initialPromise ? () => r.initialPromise : !n.queryFn || n.queryFn === Nu ? () => Promise.reject(new Error(`Missing queryFn: '${n.queryHash}'`)) : n.queryFn;
}
function Bh(n, r) {
  return typeof n == "function" ? n(...r) : !!n;
}
function $v(n, r, a) {
  let i = !1, c;
  return Object.defineProperty(n, "signal", {
    enumerable: !0,
    get: () => (c ??= r(), i || (i = !0, c.aborted ? a() : c.addEventListener("abort", a, { once: !0 })), c)
  }), n;
}
var Lv = class extends Oo {
  #e;
  #t;
  #n;
  constructor() {
    super(), this.#n = (n) => {
      if (!Xr && window.addEventListener) {
        const r = () => n();
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
  setEventListener(n) {
    this.#n = n, this.#t?.(), this.#t = n((r) => {
      typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
    });
  }
  setFocused(n) {
    this.#e !== n && (this.#e = n, this.onFocus());
  }
  onFocus() {
    const n = this.isFocused();
    this.listeners.forEach((r) => {
      r(n);
    });
  }
  isFocused() {
    return typeof this.#e == "boolean" ? this.#e : globalThis.document?.visibilityState !== "hidden";
  }
}, Cu = new Lv();
function tu() {
  let n, r;
  const a = new Promise((c, d) => {
    n = c, r = d;
  });
  a.status = "pending", a.catch(() => {
  });
  function i(c) {
    Object.assign(a, c), delete a.resolve, delete a.reject;
  }
  return a.resolve = (c) => {
    i({
      status: "fulfilled",
      value: c
    }), n(c);
  }, a.reject = (c) => {
    i({
      status: "rejected",
      reason: c
    }), r(c);
  }, a;
}
var Dv = Ev;
function Iv() {
  let n = [], r = 0, a = (f) => {
    f();
  }, i = (f) => {
    f();
  }, c = Dv;
  const d = (f) => {
    r ? n.push(f) : c(() => {
      a(f);
    });
  }, p = () => {
    const f = n;
    n = [], f.length && c(() => {
      i(() => {
        f.forEach((m) => {
          a(m);
        });
      });
    });
  };
  return {
    batch: (f) => {
      let m;
      r++;
      try {
        m = f();
      } finally {
        r--, r || p();
      }
      return m;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (f) => (...m) => {
      d(() => {
        f(...m);
      });
    },
    schedule: d,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (f) => {
      a = f;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (f) => {
      i = f;
    },
    setScheduler: (f) => {
      c = f;
    }
  };
}
var Rt = Iv(), Ov = class extends Oo {
  #e = !0;
  #t;
  #n;
  constructor() {
    super(), this.#n = (n) => {
      if (!Xr && window.addEventListener) {
        const r = () => n(!0), a = () => n(!1);
        return window.addEventListener("online", r, !1), window.addEventListener("offline", a, !1), () => {
          window.removeEventListener("online", r), window.removeEventListener("offline", a);
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
  setEventListener(n) {
    this.#n = n, this.#t?.(), this.#t = n(this.setOnline.bind(this));
  }
  setOnline(n) {
    this.#e !== n && (this.#e = n, this.listeners.forEach((a) => {
      a(n);
    }));
  }
  isOnline() {
    return this.#e;
  }
}, bi = new Ov();
function zv(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function Wh(n) {
  return (n ?? "online") === "online" ? bi.isOnline() : !0;
}
var nu = class extends Error {
  constructor(n) {
    super("CancelledError"), this.revert = n?.revert, this.silent = n?.silent;
  }
};
function Uh(n) {
  let r = !1, a = 0, i;
  const c = tu(), d = () => c.status !== "pending", p = (j) => {
    if (!d()) {
      const _ = new nu(j);
      w(_), n.onCancel?.(_);
    }
  }, f = () => {
    r = !0;
  }, m = () => {
    r = !1;
  }, v = () => Cu.isFocused() && (n.networkMode === "always" || bi.isOnline()) && n.canRun(), g = () => Wh(n.networkMode) && n.canRun(), x = (j) => {
    d() || (i?.(), c.resolve(j));
  }, w = (j) => {
    d() || (i?.(), c.reject(j));
  }, k = () => new Promise((j) => {
    i = (_) => {
      (d() || v()) && j(_);
    }, n.onPause?.();
  }).then(() => {
    i = void 0, d() || n.onContinue?.();
  }), S = () => {
    if (d())
      return;
    let j;
    const _ = a === 0 ? n.initialPromise : void 0;
    try {
      j = _ ?? n.fn();
    } catch (P) {
      j = Promise.reject(P);
    }
    Promise.resolve(j).then(x).catch((P) => {
      if (d())
        return;
      const T = n.retry ?? (Xr ? 0 : 3), C = n.retryDelay ?? zv, $ = typeof C == "function" ? C(a, P) : C, V = T === !0 || typeof T == "number" && a < T || typeof T == "function" && T(a, P);
      if (r || !V) {
        w(P);
        return;
      }
      a++, n.onFail?.(a, P), Av($).then(() => v() ? void 0 : k()).then(() => {
        r ? w(P) : S();
      });
    });
  };
  return {
    promise: c,
    status: () => c.status,
    cancel: p,
    continue: () => (i?.(), c),
    cancelRetry: f,
    continueRetry: m,
    canStart: g,
    start: () => (g() ? S() : k().then(S), c)
  };
}
var Hh = class {
  #e;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), Xc(this.gcTime) && (this.#e = Yr.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(n) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      n ?? (Xr ? 1 / 0 : 300 * 1e3)
    );
  }
  clearGcTimeout() {
    this.#e && (Yr.clearTimeout(this.#e), this.#e = void 0);
  }
}, Bv = class extends Hh {
  #e;
  #t;
  #n;
  #s;
  #r;
  #i;
  #a;
  constructor(n) {
    super(), this.#a = !1, this.#i = n.defaultOptions, this.setOptions(n.options), this.observers = [], this.#s = n.client, this.#n = this.#s.getQueryCache(), this.queryKey = n.queryKey, this.queryHash = n.queryHash, this.#e = Ip(this.options), this.state = n.state ?? this.#e, this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#r?.promise;
  }
  setOptions(n) {
    if (this.options = { ...this.#i, ...n }, this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const r = Ip(this.options);
      r.data !== void 0 && (this.setState(
        Dp(r.data, r.dataUpdatedAt)
      ), this.#e = r);
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && this.#n.remove(this);
  }
  setData(n, r) {
    const a = eu(this.state.data, n, this.options);
    return this.#o({
      data: a,
      type: "success",
      dataUpdatedAt: r?.updatedAt,
      manual: r?.manual
    }), a;
  }
  setState(n, r) {
    this.#o({ type: "setState", state: n, setStateOptions: r });
  }
  cancel(n) {
    const r = this.#r?.promise;
    return this.#r?.cancel(n), r ? r.then(Qt).catch(Qt) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(this.#e);
  }
  isActive() {
    return this.observers.some(
      (n) => dn(n.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Nu || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (n) => _r(n.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (n) => n.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(n = 0) {
    return this.state.data === void 0 ? !0 : n === "static" ? !1 : this.state.isInvalidated ? !0 : !Ih(this.state.dataUpdatedAt, n);
  }
  onFocus() {
    this.observers.find((r) => r.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#r?.continue();
  }
  onOnline() {
    this.observers.find((r) => r.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#r?.continue();
  }
  addObserver(n) {
    this.observers.includes(n) || (this.observers.push(n), this.clearGcTimeout(), this.#n.notify({ type: "observerAdded", query: this, observer: n }));
  }
  removeObserver(n) {
    this.observers.includes(n) && (this.observers = this.observers.filter((r) => r !== n), this.observers.length || (this.#r && (this.#a ? this.#r.cancel({ revert: !0 }) : this.#r.cancelRetry()), this.scheduleGc()), this.#n.notify({ type: "observerRemoved", query: this, observer: n }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || this.#o({ type: "invalidate" });
  }
  async fetch(n, r) {
    if (this.state.fetchStatus !== "idle" && // If the promise in the retryer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    this.#r?.status() !== "rejected") {
      if (this.state.data !== void 0 && r?.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.#r)
        return this.#r.continueRetry(), this.#r.promise;
    }
    if (n && this.setOptions(n), !this.options.queryFn) {
      const f = this.observers.find((m) => m.options.queryFn);
      f && this.setOptions(f.options);
    }
    const a = new AbortController(), i = (f) => {
      Object.defineProperty(f, "signal", {
        enumerable: !0,
        get: () => (this.#a = !0, a.signal)
      });
    }, c = () => {
      const f = zh(this.options, r), v = (() => {
        const g = {
          client: this.#s,
          queryKey: this.queryKey,
          meta: this.meta
        };
        return i(g), g;
      })();
      return this.#a = !1, this.options.persister ? this.options.persister(
        f,
        v,
        this
      ) : f(v);
    }, p = (() => {
      const f = {
        fetchOptions: r,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#s,
        state: this.state,
        fetchFn: c
      };
      return i(f), f;
    })();
    this.options.behavior?.onFetch(p, this), this.#t = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== p.fetchOptions?.meta) && this.#o({ type: "fetch", meta: p.fetchOptions?.meta }), this.#r = Uh({
      initialPromise: r?.initialPromise,
      fn: p.fetchFn,
      onCancel: (f) => {
        f instanceof nu && f.revert && this.setState({
          ...this.#t,
          fetchStatus: "idle"
        }), a.abort();
      },
      onFail: (f, m) => {
        this.#o({ type: "failed", failureCount: f, error: m });
      },
      onPause: () => {
        this.#o({ type: "pause" });
      },
      onContinue: () => {
        this.#o({ type: "continue" });
      },
      retry: p.options.retry,
      retryDelay: p.options.retryDelay,
      networkMode: p.options.networkMode,
      canRun: () => !0
    });
    try {
      const f = await this.#r.start();
      if (f === void 0)
        throw new Error(`${this.queryHash} data is undefined`);
      return this.setData(f), this.#n.config.onSuccess?.(f, this), this.#n.config.onSettled?.(
        f,
        this.state.error,
        this
      ), f;
    } catch (f) {
      if (f instanceof nu) {
        if (f.silent)
          return this.#r.promise;
        if (f.revert) {
          if (this.state.data === void 0)
            throw f;
          return this.state.data;
        }
      }
      throw this.#o({
        type: "error",
        error: f
      }), this.#n.config.onError?.(
        f,
        this
      ), this.#n.config.onSettled?.(
        this.state.data,
        f,
        this
      ), f;
    } finally {
      this.scheduleGc();
    }
  }
  #o(n) {
    const r = (a) => {
      switch (n.type) {
        case "failed":
          return {
            ...a,
            fetchFailureCount: n.failureCount,
            fetchFailureReason: n.error
          };
        case "pause":
          return {
            ...a,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...a,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...a,
            ...Vh(a.data, this.options),
            fetchMeta: n.meta ?? null
          };
        case "success":
          const i = {
            ...a,
            ...Dp(n.data, n.dataUpdatedAt),
            dataUpdateCount: a.dataUpdateCount + 1,
            ...!n.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          return this.#t = n.manual ? i : void 0, i;
        case "error":
          const c = n.error;
          return {
            ...a,
            error: c,
            errorUpdateCount: a.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: a.fetchFailureCount + 1,
            fetchFailureReason: c,
            fetchStatus: "idle",
            status: "error",
            // flag existing data as invalidated if we get a background error
            // note that "no data" always means stale so we can set unconditionally here
            isInvalidated: !0
          };
        case "invalidate":
          return {
            ...a,
            isInvalidated: !0
          };
        case "setState":
          return {
            ...a,
            ...n.state
          };
      }
    };
    this.state = r(this.state), Rt.batch(() => {
      this.observers.forEach((a) => {
        a.onQueryUpdate();
      }), this.#n.notify({ query: this, type: "updated", action: n });
    });
  }
};
function Vh(n, r) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Wh(r.networkMode) ? "fetching" : "paused",
    ...n === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function Dp(n, r) {
  return {
    data: n,
    dataUpdatedAt: r ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function Ip(n) {
  const r = typeof n.initialData == "function" ? n.initialData() : n.initialData, a = r !== void 0, i = a ? typeof n.initialDataUpdatedAt == "function" ? n.initialDataUpdatedAt() : n.initialDataUpdatedAt : 0;
  return {
    data: r,
    dataUpdateCount: 0,
    dataUpdatedAt: a ? i ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: a ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var Wv = class extends Oo {
  constructor(n, r) {
    super(), this.options = r, this.#e = n, this.#o = null, this.#a = tu(), this.bindMethods(), this.setOptions(r);
  }
  #e;
  #t = void 0;
  #n = void 0;
  #s = void 0;
  #r;
  #i;
  #a;
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
    this.listeners.size === 1 && (this.#t.addObserver(this), Op(this.#t, this.options) ? this.#d() : this.updateResult(), this.#y());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return ru(
      this.#t,
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return ru(
      this.#t,
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), this.#w(), this.#b(), this.#t.removeObserver(this);
  }
  setOptions(n) {
    const r = this.options, a = this.#t;
    if (this.options = this.#e.defaultQueryOptions(n), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof dn(this.options.enabled, this.#t) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    this.#j(), this.#t.setOptions(this.options), r._defaulted && !Zc(this.options, r) && this.#e.getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: this.#t,
      observer: this
    });
    const i = this.hasListeners();
    i && zp(
      this.#t,
      a,
      this.options,
      r
    ) && this.#d(), this.updateResult(), i && (this.#t !== a || dn(this.options.enabled, this.#t) !== dn(r.enabled, this.#t) || _r(this.options.staleTime, this.#t) !== _r(r.staleTime, this.#t)) && this.#g();
    const c = this.#x();
    i && (this.#t !== a || dn(this.options.enabled, this.#t) !== dn(r.enabled, this.#t) || c !== this.#l) && this.#v(c);
  }
  getOptimisticResult(n) {
    const r = this.#e.getQueryCache().build(this.#e, n), a = this.createResult(r, n);
    return Hv(this, a) && (this.#s = a, this.#i = this.options, this.#r = this.#t.state), a;
  }
  getCurrentResult() {
    return this.#s;
  }
  trackResult(n, r) {
    return new Proxy(n, {
      get: (a, i) => (this.trackProp(i), r?.(i), i === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && this.#a.status === "pending" && this.#a.reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(a, i))
    });
  }
  trackProp(n) {
    this.#h.add(n);
  }
  getCurrentQuery() {
    return this.#t;
  }
  refetch({ ...n } = {}) {
    return this.fetch({
      ...n
    });
  }
  fetchOptimistic(n) {
    const r = this.#e.defaultQueryOptions(n), a = this.#e.getQueryCache().build(this.#e, r);
    return a.fetch().then(() => this.createResult(a, r));
  }
  fetch(n) {
    return this.#d({
      ...n,
      cancelRefetch: n.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), this.#s));
  }
  #d(n) {
    this.#j();
    let r = this.#t.fetch(
      this.options,
      n
    );
    return n?.throwOnError || (r = r.catch(Qt)), r;
  }
  #g() {
    this.#w();
    const n = _r(
      this.options.staleTime,
      this.#t
    );
    if (Xr || this.#s.isStale || !Xc(n))
      return;
    const a = Ih(this.#s.dataUpdatedAt, n) + 1;
    this.#c = Yr.setTimeout(() => {
      this.#s.isStale || this.updateResult();
    }, a);
  }
  #x() {
    return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(this.#t) : this.options.refetchInterval) ?? !1;
  }
  #v(n) {
    this.#b(), this.#l = n, !(Xr || dn(this.options.enabled, this.#t) === !1 || !Xc(this.#l) || this.#l === 0) && (this.#u = Yr.setInterval(() => {
      (this.options.refetchIntervalInBackground || Cu.isFocused()) && this.#d();
    }, this.#l));
  }
  #y() {
    this.#g(), this.#v(this.#x());
  }
  #w() {
    this.#c && (Yr.clearTimeout(this.#c), this.#c = void 0);
  }
  #b() {
    this.#u && (Yr.clearInterval(this.#u), this.#u = void 0);
  }
  createResult(n, r) {
    const a = this.#t, i = this.options, c = this.#s, d = this.#r, p = this.#i, m = n !== a ? n.state : this.#n, { state: v } = n;
    let g = { ...v }, x = !1, w;
    if (r._optimisticResults) {
      const L = this.hasListeners(), re = !L && Op(n, r), I = L && zp(n, a, r, i);
      (re || I) && (g = {
        ...g,
        ...Vh(v.data, n.options)
      }), r._optimisticResults === "isRestoring" && (g.fetchStatus = "idle");
    }
    let { error: k, errorUpdatedAt: S, status: j } = g;
    w = g.data;
    let _ = !1;
    if (r.placeholderData !== void 0 && w === void 0 && j === "pending") {
      let L;
      c?.isPlaceholderData && r.placeholderData === p?.placeholderData ? (L = c.data, _ = !0) : L = typeof r.placeholderData == "function" ? r.placeholderData(
        this.#p?.state.data,
        this.#p
      ) : r.placeholderData, L !== void 0 && (j = "success", w = eu(
        c?.data,
        L,
        r
      ), x = !0);
    }
    if (r.select && w !== void 0 && !_)
      if (c && w === d?.data && r.select === this.#m)
        w = this.#f;
      else
        try {
          this.#m = r.select, w = r.select(w), w = eu(c?.data, w, r), this.#f = w, this.#o = null;
        } catch (L) {
          this.#o = L;
        }
    this.#o && (k = this.#o, w = this.#f, S = Date.now(), j = "error");
    const P = g.fetchStatus === "fetching", T = j === "pending", C = j === "error", $ = T && P, V = w !== void 0, H = {
      status: j,
      fetchStatus: g.fetchStatus,
      isPending: T,
      isSuccess: j === "success",
      isError: C,
      isInitialLoading: $,
      isLoading: $,
      data: w,
      dataUpdatedAt: g.dataUpdatedAt,
      error: k,
      errorUpdatedAt: S,
      failureCount: g.fetchFailureCount,
      failureReason: g.fetchFailureReason,
      errorUpdateCount: g.errorUpdateCount,
      isFetched: g.dataUpdateCount > 0 || g.errorUpdateCount > 0,
      isFetchedAfterMount: g.dataUpdateCount > m.dataUpdateCount || g.errorUpdateCount > m.errorUpdateCount,
      isFetching: P,
      isRefetching: P && !T,
      isLoadingError: C && !V,
      isPaused: g.fetchStatus === "paused",
      isPlaceholderData: x,
      isRefetchError: C && V,
      isStale: Pu(n, r),
      refetch: this.refetch,
      promise: this.#a,
      isEnabled: dn(r.enabled, n) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const L = H.data !== void 0, re = H.status === "error" && !L, I = (G) => {
        re ? G.reject(H.error) : L && G.resolve(H.data);
      }, K = () => {
        const G = this.#a = H.promise = tu();
        I(G);
      }, B = this.#a;
      switch (B.status) {
        case "pending":
          n.queryHash === a.queryHash && I(B);
          break;
        case "fulfilled":
          (re || H.data !== B.value) && K();
          break;
        case "rejected":
          (!re || H.error !== B.reason) && K();
          break;
      }
    }
    return H;
  }
  updateResult() {
    const n = this.#s, r = this.createResult(this.#t, this.options);
    if (this.#r = this.#t.state, this.#i = this.options, this.#r.data !== void 0 && (this.#p = this.#t), Zc(r, n))
      return;
    this.#s = r;
    const a = () => {
      if (!n)
        return !0;
      const { notifyOnChangeProps: i } = this.options, c = typeof i == "function" ? i() : i;
      if (c === "all" || !c && !this.#h.size)
        return !0;
      const d = new Set(
        c ?? this.#h
      );
      return this.options.throwOnError && d.add("error"), Object.keys(this.#s).some((p) => {
        const f = p;
        return this.#s[f] !== n[f] && d.has(f);
      });
    };
    this.#k({ listeners: a() });
  }
  #j() {
    const n = this.#e.getQueryCache().build(this.#e, this.options);
    if (n === this.#t)
      return;
    const r = this.#t;
    this.#t = n, this.#n = n.state, this.hasListeners() && (r?.removeObserver(this), n.addObserver(this));
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && this.#y();
  }
  #k(n) {
    Rt.batch(() => {
      n.listeners && this.listeners.forEach((r) => {
        r(this.#s);
      }), this.#e.getQueryCache().notify({
        query: this.#t,
        type: "observerResultsUpdated"
      });
    });
  }
};
function Uv(n, r) {
  return dn(r.enabled, n) !== !1 && n.state.data === void 0 && !(n.state.status === "error" && r.retryOnMount === !1);
}
function Op(n, r) {
  return Uv(n, r) || n.state.data !== void 0 && ru(n, r, r.refetchOnMount);
}
function ru(n, r, a) {
  if (dn(r.enabled, n) !== !1 && _r(r.staleTime, n) !== "static") {
    const i = typeof a == "function" ? a(n) : a;
    return i === "always" || i !== !1 && Pu(n, r);
  }
  return !1;
}
function zp(n, r, a, i) {
  return (n !== r || dn(i.enabled, n) === !1) && (!a.suspense || n.state.status !== "error") && Pu(n, a);
}
function Pu(n, r) {
  return dn(r.enabled, n) !== !1 && n.isStaleByTime(_r(r.staleTime, n));
}
function Hv(n, r) {
  return !Zc(n.getCurrentResult(), r);
}
function Bp(n) {
  return {
    onFetch: (r, a) => {
      const i = r.options, c = r.fetchOptions?.meta?.fetchMore?.direction, d = r.state.data?.pages || [], p = r.state.data?.pageParams || [];
      let f = { pages: [], pageParams: [] }, m = 0;
      const v = async () => {
        let g = !1;
        const x = (S) => {
          $v(
            S,
            () => r.signal,
            () => g = !0
          );
        }, w = zh(r.options, r.fetchOptions), k = async (S, j, _) => {
          if (g)
            return Promise.reject();
          if (j == null && S.pages.length)
            return Promise.resolve(S);
          const T = (() => {
            const Z = {
              client: r.client,
              queryKey: r.queryKey,
              pageParam: j,
              direction: _ ? "backward" : "forward",
              meta: r.options.meta
            };
            return x(Z), Z;
          })(), C = await w(T), { maxPages: $ } = r.options, V = _ ? Mv : Fv;
          return {
            pages: V(S.pages, C, $),
            pageParams: V(S.pageParams, j, $)
          };
        };
        if (c && d.length) {
          const S = c === "backward", j = S ? Vv : Wp, _ = {
            pages: d,
            pageParams: p
          }, P = j(i, _);
          f = await k(_, P, S);
        } else {
          const S = n ?? d.length;
          do {
            const j = m === 0 ? p[0] ?? i.initialPageParam : Wp(i, f);
            if (m > 0 && j == null)
              break;
            f = await k(f, j), m++;
          } while (m < S);
        }
        return f;
      };
      r.options.persister ? r.fetchFn = () => r.options.persister?.(
        v,
        {
          client: r.client,
          queryKey: r.queryKey,
          meta: r.options.meta,
          signal: r.signal
        },
        a
      ) : r.fetchFn = v;
    }
  };
}
function Wp(n, { pages: r, pageParams: a }) {
  const i = r.length - 1;
  return r.length > 0 ? n.getNextPageParam(
    r[i],
    r,
    a[i],
    a
  ) : void 0;
}
function Vv(n, { pages: r, pageParams: a }) {
  return r.length > 0 ? n.getPreviousPageParam?.(r[0], r, a[0], a) : void 0;
}
var Gv = class extends Hh {
  #e;
  #t;
  #n;
  #s;
  constructor(n) {
    super(), this.#e = n.client, this.mutationId = n.mutationId, this.#n = n.mutationCache, this.#t = [], this.state = n.state || Qv(), this.setOptions(n.options), this.scheduleGc();
  }
  setOptions(n) {
    this.options = n, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(n) {
    this.#t.includes(n) || (this.#t.push(n), this.clearGcTimeout(), this.#n.notify({
      type: "observerAdded",
      mutation: this,
      observer: n
    }));
  }
  removeObserver(n) {
    this.#t = this.#t.filter((r) => r !== n), this.scheduleGc(), this.#n.notify({
      type: "observerRemoved",
      mutation: this,
      observer: n
    });
  }
  optionalRemove() {
    this.#t.length || (this.state.status === "pending" ? this.scheduleGc() : this.#n.remove(this));
  }
  continue() {
    return this.#s?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(n) {
    const r = () => {
      this.#r({ type: "continue" });
    }, a = {
      client: this.#e,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    this.#s = Uh({
      fn: () => this.options.mutationFn ? this.options.mutationFn(n, a) : Promise.reject(new Error("No mutationFn found")),
      onFail: (d, p) => {
        this.#r({ type: "failed", failureCount: d, error: p });
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
    const i = this.state.status === "pending", c = !this.#s.canStart();
    try {
      if (i)
        r();
      else {
        this.#r({ type: "pending", variables: n, isPaused: c }), this.#n.config.onMutate && await this.#n.config.onMutate(
          n,
          this,
          a
        );
        const p = await this.options.onMutate?.(
          n,
          a
        );
        p !== this.state.context && this.#r({
          type: "pending",
          context: p,
          variables: n,
          isPaused: c
        });
      }
      const d = await this.#s.start();
      return await this.#n.config.onSuccess?.(
        d,
        n,
        this.state.context,
        this,
        a
      ), await this.options.onSuccess?.(
        d,
        n,
        this.state.context,
        a
      ), await this.#n.config.onSettled?.(
        d,
        null,
        this.state.variables,
        this.state.context,
        this,
        a
      ), await this.options.onSettled?.(
        d,
        null,
        n,
        this.state.context,
        a
      ), this.#r({ type: "success", data: d }), d;
    } catch (d) {
      try {
        await this.#n.config.onError?.(
          d,
          n,
          this.state.context,
          this,
          a
        );
      } catch (p) {
        Promise.reject(p);
      }
      try {
        await this.options.onError?.(
          d,
          n,
          this.state.context,
          a
        );
      } catch (p) {
        Promise.reject(p);
      }
      try {
        await this.#n.config.onSettled?.(
          void 0,
          d,
          this.state.variables,
          this.state.context,
          this,
          a
        );
      } catch (p) {
        Promise.reject(p);
      }
      try {
        await this.options.onSettled?.(
          void 0,
          d,
          n,
          this.state.context,
          a
        );
      } catch (p) {
        Promise.reject(p);
      }
      throw this.#r({ type: "error", error: d }), d;
    } finally {
      this.#n.runNext(this);
    }
  }
  #r(n) {
    const r = (a) => {
      switch (n.type) {
        case "failed":
          return {
            ...a,
            failureCount: n.failureCount,
            failureReason: n.error
          };
        case "pause":
          return {
            ...a,
            isPaused: !0
          };
        case "continue":
          return {
            ...a,
            isPaused: !1
          };
        case "pending":
          return {
            ...a,
            context: n.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: n.isPaused,
            status: "pending",
            variables: n.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...a,
            data: n.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1
          };
        case "error":
          return {
            ...a,
            data: void 0,
            error: n.error,
            failureCount: a.failureCount + 1,
            failureReason: n.error,
            isPaused: !1,
            status: "error"
          };
      }
    };
    this.state = r(this.state), Rt.batch(() => {
      this.#t.forEach((a) => {
        a.onMutationUpdate(n);
      }), this.#n.notify({
        mutation: this,
        type: "updated",
        action: n
      });
    });
  }
};
function Qv() {
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
var Kv = class extends Oo {
  constructor(n = {}) {
    super(), this.config = n, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
  }
  #e;
  #t;
  #n;
  build(n, r, a) {
    const i = new Gv({
      client: n,
      mutationCache: this,
      mutationId: ++this.#n,
      options: n.defaultMutationOptions(r),
      state: a
    });
    return this.add(i), i;
  }
  add(n) {
    this.#e.add(n);
    const r = oi(n);
    if (typeof r == "string") {
      const a = this.#t.get(r);
      a ? a.push(n) : this.#t.set(r, [n]);
    }
    this.notify({ type: "added", mutation: n });
  }
  remove(n) {
    if (this.#e.delete(n)) {
      const r = oi(n);
      if (typeof r == "string") {
        const a = this.#t.get(r);
        if (a)
          if (a.length > 1) {
            const i = a.indexOf(n);
            i !== -1 && a.splice(i, 1);
          } else a[0] === n && this.#t.delete(r);
      }
    }
    this.notify({ type: "removed", mutation: n });
  }
  canRun(n) {
    const r = oi(n);
    if (typeof r == "string") {
      const i = this.#t.get(r)?.find(
        (c) => c.state.status === "pending"
      );
      return !i || i === n;
    } else
      return !0;
  }
  runNext(n) {
    const r = oi(n);
    return typeof r == "string" ? this.#t.get(r)?.find((i) => i !== n && i.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve();
  }
  clear() {
    Rt.batch(() => {
      this.#e.forEach((n) => {
        this.notify({ type: "removed", mutation: n });
      }), this.#e.clear(), this.#t.clear();
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(n) {
    const r = { exact: !0, ...n };
    return this.getAll().find(
      (a) => Mp(r, a)
    );
  }
  findAll(n = {}) {
    return this.getAll().filter((r) => Mp(n, r));
  }
  notify(n) {
    Rt.batch(() => {
      this.listeners.forEach((r) => {
        r(n);
      });
    });
  }
  resumePausedMutations() {
    const n = this.getAll().filter((r) => r.state.isPaused);
    return Rt.batch(
      () => Promise.all(
        n.map((r) => r.continue().catch(Qt))
      )
    );
  }
};
function oi(n) {
  return n.options.scope?.id;
}
var Yv = class extends Oo {
  constructor(n = {}) {
    super(), this.config = n, this.#e = /* @__PURE__ */ new Map();
  }
  #e;
  build(n, r, a) {
    const i = r.queryKey, c = r.queryHash ?? Su(i, r);
    let d = this.get(c);
    return d || (d = new Bv({
      client: n,
      queryKey: i,
      queryHash: c,
      options: n.defaultQueryOptions(r),
      state: a,
      defaultOptions: n.getQueryDefaults(i)
    }), this.add(d)), d;
  }
  add(n) {
    this.#e.has(n.queryHash) || (this.#e.set(n.queryHash, n), this.notify({
      type: "added",
      query: n
    }));
  }
  remove(n) {
    const r = this.#e.get(n.queryHash);
    r && (n.destroy(), r === n && this.#e.delete(n.queryHash), this.notify({ type: "removed", query: n }));
  }
  clear() {
    Rt.batch(() => {
      this.getAll().forEach((n) => {
        this.remove(n);
      });
    });
  }
  get(n) {
    return this.#e.get(n);
  }
  getAll() {
    return [...this.#e.values()];
  }
  find(n) {
    const r = { exact: !0, ...n };
    return this.getAll().find(
      (a) => Fp(r, a)
    );
  }
  findAll(n = {}) {
    const r = this.getAll();
    return Object.keys(n).length > 0 ? r.filter((a) => Fp(n, a)) : r;
  }
  notify(n) {
    Rt.batch(() => {
      this.listeners.forEach((r) => {
        r(n);
      });
    });
  }
  onFocus() {
    Rt.batch(() => {
      this.getAll().forEach((n) => {
        n.onFocus();
      });
    });
  }
  onOnline() {
    Rt.batch(() => {
      this.getAll().forEach((n) => {
        n.onOnline();
      });
    });
  }
}, qv = class {
  #e;
  #t;
  #n;
  #s;
  #r;
  #i;
  #a;
  #o;
  constructor(n = {}) {
    this.#e = n.queryCache || new Yv(), this.#t = n.mutationCache || new Kv(), this.#n = n.defaultOptions || {}, this.#s = /* @__PURE__ */ new Map(), this.#r = /* @__PURE__ */ new Map(), this.#i = 0;
  }
  mount() {
    this.#i++, this.#i === 1 && (this.#a = Cu.subscribe(async (n) => {
      n && (await this.resumePausedMutations(), this.#e.onFocus());
    }), this.#o = bi.subscribe(async (n) => {
      n && (await this.resumePausedMutations(), this.#e.onOnline());
    }));
  }
  unmount() {
    this.#i--, this.#i === 0 && (this.#a?.(), this.#a = void 0, this.#o?.(), this.#o = void 0);
  }
  isFetching(n) {
    return this.#e.findAll({ ...n, fetchStatus: "fetching" }).length;
  }
  isMutating(n) {
    return this.#t.findAll({ ...n, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(n) {
    const r = this.defaultQueryOptions({ queryKey: n });
    return this.#e.get(r.queryHash)?.state.data;
  }
  ensureQueryData(n) {
    const r = this.defaultQueryOptions(n), a = this.#e.build(this, r), i = a.state.data;
    return i === void 0 ? this.fetchQuery(n) : (n.revalidateIfStale && a.isStaleByTime(_r(r.staleTime, a)) && this.prefetchQuery(r), Promise.resolve(i));
  }
  getQueriesData(n) {
    return this.#e.findAll(n).map(({ queryKey: r, state: a }) => {
      const i = a.data;
      return [r, i];
    });
  }
  setQueryData(n, r, a) {
    const i = this.defaultQueryOptions({ queryKey: n }), d = this.#e.get(
      i.queryHash
    )?.state.data, p = Tv(r, d);
    if (p !== void 0)
      return this.#e.build(this, i).setData(p, { ...a, manual: !0 });
  }
  setQueriesData(n, r, a) {
    return Rt.batch(
      () => this.#e.findAll(n).map(({ queryKey: i }) => [
        i,
        this.setQueryData(i, r, a)
      ])
    );
  }
  getQueryState(n) {
    const r = this.defaultQueryOptions({ queryKey: n });
    return this.#e.get(
      r.queryHash
    )?.state;
  }
  removeQueries(n) {
    const r = this.#e;
    Rt.batch(() => {
      r.findAll(n).forEach((a) => {
        r.remove(a);
      });
    });
  }
  resetQueries(n, r) {
    const a = this.#e;
    return Rt.batch(() => (a.findAll(n).forEach((i) => {
      i.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...n
      },
      r
    )));
  }
  cancelQueries(n, r = {}) {
    const a = { revert: !0, ...r }, i = Rt.batch(
      () => this.#e.findAll(n).map((c) => c.cancel(a))
    );
    return Promise.all(i).then(Qt).catch(Qt);
  }
  invalidateQueries(n, r = {}) {
    return Rt.batch(() => (this.#e.findAll(n).forEach((a) => {
      a.invalidate();
    }), n?.refetchType === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...n,
        type: n?.refetchType ?? n?.type ?? "active"
      },
      r
    )));
  }
  refetchQueries(n, r = {}) {
    const a = {
      ...r,
      cancelRefetch: r.cancelRefetch ?? !0
    }, i = Rt.batch(
      () => this.#e.findAll(n).filter((c) => !c.isDisabled() && !c.isStatic()).map((c) => {
        let d = c.fetch(void 0, a);
        return a.throwOnError || (d = d.catch(Qt)), c.state.fetchStatus === "paused" ? Promise.resolve() : d;
      })
    );
    return Promise.all(i).then(Qt);
  }
  fetchQuery(n) {
    const r = this.defaultQueryOptions(n);
    r.retry === void 0 && (r.retry = !1);
    const a = this.#e.build(this, r);
    return a.isStaleByTime(
      _r(r.staleTime, a)
    ) ? a.fetch(r) : Promise.resolve(a.state.data);
  }
  prefetchQuery(n) {
    return this.fetchQuery(n).then(Qt).catch(Qt);
  }
  fetchInfiniteQuery(n) {
    return n.behavior = Bp(n.pages), this.fetchQuery(n);
  }
  prefetchInfiniteQuery(n) {
    return this.fetchInfiniteQuery(n).then(Qt).catch(Qt);
  }
  ensureInfiniteQueryData(n) {
    return n.behavior = Bp(n.pages), this.ensureQueryData(n);
  }
  resumePausedMutations() {
    return bi.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
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
  setDefaultOptions(n) {
    this.#n = n;
  }
  setQueryDefaults(n, r) {
    this.#s.set(Ao(n), {
      queryKey: n,
      defaultOptions: r
    });
  }
  getQueryDefaults(n) {
    const r = [...this.#s.values()], a = {};
    return r.forEach((i) => {
      Fo(n, i.queryKey) && Object.assign(a, i.defaultOptions);
    }), a;
  }
  setMutationDefaults(n, r) {
    this.#r.set(Ao(n), {
      mutationKey: n,
      defaultOptions: r
    });
  }
  getMutationDefaults(n) {
    const r = [...this.#r.values()], a = {};
    return r.forEach((i) => {
      Fo(n, i.mutationKey) && Object.assign(a, i.defaultOptions);
    }), a;
  }
  defaultQueryOptions(n) {
    if (n._defaulted)
      return n;
    const r = {
      ...this.#n.queries,
      ...this.getQueryDefaults(n.queryKey),
      ...n,
      _defaulted: !0
    };
    return r.queryHash || (r.queryHash = Su(
      r.queryKey,
      r
    )), r.refetchOnReconnect === void 0 && (r.refetchOnReconnect = r.networkMode !== "always"), r.throwOnError === void 0 && (r.throwOnError = !!r.suspense), !r.networkMode && r.persister && (r.networkMode = "offlineFirst"), r.queryFn === Nu && (r.enabled = !1), r;
  }
  defaultMutationOptions(n) {
    return n?._defaulted ? n : {
      ...this.#n.mutations,
      ...n?.mutationKey && this.getMutationDefaults(n.mutationKey),
      ...n,
      _defaulted: !0
    };
  }
  clear() {
    this.#e.clear(), this.#t.clear();
  }
}, y = Ti();
const yr = /* @__PURE__ */ Lh(y), Ri = /* @__PURE__ */ vv({
  __proto__: null,
  default: yr
}, [y]);
var Gh = y.createContext(
  void 0
), Xv = (n) => {
  const r = y.useContext(Gh);
  if (!r)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return r;
}, Zv = ({
  client: n,
  children: r
}) => (y.useEffect(() => (n.mount(), () => {
  n.unmount();
}), [n]), /* @__PURE__ */ s.jsx(Gh.Provider, { value: n, children: r })), Qh = y.createContext(!1), Jv = () => y.useContext(Qh);
Qh.Provider;
function ey() {
  let n = !1;
  return {
    clearReset: () => {
      n = !1;
    },
    reset: () => {
      n = !0;
    },
    isReset: () => n
  };
}
var ty = y.createContext(ey()), ny = () => y.useContext(ty), ry = (n, r, a) => {
  const i = a?.state.error && typeof n.throwOnError == "function" ? Bh(n.throwOnError, [a.state.error, a]) : n.throwOnError;
  (n.suspense || n.experimental_prefetchInRender || i) && (r.isReset() || (n.retryOnMount = !1));
}, sy = (n) => {
  y.useEffect(() => {
    n.clearReset();
  }, [n]);
}, oy = ({
  result: n,
  errorResetBoundary: r,
  throwOnError: a,
  query: i,
  suspense: c
}) => n.isError && !r.isReset() && !n.isFetching && i && (c && n.data === void 0 || Bh(a, [n.error, i])), ay = (n) => {
  if (n.suspense) {
    const a = (c) => c === "static" ? c : Math.max(c ?? 1e3, 1e3), i = n.staleTime;
    n.staleTime = typeof i == "function" ? (...c) => a(i(...c)) : a(i), typeof n.gcTime == "number" && (n.gcTime = Math.max(
      n.gcTime,
      1e3
    ));
  }
}, iy = (n, r) => n.isLoading && n.isFetching && !r, ly = (n, r) => n?.suspense && r.isPending, Up = (n, r, a) => r.fetchOptimistic(n).catch(() => {
  a.clearReset();
});
function cy(n, r, a) {
  const i = Jv(), c = ny(), d = Xv(), p = d.defaultQueryOptions(n);
  d.getDefaultOptions().queries?._experimental_beforeQuery?.(
    p
  );
  const f = d.getQueryCache().get(p.queryHash);
  p._optimisticResults = i ? "isRestoring" : "optimistic", ay(p), ry(p, c, f), sy(c);
  const m = !d.getQueryCache().get(p.queryHash), [v] = y.useState(
    () => new r(
      d,
      p
    )
  ), g = v.getOptimisticResult(p), x = !i && n.subscribed !== !1;
  if (y.useSyncExternalStore(
    y.useCallback(
      (w) => {
        const k = x ? v.subscribe(Rt.batchCalls(w)) : Qt;
        return v.updateResult(), k;
      },
      [v, x]
    ),
    () => v.getCurrentResult(),
    () => v.getCurrentResult()
  ), y.useEffect(() => {
    v.setOptions(p);
  }, [p, v]), ly(p, g))
    throw Up(p, v, c);
  if (oy({
    result: g,
    errorResetBoundary: c,
    throwOnError: p.throwOnError,
    query: f,
    suspense: p.suspense
  }))
    throw g.error;
  return d.getDefaultOptions().queries?._experimental_afterQuery?.(
    p,
    g
  ), p.experimental_prefetchInRender && !Xr && iy(g, i) && (m ? (
    // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
    Up(p, v, c)
  ) : (
    // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
    f?.promise
  ))?.catch(Qt).finally(() => {
    v.updateResult();
  }), p.notifyOnChangeProps ? g : v.trackResult(g);
}
function Zr(n, r) {
  return cy(n, Wv);
}
function uy(n, r) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var a, i, c, d, p = [], f = "", m = n.split("/");
  for (m[0] || m.shift(); c = m.shift(); )
    a = c[0], a === "*" ? (p.push(a), f += c[1] === "?" ? "(?:/(.*))?" : "/(.*)") : a === ":" ? (i = c.indexOf("?", 1), d = c.indexOf(".", 1), p.push(c.substring(1, ~i ? i : ~d ? d : c.length)), f += ~i && !~d ? "(?:/([^/]+?))?" : "/([^/]+?)", ~d && (f += (~i ? "?" : "") + "\\" + c.substring(d))) : f += "/" + c;
  return {
    keys: p,
    pattern: new RegExp("^" + f + (r ? "(?=$|/)" : "/?$"), "i")
  };
}
var $c = { exports: {} }, Lc = {};
var Hp;
function dy() {
  if (Hp) return Lc;
  Hp = 1;
  var n = Ti();
  function r(x, w) {
    return x === w && (x !== 0 || 1 / x === 1 / w) || x !== x && w !== w;
  }
  var a = typeof Object.is == "function" ? Object.is : r, i = n.useState, c = n.useEffect, d = n.useLayoutEffect, p = n.useDebugValue;
  function f(x, w) {
    var k = w(), S = i({ inst: { value: k, getSnapshot: w } }), j = S[0].inst, _ = S[1];
    return d(
      function() {
        j.value = k, j.getSnapshot = w, m(j) && _({ inst: j });
      },
      [x, k, w]
    ), c(
      function() {
        return m(j) && _({ inst: j }), x(function() {
          m(j) && _({ inst: j });
        });
      },
      [x]
    ), p(k), k;
  }
  function m(x) {
    var w = x.getSnapshot;
    x = x.value;
    try {
      var k = w();
      return !a(x, k);
    } catch {
      return !0;
    }
  }
  function v(x, w) {
    return w();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? v : f;
  return Lc.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : g, Lc;
}
var Vp;
function fy() {
  return Vp || (Vp = 1, $c.exports = dy()), $c.exports;
}
var py = fy();
const hy = Ri.useInsertionEffect, my = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", gy = my ? y.useLayoutEffect : y.useEffect, xy = hy || gy, Kh = (n) => {
  const r = y.useRef([n, (...a) => r[0](...a)]).current;
  return xy(() => {
    r[0] = n;
  }), r[1];
}, vy = "popstate", Eu = "pushState", Tu = "replaceState", yy = "hashchange", Gp = [
  vy,
  Eu,
  Tu,
  yy
], wy = (n) => {
  for (const r of Gp)
    addEventListener(r, n);
  return () => {
    for (const r of Gp)
      removeEventListener(r, n);
  };
}, Yh = (n, r) => py.useSyncExternalStore(wy, n, r), Qp = () => location.search, by = ({ ssrSearch: n } = {}) => Yh(
  Qp,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  n != null ? () => n : Qp
), Kp = () => location.pathname, jy = ({ ssrPath: n } = {}) => Yh(
  Kp,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  n != null ? () => n : Kp
), ky = (n, { replace: r = !1, state: a = null } = {}) => history[r ? Tu : Eu](a, "", n), _y = (n = {}) => [jy(n), ky], Yp = /* @__PURE__ */ Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Yp] > "u") {
  for (const n of [Eu, Tu]) {
    const r = history[n];
    history[n] = function() {
      const a = r.apply(this, arguments), i = new Event(n);
      return i.arguments = arguments, dispatchEvent(i), a;
    };
  }
  Object.defineProperty(window, Yp, { value: !0 });
}
const Sy = (n, r) => r.toLowerCase().indexOf(n.toLowerCase()) ? "~" + r : r.slice(n.length) || "/", qh = (n = "") => n === "/" ? "" : n, Ny = (n, r) => n[0] === "~" ? n.slice(1) : qh(r) + n, Cy = (n = "", r) => Sy(qp(qh(n)), qp(r)), qp = (n) => {
  try {
    return decodeURI(n);
  } catch {
    return n;
  }
}, Xh = {
  hook: _y,
  searchHook: by,
  parser: uy,
  base: "",
  // this option is used to override the current location during SSR
  ssrPath: void 0,
  ssrSearch: void 0,
  // optional context to track render state during SSR
  ssrContext: void 0,
  // customizes how `href` props are transformed for <Link />
  hrefs: (n) => n,
  // wraps navigate calls, useful for view transitions
  aroundNav: (n, r, a) => n(r, a)
}, Zh = y.createContext(Xh), zo = () => y.useContext(Zh), Jh = {}, em = y.createContext(Jh), tm = () => y.useContext(em), Ai = (n) => {
  const [r, a] = n.hook(n);
  return [
    Cy(n.base, r),
    Kh(
      (i, c) => n.aroundNav(a, Ny(i, n.base), c)
    )
  ];
}, nm = () => Ai(zo()), rm = (n, r, a, i) => {
  const { pattern: c, keys: d } = r instanceof RegExp ? { keys: !1, pattern: r } : n(r || "*", i), p = c.exec(a) || [], [f, ...m] = p;
  return f !== void 0 ? [
    !0,
    (() => {
      const v = d !== !1 ? Object.fromEntries(d.map((x, w) => [x, m[w]])) : p.groups;
      let g = { ...m };
      return v && Object.assign(g, v), g;
    })(),
    // the third value if only present when parser is in "loose" mode,
    // so that we can extract the base path for nested routes
    ...i ? [f] : []
  ] : [!1, null];
}, sm = ({ children: n, ...r }) => {
  const a = zo(), i = r.hook ? Xh : a;
  let c = i;
  const [d, p = r.ssrSearch ?? ""] = r.ssrPath?.split("?") ?? [];
  d && (r.ssrSearch = p, r.ssrPath = d), r.hrefs = r.hrefs ?? r.hook?.hrefs, r.searchHook = r.searchHook ?? r.hook?.searchHook;
  let f = y.useRef({}), m = f.current, v = m;
  for (let g in i) {
    const x = g === "base" ? (
      /* base is special case, it is appended to the parent's base */
      i[g] + (r[g] ?? "")
    ) : r[g] ?? i[g];
    m === v && x !== v[g] && (f.current = v = { ...v }), v[g] = x, (x !== i[g] || x !== c[g]) && (c = v);
  }
  return y.createElement(Zh.Provider, { value: c, children: n });
}, Xp = ({ children: n, component: r }, a) => r ? y.createElement(r, { params: a }) : typeof n == "function" ? n(a) : n, Py = (n) => {
  let r = y.useRef(Jh);
  const a = r.current;
  return r.current = // Update cache if number of params changed or any value changed
  Object.keys(n).length !== Object.keys(a).length || Object.entries(n).some(([i, c]) => c !== a[i]) ? n : a;
}, ai = ({ path: n, nest: r, match: a, ...i }) => {
  const c = zo(), [d] = Ai(c), [p, f, m] = (
    // `match` is a special prop to give up control to the parent,
    // it is used by the `Switch` to avoid double matching
    a ?? rm(c.parser, n, d, r)
  ), v = Py({ ...tm(), ...f });
  if (!p) return null;
  const g = m ? y.createElement(sm, { base: m }, Xp(i, v)) : Xp(i, v);
  return y.createElement(em.Provider, { value: v, children: g });
}, qr = y.forwardRef((n, r) => {
  const a = zo(), [i, c] = Ai(a), {
    to: d = "",
    href: p = d,
    onClick: f,
    asChild: m,
    children: v,
    className: g,
    /* eslint-disable no-unused-vars */
    replace: x,
    state: w,
    transition: k,
    /* eslint-enable no-unused-vars */
    ...S
  } = n, j = Kh((P) => {
    P.ctrlKey || P.metaKey || P.altKey || P.shiftKey || P.button !== 0 || (f?.(P), P.defaultPrevented || (P.preventDefault(), c(p, n)));
  }), _ = a.hrefs(
    p[0] === "~" ? p.slice(1) : a.base + p,
    a
    // pass router as a second argument for convinience
  );
  return m && y.isValidElement(v) ? y.cloneElement(v, { onClick: j, href: _ }) : y.createElement("a", {
    ...S,
    onClick: j,
    href: _,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(i === p) : g,
    children: v,
    ref: r
  });
}), om = (n) => Array.isArray(n) ? n.flatMap(
  (r) => om(r && r.type === y.Fragment ? r.props.children : r)
) : [n], Ey = ({ children: n, location: r }) => {
  const a = zo(), [i] = Ai(a);
  for (const c of om(n)) {
    let d = 0;
    if (y.isValidElement(c) && // we don't require an element to be of type Route,
    // but we do require it to contain a truthy `path` prop.
    // this allows to use different components that wrap Route
    // inside of a switch, for example <AnimatedRoute />.
    (d = rm(
      a.parser,
      c.props.path,
      r || i,
      c.props.nest
    ))[0])
      return y.cloneElement(c, { match: d });
  }
  return null;
};
function Ue(n, r, { checkForDefaultPrevented: a = !0 } = {}) {
  return function(c) {
    if (n?.(c), a === !1 || !c.defaultPrevented)
      return r?.(c);
  };
}
function Zp(n, r) {
  if (typeof n == "function")
    return n(r);
  n != null && (n.current = r);
}
function Bo(...n) {
  return (r) => {
    let a = !1;
    const i = n.map((c) => {
      const d = Zp(c, r);
      return !a && typeof d == "function" && (a = !0), d;
    });
    if (a)
      return () => {
        for (let c = 0; c < i.length; c++) {
          const d = i[c];
          typeof d == "function" ? d() : Zp(n[c], null);
        }
      };
  };
}
function yt(...n) {
  return y.useCallback(Bo(...n), n);
}
function Ls(n, r = []) {
  let a = [];
  function i(d, p) {
    const f = y.createContext(p), m = a.length;
    a = [...a, p];
    const v = (x) => {
      const { scope: w, children: k, ...S } = x, j = w?.[n]?.[m] || f, _ = y.useMemo(() => S, Object.values(S));
      return /* @__PURE__ */ s.jsx(j.Provider, { value: _, children: k });
    };
    v.displayName = d + "Provider";
    function g(x, w) {
      const k = w?.[n]?.[m] || f, S = y.useContext(k);
      if (S) return S;
      if (p !== void 0) return p;
      throw new Error(`\`${x}\` must be used within \`${d}\``);
    }
    return [v, g];
  }
  const c = () => {
    const d = a.map((p) => y.createContext(p));
    return function(f) {
      const m = f?.[n] || d;
      return y.useMemo(
        () => ({ [`__scope${n}`]: { ...f, [n]: m } }),
        [f, m]
      );
    };
  };
  return c.scopeName = n, [i, Ty(c, ...r)];
}
function Ty(...n) {
  const r = n[0];
  if (n.length === 1) return r;
  const a = () => {
    const i = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return function(d) {
      const p = i.reduce((f, { useScope: m, scopeName: v }) => {
        const x = m(d)[`__scope${v}`];
        return { ...f, ...x };
      }, {});
      return y.useMemo(() => ({ [`__scope${r.scopeName}`]: p }), [p]);
    };
  };
  return a.scopeName = r.scopeName, a;
}
var Wo = Dh();
const Ry = /* @__PURE__ */ Lh(Wo);
// @__NO_SIDE_EFFECTS__
function Ay(n) {
  const r = /* @__PURE__ */ Fy(n), a = y.forwardRef((i, c) => {
    const { children: d, ...p } = i, f = y.Children.toArray(d), m = f.find($y);
    if (m) {
      const v = m.props.children, g = f.map((x) => x === m ? y.Children.count(v) > 1 ? y.Children.only(null) : y.isValidElement(v) ? v.props.children : null : x);
      return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: y.isValidElement(v) ? y.cloneElement(v, void 0, g) : null });
    }
    return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: d });
  });
  return a.displayName = `${n}.Slot`, a;
}
// @__NO_SIDE_EFFECTS__
function Fy(n) {
  const r = y.forwardRef((a, i) => {
    const { children: c, ...d } = a;
    if (y.isValidElement(c)) {
      const p = Dy(c), f = Ly(d, c.props);
      return c.type !== y.Fragment && (f.ref = i ? Bo(i, p) : p), y.cloneElement(c, f);
    }
    return y.Children.count(c) > 1 ? y.Children.only(null) : null;
  });
  return r.displayName = `${n}.SlotClone`, r;
}
var My = /* @__PURE__ */ Symbol("radix.slottable");
function $y(n) {
  return y.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === My;
}
function Ly(n, r) {
  const a = { ...r };
  for (const i in r) {
    const c = n[i], d = r[i];
    /^on[A-Z]/.test(i) ? c && d ? a[i] = (...f) => {
      const m = d(...f);
      return c(...f), m;
    } : c && (a[i] = c) : i === "style" ? a[i] = { ...c, ...d } : i === "className" && (a[i] = [c, d].filter(Boolean).join(" "));
  }
  return { ...n, ...a };
}
function Dy(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning;
  return a ? n.ref : (r = Object.getOwnPropertyDescriptor(n, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning, a ? n.props.ref : n.props.ref || n.ref);
}
var Iy = [
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
], et = Iy.reduce((n, r) => {
  const a = /* @__PURE__ */ Ay(`Primitive.${r}`), i = y.forwardRef((c, d) => {
    const { asChild: p, ...f } = c, m = p ? a : r;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ s.jsx(m, { ...f, ref: d });
  });
  return i.displayName = `Primitive.${r}`, { ...n, [r]: i };
}, {});
function Oy(n, r) {
  n && Wo.flushSync(() => n.dispatchEvent(r));
}
function Sr(n) {
  const r = y.useRef(n);
  return y.useEffect(() => {
    r.current = n;
  }), y.useMemo(() => (...a) => r.current?.(...a), []);
}
function zy(n, r = globalThis?.document) {
  const a = Sr(n);
  y.useEffect(() => {
    const i = (c) => {
      c.key === "Escape" && a(c);
    };
    return r.addEventListener("keydown", i, { capture: !0 }), () => r.removeEventListener("keydown", i, { capture: !0 });
  }, [a, r]);
}
var By = "DismissableLayer", su = "dismissableLayer.update", Wy = "dismissableLayer.pointerDownOutside", Uy = "dismissableLayer.focusOutside", Jp, am = y.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ru = y.forwardRef(
  (n, r) => {
    const {
      disableOutsidePointerEvents: a = !1,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: d,
      onInteractOutside: p,
      onDismiss: f,
      ...m
    } = n, v = y.useContext(am), [g, x] = y.useState(null), w = g?.ownerDocument ?? globalThis?.document, [, k] = y.useState({}), S = yt(r, (H) => x(H)), j = Array.from(v.layers), [_] = [...v.layersWithOutsidePointerEventsDisabled].slice(-1), P = j.indexOf(_), T = g ? j.indexOf(g) : -1, C = v.layersWithOutsidePointerEventsDisabled.size > 0, $ = T >= P, V = Gy((H) => {
      const L = H.target, re = [...v.branches].some((I) => I.contains(L));
      !$ || re || (c?.(H), p?.(H), H.defaultPrevented || f?.());
    }, w), Z = Qy((H) => {
      const L = H.target;
      [...v.branches].some((I) => I.contains(L)) || (d?.(H), p?.(H), H.defaultPrevented || f?.());
    }, w);
    return zy((H) => {
      T === v.layers.size - 1 && (i?.(H), !H.defaultPrevented && f && (H.preventDefault(), f()));
    }, w), y.useEffect(() => {
      if (g)
        return a && (v.layersWithOutsidePointerEventsDisabled.size === 0 && (Jp = w.body.style.pointerEvents, w.body.style.pointerEvents = "none"), v.layersWithOutsidePointerEventsDisabled.add(g)), v.layers.add(g), eh(), () => {
          a && v.layersWithOutsidePointerEventsDisabled.size === 1 && (w.body.style.pointerEvents = Jp);
        };
    }, [g, w, a, v]), y.useEffect(() => () => {
      g && (v.layers.delete(g), v.layersWithOutsidePointerEventsDisabled.delete(g), eh());
    }, [g, v]), y.useEffect(() => {
      const H = () => k({});
      return document.addEventListener(su, H), () => document.removeEventListener(su, H);
    }, []), /* @__PURE__ */ s.jsx(
      et.div,
      {
        ...m,
        ref: S,
        style: {
          pointerEvents: C ? $ ? "auto" : "none" : void 0,
          ...n.style
        },
        onFocusCapture: Ue(n.onFocusCapture, Z.onFocusCapture),
        onBlurCapture: Ue(n.onBlurCapture, Z.onBlurCapture),
        onPointerDownCapture: Ue(
          n.onPointerDownCapture,
          V.onPointerDownCapture
        )
      }
    );
  }
);
Ru.displayName = By;
var Hy = "DismissableLayerBranch", Vy = y.forwardRef((n, r) => {
  const a = y.useContext(am), i = y.useRef(null), c = yt(r, i);
  return y.useEffect(() => {
    const d = i.current;
    if (d)
      return a.branches.add(d), () => {
        a.branches.delete(d);
      };
  }, [a.branches]), /* @__PURE__ */ s.jsx(et.div, { ...n, ref: c });
});
Vy.displayName = Hy;
function Gy(n, r = globalThis?.document) {
  const a = Sr(n), i = y.useRef(!1), c = y.useRef(() => {
  });
  return y.useEffect(() => {
    const d = (f) => {
      if (f.target && !i.current) {
        let m = function() {
          im(
            Wy,
            a,
            v,
            { discrete: !0 }
          );
        };
        const v = { originalEvent: f };
        f.pointerType === "touch" ? (r.removeEventListener("click", c.current), c.current = m, r.addEventListener("click", c.current, { once: !0 })) : m();
      } else
        r.removeEventListener("click", c.current);
      i.current = !1;
    }, p = window.setTimeout(() => {
      r.addEventListener("pointerdown", d);
    }, 0);
    return () => {
      window.clearTimeout(p), r.removeEventListener("pointerdown", d), r.removeEventListener("click", c.current);
    };
  }, [r, a]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => i.current = !0
  };
}
function Qy(n, r = globalThis?.document) {
  const a = Sr(n), i = y.useRef(!1);
  return y.useEffect(() => {
    const c = (d) => {
      d.target && !i.current && im(Uy, a, { originalEvent: d }, {
        discrete: !1
      });
    };
    return r.addEventListener("focusin", c), () => r.removeEventListener("focusin", c);
  }, [r, a]), {
    onFocusCapture: () => i.current = !0,
    onBlurCapture: () => i.current = !1
  };
}
function eh() {
  const n = new CustomEvent(su);
  document.dispatchEvent(n);
}
function im(n, r, a, { discrete: i }) {
  const c = a.originalEvent.target, d = new CustomEvent(n, { bubbles: !1, cancelable: !0, detail: a });
  r && c.addEventListener(n, r, { once: !0 }), i ? Oy(c, d) : c.dispatchEvent(d);
}
var It = globalThis?.document ? y.useLayoutEffect : () => {
}, Ky = Ri[" useId ".trim().toString()] || (() => {
}), Yy = 0;
function Ds(n) {
  const [r, a] = y.useState(Ky());
  return It(() => {
    a((i) => i ?? String(Yy++));
  }, [n]), r ? `radix-${r}` : "";
}
const qy = ["top", "right", "bottom", "left"], Nr = Math.min, Jt = Math.max, ji = Math.round, ii = Math.floor, Rn = (n) => ({
  x: n,
  y: n
}), Xy = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ou(n, r, a) {
  return Jt(n, Nr(r, a));
}
function Hn(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function Vn(n) {
  return n.split("-")[0];
}
function Is(n) {
  return n.split("-")[1];
}
function Au(n) {
  return n === "x" ? "y" : "x";
}
function Fu(n) {
  return n === "y" ? "height" : "width";
}
function Tn(n) {
  const r = n[0];
  return r === "t" || r === "b" ? "y" : "x";
}
function Mu(n) {
  return Au(Tn(n));
}
function Zy(n, r, a) {
  a === void 0 && (a = !1);
  const i = Is(n), c = Mu(n), d = Fu(c);
  let p = c === "x" ? i === (a ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return r.reference[d] > r.floating[d] && (p = ki(p)), [p, ki(p)];
}
function Jy(n) {
  const r = ki(n);
  return [au(n), r, au(r)];
}
function au(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const th = ["left", "right"], nh = ["right", "left"], e1 = ["top", "bottom"], t1 = ["bottom", "top"];
function n1(n, r, a) {
  switch (n) {
    case "top":
    case "bottom":
      return a ? r ? nh : th : r ? th : nh;
    case "left":
    case "right":
      return r ? e1 : t1;
    default:
      return [];
  }
}
function r1(n, r, a, i) {
  const c = Is(n);
  let d = n1(Vn(n), a === "start", i);
  return c && (d = d.map((p) => p + "-" + c), r && (d = d.concat(d.map(au)))), d;
}
function ki(n) {
  const r = Vn(n);
  return Xy[r] + n.slice(r.length);
}
function s1(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function lm(n) {
  return typeof n != "number" ? s1(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function _i(n) {
  const {
    x: r,
    y: a,
    width: i,
    height: c
  } = n;
  return {
    width: i,
    height: c,
    top: a,
    left: r,
    right: r + i,
    bottom: a + c,
    x: r,
    y: a
  };
}
function rh(n, r, a) {
  let {
    reference: i,
    floating: c
  } = n;
  const d = Tn(r), p = Mu(r), f = Fu(p), m = Vn(r), v = d === "y", g = i.x + i.width / 2 - c.width / 2, x = i.y + i.height / 2 - c.height / 2, w = i[f] / 2 - c[f] / 2;
  let k;
  switch (m) {
    case "top":
      k = {
        x: g,
        y: i.y - c.height
      };
      break;
    case "bottom":
      k = {
        x: g,
        y: i.y + i.height
      };
      break;
    case "right":
      k = {
        x: i.x + i.width,
        y: x
      };
      break;
    case "left":
      k = {
        x: i.x - c.width,
        y: x
      };
      break;
    default:
      k = {
        x: i.x,
        y: i.y
      };
  }
  switch (Is(r)) {
    case "start":
      k[p] -= w * (a && v ? -1 : 1);
      break;
    case "end":
      k[p] += w * (a && v ? -1 : 1);
      break;
  }
  return k;
}
async function o1(n, r) {
  var a;
  r === void 0 && (r = {});
  const {
    x: i,
    y: c,
    platform: d,
    rects: p,
    elements: f,
    strategy: m
  } = n, {
    boundary: v = "clippingAncestors",
    rootBoundary: g = "viewport",
    elementContext: x = "floating",
    altBoundary: w = !1,
    padding: k = 0
  } = Hn(r, n), S = lm(k), _ = f[w ? x === "floating" ? "reference" : "floating" : x], P = _i(await d.getClippingRect({
    element: (a = await (d.isElement == null ? void 0 : d.isElement(_))) == null || a ? _ : _.contextElement || await (d.getDocumentElement == null ? void 0 : d.getDocumentElement(f.floating)),
    boundary: v,
    rootBoundary: g,
    strategy: m
  })), T = x === "floating" ? {
    x: i,
    y: c,
    width: p.floating.width,
    height: p.floating.height
  } : p.reference, C = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(f.floating)), $ = await (d.isElement == null ? void 0 : d.isElement(C)) ? await (d.getScale == null ? void 0 : d.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, V = _i(d.convertOffsetParentRelativeRectToViewportRelativeRect ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: f,
    rect: T,
    offsetParent: C,
    strategy: m
  }) : T);
  return {
    top: (P.top - V.top + S.top) / $.y,
    bottom: (V.bottom - P.bottom + S.bottom) / $.y,
    left: (P.left - V.left + S.left) / $.x,
    right: (V.right - P.right + S.right) / $.x
  };
}
const a1 = 50, i1 = async (n, r, a) => {
  const {
    placement: i = "bottom",
    strategy: c = "absolute",
    middleware: d = [],
    platform: p
  } = a, f = p.detectOverflow ? p : {
    ...p,
    detectOverflow: o1
  }, m = await (p.isRTL == null ? void 0 : p.isRTL(r));
  let v = await p.getElementRects({
    reference: n,
    floating: r,
    strategy: c
  }), {
    x: g,
    y: x
  } = rh(v, i, m), w = i, k = 0;
  const S = {};
  for (let j = 0; j < d.length; j++) {
    const _ = d[j];
    if (!_)
      continue;
    const {
      name: P,
      fn: T
    } = _, {
      x: C,
      y: $,
      data: V,
      reset: Z
    } = await T({
      x: g,
      y: x,
      initialPlacement: i,
      placement: w,
      strategy: c,
      middlewareData: S,
      rects: v,
      platform: f,
      elements: {
        reference: n,
        floating: r
      }
    });
    g = C ?? g, x = $ ?? x, S[P] = {
      ...S[P],
      ...V
    }, Z && k < a1 && (k++, typeof Z == "object" && (Z.placement && (w = Z.placement), Z.rects && (v = Z.rects === !0 ? await p.getElementRects({
      reference: n,
      floating: r,
      strategy: c
    }) : Z.rects), {
      x: g,
      y: x
    } = rh(v, w, m)), j = -1);
  }
  return {
    x: g,
    y: x,
    placement: w,
    strategy: c,
    middlewareData: S
  };
}, l1 = (n) => ({
  name: "arrow",
  options: n,
  async fn(r) {
    const {
      x: a,
      y: i,
      placement: c,
      rects: d,
      platform: p,
      elements: f,
      middlewareData: m
    } = r, {
      element: v,
      padding: g = 0
    } = Hn(n, r) || {};
    if (v == null)
      return {};
    const x = lm(g), w = {
      x: a,
      y: i
    }, k = Mu(c), S = Fu(k), j = await p.getDimensions(v), _ = k === "y", P = _ ? "top" : "left", T = _ ? "bottom" : "right", C = _ ? "clientHeight" : "clientWidth", $ = d.reference[S] + d.reference[k] - w[k] - d.floating[S], V = w[k] - d.reference[k], Z = await (p.getOffsetParent == null ? void 0 : p.getOffsetParent(v));
    let H = Z ? Z[C] : 0;
    (!H || !await (p.isElement == null ? void 0 : p.isElement(Z))) && (H = f.floating[C] || d.floating[S]);
    const L = $ / 2 - V / 2, re = H / 2 - j[S] / 2 - 1, I = Nr(x[P], re), K = Nr(x[T], re), B = I, G = H - j[S] - K, M = H / 2 - j[S] / 2 + L, Y = ou(B, M, G), X = !m.arrow && Is(c) != null && M !== Y && d.reference[S] / 2 - (M < B ? I : K) - j[S] / 2 < 0, te = X ? M < B ? M - B : M - G : 0;
    return {
      [k]: w[k] + te,
      data: {
        [k]: Y,
        centerOffset: M - Y - te,
        ...X && {
          alignmentOffset: te
        }
      },
      reset: X
    };
  }
}), c1 = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(r) {
      var a, i;
      const {
        placement: c,
        middlewareData: d,
        rects: p,
        initialPlacement: f,
        platform: m,
        elements: v
      } = r, {
        mainAxis: g = !0,
        crossAxis: x = !0,
        fallbackPlacements: w,
        fallbackStrategy: k = "bestFit",
        fallbackAxisSideDirection: S = "none",
        flipAlignment: j = !0,
        ..._
      } = Hn(n, r);
      if ((a = d.arrow) != null && a.alignmentOffset)
        return {};
      const P = Vn(c), T = Tn(f), C = Vn(f) === f, $ = await (m.isRTL == null ? void 0 : m.isRTL(v.floating)), V = w || (C || !j ? [ki(f)] : Jy(f)), Z = S !== "none";
      !w && Z && V.push(...r1(f, j, S, $));
      const H = [f, ...V], L = await m.detectOverflow(r, _), re = [];
      let I = ((i = d.flip) == null ? void 0 : i.overflows) || [];
      if (g && re.push(L[P]), x) {
        const M = Zy(c, p, $);
        re.push(L[M[0]], L[M[1]]);
      }
      if (I = [...I, {
        placement: c,
        overflows: re
      }], !re.every((M) => M <= 0)) {
        var K, B;
        const M = (((K = d.flip) == null ? void 0 : K.index) || 0) + 1, Y = H[M];
        if (Y && (!(x === "alignment" ? T !== Tn(Y) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        I.every((D) => Tn(D.placement) === T ? D.overflows[0] > 0 : !0)))
          return {
            data: {
              index: M,
              overflows: I
            },
            reset: {
              placement: Y
            }
          };
        let X = (B = I.filter((te) => te.overflows[0] <= 0).sort((te, D) => te.overflows[1] - D.overflows[1])[0]) == null ? void 0 : B.placement;
        if (!X)
          switch (k) {
            case "bestFit": {
              var G;
              const te = (G = I.filter((D) => {
                if (Z) {
                  const ne = Tn(D.placement);
                  return ne === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ne === "y";
                }
                return !0;
              }).map((D) => [D.placement, D.overflows.filter((ne) => ne > 0).reduce((ne, J) => ne + J, 0)]).sort((D, ne) => D[1] - ne[1])[0]) == null ? void 0 : G[0];
              te && (X = te);
              break;
            }
            case "initialPlacement":
              X = f;
              break;
          }
        if (c !== X)
          return {
            reset: {
              placement: X
            }
          };
      }
      return {};
    }
  };
};
function sh(n, r) {
  return {
    top: n.top - r.height,
    right: n.right - r.width,
    bottom: n.bottom - r.height,
    left: n.left - r.width
  };
}
function oh(n) {
  return qy.some((r) => n[r] >= 0);
}
const u1 = function(n) {
  return n === void 0 && (n = {}), {
    name: "hide",
    options: n,
    async fn(r) {
      const {
        rects: a,
        platform: i
      } = r, {
        strategy: c = "referenceHidden",
        ...d
      } = Hn(n, r);
      switch (c) {
        case "referenceHidden": {
          const p = await i.detectOverflow(r, {
            ...d,
            elementContext: "reference"
          }), f = sh(p, a.reference);
          return {
            data: {
              referenceHiddenOffsets: f,
              referenceHidden: oh(f)
            }
          };
        }
        case "escaped": {
          const p = await i.detectOverflow(r, {
            ...d,
            altBoundary: !0
          }), f = sh(p, a.floating);
          return {
            data: {
              escapedOffsets: f,
              escaped: oh(f)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, cm = /* @__PURE__ */ new Set(["left", "top"]);
async function d1(n, r) {
  const {
    placement: a,
    platform: i,
    elements: c
  } = n, d = await (i.isRTL == null ? void 0 : i.isRTL(c.floating)), p = Vn(a), f = Is(a), m = Tn(a) === "y", v = cm.has(p) ? -1 : 1, g = d && m ? -1 : 1, x = Hn(r, n);
  let {
    mainAxis: w,
    crossAxis: k,
    alignmentAxis: S
  } = typeof x == "number" ? {
    mainAxis: x,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: x.mainAxis || 0,
    crossAxis: x.crossAxis || 0,
    alignmentAxis: x.alignmentAxis
  };
  return f && typeof S == "number" && (k = f === "end" ? S * -1 : S), m ? {
    x: k * g,
    y: w * v
  } : {
    x: w * v,
    y: k * g
  };
}
const f1 = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(r) {
      var a, i;
      const {
        x: c,
        y: d,
        placement: p,
        middlewareData: f
      } = r, m = await d1(r, n);
      return p === ((a = f.offset) == null ? void 0 : a.placement) && (i = f.arrow) != null && i.alignmentOffset ? {} : {
        x: c + m.x,
        y: d + m.y,
        data: {
          ...m,
          placement: p
        }
      };
    }
  };
}, p1 = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(r) {
      const {
        x: a,
        y: i,
        placement: c,
        platform: d
      } = r, {
        mainAxis: p = !0,
        crossAxis: f = !1,
        limiter: m = {
          fn: (P) => {
            let {
              x: T,
              y: C
            } = P;
            return {
              x: T,
              y: C
            };
          }
        },
        ...v
      } = Hn(n, r), g = {
        x: a,
        y: i
      }, x = await d.detectOverflow(r, v), w = Tn(Vn(c)), k = Au(w);
      let S = g[k], j = g[w];
      if (p) {
        const P = k === "y" ? "top" : "left", T = k === "y" ? "bottom" : "right", C = S + x[P], $ = S - x[T];
        S = ou(C, S, $);
      }
      if (f) {
        const P = w === "y" ? "top" : "left", T = w === "y" ? "bottom" : "right", C = j + x[P], $ = j - x[T];
        j = ou(C, j, $);
      }
      const _ = m.fn({
        ...r,
        [k]: S,
        [w]: j
      });
      return {
        ..._,
        data: {
          x: _.x - a,
          y: _.y - i,
          enabled: {
            [k]: p,
            [w]: f
          }
        }
      };
    }
  };
}, h1 = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(r) {
      const {
        x: a,
        y: i,
        placement: c,
        rects: d,
        middlewareData: p
      } = r, {
        offset: f = 0,
        mainAxis: m = !0,
        crossAxis: v = !0
      } = Hn(n, r), g = {
        x: a,
        y: i
      }, x = Tn(c), w = Au(x);
      let k = g[w], S = g[x];
      const j = Hn(f, r), _ = typeof j == "number" ? {
        mainAxis: j,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...j
      };
      if (m) {
        const C = w === "y" ? "height" : "width", $ = d.reference[w] - d.floating[C] + _.mainAxis, V = d.reference[w] + d.reference[C] - _.mainAxis;
        k < $ ? k = $ : k > V && (k = V);
      }
      if (v) {
        var P, T;
        const C = w === "y" ? "width" : "height", $ = cm.has(Vn(c)), V = d.reference[x] - d.floating[C] + ($ && ((P = p.offset) == null ? void 0 : P[x]) || 0) + ($ ? 0 : _.crossAxis), Z = d.reference[x] + d.reference[C] + ($ ? 0 : ((T = p.offset) == null ? void 0 : T[x]) || 0) - ($ ? _.crossAxis : 0);
        S < V ? S = V : S > Z && (S = Z);
      }
      return {
        [w]: k,
        [x]: S
      };
    }
  };
}, m1 = function(n) {
  return n === void 0 && (n = {}), {
    name: "size",
    options: n,
    async fn(r) {
      var a, i;
      const {
        placement: c,
        rects: d,
        platform: p,
        elements: f
      } = r, {
        apply: m = () => {
        },
        ...v
      } = Hn(n, r), g = await p.detectOverflow(r, v), x = Vn(c), w = Is(c), k = Tn(c) === "y", {
        width: S,
        height: j
      } = d.floating;
      let _, P;
      x === "top" || x === "bottom" ? (_ = x, P = w === (await (p.isRTL == null ? void 0 : p.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (P = x, _ = w === "end" ? "top" : "bottom");
      const T = j - g.top - g.bottom, C = S - g.left - g.right, $ = Nr(j - g[_], T), V = Nr(S - g[P], C), Z = !r.middlewareData.shift;
      let H = $, L = V;
      if ((a = r.middlewareData.shift) != null && a.enabled.x && (L = C), (i = r.middlewareData.shift) != null && i.enabled.y && (H = T), Z && !w) {
        const I = Jt(g.left, 0), K = Jt(g.right, 0), B = Jt(g.top, 0), G = Jt(g.bottom, 0);
        k ? L = S - 2 * (I !== 0 || K !== 0 ? I + K : Jt(g.left, g.right)) : H = j - 2 * (B !== 0 || G !== 0 ? B + G : Jt(g.top, g.bottom));
      }
      await m({
        ...r,
        availableWidth: L,
        availableHeight: H
      });
      const re = await p.getDimensions(f.floating);
      return S !== re.width || j !== re.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Fi() {
  return typeof window < "u";
}
function Os(n) {
  return um(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function en(n) {
  var r;
  return (n == null || (r = n.ownerDocument) == null ? void 0 : r.defaultView) || window;
}
function An(n) {
  var r;
  return (r = (um(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : r.documentElement;
}
function um(n) {
  return Fi() ? n instanceof Node || n instanceof en(n).Node : !1;
}
function jn(n) {
  return Fi() ? n instanceof Element || n instanceof en(n).Element : !1;
}
function Gn(n) {
  return Fi() ? n instanceof HTMLElement || n instanceof en(n).HTMLElement : !1;
}
function ah(n) {
  return !Fi() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof en(n).ShadowRoot;
}
function Uo(n) {
  const {
    overflow: r,
    overflowX: a,
    overflowY: i,
    display: c
  } = kn(n);
  return /auto|scroll|overlay|hidden|clip/.test(r + i + a) && c !== "inline" && c !== "contents";
}
function g1(n) {
  return /^(table|td|th)$/.test(Os(n));
}
function Mi(n) {
  try {
    if (n.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return n.matches(":modal");
  } catch {
    return !1;
  }
}
const x1 = /transform|translate|scale|rotate|perspective|filter/, v1 = /paint|layout|strict|content/, Hr = (n) => !!n && n !== "none";
let Dc;
function $u(n) {
  const r = jn(n) ? kn(n) : n;
  return Hr(r.transform) || Hr(r.translate) || Hr(r.scale) || Hr(r.rotate) || Hr(r.perspective) || !Lu() && (Hr(r.backdropFilter) || Hr(r.filter)) || x1.test(r.willChange || "") || v1.test(r.contain || "");
}
function y1(n) {
  let r = Cr(n);
  for (; Gn(r) && !Fs(r); ) {
    if ($u(r))
      return r;
    if (Mi(r))
      return null;
    r = Cr(r);
  }
  return null;
}
function Lu() {
  return Dc == null && (Dc = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Dc;
}
function Fs(n) {
  return /^(html|body|#document)$/.test(Os(n));
}
function kn(n) {
  return en(n).getComputedStyle(n);
}
function $i(n) {
  return jn(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Cr(n) {
  if (Os(n) === "html")
    return n;
  const r = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    ah(n) && n.host || // Fallback.
    An(n)
  );
  return ah(r) ? r.host : r;
}
function dm(n) {
  const r = Cr(n);
  return Fs(r) ? n.ownerDocument ? n.ownerDocument.body : n.body : Gn(r) && Uo(r) ? r : dm(r);
}
function Mo(n, r, a) {
  var i;
  r === void 0 && (r = []), a === void 0 && (a = !0);
  const c = dm(n), d = c === ((i = n.ownerDocument) == null ? void 0 : i.body), p = en(c);
  if (d) {
    const f = iu(p);
    return r.concat(p, p.visualViewport || [], Uo(c) ? c : [], f && a ? Mo(f) : []);
  } else
    return r.concat(c, Mo(c, [], a));
}
function iu(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function fm(n) {
  const r = kn(n);
  let a = parseFloat(r.width) || 0, i = parseFloat(r.height) || 0;
  const c = Gn(n), d = c ? n.offsetWidth : a, p = c ? n.offsetHeight : i, f = ji(a) !== d || ji(i) !== p;
  return f && (a = d, i = p), {
    width: a,
    height: i,
    $: f
  };
}
function Du(n) {
  return jn(n) ? n : n.contextElement;
}
function Ts(n) {
  const r = Du(n);
  if (!Gn(r))
    return Rn(1);
  const a = r.getBoundingClientRect(), {
    width: i,
    height: c,
    $: d
  } = fm(r);
  let p = (d ? ji(a.width) : a.width) / i, f = (d ? ji(a.height) : a.height) / c;
  return (!p || !Number.isFinite(p)) && (p = 1), (!f || !Number.isFinite(f)) && (f = 1), {
    x: p,
    y: f
  };
}
const w1 = /* @__PURE__ */ Rn(0);
function pm(n) {
  const r = en(n);
  return !Lu() || !r.visualViewport ? w1 : {
    x: r.visualViewport.offsetLeft,
    y: r.visualViewport.offsetTop
  };
}
function b1(n, r, a) {
  return r === void 0 && (r = !1), !a || r && a !== en(n) ? !1 : r;
}
function Jr(n, r, a, i) {
  r === void 0 && (r = !1), a === void 0 && (a = !1);
  const c = n.getBoundingClientRect(), d = Du(n);
  let p = Rn(1);
  r && (i ? jn(i) && (p = Ts(i)) : p = Ts(n));
  const f = b1(d, a, i) ? pm(d) : Rn(0);
  let m = (c.left + f.x) / p.x, v = (c.top + f.y) / p.y, g = c.width / p.x, x = c.height / p.y;
  if (d) {
    const w = en(d), k = i && jn(i) ? en(i) : i;
    let S = w, j = iu(S);
    for (; j && i && k !== S; ) {
      const _ = Ts(j), P = j.getBoundingClientRect(), T = kn(j), C = P.left + (j.clientLeft + parseFloat(T.paddingLeft)) * _.x, $ = P.top + (j.clientTop + parseFloat(T.paddingTop)) * _.y;
      m *= _.x, v *= _.y, g *= _.x, x *= _.y, m += C, v += $, S = en(j), j = iu(S);
    }
  }
  return _i({
    width: g,
    height: x,
    x: m,
    y: v
  });
}
function Li(n, r) {
  const a = $i(n).scrollLeft;
  return r ? r.left + a : Jr(An(n)).left + a;
}
function hm(n, r) {
  const a = n.getBoundingClientRect(), i = a.left + r.scrollLeft - Li(n, a), c = a.top + r.scrollTop;
  return {
    x: i,
    y: c
  };
}
function j1(n) {
  let {
    elements: r,
    rect: a,
    offsetParent: i,
    strategy: c
  } = n;
  const d = c === "fixed", p = An(i), f = r ? Mi(r.floating) : !1;
  if (i === p || f && d)
    return a;
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  }, v = Rn(1);
  const g = Rn(0), x = Gn(i);
  if ((x || !x && !d) && ((Os(i) !== "body" || Uo(p)) && (m = $i(i)), x)) {
    const k = Jr(i);
    v = Ts(i), g.x = k.x + i.clientLeft, g.y = k.y + i.clientTop;
  }
  const w = p && !x && !d ? hm(p, m) : Rn(0);
  return {
    width: a.width * v.x,
    height: a.height * v.y,
    x: a.x * v.x - m.scrollLeft * v.x + g.x + w.x,
    y: a.y * v.y - m.scrollTop * v.y + g.y + w.y
  };
}
function k1(n) {
  return Array.from(n.getClientRects());
}
function _1(n) {
  const r = An(n), a = $i(n), i = n.ownerDocument.body, c = Jt(r.scrollWidth, r.clientWidth, i.scrollWidth, i.clientWidth), d = Jt(r.scrollHeight, r.clientHeight, i.scrollHeight, i.clientHeight);
  let p = -a.scrollLeft + Li(n);
  const f = -a.scrollTop;
  return kn(i).direction === "rtl" && (p += Jt(r.clientWidth, i.clientWidth) - c), {
    width: c,
    height: d,
    x: p,
    y: f
  };
}
const ih = 25;
function S1(n, r) {
  const a = en(n), i = An(n), c = a.visualViewport;
  let d = i.clientWidth, p = i.clientHeight, f = 0, m = 0;
  if (c) {
    d = c.width, p = c.height;
    const g = Lu();
    (!g || g && r === "fixed") && (f = c.offsetLeft, m = c.offsetTop);
  }
  const v = Li(i);
  if (v <= 0) {
    const g = i.ownerDocument, x = g.body, w = getComputedStyle(x), k = g.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight) || 0, S = Math.abs(i.clientWidth - x.clientWidth - k);
    S <= ih && (d -= S);
  } else v <= ih && (d += v);
  return {
    width: d,
    height: p,
    x: f,
    y: m
  };
}
function N1(n, r) {
  const a = Jr(n, !0, r === "fixed"), i = a.top + n.clientTop, c = a.left + n.clientLeft, d = Gn(n) ? Ts(n) : Rn(1), p = n.clientWidth * d.x, f = n.clientHeight * d.y, m = c * d.x, v = i * d.y;
  return {
    width: p,
    height: f,
    x: m,
    y: v
  };
}
function lh(n, r, a) {
  let i;
  if (r === "viewport")
    i = S1(n, a);
  else if (r === "document")
    i = _1(An(n));
  else if (jn(r))
    i = N1(r, a);
  else {
    const c = pm(n);
    i = {
      x: r.x - c.x,
      y: r.y - c.y,
      width: r.width,
      height: r.height
    };
  }
  return _i(i);
}
function mm(n, r) {
  const a = Cr(n);
  return a === r || !jn(a) || Fs(a) ? !1 : kn(a).position === "fixed" || mm(a, r);
}
function C1(n, r) {
  const a = r.get(n);
  if (a)
    return a;
  let i = Mo(n, [], !1).filter((f) => jn(f) && Os(f) !== "body"), c = null;
  const d = kn(n).position === "fixed";
  let p = d ? Cr(n) : n;
  for (; jn(p) && !Fs(p); ) {
    const f = kn(p), m = $u(p);
    !m && f.position === "fixed" && (c = null), (d ? !m && !c : !m && f.position === "static" && !!c && (c.position === "absolute" || c.position === "fixed") || Uo(p) && !m && mm(n, p)) ? i = i.filter((g) => g !== p) : c = f, p = Cr(p);
  }
  return r.set(n, i), i;
}
function P1(n) {
  let {
    element: r,
    boundary: a,
    rootBoundary: i,
    strategy: c
  } = n;
  const p = [...a === "clippingAncestors" ? Mi(r) ? [] : C1(r, this._c) : [].concat(a), i], f = lh(r, p[0], c);
  let m = f.top, v = f.right, g = f.bottom, x = f.left;
  for (let w = 1; w < p.length; w++) {
    const k = lh(r, p[w], c);
    m = Jt(k.top, m), v = Nr(k.right, v), g = Nr(k.bottom, g), x = Jt(k.left, x);
  }
  return {
    width: v - x,
    height: g - m,
    x,
    y: m
  };
}
function E1(n) {
  const {
    width: r,
    height: a
  } = fm(n);
  return {
    width: r,
    height: a
  };
}
function T1(n, r, a) {
  const i = Gn(r), c = An(r), d = a === "fixed", p = Jr(n, !0, d, r);
  let f = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const m = Rn(0);
  function v() {
    m.x = Li(c);
  }
  if (i || !i && !d)
    if ((Os(r) !== "body" || Uo(c)) && (f = $i(r)), i) {
      const k = Jr(r, !0, d, r);
      m.x = k.x + r.clientLeft, m.y = k.y + r.clientTop;
    } else c && v();
  d && !i && c && v();
  const g = c && !i && !d ? hm(c, f) : Rn(0), x = p.left + f.scrollLeft - m.x - g.x, w = p.top + f.scrollTop - m.y - g.y;
  return {
    x,
    y: w,
    width: p.width,
    height: p.height
  };
}
function Ic(n) {
  return kn(n).position === "static";
}
function ch(n, r) {
  if (!Gn(n) || kn(n).position === "fixed")
    return null;
  if (r)
    return r(n);
  let a = n.offsetParent;
  return An(n) === a && (a = a.ownerDocument.body), a;
}
function gm(n, r) {
  const a = en(n);
  if (Mi(n))
    return a;
  if (!Gn(n)) {
    let c = Cr(n);
    for (; c && !Fs(c); ) {
      if (jn(c) && !Ic(c))
        return c;
      c = Cr(c);
    }
    return a;
  }
  let i = ch(n, r);
  for (; i && g1(i) && Ic(i); )
    i = ch(i, r);
  return i && Fs(i) && Ic(i) && !$u(i) ? a : i || y1(n) || a;
}
const R1 = async function(n) {
  const r = this.getOffsetParent || gm, a = this.getDimensions, i = await a(n.floating);
  return {
    reference: T1(n.reference, await r(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function A1(n) {
  return kn(n).direction === "rtl";
}
const F1 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: j1,
  getDocumentElement: An,
  getClippingRect: P1,
  getOffsetParent: gm,
  getElementRects: R1,
  getClientRects: k1,
  getDimensions: E1,
  getScale: Ts,
  isElement: jn,
  isRTL: A1
};
function xm(n, r) {
  return n.x === r.x && n.y === r.y && n.width === r.width && n.height === r.height;
}
function M1(n, r) {
  let a = null, i;
  const c = An(n);
  function d() {
    var f;
    clearTimeout(i), (f = a) == null || f.disconnect(), a = null;
  }
  function p(f, m) {
    f === void 0 && (f = !1), m === void 0 && (m = 1), d();
    const v = n.getBoundingClientRect(), {
      left: g,
      top: x,
      width: w,
      height: k
    } = v;
    if (f || r(), !w || !k)
      return;
    const S = ii(x), j = ii(c.clientWidth - (g + w)), _ = ii(c.clientHeight - (x + k)), P = ii(g), C = {
      rootMargin: -S + "px " + -j + "px " + -_ + "px " + -P + "px",
      threshold: Jt(0, Nr(1, m)) || 1
    };
    let $ = !0;
    function V(Z) {
      const H = Z[0].intersectionRatio;
      if (H !== m) {
        if (!$)
          return p();
        H ? p(!1, H) : i = setTimeout(() => {
          p(!1, 1e-7);
        }, 1e3);
      }
      H === 1 && !xm(v, n.getBoundingClientRect()) && p(), $ = !1;
    }
    try {
      a = new IntersectionObserver(V, {
        ...C,
        // Handle <iframe>s
        root: c.ownerDocument
      });
    } catch {
      a = new IntersectionObserver(V, C);
    }
    a.observe(n);
  }
  return p(!0), d;
}
function $1(n, r, a, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: d = !0,
    elementResize: p = typeof ResizeObserver == "function",
    layoutShift: f = typeof IntersectionObserver == "function",
    animationFrame: m = !1
  } = i, v = Du(n), g = c || d ? [...v ? Mo(v) : [], ...r ? Mo(r) : []] : [];
  g.forEach((P) => {
    c && P.addEventListener("scroll", a, {
      passive: !0
    }), d && P.addEventListener("resize", a);
  });
  const x = v && f ? M1(v, a) : null;
  let w = -1, k = null;
  p && (k = new ResizeObserver((P) => {
    let [T] = P;
    T && T.target === v && k && r && (k.unobserve(r), cancelAnimationFrame(w), w = requestAnimationFrame(() => {
      var C;
      (C = k) == null || C.observe(r);
    })), a();
  }), v && !m && k.observe(v), r && k.observe(r));
  let S, j = m ? Jr(n) : null;
  m && _();
  function _() {
    const P = Jr(n);
    j && !xm(j, P) && a(), j = P, S = requestAnimationFrame(_);
  }
  return a(), () => {
    var P;
    g.forEach((T) => {
      c && T.removeEventListener("scroll", a), d && T.removeEventListener("resize", a);
    }), x?.(), (P = k) == null || P.disconnect(), k = null, m && cancelAnimationFrame(S);
  };
}
const L1 = f1, D1 = p1, I1 = c1, O1 = m1, z1 = u1, uh = l1, B1 = h1, W1 = (n, r, a) => {
  const i = /* @__PURE__ */ new Map(), c = {
    platform: F1,
    ...a
  }, d = {
    ...c.platform,
    _c: i
  };
  return i1(n, r, {
    ...c,
    platform: d
  });
};
var U1 = typeof document < "u", H1 = function() {
}, hi = U1 ? y.useLayoutEffect : H1;
function Si(n, r) {
  if (n === r)
    return !0;
  if (typeof n != typeof r)
    return !1;
  if (typeof n == "function" && n.toString() === r.toString())
    return !0;
  let a, i, c;
  if (n && r && typeof n == "object") {
    if (Array.isArray(n)) {
      if (a = n.length, a !== r.length) return !1;
      for (i = a; i-- !== 0; )
        if (!Si(n[i], r[i]))
          return !1;
      return !0;
    }
    if (c = Object.keys(n), a = c.length, a !== Object.keys(r).length)
      return !1;
    for (i = a; i-- !== 0; )
      if (!{}.hasOwnProperty.call(r, c[i]))
        return !1;
    for (i = a; i-- !== 0; ) {
      const d = c[i];
      if (!(d === "_owner" && n.$$typeof) && !Si(n[d], r[d]))
        return !1;
    }
    return !0;
  }
  return n !== n && r !== r;
}
function vm(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function dh(n, r) {
  const a = vm(n);
  return Math.round(r * a) / a;
}
function Oc(n) {
  const r = y.useRef(n);
  return hi(() => {
    r.current = n;
  }), r;
}
function V1(n) {
  n === void 0 && (n = {});
  const {
    placement: r = "bottom",
    strategy: a = "absolute",
    middleware: i = [],
    platform: c,
    elements: {
      reference: d,
      floating: p
    } = {},
    transform: f = !0,
    whileElementsMounted: m,
    open: v
  } = n, [g, x] = y.useState({
    x: 0,
    y: 0,
    strategy: a,
    placement: r,
    middlewareData: {},
    isPositioned: !1
  }), [w, k] = y.useState(i);
  Si(w, i) || k(i);
  const [S, j] = y.useState(null), [_, P] = y.useState(null), T = y.useCallback((D) => {
    D !== Z.current && (Z.current = D, j(D));
  }, []), C = y.useCallback((D) => {
    D !== H.current && (H.current = D, P(D));
  }, []), $ = d || S, V = p || _, Z = y.useRef(null), H = y.useRef(null), L = y.useRef(g), re = m != null, I = Oc(m), K = Oc(c), B = Oc(v), G = y.useCallback(() => {
    if (!Z.current || !H.current)
      return;
    const D = {
      placement: r,
      strategy: a,
      middleware: w
    };
    K.current && (D.platform = K.current), W1(Z.current, H.current, D).then((ne) => {
      const J = {
        ...ne,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: B.current !== !1
      };
      M.current && !Si(L.current, J) && (L.current = J, Wo.flushSync(() => {
        x(J);
      }));
    });
  }, [w, r, a, K, B]);
  hi(() => {
    v === !1 && L.current.isPositioned && (L.current.isPositioned = !1, x((D) => ({
      ...D,
      isPositioned: !1
    })));
  }, [v]);
  const M = y.useRef(!1);
  hi(() => (M.current = !0, () => {
    M.current = !1;
  }), []), hi(() => {
    if ($ && (Z.current = $), V && (H.current = V), $ && V) {
      if (I.current)
        return I.current($, V, G);
      G();
    }
  }, [$, V, G, I, re]);
  const Y = y.useMemo(() => ({
    reference: Z,
    floating: H,
    setReference: T,
    setFloating: C
  }), [T, C]), X = y.useMemo(() => ({
    reference: $,
    floating: V
  }), [$, V]), te = y.useMemo(() => {
    const D = {
      position: a,
      left: 0,
      top: 0
    };
    if (!X.floating)
      return D;
    const ne = dh(X.floating, g.x), J = dh(X.floating, g.y);
    return f ? {
      ...D,
      transform: "translate(" + ne + "px, " + J + "px)",
      ...vm(X.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: a,
      left: ne,
      top: J
    };
  }, [a, f, X.floating, g.x, g.y]);
  return y.useMemo(() => ({
    ...g,
    update: G,
    refs: Y,
    elements: X,
    floatingStyles: te
  }), [g, G, Y, X, te]);
}
const G1 = (n) => {
  function r(a) {
    return {}.hasOwnProperty.call(a, "current");
  }
  return {
    name: "arrow",
    options: n,
    fn(a) {
      const {
        element: i,
        padding: c
      } = typeof n == "function" ? n(a) : n;
      return i && r(i) ? i.current != null ? uh({
        element: i.current,
        padding: c
      }).fn(a) : {} : i ? uh({
        element: i,
        padding: c
      }).fn(a) : {};
    }
  };
}, Q1 = (n, r) => {
  const a = L1(n);
  return {
    name: a.name,
    fn: a.fn,
    options: [n, r]
  };
}, K1 = (n, r) => {
  const a = D1(n);
  return {
    name: a.name,
    fn: a.fn,
    options: [n, r]
  };
}, Y1 = (n, r) => ({
  fn: B1(n).fn,
  options: [n, r]
}), q1 = (n, r) => {
  const a = I1(n);
  return {
    name: a.name,
    fn: a.fn,
    options: [n, r]
  };
}, X1 = (n, r) => {
  const a = O1(n);
  return {
    name: a.name,
    fn: a.fn,
    options: [n, r]
  };
}, Z1 = (n, r) => {
  const a = z1(n);
  return {
    name: a.name,
    fn: a.fn,
    options: [n, r]
  };
}, J1 = (n, r) => {
  const a = G1(n);
  return {
    name: a.name,
    fn: a.fn,
    options: [n, r]
  };
};
var ew = "Arrow", ym = y.forwardRef((n, r) => {
  const { children: a, width: i = 10, height: c = 5, ...d } = n;
  return /* @__PURE__ */ s.jsx(
    et.svg,
    {
      ...d,
      ref: r,
      width: i,
      height: c,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? a : /* @__PURE__ */ s.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ym.displayName = ew;
var tw = ym;
function nw(n) {
  const [r, a] = y.useState(void 0);
  return It(() => {
    if (n) {
      a({ width: n.offsetWidth, height: n.offsetHeight });
      const i = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const d = c[0];
        let p, f;
        if ("borderBoxSize" in d) {
          const m = d.borderBoxSize, v = Array.isArray(m) ? m[0] : m;
          p = v.inlineSize, f = v.blockSize;
        } else
          p = n.offsetWidth, f = n.offsetHeight;
        a({ width: p, height: f });
      });
      return i.observe(n, { box: "border-box" }), () => i.unobserve(n);
    } else
      a(void 0);
  }, [n]), r;
}
var Iu = "Popper", [wm, Di] = Ls(Iu), [rw, bm] = wm(Iu), jm = (n) => {
  const { __scopePopper: r, children: a } = n, [i, c] = y.useState(null);
  return /* @__PURE__ */ s.jsx(rw, { scope: r, anchor: i, onAnchorChange: c, children: a });
};
jm.displayName = Iu;
var km = "PopperAnchor", _m = y.forwardRef(
  (n, r) => {
    const { __scopePopper: a, virtualRef: i, ...c } = n, d = bm(km, a), p = y.useRef(null), f = yt(r, p), m = y.useRef(null);
    return y.useEffect(() => {
      const v = m.current;
      m.current = i?.current || p.current, v !== m.current && d.onAnchorChange(m.current);
    }), i ? null : /* @__PURE__ */ s.jsx(et.div, { ...c, ref: f });
  }
);
_m.displayName = km;
var Ou = "PopperContent", [sw, ow] = wm(Ou), Sm = y.forwardRef(
  (n, r) => {
    const {
      __scopePopper: a,
      side: i = "bottom",
      sideOffset: c = 0,
      align: d = "center",
      alignOffset: p = 0,
      arrowPadding: f = 0,
      avoidCollisions: m = !0,
      collisionBoundary: v = [],
      collisionPadding: g = 0,
      sticky: x = "partial",
      hideWhenDetached: w = !1,
      updatePositionStrategy: k = "optimized",
      onPlaced: S,
      ...j
    } = n, _ = bm(Ou, a), [P, T] = y.useState(null), C = yt(r, (ce) => T(ce)), [$, V] = y.useState(null), Z = nw($), H = Z?.width ?? 0, L = Z?.height ?? 0, re = i + (d !== "center" ? "-" + d : ""), I = typeof g == "number" ? g : { top: 0, right: 0, bottom: 0, left: 0, ...g }, K = Array.isArray(v) ? v : [v], B = K.length > 0, G = {
      padding: I,
      boundary: K.filter(iw),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: B
    }, { refs: M, floatingStyles: Y, placement: X, isPositioned: te, middlewareData: D } = V1({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: re,
      whileElementsMounted: (...ce) => $1(...ce, {
        animationFrame: k === "always"
      }),
      elements: {
        reference: _.anchor
      },
      middleware: [
        Q1({ mainAxis: c + L, alignmentAxis: p }),
        m && K1({
          mainAxis: !0,
          crossAxis: !1,
          limiter: x === "partial" ? Y1() : void 0,
          ...G
        }),
        m && q1({ ...G }),
        X1({
          ...G,
          apply: ({ elements: ce, rects: z, availableWidth: oe, availableHeight: se }) => {
            const { width: Pe, height: Ae } = z.reference, Ie = ce.floating.style;
            Ie.setProperty("--radix-popper-available-width", `${oe}px`), Ie.setProperty("--radix-popper-available-height", `${se}px`), Ie.setProperty("--radix-popper-anchor-width", `${Pe}px`), Ie.setProperty("--radix-popper-anchor-height", `${Ae}px`);
          }
        }),
        $ && J1({ element: $, padding: f }),
        lw({ arrowWidth: H, arrowHeight: L }),
        w && Z1({ strategy: "referenceHidden", ...G })
      ]
    }), [ne, J] = Pm(X), A = Sr(S);
    It(() => {
      te && A?.();
    }, [te, A]);
    const ee = D.arrow?.x, ve = D.arrow?.y, be = D.arrow?.centerOffset !== 0, [q, de] = y.useState();
    return It(() => {
      P && de(window.getComputedStyle(P).zIndex);
    }, [P]), /* @__PURE__ */ s.jsx(
      "div",
      {
        ref: M.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Y,
          transform: te ? Y.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: q,
          "--radix-popper-transform-origin": [
            D.transformOrigin?.x,
            D.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...D.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: n.dir,
        children: /* @__PURE__ */ s.jsx(
          sw,
          {
            scope: a,
            placedSide: ne,
            onArrowChange: V,
            arrowX: ee,
            arrowY: ve,
            shouldHideArrow: be,
            children: /* @__PURE__ */ s.jsx(
              et.div,
              {
                "data-side": ne,
                "data-align": J,
                ...j,
                ref: C,
                style: {
                  ...j.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: te ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Sm.displayName = Ou;
var Nm = "PopperArrow", aw = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Cm = y.forwardRef(function(r, a) {
  const { __scopePopper: i, ...c } = r, d = ow(Nm, i), p = aw[d.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ s.jsx(
      "span",
      {
        ref: d.onArrowChange,
        style: {
          position: "absolute",
          left: d.arrowX,
          top: d.arrowY,
          [p]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[d.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[d.placedSide],
          visibility: d.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ s.jsx(
          tw,
          {
            ...c,
            ref: a,
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
Cm.displayName = Nm;
function iw(n) {
  return n !== null;
}
var lw = (n) => ({
  name: "transformOrigin",
  options: n,
  fn(r) {
    const { placement: a, rects: i, middlewareData: c } = r, p = c.arrow?.centerOffset !== 0, f = p ? 0 : n.arrowWidth, m = p ? 0 : n.arrowHeight, [v, g] = Pm(a), x = { start: "0%", center: "50%", end: "100%" }[g], w = (c.arrow?.x ?? 0) + f / 2, k = (c.arrow?.y ?? 0) + m / 2;
    let S = "", j = "";
    return v === "bottom" ? (S = p ? x : `${w}px`, j = `${-m}px`) : v === "top" ? (S = p ? x : `${w}px`, j = `${i.floating.height + m}px`) : v === "right" ? (S = `${-m}px`, j = p ? x : `${k}px`) : v === "left" && (S = `${i.floating.width + m}px`, j = p ? x : `${k}px`), { data: { x: S, y: j } };
  }
});
function Pm(n) {
  const [r, a = "center"] = n.split("-");
  return [r, a];
}
var Em = jm, Tm = _m, Rm = Sm, Am = Cm, cw = "Portal", Fm = y.forwardRef((n, r) => {
  const { container: a, ...i } = n, [c, d] = y.useState(!1);
  It(() => d(!0), []);
  const p = a || c && globalThis?.document?.body;
  return p ? Ry.createPortal(/* @__PURE__ */ s.jsx(et.div, { ...i, ref: r }), p) : null;
});
Fm.displayName = cw;
function uw(n, r) {
  return y.useReducer((a, i) => r[a][i] ?? a, n);
}
var zu = (n) => {
  const { present: r, children: a } = n, i = dw(r), c = typeof a == "function" ? a({ present: i.isPresent }) : y.Children.only(a), d = yt(i.ref, fw(c));
  return typeof a == "function" || i.isPresent ? y.cloneElement(c, { ref: d }) : null;
};
zu.displayName = "Presence";
function dw(n) {
  const [r, a] = y.useState(), i = y.useRef(null), c = y.useRef(n), d = y.useRef("none"), p = n ? "mounted" : "unmounted", [f, m] = uw(p, {
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
  return y.useEffect(() => {
    const v = li(i.current);
    d.current = f === "mounted" ? v : "none";
  }, [f]), It(() => {
    const v = i.current, g = c.current;
    if (g !== n) {
      const w = d.current, k = li(v);
      n ? m("MOUNT") : k === "none" || v?.display === "none" ? m("UNMOUNT") : m(g && w !== k ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, m]), It(() => {
    if (r) {
      let v;
      const g = r.ownerDocument.defaultView ?? window, x = (k) => {
        const j = li(i.current).includes(CSS.escape(k.animationName));
        if (k.target === r && j && (m("ANIMATION_END"), !c.current)) {
          const _ = r.style.animationFillMode;
          r.style.animationFillMode = "forwards", v = g.setTimeout(() => {
            r.style.animationFillMode === "forwards" && (r.style.animationFillMode = _);
          });
        }
      }, w = (k) => {
        k.target === r && (d.current = li(i.current));
      };
      return r.addEventListener("animationstart", w), r.addEventListener("animationcancel", x), r.addEventListener("animationend", x), () => {
        g.clearTimeout(v), r.removeEventListener("animationstart", w), r.removeEventListener("animationcancel", x), r.removeEventListener("animationend", x);
      };
    } else
      m("ANIMATION_END");
  }, [r, m]), {
    isPresent: ["mounted", "unmountSuspended"].includes(f),
    ref: y.useCallback((v) => {
      i.current = v ? getComputedStyle(v) : null, a(v);
    }, [])
  };
}
function li(n) {
  return n?.animationName || "none";
}
function fw(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning;
  return a ? n.ref : (r = Object.getOwnPropertyDescriptor(n, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning, a ? n.props.ref : n.props.ref || n.ref);
}
var pw = /* @__PURE__ */ Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function hw(n) {
  const r = ({ children: a }) => /* @__PURE__ */ s.jsx(s.Fragment, { children: a });
  return r.displayName = `${n}.Slottable`, r.__radixId = pw, r;
}
var mw = Ri[" useInsertionEffect ".trim().toString()] || It;
function $o({
  prop: n,
  defaultProp: r,
  onChange: a = () => {
  },
  caller: i
}) {
  const [c, d, p] = gw({
    defaultProp: r,
    onChange: a
  }), f = n !== void 0, m = f ? n : c;
  {
    const g = y.useRef(n !== void 0);
    y.useEffect(() => {
      const x = g.current;
      x !== f && console.warn(
        `${i} is changing from ${x ? "controlled" : "uncontrolled"} to ${f ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), g.current = f;
    }, [f, i]);
  }
  const v = y.useCallback(
    (g) => {
      if (f) {
        const x = xw(g) ? g(n) : g;
        x !== n && p.current?.(x);
      } else
        d(g);
    },
    [f, n, d, p]
  );
  return [m, v];
}
function gw({
  defaultProp: n,
  onChange: r
}) {
  const [a, i] = y.useState(n), c = y.useRef(a), d = y.useRef(r);
  return mw(() => {
    d.current = r;
  }, [r]), y.useEffect(() => {
    c.current !== a && (d.current?.(a), c.current = a);
  }, [a, c]), [a, i, d];
}
function xw(n) {
  return typeof n == "function";
}
var Mm = Object.freeze({
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
}), vw = "VisuallyHidden", $m = y.forwardRef(
  (n, r) => /* @__PURE__ */ s.jsx(
    et.span,
    {
      ...n,
      ref: r,
      style: { ...Mm, ...n.style }
    }
  )
);
$m.displayName = vw;
var yw = $m, [Ii] = Ls("Tooltip", [
  Di
]), Oi = Di(), Lm = "TooltipProvider", ww = 700, lu = "tooltip.open", [bw, Bu] = Ii(Lm), Dm = (n) => {
  const {
    __scopeTooltip: r,
    delayDuration: a = ww,
    skipDelayDuration: i = 300,
    disableHoverableContent: c = !1,
    children: d
  } = n, p = y.useRef(!0), f = y.useRef(!1), m = y.useRef(0);
  return y.useEffect(() => {
    const v = m.current;
    return () => window.clearTimeout(v);
  }, []), /* @__PURE__ */ s.jsx(
    bw,
    {
      scope: r,
      isOpenDelayedRef: p,
      delayDuration: a,
      onOpen: y.useCallback(() => {
        window.clearTimeout(m.current), p.current = !1;
      }, []),
      onClose: y.useCallback(() => {
        window.clearTimeout(m.current), m.current = window.setTimeout(
          () => p.current = !0,
          i
        );
      }, [i]),
      isPointerInTransitRef: f,
      onPointerInTransitChange: y.useCallback((v) => {
        f.current = v;
      }, []),
      disableHoverableContent: c,
      children: d
    }
  );
};
Dm.displayName = Lm;
var Lo = "Tooltip", [jw, zi] = Ii(Lo), Im = (n) => {
  const {
    __scopeTooltip: r,
    children: a,
    open: i,
    defaultOpen: c,
    onOpenChange: d,
    disableHoverableContent: p,
    delayDuration: f
  } = n, m = Bu(Lo, n.__scopeTooltip), v = Oi(r), [g, x] = y.useState(null), w = Ds(), k = y.useRef(0), S = p ?? m.disableHoverableContent, j = f ?? m.delayDuration, _ = y.useRef(!1), [P, T] = $o({
    prop: i,
    defaultProp: c ?? !1,
    onChange: (H) => {
      H ? (m.onOpen(), document.dispatchEvent(new CustomEvent(lu))) : m.onClose(), d?.(H);
    },
    caller: Lo
  }), C = y.useMemo(() => P ? _.current ? "delayed-open" : "instant-open" : "closed", [P]), $ = y.useCallback(() => {
    window.clearTimeout(k.current), k.current = 0, _.current = !1, T(!0);
  }, [T]), V = y.useCallback(() => {
    window.clearTimeout(k.current), k.current = 0, T(!1);
  }, [T]), Z = y.useCallback(() => {
    window.clearTimeout(k.current), k.current = window.setTimeout(() => {
      _.current = !0, T(!0), k.current = 0;
    }, j);
  }, [j, T]);
  return y.useEffect(() => () => {
    k.current && (window.clearTimeout(k.current), k.current = 0);
  }, []), /* @__PURE__ */ s.jsx(Em, { ...v, children: /* @__PURE__ */ s.jsx(
    jw,
    {
      scope: r,
      contentId: w,
      open: P,
      stateAttribute: C,
      trigger: g,
      onTriggerChange: x,
      onTriggerEnter: y.useCallback(() => {
        m.isOpenDelayedRef.current ? Z() : $();
      }, [m.isOpenDelayedRef, Z, $]),
      onTriggerLeave: y.useCallback(() => {
        S ? V() : (window.clearTimeout(k.current), k.current = 0);
      }, [V, S]),
      onOpen: $,
      onClose: V,
      disableHoverableContent: S,
      children: a
    }
  ) });
};
Im.displayName = Lo;
var cu = "TooltipTrigger", Om = y.forwardRef(
  (n, r) => {
    const { __scopeTooltip: a, ...i } = n, c = zi(cu, a), d = Bu(cu, a), p = Oi(a), f = y.useRef(null), m = yt(r, f, c.onTriggerChange), v = y.useRef(!1), g = y.useRef(!1), x = y.useCallback(() => v.current = !1, []);
    return y.useEffect(() => () => document.removeEventListener("pointerup", x), [x]), /* @__PURE__ */ s.jsx(Tm, { asChild: !0, ...p, children: /* @__PURE__ */ s.jsx(
      et.button,
      {
        "aria-describedby": c.open ? c.contentId : void 0,
        "data-state": c.stateAttribute,
        ...i,
        ref: m,
        onPointerMove: Ue(n.onPointerMove, (w) => {
          w.pointerType !== "touch" && !g.current && !d.isPointerInTransitRef.current && (c.onTriggerEnter(), g.current = !0);
        }),
        onPointerLeave: Ue(n.onPointerLeave, () => {
          c.onTriggerLeave(), g.current = !1;
        }),
        onPointerDown: Ue(n.onPointerDown, () => {
          c.open && c.onClose(), v.current = !0, document.addEventListener("pointerup", x, { once: !0 });
        }),
        onFocus: Ue(n.onFocus, () => {
          v.current || c.onOpen();
        }),
        onBlur: Ue(n.onBlur, c.onClose),
        onClick: Ue(n.onClick, c.onClose)
      }
    ) });
  }
);
Om.displayName = cu;
var kw = "TooltipPortal", [U_, _w] = Ii(kw, {
  forceMount: void 0
}), Ms = "TooltipContent", zm = y.forwardRef(
  (n, r) => {
    const a = _w(Ms, n.__scopeTooltip), { forceMount: i = a.forceMount, side: c = "top", ...d } = n, p = zi(Ms, n.__scopeTooltip);
    return /* @__PURE__ */ s.jsx(zu, { present: i || p.open, children: p.disableHoverableContent ? /* @__PURE__ */ s.jsx(Bm, { side: c, ...d, ref: r }) : /* @__PURE__ */ s.jsx(Sw, { side: c, ...d, ref: r }) });
  }
), Sw = y.forwardRef((n, r) => {
  const a = zi(Ms, n.__scopeTooltip), i = Bu(Ms, n.__scopeTooltip), c = y.useRef(null), d = yt(r, c), [p, f] = y.useState(null), { trigger: m, onClose: v } = a, g = c.current, { onPointerInTransitChange: x } = i, w = y.useCallback(() => {
    f(null), x(!1);
  }, [x]), k = y.useCallback(
    (S, j) => {
      const _ = S.currentTarget, P = { x: S.clientX, y: S.clientY }, T = Tw(P, _.getBoundingClientRect()), C = Rw(P, T), $ = Aw(j.getBoundingClientRect()), V = Mw([...C, ...$]);
      f(V), x(!0);
    },
    [x]
  );
  return y.useEffect(() => () => w(), [w]), y.useEffect(() => {
    if (m && g) {
      const S = (_) => k(_, g), j = (_) => k(_, m);
      return m.addEventListener("pointerleave", S), g.addEventListener("pointerleave", j), () => {
        m.removeEventListener("pointerleave", S), g.removeEventListener("pointerleave", j);
      };
    }
  }, [m, g, k, w]), y.useEffect(() => {
    if (p) {
      const S = (j) => {
        const _ = j.target, P = { x: j.clientX, y: j.clientY }, T = m?.contains(_) || g?.contains(_), C = !Fw(P, p);
        T ? w() : C && (w(), v());
      };
      return document.addEventListener("pointermove", S), () => document.removeEventListener("pointermove", S);
    }
  }, [m, g, p, v, w]), /* @__PURE__ */ s.jsx(Bm, { ...n, ref: d });
}), [Nw, Cw] = Ii(Lo, { isInside: !1 }), Pw = /* @__PURE__ */ hw("TooltipContent"), Bm = y.forwardRef(
  (n, r) => {
    const {
      __scopeTooltip: a,
      children: i,
      "aria-label": c,
      onEscapeKeyDown: d,
      onPointerDownOutside: p,
      ...f
    } = n, m = zi(Ms, a), v = Oi(a), { onClose: g } = m;
    return y.useEffect(() => (document.addEventListener(lu, g), () => document.removeEventListener(lu, g)), [g]), y.useEffect(() => {
      if (m.trigger) {
        const x = (w) => {
          w.target?.contains(m.trigger) && g();
        };
        return window.addEventListener("scroll", x, { capture: !0 }), () => window.removeEventListener("scroll", x, { capture: !0 });
      }
    }, [m.trigger, g]), /* @__PURE__ */ s.jsx(
      Ru,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: d,
        onPointerDownOutside: p,
        onFocusOutside: (x) => x.preventDefault(),
        onDismiss: g,
        children: /* @__PURE__ */ s.jsxs(
          Rm,
          {
            "data-state": m.stateAttribute,
            ...v,
            ...f,
            ref: r,
            style: {
              ...f.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ s.jsx(Pw, { children: i }),
              /* @__PURE__ */ s.jsx(Nw, { scope: a, isInside: !0, children: /* @__PURE__ */ s.jsx(yw, { id: m.contentId, role: "tooltip", children: c || i }) })
            ]
          }
        )
      }
    );
  }
);
zm.displayName = Ms;
var Wm = "TooltipArrow", Ew = y.forwardRef(
  (n, r) => {
    const { __scopeTooltip: a, ...i } = n, c = Oi(a);
    return Cw(
      Wm,
      a
    ).isInside ? null : /* @__PURE__ */ s.jsx(Am, { ...c, ...i, ref: r });
  }
);
Ew.displayName = Wm;
function Tw(n, r) {
  const a = Math.abs(r.top - n.y), i = Math.abs(r.bottom - n.y), c = Math.abs(r.right - n.x), d = Math.abs(r.left - n.x);
  switch (Math.min(a, i, c, d)) {
    case d:
      return "left";
    case c:
      return "right";
    case a:
      return "top";
    case i:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function Rw(n, r, a = 5) {
  const i = [];
  switch (r) {
    case "top":
      i.push(
        { x: n.x - a, y: n.y + a },
        { x: n.x + a, y: n.y + a }
      );
      break;
    case "bottom":
      i.push(
        { x: n.x - a, y: n.y - a },
        { x: n.x + a, y: n.y - a }
      );
      break;
    case "left":
      i.push(
        { x: n.x + a, y: n.y - a },
        { x: n.x + a, y: n.y + a }
      );
      break;
    case "right":
      i.push(
        { x: n.x - a, y: n.y - a },
        { x: n.x - a, y: n.y + a }
      );
      break;
  }
  return i;
}
function Aw(n) {
  const { top: r, right: a, bottom: i, left: c } = n;
  return [
    { x: c, y: r },
    { x: a, y: r },
    { x: a, y: i },
    { x: c, y: i }
  ];
}
function Fw(n, r) {
  const { x: a, y: i } = n;
  let c = !1;
  for (let d = 0, p = r.length - 1; d < r.length; p = d++) {
    const f = r[d], m = r[p], v = f.x, g = f.y, x = m.x, w = m.y;
    g > i != w > i && a < (x - v) * (i - g) / (w - g) + v && (c = !c);
  }
  return c;
}
function Mw(n) {
  const r = n.slice();
  return r.sort((a, i) => a.x < i.x ? -1 : a.x > i.x ? 1 : a.y < i.y ? -1 : a.y > i.y ? 1 : 0), $w(r);
}
function $w(n) {
  if (n.length <= 1) return n.slice();
  const r = [];
  for (let i = 0; i < n.length; i++) {
    const c = n[i];
    for (; r.length >= 2; ) {
      const d = r[r.length - 1], p = r[r.length - 2];
      if ((d.x - p.x) * (c.y - p.y) >= (d.y - p.y) * (c.x - p.x)) r.pop();
      else break;
    }
    r.push(c);
  }
  r.pop();
  const a = [];
  for (let i = n.length - 1; i >= 0; i--) {
    const c = n[i];
    for (; a.length >= 2; ) {
      const d = a[a.length - 1], p = a[a.length - 2];
      if ((d.x - p.x) * (c.y - p.y) >= (d.y - p.y) * (c.x - p.x)) a.pop();
      else break;
    }
    a.push(c);
  }
  return a.pop(), r.length === 1 && a.length === 1 && r[0].x === a[0].x && r[0].y === a[0].y ? r : r.concat(a);
}
var Lw = Dm, Dw = Im, Iw = Om, Um = zm;
function Hm(n) {
  var r, a, i = "";
  if (typeof n == "string" || typeof n == "number") i += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (r = 0; r < c; r++) n[r] && (a = Hm(n[r])) && (i && (i += " "), i += a);
  } else for (a in n) n[a] && (i && (i += " "), i += a);
  return i;
}
function Vm() {
  for (var n, r, a = 0, i = "", c = arguments.length; a < c; a++) (n = arguments[a]) && (r = Hm(n)) && (i && (i += " "), i += r);
  return i;
}
const Wu = "-", Ow = (n) => {
  const r = Bw(n), {
    conflictingClassGroups: a,
    conflictingClassGroupModifiers: i
  } = n;
  return {
    getClassGroupId: (p) => {
      const f = p.split(Wu);
      return f[0] === "" && f.length !== 1 && f.shift(), Gm(f, r) || zw(p);
    },
    getConflictingClassGroupIds: (p, f) => {
      const m = a[p] || [];
      return f && i[p] ? [...m, ...i[p]] : m;
    }
  };
}, Gm = (n, r) => {
  if (n.length === 0)
    return r.classGroupId;
  const a = n[0], i = r.nextPart.get(a), c = i ? Gm(n.slice(1), i) : void 0;
  if (c)
    return c;
  if (r.validators.length === 0)
    return;
  const d = n.join(Wu);
  return r.validators.find(({
    validator: p
  }) => p(d))?.classGroupId;
}, fh = /^\[(.+)\]$/, zw = (n) => {
  if (fh.test(n)) {
    const r = fh.exec(n)[1], a = r?.substring(0, r.indexOf(":"));
    if (a)
      return "arbitrary.." + a;
  }
}, Bw = (n) => {
  const {
    theme: r,
    prefix: a
  } = n, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Uw(Object.entries(n.classGroups), a).forEach(([d, p]) => {
    uu(p, i, d, r);
  }), i;
}, uu = (n, r, a, i) => {
  n.forEach((c) => {
    if (typeof c == "string") {
      const d = c === "" ? r : ph(r, c);
      d.classGroupId = a;
      return;
    }
    if (typeof c == "function") {
      if (Ww(c)) {
        uu(c(i), r, a, i);
        return;
      }
      r.validators.push({
        validator: c,
        classGroupId: a
      });
      return;
    }
    Object.entries(c).forEach(([d, p]) => {
      uu(p, ph(r, d), a, i);
    });
  });
}, ph = (n, r) => {
  let a = n;
  return r.split(Wu).forEach((i) => {
    a.nextPart.has(i) || a.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), a = a.nextPart.get(i);
  }), a;
}, Ww = (n) => n.isThemeGetter, Uw = (n, r) => r ? n.map(([a, i]) => {
  const c = i.map((d) => typeof d == "string" ? r + d : typeof d == "object" ? Object.fromEntries(Object.entries(d).map(([p, f]) => [r + p, f])) : d);
  return [a, c];
}) : n, Hw = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const c = (d, p) => {
    a.set(d, p), r++, r > n && (r = 0, i = a, a = /* @__PURE__ */ new Map());
  };
  return {
    get(d) {
      let p = a.get(d);
      if (p !== void 0)
        return p;
      if ((p = i.get(d)) !== void 0)
        return c(d, p), p;
    },
    set(d, p) {
      a.has(d) ? a.set(d, p) : c(d, p);
    }
  };
}, Qm = "!", Vw = (n) => {
  const {
    separator: r,
    experimentalParseClassName: a
  } = n, i = r.length === 1, c = r[0], d = r.length, p = (f) => {
    const m = [];
    let v = 0, g = 0, x;
    for (let _ = 0; _ < f.length; _++) {
      let P = f[_];
      if (v === 0) {
        if (P === c && (i || f.slice(_, _ + d) === r)) {
          m.push(f.slice(g, _)), g = _ + d;
          continue;
        }
        if (P === "/") {
          x = _;
          continue;
        }
      }
      P === "[" ? v++ : P === "]" && v--;
    }
    const w = m.length === 0 ? f : f.substring(g), k = w.startsWith(Qm), S = k ? w.substring(1) : w, j = x && x > g ? x - g : void 0;
    return {
      modifiers: m,
      hasImportantModifier: k,
      baseClassName: S,
      maybePostfixModifierPosition: j
    };
  };
  return a ? (f) => a({
    className: f,
    parseClassName: p
  }) : p;
}, Gw = (n) => {
  if (n.length <= 1)
    return n;
  const r = [];
  let a = [];
  return n.forEach((i) => {
    i[0] === "[" ? (r.push(...a.sort(), i), a = []) : a.push(i);
  }), r.push(...a.sort()), r;
}, Qw = (n) => ({
  cache: Hw(n.cacheSize),
  parseClassName: Vw(n),
  ...Ow(n)
}), Kw = /\s+/, Yw = (n, r) => {
  const {
    parseClassName: a,
    getClassGroupId: i,
    getConflictingClassGroupIds: c
  } = r, d = [], p = n.trim().split(Kw);
  let f = "";
  for (let m = p.length - 1; m >= 0; m -= 1) {
    const v = p[m], {
      modifiers: g,
      hasImportantModifier: x,
      baseClassName: w,
      maybePostfixModifierPosition: k
    } = a(v);
    let S = !!k, j = i(S ? w.substring(0, k) : w);
    if (!j) {
      if (!S) {
        f = v + (f.length > 0 ? " " + f : f);
        continue;
      }
      if (j = i(w), !j) {
        f = v + (f.length > 0 ? " " + f : f);
        continue;
      }
      S = !1;
    }
    const _ = Gw(g).join(":"), P = x ? _ + Qm : _, T = P + j;
    if (d.includes(T))
      continue;
    d.push(T);
    const C = c(j, S);
    for (let $ = 0; $ < C.length; ++$) {
      const V = C[$];
      d.push(P + V);
    }
    f = v + (f.length > 0 ? " " + f : f);
  }
  return f;
};
function qw() {
  let n = 0, r, a, i = "";
  for (; n < arguments.length; )
    (r = arguments[n++]) && (a = Km(r)) && (i && (i += " "), i += a);
  return i;
}
const Km = (n) => {
  if (typeof n == "string")
    return n;
  let r, a = "";
  for (let i = 0; i < n.length; i++)
    n[i] && (r = Km(n[i])) && (a && (a += " "), a += r);
  return a;
};
function Xw(n, ...r) {
  let a, i, c, d = p;
  function p(m) {
    const v = r.reduce((g, x) => x(g), n());
    return a = Qw(v), i = a.cache.get, c = a.cache.set, d = f, f(m);
  }
  function f(m) {
    const v = i(m);
    if (v)
      return v;
    const g = Yw(m, a);
    return c(m, g), g;
  }
  return function() {
    return d(qw.apply(null, arguments));
  };
}
const it = (n) => {
  const r = (a) => a[n] || [];
  return r.isThemeGetter = !0, r;
}, Ym = /^\[(?:([a-z-]+):)?(.+)\]$/i, Zw = /^\d+\/\d+$/, Jw = /* @__PURE__ */ new Set(["px", "full", "screen"]), eb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, tb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, nb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, rb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, sb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Un = (n) => Rs(n) || Jw.has(n) || Zw.test(n), xr = (n) => zs(n, "length", fb), Rs = (n) => !!n && !Number.isNaN(Number(n)), zc = (n) => zs(n, "number", Rs), Co = (n) => !!n && Number.isInteger(Number(n)), ob = (n) => n.endsWith("%") && Rs(n.slice(0, -1)), Oe = (n) => Ym.test(n), vr = (n) => eb.test(n), ab = /* @__PURE__ */ new Set(["length", "size", "percentage"]), ib = (n) => zs(n, ab, qm), lb = (n) => zs(n, "position", qm), cb = /* @__PURE__ */ new Set(["image", "url"]), ub = (n) => zs(n, cb, hb), db = (n) => zs(n, "", pb), Po = () => !0, zs = (n, r, a) => {
  const i = Ym.exec(n);
  return i ? i[1] ? typeof r == "string" ? i[1] === r : r.has(i[1]) : a(i[2]) : !1;
}, fb = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  tb.test(n) && !nb.test(n)
), qm = () => !1, pb = (n) => rb.test(n), hb = (n) => sb.test(n), mb = () => {
  const n = it("colors"), r = it("spacing"), a = it("blur"), i = it("brightness"), c = it("borderColor"), d = it("borderRadius"), p = it("borderSpacing"), f = it("borderWidth"), m = it("contrast"), v = it("grayscale"), g = it("hueRotate"), x = it("invert"), w = it("gap"), k = it("gradientColorStops"), S = it("gradientColorStopPositions"), j = it("inset"), _ = it("margin"), P = it("opacity"), T = it("padding"), C = it("saturate"), $ = it("scale"), V = it("sepia"), Z = it("skew"), H = it("space"), L = it("translate"), re = () => ["auto", "contain", "none"], I = () => ["auto", "hidden", "clip", "visible", "scroll"], K = () => ["auto", Oe, r], B = () => [Oe, r], G = () => ["", Un, xr], M = () => ["auto", Rs, Oe], Y = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], X = () => ["solid", "dashed", "dotted", "double", "none"], te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], D = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], ne = () => ["", "0", Oe], J = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], A = () => [Rs, Oe];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Po],
      spacing: [Un, xr],
      blur: ["none", "", vr, Oe],
      brightness: A(),
      borderColor: [n],
      borderRadius: ["none", "", "full", vr, Oe],
      borderSpacing: B(),
      borderWidth: G(),
      contrast: A(),
      grayscale: ne(),
      hueRotate: A(),
      invert: ne(),
      gap: B(),
      gradientColorStops: [n],
      gradientColorStopPositions: [ob, xr],
      inset: K(),
      margin: K(),
      opacity: A(),
      padding: B(),
      saturate: A(),
      scale: A(),
      sepia: ne(),
      skew: A(),
      space: B(),
      translate: B()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", Oe]
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
        columns: [vr]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": J()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": J()
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
        object: [...Y(), Oe]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: I()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": I()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": I()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: re()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": re()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": re()
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
        inset: [j]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [j]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [j]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [j]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [j]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [j]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [j]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [j]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [j]
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
        z: ["auto", Co, Oe]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: K()
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
        flex: ["1", "auto", "initial", "none", Oe]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ne()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ne()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Co, Oe]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Po]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Co, Oe]
        }, Oe]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": M()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": M()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Po]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Co, Oe]
        }, Oe]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": M()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": M()
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
        "auto-cols": ["auto", "min", "max", "fr", Oe]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", Oe]
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
        justify: ["normal", ...D()]
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
        content: ["normal", ...D(), "baseline"]
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
        "place-content": [...D(), "baseline"]
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
        p: [T]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [T]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [T]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [T]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [T]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [T]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [T]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [T]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [T]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [_]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [_]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [_]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [_]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [_]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [_]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [_]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [_]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [_]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [H]
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
        "space-y": [H]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Oe, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [Oe, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [Oe, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [vr]
        }, vr]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [Oe, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [Oe, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [Oe, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [Oe, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", vr, xr]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", zc]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Po]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Oe]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Rs, zc]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Un, Oe]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Oe]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", Oe]
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
        placeholder: [n]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [P]
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
        text: [n]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [P]
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
        decoration: [...X(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Un, xr]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Un, Oe]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [n]
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
        indent: B()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Oe]
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
        content: ["none", Oe]
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
        "bg-opacity": [P]
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
        bg: [...Y(), lb]
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
        bg: ["auto", "cover", "contain", ib]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ub]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [n]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [S]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [S]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [S]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [k]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [k]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [k]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [d]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [d]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [d]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [d]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [d]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [d]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [d]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [d]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [d]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [d]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [d]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [d]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [d]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [d]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [d]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [f]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [f]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [f]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [f]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [f]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [f]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [f]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [f]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [f]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [P]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...X(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [f]
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
        "divide-y": [f]
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
        "divide-opacity": [P]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: X()
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
        outline: ["", ...X()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Un, Oe]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Un, xr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [n]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: G()
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
        ring: [n]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [P]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Un, xr]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [n]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", vr, db]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Po]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [P]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...te(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": te()
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
        blur: [a]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [i]
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
        "drop-shadow": ["", "none", vr, Oe]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [v]
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
        invert: [x]
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
        sepia: [V]
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
        "backdrop-blur": [a]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [i]
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
        "backdrop-grayscale": [v]
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
        "backdrop-invert": [x]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [P]
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
        "backdrop-sepia": [V]
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
        "border-spacing": [p]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [p]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [p]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Oe]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: A()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", Oe]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: A()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", Oe]
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
        scale: [$]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [$]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [$]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Co, Oe]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [L]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [L]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [Z]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [Z]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Oe]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", n]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Oe]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [n]
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
        "scroll-m": B()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": B()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": B()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": B()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": B()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": B()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": B()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": B()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": B()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": B()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": B()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": B()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": B()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": B()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": B()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": B()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": B()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": B()
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
        "will-change": ["auto", "scroll", "contents", "transform", Oe]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [n, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Un, xr, zc]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [n, "none"]
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
}, gb = /* @__PURE__ */ Xw(mb);
function mt(...n) {
  return gb(Vm(n));
}
const wr = Lw, Vr = Dw, Gr = Iw, br = y.forwardRef(({ className: n, sideOffset: r = 4, ...a }, i) => /* @__PURE__ */ s.jsx(
  Um,
  {
    ref: i,
    sideOffset: r,
    className: mt(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      n
    ),
    ...a
  }
));
br.displayName = Um.displayName;
const hh = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, mh = Vm, Xm = (n, r) => (a) => {
  var i;
  if (r?.variants == null) return mh(n, a?.class, a?.className);
  const { variants: c, defaultVariants: d } = r, p = Object.keys(c).map((v) => {
    const g = a?.[v], x = d?.[v];
    if (g === null) return null;
    const w = hh(g) || hh(x);
    return c[v][w];
  }), f = a && Object.entries(a).reduce((v, g) => {
    let [x, w] = g;
    return w === void 0 || (v[x] = w), v;
  }, {}), m = r == null || (i = r.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((v, g) => {
    let { class: x, className: w, ...k } = g;
    return Object.entries(k).every((S) => {
      let [j, _] = S;
      return Array.isArray(_) ? _.includes({
        ...d,
        ...f
      }[j]) : {
        ...d,
        ...f
      }[j] === _;
    }) ? [
      ...v,
      x,
      w
    ] : v;
  }, []);
  return mh(n, p, m, a?.class, a?.className);
}, xb = Xm(
  // Whitespace-nowrap: Badges should never wrap.
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate ",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-xs",
        outline: " border [border-color:var(--badge-outline)] shadow-xs"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function fn({ className: n, variant: r, ...a }) {
  return /* @__PURE__ */ s.jsx("div", { className: mt(xb({ variant: r }), n), ...a });
}
var vb = /* @__PURE__ */ Symbol.for("react.lazy"), Ni = Ri[" use ".trim().toString()];
function yb(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
function Zm(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === vb && "_payload" in n && yb(n._payload);
}
// @__NO_SIDE_EFFECTS__
function wb(n) {
  const r = /* @__PURE__ */ jb(n), a = y.forwardRef((i, c) => {
    let { children: d, ...p } = i;
    Zm(d) && typeof Ni == "function" && (d = Ni(d._payload));
    const f = y.Children.toArray(d), m = f.find(_b);
    if (m) {
      const v = m.props.children, g = f.map((x) => x === m ? y.Children.count(v) > 1 ? y.Children.only(null) : y.isValidElement(v) ? v.props.children : null : x);
      return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: y.isValidElement(v) ? y.cloneElement(v, void 0, g) : null });
    }
    return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: d });
  });
  return a.displayName = `${n}.Slot`, a;
}
var bb = /* @__PURE__ */ wb("Slot");
// @__NO_SIDE_EFFECTS__
function jb(n) {
  const r = y.forwardRef((a, i) => {
    let { children: c, ...d } = a;
    if (Zm(c) && typeof Ni == "function" && (c = Ni(c._payload)), y.isValidElement(c)) {
      const p = Nb(c), f = Sb(d, c.props);
      return c.type !== y.Fragment && (f.ref = i ? Bo(i, p) : p), y.cloneElement(c, f);
    }
    return y.Children.count(c) > 1 ? y.Children.only(null) : null;
  });
  return r.displayName = `${n}.SlotClone`, r;
}
var kb = /* @__PURE__ */ Symbol("radix.slottable");
function _b(n) {
  return y.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === kb;
}
function Sb(n, r) {
  const a = { ...r };
  for (const i in r) {
    const c = n[i], d = r[i];
    /^on[A-Z]/.test(i) ? c && d ? a[i] = (...f) => {
      const m = d(...f);
      return c(...f), m;
    } : c && (a[i] = c) : i === "style" ? a[i] = { ...c, ...d } : i === "className" && (a[i] = [c, d].filter(Boolean).join(" "));
  }
  return { ...n, ...a };
}
function Nb(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning;
  return a ? n.ref : (r = Object.getOwnPropertyDescriptor(n, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning, a ? n.props.ref : n.props.ref || n.ref);
}
const Cb = Xm(
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
), Ci = y.forwardRef(
  ({ className: n, variant: r, size: a, asChild: i = !1, ...c }, d) => {
    const p = i ? bb : "button";
    return /* @__PURE__ */ s.jsx(
      p,
      {
        className: mt(Cb({ variant: r, size: a, className: n })),
        ref: d,
        ...c
      }
    );
  }
);
Ci.displayName = "Button";
function Ve({
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s.jsx(
    "div",
    {
      className: mt("animate-pulse rounded-md bg-muted", n),
      ...r
    }
  );
}
const Pb = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Jm = (...n) => n.filter((r, a, i) => !!r && i.indexOf(r) === a).join(" ");
var Eb = {
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
const Tb = y.forwardRef(
  ({
    color: n = "currentColor",
    size: r = 24,
    strokeWidth: a = 2,
    absoluteStrokeWidth: i,
    className: c = "",
    children: d,
    iconNode: p,
    ...f
  }, m) => y.createElement(
    "svg",
    {
      ref: m,
      ...Eb,
      width: r,
      height: r,
      stroke: n,
      strokeWidth: i ? Number(a) * 24 / Number(r) : a,
      className: Jm("lucide", c),
      ...f
    },
    [
      ...p.map(([v, g]) => y.createElement(v, g)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
const He = (n, r) => {
  const a = y.forwardRef(
    ({ className: i, ...c }, d) => y.createElement(Tb, {
      ref: d,
      iconNode: r,
      className: Jm(`lucide-${Pb(n)}`, i),
      ...c
    })
  );
  return a.displayName = `${n}`, a;
};
const Ho = He("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
const du = He("ArrowDownRight", [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
]);
const Rb = He("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
const eg = He("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
const gh = He("ArrowUpDown", [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
]);
const Do = He("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
const Ab = He("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
const fu = He("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);
const Fb = He("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
const Mb = He("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const Uu = He("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const Hu = He("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const tg = He("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
const ng = He("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const $b = He("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
const pu = He("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
const Bi = He("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
const Lb = He("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
]);
const Qr = He("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
const Db = He("Keyboard", [
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
const rg = He("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
const Ib = He("RefreshCcw", [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
]);
const Ro = He("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const sg = He("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
const xh = He("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
const Ob = He("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
const og = He("Table", [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
]);
const zb = He("TrendingDown", [
  ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7", key: "1r2t7k" }],
  ["polyline", { points: "16 17 22 17 22 11", key: "11uiuu" }]
]);
const kr = He("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const Kr = He("TriangleAlert", [
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
const $s = He("Trophy", [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
]);
const Vu = He("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
const Bb = He("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
const Wb = He("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const es = He("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), ag = {
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
}, Gu = {
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
}, Ub = {
  QB: "Quarterback",
  RB: "Running Back",
  WR: "Wide Receiver",
  TE: "Tight End",
  K: "Kicker",
  DEF: "Defense"
}, Hb = {
  standard: "Standard",
  half: "Half-PPR",
  ppr: "PPR"
};
function Vb(n, r) {
  let a = 0;
  return a += (n.pass_yd ?? 0) * 0.04, a += (n.pass_td ?? 0) * 4, a += (n.pass_int ?? 0) * -1, a += (n.rush_yd ?? 0) * 0.1, a += (n.rush_td ?? 0) * 6, a += (n.rec_yd ?? 0) * 0.1, a += (n.rec_td ?? 0) * 6, a += (n.fgm ?? 0) * 3, a += (n.xpm ?? 0) * 1, r === "ppr" ? a += (n.rec ?? 0) * 1 : r === "half" && (a += (n.rec ?? 0) * 0.5), Math.round(a * 100) / 100;
}
function Gb(n, r) {
  return r === "ppr" ? n.pts_ppr : r === "half" && n.pts_half_ppr != null ? n.pts_half_ppr : Vb(n, r);
}
function vh(n, [r, a]) {
  return Math.min(a, Math.max(r, n));
}
// @__NO_SIDE_EFFECTS__
function yh(n) {
  const r = /* @__PURE__ */ Qb(n), a = y.forwardRef((i, c) => {
    const { children: d, ...p } = i, f = y.Children.toArray(d), m = f.find(Yb);
    if (m) {
      const v = m.props.children, g = f.map((x) => x === m ? y.Children.count(v) > 1 ? y.Children.only(null) : y.isValidElement(v) ? v.props.children : null : x);
      return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: y.isValidElement(v) ? y.cloneElement(v, void 0, g) : null });
    }
    return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: d });
  });
  return a.displayName = `${n}.Slot`, a;
}
// @__NO_SIDE_EFFECTS__
function Qb(n) {
  const r = y.forwardRef((a, i) => {
    const { children: c, ...d } = a;
    if (y.isValidElement(c)) {
      const p = Xb(c), f = qb(d, c.props);
      return c.type !== y.Fragment && (f.ref = i ? Bo(i, p) : p), y.cloneElement(c, f);
    }
    return y.Children.count(c) > 1 ? y.Children.only(null) : null;
  });
  return r.displayName = `${n}.SlotClone`, r;
}
var Kb = /* @__PURE__ */ Symbol("radix.slottable");
function Yb(n) {
  return y.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === Kb;
}
function qb(n, r) {
  const a = { ...r };
  for (const i in r) {
    const c = n[i], d = r[i];
    /^on[A-Z]/.test(i) ? c && d ? a[i] = (...f) => {
      const m = d(...f);
      return c(...f), m;
    } : c && (a[i] = c) : i === "style" ? a[i] = { ...c, ...d } : i === "className" && (a[i] = [c, d].filter(Boolean).join(" "));
  }
  return { ...n, ...a };
}
function Xb(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning;
  return a ? n.ref : (r = Object.getOwnPropertyDescriptor(n, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning, a ? n.props.ref : n.props.ref || n.ref);
}
function ig(n) {
  const r = n + "CollectionProvider", [a, i] = Ls(r), [c, d] = a(
    r,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), p = (j) => {
    const { scope: _, children: P } = j, T = yr.useRef(null), C = yr.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ s.jsx(c, { scope: _, itemMap: C, collectionRef: T, children: P });
  };
  p.displayName = r;
  const f = n + "CollectionSlot", m = /* @__PURE__ */ yh(f), v = yr.forwardRef(
    (j, _) => {
      const { scope: P, children: T } = j, C = d(f, P), $ = yt(_, C.collectionRef);
      return /* @__PURE__ */ s.jsx(m, { ref: $, children: T });
    }
  );
  v.displayName = f;
  const g = n + "CollectionItemSlot", x = "data-radix-collection-item", w = /* @__PURE__ */ yh(g), k = yr.forwardRef(
    (j, _) => {
      const { scope: P, children: T, ...C } = j, $ = yr.useRef(null), V = yt(_, $), Z = d(g, P);
      return yr.useEffect(() => (Z.itemMap.set($, { ref: $, ...C }), () => {
        Z.itemMap.delete($);
      })), /* @__PURE__ */ s.jsx(w, { [x]: "", ref: V, children: T });
    }
  );
  k.displayName = g;
  function S(j) {
    const _ = d(n + "CollectionConsumer", j);
    return yr.useCallback(() => {
      const T = _.collectionRef.current;
      if (!T) return [];
      const C = Array.from(T.querySelectorAll(`[${x}]`));
      return Array.from(_.itemMap.values()).sort(
        (Z, H) => C.indexOf(Z.ref.current) - C.indexOf(H.ref.current)
      );
    }, [_.collectionRef, _.itemMap]);
  }
  return [
    { Provider: p, Slot: v, ItemSlot: k },
    S,
    i
  ];
}
var Zb = y.createContext(void 0);
function Qu(n) {
  const r = y.useContext(Zb);
  return n || r || "ltr";
}
var Bc = 0;
function Jb() {
  y.useEffect(() => {
    const n = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", n[0] ?? wh()), document.body.insertAdjacentElement("beforeend", n[1] ?? wh()), Bc++, () => {
      Bc === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((r) => r.remove()), Bc--;
    };
  }, []);
}
function wh() {
  const n = document.createElement("span");
  return n.setAttribute("data-radix-focus-guard", ""), n.tabIndex = 0, n.style.outline = "none", n.style.opacity = "0", n.style.position = "fixed", n.style.pointerEvents = "none", n;
}
var Wc = "focusScope.autoFocusOnMount", Uc = "focusScope.autoFocusOnUnmount", bh = { bubbles: !1, cancelable: !0 }, ej = "FocusScope", lg = y.forwardRef((n, r) => {
  const {
    loop: a = !1,
    trapped: i = !1,
    onMountAutoFocus: c,
    onUnmountAutoFocus: d,
    ...p
  } = n, [f, m] = y.useState(null), v = Sr(c), g = Sr(d), x = y.useRef(null), w = yt(r, (j) => m(j)), k = y.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  y.useEffect(() => {
    if (i) {
      let j = function(C) {
        if (k.paused || !f) return;
        const $ = C.target;
        f.contains($) ? x.current = $ : jr(x.current, { select: !0 });
      }, _ = function(C) {
        if (k.paused || !f) return;
        const $ = C.relatedTarget;
        $ !== null && (f.contains($) || jr(x.current, { select: !0 }));
      }, P = function(C) {
        if (document.activeElement === document.body)
          for (const V of C)
            V.removedNodes.length > 0 && jr(f);
      };
      document.addEventListener("focusin", j), document.addEventListener("focusout", _);
      const T = new MutationObserver(P);
      return f && T.observe(f, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", j), document.removeEventListener("focusout", _), T.disconnect();
      };
    }
  }, [i, f, k.paused]), y.useEffect(() => {
    if (f) {
      kh.add(k);
      const j = document.activeElement;
      if (!f.contains(j)) {
        const P = new CustomEvent(Wc, bh);
        f.addEventListener(Wc, v), f.dispatchEvent(P), P.defaultPrevented || (tj(aj(cg(f)), { select: !0 }), document.activeElement === j && jr(f));
      }
      return () => {
        f.removeEventListener(Wc, v), setTimeout(() => {
          const P = new CustomEvent(Uc, bh);
          f.addEventListener(Uc, g), f.dispatchEvent(P), P.defaultPrevented || jr(j ?? document.body, { select: !0 }), f.removeEventListener(Uc, g), kh.remove(k);
        }, 0);
      };
    }
  }, [f, v, g, k]);
  const S = y.useCallback(
    (j) => {
      if (!a && !i || k.paused) return;
      const _ = j.key === "Tab" && !j.altKey && !j.ctrlKey && !j.metaKey, P = document.activeElement;
      if (_ && P) {
        const T = j.currentTarget, [C, $] = nj(T);
        C && $ ? !j.shiftKey && P === $ ? (j.preventDefault(), a && jr(C, { select: !0 })) : j.shiftKey && P === C && (j.preventDefault(), a && jr($, { select: !0 })) : P === T && j.preventDefault();
      }
    },
    [a, i, k.paused]
  );
  return /* @__PURE__ */ s.jsx(et.div, { tabIndex: -1, ...p, ref: w, onKeyDown: S });
});
lg.displayName = ej;
function tj(n, { select: r = !1 } = {}) {
  const a = document.activeElement;
  for (const i of n)
    if (jr(i, { select: r }), document.activeElement !== a) return;
}
function nj(n) {
  const r = cg(n), a = jh(r, n), i = jh(r.reverse(), n);
  return [a, i];
}
function cg(n) {
  const r = [], a = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (i) => {
      const c = i.tagName === "INPUT" && i.type === "hidden";
      return i.disabled || i.hidden || c ? NodeFilter.FILTER_SKIP : i.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; a.nextNode(); ) r.push(a.currentNode);
  return r;
}
function jh(n, r) {
  for (const a of n)
    if (!rj(a, { upTo: r })) return a;
}
function rj(n, { upTo: r }) {
  if (getComputedStyle(n).visibility === "hidden") return !0;
  for (; n; ) {
    if (r !== void 0 && n === r) return !1;
    if (getComputedStyle(n).display === "none") return !0;
    n = n.parentElement;
  }
  return !1;
}
function sj(n) {
  return n instanceof HTMLInputElement && "select" in n;
}
function jr(n, { select: r = !1 } = {}) {
  if (n && n.focus) {
    const a = document.activeElement;
    n.focus({ preventScroll: !0 }), n !== a && sj(n) && r && n.select();
  }
}
var kh = oj();
function oj() {
  let n = [];
  return {
    add(r) {
      const a = n[0];
      r !== a && a?.pause(), n = _h(n, r), n.unshift(r);
    },
    remove(r) {
      n = _h(n, r), n[0]?.resume();
    }
  };
}
function _h(n, r) {
  const a = [...n], i = a.indexOf(r);
  return i !== -1 && a.splice(i, 1), a;
}
function aj(n) {
  return n.filter((r) => r.tagName !== "A");
}
// @__NO_SIDE_EFFECTS__
function ij(n) {
  const r = /* @__PURE__ */ lj(n), a = y.forwardRef((i, c) => {
    const { children: d, ...p } = i, f = y.Children.toArray(d), m = f.find(uj);
    if (m) {
      const v = m.props.children, g = f.map((x) => x === m ? y.Children.count(v) > 1 ? y.Children.only(null) : y.isValidElement(v) ? v.props.children : null : x);
      return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: y.isValidElement(v) ? y.cloneElement(v, void 0, g) : null });
    }
    return /* @__PURE__ */ s.jsx(r, { ...p, ref: c, children: d });
  });
  return a.displayName = `${n}.Slot`, a;
}
// @__NO_SIDE_EFFECTS__
function lj(n) {
  const r = y.forwardRef((a, i) => {
    const { children: c, ...d } = a;
    if (y.isValidElement(c)) {
      const p = fj(c), f = dj(d, c.props);
      return c.type !== y.Fragment && (f.ref = i ? Bo(i, p) : p), y.cloneElement(c, f);
    }
    return y.Children.count(c) > 1 ? y.Children.only(null) : null;
  });
  return r.displayName = `${n}.SlotClone`, r;
}
var cj = /* @__PURE__ */ Symbol("radix.slottable");
function uj(n) {
  return y.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === cj;
}
function dj(n, r) {
  const a = { ...r };
  for (const i in r) {
    const c = n[i], d = r[i];
    /^on[A-Z]/.test(i) ? c && d ? a[i] = (...f) => {
      const m = d(...f);
      return c(...f), m;
    } : c && (a[i] = c) : i === "style" ? a[i] = { ...c, ...d } : i === "className" && (a[i] = [c, d].filter(Boolean).join(" "));
  }
  return { ...n, ...a };
}
function fj(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning;
  return a ? n.ref : (r = Object.getOwnPropertyDescriptor(n, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning, a ? n.props.ref : n.props.ref || n.ref);
}
function pj(n) {
  const r = y.useRef({ value: n, previous: n });
  return y.useMemo(() => (r.current.value !== n && (r.current.previous = r.current.value, r.current.value = n), r.current.previous), [n]);
}
var hj = function(n) {
  if (typeof document > "u")
    return null;
  var r = Array.isArray(n) ? n[0] : n;
  return r.ownerDocument.body;
}, Cs = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), ui = {}, Hc = 0, ug = function(n) {
  return n && (n.host || ug(n.parentNode));
}, mj = function(n, r) {
  return r.map(function(a) {
    if (n.contains(a))
      return a;
    var i = ug(a);
    return i && n.contains(i) ? i : (console.error("aria-hidden", a, "in not contained inside", n, ". Doing nothing"), null);
  }).filter(function(a) {
    return !!a;
  });
}, gj = function(n, r, a, i) {
  var c = mj(r, Array.isArray(n) ? n : [n]);
  ui[a] || (ui[a] = /* @__PURE__ */ new WeakMap());
  var d = ui[a], p = [], f = /* @__PURE__ */ new Set(), m = new Set(c), v = function(x) {
    !x || f.has(x) || (f.add(x), v(x.parentNode));
  };
  c.forEach(v);
  var g = function(x) {
    !x || m.has(x) || Array.prototype.forEach.call(x.children, function(w) {
      if (f.has(w))
        g(w);
      else
        try {
          var k = w.getAttribute(i), S = k !== null && k !== "false", j = (Cs.get(w) || 0) + 1, _ = (d.get(w) || 0) + 1;
          Cs.set(w, j), d.set(w, _), p.push(w), j === 1 && S && ci.set(w, !0), _ === 1 && w.setAttribute(a, "true"), S || w.setAttribute(i, "true");
        } catch (P) {
          console.error("aria-hidden: cannot operate on ", w, P);
        }
    });
  };
  return g(r), f.clear(), Hc++, function() {
    p.forEach(function(x) {
      var w = Cs.get(x) - 1, k = d.get(x) - 1;
      Cs.set(x, w), d.set(x, k), w || (ci.has(x) || x.removeAttribute(i), ci.delete(x)), k || x.removeAttribute(a);
    }), Hc--, Hc || (Cs = /* @__PURE__ */ new WeakMap(), Cs = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), ui = {});
  };
}, xj = function(n, r, a) {
  a === void 0 && (a = "data-aria-hidden");
  var i = Array.from(Array.isArray(n) ? n : [n]), c = hj(n);
  return c ? (i.push.apply(i, Array.from(c.querySelectorAll("[aria-live]"))), gj(i, c, a, "aria-hidden")) : function() {
    return null;
  };
}, En = function() {
  return En = Object.assign || function(r) {
    for (var a, i = 1, c = arguments.length; i < c; i++) {
      a = arguments[i];
      for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && (r[d] = a[d]);
    }
    return r;
  }, En.apply(this, arguments);
};
function dg(n, r) {
  var a = {};
  for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && r.indexOf(i) < 0 && (a[i] = n[i]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var c = 0, i = Object.getOwnPropertySymbols(n); c < i.length; c++)
      r.indexOf(i[c]) < 0 && Object.prototype.propertyIsEnumerable.call(n, i[c]) && (a[i[c]] = n[i[c]]);
  return a;
}
function vj(n, r, a) {
  if (a || arguments.length === 2) for (var i = 0, c = r.length, d; i < c; i++)
    (d || !(i in r)) && (d || (d = Array.prototype.slice.call(r, 0, i)), d[i] = r[i]);
  return n.concat(d || Array.prototype.slice.call(r));
}
var mi = "right-scroll-bar-position", gi = "width-before-scroll-bar", yj = "with-scroll-bars-hidden", wj = "--removed-body-scroll-bar-size";
function Vc(n, r) {
  return typeof n == "function" ? n(r) : n && (n.current = r), n;
}
function bj(n, r) {
  var a = y.useState(function() {
    return {
      // value
      value: n,
      // last callback
      callback: r,
      // "memoized" public interface
      facade: {
        get current() {
          return a.value;
        },
        set current(i) {
          var c = a.value;
          c !== i && (a.value = i, a.callback(i, c));
        }
      }
    };
  })[0];
  return a.callback = r, a.facade;
}
var jj = typeof window < "u" ? y.useLayoutEffect : y.useEffect, Sh = /* @__PURE__ */ new WeakMap();
function kj(n, r) {
  var a = bj(null, function(i) {
    return n.forEach(function(c) {
      return Vc(c, i);
    });
  });
  return jj(function() {
    var i = Sh.get(a);
    if (i) {
      var c = new Set(i), d = new Set(n), p = a.current;
      c.forEach(function(f) {
        d.has(f) || Vc(f, null);
      }), d.forEach(function(f) {
        c.has(f) || Vc(f, p);
      });
    }
    Sh.set(a, n);
  }, [n]), a;
}
function _j(n) {
  return n;
}
function Sj(n, r) {
  r === void 0 && (r = _j);
  var a = [], i = !1, c = {
    read: function() {
      if (i)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return a.length ? a[a.length - 1] : n;
    },
    useMedium: function(d) {
      var p = r(d, i);
      return a.push(p), function() {
        a = a.filter(function(f) {
          return f !== p;
        });
      };
    },
    assignSyncMedium: function(d) {
      for (i = !0; a.length; ) {
        var p = a;
        a = [], p.forEach(d);
      }
      a = {
        push: function(f) {
          return d(f);
        },
        filter: function() {
          return a;
        }
      };
    },
    assignMedium: function(d) {
      i = !0;
      var p = [];
      if (a.length) {
        var f = a;
        a = [], f.forEach(d), p = a;
      }
      var m = function() {
        var g = p;
        p = [], g.forEach(d);
      }, v = function() {
        return Promise.resolve().then(m);
      };
      v(), a = {
        push: function(g) {
          p.push(g), v();
        },
        filter: function(g) {
          return p = p.filter(g), a;
        }
      };
    }
  };
  return c;
}
function Nj(n) {
  n === void 0 && (n = {});
  var r = Sj(null);
  return r.options = En({ async: !0, ssr: !1 }, n), r;
}
var fg = function(n) {
  var r = n.sideCar, a = dg(n, ["sideCar"]);
  if (!r)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var i = r.read();
  if (!i)
    throw new Error("Sidecar medium not found");
  return y.createElement(i, En({}, a));
};
fg.isSideCarExport = !0;
function Cj(n, r) {
  return n.useMedium(r), fg;
}
var pg = Nj(), Gc = function() {
}, Wi = y.forwardRef(function(n, r) {
  var a = y.useRef(null), i = y.useState({
    onScrollCapture: Gc,
    onWheelCapture: Gc,
    onTouchMoveCapture: Gc
  }), c = i[0], d = i[1], p = n.forwardProps, f = n.children, m = n.className, v = n.removeScrollBar, g = n.enabled, x = n.shards, w = n.sideCar, k = n.noIsolation, S = n.inert, j = n.allowPinchZoom, _ = n.as, P = _ === void 0 ? "div" : _, T = n.gapMode, C = dg(n, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), $ = w, V = kj([a, r]), Z = En(En({}, C), c);
  return y.createElement(
    y.Fragment,
    null,
    g && y.createElement($, { sideCar: pg, removeScrollBar: v, shards: x, noIsolation: k, inert: S, setCallbacks: d, allowPinchZoom: !!j, lockRef: a, gapMode: T }),
    p ? y.cloneElement(y.Children.only(f), En(En({}, Z), { ref: V })) : y.createElement(P, En({}, Z, { className: m, ref: V }), f)
  );
});
Wi.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Wi.classNames = {
  fullWidth: gi,
  zeroRight: mi
};
var Pj = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Ej() {
  if (!document)
    return null;
  var n = document.createElement("style");
  n.type = "text/css";
  var r = Pj();
  return r && n.setAttribute("nonce", r), n;
}
function Tj(n, r) {
  n.styleSheet ? n.styleSheet.cssText = r : n.appendChild(document.createTextNode(r));
}
function Rj(n) {
  var r = document.head || document.getElementsByTagName("head")[0];
  r.appendChild(n);
}
var Aj = function() {
  var n = 0, r = null;
  return {
    add: function(a) {
      n == 0 && (r = Ej()) && (Tj(r, a), Rj(r)), n++;
    },
    remove: function() {
      n--, !n && r && (r.parentNode && r.parentNode.removeChild(r), r = null);
    }
  };
}, Fj = function() {
  var n = Aj();
  return function(r, a) {
    y.useEffect(function() {
      return n.add(r), function() {
        n.remove();
      };
    }, [r && a]);
  };
}, hg = function() {
  var n = Fj(), r = function(a) {
    var i = a.styles, c = a.dynamic;
    return n(i, c), null;
  };
  return r;
}, Mj = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Qc = function(n) {
  return parseInt(n || "", 10) || 0;
}, $j = function(n) {
  var r = window.getComputedStyle(document.body), a = r[n === "padding" ? "paddingLeft" : "marginLeft"], i = r[n === "padding" ? "paddingTop" : "marginTop"], c = r[n === "padding" ? "paddingRight" : "marginRight"];
  return [Qc(a), Qc(i), Qc(c)];
}, Lj = function(n) {
  if (n === void 0 && (n = "margin"), typeof window > "u")
    return Mj;
  var r = $j(n), a = document.documentElement.clientWidth, i = window.innerWidth;
  return {
    left: r[0],
    top: r[1],
    right: r[2],
    gap: Math.max(0, i - a + r[2] - r[0])
  };
}, Dj = hg(), As = "data-scroll-locked", Ij = function(n, r, a, i) {
  var c = n.left, d = n.top, p = n.right, f = n.gap;
  return a === void 0 && (a = "margin"), `
  .`.concat(yj, ` {
   overflow: hidden `).concat(i, `;
   padding-right: `).concat(f, "px ").concat(i, `;
  }
  body[`).concat(As, `] {
    overflow: hidden `).concat(i, `;
    overscroll-behavior: contain;
    `).concat([
    r && "position: relative ".concat(i, ";"),
    a === "margin" && `
    padding-left: `.concat(c, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(p, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(f, "px ").concat(i, `;
    `),
    a === "padding" && "padding-right: ".concat(f, "px ").concat(i, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(mi, ` {
    right: `).concat(f, "px ").concat(i, `;
  }
  
  .`).concat(gi, ` {
    margin-right: `).concat(f, "px ").concat(i, `;
  }
  
  .`).concat(mi, " .").concat(mi, ` {
    right: 0 `).concat(i, `;
  }
  
  .`).concat(gi, " .").concat(gi, ` {
    margin-right: 0 `).concat(i, `;
  }
  
  body[`).concat(As, `] {
    `).concat(wj, ": ").concat(f, `px;
  }
`);
}, Nh = function() {
  var n = parseInt(document.body.getAttribute(As) || "0", 10);
  return isFinite(n) ? n : 0;
}, Oj = function() {
  y.useEffect(function() {
    return document.body.setAttribute(As, (Nh() + 1).toString()), function() {
      var n = Nh() - 1;
      n <= 0 ? document.body.removeAttribute(As) : document.body.setAttribute(As, n.toString());
    };
  }, []);
}, zj = function(n) {
  var r = n.noRelative, a = n.noImportant, i = n.gapMode, c = i === void 0 ? "margin" : i;
  Oj();
  var d = y.useMemo(function() {
    return Lj(c);
  }, [c]);
  return y.createElement(Dj, { styles: Ij(d, !r, c, a ? "" : "!important") });
}, hu = !1;
if (typeof window < "u")
  try {
    var di = Object.defineProperty({}, "passive", {
      get: function() {
        return hu = !0, !0;
      }
    });
    window.addEventListener("test", di, di), window.removeEventListener("test", di, di);
  } catch {
    hu = !1;
  }
var Ps = hu ? { passive: !1 } : !1, Bj = function(n) {
  return n.tagName === "TEXTAREA";
}, mg = function(n, r) {
  if (!(n instanceof Element))
    return !1;
  var a = window.getComputedStyle(n);
  return (
    // not-not-scrollable
    a[r] !== "hidden" && // contains scroll inside self
    !(a.overflowY === a.overflowX && !Bj(n) && a[r] === "visible")
  );
}, Wj = function(n) {
  return mg(n, "overflowY");
}, Uj = function(n) {
  return mg(n, "overflowX");
}, Ch = function(n, r) {
  var a = r.ownerDocument, i = r;
  do {
    typeof ShadowRoot < "u" && i instanceof ShadowRoot && (i = i.host);
    var c = gg(n, i);
    if (c) {
      var d = xg(n, i), p = d[1], f = d[2];
      if (p > f)
        return !0;
    }
    i = i.parentNode;
  } while (i && i !== a.body);
  return !1;
}, Hj = function(n) {
  var r = n.scrollTop, a = n.scrollHeight, i = n.clientHeight;
  return [
    r,
    a,
    i
  ];
}, Vj = function(n) {
  var r = n.scrollLeft, a = n.scrollWidth, i = n.clientWidth;
  return [
    r,
    a,
    i
  ];
}, gg = function(n, r) {
  return n === "v" ? Wj(r) : Uj(r);
}, xg = function(n, r) {
  return n === "v" ? Hj(r) : Vj(r);
}, Gj = function(n, r) {
  return n === "h" && r === "rtl" ? -1 : 1;
}, Qj = function(n, r, a, i, c) {
  var d = Gj(n, window.getComputedStyle(r).direction), p = d * i, f = a.target, m = r.contains(f), v = !1, g = p > 0, x = 0, w = 0;
  do {
    var k = xg(n, f), S = k[0], j = k[1], _ = k[2], P = j - _ - d * S;
    (S || P) && gg(n, f) && (x += P, w += S), f instanceof ShadowRoot ? f = f.host : f = f.parentNode;
  } while (
    // portaled content
    !m && f !== document.body || // self content
    m && (r.contains(f) || r === f)
  );
  return (g && Math.abs(x) < 1 || !g && Math.abs(w) < 1) && (v = !0), v;
}, fi = function(n) {
  return "changedTouches" in n ? [n.changedTouches[0].clientX, n.changedTouches[0].clientY] : [0, 0];
}, Ph = function(n) {
  return [n.deltaX, n.deltaY];
}, Eh = function(n) {
  return n && "current" in n ? n.current : n;
}, Kj = function(n, r) {
  return n[0] === r[0] && n[1] === r[1];
}, Yj = function(n) {
  return `
  .block-interactivity-`.concat(n, ` {pointer-events: none;}
  .allow-interactivity-`).concat(n, ` {pointer-events: all;}
`);
}, qj = 0, Es = [];
function Xj(n) {
  var r = y.useRef([]), a = y.useRef([0, 0]), i = y.useRef(), c = y.useState(qj++)[0], d = y.useState(hg)[0], p = y.useRef(n);
  y.useEffect(function() {
    p.current = n;
  }, [n]), y.useEffect(function() {
    if (n.inert) {
      document.body.classList.add("block-interactivity-".concat(c));
      var j = vj([n.lockRef.current], (n.shards || []).map(Eh), !0).filter(Boolean);
      return j.forEach(function(_) {
        return _.classList.add("allow-interactivity-".concat(c));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(c)), j.forEach(function(_) {
          return _.classList.remove("allow-interactivity-".concat(c));
        });
      };
    }
  }, [n.inert, n.lockRef.current, n.shards]);
  var f = y.useCallback(function(j, _) {
    if ("touches" in j && j.touches.length === 2 || j.type === "wheel" && j.ctrlKey)
      return !p.current.allowPinchZoom;
    var P = fi(j), T = a.current, C = "deltaX" in j ? j.deltaX : T[0] - P[0], $ = "deltaY" in j ? j.deltaY : T[1] - P[1], V, Z = j.target, H = Math.abs(C) > Math.abs($) ? "h" : "v";
    if ("touches" in j && H === "h" && Z.type === "range")
      return !1;
    var L = Ch(H, Z);
    if (!L)
      return !0;
    if (L ? V = H : (V = H === "v" ? "h" : "v", L = Ch(H, Z)), !L)
      return !1;
    if (!i.current && "changedTouches" in j && (C || $) && (i.current = V), !V)
      return !0;
    var re = i.current || V;
    return Qj(re, _, j, re === "h" ? C : $);
  }, []), m = y.useCallback(function(j) {
    var _ = j;
    if (!(!Es.length || Es[Es.length - 1] !== d)) {
      var P = "deltaY" in _ ? Ph(_) : fi(_), T = r.current.filter(function(V) {
        return V.name === _.type && (V.target === _.target || _.target === V.shadowParent) && Kj(V.delta, P);
      })[0];
      if (T && T.should) {
        _.cancelable && _.preventDefault();
        return;
      }
      if (!T) {
        var C = (p.current.shards || []).map(Eh).filter(Boolean).filter(function(V) {
          return V.contains(_.target);
        }), $ = C.length > 0 ? f(_, C[0]) : !p.current.noIsolation;
        $ && _.cancelable && _.preventDefault();
      }
    }
  }, []), v = y.useCallback(function(j, _, P, T) {
    var C = { name: j, delta: _, target: P, should: T, shadowParent: Zj(P) };
    r.current.push(C), setTimeout(function() {
      r.current = r.current.filter(function($) {
        return $ !== C;
      });
    }, 1);
  }, []), g = y.useCallback(function(j) {
    a.current = fi(j), i.current = void 0;
  }, []), x = y.useCallback(function(j) {
    v(j.type, Ph(j), j.target, f(j, n.lockRef.current));
  }, []), w = y.useCallback(function(j) {
    v(j.type, fi(j), j.target, f(j, n.lockRef.current));
  }, []);
  y.useEffect(function() {
    return Es.push(d), n.setCallbacks({
      onScrollCapture: x,
      onWheelCapture: x,
      onTouchMoveCapture: w
    }), document.addEventListener("wheel", m, Ps), document.addEventListener("touchmove", m, Ps), document.addEventListener("touchstart", g, Ps), function() {
      Es = Es.filter(function(j) {
        return j !== d;
      }), document.removeEventListener("wheel", m, Ps), document.removeEventListener("touchmove", m, Ps), document.removeEventListener("touchstart", g, Ps);
    };
  }, []);
  var k = n.removeScrollBar, S = n.inert;
  return y.createElement(
    y.Fragment,
    null,
    S ? y.createElement(d, { styles: Yj(c) }) : null,
    k ? y.createElement(zj, { gapMode: n.gapMode }) : null
  );
}
function Zj(n) {
  for (var r = null; n !== null; )
    n instanceof ShadowRoot && (r = n.host, n = n.host), n = n.parentNode;
  return r;
}
const Jj = Cj(pg, Xj);
var vg = y.forwardRef(function(n, r) {
  return y.createElement(Wi, En({}, n, { ref: r, sideCar: Jj }));
});
vg.classNames = Wi.classNames;
var ek = [" ", "Enter", "ArrowUp", "ArrowDown"], tk = [" ", "Enter"], ts = "Select", [Ui, Hi, nk] = ig(ts), [Bs] = Ls(ts, [
  nk,
  Di
]), Vi = Di(), [rk, Pr] = Bs(ts), [sk, ok] = Bs(ts), yg = (n) => {
  const {
    __scopeSelect: r,
    children: a,
    open: i,
    defaultOpen: c,
    onOpenChange: d,
    value: p,
    defaultValue: f,
    onValueChange: m,
    dir: v,
    name: g,
    autoComplete: x,
    disabled: w,
    required: k,
    form: S
  } = n, j = Vi(r), [_, P] = y.useState(null), [T, C] = y.useState(null), [$, V] = y.useState(!1), Z = Qu(v), [H, L] = $o({
    prop: i,
    defaultProp: c ?? !1,
    onChange: d,
    caller: ts
  }), [re, I] = $o({
    prop: p,
    defaultProp: f,
    onChange: m,
    caller: ts
  }), K = y.useRef(null), B = _ ? S || !!_.closest("form") : !0, [G, M] = y.useState(/* @__PURE__ */ new Set()), Y = Array.from(G).map((X) => X.props.value).join(";");
  return /* @__PURE__ */ s.jsx(Em, { ...j, children: /* @__PURE__ */ s.jsxs(
    rk,
    {
      required: k,
      scope: r,
      trigger: _,
      onTriggerChange: P,
      valueNode: T,
      onValueNodeChange: C,
      valueNodeHasChildren: $,
      onValueNodeHasChildrenChange: V,
      contentId: Ds(),
      value: re,
      onValueChange: I,
      open: H,
      onOpenChange: L,
      dir: Z,
      triggerPointerDownPosRef: K,
      disabled: w,
      children: [
        /* @__PURE__ */ s.jsx(Ui.Provider, { scope: r, children: /* @__PURE__ */ s.jsx(
          sk,
          {
            scope: n.__scopeSelect,
            onNativeOptionAdd: y.useCallback((X) => {
              M((te) => new Set(te).add(X));
            }, []),
            onNativeOptionRemove: y.useCallback((X) => {
              M((te) => {
                const D = new Set(te);
                return D.delete(X), D;
              });
            }, []),
            children: a
          }
        ) }),
        B ? /* @__PURE__ */ s.jsxs(
          Ug,
          {
            "aria-hidden": !0,
            required: k,
            tabIndex: -1,
            name: g,
            autoComplete: x,
            value: re,
            onChange: (X) => I(X.target.value),
            disabled: w,
            form: S,
            children: [
              re === void 0 ? /* @__PURE__ */ s.jsx("option", { value: "" }) : null,
              Array.from(G)
            ]
          },
          Y
        ) : null
      ]
    }
  ) });
};
yg.displayName = ts;
var wg = "SelectTrigger", bg = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, disabled: i = !1, ...c } = n, d = Vi(a), p = Pr(wg, a), f = p.disabled || i, m = yt(r, p.onTriggerChange), v = Hi(a), g = y.useRef("touch"), [x, w, k] = Vg((j) => {
      const _ = v().filter((C) => !C.disabled), P = _.find((C) => C.value === p.value), T = Gg(_, j, P);
      T !== void 0 && p.onValueChange(T.value);
    }), S = (j) => {
      f || (p.onOpenChange(!0), k()), j && (p.triggerPointerDownPosRef.current = {
        x: Math.round(j.pageX),
        y: Math.round(j.pageY)
      });
    };
    return /* @__PURE__ */ s.jsx(Tm, { asChild: !0, ...d, children: /* @__PURE__ */ s.jsx(
      et.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": p.contentId,
        "aria-expanded": p.open,
        "aria-required": p.required,
        "aria-autocomplete": "none",
        dir: p.dir,
        "data-state": p.open ? "open" : "closed",
        disabled: f,
        "data-disabled": f ? "" : void 0,
        "data-placeholder": Hg(p.value) ? "" : void 0,
        ...c,
        ref: m,
        onClick: Ue(c.onClick, (j) => {
          j.currentTarget.focus(), g.current !== "mouse" && S(j);
        }),
        onPointerDown: Ue(c.onPointerDown, (j) => {
          g.current = j.pointerType;
          const _ = j.target;
          _.hasPointerCapture(j.pointerId) && _.releasePointerCapture(j.pointerId), j.button === 0 && j.ctrlKey === !1 && j.pointerType === "mouse" && (S(j), j.preventDefault());
        }),
        onKeyDown: Ue(c.onKeyDown, (j) => {
          const _ = x.current !== "";
          !(j.ctrlKey || j.altKey || j.metaKey) && j.key.length === 1 && w(j.key), !(_ && j.key === " ") && ek.includes(j.key) && (S(), j.preventDefault());
        })
      }
    ) });
  }
);
bg.displayName = wg;
var jg = "SelectValue", kg = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, className: i, style: c, children: d, placeholder: p = "", ...f } = n, m = Pr(jg, a), { onValueNodeHasChildrenChange: v } = m, g = d !== void 0, x = yt(r, m.onValueNodeChange);
    return It(() => {
      v(g);
    }, [v, g]), /* @__PURE__ */ s.jsx(
      et.span,
      {
        ...f,
        ref: x,
        style: { pointerEvents: "none" },
        children: Hg(m.value) ? /* @__PURE__ */ s.jsx(s.Fragment, { children: p }) : d
      }
    );
  }
);
kg.displayName = jg;
var ak = "SelectIcon", _g = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, children: i, ...c } = n;
    return /* @__PURE__ */ s.jsx(et.span, { "aria-hidden": !0, ...c, ref: r, children: i || "▼" });
  }
);
_g.displayName = ak;
var ik = "SelectPortal", Sg = (n) => /* @__PURE__ */ s.jsx(Fm, { asChild: !0, ...n });
Sg.displayName = ik;
var ns = "SelectContent", Ng = y.forwardRef(
  (n, r) => {
    const a = Pr(ns, n.__scopeSelect), [i, c] = y.useState();
    if (It(() => {
      c(new DocumentFragment());
    }, []), !a.open) {
      const d = i;
      return d ? Wo.createPortal(
        /* @__PURE__ */ s.jsx(Cg, { scope: n.__scopeSelect, children: /* @__PURE__ */ s.jsx(Ui.Slot, { scope: n.__scopeSelect, children: /* @__PURE__ */ s.jsx("div", { children: n.children }) }) }),
        d
      ) : null;
    }
    return /* @__PURE__ */ s.jsx(Pg, { ...n, ref: r });
  }
);
Ng.displayName = ns;
var bn = 10, [Cg, Er] = Bs(ns), lk = "SelectContentImpl", ck = /* @__PURE__ */ ij("SelectContent.RemoveScroll"), Pg = y.forwardRef(
  (n, r) => {
    const {
      __scopeSelect: a,
      position: i = "item-aligned",
      onCloseAutoFocus: c,
      onEscapeKeyDown: d,
      onPointerDownOutside: p,
      //
      // PopperContent props
      side: f,
      sideOffset: m,
      align: v,
      alignOffset: g,
      arrowPadding: x,
      collisionBoundary: w,
      collisionPadding: k,
      sticky: S,
      hideWhenDetached: j,
      avoidCollisions: _,
      //
      ...P
    } = n, T = Pr(ns, a), [C, $] = y.useState(null), [V, Z] = y.useState(null), H = yt(r, (ce) => $(ce)), [L, re] = y.useState(null), [I, K] = y.useState(
      null
    ), B = Hi(a), [G, M] = y.useState(!1), Y = y.useRef(!1);
    y.useEffect(() => {
      if (C) return xj(C);
    }, [C]), Jb();
    const X = y.useCallback(
      (ce) => {
        const [z, ...oe] = B().map((Ae) => Ae.ref.current), [se] = oe.slice(-1), Pe = document.activeElement;
        for (const Ae of ce)
          if (Ae === Pe || (Ae?.scrollIntoView({ block: "nearest" }), Ae === z && V && (V.scrollTop = 0), Ae === se && V && (V.scrollTop = V.scrollHeight), Ae?.focus(), document.activeElement !== Pe)) return;
      },
      [B, V]
    ), te = y.useCallback(
      () => X([L, C]),
      [X, L, C]
    );
    y.useEffect(() => {
      G && te();
    }, [G, te]);
    const { onOpenChange: D, triggerPointerDownPosRef: ne } = T;
    y.useEffect(() => {
      if (C) {
        let ce = { x: 0, y: 0 };
        const z = (se) => {
          ce = {
            x: Math.abs(Math.round(se.pageX) - (ne.current?.x ?? 0)),
            y: Math.abs(Math.round(se.pageY) - (ne.current?.y ?? 0))
          };
        }, oe = (se) => {
          ce.x <= 10 && ce.y <= 10 ? se.preventDefault() : C.contains(se.target) || D(!1), document.removeEventListener("pointermove", z), ne.current = null;
        };
        return ne.current !== null && (document.addEventListener("pointermove", z), document.addEventListener("pointerup", oe, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", z), document.removeEventListener("pointerup", oe, { capture: !0 });
        };
      }
    }, [C, D, ne]), y.useEffect(() => {
      const ce = () => D(!1);
      return window.addEventListener("blur", ce), window.addEventListener("resize", ce), () => {
        window.removeEventListener("blur", ce), window.removeEventListener("resize", ce);
      };
    }, [D]);
    const [J, A] = Vg((ce) => {
      const z = B().filter((Pe) => !Pe.disabled), oe = z.find((Pe) => Pe.ref.current === document.activeElement), se = Gg(z, ce, oe);
      se && setTimeout(() => se.ref.current.focus());
    }), ee = y.useCallback(
      (ce, z, oe) => {
        const se = !Y.current && !oe;
        (T.value !== void 0 && T.value === z || se) && (re(ce), se && (Y.current = !0));
      },
      [T.value]
    ), ve = y.useCallback(() => C?.focus(), [C]), be = y.useCallback(
      (ce, z, oe) => {
        const se = !Y.current && !oe;
        (T.value !== void 0 && T.value === z || se) && K(ce);
      },
      [T.value]
    ), q = i === "popper" ? mu : Eg, de = q === mu ? {
      side: f,
      sideOffset: m,
      align: v,
      alignOffset: g,
      arrowPadding: x,
      collisionBoundary: w,
      collisionPadding: k,
      sticky: S,
      hideWhenDetached: j,
      avoidCollisions: _
    } : {};
    return /* @__PURE__ */ s.jsx(
      Cg,
      {
        scope: a,
        content: C,
        viewport: V,
        onViewportChange: Z,
        itemRefCallback: ee,
        selectedItem: L,
        onItemLeave: ve,
        itemTextRefCallback: be,
        focusSelectedItem: te,
        selectedItemText: I,
        position: i,
        isPositioned: G,
        searchRef: J,
        children: /* @__PURE__ */ s.jsx(vg, { as: ck, allowPinchZoom: !0, children: /* @__PURE__ */ s.jsx(
          lg,
          {
            asChild: !0,
            trapped: T.open,
            onMountAutoFocus: (ce) => {
              ce.preventDefault();
            },
            onUnmountAutoFocus: Ue(c, (ce) => {
              T.trigger?.focus({ preventScroll: !0 }), ce.preventDefault();
            }),
            children: /* @__PURE__ */ s.jsx(
              Ru,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: d,
                onPointerDownOutside: p,
                onFocusOutside: (ce) => ce.preventDefault(),
                onDismiss: () => T.onOpenChange(!1),
                children: /* @__PURE__ */ s.jsx(
                  q,
                  {
                    role: "listbox",
                    id: T.contentId,
                    "data-state": T.open ? "open" : "closed",
                    dir: T.dir,
                    onContextMenu: (ce) => ce.preventDefault(),
                    ...P,
                    ...de,
                    onPlaced: () => M(!0),
                    ref: H,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...P.style
                    },
                    onKeyDown: Ue(P.onKeyDown, (ce) => {
                      const z = ce.ctrlKey || ce.altKey || ce.metaKey;
                      if (ce.key === "Tab" && ce.preventDefault(), !z && ce.key.length === 1 && A(ce.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(ce.key)) {
                        let se = B().filter((Pe) => !Pe.disabled).map((Pe) => Pe.ref.current);
                        if (["ArrowUp", "End"].includes(ce.key) && (se = se.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(ce.key)) {
                          const Pe = ce.target, Ae = se.indexOf(Pe);
                          se = se.slice(Ae + 1);
                        }
                        setTimeout(() => X(se)), ce.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Pg.displayName = lk;
var uk = "SelectItemAlignedPosition", Eg = y.forwardRef((n, r) => {
  const { __scopeSelect: a, onPlaced: i, ...c } = n, d = Pr(ns, a), p = Er(ns, a), [f, m] = y.useState(null), [v, g] = y.useState(null), x = yt(r, (H) => g(H)), w = Hi(a), k = y.useRef(!1), S = y.useRef(!0), { viewport: j, selectedItem: _, selectedItemText: P, focusSelectedItem: T } = p, C = y.useCallback(() => {
    if (d.trigger && d.valueNode && f && v && j && _ && P) {
      const H = d.trigger.getBoundingClientRect(), L = v.getBoundingClientRect(), re = d.valueNode.getBoundingClientRect(), I = P.getBoundingClientRect();
      if (d.dir !== "rtl") {
        const Pe = I.left - L.left, Ae = re.left - Pe, Ie = H.left - Ae, qe = H.width + Ie, St = Math.max(qe, L.width), tt = window.innerWidth - bn, Ee = vh(Ae, [
          bn,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(bn, tt - St)
        ]);
        f.style.minWidth = qe + "px", f.style.left = Ee + "px";
      } else {
        const Pe = L.right - I.right, Ae = window.innerWidth - re.right - Pe, Ie = window.innerWidth - H.right - Ae, qe = H.width + Ie, St = Math.max(qe, L.width), tt = window.innerWidth - bn, Ee = vh(Ae, [
          bn,
          Math.max(bn, tt - St)
        ]);
        f.style.minWidth = qe + "px", f.style.right = Ee + "px";
      }
      const K = w(), B = window.innerHeight - bn * 2, G = j.scrollHeight, M = window.getComputedStyle(v), Y = parseInt(M.borderTopWidth, 10), X = parseInt(M.paddingTop, 10), te = parseInt(M.borderBottomWidth, 10), D = parseInt(M.paddingBottom, 10), ne = Y + X + G + D + te, J = Math.min(_.offsetHeight * 5, ne), A = window.getComputedStyle(j), ee = parseInt(A.paddingTop, 10), ve = parseInt(A.paddingBottom, 10), be = H.top + H.height / 2 - bn, q = B - be, de = _.offsetHeight / 2, ce = _.offsetTop + de, z = Y + X + ce, oe = ne - z;
      if (z <= be) {
        const Pe = K.length > 0 && _ === K[K.length - 1].ref.current;
        f.style.bottom = "0px";
        const Ae = v.clientHeight - j.offsetTop - j.offsetHeight, Ie = Math.max(
          q,
          de + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (Pe ? ve : 0) + Ae + te
        ), qe = z + Ie;
        f.style.height = qe + "px";
      } else {
        const Pe = K.length > 0 && _ === K[0].ref.current;
        f.style.top = "0px";
        const Ie = Math.max(
          be,
          Y + j.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (Pe ? ee : 0) + de
        ) + oe;
        f.style.height = Ie + "px", j.scrollTop = z - be + j.offsetTop;
      }
      f.style.margin = `${bn}px 0`, f.style.minHeight = J + "px", f.style.maxHeight = B + "px", i?.(), requestAnimationFrame(() => k.current = !0);
    }
  }, [
    w,
    d.trigger,
    d.valueNode,
    f,
    v,
    j,
    _,
    P,
    d.dir,
    i
  ]);
  It(() => C(), [C]);
  const [$, V] = y.useState();
  It(() => {
    v && V(window.getComputedStyle(v).zIndex);
  }, [v]);
  const Z = y.useCallback(
    (H) => {
      H && S.current === !0 && (C(), T?.(), S.current = !1);
    },
    [C, T]
  );
  return /* @__PURE__ */ s.jsx(
    fk,
    {
      scope: a,
      contentWrapper: f,
      shouldExpandOnScrollRef: k,
      onScrollButtonChange: Z,
      children: /* @__PURE__ */ s.jsx(
        "div",
        {
          ref: m,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: $
          },
          children: /* @__PURE__ */ s.jsx(
            et.div,
            {
              ...c,
              ref: x,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...c.style
              }
            }
          )
        }
      )
    }
  );
});
Eg.displayName = uk;
var dk = "SelectPopperPosition", mu = y.forwardRef((n, r) => {
  const {
    __scopeSelect: a,
    align: i = "start",
    collisionPadding: c = bn,
    ...d
  } = n, p = Vi(a);
  return /* @__PURE__ */ s.jsx(
    Rm,
    {
      ...p,
      ...d,
      ref: r,
      align: i,
      collisionPadding: c,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...d.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
mu.displayName = dk;
var [fk, Ku] = Bs(ns, {}), gu = "SelectViewport", Tg = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, nonce: i, ...c } = n, d = Er(gu, a), p = Ku(gu, a), f = yt(r, d.onViewportChange), m = y.useRef(0);
    return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: i
        }
      ),
      /* @__PURE__ */ s.jsx(Ui.Slot, { scope: a, children: /* @__PURE__ */ s.jsx(
        et.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...c,
          ref: f,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...c.style
          },
          onScroll: Ue(c.onScroll, (v) => {
            const g = v.currentTarget, { contentWrapper: x, shouldExpandOnScrollRef: w } = p;
            if (w?.current && x) {
              const k = Math.abs(m.current - g.scrollTop);
              if (k > 0) {
                const S = window.innerHeight - bn * 2, j = parseFloat(x.style.minHeight), _ = parseFloat(x.style.height), P = Math.max(j, _);
                if (P < S) {
                  const T = P + k, C = Math.min(S, T), $ = T - C;
                  x.style.height = C + "px", x.style.bottom === "0px" && (g.scrollTop = $ > 0 ? $ : 0, x.style.justifyContent = "flex-end");
                }
              }
            }
            m.current = g.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Tg.displayName = gu;
var Rg = "SelectGroup", [pk, hk] = Bs(Rg), mk = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, ...i } = n, c = Ds();
    return /* @__PURE__ */ s.jsx(pk, { scope: a, id: c, children: /* @__PURE__ */ s.jsx(et.div, { role: "group", "aria-labelledby": c, ...i, ref: r }) });
  }
);
mk.displayName = Rg;
var Ag = "SelectLabel", Fg = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, ...i } = n, c = hk(Ag, a);
    return /* @__PURE__ */ s.jsx(et.div, { id: c.id, ...i, ref: r });
  }
);
Fg.displayName = Ag;
var Pi = "SelectItem", [gk, Mg] = Bs(Pi), $g = y.forwardRef(
  (n, r) => {
    const {
      __scopeSelect: a,
      value: i,
      disabled: c = !1,
      textValue: d,
      ...p
    } = n, f = Pr(Pi, a), m = Er(Pi, a), v = f.value === i, [g, x] = y.useState(d ?? ""), [w, k] = y.useState(!1), S = yt(
      r,
      (T) => m.itemRefCallback?.(T, i, c)
    ), j = Ds(), _ = y.useRef("touch"), P = () => {
      c || (f.onValueChange(i), f.onOpenChange(!1));
    };
    if (i === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ s.jsx(
      gk,
      {
        scope: a,
        value: i,
        disabled: c,
        textId: j,
        isSelected: v,
        onItemTextChange: y.useCallback((T) => {
          x((C) => C || (T?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ s.jsx(
          Ui.ItemSlot,
          {
            scope: a,
            value: i,
            disabled: c,
            textValue: g,
            children: /* @__PURE__ */ s.jsx(
              et.div,
              {
                role: "option",
                "aria-labelledby": j,
                "data-highlighted": w ? "" : void 0,
                "aria-selected": v && w,
                "data-state": v ? "checked" : "unchecked",
                "aria-disabled": c || void 0,
                "data-disabled": c ? "" : void 0,
                tabIndex: c ? void 0 : -1,
                ...p,
                ref: S,
                onFocus: Ue(p.onFocus, () => k(!0)),
                onBlur: Ue(p.onBlur, () => k(!1)),
                onClick: Ue(p.onClick, () => {
                  _.current !== "mouse" && P();
                }),
                onPointerUp: Ue(p.onPointerUp, () => {
                  _.current === "mouse" && P();
                }),
                onPointerDown: Ue(p.onPointerDown, (T) => {
                  _.current = T.pointerType;
                }),
                onPointerMove: Ue(p.onPointerMove, (T) => {
                  _.current = T.pointerType, c ? m.onItemLeave?.() : _.current === "mouse" && T.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Ue(p.onPointerLeave, (T) => {
                  T.currentTarget === document.activeElement && m.onItemLeave?.();
                }),
                onKeyDown: Ue(p.onKeyDown, (T) => {
                  m.searchRef?.current !== "" && T.key === " " || (tk.includes(T.key) && P(), T.key === " " && T.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
$g.displayName = Pi;
var To = "SelectItemText", Lg = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, className: i, style: c, ...d } = n, p = Pr(To, a), f = Er(To, a), m = Mg(To, a), v = ok(To, a), [g, x] = y.useState(null), w = yt(
      r,
      (P) => x(P),
      m.onItemTextChange,
      (P) => f.itemTextRefCallback?.(P, m.value, m.disabled)
    ), k = g?.textContent, S = y.useMemo(
      () => /* @__PURE__ */ s.jsx("option", { value: m.value, disabled: m.disabled, children: k }, m.value),
      [m.disabled, m.value, k]
    ), { onNativeOptionAdd: j, onNativeOptionRemove: _ } = v;
    return It(() => (j(S), () => _(S)), [j, _, S]), /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(et.span, { id: m.textId, ...d, ref: w }),
      m.isSelected && p.valueNode && !p.valueNodeHasChildren ? Wo.createPortal(d.children, p.valueNode) : null
    ] });
  }
);
Lg.displayName = To;
var Dg = "SelectItemIndicator", Ig = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, ...i } = n;
    return Mg(Dg, a).isSelected ? /* @__PURE__ */ s.jsx(et.span, { "aria-hidden": !0, ...i, ref: r }) : null;
  }
);
Ig.displayName = Dg;
var xu = "SelectScrollUpButton", Og = y.forwardRef((n, r) => {
  const a = Er(xu, n.__scopeSelect), i = Ku(xu, n.__scopeSelect), [c, d] = y.useState(!1), p = yt(r, i.onScrollButtonChange);
  return It(() => {
    if (a.viewport && a.isPositioned) {
      let f = function() {
        const v = m.scrollTop > 0;
        d(v);
      };
      const m = a.viewport;
      return f(), m.addEventListener("scroll", f), () => m.removeEventListener("scroll", f);
    }
  }, [a.viewport, a.isPositioned]), c ? /* @__PURE__ */ s.jsx(
    Bg,
    {
      ...n,
      ref: p,
      onAutoScroll: () => {
        const { viewport: f, selectedItem: m } = a;
        f && m && (f.scrollTop = f.scrollTop - m.offsetHeight);
      }
    }
  ) : null;
});
Og.displayName = xu;
var vu = "SelectScrollDownButton", zg = y.forwardRef((n, r) => {
  const a = Er(vu, n.__scopeSelect), i = Ku(vu, n.__scopeSelect), [c, d] = y.useState(!1), p = yt(r, i.onScrollButtonChange);
  return It(() => {
    if (a.viewport && a.isPositioned) {
      let f = function() {
        const v = m.scrollHeight - m.clientHeight, g = Math.ceil(m.scrollTop) < v;
        d(g);
      };
      const m = a.viewport;
      return f(), m.addEventListener("scroll", f), () => m.removeEventListener("scroll", f);
    }
  }, [a.viewport, a.isPositioned]), c ? /* @__PURE__ */ s.jsx(
    Bg,
    {
      ...n,
      ref: p,
      onAutoScroll: () => {
        const { viewport: f, selectedItem: m } = a;
        f && m && (f.scrollTop = f.scrollTop + m.offsetHeight);
      }
    }
  ) : null;
});
zg.displayName = vu;
var Bg = y.forwardRef((n, r) => {
  const { __scopeSelect: a, onAutoScroll: i, ...c } = n, d = Er("SelectScrollButton", a), p = y.useRef(null), f = Hi(a), m = y.useCallback(() => {
    p.current !== null && (window.clearInterval(p.current), p.current = null);
  }, []);
  return y.useEffect(() => () => m(), [m]), It(() => {
    f().find((g) => g.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [f]), /* @__PURE__ */ s.jsx(
    et.div,
    {
      "aria-hidden": !0,
      ...c,
      ref: r,
      style: { flexShrink: 0, ...c.style },
      onPointerDown: Ue(c.onPointerDown, () => {
        p.current === null && (p.current = window.setInterval(i, 50));
      }),
      onPointerMove: Ue(c.onPointerMove, () => {
        d.onItemLeave?.(), p.current === null && (p.current = window.setInterval(i, 50));
      }),
      onPointerLeave: Ue(c.onPointerLeave, () => {
        m();
      })
    }
  );
}), xk = "SelectSeparator", Wg = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, ...i } = n;
    return /* @__PURE__ */ s.jsx(et.div, { "aria-hidden": !0, ...i, ref: r });
  }
);
Wg.displayName = xk;
var yu = "SelectArrow", vk = y.forwardRef(
  (n, r) => {
    const { __scopeSelect: a, ...i } = n, c = Vi(a), d = Pr(yu, a), p = Er(yu, a);
    return d.open && p.position === "popper" ? /* @__PURE__ */ s.jsx(Am, { ...c, ...i, ref: r }) : null;
  }
);
vk.displayName = yu;
var yk = "SelectBubbleInput", Ug = y.forwardRef(
  ({ __scopeSelect: n, value: r, ...a }, i) => {
    const c = y.useRef(null), d = yt(i, c), p = pj(r);
    return y.useEffect(() => {
      const f = c.current;
      if (!f) return;
      const m = window.HTMLSelectElement.prototype, g = Object.getOwnPropertyDescriptor(
        m,
        "value"
      ).set;
      if (p !== r && g) {
        const x = new Event("change", { bubbles: !0 });
        g.call(f, r), f.dispatchEvent(x);
      }
    }, [p, r]), /* @__PURE__ */ s.jsx(
      et.select,
      {
        ...a,
        style: { ...Mm, ...a.style },
        ref: d,
        defaultValue: r
      }
    );
  }
);
Ug.displayName = yk;
function Hg(n) {
  return n === "" || n === void 0;
}
function Vg(n) {
  const r = Sr(n), a = y.useRef(""), i = y.useRef(0), c = y.useCallback(
    (p) => {
      const f = a.current + p;
      r(f), (function m(v) {
        a.current = v, window.clearTimeout(i.current), v !== "" && (i.current = window.setTimeout(() => m(""), 1e3));
      })(f);
    },
    [r]
  ), d = y.useCallback(() => {
    a.current = "", window.clearTimeout(i.current);
  }, []);
  return y.useEffect(() => () => window.clearTimeout(i.current), []), [a, c, d];
}
function Gg(n, r, a) {
  const c = r.length > 1 && Array.from(r).every((v) => v === r[0]) ? r[0] : r, d = a ? n.indexOf(a) : -1;
  let p = wk(n, Math.max(d, 0));
  c.length === 1 && (p = p.filter((v) => v !== a));
  const m = p.find(
    (v) => v.textValue.toLowerCase().startsWith(c.toLowerCase())
  );
  return m !== a ? m : void 0;
}
function wk(n, r) {
  return n.map((a, i) => n[(r + i) % n.length]);
}
var bk = yg, Qg = bg, jk = kg, kk = _g, _k = Sg, Kg = Ng, Sk = Tg, Yg = Fg, qg = $g, Nk = Lg, Ck = Ig, Xg = Og, Zg = zg, Jg = Wg;
const Pk = bk, Ek = jk, ex = y.forwardRef(({ className: n, children: r, ...a }, i) => /* @__PURE__ */ s.jsxs(
  Qg,
  {
    ref: i,
    className: mt(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      n
    ),
    ...a,
    children: [
      r,
      /* @__PURE__ */ s.jsx(kk, { asChild: !0, children: /* @__PURE__ */ s.jsx(Uu, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
ex.displayName = Qg.displayName;
const tx = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  Xg,
  {
    ref: a,
    className: mt(
      "flex cursor-default items-center justify-center py-1",
      n
    ),
    ...r,
    children: /* @__PURE__ */ s.jsx(tg, { className: "h-4 w-4" })
  }
));
tx.displayName = Xg.displayName;
const nx = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  Zg,
  {
    ref: a,
    className: mt(
      "flex cursor-default items-center justify-center py-1",
      n
    ),
    ...r,
    children: /* @__PURE__ */ s.jsx(Uu, { className: "h-4 w-4" })
  }
));
nx.displayName = Zg.displayName;
const rx = y.forwardRef(({ className: n, children: r, position: a = "popper", ...i }, c) => /* @__PURE__ */ s.jsx(_k, { children: /* @__PURE__ */ s.jsxs(
  Kg,
  {
    ref: c,
    className: mt(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      a === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      n
    ),
    position: a,
    ...i,
    children: [
      /* @__PURE__ */ s.jsx(tx, {}),
      /* @__PURE__ */ s.jsx(
        Sk,
        {
          className: mt(
            "p-1",
            a === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ s.jsx(nx, {})
    ]
  }
) }));
rx.displayName = Kg.displayName;
const Tk = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  Yg,
  {
    ref: a,
    className: mt("py-1.5 pl-8 pr-2 text-sm font-semibold", n),
    ...r
  }
));
Tk.displayName = Yg.displayName;
const sx = y.forwardRef(({ className: n, children: r, ...a }, i) => /* @__PURE__ */ s.jsxs(
  qg,
  {
    ref: i,
    className: mt(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      n
    ),
    ...a,
    children: [
      /* @__PURE__ */ s.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ s.jsx(Ck, { children: /* @__PURE__ */ s.jsx(Mb, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ s.jsx(Nk, { children: r })
    ]
  }
));
sx.displayName = qg.displayName;
const Rk = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  Jg,
  {
    ref: a,
    className: mt("-mx-1 my-1 h-px bg-muted", n),
    ...r
  }
));
Rk.displayName = Jg.displayName;
function Ak(n) {
  if (!n) return "";
  const r = parseInt(n, 10);
  if (isNaN(r) || r <= 0) return n;
  const a = Math.floor(r / 12), i = r % 12;
  return `${a}'${i}"`;
}
const Fk = [
  { key: "overview", label: "Overview", icon: Ho },
  { key: "bio", label: "Bio", icon: fu },
  { key: "gamelog", label: "Game Log", icon: og },
  { key: "usage", label: "Usage & Trends", icon: kr },
  { key: "rankings", label: "Rankings & Value", icon: $s }
];
function Yu(n) {
  return `https://sleepercdn.com/content/nfl/players/thumb/${n}.jpg`;
}
function Mk({ playerId: n, name: r, teamColor: a, team: i }) {
  const [c, d] = y.useState(!1), p = Yu(n), f = i ? `https://sleepercdn.com/images/team_logos/nfl/${i.toLowerCase()}.png` : null, m = a || "#0b3a7a";
  return /* @__PURE__ */ s.jsx("div", { className: "relative flex-shrink-0", "data-testid": "img-headshot", children: /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: "relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden",
      style: {
        border: `3px solid ${m}`,
        boxShadow: `0 4px 16px ${m}44, 0 2px 6px rgba(0,0,0,0.10)`,
        background: "#f1f5f9"
      },
      children: [
        f && /* @__PURE__ */ s.jsx(
          "img",
          {
            src: f,
            alt: "",
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: 0.18,
              padding: "6%",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0
            }
          }
        ),
        c ? /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "w-full h-full flex items-center justify-center",
            style: { position: "relative", zIndex: 1 },
            "data-testid": "img-headshot-fallback",
            children: /* @__PURE__ */ s.jsx(Vu, { className: "w-10 h-10 md:w-12 md:h-12 text-slate-400" })
          }
        ) : /* @__PURE__ */ s.jsx(
          "img",
          {
            src: p,
            alt: `${r} headshot`,
            className: "w-full h-full object-cover",
            style: { position: "relative", zIndex: 1 },
            onError: () => d(!0)
          }
        )
      ]
    }
  ) });
}
function $k({ playerId: n, name: r, teamAbbr: a }) {
  const [i, c] = y.useState(!1), d = Yu(n), p = Gu[a] || "#6B7280";
  return i ? /* @__PURE__ */ s.jsx(
    "div",
    {
      className: "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800",
      style: { border: `2px solid ${p}` },
      "data-testid": `img-neighbor-${n}`,
      children: /* @__PURE__ */ s.jsx(Vu, { className: "w-4 h-4 text-slate-400 dark:text-slate-500" })
    }
  ) : /* @__PURE__ */ s.jsx(
    "img",
    {
      src: d,
      alt: r,
      className: "flex-shrink-0 w-9 h-9 rounded-full object-cover bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800",
      style: { border: `2px solid ${p}` },
      onError: () => c(!0),
      "data-testid": `img-neighbor-${n}`
    }
  );
}
function ft({ title: n, subtitle: r }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-section-header", children: [
    /* @__PURE__ */ s.jsx("p", { className: "sc-section-header__title", children: n }),
    /* @__PURE__ */ s.jsx("div", { className: "sc-section-header__bar" }),
    r && /* @__PURE__ */ s.jsx("p", { className: "sc-section-header__subtitle", children: r })
  ] });
}
function pi({ label: n, value: r, sub: a, tintClass: i, children: c }) {
  return /* @__PURE__ */ s.jsxs("div", { className: `sc-gamelog__stat-box ${i || ""}`, children: [
    /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-label", children: n }),
    /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-value", "data-testid": `text-statbox-${n.toLowerCase().replace(/\s+/g, "-")}`, children: r }),
    a && /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-sub", children: a }),
    c
  ] });
}
function Lk(n) {
  switch (n) {
    case "QB":
      return {
        primary: [
          { key: "pass_yd", label: "PASS YDS" },
          { key: "pass_td", label: "PASS TD" },
          { key: "pass_int", label: "INT" },
          { key: "rush_yd", label: "RUSH YDS" },
          { key: "rush_td", label: "RUSH TD" }
        ],
        detail: [
          { key: "pass_cmp", label: "CMP" },
          { key: "pass_att", label: "ATT" },
          { key: "rush_att", label: "CAR" }
        ]
      };
    case "RB":
      return {
        primary: [
          { key: "rush_att", label: "CAR" },
          { key: "rush_yd", label: "RUSH YDS" },
          { key: "rush_td", label: "RUSH TD" },
          { key: "rec", label: "REC" },
          { key: "rec_yd", label: "REC YDS" }
        ],
        detail: [
          { key: "rec_tgt", label: "TGT" },
          { key: "rec_td", label: "REC TD" }
        ]
      };
    case "WR":
    case "TE":
      return {
        primary: [
          { key: "rec_tgt", label: "TGT" },
          { key: "rec", label: "REC" },
          { key: "rec_yd", label: "REC YDS" },
          { key: "rec_td", label: "REC TD" }
        ],
        detail: [],
        conditionalRush: !0
      };
    case "K":
      return {
        primary: [
          { key: "fgm", label: "FGM" },
          { key: "fga", label: "FGA" },
          { key: "xpm", label: "XPM" },
          { key: "xpa", label: "XPA" }
        ],
        detail: [
          { key: "fgm_lng", label: "FG LNG" }
        ]
      };
    default:
      return { primary: [], detail: [] };
  }
}
function ox(n) {
  return { bust: 36, hasTier3: !0 };
}
function _t(n, r) {
  return `${n || "FLEX"}${r}`;
}
function rs(n, r) {
  const a = n;
  return (a.off_snp ?? 0) > 0 ? !0 : r === "QB" ? (a.pass_att ?? 0) > 0 || (a.rush_att ?? 0) > 0 : r === "K" ? (a.fga ?? 0) > 0 || (a.xpa ?? 0) > 0 : (a.rec_tgt ?? 0) > 0 || (a.rec ?? 0) > 0 || (a.rush_att ?? 0) > 0 || (a.pass_att ?? 0) > 0;
}
function ze(n, r) {
  return Gb(n.stats, r);
}
function qu(n, r = null, a = "ppr") {
  if (n.length === 0) return null;
  const i = n.filter((G) => G.game_status === "active"), c = i.length > 0 ? i : n.filter((G) => rs(G.stats, r)), d = c.length, p = c.reduce((G, M) => G + ze(M, a), 0), f = d > 0 ? p / d : 0, m = c.length > 0 ? c.reduce((G, M) => ze(M, a) > ze(G, a) ? M : G, c[0]) : n[0], v = c.slice(-4), g = v.reduce((G, M) => G + ze(M, a), 0), x = v.length > 0 ? g / v.length : 0, { bust: w, hasTier3: k } = ox(), S = c.filter((G) => G.pos_rank != null), j = S.filter((G) => G.pos_rank >= 1 && G.pos_rank <= 12).length, _ = 24, P = S.filter((G) => G.pos_rank >= 13 && G.pos_rank <= _).length, T = k ? S.filter((G) => G.pos_rank >= 25 && G.pos_rank <= w).length : 0, C = S.filter((G) => G.pos_rank > w).length, $ = d > 0 ? j / d * 100 : 0, V = d > 0 ? P / d * 100 : 0, Z = d > 0 ? T / d * 100 : 0, H = d > 0 ? C / d * 100 : 0, L = c.map((G) => ze(G, a)), re = L.length > 0 ? L.reduce((G, M) => G + M, 0) / L.length : 0, I = L.length > 1 ? Math.sqrt(L.reduce((G, M) => G + (M - re) ** 2, 0) / (L.length - 1)) : 0, K = c.filter((G) => ze(G, a) === 0).length, B = d > 0 ? K / d * 100 : 0;
  return { gamesPlayed: d, totalPts: p, ppg: f, bestWeek: m, last4Ppg: x, pos1Pct: $, pos2Pct: V, pos3Pct: Z, bustPct: H, pos1Games: j, pos2Games: P, pos3Games: T, bustGames: C, volatility: I, gooseEggPct: B };
}
function Dk(n) {
  return n ? n <= 12 ? "text-yellow-500 dark:text-yellow-400 font-semibold" : n <= 24 ? "text-slate-400 dark:text-slate-300 font-semibold" : n <= 36 ? "text-amber-700 dark:text-amber-600 font-semibold" : "text-red-500 dark:text-red-400" : "";
}
function Ei(n, r) {
  if (!n) return null;
  const a = r || "FLEX";
  return n <= 12 ? { label: `${a}1`, className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" } : n <= 24 ? { label: `${a}2`, className: "bg-slate-400/15 text-slate-500 dark:text-slate-300" } : n <= 36 ? { label: `${a}3`, className: "bg-amber-700/15 text-amber-700 dark:text-amber-600" } : { label: "Bust", className: "bg-red-500/15 text-red-500 dark:text-red-400" };
}
function Ik(n) {
  return n ? n <= 8 ? "text-red-500 dark:text-red-400" : n >= 25 ? "text-green-600 dark:text-green-400" : "text-muted-foreground" : "text-muted-foreground";
}
function Ok({ entries: n = [], position: r, filter: a, tierFilter: i, hideInactive: c, format: d = "ppr", lastN: p }) {
  const { primary: f, detail: m, conditionalRush: v } = Lk(r), g = r || "", [x, w] = y.useState(/* @__PURE__ */ new Set()), [k, S] = y.useState(null), [j, _] = y.useState("desc"), [P, T] = y.useState("avg"), C = (z, oe) => z.stats[oe] ?? 0, $ = n.filter((z) => z.game_status === "active"), Z = v && $.some((z) => C(z, "rush_att") > 0) ? [{ key: "rush_att", label: "CAR" }, { key: "rush_yd", label: "RUSH" }] : [], H = [...f, ...Z], L = m.length > 0, re = 6 + H.length + (L ? 1 : 0), I = (z) => {
    w((oe) => {
      const se = new Set(oe);
      return se.has(z) ? se.delete(z) : se.add(z), se;
    });
  }, K = y.useCallback((z) => {
    k === z ? j === "desc" ? _("asc") : (S(null), _("desc")) : (S(z), _(z === "week" ? "asc" : "desc"));
  }, [k, j]), B = p || (a === "last5" ? 5 : void 0);
  let G = B ? $.slice(-B) : n;
  c && a !== "last5" && (G = G.filter((z) => z.game_status === "active"));
  const M = (z, oe) => {
    const se = ze(z, d);
    return oe === "15+" ? se >= 15 : oe === "10–14.9" ? se >= 10 && se < 15 : oe === "5–9.9" ? se >= 5 && se < 10 : se < 5;
  };
  i && (G = G.filter((z) => z.game_status === "active" && M(z, i)));
  const Y = y.useMemo(() => {
    if (!k) return G;
    const z = [...G];
    return z.sort((oe, se) => {
      let Pe, Ae;
      k === "week" ? (Pe = oe.week, Ae = se.week) : k === "fpts" ? (Pe = oe.game_status === "active" ? ze(oe, d) : -1, Ae = se.game_status === "active" ? ze(se, d) : -1) : k === "finish" ? (Pe = oe.pos_rank ?? 999, Ae = se.pos_rank ?? 999) : (Pe = oe.game_status === "active" ? C(oe, k) : -1, Ae = se.game_status === "active" ? C(se, k) : -1);
      const Ie = Pe - Ae;
      return j === "asc" ? Ie : -Ie;
    }), z;
  }, [G, k, j]), X = Y.filter((z) => z.game_status === "active"), te = X.length, D = X.filter((z) => z.pos_rank != null), ne = D.length > 0 ? D.reduce((z, oe) => z + (oe.pos_rank ?? 0), 0) / D.length : null, J = ({ colKey: z }) => k !== z ? /* @__PURE__ */ s.jsx(gh, { className: "w-2.5 h-2.5 ml-0.5 inline opacity-30" }) : j === "asc" ? /* @__PURE__ */ s.jsx(Ab, { className: "w-2.5 h-2.5 ml-0.5 inline text-primary" }) : /* @__PURE__ */ s.jsx(Rb, { className: "w-2.5 h-2.5 ml-0.5 inline text-primary" }), A = (z) => z === "W" ? "text-green-600 dark:text-green-400" : z === "L" ? "text-red-500 dark:text-red-400" : "text-muted-foreground", ee = (z) => {
    const oe = ["th", "st", "nd", "rd"], se = z % 100;
    return z + (oe[(se - 20) % 10] || oe[se] || oe[0]);
  }, ve = "sc-gamelog__th sc-gamelog__th--sortable", be = "sc-gamelog__th", q = "sc-gamelog__th sc-gamelog__th--sortable sc-gamelog__th--primary", de = (z) => {
    const oe = [], se = z.stats;
    return se.pass_yd && oe.push(`${se.pass_yd} pass yds, ${se.pass_td || 0} TD${se.pass_int ? `, ${se.pass_int} INT` : ""}`), se.rush_att && oe.push(`${se.rush_att} car, ${se.rush_yd || 0} rush yds${se.rush_td ? `, ${se.rush_td} TD` : ""}`), se.rec_tgt && oe.push(`${se.rec_tgt} tgt, ${se.rec || 0} rec, ${se.rec_yd || 0} yds${se.rec_td ? `, ${se.rec_td} TD` : ""}`), oe.join(" | ");
  }, ce = (z) => {
    if (z.game_status !== "active") return "";
    const oe = ze(z, d);
    return oe >= 20 ? "border-l-[3px] border-l-emerald-500/60" : oe < 5 && oe >= 0 ? "border-l-[3px] border-l-red-400/40" : "border-l-[3px] border-l-transparent";
  };
  return /* @__PURE__ */ s.jsx("div", { className: "sc-gamelog__table-wrap", children: /* @__PURE__ */ s.jsxs("table", { className: "sc-gamelog__table", "data-testid": "table-game-log", children: [
    /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { className: "sc-gamelog__thead-row", children: [
      /* @__PURE__ */ s.jsxs("th", { className: ve, onClick: () => K("week"), "data-testid": "sort-week", children: [
        "WK",
        /* @__PURE__ */ s.jsx(J, { colKey: "week" })
      ] }),
      /* @__PURE__ */ s.jsx("th", { className: be, children: "OPP" }),
      /* @__PURE__ */ s.jsx("th", { className: `${be} text-center`, style: { position: "sticky", left: 0, zIndex: 12 }, children: "SCORE" }),
      H.map((z) => /* @__PURE__ */ s.jsxs("th", { className: `${ve} text-right sc-gamelog__th--secondary`, onClick: () => K(z.key), "data-testid": `sort-${z.key}`, children: [
        z.label,
        /* @__PURE__ */ s.jsx(J, { colKey: z.key })
      ] }, z.key)),
      /* @__PURE__ */ s.jsxs("th", { className: `${q} text-right`, onClick: () => K("fpts"), "data-testid": "sort-fpts", children: [
        "FPTS",
        /* @__PURE__ */ s.jsx(J, { colKey: "fpts" })
      ] }),
      /* @__PURE__ */ s.jsxs("th", { className: `${q} text-right`, onClick: () => K("finish"), "data-testid": "sort-finish", children: [
        "FINISH",
        /* @__PURE__ */ s.jsx(J, { colKey: "finish" })
      ] }),
      L && /* @__PURE__ */ s.jsx("th", { className: "sc-gamelog__th", style: { width: "24px" } })
    ] }) }),
    /* @__PURE__ */ s.jsx("tbody", { children: Y.length > 0 ? /* @__PURE__ */ s.jsx(s.Fragment, { children: Y.map((z) => {
      const oe = x.has(z.week), se = z.pos_rank, Pe = Ei(se, r), Ae = z.opp_rank_vs_pos, Ie = Ae ? ee(Ae) : null, qe = z.game_status === "bye", St = z.game_status === "out", tt = qe || St, Ee = z.score;
      if (tt)
        return /* @__PURE__ */ s.jsxs("tr", { className: "sc-gamelog__row", style: { opacity: 0.4 }, "data-testid": `row-gamelog-week-${z.week}`, children: [
          /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { fontWeight: 600 }, children: z.week }),
          /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { color: "#94a3b8" }, children: qe ? "BYE" : "—" }),
          /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td text-center", children: /* @__PURE__ */ s.jsx(fn, { variant: "secondary", className: `text-[8px] px-1.5 py-0 ${qe ? "bg-sky-500/10 text-sky-700 dark:text-sky-400" : "bg-muted text-muted-foreground"}`, "data-testid": `badge-status-${z.week}`, children: qe ? "BYE" : "OUT" }) }),
          H.map((st) => /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--secondary text-right", children: "—" }, st.key)),
          /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--primary text-right", style: { color: "#94a3b8" }, children: "—" }),
          /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--primary text-right", style: { color: "#94a3b8" }, children: "—" }),
          L && /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td" })
        ] }, z.week);
      const Ge = ze(z, d);
      return /* @__PURE__ */ s.jsxs(y.Fragment, { children: [
        /* @__PURE__ */ s.jsxs(
          "tr",
          {
            className: `sc-gamelog__row ${L ? "cursor-pointer" : ""} ${oe ? "sc-gamelog__row--expanded" : ""} ${ce(z)}`,
            onClick: L ? () => I(z.week) : void 0,
            "data-testid": `row-gamelog-week-${z.week}`,
            children: [
              /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { fontWeight: 600 }, children: z.week }),
              /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { whiteSpace: "nowrap" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex flex-col leading-tight", children: [
                /* @__PURE__ */ s.jsx("span", { style: { fontWeight: 600, color: "#0b3a7a" }, children: z.opp }),
                Ie && /* @__PURE__ */ s.jsxs("span", { className: `text-[9px] leading-none opacity-70 ${Ik(Ae)}`, children: [
                  Ie,
                  " vs ",
                  g
                ] })
              ] }) }),
              /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td text-center", style: { whiteSpace: "nowrap", position: "sticky", left: 0, zIndex: 2, background: "inherit" }, "data-testid": `score-week-${z.week}`, children: Ee ? /* @__PURE__ */ s.jsxs("span", { className: `text-[10px] tabular-nums font-medium ${A(Ee.r)}`, children: [
                Ee.r,
                ", ",
                Ee.tm,
                "–",
                Ee.opp
              ] }) : "—" }),
              H.map((st) => /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--secondary text-right", children: C(z, st.key) }, st.key)),
              /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--primary text-right", title: de(z), children: /* @__PURE__ */ s.jsx("span", { style: { fontSize: "14px", fontWeight: 800, color: "#0b3a7a", fontFamily: "ui-monospace, monospace" }, children: Ge.toFixed(1) }) }),
              /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--primary text-right", "data-testid": `text-finish-week-${z.week}`, children: Pe ? /* @__PURE__ */ s.jsx(fn, { variant: "secondary", className: `text-[9px] px-1.5 py-0 font-semibold tabular-nums ${Pe.className}`, children: Pe.label }) : se ? /* @__PURE__ */ s.jsxs(fn, { variant: "secondary", className: "text-[9px] px-1.5 py-0 font-semibold tabular-nums bg-red-500/15 text-red-500 dark:text-red-400", children: [
                g,
                se
              ] }) : "—" }),
              L && /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { textAlign: "center", paddingLeft: "8px" }, children: /* @__PURE__ */ s.jsx(
                Hu,
                {
                  className: `w-3 h-3 transition-transform duration-200 inline-block ${oe ? "rotate-90" : ""}`,
                  style: { color: "#94a3b8" }
                }
              ) })
            ]
          }
        ),
        L && oe && /* @__PURE__ */ s.jsx("tr", { style: { background: "rgba(15,23,42,0.02)" }, "data-testid": `row-gamelog-detail-${z.week}`, children: /* @__PURE__ */ s.jsx("td", { colSpan: re, className: "py-1.5 px-3", children: /* @__PURE__ */ s.jsx("div", { className: "flex items-center gap-4 flex-wrap pl-2", children: m.map((st) => /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ s.jsx("span", { style: { fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", fontWeight: 600 }, children: st.label }),
          /* @__PURE__ */ s.jsx("span", { style: { fontSize: "12px", fontWeight: 700, color: "#0b3a7a", fontFamily: "ui-monospace, monospace" }, children: C(z, st.key) })
        ] }, st.key)) }) }) })
      ] }, z.week);
    }) }) : /* @__PURE__ */ s.jsx("tr", { children: /* @__PURE__ */ s.jsx("td", { colSpan: re, className: "py-8", children: /* @__PURE__ */ s.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ s.jsx(og, { className: "w-8 h-8 text-muted-foreground/30 mx-auto mb-3" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No game log data yet" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground/60 text-xs mt-1", children: "Game log data will be available once the season begins." })
    ] }) }) }) }),
    X.length > 0 && !i && /* @__PURE__ */ s.jsx("tfoot", { children: /* @__PURE__ */ s.jsxs("tr", { style: { borderTop: "2px solid rgba(15,23,42,0.10)", background: "rgba(15,23,42,0.02)" }, children: [
      /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", colSpan: 2, "data-testid": "text-totals-label", style: { padding: "10px 8px" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 500 }, children: [
          "Season ",
          P === "avg" ? "Avg" : "Totals"
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: "text-left flex items-center gap-1",
            style: { fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0b3a7a", background: "none", border: "none", cursor: "pointer", padding: 0 },
            onClick: () => T(P === "avg" ? "total" : "avg"),
            "data-testid": "toggle-footer-mode",
            children: [
              P === "avg" ? "AVG/G" : "TOTALS",
              /* @__PURE__ */ s.jsx(gh, { className: "w-2.5 h-2.5", style: { opacity: 0.4 } })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 500 }, children: [
          te,
          " games"
        ] })
      ] }) }),
      /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { padding: "10px 8px" } }),
      H.map((z) => {
        const oe = X.reduce((Pe, Ae) => Pe + C(Ae, z.key), 0), se = P === "avg" ? te > 0 ? oe / te : 0 : oe;
        return /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--secondary", style: { textAlign: "right", fontWeight: 700, padding: "10px 8px" }, children: P === "total" ? se : se % 1 === 0 ? se.toFixed(0) : se.toFixed(1) }, z.key);
      }),
      /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--primary", style: { textAlign: "right", padding: "10px 8px" }, children: /* @__PURE__ */ s.jsx("span", { style: { fontSize: "14px", fontWeight: 800, color: "#0b3a7a", fontFamily: "ui-monospace, monospace" }, children: te > 0 ? P === "avg" ? (X.reduce((z, oe) => z + ze(oe, d), 0) / te).toFixed(1) : X.reduce((z, oe) => z + ze(oe, d), 0).toFixed(1) : "0.0" }) }),
      /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--primary", style: { textAlign: "right", padding: "10px 8px" }, "data-testid": "text-avg-finish", children: ne ? /* @__PURE__ */ s.jsxs(fn, { variant: "secondary", className: `text-[9px] px-1.5 py-0 font-semibold tabular-nums ${(Ei(Math.round(ne), r) || { className: "bg-red-500/15 text-red-500 dark:text-red-400" }).className}`, children: [
        g,
        Math.round(ne)
      ] }) : "—" }),
      L && /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { padding: "10px 8px" } })
    ] }) })
  ] }) });
}
function Zt(n, r = 3) {
  return n.map((a, i) => {
    const c = Math.max(0, i - r + 1), d = n.slice(c, i + 1);
    return d.reduce((p, f) => p + f, 0) / d.length;
  });
}
function zk({ data: n, unit: r = "PPG" }) {
  if (n.length < 3) return null;
  const a = n.slice(-3), i = a.reduce((x, w) => x + w, 0) / a.length, c = n.reduce((x, w) => x + w, 0) / n.length, d = i - c, p = c > 0 ? d / c * 100 : 0, f = `${d > 0 ? "+" : ""}${d.toFixed(1)} ${r} (${p > 0 ? "+" : ""}${p.toFixed(0)}%)`, m = Math.abs(p) < 5 ? "Stable" : p > 0 ? "Up" : "Down", v = Math.abs(p) < 5 ? "text-muted-foreground" : p > 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400", g = Math.abs(p) < 5 ? rg : p > 0 ? Do : du;
  return /* @__PURE__ */ s.jsxs("div", { className: "text-right", "data-testid": "badge-momentum", children: [
    /* @__PURE__ */ s.jsx("p", { className: "text-[9px] uppercase tracking-wider text-muted-foreground/50 font-medium leading-none", children: "Momentum" }),
    /* @__PURE__ */ s.jsxs("span", { className: `inline-flex items-center gap-0.5 text-xs font-semibold ${v}`, children: [
      /* @__PURE__ */ s.jsx(g, { className: "w-3.5 h-3.5" }),
      " ",
      m
    ] }),
    /* @__PURE__ */ s.jsx("p", { className: `text-[10px] ${v} opacity-70 tabular-nums`, children: f })
  ] });
}
function wu({ data: n, rollingAvg: r, bestIdx: a, height: i = 120, label: c, accentColor: d = "#0b3a7a", showAvgLine: p = !1, highlightLast: f = 0, showRecentFormLabel: m = !1, thickLine: v = !1, showGridLines: g = !1 }) {
  if (n.length < 2) return null;
  const x = Math.max(...n, 1), w = { top: 10, bottom: 24, left: 0, right: 0 }, k = i - w.top - w.bottom, S = 400, j = (re, I) => {
    const K = w.left + I / (n.length - 1) * (S - w.left - w.right), B = w.top + k - re / x * k;
    return { x: K, y: B };
  }, _ = n.map((re, I) => j(re, I)), P = _.map((re, I) => `${I === 0 ? "M" : "L"}${re.x},${re.y}`).join(" "), T = `${P} L${_[_.length - 1].x},${w.top + k} L${_[0].x},${w.top + k} Z`;
  let C = "";
  r && (C = r.map((I, K) => j(I, K)).map((I, K) => `${K === 0 ? "M" : "L"}${I.x},${I.y}`).join(" "));
  const $ = a != null && a >= 0 ? _[a] : null, V = n.reduce((re, I) => re + I, 0) / n.length, Z = w.top + k - V / x * k, H = f > 0 && n.length >= f ? _[n.length - f].x : null, L = c || "default";
  return /* @__PURE__ */ s.jsx("div", { "data-testid": "chart-line-svg", children: /* @__PURE__ */ s.jsxs("svg", { viewBox: `0 0 ${S} ${i}`, className: "w-full", style: { height: i }, preserveAspectRatio: "none", children: [
    /* @__PURE__ */ s.jsxs("defs", { children: [
      /* @__PURE__ */ s.jsxs("linearGradient", { id: `fill-${L}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: d, stopOpacity: "0.15" }),
        /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: d, stopOpacity: "0" })
      ] }),
      H != null && /* @__PURE__ */ s.jsxs("linearGradient", { id: `hl-${L}`, x1: "0", y1: "0", x2: "1", y2: "0", children: [
        /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: d, stopOpacity: "0" }),
        /* @__PURE__ */ s.jsx("stop", { offset: "30%", stopColor: d, stopOpacity: "0.06" }),
        /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: d, stopOpacity: "0.1" })
      ] })
    ] }),
    g && (() => {
      const I = [];
      for (let K = 1; K < 4; K++) {
        const B = w.top + k * K / 4;
        I.push(/* @__PURE__ */ s.jsx("line", { x1: 0, y1: B, x2: S, y2: B, stroke: "#e2e8f0", strokeWidth: "0.5", strokeDasharray: "3 3" }, K));
      }
      return /* @__PURE__ */ s.jsx(s.Fragment, { children: I });
    })(),
    H != null && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("rect", { x: H, y: w.top, width: S - H, height: k, fill: `url(#hl-${L})`, rx: "4" }),
      m && /* @__PURE__ */ s.jsx("text", { x: S - 6, y: w.top + 10, textAnchor: "end", className: "fill-muted-foreground", fontSize: "8", opacity: "0.35", fontWeight: "500", letterSpacing: "0.5", children: "Recent Form" })
    ] }),
    p && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("rect", { x: 0, y: Z - 6, width: S, height: 12, fill: d, opacity: "0.04", rx: "2" }),
      /* @__PURE__ */ s.jsx("line", { x1: 0, y1: Z, x2: S, y2: Z, stroke: "currentColor", strokeWidth: "1", strokeDasharray: "4 3", opacity: "0.12" }),
      /* @__PURE__ */ s.jsxs("text", { x: S - 8, y: Z - 10, textAnchor: "end", className: "fill-muted-foreground", fontSize: "9", opacity: "0.25", children: [
        "avg ",
        V.toFixed(1)
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("path", { d: T, fill: `url(#fill-${L})` }),
    /* @__PURE__ */ s.jsx("path", { d: P, fill: "none", stroke: d, strokeWidth: v ? "2.5" : "2", strokeLinejoin: "round", strokeLinecap: "round", opacity: "0.5" }),
    C && /* @__PURE__ */ s.jsx("path", { d: C, fill: "none", stroke: "#d4af37", strokeWidth: v ? "3.5" : "2.5", strokeLinejoin: "round", strokeLinecap: "round" }),
    $ && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("circle", { cx: $.x, cy: $.y, r: "8", fill: d, opacity: "0.12" }),
      /* @__PURE__ */ s.jsx("circle", { cx: $.x, cy: $.y, r: "4", fill: d, stroke: "white", strokeWidth: "1.5" })
    ] }),
    _.map((re, I) => /* @__PURE__ */ s.jsx("circle", { cx: re.x, cy: re.y, r: "2", fill: d, opacity: "0.4" }, I)),
    /* @__PURE__ */ s.jsx("text", { x: _[0].x, y: i - 4, textAnchor: "start", className: "fill-muted-foreground", fontSize: "10", children: "Wk 1" }),
    /* @__PURE__ */ s.jsxs("text", { x: _[_.length - 1].x, y: i - 4, textAnchor: "end", className: "fill-muted-foreground", fontSize: "10", children: [
      "Wk ",
      n.length
    ] })
  ] }) });
}
function Bk(n, r, a = "ppr") {
  if (!r || r.gamesPlayed === 0)
    return {
      formLabel: "No Data",
      formDetail: "",
      formColor: "text-muted-foreground",
      roleLabel: "Unknown",
      volatilityLabel: "N/A",
      volatilityColor: "text-muted-foreground",
      tierProfile: "N/A",
      sentence: "Check back as the season progresses for updated analysis.",
      hasData: !1,
      noDataMsg: `${n.name} has not recorded any fantasy points this season.`
    };
  const i = n.position || "FLEX", c = r.ppg > 0 ? (r.last4Ppg - r.ppg) / r.ppg * 100 : 0, d = c > 5 ? "Heating Up" : c < -10 ? "Cooling" : "Stable", p = `${c > 0 ? "+" : ""}${c.toFixed(0)}% vs season avg`, f = c > 5 ? "text-green-600 dark:text-green-400" : c < -10 ? "text-red-500 dark:text-red-400" : "text-foreground", m = r.pos1Pct + r.pos2Pct, v = m >= 60 ? "Starter" : m >= 35 ? "Flex" : "Depth", g = r.ppg > 0 ? r.volatility / r.ppg : 2, x = g < 0.4 ? "Low" : g < 0.7 ? "Moderate" : "High", w = g < 0.4 ? "text-green-600 dark:text-green-400" : g < 0.7 ? "text-foreground" : "text-red-500 dark:text-red-400", k = `${r.pos1Pct.toFixed(0)}% ${_t(i, 1)} rate`, j = r.bestWeek ? `Best outing: Wk ${r.bestWeek.week} vs ${r.bestWeek.opp} (${ze(r.bestWeek, a).toFixed(1)} pts).` : "";
  return { formLabel: d, formDetail: p, formColor: f, roleLabel: v, volatilityLabel: x, volatilityColor: w, tierProfile: k, sentence: j, hasData: !0 };
}
function Wk(n, r) {
  if (n.length === 0) return [];
  const a = [], i = n.filter((d) => rs(d.stats, r)).length || 1, c = (d) => n.reduce((p, f) => p + (f.stats[d] ?? 0), 0);
  if (r === "QB") {
    const d = c("pass_yd"), p = c("pass_td"), f = c("rush_yd");
    a.push({ label: "Pass YDS", total: d, perGame: d / i }), a.push({ label: "Pass TD", total: p, perGame: p / i }), a.push({ label: "Rush YDS", total: f, perGame: f / i }), a.push({ label: "INT", total: c("pass_int"), perGame: c("pass_int") / i });
  } else if (r === "RB") {
    const d = c("rush_yd"), p = c("rec_yd");
    a.push({ label: "Rush YDS", total: d, perGame: d / i }), a.push({ label: "Rush TD", total: c("rush_td"), perGame: c("rush_td") / i }), a.push({ label: "REC", total: c("rec"), perGame: c("rec") / i }), a.push({ label: "Rec YDS", total: p, perGame: p / i });
  } else if (r === "WR" || r === "TE") {
    const d = c("rec_yd");
    a.push({ label: "TGT", total: c("rec_tgt"), perGame: c("rec_tgt") / i }), a.push({ label: "REC", total: c("rec"), perGame: c("rec") / i }), a.push({ label: "Rec YDS", total: d, perGame: d / i }), a.push({ label: "Rec TD", total: c("rec_td"), perGame: c("rec_td") / i });
  } else r === "K" && (a.push({ label: "FGM", total: c("fgm"), perGame: c("fgm") / i }), a.push({ label: "FGA", total: c("fga"), perGame: c("fga") / i }), a.push({ label: "XPM", total: c("xpm"), perGame: c("xpm") / i }));
  return a;
}
function Uk(n, r, a) {
  if (!r || r.gamesPlayed === 0) return [];
  const i = n.position || "", c = n.name || "This player", d = n.team || "", p = ag[d] || d, f = n.season || 2025, m = r.ppg.toFixed(1), v = r.gamesPlayed, g = r.pos1Pct, x = g.toFixed(0), w = r.pos1Pct + r.pos2Pct, k = r.bustPct.toFixed(0), S = r.ppg > 0 ? (r.last4Ppg - r.ppg) / r.ppg * 100 : 0, j = S > 8 ? "trending upward" : S < -12 ? "cooling late in the year" : "relatively steady", _ = w >= 60 ? "a reliable weekly starter" : w >= 35 ? "a flex-range contributor" : "a situational option", P = r.ppg > 0 ? r.volatility / r.ppg : 2, T = P < 0.4 ? "low week-to-week variance" : P < 0.7 ? "moderate week-to-week variance" : "high week-to-week variance", C = n.careerProfile, $ = C ? C.seasons : 1, V = [];
  V.push(`${c} finished the ${f} season as ${_} at the ${i} position`), p && V.push(`playing for the ${p}`), V.push(`averaging ${m} fantasy points per game across ${v} games`), n.seasonRank && V.push(`and finishing as the ${i}${n.seasonRank} overall`);
  const Z = V.join(", ") + ".";
  let H = "";
  if (i === "QB")
    g >= 50 ? H = `He finished inside the top-12 at quarterback in ${x}% of his starts, showing strong weekly reliability with ${T}. Production was ${j} heading into the final stretch of the season. That ceiling rate places him firmly in QB1 territory for redraft formats heading into 2026.` : g >= 25 ? H = `He landed in the top-12 at quarterback ${x}% of the time, with ${T} in weekly output. Production was ${j} late in the season. That finish rate puts him in the QB2 range for most formats, with upside in favorable matchups.` : g > 0 ? H = `He reached the top-12 at quarterback in just ${x}% of starts, with ${T} around a below-starter scoring baseline. Production was ${j} heading into the final stretch. At this volume and finish rate, he projects as a streaming option rather than a reliable weekly starter for 2026.` : H = `He did not finish inside the top-12 at quarterback in any of his ${v} active games this season, with ${T} around a below-starter scoring level. Production was ${j} late in the season. That output places him outside reliable starter range heading into 2026 planning.`;
  else if (i === "RB") {
    const re = w >= 60 ? "24" : "36";
    w >= 40 ? H = `His scoring profile showed ${T}, finishing as a top-${re} back ${x}% of the time. Production was ${j} late in the season. The bust rate of ${k}% is an important floor signal for lineup decisions, particularly in PPR formats where receiving work adds a secondary scoring lane.` : H = `He finished as a top-${re} back in just ${x}% of games, with ${T} around a below-starter workload. Production was ${j} late in the season. A bust rate of ${k}% reflects the limited upside weeks and signals a depth or handcuff profile rather than a consistent starter.`;
  } else i === "WR" ? g >= 30 ? H = `His weekly profile showed ${T}, converting into a top-24 receiver finish ${x}% of the time. Scoring was ${j} over the second half of the schedule. Both ceiling and floor are tied closely to target volume and red-zone looks, making matchup awareness more impactful than for run-first options.` : H = `He reached a top-24 receiver finish in just ${x}% of games, with ${T} around a limited target role. Scoring was ${j} over the second half of the schedule. At this finish rate, he fits a depth or matchup-play profile rather than a reliable flex option.` : i === "TE" ? g >= 30 ? H = `His weekly output showed ${T}, landing inside the top-12 at tight end ${x}% of the time. Scoring was ${j} as the season progressed. At tight end, where positional depth is thin, consistent target volume and red-zone involvement carry outsized value.` : H = `He finished inside the top-12 at tight end in just ${x}% of games, with ${T} around a limited role. Scoring was ${j} as the season progressed. That finish rate reflects a depth profile rather than a reliable starting tight end option.` : H = `His weekly output showed ${T}, finishing in a startable range ${x}% of the time. Production was ${j} late in the season.`;
  let L = "";
  if (C && $ >= 2) {
    const re = C.durabilityPct.toFixed(0), I = C.ppg.toFixed(1);
    L = `Across ${C.seasons} seasons, ${c} has averaged ${I} points per game with a durability rate of ${re}%, appearing in ${C.gamesPlayed} of ${C.maxGames} possible games. That track record provides helpful context for evaluating whether the ${f} production reflects a true baseline or a short-term variance window.`;
  }
  return [Z, H, L].filter(Boolean);
}
function Hk(n, r, a) {
  if (!r || r.gamesPlayed === 0) return [];
  const i = n.position || "", c = r.pos1Pct + r.pos2Pct, d = r.ppg > 0 ? r.volatility / r.ppg : 2, p = (() => {
    const g = { QB: [22, 17], RB: [16, 11], WR: [14, 9], TE: [11, 7] }, [x, w] = g[i] || [14, 9];
    return r.ppg >= x ? `Elite ${i}1` : r.ppg >= w && c >= 55 ? `Solid ${i}1` : r.ppg >= w ? `${i}2 Range` : `Streaming ${i}`;
  })(), f = (() => {
    const g = r.bustPct < 20, x = r.pos1Pct > 40;
    return g && x ? "High floor, high ceiling" : g ? "Safe floor, moderate ceiling" : x ? "Volatile, high upside" : "Boom-or-bust profile";
  })(), m = i === "QB" ? r.ppg >= 22 ? "Dual-threat scoring" : "Passing volume" : i === "RB" ? (n.careerSeasonStats?.[0]?.receptions ?? 0) >= 50 ? "Receiving + rushing role" : "Rushing volume and goal-line" : i === "WR" ? r.pos1Pct > 40 ? "Target share depth" : "Matchup upside" : i === "TE" ? "Target share at thin position" : "Usage volume", v = d >= 0.7 ? "High week-to-week variance" : r.bustPct >= 30 ? "Floor risk, bust-prone weeks" : r.pos1Pct < 25 ? "Limited ceiling weeks" : (r.ppg > 0 ? (r.last4Ppg - r.ppg) / r.ppg * 100 : 0) < -15 ? "Late-season scoring decline" : "TD-dependent production";
  return [
    { label: "Fantasy Tier", value: p },
    { label: "Weekly Profile", value: f },
    { label: "Primary Edge", value: m },
    { label: "Main Risk", value: v }
  ];
}
function Vk(n, r) {
  if (!r || r.gamesPlayed === 0) return { strengths: [], risks: [] };
  const a = n.position || "", i = r.pos1Pct + r.pos2Pct, c = r.ppg > 0 ? r.volatility / r.ppg : 2, d = r.ppg > 0 ? (r.last4Ppg - r.ppg) / r.ppg * 100 : 0, p = n.careerProfile, f = [], m = [];
  return i >= 60 && f.push(`Finishes in startable range ${i.toFixed(0)}% of weeks`), r.pos1Pct >= 40 && f.push(`Top-tier finish rate of ${r.pos1Pct.toFixed(0)}% creates ceiling upside`), r.bustPct < 20 && f.push("Reliable weekly floor with minimal bust risk"), c < 0.5 && f.push("Consistent scoring with low week-to-week variance"), p && p.durabilityPct >= 85 && f.push(`Strong availability, appearing in ${p.durabilityPct.toFixed(0)}% of possible games`), d > 8 && f.push("Trending upward heading into the offseason"), a === "QB" && r.ppg >= 22 && f.push("Dual-threat ability protects scoring floor each week"), a === "RB" && (n.careerSeasonStats?.[0]?.receptions ?? 0) >= 50 && f.push("Receiving role adds PPR value on top of rushing work"), f.length < 3 && f.push(`Established ${a} role with meaningful snap share`), c >= 0.7 && m.push("High week-to-week variance makes lineup decisions difficult"), r.bustPct >= 30 && m.push(`Bust rate of ${r.bustPct.toFixed(0)}% is a real concern for floor-sensitive formats`), d < -12 && m.push("Late-season scoring decline raises questions about role consistency"), r.pos1Pct < 25 && m.push("Limited ceiling weeks reduce upside in tournaments and daily formats"), p && p.durabilityPct < 80 && m.push(`Availability concerns, playing just ${p.durabilityPct.toFixed(0)}% of games in career`), (a === "WR" || a === "TE") && m.push("Production tied to target volume and quarterback efficiency"), m.length < 3 && m.push("Scheme or usage changes could shift value meaningfully"), { strengths: f.slice(0, 5), risks: m.slice(0, 5) };
}
function Gk(n, r, a, i) {
  if (!a || a.gamesPlayed === 0) return [];
  const c = n.position || "", d = n.name || "This player", p = n.season || 2025, f = a.ppg.toFixed(1), m = a.gamesPlayed, v = a.pos1Pct + a.pos2Pct, g = a.ppg > 0 ? a.volatility / a.ppg : 2, x = g < 0.4 ? "stable" : g < 0.65 ? "moderately consistent" : "volatile", w = r.filter((H) => rs(H.stats, c)), k = w.length > 0 ? w.reduce((H, L) => ze(L, i) > ze(H, i) ? L : H, w[0]) : null, S = w.length > 0 ? w.reduce((H, L) => ze(L, i) < ze(H, i) ? L : H, w[0]) : null, j = (() => {
    const H = { QB: [22, 17], RB: [14, 10], WR: [13, 9], TE: [11, 7] }, [L, re] = H[c] || [13, 9];
    return a.ppg >= L ? "elite-level" : a.ppg >= re && v >= 55 ? "reliable starter-level" : a.ppg >= re ? "solid" : "situational";
  })(), _ = v >= 60 ? "a reliable weekly starter" : v >= 40 ? "a flex-range option" : "a streaming-grade player", P = [];
  P.push(`${d}'s ${p} game log shows the profile of ${_} at the ${c} position`), P.push(`averaging ${f} fantasy points per game across ${m} appearances`), P.push(`with ${j} weekly output`);
  const T = c === "QB" ? "QB1" : c === "RB" ? "RB1" : c === "WR" ? "WR1" : c === "TE" ? "TE1" : "top-tier";
  P.push(`and ${T} finishes in ${a.pos1Pct.toFixed(0)}% of weeks`);
  const C = P.join(", ") + ".";
  let $ = "";
  if (k && S) {
    const H = ze(k, i).toFixed(1), L = ze(S, i).toFixed(1), re = (parseFloat(H) - parseFloat(L)).toFixed(1), I = a.bustPct < 15 ? `Even in quieter weeks, production rarely fell into a true bust range, with a bust rate of just ${a.bustPct.toFixed(0)}%.` : a.bustPct >= 35 ? `The bust rate of ${a.bustPct.toFixed(0)}% is a meaningful risk signal that managers should account for when setting lineups.` : `The bust rate of ${a.bustPct.toFixed(0)}% reflects some week-to-week risk that managers must weigh in close start-sit decisions.`;
    $ = `The peak game was ${H} points in Week ${k.week}${k.opp ? ` against ${k.opp}` : ""}, while the floor came in at ${L} points in Week ${S.week}${S.opp ? ` against ${S.opp}` : ""}. That ${re}-point range between the best and worst active games reflects a ${x} weekly scoring profile. ${I}`;
  }
  let V = "";
  const Z = a.ppg > 0 ? (a.last4Ppg - a.ppg) / a.ppg * 100 : 0;
  if (Math.abs(Z) > 8 && w.length >= 6) {
    const H = Z > 0 ? "upward" : "downward", L = Math.abs(Z) > 20 ? "sharply" : "moderately", re = a.last4Ppg.toFixed(1);
    Z > 0 ? V = `The game log also reveals a positive late-season trend, with scoring moving ${L} ${H} over the final four games to ${re} PPG. That closing momentum is an important signal for dynasty and keeper managers evaluating forward value heading into the offseason.` : V = `The game log also shows some late-season cooling, with production slipping ${L} ${H} over the final four games to ${re} PPG versus the ${a.ppg.toFixed(1)} season average. Whether that reflects a true role shift or game-script variance is worth tracking heading into 2026.`;
  }
  return [C, $, V].filter(Boolean);
}
function Qk(n, r, a, i) {
  if (!a || a.gamesPlayed === 0) return [];
  const c = n.position || "", d = n.name || "This player", p = r.filter((w) => rs(w.stats, c)), f = [], m = c === "QB" ? "QB1" : c === "RB" ? "RB24" : c === "WR" ? "WR2" : c === "TE" ? "TE1" : "top-tier", v = a.pos1Pct + a.pos2Pct, g = a.ppg > 0 ? a.volatility / a.ppg : 2, x = a.ppg > 0 ? (a.last4Ppg - a.ppg) / a.ppg * 100 : 0;
  if (a.pos1Pct >= 50 ? f.push({ icon: "up", text: `${d} produced elite weekly finishes in ${a.pos1Games} of ${a.gamesPlayed} games, one of the more consistent ceiling profiles at the ${c} position.` }) : a.pos1Pct >= 30 && f.push({ icon: "up", text: `${d} landed in the ${m} finish range ${a.pos1Games} times this season, providing meaningful upside for managers who started him consistently.` }), a.bustPct < 15 ? f.push({ icon: "up", text: `Only ${a.bustGames} bust-level week${a.bustGames === 1 ? "" : "s"} this season, indicating a strong weekly floor that makes roster decisions easier.` }) : a.bustPct >= 35 && f.push({ icon: "down", text: `Bust-level outputs in ${a.bustGames} of ${a.gamesPlayed} games highlight real floor risk, especially in head-to-head matchup formats.` }), g < 0.4 ? f.push({ icon: "up", text: "Scoring was remarkably consistent week to week, with low variance suggesting a role that held steady regardless of opponent or game script." }) : g >= 0.7 && f.push({ icon: "down", text: "High week-to-week variance makes the weekly ceiling hard to predict and leans the profile toward boom-or-bust territory." }), x > 12 && p.length >= 6 ? f.push({ icon: "up", text: `A notable late-season scoring surge, with the last four games averaging ${a.last4Ppg.toFixed(1)} PPG versus the ${a.ppg.toFixed(1)} season mark, suggests an expanding role heading into 2026.` }) : x < -15 && p.length >= 6 ? f.push({ icon: "down", text: `Production declined in the back half of the season, with the last four games averaging ${a.last4Ppg.toFixed(1)} PPG against the ${a.ppg.toFixed(1)} full-season average. Worth monitoring for offseason role clarity.` }) : x >= 0 && p.length >= 6 && f.push({ icon: "neutral", text: `Scoring held relatively steady through the final stretch of the season, with the last four games averaging ${a.last4Ppg.toFixed(1)} PPG close to the ${a.ppg.toFixed(1)} full-season average.` }), v >= 70 && f.push({ icon: "up", text: `Startable-range finishes (${m} or better) in ${v.toFixed(0)}% of weeks make this one of the more reliable floor profiles at the position.` }), p.length > 0) {
    const w = [...p].sort((S, j) => ze(j, i) - ze(S, i)).slice(0, Math.ceil(p.length / 2)), k = w.reduce((S, j) => S + ze(j, i), 0) / w.length;
    k > a.ppg * 1.5 && f.push({ icon: "neutral", text: `When scoring is above median, the ceiling jumps significantly (${k.toFixed(1)} PPG in the top half of games), which gives this profile strong tournament upside.` });
  }
  return f.slice(0, 5);
}
function Kk(n, r, a) {
  if (r.length === 0) return [];
  const i = n.name || "This player", c = n.position || "", d = n.season || 2025, p = a >= 70 ? "expanded meaningfully" : a >= 55 ? "held steady" : a <= 35 ? "contracted" : "remained relatively stable", f = r.reduce((P, T) => Math.abs(T.delta) > Math.abs(P.delta) ? T : P, r[0]), m = f.delta > 0 ? "increased" : "decreased", v = f.label.replace(/ \(Team\)/, "").replace(/\/G/, " per game").toLowerCase(), g = f.pct ? `${Math.abs(f.delta).toFixed(1)} percentage points` : `${Math.abs(f.delta).toFixed(1)} per game`, x = a >= 60 ? "a strengthening offensive role" : a <= 39 ? "a narrowing role" : "a stable role in the offense", w = `${i}'s usage profile in ${d} has ${p} over the last four weeks, pointing to ${x}. The biggest shift in the recent window is ${v}, which has ${m} by ${g} compared to the season baseline. For ${c} fantasy managers, these near-term volume signals are among the most actionable leading indicators heading into lineup decisions.`, k = r.filter((P) => P.delta > 0), S = r.filter((P) => P.delta < 0);
  let j = "";
  if (k.length > 0 && S.length > 0) {
    const P = k.map((C) => C.label.replace(/ \(Team\)/, "")).slice(0, 2).join(" and "), T = S.map((C) => C.label.replace(/ \(Team\)/, "")).slice(0, 2).join(" and ");
    j = `The recent snapshot shows a mixed signal, with ${P} trending upward while ${T} has pulled back versus the full-season average. This kind of divergence often reflects a short-term game-script shift rather than a fundamental role change, but tracking how these metrics settle over the next few games is important before making roster or trade decisions.`;
  } else k.length >= 3 ? j = `Multiple usage categories are moving in a positive direction recently, with ${k.map((T) => T.label.replace(/ \(Team\)/, "")).slice(0, 3).join(", ")} all trending upward. Broad-based expansion across volume metrics is one of the stronger short-term signals of growing fantasy upside and suggests the offensive role may be deepening.` : S.length >= 3 ? j = `Several categories have pulled back in the recent window, with ${S.map((T) => T.label.replace(/ \(Team\)/, "")).slice(0, 3).join(", ")} all contracting versus the season average. When multiple usage metrics decline together, it can foreshadow lower fantasy ceilings in the near term and is worth flagging before start-sit or trade decisions.` : k.length > 0 ? j = `${k.map((T) => T.label.replace(/ \(Team\)/, "")).join(" and ")} has been trending upward in the recent window, providing a modest positive signal for near-term role direction. The other usage metrics remain close to season averages, suggesting the role is holding steady overall.` : S.length > 0 && (j = `${S.map((T) => T.label.replace(/ \(Team\)/, "")).join(" and ")} has ticked back slightly in recent weeks. The rest of the usage profile stays near season averages, so this does not yet signal a major role change, but it is worth monitoring as the weeks ahead unfold.`);
  const _ = a >= 60 ? `Overall, the role trend is a positive signal for ${i}'s near-term fantasy value. Expanding usage at this stage of the season typically sustains or increases in the short term, making this player a higher-confidence option than the season average alone might suggest.` : a <= 39 ? `Overall, the contracting usage trend introduces some caution around ${i}'s near-term fantasy value. Declining volume signals at the positional level are among the most reliable predictors of scoring declines, so managing expectations until the role stabilizes is prudent.` : "Overall, the usage trend paints a picture of a stable role that is holding near its season-long baseline. That consistency is a positive signal for floor management, even if it does not add meaningful upside to the weekly ceiling.";
  return [w, j, _].filter(Boolean);
}
function Yk(n, r, a, i, c, d) {
  const p = n.position || "", f = n.name || "This player", m = r >= 70 ? "#22c55e" : r >= 45 ? "#f59e0b" : "#ef4444", v = c.pct >= 40 ? "#f59e0b" : c.pct >= 25 ? "#94a3b8" : "#22c55e", g = d >= 60 ? "#22c55e" : d <= 39 ? "#ef4444" : "#f59e0b", x = d >= 80 ? "Expanding fast" : d >= 60 ? "Expanding" : d <= 25 ? "Declining sharply" : d <= 39 ? "Declining" : "Stable", w = [
    { label: "Role Stability", value: `${r}/100`, sub: a, color: m },
    { label: "TD Dependency", value: `${c.pct.toFixed(0)}%`, sub: c.label, color: v },
    { label: "Role Direction", value: x, sub: `Score: ${d}/100`, color: g },
    ...i ? [{ label: "Volume Variance", value: i.replace(/Workload varies /i, "").replace(/Targets vary /i, ""), sub: "Week-to-week spread", color: "#94a3b8" }] : []
  ];
  let k = "";
  return r >= 70 && c.pct < 35 ? k = `${f}'s production profile is backed by consistent volume rather than touchdown spikes, which is one of the most reliable patterns in fantasy. The stable role and moderate TD reliance create a floor-friendly setup that holds value even in low-scoring games.` : r >= 70 && c.pct >= 35 ? k = `${f} carries a consistent usage base, but a meaningful share of production comes from touchdowns. While the floor is supported by volume, the ceiling is more TD-sensitive than the usage score alone implies, which introduces some regression risk if scoring efficiency normalizes.` : r < 45 && c.pct >= 35 ? k = "Both usage consistency and TD reliance present risk here. High week-to-week volatility in volume, combined with above-average TD dependency, creates a profile where the scoring floor can move sharply in either direction depending on game script and red-zone opportunity." : r < 45 ? k = `The volatile usage pattern is the primary risk signal for ${f}. Even when target share or touches look reasonable on average, the week-to-week swings make reliable floor projections difficult and widen the range of outcomes for any given week.` : k = `${f} sits in a moderate risk band, with usage consistency and TD reliance both near positional averages for the ${p} position. The profile does not carry extreme floor or ceiling risk, making the recent role direction score the most useful signal for near-term decisions.`, { cards: w, insight: k };
}
function qk(n, r, a, i, c) {
  if (r.length === 0) return [];
  const d = n.name || "This player", p = n.position || "", f = [], m = r.filter((w) => w.delta > 0), v = r.filter((w) => w.delta < 0), g = m.sort((w, k) => Math.abs(k.delta) - Math.abs(w.delta))[0], x = v.sort((w, k) => Math.abs(k.delta) - Math.abs(w.delta))[0];
  if (a >= 60 ? f.push({ icon: "up", text: `Role is expanding relative to the season baseline, improving the weekly floor and near-term upside for ${p} managers.` }) : a <= 39 ? f.push({ icon: "down", text: "Role is contracting in the recent window, which is a caution signal for weekly start decisions until volume recovers." }) : f.push({ icon: "neutral", text: "Overall role remains stable versus the season average, supporting a predictable scoring range without meaningful upside expansion." }), g) {
    const w = g.label.replace(/ \(Team\)/, "").toLowerCase();
    f.push({ icon: "up", text: `Rising ${w} strengthens the weekly scoring floor and signals growing offensive involvement.` });
  }
  if (x) {
    const w = x.label.replace(/ \(Team\)/, "").toLowerCase();
    f.push({ icon: "down", text: `Declining ${w} pulls the ceiling down slightly and is worth monitoring before commit-to-start decisions.` });
  }
  return c.pct >= 40 ? f.push({ icon: "down", text: `TD dependency of ${c.pct.toFixed(0)}% means production is sensitive to red-zone outcomes, which can swing the week by several points in either direction.` }) : c.pct < 20 ? f.push({ icon: "up", text: "Low TD reliance means scoring is grounded in volume rather than touchdown luck, reducing variance and supporting a more reliable floor." }) : f.push({ icon: "neutral", text: `TD reliance is moderate at ${c.pct.toFixed(0)}%, meaning scoring is balanced between yardage volume and touchdown contribution.` }), i >= 70 ? f.push({ icon: "up", text: `High usage consistency creates a predictable week-to-week range, making ${d} easier to deploy with confidence in matchup-neutral situations.` }) : i < 45 && f.push({ icon: "down", text: "Volatile week-to-week usage widens the scoring range and increases the risk of down weeks even when the role appears intact on average." }), f.slice(0, 5);
}
function Xk({ player: n, entries: r, format: a = "ppr" }) {
  const i = qu(r, n.position, a), c = Wk(r, n.position), d = r.filter((C) => rs(C.stats, n.position)), p = d.map((C) => ze(C, a)), f = Bk(n, i, a), m = i && i.gamesPlayed > 0, v = i?.ppg ?? 0;
  i?.last4Ppg;
  const g = n.careerProfile || null, x = ox(n.position), w = n.position || "", k = { QB: 16.5, RB: 11.5, WR: 10.5, TE: 8 }[n.position || ""] ?? 10, S = v - k, j = Uk(n, i), _ = Hk(n, i), { strengths: P, risks: T } = Vk(n, i);
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-overview", style: { display: "flex", flexDirection: "column", gap: "32px" }, children: [
    j.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Fantasy Outlook Summary" }),
      j.map((C, $) => /* @__PURE__ */ s.jsx("p", { style: { fontSize: "14px", lineHeight: "1.75", color: "var(--sc-text-muted, #94a3b8)", marginBottom: $ < j.length - 1 ? "12px" : 0 }, children: C }, $))
    ] }),
    _.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, children: [
      /* @__PURE__ */ s.jsx(ft, { title: "At a Glance" }),
      /* @__PURE__ */ s.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }, children: _.map((C) => /* @__PURE__ */ s.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "4px" }, children: [
        /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }, children: C.label }),
        /* @__PURE__ */ s.jsx("p", { style: { fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }, children: C.value })
      ] }, C.label)) })
    ] }),
    m ? (() => {
      const C = i.volatility < 6 ? "Stable" : i.volatility < 9 ? "Moderate" : "Volatile", $ = i.volatility < 6 ? "text-green-600 dark:text-green-400" : i.volatility < 9 ? "text-amber-600 dark:text-amber-400" : "text-red-500 dark:text-red-400", V = v > 0 ? i.volatility / v : 2, Z = Math.round(100 / (1 + Math.pow(V / 0.6, 2))), H = Z >= 70 ? "Very Reliable" : Z >= 45 ? "Average" : "Boom or Bust", L = Z >= 70 ? "text-green-600 dark:text-green-400" : Z >= 45 ? "text-foreground" : "text-red-500 dark:text-red-400", re = (() => {
        const I = i.pos1Pct + i.pos2Pct;
        return I >= 60 ? { label: "Starter", color: "bg-green-500/15 text-green-700 dark:text-green-400" } : I >= 35 ? { label: "Flex", color: "bg-teal-500/15 text-teal-700 dark:text-teal-400" } : { label: "Depth", color: "bg-slate-500/15 text-slate-600 dark:text-slate-400" };
      })();
      return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "overview-stat-boxes", className: "sc-overview__section", style: { padding: "20px" }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-4", children: [
            n.seasonLabel && /* @__PURE__ */ s.jsx("p", { className: "sc-overview__section-title", "data-testid": "text-season-label", children: n.seasonLabel }),
            /* @__PURE__ */ s.jsxs(fn, { variant: "secondary", className: `text-[9px] px-1.5 py-0 ${re.color}`, "data-testid": "badge-role-grade", children: [
              "Role: ",
              re.label,
              " ",
              w
            ] })
          ] }),
          /* @__PURE__ */ s.jsx(ft, { title: "2025 Fantasy Performance", subtitle: "Season scoring output and positional finish rates" }),
          /* @__PURE__ */ s.jsxs("div", { className: "grid gap-3 grid-cols-2 md:grid-cols-4", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "PPG" }),
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-number", "data-testid": "text-ppg-hero", children: v.toFixed(1) }),
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-meta", children: n.seasonRank ? `${i.gamesPlayed} GP · ${w}${n.seasonRank}` : `${i.gamesPlayed} GP` }),
              /* @__PURE__ */ s.jsxs("div", { className: `sc-overview__ppg-delta ${S >= 0 ? "sc-overview__ppg-delta--up" : "sc-overview__ppg-delta--down"}`, "data-testid": "text-ppg-delta", children: [
                S >= 0 ? /* @__PURE__ */ s.jsx(Do, { className: "w-3 h-3" }) : /* @__PURE__ */ s.jsx(du, { className: "w-3 h-3" }),
                S >= 0 ? "+" : "",
                S.toFixed(1),
                " vs Pos Avg"
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-label", children: [
                _t(n.position, 1),
                " Rate"
              ] }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-number", style: { color: "#16a34a" }, "data-testid": "text-pos1-pct", children: [
                i.pos1Pct.toFixed(0),
                "%"
              ] }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-meta", children: [
                _t(n.position, 1),
                " Weeks (",
                w,
                "1",
                "–",
                w,
                "12)"
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-label", children: [
                _t(n.position, 2),
                " Rate"
              ] }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-number", style: { color: "#0d9488", fontSize: "18px" }, "data-testid": "text-pos2-pct", children: [
                i.pos2Pct.toFixed(0),
                "%"
              ] }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-meta", children: [
                _t(n.position, 2),
                " Weeks (",
                w,
                "13",
                "–",
                w,
                24,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-label", children: [
                _t(n.position, 3),
                " Rate"
              ] }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-number", style: { color: "#64748b", fontSize: "18px" }, "data-testid": "text-pos3-pct", children: [
                i.pos3Pct.toFixed(0),
                "%"
              ] }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-meta", children: [
                _t(n.position, 3),
                " Weeks (",
                w,
                "25",
                "–",
                w,
                x.bust,
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx("div", { "data-testid": "tier-distribution-bar", style: { marginTop: "14px" }, children: (() => {
            const I = i.pos1Pct + i.pos2Pct + i.pos3Pct + i.bustPct, K = I > 0 ? 100 / I : 1, B = i.pos1Pct * K, G = i.pos2Pct * K, M = i.pos3Pct * K, Y = i.bustPct * K;
            return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__tier-bar", children: [
                B > 0 && /* @__PURE__ */ s.jsx("div", { className: "sc-overview__tier-bar-seg", style: { flex: B, background: "#22c55e" }, title: `${_t(n.position, 1)}: ${i.pos1Pct.toFixed(0)}%` }),
                G > 0 && /* @__PURE__ */ s.jsx("div", { className: "sc-overview__tier-bar-seg", style: { flex: G, background: "#2dd4bf" }, title: `${_t(n.position, 2)}: ${i.pos2Pct.toFixed(0)}%` }),
                M > 0 && /* @__PURE__ */ s.jsx("div", { className: "sc-overview__tier-bar-seg", style: { flex: M, background: "#94a3b8" }, title: `${_t(n.position, 3)}: ${i.pos3Pct.toFixed(0)}%` }),
                Y > 0 && /* @__PURE__ */ s.jsx("div", { className: "sc-overview__tier-bar-seg", style: { flex: Y, background: "#f87171" }, title: `Bust: ${i.bustPct.toFixed(0)}%` })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3 mt-1.5 flex-wrap", children: [
                /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "w-2 h-2 rounded-full inline-block", style: { background: "#22c55e" } }),
                  /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: [
                    _t(n.position, 1),
                    " ",
                    i.pos1Pct.toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "w-2 h-2 rounded-full inline-block", style: { background: "#2dd4bf" } }),
                  /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: [
                    _t(n.position, 2),
                    " ",
                    i.pos2Pct.toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "w-2 h-2 rounded-full inline-block", style: { background: "#94a3b8" } }),
                  /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: [
                    _t(n.position, 3),
                    " ",
                    i.pos3Pct.toFixed(0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "w-2 h-2 rounded-full inline-block", style: { background: "#f87171" } }),
                  /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: [
                    "Bust ",
                    i.bustPct.toFixed(0),
                    "%"
                  ] })
                ] })
              ] })
            ] });
          })() })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, children: [
          /* @__PURE__ */ s.jsx(ft, { title: "Weekly Fantasy Risk Assessment", subtitle: "Downside exposure and weekly floor indicators" }),
          /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__risk-cell sc-overview__risk-cell--bust", "data-tooltip": "Percentage of games finishing outside startable range", "data-testid": "risk-cell-bust", children: [
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Bust %" }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-number", style: { color: "#ef4444" }, "data-testid": "text-bust-pct-risk", children: [
                i.bustPct.toFixed(0),
                "%"
              ] }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-meta", children: [
                "Bust Weeks (",
                w,
                x.bust + 1,
                "+)"
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__risk-cell sc-overview__risk-cell--volatility", "data-tooltip": "Weekly scoring deviation relative to positional mean", "data-testid": "risk-cell-volatility", children: [
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Volatility" }),
              /* @__PURE__ */ s.jsx("p", { className: `sc-overview__stat-number ${$}`, children: i.volatility.toFixed(1) }),
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-meta", children: C })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__risk-cell sc-overview__risk-cell--reliability", "data-tooltip": "Consistency score based on coefficient of variation (0-100)", "data-testid": "risk-cell-reliability", children: [
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Reliability" }),
              /* @__PURE__ */ s.jsx("p", { className: `sc-overview__stat-number ${L}`, children: Z }),
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-meta", children: H })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__risk-cell sc-overview__risk-cell--goose", "data-tooltip": "Percentage of games with zero fantasy points scored", "data-testid": "risk-cell-goose", children: [
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Goose Egg" }),
              /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-number", style: { color: i.gooseEggPct > 0 ? "#ef4444" : "#16a34a" }, "data-testid": "text-goose-egg", children: [
                i.gooseEggPct.toFixed(0),
                "%"
              ] }),
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-meta", children: "0-Point Games" })
            ] })
          ] })
        ] }),
        p.length > 1 && (() => {
          const I = Zt(p), K = p.indexOf(Math.max(...p));
          p[K], d[K];
          const B = p.reduce((q, de) => q + de, 0) / p.length, G = p.slice(-3).reduce((q, de) => q + de, 0) / Math.min(3, p.length), M = B > 0 ? (G - B) / B * 100 : 0, Y = n.position === "QB" ? { label: "Rush Attempts", unit: "att" } : n.position === "RB" ? { label: "Touches/Game", unit: "tch" } : n.position === "WR" || n.position === "TE" ? { label: "Targets/Game", unit: "tgt" } : null, X = n.position === "QB" ? d.map((q) => q.stats.rush_att ?? 0) : n.position === "RB" ? d.map((q) => (q.stats.rush_att ?? 0) + (q.stats.rec_tgt ?? 0)) : n.position === "WR" || n.position === "TE" ? d.map((q) => q.stats.rec_tgt ?? 0) : null, te = X ? Zt(X) : null, D = X && X.length >= 3 ? X.slice(-3).reduce((q, de) => q + de, 0) / 3 : null, ne = X && X.length > 0 ? X.reduce((q, de) => q + de, 0) / X.length : null, J = D != null && ne && ne > 0 ? (D - ne) / ne * 100 : null, A = () => Math.abs(M) < 5 ? `Averaging ${G.toFixed(1)} PPG over last 3 — in line with season baseline.` : `Recent output ${M > 0 ? "up" : "down"} ${Math.abs(M).toFixed(0)}% vs season — ${G.toFixed(1)} PPG over last 3 weeks.`, ee = () => {
            if (D == null || ne == null || J == null) return "";
            if (Math.abs(J) < 5) return `${Y.label} holding steady at ${D.toFixed(1)}/gm vs ${ne.toFixed(1)} season avg.`;
            const q = J > 0 ? "up" : "down";
            return `${Y.label} ${q} ${Math.abs(J).toFixed(0)}% — ${D.toFixed(1)}/gm vs ${ne.toFixed(1)} season avg.`;
          }, ve = () => J == null || Math.abs(M) < 5 && Math.abs(J) < 5 ? "" : Math.abs(J) > Math.abs(M) * 1.5 ? `Usage-driven ${M < 0 ? "decline" : "shift"} — opportunity ${J > 0 ? "up" : "down"} ${Math.abs(J).toFixed(0)}% vs season.` : Math.abs(M) > Math.abs(J) * 1.5 ? `Efficiency-driven ${M < 0 ? "decline" : "surge"} — usage stable, production ${M > 0 ? "up" : "down"} ${Math.abs(M).toFixed(0)}%.` : `Production and usage trending ${M > 0 ? "up" : "down"} together — ${Math.abs(M).toFixed(0)}% shift across both.`, be = (() => {
            const q = [];
            return Math.abs(M) < 5 ? q.push({ text: "Production Stable", color: "" }) : M > 0 ? q.push({ text: "Production Rising", color: "sc-overview__trend-signal-word--green" }) : q.push({ text: "Production Declining", color: "sc-overview__trend-signal-word--red" }), J != null && (Math.abs(J) < 5 ? q.push({ text: "Usage Stable", color: "" }) : J > 0 ? q.push({ text: "Usage Rising", color: "sc-overview__trend-signal-word--green" }) : q.push({ text: "Usage Declining", color: "sc-overview__trend-signal-word--red" })), q;
          })();
          return /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__trend-card", "data-testid": "section-trend-diagnostics", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-2 mb-3 flex-wrap", children: [
              /* @__PURE__ */ s.jsx(ft, { title: "Recent Fantasy Trend Diagnostics", subtitle: "Weekly production arc and rolling efficiency signals" }),
              /* @__PURE__ */ s.jsx(zk, { data: p, unit: "PPG" })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__trend-signal", "data-testid": "trend-signal-summary", children: [
              /* @__PURE__ */ s.jsx("span", { style: { fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8" }, children: "Trend Signal:" }),
              be.map((q, de) => /* @__PURE__ */ s.jsxs("span", { children: [
                /* @__PURE__ */ s.jsx("span", { className: q.color, style: { fontWeight: 700 }, children: q.text }),
                de < be.length - 1 && /* @__PURE__ */ s.jsx("span", { style: { color: "#cbd5e1", margin: "0 2px" }, children: "|" })
              ] }, de))
            ] }),
            /* @__PURE__ */ s.jsxs("div", { children: [
              /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 mb-1.5 flex-wrap", children: [
                /* @__PURE__ */ s.jsx("p", { style: { fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: "-0.01em" }, children: "Points Trend" }),
                /* @__PURE__ */ s.jsx("span", { style: { fontSize: "10px", color: "#94a3b8" }, children: "(3-Week Rolling Average vs Weekly)" })
              ] }),
              /* @__PURE__ */ s.jsx(
                wu,
                {
                  data: p,
                  rollingAvg: I,
                  bestIdx: K,
                  height: 170,
                  label: "fpts",
                  accentColor: "#0b3a7a",
                  showAvgLine: !0,
                  highlightLast: 3,
                  showRecentFormLabel: !0,
                  showGridLines: !0
                }
              ),
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", color: "#94a3b8", marginTop: "8px" }, "data-testid": "text-points-insight", children: A() })
            ] }),
            X && X.length > 1 && Y && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("div", { style: { margin: "16px 0", borderTop: "1px solid rgba(15,23,42,0.06)" } }),
              /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 mb-1.5 flex-wrap", children: [
                  /* @__PURE__ */ s.jsx("p", { style: { fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: "-0.01em" }, children: "Usage Trend" }),
                  /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "10px", color: "#94a3b8" }, children: [
                    Y.label,
                    " (3-Week Avg vs Weekly)"
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx(
                  wu,
                  {
                    data: X,
                    rollingAvg: te || void 0,
                    height: 110,
                    label: "secondary",
                    accentColor: "hsl(var(--chart-2))",
                    showAvgLine: !0,
                    highlightLast: 3,
                    showRecentFormLabel: !0,
                    showGridLines: !0
                  }
                ),
                /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", color: "#94a3b8", marginTop: "8px" }, "data-testid": "text-usage-insight", children: ee() }),
                (() => {
                  const q = ve();
                  return q ? /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", color: "#475569", fontWeight: 600, marginTop: "4px" }, "data-testid": "text-diagnostic-insight", children: q }) : null;
                })()
              ] })
            ] })
          ] });
        })(),
        d.length >= 3 && (() => {
          const I = n.position, K = (q, de) => q.stats[de] ?? 0, B = d.slice(-3), G = d.length, M = p.reduce((q, de) => q + de, 0) / p.length, Y = p.slice(-3).reduce((q, de) => q + de, 0) / Math.min(3, p.length), X = M > 0 ? (Y - M) / M * 100 : 0, te = [];
          let D = "", ne = "";
          const J = (q, de, ce, z, oe, se, Pe) => {
            const Ae = z ? de / G : de, Ie = z ? ce / 3 : ce, qe = Ae > 0 ? (Ie - Ae) / Ae * 100 : 0;
            return { label: q, season: Ae, recent: Ie, pct: qe, fmt: se || ((St) => St.toFixed(1)), group: oe, primary: Pe };
          };
          if (I === "WR" || I === "TE") {
            const q = d.reduce((E, W) => E + K(W, "rec_tgt"), 0), de = B.reduce((E, W) => E + K(W, "rec_tgt"), 0), ce = d.reduce((E, W) => E + K(W, "rec_yd"), 0), z = B.reduce((E, W) => E + K(W, "rec_yd"), 0), oe = d.reduce((E, W) => E + K(W, "rec"), 0), se = B.reduce((E, W) => E + K(W, "rec"), 0), Pe = d.reduce((E, W) => E + K(W, "rec_td"), 0), Ae = B.reduce((E, W) => E + K(W, "rec_td"), 0);
            te.push(J("Targets/G", q, de, !0, "usage", void 0, !0)), te.push(J("Yards/G", ce, z, !0, "usage", void 0, !0));
            const Ie = q > 0 ? oe / q * 100 : 0, qe = de > 0 ? se / de * 100 : 0, St = Ie > 0 ? (qe - Ie) / Ie * 100 : 0;
            te.push({ label: "Catch %", season: Ie, recent: qe, pct: St, fmt: (E) => `${E.toFixed(0)}%`, group: "efficiency" });
            const tt = q > 0 ? ce / q : 0, Ee = de > 0 ? z / de : 0, Ge = tt > 0 ? (Ee - tt) / tt * 100 : 0;
            te.push({ label: "Yds/Target", season: tt, recent: Ee, pct: Ge, fmt: (E) => E.toFixed(1), group: "efficiency" }), te.push(J("TDs/Game", Pe, Ae, !0, "efficiency", (E) => E.toFixed(2))), te.push({ label: `${_t(n.position, 1)} %`, season: i.pos1Pct, recent: i.pos1Pct, pct: 0, fmt: (E) => `${E.toFixed(0)}%`, group: "context" });
            const st = te[0].pct;
            X < -5 ? st < -15 ? (D = "Usage-Driven Decline", ne = `Target volume down ${Math.abs(st).toFixed(0)}% vs season.`) : Math.abs(st) <= 10 ? (D = "Efficiency-Driven Decline", ne = "Targets stable, production falling.") : st > 10 && (D = "Low Conversion", ne = `Targets up ${st.toFixed(0)}% but output declining.`) : X > 5 && (st > 10 ? (D = "Rising Usage", ne = `Target volume up ${st.toFixed(0)}%, fueling production.`) : (D = "Efficiency Surge", ne = "Doing more with similar opportunity share."));
          } else if (I === "RB") {
            const q = d.reduce((Ee, Ge) => Ee + K(Ge, "rush_att"), 0), de = B.reduce((Ee, Ge) => Ee + K(Ge, "rush_att"), 0), ce = d.reduce((Ee, Ge) => Ee + K(Ge, "rush_yd"), 0), z = B.reduce((Ee, Ge) => Ee + K(Ge, "rush_yd"), 0), oe = d.reduce((Ee, Ge) => Ee + K(Ge, "rec_tgt"), 0), se = B.reduce((Ee, Ge) => Ee + K(Ge, "rec_tgt"), 0), Pe = d.reduce((Ee, Ge) => Ee + K(Ge, "rush_td"), 0) + d.reduce((Ee, Ge) => Ee + K(Ge, "rec_td"), 0), Ae = B.reduce((Ee, Ge) => Ee + K(Ge, "rush_td"), 0) + B.reduce((Ee, Ge) => Ee + K(Ge, "rec_td"), 0);
            te.push(J("Carries/G", q, de, !0, "usage", void 0, !0)), te.push(J("Rush Yds/G", ce, z, !0, "usage", void 0, !0));
            const Ie = q > 0 ? ce / q : 0, qe = de > 0 ? z / de : 0, St = Ie > 0 ? (qe - Ie) / Ie * 100 : 0;
            te.push({ label: "YPC", season: Ie, recent: qe, pct: St, fmt: (Ee) => Ee.toFixed(1), group: "efficiency" }), te.push(J("Targets/G", oe, se, !0, "efficiency")), te.push(J("TDs/Game", Pe, Ae, !0, "efficiency", (Ee) => Ee.toFixed(2))), te.push({ label: `${_t(n.position, 1)} %`, season: i.pos1Pct, recent: i.pos1Pct, pct: 0, fmt: (Ee) => `${Ee.toFixed(0)}%`, group: "context" });
            const tt = te[0].pct;
            X < -5 ? tt < -15 ? (D = "Usage-Driven Decline", ne = `Carry volume down ${Math.abs(tt).toFixed(0)}% vs season.`) : Math.abs(tt) <= 10 ? (D = "Efficiency-Driven Decline", ne = "Carries stable, production falling.") : tt > 10 && (D = "Low Conversion", ne = `Carries up ${tt.toFixed(0)}% but output declining.`) : X > 5 && (tt > 10 ? (D = "Rising Workload", ne = `Carry volume up ${tt.toFixed(0)}%, fueling production.`) : (D = "Efficiency Surge", ne = "Doing more with similar volume."));
          } else if (I === "QB") {
            const q = d.reduce((E, W) => E + K(W, "pass_cmp"), 0), de = B.reduce((E, W) => E + K(W, "pass_cmp"), 0), ce = d.reduce((E, W) => E + K(W, "pass_att"), 0), z = B.reduce((E, W) => E + K(W, "pass_att"), 0), oe = d.reduce((E, W) => E + K(W, "pass_yd"), 0), se = B.reduce((E, W) => E + K(W, "pass_yd"), 0), Pe = d.reduce((E, W) => E + K(W, "pass_td"), 0), Ae = B.reduce((E, W) => E + K(W, "pass_td"), 0), Ie = d.reduce((E, W) => E + K(W, "pass_int"), 0), qe = B.reduce((E, W) => E + K(W, "pass_int"), 0), St = d.reduce((E, W) => E + K(W, "rush_yd"), 0), tt = B.reduce((E, W) => E + K(W, "rush_yd"), 0);
            te.push(J("Pass Yds/G", oe, se, !0, "usage", void 0, !0)), te.push(J("TDs/Game", Pe, Ae, !0, "usage", (E) => E.toFixed(2), !0));
            const Ee = ce > 0 ? q / ce * 100 : 0, Ge = z > 0 ? de / z * 100 : 0, st = Ee > 0 ? (Ge - Ee) / Ee * 100 : 0;
            te.push({ label: "Cmp %", season: Ee, recent: Ge, pct: st, fmt: (E) => `${E.toFixed(0)}%`, group: "efficiency" }), te.push(J("INT/G", Ie, qe, !0, "efficiency")), te.push(J("Rush Yds/G", St, tt, !0, "efficiency")), te.push({ label: `${_t(n.position, 1)} %`, season: i.pos1Pct, recent: i.pos1Pct, pct: 0, fmt: (E) => `${E.toFixed(0)}%`, group: "context" }), X < -5 ? (D = "Production Declining", ne = "Monitor passing efficiency and turnovers.") : X > 5 && (D = "Trending Upward", ne = "Elevated production vs season baseline.");
          }
          if (te.length === 0) return null;
          const A = te.filter((q) => q.group === "usage"), ee = te.filter((q) => q.group === "efficiency"), ve = te.filter((q) => q.group === "context"), be = (q) => {
            const de = Math.abs(q.pct) < 1 ? null : q.pct > 0 ? Do : du, ce = Math.abs(q.pct) < 1 ? "#94a3b8" : q.pct > 0 ? "#16a34a" : "#ef4444";
            return /* @__PURE__ */ s.jsxs("div", { className: `sc-overview__role-card-cell ${q.primary ? "sc-overview__role-card-cell--primary" : ""}`, children: [
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94a3b8", marginBottom: "4px" }, children: q.label }),
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: q.primary ? "16px" : "14px", fontWeight: 800, color: "#0b3a7a", fontFamily: "ui-monospace, monospace", lineHeight: 1 }, children: q.fmt(q.recent) }),
              /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-center gap-1", style: { marginTop: "4px" }, children: [
                /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontFamily: "ui-monospace, monospace" }, children: [
                  "Szn: ",
                  q.fmt(q.season)
                ] }),
                /* @__PURE__ */ s.jsxs("span", { className: "inline-flex items-center gap-px", style: { fontSize: "9px", fontWeight: 700, color: ce, fontFamily: "ui-monospace, monospace" }, children: [
                  de && /* @__PURE__ */ s.jsx(de, { className: "w-2.5 h-2.5" }),
                  Math.abs(q.pct) < 1 ? "0%" : `${q.pct > 0 ? "+" : ""}${q.pct.toFixed(0)}%`
                ] })
              ] })
            ] }, q.label);
          };
          return /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", "data-testid": "section-role-snapshot", children: [
            /* @__PURE__ */ s.jsx(ft, { title: "Role and Usage Snapshot", subtitle: "Season baseline vs recent usage comparison" }),
            A.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: "8px" }, children: "Usage" }),
              /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2 mb-3", "data-testid": "role-snapshot-usage", children: A.map(be) })
            ] }),
            ee.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: "8px" }, children: "Efficiency" }),
              /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2 mb-3", "data-testid": "role-snapshot-efficiency", children: ee.map(be) })
            ] }),
            ve.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: "8px" }, children: "Context" }),
              /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", "data-testid": "role-snapshot-context", children: ve.map(be) })
            ] }),
            D && /* @__PURE__ */ s.jsxs("div", { style: { marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(15,23,42,0.06)" }, "data-testid": "text-role-signal", children: [
              /* @__PURE__ */ s.jsxs("p", { style: { fontSize: "11px", fontWeight: 700, color: "#334155" }, children: [
                "Signal: ",
                D
              ] }),
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", color: "#94a3b8", marginTop: "2px" }, children: ne })
            ] })
          ] });
        })(),
        c.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", children: [
          /* @__PURE__ */ s.jsx(ft, { title: "Season Stat Summary" }),
          /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: c.map((I) => /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
            /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: I.label }),
            /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-number", style: { color: "#0b3a7a" }, children: Number.isInteger(I.total) ? I.total : I.total.toFixed(1) }),
            /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-meta", children: [
              I.perGame.toFixed(1),
              "/g"
            ] })
          ] }, I.label)) })
        ] }),
        g && (() => {
          const I = g.durabilityPct >= 90 ? "#16a34a" : g.durabilityPct >= 70 ? "#0f172a" : "#ef4444", K = g.volatilityLabel === "Low" ? "#16a34a" : g.volatilityLabel === "Moderate" ? "#0f172a" : "#ef4444", B = g.seasonPpgs, G = Math.max(...B.map((Y) => Y.ppg), 1), M = 48;
          return /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", "data-testid": "section-career-profile", children: [
            g.smallSample && /* @__PURE__ */ s.jsx(fn, { variant: "secondary", className: "text-[9px] px-1.5 py-0 mb-2 bg-amber-500/15 text-amber-700 dark:text-amber-400", "data-testid": "badge-small-sample", children: "Small Sample" }),
            /* @__PURE__ */ s.jsx(ft, { title: "Career Profile", subtitle: `3-year performance overview across ${g.gamesPlayed} games` }),
            /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-4", "data-testid": "career-profile-stats", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
                /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Career PPG" }),
                /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-number", style: { color: "#0b3a7a" }, children: g.ppg.toFixed(1) })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
                /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Durability" }),
                /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-number", style: { color: I }, children: [
                  g.durabilityPct.toFixed(0),
                  "%"
                ] }),
                /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-meta", children: [
                  g.gamesPlayed,
                  " of ",
                  g.maxGames,
                  " games"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
                /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Volatility" }),
                /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-number", style: { color: K }, children: g.volatility.toFixed(1) }),
                /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-meta", children: g.volatilityLabel })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__stat-cell", children: [
                /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", children: "Stability" }),
                (() => {
                  const Y = B.length >= 2 ? (B[B.length - 1].ppg - B[0].ppg) / Math.max(B[0].ppg, 1) * 100 : 0, X = Math.abs(Y) < 10 ? "Steady" : Y > 0 ? "Ascending" : "Declining", te = Math.abs(Y) < 10 || Y > 0 ? "#16a34a" : "#ef4444";
                  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                    /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-number", style: { color: te, fontSize: "14px" }, children: X }),
                    /* @__PURE__ */ s.jsxs("p", { className: "sc-overview__stat-meta", children: [
                      Y >= 0 ? "+" : "",
                      Y.toFixed(0),
                      "% trend"
                    ] })
                  ] });
                })()
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { style: { marginBottom: "14px" }, children: [
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", style: { marginBottom: "6px" }, children: "Tier Breakdown" }),
              /* @__PURE__ */ s.jsxs("div", { className: "grid gap-2 grid-cols-4", "data-testid": "career-tier-breakdown", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__role-card-cell", children: [
                  /* @__PURE__ */ s.jsxs("p", { style: { fontSize: "14px", fontWeight: 800, color: "#16a34a", fontFamily: "ui-monospace, monospace" }, children: [
                    g.pos1Pct.toFixed(0),
                    "%"
                  ] }),
                  /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: _t(n.position, 1) })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__role-card-cell", children: [
                  /* @__PURE__ */ s.jsxs("p", { style: { fontSize: "14px", fontWeight: 800, color: "#0d9488", fontFamily: "ui-monospace, monospace" }, children: [
                    g.pos2Pct.toFixed(0),
                    "%"
                  ] }),
                  /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: _t(n.position, 2) })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__role-card-cell", children: [
                  /* @__PURE__ */ s.jsxs("p", { style: { fontSize: "14px", fontWeight: 800, color: "#64748b", fontFamily: "ui-monospace, monospace" }, children: [
                    g.pos3Pct.toFixed(0),
                    "%"
                  ] }),
                  /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: _t(n.position, 3) })
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__role-card-cell", children: [
                  /* @__PURE__ */ s.jsxs("p", { style: { fontSize: "14px", fontWeight: 800, color: "#ef4444", fontFamily: "ui-monospace, monospace" }, children: [
                    g.bustPct.toFixed(0),
                    "%"
                  ] }),
                  /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", color: "#94a3b8", fontWeight: 600 }, children: "Bust" })
                ] })
              ] })
            ] }),
            B.length > 1 && /* @__PURE__ */ s.jsxs("div", { children: [
              /* @__PURE__ */ s.jsx("p", { className: "sc-overview__stat-label", style: { marginBottom: "6px" }, children: "Career Arc" }),
              /* @__PURE__ */ s.jsx("div", { className: "flex items-end gap-2", "data-testid": "career-arc-chart", style: { height: M + 20 }, children: B.map((Y, X) => {
                const te = Math.max(6, Y.ppg / G * M), D = X === B.length - 1;
                return /* @__PURE__ */ s.jsxs("div", { className: "flex-1 flex flex-col items-center gap-1", children: [
                  /* @__PURE__ */ s.jsx("span", { style: { fontSize: "9px", fontWeight: 700, fontFamily: "ui-monospace, monospace", color: D ? "#0f172a" : "#94a3b8" }, children: Y.ppg.toFixed(1) }),
                  /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      style: {
                        width: "100%",
                        height: te,
                        borderRadius: "4px",
                        background: D ? "linear-gradient(180deg, #1a3f8a, #2d7df6)" : "rgba(15,23,42,0.10)",
                        transition: "height 0.3s ease"
                      }
                    }
                  ),
                  /* @__PURE__ */ s.jsx("span", { style: { fontSize: "9px", fontWeight: 600, fontFamily: "ui-monospace, monospace", color: "#94a3b8" }, children: String(Y.season).slice(2) })
                ] }, Y.season);
              }) })
            ] })
          ] });
        })()
      ] });
    })() : /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "32px", textAlign: "center" }, children: [
      /* @__PURE__ */ s.jsx("p", { style: { color: "#94a3b8", fontSize: "14px", fontWeight: 500 }, children: "No season data available yet." }),
      /* @__PURE__ */ s.jsx("p", { style: { color: "#cbd5e1", fontSize: "12px", marginTop: "4px" }, children: "Stats will appear once the season begins." })
    ] }),
    (P.length > 0 || T.length > 0) && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, "data-testid": "section-strengths-risks", children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Fantasy Strengths and Risk Factors", subtitle: "Key production drivers and downside factors heading into 2026." }),
      /* @__PURE__ */ s.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }, children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#16a34a", marginBottom: "10px" }, children: "Strengths" }),
          /* @__PURE__ */ s.jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }, children: P.map((C, $) => /* @__PURE__ */ s.jsxs("li", { style: { display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--foreground)", lineHeight: "1.5" }, children: [
            /* @__PURE__ */ s.jsx("span", { style: { color: "#16a34a", fontWeight: 700, marginTop: "1px", flexShrink: 0 }, children: "+" }),
            C
          ] }, $)) })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#ef4444", marginBottom: "10px" }, children: "Risk Factors" }),
          /* @__PURE__ */ s.jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }, children: T.map((C, $) => /* @__PURE__ */ s.jsxs("li", { style: { display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--foreground)", lineHeight: "1.5" }, children: [
            /* @__PURE__ */ s.jsx("span", { style: { color: "#ef4444", fontWeight: 700, marginTop: "1px", flexShrink: 0 }, children: "-" }),
            C
          ] }, $)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__outlook", "data-testid": "section-quick-outlook", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 mb-3 flex-wrap", children: [
        /* @__PURE__ */ s.jsx(Bi, { className: "w-4 h-4", style: { color: "#d4af37" } }),
        /* @__PURE__ */ s.jsx(ft, { title: "2026 Fantasy Outlook", subtitle: "Projected role trajectory and risk summary" })
      ] }),
      f.hasData ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "sc-overview__outlook-role-badge", "data-testid": "text-outlook-role", children: f.roleLabel }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__outlook-meta", "data-testid": "outlook-stat-lines", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__outlook-meta-item", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sc-overview__outlook-meta-label", children: "Form:" }),
            /* @__PURE__ */ s.jsx("span", { className: "sc-overview__outlook-meta-value", "data-testid": "text-outlook-form", children: f.formLabel }),
            /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontFamily: "ui-monospace, monospace" }, children: [
              "(",
              f.formDetail,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__outlook-meta-item", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sc-overview__outlook-meta-label", children: "Volatility:" }),
            /* @__PURE__ */ s.jsx("span", { className: "sc-overview__outlook-meta-value", "data-testid": "text-outlook-volatility", children: f.volatilityLabel })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__outlook-meta-item", children: [
            /* @__PURE__ */ s.jsx("span", { className: "sc-overview__outlook-meta-label", children: "Tier:" }),
            /* @__PURE__ */ s.jsx("span", { className: "sc-overview__outlook-meta-value", "data-testid": "text-outlook-tier", children: f.tierProfile })
          ] })
        ] }),
        f.sentence && /* @__PURE__ */ s.jsx("p", { className: "sc-overview__outlook-sentence", "data-testid": "text-outlook-sentence", children: f.sentence })
      ] }) : /* @__PURE__ */ s.jsx("p", { style: { fontSize: "14px", color: "#94a3b8" }, "data-testid": "text-outlook", children: f.noDataMsg })
    ] })
  ] });
}
function Zk({ entries: n, position: r, activeTier: a, onTierClick: i, format: c = "ppr" }) {
  const d = n.filter((w) => w.game_status === "active");
  if (d.length === 0) return null;
  const p = { "15+": "Elite", "10–14.9": "Starter", "5–9.9": "Flex", "<5": "Bust" }, f = {
    "15+": "Top-12 positional finish threshold. Elite weekly production.",
    "10–14.9": "Startable weekly output. Solid lineup contributor.",
    "5–9.9": "Flex-tier production. Borderline start depending on matchup.",
    "<5": "Below replacement level. Not a viable fantasy starter."
  }, m = { "15+": "#22c55e", "10–14.9": "#2dd4bf", "5–9.9": "#f59e0b", "<5": "#ef4444" }, v = { "15+": "#15803d", "10–14.9": "#0d9488", "5–9.9": "#b45309", "<5": "#dc2626" }, g = [
    { label: "15+", count: d.filter((w) => ze(w, c) >= 15).length },
    { label: "10–14.9", count: d.filter((w) => ze(w, c) >= 10 && ze(w, c) < 15).length },
    { label: "5–9.9", count: d.filter((w) => ze(w, c) >= 5 && ze(w, c) < 10).length },
    { label: "<5", count: d.filter((w) => ze(w, c) < 5).length }
  ], x = d.length;
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog__dist", "data-testid": "gamelog-distribution", children: [
    /* @__PURE__ */ s.jsx(ft, { title: "Game Distribution", subtitle: "Fantasy output bucketed by scoring tiers" }),
    /* @__PURE__ */ s.jsx("div", { className: "sc-gamelog__dist-bar", style: { display: "flex", borderRadius: "10px", overflow: "hidden", height: "36px", marginBottom: "8px" }, children: g.map((w) => {
      const k = x > 0 ? w.count / x * 100 : 0;
      return w.count === 0 ? null : /* @__PURE__ */ s.jsx(
        "div",
        {
          className: `sc-gamelog__dist-segment ${a === w.label ? "sc-gamelog__dist-segment--active" : ""} ${a && a !== w.label ? "sc-gamelog__dist-segment--faded" : ""}`,
          style: {
            width: `${k}%`,
            background: m[w.label],
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "opacity 0.2s ease, transform 0.2s ease"
          },
          title: f[w.label],
          onClick: () => i(a === w.label ? null : w.label),
          "data-testid": `dist-segment-${w.label}`,
          children: k >= 12 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
            /* @__PURE__ */ s.jsx("span", { style: { fontSize: "10px", fontWeight: 800, color: "#fff", lineHeight: 1, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }, children: p[w.label] }),
            /* @__PURE__ */ s.jsx("span", { style: { fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.85)", lineHeight: 1, marginTop: "1px" }, children: w.count })
          ] })
        },
        w.label
      );
    }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 flex-wrap", style: { marginBottom: "6px" }, children: [
      g.map((w) => {
        const k = x > 0 ? (w.count / x * 100).toFixed(0) : "0", S = a === w.label, j = a && a !== w.label;
        return /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: "sc-gamelog__dist-legend",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "8px",
              cursor: "pointer",
              border: S ? `1px solid ${m[w.label]}` : "1px solid rgba(15,23,42,0.08)",
              background: S ? `${m[w.label]}10` : "transparent",
              opacity: j ? 0.35 : 1,
              transition: "all 0.15s ease"
            },
            onClick: () => i(S ? null : w.label),
            "data-testid": `dist-legend-${w.label}`,
            children: [
              /* @__PURE__ */ s.jsx("span", { style: { width: "8px", height: "8px", borderRadius: "50%", background: m[w.label], flexShrink: 0 } }),
              /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "10px", fontWeight: 700, color: S ? v[w.label] : "#64748b", fontFamily: "ui-monospace, monospace" }, children: [
                k,
                "% ",
                p[w.label]
              ] }),
              /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "9px", color: "#94a3b8", fontFamily: "ui-monospace, monospace" }, children: [
                "(",
                w.count,
                ")"
              ] })
            ]
          },
          w.label
        );
      }),
      a && /* @__PURE__ */ s.jsx(
        "button",
        {
          style: { fontSize: "10px", color: "#94a3b8", textDecoration: "underline", cursor: "pointer", background: "none", border: "none", padding: "4px" },
          onClick: () => i(null),
          "data-testid": "dist-clear-filter",
          children: "Clear"
        }
      )
    ] })
  ] });
}
function Jk({ player: n, format: r = "ppr" }) {
  const a = n.availableSeasons || (n.season ? [n.season] : []), [i, c] = y.useState(a[0] || (/* @__PURE__ */ new Date()).getFullYear()), [d, p] = y.useState("full"), [f, m] = y.useState(null), [v, g] = y.useState(!1), x = i === a[0], { data: w, isLoading: k } = Zr({
    queryKey: ["/api/players", n.slug, "game-log", i, r],
    queryFn: async () => {
      const I = await fetch(`/api/players/${n.slug}/game-log?season=${i}&format=${r}`);
      if (!I.ok) throw new Error("Failed to fetch game log");
      return I.json();
    },
    enabled: !x
  }), S = x ? n.gameLog || [] : w || [], j = qu(S, n.position, r), _ = n.position || "", P = S.filter((I) => rs(I.stats, n.position)), T = { QB: 16.5, RB: 11.5, WR: 10.5, TE: 8 }[n.position || ""] ?? 10, C = P.length > 0 ? P.reduce((I, K) => ze(K, r) > ze(I, r) ? K : I, P[0]) : null, $ = P.length > 0 ? P.reduce((I, K) => ze(K, r) < ze(I, r) ? K : I, P[0]) : null, V = C ? Ei(C.pos_rank, n.position) : null, Z = $ ? Ei($.pos_rank, n.position) : null, H = d === "full" ? "full" : "last5", L = Gk(n, S, j, r), re = Qk(n, S, j, r);
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog", style: { display: "flex", flexDirection: "column", gap: "32px" }, children: [
    L.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, "data-testid": "section-gamelog-summary", children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Season Game Log Summary" }),
      L.map((I, K) => /* @__PURE__ */ s.jsx("p", { style: { fontSize: "14px", lineHeight: "1.75", color: "var(--sc-text-muted, #94a3b8)", marginBottom: K < L.length - 1 ? "12px" : 0 }, children: I }, K))
    ] }),
    re.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, "data-testid": "section-performance-insights", children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Performance Pattern Insights", subtitle: "Key patterns from the weekly scoring distribution this season." }),
      /* @__PURE__ */ s.jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }, children: re.map((I, K) => {
        const B = I.icon === "up" ? "#22c55e" : I.icon === "down" ? "#ef4444" : "#94a3b8", G = I.icon === "up" ? "▲" : I.icon === "down" ? "▼" : "●";
        return /* @__PURE__ */ s.jsxs("li", { style: { display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--foreground)", lineHeight: "1.6" }, "data-testid": `insight-pattern-${K}`, children: [
          /* @__PURE__ */ s.jsx("span", { style: { color: B, fontSize: "9px", fontWeight: 700, marginTop: "4px", flexShrink: 0, letterSpacing: "0" }, children: G }),
          I.text
        ] }, K);
      }) })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Game Log", subtitle: "Performance distribution and finish outcomes" }),
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ s.jsx("div", { className: "sc-gamelog__segmented-control", "data-testid": "filter-game-range", children: ["full", "last8", "last5"].map((I) => /* @__PURE__ */ s.jsx(
          "button",
          {
            className: `sc-gamelog__segment ${d === I ? "sc-gamelog__segment--active" : ""}`,
            onClick: () => p(I),
            "data-testid": `button-filter-${I}`,
            children: I === "full" ? "Full Season" : I === "last8" ? "Last 8" : "Last 5"
          },
          I
        )) }),
        a.length > 1 && /* @__PURE__ */ s.jsxs(Pk, { value: String(i), onValueChange: (I) => c(Number(I)), children: [
          /* @__PURE__ */ s.jsx(ex, { className: "w-28", "data-testid": "select-season", children: /* @__PURE__ */ s.jsx(Ek, {}) }),
          /* @__PURE__ */ s.jsx(rx, { children: a.map((I) => /* @__PURE__ */ s.jsx(sx, { value: String(I), "data-testid": `option-season-${I}`, children: I }, I)) })
        ] }),
        a.length === 1 && /* @__PURE__ */ s.jsx("span", { style: { fontSize: "13px", color: "#94a3b8", fontWeight: 600 }, children: i })
      ] })
    ] }),
    j && /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", "data-testid": "gamelog-summary-bar", children: [
      /* @__PURE__ */ s.jsx(pi, { label: "Games Played", value: j.gamesPlayed }),
      /* @__PURE__ */ s.jsxs(pi, { label: "Season PPG", value: j.ppg.toFixed(1), tintClass: "sc-gamelog__stat-box--blue", children: [
        n.seasonRank && /* @__PURE__ */ s.jsxs("p", { className: "sc-gamelog__stat-sub", style: { fontWeight: 700, color: "#475569" }, children: [
          _,
          n.seasonRank,
          " Equivalent"
        ] }),
        (() => {
          const I = j.ppg - T;
          return /* @__PURE__ */ s.jsxs("p", { className: "sc-gamelog__stat-sub", style: { fontWeight: 700, color: I >= 0 ? "#16a34a" : "#dc2626" }, "data-testid": "text-ppg-vs-avg", children: [
            I >= 0 ? "+" : "",
            I.toFixed(1),
            " vs Pos Avg"
          ] });
        })()
      ] }),
      /* @__PURE__ */ s.jsxs(pi, { label: "Best Week", value: C ? ze(C, r).toFixed(1) : "—", tintClass: "sc-gamelog__stat-box--green", children: [
        C && V && /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1 flex-wrap", style: { marginTop: "2px" }, children: [
          /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "10px", color: "#94a3b8" }, children: [
            "Wk ",
            C.week
          ] }),
          /* @__PURE__ */ s.jsx(fn, { variant: "secondary", className: `text-[8px] px-1 py-0 ${V.className}`, children: V.label })
        ] }),
        C && !V && C.pos_rank && /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "10px", color: "#94a3b8", display: "block", marginTop: "2px" }, children: [
          "Wk ",
          C.week,
          " (",
          _,
          C.pos_rank,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs(pi, { label: "Worst Week", value: $ ? ze($, r).toFixed(1) : "—", tintClass: "sc-gamelog__stat-box--red", children: [
        $ && Z && /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1 flex-wrap", style: { marginTop: "2px" }, children: [
          /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "10px", color: "#94a3b8" }, children: [
            "Wk ",
            $.week
          ] }),
          /* @__PURE__ */ s.jsx(fn, { variant: "secondary", className: `text-[8px] px-1 py-0 ${Z.className}`, children: Z.label })
        ] }),
        $ && !Z && $.pos_rank && /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "10px", color: "#94a3b8", display: "block", marginTop: "2px" }, children: [
          "Wk ",
          $.week,
          " (",
          _,
          $.pos_rank,
          ")"
        ] })
      ] })
    ] }),
    j && d === "full" && /* @__PURE__ */ s.jsx(Zk, { entries: S, position: n.position, activeTier: f, onTierClick: m, format: r }),
    /* @__PURE__ */ s.jsx("div", { className: "sc-gamelog__table-card", children: /* @__PURE__ */ s.jsxs("div", { style: { padding: "16px 20px" }, children: [
      d === "full" && /* @__PURE__ */ s.jsx("div", { className: "flex items-center justify-end mb-2 gap-1.5", children: /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog__segmented-control sc-gamelog__segmented-control--sm", "data-testid": "toggle-hide-inactive", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            onClick: () => g(!1),
            className: `sc-gamelog__segment ${v ? "" : "sc-gamelog__segment--active"}`,
            "data-testid": "button-show-all",
            children: "Show All"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            onClick: () => g(!0),
            className: `sc-gamelog__segment ${v ? "sc-gamelog__segment--active" : ""}`,
            "data-testid": "button-active-only",
            children: "Active Only"
          }
        )
      ] }) }),
      k && !x ? /* @__PURE__ */ s.jsxs("div", { className: "py-8 text-center", children: [
        /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-48 mx-auto mb-2" }),
        /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-32 mx-auto" })
      ] }) : /* @__PURE__ */ s.jsx(Ok, { entries: S, position: n.position, filter: d === "last8" ? "last5" : H, tierFilter: f, hideInactive: v, format: r, lastN: d === "last8" ? 8 : d === "last5" ? 5 : void 0 })
    ] }) }),
    n.careerSeasonStats && n.careerSeasonStats.length > 0 && /* @__PURE__ */ s.jsx(e_, { stats: n.careerSeasonStats, position: n.position, format: r, onSeasonClick: (I) => {
      c(I), p("full");
    } })
  ] });
}
function e_({ stats: n, position: r, format: a, onSeasonClick: i }) {
  const c = r || "", d = [...n].sort((S, j) => j.season - S.season), p = d.reduce((S, j) => S + j.gp, 0), f = d.reduce((S, j) => S + j.ppg * j.gp, 0), m = p > 0 ? f / p : 0, v = d.length > 0 ? d.reduce((S, j) => j.ppg > S.ppg ? j : S, d[0]) : null;
  let g = [];
  c === "QB" ? g = [
    { key: "season", label: "Year", align: "left" },
    { key: "gp", label: "GP" },
    { key: "pass_yd", label: "Pass Yds" },
    { key: "pass_td", label: "Pass TD" },
    { key: "pass_int", label: "INT" },
    { key: "rush_yd", label: "Rush Yds" },
    { key: "rush_td", label: "Rush TD" },
    { key: "ppg", label: "PPG", bold: !0 }
  ] : c === "WR" || c === "TE" ? g = [
    { key: "season", label: "Year", align: "left" },
    { key: "gp", label: "GP" },
    { key: "targets", label: "Targets" },
    { key: "receptions", label: "Rec" },
    { key: "rec_yd", label: "Rec Yds" },
    { key: "total_td", label: "TD" },
    { key: "ppg", label: "PPG", bold: !0 }
  ] : g = [
    { key: "season", label: "Year", align: "left" },
    { key: "gp", label: "GP" },
    { key: "rush_att", label: "Rush Att" },
    { key: "rush_yd", label: "Rush Yds" },
    { key: "ypc", label: "YPC" },
    { key: "receptions", label: "Rec" },
    { key: "rec_yd", label: "Rec Yds" },
    { key: "total_td", label: "Total TD" },
    { key: "ppg", label: "PPG", bold: !0 }
  ];
  const x = (S, j) => j === "ypc" ? S.rush_att > 0 ? (S.rush_yd / S.rush_att).toFixed(1) : "0.0" : j === "ppg" ? S.ppg.toFixed(1) : S[j] ?? 0, w = a === "ppr" ? "PPR" : a === "half" ? "Half-PPR" : "Standard", k = (() => {
    const j = d.length * 17;
    return j > 0 ? p / j * 100 : 0;
  })();
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog__career-section", "data-testid": "career-stats-table", children: [
    /* @__PURE__ */ s.jsx(ft, { title: "Career Stats", subtitle: `Season totals · ${w} fantasy output` }),
    /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-3 gap-3", style: { marginBottom: "16px" }, "data-testid": "career-summary-tiles", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog__stat-box sc-gamelog__stat-box--blue", children: [
        /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-label", children: "Career Avg" }),
        /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-value", children: m.toFixed(1) }),
        /* @__PURE__ */ s.jsxs("p", { className: "sc-gamelog__stat-sub", children: [
          "PPG across ",
          p,
          " games"
        ] })
      ] }),
      v && /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog__stat-box sc-gamelog__stat-box--green", children: [
        /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-label", children: "Peak Season" }),
        /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-value", children: v.season }),
        /* @__PURE__ */ s.jsxs("p", { className: "sc-gamelog__stat-sub", children: [
          v.ppg.toFixed(1),
          " PPG",
          v.posRank ? ` · ${c}${v.posRank}` : ""
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog__stat-box", children: [
        /* @__PURE__ */ s.jsx("p", { className: "sc-gamelog__stat-label", children: "Durability" }),
        /* @__PURE__ */ s.jsxs("p", { className: "sc-gamelog__stat-value", style: { color: k >= 85 ? "#16a34a" : k >= 65 ? "#d97706" : "#ef4444" }, children: [
          k.toFixed(0),
          "%"
        ] }),
        /* @__PURE__ */ s.jsxs("p", { className: "sc-gamelog__stat-sub", children: [
          p,
          " of ",
          d.length * 17,
          " possible"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "sc-gamelog__table-wrap", style: { margin: "0 -4px" }, children: /* @__PURE__ */ s.jsxs("table", { className: "sc-gamelog__table", style: { minWidth: c === "RB" ? "520px" : "440px" }, "data-testid": "table-career-stats", children: [
      /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsx("tr", { className: "sc-gamelog__thead-row", children: g.map((S) => /* @__PURE__ */ s.jsx(
        "th",
        {
          className: `sc-gamelog__th ${S.bold ? "sc-gamelog__th--primary" : ""}`,
          style: { textAlign: S.align === "left" ? "left" : "right" },
          children: S.label
        },
        S.key
      )) }) }),
      /* @__PURE__ */ s.jsx("tbody", { children: d.map((S) => {
        const j = v && S.season === v.season && d.length > 1;
        return /* @__PURE__ */ s.jsx("tr", { className: `sc-gamelog__row ${j ? "sc-gamelog__row--best" : ""}`, children: g.map((_) => {
          if (_.key === "season")
            return /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td", style: { textAlign: "left" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ s.jsx(
                "button",
                {
                  onClick: () => i(S.season),
                  style: { fontSize: "12px", fontWeight: 700, color: "#1a3f8a", cursor: "pointer", background: "none", border: "none", padding: 0, fontFamily: "ui-monospace, monospace" },
                  "data-testid": `link-season-${S.season}`,
                  children: S.season
                }
              ),
              j && /* @__PURE__ */ s.jsx($s, { className: "w-3 h-3", style: { color: "#d4af37" } })
            ] }) }, _.key);
          if (_.key === "ppg")
            return /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--primary", style: { textAlign: "right" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ s.jsx("span", { style: { fontWeight: 800, color: "#0b3a7a", fontFamily: "ui-monospace, monospace", fontSize: "13px" }, children: S.ppg.toFixed(1) }),
              S.posRank && /* @__PURE__ */ s.jsxs("span", { className: `text-[9px] tabular-nums font-semibold ${Dk(S.posRank)}`, children: [
                c,
                S.posRank
              ] })
            ] }) }, _.key);
          const P = x(S, _.key);
          return /* @__PURE__ */ s.jsx("td", { className: "sc-gamelog__td sc-gamelog__td--secondary", style: { textAlign: "right" }, children: typeof P == "number" ? P.toLocaleString() : P }, _.key);
        }) }, S.season);
      }) })
    ] }) })
  ] });
}
function t_(n) {
  return n === "QB" ? [
    { key: "pass_att", label: "Pass Att/G", pct: !1, weight: 5 },
    { key: "rush_att", label: "Rush Att/G", pct: !1, weight: 3 }
  ] : n === "RB" ? [
    { key: "snap_share", label: "Snap Share", pct: !0, weight: 4 },
    { key: "rush_att", label: "Carries/G", pct: !1, weight: 4 },
    { key: "rec_tgt", label: "Targets/G", pct: !1, weight: 2 }
  ] : n === "WR" || n === "TE" ? [
    { key: "target_share", label: "Target Share (Team)", pct: !0, weight: 6 },
    { key: "rec_tgt", label: "Targets/G", pct: !1, weight: 2 },
    { key: "team_pass_att", label: "Team Pass Att/G", pct: !1, weight: 2, context: !0 }
  ] : n === "K" ? [
    { key: "fga", label: "FG Att/G", pct: !1, weight: 5 },
    { key: "fgm", label: "FG Made/G", pct: !1, weight: 3 },
    { key: "xpa", label: "XP Att/G", pct: !1, weight: 2 }
  ] : [];
}
function Th(n, r, a) {
  const i = a ? n.slice(-a) : n;
  return i.length === 0 ? 0 : i.reduce((d, p) => d + (p.stats[r] ?? 0), 0) / i.length;
}
function ax(n) {
  return n === "QB" ? { high: 45, mid: 35 } : n === "RB" ? { high: 40, mid: 25 } : n === "TE" ? { high: 40, mid: 25 } : { high: 35, mid: 20 };
}
function n_(n, r, a) {
  if (n.length === 0) return { pct: 0, label: "N/A", tag: "", isHigh: !1 };
  const i = (v) => n.reduce((g, x) => g + (x.stats[v] ?? 0), 0);
  let c = 0;
  r === "QB" ? c = i("pass_td") * 4 + i("rush_td") * 6 : r === "K" ? c = 0 : c = (i("rec_td") + i("rush_td")) * 6;
  const d = n.reduce((v, g) => v + ze(g, a), 0);
  if (d === 0) return { pct: 0, label: "N/A", tag: "", isHigh: !1 };
  const p = c / d * 100, { high: f, mid: m } = ax(r);
  return p >= f ? { pct: p, label: "TD-Driven", tag: "High TD reliance", isHigh: !0 } : p >= m ? { pct: p, label: "Balanced", tag: "Balanced production", isHigh: !1 } : { pct: p, label: "Volume-Backed", tag: "Volume-backed production", isHigh: !1 };
}
function r_(n) {
  return n === "QB" ? 0.25 : n === "RB" ? 0.28 : n === "TE" ? 0.43 : 0.4;
}
function s_(n, r, a) {
  if (n.length < 3) return 50;
  const i = (g) => {
    const x = g.stats;
    return a === "QB" ? (x.pass_att ?? 0) + 2 * (x.rush_att ?? 0) : a === "RB" ? (x.rush_att ?? 0) + (x.rec_tgt ?? 0) : x[r] ?? 0;
  }, c = n.map(i), d = c.reduce((g, x) => g + x, 0) / c.length;
  if (d === 0) return 50;
  const p = c.reduce((g, x) => g + (x - d) ** 2, 0) / c.length;
  let f = Math.sqrt(p) / d;
  const m = c.length;
  m < 16 && (f = f * Math.sqrt(m / 16));
  const v = r_(a);
  return Math.round(Math.max(5, Math.min(95, 100 / (1 + (f / v) ** 2))));
}
function o_(n, r) {
  const a = Math.abs(n);
  return r ? a < 2 ? "Stable" : a < 5 ? n > 0 ? "Modest Rise" : "Modest Dip" : n > 0 ? "Notable Rise" : "Notable Drop" : a < 0.3 ? "Stable" : a < 1 ? n > 0 ? "Modest Rise" : "Modest Dip" : n > 0 ? "Notable Rise" : "Notable Drop";
}
function Rh({ delta: n, pct: r = !1 }) {
  const a = r ? 0.3 : 0.05, i = n > a, c = n < -a, d = i ? "text-emerald-500" : c ? "text-red-400" : "text-muted-foreground", p = i ? "+" : "", f = o_(n, r);
  return /* @__PURE__ */ s.jsxs("div", { className: "flex flex-col items-end gap-0", children: [
    /* @__PURE__ */ s.jsxs("span", { className: `font-semibold tabular-nums ${d}`, children: [
      p,
      n.toFixed(1),
      r ? "%" : ""
    ] }),
    /* @__PURE__ */ s.jsx("span", { className: `text-[9px] font-medium ${d} opacity-70`, children: f })
  ] });
}
function a_({ player: n, entries: r, format: a = "ppr" }) {
  const i = n.position, c = r.filter((E) => rs(E.stats, i)), d = t_(i), p = 4, f = (E, W) => E.stats[W] ?? 0, m = c.reduce((E, W) => E + f(W, "rec_tgt"), 0), v = c.reduce((E, W) => E + f(W, "team_tgt"), 0), g = v > 0 ? m / v * 100 : 0, x = d.map((E) => {
    if (E.key === "snap_share") {
      const Te = c.reduce((je, Re) => je + f(Re, "off_snp"), 0), Se = c.reduce((je, Re) => je + f(Re, "tm_off_snp"), 0), Le = Se > 0 ? Te / Se * 100 : 0, _e = c.slice(-p), Fe = _e.reduce((je, Re) => je + f(Re, "off_snp"), 0), me = _e.reduce((je, Re) => je + f(Re, "tm_off_snp"), 0), Me = me > 0 ? Fe / me * 100 : 0, De = Me - Le;
      return { ...E, seasonAvg: Le, recentAvg: Me, delta: De };
    }
    if (E.key === "target_share") {
      const Te = g, Se = c.slice(-p), Le = Se.reduce((Me, De) => Me + f(De, "rec_tgt"), 0), _e = Se.reduce((Me, De) => Me + f(De, "team_tgt"), 0), Fe = _e > 0 ? Le / _e * 100 : 0, me = Fe - Te;
      return { ...E, seasonAvg: Te, recentAvg: Fe, delta: me };
    }
    if (E.key === "pass_cmp_pct") {
      const Te = c.reduce((je, Re) => je + f(Re, "pass_cmp"), 0), Se = c.reduce((je, Re) => je + f(Re, "pass_att"), 0), Le = Se > 0 ? Te / Se * 100 : 0, _e = c.slice(-p), Fe = _e.reduce((je, Re) => je + f(Re, "pass_cmp"), 0), me = _e.reduce((je, Re) => je + f(Re, "pass_att"), 0), Me = me > 0 ? Fe / me * 100 : 0, De = Me - Le;
      return { ...E, seasonAvg: Le, recentAvg: Me, delta: De };
    }
    const W = Th(c, E.key), he = Th(c, E.key, p), we = he - W;
    return { ...E, seasonAvg: W, recentAvg: he, delta: we };
  }), w = d[0]?.key ?? "rec_tgt", k = x.reduce((E, W) => {
    const he = W.weight ?? 1;
    let we;
    W.pct ? we = W.delta : we = W.seasonAvg > 0 ? W.delta / W.seasonAvg * 100 : 0;
    const Te = Math.max(-25, Math.min(25, we));
    return E + Te * he;
  }, 0), S = x.reduce((E, W) => E + (W.weight ?? 1), 0) || 1, j = k / S, _ = Math.round(Math.max(5, Math.min(95, 50 + j * 2.5))), P = _ >= 80 ? "STRONG EXPANSION" : _ >= 60 ? "EXPANDING" : _ <= 39 ? "DECLINING" : "STABLE", T = _ >= 60 ? "text-emerald-500" : _ <= 39 ? "text-red-400" : "text-amber-400", C = _ >= 60 ? "bg-emerald-500/10 border-emerald-500/20" : _ <= 39 ? "bg-red-500/10 border-red-500/20" : "bg-amber-500/10 border-amber-500/20", $ = _ >= 80 ? "#10b981" : _ >= 60 ? "#34d399" : _ <= 39 ? "#f87171" : "#fbbf24", V = x.reduce((E, W) => Math.abs(W.delta) > Math.abs(E.delta) ? W : E, x[0]), Z = V.pct ? V.delta : V.seasonAvg > 0 ? V.delta / V.seasonAvg * 100 : 0, H = Z > 0 ? "up" : "down", L = Math.abs(Z), re = V.label.replace(/ \(Team\)/, "").replace(/\/G/, "/game"), I = L < 2 ? "Role stable relative to season baseline." : `${re} ${H} ${L.toFixed(0)}% vs season baseline.`, K = n_(c, i, a), B = s_(c, w, i), G = B >= 70 ? "Consistent Role" : B >= 45 ? "Moderate Variance" : "High Weekly Volatility", M = B >= 70 ? "text-emerald-500" : B >= 45 ? "text-amber-400" : "text-red-400", Y = y.useMemo(() => {
    if (c.length < 3) return null;
    const E = (Se) => {
      const Le = Se.stats;
      return i === "QB" ? (Le.pass_att ?? 0) + 2 * (Le.rush_att ?? 0) : i === "RB" ? (Le.rush_att ?? 0) + (Le.rec_tgt ?? 0) : Le.rec_tgt ?? 0;
    }, W = c.map(E), he = W.reduce((Se, Le) => Se + Le, 0) / W.length;
    if (he === 0) return null;
    const we = W.reduce((Se, Le) => Se + (Le - he) ** 2, 0) / W.length, Te = Math.sqrt(we);
    return i === "QB" ? `Workload varies ±${Te.toFixed(1)} per game` : i === "RB" ? `Workload varies ±${Te.toFixed(1)} touches per game` : `Targets vary ±${Te.toFixed(1)} per game`;
  }, [c, i]), X = x.reduce((E, W) => Math.abs(W.delta) > Math.abs(E.delta) ? W : E, x[0]), te = x.filter((E) => E.key !== X?.key).reduce((E, W) => Math.abs(W.delta) > Math.abs(E.delta) ? W : E, x[1] || x[0]), D = y.useMemo(() => {
    if (!X || !te || x.length < 2) return null;
    const E = Math.abs(X.delta), W = X.label.toLowerCase(), he = te.label.toLowerCase(), we = Math.abs(te.delta), Se = X.pct ? E < 2 ? "stable" : E < 5 ? "modest" : "notable" : E < 0.3 ? "stable" : E < 1 ? "modest" : "notable", Le = te.delta >= 0 ? "holding steady" : "dipping slightly";
    if (Se === "stable")
      return `Usage metrics have remained largely stable over the last ${p} weeks, with ${W} and ${he} both holding near season averages — suggesting a consistent offensive role.`;
    const _e = X.delta > 0 ? Se === "modest" ? "ticked upward" : "risen meaningfully" : Se === "modest" ? "dipped modestly" : "pulled back noticeably", Fe = we < (te.pct ? 2 : 0.3) ? `while ${he} remains steady` : `${te.delta > 0 ? "alongside rising" : "even as"} ${he} ${te.delta > 0 ? Le : "has also softened"}`, me = _ >= 60 ? "pointing to a strengthening role" : _ <= 39 ? "suggesting a narrowing of opportunity" : "worth monitoring over the coming weeks";
    return `${W.charAt(0).toUpperCase() + W.slice(1)} has ${_e} over the last four weeks ${Fe} — ${me}.`;
  }, [X, te, x, _]), [ne, J] = y.useState("share"), A = c.map((E) => f(E, "target_share")), ee = Zt(A, 3);
  A.length > 0 && A.reduce((E, W) => E + W, 0) / A.length;
  const ve = c.map((E) => f(E, "rec_tgt")), be = Zt(ve, 3), q = c.map((E, W) => {
    const he = f(E, "team_tgt");
    return he > 0 ? ve[W] / he * 100 : 0;
  }), de = Zt(q, 3);
  let z = {
    share: { data: A, rolling: ee, label: "Target Share % (Team Targets)", unit: "%", avg: g },
    raw: { data: ve, rolling: be, label: "Targets", unit: "", avg: ve.length > 0 ? ve.reduce((E, W) => E + W, 0) / ve.length : 0 },
    pct: { data: q, rolling: de, label: "% of Team Targets", unit: "%", avg: q.length > 0 ? q.reduce((E, W) => E + W, 0) / q.length : 0 }
  }[ne];
  if (i === "QB") {
    const E = c.map((we) => f(we, "pass_att")), W = Zt(E, 3), he = E.length > 0 ? E.reduce((we, Te) => we + Te, 0) / E.length : 0;
    z = { data: E, rolling: W, label: "Pass Attempts", unit: "", avg: he };
  } else if (i === "RB") {
    const E = c.map((we) => f(we, "rush_att")), W = Zt(E, 3), he = E.length > 0 ? E.reduce((we, Te) => we + Te, 0) / E.length : 0;
    z = { data: E, rolling: W, label: "Carries", unit: "", avg: he };
  } else if (i === "K") {
    const E = c.map((we) => f(we, "fga")), W = Zt(E, 3), he = E.length > 0 ? E.reduce((we, Te) => we + Te, 0) / E.length : 0;
    z = { data: E, rolling: W, label: "FG Attempts", unit: "", avg: he };
  }
  const oe = c.map((E) => i === "QB" ? f(E, "pass_att") : f(E, "team_pass_att") || f(E, "team_tgt") || 0), se = i === "QB" ? c.map((E) => f(E, "pass_att")) : i === "RB" ? c.map((E) => f(E, "rush_att") + f(E, "rec_tgt")) : c.map((E) => f(E, "rec_tgt")), Pe = Zt(oe, 3), Ae = Zt(se, 3), Ie = c.map((E) => ze(E, a)), qe = c.map((E) => {
    const W = E.stats;
    return i === "QB" ? (W.pass_td ?? 0) * 4 + (W.rush_td ?? 0) * 6 : i === "K" ? 0 : ((W.rec_td ?? 0) + (W.rush_td ?? 0)) * 6;
  });
  if (Zt(Ie, 3), Zt(qe, 3), r.length === 0 || d.length === 0)
    return /* @__PURE__ */ s.jsxs("div", { className: "rounded-md border border-dashed border-muted-foreground/25 p-12 text-center", children: [
      /* @__PURE__ */ s.jsx(kr, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Usage data not yet available" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground/60 text-xs mt-1", children: "Check back once the season is underway." })
    ] });
  const St = x.filter((E) => !E.context), tt = x.filter((E) => E.context), Ee = Kk(n, x, _), Ge = Yk(n, B, G, Y, K, _), st = qk(n, x, _, B, K);
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-usage", style: { display: "flex", flexDirection: "column", gap: "32px" }, "data-testid": "usage-trends-tab", children: [
    /* @__PURE__ */ s.jsx(ft, { title: "Role and Usage Trends", subtitle: "Weekly role evolution and efficiency signals" }),
    Ee.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, "data-testid": "section-usage-summary", children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Role and Usage Summary" }),
      Ee.map((E, W) => /* @__PURE__ */ s.jsx("p", { style: { fontSize: "14px", lineHeight: "1.75", color: "var(--sc-text-muted, #94a3b8)", marginBottom: W < Ee.length - 1 ? "12px" : 0 }, children: E }, W))
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "sc-card", style: { padding: "24px 28px" }, "data-testid": "opportunity-momentum-card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", style: { marginBottom: "16px" }, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ s.jsx(Ob, { className: "w-4 h-4", style: { color: "#d4af37" } }),
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "13px", fontWeight: 700, color: "#0b3a7a", letterSpacing: "-0.01em" }, children: "Role Direction" }),
          /* @__PURE__ */ s.jsx(wr, { delayDuration: 200, children: /* @__PURE__ */ s.jsxs(Vr, { children: [
            /* @__PURE__ */ s.jsx(Gr, { asChild: !0, children: /* @__PURE__ */ s.jsx("span", { className: "inline-flex items-center cursor-help", children: /* @__PURE__ */ s.jsx(Qr, { className: "w-3 h-3 text-muted-foreground/50" }) }) }),
            /* @__PURE__ */ s.jsxs(br, { side: "bottom", className: "max-w-[280px] text-xs leading-relaxed p-3", children: [
              /* @__PURE__ */ s.jsx("p", { className: "font-semibold mb-1.5", children: "What does this measure?" }),
              /* @__PURE__ */ s.jsx("p", { className: "mb-1", children: "Measures whether a player's opportunity is expanding or shrinking compared to his season average." }),
              /* @__PURE__ */ s.jsx("p", { className: "mb-2 text-muted-foreground", children: "Compares the last 4 games to full-season usage across key workload indicators. Does not measure fantasy performance or talent — only usage trends." }),
              /* @__PURE__ */ s.jsxs("div", { className: "space-y-0.5 text-[10px]", children: [
                /* @__PURE__ */ s.jsxs("p", { children: [
                  /* @__PURE__ */ s.jsx("span", { className: "font-semibold text-emerald-500", children: "80+" }),
                  " ",
                  /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground", children: "Role expanding significantly" })
                ] }),
                /* @__PURE__ */ s.jsxs("p", { children: [
                  /* @__PURE__ */ s.jsx("span", { className: "font-semibold text-emerald-400", children: "60–79" }),
                  " ",
                  /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground", children: "Gradual expansion" })
                ] }),
                /* @__PURE__ */ s.jsxs("p", { children: [
                  /* @__PURE__ */ s.jsx("span", { className: "font-semibold text-amber-400", children: "40–59" }),
                  " ",
                  /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground", children: "Stable usage" })
                ] }),
                /* @__PURE__ */ s.jsxs("p", { children: [
                  /* @__PURE__ */ s.jsx("span", { className: "font-semibold text-red-400", children: "0–39" }),
                  " ",
                  /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground", children: "Shrinking opportunity" })
                ] })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: `flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide ${C} ${T}`, "data-testid": "role-momentum-badge", children: [
          _ >= 60 ? /* @__PURE__ */ s.jsx(kr, { className: "w-3.5 h-3.5" }) : _ <= 39 ? /* @__PURE__ */ s.jsx(zb, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ s.jsx(rg, { className: "w-3.5 h-3.5" }),
          P
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsxs("p", { className: "text-4xl font-extrabold tabular-nums leading-none", style: { color: $ }, "data-testid": "text-momentum-score", children: [
          _,
          /* @__PURE__ */ s.jsx("span", { className: "text-base font-semibold text-muted-foreground ml-1", children: "/ 100" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "mt-2", style: { maxWidth: "220px" }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "h-1.5 rounded-full bg-muted/30 overflow-hidden", children: /* @__PURE__ */ s.jsx("div", { className: "h-full rounded-full transition-all duration-700 ease-out", style: { width: `${_}%`, background: `linear-gradient(90deg, ${$}88, ${$})` } }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "flex justify-between mt-0.5", children: [
            /* @__PURE__ */ s.jsx("span", { className: "text-[8px] text-muted-foreground/50", children: "0" }),
            /* @__PURE__ */ s.jsx("span", { className: "text-[8px] text-muted-foreground/50", children: "100" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("p", { className: `text-[10px] mt-1 ${T}`, "data-testid": "text-momentum-micro", children: I })
      ] }),
      /* @__PURE__ */ s.jsx("div", { style: { height: "1px", background: "linear-gradient(90deg, rgba(11,58,122,0.08), rgba(11,58,122,0.03), transparent)", margin: "20px 0" } }),
      /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: "12px" }, children: "Signal Drivers" }),
      /* @__PURE__ */ s.jsxs("div", { style: { display: "grid", gridTemplateColumns: i !== "K" ? "1fr 1fr" : "1fr", gap: "12px" }, children: [
        /* @__PURE__ */ s.jsxs("div", { style: { background: "rgba(11,58,122,0.03)", borderRadius: "12px", padding: "16px", textAlign: "center" }, children: [
          /* @__PURE__ */ s.jsxs("p", { className: "flex items-center justify-center gap-1", style: { fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8", marginBottom: "6px", fontWeight: 600 }, children: [
            "Role Consistency",
            /* @__PURE__ */ s.jsx(wr, { delayDuration: 200, children: /* @__PURE__ */ s.jsxs(Vr, { children: [
              /* @__PURE__ */ s.jsx(Gr, { asChild: !0, children: /* @__PURE__ */ s.jsx("span", { className: "inline-flex cursor-help", children: /* @__PURE__ */ s.jsx(Qr, { className: "w-2.5 h-2.5 text-muted-foreground/40" }) }) }),
              /* @__PURE__ */ s.jsxs(br, { side: "bottom", className: "max-w-[270px] text-xs leading-relaxed p-3", children: [
                /* @__PURE__ */ s.jsx("p", { className: "font-semibold mb-1.5", children: "What does this measure?" }),
                /* @__PURE__ */ s.jsx("p", { className: "mb-1", children: "Measures how steady a player's weekly workload is throughout the season." }),
                /* @__PURE__ */ s.jsx("p", { className: "mb-2 text-muted-foreground", children: "Evaluates how much opportunity fluctuates game-to-game, adjusted for what's normal at the position. Does not measure fantasy points — only usage stability." }),
                /* @__PURE__ */ s.jsxs("div", { className: "space-y-0.5 text-[10px] mb-2", children: [
                  /* @__PURE__ */ s.jsxs("p", { children: [
                    /* @__PURE__ */ s.jsx("span", { className: "font-semibold text-emerald-500", children: "70+" }),
                    " ",
                    /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground", children: "Highly predictable weekly role" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("p", { children: [
                    /* @__PURE__ */ s.jsx("span", { className: "font-semibold text-amber-400", children: "45–69" }),
                    " ",
                    /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground", children: "Moderate variance" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("p", { children: [
                    /* @__PURE__ */ s.jsx("span", { className: "font-semibold text-red-400", children: "<45" }),
                    " ",
                    /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground", children: "Volatile, game-script dependent" })
                  ] })
                ] }),
                /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground/70 border-t border-border/30 pt-1.5", children: i === "QB" ? "QB workload combines pass attempts and rushing attempts (rushes weighted for higher fantasy leverage)." : i === "RB" ? "RB workload combines carries and receiving targets." : "Based on weekly target volume." })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ s.jsxs("p", { style: { fontSize: "22px", fontWeight: 800, color: "#d4af37", lineHeight: 1 }, className: "tabular-nums", "data-testid": "text-stability-score", children: [
            B,
            /* @__PURE__ */ s.jsx("span", { style: { fontSize: "11px", fontWeight: 500, color: "#94a3b8", marginLeft: "3px" }, children: "/ 100" })
          ] }),
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 600, marginTop: "4px" }, className: M, children: G }),
          Y && /* @__PURE__ */ s.jsx("p", { style: { fontSize: "9px", color: "#94a3b8", marginTop: "2px" }, "data-testid": "text-stability-micro", children: Y })
        ] }),
        i !== "K" && /* @__PURE__ */ s.jsxs("div", { style: { background: "rgba(11,58,122,0.03)", borderRadius: "12px", padding: "16px", textAlign: "center" }, children: [
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8", marginBottom: "6px", fontWeight: 600 }, children: "TD Dependency" }),
          /* @__PURE__ */ s.jsxs("p", { style: { fontSize: "22px", fontWeight: 800, color: "#0b3a7a", lineHeight: 1 }, className: "tabular-nums", "data-testid": "text-td-dependency", children: [
            K.pct.toFixed(0),
            "%"
          ] }),
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 600, marginTop: "4px" }, className: K.pct < 20 ? "text-emerald-500" : K.pct >= 35 ? "text-amber-400" : "text-muted-foreground", children: K.label })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { style: { height: "1px", background: "linear-gradient(90deg, rgba(11,58,122,0.08), rgba(11,58,122,0.03), transparent)", margin: "20px 0" } }),
      /* @__PURE__ */ s.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ s.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ s.jsxs("table", { className: "w-full text-xs", "data-testid": "table-momentum-deltas", children: [
          /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { className: "text-muted-foreground/70", children: [
            /* @__PURE__ */ s.jsx("th", { className: "text-left font-medium pb-2 pr-3 text-[10px]", children: "Metric" }),
            /* @__PURE__ */ s.jsx("th", { className: "text-right font-medium pb-2 px-2 text-[10px]", children: "Season" }),
            /* @__PURE__ */ s.jsxs("th", { className: "text-right font-medium pb-2 px-2 text-[10px]", children: [
              "Last ",
              p
            ] }),
            /* @__PURE__ */ s.jsx("th", { className: "text-right font-medium pb-2 pl-2 text-[10px]", children: "Δ" })
          ] }) }),
          /* @__PURE__ */ s.jsxs("tbody", { children: [
            St.map((E, W) => /* @__PURE__ */ s.jsxs("tr", { className: "border-t border-border/40", children: [
              /* @__PURE__ */ s.jsxs("td", { className: "py-1.5 pr-3 text-foreground/80 font-normal text-[11px]", children: [
                E.label,
                E.key === "target_share" && /* @__PURE__ */ s.jsx(wr, { delayDuration: 200, children: /* @__PURE__ */ s.jsxs(Vr, { children: [
                  /* @__PURE__ */ s.jsx(Gr, { asChild: !0, children: /* @__PURE__ */ s.jsx("span", { className: "inline-flex ml-1 align-middle cursor-help", children: /* @__PURE__ */ s.jsx(Qr, { className: "w-2.5 h-2.5 text-muted-foreground/30" }) }) }),
                  /* @__PURE__ */ s.jsx(br, { side: "right", className: "max-w-[180px] text-xs", children: "Season total targets ÷ team total targets" })
                ] }) })
              ] }),
              /* @__PURE__ */ s.jsx("td", { className: "py-1.5 px-2 text-right tabular-nums text-muted-foreground/70 text-[11px]", children: E.pct ? `${E.seasonAvg.toFixed(1)}%` : E.seasonAvg.toFixed(1) }),
              /* @__PURE__ */ s.jsx("td", { className: "py-1.5 px-2 text-right tabular-nums text-foreground/80 font-medium text-[11px]", children: E.pct ? `${E.recentAvg.toFixed(1)}%` : E.recentAvg.toFixed(1) }),
              /* @__PURE__ */ s.jsx("td", { className: "py-1.5 pl-2 text-right", children: /* @__PURE__ */ s.jsx(Rh, { delta: E.delta, pct: E.pct }) })
            ] }, W)),
            tt.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx("tr", { children: /* @__PURE__ */ s.jsxs("td", { colSpan: 4, className: "py-1", children: [
                /* @__PURE__ */ s.jsx("div", { className: "border-t border-dashed border-border/30" }),
                /* @__PURE__ */ s.jsx("p", { className: "text-[9px] uppercase tracking-wider text-muted-foreground/40 font-medium pt-1", children: "Context" })
              ] }) }),
              tt.map((E, W) => /* @__PURE__ */ s.jsxs("tr", { className: "border-t border-border/20", children: [
                /* @__PURE__ */ s.jsx("td", { className: "py-1.5 pr-3 text-muted-foreground/60 font-normal text-[11px] italic", children: E.label }),
                /* @__PURE__ */ s.jsx("td", { className: "py-1.5 px-2 text-right tabular-nums text-muted-foreground/50 text-[11px]", children: E.pct ? `${E.seasonAvg.toFixed(1)}%` : E.seasonAvg.toFixed(1) }),
                /* @__PURE__ */ s.jsx("td", { className: "py-1.5 px-2 text-right tabular-nums text-muted-foreground/60 font-medium text-[11px]", children: E.pct ? `${E.recentAvg.toFixed(1)}%` : E.recentAvg.toFixed(1) }),
                /* @__PURE__ */ s.jsx("td", { className: "py-1.5 pl-2 text-right", children: /* @__PURE__ */ s.jsx(Rh, { delta: E.delta, pct: E.pct }) })
              ] }, `ctx-${W}`))
            ] })
          ] })
        ] }) }),
        D && /* @__PURE__ */ s.jsx("p", { className: "text-[11px] text-muted-foreground/80 leading-relaxed pt-1 italic", "data-testid": "text-momentum-insight", children: D }),
        i !== "K" && /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 pt-1 flex-wrap", children: [
          /* @__PURE__ */ s.jsx("span", { className: "text-[10px] text-muted-foreground/60", children: "Production Type:" }),
          /* @__PURE__ */ s.jsxs(fn, { variant: "outline", className: `text-[10px] ${K.pct >= 35 ? "border-amber-500/30 text-amber-500" : "border-emerald-500/30 text-emerald-500"}`, "data-testid": "badge-production-type", children: [
            K.pct >= 35 ? /* @__PURE__ */ s.jsx(Kr, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ s.jsx(kr, { className: "w-3 h-3 mr-1" }),
            K.tag
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(ft, { title: "Opportunity Trends", subtitle: "Rolling analysis of volume and usage metrics" }),
    /* @__PURE__ */ s.jsxs("div", { className: "sc-card", style: { padding: "24px 28px" }, "data-testid": "chart-target-share-trend", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsxs("p", { className: "text-sm text-foreground font-semibold", children: [
            z.label,
            " per Week"
          ] }),
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: "Gold line = 3-week rolling avg · Dashed line = season avg" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
            /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground/60", children: "Last 4:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "font-bold tabular-nums text-foreground", children: [
              z.data.length >= 4 ? (z.data.slice(-4).reduce((E, W) => E + W, 0) / 4).toFixed(1) : "—",
              z.unit
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground/40", children: "|" }),
            /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground/60", children: "Season:" }),
            /* @__PURE__ */ s.jsxs("span", { className: "font-bold tabular-nums text-foreground", children: [
              z.avg.toFixed(1),
              z.unit
            ] })
          ] }),
          (i === "WR" || i === "TE") && /* @__PURE__ */ s.jsx("div", { className: "flex rounded-md border border-border overflow-hidden", "data-testid": "trend-view-toggle", children: [
            { key: "share", label: "Share" },
            { key: "raw", label: "Raw Tgt" },
            { key: "pct", label: "% Team" }
          ].map((E) => /* @__PURE__ */ s.jsx(
            "button",
            {
              className: `px-2.5 py-1 text-[10px] font-medium transition-colors ${ne === E.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50"}`,
              onClick: () => J(E.key),
              "data-testid": `btn-trend-${E.key}`,
              children: E.label
            },
            E.key
          )) })
        ] })
      ] }),
      z.data.length >= 2 && /* @__PURE__ */ s.jsx(
        wu,
        {
          data: z.data,
          rollingAvg: z.rolling,
          height: 170,
          label: `trend-${ne}`,
          accentColor: "#0b3a7a",
          showAvgLine: !0,
          highlightLast: Math.min(4, z.data.length),
          showRecentFormLabel: !0,
          thickLine: !0
        }
      )
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "sc-card", style: { padding: "24px 28px" }, "data-testid": "chart-volume-context", children: (() => {
      const E = oe.length > 0 ? oe.reduce((je, Re) => je + Re, 0) / oe.length : 0, W = oe.length >= 4 ? oe.slice(-4).reduce((je, Re) => je + Re, 0) / 4 : E, he = se.length > 0 ? se.reduce((je, Re) => je + Re, 0) / se.length : 0, we = se.length >= 4 ? se.slice(-4).reduce((je, Re) => je + Re, 0) / 4 : he, Te = E > 0 ? (W - E) / E * 100 : 0, Se = he > 0 ? (we - he) / he * 100 : 0, Le = Te < -5, _e = Math.abs(Te) <= 5, Fe = Se < -5, me = Math.abs(Se) <= 5;
      let Me = "", De = "text-muted-foreground";
      return Le && Fe && me === !1 ? (Me = "Team-Driven Decline", De = "text-amber-400") : _e && Fe ? (Me = "Role Contraction", De = "text-red-400") : Le && me ? (Me = "Absorbing Share", De = "text-emerald-500") : _e && me ? (Me = "Stable Volume", De = "text-muted-foreground") : Se > 5 ? (Me = "Volume Expansion", De = "text-emerald-500") : (Me = "Mixed Signals", De = "text-muted-foreground"), /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("p", { className: "text-xs text-foreground font-medium", children: "Volume Context" }),
            /* @__PURE__ */ s.jsxs("p", { className: "text-[10px] text-muted-foreground/60", children: [
              i === "QB" ? "Pass attempts per week" : i === "RB" ? "Team targets vs player touches" : "Team pass attempts vs player targets",
              " · Dual overlay"
            ] })
          ] }),
          /* @__PURE__ */ s.jsx(fn, { variant: "outline", className: `text-[10px] ${De} border-current/20`, "data-testid": "badge-volume-diagnosis", children: Me })
        ] }),
        oe.length >= 2 && (() => {
          const je = [...oe, ...se], Re = Math.max(...je, 1), Qe = 140, We = { top: 10, bottom: 24, left: 0, right: 0 }, pt = Qe - We.top - We.bottom, gt = 400, tn = (xt, lt, nt) => ({
            x: We.left + lt / (nt - 1) * (gt - We.left - We.right),
            y: We.top + pt - xt / Re * pt
          }), nn = (xt) => xt.map((lt, nt) => `${nt === 0 ? "M" : "L"}${tn(lt, nt, xt.length).x},${tn(lt, nt, xt.length).y}`).join(" "), rn = (xt) => {
            const lt = xt.map((nt, At) => tn(nt, At, xt.length));
            return `${nn(xt)} L${lt[lt.length - 1].x},${We.top + pt} L${lt[0].x},${We.top + pt} Z`;
          };
          return /* @__PURE__ */ s.jsxs("svg", { viewBox: `0 0 ${gt} ${Qe}`, className: "w-full", style: { height: Qe }, preserveAspectRatio: "none", children: [
            /* @__PURE__ */ s.jsxs("defs", { children: [
              /* @__PURE__ */ s.jsxs("linearGradient", { id: "vol-team-fill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: "hsl(var(--muted-foreground))", stopOpacity: "0.08" }),
                /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: "hsl(var(--muted-foreground))", stopOpacity: "0" })
              ] }),
              /* @__PURE__ */ s.jsxs("linearGradient", { id: "vol-player-fill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: "#0b3a7a", stopOpacity: "0.12" }),
                /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: "#0b3a7a", stopOpacity: "0" })
              ] })
            ] }),
            /* @__PURE__ */ s.jsx("path", { d: rn(oe), fill: "url(#vol-team-fill)" }),
            /* @__PURE__ */ s.jsx("path", { d: nn(oe), fill: "none", stroke: "hsl(var(--muted-foreground))", strokeWidth: "1.5", strokeDasharray: "4 3", opacity: "0.4" }),
            /* @__PURE__ */ s.jsx("path", { d: nn(Pe), fill: "none", stroke: "hsl(var(--muted-foreground))", strokeWidth: "2", opacity: "0.5", strokeLinejoin: "round" }),
            /* @__PURE__ */ s.jsx("path", { d: rn(se), fill: "url(#vol-player-fill)" }),
            /* @__PURE__ */ s.jsx("path", { d: nn(se), fill: "none", stroke: "#0b3a7a", strokeWidth: "1.5", opacity: "0.4" }),
            /* @__PURE__ */ s.jsx("path", { d: nn(Ae), fill: "none", stroke: "#0b3a7a", strokeWidth: "2.5", strokeLinejoin: "round", strokeLinecap: "round" }),
            se.map((xt, lt) => {
              const nt = tn(xt, lt, se.length);
              return /* @__PURE__ */ s.jsx("circle", { cx: nt.x, cy: nt.y, r: "2", fill: "#0b3a7a", opacity: "0.4" }, lt);
            }),
            /* @__PURE__ */ s.jsx("text", { x: tn(0, 0, oe.length).x, y: Qe - 4, textAnchor: "start", className: "fill-muted-foreground", fontSize: "10", children: "Wk 1" }),
            /* @__PURE__ */ s.jsxs("text", { x: tn(0, oe.length - 1, oe.length).x, y: Qe - 4, textAnchor: "end", className: "fill-muted-foreground", fontSize: "10", children: [
              "Wk ",
              oe.length
            ] })
          ] });
        })(),
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-4 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ s.jsx("span", { className: "inline-block w-3 h-0.5 rounded", style: { background: "hsl(var(--muted-foreground))" } }),
            " ",
            i === "RB" ? "Team Targets" : "Team Pass Att"
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ s.jsx("span", { className: "inline-block w-3 h-0.5 rounded", style: { background: "#0b3a7a" } }),
            " ",
            i === "QB" ? "Pass Att" : i === "RB" ? "Carries + Targets" : "Player Targets"
          ] })
        ] })
      ] });
    })() }),
    i !== "K" && /* @__PURE__ */ s.jsx("div", { className: "sc-card", style: { padding: "24px 28px" }, "data-testid": "chart-td-dependency-overlay", children: (() => {
      const E = Ie.map((Te, Se) => Te > 0 ? qe[Se] / Te * 100 : 0), W = Zt(E, 3), he = E.length > 0 ? E.reduce((Te, Se) => Te + Se, 0) / E.length : 0, we = E.filter((Te) => Te >= 40).length;
      return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("p", { className: "text-xs text-foreground font-medium", children: "Scoring Composition" }),
            /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: "TD points as % of total fantasy output · Weeks ≥40% highlighted" })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
            /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground/60", children: "Avg TD%:" }),
            /* @__PURE__ */ s.jsxs("span", { className: `font-bold tabular-nums ${he >= 35 ? "text-amber-400" : "text-foreground"}`, children: [
              he.toFixed(0),
              "%"
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground/40", children: "|" }),
            /* @__PURE__ */ s.jsx("span", { className: "text-muted-foreground/60", children: "≥40% weeks:" }),
            /* @__PURE__ */ s.jsxs("span", { className: `font-bold tabular-nums ${we >= 3 ? "text-amber-400" : "text-foreground"}`, children: [
              we,
              "/",
              E.length
            ] })
          ] })
        ] }),
        E.length >= 2 && (() => {
          const Se = { top: 10, bottom: 24, left: 0, right: 0 }, Le = 140 - Se.top - Se.bottom, _e = 400, Fe = 100, me = (je, Re) => ({
            x: Se.left + Re / (E.length - 1) * (_e - Se.left - Se.right),
            y: Se.top + Le - Math.min(je, Fe) / Fe * Le
          }), Me = (je) => je.map((Re, Qe) => `${Qe === 0 ? "M" : "L"}${me(Re, Qe).x},${me(Re, Qe).y}`).join(" "), De = Se.top + Le - 40 / Fe * Le;
          return /* @__PURE__ */ s.jsxs("svg", { viewBox: `0 0 ${_e} 140`, className: "w-full", style: { height: 140 }, preserveAspectRatio: "none", children: [
            /* @__PURE__ */ s.jsx("defs", { children: /* @__PURE__ */ s.jsxs("linearGradient", { id: "tdpct-fill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ s.jsx("stop", { offset: "0%", stopColor: "#f59e0b", stopOpacity: "0.12" }),
              /* @__PURE__ */ s.jsx("stop", { offset: "100%", stopColor: "#f59e0b", stopOpacity: "0" })
            ] }) }),
            /* @__PURE__ */ s.jsx("rect", { x: 0, y: Se.top, width: _e, height: De - Se.top, fill: "#f59e0b", opacity: "0.03" }),
            /* @__PURE__ */ s.jsx("line", { x1: 0, y1: De, x2: _e, y2: De, stroke: "#f59e0b", strokeWidth: "1", strokeDasharray: "4 3", opacity: "0.25" }),
            /* @__PURE__ */ s.jsx("text", { x: _e - 6, y: De - 4, textAnchor: "end", fill: "#f59e0b", fontSize: "8", opacity: "0.4", children: "40% threshold" }),
            (() => {
              const je = E.map((Qe, We) => me(Qe, We)), Re = `${Me(E)} L${je[je.length - 1].x},${Se.top + Le} L${je[0].x},${Se.top + Le} Z`;
              return /* @__PURE__ */ s.jsx("path", { d: Re, fill: "url(#tdpct-fill)" });
            })(),
            /* @__PURE__ */ s.jsx("path", { d: Me(E), fill: "none", stroke: "#f59e0b", strokeWidth: "1.5", opacity: "0.4" }),
            /* @__PURE__ */ s.jsx("path", { d: Me(W), fill: "none", stroke: "#f59e0b", strokeWidth: "2.5", strokeLinejoin: "round", strokeLinecap: "round" }),
            E.map((je, Re) => {
              const Qe = me(je, Re), We = je >= 40;
              return /* @__PURE__ */ s.jsxs(y.Fragment, { children: [
                We && /* @__PURE__ */ s.jsx("circle", { cx: Qe.x, cy: Qe.y, r: "6", fill: "#f59e0b", opacity: "0.12" }),
                /* @__PURE__ */ s.jsx("circle", { cx: Qe.x, cy: Qe.y, r: We ? 3.5 : 2, fill: "#f59e0b", opacity: We ? 0.8 : 0.35 })
              ] }, Re);
            }),
            /* @__PURE__ */ s.jsx("text", { x: me(0, 0).x, y: 136, textAnchor: "start", className: "fill-muted-foreground", fontSize: "10", children: "Wk 1" }),
            /* @__PURE__ */ s.jsxs("text", { x: me(0, E.length - 1).x, y: 136, textAnchor: "end", className: "fill-muted-foreground", fontSize: "10", children: [
              "Wk ",
              E.length
            ] })
          ] });
        })(),
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-4 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ s.jsx("span", { className: "inline-block w-3 h-0.5 rounded", style: { background: "#f59e0b" } }),
            " TD% of FPTS (3-wk rolling)"
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ s.jsx("span", { className: "inline-block w-2 h-2 rounded-full", style: { background: "#f59e0b" } }),
            " ≥40% TD-driven week"
          ] })
        ] })
      ] });
    })() }),
    (() => {
      const E = c.slice(-4), W = E.reduce((Fe, me) => Fe + f(me, "rec_tgt"), 0), he = E.reduce((Fe, me) => Fe + f(me, "team_tgt"), 0), we = c.length >= 4 && he > 0 ? W / he * 100 : null, Te = g, Se = c.length >= 4 ? c.slice(-4).reduce((Fe, me) => Fe + f(me, "team_tgt"), 0) / 4 : null, Le = c.length > 0 ? c.reduce((Fe, me) => Fe + f(me, "team_tgt"), 0) / c.length : 0;
      let _e = "";
      if (we !== null && Se !== null && c.length >= 5) {
        const Fe = we - Te, me = Le > 0 ? (Se - Le) / Le * 100 : 0;
        if (i === "QB") {
          const Me = c.slice(-4).reduce((Re, Qe) => Re + f(Qe, "pass_att"), 0) / 4, De = c.reduce((Re, Qe) => Re + f(Qe, "pass_att"), 0) / c.length, je = De > 0 ? (Me - De) / De * 100 : 0;
          Math.abs(je) < 3 ? _e = `Pass attempts have remained stable over the last 4 games (${Me.toFixed(0)}/gm vs ${De.toFixed(0)}/gm season avg), indicating a consistent offensive scheme.` : je > 0 ? _e = `Pass attempts have increased ${je.toFixed(0)}% over the last 4 games (${Me.toFixed(0)}/gm vs ${De.toFixed(0)}/gm), suggesting expanded aerial involvement.` : _e = `Pass attempts have declined ${Math.abs(je).toFixed(0)}% over the last 4 games (${Me.toFixed(0)}/gm vs ${De.toFixed(0)}/gm), indicating a potential shift toward the run game.`;
        } else if (i === "RB") {
          const Me = c.slice(-4).reduce((pt, gt) => pt + f(gt, "rush_att"), 0) / 4, De = c.reduce((pt, gt) => pt + f(gt, "rush_att"), 0) / c.length, je = De > 0 ? (Me - De) / De * 100 : 0, Re = c.slice(-4).reduce((pt, gt) => pt + f(gt, "rec_tgt"), 0) / 4, Qe = c.reduce((pt, gt) => pt + f(gt, "rec_tgt"), 0) / c.length, We = Qe > 0 ? (Re - Qe) / Qe * 100 : 0;
          Math.abs(je) < 5 && Math.abs(We) < 10 ? _e = `Carries (${Me.toFixed(1)}/gm) and targets (${Re.toFixed(1)}/gm) have remained stable over the last 4 games, indicating a consistent backfield role.` : je > 5 && We > 10 ? _e = `Both carries (${Me.toFixed(1)}/gm vs ${De.toFixed(1)}/gm) and targets (${Re.toFixed(1)}/gm vs ${Qe.toFixed(1)}/gm) have increased over the last 4 games, suggesting an expanding three-down role.` : je > 5 ? _e = `Carries have increased ${je.toFixed(0)}% over the last 4 games (${Me.toFixed(1)}/gm vs ${De.toFixed(1)}/gm season avg)${Math.abs(We) > 10 ? `, while targets have ${We > 0 ? "also risen" : "declined"}` : ", with receiving work holding steady"}.` : je < -5 ? _e = `Carries have declined ${Math.abs(je).toFixed(0)}% over the last 4 games (${Me.toFixed(1)}/gm vs ${De.toFixed(1)}/gm)${We > 10 ? ", though targets have increased, suggesting a shift toward a passing-down role" : ", indicating reduced ground-game involvement"}.` : _e = `Carry volume has been stable at ${Me.toFixed(1)}/gm while targets have ${We > 0 ? "risen" : "declined"} ${Math.abs(We).toFixed(0)}% over the last 4 games (${Re.toFixed(1)}/gm vs ${Qe.toFixed(1)}/gm).`;
        } else if (Math.abs(Fe) < 2 && Math.abs(me) < 5)
          _e = `Target share has remained stable at ${we.toFixed(1)}% over the last 4 games (season avg ${Te.toFixed(1)}%). Team volume is also steady.`;
        else if (Fe <= -2 && Fe > -5 && Math.abs(me) < 5)
          _e = `Target share has dipped modestly from ${Te.toFixed(1)}% to ${we.toFixed(1)}% over the last 4 games despite stable team pass volume, suggesting a minor role shift.`;
        else if (Fe <= -5)
          if (me < -5) {
            const Me = me !== 0 ? Math.min(100, Math.round(Math.abs(me) / (Math.abs(me) + Math.abs(Fe) * 5) * 100)) : 0;
            _e = `Over the last 4 games, target share has dropped from ${Te.toFixed(1)}% to ${we.toFixed(1)}%, while team pass volume also declined ${Math.abs(me).toFixed(0)}%. Reduced team volume accounts for roughly ${Me}% of the usage dip.`;
          } else
            _e = `Target share has declined significantly from ${Te.toFixed(1)}% to ${we.toFixed(1)}% despite stable team pass volume, indicating a potential loss of role rather than offensive slowdown.`;
        else if (Fe <= -2 && me < -5) {
          const Me = me !== 0 ? Math.min(100, Math.round(Math.abs(me) / (Math.abs(me) + Math.abs(Fe) * 5) * 100)) : 0;
          _e = `Target share has dipped from ${Te.toFixed(1)}% to ${we.toFixed(1)}%, coinciding with a ${Math.abs(me).toFixed(0)}% decline in team pass volume. Reduced team volume accounts for roughly ${Me}% of the usage dip.`;
        } else Fe >= 5 ? _e = `Target share has risen significantly from ${Te.toFixed(1)}% to ${we.toFixed(1)}% over the last 4 games${me < -3 ? " even as team volume declined" : ""}, suggesting a rapidly expanding role in the offense.` : Fe >= 2 ? _e = `Target share has risen from ${Te.toFixed(1)}% to ${we.toFixed(1)}% over the last 4 games${me < -3 ? " even as team volume declined" : ""}, suggesting an expanding role in the offense.` : Math.abs(Fe) < 2 && me < -5 ? _e = `Target share has held steady at ${we.toFixed(1)}% despite a ${Math.abs(me).toFixed(0)}% decline in team pass volume, indicating the player is absorbing a larger proportion of a shrinking passing offense.` : _e = `Target share sits at ${we.toFixed(1)}% over the last 4 games vs ${Te.toFixed(1)}% season average. Team volume has shifted ${me > 0 ? "up" : "down"} ${Math.abs(me).toFixed(0)}%.`;
      }
      return _e ? /* @__PURE__ */ s.jsx("div", { className: "sc-card", style: { padding: "20px 28px" }, "data-testid": "usage-shift-summary", children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ s.jsx(Bi, { className: "w-3.5 h-3.5 shrink-0", style: { color: "#d4af37", marginTop: "2px" } }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0b3a7a", marginBottom: "4px" }, children: "Usage Shift Summary" }),
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "11px", color: "#475569", lineHeight: 1.6 }, "data-testid": "text-shift-summary", children: _e })
        ] })
      ] }) }) : null;
    })(),
    Ge.cards.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, "data-testid": "section-role-stability-risk", children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Role Stability and Risk", subtitle: "How consistent and sustainable this player's usage and scoring profile is right now." }),
      /* @__PURE__ */ s.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "16px" }, children: Ge.cards.map((E, W) => /* @__PURE__ */ s.jsxs("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "12px 14px" }, children: [
        /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }, children: E.label }),
        /* @__PURE__ */ s.jsx("p", { style: { fontSize: "14px", fontWeight: 700, color: E.color, marginBottom: E.sub ? "2px" : "0" }, children: E.value }),
        E.sub && /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", color: "#64748b" }, children: E.sub })
      ] }, W)) }),
      /* @__PURE__ */ s.jsxs("div", { style: { background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "8px", padding: "12px 14px" }, children: [
        /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6366f1", marginBottom: "6px" }, children: "Insight" }),
        /* @__PURE__ */ s.jsx("p", { style: { fontSize: "13px", color: "var(--foreground)", lineHeight: "1.65" }, "data-testid": "text-role-stability-insight", children: Ge.insight })
      ] })
    ] }),
    i !== "K" && c.length >= 3 && (() => {
      const E = c.length, W = (ke) => c.reduce((Je, bt) => Je + f(bt, ke), 0), he = i === "QB", we = i === "RB", Te = he ? W("pass_att") / E : we ? (W("rush_att") + W("rec_tgt")) / E : W("rec_tgt") / E, Se = he ? 0 : g, Le = B;
      let _e, Fe, me;
      if (he) {
        const ke = W("pass_att") || 1, Je = ke + 2 * W("rush_att");
        _e = c.reduce((bt, Xn) => bt + ze(Xn, a), 0) / (Je || 1), Fe = ke > 0 ? W("pass_cmp") / ke * 100 : 0, me = W("pass_td") / ke * 100;
      } else if (we) {
        const ke = W("rush_att") + W("rec") || 1;
        _e = (W("rush_yd") + W("rec_yd")) / ke, Fe = W("rec_tgt") > 0 ? W("rec") / W("rec_tgt") * 100 : 0, me = (W("rush_td") + W("rec_td")) / ke * 100;
      } else {
        const ke = W("rec_tgt") || 1, Je = W("rec") || 1;
        _e = W("rec_yd") / Je, Fe = W("rec") / ke * 100, me = W("rec_td") / ke * 100;
      }
      c.reduce((ke, Je) => ke + ze(Je, a), 0);
      let Me = 0, De = 0, je = 0;
      he ? (Me = W("pass_td") * 4 + W("rush_td") * 6, De = W("pass_yd") * 0.04 + W("rush_yd") * 0.1, je = 0) : (Me = (W("rec_td") + W("rush_td")) * 6, De = W("rec_yd") * 0.1 + W("rush_yd") * 0.1, je = a === "ppr" ? W("rec") * 1 : a === "half" ? W("rec") * 0.5 : 0);
      const Re = Me + De + je, Qe = Re > 0 ? 100 / Re : 0, We = Me * Qe, pt = De * Qe, gt = je * Qe, { high: tn, mid: nn } = ax(i), rn = We >= tn, xt = i === "TE", lt = (() => {
        let ke = 50;
        if (he) {
          const Je = W("pass_att") / E;
          ke += Math.min(15, (Je - 28) * 2), ke += Math.min(10, (Le - 50) * 0.2);
        } else we ? (ke += Math.min(15, (Te - 15) * 1.5), ke += Math.min(10, (Le - 50) * 0.2)) : xt ? (ke += Math.min(15, (Se - 8) * 1.5), ke += Math.min(10, (Te - 3) * 3), ke += Math.min(10, (Le - 50) * 0.2)) : (ke += Math.min(15, (Se - 15) * 1), ke += Math.min(10, (Te - 5) * 2), ke += Math.min(10, (Le - 50) * 0.2));
        return Math.max(0, Math.min(100, Math.round(ke)));
      })(), nt = n.productionRiskBenchmarks, At = nt?.posAvg?.tdPerTarget ?? (he ? 4.5 : we ? 3 : i === "TE" ? 4 : 5), Fn = he ? nt?.posAvg?.fpPerUsage ?? 0.55 : nt?.posAvg?.yardsPerCatch ?? (we ? 4.2 : i === "TE" ? 8 : 11), Qn = nt?.posAvg?.catchPct ?? (he ? 64 : we ? 75 : i === "TE" ? 68 : 65), Tr = (() => {
        let ke = 50;
        return he ? (ke += (Fe - Qn) * 0.8, ke += (_e - (Fn || 0.55)) * 80, ke += (me - At) * 3) : we ? (ke += (_e - Fn) * 5, ke += (Fe - Qn) * 0.3, ke += (me - At) * 4) : (ke += (_e - Fn) * 2, ke += (Fe - Qn) * 0.5, ke += (me - At) * 3), Math.max(0, Math.min(100, Math.round(ke)));
      })(), pn = lt > Tr + 15 ? { label: "Volume-Backed", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" } : Tr > lt + 15 ? { label: "Efficiency-Driven", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" } : { label: "Balanced", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" }, Go = 55, Kn = nt?.posStdDev?.tdPerTarget ?? 1, Rr = Math.max(0.3, Math.min(1.5, We / (he ? 41 : we ? 23 : xt ? 19 : 18))), Ws = Kn > 0 ? (me - At) / Kn : 0, Yn = Math.abs(Ws), qn = (Yn > 1 ? Math.sign(Ws) * (1 + (Yn - 1) * 1.8) : Ws) * (he ? 7 : 9) * Rr, Hs = qn > 0 ? Math.min(25, qn) : Math.max(-12, qn), Ko = nt?.posStdDev?.fpPerUsage ?? 1, Qi = he ? (() => {
        const ke = c.reduce((Xn, qi) => {
          const ss = qi.stats;
          return Xn + (ss.pass_yd || 0) * 0.04 + (ss.rush_yd || 0) * 0.1 + (ss.rec_yd || 0) * 0.1;
        }, 0), bt = (W("pass_att") || 1) + 2 * W("rush_att");
        return ke / (bt || 1);
      })() : 0, Mn = he ? Math.max(-20, Math.min(20, (Ko > 0 ? (Qi - 0.275) / Ko : 0) * 12)) : Math.max(-20, Math.min(20, (_e - Fn) * 2.5)), Yo = Math.max(-12, Math.min(12, (Le - Go) * 0.3)), qo = Math.max(-10, Math.min(10, (lt - 50) * 0.25));
      let Xo = 0;
      if (he) {
        const ke = c.reduce((Je, bt) => Je + f(bt, "rush_att"), 0) / E;
        Xo = Math.max(0, Math.min(10, (ke - 4) * 2));
      }
      const Zo = 57 - Hs + Mn + Yo + qo + Xo, Ft = Math.max(0, Math.min(100, Math.round(Zo))), Jo = Ft >= 70 ? "Sustainable" : Ft >= 40 ? "Moderate Risk" : "Elevated Risk", Vs = Ft >= 70 ? "text-emerald-500" : Ft >= 40 ? "text-amber-400" : "text-red-400", Ki = Ft >= 70 ? "bg-emerald-500/10" : Ft >= 40 ? "bg-amber-500/10" : "bg-red-500/10", Yi = Ft >= 70 ? /* @__PURE__ */ s.jsx(xh, { className: "w-3.5 h-3.5 text-emerald-500" }) : Ft >= 40 ? /* @__PURE__ */ s.jsx(Kr, { className: "w-3.5 h-3.5 text-amber-400" }) : /* @__PURE__ */ s.jsx(Kr, { className: "w-3.5 h-3.5 text-red-400" });
      let Xe = "";
      return rn && Se < 18 && !he ? Xe = `Despite ${Se > 0 ? `a modest ${Se.toFixed(1)}% target share` : "limited usage volume"}, scoring remains elevated through a ${me.toFixed(1)}% TD rate that exceeds the positional average (${At.toFixed(1)}%). This efficiency-driven profile carries meaningful regression risk if touchdown rate normalizes.` : rn && he ? Xe = `A ${me.toFixed(1)}% TD rate accounts for ${We.toFixed(0)}% of fantasy output. ${me > At + 1 ? `This exceeds the positional baseline (${At.toFixed(1)}%) and historically trends toward mean reversion, introducing downside risk.` : `This rate tracks near the positional baseline (${At.toFixed(1)}%), providing relative stability in the scoring profile.`}` : lt > Tr + 15 ? Xe = `Production is anchored by ${he ? "sustained pass volume" : we ? "a commanding touch share" : `a ${Se.toFixed(1)}% target share`} rather than elevated efficiency, reducing regression exposure. Volume-backed profiles historically maintain more stable week-to-week output.` : Tr > lt + 15 && me > At + 1 ? Xe = `Efficiency metrics${he ? "" : ` (${_e.toFixed(1)} yds/${we ? "touch" : "catch"})`} and a ${me.toFixed(1)}% TD rate both exceed positional baselines. With ${he ? "pass volume" : "usage volume"} below elite thresholds, scoring is disproportionately dependent on efficiency sustaining above-average levels.` : Le >= 70 ? Xe = `Highly consistent week-to-week usage (stability: ${Le}/100) paired with ${We < nn ? "low TD reliance" : "moderate TD reliance"} establishes a reliable floor. ${Ft >= 60 ? "The balanced profile supports sustained production." : "Upside remains capped by volume limitations."}` : Xe = `${he ? "Passing volume" : we ? "Touch volume" : "Target share"} ${Le >= 50 ? "has been reasonably stable" : "has shown inconsistency"}, while ${We >= nn ? `${We.toFixed(0)}% TD dependency introduces scoring fragility in weeks without touchdowns` : "a diversified scoring profile across yardage and volume reduces single-variable risk"}.`, /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx(ft, { title: "Production Risk", subtitle: "Volume vs efficiency drivers and sustainability signals" }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-card", style: { padding: "24px 28px" }, "data-testid": "volume-vs-efficiency", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Volume vs Efficiency Driver" }),
            /* @__PURE__ */ s.jsx(wr, { children: /* @__PURE__ */ s.jsxs(Vr, { children: [
              /* @__PURE__ */ s.jsx(Gr, { asChild: !0, children: /* @__PURE__ */ s.jsx(Qr, { className: "w-3 h-3 text-muted-foreground/40 cursor-help", "data-testid": "icon-volume-efficiency-info" }) }),
              /* @__PURE__ */ s.jsx(br, { side: "top", className: "max-w-[220px] text-[10px]", children: /* @__PURE__ */ s.jsx("p", { children: "Compares opportunity volume (touches, targets) against efficiency metrics to identify what drives production and where regression risk lies." }) })
            ] }) })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ s.jsx("p", { className: "text-[10px] font-semibold text-foreground uppercase tracking-wider", children: "Volume Engine" }),
              /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground", children: he ? "Att/Game" : we ? "Touches/Game" : "Targets/Game" }),
                /* @__PURE__ */ s.jsx("p", { className: "text-sm font-bold text-foreground tabular-nums", children: Te.toFixed(1) })
              ] }),
              !he && /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground", children: we ? "Touch Share" : "Target Share (Team)" }),
                /* @__PURE__ */ s.jsxs("p", { className: "text-sm font-bold text-foreground tabular-nums", children: [
                  Se.toFixed(1),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Role Consistency" }),
                /* @__PURE__ */ s.jsx("p", { className: "text-sm font-bold text-foreground tabular-nums", children: Le })
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ s.jsx("p", { className: "text-[10px] font-semibold text-foreground uppercase tracking-wider", children: "Efficiency Engine" }),
              /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground", children: he ? "Yards/Att" : we ? "Yards/Touch" : "Yards/Catch" }),
                /* @__PURE__ */ s.jsx("p", { className: "text-sm font-bold text-foreground tabular-nums", children: _e.toFixed(1) }),
                (() => {
                  const ke = _e - Fn, Je = ke > 0.3, bt = ke < -0.3;
                  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                    /* @__PURE__ */ s.jsxs("p", { className: `text-[9px] ${Je ? "text-emerald-500" : bt ? "text-red-400" : "text-muted-foreground/60"}`, children: [
                      Je ? "↑" : bt ? "↓" : "≈",
                      " ",
                      Je ? "+" : "",
                      ke.toFixed(1),
                      " vs Pos Avg (",
                      Fn.toFixed(1),
                      ")"
                    ] }),
                    nt?.percentile?.yardsPerCatch != null && /* @__PURE__ */ s.jsxs("p", { className: "text-[8px] text-muted-foreground/50", children: [
                      nt.percentile.yardsPerCatch,
                      "th percentile"
                    ] })
                  ] });
                })()
              ] }),
              /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground", children: he ? "Completion %" : "Catch %" }),
                /* @__PURE__ */ s.jsxs("p", { className: "text-sm font-bold text-foreground tabular-nums", children: [
                  Fe.toFixed(1),
                  "%"
                ] }),
                (() => {
                  const ke = Fe - Qn, Je = ke > 1, bt = ke < -1;
                  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                    /* @__PURE__ */ s.jsxs("p", { className: `text-[9px] ${Je ? "text-emerald-500" : bt ? "text-red-400" : "text-muted-foreground/60"}`, children: [
                      Je ? "↑" : bt ? "↓" : "≈",
                      " ",
                      Je ? "+" : "",
                      ke.toFixed(1),
                      "% vs Pos Avg (",
                      Qn.toFixed(1),
                      "%)"
                    ] }),
                    nt?.percentile?.catchPct != null && /* @__PURE__ */ s.jsxs("p", { className: "text-[8px] text-muted-foreground/50", children: [
                      nt.percentile.catchPct,
                      "th percentile"
                    ] })
                  ] });
                })()
              ] }),
              /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground", children: he ? "TD/Att Rate" : we ? "TD/Touch Rate" : "TD/Target Rate" }),
                /* @__PURE__ */ s.jsxs("p", { className: "text-sm font-bold text-foreground tabular-nums", children: [
                  me.toFixed(1),
                  "%"
                ] }),
                (() => {
                  const ke = me - At, Je = ke > 0.3, bt = ke < -0.3;
                  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                    /* @__PURE__ */ s.jsxs("p", { className: `text-[9px] ${Je ? "text-emerald-500" : bt ? "text-red-400" : "text-muted-foreground/60"}`, children: [
                      Je ? "↑" : bt ? "↓" : "≈",
                      " ",
                      Je ? "+" : "",
                      ke.toFixed(1),
                      "% vs Pos Avg (",
                      At.toFixed(1),
                      "%)"
                    ] }),
                    nt?.percentile?.tdPerTarget != null && /* @__PURE__ */ s.jsxs("p", { className: "text-[8px] text-muted-foreground/50", children: [
                      nt.percentile.tdPerTarget,
                      "th percentile"
                    ] })
                  ] });
                })()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "pt-2 border-t border-border", children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ s.jsx("span", { className: "text-[10px] text-muted-foreground/60", children: "Production Driver:" }),
            /* @__PURE__ */ s.jsxs(fn, { variant: "outline", className: `text-[10px] px-2.5 py-0.5 ${pn.bg} ${pn.color}`, "data-testid": "badge-production-driver", children: [
              pn.label === "Volume-Backed" ? /* @__PURE__ */ s.jsx(kr, { className: "w-3 h-3 mr-1" }) : pn.label === "Balanced" ? /* @__PURE__ */ s.jsx(Ho, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ s.jsx(Kr, { className: "w-3 h-3 mr-1" }),
              pn.label
            ] }),
            /* @__PURE__ */ s.jsx(wr, { delayDuration: 200, children: /* @__PURE__ */ s.jsxs(Vr, { children: [
              /* @__PURE__ */ s.jsx(Gr, { asChild: !0, children: /* @__PURE__ */ s.jsx("span", { className: "inline-flex cursor-help", children: /* @__PURE__ */ s.jsx(Qr, { className: "w-2.5 h-2.5 text-muted-foreground/40" }) }) }),
              /* @__PURE__ */ s.jsxs(br, { side: "bottom", className: "max-w-[240px] text-xs leading-relaxed p-3", children: [
                /* @__PURE__ */ s.jsx("p", { className: "font-semibold mb-1", children: "Production Driver" }),
                /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground", children: pn.label === "Volume-Backed" ? "Scoring is anchored by workload volume rather than elevated efficiency. Lower regression risk." : pn.label === "Efficiency-Driven" ? "Scoring exceeds what workload alone would produce. If efficiency normalizes toward league averages, production may decline." : "A mix of volume and efficiency — neither dominates the scoring profile." })
              ] })
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-card", style: { padding: "24px 28px" }, "data-testid": "td-dependency-breakdown", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "TD Dependency Breakdown" }),
            /* @__PURE__ */ s.jsx(wr, { children: /* @__PURE__ */ s.jsxs(Vr, { children: [
              /* @__PURE__ */ s.jsx(Gr, { asChild: !0, children: /* @__PURE__ */ s.jsx(Qr, { className: "w-3 h-3 text-muted-foreground/40 cursor-help", "data-testid": "icon-td-dependency-info" }) }),
              /* @__PURE__ */ s.jsx(br, { side: "top", className: "max-w-[200px] text-[10px]", children: /* @__PURE__ */ s.jsx("p", { children: "TD dependency above 35% may increase weekly volatility and regression risk." }) })
            ] }) })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "flex h-6 rounded-full overflow-hidden border border-border", "data-testid": "bar-td-breakdown", children: [
              We > 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "flex items-center justify-center text-[9px] font-bold text-white",
                  style: { width: `${We}%`, background: "#d97706" },
                  children: We >= 15 ? `${We.toFixed(0)}%` : ""
                }
              ),
              pt > 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "flex items-center justify-center text-[9px] font-bold text-white",
                  style: { width: `${pt}%`, background: "#6366f1" },
                  children: pt >= 15 ? `${pt.toFixed(0)}%` : ""
                }
              ),
              gt > 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  className: "flex items-center justify-center text-[9px] font-bold text-white",
                  style: { width: `${gt}%`, background: "#059669" },
                  children: gt >= 15 ? `${gt.toFixed(0)}%` : ""
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-4 text-[10px] text-muted-foreground flex-wrap", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s.jsx("span", { className: "inline-block w-2.5 h-2.5 rounded-sm", style: { background: "#d97706" } }),
                " TDs ",
                We.toFixed(0),
                "%"
              ] }),
              /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s.jsx("span", { className: "inline-block w-2.5 h-2.5 rounded-sm", style: { background: "#6366f1" } }),
                " Yardage ",
                pt.toFixed(0),
                "%"
              ] }),
              !he && gt > 0 && /* @__PURE__ */ s.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s.jsx("span", { className: "inline-block w-2.5 h-2.5 rounded-sm", style: { background: "#059669" } }),
                " Receptions ",
                gt.toFixed(0),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "pt-1", children: /* @__PURE__ */ s.jsxs(fn, { variant: "outline", className: `text-[10px] ${rn ? "border-amber-500/30 text-amber-500" : "border-emerald-500/30 text-emerald-500"}`, "data-testid": "badge-td-reliance", children: [
            rn ? /* @__PURE__ */ s.jsx(Kr, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ s.jsx(xh, { className: "w-3 h-3 mr-1" }),
            rn ? "High TD Reliance" : "Sustainable Volume Base"
          ] }) })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-card", style: { padding: "24px 28px" }, "data-testid": "sustainability-score", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
            /* @__PURE__ */ s.jsx(wr, { delayDuration: 200, children: /* @__PURE__ */ s.jsxs(Vr, { children: [
              /* @__PURE__ */ s.jsx(Gr, { asChild: !0, children: /* @__PURE__ */ s.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold cursor-help border-b border-dotted border-muted-foreground/40", children: "Sustainability Score" }) }),
              /* @__PURE__ */ s.jsxs(br, { side: "bottom", className: "max-w-[280px] text-xs leading-relaxed p-3", children: [
                /* @__PURE__ */ s.jsx("p", { className: "font-semibold mb-1.5", children: "What Is Sustainability?" }),
                /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground", children: "Measures how likely a player's current production level is to continue. It evaluates:" }),
                /* @__PURE__ */ s.jsxs("ul", { className: "text-muted-foreground mt-1 space-y-0.5 list-disc pl-3.5", children: [
                  /* @__PURE__ */ s.jsx("li", { children: "Touchdown rate vs league norms" }),
                  /* @__PURE__ */ s.jsx("li", { children: "Efficiency per opportunity" }),
                  /* @__PURE__ */ s.jsx("li", { children: "Weekly role stability" }),
                  /* @__PURE__ */ s.jsx("li", { children: "Overall workload" }),
                  he && /* @__PURE__ */ s.jsx("li", { children: "Rushing floor" })
                ] }),
                /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground mt-1.5", children: "Players with extreme TD rates or unusually high efficiency face higher regression risk." })
              ] })
            ] }) }),
            /* @__PURE__ */ s.jsxs("div", { className: `flex items-center gap-1.5 px-2.5 py-1 rounded-md ${Ki}`, children: [
              Yi,
              /* @__PURE__ */ s.jsx("span", { className: `text-[11px] font-bold ${Vs}`, children: Jo })
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-end gap-3", children: [
            /* @__PURE__ */ s.jsx("p", { className: `text-5xl font-extrabold tabular-nums ${Vs}`, "data-testid": "text-sustainability-score", children: Ft }),
            /* @__PURE__ */ s.jsx("div", { className: "mb-1.5", children: /* @__PURE__ */ s.jsx("p", { className: "text-sm text-muted-foreground", children: "/ 100" }) })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "h-3 rounded-full bg-muted overflow-hidden", "data-testid": "bar-sustainability", children: /* @__PURE__ */ s.jsx(
            "div",
            {
              className: "h-full rounded-full",
              style: {
                "--sustain-width": `${Ft}%`,
                width: "0%",
                background: Ft >= 70 ? "#10b981" : Ft >= 40 ? "#f59e0b" : "#ef4444",
                animation: "sustainFill 1s ease-out 0.3s forwards"
              }
            }
          ) }),
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between text-[9px] text-muted-foreground/50 px-0.5", children: [
            /* @__PURE__ */ s.jsx("span", { children: "0 — Elevated Risk" }),
            /* @__PURE__ */ s.jsx("span", { children: "40 — Moderate" }),
            /* @__PURE__ */ s.jsx("span", { children: "70 — Sustainable" }),
            /* @__PURE__ */ s.jsx("span", { children: "100" })
          ] }),
          /* @__PURE__ */ s.jsx("p", { className: "text-[11px] text-foreground/80 leading-relaxed italic", "data-testid": "text-sustainability-insight", children: Xe })
        ] })
      ] });
    })(),
    st.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, "data-testid": "section-fantasy-takeaways", children: [
      /* @__PURE__ */ s.jsx(ft, { title: "Fantasy Takeaways", subtitle: "What the usage and role data means for fantasy decisions right now." }),
      /* @__PURE__ */ s.jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }, children: st.map((E, W) => {
        const he = E.icon === "up" ? "#22c55e" : E.icon === "down" ? "#ef4444" : "#64748b", we = E.icon === "up" ? "#22c55e" : E.icon === "down" ? "#ef4444" : "#94a3b8", Te = E.icon === "up" ? "▲" : E.icon === "down" ? "▼" : "●";
        return /* @__PURE__ */ s.jsxs(
          "li",
          {
            style: { display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `3px solid ${he}`, borderRadius: "6px", fontSize: "13px", color: "var(--foreground)", lineHeight: "1.6" },
            "data-testid": `takeaway-${W}`,
            children: [
              /* @__PURE__ */ s.jsx("span", { style: { color: we, fontSize: "8px", fontWeight: 700, marginTop: "5px", flexShrink: 0 }, children: Te }),
              E.text
            ]
          },
          W
        );
      }) })
    ] })
  ] });
}
function i_({ player: n }) {
  const r = n.dynasty, [a, i] = y.useState("1qb");
  if (!r)
    return /* @__PURE__ */ s.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ s.jsxs("div", { className: "rounded-md border border-dashed border-muted-foreground/25 p-12 text-center", children: [
      /* @__PURE__ */ s.jsx($s, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Dynasty rankings not available for this player" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground/60 text-xs mt-1", children: "This player is not currently ranked in consensus dynasty rankings." })
    ] }) });
  const c = a === "sf" && r.sf ? { ...r, ...r.sf } : r, d = `${r.position}${c.positionalTier <= 1 ? "1" : c.positionalTier <= 3 ? "2" : "3+"}`, p = c.positionalTier <= 1 ? "Elite" : c.positionalTier <= 3 ? "Mid" : c.positionalTier <= 6 ? "Low-End" : "Deep", f = r.ageCurveTier === "Rising" ? "text-emerald-500" : r.ageCurveTier === "Prime" ? "text-blue-500" : r.ageCurveTier === "Aging" ? "text-amber-500" : "text-red-400", m = r.ageCurveTier === "Rising" ? "bg-emerald-500/10" : r.ageCurveTier === "Prime" ? "bg-blue-500/10" : r.ageCurveTier === "Aging" ? "bg-amber-500/10" : "bg-red-500/10", v = c.value >= 8e3 ? "text-emerald-500" : c.value >= 6e3 ? "text-blue-500" : c.value >= 4e3 ? "text-foreground" : c.value >= 2e3 ? "text-muted-foreground" : "text-red-400", g = c.value >= 8e3 ? "Elite" : c.value >= 6e3 ? "Premium" : c.value >= 4e3 ? "Solid" : c.value >= 2e3 ? "Roster" : "Fringe", x = r.draftRound, w = r.draftPick, k = r.draftYear, S = x && w && k ? `Round ${x} – Pick ${w} (${k})` : x && k ? `Round ${x} (${k})` : x ? `Round ${x}` : null, j = x ? x === 1 && w && w <= 10 ? { label: "Elite", color: "text-yellow-500 dark:text-yellow-400", bg: "bg-yellow-500/10" } : x === 1 ? { label: "Strong", color: "text-yellow-500 dark:text-yellow-400", bg: "bg-yellow-500/10" } : x === 2 ? { label: "Solid", color: "text-slate-400 dark:text-slate-300", bg: "bg-slate-500/10" } : { label: "Fragile", color: "text-amber-700 dark:text-amber-600", bg: "bg-amber-500/10" } : { label: "Undrafted", color: "text-muted-foreground", bg: "bg-muted/50" };
  return /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "32px" }, "data-testid": "rankings-tab", children: [
    /* @__PURE__ */ s.jsx(ft, { title: "Rankings & Value", subtitle: "Dynasty consensus data and market positioning" }),
    /* @__PURE__ */ s.jsxs("div", { className: "sc-card", style: { padding: "28px" }, "data-testid": "dynasty-market-snapshot", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", style: { marginBottom: "20px" }, children: [
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ s.jsx($s, { className: "w-4 h-4", style: { color: "#d4af37" } }),
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "13px", fontWeight: 700, color: "#0b3a7a", letterSpacing: "-0.01em" }, children: "Dynasty Market Snapshot" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3", children: [
          r.sf && /* @__PURE__ */ s.jsxs("div", { className: "sc-gamelog__segmented-control", "data-testid": "toggle-dynasty-format", children: [
            /* @__PURE__ */ s.jsx(
              "button",
              {
                onClick: () => i("1qb"),
                className: `sc-gamelog__segment ${a === "1qb" ? "sc-gamelog__segment--active" : ""}`,
                "data-testid": "button-dynasty-1qb",
                children: "1QB"
              }
            ),
            /* @__PURE__ */ s.jsx(
              "button",
              {
                onClick: () => i("sf"),
                className: `sc-gamelog__segment ${a === "sf" ? "sc-gamelog__segment--active" : ""}`,
                "data-testid": "button-dynasty-sf",
                children: "SF"
              }
            )
          ] }),
          /* @__PURE__ */ s.jsxs(
            "a",
            {
              href: `https://keeptradecut.com/dynasty-rankings/players/${r.ktcSlug}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[10px] text-muted-foreground/50 hover:text-primary transition-colors flex items-center gap-1",
              "data-testid": "link-ktc-profile",
              children: [
                "KeepTradeCut ",
                /* @__PURE__ */ s.jsx(pu, { className: "w-2.5 h-2.5" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-overall-rank", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Overall Rank" }),
          /* @__PURE__ */ s.jsx("p", { className: "text-3xl font-bold text-foreground mt-1 tabular-nums", children: c.rank }),
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] text-muted-foreground", children: "of 500+" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-positional-rank", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Positional Rank" }),
          /* @__PURE__ */ s.jsxs("p", { className: "text-3xl font-bold text-foreground mt-1 tabular-nums", children: [
            r.position,
            c.positionalRank
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground", children: [
            "Tier ",
            c.positionalTier
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-age-curve", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Age Curve" }),
          /* @__PURE__ */ s.jsx("span", { className: `inline-block mt-2 px-2 py-1 rounded-md text-xs font-bold ${f} ${m}`, children: r.ageCurveTier }),
          /* @__PURE__ */ s.jsxs("p", { className: "text-[10px] text-muted-foreground tabular-nums mt-1", children: [
            r.age.toFixed(1),
            " yrs"
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-value", className: "relative", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-medium", children: "Dynasty Value" }),
          /* @__PURE__ */ s.jsx("p", { className: `text-4xl font-extrabold mt-1 tabular-nums tracking-tight ${v}`, children: c.value.toLocaleString() }),
          /* @__PURE__ */ s.jsx("span", { className: `inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${v} ${c.value >= 8e3 ? "bg-emerald-500/10" : c.value >= 6e3 ? "bg-blue-500/10" : "bg-muted/50"}`, children: g })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "border-t border-border pt-4", children: /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-4", children: [
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-drafted", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Drafted" }),
          /* @__PURE__ */ s.jsx("p", { className: "text-xs font-semibold text-muted-foreground mt-1", children: S || "Undrafted" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-draft-grade", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Capital Grade" }),
          /* @__PURE__ */ s.jsx("span", { className: `inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold ${j.color} ${j.bg}`, children: j.label })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-tier", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Dynasty Tier" }),
          /* @__PURE__ */ s.jsxs("p", { className: "text-xs font-semibold text-muted-foreground mt-1", children: [
            p,
            " ",
            d
          ] })
        ] }),
        c.startupAdp ? /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-startup-adp", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Startup ADP" }),
          /* @__PURE__ */ s.jsx("p", { className: "text-xs font-semibold text-muted-foreground mt-1 tabular-nums", children: c.startupAdp.toFixed(1) })
        ] }) : /* @__PURE__ */ s.jsx("div", {}),
        /* @__PURE__ */ s.jsxs("div", { "data-testid": "dynasty-market-tier", children: [
          /* @__PURE__ */ s.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium", children: "Market Tier" }),
          /* @__PURE__ */ s.jsx("p", { className: `text-xs font-semibold mt-1 ${v}`, children: g })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ s.jsx(
      "a",
      {
        href: `https://keeptradecut.com/dynasty-rankings/players/${r.ktcSlug}`,
        target: "_blank",
        rel: "noopener noreferrer",
        children: /* @__PURE__ */ s.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 28px", cursor: "pointer" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ s.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(212,175,55,0.1)" }, children: /* @__PURE__ */ s.jsx(Fb, { className: "w-4 h-4", style: { color: "#d4af37" } }) }),
            /* @__PURE__ */ s.jsxs("div", { children: [
              /* @__PURE__ */ s.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "View Full Dynasty Profile" }),
              /* @__PURE__ */ s.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Trade calculator, keep/trade/cut data, and more on KeepTradeCut" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx(pu, { className: "w-4 h-4 flex-shrink-0", style: { color: "#94a3b8" } })
        ] }) })
      }
    ),
    /* @__PURE__ */ s.jsx("div", { className: "px-1 pt-2", "data-testid": "dynasty-disclaimer", children: /* @__PURE__ */ s.jsxs("p", { className: "text-[9px] text-muted-foreground/40 leading-relaxed", children: [
      "Dynasty market data referenced from publicly available consensus rankings at",
      " ",
      /* @__PURE__ */ s.jsx(
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
function l_({ item: n, player: r, teamColor: a, sourceName: i }) {
  const [c, d] = y.useState(!1), p = Yu(r.id), f = a || "#d4af37", m = `linear-gradient(90deg, ${f}, ${f}88)`;
  return /* @__PURE__ */ s.jsx(
    "a",
    {
      href: n.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "block",
      "data-testid": "link-featured-news",
      children: /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "sc-player-news",
          style: { "--team-accent": f },
          children: [
            /* @__PURE__ */ s.jsx("div", { style: { height: 4, borderRadius: "6px 6px 0 0", background: m, margin: "-24px -24px 20px -24px" } }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-player-news__header", children: [
              c ? /* @__PURE__ */ s.jsx("div", { className: "sc-player-news__img-fallback", style: { borderColor: f }, children: /* @__PURE__ */ s.jsx(Vu, { className: "w-6 h-6 text-slate-400 dark:text-slate-500" }) }) : /* @__PURE__ */ s.jsx(
                "img",
                {
                  src: p,
                  alt: r.name,
                  className: "sc-player-news__img",
                  style: { borderColor: f },
                  onError: () => d(!0)
                }
              ),
              /* @__PURE__ */ s.jsxs("div", { children: [
                /* @__PURE__ */ s.jsxs("div", { className: "sc-player-news__name", children: [
                  r.name,
                  " – ",
                  r.position
                ] }),
                /* @__PURE__ */ s.jsxs("div", { className: "sc-player-news__posted", children: [
                  n.type === "video" ? "🎥 Video" : "📰 Article",
                  " • ",
                  i
                ] })
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-player-news__pills", children: [
              /* @__PURE__ */ s.jsx("span", { className: "sc-pill sc-pill--type", "data-testid": "badge-featured-type", children: (n.type || "news").toUpperCase() }),
              n.impact && /* @__PURE__ */ s.jsx("span", { className: `sc-pill sc-pill--impact sc-pill--impact-${n.impact.toLowerCase()}`, children: n.impact }),
              n.tag && /* @__PURE__ */ s.jsx("span", { className: "sc-pill sc-pill--tag", children: n.tag })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: "sc-player-news__body", children: n.ai_blurb || n.title }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-player-news__footer", children: [
              /* @__PURE__ */ s.jsxs("span", { className: "sc-player-news__source", children: [
                "Source: ",
                i
              ] }),
              /* @__PURE__ */ s.jsx("span", { className: "sc-player-news__link", children: "View Original →" })
            ] })
          ]
        }
      )
    }
  );
}
function c_(n) {
  const r = (n || "").toUpperCase().trim();
  return r === "OUT" ? "sc-injury-pill--out" : r === "DOUBTFUL" ? "sc-injury-pill--doubtful" : r === "QUESTIONABLE" ? "sc-injury-pill--questionable" : "sc-injury-pill--none";
}
function Kc(n) {
  const r = (n || "").toUpperCase().trim();
  return r === "FP" ? "sc-injury-chip--fp" : r === "LP" ? "sc-injury-chip--lp" : r === "DNP" ? "sc-injury-chip--dnp" : "";
}
const u_ = {
  NE: "Patriots",
  BUF: "Bills",
  MIA: "Dolphins",
  NYJ: "Jets",
  BAL: "Ravens",
  CIN: "Bengals",
  CLE: "Browns",
  PIT: "Steelers"
}, Ah = {
  Drafted: { bg: "rgba(30,136,229,0.10)", text: "#1565C0", dot: "#1e88e5", border: "rgba(30,136,229,0.25)", icon: $s, fantasyInflection: !1 },
  Breakout: { bg: "rgba(76,175,80,0.12)", text: "#2E7D32", dot: "#4caf50", border: "rgba(76,175,80,0.30)", icon: kr, fantasyInflection: !0 },
  Peak: { bg: "rgba(202,161,74,0.14)", text: "#92400E", dot: "#d4af37", border: "rgba(202,161,74,0.35)", icon: es, fantasyInflection: !0 },
  Injury: { bg: "rgba(229,57,53,0.10)", text: "#C62828", dot: "#ef4444", border: "rgba(229,57,53,0.30)", icon: ng, fantasyInflection: !0 },
  "Role change": { bg: "rgba(156,39,176,0.10)", text: "#7B1FA2", dot: "#a855f7", border: "rgba(156,39,176,0.30)", icon: Do, fantasyInflection: !0 },
  "New team": { bg: "rgba(255,152,0,0.10)", text: "#E65100", dot: "#f97316", border: "rgba(255,152,0,0.30)", icon: Do, fantasyInflection: !0 },
  "Sustained peak": { bg: "rgba(202,161,74,0.14)", text: "#92400E", dot: "#d4af37", border: "rgba(202,161,74,0.35)", icon: es, fantasyInflection: !1 },
  Current: { bg: "rgba(99,102,241,0.08)", text: "#4f46e5", dot: "#6366f1", border: "rgba(99,102,241,0.20)", icon: Ho, fantasyInflection: !1 }
}, d_ = {
  "Floor driver": sg,
  "Ceiling driver": es,
  Stability: Lb,
  "Risk note": ng
};
function f_({ player: n }) {
  const r = n.bio ?? null, [a, i] = y.useState(!1);
  if (!r)
    return /* @__PURE__ */ s.jsxs("div", { className: "sc-bio-empty", "data-testid": "bio-empty", children: [
      /* @__PURE__ */ s.jsx(fu, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Bio data not available for this player." })
    ] });
  const c = r.career_context_tiles?.find((m) => m.title === "Ceiling driver"), d = r.career_context_tiles?.find((m) => m.title === "Floor driver"), p = r.career_context_tiles?.filter((m) => m.title !== "Ceiling driver" && m.title !== "Floor driver") ?? [], f = r.style ? [
    {
      id: "on-field",
      label: "On-field style",
      icon: es,
      iconColor: "#6366f1",
      text: r.style.how_he_wins,
      tags: r.style.how_he_wins_tags,
      tagClass: "sc-bio__tag",
      testId: "bio-how-he-wins"
    },
    {
      id: "fantasy-translation",
      label: "Fantasy translation",
      icon: $s,
      iconColor: "#d4af37",
      text: r.style.fantasy_translation,
      tags: r.style.fantasy_translation_tags,
      tagClass: "sc-bio__tag sc-bio__tag--gold",
      testId: "bio-fantasy-impact"
    },
    {
      id: "best-case",
      label: "Best-case weekly outcome",
      icon: kr,
      iconColor: "#22c55e",
      text: r.style.best_case ?? (c ? c.text : null),
      tags: [],
      tagClass: "sc-bio__tag",
      testId: "bio-best-case"
    },
    {
      id: "floor-driver",
      label: "Floor driver",
      icon: sg,
      iconColor: "#64748b",
      text: r.style.floor_driver ?? (d ? d.text : null),
      tags: [],
      tagClass: "sc-bio__tag",
      testId: "bio-floor-driver"
    }
  ].filter((m) => m.text) : [];
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-bio", "data-testid": "bio-tab", children: [
    r.snapshot_bullets && r.snapshot_bullets.length > 0 && /* @__PURE__ */ s.jsxs("section", { className: "sc-bio__section", "data-testid": "bio-snapshot", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__section-header", children: [
        /* @__PURE__ */ s.jsx(Bi, { className: "w-4 h-4" }),
        /* @__PURE__ */ s.jsx("h3", { children: "Career Snapshot" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "sc-bio__snapshot-card", children: /* @__PURE__ */ s.jsx("ul", { className: "sc-bio__bullets", children: r.snapshot_bullets.map((m, v) => /* @__PURE__ */ s.jsxs("li", { "data-testid": `bio-bullet-${v}`, children: [
        /* @__PURE__ */ s.jsx("span", { className: "sc-bio__bullet-dot" }),
        m
      ] }, v)) }) })
    ] }),
    f.length > 0 && /* @__PURE__ */ s.jsxs("section", { className: "sc-bio__section", "data-testid": "bio-style", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__section-header", children: [
        /* @__PURE__ */ s.jsx(es, { className: "w-4 h-4" }),
        /* @__PURE__ */ s.jsx("h3", { children: "Play Style and Fantasy Translation" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }, children: f.map((m) => {
        const v = m.icon;
        return /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: "sc-bio__style-card",
            style: { display: "flex", flexDirection: "column", gap: "10px" },
            "data-testid": m.testId,
            children: [
              /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "7px" }, children: [
                /* @__PURE__ */ s.jsx(v, { className: "w-3.5 h-3.5", style: { color: m.iconColor, flexShrink: 0 } }),
                /* @__PURE__ */ s.jsx("div", { className: "sc-bio__style-card-label", style: { marginBottom: 0 }, children: m.label })
              ] }),
              /* @__PURE__ */ s.jsx("p", { className: "sc-bio__style-card-text", children: m.text }),
              m.tags.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "sc-bio__tags", children: m.tags.map((g, x) => /* @__PURE__ */ s.jsx("span", { className: m.tagClass, "data-testid": `bio-tag-${m.id}-${x}`, children: g }, x)) })
            ]
          },
          m.id
        );
      }) })
    ] }),
    r.timeline && r.timeline.length > 0 && /* @__PURE__ */ s.jsxs("section", { className: "sc-bio__section", "data-testid": "bio-timeline", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__section-header", children: [
        /* @__PURE__ */ s.jsx($b, { className: "w-4 h-4" }),
        /* @__PURE__ */ s.jsx("h3", { children: "Fantasy Career Arc" })
      ] }),
      /* @__PURE__ */ s.jsx("p", { style: { fontSize: "12px", color: "#64748b", marginBottom: "20px" }, children: "Key inflection points that shaped this player's fantasy value." }),
      /* @__PURE__ */ s.jsx("div", { className: "sc-bio__timeline", children: r.timeline.map((m, v) => {
        const g = Ah[m.badge] || Ah.Current, x = g.icon, w = v === r.timeline.length - 1;
        return /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__timeline-entry", "data-testid": `bio-timeline-${v}`, style: { position: "relative" }, children: [
          /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__timeline-line", children: [
            /* @__PURE__ */ s.jsx(
              "div",
              {
                className: "sc-bio__timeline-dot",
                style: {
                  background: g.dot,
                  width: g.fantasyInflection ? "14px" : "10px",
                  height: g.fantasyInflection ? "14px" : "10px",
                  boxShadow: g.fantasyInflection ? `0 0 0 3px ${g.border}` : "none",
                  flexShrink: 0
                }
              }
            ),
            !w && /* @__PURE__ */ s.jsx("div", { className: "sc-bio__timeline-connector" })
          ] }),
          /* @__PURE__ */ s.jsxs(
            "div",
            {
              className: "sc-bio__timeline-content",
              style: {
                borderLeft: g.fantasyInflection ? `2px solid ${g.border}` : "2px solid transparent",
                paddingLeft: g.fantasyInflection ? "12px" : "0",
                background: g.fantasyInflection ? g.bg : "transparent",
                borderRadius: g.fantasyInflection ? "6px" : "0",
                padding: g.fantasyInflection ? "10px 12px" : "0 0 0 0",
                marginBottom: g.fantasyInflection ? "4px" : "0"
              },
              children: [
                /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__timeline-top", style: { marginBottom: "4px" }, children: [
                  /* @__PURE__ */ s.jsx("span", { className: "sc-bio__timeline-label", style: { fontSize: "13px", fontWeight: 700 }, children: m.label }),
                  /* @__PURE__ */ s.jsxs(
                    "span",
                    {
                      className: "sc-bio__timeline-badge",
                      style: { background: g.bg, color: g.text, display: "flex", alignItems: "center", gap: "4px" },
                      children: [
                        /* @__PURE__ */ s.jsx(x, { className: "w-3 h-3", style: { flexShrink: 0 } }),
                        m.badge
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ s.jsx("p", { className: "sc-bio__timeline-text", children: m.text }),
                m.fantasy_note && /* @__PURE__ */ s.jsx("p", { style: { fontSize: "11px", color: g.text, marginTop: "6px", fontStyle: "italic", opacity: 0.85 }, children: m.fantasy_note }),
                g.fantasyInflection && !m.fantasy_note && /* @__PURE__ */ s.jsx("p", { style: { fontSize: "10px", color: g.text, marginTop: "5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.7 }, children: "Fantasy inflection point" })
              ]
            }
          )
        ] }, v);
      }) })
    ] }),
    p.length > 0 && /* @__PURE__ */ s.jsxs("section", { className: "sc-bio__section", "data-testid": "bio-context", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__section-header", children: [
        /* @__PURE__ */ s.jsx(Ho, { className: "w-4 h-4" }),
        /* @__PURE__ */ s.jsx("h3", { children: "Fantasy Career Context" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "sc-bio__context-grid", children: p.map((m, v) => {
        const g = d_[m.title] || Qr;
        return /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__context-tile", "data-testid": `bio-context-${v}`, children: [
          /* @__PURE__ */ s.jsx("div", { className: "sc-bio__context-icon", children: /* @__PURE__ */ s.jsx(g, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("div", { className: "sc-bio__context-title", children: m.title }),
            /* @__PURE__ */ s.jsx("div", { className: "sc-bio__context-text", children: m.text })
          ] })
        ] }, v);
      }) })
    ] }),
    r.narrative_paragraphs && r.narrative_paragraphs.length > 0 && /* @__PURE__ */ s.jsxs("section", { className: "sc-bio__section", "data-testid": "bio-narrative", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__section-header", children: [
        /* @__PURE__ */ s.jsx(fu, { className: "w-4 h-4" }),
        /* @__PURE__ */ s.jsx("h3", { children: "Career Development Profile" })
      ] }),
      /* @__PURE__ */ s.jsx("p", { style: { fontSize: "12px", color: "#64748b", marginBottom: "16px" }, children: "How this player entered the league, developed their role, and built their current fantasy identity." }),
      /* @__PURE__ */ s.jsxs("div", { className: "sc-bio__narrative-card", children: [
        /* @__PURE__ */ s.jsx("div", { className: `sc-bio__narrative-text ${a ? "" : "sc-bio__narrative-text--collapsed"}`, children: r.narrative_paragraphs.map((m, v) => /* @__PURE__ */ s.jsx("p", { "data-testid": `bio-narrative-${v}`, children: m }, v)) }),
        r.narrative_paragraphs.length > 1 && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "sc-bio__narrative-toggle",
            onClick: () => i(!a),
            "data-testid": "bio-narrative-toggle",
            children: a ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx(tg, { className: "w-3.5 h-3.5" }),
              " Show less"
            ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx(Uu, { className: "w-3.5 h-3.5" }),
              " Read more"
            ] })
          }
        )
      ] })
    ] }),
    (r.last_updated || r.sources && r.sources.length > 0) && /* @__PURE__ */ s.jsxs("section", { className: "sc-bio__footer", "data-testid": "bio-footer", children: [
      r.last_updated && /* @__PURE__ */ s.jsxs("span", { className: "sc-bio__footer-date", children: [
        "Last updated: ",
        r.last_updated
      ] }),
      r.sources && r.sources.length > 0 && /* @__PURE__ */ s.jsx("div", { className: "sc-bio__footer-sources", children: r.sources.map((m, v) => /* @__PURE__ */ s.jsxs(
        "a",
        {
          href: m.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "sc-bio__footer-link",
          "data-testid": `bio-source-${v}`,
          children: [
            m.label,
            /* @__PURE__ */ s.jsx(pu, { className: "w-3 h-3" })
          ]
        },
        v
      )) })
    ] })
  ] });
}
function p_({ player: n }) {
  const r = n.team || "", a = u_[r] || null, i = !!a, c = Gu[r] || "#d4af37", [d, p] = y.useState("articles"), { data: f, isLoading: m, refetch: v, isFetching: g } = Zr({
    queryKey: ["/api/team/news", r, n.name],
    queryFn: async () => {
      const C = await fetch(`/api/team/news?team=${encodeURIComponent(r)}&player_name=${encodeURIComponent(n.name)}&limit=8`);
      if (!C.ok) throw new Error("Failed to load news");
      return C.json();
    },
    enabled: i,
    staleTime: 1800 * 1e3
  }), { data: x, isLoading: w } = Zr({
    queryKey: ["/api/team/injury", r, n.name],
    queryFn: async () => {
      const C = await fetch(`/api/team/injury?team=${encodeURIComponent(r)}&player_name=${encodeURIComponent(n.name)}`);
      if (!C.ok) throw new Error("Failed to load injury");
      return C.json();
    },
    enabled: i && d === "injuries",
    staleTime: 1800 * 1e3
  }), k = n.news || [], S = f?.items || [], j = S[0] || null, _ = S.slice(1), P = k.length > 0 || S.length > 0, T = f?.source || (a ? `${a}.com` : "");
  return /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "32px" }, "data-testid": "news-tab", children: [
    /* @__PURE__ */ s.jsxs("div", { children: [
      /* @__PURE__ */ s.jsx(ft, { title: "News & Analysis", subtitle: "Latest team reports, injury updates, and player intel" }),
      i && /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", gap: "0", marginTop: "16px" }, "data-testid": "news-filter-toggle", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `sc-news-tab ${d === "articles" ? "sc-news-tab--active" : ""}`,
            onClick: () => p("articles"),
            "data-testid": "button-filter-articles",
            children: "Articles"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: `sc-news-tab ${d === "injuries" ? "sc-news-tab--active" : ""}`,
            onClick: () => p("injuries"),
            "data-testid": "button-filter-injuries",
            children: "Injuries"
          }
        )
      ] })
    ] }),
    i && d === "injuries" && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      w && /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card", children: [
        /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-24 mb-3" }),
        /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-full mb-2" }),
        /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-4/5 mb-3" }),
        /* @__PURE__ */ s.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-16 rounded-full" }),
          /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-16 rounded-full" }),
          /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-16 rounded-full" })
        ] })
      ] }),
      x && !w && (() => {
        const C = (() => {
          const B = x.position || "";
          let G = x.injury || "";
          return G && !G.toLowerCase().includes("injury") && !G.toLowerCase().includes("illness") && !G.toLowerCase().includes("rest") && !G.toLowerCase().includes("personal") && (G = `${G} Injury`), B && G ? `${B} • ${G}` : B || G;
        })(), $ = (B) => B.replace(/\w\S*/g, (G) => G.charAt(0).toUpperCase() + G.slice(1).toLowerCase()), V = x.report_label ? `${$(x.report_label)} Injury Report` : "Injury Report", Z = (() => {
          const B = x.blurb || "", G = x.player_name || "";
          if (!G || !B.includes(G)) return [{ text: B, bold: !1 }];
          const M = B.indexOf(G), Y = [];
          return M > 0 && Y.push({ text: B.slice(0, M), bold: !1 }), Y.push({ text: G, bold: !0 }), M + G.length < B.length && Y.push({ text: B.slice(M + G.length), bold: !1 }), Y;
        })(), H = (B) => {
          const G = new Date(B);
          if (isNaN(G.getTime())) return "";
          const M = Math.floor((Date.now() - G.getTime()) / 1e3);
          return M < 60 ? "just now" : M < 3600 ? `${Math.floor(M / 60)}m ago` : M < 86400 ? `${Math.floor(M / 3600)}h ago` : `${Math.floor(M / 86400)}d ago`;
        }, L = (B) => {
          const G = new Date(B);
          return isNaN(G.getTime()) ? "" : G.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        }, re = x.report_updated_at ? `Report updated: ${L(x.report_updated_at)}` : null, I = x.fetched_at ? `Last checked: ${H(x.fetched_at)}` : null, K = x.practice && (x.practice.wed || x.practice.thu || x.practice.fri);
        return /* @__PURE__ */ s.jsx("div", { className: `sc-injury-card ${x.found ? "" : "sc-injury-card--empty"}`, "data-testid": "injury-card", children: x.found ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__top", children: [
            /* @__PURE__ */ s.jsxs("div", { children: [
              /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__title", "data-testid": "text-injury-title", children: [
                /* @__PURE__ */ s.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", verticalAlign: "-2px", marginRight: "5px" }, children: /* @__PURE__ */ s.jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }),
                V
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "sc-injury-card__meta", "data-testid": "text-injury-meta", children: C })
            ] }),
            /* @__PURE__ */ s.jsx("div", { className: `sc-injury-pill ${c_(x.game_status || "")}`, "data-testid": "badge-injury-status", children: (() => {
              const B = (x.game_status || "").toUpperCase().trim();
              return B && B !== "(-)" && B !== "-" ? B : "No designation";
            })() })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "sc-injury-card__blurb", "data-testid": "text-injury-blurb", children: Z.map((B, G) => B.bold ? /* @__PURE__ */ s.jsx("strong", { children: B.text }, G) : /* @__PURE__ */ s.jsx("span", { children: B.text }, G)) }),
          K && /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__bot", children: [
            x.practice?.wed && /* @__PURE__ */ s.jsxs("span", { className: `sc-injury-chip ${Kc(x.practice.wed)}`, "data-testid": "chip-practice-wed", children: [
              "WED: ",
              x.practice.wed
            ] }),
            x.practice?.thu && /* @__PURE__ */ s.jsxs("span", { className: `sc-injury-chip ${Kc(x.practice.thu)}`, "data-testid": "chip-practice-thu", children: [
              "THU: ",
              x.practice.thu
            ] }),
            x.practice?.fri && /* @__PURE__ */ s.jsxs("span", { className: `sc-injury-chip ${Kc(x.practice.fri)}`, "data-testid": "chip-practice-fri", children: [
              "FRI: ",
              x.practice.fri
            ] })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__footer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__timestamps", children: [
              re && /* @__PURE__ */ s.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-report-date", children: re }),
              I && /* @__PURE__ */ s.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-checked", children: I })
            ] }),
            x.source_url && /* @__PURE__ */ s.jsx("a", { className: "sc-injury-card__link", href: x.source_url, target: "_blank", rel: "noopener noreferrer", "data-testid": "link-injury-source", children: "View Full Injury Report →" })
          ] })
        ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__top", children: [
            /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__title", children: [
              /* @__PURE__ */ s.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", verticalAlign: "-2px", marginRight: "5px" }, children: /* @__PURE__ */ s.jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }),
              V
            ] }) }),
            /* @__PURE__ */ s.jsx("div", { className: "sc-injury-pill sc-injury-pill--none", "data-testid": "badge-injury-status", children: "Not Listed" })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "sc-injury-card__blurb", "data-testid": "text-injury-blurb", children: "No injury designation listed on the latest report." }),
          /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__footer", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "sc-injury-card__timestamps", children: [
              re && /* @__PURE__ */ s.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-report-date", children: re }),
              I && /* @__PURE__ */ s.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-checked", children: I })
            ] }),
            x.source_url && /* @__PURE__ */ s.jsx("a", { className: "sc-injury-card__link", href: x.source_url, target: "_blank", rel: "noopener noreferrer", "data-testid": "link-injury-source", children: "View Full Injury Report →" })
          ] })
        ] }) });
      })()
    ] }),
    i && d !== "articles" ? null : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      i && m && /* @__PURE__ */ s.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sc-player-news", style: { "--team-accent": c }, children: [
          /* @__PURE__ */ s.jsx("div", { style: { height: 4, borderRadius: "6px 6px 0 0", background: `linear-gradient(90deg, ${c}, ${c}88)`, margin: "-24px -24px 20px -24px" } }),
          /* @__PURE__ */ s.jsxs("div", { className: "sc-player-news__header", children: [
            /* @__PURE__ */ s.jsx(Ve, { className: "w-14 h-14 rounded-full flex-shrink-0" }),
            /* @__PURE__ */ s.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-40 mb-2" }),
              /* @__PURE__ */ s.jsx(Ve, { className: "h-3.5 w-28" })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-20 mb-3" }),
          /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-full mb-1.5" }),
          /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-4/5 mb-4" }),
          /* @__PURE__ */ s.jsxs("div", { className: "flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800", children: [
            /* @__PURE__ */ s.jsx(Ve, { className: "h-3.5 w-32" }),
            /* @__PURE__ */ s.jsx(Ve, { className: "h-3.5 w-24" })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews", children: /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__list", children: [1, 2].map((C) => /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__card", style: { pointerEvents: "none" }, children: [
          /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__card-left", children: /* @__PURE__ */ s.jsx(Ve, { className: "w-[34px] h-[34px] rounded-xl" }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__card-mid", children: [
            /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-16 mb-2" }),
            /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-full" })
          ] })
        ] }, C)) }) })
      ] }),
      j && /* @__PURE__ */ s.jsx(l_, { item: j, player: n, teamColor: c, sourceName: T }),
      _.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews", "data-testid": "team-news-list", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__head", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__head-left", children: [
            /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📰" }),
            /* @__PURE__ */ s.jsxs("div", { children: [
              /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__kicker", children: [
                "Latest from ",
                T
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__sub", children: [
                S.length,
                " updates"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsxs(
            "button",
            {
              className: "sc-teamnews__btn",
              type: "button",
              onClick: () => v(),
              disabled: g,
              "data-testid": "button-refresh-news",
              children: [
                /* @__PURE__ */ s.jsx(Ib, { className: `w-3.5 h-3.5 ${g ? "animate-spin" : ""}` }),
                "Refresh"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__list", children: _.map((C, $) => /* @__PURE__ */ s.jsxs(
          "a",
          {
            className: "sc-teamnews__card",
            href: C.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-testid": `link-team-news-${$}`,
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__card-left", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__doc", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("path", { fill: "currentColor", d: "M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" }) }) }) }),
              /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__card-mid", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__meta", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "sc-pill sc-pill--type", "data-testid": `badge-news-type-${$}`, children: (C.type || "news").toUpperCase() }),
                  /* @__PURE__ */ s.jsx("span", { className: "sc-teamnews__source", children: T }),
                  C.impact && /* @__PURE__ */ s.jsx("span", { className: `sc-pill sc-pill--impact sc-pill--impact-${C.impact.toLowerCase()}`, children: C.impact }),
                  C.tag && /* @__PURE__ */ s.jsx("span", { className: "sc-pill sc-pill--tag", children: C.tag })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__title", children: C.title }),
                C.ai_blurb && /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__blurb", children: C.ai_blurb })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__card-right", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) }) })
            ]
          },
          $
        )) }),
        f?.team_profile_url && /* @__PURE__ */ s.jsx("div", { style: { padding: "0 14px 12px" }, children: /* @__PURE__ */ s.jsxs(
          "a",
          {
            href: f.team_profile_url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "sc-teamnews__profile-link",
            "data-testid": "link-team-profile",
            children: [
              "View full profile on ",
              T,
              /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", width: "12", height: "12", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) })
            ]
          }
        ) })
      ] }),
      S.length === 1 && f?.team_profile_url && /* @__PURE__ */ s.jsx("div", { style: { marginTop: -8 }, children: /* @__PURE__ */ s.jsxs(
        "a",
        {
          href: f.team_profile_url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "sc-teamnews__profile-link",
          "data-testid": "link-team-profile-single",
          children: [
            "View full profile on ",
            T,
            /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", width: "12", height: "12", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) })
          ]
        }
      ) }),
      k.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews", "data-testid": "news-list", children: [
        /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__head", children: /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__head-left", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📄" }),
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__kicker", children: "Articles" }),
            /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__sub", children: [
              k.length,
              " ",
              k.length === 1 ? "article" : "articles"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__list", children: k.map((C, $) => /* @__PURE__ */ s.jsxs(
          "a",
          {
            className: "sc-teamnews__card",
            href: C.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-testid": `link-news-${$}`,
            children: [
              /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__card-left", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__doc", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("path", { fill: "currentColor", d: "M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" }) }) }) }),
              /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__card-mid", children: [
                /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__meta", children: [
                  /* @__PURE__ */ s.jsx("span", { className: "sc-pill sc-pill--type", children: "NEWS" }),
                  /* @__PURE__ */ s.jsx("span", { className: "sc-teamnews__source", children: C.source }),
                  C.publishedAt && /* @__PURE__ */ s.jsx("span", { className: "sc-teamnews__date", children: new Date(C.publishedAt).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
                ] }),
                /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__title", children: C.title }),
                C.summary && /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__blurb", children: C.summary })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__card-right", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) }) })
            ]
          },
          $
        )) })
      ] }),
      !P && !m && /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews", children: [
        /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__head", children: /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__head-left", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📰" }),
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__kicker", children: "News & Analysis" }),
            /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__sub", children: "No updates found" })
          ] })
        ] }) }),
        /* @__PURE__ */ s.jsx("div", { className: "sc-teamnews__list", children: /* @__PURE__ */ s.jsxs("div", { className: "sc-teamnews__empty", children: [
          "No recent items available for ",
          n.name,
          ". Check back soon for updates."
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ s.jsx(qr, { href: "/articles/", children: /* @__PURE__ */ s.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 24px", cursor: "pointer", height: "100%" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ s.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ s.jsx(Bi, { className: "w-4 h-4", style: { color: "#0b3a7a" } }) }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "Browse Articles" }),
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Expert analysis and insights" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ s.jsx(qr, { href: "/nfl/players", children: /* @__PURE__ */ s.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 24px", cursor: "pointer", height: "100%" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ s.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ s.jsx(Ro, { className: "w-4 h-4", style: { color: "#0b3a7a" } }) }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "Search Players" }),
          /* @__PURE__ */ s.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Find and compare players" })
        ] })
      ] }) }) })
    ] })
  ] });
}
function h_() {
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "bg-slate-50 dark:bg-[#0B1634] border-b-2 border-slate-200 dark:border-slate-700", children: /* @__PURE__ */ s.jsx("div", { className: "max-w-7xl mx-auto px-4 py-10", children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-6 flex-wrap", children: [
      /* @__PURE__ */ s.jsx(Ve, { className: "w-24 h-24 md:w-28 md:h-28 rounded-full" }),
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-16 mb-2" }),
        /* @__PURE__ */ s.jsx(Ve, { className: "h-9 w-56 mb-3" }),
        /* @__PURE__ */ s.jsx(Ve, { className: "h-[2px] w-20 mb-4" }),
        /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-40" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ s.jsx("div", { className: "flex gap-2 mb-6 flex-wrap", children: Array.from({ length: 5 }).map((n, r) => /* @__PURE__ */ s.jsx(Ve, { className: "h-9 w-24 rounded-md" }, r)) }),
      /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: Array.from({ length: 4 }).map((n, r) => /* @__PURE__ */ s.jsx(Ve, { className: "h-20 rounded-md" }, r)) }),
      /* @__PURE__ */ s.jsx(Ve, { className: "h-40 rounded-md" })
    ] })
  ] });
}
function m_({ format: n, onChange: r }) {
  const a = ["standard", "half", "ppr"];
  return /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2", "data-testid": "scoring-format-toggle", children: [
    /* @__PURE__ */ s.jsx("span", { style: { fontSize: "11px", color: "#94a3b8", fontWeight: 500 }, className: "hidden sm:inline", children: "Scoring:" }),
    /* @__PURE__ */ s.jsx("div", { className: "sc-gamelog__segmented-control", children: a.map((i) => /* @__PURE__ */ s.jsx(
      "button",
      {
        onClick: () => r(i),
        className: `sc-gamelog__segment ${n === i ? "sc-gamelog__segment--active" : ""}`,
        "data-testid": `button-format-${i}`,
        children: Hb[i]
      },
      i
    )) })
  ] });
}
function Fh() {
  const r = tm().slug, [a, i] = y.useState("overview"), [c, d] = y.useState("ppr"), { data: p, isLoading: f, error: m } = Zr({
    queryKey: ["/api/players", r, { format: c }],
    queryFn: () => fetch(`/api/players/${r}?format=${c}`).then((L) => L.json())
  }), { data: v } = Zr({
    queryKey: ["/api/players", r, "related", { format: c }],
    queryFn: () => fetch(`/api/players/${r}/related?format=${c}`).then((L) => L.json()),
    enabled: !!p
  });
  if (y.useEffect(() => {
    i("overview");
  }, [r]), y.useEffect(() => {
    if (!p) return;
    document.title = `${p.name} Fantasy Football Stats, Rankings & Analysis | StatChasers`;
    const L = `View ${p.name} fantasy football stats, trends, rankings, projections, and analysis. Updated for ${p.season} NFL season.`, re = `https://statchasers.com/nfl/players/${p.slug}/`;
    let I = document.querySelector('meta[name="description"]');
    I || (I = document.createElement("meta"), I.setAttribute("name", "description"), document.head.appendChild(I)), I.setAttribute("content", L);
    let K = document.querySelector('link[rel="canonical"]');
    K || (K = document.createElement("link"), K.setAttribute("rel", "canonical"), document.head.appendChild(K)), K.setAttribute("href", re);
    const B = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: p.name,
      sport: "American Football",
      url: re
    };
    p.team && p.team !== "FA" && (B.affiliation = { "@type": "SportsTeam", name: p.team });
    let G = document.getElementById("sc-jsonld");
    return G || (G = document.createElement("script"), G.id = "sc-jsonld", G.setAttribute("type", "application/ld+json"), document.head.appendChild(G)), G.textContent = JSON.stringify(B), () => {
      document.title = "StatChasers", I?.setAttribute("content", ""), K?.setAttribute("href", ""), G?.remove();
    };
  }, [p]), f)
    return /* @__PURE__ */ s.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ s.jsx(h_, {}) });
  if (m || !p)
    return /* @__PURE__ */ s.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ s.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ s.jsx(Kr, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ s.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2", "data-testid": "text-not-found", children: "Player Not Found" }),
      /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground mb-6", children: "We couldn't find a player with that profile. They may not be in our database." }),
      /* @__PURE__ */ s.jsx(qr, { href: "/nfl/players", children: /* @__PURE__ */ s.jsxs(Ci, { "data-testid": "button-search-again", children: [
        /* @__PURE__ */ s.jsx(Ro, { className: "w-4 h-4 mr-2" }),
        "Search Players"
      ] }) })
    ] }) });
  const g = p.team && Gu[p.team] || "#6B7280", x = p.team ? ag[p.team] || p.team : "Free Agent", w = p.position ? Ub[p.position] || p.position : "", k = p, S = p.gameLog || [], j = p.name.trim().split(/\s+/), _ = j.slice(0, -1).join(" ").toUpperCase(), P = j.slice(-1)[0].toUpperCase(), T = qu(S, p.position, c), C = T && T.gamesPlayed > 0 ? T.ppg : null, $ = T ? T.gamesPlayed : 0, V = T ? T.pos1Pct + T.pos2Pct : 0, Z = T ? T.bustPct : 0, H = p.position || "";
  return /* @__PURE__ */ s.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ s.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        "data-testid": "section-player-header",
        children: [
          /* @__PURE__ */ s.jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(135deg, rgba(11,58,122,0.05) 0%, rgba(255,255,255,0) 60%)" } }),
          /* @__PURE__ */ s.jsx("div", { className: "absolute inset-0 hidden dark:block", style: { background: "linear-gradient(135deg, #0B1634 0%, #111D42 40%, #0F172A 100%)" } }),
          /* @__PURE__ */ s.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[3px]", style: { background: `linear-gradient(90deg, transparent 0%, ${g}88 20%, ${g} 50%, ${g}88 80%, transparent 100%)` } }),
          /* @__PURE__ */ s.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 pt-5 pb-6", children: [
            /* @__PURE__ */ s.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ s.jsx(qr, { href: "/nfl/players", children: /* @__PURE__ */ s.jsxs(Ci, { variant: "ghost", size: "sm", className: "-ml-1 text-slate-600 dark:text-slate-300", "data-testid": "button-back", children: [
              /* @__PURE__ */ s.jsx(eg, { className: "w-4 h-4 mr-1" }),
              "All Players"
            ] }) }) }),
            /* @__PURE__ */ s.jsxs("div", { className: "flex flex-col md:flex-row md:items-stretch gap-0", children: [
              /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-4 pb-4 md:pb-0 md:pr-5 md:border-r border-slate-200 dark:border-slate-700 flex-shrink-0", children: [
                /* @__PURE__ */ s.jsx(Mk, { playerId: p.id, name: p.name, teamColor: g, team: p.team || void 0 }),
                /* @__PURE__ */ s.jsxs("div", { children: [
                  /* @__PURE__ */ s.jsx("p", { className: "text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase leading-none mb-0.5", children: _ }),
                  /* @__PURE__ */ s.jsx(
                    "h1",
                    {
                      className: "font-black uppercase leading-none tracking-tight",
                      style: { fontSize: "clamp(28px, 5vw, 44px)", color: g, letterSpacing: "-0.01em" },
                      "data-testid": "text-player-name",
                      children: P
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5 flex-wrap", "data-testid": "text-team", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "text-xs font-semibold text-slate-600 dark:text-slate-300", children: x }),
                    p.number && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
                      /* @__PURE__ */ s.jsx("span", { className: "text-slate-300 dark:text-slate-600 text-xs", children: "·" }),
                      /* @__PURE__ */ s.jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [
                        "#",
                        p.number
                      ] })
                    ] }),
                    /* @__PURE__ */ s.jsx("span", { className: "text-slate-300 dark:text-slate-600 text-xs", children: "·" }),
                    /* @__PURE__ */ s.jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: w })
                  ] }),
                  /* @__PURE__ */ s.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1.5 whitespace-nowrap", "data-testid": "text-player-meta", children: [
                    p.age ? `Age ${p.age}` : null,
                    p.height ? Ak(p.height) : null,
                    p.weight ? `${p.weight} lbs` : null,
                    p.years_exp != null ? `Exp ${p.years_exp} yr${p.years_exp !== 1 ? "s" : ""}` : null
                  ].filter(Boolean).join("  |  ") }),
                  /* @__PURE__ */ s.jsx("div", { className: "flex items-center gap-1.5 mt-1", "data-testid": "text-player-status", children: p.injury_status ? /* @__PURE__ */ s.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" }),
                    p.injury_status
                  ] }) : /* @__PURE__ */ s.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400", children: [
                    /* @__PURE__ */ s.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" }),
                    p.status || "Active"
                  ] }) }),
                  /* @__PURE__ */ s.jsx("div", { className: "mt-2 h-[2px] w-10 rounded-full", style: { background: g } })
                ] })
              ] }),
              C !== null && /* @__PURE__ */ s.jsxs("div", { className: "w-full md:w-auto md:flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 md:self-center mt-0 md:mt-0", children: [
                /* @__PURE__ */ s.jsx("div", { className: "px-3 py-1.5 text-white text-[10px] font-bold tracking-widest uppercase", style: { background: g }, children: "2025 Fantasy Season" }),
                /* @__PURE__ */ s.jsxs("div", { className: "grid grid-cols-2 divide-x divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-900", children: [
                  /* @__PURE__ */ s.jsxs("div", { className: "px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ s.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: "PPG" }),
                    /* @__PURE__ */ s.jsx("p", { className: "text-xl font-black text-slate-800 dark:text-white leading-tight", children: C.toFixed(1) }),
                    k.seasonRank && /* @__PURE__ */ s.jsxs("p", { className: "text-[9px] text-slate-400 dark:text-slate-500 font-semibold", children: [
                      H,
                      k.seasonRank
                    ] })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ s.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: "Games" }),
                    /* @__PURE__ */ s.jsx("p", { className: "text-xl font-black text-slate-800 dark:text-white leading-tight", children: $ }),
                    /* @__PURE__ */ s.jsx("p", { className: "text-[9px] text-slate-400 dark:text-slate-500 font-semibold", children: "played" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ s.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: "Starter%" }),
                    /* @__PURE__ */ s.jsxs("p", { className: "text-xl font-black text-slate-800 dark:text-white leading-tight", children: [
                      V.toFixed(0),
                      "%"
                    ] }),
                    /* @__PURE__ */ s.jsx("p", { className: "text-[9px] text-slate-400 dark:text-slate-500 font-semibold", children: "of weeks" })
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { className: "px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ s.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: "Bust%" }),
                    /* @__PURE__ */ s.jsxs("p", { className: "text-xl font-black text-slate-800 dark:text-white leading-tight", children: [
                      Z.toFixed(0),
                      "%"
                    ] }),
                    /* @__PURE__ */ s.jsx("p", { className: "text-[9px] text-slate-400 dark:text-slate-500 font-semibold", children: "of weeks" })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s.jsx("div", { className: "sticky top-[53px] z-40 border-b", style: { background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", borderColor: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ s.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ s.jsx(
        "nav",
        {
          className: "flex gap-0.5 overflow-x-auto -mb-px scrollbar-hide",
          style: { WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" },
          "data-testid": "profile-tabs",
          children: Fk.map((L) => {
            const re = a === L.key, I = L.icon, K = L.key === "gamelog" ? "Log" : L.key === "rankings" ? "Value" : L.label.split(" ")[0];
            return /* @__PURE__ */ s.jsxs(
              "button",
              {
                onClick: () => i(L.key),
                className: "sc-profile-tab relative flex items-center justify-center whitespace-nowrap",
                style: {
                  fontWeight: re ? 700 : 500,
                  color: re ? "#0b3a7a" : "#94a3b8",
                  transition: "color 0.2s ease, transform 0.15s ease",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  flex: "1 1 0"
                },
                onMouseEnter: (B) => {
                  re || (B.currentTarget.style.color = "#0b3a7a");
                },
                onMouseLeave: (B) => {
                  re || (B.currentTarget.style.color = "#94a3b8");
                },
                "data-testid": `tab-${L.key}`,
                children: [
                  /* @__PURE__ */ s.jsx(I, { className: "w-4 h-4 hidden sm:block", style: { color: re ? "#d4af37" : "inherit" } }),
                  /* @__PURE__ */ s.jsx("span", { className: "hidden sm:inline", children: L.label }),
                  /* @__PURE__ */ s.jsx("span", { className: "sm:hidden", children: K }),
                  /* @__PURE__ */ s.jsx(
                    "span",
                    {
                      className: "absolute bottom-0 left-1 right-1 sm:left-2 sm:right-2 rounded-full",
                      style: {
                        height: re ? "3px" : "0px",
                        background: "linear-gradient(90deg, #d4af37, #e5c95c, #d4af37)",
                        opacity: re ? 1 : 0,
                        transform: re ? "scaleX(1)" : "scaleX(0.3)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      }
                    }
                  )
                ]
              },
              L.key
            );
          })
        }
      ),
      /* @__PURE__ */ s.jsx("div", { className: "py-2 border-t border-slate-100 dark:border-slate-800 flex justify-center sm:justify-start", children: /* @__PURE__ */ s.jsx(m_, { format: c, onChange: d }) })
    ] }) }),
    /* @__PURE__ */ s.jsxs("main", { className: "max-w-7xl mx-auto px-4 py-6", children: [
      p.injury_status && /* @__PURE__ */ s.jsx("div", { className: "sc-card", style: { padding: "16px 24px", marginBottom: "24px", borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)" }, children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ s.jsx(Kr, { className: "w-5 h-5 text-destructive flex-shrink-0" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsxs("p", { className: "font-medium text-foreground text-sm", children: [
            "Injury Status: ",
            p.injury_status
          ] }),
          /* @__PURE__ */ s.jsx("p", { className: "text-sm text-muted-foreground", children: "This player is currently listed with an injury designation." })
        ] })
      ] }) }),
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: "animate-in fade-in duration-300",
          style: { animation: "fadeSlideIn 0.3s ease-out" },
          children: [
            a === "overview" && /* @__PURE__ */ s.jsx(Xk, { player: k, entries: S, format: c }),
            a === "bio" && /* @__PURE__ */ s.jsx(f_, { player: p }),
            a === "gamelog" && /* @__PURE__ */ s.jsx(Jk, { player: k, format: c }),
            a === "usage" && /* @__PURE__ */ s.jsx(a_, { player: k, entries: S, format: c }),
            a === "rankings" && /* @__PURE__ */ s.jsx(i_, { player: p }),
            a === "news" && /* @__PURE__ */ s.jsx(p_, { player: p })
          ]
        },
        a
      ),
      v && v.neighbors && v.neighbors.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
          /* @__PURE__ */ s.jsx(Bb, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ s.jsxs("h2", { className: "text-lg font-semibold text-foreground", "data-testid": "text-related-heading", children: [
            "Rank Neighbors (",
            p.position,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("p", { className: "text-xs text-muted-foreground mb-4", "data-testid": "text-related-subtitle", children: [
          "Based on ",
          v.season,
          " ",
          v.format.toUpperCase(),
          " season rank · Showing ",
          p.position,
          Math.min(...v.neighbors.map((L) => L.posRank)),
          "–",
          p.position,
          Math.max(...v.neighbors.map((L) => L.posRank))
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: v.neighbors.map((L) => /* @__PURE__ */ s.jsx(qr, { href: `/nfl/players/${L.slug}/`, children: /* @__PURE__ */ s.jsx("div", { className: "sc-card hover-elevate", style: { padding: "12px 16px", cursor: "pointer", height: "100%" }, "data-testid": `card-related-${L.slug}`, children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ s.jsx($k, { playerId: L.id, name: L.name, teamAbbr: L.team }),
          /* @__PURE__ */ s.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ s.jsx("p", { style: { fontWeight: 600, fontSize: "14px", color: "#0b3a7a" }, className: "truncate", children: L.name }),
            /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 flex-wrap", children: [
              /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "10px", fontWeight: 700, color: "#1a4fa0" }, children: [
                L.position,
                L.posRank
              ] }),
              /* @__PURE__ */ s.jsx("span", { style: { fontSize: "12px", color: "#94a3b8" }, children: "·" }),
              /* @__PURE__ */ s.jsx("span", { style: { fontSize: "12px", color: "#94a3b8" }, children: L.team })
            ] })
          ] })
        ] }) }) }, L.id)) })
      ] })
    ] })
  ] });
}
const xi = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: a,
    className: mt(
      "shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm",
      n
    ),
    ...r
  }
));
xi.displayName = "Card";
const g_ = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: a,
    className: mt("flex flex-col space-y-1.5 p-6", n),
    ...r
  }
));
g_.displayName = "CardHeader";
const x_ = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: a,
    className: mt(
      "text-2xl font-semibold leading-none tracking-tight",
      n
    ),
    ...r
  }
));
x_.displayName = "CardTitle";
const v_ = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: a,
    className: mt("text-sm text-muted-foreground", n),
    ...r
  }
));
v_.displayName = "CardDescription";
const vi = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx("div", { ref: a, className: mt("p-6 pt-0", n), ...r }));
vi.displayName = "CardContent";
const y_ = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  "div",
  {
    ref: a,
    className: mt("flex items-center p-6 pt-0", n),
    ...r
  }
));
y_.displayName = "CardFooter";
const bu = y.forwardRef(
  ({ className: n, type: r, ...a }, i) => /* @__PURE__ */ s.jsx(
    "input",
    {
      type: r,
      className: mt(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        n
      ),
      ref: i,
      ...a
    }
  )
);
bu.displayName = "Input";
var Yc = "rovingFocusGroup.onEntryFocus", w_ = { bubbles: !1, cancelable: !0 }, Vo = "RovingFocusGroup", [ju, ix, b_] = ig(Vo), [j_, lx] = Ls(
  Vo,
  [b_]
), [k_, __] = j_(Vo), cx = y.forwardRef(
  (n, r) => /* @__PURE__ */ s.jsx(ju.Provider, { scope: n.__scopeRovingFocusGroup, children: /* @__PURE__ */ s.jsx(ju.Slot, { scope: n.__scopeRovingFocusGroup, children: /* @__PURE__ */ s.jsx(S_, { ...n, ref: r }) }) })
);
cx.displayName = Vo;
var S_ = y.forwardRef((n, r) => {
  const {
    __scopeRovingFocusGroup: a,
    orientation: i,
    loop: c = !1,
    dir: d,
    currentTabStopId: p,
    defaultCurrentTabStopId: f,
    onCurrentTabStopIdChange: m,
    onEntryFocus: v,
    preventScrollOnEntryFocus: g = !1,
    ...x
  } = n, w = y.useRef(null), k = yt(r, w), S = Qu(d), [j, _] = $o({
    prop: p,
    defaultProp: f ?? null,
    onChange: m,
    caller: Vo
  }), [P, T] = y.useState(!1), C = Sr(v), $ = ix(a), V = y.useRef(!1), [Z, H] = y.useState(0);
  return y.useEffect(() => {
    const L = w.current;
    if (L)
      return L.addEventListener(Yc, C), () => L.removeEventListener(Yc, C);
  }, [C]), /* @__PURE__ */ s.jsx(
    k_,
    {
      scope: a,
      orientation: i,
      dir: S,
      loop: c,
      currentTabStopId: j,
      onItemFocus: y.useCallback(
        (L) => _(L),
        [_]
      ),
      onItemShiftTab: y.useCallback(() => T(!0), []),
      onFocusableItemAdd: y.useCallback(
        () => H((L) => L + 1),
        []
      ),
      onFocusableItemRemove: y.useCallback(
        () => H((L) => L - 1),
        []
      ),
      children: /* @__PURE__ */ s.jsx(
        et.div,
        {
          tabIndex: P || Z === 0 ? -1 : 0,
          "data-orientation": i,
          ...x,
          ref: k,
          style: { outline: "none", ...n.style },
          onMouseDown: Ue(n.onMouseDown, () => {
            V.current = !0;
          }),
          onFocus: Ue(n.onFocus, (L) => {
            const re = !V.current;
            if (L.target === L.currentTarget && re && !P) {
              const I = new CustomEvent(Yc, w_);
              if (L.currentTarget.dispatchEvent(I), !I.defaultPrevented) {
                const K = $().filter((X) => X.focusable), B = K.find((X) => X.active), G = K.find((X) => X.id === j), Y = [B, G, ...K].filter(
                  Boolean
                ).map((X) => X.ref.current);
                fx(Y, g);
              }
            }
            V.current = !1;
          }),
          onBlur: Ue(n.onBlur, () => T(!1))
        }
      )
    }
  );
}), ux = "RovingFocusGroupItem", dx = y.forwardRef(
  (n, r) => {
    const {
      __scopeRovingFocusGroup: a,
      focusable: i = !0,
      active: c = !1,
      tabStopId: d,
      children: p,
      ...f
    } = n, m = Ds(), v = d || m, g = __(ux, a), x = g.currentTabStopId === v, w = ix(a), { onFocusableItemAdd: k, onFocusableItemRemove: S, currentTabStopId: j } = g;
    return y.useEffect(() => {
      if (i)
        return k(), () => S();
    }, [i, k, S]), /* @__PURE__ */ s.jsx(
      ju.ItemSlot,
      {
        scope: a,
        id: v,
        focusable: i,
        active: c,
        children: /* @__PURE__ */ s.jsx(
          et.span,
          {
            tabIndex: x ? 0 : -1,
            "data-orientation": g.orientation,
            ...f,
            ref: r,
            onMouseDown: Ue(n.onMouseDown, (_) => {
              i ? g.onItemFocus(v) : _.preventDefault();
            }),
            onFocus: Ue(n.onFocus, () => g.onItemFocus(v)),
            onKeyDown: Ue(n.onKeyDown, (_) => {
              if (_.key === "Tab" && _.shiftKey) {
                g.onItemShiftTab();
                return;
              }
              if (_.target !== _.currentTarget) return;
              const P = P_(_, g.orientation, g.dir);
              if (P !== void 0) {
                if (_.metaKey || _.ctrlKey || _.altKey || _.shiftKey) return;
                _.preventDefault();
                let C = w().filter(($) => $.focusable).map(($) => $.ref.current);
                if (P === "last") C.reverse();
                else if (P === "prev" || P === "next") {
                  P === "prev" && C.reverse();
                  const $ = C.indexOf(_.currentTarget);
                  C = g.loop ? E_(C, $ + 1) : C.slice($ + 1);
                }
                setTimeout(() => fx(C));
              }
            }),
            children: typeof p == "function" ? p({ isCurrentTabStop: x, hasTabStop: j != null }) : p
          }
        )
      }
    );
  }
);
dx.displayName = ux;
var N_ = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function C_(n, r) {
  return r !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
function P_(n, r, a) {
  const i = C_(n.key, a);
  if (!(r === "vertical" && ["ArrowLeft", "ArrowRight"].includes(i)) && !(r === "horizontal" && ["ArrowUp", "ArrowDown"].includes(i)))
    return N_[i];
}
function fx(n, r = !1) {
  const a = document.activeElement;
  for (const i of n)
    if (i === a || (i.focus({ preventScroll: r }), document.activeElement !== a)) return;
}
function E_(n, r) {
  return n.map((a, i) => n[(r + i) % n.length]);
}
var T_ = cx, R_ = dx, Gi = "Tabs", [A_] = Ls(Gi, [
  lx
]), px = lx(), [F_, Xu] = A_(Gi), hx = y.forwardRef(
  (n, r) => {
    const {
      __scopeTabs: a,
      value: i,
      onValueChange: c,
      defaultValue: d,
      orientation: p = "horizontal",
      dir: f,
      activationMode: m = "automatic",
      ...v
    } = n, g = Qu(f), [x, w] = $o({
      prop: i,
      onChange: c,
      defaultProp: d ?? "",
      caller: Gi
    });
    return /* @__PURE__ */ s.jsx(
      F_,
      {
        scope: a,
        baseId: Ds(),
        value: x,
        onValueChange: w,
        orientation: p,
        dir: g,
        activationMode: m,
        children: /* @__PURE__ */ s.jsx(
          et.div,
          {
            dir: g,
            "data-orientation": p,
            ...v,
            ref: r
          }
        )
      }
    );
  }
);
hx.displayName = Gi;
var mx = "TabsList", gx = y.forwardRef(
  (n, r) => {
    const { __scopeTabs: a, loop: i = !0, ...c } = n, d = Xu(mx, a), p = px(a);
    return /* @__PURE__ */ s.jsx(
      T_,
      {
        asChild: !0,
        ...p,
        orientation: d.orientation,
        dir: d.dir,
        loop: i,
        children: /* @__PURE__ */ s.jsx(
          et.div,
          {
            role: "tablist",
            "aria-orientation": d.orientation,
            ...c,
            ref: r
          }
        )
      }
    );
  }
);
gx.displayName = mx;
var xx = "TabsTrigger", vx = y.forwardRef(
  (n, r) => {
    const { __scopeTabs: a, value: i, disabled: c = !1, ...d } = n, p = Xu(xx, a), f = px(a), m = bx(p.baseId, i), v = jx(p.baseId, i), g = i === p.value;
    return /* @__PURE__ */ s.jsx(
      R_,
      {
        asChild: !0,
        ...f,
        focusable: !c,
        active: g,
        children: /* @__PURE__ */ s.jsx(
          et.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": g,
            "aria-controls": v,
            "data-state": g ? "active" : "inactive",
            "data-disabled": c ? "" : void 0,
            disabled: c,
            id: m,
            ...d,
            ref: r,
            onMouseDown: Ue(n.onMouseDown, (x) => {
              !c && x.button === 0 && x.ctrlKey === !1 ? p.onValueChange(i) : x.preventDefault();
            }),
            onKeyDown: Ue(n.onKeyDown, (x) => {
              [" ", "Enter"].includes(x.key) && p.onValueChange(i);
            }),
            onFocus: Ue(n.onFocus, () => {
              const x = p.activationMode !== "manual";
              !g && !c && x && p.onValueChange(i);
            })
          }
        )
      }
    );
  }
);
vx.displayName = xx;
var yx = "TabsContent", wx = y.forwardRef(
  (n, r) => {
    const { __scopeTabs: a, value: i, forceMount: c, children: d, ...p } = n, f = Xu(yx, a), m = bx(f.baseId, i), v = jx(f.baseId, i), g = i === f.value, x = y.useRef(g);
    return y.useEffect(() => {
      const w = requestAnimationFrame(() => x.current = !1);
      return () => cancelAnimationFrame(w);
    }, []), /* @__PURE__ */ s.jsx(zu, { present: c || g, children: ({ present: w }) => /* @__PURE__ */ s.jsx(
      et.div,
      {
        "data-state": g ? "active" : "inactive",
        "data-orientation": f.orientation,
        role: "tabpanel",
        "aria-labelledby": m,
        hidden: !w,
        id: v,
        tabIndex: 0,
        ...p,
        ref: r,
        style: {
          ...n.style,
          animationDuration: x.current ? "0s" : void 0
        },
        children: w && d
      }
    ) });
  }
);
wx.displayName = yx;
function bx(n, r) {
  return `${n}-trigger-${r}`;
}
function jx(n, r) {
  return `${n}-content-${r}`;
}
var M_ = hx, kx = gx, _x = vx, Sx = wx;
const $_ = M_, Nx = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  kx,
  {
    ref: a,
    className: mt(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      n
    ),
    ...r
  }
));
Nx.displayName = kx.displayName;
const ku = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  _x,
  {
    ref: a,
    className: mt(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      n
    ),
    ...r
  }
));
ku.displayName = _x.displayName;
const Cx = y.forwardRef(({ className: n, ...r }, a) => /* @__PURE__ */ s.jsx(
  Sx,
  {
    ref: a,
    className: mt(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      n
    ),
    ...r
  }
));
Cx.displayName = Sx.displayName;
const _u = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def"
}, Px = {
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
}, Ex = {
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
}, L_ = {
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
}, yi = ["QB", "RB", "WR", "TE"], D_ = {
  QB: 2,
  RB: 4,
  WR: 6,
  TE: 3
};
function Tx(n) {
  return `https://sleepercdn.com/images/team_logos/nfl/${n.toLowerCase()}.png`;
}
function Rx(n) {
  return `https://sleepercdn.com/content/nfl/players/thumb/${n}.jpg`;
}
function I_({
  team: n,
  onClick: r
}) {
  const a = Px[n] || "#666", i = Ex[n] || n;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: "sc-team-tile",
      style: { "--tile-color": a },
      onClick: r,
      "data-testid": `tile-team-${n}`,
      children: [
        /* @__PURE__ */ s.jsx("div", { className: "sc-team-tile__accent", style: { backgroundColor: a } }),
        /* @__PURE__ */ s.jsx("div", { className: "sc-team-tile__logo", children: /* @__PURE__ */ s.jsx(
          "img",
          {
            src: Tx(n),
            alt: `${n} ${i} logo`,
            loading: "lazy",
            "data-testid": `img-team-logo-${n}`
          }
        ) }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-team-tile__meta", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sc-team-tile__abbr", "data-testid": `text-team-abbr-${n}`, children: n }),
          /* @__PURE__ */ s.jsx("div", { className: "sc-team-tile__name", "data-testid": `text-team-name-${n}`, children: i })
        ] }),
        /* @__PURE__ */ s.jsx(Hu, { className: "sc-team-tile__arrow" })
      ]
    }
  );
}
function Mh({
  player: n,
  pos: r,
  depthLabel: a,
  onClick: i
}) {
  const c = parseInt(a.replace(/[^0-9]/g, "") || "1", 10), d = c <= 1 ? "Starter" : c === 2 ? "Backup" : "Depth";
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `sc-card sc-card--${r.toLowerCase()}`,
      onClick: i,
      "data-testid": `card-player-${n.slug}`,
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sc-card__img", children: [
          /* @__PURE__ */ s.jsx(
            "img",
            {
              src: Rx(n.id),
              alt: n.name,
              loading: "lazy",
              onError: (p) => {
                const f = p.currentTarget;
                f.onerror = null, f.style.display = "none", f.parentElement?.classList.add("sc-card__img--fallback");
              },
              "data-testid": `img-headshot-${n.slug}`
            }
          ),
          /* @__PURE__ */ s.jsx("div", { className: "sc-card__pos", "data-testid": `card-pos-${n.slug}`, children: r }),
          /* @__PURE__ */ s.jsx("div", { className: "sc-card__fallback-initials", children: n.name.split(" ").map((p) => p[0]).join("") })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "sc-card__gold" }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-card__body", children: [
          /* @__PURE__ */ s.jsx("div", { className: "sc-card__name", "data-testid": `card-name-${n.slug}`, children: n.name }),
          /* @__PURE__ */ s.jsxs("div", { className: "sc-card__meta", children: [
            /* @__PURE__ */ s.jsx("span", { className: _u[r] || "", "data-testid": `card-depth-${n.slug}`, children: a }),
            /* @__PURE__ */ s.jsx("span", { className: "sc-card__tier", "data-testid": `card-tier-${n.slug}`, children: d })
          ] })
        ] })
      ]
    }
  );
}
function O_({
  team: n,
  positions: r,
  onBack: a
}) {
  const [, i] = nm(), [c, d] = y.useState(!1), p = Px[n] || "#666", f = Ex[n] || n, m = y.useMemo(() => yi.map((g) => {
    const x = r[g] || [], w = D_[g] || 1, k = x.slice(0, w), S = x.slice(w);
    return { pos: g, starters: k, bench: S };
  }), [r]), v = m.reduce((g, x) => g + x.bench.length, 0);
  return /* @__PURE__ */ s.jsxs("div", { className: "sc-board sc-directory", "data-testid": "team-board-view", children: [
    /* @__PURE__ */ s.jsx("div", { className: "sc-board__header", children: /* @__PURE__ */ s.jsx("div", { className: "sc-board__header-inner", children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: "sc-board__back",
          onClick: a,
          "data-testid": "button-back-league",
          children: [
            /* @__PURE__ */ s.jsx(eg, { className: "w-3.5 h-3.5" }),
            "League View"
          ]
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "sc-board__team-badge", style: { "--team-color": p }, children: [
        /* @__PURE__ */ s.jsx("img", { src: Tx(n), alt: "", className: "sc-board__team-logo" }),
        /* @__PURE__ */ s.jsxs("h2", { className: "sc-board__team-name", "data-testid": "text-team-board-name", children: [
          n,
          " ",
          f
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "sc-board__label", "data-testid": "text-board-subtitle", children: [
        /* @__PURE__ */ s.jsx(es, { className: "w-3.5 h-3.5" }),
        "Fantasy Roster Board"
      ] })
    ] }) }) }),
    /* @__PURE__ */ s.jsx("div", { className: "sc-board__divider" }),
    /* @__PURE__ */ s.jsxs("div", { className: "sc-board__wall", "data-testid": "board-grid", children: [
      m.map(({ pos: g, starters: x }) => x.length > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-board__section", "data-testid": `board-section-${g}`, children: [
        /* @__PURE__ */ s.jsx("h3", { className: "sc-board__section-title", children: g }),
        /* @__PURE__ */ s.jsx("div", { className: "sc-board__cards", children: x.map((w) => /* @__PURE__ */ s.jsx(
          Mh,
          {
            player: w,
            pos: g,
            depthLabel: w.rank_label,
            onClick: () => i(`/nfl/players/${w.slug}/`)
          },
          w.slug
        )) })
      ] }, g)),
      v > 0 && /* @__PURE__ */ s.jsxs("div", { className: "sc-bench", "data-testid": "bench-section", children: [
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "sc-bench__toggle",
            onClick: () => d(!c),
            "data-testid": "button-toggle-bench",
            children: [
              /* @__PURE__ */ s.jsx(Hu, { className: `sc-bench__toggle-icon ${c ? "sc-bench__toggle-icon--open" : ""}` }),
              /* @__PURE__ */ s.jsx("span", { children: c ? "Hide Full Roster" : "Show Full Roster" }),
              /* @__PURE__ */ s.jsx("span", { className: "sc-bench__count", children: v })
            ]
          }
        ),
        c && /* @__PURE__ */ s.jsx("div", { className: "sc-bench__cards", "data-testid": "bench-list", children: m.map(
          ({ pos: g, bench: x }) => x.map((w) => /* @__PURE__ */ s.jsx(
            Mh,
            {
              player: w,
              pos: g,
              depthLabel: w.rank_label,
              onClick: () => i(`/nfl/players/${w.slug}/`)
            },
            w.slug
          ))
        ) })
      ] })
    ] })
  ] });
}
function $h() {
  const [n, r] = y.useState(""), [a, i] = y.useState("ALL"), [c, d] = y.useState(!1), [p, f] = y.useState(-1), [m, v] = y.useState("AFC"), [g, x] = y.useState(!1), [w, k] = y.useState(null), S = y.useRef(null), j = y.useRef(null), _ = y.useRef(null), P = y.useRef(null), [, T] = nm(), { data: C, isLoading: $ } = Zr({
    queryKey: ["/api/players"]
  }), { data: V, isLoading: Z } = Zr({
    queryKey: ["/api/indexed-players"]
  }), H = n.trim().length > 0 || a !== "ALL", L = y.useMemo(() => {
    if (!V?.byTeam) return [];
    const M = [];
    for (const Y of Object.values(V.byTeam))
      for (const X of Object.values(Y))
        M.push(...X);
    return M;
  }, [V]), re = y.useMemo(() => {
    const M = {};
    for (const Y of yi)
      M[Y] = L.filter((X) => X.position === Y).length;
    return M;
  }, [L]), I = y.useMemo(() => {
    if (!n.trim()) return [];
    const M = n.toLowerCase().trim(), Y = L.filter((D) => D.name.toLowerCase().includes(M) || D.team.toLowerCase().includes(M)).slice(0, 8);
    if (Y.length >= 4) return Y;
    const X = new Set(Y.map((D) => D.slug)), te = (C || []).filter((D) => !X.has(D.slug) && (D.name.toLowerCase().includes(M) || D.team.toLowerCase().includes(M))).slice(0, 8 - Y.length);
    return [...Y, ...te];
  }, [L, C, n]), K = y.useMemo(() => {
    let M = L;
    if (a !== "ALL" && (M = M.filter((Y) => Y.position === a)), n.trim()) {
      const Y = n.toLowerCase().trim();
      M = M.filter(
        (X) => X.name.toLowerCase().includes(Y) || X.team.toLowerCase().includes(Y)
      );
    }
    return M = [...M].sort((Y, X) => Y.name.localeCompare(X.name)), M.slice(0, 100);
  }, [L, n, a]);
  y.useEffect(() => {
    function M(Y) {
      S.current && !S.current.contains(Y.target) && d(!1);
    }
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, []), y.useEffect(() => {
    f(-1);
  }, [n]), y.useEffect(() => {
    if (p >= 0 && _.current) {
      const M = _.current.children[p];
      M && M.scrollIntoView({ block: "nearest" });
    }
  }, [p]), y.useEffect(() => {
    function M(Y) {
      if (Y.key === "/" && !Y.ctrlKey && !Y.metaKey) {
        const X = Y.target?.tagName;
        X !== "INPUT" && X !== "TEXTAREA" && (Y.preventDefault(), j.current?.focus());
      }
    }
    return document.addEventListener("keydown", M), () => document.removeEventListener("keydown", M);
  }, []), y.useEffect(() => {
    const M = new IntersectionObserver(
      ([Y]) => {
        x(!Y.isIntersecting);
      },
      { threshold: 0 }
    );
    return P.current && M.observe(P.current), () => M.disconnect();
  }, []);
  const B = y.useCallback(
    (M) => {
      if (!(!c || I.length === 0))
        if (M.key === "ArrowDown")
          M.preventDefault(), f(
            (Y) => Y < I.length - 1 ? Y + 1 : 0
          );
        else if (M.key === "ArrowUp")
          M.preventDefault(), f(
            (Y) => Y > 0 ? Y - 1 : I.length - 1
          );
        else if (M.key === "Enter" && p >= 0) {
          M.preventDefault();
          const Y = I[p];
          d(!1), T(`/nfl/players/${Y.slug}/`);
        } else M.key === "Escape" && d(!1);
    },
    [c, I, p, T]
  ), G = V?.slugs?.length || 352;
  return /* @__PURE__ */ s.jsxs("div", { className: "min-h-screen bg-background", children: [
    g && !H && /* @__PURE__ */ s.jsx("div", { className: "sc-sticky-bar", "data-testid": "sticky-filter-bar", children: /* @__PURE__ */ s.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-2 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
        /* @__PURE__ */ s.jsx(Ro, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ s.jsx(
          bu,
          {
            type: "search",
            placeholder: "Quick search...",
            value: n,
            onChange: (M) => {
              r(M.target.value), d(!0);
            },
            className: "pl-10",
            "data-testid": "input-sticky-search"
          }
        )
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "flex items-center gap-1 flex-wrap", children: yi.map((M) => /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `sc-filter-pill ${a === M ? "sc-filter-pill--active" : ""}`,
          onClick: () => i(a === M ? "ALL" : M),
          "data-testid": `button-sticky-filter-${M}`,
          children: [
            M,
            re[M] ? /* @__PURE__ */ s.jsx("span", { className: "sc-filter-pill__count", children: re[M] }) : null
          ]
        },
        M
      )) })
    ] }) }),
    /* @__PURE__ */ s.jsx(
      "div",
      {
        ref: P,
        className: "sc-header",
        "data-testid": "hero-section",
        children: /* @__PURE__ */ s.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ s.jsx("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ s.jsx(es, { className: "w-5 h-5 sc-header__gold-icon" }),
              /* @__PURE__ */ s.jsx("span", { className: "sc-header__kicker", children: "Player Intelligence" })
            ] }),
            /* @__PURE__ */ s.jsx("h1", { className: "sc-hero-title", "data-testid": "text-page-title", children: "Fantasy Football Player Stats & Analytics" }),
            /* @__PURE__ */ s.jsx("div", { className: "sc-hero-underline" }),
            /* @__PURE__ */ s.jsx("p", { className: "sc-header__sub mt-3", children: "Search, filter, and analyze every fantasy-relevant starter across all 32 NFL teams." })
          ] }) }),
          /* @__PURE__ */ s.jsxs("div", { className: "mt-6", ref: S, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "relative max-w-2xl group", children: [
              /* @__PURE__ */ s.jsx(Ro, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sc-search__icon z-10" }),
              /* @__PURE__ */ s.jsx(
                bu,
                {
                  ref: j,
                  type: "search",
                  placeholder: "Search any player, team, or position...",
                  value: n,
                  onChange: (M) => {
                    r(M.target.value), d(!0);
                  },
                  onFocus: () => {
                    n.trim() && d(!0);
                  },
                  onKeyDown: B,
                  className: "sc-search",
                  autoComplete: "off",
                  role: "combobox",
                  "aria-expanded": c && I.length > 0,
                  "aria-controls": "autocomplete-list",
                  "aria-activedescendant": p >= 0 ? `autocomplete-item-${p}` : void 0,
                  "data-testid": "input-player-search"
                }
              ),
              /* @__PURE__ */ s.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5", children: /* @__PURE__ */ s.jsxs("kbd", { className: "sc-search__kbd", children: [
                /* @__PURE__ */ s.jsx(Db, { className: "w-2.5 h-2.5" }),
                "/"
              ] }) }),
              c && n.trim() && I.length > 0 && /* @__PURE__ */ s.jsx(
                "div",
                {
                  id: "autocomplete-list",
                  ref: _,
                  role: "listbox",
                  className: "absolute top-full left-0 right-0 mt-1 bg-white border border-[rgba(15,23,42,0.12)] rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto",
                  "data-testid": "autocomplete-dropdown",
                  children: I.map((M, Y) => /* @__PURE__ */ s.jsx(qr, { href: `/nfl/players/${M.slug}/`, children: /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      id: `autocomplete-item-${Y}`,
                      role: "option",
                      "aria-selected": Y === p,
                      className: `flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${Y === p ? "bg-[rgba(15,23,42,0.04)]" : "hover:bg-[rgba(15,23,42,0.02)]"}`,
                      onMouseEnter: () => f(Y),
                      onClick: () => d(!1),
                      "data-testid": `autocomplete-item-${M.slug}`,
                      children: [
                        /* @__PURE__ */ s.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-md bg-[rgba(15,23,42,0.04)] flex items-center justify-center", children: /* @__PURE__ */ s.jsx("span", { className: "text-[10px] font-bold text-[#64748b]", children: M.position || "?" }) }),
                        /* @__PURE__ */ s.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ s.jsx("span", { className: "font-medium text-sm text-[#0f172a] truncate block", children: M.name }),
                          /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                            /* @__PURE__ */ s.jsx("span", { className: _u[M.position || ""] || "", children: M.position }),
                            /* @__PURE__ */ s.jsx("span", { className: "text-xs text-[#64748b]", children: M.team })
                          ] })
                        ] }),
                        /* @__PURE__ */ s.jsx(kr, { className: "w-3.5 h-3.5 text-[#64748b] flex-shrink-0" })
                      ]
                    }
                  ) }, M.id))
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-2 mt-4 flex-wrap", children: [
              yi.map((M) => /* @__PURE__ */ s.jsxs(
                "button",
                {
                  type: "button",
                  className: `sc-filter-pill ${a === M ? "sc-filter-pill--active" : ""}`,
                  onClick: () => i(a === M ? "ALL" : M),
                  "data-testid": `button-filter-${M}`,
                  children: [
                    M,
                    re[M] ? /* @__PURE__ */ s.jsx("span", { className: "sc-filter-pill__count", children: re[M] }) : null
                  ]
                },
                M
              )),
              a !== "ALL" && /* @__PURE__ */ s.jsxs(
                Ci,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-[#64748b] hover:text-[#0f172a]",
                  onClick: () => i("ALL"),
                  "data-testid": "button-clear-filter",
                  children: [
                    /* @__PURE__ */ s.jsx(Wb, { className: "w-3 h-3 mr-1" }),
                    "Clear"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ s.jsx("main", { className: w ? "" : "max-w-7xl mx-auto px-4 py-8", children: H ? Z ? /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 12 }).map((M, Y) => /* @__PURE__ */ s.jsx(xi, { children: /* @__PURE__ */ s.jsx(vi, { className: "p-5", children: /* @__PURE__ */ s.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ s.jsx(Ve, { className: "w-10 h-10 rounded-md" }),
      /* @__PURE__ */ s.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-32 mb-2" }),
        /* @__PURE__ */ s.jsx(Ve, { className: "h-3 w-20" })
      ] })
    ] }) }) }, Y)) }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("p", { className: "text-sm text-muted-foreground mb-5", "data-testid": "text-results-count", children: [
        K.length === 100 ? "Showing first 100 results" : `${K.length} player${K.length !== 1 ? "s" : ""} found`,
        n.trim() && ` for "${n}"`
      ] }),
      K.length === 0 ? /* @__PURE__ */ s.jsx(xi, { children: /* @__PURE__ */ s.jsxs(vi, { className: "py-12 text-center", children: [
        /* @__PURE__ */ s.jsx(Ro, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ s.jsx("p", { className: "text-muted-foreground font-medium", children: "No players found" }),
        /* @__PURE__ */ s.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your search or filter" })
      ] }) }) : /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: K.map((M) => {
        const Y = M.position || "", X = "rank_label" in M ? M.rank_label : Y;
        return /* @__PURE__ */ s.jsx(qr, { href: `/nfl/players/${M.slug}/`, children: /* @__PURE__ */ s.jsxs(
          "div",
          {
            className: `sc-result-card sc-result-card--${Y.toLowerCase()}`,
            "data-testid": `card-player-${M.slug}`,
            children: [
              /* @__PURE__ */ s.jsxs("div", { className: "sc-result-card__img", children: [
                /* @__PURE__ */ s.jsx(
                  "img",
                  {
                    src: Rx(M.id),
                    alt: M.name,
                    loading: "lazy",
                    onError: (te) => {
                      const D = te.currentTarget;
                      D.onerror = null, D.style.display = "none", D.parentElement?.classList.add("sc-result-card__img--fallback");
                    }
                  }
                ),
                /* @__PURE__ */ s.jsx("div", { className: "sc-result-card__initials", children: M.name.split(" ").map((te) => te[0]).join("") })
              ] }),
              /* @__PURE__ */ s.jsx("div", { className: "sc-result-card__gold" }),
              /* @__PURE__ */ s.jsxs("div", { className: "sc-result-card__body", children: [
                /* @__PURE__ */ s.jsx("div", { className: "sc-result-card__name", "data-testid": `text-player-name-${M.slug}`, children: M.name }),
                /* @__PURE__ */ s.jsxs("div", { className: "sc-result-card__meta", children: [
                  /* @__PURE__ */ s.jsx("span", { className: _u[Y] || "", children: X }),
                  /* @__PURE__ */ s.jsx("span", { className: "sc-result-card__team", children: M.team })
                ] })
              ] })
            ]
          }
        ) }, M.id);
      }) })
    ] }) : Z ? /* @__PURE__ */ s.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ s.jsx(Ve, { className: "h-10 w-64 mx-auto" }),
      Array.from({ length: 2 }).map((M, Y) => /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx(Ve, { className: "h-6 w-32 mb-3" }),
        /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((X, te) => /* @__PURE__ */ s.jsx(xi, { children: /* @__PURE__ */ s.jsxs(vi, { className: "p-5", children: [
          /* @__PURE__ */ s.jsx(Ve, { className: "h-5 w-12 mb-3" }),
          /* @__PURE__ */ s.jsx("div", { className: "space-y-2", children: Array.from({ length: 6 }).map((D, ne) => /* @__PURE__ */ s.jsx(Ve, { className: "h-4 w-full" }, ne)) })
        ] }) }, te)) })
      ] }, Y))
    ] }) : V && V.byTeam ? w && V.byTeam[w] ? /* @__PURE__ */ s.jsx(
      O_,
      {
        team: w,
        positions: V.byTeam[w],
        onBack: () => k(null)
      }
    ) : /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsxs($_, { defaultValue: "AFC", value: m, onValueChange: v, "data-testid": "tabs-conference", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "flex items-center justify-between mb-6 gap-4 flex-wrap", children: [
        /* @__PURE__ */ s.jsxs(Nx, { "data-testid": "tabs-conference-list", children: [
          /* @__PURE__ */ s.jsx(ku, { value: "AFC", "data-testid": "tab-afc", children: "AFC" }),
          /* @__PURE__ */ s.jsx(ku, { value: "NFC", "data-testid": "tab-nfc", children: "NFC" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "sc-stat-card", "data-testid": "badge-player-count", children: [
          /* @__PURE__ */ s.jsx(Ho, { className: "w-4 h-4 sc-header__gold-icon" }),
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("p", { className: "sc-stat-card__number", children: G }),
            /* @__PURE__ */ s.jsx("p", { className: "sc-stat-card__label", children: "Fantasy Starters" })
          ] })
        ] })
      ] }),
      ["AFC", "NFC"].map((M) => /* @__PURE__ */ s.jsx(Cx, { value: M, children: /* @__PURE__ */ s.jsx("div", { className: "space-y-8", children: Object.entries(L_[M]).map(([Y, X]) => /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsxs(
          "h2",
          {
            className: "sc-division-heading",
            "data-testid": `text-division-${M.toLowerCase()}-${Y.toLowerCase()}`,
            children: [
              M,
              " ",
              Y,
              /* @__PURE__ */ s.jsx("div", { className: "flex-1 h-px bg-amber-400/30 ml-2" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4", children: X.map((te) => V.byTeam[te] ? /* @__PURE__ */ s.jsx(
          I_,
          {
            team: te,
            onClick: () => k(te)
          },
          te
        ) : null) })
      ] }, Y)) }) }, M))
    ] }) }) : null })
  ] });
}
const Io = window.scPlayersConfig || {}, Eo = (Io.restBase || "/wp-json/statchasers/v1").replace(/\/+$/, "");
function z_(n) {
  try {
    const r = new URL(n, window.location.origin), a = r.pathname, i = r.searchParams;
    if (a === "/api/players" || a === "/api/players/") {
      const m = i.get("q") || "";
      return `${Eo}/players?q=${encodeURIComponent(m)}`;
    }
    if (a === "/api/indexed-players" || a === "/api/indexed-players/")
      return `${Eo}/indexed-players`;
    const c = a.match(/^\/api\/players\/([^/]+)\/?$/);
    if (c) {
      const m = c[1], v = i.get("format") || "ppr", g = i.get("season") || "";
      let x = `${Eo}/player/${encodeURIComponent(m)}?format=${v}`;
      return g && (x += `&season=${g}`), x;
    }
    const d = a.match(/^\/api\/players\/([^/]+)\/game-log\/?$/);
    if (d) {
      const m = d[1], v = i.get("season") || "", g = i.get("format") || "ppr";
      let x = `${Eo}/player/${encodeURIComponent(m)}/game-log?format=${g}`;
      return v && (x += `&season=${v}`), x;
    }
    const p = a.match(/^\/api\/players\/([^/]+)\/related\/?$/);
    if (p) {
      const m = p[1], v = i.get("format") || "ppr", g = i.get("season") || "";
      let x = `${Eo}/player/${encodeURIComponent(m)}/related?format=${v}`;
      return g && (x += `&season=${g}`), x;
    }
    if (a.match(/^\/api\/players\/([^/]+)\/news\/?$/))
      return "data:application/json,[]";
  } catch {
  }
  return n;
}
function wi(n) {
  return n.startsWith("/api/") ? z_(n) : n;
}
const Ax = window.fetch.bind(window);
window.fetch = function(n, r) {
  if (typeof n == "string")
    n = wi(n);
  else if (n instanceof Request) {
    const a = n.url, i = window.location.origin, c = a.startsWith(i) ? a.slice(i.length) : a;
    if (c.startsWith("/api/")) {
      const d = wi(c);
      n = new Request(d, n);
    }
  } else n instanceof URL && n.pathname.startsWith("/api/") && (n = wi(n.pathname + n.search));
  return Ax(n, r);
};
const B_ = async ({ queryKey: n }) => {
  const r = n.join("/"), a = wi(r), i = await Ax(a);
  if (!i.ok) {
    const c = await i.text() || i.statusText;
    throw new Error(`${i.status}: ${c}`);
  }
  return i.json();
}, Zu = new qv({
  defaultOptions: {
    queries: {
      queryFn: B_,
      refetchInterval: !1,
      refetchOnWindowFocus: !1,
      staleTime: 1 / 0,
      retry: !1
    },
    mutations: {
      retry: !1
    }
  }
}), W_ = () => [window.location.pathname + window.location.search, (r) => {
  window.location.href = r;
}];
Io.preloadedIndexed && Zu.setQueryData(["/api/indexed-players"], Io.preloadedIndexed);
Io.preloadedPlayers && Zu.setQueryData(["/api/players"], Io.preloadedPlayers);
const qc = document.querySelector(".scpp-root");
qc && (qc.innerHTML = "", Nv.createRoot(qc).render(
  /* @__PURE__ */ s.jsx(Zv, { client: Zu, children: /* @__PURE__ */ s.jsx(wr, { children: /* @__PURE__ */ s.jsx(sm, { hook: W_, children: /* @__PURE__ */ s.jsxs(Ey, { children: [
    /* @__PURE__ */ s.jsx(ai, { path: "/nfl/players/:slug", component: Fh }),
    /* @__PURE__ */ s.jsx(ai, { path: "/nfl/players/:slug/", component: Fh }),
    /* @__PURE__ */ s.jsx(ai, { path: "/nfl/players", component: $h }),
    /* @__PURE__ */ s.jsx(ai, { path: "/nfl/players/", component: $h })
  ] }) }) }) })
));
