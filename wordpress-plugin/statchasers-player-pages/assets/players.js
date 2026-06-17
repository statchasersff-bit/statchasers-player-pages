function Hy(t, r) {
  for (var o = 0; o < r.length; o++) {
    const i = r[o];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const c in i)
        if (c !== "default" && !(c in t)) {
          const u = Object.getOwnPropertyDescriptor(i, c);
          u && Object.defineProperty(t, c, u.get ? u : {
            enumerable: !0,
            get: () => i[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function Vy(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var bl = { exports: {} }, Ns = {}, kl = { exports: {} }, ke = {};
var Nf;
function Yy() {
  if (Nf) return ke;
  Nf = 1;
  var t = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), i = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), u = /* @__PURE__ */ Symbol.for("react.provider"), f = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), g = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), x = Symbol.iterator;
  function b(A) {
    return A === null || typeof A != "object" ? null : (A = x && A[x] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var j = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, _ = Object.assign, k = {};
  function S(A, B, he) {
    this.props = A, this.context = B, this.refs = k, this.updater = he || j;
  }
  S.prototype.isReactComponent = {}, S.prototype.setState = function(A, B) {
    if (typeof A != "object" && typeof A != "function" && A != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, A, B, "setState");
  }, S.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function C() {
  }
  C.prototype = S.prototype;
  function R(A, B, he) {
    this.props = A, this.context = B, this.refs = k, this.updater = he || j;
  }
  var E = R.prototype = new C();
  E.constructor = R, _(E, S.prototype), E.isPureReactComponent = !0;
  var $ = Array.isArray, G = Object.prototype.hasOwnProperty, Y = { current: null }, W = { key: !0, ref: !0, __self: !0, __source: !0 };
  function K(A, B, he) {
    var oe, pe = {}, me = null, ve = null;
    if (B != null) for (oe in B.ref !== void 0 && (ve = B.ref), B.key !== void 0 && (me = "" + B.key), B) G.call(B, oe) && !W.hasOwnProperty(oe) && (pe[oe] = B[oe]);
    var ye = arguments.length - 2;
    if (ye === 1) pe.children = he;
    else if (1 < ye) {
      for (var be = Array(ye), Be = 0; Be < ye; Be++) be[Be] = arguments[Be + 2];
      pe.children = be;
    }
    if (A && A.defaultProps) for (oe in ye = A.defaultProps, ye) pe[oe] === void 0 && (pe[oe] = ye[oe]);
    return { $$typeof: t, type: A, key: me, ref: ve, props: pe, _owner: Y.current };
  }
  function le(A, B) {
    return { $$typeof: t, type: A.type, key: B, ref: A.ref, props: A.props, _owner: A._owner };
  }
  function ie(A) {
    return typeof A == "object" && A !== null && A.$$typeof === t;
  }
  function ue(A) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(he) {
      return B[he];
    });
  }
  var Q = /\/+/g;
  function D(A, B) {
    return typeof A == "object" && A !== null && A.key != null ? ue("" + A.key) : B.toString(36);
  }
  function J(A, B, he, oe, pe) {
    var me = typeof A;
    (me === "undefined" || me === "boolean") && (A = null);
    var ve = !1;
    if (A === null) ve = !0;
    else switch (me) {
      case "string":
      case "number":
        ve = !0;
        break;
      case "object":
        switch (A.$$typeof) {
          case t:
          case r:
            ve = !0;
        }
    }
    if (ve) return ve = A, pe = pe(ve), A = oe === "" ? "." + D(ve, 0) : oe, $(pe) ? (he = "", A != null && (he = A.replace(Q, "$&/") + "/"), J(pe, B, he, "", function(Be) {
      return Be;
    })) : pe != null && (ie(pe) && (pe = le(pe, he + (!pe.key || ve && ve.key === pe.key ? "" : ("" + pe.key).replace(Q, "$&/") + "/") + A)), B.push(pe)), 1;
    if (ve = 0, oe = oe === "" ? "." : oe + ":", $(A)) for (var ye = 0; ye < A.length; ye++) {
      me = A[ye];
      var be = oe + D(me, ye);
      ve += J(me, B, he, be, pe);
    }
    else if (be = b(A), typeof be == "function") for (A = be.call(A), ye = 0; !(me = A.next()).done; ) me = me.value, be = oe + D(me, ye++), ve += J(me, B, he, be, pe);
    else if (me === "object") throw B = String(A), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
    return ve;
  }
  function M(A, B, he) {
    if (A == null) return A;
    var oe = [], pe = 0;
    return J(A, oe, "", "", function(me) {
      return B.call(he, me, pe++);
    }), oe;
  }
  function U(A) {
    if (A._status === -1) {
      var B = A._result;
      B = B(), B.then(function(he) {
        (A._status === 0 || A._status === -1) && (A._status = 1, A._result = he);
      }, function(he) {
        (A._status === 0 || A._status === -1) && (A._status = 2, A._result = he);
      }), A._status === -1 && (A._status = 0, A._result = B);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var ne = { current: null }, F = { transition: null }, Z = { ReactCurrentDispatcher: ne, ReactCurrentBatchConfig: F, ReactCurrentOwner: Y };
  function X() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ke.Children = { map: M, forEach: function(A, B, he) {
    M(A, function() {
      B.apply(this, arguments);
    }, he);
  }, count: function(A) {
    var B = 0;
    return M(A, function() {
      B++;
    }), B;
  }, toArray: function(A) {
    return M(A, function(B) {
      return B;
    }) || [];
  }, only: function(A) {
    if (!ie(A)) throw Error("React.Children.only expected to receive a single React element child.");
    return A;
  } }, ke.Component = S, ke.Fragment = o, ke.Profiler = c, ke.PureComponent = R, ke.StrictMode = i, ke.Suspense = m, ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, ke.act = X, ke.cloneElement = function(A, B, he) {
    if (A == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + A + ".");
    var oe = _({}, A.props), pe = A.key, me = A.ref, ve = A._owner;
    if (B != null) {
      if (B.ref !== void 0 && (me = B.ref, ve = Y.current), B.key !== void 0 && (pe = "" + B.key), A.type && A.type.defaultProps) var ye = A.type.defaultProps;
      for (be in B) G.call(B, be) && !W.hasOwnProperty(be) && (oe[be] = B[be] === void 0 && ye !== void 0 ? ye[be] : B[be]);
    }
    var be = arguments.length - 2;
    if (be === 1) oe.children = he;
    else if (1 < be) {
      ye = Array(be);
      for (var Be = 0; Be < be; Be++) ye[Be] = arguments[Be + 2];
      oe.children = ye;
    }
    return { $$typeof: t, type: A.type, key: pe, ref: me, props: oe, _owner: ve };
  }, ke.createContext = function(A) {
    return A = { $$typeof: f, _currentValue: A, _currentValue2: A, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, A.Provider = { $$typeof: u, _context: A }, A.Consumer = A;
  }, ke.createElement = K, ke.createFactory = function(A) {
    var B = K.bind(null, A);
    return B.type = A, B;
  }, ke.createRef = function() {
    return { current: null };
  }, ke.forwardRef = function(A) {
    return { $$typeof: p, render: A };
  }, ke.isValidElement = ie, ke.lazy = function(A) {
    return { $$typeof: y, _payload: { _status: -1, _result: A }, _init: U };
  }, ke.memo = function(A, B) {
    return { $$typeof: g, type: A, compare: B === void 0 ? null : B };
  }, ke.startTransition = function(A) {
    var B = F.transition;
    F.transition = {};
    try {
      A();
    } finally {
      F.transition = B;
    }
  }, ke.unstable_act = X, ke.useCallback = function(A, B) {
    return ne.current.useCallback(A, B);
  }, ke.useContext = function(A) {
    return ne.current.useContext(A);
  }, ke.useDebugValue = function() {
  }, ke.useDeferredValue = function(A) {
    return ne.current.useDeferredValue(A);
  }, ke.useEffect = function(A, B) {
    return ne.current.useEffect(A, B);
  }, ke.useId = function() {
    return ne.current.useId();
  }, ke.useImperativeHandle = function(A, B, he) {
    return ne.current.useImperativeHandle(A, B, he);
  }, ke.useInsertionEffect = function(A, B) {
    return ne.current.useInsertionEffect(A, B);
  }, ke.useLayoutEffect = function(A, B) {
    return ne.current.useLayoutEffect(A, B);
  }, ke.useMemo = function(A, B) {
    return ne.current.useMemo(A, B);
  }, ke.useReducer = function(A, B, he) {
    return ne.current.useReducer(A, B, he);
  }, ke.useRef = function(A) {
    return ne.current.useRef(A);
  }, ke.useState = function(A) {
    return ne.current.useState(A);
  }, ke.useSyncExternalStore = function(A, B, he) {
    return ne.current.useSyncExternalStore(A, B, he);
  }, ke.useTransition = function() {
    return ne.current.useTransition();
  }, ke.version = "18.3.1", ke;
}
var Sf;
function yi() {
  return Sf || (Sf = 1, kl.exports = Yy()), kl.exports;
}
var _f;
function Qy() {
  if (_f) return Ns;
  _f = 1;
  var t = yi(), r = /* @__PURE__ */ Symbol.for("react.element"), o = /* @__PURE__ */ Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, c = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(p, m, g) {
    var y, x = {}, b = null, j = null;
    g !== void 0 && (b = "" + g), m.key !== void 0 && (b = "" + m.key), m.ref !== void 0 && (j = m.ref);
    for (y in m) i.call(m, y) && !u.hasOwnProperty(y) && (x[y] = m[y]);
    if (p && p.defaultProps) for (y in m = p.defaultProps, m) x[y] === void 0 && (x[y] = m[y]);
    return { $$typeof: r, type: p, key: b, ref: j, props: x, _owner: c.current };
  }
  return Ns.Fragment = o, Ns.jsx = f, Ns.jsxs = f, Ns;
}
var Cf;
function Gy() {
  return Cf || (Cf = 1, bl.exports = Qy()), bl.exports;
}
var l = Gy(), Ko = {}, jl = { exports: {} }, ut = {}, Nl = { exports: {} }, Sl = {};
var Pf;
function Ky() {
  return Pf || (Pf = 1, (function(t) {
    function r(F, Z) {
      var X = F.length;
      F.push(Z);
      e: for (; 0 < X; ) {
        var A = X - 1 >>> 1, B = F[A];
        if (0 < c(B, Z)) F[A] = Z, F[X] = B, X = A;
        else break e;
      }
    }
    function o(F) {
      return F.length === 0 ? null : F[0];
    }
    function i(F) {
      if (F.length === 0) return null;
      var Z = F[0], X = F.pop();
      if (X !== Z) {
        F[0] = X;
        e: for (var A = 0, B = F.length, he = B >>> 1; A < he; ) {
          var oe = 2 * (A + 1) - 1, pe = F[oe], me = oe + 1, ve = F[me];
          if (0 > c(pe, X)) me < B && 0 > c(ve, pe) ? (F[A] = ve, F[me] = X, A = me) : (F[A] = pe, F[oe] = X, A = oe);
          else if (me < B && 0 > c(ve, X)) F[A] = ve, F[me] = X, A = me;
          else break e;
        }
      }
      return Z;
    }
    function c(F, Z) {
      var X = F.sortIndex - Z.sortIndex;
      return X !== 0 ? X : F.id - Z.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, p = f.now();
      t.unstable_now = function() {
        return f.now() - p;
      };
    }
    var m = [], g = [], y = 1, x = null, b = 3, j = !1, _ = !1, k = !1, S = typeof setTimeout == "function" ? setTimeout : null, C = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function E(F) {
      for (var Z = o(g); Z !== null; ) {
        if (Z.callback === null) i(g);
        else if (Z.startTime <= F) i(g), Z.sortIndex = Z.expirationTime, r(m, Z);
        else break;
        Z = o(g);
      }
    }
    function $(F) {
      if (k = !1, E(F), !_) if (o(m) !== null) _ = !0, U(G);
      else {
        var Z = o(g);
        Z !== null && ne($, Z.startTime - F);
      }
    }
    function G(F, Z) {
      _ = !1, k && (k = !1, C(K), K = -1), j = !0;
      var X = b;
      try {
        for (E(Z), x = o(m); x !== null && (!(x.expirationTime > Z) || F && !ue()); ) {
          var A = x.callback;
          if (typeof A == "function") {
            x.callback = null, b = x.priorityLevel;
            var B = A(x.expirationTime <= Z);
            Z = t.unstable_now(), typeof B == "function" ? x.callback = B : x === o(m) && i(m), E(Z);
          } else i(m);
          x = o(m);
        }
        if (x !== null) var he = !0;
        else {
          var oe = o(g);
          oe !== null && ne($, oe.startTime - Z), he = !1;
        }
        return he;
      } finally {
        x = null, b = X, j = !1;
      }
    }
    var Y = !1, W = null, K = -1, le = 5, ie = -1;
    function ue() {
      return !(t.unstable_now() - ie < le);
    }
    function Q() {
      if (W !== null) {
        var F = t.unstable_now();
        ie = F;
        var Z = !0;
        try {
          Z = W(!0, F);
        } finally {
          Z ? D() : (Y = !1, W = null);
        }
      } else Y = !1;
    }
    var D;
    if (typeof R == "function") D = function() {
      R(Q);
    };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), M = J.port2;
      J.port1.onmessage = Q, D = function() {
        M.postMessage(null);
      };
    } else D = function() {
      S(Q, 0);
    };
    function U(F) {
      W = F, Y || (Y = !0, D());
    }
    function ne(F, Z) {
      K = S(function() {
        F(t.unstable_now());
      }, Z);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(F) {
      F.callback = null;
    }, t.unstable_continueExecution = function() {
      _ || j || (_ = !0, U(G));
    }, t.unstable_forceFrameRate = function(F) {
      0 > F || 125 < F ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : le = 0 < F ? Math.floor(1e3 / F) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, t.unstable_getFirstCallbackNode = function() {
      return o(m);
    }, t.unstable_next = function(F) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = b;
      }
      var X = b;
      b = Z;
      try {
        return F();
      } finally {
        b = X;
      }
    }, t.unstable_pauseExecution = function() {
    }, t.unstable_requestPaint = function() {
    }, t.unstable_runWithPriority = function(F, Z) {
      switch (F) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          F = 3;
      }
      var X = b;
      b = F;
      try {
        return Z();
      } finally {
        b = X;
      }
    }, t.unstable_scheduleCallback = function(F, Z, X) {
      var A = t.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? A + X : A) : X = A, F) {
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
      return B = X + B, F = { id: y++, callback: Z, priorityLevel: F, startTime: X, expirationTime: B, sortIndex: -1 }, X > A ? (F.sortIndex = X, r(g, F), o(m) === null && F === o(g) && (k ? (C(K), K = -1) : k = !0, ne($, X - A))) : (F.sortIndex = B, r(m, F), _ || j || (_ = !0, U(G))), F;
    }, t.unstable_shouldYield = ue, t.unstable_wrapCallback = function(F) {
      var Z = b;
      return function() {
        var X = b;
        b = Z;
        try {
          return F.apply(this, arguments);
        } finally {
          b = X;
        }
      };
    };
  })(Sl)), Sl;
}
var Ef;
function qy() {
  return Ef || (Ef = 1, Nl.exports = Ky()), Nl.exports;
}
var Rf;
function Xy() {
  if (Rf) return ut;
  Rf = 1;
  var t = yi(), r = qy();
  function o(e) {
    for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, s = 1; s < arguments.length; s++) n += "&args[]=" + encodeURIComponent(arguments[s]);
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var i = /* @__PURE__ */ new Set(), c = {};
  function u(e, n) {
    f(e, n), f(e + "Capture", n);
  }
  function f(e, n) {
    for (c[e] = n, e = 0; e < n.length; e++) i.add(n[e]);
  }
  var p = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, g = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, y = {}, x = {};
  function b(e) {
    return m.call(x, e) ? !0 : m.call(y, e) ? !1 : g.test(e) ? x[e] = !0 : (y[e] = !0, !1);
  }
  function j(e, n, s, a) {
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
  function _(e, n, s, a) {
    if (n === null || typeof n > "u" || j(e, n, s, a)) return !0;
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
  function k(e, n, s, a, d, h, v) {
    this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = a, this.attributeNamespace = d, this.mustUseProperty = s, this.propertyName = e, this.type = n, this.sanitizeURL = h, this.removeEmptyString = v;
  }
  var S = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    S[e] = new k(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var n = e[0];
    S[n] = new k(n, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    S[e] = new k(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    S[e] = new k(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    S[e] = new k(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    S[e] = new k(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    S[e] = new k(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    S[e] = new k(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    S[e] = new k(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var C = /[\-:]([a-z])/g;
  function R(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var n = e.replace(
      C,
      R
    );
    S[n] = new k(n, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var n = e.replace(C, R);
    S[n] = new k(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var n = e.replace(C, R);
    S[n] = new k(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    S[e] = new k(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), S.xlinkHref = new k("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    S[e] = new k(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function E(e, n, s, a) {
    var d = S.hasOwnProperty(n) ? S[n] : null;
    (d !== null ? d.type !== 0 : a || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (_(n, s, d, a) && (s = null), a || d === null ? b(n) && (s === null ? e.removeAttribute(n) : e.setAttribute(n, "" + s)) : d.mustUseProperty ? e[d.propertyName] = s === null ? d.type === 3 ? !1 : "" : s : (n = d.attributeName, a = d.attributeNamespace, s === null ? e.removeAttribute(n) : (d = d.type, s = d === 3 || d === 4 && s === !0 ? "" : "" + s, a ? e.setAttributeNS(a, n, s) : e.setAttribute(n, s))));
  }
  var $ = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, G = /* @__PURE__ */ Symbol.for("react.element"), Y = /* @__PURE__ */ Symbol.for("react.portal"), W = /* @__PURE__ */ Symbol.for("react.fragment"), K = /* @__PURE__ */ Symbol.for("react.strict_mode"), le = /* @__PURE__ */ Symbol.for("react.profiler"), ie = /* @__PURE__ */ Symbol.for("react.provider"), ue = /* @__PURE__ */ Symbol.for("react.context"), Q = /* @__PURE__ */ Symbol.for("react.forward_ref"), D = /* @__PURE__ */ Symbol.for("react.suspense"), J = /* @__PURE__ */ Symbol.for("react.suspense_list"), M = /* @__PURE__ */ Symbol.for("react.memo"), U = /* @__PURE__ */ Symbol.for("react.lazy"), ne = /* @__PURE__ */ Symbol.for("react.offscreen"), F = Symbol.iterator;
  function Z(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var X = Object.assign, A;
  function B(e) {
    if (A === void 0) try {
      throw Error();
    } catch (s) {
      var n = s.stack.trim().match(/\n( *(at )?)/);
      A = n && n[1] || "";
    }
    return `
` + A + e;
  }
  var he = !1;
  function oe(e, n) {
    if (!e || he) return "";
    he = !0;
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
        } catch (I) {
          var a = I;
        }
        Reflect.construct(e, [], n);
      } else {
        try {
          n.call();
        } catch (I) {
          a = I;
        }
        e.call(n.prototype);
      }
      else {
        try {
          throw Error();
        } catch (I) {
          a = I;
        }
        e();
      }
    } catch (I) {
      if (I && a && typeof I.stack == "string") {
        for (var d = I.stack.split(`
`), h = a.stack.split(`
`), v = d.length - 1, N = h.length - 1; 1 <= v && 0 <= N && d[v] !== h[N]; ) N--;
        for (; 1 <= v && 0 <= N; v--, N--) if (d[v] !== h[N]) {
          if (v !== 1 || N !== 1)
            do
              if (v--, N--, 0 > N || d[v] !== h[N]) {
                var P = `
` + d[v].replace(" at new ", " at ");
                return e.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", e.displayName)), P;
              }
            while (1 <= v && 0 <= N);
          break;
        }
      }
    } finally {
      he = !1, Error.prepareStackTrace = s;
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
        return e = oe(e.type, !1), e;
      case 11:
        return e = oe(e.type.render, !1), e;
      case 1:
        return e = oe(e.type, !0), e;
      default:
        return "";
    }
  }
  function me(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case W:
        return "Fragment";
      case Y:
        return "Portal";
      case le:
        return "Profiler";
      case K:
        return "StrictMode";
      case D:
        return "Suspense";
      case J:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case ue:
        return (e.displayName || "Context") + ".Consumer";
      case ie:
        return (e._context.displayName || "Context") + ".Provider";
      case Q:
        var n = e.render;
        return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case M:
        return n = e.displayName || null, n !== null ? n : me(e.type) || "Memo";
      case U:
        n = e._payload, e = e._init;
        try {
          return me(e(n));
        } catch {
        }
    }
    return null;
  }
  function ve(e) {
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
        return me(n);
      case 8:
        return n === K ? "StrictMode" : "Mode";
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
  function ye(e) {
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
  function be(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Be(e) {
    var n = be(e) ? "checked" : "value", s = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), a = "" + e[n];
    if (!e.hasOwnProperty(n) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var d = s.get, h = s.set;
      return Object.defineProperty(e, n, { configurable: !0, get: function() {
        return d.call(this);
      }, set: function(v) {
        a = "" + v, h.call(this, v);
      } }), Object.defineProperty(e, n, { enumerable: s.enumerable }), { getValue: function() {
        return a;
      }, setValue: function(v) {
        a = "" + v;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[n];
      } };
    }
  }
  function ze(e) {
    e._valueTracker || (e._valueTracker = Be(e));
  }
  function Ds(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var s = n.getValue(), a = "";
    return e && (a = be(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== s ? (n.setValue(e), !0) : !1;
  }
  function Kt(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Pi(e, n) {
    var s = n.checked;
    return X({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: s ?? e._wrapperState.initialChecked });
  }
  function Rc(e, n) {
    var s = n.defaultValue == null ? "" : n.defaultValue, a = n.checked != null ? n.checked : n.defaultChecked;
    s = ye(n.value != null ? n.value : s), e._wrapperState = { initialChecked: a, initialValue: s, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
  }
  function Tc(e, n) {
    n = n.checked, n != null && E(e, "checked", n, !1);
  }
  function Ei(e, n) {
    Tc(e, n);
    var s = ye(n.value), a = n.type;
    if (s != null) a === "number" ? (s === 0 && e.value === "" || e.value != s) && (e.value = "" + s) : e.value !== "" + s && (e.value = "" + s);
    else if (a === "submit" || a === "reset") {
      e.removeAttribute("value");
      return;
    }
    n.hasOwnProperty("value") ? Ri(e, n.type, s) : n.hasOwnProperty("defaultValue") && Ri(e, n.type, ye(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
  }
  function Ac(e, n, s) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var a = n.type;
      if (!(a !== "submit" && a !== "reset" || n.value !== void 0 && n.value !== null)) return;
      n = "" + e._wrapperState.initialValue, s || n === e.value || (e.value = n), e.defaultValue = n;
    }
    s = e.name, s !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, s !== "" && (e.name = s);
  }
  function Ri(e, n, s) {
    (n !== "number" || Kt(e.ownerDocument) !== e) && (s == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + s && (e.defaultValue = "" + s));
  }
  var Dr = Array.isArray;
  function sr(e, n, s, a) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < s.length; d++) n["$" + s[d]] = !0;
      for (s = 0; s < e.length; s++) d = n.hasOwnProperty("$" + e[s].value), e[s].selected !== d && (e[s].selected = d), d && a && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + ye(s), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === s) {
          e[d].selected = !0, a && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Ti(e, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(o(91));
    return X({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Lc(e, n) {
    var s = n.value;
    if (s == null) {
      if (s = n.children, n = n.defaultValue, s != null) {
        if (n != null) throw Error(o(92));
        if (Dr(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        n = s;
      }
      n == null && (n = ""), s = n;
    }
    e._wrapperState = { initialValue: ye(s) };
  }
  function Oc(e, n) {
    var s = ye(n.value), a = ye(n.defaultValue);
    s != null && (s = "" + s, s !== e.value && (e.value = s), n.defaultValue == null && e.defaultValue !== s && (e.defaultValue = s)), a != null && (e.defaultValue = "" + a);
  }
  function Mc(e) {
    var n = e.textContent;
    n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
  }
  function Ic(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ai(e, n) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Ic(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Bs, $c = (function(e) {
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
  function Br(e, n) {
    if (n) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var zr = {
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
  }, Gm = ["Webkit", "ms", "Moz", "O"];
  Object.keys(zr).forEach(function(e) {
    Gm.forEach(function(n) {
      n = n + e.charAt(0).toUpperCase() + e.substring(1), zr[n] = zr[e];
    });
  });
  function Fc(e, n, s) {
    return n == null || typeof n == "boolean" || n === "" ? "" : s || typeof n != "number" || n === 0 || zr.hasOwnProperty(e) && zr[e] ? ("" + n).trim() : n + "px";
  }
  function Dc(e, n) {
    e = e.style;
    for (var s in n) if (n.hasOwnProperty(s)) {
      var a = s.indexOf("--") === 0, d = Fc(s, n[s], a);
      s === "float" && (s = "cssFloat"), a ? e.setProperty(s, d) : e[s] = d;
    }
  }
  var Km = X({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Li(e, n) {
    if (n) {
      if (Km[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(o(137, e));
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(o(60));
        if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(o(61));
      }
      if (n.style != null && typeof n.style != "object") throw Error(o(62));
    }
  }
  function Oi(e, n) {
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
  var Mi = null;
  function Ii(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var $i = null, or = null, ir = null;
  function Bc(e) {
    if (e = cs(e)) {
      if (typeof $i != "function") throw Error(o(280));
      var n = e.stateNode;
      n && (n = co(n), $i(e.stateNode, e.type, n));
    }
  }
  function zc(e) {
    or ? ir ? ir.push(e) : ir = [e] : or = e;
  }
  function Uc() {
    if (or) {
      var e = or, n = ir;
      if (ir = or = null, Bc(e), n) for (e = 0; e < n.length; e++) Bc(n[e]);
    }
  }
  function Wc(e, n) {
    return e(n);
  }
  function Hc() {
  }
  var Fi = !1;
  function Vc(e, n, s) {
    if (Fi) return e(n, s);
    Fi = !0;
    try {
      return Wc(e, n, s);
    } finally {
      Fi = !1, (or !== null || ir !== null) && (Hc(), Uc());
    }
  }
  function Ur(e, n) {
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
  var Di = !1;
  if (p) try {
    var Wr = {};
    Object.defineProperty(Wr, "passive", { get: function() {
      Di = !0;
    } }), window.addEventListener("test", Wr, Wr), window.removeEventListener("test", Wr, Wr);
  } catch {
    Di = !1;
  }
  function qm(e, n, s, a, d, h, v, N, P) {
    var I = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(s, I);
    } catch (H) {
      this.onError(H);
    }
  }
  var Hr = !1, zs = null, Us = !1, Bi = null, Xm = { onError: function(e) {
    Hr = !0, zs = e;
  } };
  function Zm(e, n, s, a, d, h, v, N, P) {
    Hr = !1, zs = null, qm.apply(Xm, arguments);
  }
  function Jm(e, n, s, a, d, h, v, N, P) {
    if (Zm.apply(this, arguments), Hr) {
      if (Hr) {
        var I = zs;
        Hr = !1, zs = null;
      } else throw Error(o(198));
      Us || (Us = !0, Bi = I);
    }
  }
  function $n(e) {
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
  function Yc(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function Qc(e) {
    if ($n(e) !== e) throw Error(o(188));
  }
  function eg(e) {
    var n = e.alternate;
    if (!n) {
      if (n = $n(e), n === null) throw Error(o(188));
      return n !== e ? null : e;
    }
    for (var s = e, a = n; ; ) {
      var d = s.return;
      if (d === null) break;
      var h = d.alternate;
      if (h === null) {
        if (a = d.return, a !== null) {
          s = a;
          continue;
        }
        break;
      }
      if (d.child === h.child) {
        for (h = d.child; h; ) {
          if (h === s) return Qc(d), e;
          if (h === a) return Qc(d), n;
          h = h.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== a.return) s = d, a = h;
      else {
        for (var v = !1, N = d.child; N; ) {
          if (N === s) {
            v = !0, s = d, a = h;
            break;
          }
          if (N === a) {
            v = !0, a = d, s = h;
            break;
          }
          N = N.sibling;
        }
        if (!v) {
          for (N = h.child; N; ) {
            if (N === s) {
              v = !0, s = h, a = d;
              break;
            }
            if (N === a) {
              v = !0, a = h, s = d;
              break;
            }
            N = N.sibling;
          }
          if (!v) throw Error(o(189));
        }
      }
      if (s.alternate !== a) throw Error(o(190));
    }
    if (s.tag !== 3) throw Error(o(188));
    return s.stateNode.current === s ? e : n;
  }
  function Gc(e) {
    return e = eg(e), e !== null ? Kc(e) : null;
  }
  function Kc(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var n = Kc(e);
      if (n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var qc = r.unstable_scheduleCallback, Xc = r.unstable_cancelCallback, tg = r.unstable_shouldYield, ng = r.unstable_requestPaint, Me = r.unstable_now, rg = r.unstable_getCurrentPriorityLevel, zi = r.unstable_ImmediatePriority, Zc = r.unstable_UserBlockingPriority, Ws = r.unstable_NormalPriority, sg = r.unstable_LowPriority, Jc = r.unstable_IdlePriority, Hs = null, Dt = null;
  function og(e) {
    if (Dt && typeof Dt.onCommitFiberRoot == "function") try {
      Dt.onCommitFiberRoot(Hs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Et = Math.clz32 ? Math.clz32 : lg, ig = Math.log, ag = Math.LN2;
  function lg(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ig(e) / ag | 0) | 0;
  }
  var Vs = 64, Ys = 4194304;
  function Vr(e) {
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
  function Qs(e, n) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var a = 0, d = e.suspendedLanes, h = e.pingedLanes, v = s & 268435455;
    if (v !== 0) {
      var N = v & ~d;
      N !== 0 ? a = Vr(N) : (h &= v, h !== 0 && (a = Vr(h)));
    } else v = s & ~d, v !== 0 ? a = Vr(v) : h !== 0 && (a = Vr(h));
    if (a === 0) return 0;
    if (n !== 0 && n !== a && (n & d) === 0 && (d = a & -a, h = n & -n, d >= h || d === 16 && (h & 4194240) !== 0)) return n;
    if ((a & 4) !== 0 && (a |= s & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= a; 0 < n; ) s = 31 - Et(n), d = 1 << s, a |= e[s], n &= ~d;
    return a;
  }
  function cg(e, n) {
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
  function ug(e, n) {
    for (var s = e.suspendedLanes, a = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes; 0 < h; ) {
      var v = 31 - Et(h), N = 1 << v, P = d[v];
      P === -1 ? ((N & s) === 0 || (N & a) !== 0) && (d[v] = cg(N, n)) : P <= n && (e.expiredLanes |= N), h &= ~N;
    }
  }
  function Ui(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function eu() {
    var e = Vs;
    return Vs <<= 1, (Vs & 4194240) === 0 && (Vs = 64), e;
  }
  function Wi(e) {
    for (var n = [], s = 0; 31 > s; s++) n.push(e);
    return n;
  }
  function Yr(e, n, s) {
    e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - Et(n), e[n] = s;
  }
  function dg(e, n) {
    var s = e.pendingLanes & ~n;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
    var a = e.eventTimes;
    for (e = e.expirationTimes; 0 < s; ) {
      var d = 31 - Et(s), h = 1 << d;
      n[d] = 0, a[d] = -1, e[d] = -1, s &= ~h;
    }
  }
  function Hi(e, n) {
    var s = e.entangledLanes |= n;
    for (e = e.entanglements; s; ) {
      var a = 31 - Et(s), d = 1 << a;
      d & n | e[a] & n && (e[a] |= n), s &= ~d;
    }
  }
  var _e = 0;
  function tu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var nu, Vi, ru, su, ou, Yi = !1, Gs = [], dn = null, fn = null, pn = null, Qr = /* @__PURE__ */ new Map(), Gr = /* @__PURE__ */ new Map(), hn = [], fg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function iu(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        dn = null;
        break;
      case "dragenter":
      case "dragleave":
        fn = null;
        break;
      case "mouseover":
      case "mouseout":
        pn = null;
        break;
      case "pointerover":
      case "pointerout":
        Qr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gr.delete(n.pointerId);
    }
  }
  function Kr(e, n, s, a, d, h) {
    return e === null || e.nativeEvent !== h ? (e = { blockedOn: n, domEventName: s, eventSystemFlags: a, nativeEvent: h, targetContainers: [d] }, n !== null && (n = cs(n), n !== null && Vi(n)), e) : (e.eventSystemFlags |= a, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function pg(e, n, s, a, d) {
    switch (n) {
      case "focusin":
        return dn = Kr(dn, e, n, s, a, d), !0;
      case "dragenter":
        return fn = Kr(fn, e, n, s, a, d), !0;
      case "mouseover":
        return pn = Kr(pn, e, n, s, a, d), !0;
      case "pointerover":
        var h = d.pointerId;
        return Qr.set(h, Kr(Qr.get(h) || null, e, n, s, a, d)), !0;
      case "gotpointercapture":
        return h = d.pointerId, Gr.set(h, Kr(Gr.get(h) || null, e, n, s, a, d)), !0;
    }
    return !1;
  }
  function au(e) {
    var n = Fn(e.target);
    if (n !== null) {
      var s = $n(n);
      if (s !== null) {
        if (n = s.tag, n === 13) {
          if (n = Yc(s), n !== null) {
            e.blockedOn = n, ou(e.priority, function() {
              ru(s);
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
        Mi = a, s.target.dispatchEvent(a), Mi = null;
      } else return n = cs(s), n !== null && Vi(n), e.blockedOn = s, !1;
      n.shift();
    }
    return !0;
  }
  function lu(e, n, s) {
    Ks(e) && s.delete(n);
  }
  function hg() {
    Yi = !1, dn !== null && Ks(dn) && (dn = null), fn !== null && Ks(fn) && (fn = null), pn !== null && Ks(pn) && (pn = null), Qr.forEach(lu), Gr.forEach(lu);
  }
  function qr(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Yi || (Yi = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, hg)));
  }
  function Xr(e) {
    function n(d) {
      return qr(d, e);
    }
    if (0 < Gs.length) {
      qr(Gs[0], e);
      for (var s = 1; s < Gs.length; s++) {
        var a = Gs[s];
        a.blockedOn === e && (a.blockedOn = null);
      }
    }
    for (dn !== null && qr(dn, e), fn !== null && qr(fn, e), pn !== null && qr(pn, e), Qr.forEach(n), Gr.forEach(n), s = 0; s < hn.length; s++) a = hn[s], a.blockedOn === e && (a.blockedOn = null);
    for (; 0 < hn.length && (s = hn[0], s.blockedOn === null); ) au(s), s.blockedOn === null && hn.shift();
  }
  var ar = $.ReactCurrentBatchConfig, qs = !0;
  function mg(e, n, s, a) {
    var d = _e, h = ar.transition;
    ar.transition = null;
    try {
      _e = 1, Qi(e, n, s, a);
    } finally {
      _e = d, ar.transition = h;
    }
  }
  function gg(e, n, s, a) {
    var d = _e, h = ar.transition;
    ar.transition = null;
    try {
      _e = 4, Qi(e, n, s, a);
    } finally {
      _e = d, ar.transition = h;
    }
  }
  function Qi(e, n, s, a) {
    if (qs) {
      var d = Gi(e, n, s, a);
      if (d === null) da(e, n, a, Xs, s), iu(e, a);
      else if (pg(d, e, n, s, a)) a.stopPropagation();
      else if (iu(e, a), n & 4 && -1 < fg.indexOf(e)) {
        for (; d !== null; ) {
          var h = cs(d);
          if (h !== null && nu(h), h = Gi(e, n, s, a), h === null && da(e, n, a, Xs, s), h === d) break;
          d = h;
        }
        d !== null && a.stopPropagation();
      } else da(e, n, a, null, s);
    }
  }
  var Xs = null;
  function Gi(e, n, s, a) {
    if (Xs = null, e = Ii(a), e = Fn(e), e !== null) if (n = $n(e), n === null) e = null;
    else if (s = n.tag, s === 13) {
      if (e = Yc(n), e !== null) return e;
      e = null;
    } else if (s === 3) {
      if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
      e = null;
    } else n !== e && (e = null);
    return Xs = e, null;
  }
  function cu(e) {
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
        switch (rg()) {
          case zi:
            return 1;
          case Zc:
            return 4;
          case Ws:
          case sg:
            return 16;
          case Jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var mn = null, Ki = null, Zs = null;
  function uu() {
    if (Zs) return Zs;
    var e, n = Ki, s = n.length, a, d = "value" in mn ? mn.value : mn.textContent, h = d.length;
    for (e = 0; e < s && n[e] === d[e]; e++) ;
    var v = s - e;
    for (a = 1; a <= v && n[s - a] === d[h - a]; a++) ;
    return Zs = d.slice(e, 1 < a ? 1 - a : void 0);
  }
  function Js(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function eo() {
    return !0;
  }
  function du() {
    return !1;
  }
  function pt(e) {
    function n(s, a, d, h, v) {
      this._reactName = s, this._targetInst = d, this.type = a, this.nativeEvent = h, this.target = v, this.currentTarget = null;
      for (var N in e) e.hasOwnProperty(N) && (s = e[N], this[N] = s ? s(h) : h[N]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? eo : du, this.isPropagationStopped = du, this;
    }
    return X(n.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var s = this.nativeEvent;
      s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = eo);
    }, stopPropagation: function() {
      var s = this.nativeEvent;
      s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = eo);
    }, persist: function() {
    }, isPersistent: eo }), n;
  }
  var lr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, qi = pt(lr), Zr = X({}, lr, { view: 0, detail: 0 }), yg = pt(Zr), Xi, Zi, Jr, to = X({}, Zr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ea, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Jr && (Jr && e.type === "mousemove" ? (Xi = e.screenX - Jr.screenX, Zi = e.screenY - Jr.screenY) : Zi = Xi = 0, Jr = e), Xi);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Zi;
  } }), fu = pt(to), vg = X({}, to, { dataTransfer: 0 }), xg = pt(vg), wg = X({}, Zr, { relatedTarget: 0 }), Ji = pt(wg), bg = X({}, lr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), kg = pt(bg), jg = X({}, lr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Ng = pt(jg), Sg = X({}, lr, { data: 0 }), pu = pt(Sg), _g = {
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
  }, Cg = {
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
  }, Pg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Eg(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Pg[e]) ? !!n[e] : !1;
  }
  function ea() {
    return Eg;
  }
  var Rg = X({}, Zr, { key: function(e) {
    if (e.key) {
      var n = _g[e.key] || e.key;
      if (n !== "Unidentified") return n;
    }
    return e.type === "keypress" ? (e = Js(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cg[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ea, charCode: function(e) {
    return e.type === "keypress" ? Js(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Js(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Tg = pt(Rg), Ag = X({}, to, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), hu = pt(Ag), Lg = X({}, Zr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ea }), Og = pt(Lg), Mg = X({}, lr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ig = pt(Mg), $g = X({}, to, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Fg = pt($g), Dg = [9, 13, 27, 32], ta = p && "CompositionEvent" in window, es = null;
  p && "documentMode" in document && (es = document.documentMode);
  var Bg = p && "TextEvent" in window && !es, mu = p && (!ta || es && 8 < es && 11 >= es), gu = " ", yu = !1;
  function vu(e, n) {
    switch (e) {
      case "keyup":
        return Dg.indexOf(n.keyCode) !== -1;
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
  function xu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var cr = !1;
  function zg(e, n) {
    switch (e) {
      case "compositionend":
        return xu(n);
      case "keypress":
        return n.which !== 32 ? null : (yu = !0, gu);
      case "textInput":
        return e = n.data, e === gu && yu ? null : e;
      default:
        return null;
    }
  }
  function Ug(e, n) {
    if (cr) return e === "compositionend" || !ta && vu(e, n) ? (e = uu(), Zs = Ki = mn = null, cr = !1, e) : null;
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
        return mu && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Wg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function wu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Wg[e.type] : n === "textarea";
  }
  function bu(e, n, s, a) {
    zc(a), n = io(n, "onChange"), 0 < n.length && (s = new qi("onChange", "change", null, s, a), e.push({ event: s, listeners: n }));
  }
  var ts = null, ns = null;
  function Hg(e) {
    Du(e, 0);
  }
  function no(e) {
    var n = hr(e);
    if (Ds(n)) return e;
  }
  function Vg(e, n) {
    if (e === "change") return n;
  }
  var ku = !1;
  if (p) {
    var na;
    if (p) {
      var ra = "oninput" in document;
      if (!ra) {
        var ju = document.createElement("div");
        ju.setAttribute("oninput", "return;"), ra = typeof ju.oninput == "function";
      }
      na = ra;
    } else na = !1;
    ku = na && (!document.documentMode || 9 < document.documentMode);
  }
  function Nu() {
    ts && (ts.detachEvent("onpropertychange", Su), ns = ts = null);
  }
  function Su(e) {
    if (e.propertyName === "value" && no(ns)) {
      var n = [];
      bu(n, ns, e, Ii(e)), Vc(Hg, n);
    }
  }
  function Yg(e, n, s) {
    e === "focusin" ? (Nu(), ts = n, ns = s, ts.attachEvent("onpropertychange", Su)) : e === "focusout" && Nu();
  }
  function Qg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return no(ns);
  }
  function Gg(e, n) {
    if (e === "click") return no(n);
  }
  function Kg(e, n) {
    if (e === "input" || e === "change") return no(n);
  }
  function qg(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Rt = typeof Object.is == "function" ? Object.is : qg;
  function rs(e, n) {
    if (Rt(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
    var s = Object.keys(e), a = Object.keys(n);
    if (s.length !== a.length) return !1;
    for (a = 0; a < s.length; a++) {
      var d = s[a];
      if (!m.call(n, d) || !Rt(e[d], n[d])) return !1;
    }
    return !0;
  }
  function _u(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Cu(e, n) {
    var s = _u(e);
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
      s = _u(s);
    }
  }
  function Pu(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Pu(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Eu() {
    for (var e = window, n = Kt(); n instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof n.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = n.contentWindow;
      else break;
      n = Kt(e.document);
    }
    return n;
  }
  function sa(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  function Xg(e) {
    var n = Eu(), s = e.focusedElem, a = e.selectionRange;
    if (n !== s && s && s.ownerDocument && Pu(s.ownerDocument.documentElement, s)) {
      if (a !== null && sa(s)) {
        if (n = a.start, e = a.end, e === void 0 && (e = n), "selectionStart" in s) s.selectionStart = n, s.selectionEnd = Math.min(e, s.value.length);
        else if (e = (n = s.ownerDocument || document) && n.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var d = s.textContent.length, h = Math.min(a.start, d);
          a = a.end === void 0 ? h : Math.min(a.end, d), !e.extend && h > a && (d = a, a = h, h = d), d = Cu(s, h);
          var v = Cu(
            s,
            a
          );
          d && v && (e.rangeCount !== 1 || e.anchorNode !== d.node || e.anchorOffset !== d.offset || e.focusNode !== v.node || e.focusOffset !== v.offset) && (n = n.createRange(), n.setStart(d.node, d.offset), e.removeAllRanges(), h > a ? (e.addRange(n), e.extend(v.node, v.offset)) : (n.setEnd(v.node, v.offset), e.addRange(n)));
        }
      }
      for (n = [], e = s; e = e.parentNode; ) e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof s.focus == "function" && s.focus(), s = 0; s < n.length; s++) e = n[s], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Zg = p && "documentMode" in document && 11 >= document.documentMode, ur = null, oa = null, ss = null, ia = !1;
  function Ru(e, n, s) {
    var a = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    ia || ur == null || ur !== Kt(a) || (a = ur, "selectionStart" in a && sa(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), ss && rs(ss, a) || (ss = a, a = io(oa, "onSelect"), 0 < a.length && (n = new qi("onSelect", "select", null, n, s), e.push({ event: n, listeners: a }), n.target = ur)));
  }
  function ro(e, n) {
    var s = {};
    return s[e.toLowerCase()] = n.toLowerCase(), s["Webkit" + e] = "webkit" + n, s["Moz" + e] = "moz" + n, s;
  }
  var dr = { animationend: ro("Animation", "AnimationEnd"), animationiteration: ro("Animation", "AnimationIteration"), animationstart: ro("Animation", "AnimationStart"), transitionend: ro("Transition", "TransitionEnd") }, aa = {}, Tu = {};
  p && (Tu = document.createElement("div").style, "AnimationEvent" in window || (delete dr.animationend.animation, delete dr.animationiteration.animation, delete dr.animationstart.animation), "TransitionEvent" in window || delete dr.transitionend.transition);
  function so(e) {
    if (aa[e]) return aa[e];
    if (!dr[e]) return e;
    var n = dr[e], s;
    for (s in n) if (n.hasOwnProperty(s) && s in Tu) return aa[e] = n[s];
    return e;
  }
  var Au = so("animationend"), Lu = so("animationiteration"), Ou = so("animationstart"), Mu = so("transitionend"), Iu = /* @__PURE__ */ new Map(), $u = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function gn(e, n) {
    Iu.set(e, n), u(n, [e]);
  }
  for (var la = 0; la < $u.length; la++) {
    var ca = $u[la], Jg = ca.toLowerCase(), ey = ca[0].toUpperCase() + ca.slice(1);
    gn(Jg, "on" + ey);
  }
  gn(Au, "onAnimationEnd"), gn(Lu, "onAnimationIteration"), gn(Ou, "onAnimationStart"), gn("dblclick", "onDoubleClick"), gn("focusin", "onFocus"), gn("focusout", "onBlur"), gn(Mu, "onTransitionEnd"), f("onMouseEnter", ["mouseout", "mouseover"]), f("onMouseLeave", ["mouseout", "mouseover"]), f("onPointerEnter", ["pointerout", "pointerover"]), f("onPointerLeave", ["pointerout", "pointerover"]), u("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), u("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), u("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), u("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), u("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), u("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var os = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ty = new Set("cancel close invalid load scroll toggle".split(" ").concat(os));
  function Fu(e, n, s) {
    var a = e.type || "unknown-event";
    e.currentTarget = s, Jm(a, n, void 0, e), e.currentTarget = null;
  }
  function Du(e, n) {
    n = (n & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var a = e[s], d = a.event;
      a = a.listeners;
      e: {
        var h = void 0;
        if (n) for (var v = a.length - 1; 0 <= v; v--) {
          var N = a[v], P = N.instance, I = N.currentTarget;
          if (N = N.listener, P !== h && d.isPropagationStopped()) break e;
          Fu(d, N, I), h = P;
        }
        else for (v = 0; v < a.length; v++) {
          if (N = a[v], P = N.instance, I = N.currentTarget, N = N.listener, P !== h && d.isPropagationStopped()) break e;
          Fu(d, N, I), h = P;
        }
      }
    }
    if (Us) throw e = Bi, Us = !1, Bi = null, e;
  }
  function Pe(e, n) {
    var s = n[ya];
    s === void 0 && (s = n[ya] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    s.has(a) || (Bu(n, e, 2, !1), s.add(a));
  }
  function ua(e, n, s) {
    var a = 0;
    n && (a |= 4), Bu(s, e, a, n);
  }
  var oo = "_reactListening" + Math.random().toString(36).slice(2);
  function is(e) {
    if (!e[oo]) {
      e[oo] = !0, i.forEach(function(s) {
        s !== "selectionchange" && (ty.has(s) || ua(s, !1, e), ua(s, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[oo] || (n[oo] = !0, ua("selectionchange", !1, n));
    }
  }
  function Bu(e, n, s, a) {
    switch (cu(n)) {
      case 1:
        var d = mg;
        break;
      case 4:
        d = gg;
        break;
      default:
        d = Qi;
    }
    s = d.bind(null, n, s, e), d = void 0, !Di || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), a ? d !== void 0 ? e.addEventListener(n, s, { capture: !0, passive: d }) : e.addEventListener(n, s, !0) : d !== void 0 ? e.addEventListener(n, s, { passive: d }) : e.addEventListener(n, s, !1);
  }
  function da(e, n, s, a, d) {
    var h = a;
    if ((n & 1) === 0 && (n & 2) === 0 && a !== null) e: for (; ; ) {
      if (a === null) return;
      var v = a.tag;
      if (v === 3 || v === 4) {
        var N = a.stateNode.containerInfo;
        if (N === d || N.nodeType === 8 && N.parentNode === d) break;
        if (v === 4) for (v = a.return; v !== null; ) {
          var P = v.tag;
          if ((P === 3 || P === 4) && (P = v.stateNode.containerInfo, P === d || P.nodeType === 8 && P.parentNode === d)) return;
          v = v.return;
        }
        for (; N !== null; ) {
          if (v = Fn(N), v === null) return;
          if (P = v.tag, P === 5 || P === 6) {
            a = h = v;
            continue e;
          }
          N = N.parentNode;
        }
      }
      a = a.return;
    }
    Vc(function() {
      var I = h, H = Ii(s), V = [];
      e: {
        var z = Iu.get(e);
        if (z !== void 0) {
          var te = qi, se = e;
          switch (e) {
            case "keypress":
              if (Js(s) === 0) break e;
            case "keydown":
            case "keyup":
              te = Tg;
              break;
            case "focusin":
              se = "focus", te = Ji;
              break;
            case "focusout":
              se = "blur", te = Ji;
              break;
            case "beforeblur":
            case "afterblur":
              te = Ji;
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
              te = fu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              te = xg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              te = Og;
              break;
            case Au:
            case Lu:
            case Ou:
              te = kg;
              break;
            case Mu:
              te = Ig;
              break;
            case "scroll":
              te = yg;
              break;
            case "wheel":
              te = Fg;
              break;
            case "copy":
            case "cut":
            case "paste":
              te = Ng;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              te = hu;
          }
          var ae = (n & 4) !== 0, Ie = !ae && e === "scroll", L = ae ? z !== null ? z + "Capture" : null : z;
          ae = [];
          for (var T = I, O; T !== null; ) {
            O = T;
            var q = O.stateNode;
            if (O.tag === 5 && q !== null && (O = q, L !== null && (q = Ur(T, L), q != null && ae.push(as(T, q, O)))), Ie) break;
            T = T.return;
          }
          0 < ae.length && (z = new te(z, se, null, s, H), V.push({ event: z, listeners: ae }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (z = e === "mouseover" || e === "pointerover", te = e === "mouseout" || e === "pointerout", z && s !== Mi && (se = s.relatedTarget || s.fromElement) && (Fn(se) || se[qt])) break e;
          if ((te || z) && (z = H.window === H ? H : (z = H.ownerDocument) ? z.defaultView || z.parentWindow : window, te ? (se = s.relatedTarget || s.toElement, te = I, se = se ? Fn(se) : null, se !== null && (Ie = $n(se), se !== Ie || se.tag !== 5 && se.tag !== 6) && (se = null)) : (te = null, se = I), te !== se)) {
            if (ae = fu, q = "onMouseLeave", L = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (ae = hu, q = "onPointerLeave", L = "onPointerEnter", T = "pointer"), Ie = te == null ? z : hr(te), O = se == null ? z : hr(se), z = new ae(q, T + "leave", te, s, H), z.target = Ie, z.relatedTarget = O, q = null, Fn(H) === I && (ae = new ae(L, T + "enter", se, s, H), ae.target = O, ae.relatedTarget = Ie, q = ae), Ie = q, te && se) t: {
              for (ae = te, L = se, T = 0, O = ae; O; O = fr(O)) T++;
              for (O = 0, q = L; q; q = fr(q)) O++;
              for (; 0 < T - O; ) ae = fr(ae), T--;
              for (; 0 < O - T; ) L = fr(L), O--;
              for (; T--; ) {
                if (ae === L || L !== null && ae === L.alternate) break t;
                ae = fr(ae), L = fr(L);
              }
              ae = null;
            }
            else ae = null;
            te !== null && zu(V, z, te, ae, !1), se !== null && Ie !== null && zu(V, Ie, se, ae, !0);
          }
        }
        e: {
          if (z = I ? hr(I) : window, te = z.nodeName && z.nodeName.toLowerCase(), te === "select" || te === "input" && z.type === "file") var ce = Vg;
          else if (wu(z)) if (ku) ce = Kg;
          else {
            ce = Qg;
            var de = Yg;
          }
          else (te = z.nodeName) && te.toLowerCase() === "input" && (z.type === "checkbox" || z.type === "radio") && (ce = Gg);
          if (ce && (ce = ce(e, I))) {
            bu(V, ce, s, H);
            break e;
          }
          de && de(e, z, I), e === "focusout" && (de = z._wrapperState) && de.controlled && z.type === "number" && Ri(z, "number", z.value);
        }
        switch (de = I ? hr(I) : window, e) {
          case "focusin":
            (wu(de) || de.contentEditable === "true") && (ur = de, oa = I, ss = null);
            break;
          case "focusout":
            ss = oa = ur = null;
            break;
          case "mousedown":
            ia = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ia = !1, Ru(V, s, H);
            break;
          case "selectionchange":
            if (Zg) break;
          case "keydown":
          case "keyup":
            Ru(V, s, H);
        }
        var fe;
        if (ta) e: {
          switch (e) {
            case "compositionstart":
              var ge = "onCompositionStart";
              break e;
            case "compositionend":
              ge = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ge = "onCompositionUpdate";
              break e;
          }
          ge = void 0;
        }
        else cr ? vu(e, s) && (ge = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (ge = "onCompositionStart");
        ge && (mu && s.locale !== "ko" && (cr || ge !== "onCompositionStart" ? ge === "onCompositionEnd" && cr && (fe = uu()) : (mn = H, Ki = "value" in mn ? mn.value : mn.textContent, cr = !0)), de = io(I, ge), 0 < de.length && (ge = new pu(ge, e, null, s, H), V.push({ event: ge, listeners: de }), fe ? ge.data = fe : (fe = xu(s), fe !== null && (ge.data = fe)))), (fe = Bg ? zg(e, s) : Ug(e, s)) && (I = io(I, "onBeforeInput"), 0 < I.length && (H = new pu("onBeforeInput", "beforeinput", null, s, H), V.push({ event: H, listeners: I }), H.data = fe));
      }
      Du(V, n);
    });
  }
  function as(e, n, s) {
    return { instance: e, listener: n, currentTarget: s };
  }
  function io(e, n) {
    for (var s = n + "Capture", a = []; e !== null; ) {
      var d = e, h = d.stateNode;
      d.tag === 5 && h !== null && (d = h, h = Ur(e, s), h != null && a.unshift(as(e, h, d)), h = Ur(e, n), h != null && a.push(as(e, h, d))), e = e.return;
    }
    return a;
  }
  function fr(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function zu(e, n, s, a, d) {
    for (var h = n._reactName, v = []; s !== null && s !== a; ) {
      var N = s, P = N.alternate, I = N.stateNode;
      if (P !== null && P === a) break;
      N.tag === 5 && I !== null && (N = I, d ? (P = Ur(s, h), P != null && v.unshift(as(s, P, N))) : d || (P = Ur(s, h), P != null && v.push(as(s, P, N)))), s = s.return;
    }
    v.length !== 0 && e.push({ event: n, listeners: v });
  }
  var ny = /\r\n?/g, ry = /\u0000|\uFFFD/g;
  function Uu(e) {
    return (typeof e == "string" ? e : "" + e).replace(ny, `
`).replace(ry, "");
  }
  function ao(e, n, s) {
    if (n = Uu(n), Uu(e) !== n && s) throw Error(o(425));
  }
  function lo() {
  }
  var fa = null, pa = null;
  function ha(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var ma = typeof setTimeout == "function" ? setTimeout : void 0, sy = typeof clearTimeout == "function" ? clearTimeout : void 0, Wu = typeof Promise == "function" ? Promise : void 0, oy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Wu < "u" ? function(e) {
    return Wu.resolve(null).then(e).catch(iy);
  } : ma;
  function iy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ga(e, n) {
    var s = n, a = 0;
    do {
      var d = s.nextSibling;
      if (e.removeChild(s), d && d.nodeType === 8) if (s = d.data, s === "/$") {
        if (a === 0) {
          e.removeChild(d), Xr(n);
          return;
        }
        a--;
      } else s !== "$" && s !== "$?" && s !== "$!" || a++;
      s = d;
    } while (s);
    Xr(n);
  }
  function yn(e) {
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
  function Hu(e) {
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
  var pr = Math.random().toString(36).slice(2), Bt = "__reactFiber$" + pr, ls = "__reactProps$" + pr, qt = "__reactContainer$" + pr, ya = "__reactEvents$" + pr, ay = "__reactListeners$" + pr, ly = "__reactHandles$" + pr;
  function Fn(e) {
    var n = e[Bt];
    if (n) return n;
    for (var s = e.parentNode; s; ) {
      if (n = s[qt] || s[Bt]) {
        if (s = n.alternate, n.child !== null || s !== null && s.child !== null) for (e = Hu(e); e !== null; ) {
          if (s = e[Bt]) return s;
          e = Hu(e);
        }
        return n;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function cs(e) {
    return e = e[Bt] || e[qt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function hr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(o(33));
  }
  function co(e) {
    return e[ls] || null;
  }
  var va = [], mr = -1;
  function vn(e) {
    return { current: e };
  }
  function Ee(e) {
    0 > mr || (e.current = va[mr], va[mr] = null, mr--);
  }
  function Ce(e, n) {
    mr++, va[mr] = e.current, e.current = n;
  }
  var xn = {}, Je = vn(xn), ot = vn(!1), Dn = xn;
  function gr(e, n) {
    var s = e.type.contextTypes;
    if (!s) return xn;
    var a = e.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === n) return a.__reactInternalMemoizedMaskedChildContext;
    var d = {}, h;
    for (h in s) d[h] = n[h];
    return a && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = d), d;
  }
  function it(e) {
    return e = e.childContextTypes, e != null;
  }
  function uo() {
    Ee(ot), Ee(Je);
  }
  function Vu(e, n, s) {
    if (Je.current !== xn) throw Error(o(168));
    Ce(Je, n), Ce(ot, s);
  }
  function Yu(e, n, s) {
    var a = e.stateNode;
    if (n = n.childContextTypes, typeof a.getChildContext != "function") return s;
    a = a.getChildContext();
    for (var d in a) if (!(d in n)) throw Error(o(108, ve(e) || "Unknown", d));
    return X({}, s, a);
  }
  function fo(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || xn, Dn = Je.current, Ce(Je, e), Ce(ot, ot.current), !0;
  }
  function Qu(e, n, s) {
    var a = e.stateNode;
    if (!a) throw Error(o(169));
    s ? (e = Yu(e, n, Dn), a.__reactInternalMemoizedMergedChildContext = e, Ee(ot), Ee(Je), Ce(Je, e)) : Ee(ot), Ce(ot, s);
  }
  var Xt = null, po = !1, xa = !1;
  function Gu(e) {
    Xt === null ? Xt = [e] : Xt.push(e);
  }
  function cy(e) {
    po = !0, Gu(e);
  }
  function wn() {
    if (!xa && Xt !== null) {
      xa = !0;
      var e = 0, n = _e;
      try {
        var s = Xt;
        for (_e = 1; e < s.length; e++) {
          var a = s[e];
          do
            a = a(!0);
          while (a !== null);
        }
        Xt = null, po = !1;
      } catch (d) {
        throw Xt !== null && (Xt = Xt.slice(e + 1)), qc(zi, wn), d;
      } finally {
        _e = n, xa = !1;
      }
    }
    return null;
  }
  var yr = [], vr = 0, ho = null, mo = 0, kt = [], jt = 0, Bn = null, Zt = 1, Jt = "";
  function zn(e, n) {
    yr[vr++] = mo, yr[vr++] = ho, ho = e, mo = n;
  }
  function Ku(e, n, s) {
    kt[jt++] = Zt, kt[jt++] = Jt, kt[jt++] = Bn, Bn = e;
    var a = Zt;
    e = Jt;
    var d = 32 - Et(a) - 1;
    a &= ~(1 << d), s += 1;
    var h = 32 - Et(n) + d;
    if (30 < h) {
      var v = d - d % 5;
      h = (a & (1 << v) - 1).toString(32), a >>= v, d -= v, Zt = 1 << 32 - Et(n) + d | s << d | a, Jt = h + e;
    } else Zt = 1 << h | s << d | a, Jt = e;
  }
  function wa(e) {
    e.return !== null && (zn(e, 1), Ku(e, 1, 0));
  }
  function ba(e) {
    for (; e === ho; ) ho = yr[--vr], yr[vr] = null, mo = yr[--vr], yr[vr] = null;
    for (; e === Bn; ) Bn = kt[--jt], kt[jt] = null, Jt = kt[--jt], kt[jt] = null, Zt = kt[--jt], kt[jt] = null;
  }
  var ht = null, mt = null, Te = !1, Tt = null;
  function qu(e, n) {
    var s = Ct(5, null, null, 0);
    s.elementType = "DELETED", s.stateNode = n, s.return = e, n = e.deletions, n === null ? (e.deletions = [s], e.flags |= 16) : n.push(s);
  }
  function Xu(e, n) {
    switch (e.tag) {
      case 5:
        var s = e.type;
        return n = n.nodeType !== 1 || s.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, ht = e, mt = yn(n.firstChild), !0) : !1;
      case 6:
        return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, ht = e, mt = null, !0) : !1;
      case 13:
        return n = n.nodeType !== 8 ? null : n, n !== null ? (s = Bn !== null ? { id: Zt, overflow: Jt } : null, e.memoizedState = { dehydrated: n, treeContext: s, retryLane: 1073741824 }, s = Ct(18, null, null, 0), s.stateNode = n, s.return = e, e.child = s, ht = e, mt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ka(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ja(e) {
    if (Te) {
      var n = mt;
      if (n) {
        var s = n;
        if (!Xu(e, n)) {
          if (ka(e)) throw Error(o(418));
          n = yn(s.nextSibling);
          var a = ht;
          n && Xu(e, n) ? qu(a, s) : (e.flags = e.flags & -4097 | 2, Te = !1, ht = e);
        }
      } else {
        if (ka(e)) throw Error(o(418));
        e.flags = e.flags & -4097 | 2, Te = !1, ht = e;
      }
    }
  }
  function Zu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ht = e;
  }
  function go(e) {
    if (e !== ht) return !1;
    if (!Te) return Zu(e), Te = !0, !1;
    var n;
    if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !ha(e.type, e.memoizedProps)), n && (n = mt)) {
      if (ka(e)) throw Ju(), Error(o(418));
      for (; n; ) qu(e, n), n = yn(n.nextSibling);
    }
    if (Zu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      e: {
        for (e = e.nextSibling, n = 0; e; ) {
          if (e.nodeType === 8) {
            var s = e.data;
            if (s === "/$") {
              if (n === 0) {
                mt = yn(e.nextSibling);
                break e;
              }
              n--;
            } else s !== "$" && s !== "$!" && s !== "$?" || n++;
          }
          e = e.nextSibling;
        }
        mt = null;
      }
    } else mt = ht ? yn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ju() {
    for (var e = mt; e; ) e = yn(e.nextSibling);
  }
  function xr() {
    mt = ht = null, Te = !1;
  }
  function Na(e) {
    Tt === null ? Tt = [e] : Tt.push(e);
  }
  var uy = $.ReactCurrentBatchConfig;
  function us(e, n, s) {
    if (e = s.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (s._owner) {
        if (s = s._owner, s) {
          if (s.tag !== 1) throw Error(o(309));
          var a = s.stateNode;
        }
        if (!a) throw Error(o(147, e));
        var d = a, h = "" + e;
        return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === h ? n.ref : (n = function(v) {
          var N = d.refs;
          v === null ? delete N[h] : N[h] = v;
        }, n._stringRef = h, n);
      }
      if (typeof e != "string") throw Error(o(284));
      if (!s._owner) throw Error(o(290, e));
    }
    return e;
  }
  function yo(e, n) {
    throw e = Object.prototype.toString.call(n), Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
  }
  function ed(e) {
    var n = e._init;
    return n(e._payload);
  }
  function td(e) {
    function n(L, T) {
      if (e) {
        var O = L.deletions;
        O === null ? (L.deletions = [T], L.flags |= 16) : O.push(T);
      }
    }
    function s(L, T) {
      if (!e) return null;
      for (; T !== null; ) n(L, T), T = T.sibling;
      return null;
    }
    function a(L, T) {
      for (L = /* @__PURE__ */ new Map(); T !== null; ) T.key !== null ? L.set(T.key, T) : L.set(T.index, T), T = T.sibling;
      return L;
    }
    function d(L, T) {
      return L = Pn(L, T), L.index = 0, L.sibling = null, L;
    }
    function h(L, T, O) {
      return L.index = O, e ? (O = L.alternate, O !== null ? (O = O.index, O < T ? (L.flags |= 2, T) : O) : (L.flags |= 2, T)) : (L.flags |= 1048576, T);
    }
    function v(L) {
      return e && L.alternate === null && (L.flags |= 2), L;
    }
    function N(L, T, O, q) {
      return T === null || T.tag !== 6 ? (T = ml(O, L.mode, q), T.return = L, T) : (T = d(T, O), T.return = L, T);
    }
    function P(L, T, O, q) {
      var ce = O.type;
      return ce === W ? H(L, T, O.props.children, q, O.key) : T !== null && (T.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === U && ed(ce) === T.type) ? (q = d(T, O.props), q.ref = us(L, T, O), q.return = L, q) : (q = zo(O.type, O.key, O.props, null, L.mode, q), q.ref = us(L, T, O), q.return = L, q);
    }
    function I(L, T, O, q) {
      return T === null || T.tag !== 4 || T.stateNode.containerInfo !== O.containerInfo || T.stateNode.implementation !== O.implementation ? (T = gl(O, L.mode, q), T.return = L, T) : (T = d(T, O.children || []), T.return = L, T);
    }
    function H(L, T, O, q, ce) {
      return T === null || T.tag !== 7 ? (T = Kn(O, L.mode, q, ce), T.return = L, T) : (T = d(T, O), T.return = L, T);
    }
    function V(L, T, O) {
      if (typeof T == "string" && T !== "" || typeof T == "number") return T = ml("" + T, L.mode, O), T.return = L, T;
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case G:
            return O = zo(T.type, T.key, T.props, null, L.mode, O), O.ref = us(L, null, T), O.return = L, O;
          case Y:
            return T = gl(T, L.mode, O), T.return = L, T;
          case U:
            var q = T._init;
            return V(L, q(T._payload), O);
        }
        if (Dr(T) || Z(T)) return T = Kn(T, L.mode, O, null), T.return = L, T;
        yo(L, T);
      }
      return null;
    }
    function z(L, T, O, q) {
      var ce = T !== null ? T.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number") return ce !== null ? null : N(L, T, "" + O, q);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case G:
            return O.key === ce ? P(L, T, O, q) : null;
          case Y:
            return O.key === ce ? I(L, T, O, q) : null;
          case U:
            return ce = O._init, z(
              L,
              T,
              ce(O._payload),
              q
            );
        }
        if (Dr(O) || Z(O)) return ce !== null ? null : H(L, T, O, q, null);
        yo(L, O);
      }
      return null;
    }
    function te(L, T, O, q, ce) {
      if (typeof q == "string" && q !== "" || typeof q == "number") return L = L.get(O) || null, N(T, L, "" + q, ce);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case G:
            return L = L.get(q.key === null ? O : q.key) || null, P(T, L, q, ce);
          case Y:
            return L = L.get(q.key === null ? O : q.key) || null, I(T, L, q, ce);
          case U:
            var de = q._init;
            return te(L, T, O, de(q._payload), ce);
        }
        if (Dr(q) || Z(q)) return L = L.get(O) || null, H(T, L, q, ce, null);
        yo(T, q);
      }
      return null;
    }
    function se(L, T, O, q) {
      for (var ce = null, de = null, fe = T, ge = T = 0, Qe = null; fe !== null && ge < O.length; ge++) {
        fe.index > ge ? (Qe = fe, fe = null) : Qe = fe.sibling;
        var Se = z(L, fe, O[ge], q);
        if (Se === null) {
          fe === null && (fe = Qe);
          break;
        }
        e && fe && Se.alternate === null && n(L, fe), T = h(Se, T, ge), de === null ? ce = Se : de.sibling = Se, de = Se, fe = Qe;
      }
      if (ge === O.length) return s(L, fe), Te && zn(L, ge), ce;
      if (fe === null) {
        for (; ge < O.length; ge++) fe = V(L, O[ge], q), fe !== null && (T = h(fe, T, ge), de === null ? ce = fe : de.sibling = fe, de = fe);
        return Te && zn(L, ge), ce;
      }
      for (fe = a(L, fe); ge < O.length; ge++) Qe = te(fe, L, ge, O[ge], q), Qe !== null && (e && Qe.alternate !== null && fe.delete(Qe.key === null ? ge : Qe.key), T = h(Qe, T, ge), de === null ? ce = Qe : de.sibling = Qe, de = Qe);
      return e && fe.forEach(function(En) {
        return n(L, En);
      }), Te && zn(L, ge), ce;
    }
    function ae(L, T, O, q) {
      var ce = Z(O);
      if (typeof ce != "function") throw Error(o(150));
      if (O = ce.call(O), O == null) throw Error(o(151));
      for (var de = ce = null, fe = T, ge = T = 0, Qe = null, Se = O.next(); fe !== null && !Se.done; ge++, Se = O.next()) {
        fe.index > ge ? (Qe = fe, fe = null) : Qe = fe.sibling;
        var En = z(L, fe, Se.value, q);
        if (En === null) {
          fe === null && (fe = Qe);
          break;
        }
        e && fe && En.alternate === null && n(L, fe), T = h(En, T, ge), de === null ? ce = En : de.sibling = En, de = En, fe = Qe;
      }
      if (Se.done) return s(
        L,
        fe
      ), Te && zn(L, ge), ce;
      if (fe === null) {
        for (; !Se.done; ge++, Se = O.next()) Se = V(L, Se.value, q), Se !== null && (T = h(Se, T, ge), de === null ? ce = Se : de.sibling = Se, de = Se);
        return Te && zn(L, ge), ce;
      }
      for (fe = a(L, fe); !Se.done; ge++, Se = O.next()) Se = te(fe, L, ge, Se.value, q), Se !== null && (e && Se.alternate !== null && fe.delete(Se.key === null ? ge : Se.key), T = h(Se, T, ge), de === null ? ce = Se : de.sibling = Se, de = Se);
      return e && fe.forEach(function(Wy) {
        return n(L, Wy);
      }), Te && zn(L, ge), ce;
    }
    function Ie(L, T, O, q) {
      if (typeof O == "object" && O !== null && O.type === W && O.key === null && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case G:
            e: {
              for (var ce = O.key, de = T; de !== null; ) {
                if (de.key === ce) {
                  if (ce = O.type, ce === W) {
                    if (de.tag === 7) {
                      s(L, de.sibling), T = d(de, O.props.children), T.return = L, L = T;
                      break e;
                    }
                  } else if (de.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === U && ed(ce) === de.type) {
                    s(L, de.sibling), T = d(de, O.props), T.ref = us(L, de, O), T.return = L, L = T;
                    break e;
                  }
                  s(L, de);
                  break;
                } else n(L, de);
                de = de.sibling;
              }
              O.type === W ? (T = Kn(O.props.children, L.mode, q, O.key), T.return = L, L = T) : (q = zo(O.type, O.key, O.props, null, L.mode, q), q.ref = us(L, T, O), q.return = L, L = q);
            }
            return v(L);
          case Y:
            e: {
              for (de = O.key; T !== null; ) {
                if (T.key === de) if (T.tag === 4 && T.stateNode.containerInfo === O.containerInfo && T.stateNode.implementation === O.implementation) {
                  s(L, T.sibling), T = d(T, O.children || []), T.return = L, L = T;
                  break e;
                } else {
                  s(L, T);
                  break;
                }
                else n(L, T);
                T = T.sibling;
              }
              T = gl(O, L.mode, q), T.return = L, L = T;
            }
            return v(L);
          case U:
            return de = O._init, Ie(L, T, de(O._payload), q);
        }
        if (Dr(O)) return se(L, T, O, q);
        if (Z(O)) return ae(L, T, O, q);
        yo(L, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" ? (O = "" + O, T !== null && T.tag === 6 ? (s(L, T.sibling), T = d(T, O), T.return = L, L = T) : (s(L, T), T = ml(O, L.mode, q), T.return = L, L = T), v(L)) : s(L, T);
    }
    return Ie;
  }
  var wr = td(!0), nd = td(!1), vo = vn(null), xo = null, br = null, Sa = null;
  function _a() {
    Sa = br = xo = null;
  }
  function Ca(e) {
    var n = vo.current;
    Ee(vo), e._currentValue = n;
  }
  function Pa(e, n, s) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, a !== null && (a.childLanes |= n)) : a !== null && (a.childLanes & n) !== n && (a.childLanes |= n), e === s) break;
      e = e.return;
    }
  }
  function kr(e, n) {
    xo = e, Sa = br = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & n) !== 0 && (at = !0), e.firstContext = null);
  }
  function Nt(e) {
    var n = e._currentValue;
    if (Sa !== e) if (e = { context: e, memoizedValue: n, next: null }, br === null) {
      if (xo === null) throw Error(o(308));
      br = e, xo.dependencies = { lanes: 0, firstContext: e };
    } else br = br.next = e;
    return n;
  }
  var Un = null;
  function Ea(e) {
    Un === null ? Un = [e] : Un.push(e);
  }
  function rd(e, n, s, a) {
    var d = n.interleaved;
    return d === null ? (s.next = s, Ea(n)) : (s.next = d.next, d.next = s), n.interleaved = s, en(e, a);
  }
  function en(e, n) {
    e.lanes |= n;
    var s = e.alternate;
    for (s !== null && (s.lanes |= n), s = e, e = e.return; e !== null; ) e.childLanes |= n, s = e.alternate, s !== null && (s.childLanes |= n), s = e, e = e.return;
    return s.tag === 3 ? s.stateNode : null;
  }
  var bn = !1;
  function Ra(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function sd(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function tn(e, n) {
    return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
  }
  function kn(e, n, s) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Ne & 2) !== 0) {
      var d = a.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), a.pending = n, en(e, s);
    }
    return d = a.interleaved, d === null ? (n.next = n, Ea(a)) : (n.next = d.next, d.next = n), a.interleaved = n, en(e, s);
  }
  function wo(e, n, s) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (s & 4194240) !== 0)) {
      var a = n.lanes;
      a &= e.pendingLanes, s |= a, n.lanes = s, Hi(e, s);
    }
  }
  function od(e, n) {
    var s = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, s === a)) {
      var d = null, h = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var v = { eventTime: s.eventTime, lane: s.lane, tag: s.tag, payload: s.payload, callback: s.callback, next: null };
          h === null ? d = h = v : h = h.next = v, s = s.next;
        } while (s !== null);
        h === null ? d = h = n : h = h.next = n;
      } else d = h = n;
      s = { baseState: a.baseState, firstBaseUpdate: d, lastBaseUpdate: h, shared: a.shared, effects: a.effects }, e.updateQueue = s;
      return;
    }
    e = s.lastBaseUpdate, e === null ? s.firstBaseUpdate = n : e.next = n, s.lastBaseUpdate = n;
  }
  function bo(e, n, s, a) {
    var d = e.updateQueue;
    bn = !1;
    var h = d.firstBaseUpdate, v = d.lastBaseUpdate, N = d.shared.pending;
    if (N !== null) {
      d.shared.pending = null;
      var P = N, I = P.next;
      P.next = null, v === null ? h = I : v.next = I, v = P;
      var H = e.alternate;
      H !== null && (H = H.updateQueue, N = H.lastBaseUpdate, N !== v && (N === null ? H.firstBaseUpdate = I : N.next = I, H.lastBaseUpdate = P));
    }
    if (h !== null) {
      var V = d.baseState;
      v = 0, H = I = P = null, N = h;
      do {
        var z = N.lane, te = N.eventTime;
        if ((a & z) === z) {
          H !== null && (H = H.next = {
            eventTime: te,
            lane: 0,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null
          });
          e: {
            var se = e, ae = N;
            switch (z = n, te = s, ae.tag) {
              case 1:
                if (se = ae.payload, typeof se == "function") {
                  V = se.call(te, V, z);
                  break e;
                }
                V = se;
                break e;
              case 3:
                se.flags = se.flags & -65537 | 128;
              case 0:
                if (se = ae.payload, z = typeof se == "function" ? se.call(te, V, z) : se, z == null) break e;
                V = X({}, V, z);
                break e;
              case 2:
                bn = !0;
            }
          }
          N.callback !== null && N.lane !== 0 && (e.flags |= 64, z = d.effects, z === null ? d.effects = [N] : z.push(N));
        } else te = { eventTime: te, lane: z, tag: N.tag, payload: N.payload, callback: N.callback, next: null }, H === null ? (I = H = te, P = V) : H = H.next = te, v |= z;
        if (N = N.next, N === null) {
          if (N = d.shared.pending, N === null) break;
          z = N, N = z.next, z.next = null, d.lastBaseUpdate = z, d.shared.pending = null;
        }
      } while (!0);
      if (H === null && (P = V), d.baseState = P, d.firstBaseUpdate = I, d.lastBaseUpdate = H, n = d.shared.interleaved, n !== null) {
        d = n;
        do
          v |= d.lane, d = d.next;
        while (d !== n);
      } else h === null && (d.shared.lanes = 0);
      Vn |= v, e.lanes = v, e.memoizedState = V;
    }
  }
  function id(e, n, s) {
    if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
      var a = e[n], d = a.callback;
      if (d !== null) {
        if (a.callback = null, a = s, typeof d != "function") throw Error(o(191, d));
        d.call(a);
      }
    }
  }
  var ds = {}, zt = vn(ds), fs = vn(ds), ps = vn(ds);
  function Wn(e) {
    if (e === ds) throw Error(o(174));
    return e;
  }
  function Ta(e, n) {
    switch (Ce(ps, n), Ce(fs, e), Ce(zt, ds), e = n.nodeType, e) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : Ai(null, "");
        break;
      default:
        e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = Ai(n, e);
    }
    Ee(zt), Ce(zt, n);
  }
  function jr() {
    Ee(zt), Ee(fs), Ee(ps);
  }
  function ad(e) {
    Wn(ps.current);
    var n = Wn(zt.current), s = Ai(n, e.type);
    n !== s && (Ce(fs, e), Ce(zt, s));
  }
  function Aa(e) {
    fs.current === e && (Ee(zt), Ee(fs));
  }
  var Ae = vn(0);
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
  var La = [];
  function Oa() {
    for (var e = 0; e < La.length; e++) La[e]._workInProgressVersionPrimary = null;
    La.length = 0;
  }
  var jo = $.ReactCurrentDispatcher, Ma = $.ReactCurrentBatchConfig, Hn = 0, Le = null, Ue = null, Ve = null, No = !1, hs = !1, ms = 0, dy = 0;
  function et() {
    throw Error(o(321));
  }
  function Ia(e, n) {
    if (n === null) return !1;
    for (var s = 0; s < n.length && s < e.length; s++) if (!Rt(e[s], n[s])) return !1;
    return !0;
  }
  function $a(e, n, s, a, d, h) {
    if (Hn = h, Le = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, jo.current = e === null || e.memoizedState === null ? my : gy, e = s(a, d), hs) {
      h = 0;
      do {
        if (hs = !1, ms = 0, 25 <= h) throw Error(o(301));
        h += 1, Ve = Ue = null, n.updateQueue = null, jo.current = yy, e = s(a, d);
      } while (hs);
    }
    if (jo.current = Co, n = Ue !== null && Ue.next !== null, Hn = 0, Ve = Ue = Le = null, No = !1, n) throw Error(o(300));
    return e;
  }
  function Fa() {
    var e = ms !== 0;
    return ms = 0, e;
  }
  function Ut() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ve === null ? Le.memoizedState = Ve = e : Ve = Ve.next = e, Ve;
  }
  function St() {
    if (Ue === null) {
      var e = Le.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ue.next;
    var n = Ve === null ? Le.memoizedState : Ve.next;
    if (n !== null) Ve = n, Ue = e;
    else {
      if (e === null) throw Error(o(310));
      Ue = e, e = { memoizedState: Ue.memoizedState, baseState: Ue.baseState, baseQueue: Ue.baseQueue, queue: Ue.queue, next: null }, Ve === null ? Le.memoizedState = Ve = e : Ve = Ve.next = e;
    }
    return Ve;
  }
  function gs(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Da(e) {
    var n = St(), s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = e;
    var a = Ue, d = a.baseQueue, h = s.pending;
    if (h !== null) {
      if (d !== null) {
        var v = d.next;
        d.next = h.next, h.next = v;
      }
      a.baseQueue = d = h, s.pending = null;
    }
    if (d !== null) {
      h = d.next, a = a.baseState;
      var N = v = null, P = null, I = h;
      do {
        var H = I.lane;
        if ((Hn & H) === H) P !== null && (P = P.next = { lane: 0, action: I.action, hasEagerState: I.hasEagerState, eagerState: I.eagerState, next: null }), a = I.hasEagerState ? I.eagerState : e(a, I.action);
        else {
          var V = {
            lane: H,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          };
          P === null ? (N = P = V, v = a) : P = P.next = V, Le.lanes |= H, Vn |= H;
        }
        I = I.next;
      } while (I !== null && I !== h);
      P === null ? v = a : P.next = N, Rt(a, n.memoizedState) || (at = !0), n.memoizedState = a, n.baseState = v, n.baseQueue = P, s.lastRenderedState = a;
    }
    if (e = s.interleaved, e !== null) {
      d = e;
      do
        h = d.lane, Le.lanes |= h, Vn |= h, d = d.next;
      while (d !== e);
    } else d === null && (s.lanes = 0);
    return [n.memoizedState, s.dispatch];
  }
  function Ba(e) {
    var n = St(), s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = e;
    var a = s.dispatch, d = s.pending, h = n.memoizedState;
    if (d !== null) {
      s.pending = null;
      var v = d = d.next;
      do
        h = e(h, v.action), v = v.next;
      while (v !== d);
      Rt(h, n.memoizedState) || (at = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), s.lastRenderedState = h;
    }
    return [h, a];
  }
  function ld() {
  }
  function cd(e, n) {
    var s = Le, a = St(), d = n(), h = !Rt(a.memoizedState, d);
    if (h && (a.memoizedState = d, at = !0), a = a.queue, za(fd.bind(null, s, a, e), [e]), a.getSnapshot !== n || h || Ve !== null && Ve.memoizedState.tag & 1) {
      if (s.flags |= 2048, ys(9, dd.bind(null, s, a, d, n), void 0, null), Ye === null) throw Error(o(349));
      (Hn & 30) !== 0 || ud(s, n, d);
    }
    return d;
  }
  function ud(e, n, s) {
    e.flags |= 16384, e = { getSnapshot: n, value: s }, n = Le.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Le.updateQueue = n, n.stores = [e]) : (s = n.stores, s === null ? n.stores = [e] : s.push(e));
  }
  function dd(e, n, s, a) {
    n.value = s, n.getSnapshot = a, pd(n) && hd(e);
  }
  function fd(e, n, s) {
    return s(function() {
      pd(n) && hd(e);
    });
  }
  function pd(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var s = n();
      return !Rt(e, s);
    } catch {
      return !0;
    }
  }
  function hd(e) {
    var n = en(e, 1);
    n !== null && Mt(n, e, 1, -1);
  }
  function md(e) {
    var n = Ut();
    return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: gs, lastRenderedState: e }, n.queue = e, e = e.dispatch = hy.bind(null, Le, e), [n.memoizedState, e];
  }
  function ys(e, n, s, a) {
    return e = { tag: e, create: n, destroy: s, deps: a, next: null }, n = Le.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Le.updateQueue = n, n.lastEffect = e.next = e) : (s = n.lastEffect, s === null ? n.lastEffect = e.next = e : (a = s.next, s.next = e, e.next = a, n.lastEffect = e)), e;
  }
  function gd() {
    return St().memoizedState;
  }
  function So(e, n, s, a) {
    var d = Ut();
    Le.flags |= e, d.memoizedState = ys(1 | n, s, void 0, a === void 0 ? null : a);
  }
  function _o(e, n, s, a) {
    var d = St();
    a = a === void 0 ? null : a;
    var h = void 0;
    if (Ue !== null) {
      var v = Ue.memoizedState;
      if (h = v.destroy, a !== null && Ia(a, v.deps)) {
        d.memoizedState = ys(n, s, h, a);
        return;
      }
    }
    Le.flags |= e, d.memoizedState = ys(1 | n, s, h, a);
  }
  function yd(e, n) {
    return So(8390656, 8, e, n);
  }
  function za(e, n) {
    return _o(2048, 8, e, n);
  }
  function vd(e, n) {
    return _o(4, 2, e, n);
  }
  function xd(e, n) {
    return _o(4, 4, e, n);
  }
  function wd(e, n) {
    if (typeof n == "function") return e = e(), n(e), function() {
      n(null);
    };
    if (n != null) return e = e(), n.current = e, function() {
      n.current = null;
    };
  }
  function bd(e, n, s) {
    return s = s != null ? s.concat([e]) : null, _o(4, 4, wd.bind(null, n, e), s);
  }
  function Ua() {
  }
  function kd(e, n) {
    var s = St();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && Ia(n, a[1]) ? a[0] : (s.memoizedState = [e, n], e);
  }
  function jd(e, n) {
    var s = St();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && Ia(n, a[1]) ? a[0] : (e = e(), s.memoizedState = [e, n], e);
  }
  function Nd(e, n, s) {
    return (Hn & 21) === 0 ? (e.baseState && (e.baseState = !1, at = !0), e.memoizedState = s) : (Rt(s, n) || (s = eu(), Le.lanes |= s, Vn |= s, e.baseState = !0), n);
  }
  function fy(e, n) {
    var s = _e;
    _e = s !== 0 && 4 > s ? s : 4, e(!0);
    var a = Ma.transition;
    Ma.transition = {};
    try {
      e(!1), n();
    } finally {
      _e = s, Ma.transition = a;
    }
  }
  function Sd() {
    return St().memoizedState;
  }
  function py(e, n, s) {
    var a = _n(e);
    if (s = { lane: a, action: s, hasEagerState: !1, eagerState: null, next: null }, _d(e)) Cd(n, s);
    else if (s = rd(e, n, s, a), s !== null) {
      var d = st();
      Mt(s, e, a, d), Pd(s, n, a);
    }
  }
  function hy(e, n, s) {
    var a = _n(e), d = { lane: a, action: s, hasEagerState: !1, eagerState: null, next: null };
    if (_d(e)) Cd(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null)) try {
        var v = n.lastRenderedState, N = h(v, s);
        if (d.hasEagerState = !0, d.eagerState = N, Rt(N, v)) {
          var P = n.interleaved;
          P === null ? (d.next = d, Ea(n)) : (d.next = P.next, P.next = d), n.interleaved = d;
          return;
        }
      } catch {
      }
      s = rd(e, n, d, a), s !== null && (d = st(), Mt(s, e, a, d), Pd(s, n, a));
    }
  }
  function _d(e) {
    var n = e.alternate;
    return e === Le || n !== null && n === Le;
  }
  function Cd(e, n) {
    hs = No = !0;
    var s = e.pending;
    s === null ? n.next = n : (n.next = s.next, s.next = n), e.pending = n;
  }
  function Pd(e, n, s) {
    if ((s & 4194240) !== 0) {
      var a = n.lanes;
      a &= e.pendingLanes, s |= a, n.lanes = s, Hi(e, s);
    }
  }
  var Co = { readContext: Nt, useCallback: et, useContext: et, useEffect: et, useImperativeHandle: et, useInsertionEffect: et, useLayoutEffect: et, useMemo: et, useReducer: et, useRef: et, useState: et, useDebugValue: et, useDeferredValue: et, useTransition: et, useMutableSource: et, useSyncExternalStore: et, useId: et, unstable_isNewReconciler: !1 }, my = { readContext: Nt, useCallback: function(e, n) {
    return Ut().memoizedState = [e, n === void 0 ? null : n], e;
  }, useContext: Nt, useEffect: yd, useImperativeHandle: function(e, n, s) {
    return s = s != null ? s.concat([e]) : null, So(
      4194308,
      4,
      wd.bind(null, n, e),
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
    return n = s !== void 0 ? s(n) : n, a.memoizedState = a.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, a.queue = e, e = e.dispatch = py.bind(null, Le, e), [a.memoizedState, e];
  }, useRef: function(e) {
    var n = Ut();
    return e = { current: e }, n.memoizedState = e;
  }, useState: md, useDebugValue: Ua, useDeferredValue: function(e) {
    return Ut().memoizedState = e;
  }, useTransition: function() {
    var e = md(!1), n = e[0];
    return e = fy.bind(null, e[1]), Ut().memoizedState = e, [n, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, n, s) {
    var a = Le, d = Ut();
    if (Te) {
      if (s === void 0) throw Error(o(407));
      s = s();
    } else {
      if (s = n(), Ye === null) throw Error(o(349));
      (Hn & 30) !== 0 || ud(a, n, s);
    }
    d.memoizedState = s;
    var h = { value: s, getSnapshot: n };
    return d.queue = h, yd(fd.bind(
      null,
      a,
      h,
      e
    ), [e]), a.flags |= 2048, ys(9, dd.bind(null, a, h, s, n), void 0, null), s;
  }, useId: function() {
    var e = Ut(), n = Ye.identifierPrefix;
    if (Te) {
      var s = Jt, a = Zt;
      s = (a & ~(1 << 32 - Et(a) - 1)).toString(32) + s, n = ":" + n + "R" + s, s = ms++, 0 < s && (n += "H" + s.toString(32)), n += ":";
    } else s = dy++, n = ":" + n + "r" + s.toString(32) + ":";
    return e.memoizedState = n;
  }, unstable_isNewReconciler: !1 }, gy = {
    readContext: Nt,
    useCallback: kd,
    useContext: Nt,
    useEffect: za,
    useImperativeHandle: bd,
    useInsertionEffect: vd,
    useLayoutEffect: xd,
    useMemo: jd,
    useReducer: Da,
    useRef: gd,
    useState: function() {
      return Da(gs);
    },
    useDebugValue: Ua,
    useDeferredValue: function(e) {
      var n = St();
      return Nd(n, Ue.memoizedState, e);
    },
    useTransition: function() {
      var e = Da(gs)[0], n = St().memoizedState;
      return [e, n];
    },
    useMutableSource: ld,
    useSyncExternalStore: cd,
    useId: Sd,
    unstable_isNewReconciler: !1
  }, yy = { readContext: Nt, useCallback: kd, useContext: Nt, useEffect: za, useImperativeHandle: bd, useInsertionEffect: vd, useLayoutEffect: xd, useMemo: jd, useReducer: Ba, useRef: gd, useState: function() {
    return Ba(gs);
  }, useDebugValue: Ua, useDeferredValue: function(e) {
    var n = St();
    return Ue === null ? n.memoizedState = e : Nd(n, Ue.memoizedState, e);
  }, useTransition: function() {
    var e = Ba(gs)[0], n = St().memoizedState;
    return [e, n];
  }, useMutableSource: ld, useSyncExternalStore: cd, useId: Sd, unstable_isNewReconciler: !1 };
  function At(e, n) {
    if (e && e.defaultProps) {
      n = X({}, n), e = e.defaultProps;
      for (var s in e) n[s] === void 0 && (n[s] = e[s]);
      return n;
    }
    return n;
  }
  function Wa(e, n, s, a) {
    n = e.memoizedState, s = s(a, n), s = s == null ? n : X({}, n, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var Po = { isMounted: function(e) {
    return (e = e._reactInternals) ? $n(e) === e : !1;
  }, enqueueSetState: function(e, n, s) {
    e = e._reactInternals;
    var a = st(), d = _n(e), h = tn(a, d);
    h.payload = n, s != null && (h.callback = s), n = kn(e, h, d), n !== null && (Mt(n, e, d, a), wo(n, e, d));
  }, enqueueReplaceState: function(e, n, s) {
    e = e._reactInternals;
    var a = st(), d = _n(e), h = tn(a, d);
    h.tag = 1, h.payload = n, s != null && (h.callback = s), n = kn(e, h, d), n !== null && (Mt(n, e, d, a), wo(n, e, d));
  }, enqueueForceUpdate: function(e, n) {
    e = e._reactInternals;
    var s = st(), a = _n(e), d = tn(s, a);
    d.tag = 2, n != null && (d.callback = n), n = kn(e, d, a), n !== null && (Mt(n, e, a, s), wo(n, e, a));
  } };
  function Ed(e, n, s, a, d, h, v) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, h, v) : n.prototype && n.prototype.isPureReactComponent ? !rs(s, a) || !rs(d, h) : !0;
  }
  function Rd(e, n, s) {
    var a = !1, d = xn, h = n.contextType;
    return typeof h == "object" && h !== null ? h = Nt(h) : (d = it(n) ? Dn : Je.current, a = n.contextTypes, h = (a = a != null) ? gr(e, d) : xn), n = new n(s, h), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Po, e.stateNode = n, n._reactInternals = e, a && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = d, e.__reactInternalMemoizedMaskedChildContext = h), n;
  }
  function Td(e, n, s, a) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(s, a), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(s, a), n.state !== e && Po.enqueueReplaceState(n, n.state, null);
  }
  function Ha(e, n, s, a) {
    var d = e.stateNode;
    d.props = s, d.state = e.memoizedState, d.refs = {}, Ra(e);
    var h = n.contextType;
    typeof h == "object" && h !== null ? d.context = Nt(h) : (h = it(n) ? Dn : Je.current, d.context = gr(e, h)), d.state = e.memoizedState, h = n.getDerivedStateFromProps, typeof h == "function" && (Wa(e, n, h, s), d.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (n = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), n !== d.state && Po.enqueueReplaceState(d, d.state, null), bo(e, s, d, a), d.state = e.memoizedState), typeof d.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Nr(e, n) {
    try {
      var s = "", a = n;
      do
        s += pe(a), a = a.return;
      while (a);
      var d = s;
    } catch (h) {
      d = `
Error generating stack: ` + h.message + `
` + h.stack;
    }
    return { value: e, source: n, stack: d, digest: null };
  }
  function Va(e, n, s) {
    return { value: e, source: null, stack: s ?? null, digest: n ?? null };
  }
  function Ya(e, n) {
    try {
      console.error(n.value);
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  var vy = typeof WeakMap == "function" ? WeakMap : Map;
  function Ad(e, n, s) {
    s = tn(-1, s), s.tag = 3, s.payload = { element: null };
    var a = n.value;
    return s.callback = function() {
      Mo || (Mo = !0, al = a), Ya(e, n);
    }, s;
  }
  function Ld(e, n, s) {
    s = tn(-1, s), s.tag = 3;
    var a = e.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var d = n.value;
      s.payload = function() {
        return a(d);
      }, s.callback = function() {
        Ya(e, n);
      };
    }
    var h = e.stateNode;
    return h !== null && typeof h.componentDidCatch == "function" && (s.callback = function() {
      Ya(e, n), typeof a != "function" && (Nn === null ? Nn = /* @__PURE__ */ new Set([this]) : Nn.add(this));
      var v = n.stack;
      this.componentDidCatch(n.value, { componentStack: v !== null ? v : "" });
    }), s;
  }
  function Od(e, n, s) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new vy();
      var d = /* @__PURE__ */ new Set();
      a.set(n, d);
    } else d = a.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), a.set(n, d));
    d.has(s) || (d.add(s), e = Ay.bind(null, e, n, s), n.then(e, e));
  }
  function Md(e) {
    do {
      var n;
      if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Id(e, n, s, a, d) {
    return (e.mode & 1) === 0 ? (e === n ? e.flags |= 65536 : (e.flags |= 128, s.flags |= 131072, s.flags &= -52805, s.tag === 1 && (s.alternate === null ? s.tag = 17 : (n = tn(-1, 1), n.tag = 2, kn(s, n, 1))), s.lanes |= 1), e) : (e.flags |= 65536, e.lanes = d, e);
  }
  var xy = $.ReactCurrentOwner, at = !1;
  function rt(e, n, s, a) {
    n.child = e === null ? nd(n, null, s, a) : wr(n, e.child, s, a);
  }
  function $d(e, n, s, a, d) {
    s = s.render;
    var h = n.ref;
    return kr(n, d), a = $a(e, n, s, a, h, d), s = Fa(), e !== null && !at ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~d, nn(e, n, d)) : (Te && s && wa(n), n.flags |= 1, rt(e, n, a, d), n.child);
  }
  function Fd(e, n, s, a, d) {
    if (e === null) {
      var h = s.type;
      return typeof h == "function" && !hl(h) && h.defaultProps === void 0 && s.compare === null && s.defaultProps === void 0 ? (n.tag = 15, n.type = h, Dd(e, n, h, a, d)) : (e = zo(s.type, null, a, n, n.mode, d), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, (e.lanes & d) === 0) {
      var v = h.memoizedProps;
      if (s = s.compare, s = s !== null ? s : rs, s(v, a) && e.ref === n.ref) return nn(e, n, d);
    }
    return n.flags |= 1, e = Pn(h, a), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Dd(e, n, s, a, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (rs(h, a) && e.ref === n.ref) if (at = !1, n.pendingProps = a = h, (e.lanes & d) !== 0) (e.flags & 131072) !== 0 && (at = !0);
      else return n.lanes = e.lanes, nn(e, n, d);
    }
    return Qa(e, n, s, a, d);
  }
  function Bd(e, n, s) {
    var a = n.pendingProps, d = a.children, h = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden") if ((n.mode & 1) === 0) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ce(_r, gt), gt |= s;
    else {
      if ((s & 1073741824) === 0) return e = h !== null ? h.baseLanes | s : s, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, Ce(_r, gt), gt |= e, null;
      n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, a = h !== null ? h.baseLanes : s, Ce(_r, gt), gt |= a;
    }
    else h !== null ? (a = h.baseLanes | s, n.memoizedState = null) : a = s, Ce(_r, gt), gt |= a;
    return rt(e, n, d, s), n.child;
  }
  function zd(e, n) {
    var s = n.ref;
    (e === null && s !== null || e !== null && e.ref !== s) && (n.flags |= 512, n.flags |= 2097152);
  }
  function Qa(e, n, s, a, d) {
    var h = it(s) ? Dn : Je.current;
    return h = gr(n, h), kr(n, d), s = $a(e, n, s, a, h, d), a = Fa(), e !== null && !at ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~d, nn(e, n, d)) : (Te && a && wa(n), n.flags |= 1, rt(e, n, s, d), n.child);
  }
  function Ud(e, n, s, a, d) {
    if (it(s)) {
      var h = !0;
      fo(n);
    } else h = !1;
    if (kr(n, d), n.stateNode === null) Ro(e, n), Rd(n, s, a), Ha(n, s, a, d), a = !0;
    else if (e === null) {
      var v = n.stateNode, N = n.memoizedProps;
      v.props = N;
      var P = v.context, I = s.contextType;
      typeof I == "object" && I !== null ? I = Nt(I) : (I = it(s) ? Dn : Je.current, I = gr(n, I));
      var H = s.getDerivedStateFromProps, V = typeof H == "function" || typeof v.getSnapshotBeforeUpdate == "function";
      V || typeof v.UNSAFE_componentWillReceiveProps != "function" && typeof v.componentWillReceiveProps != "function" || (N !== a || P !== I) && Td(n, v, a, I), bn = !1;
      var z = n.memoizedState;
      v.state = z, bo(n, a, v, d), P = n.memoizedState, N !== a || z !== P || ot.current || bn ? (typeof H == "function" && (Wa(n, s, H, a), P = n.memoizedState), (N = bn || Ed(n, s, N, a, z, P, I)) ? (V || typeof v.UNSAFE_componentWillMount != "function" && typeof v.componentWillMount != "function" || (typeof v.componentWillMount == "function" && v.componentWillMount(), typeof v.UNSAFE_componentWillMount == "function" && v.UNSAFE_componentWillMount()), typeof v.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof v.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = a, n.memoizedState = P), v.props = a, v.state = P, v.context = I, a = N) : (typeof v.componentDidMount == "function" && (n.flags |= 4194308), a = !1);
    } else {
      v = n.stateNode, sd(e, n), N = n.memoizedProps, I = n.type === n.elementType ? N : At(n.type, N), v.props = I, V = n.pendingProps, z = v.context, P = s.contextType, typeof P == "object" && P !== null ? P = Nt(P) : (P = it(s) ? Dn : Je.current, P = gr(n, P));
      var te = s.getDerivedStateFromProps;
      (H = typeof te == "function" || typeof v.getSnapshotBeforeUpdate == "function") || typeof v.UNSAFE_componentWillReceiveProps != "function" && typeof v.componentWillReceiveProps != "function" || (N !== V || z !== P) && Td(n, v, a, P), bn = !1, z = n.memoizedState, v.state = z, bo(n, a, v, d);
      var se = n.memoizedState;
      N !== V || z !== se || ot.current || bn ? (typeof te == "function" && (Wa(n, s, te, a), se = n.memoizedState), (I = bn || Ed(n, s, I, a, z, se, P) || !1) ? (H || typeof v.UNSAFE_componentWillUpdate != "function" && typeof v.componentWillUpdate != "function" || (typeof v.componentWillUpdate == "function" && v.componentWillUpdate(a, se, P), typeof v.UNSAFE_componentWillUpdate == "function" && v.UNSAFE_componentWillUpdate(a, se, P)), typeof v.componentDidUpdate == "function" && (n.flags |= 4), typeof v.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof v.componentDidUpdate != "function" || N === e.memoizedProps && z === e.memoizedState || (n.flags |= 4), typeof v.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && z === e.memoizedState || (n.flags |= 1024), n.memoizedProps = a, n.memoizedState = se), v.props = a, v.state = se, v.context = P, a = I) : (typeof v.componentDidUpdate != "function" || N === e.memoizedProps && z === e.memoizedState || (n.flags |= 4), typeof v.getSnapshotBeforeUpdate != "function" || N === e.memoizedProps && z === e.memoizedState || (n.flags |= 1024), a = !1);
    }
    return Ga(e, n, s, a, h, d);
  }
  function Ga(e, n, s, a, d, h) {
    zd(e, n);
    var v = (n.flags & 128) !== 0;
    if (!a && !v) return d && Qu(n, s, !1), nn(e, n, h);
    a = n.stateNode, xy.current = n;
    var N = v && typeof s.getDerivedStateFromError != "function" ? null : a.render();
    return n.flags |= 1, e !== null && v ? (n.child = wr(n, e.child, null, h), n.child = wr(n, null, N, h)) : rt(e, n, N, h), n.memoizedState = a.state, d && Qu(n, s, !0), n.child;
  }
  function Wd(e) {
    var n = e.stateNode;
    n.pendingContext ? Vu(e, n.pendingContext, n.pendingContext !== n.context) : n.context && Vu(e, n.context, !1), Ta(e, n.containerInfo);
  }
  function Hd(e, n, s, a, d) {
    return xr(), Na(d), n.flags |= 256, rt(e, n, s, a), n.child;
  }
  var Ka = { dehydrated: null, treeContext: null, retryLane: 0 };
  function qa(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Vd(e, n, s) {
    var a = n.pendingProps, d = Ae.current, h = !1, v = (n.flags & 128) !== 0, N;
    if ((N = v) || (N = e !== null && e.memoizedState === null ? !1 : (d & 2) !== 0), N ? (h = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (d |= 1), Ce(Ae, d & 1), e === null)
      return ja(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((n.mode & 1) === 0 ? n.lanes = 1 : e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824, null) : (v = a.children, e = a.fallback, h ? (a = n.mode, h = n.child, v = { mode: "hidden", children: v }, (a & 1) === 0 && h !== null ? (h.childLanes = 0, h.pendingProps = v) : h = Uo(v, a, 0, null), e = Kn(e, a, s, null), h.return = n, e.return = n, h.sibling = e, n.child = h, n.child.memoizedState = qa(s), n.memoizedState = Ka, e) : Xa(n, v));
    if (d = e.memoizedState, d !== null && (N = d.dehydrated, N !== null)) return wy(e, n, v, a, N, d, s);
    if (h) {
      h = a.fallback, v = n.mode, d = e.child, N = d.sibling;
      var P = { mode: "hidden", children: a.children };
      return (v & 1) === 0 && n.child !== d ? (a = n.child, a.childLanes = 0, a.pendingProps = P, n.deletions = null) : (a = Pn(d, P), a.subtreeFlags = d.subtreeFlags & 14680064), N !== null ? h = Pn(N, h) : (h = Kn(h, v, s, null), h.flags |= 2), h.return = n, a.return = n, a.sibling = h, n.child = a, a = h, h = n.child, v = e.child.memoizedState, v = v === null ? qa(s) : { baseLanes: v.baseLanes | s, cachePool: null, transitions: v.transitions }, h.memoizedState = v, h.childLanes = e.childLanes & ~s, n.memoizedState = Ka, a;
    }
    return h = e.child, e = h.sibling, a = Pn(h, { mode: "visible", children: a.children }), (n.mode & 1) === 0 && (a.lanes = s), a.return = n, a.sibling = null, e !== null && (s = n.deletions, s === null ? (n.deletions = [e], n.flags |= 16) : s.push(e)), n.child = a, n.memoizedState = null, a;
  }
  function Xa(e, n) {
    return n = Uo({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
  }
  function Eo(e, n, s, a) {
    return a !== null && Na(a), wr(n, e.child, null, s), e = Xa(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
  }
  function wy(e, n, s, a, d, h, v) {
    if (s)
      return n.flags & 256 ? (n.flags &= -257, a = Va(Error(o(422))), Eo(e, n, v, a)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (h = a.fallback, d = n.mode, a = Uo({ mode: "visible", children: a.children }, d, 0, null), h = Kn(h, d, v, null), h.flags |= 2, a.return = n, h.return = n, a.sibling = h, n.child = a, (n.mode & 1) !== 0 && wr(n, e.child, null, v), n.child.memoizedState = qa(v), n.memoizedState = Ka, h);
    if ((n.mode & 1) === 0) return Eo(e, n, v, null);
    if (d.data === "$!") {
      if (a = d.nextSibling && d.nextSibling.dataset, a) var N = a.dgst;
      return a = N, h = Error(o(419)), a = Va(h, a, void 0), Eo(e, n, v, a);
    }
    if (N = (v & e.childLanes) !== 0, at || N) {
      if (a = Ye, a !== null) {
        switch (v & -v) {
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
        d = (d & (a.suspendedLanes | v)) !== 0 ? 0 : d, d !== 0 && d !== h.retryLane && (h.retryLane = d, en(e, d), Mt(a, e, d, -1));
      }
      return pl(), a = Va(Error(o(421))), Eo(e, n, v, a);
    }
    return d.data === "$?" ? (n.flags |= 128, n.child = e.child, n = Ly.bind(null, e), d._reactRetry = n, null) : (e = h.treeContext, mt = yn(d.nextSibling), ht = n, Te = !0, Tt = null, e !== null && (kt[jt++] = Zt, kt[jt++] = Jt, kt[jt++] = Bn, Zt = e.id, Jt = e.overflow, Bn = n), n = Xa(n, a.children), n.flags |= 4096, n);
  }
  function Yd(e, n, s) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n), Pa(e.return, n, s);
  }
  function Za(e, n, s, a, d) {
    var h = e.memoizedState;
    h === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: a, tail: s, tailMode: d } : (h.isBackwards = n, h.rendering = null, h.renderingStartTime = 0, h.last = a, h.tail = s, h.tailMode = d);
  }
  function Qd(e, n, s) {
    var a = n.pendingProps, d = a.revealOrder, h = a.tail;
    if (rt(e, n, a.children, s), a = Ae.current, (a & 2) !== 0) a = a & 1 | 2, n.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = n.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Yd(e, s, n);
        else if (e.tag === 19) Yd(e, s, n);
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
        s = d, s === null ? (d = n.child, n.child = null) : (d = s.sibling, s.sibling = null), Za(n, !1, d, s, h);
        break;
      case "backwards":
        for (s = null, d = n.child, n.child = null; d !== null; ) {
          if (e = d.alternate, e !== null && ko(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = s, s = d, d = e;
        }
        Za(n, !0, s, null, h);
        break;
      case "together":
        Za(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ro(e, n) {
    (n.mode & 1) === 0 && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
  }
  function nn(e, n, s) {
    if (e !== null && (n.dependencies = e.dependencies), Vn |= n.lanes, (s & n.childLanes) === 0) return null;
    if (e !== null && n.child !== e.child) throw Error(o(153));
    if (n.child !== null) {
      for (e = n.child, s = Pn(e, e.pendingProps), n.child = s, s.return = n; e.sibling !== null; ) e = e.sibling, s = s.sibling = Pn(e, e.pendingProps), s.return = n;
      s.sibling = null;
    }
    return n.child;
  }
  function by(e, n, s) {
    switch (n.tag) {
      case 3:
        Wd(n), xr();
        break;
      case 5:
        ad(n);
        break;
      case 1:
        it(n.type) && fo(n);
        break;
      case 4:
        Ta(n, n.stateNode.containerInfo);
        break;
      case 10:
        var a = n.type._context, d = n.memoizedProps.value;
        Ce(vo, a._currentValue), a._currentValue = d;
        break;
      case 13:
        if (a = n.memoizedState, a !== null)
          return a.dehydrated !== null ? (Ce(Ae, Ae.current & 1), n.flags |= 128, null) : (s & n.child.childLanes) !== 0 ? Vd(e, n, s) : (Ce(Ae, Ae.current & 1), e = nn(e, n, s), e !== null ? e.sibling : null);
        Ce(Ae, Ae.current & 1);
        break;
      case 19:
        if (a = (s & n.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (a) return Qd(e, n, s);
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), Ce(Ae, Ae.current), a) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, Bd(e, n, s);
    }
    return nn(e, n, s);
  }
  var Gd, Ja, Kd, qd;
  Gd = function(e, n) {
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
  }, Ja = function() {
  }, Kd = function(e, n, s, a) {
    var d = e.memoizedProps;
    if (d !== a) {
      e = n.stateNode, Wn(zt.current);
      var h = null;
      switch (s) {
        case "input":
          d = Pi(e, d), a = Pi(e, a), h = [];
          break;
        case "select":
          d = X({}, d, { value: void 0 }), a = X({}, a, { value: void 0 }), h = [];
          break;
        case "textarea":
          d = Ti(e, d), a = Ti(e, a), h = [];
          break;
        default:
          typeof d.onClick != "function" && typeof a.onClick == "function" && (e.onclick = lo);
      }
      Li(s, a);
      var v;
      s = null;
      for (I in d) if (!a.hasOwnProperty(I) && d.hasOwnProperty(I) && d[I] != null) if (I === "style") {
        var N = d[I];
        for (v in N) N.hasOwnProperty(v) && (s || (s = {}), s[v] = "");
      } else I !== "dangerouslySetInnerHTML" && I !== "children" && I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && I !== "autoFocus" && (c.hasOwnProperty(I) ? h || (h = []) : (h = h || []).push(I, null));
      for (I in a) {
        var P = a[I];
        if (N = d?.[I], a.hasOwnProperty(I) && P !== N && (P != null || N != null)) if (I === "style") if (N) {
          for (v in N) !N.hasOwnProperty(v) || P && P.hasOwnProperty(v) || (s || (s = {}), s[v] = "");
          for (v in P) P.hasOwnProperty(v) && N[v] !== P[v] && (s || (s = {}), s[v] = P[v]);
        } else s || (h || (h = []), h.push(
          I,
          s
        )), s = P;
        else I === "dangerouslySetInnerHTML" ? (P = P ? P.__html : void 0, N = N ? N.__html : void 0, P != null && N !== P && (h = h || []).push(I, P)) : I === "children" ? typeof P != "string" && typeof P != "number" || (h = h || []).push(I, "" + P) : I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && (c.hasOwnProperty(I) ? (P != null && I === "onScroll" && Pe("scroll", e), h || N === P || (h = [])) : (h = h || []).push(I, P));
      }
      s && (h = h || []).push("style", s);
      var I = h;
      (n.updateQueue = I) && (n.flags |= 4);
    }
  }, qd = function(e, n, s, a) {
    s !== a && (n.flags |= 4);
  };
  function vs(e, n) {
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
  function tt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, s = 0, a = 0;
    if (n) for (var d = e.child; d !== null; ) s |= d.lanes | d.childLanes, a |= d.subtreeFlags & 14680064, a |= d.flags & 14680064, d.return = e, d = d.sibling;
    else for (d = e.child; d !== null; ) s |= d.lanes | d.childLanes, a |= d.subtreeFlags, a |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= a, e.childLanes = s, n;
  }
  function ky(e, n, s) {
    var a = n.pendingProps;
    switch (ba(n), n.tag) {
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
        return tt(n), null;
      case 1:
        return it(n.type) && uo(), tt(n), null;
      case 3:
        return a = n.stateNode, jr(), Ee(ot), Ee(Je), Oa(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (go(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Tt !== null && (ul(Tt), Tt = null))), Ja(e, n), tt(n), null;
      case 5:
        Aa(n);
        var d = Wn(ps.current);
        if (s = n.type, e !== null && n.stateNode != null) Kd(e, n, s, a, d), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
        else {
          if (!a) {
            if (n.stateNode === null) throw Error(o(166));
            return tt(n), null;
          }
          if (e = Wn(zt.current), go(n)) {
            a = n.stateNode, s = n.type;
            var h = n.memoizedProps;
            switch (a[Bt] = n, a[ls] = h, e = (n.mode & 1) !== 0, s) {
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
                for (d = 0; d < os.length; d++) Pe(os[d], a);
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
                Rc(a, h), Pe("invalid", a);
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!h.multiple }, Pe("invalid", a);
                break;
              case "textarea":
                Lc(a, h), Pe("invalid", a);
            }
            Li(s, h), d = null;
            for (var v in h) if (h.hasOwnProperty(v)) {
              var N = h[v];
              v === "children" ? typeof N == "string" ? a.textContent !== N && (h.suppressHydrationWarning !== !0 && ao(a.textContent, N, e), d = ["children", N]) : typeof N == "number" && a.textContent !== "" + N && (h.suppressHydrationWarning !== !0 && ao(
                a.textContent,
                N,
                e
              ), d = ["children", "" + N]) : c.hasOwnProperty(v) && N != null && v === "onScroll" && Pe("scroll", a);
            }
            switch (s) {
              case "input":
                ze(a), Ac(a, h, !0);
                break;
              case "textarea":
                ze(a), Mc(a);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof h.onClick == "function" && (a.onclick = lo);
            }
            a = d, n.updateQueue = a, a !== null && (n.flags |= 4);
          } else {
            v = d.nodeType === 9 ? d : d.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ic(s)), e === "http://www.w3.org/1999/xhtml" ? s === "script" ? (e = v.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof a.is == "string" ? e = v.createElement(s, { is: a.is }) : (e = v.createElement(s), s === "select" && (v = e, a.multiple ? v.multiple = !0 : a.size && (v.size = a.size))) : e = v.createElementNS(e, s), e[Bt] = n, e[ls] = a, Gd(e, n, !1, !1), n.stateNode = e;
            e: {
              switch (v = Oi(s, a), s) {
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
                  for (d = 0; d < os.length; d++) Pe(os[d], e);
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
                  Rc(e, a), d = Pi(e, a), Pe("invalid", e);
                  break;
                case "option":
                  d = a;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!a.multiple }, d = X({}, a, { value: void 0 }), Pe("invalid", e);
                  break;
                case "textarea":
                  Lc(e, a), d = Ti(e, a), Pe("invalid", e);
                  break;
                default:
                  d = a;
              }
              Li(s, d), N = d;
              for (h in N) if (N.hasOwnProperty(h)) {
                var P = N[h];
                h === "style" ? Dc(e, P) : h === "dangerouslySetInnerHTML" ? (P = P ? P.__html : void 0, P != null && $c(e, P)) : h === "children" ? typeof P == "string" ? (s !== "textarea" || P !== "") && Br(e, P) : typeof P == "number" && Br(e, "" + P) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (c.hasOwnProperty(h) ? P != null && h === "onScroll" && Pe("scroll", e) : P != null && E(e, h, P, v));
              }
              switch (s) {
                case "input":
                  ze(e), Ac(e, a, !1);
                  break;
                case "textarea":
                  ze(e), Mc(e);
                  break;
                case "option":
                  a.value != null && e.setAttribute("value", "" + ye(a.value));
                  break;
                case "select":
                  e.multiple = !!a.multiple, h = a.value, h != null ? sr(e, !!a.multiple, h, !1) : a.defaultValue != null && sr(
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
        return tt(n), null;
      case 6:
        if (e && n.stateNode != null) qd(e, n, e.memoizedProps, a);
        else {
          if (typeof a != "string" && n.stateNode === null) throw Error(o(166));
          if (s = Wn(ps.current), Wn(zt.current), go(n)) {
            if (a = n.stateNode, s = n.memoizedProps, a[Bt] = n, (h = a.nodeValue !== s) && (e = ht, e !== null)) switch (e.tag) {
              case 3:
                ao(a.nodeValue, s, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && ao(a.nodeValue, s, (e.mode & 1) !== 0);
            }
            h && (n.flags |= 4);
          } else a = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(a), a[Bt] = n, n.stateNode = a;
        }
        return tt(n), null;
      case 13:
        if (Ee(Ae), a = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Te && mt !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0) Ju(), xr(), n.flags |= 98560, h = !1;
          else if (h = go(n), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!h) throw Error(o(318));
              if (h = n.memoizedState, h = h !== null ? h.dehydrated : null, !h) throw Error(o(317));
              h[Bt] = n;
            } else xr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            tt(n), h = !1;
          } else Tt !== null && (ul(Tt), Tt = null), h = !0;
          if (!h) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0 ? (n.lanes = s, n) : (a = a !== null, a !== (e !== null && e.memoizedState !== null) && a && (n.child.flags |= 8192, (n.mode & 1) !== 0 && (e === null || (Ae.current & 1) !== 0 ? We === 0 && (We = 3) : pl())), n.updateQueue !== null && (n.flags |= 4), tt(n), null);
      case 4:
        return jr(), Ja(e, n), e === null && is(n.stateNode.containerInfo), tt(n), null;
      case 10:
        return Ca(n.type._context), tt(n), null;
      case 17:
        return it(n.type) && uo(), tt(n), null;
      case 19:
        if (Ee(Ae), h = n.memoizedState, h === null) return tt(n), null;
        if (a = (n.flags & 128) !== 0, v = h.rendering, v === null) if (a) vs(h, !1);
        else {
          if (We !== 0 || e !== null && (e.flags & 128) !== 0) for (e = n.child; e !== null; ) {
            if (v = ko(e), v !== null) {
              for (n.flags |= 128, vs(h, !1), a = v.updateQueue, a !== null && (n.updateQueue = a, n.flags |= 4), n.subtreeFlags = 0, a = s, s = n.child; s !== null; ) h = s, e = a, h.flags &= 14680066, v = h.alternate, v === null ? (h.childLanes = 0, h.lanes = e, h.child = null, h.subtreeFlags = 0, h.memoizedProps = null, h.memoizedState = null, h.updateQueue = null, h.dependencies = null, h.stateNode = null) : (h.childLanes = v.childLanes, h.lanes = v.lanes, h.child = v.child, h.subtreeFlags = 0, h.deletions = null, h.memoizedProps = v.memoizedProps, h.memoizedState = v.memoizedState, h.updateQueue = v.updateQueue, h.type = v.type, e = v.dependencies, h.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), s = s.sibling;
              return Ce(Ae, Ae.current & 1 | 2), n.child;
            }
            e = e.sibling;
          }
          h.tail !== null && Me() > Cr && (n.flags |= 128, a = !0, vs(h, !1), n.lanes = 4194304);
        }
        else {
          if (!a) if (e = ko(v), e !== null) {
            if (n.flags |= 128, a = !0, s = e.updateQueue, s !== null && (n.updateQueue = s, n.flags |= 4), vs(h, !0), h.tail === null && h.tailMode === "hidden" && !v.alternate && !Te) return tt(n), null;
          } else 2 * Me() - h.renderingStartTime > Cr && s !== 1073741824 && (n.flags |= 128, a = !0, vs(h, !1), n.lanes = 4194304);
          h.isBackwards ? (v.sibling = n.child, n.child = v) : (s = h.last, s !== null ? s.sibling = v : n.child = v, h.last = v);
        }
        return h.tail !== null ? (n = h.tail, h.rendering = n, h.tail = n.sibling, h.renderingStartTime = Me(), n.sibling = null, s = Ae.current, Ce(Ae, a ? s & 1 | 2 : s & 1), n) : (tt(n), null);
      case 22:
      case 23:
        return fl(), a = n.memoizedState !== null, e !== null && e.memoizedState !== null !== a && (n.flags |= 8192), a && (n.mode & 1) !== 0 ? (gt & 1073741824) !== 0 && (tt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : tt(n), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function jy(e, n) {
    switch (ba(n), n.tag) {
      case 1:
        return it(n.type) && uo(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return jr(), Ee(ot), Ee(Je), Oa(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 5:
        return Aa(n), null;
      case 13:
        if (Ee(Ae), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null) throw Error(o(340));
          xr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return Ee(Ae), null;
      case 4:
        return jr(), null;
      case 10:
        return Ca(n.type._context), null;
      case 22:
      case 23:
        return fl(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var To = !1, nt = !1, Ny = typeof WeakSet == "function" ? WeakSet : Set, re = null;
  function Sr(e, n) {
    var s = e.ref;
    if (s !== null) if (typeof s == "function") try {
      s(null);
    } catch (a) {
      Oe(e, n, a);
    }
    else s.current = null;
  }
  function el(e, n, s) {
    try {
      s();
    } catch (a) {
      Oe(e, n, a);
    }
  }
  var Xd = !1;
  function Sy(e, n) {
    if (fa = qs, e = Eu(), sa(e)) {
      if ("selectionStart" in e) var s = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        s = (s = e.ownerDocument) && s.defaultView || window;
        var a = s.getSelection && s.getSelection();
        if (a && a.rangeCount !== 0) {
          s = a.anchorNode;
          var d = a.anchorOffset, h = a.focusNode;
          a = a.focusOffset;
          try {
            s.nodeType, h.nodeType;
          } catch {
            s = null;
            break e;
          }
          var v = 0, N = -1, P = -1, I = 0, H = 0, V = e, z = null;
          t: for (; ; ) {
            for (var te; V !== s || d !== 0 && V.nodeType !== 3 || (N = v + d), V !== h || a !== 0 && V.nodeType !== 3 || (P = v + a), V.nodeType === 3 && (v += V.nodeValue.length), (te = V.firstChild) !== null; )
              z = V, V = te;
            for (; ; ) {
              if (V === e) break t;
              if (z === s && ++I === d && (N = v), z === h && ++H === a && (P = v), (te = V.nextSibling) !== null) break;
              V = z, z = V.parentNode;
            }
            V = te;
          }
          s = N === -1 || P === -1 ? null : { start: N, end: P };
        } else s = null;
      }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (pa = { focusedElem: e, selectionRange: s }, qs = !1, re = n; re !== null; ) if (n = re, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, re = e;
    else for (; re !== null; ) {
      n = re;
      try {
        var se = n.alternate;
        if ((n.flags & 1024) !== 0) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (se !== null) {
              var ae = se.memoizedProps, Ie = se.memoizedState, L = n.stateNode, T = L.getSnapshotBeforeUpdate(n.elementType === n.type ? ae : At(n.type, ae), Ie);
              L.__reactInternalSnapshotBeforeUpdate = T;
            }
            break;
          case 3:
            var O = n.stateNode.containerInfo;
            O.nodeType === 1 ? O.textContent = "" : O.nodeType === 9 && O.documentElement && O.removeChild(O.documentElement);
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
        Oe(n, n.return, q);
      }
      if (e = n.sibling, e !== null) {
        e.return = n.return, re = e;
        break;
      }
      re = n.return;
    }
    return se = Xd, Xd = !1, se;
  }
  function xs(e, n, s) {
    var a = n.updateQueue;
    if (a = a !== null ? a.lastEffect : null, a !== null) {
      var d = a = a.next;
      do {
        if ((d.tag & e) === e) {
          var h = d.destroy;
          d.destroy = void 0, h !== void 0 && el(n, s, h);
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
  function tl(e) {
    var n = e.ref;
    if (n !== null) {
      var s = e.stateNode;
      e.tag, e = s, typeof n == "function" ? n(e) : n.current = e;
    }
  }
  function Zd(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Zd(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[Bt], delete n[ls], delete n[ya], delete n[ay], delete n[ly])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Jd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ef(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Jd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function nl(e, n, s) {
    var a = e.tag;
    if (a === 5 || a === 6) e = e.stateNode, n ? s.nodeType === 8 ? s.parentNode.insertBefore(e, n) : s.insertBefore(e, n) : (s.nodeType === 8 ? (n = s.parentNode, n.insertBefore(e, s)) : (n = s, n.appendChild(e)), s = s._reactRootContainer, s != null || n.onclick !== null || (n.onclick = lo));
    else if (a !== 4 && (e = e.child, e !== null)) for (nl(e, n, s), e = e.sibling; e !== null; ) nl(e, n, s), e = e.sibling;
  }
  function rl(e, n, s) {
    var a = e.tag;
    if (a === 5 || a === 6) e = e.stateNode, n ? s.insertBefore(e, n) : s.appendChild(e);
    else if (a !== 4 && (e = e.child, e !== null)) for (rl(e, n, s), e = e.sibling; e !== null; ) rl(e, n, s), e = e.sibling;
  }
  var qe = null, Lt = !1;
  function jn(e, n, s) {
    for (s = s.child; s !== null; ) tf(e, n, s), s = s.sibling;
  }
  function tf(e, n, s) {
    if (Dt && typeof Dt.onCommitFiberUnmount == "function") try {
      Dt.onCommitFiberUnmount(Hs, s);
    } catch {
    }
    switch (s.tag) {
      case 5:
        nt || Sr(s, n);
      case 6:
        var a = qe, d = Lt;
        qe = null, jn(e, n, s), qe = a, Lt = d, qe !== null && (Lt ? (e = qe, s = s.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(s) : e.removeChild(s)) : qe.removeChild(s.stateNode));
        break;
      case 18:
        qe !== null && (Lt ? (e = qe, s = s.stateNode, e.nodeType === 8 ? ga(e.parentNode, s) : e.nodeType === 1 && ga(e, s), Xr(e)) : ga(qe, s.stateNode));
        break;
      case 4:
        a = qe, d = Lt, qe = s.stateNode.containerInfo, Lt = !0, jn(e, n, s), qe = a, Lt = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!nt && (a = s.updateQueue, a !== null && (a = a.lastEffect, a !== null))) {
          d = a = a.next;
          do {
            var h = d, v = h.destroy;
            h = h.tag, v !== void 0 && ((h & 2) !== 0 || (h & 4) !== 0) && el(s, n, v), d = d.next;
          } while (d !== a);
        }
        jn(e, n, s);
        break;
      case 1:
        if (!nt && (Sr(s, n), a = s.stateNode, typeof a.componentWillUnmount == "function")) try {
          a.props = s.memoizedProps, a.state = s.memoizedState, a.componentWillUnmount();
        } catch (N) {
          Oe(s, n, N);
        }
        jn(e, n, s);
        break;
      case 21:
        jn(e, n, s);
        break;
      case 22:
        s.mode & 1 ? (nt = (a = nt) || s.memoizedState !== null, jn(e, n, s), nt = a) : jn(e, n, s);
        break;
      default:
        jn(e, n, s);
    }
  }
  function nf(e) {
    var n = e.updateQueue;
    if (n !== null) {
      e.updateQueue = null;
      var s = e.stateNode;
      s === null && (s = e.stateNode = new Ny()), n.forEach(function(a) {
        var d = Oy.bind(null, e, a);
        s.has(a) || (s.add(a), a.then(d, d));
      });
    }
  }
  function Ot(e, n) {
    var s = n.deletions;
    if (s !== null) for (var a = 0; a < s.length; a++) {
      var d = s[a];
      try {
        var h = e, v = n, N = v;
        e: for (; N !== null; ) {
          switch (N.tag) {
            case 5:
              qe = N.stateNode, Lt = !1;
              break e;
            case 3:
              qe = N.stateNode.containerInfo, Lt = !0;
              break e;
            case 4:
              qe = N.stateNode.containerInfo, Lt = !0;
              break e;
          }
          N = N.return;
        }
        if (qe === null) throw Error(o(160));
        tf(h, v, d), qe = null, Lt = !1;
        var P = d.alternate;
        P !== null && (P.return = null), d.return = null;
      } catch (I) {
        Oe(d, n, I);
      }
    }
    if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) rf(n, e), n = n.sibling;
  }
  function rf(e, n) {
    var s = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Ot(n, e), Wt(e), a & 4) {
          try {
            xs(3, e, e.return), Ao(3, e);
          } catch (ae) {
            Oe(e, e.return, ae);
          }
          try {
            xs(5, e, e.return);
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        }
        break;
      case 1:
        Ot(n, e), Wt(e), a & 512 && s !== null && Sr(s, s.return);
        break;
      case 5:
        if (Ot(n, e), Wt(e), a & 512 && s !== null && Sr(s, s.return), e.flags & 32) {
          var d = e.stateNode;
          try {
            Br(d, "");
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        }
        if (a & 4 && (d = e.stateNode, d != null)) {
          var h = e.memoizedProps, v = s !== null ? s.memoizedProps : h, N = e.type, P = e.updateQueue;
          if (e.updateQueue = null, P !== null) try {
            N === "input" && h.type === "radio" && h.name != null && Tc(d, h), Oi(N, v);
            var I = Oi(N, h);
            for (v = 0; v < P.length; v += 2) {
              var H = P[v], V = P[v + 1];
              H === "style" ? Dc(d, V) : H === "dangerouslySetInnerHTML" ? $c(d, V) : H === "children" ? Br(d, V) : E(d, H, V, I);
            }
            switch (N) {
              case "input":
                Ei(d, h);
                break;
              case "textarea":
                Oc(d, h);
                break;
              case "select":
                var z = d._wrapperState.wasMultiple;
                d._wrapperState.wasMultiple = !!h.multiple;
                var te = h.value;
                te != null ? sr(d, !!h.multiple, te, !1) : z !== !!h.multiple && (h.defaultValue != null ? sr(
                  d,
                  !!h.multiple,
                  h.defaultValue,
                  !0
                ) : sr(d, !!h.multiple, h.multiple ? [] : "", !1));
            }
            d[ls] = h;
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        }
        break;
      case 6:
        if (Ot(n, e), Wt(e), a & 4) {
          if (e.stateNode === null) throw Error(o(162));
          d = e.stateNode, h = e.memoizedProps;
          try {
            d.nodeValue = h;
          } catch (ae) {
            Oe(e, e.return, ae);
          }
        }
        break;
      case 3:
        if (Ot(n, e), Wt(e), a & 4 && s !== null && s.memoizedState.isDehydrated) try {
          Xr(n.containerInfo);
        } catch (ae) {
          Oe(e, e.return, ae);
        }
        break;
      case 4:
        Ot(n, e), Wt(e);
        break;
      case 13:
        Ot(n, e), Wt(e), d = e.child, d.flags & 8192 && (h = d.memoizedState !== null, d.stateNode.isHidden = h, !h || d.alternate !== null && d.alternate.memoizedState !== null || (il = Me())), a & 4 && nf(e);
        break;
      case 22:
        if (H = s !== null && s.memoizedState !== null, e.mode & 1 ? (nt = (I = nt) || H, Ot(n, e), nt = I) : Ot(n, e), Wt(e), a & 8192) {
          if (I = e.memoizedState !== null, (e.stateNode.isHidden = I) && !H && (e.mode & 1) !== 0) for (re = e, H = e.child; H !== null; ) {
            for (V = re = H; re !== null; ) {
              switch (z = re, te = z.child, z.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  xs(4, z, z.return);
                  break;
                case 1:
                  Sr(z, z.return);
                  var se = z.stateNode;
                  if (typeof se.componentWillUnmount == "function") {
                    a = z, s = z.return;
                    try {
                      n = a, se.props = n.memoizedProps, se.state = n.memoizedState, se.componentWillUnmount();
                    } catch (ae) {
                      Oe(a, s, ae);
                    }
                  }
                  break;
                case 5:
                  Sr(z, z.return);
                  break;
                case 22:
                  if (z.memoizedState !== null) {
                    af(V);
                    continue;
                  }
              }
              te !== null ? (te.return = z, re = te) : af(V);
            }
            H = H.sibling;
          }
          e: for (H = null, V = e; ; ) {
            if (V.tag === 5) {
              if (H === null) {
                H = V;
                try {
                  d = V.stateNode, I ? (h = d.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none") : (N = V.stateNode, P = V.memoizedProps.style, v = P != null && P.hasOwnProperty("display") ? P.display : null, N.style.display = Fc("display", v));
                } catch (ae) {
                  Oe(e, e.return, ae);
                }
              }
            } else if (V.tag === 6) {
              if (H === null) try {
                V.stateNode.nodeValue = I ? "" : V.memoizedProps;
              } catch (ae) {
                Oe(e, e.return, ae);
              }
            } else if ((V.tag !== 22 && V.tag !== 23 || V.memoizedState === null || V === e) && V.child !== null) {
              V.child.return = V, V = V.child;
              continue;
            }
            if (V === e) break e;
            for (; V.sibling === null; ) {
              if (V.return === null || V.return === e) break e;
              H === V && (H = null), V = V.return;
            }
            H === V && (H = null), V.sibling.return = V.return, V = V.sibling;
          }
        }
        break;
      case 19:
        Ot(n, e), Wt(e), a & 4 && nf(e);
        break;
      case 21:
        break;
      default:
        Ot(
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
            if (Jd(s)) {
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
            a.flags & 32 && (Br(d, ""), a.flags &= -33);
            var h = ef(e);
            rl(e, h, d);
            break;
          case 3:
          case 4:
            var v = a.stateNode.containerInfo, N = ef(e);
            nl(e, N, v);
            break;
          default:
            throw Error(o(161));
        }
      } catch (P) {
        Oe(e, e.return, P);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function _y(e, n, s) {
    re = e, sf(e);
  }
  function sf(e, n, s) {
    for (var a = (e.mode & 1) !== 0; re !== null; ) {
      var d = re, h = d.child;
      if (d.tag === 22 && a) {
        var v = d.memoizedState !== null || To;
        if (!v) {
          var N = d.alternate, P = N !== null && N.memoizedState !== null || nt;
          N = To;
          var I = nt;
          if (To = v, (nt = P) && !I) for (re = d; re !== null; ) v = re, P = v.child, v.tag === 22 && v.memoizedState !== null ? lf(d) : P !== null ? (P.return = v, re = P) : lf(d);
          for (; h !== null; ) re = h, sf(h), h = h.sibling;
          re = d, To = N, nt = I;
        }
        of(e);
      } else (d.subtreeFlags & 8772) !== 0 && h !== null ? (h.return = d, re = h) : of(e);
    }
  }
  function of(e) {
    for (; re !== null; ) {
      var n = re;
      if ((n.flags & 8772) !== 0) {
        var s = n.alternate;
        try {
          if ((n.flags & 8772) !== 0) switch (n.tag) {
            case 0:
            case 11:
            case 15:
              nt || Ao(5, n);
              break;
            case 1:
              var a = n.stateNode;
              if (n.flags & 4 && !nt) if (s === null) a.componentDidMount();
              else {
                var d = n.elementType === n.type ? s.memoizedProps : At(n.type, s.memoizedProps);
                a.componentDidUpdate(d, s.memoizedState, a.__reactInternalSnapshotBeforeUpdate);
              }
              var h = n.updateQueue;
              h !== null && id(n, h, a);
              break;
            case 3:
              var v = n.updateQueue;
              if (v !== null) {
                if (s = null, n.child !== null) switch (n.child.tag) {
                  case 5:
                    s = n.child.stateNode;
                    break;
                  case 1:
                    s = n.child.stateNode;
                }
                id(n, v, s);
              }
              break;
            case 5:
              var N = n.stateNode;
              if (s === null && n.flags & 4) {
                s = N;
                var P = n.memoizedProps;
                switch (n.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    P.autoFocus && s.focus();
                    break;
                  case "img":
                    P.src && (s.src = P.src);
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
                var I = n.alternate;
                if (I !== null) {
                  var H = I.memoizedState;
                  if (H !== null) {
                    var V = H.dehydrated;
                    V !== null && Xr(V);
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
          nt || n.flags & 512 && tl(n);
        } catch (z) {
          Oe(n, n.return, z);
        }
      }
      if (n === e) {
        re = null;
        break;
      }
      if (s = n.sibling, s !== null) {
        s.return = n.return, re = s;
        break;
      }
      re = n.return;
    }
  }
  function af(e) {
    for (; re !== null; ) {
      var n = re;
      if (n === e) {
        re = null;
        break;
      }
      var s = n.sibling;
      if (s !== null) {
        s.return = n.return, re = s;
        break;
      }
      re = n.return;
    }
  }
  function lf(e) {
    for (; re !== null; ) {
      var n = re;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var s = n.return;
            try {
              Ao(4, n);
            } catch (P) {
              Oe(n, s, P);
            }
            break;
          case 1:
            var a = n.stateNode;
            if (typeof a.componentDidMount == "function") {
              var d = n.return;
              try {
                a.componentDidMount();
              } catch (P) {
                Oe(n, d, P);
              }
            }
            var h = n.return;
            try {
              tl(n);
            } catch (P) {
              Oe(n, h, P);
            }
            break;
          case 5:
            var v = n.return;
            try {
              tl(n);
            } catch (P) {
              Oe(n, v, P);
            }
        }
      } catch (P) {
        Oe(n, n.return, P);
      }
      if (n === e) {
        re = null;
        break;
      }
      var N = n.sibling;
      if (N !== null) {
        N.return = n.return, re = N;
        break;
      }
      re = n.return;
    }
  }
  var Cy = Math.ceil, Lo = $.ReactCurrentDispatcher, sl = $.ReactCurrentOwner, _t = $.ReactCurrentBatchConfig, Ne = 0, Ye = null, $e = null, Xe = 0, gt = 0, _r = vn(0), We = 0, ws = null, Vn = 0, Oo = 0, ol = 0, bs = null, lt = null, il = 0, Cr = 1 / 0, rn = null, Mo = !1, al = null, Nn = null, Io = !1, Sn = null, $o = 0, ks = 0, ll = null, Fo = -1, Do = 0;
  function st() {
    return (Ne & 6) !== 0 ? Me() : Fo !== -1 ? Fo : Fo = Me();
  }
  function _n(e) {
    return (e.mode & 1) === 0 ? 1 : (Ne & 2) !== 0 && Xe !== 0 ? Xe & -Xe : uy.transition !== null ? (Do === 0 && (Do = eu()), Do) : (e = _e, e !== 0 || (e = window.event, e = e === void 0 ? 16 : cu(e.type)), e);
  }
  function Mt(e, n, s, a) {
    if (50 < ks) throw ks = 0, ll = null, Error(o(185));
    Yr(e, s, a), ((Ne & 2) === 0 || e !== Ye) && (e === Ye && ((Ne & 2) === 0 && (Oo |= s), We === 4 && Cn(e, Xe)), ct(e, a), s === 1 && Ne === 0 && (n.mode & 1) === 0 && (Cr = Me() + 500, po && wn()));
  }
  function ct(e, n) {
    var s = e.callbackNode;
    ug(e, n);
    var a = Qs(e, e === Ye ? Xe : 0);
    if (a === 0) s !== null && Xc(s), e.callbackNode = null, e.callbackPriority = 0;
    else if (n = a & -a, e.callbackPriority !== n) {
      if (s != null && Xc(s), n === 1) e.tag === 0 ? cy(uf.bind(null, e)) : Gu(uf.bind(null, e)), oy(function() {
        (Ne & 6) === 0 && wn();
      }), s = null;
      else {
        switch (tu(a)) {
          case 1:
            s = zi;
            break;
          case 4:
            s = Zc;
            break;
          case 16:
            s = Ws;
            break;
          case 536870912:
            s = Jc;
            break;
          default:
            s = Ws;
        }
        s = vf(s, cf.bind(null, e));
      }
      e.callbackPriority = n, e.callbackNode = s;
    }
  }
  function cf(e, n) {
    if (Fo = -1, Do = 0, (Ne & 6) !== 0) throw Error(o(327));
    var s = e.callbackNode;
    if (Pr() && e.callbackNode !== s) return null;
    var a = Qs(e, e === Ye ? Xe : 0);
    if (a === 0) return null;
    if ((a & 30) !== 0 || (a & e.expiredLanes) !== 0 || n) n = Bo(e, a);
    else {
      n = a;
      var d = Ne;
      Ne |= 2;
      var h = ff();
      (Ye !== e || Xe !== n) && (rn = null, Cr = Me() + 500, Qn(e, n));
      do
        try {
          Ry();
          break;
        } catch (N) {
          df(e, N);
        }
      while (!0);
      _a(), Lo.current = h, Ne = d, $e !== null ? n = 0 : (Ye = null, Xe = 0, n = We);
    }
    if (n !== 0) {
      if (n === 2 && (d = Ui(e), d !== 0 && (a = d, n = cl(e, d))), n === 1) throw s = ws, Qn(e, 0), Cn(e, a), ct(e, Me()), s;
      if (n === 6) Cn(e, a);
      else {
        if (d = e.current.alternate, (a & 30) === 0 && !Py(d) && (n = Bo(e, a), n === 2 && (h = Ui(e), h !== 0 && (a = h, n = cl(e, h))), n === 1)) throw s = ws, Qn(e, 0), Cn(e, a), ct(e, Me()), s;
        switch (e.finishedWork = d, e.finishedLanes = a, n) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            Gn(e, lt, rn);
            break;
          case 3:
            if (Cn(e, a), (a & 130023424) === a && (n = il + 500 - Me(), 10 < n)) {
              if (Qs(e, 0) !== 0) break;
              if (d = e.suspendedLanes, (d & a) !== a) {
                st(), e.pingedLanes |= e.suspendedLanes & d;
                break;
              }
              e.timeoutHandle = ma(Gn.bind(null, e, lt, rn), n);
              break;
            }
            Gn(e, lt, rn);
            break;
          case 4:
            if (Cn(e, a), (a & 4194240) === a) break;
            for (n = e.eventTimes, d = -1; 0 < a; ) {
              var v = 31 - Et(a);
              h = 1 << v, v = n[v], v > d && (d = v), a &= ~h;
            }
            if (a = d, a = Me() - a, a = (120 > a ? 120 : 480 > a ? 480 : 1080 > a ? 1080 : 1920 > a ? 1920 : 3e3 > a ? 3e3 : 4320 > a ? 4320 : 1960 * Cy(a / 1960)) - a, 10 < a) {
              e.timeoutHandle = ma(Gn.bind(null, e, lt, rn), a);
              break;
            }
            Gn(e, lt, rn);
            break;
          case 5:
            Gn(e, lt, rn);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return ct(e, Me()), e.callbackNode === s ? cf.bind(null, e) : null;
  }
  function cl(e, n) {
    var s = bs;
    return e.current.memoizedState.isDehydrated && (Qn(e, n).flags |= 256), e = Bo(e, n), e !== 2 && (n = lt, lt = s, n !== null && ul(n)), e;
  }
  function ul(e) {
    lt === null ? lt = e : lt.push.apply(lt, e);
  }
  function Py(e) {
    for (var n = e; ; ) {
      if (n.flags & 16384) {
        var s = n.updateQueue;
        if (s !== null && (s = s.stores, s !== null)) for (var a = 0; a < s.length; a++) {
          var d = s[a], h = d.getSnapshot;
          d = d.value;
          try {
            if (!Rt(h(), d)) return !1;
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
  function Cn(e, n) {
    for (n &= ~ol, n &= ~Oo, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
      var s = 31 - Et(n), a = 1 << s;
      e[s] = -1, n &= ~a;
    }
  }
  function uf(e) {
    if ((Ne & 6) !== 0) throw Error(o(327));
    Pr();
    var n = Qs(e, 0);
    if ((n & 1) === 0) return ct(e, Me()), null;
    var s = Bo(e, n);
    if (e.tag !== 0 && s === 2) {
      var a = Ui(e);
      a !== 0 && (n = a, s = cl(e, a));
    }
    if (s === 1) throw s = ws, Qn(e, 0), Cn(e, n), ct(e, Me()), s;
    if (s === 6) throw Error(o(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = n, Gn(e, lt, rn), ct(e, Me()), null;
  }
  function dl(e, n) {
    var s = Ne;
    Ne |= 1;
    try {
      return e(n);
    } finally {
      Ne = s, Ne === 0 && (Cr = Me() + 500, po && wn());
    }
  }
  function Yn(e) {
    Sn !== null && Sn.tag === 0 && (Ne & 6) === 0 && Pr();
    var n = Ne;
    Ne |= 1;
    var s = _t.transition, a = _e;
    try {
      if (_t.transition = null, _e = 1, e) return e();
    } finally {
      _e = a, _t.transition = s, Ne = n, (Ne & 6) === 0 && wn();
    }
  }
  function fl() {
    gt = _r.current, Ee(_r);
  }
  function Qn(e, n) {
    e.finishedWork = null, e.finishedLanes = 0;
    var s = e.timeoutHandle;
    if (s !== -1 && (e.timeoutHandle = -1, sy(s)), $e !== null) for (s = $e.return; s !== null; ) {
      var a = s;
      switch (ba(a), a.tag) {
        case 1:
          a = a.type.childContextTypes, a != null && uo();
          break;
        case 3:
          jr(), Ee(ot), Ee(Je), Oa();
          break;
        case 5:
          Aa(a);
          break;
        case 4:
          jr();
          break;
        case 13:
          Ee(Ae);
          break;
        case 19:
          Ee(Ae);
          break;
        case 10:
          Ca(a.type._context);
          break;
        case 22:
        case 23:
          fl();
      }
      s = s.return;
    }
    if (Ye = e, $e = e = Pn(e.current, null), Xe = gt = n, We = 0, ws = null, ol = Oo = Vn = 0, lt = bs = null, Un !== null) {
      for (n = 0; n < Un.length; n++) if (s = Un[n], a = s.interleaved, a !== null) {
        s.interleaved = null;
        var d = a.next, h = s.pending;
        if (h !== null) {
          var v = h.next;
          h.next = d, a.next = v;
        }
        s.pending = a;
      }
      Un = null;
    }
    return e;
  }
  function df(e, n) {
    do {
      var s = $e;
      try {
        if (_a(), jo.current = Co, No) {
          for (var a = Le.memoizedState; a !== null; ) {
            var d = a.queue;
            d !== null && (d.pending = null), a = a.next;
          }
          No = !1;
        }
        if (Hn = 0, Ve = Ue = Le = null, hs = !1, ms = 0, sl.current = null, s === null || s.return === null) {
          We = 1, ws = n, $e = null;
          break;
        }
        e: {
          var h = e, v = s.return, N = s, P = n;
          if (n = Xe, N.flags |= 32768, P !== null && typeof P == "object" && typeof P.then == "function") {
            var I = P, H = N, V = H.tag;
            if ((H.mode & 1) === 0 && (V === 0 || V === 11 || V === 15)) {
              var z = H.alternate;
              z ? (H.updateQueue = z.updateQueue, H.memoizedState = z.memoizedState, H.lanes = z.lanes) : (H.updateQueue = null, H.memoizedState = null);
            }
            var te = Md(v);
            if (te !== null) {
              te.flags &= -257, Id(te, v, N, h, n), te.mode & 1 && Od(h, I, n), n = te, P = I;
              var se = n.updateQueue;
              if (se === null) {
                var ae = /* @__PURE__ */ new Set();
                ae.add(P), n.updateQueue = ae;
              } else se.add(P);
              break e;
            } else {
              if ((n & 1) === 0) {
                Od(h, I, n), pl();
                break e;
              }
              P = Error(o(426));
            }
          } else if (Te && N.mode & 1) {
            var Ie = Md(v);
            if (Ie !== null) {
              (Ie.flags & 65536) === 0 && (Ie.flags |= 256), Id(Ie, v, N, h, n), Na(Nr(P, N));
              break e;
            }
          }
          h = P = Nr(P, N), We !== 4 && (We = 2), bs === null ? bs = [h] : bs.push(h), h = v;
          do {
            switch (h.tag) {
              case 3:
                h.flags |= 65536, n &= -n, h.lanes |= n;
                var L = Ad(h, P, n);
                od(h, L);
                break e;
              case 1:
                N = P;
                var T = h.type, O = h.stateNode;
                if ((h.flags & 128) === 0 && (typeof T.getDerivedStateFromError == "function" || O !== null && typeof O.componentDidCatch == "function" && (Nn === null || !Nn.has(O)))) {
                  h.flags |= 65536, n &= -n, h.lanes |= n;
                  var q = Ld(h, N, n);
                  od(h, q);
                  break e;
                }
            }
            h = h.return;
          } while (h !== null);
        }
        hf(s);
      } catch (ce) {
        n = ce, $e === s && s !== null && ($e = s = s.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ff() {
    var e = Lo.current;
    return Lo.current = Co, e === null ? Co : e;
  }
  function pl() {
    (We === 0 || We === 3 || We === 2) && (We = 4), Ye === null || (Vn & 268435455) === 0 && (Oo & 268435455) === 0 || Cn(Ye, Xe);
  }
  function Bo(e, n) {
    var s = Ne;
    Ne |= 2;
    var a = ff();
    (Ye !== e || Xe !== n) && (rn = null, Qn(e, n));
    do
      try {
        Ey();
        break;
      } catch (d) {
        df(e, d);
      }
    while (!0);
    if (_a(), Ne = s, Lo.current = a, $e !== null) throw Error(o(261));
    return Ye = null, Xe = 0, We;
  }
  function Ey() {
    for (; $e !== null; ) pf($e);
  }
  function Ry() {
    for (; $e !== null && !tg(); ) pf($e);
  }
  function pf(e) {
    var n = yf(e.alternate, e, gt);
    e.memoizedProps = e.pendingProps, n === null ? hf(e) : $e = n, sl.current = null;
  }
  function hf(e) {
    var n = e;
    do {
      var s = n.alternate;
      if (e = n.return, (n.flags & 32768) === 0) {
        if (s = ky(s, n, gt), s !== null) {
          $e = s;
          return;
        }
      } else {
        if (s = jy(s, n), s !== null) {
          s.flags &= 32767, $e = s;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          We = 6, $e = null;
          return;
        }
      }
      if (n = n.sibling, n !== null) {
        $e = n;
        return;
      }
      $e = n = e;
    } while (n !== null);
    We === 0 && (We = 5);
  }
  function Gn(e, n, s) {
    var a = _e, d = _t.transition;
    try {
      _t.transition = null, _e = 1, Ty(e, n, s, a);
    } finally {
      _t.transition = d, _e = a;
    }
    return null;
  }
  function Ty(e, n, s, a) {
    do
      Pr();
    while (Sn !== null);
    if ((Ne & 6) !== 0) throw Error(o(327));
    s = e.finishedWork;
    var d = e.finishedLanes;
    if (s === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, s === e.current) throw Error(o(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var h = s.lanes | s.childLanes;
    if (dg(e, h), e === Ye && ($e = Ye = null, Xe = 0), (s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0 || Io || (Io = !0, vf(Ws, function() {
      return Pr(), null;
    })), h = (s.flags & 15990) !== 0, (s.subtreeFlags & 15990) !== 0 || h) {
      h = _t.transition, _t.transition = null;
      var v = _e;
      _e = 1;
      var N = Ne;
      Ne |= 4, sl.current = null, Sy(e, s), rf(s, e), Xg(pa), qs = !!fa, pa = fa = null, e.current = s, _y(s), ng(), Ne = N, _e = v, _t.transition = h;
    } else e.current = s;
    if (Io && (Io = !1, Sn = e, $o = d), h = e.pendingLanes, h === 0 && (Nn = null), og(s.stateNode), ct(e, Me()), n !== null) for (a = e.onRecoverableError, s = 0; s < n.length; s++) d = n[s], a(d.value, { componentStack: d.stack, digest: d.digest });
    if (Mo) throw Mo = !1, e = al, al = null, e;
    return ($o & 1) !== 0 && e.tag !== 0 && Pr(), h = e.pendingLanes, (h & 1) !== 0 ? e === ll ? ks++ : (ks = 0, ll = e) : ks = 0, wn(), null;
  }
  function Pr() {
    if (Sn !== null) {
      var e = tu($o), n = _t.transition, s = _e;
      try {
        if (_t.transition = null, _e = 16 > e ? 16 : e, Sn === null) var a = !1;
        else {
          if (e = Sn, Sn = null, $o = 0, (Ne & 6) !== 0) throw Error(o(331));
          var d = Ne;
          for (Ne |= 4, re = e.current; re !== null; ) {
            var h = re, v = h.child;
            if ((re.flags & 16) !== 0) {
              var N = h.deletions;
              if (N !== null) {
                for (var P = 0; P < N.length; P++) {
                  var I = N[P];
                  for (re = I; re !== null; ) {
                    var H = re;
                    switch (H.tag) {
                      case 0:
                      case 11:
                      case 15:
                        xs(8, H, h);
                    }
                    var V = H.child;
                    if (V !== null) V.return = H, re = V;
                    else for (; re !== null; ) {
                      H = re;
                      var z = H.sibling, te = H.return;
                      if (Zd(H), H === I) {
                        re = null;
                        break;
                      }
                      if (z !== null) {
                        z.return = te, re = z;
                        break;
                      }
                      re = te;
                    }
                  }
                }
                var se = h.alternate;
                if (se !== null) {
                  var ae = se.child;
                  if (ae !== null) {
                    se.child = null;
                    do {
                      var Ie = ae.sibling;
                      ae.sibling = null, ae = Ie;
                    } while (ae !== null);
                  }
                }
                re = h;
              }
            }
            if ((h.subtreeFlags & 2064) !== 0 && v !== null) v.return = h, re = v;
            else e: for (; re !== null; ) {
              if (h = re, (h.flags & 2048) !== 0) switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  xs(9, h, h.return);
              }
              var L = h.sibling;
              if (L !== null) {
                L.return = h.return, re = L;
                break e;
              }
              re = h.return;
            }
          }
          var T = e.current;
          for (re = T; re !== null; ) {
            v = re;
            var O = v.child;
            if ((v.subtreeFlags & 2064) !== 0 && O !== null) O.return = v, re = O;
            else e: for (v = T; re !== null; ) {
              if (N = re, (N.flags & 2048) !== 0) try {
                switch (N.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ao(9, N);
                }
              } catch (ce) {
                Oe(N, N.return, ce);
              }
              if (N === v) {
                re = null;
                break e;
              }
              var q = N.sibling;
              if (q !== null) {
                q.return = N.return, re = q;
                break e;
              }
              re = N.return;
            }
          }
          if (Ne = d, wn(), Dt && typeof Dt.onPostCommitFiberRoot == "function") try {
            Dt.onPostCommitFiberRoot(Hs, e);
          } catch {
          }
          a = !0;
        }
        return a;
      } finally {
        _e = s, _t.transition = n;
      }
    }
    return !1;
  }
  function mf(e, n, s) {
    n = Nr(s, n), n = Ad(e, n, 1), e = kn(e, n, 1), n = st(), e !== null && (Yr(e, 1, n), ct(e, n));
  }
  function Oe(e, n, s) {
    if (e.tag === 3) mf(e, e, s);
    else for (; n !== null; ) {
      if (n.tag === 3) {
        mf(n, e, s);
        break;
      } else if (n.tag === 1) {
        var a = n.stateNode;
        if (typeof n.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Nn === null || !Nn.has(a))) {
          e = Nr(s, e), e = Ld(n, e, 1), n = kn(n, e, 1), e = st(), n !== null && (Yr(n, 1, e), ct(n, e));
          break;
        }
      }
      n = n.return;
    }
  }
  function Ay(e, n, s) {
    var a = e.pingCache;
    a !== null && a.delete(n), n = st(), e.pingedLanes |= e.suspendedLanes & s, Ye === e && (Xe & s) === s && (We === 4 || We === 3 && (Xe & 130023424) === Xe && 500 > Me() - il ? Qn(e, 0) : ol |= s), ct(e, n);
  }
  function gf(e, n) {
    n === 0 && ((e.mode & 1) === 0 ? n = 1 : (n = Ys, Ys <<= 1, (Ys & 130023424) === 0 && (Ys = 4194304)));
    var s = st();
    e = en(e, n), e !== null && (Yr(e, n, s), ct(e, s));
  }
  function Ly(e) {
    var n = e.memoizedState, s = 0;
    n !== null && (s = n.retryLane), gf(e, s);
  }
  function Oy(e, n) {
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
    a !== null && a.delete(n), gf(e, s);
  }
  var yf;
  yf = function(e, n, s) {
    if (e !== null) if (e.memoizedProps !== n.pendingProps || ot.current) at = !0;
    else {
      if ((e.lanes & s) === 0 && (n.flags & 128) === 0) return at = !1, by(e, n, s);
      at = (e.flags & 131072) !== 0;
    }
    else at = !1, Te && (n.flags & 1048576) !== 0 && Ku(n, mo, n.index);
    switch (n.lanes = 0, n.tag) {
      case 2:
        var a = n.type;
        Ro(e, n), e = n.pendingProps;
        var d = gr(n, Je.current);
        kr(n, s), d = $a(null, n, a, e, d, s);
        var h = Fa();
        return n.flags |= 1, typeof d == "object" && d !== null && typeof d.render == "function" && d.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, it(a) ? (h = !0, fo(n)) : h = !1, n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, Ra(n), d.updater = Po, n.stateNode = d, d._reactInternals = n, Ha(n, a, e, s), n = Ga(null, n, a, !0, h, s)) : (n.tag = 0, Te && h && wa(n), rt(null, n, d, s), n = n.child), n;
      case 16:
        a = n.elementType;
        e: {
          switch (Ro(e, n), e = n.pendingProps, d = a._init, a = d(a._payload), n.type = a, d = n.tag = Iy(a), e = At(a, e), d) {
            case 0:
              n = Qa(null, n, a, e, s);
              break e;
            case 1:
              n = Ud(null, n, a, e, s);
              break e;
            case 11:
              n = $d(null, n, a, e, s);
              break e;
            case 14:
              n = Fd(null, n, a, At(a.type, e), s);
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
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : At(a, d), Qa(e, n, a, d, s);
      case 1:
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : At(a, d), Ud(e, n, a, d, s);
      case 3:
        e: {
          if (Wd(n), e === null) throw Error(o(387));
          a = n.pendingProps, h = n.memoizedState, d = h.element, sd(e, n), bo(n, a, null, s);
          var v = n.memoizedState;
          if (a = v.element, h.isDehydrated) if (h = { element: a, isDehydrated: !1, cache: v.cache, pendingSuspenseBoundaries: v.pendingSuspenseBoundaries, transitions: v.transitions }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
            d = Nr(Error(o(423)), n), n = Hd(e, n, a, s, d);
            break e;
          } else if (a !== d) {
            d = Nr(Error(o(424)), n), n = Hd(e, n, a, s, d);
            break e;
          } else for (mt = yn(n.stateNode.containerInfo.firstChild), ht = n, Te = !0, Tt = null, s = nd(n, null, a, s), n.child = s; s; ) s.flags = s.flags & -3 | 4096, s = s.sibling;
          else {
            if (xr(), a === d) {
              n = nn(e, n, s);
              break e;
            }
            rt(e, n, a, s);
          }
          n = n.child;
        }
        return n;
      case 5:
        return ad(n), e === null && ja(n), a = n.type, d = n.pendingProps, h = e !== null ? e.memoizedProps : null, v = d.children, ha(a, d) ? v = null : h !== null && ha(a, h) && (n.flags |= 32), zd(e, n), rt(e, n, v, s), n.child;
      case 6:
        return e === null && ja(n), null;
      case 13:
        return Vd(e, n, s);
      case 4:
        return Ta(n, n.stateNode.containerInfo), a = n.pendingProps, e === null ? n.child = wr(n, null, a, s) : rt(e, n, a, s), n.child;
      case 11:
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : At(a, d), $d(e, n, a, d, s);
      case 7:
        return rt(e, n, n.pendingProps, s), n.child;
      case 8:
        return rt(e, n, n.pendingProps.children, s), n.child;
      case 12:
        return rt(e, n, n.pendingProps.children, s), n.child;
      case 10:
        e: {
          if (a = n.type._context, d = n.pendingProps, h = n.memoizedProps, v = d.value, Ce(vo, a._currentValue), a._currentValue = v, h !== null) if (Rt(h.value, v)) {
            if (h.children === d.children && !ot.current) {
              n = nn(e, n, s);
              break e;
            }
          } else for (h = n.child, h !== null && (h.return = n); h !== null; ) {
            var N = h.dependencies;
            if (N !== null) {
              v = h.child;
              for (var P = N.firstContext; P !== null; ) {
                if (P.context === a) {
                  if (h.tag === 1) {
                    P = tn(-1, s & -s), P.tag = 2;
                    var I = h.updateQueue;
                    if (I !== null) {
                      I = I.shared;
                      var H = I.pending;
                      H === null ? P.next = P : (P.next = H.next, H.next = P), I.pending = P;
                    }
                  }
                  h.lanes |= s, P = h.alternate, P !== null && (P.lanes |= s), Pa(
                    h.return,
                    s,
                    n
                  ), N.lanes |= s;
                  break;
                }
                P = P.next;
              }
            } else if (h.tag === 10) v = h.type === n.type ? null : h.child;
            else if (h.tag === 18) {
              if (v = h.return, v === null) throw Error(o(341));
              v.lanes |= s, N = v.alternate, N !== null && (N.lanes |= s), Pa(v, s, n), v = h.sibling;
            } else v = h.child;
            if (v !== null) v.return = h;
            else for (v = h; v !== null; ) {
              if (v === n) {
                v = null;
                break;
              }
              if (h = v.sibling, h !== null) {
                h.return = v.return, v = h;
                break;
              }
              v = v.return;
            }
            h = v;
          }
          rt(e, n, d.children, s), n = n.child;
        }
        return n;
      case 9:
        return d = n.type, a = n.pendingProps.children, kr(n, s), d = Nt(d), a = a(d), n.flags |= 1, rt(e, n, a, s), n.child;
      case 14:
        return a = n.type, d = At(a, n.pendingProps), d = At(a.type, d), Fd(e, n, a, d, s);
      case 15:
        return Dd(e, n, n.type, n.pendingProps, s);
      case 17:
        return a = n.type, d = n.pendingProps, d = n.elementType === a ? d : At(a, d), Ro(e, n), n.tag = 1, it(a) ? (e = !0, fo(n)) : e = !1, kr(n, s), Rd(n, a, d), Ha(n, a, d, s), Ga(null, n, a, !0, e, s);
      case 19:
        return Qd(e, n, s);
      case 22:
        return Bd(e, n, s);
    }
    throw Error(o(156, n.tag));
  };
  function vf(e, n) {
    return qc(e, n);
  }
  function My(e, n, s, a) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ct(e, n, s, a) {
    return new My(e, n, s, a);
  }
  function hl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Iy(e) {
    if (typeof e == "function") return hl(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Q) return 11;
      if (e === M) return 14;
    }
    return 2;
  }
  function Pn(e, n) {
    var s = e.alternate;
    return s === null ? (s = Ct(e.tag, n, e.key, e.mode), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = n, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 14680064, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, n = e.dependencies, s.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s;
  }
  function zo(e, n, s, a, d, h) {
    var v = 2;
    if (a = e, typeof e == "function") hl(e) && (v = 1);
    else if (typeof e == "string") v = 5;
    else e: switch (e) {
      case W:
        return Kn(s.children, d, h, n);
      case K:
        v = 8, d |= 8;
        break;
      case le:
        return e = Ct(12, s, n, d | 2), e.elementType = le, e.lanes = h, e;
      case D:
        return e = Ct(13, s, n, d), e.elementType = D, e.lanes = h, e;
      case J:
        return e = Ct(19, s, n, d), e.elementType = J, e.lanes = h, e;
      case ne:
        return Uo(s, d, h, n);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case ie:
            v = 10;
            break e;
          case ue:
            v = 9;
            break e;
          case Q:
            v = 11;
            break e;
          case M:
            v = 14;
            break e;
          case U:
            v = 16, a = null;
            break e;
        }
        throw Error(o(130, e == null ? e : typeof e, ""));
    }
    return n = Ct(v, s, n, d), n.elementType = e, n.type = a, n.lanes = h, n;
  }
  function Kn(e, n, s, a) {
    return e = Ct(7, e, a, n), e.lanes = s, e;
  }
  function Uo(e, n, s, a) {
    return e = Ct(22, e, a, n), e.elementType = ne, e.lanes = s, e.stateNode = { isHidden: !1 }, e;
  }
  function ml(e, n, s) {
    return e = Ct(6, e, null, n), e.lanes = s, e;
  }
  function gl(e, n, s) {
    return n = Ct(4, e.children !== null ? e.children : [], e.key, n), n.lanes = s, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
  }
  function $y(e, n, s, a, d) {
    this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Wi(0), this.expirationTimes = Wi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wi(0), this.identifierPrefix = a, this.onRecoverableError = d, this.mutableSourceEagerHydrationData = null;
  }
  function yl(e, n, s, a, d, h, v, N, P) {
    return e = new $y(e, n, s, N, P), n === 1 ? (n = 1, h === !0 && (n |= 8)) : n = 0, h = Ct(3, null, null, n), e.current = h, h.stateNode = e, h.memoizedState = { element: a, isDehydrated: s, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ra(h), e;
  }
  function Fy(e, n, s) {
    var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Y, key: a == null ? null : "" + a, children: e, containerInfo: n, implementation: s };
  }
  function xf(e) {
    if (!e) return xn;
    e = e._reactInternals;
    e: {
      if ($n(e) !== e || e.tag !== 1) throw Error(o(170));
      var n = e;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (it(n.type)) {
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
      if (it(s)) return Yu(e, s, n);
    }
    return n;
  }
  function wf(e, n, s, a, d, h, v, N, P) {
    return e = yl(s, a, !0, e, d, h, v, N, P), e.context = xf(null), s = e.current, a = st(), d = _n(s), h = tn(a, d), h.callback = n ?? null, kn(s, h, d), e.current.lanes = d, Yr(e, d, a), ct(e, a), e;
  }
  function Wo(e, n, s, a) {
    var d = n.current, h = st(), v = _n(d);
    return s = xf(s), n.context === null ? n.context = s : n.pendingContext = s, n = tn(h, v), n.payload = { element: e }, a = a === void 0 ? null : a, a !== null && (n.callback = a), e = kn(d, n, v), e !== null && (Mt(e, d, v, h), wo(e, d, v)), v;
  }
  function Ho(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function bf(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < n ? s : n;
    }
  }
  function vl(e, n) {
    bf(e, n), (e = e.alternate) && bf(e, n);
  }
  function Dy() {
    return null;
  }
  var kf = typeof reportError == "function" ? reportError : function(e) {
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
      Yn(function() {
        Wo(null, e, null, null);
      }), n[qt] = null;
    }
  };
  function Vo(e) {
    this._internalRoot = e;
  }
  Vo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = su();
      e = { blockedOn: null, target: e, priority: n };
      for (var s = 0; s < hn.length && n !== 0 && n < hn[s].priority; s++) ;
      hn.splice(s, 0, e), s === 0 && au(e);
    }
  };
  function wl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Yo(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function jf() {
  }
  function By(e, n, s, a, d) {
    if (d) {
      if (typeof a == "function") {
        var h = a;
        a = function() {
          var I = Ho(v);
          h.call(I);
        };
      }
      var v = wf(n, a, e, 0, null, !1, !1, "", jf);
      return e._reactRootContainer = v, e[qt] = v.current, is(e.nodeType === 8 ? e.parentNode : e), Yn(), v;
    }
    for (; d = e.lastChild; ) e.removeChild(d);
    if (typeof a == "function") {
      var N = a;
      a = function() {
        var I = Ho(P);
        N.call(I);
      };
    }
    var P = yl(e, 0, !1, null, null, !1, !1, "", jf);
    return e._reactRootContainer = P, e[qt] = P.current, is(e.nodeType === 8 ? e.parentNode : e), Yn(function() {
      Wo(n, P, s, a);
    }), P;
  }
  function Qo(e, n, s, a, d) {
    var h = s._reactRootContainer;
    if (h) {
      var v = h;
      if (typeof d == "function") {
        var N = d;
        d = function() {
          var P = Ho(v);
          N.call(P);
        };
      }
      Wo(n, v, e, d);
    } else v = By(s, n, e, d, a);
    return Ho(v);
  }
  nu = function(e) {
    switch (e.tag) {
      case 3:
        var n = e.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var s = Vr(n.pendingLanes);
          s !== 0 && (Hi(n, s | 1), ct(n, Me()), (Ne & 6) === 0 && (Cr = Me() + 500, wn()));
        }
        break;
      case 13:
        Yn(function() {
          var a = en(e, 1);
          if (a !== null) {
            var d = st();
            Mt(a, e, 1, d);
          }
        }), vl(e, 1);
    }
  }, Vi = function(e) {
    if (e.tag === 13) {
      var n = en(e, 134217728);
      if (n !== null) {
        var s = st();
        Mt(n, e, 134217728, s);
      }
      vl(e, 134217728);
    }
  }, ru = function(e) {
    if (e.tag === 13) {
      var n = _n(e), s = en(e, n);
      if (s !== null) {
        var a = st();
        Mt(s, e, n, a);
      }
      vl(e, n);
    }
  }, su = function() {
    return _e;
  }, ou = function(e, n) {
    var s = _e;
    try {
      return _e = e, n();
    } finally {
      _e = s;
    }
  }, $i = function(e, n, s) {
    switch (n) {
      case "input":
        if (Ei(e, s), n = s.name, s.type === "radio" && n != null) {
          for (s = e; s.parentNode; ) s = s.parentNode;
          for (s = s.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < s.length; n++) {
            var a = s[n];
            if (a !== e && a.form === e.form) {
              var d = co(a);
              if (!d) throw Error(o(90));
              Ds(a), Ei(a, d);
            }
          }
        }
        break;
      case "textarea":
        Oc(e, s);
        break;
      case "select":
        n = s.value, n != null && sr(e, !!s.multiple, n, !1);
    }
  }, Wc = dl, Hc = Yn;
  var zy = { usingClientEntryPoint: !1, Events: [cs, hr, co, zc, Uc, dl] }, js = { findFiberByHostInstance: Fn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Uy = { bundleType: js.bundleType, version: js.version, rendererPackageName: js.rendererPackageName, rendererConfig: js.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: $.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Gc(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: js.findFiberByHostInstance || Dy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Go = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Go.isDisabled && Go.supportsFiber) try {
      Hs = Go.inject(Uy), Dt = Go;
    } catch {
    }
  }
  return ut.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = zy, ut.createPortal = function(e, n) {
    var s = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!wl(n)) throw Error(o(200));
    return Fy(e, n, null, s);
  }, ut.createRoot = function(e, n) {
    if (!wl(e)) throw Error(o(299));
    var s = !1, a = "", d = kf;
    return n != null && (n.unstable_strictMode === !0 && (s = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onRecoverableError !== void 0 && (d = n.onRecoverableError)), n = yl(e, 1, !1, null, null, s, !1, a, d), e[qt] = n.current, is(e.nodeType === 8 ? e.parentNode : e), new xl(n);
  }, ut.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = Gc(n), e = e === null ? null : e.stateNode, e;
  }, ut.flushSync = function(e) {
    return Yn(e);
  }, ut.hydrate = function(e, n, s) {
    if (!Yo(n)) throw Error(o(200));
    return Qo(null, e, n, !0, s);
  }, ut.hydrateRoot = function(e, n, s) {
    if (!wl(e)) throw Error(o(405));
    var a = s != null && s.hydratedSources || null, d = !1, h = "", v = kf;
    if (s != null && (s.unstable_strictMode === !0 && (d = !0), s.identifierPrefix !== void 0 && (h = s.identifierPrefix), s.onRecoverableError !== void 0 && (v = s.onRecoverableError)), n = wf(n, null, e, 1, s ?? null, d, !1, h, v), e[qt] = n.current, is(e), a) for (e = 0; e < a.length; e++) s = a[e], d = s._getVersion, d = d(s._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [s, d] : n.mutableSourceEagerHydrationData.push(
      s,
      d
    );
    return new Vo(n);
  }, ut.render = function(e, n, s) {
    if (!Yo(n)) throw Error(o(200));
    return Qo(null, e, n, !1, s);
  }, ut.unmountComponentAtNode = function(e) {
    if (!Yo(e)) throw Error(o(40));
    return e._reactRootContainer ? (Yn(function() {
      Qo(null, null, e, !1, function() {
        e._reactRootContainer = null, e[qt] = null;
      });
    }), !0) : !1;
  }, ut.unstable_batchedUpdates = dl, ut.unstable_renderSubtreeIntoContainer = function(e, n, s, a) {
    if (!Yo(s)) throw Error(o(200));
    if (e == null || e._reactInternals === void 0) throw Error(o(38));
    return Qo(e, n, s, !1, a);
  }, ut.version = "18.3.1-next-f1338f8080-20240426", ut;
}
var Tf;
function Cp() {
  if (Tf) return jl.exports;
  Tf = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (r) {
        console.error(r);
      }
  }
  return t(), jl.exports = Xy(), jl.exports;
}
var Af;
function Zy() {
  if (Af) return Ko;
  Af = 1;
  var t = Cp();
  return Ko.createRoot = t.createRoot, Ko.hydrateRoot = t.hydrateRoot, Ko;
}
var Jy = Zy(), As = class {
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
}, ev = {
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
}, tv = class {
  // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
  // type at app boot; and if we leave that type, then any new timer provider
  // would need to support ReturnType<typeof setTimeout>, which is infeasible.
  //
  // We settle for type safety for the TimeoutProvider type, and accept that
  // this class is unsafe internally to allow for extension.
  #e = ev;
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
}, Zn = new tv();
function nv(t) {
  setTimeout(t, 0);
}
var er = typeof window > "u" || "Deno" in globalThis;
function dt() {
}
function rv(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function $l(t) {
  return typeof t == "number" && t >= 0 && t !== 1 / 0;
}
function Pp(t, r) {
  return Math.max(t + (r || 0) - Date.now(), 0);
}
function Ln(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function Pt(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function Lf(t, r) {
  const {
    type: o = "all",
    exact: i,
    fetchStatus: c,
    predicate: u,
    queryKey: f,
    stale: p
  } = t;
  if (f) {
    if (i) {
      if (r.queryHash !== tc(f, r.options))
        return !1;
    } else if (!Es(r.queryKey, f))
      return !1;
  }
  if (o !== "all") {
    const m = r.isActive();
    if (o === "active" && !m || o === "inactive" && m)
      return !1;
  }
  return !(typeof p == "boolean" && r.isStale() !== p || c && c !== r.state.fetchStatus || u && !u(r));
}
function Of(t, r) {
  const { exact: o, status: i, predicate: c, mutationKey: u } = t;
  if (u) {
    if (!r.options.mutationKey)
      return !1;
    if (o) {
      if (Ps(r.options.mutationKey) !== Ps(u))
        return !1;
    } else if (!Es(r.options.mutationKey, u))
      return !1;
  }
  return !(i && r.state.status !== i || c && !c(r));
}
function tc(t, r) {
  return (r?.queryKeyHashFn || Ps)(t);
}
function Ps(t) {
  return JSON.stringify(
    t,
    (r, o) => Dl(o) ? Object.keys(o).sort().reduce((i, c) => (i[c] = o[c], i), {}) : o
  );
}
function Es(t, r) {
  return t === r ? !0 : typeof t != typeof r ? !1 : t && r && typeof t == "object" && typeof r == "object" ? Object.keys(r).every((o) => Es(t[o], r[o])) : !1;
}
var sv = Object.prototype.hasOwnProperty;
function Ep(t, r, o = 0) {
  if (t === r)
    return t;
  if (o > 500) return r;
  const i = Mf(t) && Mf(r);
  if (!i && !(Dl(t) && Dl(r))) return r;
  const u = (i ? t : Object.keys(t)).length, f = i ? r : Object.keys(r), p = f.length, m = i ? new Array(p) : {};
  let g = 0;
  for (let y = 0; y < p; y++) {
    const x = i ? y : f[y], b = t[x], j = r[x];
    if (b === j) {
      m[x] = b, (i ? y < u : sv.call(t, x)) && g++;
      continue;
    }
    if (b === null || j === null || typeof b != "object" || typeof j != "object") {
      m[x] = j;
      continue;
    }
    const _ = Ep(b, j, o + 1);
    m[x] = _, _ === b && g++;
  }
  return u === p && g === u ? t : m;
}
function Fl(t, r) {
  if (!r || Object.keys(t).length !== Object.keys(r).length)
    return !1;
  for (const o in t)
    if (t[o] !== r[o])
      return !1;
  return !0;
}
function Mf(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function Dl(t) {
  if (!If(t))
    return !1;
  const r = t.constructor;
  if (r === void 0)
    return !0;
  const o = r.prototype;
  return !(!If(o) || !o.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(t) !== Object.prototype);
}
function If(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function ov(t) {
  return new Promise((r) => {
    Zn.setTimeout(r, t);
  });
}
function Bl(t, r, o) {
  return typeof o.structuralSharing == "function" ? o.structuralSharing(t, r) : o.structuralSharing !== !1 ? Ep(t, r) : r;
}
function iv(t, r, o = 0) {
  const i = [...t, r];
  return o && i.length > o ? i.slice(1) : i;
}
function av(t, r, o = 0) {
  const i = [r, ...t];
  return o && i.length > o ? i.slice(0, -1) : i;
}
var nc = /* @__PURE__ */ Symbol();
function Rp(t, r) {
  return !t.queryFn && r?.initialPromise ? () => r.initialPromise : !t.queryFn || t.queryFn === nc ? () => Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)) : t.queryFn;
}
function Tp(t, r) {
  return typeof t == "function" ? t(...r) : !!t;
}
function lv(t, r, o) {
  let i = !1, c;
  return Object.defineProperty(t, "signal", {
    enumerable: !0,
    get: () => (c ??= r(), i || (i = !0, c.aborted ? o() : c.addEventListener("abort", o, { once: !0 })), c)
  }), t;
}
var cv = class extends As {
  #e;
  #t;
  #n;
  constructor() {
    super(), this.#n = (t) => {
      if (!er && window.addEventListener) {
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
}, rc = new cv();
function zl() {
  let t, r;
  const o = new Promise((c, u) => {
    t = c, r = u;
  });
  o.status = "pending", o.catch(() => {
  });
  function i(c) {
    Object.assign(o, c), delete o.resolve, delete o.reject;
  }
  return o.resolve = (c) => {
    i({
      status: "fulfilled",
      value: c
    }), t(c);
  }, o.reject = (c) => {
    i({
      status: "rejected",
      reason: c
    }), r(c);
  }, o;
}
var uv = nv;
function dv() {
  let t = [], r = 0, o = (p) => {
    p();
  }, i = (p) => {
    p();
  }, c = uv;
  const u = (p) => {
    r ? t.push(p) : c(() => {
      o(p);
    });
  }, f = () => {
    const p = t;
    t = [], p.length && c(() => {
      i(() => {
        p.forEach((m) => {
          o(m);
        });
      });
    });
  };
  return {
    batch: (p) => {
      let m;
      r++;
      try {
        m = p();
      } finally {
        r--, r || f();
      }
      return m;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (p) => (...m) => {
      u(() => {
        p(...m);
      });
    },
    schedule: u,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (p) => {
      o = p;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (p) => {
      i = p;
    },
    setScheduler: (p) => {
      c = p;
    }
  };
}
var Ze = dv(), fv = class extends As {
  #e = !0;
  #t;
  #n;
  constructor() {
    super(), this.#n = (t) => {
      if (!er && window.addEventListener) {
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
}, ai = new fv();
function pv(t) {
  return Math.min(1e3 * 2 ** t, 3e4);
}
function Ap(t) {
  return (t ?? "online") === "online" ? ai.isOnline() : !0;
}
var Ul = class extends Error {
  constructor(t) {
    super("CancelledError"), this.revert = t?.revert, this.silent = t?.silent;
  }
};
function Lp(t) {
  let r = !1, o = 0, i;
  const c = zl(), u = () => c.status !== "pending", f = (k) => {
    if (!u()) {
      const S = new Ul(k);
      b(S), t.onCancel?.(S);
    }
  }, p = () => {
    r = !0;
  }, m = () => {
    r = !1;
  }, g = () => rc.isFocused() && (t.networkMode === "always" || ai.isOnline()) && t.canRun(), y = () => Ap(t.networkMode) && t.canRun(), x = (k) => {
    u() || (i?.(), c.resolve(k));
  }, b = (k) => {
    u() || (i?.(), c.reject(k));
  }, j = () => new Promise((k) => {
    i = (S) => {
      (u() || g()) && k(S);
    }, t.onPause?.();
  }).then(() => {
    i = void 0, u() || t.onContinue?.();
  }), _ = () => {
    if (u())
      return;
    let k;
    const S = o === 0 ? t.initialPromise : void 0;
    try {
      k = S ?? t.fn();
    } catch (C) {
      k = Promise.reject(C);
    }
    Promise.resolve(k).then(x).catch((C) => {
      if (u())
        return;
      const R = t.retry ?? (er ? 0 : 3), E = t.retryDelay ?? pv, $ = typeof E == "function" ? E(o, C) : E, G = R === !0 || typeof R == "number" && o < R || typeof R == "function" && R(o, C);
      if (r || !G) {
        b(C);
        return;
      }
      o++, t.onFail?.(o, C), ov($).then(() => g() ? void 0 : j()).then(() => {
        r ? b(C) : _();
      });
    });
  };
  return {
    promise: c,
    status: () => c.status,
    cancel: f,
    continue: () => (i?.(), c),
    cancelRetry: p,
    continueRetry: m,
    canStart: y,
    start: () => (y() ? _() : j().then(_), c)
  };
}
var Op = class {
  #e;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), $l(this.gcTime) && (this.#e = Zn.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(t) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      t ?? (er ? 1 / 0 : 300 * 1e3)
    );
  }
  clearGcTimeout() {
    this.#e && (Zn.clearTimeout(this.#e), this.#e = void 0);
  }
}, hv = class extends Op {
  #e;
  #t;
  #n;
  #s;
  #r;
  #a;
  #i;
  constructor(t) {
    super(), this.#i = !1, this.#a = t.defaultOptions, this.setOptions(t.options), this.observers = [], this.#s = t.client, this.#n = this.#s.getQueryCache(), this.queryKey = t.queryKey, this.queryHash = t.queryHash, this.#e = Ff(this.options), this.state = t.state ?? this.#e, this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#r?.promise;
  }
  setOptions(t) {
    if (this.options = { ...this.#a, ...t }, this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const r = Ff(this.options);
      r.data !== void 0 && (this.setState(
        $f(r.data, r.dataUpdatedAt)
      ), this.#e = r);
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && this.#n.remove(this);
  }
  setData(t, r) {
    const o = Bl(this.state.data, t, this.options);
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
    return this.#r?.cancel(t), r ? r.then(dt).catch(dt) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(this.#e);
  }
  isActive() {
    return this.observers.some(
      (t) => Pt(t.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === nc || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => Ln(t.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (t) => t.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(t = 0) {
    return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !Pp(this.state.dataUpdatedAt, t);
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
      const p = this.observers.find((m) => m.options.queryFn);
      p && this.setOptions(p.options);
    }
    const o = new AbortController(), i = (p) => {
      Object.defineProperty(p, "signal", {
        enumerable: !0,
        get: () => (this.#i = !0, o.signal)
      });
    }, c = () => {
      const p = Rp(this.options, r), g = (() => {
        const y = {
          client: this.#s,
          queryKey: this.queryKey,
          meta: this.meta
        };
        return i(y), y;
      })();
      return this.#i = !1, this.options.persister ? this.options.persister(
        p,
        g,
        this
      ) : p(g);
    }, f = (() => {
      const p = {
        fetchOptions: r,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#s,
        state: this.state,
        fetchFn: c
      };
      return i(p), p;
    })();
    this.options.behavior?.onFetch(f, this), this.#t = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== f.fetchOptions?.meta) && this.#o({ type: "fetch", meta: f.fetchOptions?.meta }), this.#r = Lp({
      initialPromise: r?.initialPromise,
      fn: f.fetchFn,
      onCancel: (p) => {
        p instanceof Ul && p.revert && this.setState({
          ...this.#t,
          fetchStatus: "idle"
        }), o.abort();
      },
      onFail: (p, m) => {
        this.#o({ type: "failed", failureCount: p, error: m });
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
      const p = await this.#r.start();
      if (p === void 0)
        throw new Error(`${this.queryHash} data is undefined`);
      return this.setData(p), this.#n.config.onSuccess?.(p, this), this.#n.config.onSettled?.(
        p,
        this.state.error,
        this
      ), p;
    } catch (p) {
      if (p instanceof Ul) {
        if (p.silent)
          return this.#r.promise;
        if (p.revert) {
          if (this.state.data === void 0)
            throw p;
          return this.state.data;
        }
      }
      throw this.#o({
        type: "error",
        error: p
      }), this.#n.config.onError?.(
        p,
        this
      ), this.#n.config.onSettled?.(
        this.state.data,
        p,
        this
      ), p;
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
            ...Mp(o.data, this.options),
            fetchMeta: t.meta ?? null
          };
        case "success":
          const i = {
            ...o,
            ...$f(t.data, t.dataUpdatedAt),
            dataUpdateCount: o.dataUpdateCount + 1,
            ...!t.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          return this.#t = t.manual ? i : void 0, i;
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
    this.state = r(this.state), Ze.batch(() => {
      this.observers.forEach((o) => {
        o.onQueryUpdate();
      }), this.#n.notify({ query: this, type: "updated", action: t });
    });
  }
};
function Mp(t, r) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Ap(r.networkMode) ? "fetching" : "paused",
    ...t === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function $f(t, r) {
  return {
    data: t,
    dataUpdatedAt: r ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function Ff(t) {
  const r = typeof t.initialData == "function" ? t.initialData() : t.initialData, o = r !== void 0, i = o ? typeof t.initialDataUpdatedAt == "function" ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt : 0;
  return {
    data: r,
    dataUpdateCount: 0,
    dataUpdatedAt: o ? i ?? Date.now() : 0,
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
var mv = class extends As {
  constructor(t, r) {
    super(), this.options = r, this.#e = t, this.#o = null, this.#i = zl(), this.bindMethods(), this.setOptions(r);
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
    this.listeners.size === 1 && (this.#t.addObserver(this), Df(this.#t, this.options) ? this.#d() : this.updateResult(), this.#x());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Wl(
      this.#t,
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return Wl(
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
    if (this.options = this.#e.defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Pt(this.options.enabled, this.#t) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    this.#k(), this.#t.setOptions(this.options), r._defaulted && !Fl(this.options, r) && this.#e.getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: this.#t,
      observer: this
    });
    const i = this.hasListeners();
    i && Bf(
      this.#t,
      o,
      this.options,
      r
    ) && this.#d(), this.updateResult(), i && (this.#t !== o || Pt(this.options.enabled, this.#t) !== Pt(r.enabled, this.#t) || Ln(this.options.staleTime, this.#t) !== Ln(r.staleTime, this.#t)) && this.#g();
    const c = this.#y();
    i && (this.#t !== o || Pt(this.options.enabled, this.#t) !== Pt(r.enabled, this.#t) || c !== this.#l) && this.#v(c);
  }
  getOptimisticResult(t) {
    const r = this.#e.getQueryCache().build(this.#e, t), o = this.createResult(r, t);
    return yv(this, o) && (this.#s = o, this.#a = this.options, this.#r = this.#t.state), o;
  }
  getCurrentResult() {
    return this.#s;
  }
  trackResult(t, r) {
    return new Proxy(t, {
      get: (o, i) => (this.trackProp(i), r?.(i), i === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && this.#i.status === "pending" && this.#i.reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(o, i))
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
    return t?.throwOnError || (r = r.catch(dt)), r;
  }
  #g() {
    this.#w();
    const t = Ln(
      this.options.staleTime,
      this.#t
    );
    if (er || this.#s.isStale || !$l(t))
      return;
    const o = Pp(this.#s.dataUpdatedAt, t) + 1;
    this.#c = Zn.setTimeout(() => {
      this.#s.isStale || this.updateResult();
    }, o);
  }
  #y() {
    return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(this.#t) : this.options.refetchInterval) ?? !1;
  }
  #v(t) {
    this.#b(), this.#l = t, !(er || Pt(this.options.enabled, this.#t) === !1 || !$l(this.#l) || this.#l === 0) && (this.#u = Zn.setInterval(() => {
      (this.options.refetchIntervalInBackground || rc.isFocused()) && this.#d();
    }, this.#l));
  }
  #x() {
    this.#g(), this.#v(this.#y());
  }
  #w() {
    this.#c && (Zn.clearTimeout(this.#c), this.#c = void 0);
  }
  #b() {
    this.#u && (Zn.clearInterval(this.#u), this.#u = void 0);
  }
  createResult(t, r) {
    const o = this.#t, i = this.options, c = this.#s, u = this.#r, f = this.#a, m = t !== o ? t.state : this.#n, { state: g } = t;
    let y = { ...g }, x = !1, b;
    if (r._optimisticResults) {
      const K = this.hasListeners(), le = !K && Df(t, r), ie = K && Bf(t, o, r, i);
      (le || ie) && (y = {
        ...y,
        ...Mp(g.data, t.options)
      }), r._optimisticResults === "isRestoring" && (y.fetchStatus = "idle");
    }
    let { error: j, errorUpdatedAt: _, status: k } = y;
    b = y.data;
    let S = !1;
    if (r.placeholderData !== void 0 && b === void 0 && k === "pending") {
      let K;
      c?.isPlaceholderData && r.placeholderData === f?.placeholderData ? (K = c.data, S = !0) : K = typeof r.placeholderData == "function" ? r.placeholderData(
        this.#p?.state.data,
        this.#p
      ) : r.placeholderData, K !== void 0 && (k = "success", b = Bl(
        c?.data,
        K,
        r
      ), x = !0);
    }
    if (r.select && b !== void 0 && !S)
      if (c && b === u?.data && r.select === this.#m)
        b = this.#f;
      else
        try {
          this.#m = r.select, b = r.select(b), b = Bl(c?.data, b, r), this.#f = b, this.#o = null;
        } catch (K) {
          this.#o = K;
        }
    this.#o && (j = this.#o, b = this.#f, _ = Date.now(), k = "error");
    const C = y.fetchStatus === "fetching", R = k === "pending", E = k === "error", $ = R && C, G = b !== void 0, W = {
      status: k,
      fetchStatus: y.fetchStatus,
      isPending: R,
      isSuccess: k === "success",
      isError: E,
      isInitialLoading: $,
      isLoading: $,
      data: b,
      dataUpdatedAt: y.dataUpdatedAt,
      error: j,
      errorUpdatedAt: _,
      failureCount: y.fetchFailureCount,
      failureReason: y.fetchFailureReason,
      errorUpdateCount: y.errorUpdateCount,
      isFetched: y.dataUpdateCount > 0 || y.errorUpdateCount > 0,
      isFetchedAfterMount: y.dataUpdateCount > m.dataUpdateCount || y.errorUpdateCount > m.errorUpdateCount,
      isFetching: C,
      isRefetching: C && !R,
      isLoadingError: E && !G,
      isPaused: y.fetchStatus === "paused",
      isPlaceholderData: x,
      isRefetchError: E && G,
      isStale: sc(t, r),
      refetch: this.refetch,
      promise: this.#i,
      isEnabled: Pt(r.enabled, t) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const K = W.data !== void 0, le = W.status === "error" && !K, ie = (D) => {
        le ? D.reject(W.error) : K && D.resolve(W.data);
      }, ue = () => {
        const D = this.#i = W.promise = zl();
        ie(D);
      }, Q = this.#i;
      switch (Q.status) {
        case "pending":
          t.queryHash === o.queryHash && ie(Q);
          break;
        case "fulfilled":
          (le || W.data !== Q.value) && ue();
          break;
        case "rejected":
          (!le || W.error !== Q.reason) && ue();
          break;
      }
    }
    return W;
  }
  updateResult() {
    const t = this.#s, r = this.createResult(this.#t, this.options);
    if (this.#r = this.#t.state, this.#a = this.options, this.#r.data !== void 0 && (this.#p = this.#t), Fl(r, t))
      return;
    this.#s = r;
    const o = () => {
      if (!t)
        return !0;
      const { notifyOnChangeProps: i } = this.options, c = typeof i == "function" ? i() : i;
      if (c === "all" || !c && !this.#h.size)
        return !0;
      const u = new Set(
        c ?? this.#h
      );
      return this.options.throwOnError && u.add("error"), Object.keys(this.#s).some((f) => {
        const p = f;
        return this.#s[p] !== t[p] && u.has(p);
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
    this.updateResult(), this.hasListeners() && this.#x();
  }
  #j(t) {
    Ze.batch(() => {
      t.listeners && this.listeners.forEach((r) => {
        r(this.#s);
      }), this.#e.getQueryCache().notify({
        query: this.#t,
        type: "observerResultsUpdated"
      });
    });
  }
};
function gv(t, r) {
  return Pt(r.enabled, t) !== !1 && t.state.data === void 0 && !(t.state.status === "error" && r.retryOnMount === !1);
}
function Df(t, r) {
  return gv(t, r) || t.state.data !== void 0 && Wl(t, r, r.refetchOnMount);
}
function Wl(t, r, o) {
  if (Pt(r.enabled, t) !== !1 && Ln(r.staleTime, t) !== "static") {
    const i = typeof o == "function" ? o(t) : o;
    return i === "always" || i !== !1 && sc(t, r);
  }
  return !1;
}
function Bf(t, r, o, i) {
  return (t !== r || Pt(i.enabled, t) === !1) && (!o.suspense || t.state.status !== "error") && sc(t, o);
}
function sc(t, r) {
  return Pt(r.enabled, t) !== !1 && t.isStaleByTime(Ln(r.staleTime, t));
}
function yv(t, r) {
  return !Fl(t.getCurrentResult(), r);
}
function zf(t) {
  return {
    onFetch: (r, o) => {
      const i = r.options, c = r.fetchOptions?.meta?.fetchMore?.direction, u = r.state.data?.pages || [], f = r.state.data?.pageParams || [];
      let p = { pages: [], pageParams: [] }, m = 0;
      const g = async () => {
        let y = !1;
        const x = (_) => {
          lv(
            _,
            () => r.signal,
            () => y = !0
          );
        }, b = Rp(r.options, r.fetchOptions), j = async (_, k, S) => {
          if (y)
            return Promise.reject();
          if (k == null && _.pages.length)
            return Promise.resolve(_);
          const R = (() => {
            const Y = {
              client: r.client,
              queryKey: r.queryKey,
              pageParam: k,
              direction: S ? "backward" : "forward",
              meta: r.options.meta
            };
            return x(Y), Y;
          })(), E = await b(R), { maxPages: $ } = r.options, G = S ? av : iv;
          return {
            pages: G(_.pages, E, $),
            pageParams: G(_.pageParams, k, $)
          };
        };
        if (c && u.length) {
          const _ = c === "backward", k = _ ? vv : Uf, S = {
            pages: u,
            pageParams: f
          }, C = k(i, S);
          p = await j(S, C, _);
        } else {
          const _ = t ?? u.length;
          do {
            const k = m === 0 ? f[0] ?? i.initialPageParam : Uf(i, p);
            if (m > 0 && k == null)
              break;
            p = await j(p, k), m++;
          } while (m < _);
        }
        return p;
      };
      r.options.persister ? r.fetchFn = () => r.options.persister?.(
        g,
        {
          client: r.client,
          queryKey: r.queryKey,
          meta: r.options.meta,
          signal: r.signal
        },
        o
      ) : r.fetchFn = g;
    }
  };
}
function Uf(t, { pages: r, pageParams: o }) {
  const i = r.length - 1;
  return r.length > 0 ? t.getNextPageParam(
    r[i],
    r,
    o[i],
    o
  ) : void 0;
}
function vv(t, { pages: r, pageParams: o }) {
  return r.length > 0 ? t.getPreviousPageParam?.(r[0], r, o[0], o) : void 0;
}
var xv = class extends Op {
  #e;
  #t;
  #n;
  #s;
  constructor(t) {
    super(), this.#e = t.client, this.mutationId = t.mutationId, this.#n = t.mutationCache, this.#t = [], this.state = t.state || wv(), this.setOptions(t.options), this.scheduleGc();
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
    this.#s = Lp({
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
    const i = this.state.status === "pending", c = !this.#s.canStart();
    try {
      if (i)
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
    this.state = r(this.state), Ze.batch(() => {
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
function wv() {
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
var bv = class extends As {
  constructor(t = {}) {
    super(), this.config = t, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
  }
  #e;
  #t;
  #n;
  build(t, r, o) {
    const i = new xv({
      client: t,
      mutationCache: this,
      mutationId: ++this.#n,
      options: t.defaultMutationOptions(r),
      state: o
    });
    return this.add(i), i;
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
            const i = o.indexOf(t);
            i !== -1 && o.splice(i, 1);
          } else o[0] === t && this.#t.delete(r);
      }
    }
    this.notify({ type: "removed", mutation: t });
  }
  canRun(t) {
    const r = qo(t);
    if (typeof r == "string") {
      const i = this.#t.get(r)?.find(
        (c) => c.state.status === "pending"
      );
      return !i || i === t;
    } else
      return !0;
  }
  runNext(t) {
    const r = qo(t);
    return typeof r == "string" ? this.#t.get(r)?.find((i) => i !== t && i.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve();
  }
  clear() {
    Ze.batch(() => {
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
      (o) => Of(r, o)
    );
  }
  findAll(t = {}) {
    return this.getAll().filter((r) => Of(t, r));
  }
  notify(t) {
    Ze.batch(() => {
      this.listeners.forEach((r) => {
        r(t);
      });
    });
  }
  resumePausedMutations() {
    const t = this.getAll().filter((r) => r.state.isPaused);
    return Ze.batch(
      () => Promise.all(
        t.map((r) => r.continue().catch(dt))
      )
    );
  }
};
function qo(t) {
  return t.options.scope?.id;
}
var kv = class extends As {
  constructor(t = {}) {
    super(), this.config = t, this.#e = /* @__PURE__ */ new Map();
  }
  #e;
  build(t, r, o) {
    const i = r.queryKey, c = r.queryHash ?? tc(i, r);
    let u = this.get(c);
    return u || (u = new hv({
      client: t,
      queryKey: i,
      queryHash: c,
      options: t.defaultQueryOptions(r),
      state: o,
      defaultOptions: t.getQueryDefaults(i)
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
    Ze.batch(() => {
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
      (o) => Lf(r, o)
    );
  }
  findAll(t = {}) {
    const r = this.getAll();
    return Object.keys(t).length > 0 ? r.filter((o) => Lf(t, o)) : r;
  }
  notify(t) {
    Ze.batch(() => {
      this.listeners.forEach((r) => {
        r(t);
      });
    });
  }
  onFocus() {
    Ze.batch(() => {
      this.getAll().forEach((t) => {
        t.onFocus();
      });
    });
  }
  onOnline() {
    Ze.batch(() => {
      this.getAll().forEach((t) => {
        t.onOnline();
      });
    });
  }
}, jv = class {
  #e;
  #t;
  #n;
  #s;
  #r;
  #a;
  #i;
  #o;
  constructor(t = {}) {
    this.#e = t.queryCache || new kv(), this.#t = t.mutationCache || new bv(), this.#n = t.defaultOptions || {}, this.#s = /* @__PURE__ */ new Map(), this.#r = /* @__PURE__ */ new Map(), this.#a = 0;
  }
  mount() {
    this.#a++, this.#a === 1 && (this.#i = rc.subscribe(async (t) => {
      t && (await this.resumePausedMutations(), this.#e.onFocus());
    }), this.#o = ai.subscribe(async (t) => {
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
    const r = this.defaultQueryOptions(t), o = this.#e.build(this, r), i = o.state.data;
    return i === void 0 ? this.fetchQuery(t) : (t.revalidateIfStale && o.isStaleByTime(Ln(r.staleTime, o)) && this.prefetchQuery(r), Promise.resolve(i));
  }
  getQueriesData(t) {
    return this.#e.findAll(t).map(({ queryKey: r, state: o }) => {
      const i = o.data;
      return [r, i];
    });
  }
  setQueryData(t, r, o) {
    const i = this.defaultQueryOptions({ queryKey: t }), u = this.#e.get(
      i.queryHash
    )?.state.data, f = rv(r, u);
    if (f !== void 0)
      return this.#e.build(this, i).setData(f, { ...o, manual: !0 });
  }
  setQueriesData(t, r, o) {
    return Ze.batch(
      () => this.#e.findAll(t).map(({ queryKey: i }) => [
        i,
        this.setQueryData(i, r, o)
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
    Ze.batch(() => {
      r.findAll(t).forEach((o) => {
        r.remove(o);
      });
    });
  }
  resetQueries(t, r) {
    const o = this.#e;
    return Ze.batch(() => (o.findAll(t).forEach((i) => {
      i.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...t
      },
      r
    )));
  }
  cancelQueries(t, r = {}) {
    const o = { revert: !0, ...r }, i = Ze.batch(
      () => this.#e.findAll(t).map((c) => c.cancel(o))
    );
    return Promise.all(i).then(dt).catch(dt);
  }
  invalidateQueries(t, r = {}) {
    return Ze.batch(() => (this.#e.findAll(t).forEach((o) => {
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
    }, i = Ze.batch(
      () => this.#e.findAll(t).filter((c) => !c.isDisabled() && !c.isStatic()).map((c) => {
        let u = c.fetch(void 0, o);
        return o.throwOnError || (u = u.catch(dt)), c.state.fetchStatus === "paused" ? Promise.resolve() : u;
      })
    );
    return Promise.all(i).then(dt);
  }
  fetchQuery(t) {
    const r = this.defaultQueryOptions(t);
    r.retry === void 0 && (r.retry = !1);
    const o = this.#e.build(this, r);
    return o.isStaleByTime(
      Ln(r.staleTime, o)
    ) ? o.fetch(r) : Promise.resolve(o.state.data);
  }
  prefetchQuery(t) {
    return this.fetchQuery(t).then(dt).catch(dt);
  }
  fetchInfiniteQuery(t) {
    return t.behavior = zf(t.pages), this.fetchQuery(t);
  }
  prefetchInfiniteQuery(t) {
    return this.fetchInfiniteQuery(t).then(dt).catch(dt);
  }
  ensureInfiniteQueryData(t) {
    return t.behavior = zf(t.pages), this.ensureQueryData(t);
  }
  resumePausedMutations() {
    return ai.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
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
    return r.forEach((i) => {
      Es(t, i.queryKey) && Object.assign(o, i.defaultOptions);
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
    return r.forEach((i) => {
      Es(t, i.mutationKey) && Object.assign(o, i.defaultOptions);
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
    return r.queryHash || (r.queryHash = tc(
      r.queryKey,
      r
    )), r.refetchOnReconnect === void 0 && (r.refetchOnReconnect = r.networkMode !== "always"), r.throwOnError === void 0 && (r.throwOnError = !!r.suspense), !r.networkMode && r.persister && (r.networkMode = "offlineFirst"), r.queryFn === nc && (r.enabled = !1), r;
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
}, w = yi();
const An = /* @__PURE__ */ Vy(w), vi = /* @__PURE__ */ Hy({
  __proto__: null,
  default: An
}, [w]);
var Ip = w.createContext(
  void 0
), Nv = (t) => {
  const r = w.useContext(Ip);
  if (!r)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return r;
}, Sv = ({
  client: t,
  children: r
}) => (w.useEffect(() => (t.mount(), () => {
  t.unmount();
}), [t]), /* @__PURE__ */ l.jsx(Ip.Provider, { value: t, children: r })), $p = w.createContext(!1), _v = () => w.useContext($p);
$p.Provider;
function Cv() {
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
var Pv = w.createContext(Cv()), Ev = () => w.useContext(Pv), Rv = (t, r, o) => {
  const i = o?.state.error && typeof t.throwOnError == "function" ? Tp(t.throwOnError, [o.state.error, o]) : t.throwOnError;
  (t.suspense || t.experimental_prefetchInRender || i) && (r.isReset() || (t.retryOnMount = !1));
}, Tv = (t) => {
  w.useEffect(() => {
    t.clearReset();
  }, [t]);
}, Av = ({
  result: t,
  errorResetBoundary: r,
  throwOnError: o,
  query: i,
  suspense: c
}) => t.isError && !r.isReset() && !t.isFetching && i && (c && t.data === void 0 || Tp(o, [t.error, i])), Lv = (t) => {
  if (t.suspense) {
    const o = (c) => c === "static" ? c : Math.max(c ?? 1e3, 1e3), i = t.staleTime;
    t.staleTime = typeof i == "function" ? (...c) => o(i(...c)) : o(i), typeof t.gcTime == "number" && (t.gcTime = Math.max(
      t.gcTime,
      1e3
    ));
  }
}, Ov = (t, r) => t.isLoading && t.isFetching && !r, Mv = (t, r) => t?.suspense && r.isPending, Wf = (t, r, o) => r.fetchOptimistic(t).catch(() => {
  o.clearReset();
});
function Iv(t, r, o) {
  const i = _v(), c = Ev(), u = Nv(), f = u.defaultQueryOptions(t);
  u.getDefaultOptions().queries?._experimental_beforeQuery?.(
    f
  );
  const p = u.getQueryCache().get(f.queryHash);
  f._optimisticResults = i ? "isRestoring" : "optimistic", Lv(f), Rv(f, c, p), Tv(c);
  const m = !u.getQueryCache().get(f.queryHash), [g] = w.useState(
    () => new r(
      u,
      f
    )
  ), y = g.getOptimisticResult(f), x = !i && t.subscribed !== !1;
  if (w.useSyncExternalStore(
    w.useCallback(
      (b) => {
        const j = x ? g.subscribe(Ze.batchCalls(b)) : dt;
        return g.updateResult(), j;
      },
      [g, x]
    ),
    () => g.getCurrentResult(),
    () => g.getCurrentResult()
  ), w.useEffect(() => {
    g.setOptions(f);
  }, [f, g]), Mv(f, y))
    throw Wf(f, g, c);
  if (Av({
    result: y,
    errorResetBoundary: c,
    throwOnError: f.throwOnError,
    query: p,
    suspense: f.suspense
  }))
    throw y.error;
  return u.getDefaultOptions().queries?._experimental_afterQuery?.(
    f,
    y
  ), f.experimental_prefetchInRender && !er && Ov(y, i) && (m ? (
    // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
    Wf(f, g, c)
  ) : (
    // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
    p?.promise
  ))?.catch(dt).finally(() => {
    g.updateResult();
  }), f.notifyOnChangeProps ? y : g.trackResult(y);
}
function Ht(t, r) {
  return Iv(t, mv);
}
function $v(t, r) {
  if (t instanceof RegExp) return { keys: !1, pattern: t };
  var o, i, c, u, f = [], p = "", m = t.split("/");
  for (m[0] || m.shift(); c = m.shift(); )
    o = c[0], o === "*" ? (f.push(o), p += c[1] === "?" ? "(?:/(.*))?" : "/(.*)") : o === ":" ? (i = c.indexOf("?", 1), u = c.indexOf(".", 1), f.push(c.substring(1, ~i ? i : ~u ? u : c.length)), p += ~i && !~u ? "(?:/([^/]+?))?" : "/([^/]+?)", ~u && (p += (~i ? "?" : "") + "\\" + c.substring(u))) : p += "/" + c;
  return {
    keys: f,
    pattern: new RegExp("^" + p + (r ? "(?=$|/)" : "/?$"), "i")
  };
}
var _l = { exports: {} }, Cl = {};
var Hf;
function Fv() {
  if (Hf) return Cl;
  Hf = 1;
  var t = yi();
  function r(x, b) {
    return x === b && (x !== 0 || 1 / x === 1 / b) || x !== x && b !== b;
  }
  var o = typeof Object.is == "function" ? Object.is : r, i = t.useState, c = t.useEffect, u = t.useLayoutEffect, f = t.useDebugValue;
  function p(x, b) {
    var j = b(), _ = i({ inst: { value: j, getSnapshot: b } }), k = _[0].inst, S = _[1];
    return u(
      function() {
        k.value = j, k.getSnapshot = b, m(k) && S({ inst: k });
      },
      [x, j, b]
    ), c(
      function() {
        return m(k) && S({ inst: k }), x(function() {
          m(k) && S({ inst: k });
        });
      },
      [x]
    ), f(j), j;
  }
  function m(x) {
    var b = x.getSnapshot;
    x = x.value;
    try {
      var j = b();
      return !o(x, j);
    } catch {
      return !0;
    }
  }
  function g(x, b) {
    return b();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : p;
  return Cl.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : y, Cl;
}
var Vf;
function Dv() {
  return Vf || (Vf = 1, _l.exports = Fv()), _l.exports;
}
var Bv = Dv();
const zv = vi.useInsertionEffect, Uv = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Wv = Uv ? w.useLayoutEffect : w.useEffect, Hv = zv || Wv, Fp = (t) => {
  const r = w.useRef([t, (...o) => r[0](...o)]).current;
  return Hv(() => {
    r[0] = t;
  }), r[1];
}, Vv = "popstate", oc = "pushState", ic = "replaceState", Yv = "hashchange", Yf = [
  Vv,
  oc,
  ic,
  Yv
], Qv = (t) => {
  for (const r of Yf)
    addEventListener(r, t);
  return () => {
    for (const r of Yf)
      removeEventListener(r, t);
  };
}, Dp = (t, r) => Bv.useSyncExternalStore(Qv, t, r), Qf = () => location.search, Gv = ({ ssrSearch: t } = {}) => Dp(
  Qf,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  t != null ? () => t : Qf
), Gf = () => location.pathname, Kv = ({ ssrPath: t } = {}) => Dp(
  Gf,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  t != null ? () => t : Gf
), qv = (t, { replace: r = !1, state: o = null } = {}) => history[r ? ic : oc](o, "", t), Xv = (t = {}) => [Kv(t), qv], Kf = /* @__PURE__ */ Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Kf] > "u") {
  for (const t of [oc, ic]) {
    const r = history[t];
    history[t] = function() {
      const o = r.apply(this, arguments), i = new Event(t);
      return i.arguments = arguments, dispatchEvent(i), o;
    };
  }
  Object.defineProperty(window, Kf, { value: !0 });
}
const Zv = (t, r) => r.toLowerCase().indexOf(t.toLowerCase()) ? "~" + r : r.slice(t.length) || "/", Bp = (t = "") => t === "/" ? "" : t, Jv = (t, r) => t[0] === "~" ? t.slice(1) : Bp(r) + t, e0 = (t = "", r) => Zv(qf(Bp(t)), qf(r)), qf = (t) => {
  try {
    return decodeURI(t);
  } catch {
    return t;
  }
}, zp = {
  hook: Xv,
  searchHook: Gv,
  parser: $v,
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
}, Up = w.createContext(zp), Ls = () => w.useContext(Up), Wp = {}, Hp = w.createContext(Wp), Vp = () => w.useContext(Hp), xi = (t) => {
  const [r, o] = t.hook(t);
  return [
    e0(t.base, r),
    Fp(
      (i, c) => t.aroundNav(o, Jv(i, t.base), c)
    )
  ];
}, ac = () => xi(Ls()), Yp = (t, r, o, i) => {
  const { pattern: c, keys: u } = r instanceof RegExp ? { keys: !1, pattern: r } : t(r || "*", i), f = c.exec(o) || [], [p, ...m] = f;
  return p !== void 0 ? [
    !0,
    (() => {
      const g = u !== !1 ? Object.fromEntries(u.map((x, b) => [x, m[b]])) : f.groups;
      let y = { ...m };
      return g && Object.assign(y, g), y;
    })(),
    // the third value if only present when parser is in "loose" mode,
    // so that we can extract the base path for nested routes
    ...i ? [p] : []
  ] : [!1, null];
}, Qp = ({ children: t, ...r }) => {
  const o = Ls(), i = r.hook ? zp : o;
  let c = i;
  const [u, f = r.ssrSearch ?? ""] = r.ssrPath?.split("?") ?? [];
  u && (r.ssrSearch = f, r.ssrPath = u), r.hrefs = r.hrefs ?? r.hook?.hrefs, r.searchHook = r.searchHook ?? r.hook?.searchHook;
  let p = w.useRef({}), m = p.current, g = m;
  for (let y in i) {
    const x = y === "base" ? (
      /* base is special case, it is appended to the parent's base */
      i[y] + (r[y] ?? "")
    ) : r[y] ?? i[y];
    m === g && x !== g[y] && (p.current = g = { ...g }), g[y] = x, (x !== i[y] || x !== c[y]) && (c = g);
  }
  return w.createElement(Up.Provider, { value: c, children: t });
}, Xf = ({ children: t, component: r }, o) => r ? w.createElement(r, { params: o }) : typeof t == "function" ? t(o) : t, t0 = (t) => {
  let r = w.useRef(Wp);
  const o = r.current;
  return r.current = // Update cache if number of params changed or any value changed
  Object.keys(t).length !== Object.keys(o).length || Object.entries(t).some(([i, c]) => c !== o[i]) ? t : o;
}, Xo = ({ path: t, nest: r, match: o, ...i }) => {
  const c = Ls(), [u] = xi(c), [f, p, m] = (
    // `match` is a special prop to give up control to the parent,
    // it is used by the `Switch` to avoid double matching
    o ?? Yp(c.parser, t, u, r)
  ), g = t0({ ...Vp(), ...p });
  if (!f) return null;
  const y = m ? w.createElement(Qp, { base: m }, Xf(i, g)) : Xf(i, g);
  return w.createElement(Hp.Provider, { value: g, children: y });
}, tr = w.forwardRef((t, r) => {
  const o = Ls(), [i, c] = xi(o), {
    to: u = "",
    href: f = u,
    onClick: p,
    asChild: m,
    children: g,
    className: y,
    /* eslint-disable no-unused-vars */
    replace: x,
    state: b,
    transition: j,
    /* eslint-enable no-unused-vars */
    ..._
  } = t, k = Fp((C) => {
    C.ctrlKey || C.metaKey || C.altKey || C.shiftKey || C.button !== 0 || (p?.(C), C.defaultPrevented || (C.preventDefault(), c(f, t)));
  }), S = o.hrefs(
    f[0] === "~" ? f.slice(1) : o.base + f,
    o
    // pass router as a second argument for convinience
  );
  return m && w.isValidElement(g) ? w.cloneElement(g, { onClick: k, href: S }) : w.createElement("a", {
    ..._,
    onClick: k,
    href: S,
    // `className` can be a function to apply the class if this link is active
    className: y?.call ? y(i === f) : y,
    children: g,
    ref: r
  });
}), Gp = (t) => Array.isArray(t) ? t.flatMap(
  (r) => Gp(r && r.type === w.Fragment ? r.props.children : r)
) : [t], n0 = ({ children: t, location: r }) => {
  const o = Ls(), [i] = xi(o);
  for (const c of Gp(t)) {
    let u = 0;
    if (w.isValidElement(c) && // we don't require an element to be of type Route,
    // but we do require it to contain a truthy `path` prop.
    // this allows to use different components that wrap Route
    // inside of a switch, for example <AnimatedRoute />.
    (u = Yp(
      o.parser,
      c.props.path,
      r || i,
      c.props.nest
    ))[0])
      return w.cloneElement(c, { match: u });
  }
  return null;
};
function Ge(t, r, { checkForDefaultPrevented: o = !0 } = {}) {
  return function(c) {
    if (t?.(c), o === !1 || !c.defaultPrevented)
      return r?.(c);
  };
}
function Zf(t, r) {
  if (typeof t == "function")
    return t(r);
  t != null && (t.current = r);
}
function wi(...t) {
  return (r) => {
    let o = !1;
    const i = t.map((c) => {
      const u = Zf(c, r);
      return !o && typeof u == "function" && (o = !0), u;
    });
    if (o)
      return () => {
        for (let c = 0; c < i.length; c++) {
          const u = i[c];
          typeof u == "function" ? u() : Zf(t[c], null);
        }
      };
  };
}
function Qt(...t) {
  return w.useCallback(wi(...t), t);
}
function Os(t, r = []) {
  let o = [];
  function i(u, f) {
    const p = w.createContext(f), m = o.length;
    o = [...o, f];
    const g = (x) => {
      const { scope: b, children: j, ..._ } = x, k = b?.[t]?.[m] || p, S = w.useMemo(() => _, Object.values(_));
      return /* @__PURE__ */ l.jsx(k.Provider, { value: S, children: j });
    };
    g.displayName = u + "Provider";
    function y(x, b) {
      const j = b?.[t]?.[m] || p, _ = w.useContext(j);
      if (_) return _;
      if (f !== void 0) return f;
      throw new Error(`\`${x}\` must be used within \`${u}\``);
    }
    return [g, y];
  }
  const c = () => {
    const u = o.map((f) => w.createContext(f));
    return function(p) {
      const m = p?.[t] || u;
      return w.useMemo(
        () => ({ [`__scope${t}`]: { ...p, [t]: m } }),
        [p, m]
      );
    };
  };
  return c.scopeName = t, [i, r0(c, ...r)];
}
function r0(...t) {
  const r = t[0];
  if (t.length === 1) return r;
  const o = () => {
    const i = t.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return function(u) {
      const f = i.reduce((p, { useScope: m, scopeName: g }) => {
        const x = m(u)[`__scope${g}`];
        return { ...p, ...x };
      }, {});
      return w.useMemo(() => ({ [`__scope${r.scopeName}`]: f }), [f]);
    };
  };
  return o.scopeName = r.scopeName, o;
}
var lc = Cp();
// @__NO_SIDE_EFFECTS__
function s0(t) {
  const r = /* @__PURE__ */ o0(t), o = w.forwardRef((i, c) => {
    const { children: u, ...f } = i, p = w.Children.toArray(u), m = p.find(a0);
    if (m) {
      const g = m.props.children, y = p.map((x) => x === m ? w.Children.count(g) > 1 ? w.Children.only(null) : w.isValidElement(g) ? g.props.children : null : x);
      return /* @__PURE__ */ l.jsx(r, { ...f, ref: c, children: w.isValidElement(g) ? w.cloneElement(g, void 0, y) : null });
    }
    return /* @__PURE__ */ l.jsx(r, { ...f, ref: c, children: u });
  });
  return o.displayName = `${t}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function o0(t) {
  const r = w.forwardRef((o, i) => {
    const { children: c, ...u } = o;
    if (w.isValidElement(c)) {
      const f = c0(c), p = l0(u, c.props);
      return c.type !== w.Fragment && (p.ref = i ? wi(i, f) : f), w.cloneElement(c, p);
    }
    return w.Children.count(c) > 1 ? w.Children.only(null) : null;
  });
  return r.displayName = `${t}.SlotClone`, r;
}
var i0 = /* @__PURE__ */ Symbol("radix.slottable");
function a0(t) {
  return w.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === i0;
}
function l0(t, r) {
  const o = { ...r };
  for (const i in r) {
    const c = t[i], u = r[i];
    /^on[A-Z]/.test(i) ? c && u ? o[i] = (...p) => {
      const m = u(...p);
      return c(...p), m;
    } : c && (o[i] = c) : i === "style" ? o[i] = { ...c, ...u } : i === "className" && (o[i] = [c, u].filter(Boolean).join(" "));
  }
  return { ...t, ...o };
}
function c0(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
var u0 = [
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
], xt = u0.reduce((t, r) => {
  const o = /* @__PURE__ */ s0(`Primitive.${r}`), i = w.forwardRef((c, u) => {
    const { asChild: f, ...p } = c, m = f ? o : r;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l.jsx(m, { ...p, ref: u });
  });
  return i.displayName = `Primitive.${r}`, { ...t, [r]: i };
}, {});
function d0(t, r) {
  t && lc.flushSync(() => t.dispatchEvent(r));
}
function Ms(t) {
  const r = w.useRef(t);
  return w.useEffect(() => {
    r.current = t;
  }), w.useMemo(() => (...o) => r.current?.(...o), []);
}
function f0(t, r = globalThis?.document) {
  const o = Ms(t);
  w.useEffect(() => {
    const i = (c) => {
      c.key === "Escape" && o(c);
    };
    return r.addEventListener("keydown", i, { capture: !0 }), () => r.removeEventListener("keydown", i, { capture: !0 });
  }, [o, r]);
}
var p0 = "DismissableLayer", Hl = "dismissableLayer.update", h0 = "dismissableLayer.pointerDownOutside", m0 = "dismissableLayer.focusOutside", Jf, Kp = w.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), qp = w.forwardRef(
  (t, r) => {
    const {
      disableOutsidePointerEvents: o = !1,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: u,
      onInteractOutside: f,
      onDismiss: p,
      ...m
    } = t, g = w.useContext(Kp), [y, x] = w.useState(null), b = y?.ownerDocument ?? globalThis?.document, [, j] = w.useState({}), _ = Qt(r, (W) => x(W)), k = Array.from(g.layers), [S] = [...g.layersWithOutsidePointerEventsDisabled].slice(-1), C = k.indexOf(S), R = y ? k.indexOf(y) : -1, E = g.layersWithOutsidePointerEventsDisabled.size > 0, $ = R >= C, G = v0((W) => {
      const K = W.target, le = [...g.branches].some((ie) => ie.contains(K));
      !$ || le || (c?.(W), f?.(W), W.defaultPrevented || p?.());
    }, b), Y = x0((W) => {
      const K = W.target;
      [...g.branches].some((ie) => ie.contains(K)) || (u?.(W), f?.(W), W.defaultPrevented || p?.());
    }, b);
    return f0((W) => {
      R === g.layers.size - 1 && (i?.(W), !W.defaultPrevented && p && (W.preventDefault(), p()));
    }, b), w.useEffect(() => {
      if (y)
        return o && (g.layersWithOutsidePointerEventsDisabled.size === 0 && (Jf = b.body.style.pointerEvents, b.body.style.pointerEvents = "none"), g.layersWithOutsidePointerEventsDisabled.add(y)), g.layers.add(y), ep(), () => {
          o && g.layersWithOutsidePointerEventsDisabled.size === 1 && (b.body.style.pointerEvents = Jf);
        };
    }, [y, b, o, g]), w.useEffect(() => () => {
      y && (g.layers.delete(y), g.layersWithOutsidePointerEventsDisabled.delete(y), ep());
    }, [y, g]), w.useEffect(() => {
      const W = () => j({});
      return document.addEventListener(Hl, W), () => document.removeEventListener(Hl, W);
    }, []), /* @__PURE__ */ l.jsx(
      xt.div,
      {
        ...m,
        ref: _,
        style: {
          pointerEvents: E ? $ ? "auto" : "none" : void 0,
          ...t.style
        },
        onFocusCapture: Ge(t.onFocusCapture, Y.onFocusCapture),
        onBlurCapture: Ge(t.onBlurCapture, Y.onBlurCapture),
        onPointerDownCapture: Ge(
          t.onPointerDownCapture,
          G.onPointerDownCapture
        )
      }
    );
  }
);
qp.displayName = p0;
var g0 = "DismissableLayerBranch", y0 = w.forwardRef((t, r) => {
  const o = w.useContext(Kp), i = w.useRef(null), c = Qt(r, i);
  return w.useEffect(() => {
    const u = i.current;
    if (u)
      return o.branches.add(u), () => {
        o.branches.delete(u);
      };
  }, [o.branches]), /* @__PURE__ */ l.jsx(xt.div, { ...t, ref: c });
});
y0.displayName = g0;
function v0(t, r = globalThis?.document) {
  const o = Ms(t), i = w.useRef(!1), c = w.useRef(() => {
  });
  return w.useEffect(() => {
    const u = (p) => {
      if (p.target && !i.current) {
        let m = function() {
          Xp(
            h0,
            o,
            g,
            { discrete: !0 }
          );
        };
        const g = { originalEvent: p };
        p.pointerType === "touch" ? (r.removeEventListener("click", c.current), c.current = m, r.addEventListener("click", c.current, { once: !0 })) : m();
      } else
        r.removeEventListener("click", c.current);
      i.current = !1;
    }, f = window.setTimeout(() => {
      r.addEventListener("pointerdown", u);
    }, 0);
    return () => {
      window.clearTimeout(f), r.removeEventListener("pointerdown", u), r.removeEventListener("click", c.current);
    };
  }, [r, o]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => i.current = !0
  };
}
function x0(t, r = globalThis?.document) {
  const o = Ms(t), i = w.useRef(!1);
  return w.useEffect(() => {
    const c = (u) => {
      u.target && !i.current && Xp(m0, o, { originalEvent: u }, {
        discrete: !1
      });
    };
    return r.addEventListener("focusin", c), () => r.removeEventListener("focusin", c);
  }, [r, o]), {
    onFocusCapture: () => i.current = !0,
    onBlurCapture: () => i.current = !1
  };
}
function ep() {
  const t = new CustomEvent(Hl);
  document.dispatchEvent(t);
}
function Xp(t, r, o, { discrete: i }) {
  const c = o.originalEvent.target, u = new CustomEvent(t, { bubbles: !1, cancelable: !0, detail: o });
  r && c.addEventListener(t, r, { once: !0 }), i ? d0(c, u) : c.dispatchEvent(u);
}
var nr = globalThis?.document ? w.useLayoutEffect : () => {
}, w0 = vi[" useId ".trim().toString()] || (() => {
}), b0 = 0;
function Zp(t) {
  const [r, o] = w.useState(w0());
  return nr(() => {
    o((i) => i ?? String(b0++));
  }, [t]), r ? `radix-${r}` : "";
}
const k0 = ["top", "right", "bottom", "left"], On = Math.min, yt = Math.max, li = Math.round, Zo = Math.floor, Yt = (t) => ({
  x: t,
  y: t
}), j0 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Vl(t, r, o) {
  return yt(t, On(r, o));
}
function ln(t, r) {
  return typeof t == "function" ? t(r) : t;
}
function cn(t) {
  return t.split("-")[0];
}
function Mr(t) {
  return t.split("-")[1];
}
function cc(t) {
  return t === "x" ? "y" : "x";
}
function uc(t) {
  return t === "y" ? "height" : "width";
}
function Vt(t) {
  const r = t[0];
  return r === "t" || r === "b" ? "y" : "x";
}
function dc(t) {
  return cc(Vt(t));
}
function N0(t, r, o) {
  o === void 0 && (o = !1);
  const i = Mr(t), c = dc(t), u = uc(c);
  let f = c === "x" ? i === (o ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return r.reference[u] > r.floating[u] && (f = ci(f)), [f, ci(f)];
}
function S0(t) {
  const r = ci(t);
  return [Yl(t), r, Yl(r)];
}
function Yl(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const tp = ["left", "right"], np = ["right", "left"], _0 = ["top", "bottom"], C0 = ["bottom", "top"];
function P0(t, r, o) {
  switch (t) {
    case "top":
    case "bottom":
      return o ? r ? np : tp : r ? tp : np;
    case "left":
    case "right":
      return r ? _0 : C0;
    default:
      return [];
  }
}
function E0(t, r, o, i) {
  const c = Mr(t);
  let u = P0(cn(t), o === "start", i);
  return c && (u = u.map((f) => f + "-" + c), r && (u = u.concat(u.map(Yl)))), u;
}
function ci(t) {
  const r = cn(t);
  return j0[r] + t.slice(r.length);
}
function R0(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Jp(t) {
  return typeof t != "number" ? R0(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ui(t) {
  const {
    x: r,
    y: o,
    width: i,
    height: c
  } = t;
  return {
    width: i,
    height: c,
    top: o,
    left: r,
    right: r + i,
    bottom: o + c,
    x: r,
    y: o
  };
}
function rp(t, r, o) {
  let {
    reference: i,
    floating: c
  } = t;
  const u = Vt(r), f = dc(r), p = uc(f), m = cn(r), g = u === "y", y = i.x + i.width / 2 - c.width / 2, x = i.y + i.height / 2 - c.height / 2, b = i[p] / 2 - c[p] / 2;
  let j;
  switch (m) {
    case "top":
      j = {
        x: y,
        y: i.y - c.height
      };
      break;
    case "bottom":
      j = {
        x: y,
        y: i.y + i.height
      };
      break;
    case "right":
      j = {
        x: i.x + i.width,
        y: x
      };
      break;
    case "left":
      j = {
        x: i.x - c.width,
        y: x
      };
      break;
    default:
      j = {
        x: i.x,
        y: i.y
      };
  }
  switch (Mr(r)) {
    case "start":
      j[f] -= b * (o && g ? -1 : 1);
      break;
    case "end":
      j[f] += b * (o && g ? -1 : 1);
      break;
  }
  return j;
}
async function T0(t, r) {
  var o;
  r === void 0 && (r = {});
  const {
    x: i,
    y: c,
    platform: u,
    rects: f,
    elements: p,
    strategy: m
  } = t, {
    boundary: g = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: x = "floating",
    altBoundary: b = !1,
    padding: j = 0
  } = ln(r, t), _ = Jp(j), S = p[b ? x === "floating" ? "reference" : "floating" : x], C = ui(await u.getClippingRect({
    element: (o = await (u.isElement == null ? void 0 : u.isElement(S))) == null || o ? S : S.contextElement || await (u.getDocumentElement == null ? void 0 : u.getDocumentElement(p.floating)),
    boundary: g,
    rootBoundary: y,
    strategy: m
  })), R = x === "floating" ? {
    x: i,
    y: c,
    width: f.floating.width,
    height: f.floating.height
  } : f.reference, E = await (u.getOffsetParent == null ? void 0 : u.getOffsetParent(p.floating)), $ = await (u.isElement == null ? void 0 : u.isElement(E)) ? await (u.getScale == null ? void 0 : u.getScale(E)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, G = ui(u.convertOffsetParentRelativeRectToViewportRelativeRect ? await u.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: p,
    rect: R,
    offsetParent: E,
    strategy: m
  }) : R);
  return {
    top: (C.top - G.top + _.top) / $.y,
    bottom: (G.bottom - C.bottom + _.bottom) / $.y,
    left: (C.left - G.left + _.left) / $.x,
    right: (G.right - C.right + _.right) / $.x
  };
}
const A0 = 50, L0 = async (t, r, o) => {
  const {
    placement: i = "bottom",
    strategy: c = "absolute",
    middleware: u = [],
    platform: f
  } = o, p = f.detectOverflow ? f : {
    ...f,
    detectOverflow: T0
  }, m = await (f.isRTL == null ? void 0 : f.isRTL(r));
  let g = await f.getElementRects({
    reference: t,
    floating: r,
    strategy: c
  }), {
    x: y,
    y: x
  } = rp(g, i, m), b = i, j = 0;
  const _ = {};
  for (let k = 0; k < u.length; k++) {
    const S = u[k];
    if (!S)
      continue;
    const {
      name: C,
      fn: R
    } = S, {
      x: E,
      y: $,
      data: G,
      reset: Y
    } = await R({
      x: y,
      y: x,
      initialPlacement: i,
      placement: b,
      strategy: c,
      middlewareData: _,
      rects: g,
      platform: p,
      elements: {
        reference: t,
        floating: r
      }
    });
    y = E ?? y, x = $ ?? x, _[C] = {
      ..._[C],
      ...G
    }, Y && j < A0 && (j++, typeof Y == "object" && (Y.placement && (b = Y.placement), Y.rects && (g = Y.rects === !0 ? await f.getElementRects({
      reference: t,
      floating: r,
      strategy: c
    }) : Y.rects), {
      x: y,
      y: x
    } = rp(g, b, m)), k = -1);
  }
  return {
    x: y,
    y: x,
    placement: b,
    strategy: c,
    middlewareData: _
  };
}, O0 = (t) => ({
  name: "arrow",
  options: t,
  async fn(r) {
    const {
      x: o,
      y: i,
      placement: c,
      rects: u,
      platform: f,
      elements: p,
      middlewareData: m
    } = r, {
      element: g,
      padding: y = 0
    } = ln(t, r) || {};
    if (g == null)
      return {};
    const x = Jp(y), b = {
      x: o,
      y: i
    }, j = dc(c), _ = uc(j), k = await f.getDimensions(g), S = j === "y", C = S ? "top" : "left", R = S ? "bottom" : "right", E = S ? "clientHeight" : "clientWidth", $ = u.reference[_] + u.reference[j] - b[j] - u.floating[_], G = b[j] - u.reference[j], Y = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(g));
    let W = Y ? Y[E] : 0;
    (!W || !await (f.isElement == null ? void 0 : f.isElement(Y))) && (W = p.floating[E] || u.floating[_]);
    const K = $ / 2 - G / 2, le = W / 2 - k[_] / 2 - 1, ie = On(x[C], le), ue = On(x[R], le), Q = ie, D = W - k[_] - ue, J = W / 2 - k[_] / 2 + K, M = Vl(Q, J, D), U = !m.arrow && Mr(c) != null && J !== M && u.reference[_] / 2 - (J < Q ? ie : ue) - k[_] / 2 < 0, ne = U ? J < Q ? J - Q : J - D : 0;
    return {
      [j]: b[j] + ne,
      data: {
        [j]: M,
        centerOffset: J - M - ne,
        ...U && {
          alignmentOffset: ne
        }
      },
      reset: U
    };
  }
}), M0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(r) {
      var o, i;
      const {
        placement: c,
        middlewareData: u,
        rects: f,
        initialPlacement: p,
        platform: m,
        elements: g
      } = r, {
        mainAxis: y = !0,
        crossAxis: x = !0,
        fallbackPlacements: b,
        fallbackStrategy: j = "bestFit",
        fallbackAxisSideDirection: _ = "none",
        flipAlignment: k = !0,
        ...S
      } = ln(t, r);
      if ((o = u.arrow) != null && o.alignmentOffset)
        return {};
      const C = cn(c), R = Vt(p), E = cn(p) === p, $ = await (m.isRTL == null ? void 0 : m.isRTL(g.floating)), G = b || (E || !k ? [ci(p)] : S0(p)), Y = _ !== "none";
      !b && Y && G.push(...E0(p, k, _, $));
      const W = [p, ...G], K = await m.detectOverflow(r, S), le = [];
      let ie = ((i = u.flip) == null ? void 0 : i.overflows) || [];
      if (y && le.push(K[C]), x) {
        const J = N0(c, f, $);
        le.push(K[J[0]], K[J[1]]);
      }
      if (ie = [...ie, {
        placement: c,
        overflows: le
      }], !le.every((J) => J <= 0)) {
        var ue, Q;
        const J = (((ue = u.flip) == null ? void 0 : ue.index) || 0) + 1, M = W[J];
        if (M && (!(x === "alignment" ? R !== Vt(M) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ie.every((F) => Vt(F.placement) === R ? F.overflows[0] > 0 : !0)))
          return {
            data: {
              index: J,
              overflows: ie
            },
            reset: {
              placement: M
            }
          };
        let U = (Q = ie.filter((ne) => ne.overflows[0] <= 0).sort((ne, F) => ne.overflows[1] - F.overflows[1])[0]) == null ? void 0 : Q.placement;
        if (!U)
          switch (j) {
            case "bestFit": {
              var D;
              const ne = (D = ie.filter((F) => {
                if (Y) {
                  const Z = Vt(F.placement);
                  return Z === R || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Z === "y";
                }
                return !0;
              }).map((F) => [F.placement, F.overflows.filter((Z) => Z > 0).reduce((Z, X) => Z + X, 0)]).sort((F, Z) => F[1] - Z[1])[0]) == null ? void 0 : D[0];
              ne && (U = ne);
              break;
            }
            case "initialPlacement":
              U = p;
              break;
          }
        if (c !== U)
          return {
            reset: {
              placement: U
            }
          };
      }
      return {};
    }
  };
};
function sp(t, r) {
  return {
    top: t.top - r.height,
    right: t.right - r.width,
    bottom: t.bottom - r.height,
    left: t.left - r.width
  };
}
function op(t) {
  return k0.some((r) => t[r] >= 0);
}
const I0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(r) {
      const {
        rects: o,
        platform: i
      } = r, {
        strategy: c = "referenceHidden",
        ...u
      } = ln(t, r);
      switch (c) {
        case "referenceHidden": {
          const f = await i.detectOverflow(r, {
            ...u,
            elementContext: "reference"
          }), p = sp(f, o.reference);
          return {
            data: {
              referenceHiddenOffsets: p,
              referenceHidden: op(p)
            }
          };
        }
        case "escaped": {
          const f = await i.detectOverflow(r, {
            ...u,
            altBoundary: !0
          }), p = sp(f, o.floating);
          return {
            data: {
              escapedOffsets: p,
              escaped: op(p)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, eh = /* @__PURE__ */ new Set(["left", "top"]);
async function $0(t, r) {
  const {
    placement: o,
    platform: i,
    elements: c
  } = t, u = await (i.isRTL == null ? void 0 : i.isRTL(c.floating)), f = cn(o), p = Mr(o), m = Vt(o) === "y", g = eh.has(f) ? -1 : 1, y = u && m ? -1 : 1, x = ln(r, t);
  let {
    mainAxis: b,
    crossAxis: j,
    alignmentAxis: _
  } = typeof x == "number" ? {
    mainAxis: x,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: x.mainAxis || 0,
    crossAxis: x.crossAxis || 0,
    alignmentAxis: x.alignmentAxis
  };
  return p && typeof _ == "number" && (j = p === "end" ? _ * -1 : _), m ? {
    x: j * y,
    y: b * g
  } : {
    x: b * g,
    y: j * y
  };
}
const F0 = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(r) {
      var o, i;
      const {
        x: c,
        y: u,
        placement: f,
        middlewareData: p
      } = r, m = await $0(r, t);
      return f === ((o = p.offset) == null ? void 0 : o.placement) && (i = p.arrow) != null && i.alignmentOffset ? {} : {
        x: c + m.x,
        y: u + m.y,
        data: {
          ...m,
          placement: f
        }
      };
    }
  };
}, D0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(r) {
      const {
        x: o,
        y: i,
        placement: c,
        platform: u
      } = r, {
        mainAxis: f = !0,
        crossAxis: p = !1,
        limiter: m = {
          fn: (C) => {
            let {
              x: R,
              y: E
            } = C;
            return {
              x: R,
              y: E
            };
          }
        },
        ...g
      } = ln(t, r), y = {
        x: o,
        y: i
      }, x = await u.detectOverflow(r, g), b = Vt(cn(c)), j = cc(b);
      let _ = y[j], k = y[b];
      if (f) {
        const C = j === "y" ? "top" : "left", R = j === "y" ? "bottom" : "right", E = _ + x[C], $ = _ - x[R];
        _ = Vl(E, _, $);
      }
      if (p) {
        const C = b === "y" ? "top" : "left", R = b === "y" ? "bottom" : "right", E = k + x[C], $ = k - x[R];
        k = Vl(E, k, $);
      }
      const S = m.fn({
        ...r,
        [j]: _,
        [b]: k
      });
      return {
        ...S,
        data: {
          x: S.x - o,
          y: S.y - i,
          enabled: {
            [j]: f,
            [b]: p
          }
        }
      };
    }
  };
}, B0 = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(r) {
      const {
        x: o,
        y: i,
        placement: c,
        rects: u,
        middlewareData: f
      } = r, {
        offset: p = 0,
        mainAxis: m = !0,
        crossAxis: g = !0
      } = ln(t, r), y = {
        x: o,
        y: i
      }, x = Vt(c), b = cc(x);
      let j = y[b], _ = y[x];
      const k = ln(p, r), S = typeof k == "number" ? {
        mainAxis: k,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...k
      };
      if (m) {
        const E = b === "y" ? "height" : "width", $ = u.reference[b] - u.floating[E] + S.mainAxis, G = u.reference[b] + u.reference[E] - S.mainAxis;
        j < $ ? j = $ : j > G && (j = G);
      }
      if (g) {
        var C, R;
        const E = b === "y" ? "width" : "height", $ = eh.has(cn(c)), G = u.reference[x] - u.floating[E] + ($ && ((C = f.offset) == null ? void 0 : C[x]) || 0) + ($ ? 0 : S.crossAxis), Y = u.reference[x] + u.reference[E] + ($ ? 0 : ((R = f.offset) == null ? void 0 : R[x]) || 0) - ($ ? S.crossAxis : 0);
        _ < G ? _ = G : _ > Y && (_ = Y);
      }
      return {
        [b]: j,
        [x]: _
      };
    }
  };
}, z0 = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(r) {
      var o, i;
      const {
        placement: c,
        rects: u,
        platform: f,
        elements: p
      } = r, {
        apply: m = () => {
        },
        ...g
      } = ln(t, r), y = await f.detectOverflow(r, g), x = cn(c), b = Mr(c), j = Vt(c) === "y", {
        width: _,
        height: k
      } = u.floating;
      let S, C;
      x === "top" || x === "bottom" ? (S = x, C = b === (await (f.isRTL == null ? void 0 : f.isRTL(p.floating)) ? "start" : "end") ? "left" : "right") : (C = x, S = b === "end" ? "top" : "bottom");
      const R = k - y.top - y.bottom, E = _ - y.left - y.right, $ = On(k - y[S], R), G = On(_ - y[C], E), Y = !r.middlewareData.shift;
      let W = $, K = G;
      if ((o = r.middlewareData.shift) != null && o.enabled.x && (K = E), (i = r.middlewareData.shift) != null && i.enabled.y && (W = R), Y && !b) {
        const ie = yt(y.left, 0), ue = yt(y.right, 0), Q = yt(y.top, 0), D = yt(y.bottom, 0);
        j ? K = _ - 2 * (ie !== 0 || ue !== 0 ? ie + ue : yt(y.left, y.right)) : W = k - 2 * (Q !== 0 || D !== 0 ? Q + D : yt(y.top, y.bottom));
      }
      await m({
        ...r,
        availableWidth: K,
        availableHeight: W
      });
      const le = await f.getDimensions(p.floating);
      return _ !== le.width || k !== le.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function bi() {
  return typeof window < "u";
}
function Ir(t) {
  return th(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function vt(t) {
  var r;
  return (t == null || (r = t.ownerDocument) == null ? void 0 : r.defaultView) || window;
}
function Gt(t) {
  var r;
  return (r = (th(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : r.documentElement;
}
function th(t) {
  return bi() ? t instanceof Node || t instanceof vt(t).Node : !1;
}
function It(t) {
  return bi() ? t instanceof Element || t instanceof vt(t).Element : !1;
}
function un(t) {
  return bi() ? t instanceof HTMLElement || t instanceof vt(t).HTMLElement : !1;
}
function ip(t) {
  return !bi() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof vt(t).ShadowRoot;
}
function Is(t) {
  const {
    overflow: r,
    overflowX: o,
    overflowY: i,
    display: c
  } = $t(t);
  return /auto|scroll|overlay|hidden|clip/.test(r + i + o) && c !== "inline" && c !== "contents";
}
function U0(t) {
  return /^(table|td|th)$/.test(Ir(t));
}
function ki(t) {
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
const W0 = /transform|translate|scale|rotate|perspective|filter/, H0 = /paint|layout|strict|content/, qn = (t) => !!t && t !== "none";
let Pl;
function fc(t) {
  const r = It(t) ? $t(t) : t;
  return qn(r.transform) || qn(r.translate) || qn(r.scale) || qn(r.rotate) || qn(r.perspective) || !pc() && (qn(r.backdropFilter) || qn(r.filter)) || W0.test(r.willChange || "") || H0.test(r.contain || "");
}
function V0(t) {
  let r = Mn(t);
  for (; un(r) && !Ar(r); ) {
    if (fc(r))
      return r;
    if (ki(r))
      return null;
    r = Mn(r);
  }
  return null;
}
function pc() {
  return Pl == null && (Pl = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Pl;
}
function Ar(t) {
  return /^(html|body|#document)$/.test(Ir(t));
}
function $t(t) {
  return vt(t).getComputedStyle(t);
}
function ji(t) {
  return It(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Mn(t) {
  if (Ir(t) === "html")
    return t;
  const r = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    ip(t) && t.host || // Fallback.
    Gt(t)
  );
  return ip(r) ? r.host : r;
}
function nh(t) {
  const r = Mn(t);
  return Ar(r) ? t.ownerDocument ? t.ownerDocument.body : t.body : un(r) && Is(r) ? r : nh(r);
}
function Rs(t, r, o) {
  var i;
  r === void 0 && (r = []), o === void 0 && (o = !0);
  const c = nh(t), u = c === ((i = t.ownerDocument) == null ? void 0 : i.body), f = vt(c);
  if (u) {
    const p = Ql(f);
    return r.concat(f, f.visualViewport || [], Is(c) ? c : [], p && o ? Rs(p) : []);
  } else
    return r.concat(c, Rs(c, [], o));
}
function Ql(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function rh(t) {
  const r = $t(t);
  let o = parseFloat(r.width) || 0, i = parseFloat(r.height) || 0;
  const c = un(t), u = c ? t.offsetWidth : o, f = c ? t.offsetHeight : i, p = li(o) !== u || li(i) !== f;
  return p && (o = u, i = f), {
    width: o,
    height: i,
    $: p
  };
}
function hc(t) {
  return It(t) ? t : t.contextElement;
}
function Er(t) {
  const r = hc(t);
  if (!un(r))
    return Yt(1);
  const o = r.getBoundingClientRect(), {
    width: i,
    height: c,
    $: u
  } = rh(r);
  let f = (u ? li(o.width) : o.width) / i, p = (u ? li(o.height) : o.height) / c;
  return (!f || !Number.isFinite(f)) && (f = 1), (!p || !Number.isFinite(p)) && (p = 1), {
    x: f,
    y: p
  };
}
const Y0 = /* @__PURE__ */ Yt(0);
function sh(t) {
  const r = vt(t);
  return !pc() || !r.visualViewport ? Y0 : {
    x: r.visualViewport.offsetLeft,
    y: r.visualViewport.offsetTop
  };
}
function Q0(t, r, o) {
  return r === void 0 && (r = !1), !o || r && o !== vt(t) ? !1 : r;
}
function rr(t, r, o, i) {
  r === void 0 && (r = !1), o === void 0 && (o = !1);
  const c = t.getBoundingClientRect(), u = hc(t);
  let f = Yt(1);
  r && (i ? It(i) && (f = Er(i)) : f = Er(t));
  const p = Q0(u, o, i) ? sh(u) : Yt(0);
  let m = (c.left + p.x) / f.x, g = (c.top + p.y) / f.y, y = c.width / f.x, x = c.height / f.y;
  if (u) {
    const b = vt(u), j = i && It(i) ? vt(i) : i;
    let _ = b, k = Ql(_);
    for (; k && i && j !== _; ) {
      const S = Er(k), C = k.getBoundingClientRect(), R = $t(k), E = C.left + (k.clientLeft + parseFloat(R.paddingLeft)) * S.x, $ = C.top + (k.clientTop + parseFloat(R.paddingTop)) * S.y;
      m *= S.x, g *= S.y, y *= S.x, x *= S.y, m += E, g += $, _ = vt(k), k = Ql(_);
    }
  }
  return ui({
    width: y,
    height: x,
    x: m,
    y: g
  });
}
function Ni(t, r) {
  const o = ji(t).scrollLeft;
  return r ? r.left + o : rr(Gt(t)).left + o;
}
function oh(t, r) {
  const o = t.getBoundingClientRect(), i = o.left + r.scrollLeft - Ni(t, o), c = o.top + r.scrollTop;
  return {
    x: i,
    y: c
  };
}
function G0(t) {
  let {
    elements: r,
    rect: o,
    offsetParent: i,
    strategy: c
  } = t;
  const u = c === "fixed", f = Gt(i), p = r ? ki(r.floating) : !1;
  if (i === f || p && u)
    return o;
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  }, g = Yt(1);
  const y = Yt(0), x = un(i);
  if ((x || !x && !u) && ((Ir(i) !== "body" || Is(f)) && (m = ji(i)), x)) {
    const j = rr(i);
    g = Er(i), y.x = j.x + i.clientLeft, y.y = j.y + i.clientTop;
  }
  const b = f && !x && !u ? oh(f, m) : Yt(0);
  return {
    width: o.width * g.x,
    height: o.height * g.y,
    x: o.x * g.x - m.scrollLeft * g.x + y.x + b.x,
    y: o.y * g.y - m.scrollTop * g.y + y.y + b.y
  };
}
function K0(t) {
  return Array.from(t.getClientRects());
}
function q0(t) {
  const r = Gt(t), o = ji(t), i = t.ownerDocument.body, c = yt(r.scrollWidth, r.clientWidth, i.scrollWidth, i.clientWidth), u = yt(r.scrollHeight, r.clientHeight, i.scrollHeight, i.clientHeight);
  let f = -o.scrollLeft + Ni(t);
  const p = -o.scrollTop;
  return $t(i).direction === "rtl" && (f += yt(r.clientWidth, i.clientWidth) - c), {
    width: c,
    height: u,
    x: f,
    y: p
  };
}
const ap = 25;
function X0(t, r) {
  const o = vt(t), i = Gt(t), c = o.visualViewport;
  let u = i.clientWidth, f = i.clientHeight, p = 0, m = 0;
  if (c) {
    u = c.width, f = c.height;
    const y = pc();
    (!y || y && r === "fixed") && (p = c.offsetLeft, m = c.offsetTop);
  }
  const g = Ni(i);
  if (g <= 0) {
    const y = i.ownerDocument, x = y.body, b = getComputedStyle(x), j = y.compatMode === "CSS1Compat" && parseFloat(b.marginLeft) + parseFloat(b.marginRight) || 0, _ = Math.abs(i.clientWidth - x.clientWidth - j);
    _ <= ap && (u -= _);
  } else g <= ap && (u += g);
  return {
    width: u,
    height: f,
    x: p,
    y: m
  };
}
function Z0(t, r) {
  const o = rr(t, !0, r === "fixed"), i = o.top + t.clientTop, c = o.left + t.clientLeft, u = un(t) ? Er(t) : Yt(1), f = t.clientWidth * u.x, p = t.clientHeight * u.y, m = c * u.x, g = i * u.y;
  return {
    width: f,
    height: p,
    x: m,
    y: g
  };
}
function lp(t, r, o) {
  let i;
  if (r === "viewport")
    i = X0(t, o);
  else if (r === "document")
    i = q0(Gt(t));
  else if (It(r))
    i = Z0(r, o);
  else {
    const c = sh(t);
    i = {
      x: r.x - c.x,
      y: r.y - c.y,
      width: r.width,
      height: r.height
    };
  }
  return ui(i);
}
function ih(t, r) {
  const o = Mn(t);
  return o === r || !It(o) || Ar(o) ? !1 : $t(o).position === "fixed" || ih(o, r);
}
function J0(t, r) {
  const o = r.get(t);
  if (o)
    return o;
  let i = Rs(t, [], !1).filter((p) => It(p) && Ir(p) !== "body"), c = null;
  const u = $t(t).position === "fixed";
  let f = u ? Mn(t) : t;
  for (; It(f) && !Ar(f); ) {
    const p = $t(f), m = fc(f);
    !m && p.position === "fixed" && (c = null), (u ? !m && !c : !m && p.position === "static" && !!c && (c.position === "absolute" || c.position === "fixed") || Is(f) && !m && ih(t, f)) ? i = i.filter((y) => y !== f) : c = p, f = Mn(f);
  }
  return r.set(t, i), i;
}
function ex(t) {
  let {
    element: r,
    boundary: o,
    rootBoundary: i,
    strategy: c
  } = t;
  const f = [...o === "clippingAncestors" ? ki(r) ? [] : J0(r, this._c) : [].concat(o), i], p = lp(r, f[0], c);
  let m = p.top, g = p.right, y = p.bottom, x = p.left;
  for (let b = 1; b < f.length; b++) {
    const j = lp(r, f[b], c);
    m = yt(j.top, m), g = On(j.right, g), y = On(j.bottom, y), x = yt(j.left, x);
  }
  return {
    width: g - x,
    height: y - m,
    x,
    y: m
  };
}
function tx(t) {
  const {
    width: r,
    height: o
  } = rh(t);
  return {
    width: r,
    height: o
  };
}
function nx(t, r, o) {
  const i = un(r), c = Gt(r), u = o === "fixed", f = rr(t, !0, u, r);
  let p = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const m = Yt(0);
  function g() {
    m.x = Ni(c);
  }
  if (i || !i && !u)
    if ((Ir(r) !== "body" || Is(c)) && (p = ji(r)), i) {
      const j = rr(r, !0, u, r);
      m.x = j.x + r.clientLeft, m.y = j.y + r.clientTop;
    } else c && g();
  u && !i && c && g();
  const y = c && !i && !u ? oh(c, p) : Yt(0), x = f.left + p.scrollLeft - m.x - y.x, b = f.top + p.scrollTop - m.y - y.y;
  return {
    x,
    y: b,
    width: f.width,
    height: f.height
  };
}
function El(t) {
  return $t(t).position === "static";
}
function cp(t, r) {
  if (!un(t) || $t(t).position === "fixed")
    return null;
  if (r)
    return r(t);
  let o = t.offsetParent;
  return Gt(t) === o && (o = o.ownerDocument.body), o;
}
function ah(t, r) {
  const o = vt(t);
  if (ki(t))
    return o;
  if (!un(t)) {
    let c = Mn(t);
    for (; c && !Ar(c); ) {
      if (It(c) && !El(c))
        return c;
      c = Mn(c);
    }
    return o;
  }
  let i = cp(t, r);
  for (; i && U0(i) && El(i); )
    i = cp(i, r);
  return i && Ar(i) && El(i) && !fc(i) ? o : i || V0(t) || o;
}
const rx = async function(t) {
  const r = this.getOffsetParent || ah, o = this.getDimensions, i = await o(t.floating);
  return {
    reference: nx(t.reference, await r(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function sx(t) {
  return $t(t).direction === "rtl";
}
const ox = {
  convertOffsetParentRelativeRectToViewportRelativeRect: G0,
  getDocumentElement: Gt,
  getClippingRect: ex,
  getOffsetParent: ah,
  getElementRects: rx,
  getClientRects: K0,
  getDimensions: tx,
  getScale: Er,
  isElement: It,
  isRTL: sx
};
function lh(t, r) {
  return t.x === r.x && t.y === r.y && t.width === r.width && t.height === r.height;
}
function ix(t, r) {
  let o = null, i;
  const c = Gt(t);
  function u() {
    var p;
    clearTimeout(i), (p = o) == null || p.disconnect(), o = null;
  }
  function f(p, m) {
    p === void 0 && (p = !1), m === void 0 && (m = 1), u();
    const g = t.getBoundingClientRect(), {
      left: y,
      top: x,
      width: b,
      height: j
    } = g;
    if (p || r(), !b || !j)
      return;
    const _ = Zo(x), k = Zo(c.clientWidth - (y + b)), S = Zo(c.clientHeight - (x + j)), C = Zo(y), E = {
      rootMargin: -_ + "px " + -k + "px " + -S + "px " + -C + "px",
      threshold: yt(0, On(1, m)) || 1
    };
    let $ = !0;
    function G(Y) {
      const W = Y[0].intersectionRatio;
      if (W !== m) {
        if (!$)
          return f();
        W ? f(!1, W) : i = setTimeout(() => {
          f(!1, 1e-7);
        }, 1e3);
      }
      W === 1 && !lh(g, t.getBoundingClientRect()) && f(), $ = !1;
    }
    try {
      o = new IntersectionObserver(G, {
        ...E,
        // Handle <iframe>s
        root: c.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(G, E);
    }
    o.observe(t);
  }
  return f(!0), u;
}
function ax(t, r, o, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: u = !0,
    elementResize: f = typeof ResizeObserver == "function",
    layoutShift: p = typeof IntersectionObserver == "function",
    animationFrame: m = !1
  } = i, g = hc(t), y = c || u ? [...g ? Rs(g) : [], ...r ? Rs(r) : []] : [];
  y.forEach((C) => {
    c && C.addEventListener("scroll", o, {
      passive: !0
    }), u && C.addEventListener("resize", o);
  });
  const x = g && p ? ix(g, o) : null;
  let b = -1, j = null;
  f && (j = new ResizeObserver((C) => {
    let [R] = C;
    R && R.target === g && j && r && (j.unobserve(r), cancelAnimationFrame(b), b = requestAnimationFrame(() => {
      var E;
      (E = j) == null || E.observe(r);
    })), o();
  }), g && !m && j.observe(g), r && j.observe(r));
  let _, k = m ? rr(t) : null;
  m && S();
  function S() {
    const C = rr(t);
    k && !lh(k, C) && o(), k = C, _ = requestAnimationFrame(S);
  }
  return o(), () => {
    var C;
    y.forEach((R) => {
      c && R.removeEventListener("scroll", o), u && R.removeEventListener("resize", o);
    }), x?.(), (C = j) == null || C.disconnect(), j = null, m && cancelAnimationFrame(_);
  };
}
const lx = F0, cx = D0, ux = M0, dx = z0, fx = I0, up = O0, px = B0, hx = (t, r, o) => {
  const i = /* @__PURE__ */ new Map(), c = {
    platform: ox,
    ...o
  }, u = {
    ...c.platform,
    _c: i
  };
  return L0(t, r, {
    ...c,
    platform: u
  });
};
var mx = typeof document < "u", gx = function() {
}, ri = mx ? w.useLayoutEffect : gx;
function di(t, r) {
  if (t === r)
    return !0;
  if (typeof t != typeof r)
    return !1;
  if (typeof t == "function" && t.toString() === r.toString())
    return !0;
  let o, i, c;
  if (t && r && typeof t == "object") {
    if (Array.isArray(t)) {
      if (o = t.length, o !== r.length) return !1;
      for (i = o; i-- !== 0; )
        if (!di(t[i], r[i]))
          return !1;
      return !0;
    }
    if (c = Object.keys(t), o = c.length, o !== Object.keys(r).length)
      return !1;
    for (i = o; i-- !== 0; )
      if (!{}.hasOwnProperty.call(r, c[i]))
        return !1;
    for (i = o; i-- !== 0; ) {
      const u = c[i];
      if (!(u === "_owner" && t.$$typeof) && !di(t[u], r[u]))
        return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}
function ch(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function dp(t, r) {
  const o = ch(t);
  return Math.round(r * o) / o;
}
function Rl(t) {
  const r = w.useRef(t);
  return ri(() => {
    r.current = t;
  }), r;
}
function yx(t) {
  t === void 0 && (t = {});
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: c,
    elements: {
      reference: u,
      floating: f
    } = {},
    transform: p = !0,
    whileElementsMounted: m,
    open: g
  } = t, [y, x] = w.useState({
    x: 0,
    y: 0,
    strategy: o,
    placement: r,
    middlewareData: {},
    isPositioned: !1
  }), [b, j] = w.useState(i);
  di(b, i) || j(i);
  const [_, k] = w.useState(null), [S, C] = w.useState(null), R = w.useCallback((F) => {
    F !== Y.current && (Y.current = F, k(F));
  }, []), E = w.useCallback((F) => {
    F !== W.current && (W.current = F, C(F));
  }, []), $ = u || _, G = f || S, Y = w.useRef(null), W = w.useRef(null), K = w.useRef(y), le = m != null, ie = Rl(m), ue = Rl(c), Q = Rl(g), D = w.useCallback(() => {
    if (!Y.current || !W.current)
      return;
    const F = {
      placement: r,
      strategy: o,
      middleware: b
    };
    ue.current && (F.platform = ue.current), hx(Y.current, W.current, F).then((Z) => {
      const X = {
        ...Z,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: Q.current !== !1
      };
      J.current && !di(K.current, X) && (K.current = X, lc.flushSync(() => {
        x(X);
      }));
    });
  }, [b, r, o, ue, Q]);
  ri(() => {
    g === !1 && K.current.isPositioned && (K.current.isPositioned = !1, x((F) => ({
      ...F,
      isPositioned: !1
    })));
  }, [g]);
  const J = w.useRef(!1);
  ri(() => (J.current = !0, () => {
    J.current = !1;
  }), []), ri(() => {
    if ($ && (Y.current = $), G && (W.current = G), $ && G) {
      if (ie.current)
        return ie.current($, G, D);
      D();
    }
  }, [$, G, D, ie, le]);
  const M = w.useMemo(() => ({
    reference: Y,
    floating: W,
    setReference: R,
    setFloating: E
  }), [R, E]), U = w.useMemo(() => ({
    reference: $,
    floating: G
  }), [$, G]), ne = w.useMemo(() => {
    const F = {
      position: o,
      left: 0,
      top: 0
    };
    if (!U.floating)
      return F;
    const Z = dp(U.floating, y.x), X = dp(U.floating, y.y);
    return p ? {
      ...F,
      transform: "translate(" + Z + "px, " + X + "px)",
      ...ch(U.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: o,
      left: Z,
      top: X
    };
  }, [o, p, U.floating, y.x, y.y]);
  return w.useMemo(() => ({
    ...y,
    update: D,
    refs: M,
    elements: U,
    floatingStyles: ne
  }), [y, D, M, U, ne]);
}
const vx = (t) => {
  function r(o) {
    return {}.hasOwnProperty.call(o, "current");
  }
  return {
    name: "arrow",
    options: t,
    fn(o) {
      const {
        element: i,
        padding: c
      } = typeof t == "function" ? t(o) : t;
      return i && r(i) ? i.current != null ? up({
        element: i.current,
        padding: c
      }).fn(o) : {} : i ? up({
        element: i,
        padding: c
      }).fn(o) : {};
    }
  };
}, xx = (t, r) => {
  const o = lx(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, wx = (t, r) => {
  const o = cx(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, bx = (t, r) => ({
  fn: px(t).fn,
  options: [t, r]
}), kx = (t, r) => {
  const o = ux(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, jx = (t, r) => {
  const o = dx(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, Nx = (t, r) => {
  const o = fx(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
}, Sx = (t, r) => {
  const o = vx(t);
  return {
    name: o.name,
    fn: o.fn,
    options: [t, r]
  };
};
var _x = "Arrow", uh = w.forwardRef((t, r) => {
  const { children: o, width: i = 10, height: c = 5, ...u } = t;
  return /* @__PURE__ */ l.jsx(
    xt.svg,
    {
      ...u,
      ref: r,
      width: i,
      height: c,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: t.asChild ? o : /* @__PURE__ */ l.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
uh.displayName = _x;
var Cx = uh;
function Px(t) {
  const [r, o] = w.useState(void 0);
  return nr(() => {
    if (t) {
      o({ width: t.offsetWidth, height: t.offsetHeight });
      const i = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const u = c[0];
        let f, p;
        if ("borderBoxSize" in u) {
          const m = u.borderBoxSize, g = Array.isArray(m) ? m[0] : m;
          f = g.inlineSize, p = g.blockSize;
        } else
          f = t.offsetWidth, p = t.offsetHeight;
        o({ width: f, height: p });
      });
      return i.observe(t, { box: "border-box" }), () => i.unobserve(t);
    } else
      o(void 0);
  }, [t]), r;
}
var dh = "Popper", [fh, ph] = Os(dh), [Jj, hh] = fh(dh), mh = "PopperAnchor", gh = w.forwardRef(
  (t, r) => {
    const { __scopePopper: o, virtualRef: i, ...c } = t, u = hh(mh, o), f = w.useRef(null), p = Qt(r, f), m = w.useRef(null);
    return w.useEffect(() => {
      const g = m.current;
      m.current = i?.current || f.current, g !== m.current && u.onAnchorChange(m.current);
    }), i ? null : /* @__PURE__ */ l.jsx(xt.div, { ...c, ref: p });
  }
);
gh.displayName = mh;
var mc = "PopperContent", [Ex, Rx] = fh(mc), yh = w.forwardRef(
  (t, r) => {
    const {
      __scopePopper: o,
      side: i = "bottom",
      sideOffset: c = 0,
      align: u = "center",
      alignOffset: f = 0,
      arrowPadding: p = 0,
      avoidCollisions: m = !0,
      collisionBoundary: g = [],
      collisionPadding: y = 0,
      sticky: x = "partial",
      hideWhenDetached: b = !1,
      updatePositionStrategy: j = "optimized",
      onPlaced: _,
      ...k
    } = t, S = hh(mc, o), [C, R] = w.useState(null), E = Qt(r, (ve) => R(ve)), [$, G] = w.useState(null), Y = Px($), W = Y?.width ?? 0, K = Y?.height ?? 0, le = i + (u !== "center" ? "-" + u : ""), ie = typeof y == "number" ? y : { top: 0, right: 0, bottom: 0, left: 0, ...y }, ue = Array.isArray(g) ? g : [g], Q = ue.length > 0, D = {
      padding: ie,
      boundary: ue.filter(Ax),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: Q
    }, { refs: J, floatingStyles: M, placement: U, isPositioned: ne, middlewareData: F } = yx({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: le,
      whileElementsMounted: (...ve) => ax(...ve, {
        animationFrame: j === "always"
      }),
      elements: {
        reference: S.anchor
      },
      middleware: [
        xx({ mainAxis: c + K, alignmentAxis: f }),
        m && wx({
          mainAxis: !0,
          crossAxis: !1,
          limiter: x === "partial" ? bx() : void 0,
          ...D
        }),
        m && kx({ ...D }),
        jx({
          ...D,
          apply: ({ elements: ve, rects: ye, availableWidth: be, availableHeight: Be }) => {
            const { width: ze, height: Ds } = ye.reference, Kt = ve.floating.style;
            Kt.setProperty("--radix-popper-available-width", `${be}px`), Kt.setProperty("--radix-popper-available-height", `${Be}px`), Kt.setProperty("--radix-popper-anchor-width", `${ze}px`), Kt.setProperty("--radix-popper-anchor-height", `${Ds}px`);
          }
        }),
        $ && Sx({ element: $, padding: p }),
        Lx({ arrowWidth: W, arrowHeight: K }),
        b && Nx({ strategy: "referenceHidden", ...D })
      ]
    }), [Z, X] = wh(U), A = Ms(_);
    nr(() => {
      ne && A?.();
    }, [ne, A]);
    const B = F.arrow?.x, he = F.arrow?.y, oe = F.arrow?.centerOffset !== 0, [pe, me] = w.useState();
    return nr(() => {
      C && me(window.getComputedStyle(C).zIndex);
    }, [C]), /* @__PURE__ */ l.jsx(
      "div",
      {
        ref: J.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...M,
          transform: ne ? M.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: pe,
          "--radix-popper-transform-origin": [
            F.transformOrigin?.x,
            F.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...F.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: t.dir,
        children: /* @__PURE__ */ l.jsx(
          Ex,
          {
            scope: o,
            placedSide: Z,
            onArrowChange: G,
            arrowX: B,
            arrowY: he,
            shouldHideArrow: oe,
            children: /* @__PURE__ */ l.jsx(
              xt.div,
              {
                "data-side": Z,
                "data-align": X,
                ...k,
                ref: E,
                style: {
                  ...k.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: ne ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
yh.displayName = mc;
var vh = "PopperArrow", Tx = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, xh = w.forwardRef(function(r, o) {
  const { __scopePopper: i, ...c } = r, u = Rx(vh, i), f = Tx[u.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ l.jsx(
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
        children: /* @__PURE__ */ l.jsx(
          Cx,
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
xh.displayName = vh;
function Ax(t) {
  return t !== null;
}
var Lx = (t) => ({
  name: "transformOrigin",
  options: t,
  fn(r) {
    const { placement: o, rects: i, middlewareData: c } = r, f = c.arrow?.centerOffset !== 0, p = f ? 0 : t.arrowWidth, m = f ? 0 : t.arrowHeight, [g, y] = wh(o), x = { start: "0%", center: "50%", end: "100%" }[y], b = (c.arrow?.x ?? 0) + p / 2, j = (c.arrow?.y ?? 0) + m / 2;
    let _ = "", k = "";
    return g === "bottom" ? (_ = f ? x : `${b}px`, k = `${-m}px`) : g === "top" ? (_ = f ? x : `${b}px`, k = `${i.floating.height + m}px`) : g === "right" ? (_ = `${-m}px`, k = f ? x : `${j}px`) : g === "left" && (_ = `${i.floating.width + m}px`, k = f ? x : `${j}px`), { data: { x: _, y: k } };
  }
});
function wh(t) {
  const [r, o = "center"] = t.split("-");
  return [r, o];
}
var Ox = gh, Mx = yh, Ix = xh;
function $x(t, r) {
  return w.useReducer((o, i) => r[o][i] ?? o, t);
}
var gc = (t) => {
  const { present: r, children: o } = t, i = Fx(r), c = typeof o == "function" ? o({ present: i.isPresent }) : w.Children.only(o), u = Qt(i.ref, Dx(c));
  return typeof o == "function" || i.isPresent ? w.cloneElement(c, { ref: u }) : null;
};
gc.displayName = "Presence";
function Fx(t) {
  const [r, o] = w.useState(), i = w.useRef(null), c = w.useRef(t), u = w.useRef("none"), f = t ? "mounted" : "unmounted", [p, m] = $x(f, {
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
  return w.useEffect(() => {
    const g = Jo(i.current);
    u.current = p === "mounted" ? g : "none";
  }, [p]), nr(() => {
    const g = i.current, y = c.current;
    if (y !== t) {
      const b = u.current, j = Jo(g);
      t ? m("MOUNT") : j === "none" || g?.display === "none" ? m("UNMOUNT") : m(y && b !== j ? "ANIMATION_OUT" : "UNMOUNT"), c.current = t;
    }
  }, [t, m]), nr(() => {
    if (r) {
      let g;
      const y = r.ownerDocument.defaultView ?? window, x = (j) => {
        const k = Jo(i.current).includes(CSS.escape(j.animationName));
        if (j.target === r && k && (m("ANIMATION_END"), !c.current)) {
          const S = r.style.animationFillMode;
          r.style.animationFillMode = "forwards", g = y.setTimeout(() => {
            r.style.animationFillMode === "forwards" && (r.style.animationFillMode = S);
          });
        }
      }, b = (j) => {
        j.target === r && (u.current = Jo(i.current));
      };
      return r.addEventListener("animationstart", b), r.addEventListener("animationcancel", x), r.addEventListener("animationend", x), () => {
        y.clearTimeout(g), r.removeEventListener("animationstart", b), r.removeEventListener("animationcancel", x), r.removeEventListener("animationend", x);
      };
    } else
      m("ANIMATION_END");
  }, [r, m]), {
    isPresent: ["mounted", "unmountSuspended"].includes(p),
    ref: w.useCallback((g) => {
      i.current = g ? getComputedStyle(g) : null, o(g);
    }, [])
  };
}
function Jo(t) {
  return t?.animationName || "none";
}
function Dx(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
var Bx = /* @__PURE__ */ Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function zx(t) {
  const r = ({ children: o }) => /* @__PURE__ */ l.jsx(l.Fragment, { children: o });
  return r.displayName = `${t}.Slottable`, r.__radixId = Bx, r;
}
var Ux = vi[" useInsertionEffect ".trim().toString()] || nr;
function bh({
  prop: t,
  defaultProp: r,
  onChange: o = () => {
  },
  caller: i
}) {
  const [c, u, f] = Wx({
    defaultProp: r,
    onChange: o
  }), p = t !== void 0, m = p ? t : c;
  {
    const y = w.useRef(t !== void 0);
    w.useEffect(() => {
      const x = y.current;
      x !== p && console.warn(
        `${i} is changing from ${x ? "controlled" : "uncontrolled"} to ${p ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), y.current = p;
    }, [p, i]);
  }
  const g = w.useCallback(
    (y) => {
      if (p) {
        const x = Hx(y) ? y(t) : y;
        x !== t && f.current?.(x);
      } else
        u(y);
    },
    [p, t, u, f]
  );
  return [m, g];
}
function Wx({
  defaultProp: t,
  onChange: r
}) {
  const [o, i] = w.useState(t), c = w.useRef(o), u = w.useRef(r);
  return Ux(() => {
    u.current = r;
  }, [r]), w.useEffect(() => {
    c.current !== o && (u.current?.(o), c.current = o);
  }, [o, c]), [o, i, u];
}
function Hx(t) {
  return typeof t == "function";
}
var Vx = Object.freeze({
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
}), Yx = "VisuallyHidden", kh = w.forwardRef(
  (t, r) => /* @__PURE__ */ l.jsx(
    xt.span,
    {
      ...t,
      ref: r,
      style: { ...Vx, ...t.style }
    }
  )
);
kh.displayName = Yx;
var Qx = kh, [Si] = Os("Tooltip", [
  ph
]), yc = ph(), jh = "TooltipProvider", Gx = 700, fp = "tooltip.open", [Kx, Nh] = Si(jh), Sh = (t) => {
  const {
    __scopeTooltip: r,
    delayDuration: o = Gx,
    skipDelayDuration: i = 300,
    disableHoverableContent: c = !1,
    children: u
  } = t, f = w.useRef(!0), p = w.useRef(!1), m = w.useRef(0);
  return w.useEffect(() => {
    const g = m.current;
    return () => window.clearTimeout(g);
  }, []), /* @__PURE__ */ l.jsx(
    Kx,
    {
      scope: r,
      isOpenDelayedRef: f,
      delayDuration: o,
      onOpen: w.useCallback(() => {
        window.clearTimeout(m.current), f.current = !1;
      }, []),
      onClose: w.useCallback(() => {
        window.clearTimeout(m.current), m.current = window.setTimeout(
          () => f.current = !0,
          i
        );
      }, [i]),
      isPointerInTransitRef: p,
      onPointerInTransitChange: w.useCallback((g) => {
        p.current = g;
      }, []),
      disableHoverableContent: c,
      children: u
    }
  );
};
Sh.displayName = jh;
var _h = "Tooltip", [eN, _i] = Si(_h), Gl = "TooltipTrigger", qx = w.forwardRef(
  (t, r) => {
    const { __scopeTooltip: o, ...i } = t, c = _i(Gl, o), u = Nh(Gl, o), f = yc(o), p = w.useRef(null), m = Qt(r, p, c.onTriggerChange), g = w.useRef(!1), y = w.useRef(!1), x = w.useCallback(() => g.current = !1, []);
    return w.useEffect(() => () => document.removeEventListener("pointerup", x), [x]), /* @__PURE__ */ l.jsx(Ox, { asChild: !0, ...f, children: /* @__PURE__ */ l.jsx(
      xt.button,
      {
        "aria-describedby": c.open ? c.contentId : void 0,
        "data-state": c.stateAttribute,
        ...i,
        ref: m,
        onPointerMove: Ge(t.onPointerMove, (b) => {
          b.pointerType !== "touch" && !y.current && !u.isPointerInTransitRef.current && (c.onTriggerEnter(), y.current = !0);
        }),
        onPointerLeave: Ge(t.onPointerLeave, () => {
          c.onTriggerLeave(), y.current = !1;
        }),
        onPointerDown: Ge(t.onPointerDown, () => {
          c.open && c.onClose(), g.current = !0, document.addEventListener("pointerup", x, { once: !0 });
        }),
        onFocus: Ge(t.onFocus, () => {
          g.current || c.onOpen();
        }),
        onBlur: Ge(t.onBlur, c.onClose),
        onClick: Ge(t.onClick, c.onClose)
      }
    ) });
  }
);
qx.displayName = Gl;
var Xx = "TooltipPortal", [tN, Zx] = Si(Xx, {
  forceMount: void 0
}), Lr = "TooltipContent", Ch = w.forwardRef(
  (t, r) => {
    const o = Zx(Lr, t.__scopeTooltip), { forceMount: i = o.forceMount, side: c = "top", ...u } = t, f = _i(Lr, t.__scopeTooltip);
    return /* @__PURE__ */ l.jsx(gc, { present: i || f.open, children: f.disableHoverableContent ? /* @__PURE__ */ l.jsx(Ph, { side: c, ...u, ref: r }) : /* @__PURE__ */ l.jsx(Jx, { side: c, ...u, ref: r }) });
  }
), Jx = w.forwardRef((t, r) => {
  const o = _i(Lr, t.__scopeTooltip), i = Nh(Lr, t.__scopeTooltip), c = w.useRef(null), u = Qt(r, c), [f, p] = w.useState(null), { trigger: m, onClose: g } = o, y = c.current, { onPointerInTransitChange: x } = i, b = w.useCallback(() => {
    p(null), x(!1);
  }, [x]), j = w.useCallback(
    (_, k) => {
      const S = _.currentTarget, C = { x: _.clientX, y: _.clientY }, R = sw(C, S.getBoundingClientRect()), E = ow(C, R), $ = iw(k.getBoundingClientRect()), G = lw([...E, ...$]);
      p(G), x(!0);
    },
    [x]
  );
  return w.useEffect(() => () => b(), [b]), w.useEffect(() => {
    if (m && y) {
      const _ = (S) => j(S, y), k = (S) => j(S, m);
      return m.addEventListener("pointerleave", _), y.addEventListener("pointerleave", k), () => {
        m.removeEventListener("pointerleave", _), y.removeEventListener("pointerleave", k);
      };
    }
  }, [m, y, j, b]), w.useEffect(() => {
    if (f) {
      const _ = (k) => {
        const S = k.target, C = { x: k.clientX, y: k.clientY }, R = m?.contains(S) || y?.contains(S), E = !aw(C, f);
        R ? b() : E && (b(), g());
      };
      return document.addEventListener("pointermove", _), () => document.removeEventListener("pointermove", _);
    }
  }, [m, y, f, g, b]), /* @__PURE__ */ l.jsx(Ph, { ...t, ref: u });
}), [ew, tw] = Si(_h, { isInside: !1 }), nw = /* @__PURE__ */ zx("TooltipContent"), Ph = w.forwardRef(
  (t, r) => {
    const {
      __scopeTooltip: o,
      children: i,
      "aria-label": c,
      onEscapeKeyDown: u,
      onPointerDownOutside: f,
      ...p
    } = t, m = _i(Lr, o), g = yc(o), { onClose: y } = m;
    return w.useEffect(() => (document.addEventListener(fp, y), () => document.removeEventListener(fp, y)), [y]), w.useEffect(() => {
      if (m.trigger) {
        const x = (b) => {
          b.target?.contains(m.trigger) && y();
        };
        return window.addEventListener("scroll", x, { capture: !0 }), () => window.removeEventListener("scroll", x, { capture: !0 });
      }
    }, [m.trigger, y]), /* @__PURE__ */ l.jsx(
      qp,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: u,
        onPointerDownOutside: f,
        onFocusOutside: (x) => x.preventDefault(),
        onDismiss: y,
        children: /* @__PURE__ */ l.jsxs(
          Mx,
          {
            "data-state": m.stateAttribute,
            ...g,
            ...p,
            ref: r,
            style: {
              ...p.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ l.jsx(nw, { children: i }),
              /* @__PURE__ */ l.jsx(ew, { scope: o, isInside: !0, children: /* @__PURE__ */ l.jsx(Qx, { id: m.contentId, role: "tooltip", children: c || i }) })
            ]
          }
        )
      }
    );
  }
);
Ch.displayName = Lr;
var Eh = "TooltipArrow", rw = w.forwardRef(
  (t, r) => {
    const { __scopeTooltip: o, ...i } = t, c = yc(o);
    return tw(
      Eh,
      o
    ).isInside ? null : /* @__PURE__ */ l.jsx(Ix, { ...c, ...i, ref: r });
  }
);
rw.displayName = Eh;
function sw(t, r) {
  const o = Math.abs(r.top - t.y), i = Math.abs(r.bottom - t.y), c = Math.abs(r.right - t.x), u = Math.abs(r.left - t.x);
  switch (Math.min(o, i, c, u)) {
    case u:
      return "left";
    case c:
      return "right";
    case o:
      return "top";
    case i:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function ow(t, r, o = 5) {
  const i = [];
  switch (r) {
    case "top":
      i.push(
        { x: t.x - o, y: t.y + o },
        { x: t.x + o, y: t.y + o }
      );
      break;
    case "bottom":
      i.push(
        { x: t.x - o, y: t.y - o },
        { x: t.x + o, y: t.y - o }
      );
      break;
    case "left":
      i.push(
        { x: t.x + o, y: t.y - o },
        { x: t.x + o, y: t.y + o }
      );
      break;
    case "right":
      i.push(
        { x: t.x - o, y: t.y - o },
        { x: t.x - o, y: t.y + o }
      );
      break;
  }
  return i;
}
function iw(t) {
  const { top: r, right: o, bottom: i, left: c } = t;
  return [
    { x: c, y: r },
    { x: o, y: r },
    { x: o, y: i },
    { x: c, y: i }
  ];
}
function aw(t, r) {
  const { x: o, y: i } = t;
  let c = !1;
  for (let u = 0, f = r.length - 1; u < r.length; f = u++) {
    const p = r[u], m = r[f], g = p.x, y = p.y, x = m.x, b = m.y;
    y > i != b > i && o < (x - g) * (i - y) / (b - y) + g && (c = !c);
  }
  return c;
}
function lw(t) {
  const r = t.slice();
  return r.sort((o, i) => o.x < i.x ? -1 : o.x > i.x ? 1 : o.y < i.y ? -1 : o.y > i.y ? 1 : 0), cw(r);
}
function cw(t) {
  if (t.length <= 1) return t.slice();
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    for (; r.length >= 2; ) {
      const u = r[r.length - 1], f = r[r.length - 2];
      if ((u.x - f.x) * (c.y - f.y) >= (u.y - f.y) * (c.x - f.x)) r.pop();
      else break;
    }
    r.push(c);
  }
  r.pop();
  const o = [];
  for (let i = t.length - 1; i >= 0; i--) {
    const c = t[i];
    for (; o.length >= 2; ) {
      const u = o[o.length - 1], f = o[o.length - 2];
      if ((u.x - f.x) * (c.y - f.y) >= (u.y - f.y) * (c.x - f.x)) o.pop();
      else break;
    }
    o.push(c);
  }
  return o.pop(), r.length === 1 && o.length === 1 && r[0].x === o[0].x && r[0].y === o[0].y ? r : r.concat(o);
}
var uw = Sh, Rh = Ch;
function Th(t) {
  var r, o, i = "";
  if (typeof t == "string" || typeof t == "number") i += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var c = t.length;
    for (r = 0; r < c; r++) t[r] && (o = Th(t[r])) && (i && (i += " "), i += o);
  } else for (o in t) t[o] && (i && (i += " "), i += o);
  return i;
}
function Ah() {
  for (var t, r, o = 0, i = "", c = arguments.length; o < c; o++) (t = arguments[o]) && (r = Th(t)) && (i && (i += " "), i += r);
  return i;
}
const vc = "-", dw = (t) => {
  const r = pw(t), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: i
  } = t;
  return {
    getClassGroupId: (f) => {
      const p = f.split(vc);
      return p[0] === "" && p.length !== 1 && p.shift(), Lh(p, r) || fw(f);
    },
    getConflictingClassGroupIds: (f, p) => {
      const m = o[f] || [];
      return p && i[f] ? [...m, ...i[f]] : m;
    }
  };
}, Lh = (t, r) => {
  if (t.length === 0)
    return r.classGroupId;
  const o = t[0], i = r.nextPart.get(o), c = i ? Lh(t.slice(1), i) : void 0;
  if (c)
    return c;
  if (r.validators.length === 0)
    return;
  const u = t.join(vc);
  return r.validators.find(({
    validator: f
  }) => f(u))?.classGroupId;
}, pp = /^\[(.+)\]$/, fw = (t) => {
  if (pp.test(t)) {
    const r = pp.exec(t)[1], o = r?.substring(0, r.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, pw = (t) => {
  const {
    theme: r,
    prefix: o
  } = t, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return mw(Object.entries(t.classGroups), o).forEach(([u, f]) => {
    Kl(f, i, u, r);
  }), i;
}, Kl = (t, r, o, i) => {
  t.forEach((c) => {
    if (typeof c == "string") {
      const u = c === "" ? r : hp(r, c);
      u.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (hw(c)) {
        Kl(c(i), r, o, i);
        return;
      }
      r.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([u, f]) => {
      Kl(f, hp(r, u), o, i);
    });
  });
}, hp = (t, r) => {
  let o = t;
  return r.split(vc).forEach((i) => {
    o.nextPart.has(i) || o.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(i);
  }), o;
}, hw = (t) => t.isThemeGetter, mw = (t, r) => r ? t.map(([o, i]) => {
  const c = i.map((u) => typeof u == "string" ? r + u : typeof u == "object" ? Object.fromEntries(Object.entries(u).map(([f, p]) => [r + f, p])) : u);
  return [o, c];
}) : t, gw = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const c = (u, f) => {
    o.set(u, f), r++, r > t && (r = 0, i = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(u) {
      let f = o.get(u);
      if (f !== void 0)
        return f;
      if ((f = i.get(u)) !== void 0)
        return c(u, f), f;
    },
    set(u, f) {
      o.has(u) ? o.set(u, f) : c(u, f);
    }
  };
}, Oh = "!", yw = (t) => {
  const {
    separator: r,
    experimentalParseClassName: o
  } = t, i = r.length === 1, c = r[0], u = r.length, f = (p) => {
    const m = [];
    let g = 0, y = 0, x;
    for (let S = 0; S < p.length; S++) {
      let C = p[S];
      if (g === 0) {
        if (C === c && (i || p.slice(S, S + u) === r)) {
          m.push(p.slice(y, S)), y = S + u;
          continue;
        }
        if (C === "/") {
          x = S;
          continue;
        }
      }
      C === "[" ? g++ : C === "]" && g--;
    }
    const b = m.length === 0 ? p : p.substring(y), j = b.startsWith(Oh), _ = j ? b.substring(1) : b, k = x && x > y ? x - y : void 0;
    return {
      modifiers: m,
      hasImportantModifier: j,
      baseClassName: _,
      maybePostfixModifierPosition: k
    };
  };
  return o ? (p) => o({
    className: p,
    parseClassName: f
  }) : f;
}, vw = (t) => {
  if (t.length <= 1)
    return t;
  const r = [];
  let o = [];
  return t.forEach((i) => {
    i[0] === "[" ? (r.push(...o.sort(), i), o = []) : o.push(i);
  }), r.push(...o.sort()), r;
}, xw = (t) => ({
  cache: gw(t.cacheSize),
  parseClassName: yw(t),
  ...dw(t)
}), ww = /\s+/, bw = (t, r) => {
  const {
    parseClassName: o,
    getClassGroupId: i,
    getConflictingClassGroupIds: c
  } = r, u = [], f = t.trim().split(ww);
  let p = "";
  for (let m = f.length - 1; m >= 0; m -= 1) {
    const g = f[m], {
      modifiers: y,
      hasImportantModifier: x,
      baseClassName: b,
      maybePostfixModifierPosition: j
    } = o(g);
    let _ = !!j, k = i(_ ? b.substring(0, j) : b);
    if (!k) {
      if (!_) {
        p = g + (p.length > 0 ? " " + p : p);
        continue;
      }
      if (k = i(b), !k) {
        p = g + (p.length > 0 ? " " + p : p);
        continue;
      }
      _ = !1;
    }
    const S = vw(y).join(":"), C = x ? S + Oh : S, R = C + k;
    if (u.includes(R))
      continue;
    u.push(R);
    const E = c(k, _);
    for (let $ = 0; $ < E.length; ++$) {
      const G = E[$];
      u.push(C + G);
    }
    p = g + (p.length > 0 ? " " + p : p);
  }
  return p;
};
function kw() {
  let t = 0, r, o, i = "";
  for (; t < arguments.length; )
    (r = arguments[t++]) && (o = Mh(r)) && (i && (i += " "), i += o);
  return i;
}
const Mh = (t) => {
  if (typeof t == "string")
    return t;
  let r, o = "";
  for (let i = 0; i < t.length; i++)
    t[i] && (r = Mh(t[i])) && (o && (o += " "), o += r);
  return o;
};
function jw(t, ...r) {
  let o, i, c, u = f;
  function f(m) {
    const g = r.reduce((y, x) => x(y), t());
    return o = xw(g), i = o.cache.get, c = o.cache.set, u = p, p(m);
  }
  function p(m) {
    const g = i(m);
    if (g)
      return g;
    const y = bw(m, o);
    return c(m, y), y;
  }
  return function() {
    return u(kw.apply(null, arguments));
  };
}
const Re = (t) => {
  const r = (o) => o[t] || [];
  return r.isThemeGetter = !0, r;
}, Ih = /^\[(?:([a-z-]+):)?(.+)\]$/i, Nw = /^\d+\/\d+$/, Sw = /* @__PURE__ */ new Set(["px", "full", "screen"]), _w = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Cw = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Pw = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ew = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Rw = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, sn = (t) => Rr(t) || Sw.has(t) || Nw.test(t), Rn = (t) => $r(t, "length", Fw), Rr = (t) => !!t && !Number.isNaN(Number(t)), Tl = (t) => $r(t, "number", Rr), Ss = (t) => !!t && Number.isInteger(Number(t)), Tw = (t) => t.endsWith("%") && Rr(t.slice(0, -1)), xe = (t) => Ih.test(t), Tn = (t) => _w.test(t), Aw = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Lw = (t) => $r(t, Aw, $h), Ow = (t) => $r(t, "position", $h), Mw = /* @__PURE__ */ new Set(["image", "url"]), Iw = (t) => $r(t, Mw, Bw), $w = (t) => $r(t, "", Dw), _s = () => !0, $r = (t, r, o) => {
  const i = Ih.exec(t);
  return i ? i[1] ? typeof r == "string" ? i[1] === r : r.has(i[1]) : o(i[2]) : !1;
}, Fw = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Cw.test(t) && !Pw.test(t)
), $h = () => !1, Dw = (t) => Ew.test(t), Bw = (t) => Rw.test(t), zw = () => {
  const t = Re("colors"), r = Re("spacing"), o = Re("blur"), i = Re("brightness"), c = Re("borderColor"), u = Re("borderRadius"), f = Re("borderSpacing"), p = Re("borderWidth"), m = Re("contrast"), g = Re("grayscale"), y = Re("hueRotate"), x = Re("invert"), b = Re("gap"), j = Re("gradientColorStops"), _ = Re("gradientColorStopPositions"), k = Re("inset"), S = Re("margin"), C = Re("opacity"), R = Re("padding"), E = Re("saturate"), $ = Re("scale"), G = Re("sepia"), Y = Re("skew"), W = Re("space"), K = Re("translate"), le = () => ["auto", "contain", "none"], ie = () => ["auto", "hidden", "clip", "visible", "scroll"], ue = () => ["auto", xe, r], Q = () => [xe, r], D = () => ["", sn, Rn], J = () => ["auto", Rr, xe], M = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], U = () => ["solid", "dashed", "dotted", "double", "none"], ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Z = () => ["", "0", xe], X = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], A = () => [Rr, xe];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [_s],
      spacing: [sn, Rn],
      blur: ["none", "", Tn, xe],
      brightness: A(),
      borderColor: [t],
      borderRadius: ["none", "", "full", Tn, xe],
      borderSpacing: Q(),
      borderWidth: D(),
      contrast: A(),
      grayscale: Z(),
      hueRotate: A(),
      invert: Z(),
      gap: Q(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Tw, Rn],
      inset: ue(),
      margin: ue(),
      opacity: A(),
      padding: Q(),
      saturate: A(),
      scale: A(),
      sepia: Z(),
      skew: A(),
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
        aspect: ["auto", "square", "video", xe]
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
        columns: [Tn]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": X()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": X()
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
        object: [...M(), xe]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: ie()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": ie()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": ie()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: le()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": le()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": le()
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
        z: ["auto", Ss, xe]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: ue()
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
        flex: ["1", "auto", "initial", "none", xe]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: Z()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: Z()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ss, xe]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [_s]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ss, xe]
        }, xe]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": J()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": J()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [_s]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ss, xe]
        }, xe]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": J()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": J()
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
        "auto-cols": ["auto", "min", "max", "fr", xe]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", xe]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [b]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [b]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [b]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...F()]
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
        content: ["normal", ...F(), "baseline"]
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
        "place-content": [...F(), "baseline"]
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
        p: [R]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [R]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [R]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [R]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [R]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [R]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [R]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [R]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [R]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [S]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [S]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [S]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [S]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [S]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [S]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [S]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [S]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [S]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [W]
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
        "space-y": [W]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", xe, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [xe, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [xe, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [Tn]
        }, Tn]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [xe, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [xe, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [xe, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [xe, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Tn, Rn]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Tl]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [_s]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", xe]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Rr, Tl]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", sn, xe]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", xe]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", xe]
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
        "placeholder-opacity": [C]
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
        "text-opacity": [C]
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
        decoration: [...U(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", sn, Rn]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", sn, xe]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", xe]
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
        content: ["none", xe]
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
        "bg-opacity": [C]
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
        bg: [...M(), Ow]
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
        bg: ["auto", "cover", "contain", Lw]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Iw]
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
        from: [_]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [_]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [_]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [j]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [j]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [j]
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
        border: [p]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [p]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [p]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [p]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [p]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [p]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [p]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [p]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [p]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [C]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...U(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [p]
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
        "divide-y": [p]
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
        "divide-opacity": [C]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: U()
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
        outline: ["", ...U()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [sn, xe]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [sn, Rn]
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
        ring: D()
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
        "ring-opacity": [C]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [sn, Rn]
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
        shadow: ["", "inner", "none", Tn, $w]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [_s]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [C]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ne(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ne()
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
        "drop-shadow": ["", "none", Tn, xe]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [g]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [y]
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
        saturate: [E]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [G]
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
        "backdrop-grayscale": [g]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [y]
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
        "backdrop-opacity": [C]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [E]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [G]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", xe]
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
        ease: ["linear", "in", "out", "in-out", xe]
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
        animate: ["none", "spin", "ping", "pulse", "bounce", xe]
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
        rotate: [Ss, xe]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [K]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [K]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [Y]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [Y]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", xe]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", xe]
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
        "will-change": ["auto", "scroll", "contents", "transform", xe]
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
        stroke: [sn, Rn, Tl]
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
}, Uw = /* @__PURE__ */ jw(zw);
function wt(...t) {
  return Uw(Ah(t));
}
const Ww = uw, Hw = w.forwardRef(({ className: t, sideOffset: r = 4, ...o }, i) => /* @__PURE__ */ l.jsx(
  Rh,
  {
    ref: i,
    sideOffset: r,
    className: wt(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      t
    ),
    ...o
  }
));
Hw.displayName = Rh.displayName;
var Vw = /* @__PURE__ */ Symbol.for("react.lazy"), fi = vi[" use ".trim().toString()];
function Yw(t) {
  return typeof t == "object" && t !== null && "then" in t;
}
function Fh(t) {
  return t != null && typeof t == "object" && "$$typeof" in t && t.$$typeof === Vw && "_payload" in t && Yw(t._payload);
}
// @__NO_SIDE_EFFECTS__
function Qw(t) {
  const r = /* @__PURE__ */ Kw(t), o = w.forwardRef((i, c) => {
    let { children: u, ...f } = i;
    Fh(u) && typeof fi == "function" && (u = fi(u._payload));
    const p = w.Children.toArray(u), m = p.find(Xw);
    if (m) {
      const g = m.props.children, y = p.map((x) => x === m ? w.Children.count(g) > 1 ? w.Children.only(null) : w.isValidElement(g) ? g.props.children : null : x);
      return /* @__PURE__ */ l.jsx(r, { ...f, ref: c, children: w.isValidElement(g) ? w.cloneElement(g, void 0, y) : null });
    }
    return /* @__PURE__ */ l.jsx(r, { ...f, ref: c, children: u });
  });
  return o.displayName = `${t}.Slot`, o;
}
var Gw = /* @__PURE__ */ Qw("Slot");
// @__NO_SIDE_EFFECTS__
function Kw(t) {
  const r = w.forwardRef((o, i) => {
    let { children: c, ...u } = o;
    if (Fh(c) && typeof fi == "function" && (c = fi(c._payload)), w.isValidElement(c)) {
      const f = Jw(c), p = Zw(u, c.props);
      return c.type !== w.Fragment && (p.ref = i ? wi(i, f) : f), w.cloneElement(c, p);
    }
    return w.Children.count(c) > 1 ? w.Children.only(null) : null;
  });
  return r.displayName = `${t}.SlotClone`, r;
}
var qw = /* @__PURE__ */ Symbol("radix.slottable");
function Xw(t) {
  return w.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === qw;
}
function Zw(t, r) {
  const o = { ...r };
  for (const i in r) {
    const c = t[i], u = r[i];
    /^on[A-Z]/.test(i) ? c && u ? o[i] = (...p) => {
      const m = u(...p);
      return c(...p), m;
    } : c && (o[i] = c) : i === "style" ? o[i] = { ...c, ...u } : i === "className" && (o[i] = [c, u].filter(Boolean).join(" "));
  }
  return { ...t, ...o };
}
function Jw(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
const mp = (t) => typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t, gp = Ah, e1 = (t, r) => (o) => {
  var i;
  if (r?.variants == null) return gp(t, o?.class, o?.className);
  const { variants: c, defaultVariants: u } = r, f = Object.keys(c).map((g) => {
    const y = o?.[g], x = u?.[g];
    if (y === null) return null;
    const b = mp(y) || mp(x);
    return c[g][b];
  }), p = o && Object.entries(o).reduce((g, y) => {
    let [x, b] = y;
    return b === void 0 || (g[x] = b), g;
  }, {}), m = r == null || (i = r.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((g, y) => {
    let { class: x, className: b, ...j } = y;
    return Object.entries(j).every((_) => {
      let [k, S] = _;
      return Array.isArray(S) ? S.includes({
        ...u,
        ...p
      }[k]) : {
        ...u,
        ...p
      }[k] === S;
    }) ? [
      ...g,
      x,
      b
    ] : g;
  }, []);
  return gp(t, f, m, o?.class, o?.className);
}, t1 = e1(
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
), Dh = w.forwardRef(
  ({ className: t, variant: r, size: o, asChild: i = !1, ...c }, u) => {
    const f = i ? Gw : "button";
    return /* @__PURE__ */ l.jsx(
      f,
      {
        className: wt(t1({ variant: r, size: o, className: t })),
        ref: u,
        ...c
      }
    );
  }
);
Dh.displayName = "Button";
function je({
  className: t,
  ...r
}) {
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      className: wt("animate-pulse rounded-md bg-muted", t),
      ...r
    }
  );
}
const n1 = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Bh = (...t) => t.filter((r, o, i) => !!r && i.indexOf(r) === o).join(" ");
var r1 = {
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
const s1 = w.forwardRef(
  ({
    color: t = "currentColor",
    size: r = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: i,
    className: c = "",
    children: u,
    iconNode: f,
    ...p
  }, m) => w.createElement(
    "svg",
    {
      ref: m,
      ...r1,
      width: r,
      height: r,
      stroke: t,
      strokeWidth: i ? Number(o) * 24 / Number(r) : o,
      className: Bh("lucide", c),
      ...p
    },
    [
      ...f.map(([g, y]) => w.createElement(g, y)),
      ...Array.isArray(u) ? u : [u]
    ]
  )
);
const De = (t, r) => {
  const o = w.forwardRef(
    ({ className: i, ...c }, u) => w.createElement(s1, {
      ref: u,
      iconNode: r,
      className: Bh(`lucide-${n1(t)}`, i),
      ...c
    })
  );
  return o.displayName = `${t}`, o;
};
const zh = De("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
const o1 = De("ArrowDownAZ", [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
]);
const i1 = De("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
De("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
const Uh = De("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const Wh = De("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
De("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const a1 = De("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
const ql = De("HeartPulse", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }]
]);
const Hh = De("Keyboard", [
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
const Vh = De("Layers", [
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
const l1 = De("RefreshCcw", [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
]);
const Tr = De("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const c1 = De("Table", [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
]);
const Yh = De("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const u1 = De("TriangleAlert", [
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
De("Trophy", [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
]);
const Qh = De("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
const d1 = De("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const f1 = De("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
async function p1(t, r) {
  const o = await fetch(`/api/players/${t}/production?scoring=${r}`);
  if (!o.ok) throw new Error(`production ${o.status}`);
  const i = await o.json();
  return Array.isArray(i?.seasons) ? i.seasons : [];
}
async function h1(t, r, o) {
  const i = await fetch(`/api/players/${t}/game-logs?season=${r}&type=${o}`);
  if (!i.ok) throw new Error(`game-logs ${i.status}`);
  const c = await i.json();
  return Array.isArray(c?.logs) ? c.logs : [];
}
const m1 = {
  JAC: "JAX",
  WSH: "WAS",
  OAK: "LV",
  STL: "LAR",
  SD: "LAC",
  LA: "LAR"
}, Xl = {
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
}, xc = {
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
}, g1 = {
  QB: "Quarterback",
  RB: "Running Back",
  WR: "Wide Receiver",
  TE: "Tight End",
  K: "Kicker",
  DEF: "Defense"
};
function ei(t) {
  const r = t.toUpperCase().trim();
  return m1[r] || r;
}
function y1(t, r) {
  if (!t || t.length === 0)
    return r ? ei(r) : null;
  const o = {};
  for (const f of t) {
    if (!f || !f.team) continue;
    const p = ei(f.team);
    !p || p === "FA" || (o[p] = (o[p] || 0) + 1);
  }
  const i = Object.keys(o);
  if (i.length === 0)
    return r ? ei(r) : null;
  let c = "", u = 0;
  for (const f of i) {
    const p = o[f];
    p > u && (c = f, u = p);
  }
  return c || (r ? ei(r) : null);
}
const v1 = {
  standard: "Standard",
  half: "Half-PPR",
  ppr: "PPR"
};
function x1(t, r) {
  let o = 0;
  return o += (t.pass_yd ?? 0) * 0.04, o += (t.pass_td ?? 0) * 4, o += (t.pass_int ?? 0) * -1, o += (t.rush_yd ?? 0) * 0.1, o += (t.rush_td ?? 0) * 6, o += (t.rec_yd ?? 0) * 0.1, o += (t.rec_td ?? 0) * 6, o += (t.fgm ?? 0) * 3, o += (t.xpm ?? 0) * 1, r === "ppr" ? o += (t.rec ?? 0) * 1 : r === "half" && (o += (t.rec ?? 0) * 0.5), Math.round(o * 100) / 100;
}
function w1(t, r) {
  return r === "ppr" ? t.pts_ppr : r === "half" && t.pts_half_ppr != null ? t.pts_half_ppr : x1(t, r);
}
const b1 = /* @__PURE__ */ new Set(["rank", "playerName", "player_name", "name", "team", "nfl_team"]), k1 = /* @__PURE__ */ new Set([
  "playerId",
  "player_id",
  "sleeper_id",
  "sleeperId",
  "season",
  "position",
  "age",
  "contestedCatchRate",
  "yardsAfterContactPerReception"
]), j1 = {
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
}, N1 = {
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
}, yp = {
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
}, S1 = {
  qb: j1,
  rb: N1,
  wr: yp,
  te: yp
}, _1 = {
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
}, C1 = (t) => _1[t] ?? "#94a3b8";
function Gh(t, r) {
  return t == null ? "—" : typeof t == "number" ? Number.isFinite(t) ? r === "decimal" ? t.toFixed(2) : Number.isInteger(t) || Math.abs(t) >= 1e3 ? t.toLocaleString() : t.toFixed(2) : "—" : typeof t == "string" ? t || "—" : String(t);
}
function P1(t, r) {
  const o = S1[t], i = [], c = /* @__PURE__ */ new Map();
  for (const u of r) {
    if (b1.has(u.key) || k1.has(u.key)) continue;
    const f = o?.[u.key] ?? "Other";
    c.has(f) || (c.set(f, []), i.push(f)), c.get(f).push(u);
  }
  return i.map((u) => ({ label: u, accent: C1(u), cols: c.get(u) }));
}
function Kh(...t) {
  return t.filter(Boolean).join(" ");
}
function $s({ className: t, children: r }) {
  return /* @__PURE__ */ l.jsx("div", { className: Kh("sc-card", t), children: r });
}
function E1({ n: t = 4 }) {
  return /* @__PURE__ */ l.jsx("div", { className: "space-y-2.5 animate-pulse", children: Array.from({ length: t }).map((r, o) => /* @__PURE__ */ l.jsx("div", { className: "h-4 rounded bg-muted/60", style: { width: `${90 - o * 7}%` } }, o)) });
}
function R1({ icon: t, title: r, body: o }) {
  return /* @__PURE__ */ l.jsxs($s, { className: "flex flex-col items-center text-center gap-2 py-10", children: [
    /* @__PURE__ */ l.jsx(t, { className: "w-8 h-8 text-muted-foreground/60" }),
    /* @__PURE__ */ l.jsx("div", { className: "text-sm font-black text-foreground", children: r }),
    /* @__PURE__ */ l.jsx("div", { className: "text-xs text-muted-foreground max-w-sm", children: o })
  ] });
}
const wc = {
  elite: { text: "#16a34a", bar: "#16a34a", border: "rgba(22,163,74,0.4)" },
  great: { text: "#0b3a7a", bar: "#0b3a7a", border: "rgba(11,58,122,0.3)" },
  solid: { text: "#d4af37", bar: "#d4af37", border: "rgba(212,175,55,0.45)" },
  average: { text: "#ea580c", bar: "#fb923c", border: "rgba(234,88,12,0.4)" },
  poor: { text: "#dc2626", bar: "#ef4444", border: "rgba(220,38,38,0.4)" }
};
function T1(t) {
  return t <= 10 ? "elite" : t <= 25 ? "great" : t <= 45 ? "solid" : t <= 65 ? "average" : "poor";
}
const A1 = {
  overview: "Overview",
  production: "Production",
  usage: "Usage",
  efficiency: "Efficiency",
  advanced: "Advanced"
};
function L1({ card: t }) {
  const r = wc[t.tier], o = Math.max(1, Math.round(t.rank / t.total * 100));
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "rounded-xl border bg-card p-3.5 flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
      style: { borderColor: r.border },
      "data-testid": `rank-card-${t.key}`,
      children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-baseline justify-between gap-1", children: [
          /* @__PURE__ */ l.jsxs("span", { className: "text-[26px] font-black leading-none tabular-nums", style: { color: r.text }, children: [
            "#",
            t.rank
          ] }),
          /* @__PURE__ */ l.jsx("span", { className: "text-[15px] font-black tabular-nums text-foreground", children: t.value })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "text-[10px] mt-1", children: [
          /* @__PURE__ */ l.jsxs("span", { className: "font-bold", style: { color: r.text }, children: [
            "Top ",
            o,
            "%"
          ] }),
          /* @__PURE__ */ l.jsxs("span", { className: "text-muted-foreground", children: [
            " · of ",
            t.total,
            " ",
            t.position,
            "s"
          ] })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "text-[11px] font-bold text-foreground mt-2.5 leading-tight", children: t.label }),
        /* @__PURE__ */ l.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-muted/50 overflow-hidden", children: /* @__PURE__ */ l.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: { width: `${t.percentile}%`, background: r.bar } }) }),
        /* @__PURE__ */ l.jsxs("div", { className: "mt-2.5 space-y-0.5 text-[10px] text-muted-foreground leading-snug", children: [
          t.behindPlayer && /* @__PURE__ */ l.jsxs("div", { className: "truncate", children: [
            /* @__PURE__ */ l.jsx("span", { className: "opacity-60", children: "Behind:" }),
            " ",
            t.behindPlayer
          ] }),
          t.aheadPlayer && /* @__PURE__ */ l.jsxs("div", { className: "truncate", children: [
            /* @__PURE__ */ l.jsx("span", { className: "opacity-60", children: "Ahead of:" }),
            " ",
            t.aheadPlayer
          ] })
        ] })
      ]
    }
  );
}
function O1({ cards: t, pos: r }) {
  const o = w.useMemo(() => {
    const p = new Set(t.map((m) => m.category));
    return ["production", "usage", "efficiency", "advanced"].filter((m) => p.has(m));
  }, [t]), [i, c] = w.useState("overview"), u = ["overview", ...o], f = i === "overview" ? t.filter((p) => p.overview) : t.filter((p) => p.category === i);
  return /* @__PURE__ */ l.jsxs($s, { children: [
    /* @__PURE__ */ l.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ l.jsx("h3", { className: "sc-sectitle", children: "Player Rank Snapshot" }),
      /* @__PURE__ */ l.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
        "How this ",
        r,
        " ranks among qualifying ",
        r,
        "s."
      ] })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: u.map((p) => {
      const m = i === p;
      return /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: () => c(p),
          "data-testid": `rank-tab-${p}`,
          className: "text-[11px] font-bold px-3 py-1 rounded-full border transition-colors",
          style: m ? { background: "#0b3a7a", color: "#fff", borderColor: "#0b3a7a" } : { background: "transparent", borderColor: "rgba(11,58,122,0.25)", color: "#64748b" },
          children: A1[p]
        },
        p
      );
    }) }),
    /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3", children: f.map((p) => /* @__PURE__ */ l.jsx(L1, { card: p }, p.key)) })
  ] });
}
function M1({ composites: t, pos: r }) {
  return t.length ? /* @__PURE__ */ l.jsxs($s, { children: [
    /* @__PURE__ */ l.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ l.jsx("h3", { className: "sc-sectitle", children: "Metric Scores" }),
      /* @__PURE__ */ l.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
        "Where this ",
        r,
        " ranks on each role-based composite metric."
      ] })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3", children: t.map((o) => {
      const i = o.percentile != null && o.rank != null && o.total != null ? Math.max(1, Math.round(o.rank / o.total * 100)) : null, c = i != null ? wc[T1(i)] : null;
      return /* @__PURE__ */ l.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ l.jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: o.label }),
          /* @__PURE__ */ l.jsx("div", { className: "text-2xl font-black tabular-nums leading-none", style: { color: c?.text ?? "#94a3b8" }, children: o.rank != null ? `${r}${o.rank}` : "—" })
        ] }),
        i != null && o.total != null ? /* @__PURE__ */ l.jsxs("div", { className: "mt-1.5 text-[11px] font-semibold", children: [
          /* @__PURE__ */ l.jsxs("span", { className: "font-bold", style: { color: c?.text }, children: [
            "Top ",
            i,
            "%"
          ] }),
          /* @__PURE__ */ l.jsxs("span", { className: "text-foreground/55", children: [
            " · of ",
            o.total,
            " ",
            r,
            "s"
          ] })
        ] }) : /* @__PURE__ */ l.jsx("div", { className: "mt-1.5 text-[11px] text-muted-foreground/60", children: "Not enough data" }),
        /* @__PURE__ */ l.jsx("div", { className: "mt-2 text-[11px] text-muted-foreground leading-snug", children: o.explanation })
      ] }, o.label);
    }) })
  ] }) : null;
}
const I1 = /* @__PURE__ */ new Set(["Other", "Composite Grades", "Player Info"]);
function $1({ section: t, latest: r, pos: o, statRanks: i }) {
  const [c, u] = w.useState(!1);
  return /* @__PURE__ */ l.jsxs($s, { children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        type: "button",
        onClick: () => u((f) => !f),
        "aria-expanded": c,
        "data-testid": `adv-section-toggle-${t.label}`,
        className: "w-full flex items-center justify-between gap-2 text-left",
        children: [
          /* @__PURE__ */ l.jsx("h3", { className: "sc-sectitle", children: t.label }),
          /* @__PURE__ */ l.jsx(Uh, { className: Kh("w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0", c && "rotate-180") })
        ]
      }
    ),
    c && /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-3", children: t.cols.map((f) => {
      const p = Gh(r.row[f.key], f.type), m = i[f.key];
      if (!m)
        return /* @__PURE__ */ l.jsxs("div", { className: "rounded-xl border border-border bg-card p-3.5 flex flex-col", "data-testid": `adv-cell-${f.key}`, children: [
          /* @__PURE__ */ l.jsx("div", { className: "text-[22px] font-black leading-none tabular-nums text-foreground", children: p }),
          /* @__PURE__ */ l.jsx("div", { className: "text-[11px] font-bold text-muted-foreground mt-2.5 leading-tight uppercase tracking-wider", children: f.label })
        ] }, f.key);
      const g = wc[m.tier], y = Math.max(1, Math.round(m.rank / m.total * 100));
      return /* @__PURE__ */ l.jsxs("div", { className: "rounded-xl border bg-card p-3.5 flex flex-col", style: { borderColor: g.border }, "data-testid": `adv-cell-${f.key}`, children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-baseline justify-between gap-1", children: [
          /* @__PURE__ */ l.jsxs("span", { className: "text-[26px] font-black leading-none tabular-nums", style: { color: g.text }, children: [
            "#",
            m.rank
          ] }),
          /* @__PURE__ */ l.jsx("span", { className: "text-[15px] font-black tabular-nums text-foreground", children: p })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "text-[10px] mt-1", children: [
          /* @__PURE__ */ l.jsxs("span", { className: "font-bold", style: { color: g.text }, children: [
            "Top ",
            y,
            "%"
          ] }),
          /* @__PURE__ */ l.jsxs("span", { className: "text-muted-foreground", children: [
            " · of ",
            m.total,
            " ",
            o,
            "s"
          ] })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "text-[11px] font-bold text-foreground mt-2.5 leading-tight", children: f.label })
      ] }, f.key);
    }) })
  ] });
}
function F1({ latest: t, pos: r, statRanks: o }) {
  const i = r.toLowerCase(), c = w.useMemo(() => ["qb", "rb", "wr", "te"].includes(i) ? P1(i, t.columns).filter(
    (u) => !I1.has(u.label) && u.cols.length > 0
  ) : [], [i, t.columns]);
  return c.length ? /* @__PURE__ */ l.jsx(l.Fragment, { children: c.map((u) => /* @__PURE__ */ l.jsx($1, { section: u, latest: t, pos: r, statRanks: o }, u.label)) }) : null;
}
function D1({ season: t, onChange: r, options: o }) {
  return o.length ? /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
    /* @__PURE__ */ l.jsx("span", { className: "text-xs text-muted-foreground font-semibold", children: "Season:" }),
    /* @__PURE__ */ l.jsx("div", { className: "flex gap-1 flex-wrap", children: o.map((i) => {
      const c = t === i;
      return /* @__PURE__ */ l.jsx(
        "button",
        {
          onClick: () => r(i),
          "data-testid": `adv-season-${i}`,
          className: "text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors",
          style: c ? { background: "#d4af37", color: "#0b3a7a", borderColor: "#d4af37" } : { background: "transparent", borderColor: "rgba(11,58,122,0.2)", color: "#64748b" },
          children: i === "all" ? "All Seasons" : i
        },
        String(i)
      );
    }) })
  ] }) : null;
}
function B1({
  adv: t,
  advLoading: r,
  pos: o,
  season: i,
  onSeasonChange: c,
  qualifiedSeasons: u,
  allSeasonsQualified: f
}) {
  const p = o.toUpperCase(), m = [
    ...[...u].sort((g, y) => y - g).map((g) => g),
    ...f ? ["all"] : []
  ];
  return /* @__PURE__ */ l.jsxs("div", { className: "space-y-4", "data-testid": "advanced-tab", children: [
    /* @__PURE__ */ l.jsx(D1, { season: i, onChange: c, options: m }),
    r && /* @__PURE__ */ l.jsx($s, { children: /* @__PURE__ */ l.jsx(E1, { n: 6 }) }),
    !r && !t?.latest && /* @__PURE__ */ l.jsx(
      R1,
      {
        icon: Vh,
        title: "No advanced stats available",
        body: `Advanced metrics for this ${p} will appear once it has qualifying usage in our dataset.`
      }
    ),
    !r && t?.latest && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      t.rankCards.length > 0 && /* @__PURE__ */ l.jsx(O1, { cards: t.rankCards, pos: p }),
      /* @__PURE__ */ l.jsx(M1, { composites: t.composites, pos: p }),
      /* @__PURE__ */ l.jsx(F1, { latest: t.latest, pos: p, statRanks: t.statRanks })
    ] })
  ] });
}
function qh(t, r) {
  if (!r.length) return 0;
  let o = 0;
  for (const i of r) i < t && o++;
  return Math.round(o / r.length * 100);
}
function z1(t, r) {
  return 100 - qh(t, r);
}
function Ke(t) {
  return Math.max(0, Math.min(100, Math.round(t)));
}
function ee(t) {
  const r = typeof t == "number" ? t : parseFloat(String(t));
  return Number.isFinite(r) ? r : 0;
}
function bc(t, r, o, i = "higherIsBetter") {
  const c = (o.length ? o : t).map(r);
  return t.map((u) => {
    const f = r(u);
    return i === "lowerIsBetter" ? z1(f, c) : qh(f, c);
  });
}
function U1(t) {
  return ee(t.games) >= 5 && ee(t.attempts) >= 100;
}
const Xh = [
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
Xh.map((t) => t.key);
const W1 = (t) => {
  const r = ee(t.attempts);
  return r > 0 ? ee(t.passingTouchdowns) / r : 0;
}, H1 = (t) => {
  const r = ee(t.attempts);
  return r > 0 ? ee(t.passingYards) / r : 0;
}, V1 = (t) => {
  const r = ee(t.attempts);
  return r > 0 ? ee(t.airYards) / r : 0;
}, Y1 = (t) => {
  const r = ee(t.completions);
  return r > 0 ? ee(t.completedAirYards) / r : 0;
};
function Q1(t) {
  if (!t.length) return [];
  const r = t.filter(U1), o = (c, u = "higherIsBetter") => bc(t, c, r, u), i = {
    attempts: o((c) => ee(c.attempts)),
    passingYards: o((c) => ee(c.passingYards)),
    redZoneAttempts: o((c) => ee(c.redZoneAttempts)),
    rushAttempts: o((c) => ee(c.rushAttempts)),
    rushYards: o((c) => ee(c.rushYards)),
    rushTouchdowns: o((c) => ee(c.rushTouchdowns)),
    completionPct: o((c) => ee(c.completionPct)),
    onTargetPct: o((c) => ee(c.onTargetPct)),
    cpoe: o((c) => ee(c.cpoe)),
    badThrowPct: o((c) => ee(c.badThrowPct), "lowerIsBetter"),
    poorThrows: o((c) => ee(c.poorThrows), "lowerIsBetter"),
    airYardsPerAttempt: o(V1),
    deepAttemptPct: o((c) => ee(c.deepAttemptPct)),
    passes20Plus: o((c) => ee(c.passes20Plus)),
    passes30Plus: o((c) => ee(c.passes30Plus)),
    passes40Plus: o((c) => ee(c.passes40Plus)),
    passes50Plus: o((c) => ee(c.passes50Plus)),
    longestPass: o((c) => ee(c.longestPass)),
    scrambleRate: o((c) => ee(c.scrambleRate)),
    yardsPerScramble: o((c) => ee(c.yardsPerScramble)),
    epaPerPlay: o((c) => ee(c.epaPerPlay)),
    successRate: o((c) => ee(c.successRate)),
    tdRate: o(W1),
    yardsPerAttempt: o(H1),
    compAirYardsPerCompletion: o(Y1)
  };
  return t.map((c, u) => {
    const f = Ke(
      i.attempts[u] * 0.35 + i.redZoneAttempts[u] * 0.25 + i.passingYards[u] * 0.2 + i.rushAttempts[u] * 0.1 + i.rushYards[u] * 0.1
    ), p = Ke(
      i.completionPct[u] * 0.25 + i.onTargetPct[u] * 0.25 + i.cpoe[u] * 0.25 + i.badThrowPct[u] * 0.15 + i.poorThrows[u] * 0.1
    ), m = Ke(
      i.airYardsPerAttempt[u] * 0.2 + i.deepAttemptPct[u] * 0.2 + i.passes20Plus[u] * 0.2 + i.passes30Plus[u] * 0.15 + i.passes40Plus[u] * 0.1 + i.passes50Plus[u] * 0.05 + i.longestPass[u] * 0.1
    ), g = Ke(
      i.rushAttempts[u] * 0.25 + i.rushYards[u] * 0.3 + i.rushTouchdowns[u] * 0.2 + i.scrambleRate[u] * 0.15 + i.yardsPerScramble[u] * 0.1
    ), y = Ke(
      i.epaPerPlay[u] * 0.35 + i.successRate[u] * 0.25 + i.tdRate[u] * 0.2 + i.yardsPerAttempt[u] * 0.15 + i.compAirYardsPerCompletion[u] * 0.05
    ), x = Ke(
      f * 0.2 + p * 0.2 + m * 0.2 + g * 0.2 + y * 0.2
    );
    return { volumeScore: f, accuracyScore: p, explosivenessScore: m, mobilityScore: g, efficiencyScore: y, overallQBGrade: x };
  });
}
function G1(t) {
  return ee(t.rushAttempts) >= 50 || ee(t.targets) >= 25;
}
const Zh = [
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
Zh.map((t) => t.key);
const K1 = (t) => {
  const r = ee(t.rushAttempts);
  return r > 0 ? ee(t.rushAttForNegativeYards) / r : 0;
}, q1 = (t) => {
  const r = ee(t.rushAttempts);
  return r > 0 ? ee(t.fumbles) / r : 0;
}, X1 = (t) => {
  const r = ee(t.rushAttemptsPerBrokenTackle);
  return r > 0 ? 1 / r : 0;
};
function Z1(t) {
  if (!t.length) return [];
  const r = t.filter(G1), o = (c, u = "higherIsBetter") => bc(t, c, r, u), i = {
    rushAttempts: o((c) => ee(c.rushAttempts)),
    snapPct: o((c) => ee(c.snapPct)),
    targets: o((c) => ee(c.targets)),
    redZoneOpportunities: o((c) => ee(c.redZoneOpportunities)),
    goalLineCarries: o((c) => ee(c.goalLineCarries)),
    routes: o((c) => ee(c.routes)),
    yardsPerCarry: o((c) => ee(c.yardsPerCarry)),
    epaPerPlay: o((c) => ee(c.epaPerPlay)),
    yardsPerRouteRun: o((c) => ee(c.yardsPerRouteRun)),
    yardsBeforeContactPerAttempt: o((c) => ee(c.yardsBeforeContactPerAttempt)),
    negativeRushRate: o(K1, "lowerIsBetter"),
    explosiveRunPct: o((c) => ee(c.explosiveRunPct)),
    breakawayRunPct: o((c) => ee(c.breakawayRunPct)),
    rushes10Plus: o((c) => ee(c.rushes10Plus)),
    rushes20Plus: o((c) => ee(c.rushes20Plus)),
    rushes30Plus: o((c) => ee(c.rushes30Plus)),
    longestRush: o((c) => ee(c.longestRush)),
    longestRushTouchdown: o((c) => ee(c.longestRushTouchdown)),
    targetSharePct: o((c) => ee(c.targetSharePct)),
    receptions: o((c) => ee(c.receptions)),
    receivingYards: o((c) => ee(c.receivingYards)),
    yardsPerReception: o((c) => ee(c.yardsPerReception)),
    receivingYardsAfterCatch: o((c) => ee(c.receivingYardsAfterCatch)),
    receivingTouchdowns: o((c) => ee(c.receivingTouchdowns)),
    brokenTackles: o((c) => ee(c.brokenTackles)),
    brokenTackleRate: o(X1),
    yardsAfterContactPerAttempt: o((c) => ee(c.yardsAfterContactPerAttempt)),
    tackleEludedRate: o((c) => ee(c.tackleEludedRate)),
    fumbleRate: o(q1, "lowerIsBetter")
  };
  return t.map((c, u) => {
    const f = Ke(
      i.rushAttempts[u] * 0.3 + i.snapPct[u] * 0.2 + i.targets[u] * 0.2 + i.redZoneOpportunities[u] * 0.15 + i.goalLineCarries[u] * 0.1 + i.routes[u] * 0.05
    ), p = Ke(
      i.yardsPerCarry[u] * 0.3 + i.epaPerPlay[u] * 0.25 + i.yardsPerRouteRun[u] * 0.2 + i.yardsBeforeContactPerAttempt[u] * 0.15 + i.negativeRushRate[u] * 0.1
    ), m = Ke(
      i.explosiveRunPct[u] * 0.25 + i.breakawayRunPct[u] * 0.2 + i.rushes10Plus[u] * 0.2 + i.rushes20Plus[u] * 0.15 + i.rushes30Plus[u] * 0.1 + i.longestRush[u] * 0.05 + i.longestRushTouchdown[u] * 0.05
    ), g = Ke(
      i.targets[u] * 0.2 + i.targetSharePct[u] * 0.2 + i.receptions[u] * 0.15 + i.receivingYards[u] * 0.15 + i.yardsPerReception[u] * 0.1 + i.receivingYardsAfterCatch[u] * 0.1 + i.yardsPerRouteRun[u] * 0.05 + i.receivingTouchdowns[u] * 0.05
    ), y = Ke(
      i.brokenTackles[u] * 0.25 + i.brokenTackleRate[u] * 0.25 + i.yardsAfterContactPerAttempt[u] * 0.25 + i.tackleEludedRate[u] * 0.15 + i.receivingYardsAfterCatch[u] * 0.05 + i.fumbleRate[u] * 0.05
    ), x = Ke(
      f * 0.25 + p * 0.2 + m * 0.2 + g * 0.2 + y * 0.15
    );
    return { volumeScore: f, efficiencyScore: p, explosivenessScore: m, receivingScore: g, elusivenessScore: y, overallRBGrade: x };
  });
}
const J1 = /* @__PURE__ */ new Set(["drops", "dropPct", "interceptionsWhenTargeted", "fumbles"]), eb = {
  recYardsPerTarget: (t) => {
    const r = ee(t.targets);
    return r > 0 ? ee(t.receivingYards) / r : 0;
  }
}, tb = (t) => eb[t] ?? ((r) => ee(r[t]));
function Jh(t, r) {
  if (!r.length) return [];
  const o = r.filter(t.qualify), i = /* @__PURE__ */ new Set();
  for (const p of Object.values(t.weights)) for (const m of Object.keys(p)) i.add(m);
  const c = {};
  for (const p of i) {
    const m = J1.has(p) ? "lowerIsBetter" : "higherIsBetter";
    c[p] = bc(r, tb(p), o, m);
  }
  const u = (p, m) => {
    let g = 0;
    for (const y in p) g += c[y][m] * p[y];
    return g;
  }, f = t.overall;
  return r.map((p, m) => {
    const g = Ke(u(t.weights.volume, m)), y = Ke(u(t.weights.efficiency, m)), x = Ke(u(t.weights.explosiveness, m)), b = Ke(u(t.weights.hands, m)), j = Ke(u(t.weights.elusiveness, m)), _ = Ke(
      g * f.volume + y * f.efficiency + x * f.explosiveness + b * f.hands + j * f.elusiveness
    );
    return { volumeScore: g, efficiencyScore: y, explosivenessScore: x, handsScore: b, elusivenessScore: j, [t.overallKey]: _ };
  });
}
const nb = {
  overallKey: "overallWRGrade",
  qualify: (t) => ee(t.targets) >= 40 || ee(t.routes) >= 150,
  weights: {
    volume: { targets: 0.25, targetSharePct: 0.2, wopr: 0.15, routes: 0.15, targetsPerRouteRun: 0.1, airYardsSharePct: 0.1, redZoneTargets: 0.03, endZoneTargets: 0.02 },
    efficiency: { yardsPerRouteRun: 0.3, epaPerPlay: 0.2, successRate: 0.2, catchPct: 0.1, yardsPerReception: 0.1, recYardsPerTarget: 0.05, yardsBeforeCatchPerReception: 0.05 },
    explosiveness: { airYardsPerTarget: 0.25, airYardsPerReception: 0.2, receptions20Plus: 0.2, receptions30Plus: 0.15, receptions40Plus: 0.1, receptions50Plus: 0.05, longestReception: 0.05 },
    hands: { catchPct: 0.4, catchableTargets: 0.2, drops: 0.2, dropPct: 0.15, interceptionsWhenTargeted: 0.05 },
    elusiveness: { avoidedTackleRate: 0.4, brokenTackles: 0.3, yardsAfterCatchPerReception: 0.25, fumbles: 0.05 }
  },
  overall: { volume: 0.25, efficiency: 0.25, explosiveness: 0.2, hands: 0.15, elusiveness: 0.15 }
}, rb = {
  overallKey: "overallTEGrade",
  qualify: (t) => ee(t.targets) >= 25 || ee(t.routes) >= 100,
  weights: {
    volume: { targets: 0.25, routes: 0.2, targetSharePct: 0.2, wopr: 0.15, targetsPerRouteRun: 0.1, redZoneTargets: 0.05, endZoneTargets: 0.05 },
    efficiency: { yardsPerRouteRun: 0.35, epaPerPlay: 0.2, successRate: 0.2, catchPct: 0.1, recYardsPerTarget: 0.1, yardsBeforeCatchPerReception: 0.05 },
    explosiveness: { airYardsPerTarget: 0.3, airYardsPerReception: 0.25, receptions20Plus: 0.2, receptions30Plus: 0.1, receptions40Plus: 0.1, longestReception: 0.05 },
    hands: { catchPct: 0.45, catchableTargets: 0.2, drops: 0.2, dropPct: 0.075, interceptionsWhenTargeted: 0.075 },
    elusiveness: { avoidedTackleRate: 0.4, brokenTackles: 0.35, yardsAfterCatchPerReception: 0.2, fumbles: 0.05 }
  },
  overall: { volume: 0.3, efficiency: 0.25, hands: 0.2, explosiveness: 0.15, elusiveness: 0.1 }
}, em = [
  { key: "overallWRGrade", label: "Overall WR Grade", shortLabel: "Overall", description: "Overall WR Grade (0-100): Volume 25%, Efficiency 25%, Explosiveness 20%, Hands 15%, Elusiveness 15%." },
  { key: "volumeScore", label: "Volume", shortLabel: "Vol", description: "Volume (0-100): offensive role & opportunity. Targets 25%, Target Share% 20%, WOPR 15%, Routes 15%, TPRR 10%, AY Share% 10%, RZ TGT 3%, EZ TGT 2%." },
  { key: "efficiencyScore", label: "Efficiency", shortLabel: "Eff", description: "Efficiency (0-100): per-route/target effectiveness. YPRR 30%, EPA/Play 20%, Success% 20%, Catch% 10%, Y/R 10%, Rec Yds/TGT 5%, YBC/R 5%." },
  { key: "explosivenessScore", label: "Explosiveness", shortLabel: "Exp", description: "Explosiveness (0-100): vertical threat & big-play. AY/TGT 25%, AY/Rec 20%, 20+ 20%, 30+ 15%, 40+ 10%, 50+ 5%, Longest 5%." },
  { key: "handsScore", label: "Hands", shortLabel: "Hnd", description: "Hands (0-100): reliability & catch consistency. Catch% 40%, Catchable TGT 20%, Drops 20% (inv), Drop% 15% (inv), INT-tgt 5% (inv)." },
  { key: "elusivenessScore", label: "Elusiveness", shortLabel: "Elu", description: "Elusiveness (0-100): YAC creation & tackle-breaking. Avoided-tackle% 40%, Broken Tackles 30%, YAC/R 25%, Fumbles 5% (inv)." }
], tm = [
  { key: "overallTEGrade", label: "Overall TE Grade", shortLabel: "Overall", description: "Overall TE Grade (0-100): Volume 30%, Efficiency 25%, Hands 20%, Explosiveness 15%, Elusiveness 10%." },
  { key: "volumeScore", label: "Volume", shortLabel: "Vol", description: "Volume (0-100): opportunity — paramount for TEs. Targets 25%, Routes 20%, Target Share% 20%, WOPR 15%, TPRR 10%, RZ TGT 5%, EZ TGT 5%." },
  { key: "efficiencyScore", label: "Efficiency", shortLabel: "Eff", description: "Efficiency (0-100): per-route/target effectiveness. YPRR 35%, EPA/Play 20%, Success% 20%, Catch% 10%, Rec Yds/TGT 10%, YBC/R 5%." },
  { key: "explosivenessScore", label: "Explosiveness", shortLabel: "Exp", description: "Explosiveness (0-100): downfield & big-play (weighted lighter for TEs). AY/TGT 30%, AY/Rec 25%, 20+ 20%, 30+ 10%, 40+ 10%, Longest 5%." },
  { key: "handsScore", label: "Hands", shortLabel: "Hnd", description: "Hands (0-100): reliability — weighted heavier for TEs. Catch% 45%, Catchable TGT 20%, Drops 20% (inv), Drop% 7.5% (inv), INT-tgt 7.5% (inv)." },
  { key: "elusivenessScore", label: "Elusiveness", shortLabel: "Elu", description: "Elusiveness (0-100): YAC & tackle-breaking. Avoided-tackle% 40%, Broken Tackles 35%, YAC/R 20%, Fumbles 5% (inv)." }
];
em.map((t) => t.key);
tm.map((t) => t.key);
const sb = (t) => Jh(nb, t), ob = (t) => Jh(rb, t), Al = [2023, 2024, 2025], ib = [
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
], ab = [
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
], lb = [
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
], cb = [
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
], ub = {
  qb: ib,
  rb: ab,
  wr: lb,
  te: cb
}, db = {
  qb: /* @__PURE__ */ new Set(["badThrowPct", "poorThrows", "interceptions", "fumbles", "pressurePct", "sacks", "battedPasses"]),
  rb: /* @__PURE__ */ new Set(["fumbles", "tacklesForLoss", "rushAttForNegativeYards"]),
  wr: /* @__PURE__ */ new Set(["drops", "dropPct", "interceptionsWhenTargeted", "fumbles"]),
  te: /* @__PURE__ */ new Set(["drops", "dropPct", "interceptionsWhenTargeted", "fumbles"])
};
function fb(t, r) {
  const o = t / r * 100;
  return o <= 10 ? "elite" : o <= 25 ? "great" : o <= 45 ? "solid" : o <= 65 ? "average" : "poor";
}
function vp(t, r, o, i) {
  const c = r.filter((g) => {
    const y = g[o];
    return y != null && typeof y == "number" && Number.isFinite(y);
  });
  if (!c.length) return null;
  const u = [...c].sort(
    (g, y) => i ? g[o] - y[o] : y[o] - g[o]
  ), f = u.findIndex((g) => String(g.playerId) === t);
  if (f < 0) return null;
  const p = f + 1, m = u.length;
  return {
    rank: p,
    total: m,
    tier: fb(p, m),
    behindPlayer: f > 0 ? String(u[f - 1].playerName ?? "") : void 0,
    aheadPlayer: f < m - 1 ? String(u[f + 1].playerName ?? "") : void 0
  };
}
function nm(t, r) {
  const o = Number(t.games ?? 0);
  return r === "qb" ? o >= 5 && Number(t.attempts ?? 0) >= 100 : r === "rb" ? Number(t.rushAttempts ?? 0) >= 50 || Number(t.targets ?? 0) >= 25 : r === "wr" ? Number(t.targets ?? 0) >= 40 || Number(t.routes ?? 0) >= 150 : r === "te" ? Number(t.targets ?? 0) >= 25 || Number(t.routes ?? 0) >= 100 : !0;
}
function ti(t, r, o, i) {
  return i.map((c) => {
    const u = o.map((b) => b[c.key]).filter((b) => b != null), f = r.findIndex((b) => String(b.playerId) === t), p = f >= 0 ? o[f]?.[c.key] : null;
    if (p == null || !u.length)
      return { label: c.label, rank: null, total: null, percentile: null, explanation: c.description };
    const m = [...u].sort((b, j) => j - b), g = m.findIndex((b) => b <= p) + 1 || m.length, y = m.length, x = Math.max(1, Math.round(g / y * 100));
    return { label: c.label, rank: g, total: y, percentile: x, explanation: c.description };
  });
}
async function pb(t, r, o) {
  const i = r.toLowerCase();
  if (!["qb", "rb", "wr", "te"].includes(i)) return null;
  const c = await fetch(`/api/advanced-stats/${i}/${o}`);
  if (!c.ok) return null;
  const u = await c.json(), { columns: f, rows: p } = u, m = p.find((E) => String(E.playerId) === String(t)) ?? null;
  if (!m)
    return { latest: null, composites: [], rankCards: [], statRanks: {} };
  const g = { season: o, row: m, columns: f }, y = p.filter((E) => nm(E, i)), b = y.some((E) => String(E.playerId) === String(t)) ? y : p, j = ub[i] ?? [], _ = new Map(f.map((E) => [E.key, E])), k = [];
  for (const E of j) {
    const $ = _.get(E.key);
    if (!$) continue;
    const G = vp(String(t), b, E.key, !!E.inverted);
    if (!G) continue;
    const Y = Math.max(1, Math.round((G.total - G.rank + 1) / G.total * 100));
    k.push({
      key: E.key,
      label: E.label,
      value: Gh(m[E.key], $.type),
      rank: G.rank,
      total: G.total,
      tier: G.tier,
      percentile: Y,
      category: E.category,
      overview: !!E.overview,
      position: i.toUpperCase(),
      behindPlayer: G.behindPlayer,
      aheadPlayer: G.aheadPlayer
    });
  }
  const S = db[i] ?? /* @__PURE__ */ new Set(), C = {};
  for (const E of f) {
    if (E.type === "string" || ["rank", "games", "playerId", "season", "position", "age"].includes(E.key)) continue;
    const $ = vp(String(t), b, E.key, S.has(E.key));
    $ && (C[E.key] = { rank: $.rank, total: $.total, tier: $.tier });
  }
  let R = [];
  if (i === "qb") {
    const E = Q1(p);
    R = ti(String(t), p, E, Xh);
  } else if (i === "rb") {
    const E = Z1(p);
    R = ti(String(t), p, E, Zh);
  } else if (i === "wr") {
    const E = sb(p);
    R = ti(String(t), p, E, em);
  } else if (i === "te") {
    const E = ob(p);
    R = ti(String(t), p, E, tm);
  }
  return { latest: g, composites: R, rankCards: k, statRanks: C };
}
async function hb(t, r) {
  const o = r.toLowerCase();
  if (!["qb", "rb", "wr", "te"].includes(o))
    return { qualifiedSeasons: [], allQualified: !1 };
  const i = await Promise.all(
    Al.map(async (u) => {
      try {
        const f = await fetch(`/api/advanced-stats/${o}/${u}`);
        if (!f.ok) return !1;
        const m = (await f.json()).rows.find((g) => String(g.playerId) === String(t));
        return m ? nm(m, o) : !1;
      } catch {
        return !1;
      }
    })
  ), c = Al.filter((u, f) => i[f]);
  return {
    qualifiedSeasons: c,
    allQualified: c.length === Al.length
  };
}
function we(...t) {
  return t.filter(Boolean).join(" ");
}
function Jn({ className: t, children: r }) {
  return /* @__PURE__ */ l.jsx("div", { className: we("rounded-2xl border border-border bg-card text-card-foreground shadow-sm", t), children: r });
}
function mb({ n: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: Array.from({ length: t }).map((r, o) => /* @__PURE__ */ l.jsx("div", { className: "h-3.5 rounded bg-muted/40 animate-pulse", style: { width: `${60 + o * 13 % 35}%` } }, o)) });
}
function xp({ icon: t, title: r, body: o }) {
  return /* @__PURE__ */ l.jsxs(Jn, { className: "p-10 text-center", children: [
    /* @__PURE__ */ l.jsx(t, { className: "w-7 h-7 text-muted-foreground/50 mx-auto mb-3" }),
    /* @__PURE__ */ l.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: r }),
    /* @__PURE__ */ l.jsx("p", { className: "text-xs text-muted-foreground max-w-md mx-auto leading-relaxed", children: o })
  ] });
}
function wp({ title: t, noMargin: r }) {
  return /* @__PURE__ */ l.jsx("div", { className: we("sc-sectitle", r && "!mb-0"), children: /* @__PURE__ */ l.jsx("h3", { children: t }) });
}
const rm = w.createContext({ open: !1, rect: null });
function sm({ children: t }) {
  const r = w.useRef(null), [o, i] = w.useState(!1), [c, u] = w.useState(null), f = () => {
    r.current && u(r.current.getBoundingClientRect()), i(!0);
  }, p = () => i(!1);
  return /* @__PURE__ */ l.jsx(rm.Provider, { value: { open: o, rect: c }, children: /* @__PURE__ */ l.jsx(
    "span",
    {
      ref: r,
      className: "relative inline-flex",
      onMouseEnter: f,
      onMouseLeave: p,
      onFocus: f,
      onBlur: p,
      children: t
    }
  ) });
}
function om({ children: t }) {
  return /* @__PURE__ */ l.jsx(l.Fragment, { children: t });
}
function im({
  children: t,
  className: r,
  side: o = "top",
  collisionPadding: i = 8
}) {
  const { open: c, rect: u } = w.useContext(rm);
  if (!c || !u || typeof document > "u") return null;
  const f = 8, p = o === "bottom", m = 130, y = {
    position: "fixed",
    left: Math.min(
      Math.max(u.left + u.width / 2, i + m),
      window.innerWidth - i - m
    ),
    top: p ? u.bottom + f : u.top - f,
    transform: p ? "translate(-50%, 0)" : "translate(-50%, -100%)",
    zIndex: 60
  };
  return lc.createPortal(
    /* @__PURE__ */ l.jsx(
      "span",
      {
        role: "tooltip",
        style: y,
        className: we(
          "pointer-events-none whitespace-normal rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
          r
        ),
        children: t
      }
    ),
    document.body
  );
}
function am(t) {
  return t.replace(/\b\w/g, (r) => r.toUpperCase());
}
const gb = [
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
function lm(t) {
  const r = `${t.bodyPart ?? ""} ${t.type ?? ""}`.toLowerCase();
  for (const o of gb)
    if (o.keywords.some((i) => r.includes(i))) return o.region;
  return t.bodyPart ? am(t.bodyPart) : "Other";
}
const yb = { major: 3, moderate: 2, minor: 1 }, vb = {
  low: { label: "Low", text: "text-emerald-600", bar: "bg-emerald-500", score: 25 },
  moderate: { label: "Moderate", text: "text-amber-600", bar: "bg-amber-500", score: 60 },
  high: { label: "High", text: "text-rose-600", bar: "bg-rose-500", score: 90 }
};
function xb(t) {
  const r = t.nfl.reduce((p, m) => p + (m.gamesMissed ?? 0), 0), o = t.nfl.length + t.college.length, i = new Set(t.nfl.map(lm)).size;
  let c = null;
  for (const p of t.nfl)
    (c == null || p.season > c) && (c = p.season);
  let u = null, f = -1;
  for (const p of t.nfl) {
    const m = p.gamesMissed ?? 0, g = m * 100 + (p.severity ? yb[p.severity] : 0);
    g > f && (f = g, u = { label: `${p.season} ${p.type}`, missed: m });
  }
  return { totalMissed: r, injuriesLogged: o, affectedRegions: i, lastSeason: c, primaryDriver: u };
}
function wb(t) {
  const r = (f) => f.length <= 1 ? f[0] ?? "" : `${f.slice(0, -1).join(", ")} and ${f[f.length - 1]}`, o = (f) => f.bodyPart ? `${f.bodyPart.toLowerCase()} injury` : f.type.toLowerCase(), i = t.filter((f) => (f.gamesMissed ?? 0) > 0).sort((f, p) => (p.gamesMissed ?? 0) - (f.gamesMissed ?? 0)).slice(0, 2).map((f) => `${f.season} ${o(f)}`), c = Array.from(
    new Set(t.filter((f) => (f.gamesMissed ?? 0) === 0).map((f) => lm(f).toLowerCase()))
  ).slice(0, 3);
  let u = "";
  return i.length && (u = `Most missed time came from the ${r(i)}`), c.length && (u += u ? ", while several " : "Several ", u += `${r(c)} ${c.length > 1 ? "issues were" : "issue was"} played through`), u ? `${u}.` : "";
}
function bb(t) {
  const r = t.nfl, o = [], i = r.reduce((y, x) => Math.max(y, x.season), 0), c = i > 0 ? r.filter((y) => y.season >= i - 1).length : 0;
  o.push({ label: "Recent Injury Risk", level: c >= 3 ? "high" : c >= 1 ? "moderate" : "low" });
  const u = /* @__PURE__ */ new Map();
  for (const y of r)
    y.bodyPart && u.set(y.bodyPart, (u.get(y.bodyPart) ?? 0) + 1);
  const f = Math.max(0, ...Array.from(u.values()));
  o.push({ label: "Recurring Injury Risk", level: f >= 3 ? "high" : f >= 2 ? "moderate" : "low" });
  const p = r.reduce((y, x) => y + (x.gamesMissed ?? 0), 0);
  o.push({ label: "Games Missed Impact", level: p >= 10 ? "high" : p >= 4 ? "moderate" : "low" });
  const m = r.filter((y) => y.bodyPart).length, g = m > 0 ? f / m : 0;
  return o.push({ label: "Body Part Concentration", level: g >= 0.5 ? "high" : g >= 0.34 ? "moderate" : "low" }), o;
}
function kb(t) {
  return t >= 80 ? { word: "Low", className: "text-emerald-600" } : t >= 60 ? { word: "Moderate", className: "text-amber-600" } : t >= 40 ? { word: "Elevated", className: "text-orange-600" } : { word: "High", className: "text-rose-600" };
}
const Ft = 18, jb = {
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
}, pi = {
  played: 1,
  minor: 2,
  moderate: 3,
  major: 4,
  "season-ending": 5
};
function He(t) {
  return jb[t];
}
function Or(t) {
  return t.replace(/\b\w/g, (r) => r.toUpperCase());
}
const Nb = ["season-ending", "season ending", "torn", "acl", "achilles", "rupture", "ir", "out for season"];
function Sb(t) {
  if (t.severity === "season-ending" || (t.gamesMissed ?? 0) >= 8) return !0;
  const o = `${t.injury} ${t.description ?? ""} ${t.status ?? ""}`.toLowerCase();
  return Nb.some((i) => o.includes(i));
}
function bt(t) {
  return (t.gamesMissed ?? 0) <= 0 ? "played" : Sb(t) ? "season-ending" : t.severity === "major" ? "major" : t.severity === "moderate" ? "moderate" : t.severity === "minor" ? "minor" : "moderate";
}
function kc(t) {
  const r = t.gamesMissed ?? 0, o = (t.severity ?? "").toLowerCase(), i = o === "minor" || o === "moderate" || o === "major" || o === "season-ending" ? o : t.severity ?? null;
  return {
    season: t.season,
    week: t.week ?? null,
    injury: (t.injury ?? t.type ?? "Injury").trim() || "Injury",
    bodyPart: t.bodyPart ?? null,
    side: t.side ?? null,
    severity: i,
    status: t.status ?? null,
    gamesMissed: r,
    description: t.description ?? null,
    playedThrough: t.playedThrough ?? r <= 0,
    missedWeeks: t.missedWeeks ?? null
  };
}
function _b(t) {
  if (t.missedWeeks && t.missedWeeks.length)
    return t.missedWeeks.filter((c) => c >= 1 && c <= Ft);
  const r = t.gamesMissed ?? 0;
  if (r <= 0 || t.week == null) return [];
  const o = t.week < 1 ? 1 : t.week, i = [];
  for (let c = 0; c < r; c++) {
    const u = o + c;
    u >= 1 && u <= Ft && i.push(u);
  }
  return i;
}
function Cb(t, r) {
  const o = t.reduce((i, c) => i + (c.gamesMissed ?? 0), 0);
  return t.length === 0 && r ? { label: "Full season", cls: "bg-emerald-500/10 text-emerald-600" } : o === 0 ? { label: "0 games missed", cls: "bg-emerald-500/10 text-emerald-600" } : { label: `${o} game${o === 1 ? "" : "s"} missed`, cls: "bg-rose-500/10 text-rose-600" };
}
function Pb(t) {
  const r = {};
  for (const o of t)
    (r[o.season] ??= []).push(o);
  return r;
}
function Eb(t) {
  const r = {}, o = (i, c, u) => {
    if (i < 1 || i > Ft) return;
    const f = (u ? 10 : 0) + pi[c], p = r[i], m = p ? (p.missed ? 10 : 0) + pi[p.sev] : -1;
    f > m && (r[i] = { sev: c, missed: u });
  };
  for (const i of t) {
    const c = bt(i), u = _b(i);
    u.length ? u.forEach((f) => o(f, c, !0)) : i.week != null && i.week >= 1 && o(i.week, "played", !1);
  }
  return r;
}
const cm = (t) => t >= 2021 ? 18 : 17;
function um(t, r, o) {
  const i = cm(t), c = {};
  if (o && o.size > 0) {
    const f = [];
    for (let k = 1; k <= i; k++) o.has(k) || f.push(k);
    const p = Math.max(0, i - 1 - o.size), m = new Set(f), g = {};
    let y = p;
    const x = r.filter((k) => (k.gamesMissed ?? 0) > 0).slice().sort((k, S) => (k.week ?? 1) - (S.week ?? 1));
    for (const k of x) {
      if (y <= 0) break;
      const S = bt(k);
      let C = Math.min(k.gamesMissed ?? 0, y);
      for (let R = k.week && k.week >= 1 ? k.week : 1; R <= i && C > 0; R++)
        m.has(R) && (g[R] = S, m.delete(R), C--, y--);
    }
    const b = Math.max(0, f.length - p), j = (k) => k < 1 || k > i || o.has(k), _ = new Set(
      Array.from(m).sort((k, S) => {
        const C = (j(k - 1) ? 1 : 0) + (j(k + 1) ? 1 : 0);
        return (j(S - 1) ? 1 : 0) + (j(S + 1) ? 1 : 0) - C || S - k;
      }).slice(0, b)
    );
    for (let k = 1; k <= Ft; k++)
      k > i ? c[k] = { status: "na" } : o.has(k) ? c[k] = { status: "played" } : g[k] ? c[k] = { status: "missed", sev: g[k] } : _.has(k) ? c[k] = { status: "off" } : c[k] = { status: "out" };
    return c;
  }
  const u = Eb(r);
  for (let f = 1; f <= Ft; f++)
    f > i ? c[f] = { status: "na" } : u[f]?.missed ? c[f] = { status: "missed", sev: u[f].sev } : c[f] = { status: "played" };
  return c;
}
function dm(t) {
  switch (t.status) {
    case "missed":
      return He(t.sev ?? "moderate").cell;
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
function fm(t, r, o, i) {
  if (i && i.size > 0) {
    const c = cm(t) - 1, u = Math.max(0, c - i.size);
    return u === 0 ? { label: r.length > 0 ? "0 games missed" : "Full season", cls: "bg-emerald-500/10 text-emerald-600" } : { label: `${u} game${u === 1 ? "" : "s"} missed`, cls: "bg-rose-500/10 text-rose-600" };
  }
  return Cb(r, o);
}
function In(t) {
  return t == null ? "" : t < 1 ? "Preseason" : `Wk ${t}`;
}
function jc(t) {
  return `${t.side && t.side !== "unknown" ? `${Or(t.side)} ` : ""}${t.injury}`;
}
const Rb = ["questionable", "doubtful", "probable", "game-time", "day-to-day"];
function Fr(t) {
  const r = (t.injury ?? t.type ?? "").trim(), o = r.toLowerCase(), i = t.gamesMissed ?? 0, c = t.week == null ? `in ${t.season}` : t.week < 1 ? `during the ${t.season} preseason` : `in Week ${t.week} of ${t.season}`;
  if (!r || Rb.some((g) => o.includes(g)))
    return i > 0 ? `Landed on the injury report ${c} and sat out ${i} game${i === 1 ? "" : "s"}.` : `Appeared on the injury report ${c} but suited up.`;
  const u = t.side && t.side !== "unknown" ? t.side.toLowerCase() : "", f = t.bodyPart ? t.bodyPart.toLowerCase() : "", p = [];
  u && !o.includes(u) && p.push(u), f && !o.includes(f) && p.push(f), p.push(o);
  const m = p.join(" ");
  return i > 0 ? `A ${m} ${c} kept him out for ${i} game${i === 1 ? "" : "s"}.` : `Battled a ${m} ${c} without missing any time.`;
}
function pm(t) {
  return t == null ? { left: "0%", centered: !1, kind: "unk" } : t < 1 ? { left: "0%", centered: !1, kind: "pre" } : { left: `${(Math.min(Math.max(t, 1), Ft) - 0.5) / Ft * 100}%`, centered: !0, kind: "week" };
}
function Tb(t) {
  const r = {};
  for (const o of t) {
    const i = pm(o.week), c = i.kind === "week" ? `w${Math.min(Math.max(o.week, 1), Ft)}` : i.kind;
    (r[c] ??= []).push(o);
  }
  return Object.entries(r).map(([o, i]) => {
    const c = o.startsWith("w") ? "week" : o, u = c === "week" ? Number(o.slice(1)) : null;
    let f = "played";
    for (const p of i) {
      const m = bt(p);
      pi[m] > pi[f] && (f = m);
    }
    return { key: o, kind: c, week: u, injuries: i, severity: f, anyMissed: i.some((p) => (p.gamesMissed ?? 0) > 0) };
  }).sort((o, i) => (o.week ?? -1) - (i.week ?? -1));
}
function hi({ summary: t }) {
  return /* @__PURE__ */ l.jsx("span", { className: we("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", t.cls), children: t.label });
}
function Ab({ week: t, avail: r }) {
  const o = r.status === "missed" ? `Week ${t} — missed (${He(r.sev ?? "moderate").label})` : r.status === "out" ? `Week ${t} — did not play` : r.status === "off" ? `Week ${t} — bye` : r.status === "na" ? `No Week ${t} this season` : `Week ${t} — played`;
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      title: o,
      className: we(
        "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[5px] text-[9px] font-semibold tabular-nums sm:h-7 sm:w-7",
        dm(r)
      ),
      children: r.status === "na" ? "" : t
    }
  );
}
function Lb({ ev: t, open: r, onToggle: o }) {
  const i = He(bt(t)), c = In(t.week), u = t.gamesMissed ?? 0, f = [
    t.injury,
    t.bodyPart ? Or(t.bodyPart) : null,
    c || "Week unknown",
    i.label,
    u > 0 ? `${u} games missed` : "Played through"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l.jsxs(
    "button",
    {
      type: "button",
      onClick: o,
      "aria-expanded": r,
      title: f,
      className: we(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
        i.pillBg,
        i.pillText,
        i.pillBorder,
        "hover:brightness-110",
        r && "ring-1 ring-[#d4af37]/60"
      ),
      children: [
        c && /* @__PURE__ */ l.jsx("span", { className: "opacity-80", children: c }),
        /* @__PURE__ */ l.jsx("span", { className: "text-foreground", children: jc(t) }),
        /* @__PURE__ */ l.jsx("span", { "aria-hidden": !0, className: "opacity-40", children: "·" }),
        u > 0 ? /* @__PURE__ */ l.jsxs("span", { className: "font-bold text-rose-600", children: [
          u,
          " missed"
        ] }) : /* @__PURE__ */ l.jsx("span", { className: "opacity-80", children: "Played through" })
      ]
    }
  );
}
function Ob({ ev: t, onClose: r }) {
  const o = He(bt(t)), i = In(t.week), c = t.gamesMissed ?? 0;
  return /* @__PURE__ */ l.jsxs("div", { className: "mt-2 rounded-lg border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ l.jsx("div", { className: "text-sm font-bold text-foreground", children: t.injury }),
        /* @__PURE__ */ l.jsxs("div", { className: "mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground", children: [
          t.bodyPart && /* @__PURE__ */ l.jsxs("span", { children: [
            Or(t.bodyPart),
            t.side && t.side !== "unknown" ? ` (${Or(t.side)})` : ""
          ] }),
          /* @__PURE__ */ l.jsx("span", { children: i || "Week unknown" }),
          /* @__PURE__ */ l.jsx("span", { className: we("font-semibold", o.pillText), children: o.label }),
          /* @__PURE__ */ l.jsx("span", { className: we(c > 0 && "font-semibold text-rose-600"), children: c > 0 ? `${c} games missed` : "Played through" })
        ] })
      ] }),
      /* @__PURE__ */ l.jsx("button", { type: "button", onClick: r, className: "flex-shrink-0 text-[11px] text-muted-foreground hover:text-foreground", children: "Close" })
    ] }),
    /* @__PURE__ */ l.jsx("p", { className: "mt-2 text-[12px] leading-relaxed text-muted-foreground", children: Fr(t) })
  ] });
}
function Mb({ events: t }) {
  return /* @__PURE__ */ l.jsxs("div", { className: "max-w-[250px] space-y-2 p-2", children: [
    t.length > 1 && /* @__PURE__ */ l.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
      t.length,
      " injuries this week"
    ] }),
    t.map((r, o) => {
      const i = He(bt(r)), c = r.gamesMissed ?? 0, u = In(r.week);
      return /* @__PURE__ */ l.jsxs("div", { className: we(o > 0 && "border-t border-border/60 pt-2"), children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "text-[13px] font-bold leading-tight text-foreground", children: jc(r) }),
          /* @__PURE__ */ l.jsx("span", { className: we("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", i.pillBg, i.pillText), children: i.label })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "mt-0.5 text-[11px] tabular-nums text-muted-foreground", children: [
          r.season,
          u ? ` · ${u}` : "",
          r.bodyPart ? ` · ${Or(r.bodyPart)}` : "",
          c > 0 ? /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            " · ",
            /* @__PURE__ */ l.jsxs("span", { className: "font-semibold text-rose-600", children: [
              c,
              " ",
              c === 1 ? "game" : "games",
              " missed"
            ] })
          ] }) : /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            " · ",
            /* @__PURE__ */ l.jsx("span", { className: "text-emerald-600", children: "played through" })
          ] })
        ] }),
        /* @__PURE__ */ l.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-muted-foreground/90", children: Fr(r) })
      ] }, o);
    })
  ] });
}
function Ib({ week: t, avail: r }) {
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      className: we("flex h-7 items-start justify-center rounded-[3px] pt-0.5 text-[8px] font-semibold leading-none tabular-nums", dm(r)),
      style: { margin: "0 1.5px" },
      children: r.status === "na" ? "" : t
    }
  );
}
function $b({ group: t, selected: r, onSelect: o }) {
  const i = pm(t.kind === "week" ? t.week : t.kind === "pre" ? 0 : null), c = He(t.severity), u = t.injuries.length, f = t.kind === "week" ? `Week ${t.week} injuries` : t.kind === "pre" ? "Preseason injury" : "Unknown-week injury";
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      className: "absolute bottom-[3px]",
      style: { left: i.left, transform: i.centered ? "translateX(-50%)" : "translateX(0)" },
      children: /* @__PURE__ */ l.jsxs(sm, { children: [
        /* @__PURE__ */ l.jsx(om, { asChild: !0, children: /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-label": f,
            className: "pointer-events-auto flex items-center justify-center transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]",
            children: t.kind !== "week" ? /* @__PURE__ */ l.jsx("span", { className: we("rounded px-1 text-[8px] font-bold uppercase leading-tight text-white", c.swatch, r && "ring-2 ring-[#d4af37]"), children: t.kind === "pre" ? "PRE" : "UNK" }) : u > 1 ? /* @__PURE__ */ l.jsx("span", { className: we("flex h-4 w-4 items-center justify-center rounded-full border border-background text-[8px] font-bold text-white", c.swatch, r && "ring-2 ring-[#d4af37]"), children: u }) : /* @__PURE__ */ l.jsx("span", { className: we("block h-2.5 w-2.5 rounded-full border border-background", c.swatch, t.anyMissed && "ring-1 ring-background", r && "ring-2 ring-[#d4af37]") })
          }
        ) }),
        /* @__PURE__ */ l.jsx(im, { side: "top", collisionPadding: 10, children: /* @__PURE__ */ l.jsx(Mb, { events: t.injuries }) })
      ] })
    }
  );
}
function Fb({
  season: t,
  events: r,
  isKnownSeason: o,
  playedWeeks: i,
  selectedKey: c,
  onSelect: u
}) {
  const f = fm(t, r, o, i), p = w.useMemo(() => um(t, r, i), [t, r, i]), m = w.useMemo(() => Tb(r), [r]);
  return /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col gap-2 rounded-lg border border-border bg-card/40 px-2.5 py-2.5 md:flex-row md:items-center md:gap-3", "data-testid": `timeline-season-${t}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between md:block md:w-10 md:flex-shrink-0", children: [
      /* @__PURE__ */ l.jsx("span", { className: "text-sm font-black tabular-nums text-foreground", children: t }),
      /* @__PURE__ */ l.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ l.jsx(hi, { summary: f }) })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "min-w-0 flex-1 overflow-x-auto", children: /* @__PURE__ */ l.jsxs("div", { className: "relative min-w-[392px]", children: [
      /* @__PURE__ */ l.jsx("div", { className: "grid gap-0", style: { gridTemplateColumns: `repeat(${Ft}, minmax(0, 1fr))` }, children: Array.from({ length: Ft }, (g, y) => y + 1).map((g) => /* @__PURE__ */ l.jsx(Ib, { week: g, avail: p[g] }, g)) }),
      /* @__PURE__ */ l.jsx("div", { className: "pointer-events-none absolute inset-0", children: m.map((g) => {
        const y = `${t}:${g.key}`, x = `${t}${g.kind === "week" ? ` · Week ${g.week}` : g.kind === "pre" ? " · Preseason" : " · Week unknown"}`;
        return /* @__PURE__ */ l.jsx(
          $b,
          {
            group: g,
            selected: c === y,
            onSelect: () => u(c === y ? null : y, g.injuries, x)
          },
          y
        );
      }) })
    ] }) }),
    /* @__PURE__ */ l.jsx("div", { className: "hidden flex-shrink-0 text-right md:block", children: /* @__PURE__ */ l.jsx(hi, { summary: f }) })
  ] });
}
function Db({ title: t, injuries: r, onClose: o }) {
  return /* @__PURE__ */ l.jsxs("div", { className: "mt-3 rounded-lg border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "mb-1.5 flex items-center justify-between", children: [
      /* @__PURE__ */ l.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: t }),
      /* @__PURE__ */ l.jsx("button", { type: "button", onClick: o, className: "text-[11px] text-muted-foreground hover:text-foreground", children: "Close" })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: r.map((i, c) => {
      const u = He(bt(i)), f = i.gamesMissed ?? 0, p = In(i.week);
      return /* @__PURE__ */ l.jsxs("div", { className: we(c > 0 && "border-t border-border/60 pt-2"), children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "text-[13px] font-bold text-foreground", children: jc(i) }),
          /* @__PURE__ */ l.jsx("span", { className: we("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", u.pillBg, u.pillText), children: u.label })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
          i.season,
          p ? ` · ${p}` : "",
          i.bodyPart ? ` · ${Or(i.bodyPart)}` : "",
          f > 0 ? /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            " · ",
            /* @__PURE__ */ l.jsxs("span", { className: "font-semibold text-rose-600", children: [
              f,
              " games missed"
            ] })
          ] }) : " · played through"
        ] }),
        /* @__PURE__ */ l.jsx("p", { className: "mt-1 text-[12px] leading-relaxed text-muted-foreground", children: Fr(i) })
      ] }, c);
    }) })
  ] });
}
function Bb({
  season: t,
  events: r,
  isKnownSeason: o,
  playedWeeks: i,
  openKey: c,
  setOpenKey: u
}) {
  const f = fm(t, r, o, i), p = w.useMemo(() => um(t, r, i), [t, r, i]), m = c?.startsWith(`${t}:`) ? Number(c.slice(c.indexOf(":") + 1)) : -1, g = m >= 0 ? r[m] : void 0;
  return /* @__PURE__ */ l.jsx("div", { className: "rounded-lg border border-border bg-card/40 p-3", "data-testid": `timeline-season-${t}`, children: /* @__PURE__ */ l.jsxs("div", { className: "flex flex-col gap-2 md:flex-row md:items-start md:gap-4", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between md:block md:w-12 md:flex-shrink-0 md:pt-0.5", children: [
      /* @__PURE__ */ l.jsx("span", { className: "text-base font-black tabular-nums text-foreground", children: t }),
      /* @__PURE__ */ l.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ l.jsx(hi, { summary: f }) })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ l.jsx("div", { className: "-mx-0.5 overflow-x-auto px-0.5 pb-1", children: /* @__PURE__ */ l.jsx("div", { className: "flex min-w-min gap-1", children: Array.from({ length: Ft }, (y, x) => x + 1).map((y) => /* @__PURE__ */ l.jsx(Ab, { week: y, avail: p[y] }, y)) }) }),
      r.length > 0 && /* @__PURE__ */ l.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: r.map((y, x) => {
        const b = `${t}:${x}`;
        return /* @__PURE__ */ l.jsx(
          Lb,
          {
            ev: y,
            open: c === b,
            onToggle: () => u(c === b ? null : b)
          },
          b
        );
      }) }),
      g && /* @__PURE__ */ l.jsx(Ob, { ev: g, onClose: () => u(null) })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "hidden md:block md:w-28 md:flex-shrink-0 md:pt-0.5 md:text-right", children: /* @__PURE__ */ l.jsx(hi, { summary: f }) })
  ] }) });
}
const zb = ["minor", "moderate", "major", "season-ending", "played"];
function Ub({
  injuries: t,
  knownSeasons: r = [],
  weeklyPlayed: o,
  insight: i,
  className: c
}) {
  const u = w.useMemo(() => t.map(kc), [t]), f = w.useMemo(() => Pb(u), [u]), p = w.useMemo(() => new Set(r.filter((S) => Number.isFinite(S))), [r]), m = w.useMemo(() => {
    const S = {};
    for (const [C, R] of Object.entries(o ?? {}))
      R && R.length > 0 && (S[Number(C)] = new Set(R));
    return S;
  }, [o]), g = w.useMemo(() => {
    const S = new Set(p);
    return u.forEach((C) => S.add(C.season)), Array.from(S).sort((C, R) => R - C);
  }, [u, p]), [y, x] = w.useState("compact"), [b, j] = w.useState(null), [_, k] = w.useState(null);
  return g.length === 0 ? null : /* @__PURE__ */ l.jsxs(Jn, { className: we("p-5", c), children: [
    /* @__PURE__ */ l.jsxs("div", { children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ l.jsx("h3", { className: "sc-sectitle", children: "Availability Timeline" }),
        /* @__PURE__ */ l.jsx("div", { className: "inline-flex flex-shrink-0 items-center rounded-md border border-border p-0.5", children: ["compact", "detailed"].map((S) => /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            onClick: () => x(S),
            className: we(
              "rounded px-2 py-0.5 text-[11px] font-semibold capitalize transition-colors",
              y === S ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            ),
            children: S
          },
          S
        )) })
      ] }),
      /* @__PURE__ */ l.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: "Season-by-season injury and missed-time history" }),
      i && /* @__PURE__ */ l.jsx("p", { className: "mt-2 max-w-2xl text-[12px] leading-relaxed text-muted-foreground", children: i }),
      /* @__PURE__ */ l.jsx("div", { className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1", children: zb.map((S) => /* @__PURE__ */ l.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-muted-foreground", children: [
        /* @__PURE__ */ l.jsx("span", { className: we("h-2.5 w-2.5 rounded-[3px]", He(S).swatch) }),
        He(S).label
      ] }, S)) })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: we("mt-4", y === "compact" ? "space-y-2" : "space-y-2.5"), children: g.map(
      (S) => y === "compact" ? /* @__PURE__ */ l.jsx(
        Fb,
        {
          season: S,
          events: f[S] ?? [],
          isKnownSeason: p.has(S),
          playedWeeks: m[S] ?? null,
          selectedKey: _?.key ?? null,
          onSelect: (C, R, E) => k(C ? { key: C, title: E, injuries: R } : null)
        },
        S
      ) : /* @__PURE__ */ l.jsx(
        Bb,
        {
          season: S,
          events: f[S] ?? [],
          isKnownSeason: p.has(S),
          playedWeeks: m[S] ?? null,
          openKey: b,
          setOpenKey: j
        },
        S
      )
    ) }),
    y === "compact" && _ && /* @__PURE__ */ l.jsx(Db, { title: _.title, injuries: _.injuries, onClose: () => k(null) }),
    /* @__PURE__ */ l.jsx("p", { className: "mt-3 text-[10px] leading-relaxed text-muted-foreground/80", children: "Played/missed is sourced from weekly game logs where available. Filled cells are games played; colored cells are weeks missed to a logged injury; red cells are other games not played; dashed cells are byes." })
  ] });
}
const Wb = /* @__PURE__ */ new Set(["head", "neck", "chest", "ribs", "back", "hip"]), Hb = {
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
}, Vb = [
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
], Zl = {
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
}, Yb = /* @__PURE__ */ new Set(["head", "neck", "shoulder", "arm", "hand", "chest", "ribs", "back"]);
function mi(t) {
  const r = `${t.bodyPart ?? ""} ${t.injury ?? ""}`.toLowerCase();
  for (const { region: o, keywords: i } of Vb)
    if (i.some((c) => r.includes(c))) return o;
  return null;
}
function Qb(t) {
  const r = (t.side ?? "").toLowerCase();
  if (r === "left" || r === "right") return r;
  const o = `${t.bodyPart ?? ""} ${t.injury ?? ""} ${t.description ?? ""}`.toLowerCase();
  return /\bleft\b/.test(o) ? "left" : /\bright\b/.test(o) ? "right" : null;
}
const hm = (t) => t.charAt(0).toUpperCase() + t.slice(1);
function Gb(t) {
  const r = mi(t);
  if (!r) return null;
  if (Wb.has(r)) return r;
  const o = Qb(t);
  return o ? `${o}${hm(r)}` : r;
}
function Kb(t) {
  return Hb[t] ?? null;
}
const bp = ["played", "minor", "moderate", "major", "season-ending"];
function Nc(t) {
  let r = "played";
  for (const o of t) {
    const i = bt(o);
    bp.indexOf(i) > bp.indexOf(r) && (r = i);
  }
  return r;
}
function mm(t) {
  return t === "played" ? "minor" : t;
}
function qb(t, r = 6) {
  const o = {};
  for (const i of t) {
    const c = mi(i);
    c && (o[c] ??= []).push(i);
  }
  return Object.entries(o).map(([i, c]) => {
    const u = c.reduce((m, g) => m + (g.gamesMissed ?? 0), 0), f = c.length, p = u >= 6 || f >= 3 ? "high" : u >= 2 || f >= 2 ? "moderate" : "low";
    return { region: i, count: f, gamesMissed: u, severity: Nc(c), level: p };
  }).sort((i, c) => c.gamesMissed - i.gamesMissed || c.count - i.count).slice(0, r);
}
const kp = {
  low: { label: "Low", text: "text-emerald-600" },
  moderate: { label: "Moderate", text: "text-amber-600" },
  high: { label: "High", text: "text-rose-600" }
};
function Xb(t) {
  const r = {};
  for (const o of t) {
    const i = Gb(o);
    i && (r[i] ??= []).push(o);
  }
  return r;
}
const Zb = {
  minor: "ring-teal-300/70",
  moderate: "ring-amber-300/70",
  major: "ring-orange-300/80",
  "season-ending": "ring-rose-300/80"
};
function Jb(t, r) {
  const o = mm(t);
  return we(
    "flex items-center justify-center rounded-full border border-black/25 font-bold tabular-nums text-white shadow-sm transition-transform",
    He(o).swatch,
    r && `ring-2 ring-offset-2 ring-offset-background ${Zb[o]}`
  );
}
const ek = (t) => t.length <= 1 ? t[0] ?? "" : `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}`;
function tk(t) {
  const r = t.filter((y) => mi(y));
  if (r.length === 0) return "No body-region-tagged injuries to map yet.";
  const o = {};
  let i = 0, c = 0, u = null, f = 0;
  for (const y of r) {
    const x = mi(y);
    o[x] = (o[x] ?? 0) + 1, Yb.has(x) ? i++ : c++;
    const b = y.gamesMissed ?? 0;
    b > f && (f = b, u = x);
  }
  const p = i > c ? "upper body" : c > i ? "lower body" : "upper and lower body", m = Object.entries(o).sort((y, x) => x[1] - y[1]).slice(0, 2).map(([y, x]) => `${x} ${Zl[y]} ${x === 1 ? "injury" : "injuries"}`);
  let g = `Injury history is concentrated in the ${p}`;
  return m.length && (g += `, with ${ek(m)}`), g += ".", g += f > 0 && u ? ` Missed time stems mainly from ${Zl[u]} issues.` : " None of these injuries cost regular-season games.", g;
}
function nk(t) {
  if (t.length === 1) {
    const o = t[0], i = o.gamesMissed ?? 0;
    return [
      o.injury,
      `${o.season}${In(o.week) ? ` ${In(o.week)}` : ""}`,
      He(bt(o)).label,
      i > 0 ? `${i} games missed` : "played through"
    ].filter(Boolean).join(" · ");
  }
  const r = t.reduce((o, i) => o + (i.gamesMissed ?? 0), 0);
  return `${t.length} injuries · ${He(Nc(t)).label} worst · ${r} games missed`;
}
function rk({ events: t }) {
  return /* @__PURE__ */ l.jsxs("div", { className: "max-w-[250px] space-y-2 p-2", children: [
    t.length > 1 && /* @__PURE__ */ l.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
      t.length,
      " injuries logged here"
    ] }),
    t.map((r, o) => {
      const i = He(bt(r)), c = r.gamesMissed ?? 0, u = In(r.week);
      return /* @__PURE__ */ l.jsxs("div", { className: we(o > 0 && "border-t border-border/60 pt-2"), children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ l.jsx("span", { className: "text-[13px] font-bold leading-tight text-foreground", children: r.injury }),
          /* @__PURE__ */ l.jsx("span", { className: we("flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", i.pillBg, i.pillText), children: i.label })
        ] }),
        /* @__PURE__ */ l.jsxs("div", { className: "mt-0.5 text-[11px] tabular-nums text-muted-foreground", children: [
          r.season,
          u ? ` · ${u}` : "",
          c > 0 ? /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            " · ",
            /* @__PURE__ */ l.jsxs("span", { className: "font-semibold text-rose-600", children: [
              c,
              " ",
              c === 1 ? "game" : "games",
              " missed"
            ] })
          ] }) : /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            " · ",
            /* @__PURE__ */ l.jsx("span", { className: "text-emerald-600", children: "played through" })
          ] })
        ] }),
        /* @__PURE__ */ l.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-muted-foreground/90", children: Fr(r) })
      ] }, o);
    })
  ] });
}
function sk({ regionKey: t, events: r, selected: o, onToggle: i }) {
  const c = Kb(t);
  if (!c) return null;
  const u = Nc(r), f = r.some((y) => (y.gamesMissed ?? 0) > 0), p = r.length, m = p > 1 ? 24 : 18, g = p === 1 ? r[0] : null;
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5",
      style: { left: `${c.x}%`, top: `${c.y}%` },
      children: [
        /* @__PURE__ */ l.jsxs(sm, { children: [
          /* @__PURE__ */ l.jsx(om, { asChild: !0, children: /* @__PURE__ */ l.jsx(
            "button",
            {
              type: "button",
              onClick: i,
              "aria-expanded": o,
              "aria-label": nk(r),
              className: we(
                Jb(u, f),
                "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]",
                o && "scale-110 ring-2 ring-offset-2 ring-offset-background ring-[#d4af37]"
              ),
              style: { width: m, height: m, fontSize: m > 20 ? 11 : 9 },
              children: p > 1 ? p : ""
            }
          ) }),
          /* @__PURE__ */ l.jsx(im, { side: "top", collisionPadding: 10, children: /* @__PURE__ */ l.jsx(rk, { events: r }) })
        ] }),
        g && /* @__PURE__ */ l.jsx("span", { className: "rounded bg-background/70 px-1 text-[8px] font-semibold leading-tight tabular-nums text-muted-foreground backdrop-blur-sm", children: g.season })
      ]
    }
  );
}
function ok({ events: t, onClose: r }) {
  return /* @__PURE__ */ l.jsxs("div", { className: "mt-3 rounded-lg border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "mb-1.5 flex items-center justify-between", children: [
      /* @__PURE__ */ l.jsxs("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: [
        t.length,
        " ",
        t.length === 1 ? "injury" : "injuries",
        " at this region"
      ] }),
      /* @__PURE__ */ l.jsx("button", { type: "button", onClick: r, className: "text-[11px] text-muted-foreground hover:text-foreground", children: "Close" })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-1.5", children: t.map((o, i) => {
      const c = He(bt(o)), u = o.gamesMissed ?? 0, f = In(o.week);
      return /* @__PURE__ */ l.jsxs("div", { className: "text-[12px] leading-snug", children: [
        /* @__PURE__ */ l.jsx("span", { className: "font-semibold text-foreground", children: o.injury }),
        /* @__PURE__ */ l.jsxs("span", { className: "text-muted-foreground", children: [
          " ",
          "· ",
          o.season,
          f ? ` ${f}` : "",
          " · ",
          /* @__PURE__ */ l.jsx("span", { className: c.pillText, children: c.label }),
          " ",
          "· ",
          u > 0 ? /* @__PURE__ */ l.jsxs("span", { className: "font-semibold text-rose-600", children: [
            u,
            " games missed"
          ] }) : "played through"
        ] }),
        /* @__PURE__ */ l.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground/80", children: Fr(o) })
      ] }, i);
    }) })
  ] });
}
const ik = ["season-ending", "major", "moderate", "minor"], ak = {
  "season-ending": "Season-Ending",
  major: "Major / IR",
  moderate: "Moderate",
  minor: "Minor"
};
function lk() {
  return /* @__PURE__ */ l.jsxs("svg", { viewBox: "0 0 100 100", className: "absolute inset-0 h-full w-full text-muted-foreground/70", "aria-hidden": !0, children: [
    /* @__PURE__ */ l.jsxs("g", { stroke: "currentColor", strokeOpacity: 0.16, strokeLinecap: "round", fill: "none", children: [
      /* @__PURE__ */ l.jsx("line", { x1: 50, y1: 15, x2: 50, y2: 20, strokeWidth: 3 }),
      /* @__PURE__ */ l.jsx("line", { x1: 40, y1: 24, x2: 60, y2: 24, strokeWidth: 4 }),
      /* @__PURE__ */ l.jsx("line", { x1: 39, y1: 25, x2: 25, y2: 53, strokeWidth: 3.5 }),
      /* @__PURE__ */ l.jsx("line", { x1: 61, y1: 25, x2: 75, y2: 53, strokeWidth: 3.5 }),
      /* @__PURE__ */ l.jsx("line", { x1: 46, y1: 58, x2: 43, y2: 94, strokeWidth: 4 }),
      /* @__PURE__ */ l.jsx("line", { x1: 54, y1: 58, x2: 57, y2: 94, strokeWidth: 4 })
    ] }),
    /* @__PURE__ */ l.jsxs("g", { fill: "currentColor", fillOpacity: 0.09, stroke: "currentColor", strokeOpacity: 0.14, strokeWidth: 0.5, children: [
      /* @__PURE__ */ l.jsx("circle", { cx: 50, cy: 9, r: 6 }),
      /* @__PURE__ */ l.jsx("path", { d: "M41 23 Q40 23 40 25 L42 56 Q42 59 45 59 L55 59 Q58 59 58 56 L60 25 Q60 23 59 23 Z" }),
      /* @__PURE__ */ l.jsx("ellipse", { cx: 42.5, cy: 95.5, rx: 3.5, ry: 2 }),
      /* @__PURE__ */ l.jsx("ellipse", { cx: 57.5, cy: 95.5, rx: 3.5, ry: 2 })
    ] })
  ] });
}
function ck({ injuries: t, className: r }) {
  const o = w.useMemo(() => t.map(kc), [t]), i = w.useMemo(() => Xb(o), [o]), c = w.useMemo(() => tk(o), [o]), u = w.useMemo(() => qb(o), [o]), [f, p] = w.useState(null), m = Object.keys(i);
  if (m.length === 0) return null;
  const g = f ? i[f] : null;
  return /* @__PURE__ */ l.jsxs(Jn, { className: we("p-5", r), children: [
    /* @__PURE__ */ l.jsxs("div", { children: [
      /* @__PURE__ */ l.jsx("h3", { className: "sc-sectitle", children: "Body Map" }),
      /* @__PURE__ */ l.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: "Career injury locations by body region" })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "relative mx-auto mt-4 aspect-square w-full max-w-[230px] rounded-xl border border-border/60 bg-muted/10", children: [
      /* @__PURE__ */ l.jsx(lk, {}),
      m.map((y) => /* @__PURE__ */ l.jsx(
        sk,
        {
          regionKey: y,
          events: i[y],
          selected: f === y,
          onToggle: () => p(f === y ? null : y)
        },
        y
      ))
    ] }),
    g && /* @__PURE__ */ l.jsx(ok, { events: g, onClose: () => p(null) }),
    u.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ l.jsx("div", { className: "mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Most Affected Regions" }),
      /* @__PURE__ */ l.jsx("div", { className: "space-y-1", children: u.map((y) => /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between gap-2 text-[12px]", children: [
        /* @__PURE__ */ l.jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [
          /* @__PURE__ */ l.jsx("span", { className: we("h-2 w-2 flex-shrink-0 rounded-full", He(mm(y.severity)).swatch) }),
          /* @__PURE__ */ l.jsx("span", { className: "truncate font-semibold text-foreground", children: hm(Zl[y.region]) })
        ] }),
        /* @__PURE__ */ l.jsxs("span", { className: "flex-shrink-0 text-right text-[11px] tabular-nums text-muted-foreground", children: [
          y.count,
          " ",
          y.count === 1 ? "injury" : "injuries",
          " · ",
          y.gamesMissed,
          " missed ·",
          " ",
          /* @__PURE__ */ l.jsx("span", { className: we("font-semibold", kp[y.level].text), children: kp[y.level].label })
        ] })
      ] }, y.region)) })
    ] }),
    /* @__PURE__ */ l.jsx("p", { className: "mt-3 text-[12px] leading-relaxed text-muted-foreground", children: c }),
    /* @__PURE__ */ l.jsx("div", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-3", children: ik.map((y) => /* @__PURE__ */ l.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ l.jsx("span", { className: we("h-2.5 w-2.5 rounded-full", He(y).swatch) }),
      ak[y]
    ] }, y)) })
  ] });
}
const Cs = "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap", uk = "bg-slate-500/10 text-slate-600", dk = "bg-rose-500/10 text-rose-600";
function fk({ label: t, value: r }) {
  return /* @__PURE__ */ l.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 px-3 py-2", children: [
    /* @__PURE__ */ l.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: t }),
    /* @__PURE__ */ l.jsx("div", { className: "text-[13px] font-bold text-foreground mt-0.5 leading-tight", children: r })
  ] });
}
function pk({ label: t, level: r }) {
  const o = vb[r];
  return /* @__PURE__ */ l.jsxs("div", { "data-testid": `risk-${t.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-+|-+$/g, "")}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ l.jsx("span", { className: "text-[12px] font-semibold text-foreground", children: t }),
      /* @__PURE__ */ l.jsx("span", { className: we("text-[11px] font-bold uppercase tracking-wider", o.text), children: o.label })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ l.jsx("div", { className: we("h-full rounded-full", o.bar), style: { width: `${o.score}%` } }) })
  ] });
}
function hk(t) {
  const r = t.significance === "high" ? "significant" : t.significance === "medium" ? "moderate" : t.significance === "low" ? "minor" : "documented";
  return t.year ? `A ${r} pre-NFL injury during the ${t.year} season.` : `A ${r} pre-NFL injury.`;
}
function gm(t) {
  return (t.gamesMissed ?? 0) > 0 ? bt(t) : t.severity === "major" ? "major" : t.severity === "moderate" ? "moderate" : "minor";
}
function mk(t) {
  return t == null ? "Wk —" : t < 1 ? "Preseason" : `Wk ${t}`;
}
function gk({ ev: t }) {
  const r = t.gamesMissed ?? 0, o = He(gm(t));
  return /* @__PURE__ */ l.jsxs("span", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: [
    /* @__PURE__ */ l.jsx("span", { className: we(Cs, uk), children: t.bodyPart ? am(t.bodyPart) : "Unknown" }),
    /* @__PURE__ */ l.jsx("span", { className: we(Cs, o.pillBg, o.pillText), children: o.label }),
    r > 0 ? /* @__PURE__ */ l.jsxs("span", { className: we(Cs, dk), children: [
      r,
      " game",
      r === 1 ? "" : "s",
      " missed"
    ] }) : /* @__PURE__ */ l.jsx("span", { className: we(Cs, "bg-emerald-500/10 text-emerald-600"), children: "Played through" })
  ] });
}
function yk({ ev: t, open: r, onToggle: o }) {
  const i = He(gm(t));
  return /* @__PURE__ */ l.jsxs("div", { className: "border-t border-border/50 first:border-t-0", children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        type: "button",
        onClick: o,
        "aria-expanded": r,
        className: "flex w-full flex-wrap items-center gap-x-2 gap-y-1 px-2 py-2 text-left transition-colors hover:bg-muted/30",
        children: [
          /* @__PURE__ */ l.jsx("span", { className: we("h-2 w-2 flex-shrink-0 rounded-full", i.swatch), "aria-hidden": !0 }),
          /* @__PURE__ */ l.jsx("span", { className: "w-16 flex-shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground", children: mk(t.week) }),
          /* @__PURE__ */ l.jsx("span", { className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground", children: t.injury }),
          /* @__PURE__ */ l.jsx(gk, { ev: t })
        ]
      }
    ),
    r && /* @__PURE__ */ l.jsxs("div", { className: "px-2 pb-2.5 pl-7 text-[12px] leading-relaxed text-muted-foreground", children: [
      Fr(t),
      t.status && /* @__PURE__ */ l.jsxs("span", { className: "mt-1 block text-[11px]", children: [
        "Status: ",
        t.status
      ] })
    ] })
  ] });
}
function vk({ season: t, events: r, prefix: o, openKeys: i, onToggle: c }) {
  return /* @__PURE__ */ l.jsxs("div", { children: [
    /* @__PURE__ */ l.jsx("div", { className: "px-2 pb-1 pt-2 text-[11px] font-black tabular-nums text-foreground", children: t }),
    /* @__PURE__ */ l.jsx("div", { className: "overflow-hidden rounded-lg border border-border/60", children: r.map((u, f) => {
      const p = `${o}-${t}-${f}`;
      return /* @__PURE__ */ l.jsx(yk, { ev: u, open: i.has(p), onToggle: () => c(p) }, p);
    }) })
  ] });
}
function xk({ college: t, openKeys: r, onToggle: o }) {
  const i = (u) => u === "high" ? "major" : u === "medium" ? "moderate" : "minor", c = (u) => u === "high" ? "Major" : u === "medium" ? "Moderate" : "Minor";
  return /* @__PURE__ */ l.jsxs("div", { children: [
    /* @__PURE__ */ l.jsx("div", { className: "flex items-center gap-1.5 px-2 pb-1 pt-2", children: /* @__PURE__ */ l.jsx("span", { className: "text-[11px] font-black uppercase tracking-wider text-muted-foreground", children: "College & Pre-NFL" }) }),
    /* @__PURE__ */ l.jsx("div", { className: "overflow-hidden rounded-lg border border-border/60", children: t.map((u, f) => {
      const p = `col-${f}`, m = r.has(p), g = He(i(u.significance));
      return /* @__PURE__ */ l.jsxs("div", { className: "border-t border-border/50 first:border-t-0", children: [
        /* @__PURE__ */ l.jsxs(
          "button",
          {
            type: "button",
            onClick: () => o(p),
            "aria-expanded": m,
            className: "flex w-full flex-wrap items-center gap-x-2 gap-y-1 px-2 py-2 text-left transition-colors hover:bg-muted/30",
            children: [
              /* @__PURE__ */ l.jsx("span", { className: we("h-2 w-2 flex-shrink-0 rounded-full", g.swatch), "aria-hidden": !0 }),
              /* @__PURE__ */ l.jsx("span", { className: "w-16 flex-shrink-0 text-[11px] font-semibold tabular-nums text-muted-foreground", children: u.year ?? "—" }),
              /* @__PURE__ */ l.jsx("span", { className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground", children: u.description || "Pre-NFL injury" }),
              /* @__PURE__ */ l.jsx("span", { className: we(Cs, g.pillBg, g.pillText, "ml-auto"), children: c(u.significance) })
            ]
          }
        ),
        m && /* @__PURE__ */ l.jsx("div", { className: "px-2 pb-2.5 pl-7 text-[12px] leading-relaxed text-muted-foreground", children: u.description || hk(u) })
      ] }, p);
    }) })
  ] });
}
const wk = [
  { key: "all", label: "All" },
  { key: "missed", label: "Missed Games" },
  { key: "major", label: "Major+" },
  { key: "played", label: "Played Through" },
  { key: "last3", label: "Last 3 Seasons" }
];
function bk({ injury: t }) {
  const [r, o] = w.useState(!1), [i, c] = w.useState("all"), [u, f] = w.useState(/* @__PURE__ */ new Set()), p = (k) => f((S) => {
    const C = new Set(S);
    return C.has(k) ? C.delete(k) : C.add(k), C;
  }), m = t.nfl.length + t.college.length, g = w.useMemo(() => t.nfl.map(kc), [t.nfl]), y = w.useMemo(() => g.reduce((k, S) => Math.max(k, S.season), 0), [g]), x = w.useMemo(() => g.filter((k) => {
    switch (i) {
      case "missed":
        return (k.gamesMissed ?? 0) > 0;
      case "major": {
        const S = bt(k);
        return S === "major" || S === "season-ending";
      }
      case "played":
        return (k.gamesMissed ?? 0) === 0;
      case "last3":
        return k.season >= y - 2;
      default:
        return !0;
    }
  }), [g, i, y]), b = w.useMemo(() => {
    const k = {};
    for (const S of x) (k[S.season] ??= []).push(S);
    return Object.entries(k).map(([S, C]) => [Number(S), C.slice().sort((R, E) => (E.week ?? -1) - (R.week ?? -1))]).sort((S, C) => C[0] - S[0]);
  }, [x]), j = i === "all" && t.college.length > 0, _ = b.length === 0 && !j;
  return /* @__PURE__ */ l.jsxs(Jn, { className: "p-5", children: [
    /* @__PURE__ */ l.jsxs(
      "button",
      {
        type: "button",
        onClick: () => o((k) => !k),
        "aria-expanded": r,
        className: "flex w-full items-center gap-1.5 text-left",
        children: [
          /* @__PURE__ */ l.jsx("h3", { className: "text-sm font-bold", style: { color: "var(--sc-blue, #0b3a7a)" }, children: "Full Injury Log" }),
          /* @__PURE__ */ l.jsxs("span", { className: "text-[11px] font-semibold text-muted-foreground tabular-nums", children: [
            "(",
            m,
            ")"
          ] }),
          /* @__PURE__ */ l.jsx(Uh, { className: we("ml-auto w-4 h-4 text-muted-foreground transition-transform", r && "rotate-180") })
        ]
      }
    ),
    r && /* @__PURE__ */ l.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ l.jsx("div", { className: "mb-2 flex flex-wrap gap-1.5", children: wk.map((k) => /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          onClick: () => c(k.key),
          className: we(
            "rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors",
            i === k.key ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37]" : "border-border text-muted-foreground hover:text-foreground"
          ),
          children: k.label
        },
        k.key
      )) }),
      _ ? /* @__PURE__ */ l.jsx("p", { className: "px-2 py-3 text-[12px] text-muted-foreground", children: "No injuries match this filter." }) : /* @__PURE__ */ l.jsxs("div", { className: "space-y-2", children: [
        b.map(([k, S]) => /* @__PURE__ */ l.jsx(vk, { season: k, events: S, prefix: "nfl", openKeys: u, onToggle: p }, k)),
        j && /* @__PURE__ */ l.jsx(xk, { college: t.college, openKeys: u, onToggle: p })
      ] })
    ] })
  ] });
}
function kk({ injury: t, loading: r, error: o, playerName: i, knownSeasons: c = [], weeklyPlayed: u }) {
  if (r && !t) return /* @__PURE__ */ l.jsx(Jn, { className: "p-6", children: /* @__PURE__ */ l.jsx(mb, { n: 6 }) });
  if (o)
    return /* @__PURE__ */ l.jsx(xp, { icon: ql, title: "Injury history unavailable", body: "We couldn't load injury history right now. Please try again later." });
  if (!t || !t.nfl.length && !t.college.length)
    return /* @__PURE__ */ l.jsx(xp, { icon: ql, title: "No injury history found", body: `No documented NFL or college injuries for ${i}.` });
  const f = xb(t), p = t.score != null ? kb(t.score) : null, m = t.nfl.length > 0 ? bb(t) : [], g = t.nfl.length > 0 ? wb(t.nfl) : "", y = [
    { label: "Injuries Logged", value: `${f.injuriesLogged}` },
    { label: "Games Missed", value: `${f.totalMissed}` },
    { label: "Affected Regions", value: `${f.affectedRegions}` },
    ...f.lastSeason != null ? [{ label: "Last Injury", value: `${f.lastSeason}` }] : []
  ], x = `${f.injuriesLogged} logged ${f.injuriesLogged === 1 ? "injury" : "injuries"}` + (f.affectedRegions > 0 ? ` across ${f.affectedRegions} affected ${f.affectedRegions === 1 ? "region" : "regions"}` : "") + (f.totalMissed > 0 ? `, with ${f.totalMissed} total ${f.totalMissed === 1 ? "game" : "games"} missed.` : ", with no games missed to date."), b = f.primaryDriver ? f.primaryDriver.missed > 0 ? `${f.primaryDriver.label} caused the most missed time (${f.primaryDriver.missed} game${f.primaryDriver.missed === 1 ? "" : "s"}).` : `${f.primaryDriver.label} is the most significant logged injury.` : null;
  return /* @__PURE__ */ l.jsxs("div", { className: "space-y-5", children: [
    t.grade && /* @__PURE__ */ l.jsxs(Jn, { className: "p-4", children: [
      /* @__PURE__ */ l.jsx(wp, { title: "Injury Risk Profile" }),
      /* @__PURE__ */ l.jsxs("div", { className: "flex gap-3.5", children: [
        /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center rounded-2xl border-2 w-[68px] h-[68px] flex-shrink-0",
            style: { borderColor: t.gradeColor ?? void 0 },
            children: [
              /* @__PURE__ */ l.jsx("span", { className: "text-2xl font-black leading-none", style: { color: t.gradeColor ?? void 0 }, "data-testid": "injury-grade", children: t.grade }),
              t.score != null && /* @__PURE__ */ l.jsxs("span", { className: "text-[11px] font-bold text-muted-foreground mt-0.5 tabular-nums", children: [
                t.score,
                "/100"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ l.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ l.jsx("h3", { className: we("text-base font-black leading-tight", p?.className ?? "text-foreground"), children: p ? `${p.word} Injury Risk` : "Injury Risk" }),
          /* @__PURE__ */ l.jsx("p", { className: "text-[13px] text-muted-foreground mt-0.5 leading-relaxed", children: x })
        ] })
      ] }),
      y.length > 0 && /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3", children: y.map((j) => /* @__PURE__ */ l.jsx(fk, { label: j.label, value: j.value }, j.label)) }),
      b && /* @__PURE__ */ l.jsxs("div", { className: "mt-2 rounded-lg border border-border bg-muted/30 px-3 py-2", children: [
        /* @__PURE__ */ l.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Primary Risk Driver" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-[13px] text-foreground mt-0.5 leading-snug", children: b })
      ] })
    ] }),
    t.nfl.length > 0 && /* @__PURE__ */ l.jsx(Ub, { injuries: t.nfl, knownSeasons: c, weeklyPlayed: u, insight: g }),
    (t.nfl.length > 0 || m.length > 0) && /* @__PURE__ */ l.jsxs("div", { className: "grid gap-5 md:grid-cols-2 md:items-start", children: [
      t.nfl.length > 0 && /* @__PURE__ */ l.jsx(ck, { injuries: t.nfl }),
      m.length > 0 && /* @__PURE__ */ l.jsxs(Jn, { className: "p-5", children: [
        /* @__PURE__ */ l.jsx(wp, { title: "Risk Breakdown" }),
        /* @__PURE__ */ l.jsx("div", { className: "space-y-3.5", children: m.map((j) => /* @__PURE__ */ l.jsx(pk, { label: j.label, level: j.level }, j.label)) }),
        /* @__PURE__ */ l.jsx("p", { className: "text-[11px] text-muted-foreground mt-4 leading-relaxed", children: "Derived from this player's documented injury log — recency, recurrence, games lost, and how concentrated injuries are in one area." })
      ] })
    ] }),
    (t.nfl.length > 0 || t.college.length > 0) && /* @__PURE__ */ l.jsx(bk, { injury: t })
  ] });
}
const jk = "";
async function Nk(t, r) {
  const o = await fetch(
    `${jk}/api/players/${encodeURIComponent(t)}/injuries?name=${encodeURIComponent(r)}`,
    { credentials: "include" }
  );
  return o.ok ? (await o.json())?.injuries ?? null : null;
}
const gi = w.forwardRef(
  ({ className: t, type: r, ...o }, i) => /* @__PURE__ */ l.jsx(
    "input",
    {
      type: r,
      className: wt(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        t
      ),
      ref: i,
      ...o
    }
  )
);
gi.displayName = "Input";
const Sk = {
  QB: 2,
  RB: 4,
  WR: 6,
  TE: 3
};
function ym(t) {
  const r = {};
  for (const [o, i] of Object.entries(t)) {
    const c = {};
    for (const [u, f] of Object.entries(i)) {
      const p = Sk[u];
      c[u] = p != null ? f.slice(0, p) : f;
    }
    r[o] = c;
  }
  return r;
}
const ni = ["QB", "RB", "WR", "TE"];
function _k({ playerId: t, position: r, team: o }) {
  const [i, c] = w.useState(!1), u = o ? /* @__PURE__ */ l.jsx(
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
  return i || !t ? /* @__PURE__ */ l.jsxs("div", { className: "relative flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center overflow-visible", children: [
    /* @__PURE__ */ l.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: r || "?" }),
    u
  ] }) : /* @__PURE__ */ l.jsxs("div", { className: "relative flex-shrink-0 w-8 h-8", children: [
    /* @__PURE__ */ l.jsx(
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
const Ck = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def"
};
function Ll({ scoringControl: t } = {}) {
  const [r, o] = w.useState(""), [i, c] = w.useState(!1), [u, f] = w.useState(-1), p = w.useRef(null), m = w.useRef(null), g = w.useRef(null), [, y] = ac(), { data: x } = Ht({
    queryKey: ["/api/indexed-players"],
    // Drop each team's bench (deep-roster overflow) so only fantasy-relevant
    // players are searchable.
    select: (C) => ({ slugs: C.slugs, byTeam: ym(C.byTeam || {}) })
  }), b = w.useMemo(() => {
    if (!x?.byTeam) return [];
    const C = [];
    for (const R of Object.values(x.byTeam))
      for (const [E, $] of Object.entries(R))
        ni.includes(E) && C.push(...$);
    return C;
  }, [x]), j = w.useMemo(() => {
    const C = {};
    for (const R of ni)
      C[R] = b.filter((E) => E.position === R).length;
    return C;
  }, [b]), _ = w.useMemo(() => {
    if (!r.trim()) return [];
    const C = r.toLowerCase().trim();
    return b.filter((R) => R.name.toLowerCase().includes(C)).slice(0, 8);
  }, [b, r]), k = w.useMemo(
    () => ni.reduce((C, R) => C + (j[R] || 0), 0),
    [j]
  );
  w.useEffect(() => {
    function C(R) {
      p.current && !p.current.contains(R.target) && c(!1);
    }
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, []), w.useEffect(() => {
    f(-1);
  }, [r]), w.useEffect(() => {
    if (u >= 0 && g.current) {
      const C = g.current.children[u];
      C && C.scrollIntoView({ block: "nearest" });
    }
  }, [u]), w.useEffect(() => {
    function C(R) {
      if (R.key === "/" && !R.ctrlKey && !R.metaKey) {
        const E = R.target?.tagName;
        E !== "INPUT" && E !== "TEXTAREA" && (R.preventDefault(), m.current?.focus());
      }
    }
    return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, []);
  const S = w.useCallback(
    (C) => {
      if (!(!i || _.length === 0))
        if (C.key === "ArrowDown")
          C.preventDefault(), f((R) => R < _.length - 1 ? R + 1 : 0);
        else if (C.key === "ArrowUp")
          C.preventDefault(), f((R) => R > 0 ? R - 1 : _.length - 1);
        else if (C.key === "Enter" && u >= 0) {
          C.preventDefault();
          const R = _[u];
          c(!1), y(`/nfl/players/${R.slug}/`);
        } else C.key === "Escape" && c(!1);
    },
    [i, _, u, y]
  );
  return /* @__PURE__ */ l.jsx("div", { className: "sc-header", "data-testid": "hero-section", children: /* @__PURE__ */ l.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-utilbar", ref: p, children: [
    /* @__PURE__ */ l.jsx("div", { className: "sc-utilbar__search-row", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-utilbar__search relative group", children: [
      /* @__PURE__ */ l.jsx(Tr, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sc-search__icon z-10" }),
      /* @__PURE__ */ l.jsx(
        gi,
        {
          ref: m,
          type: "search",
          placeholder: "Search any player...",
          value: r,
          onChange: (C) => {
            o(C.target.value), c(!0);
          },
          onFocus: () => {
            r.trim() && c(!0);
          },
          onKeyDown: S,
          className: "sc-search",
          autoComplete: "off",
          role: "combobox",
          "aria-expanded": i && _.length > 0,
          "aria-controls": "autocomplete-list",
          "aria-activedescendant": u >= 0 ? `autocomplete-item-${u}` : void 0,
          "data-testid": "input-player-search"
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5", children: /* @__PURE__ */ l.jsxs("kbd", { className: "sc-search__kbd", children: [
        /* @__PURE__ */ l.jsx(Hh, { className: "w-2.5 h-2.5" }),
        "/"
      ] }) }),
      i && r.trim() && _.length > 0 && /* @__PURE__ */ l.jsx(
        "div",
        {
          id: "autocomplete-list",
          ref: g,
          role: "listbox",
          className: "absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto",
          "data-testid": "autocomplete-dropdown",
          children: _.map((C, R) => /* @__PURE__ */ l.jsx(tr, { href: `/nfl/players/${C.slug}/`, children: /* @__PURE__ */ l.jsxs(
            "div",
            {
              id: `autocomplete-item-${R}`,
              role: "option",
              "aria-selected": R === u,
              className: `flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${R === u ? "bg-muted" : "hover:bg-muted/50"}`,
              onMouseEnter: () => f(R),
              onClick: () => c(!1),
              "data-testid": `autocomplete-item-${C.slug}`,
              children: [
                /* @__PURE__ */ l.jsx(_k, { playerId: C.id, position: C.position || "", team: C.team || "" }),
                /* @__PURE__ */ l.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ l.jsx("span", { className: "font-medium text-sm text-foreground truncate block", children: C.name }),
                  /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                    /* @__PURE__ */ l.jsx("span", { className: Ck[C.position || ""] || "", children: C.position }),
                    /* @__PURE__ */ l.jsx("span", { className: "text-xs text-muted-foreground", children: C.team })
                  ] })
                ] }),
                /* @__PURE__ */ l.jsx(Yh, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
              ]
            }
          ) }, C.id))
        }
      )
    ] }) }),
    /* @__PURE__ */ l.jsxs("div", { className: "sc-utilbar__row", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "sc-utilbar__filters", children: [
        ni.map((C) => /* @__PURE__ */ l.jsxs(
          "button",
          {
            type: "button",
            className: "sc-filter-pill",
            onClick: () => y(`/nfl/players?pos=${C}`),
            "data-testid": `button-filter-${C}`,
            children: [
              C,
              j[C] ? /* @__PURE__ */ l.jsx("span", { className: "sc-filter-pill__count", children: j[C] }) : null
            ]
          },
          C
        )),
        k > 0 && /* @__PURE__ */ l.jsxs("span", { className: "sc-utilbar__count", "data-testid": "badge-player-count", children: [
          k,
          " players"
        ] })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "sc-utilbar__group", children: [
        /* @__PURE__ */ l.jsx("div", { className: "sc-segment", role: "group", "aria-label": "Conference filter", "data-testid": "tabs-conference", children: ["AFC", "NFC"].map((C) => /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            className: "sc-segment__btn",
            onClick: () => y(`/nfl/players?conf=${C}`),
            "data-testid": `tab-${C.toLowerCase()}`,
            children: C
          },
          C
        )) }),
        t
      ] })
    ] })
  ] }) }) });
}
function Pk(t) {
  if (!t) return "";
  const r = parseInt(t, 10);
  if (isNaN(r) || r <= 0) return t;
  const o = Math.floor(r / 12), i = r % 12;
  return `${o}'${i}"`;
}
const Ek = [
  { key: "overview", label: "Overview", icon: zh },
  { key: "gamelog", label: "Game Log", icon: c1 },
  { key: "advanced", label: "Advanced Stats", icon: Vh },
  { key: "injury", label: "Injury & Health", icon: ql }
];
function Sc(t) {
  return `https://sleepercdn.com/content/nfl/players/thumb/${t}.jpg`;
}
function Rk(t) {
  const r = t.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : "11,58,122";
}
function Tk({ playerId: t, name: r, team: o }) {
  const [i, c] = w.useState(0), u = i === 0 ? `https://sleepercdn.com/content/nfl/players/${t}.jpg` : Sc(t);
  return /* @__PURE__ */ l.jsx("div", { className: "player-photo-card", "data-testid": "img-headshot", children: i < 2 ? /* @__PURE__ */ l.jsx(
    "img",
    {
      src: u,
      alt: `${r} headshot`,
      className: "player-photo-card__img",
      onError: () => c((f) => f === 0 ? 1 : 2)
    }
  ) : /* @__PURE__ */ l.jsx("div", { className: "player-photo-card__fallback", "data-testid": "img-headshot-fallback", children: /* @__PURE__ */ l.jsx(Qh, { className: "w-16 h-16 text-slate-400" }) }) });
}
function Ak({ playerId: t, name: r }) {
  const [o, i] = w.useState(!1);
  if (o) {
    const c = r.split(" ").map((u) => u[0]).join("").slice(0, 2).toUpperCase();
    return /* @__PURE__ */ l.jsx("span", { className: "sc-peer-card__initials", "data-testid": `img-neighbor-${t}`, children: c });
  }
  return /* @__PURE__ */ l.jsx(
    "img",
    {
      src: Sc(t),
      alt: r,
      loading: "lazy",
      className: "sc-peer-card__img",
      onError: () => i(!0),
      "data-testid": `img-neighbor-${t}`
    }
  );
}
function Lk({ player: t, related: r }) {
  const o = r.position || t.position || "", i = w.useMemo(() => {
    const p = r.neighbors.map((m) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      team: m.team,
      position: m.position,
      posRank: m.posRank,
      ppg: m.ppg,
      isCurrent: !1
    }));
    return p.push({
      id: t.id,
      name: t.name,
      slug: t.slug,
      team: t.seasonTeam || t.team || "",
      position: o,
      posRank: r.currentRank,
      ppg: r.currentPpg ?? 0,
      isCurrent: !0
    }), p.sort((m, g) => m.posRank - g.posRank);
  }, [r, t, o]), c = i.map((p) => p.posRank), u = i.findIndex((p) => p.isCurrent), f = w.useRef(null);
  return w.useEffect(() => {
    const p = f.current, m = p?.children[u];
    if (!p || !m) return;
    const g = p.getBoundingClientRect(), y = m.getBoundingClientRect();
    p.scrollLeft += y.left - g.left - (p.clientWidth - y.width) / 2;
  }, [i, u]), /* @__PURE__ */ l.jsxs("div", { className: "mt-8", children: [
    /* @__PURE__ */ l.jsx("div", { className: "sc-finish2__title-row mb-1", children: /* @__PURE__ */ l.jsx("h2", { className: "sc-finish2__title", "data-testid": "text-related-heading", children: "Nearby Positional Peers" }) }),
    /* @__PURE__ */ l.jsxs("p", { className: "sc-finish2__subtitle mb-4", "data-testid": "text-related-subtitle", children: [
      "Players ranked closest to ",
      t.name,
      " based on ",
      r.season,
      " ",
      o,
      " production (",
      r.format.toUpperCase(),
      ") · ",
      o,
      Math.min(...c),
      "–",
      o,
      Math.max(...c)
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "sc-peer-rail", "data-testid": "peer-rail", ref: f, children: i.map((p) => {
      const m = xc[p.team] || "#6B7280";
      return /* @__PURE__ */ l.jsx(tr, { href: `/nfl/players/${p.slug}/`, children: /* @__PURE__ */ l.jsxs(
        "div",
        {
          className: `sc-peer-card${p.isCurrent ? " sc-peer-card--current" : ""}`,
          style: { "--peer-team": m },
          "data-testid": `card-peer-${p.slug}`,
          children: [
            /* @__PURE__ */ l.jsxs("div", { className: "sc-peer-card__photo", children: [
              /* @__PURE__ */ l.jsx(Ak, { playerId: p.id, name: p.name }),
              /* @__PURE__ */ l.jsxs("span", { className: "sc-peer-card__rank", children: [
                p.position,
                p.posRank
              ] }),
              p.isCurrent && /* @__PURE__ */ l.jsx("span", { className: "sc-peer-card__here", children: "You Are Here" })
            ] }),
            /* @__PURE__ */ l.jsxs("div", { className: "sc-peer-card__body", children: [
              /* @__PURE__ */ l.jsx("p", { className: "sc-peer-card__name", children: p.name }),
              /* @__PURE__ */ l.jsxs("p", { className: "sc-peer-card__meta", children: [
                p.position,
                " · ",
                p.team
              ] }),
              /* @__PURE__ */ l.jsxs("p", { className: "sc-peer-card__value", children: [
                /* @__PURE__ */ l.jsx("b", { children: p.ppg.toFixed(1) }),
                " PPG"
              ] })
            ] }),
            p.team && /* @__PURE__ */ l.jsx(
              "img",
              {
                className: "sc-peer-card__logo",
                src: `https://sleepercdn.com/images/team_logos/nfl/${p.team.toLowerCase()}.png`,
                alt: "",
                "aria-hidden": "true",
                loading: "lazy",
                onError: (g) => {
                  g.currentTarget.style.display = "none";
                }
              }
            ),
            /* @__PURE__ */ l.jsx("span", { className: "sc-peer-card__cta", children: "View Player" })
          ]
        }
      ) }, p.id);
    }) })
  ] });
}
function vm({ title: t, subtitle: r }) {
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-section-header", children: [
    /* @__PURE__ */ l.jsx("p", { className: "sc-section-header__title", children: t }),
    /* @__PURE__ */ l.jsx("div", { className: "sc-section-header__bar" }),
    r && /* @__PURE__ */ l.jsx("p", { className: "sc-section-header__subtitle", children: r })
  ] });
}
function Ok(t) {
  return { bust: 36, hasTier3: !0 };
}
function Mk(t, r) {
  const o = t;
  return (o.off_snp ?? 0) > 0 ? !0 : r === "QB" ? (o.pass_att ?? 0) > 0 || (o.rush_att ?? 0) > 0 : r === "K" ? (o.fga ?? 0) > 0 || (o.xpa ?? 0) > 0 : (o.rec_tgt ?? 0) > 0 || (o.rec ?? 0) > 0 || (o.rush_att ?? 0) > 0 || (o.pass_att ?? 0) > 0;
}
function an(t, r) {
  return w1(t.stats, r);
}
function xm(t, r = null, o = "ppr") {
  if (t.length === 0) return null;
  const i = t.filter((D) => D.game_status === "active"), c = i.length > 0 ? i : t.filter((D) => Mk(D.stats, r)), u = c.length, f = c.reduce((D, J) => D + an(J, o), 0), p = u > 0 ? f / u : 0, m = c.length > 0 ? c.reduce((D, J) => an(J, o) > an(D, o) ? J : D, c[0]) : t[0], g = c.slice(-4), y = g.reduce((D, J) => D + an(J, o), 0), x = g.length > 0 ? y / g.length : 0, { bust: b, hasTier3: j } = Ok(), _ = c.filter((D) => D.pos_rank != null), k = _.filter((D) => D.pos_rank >= 1 && D.pos_rank <= 12).length, S = 24, C = _.filter((D) => D.pos_rank >= 13 && D.pos_rank <= S).length, R = j ? _.filter((D) => D.pos_rank >= 25 && D.pos_rank <= b).length : 0, E = _.filter((D) => D.pos_rank > b).length, $ = u > 0 ? k / u * 100 : 0, G = u > 0 ? C / u * 100 : 0, Y = u > 0 ? R / u * 100 : 0, W = u > 0 ? E / u * 100 : 0, K = c.map((D) => an(D, o)), le = K.length > 0 ? K.reduce((D, J) => D + J, 0) / K.length : 0, ie = K.length > 1 ? Math.sqrt(K.reduce((D, J) => D + (J - le) ** 2, 0) / (K.length - 1)) : 0, ue = c.filter((D) => an(D, o) === 0).length, Q = u > 0 ? ue / u * 100 : 0;
  return { gamesPlayed: u, totalPts: f, ppg: p, bestWeek: m, last4Ppg: x, pos1Pct: $, pos2Pct: G, pos3Pct: Y, bustPct: W, pos1Games: k, pos2Games: C, pos3Games: R, bustGames: E, volatility: ie, gooseEggPct: Q };
}
function Ik(t, r) {
  if (!t) return null;
  const o = (r || "").toUpperCase(), i = "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400", c = "bg-green-500/15 text-green-600 dark:text-green-400", u = "bg-blue-500/15 text-blue-600 dark:text-blue-400", f = "bg-slate-400/15 text-slate-500 dark:text-slate-300", p = "bg-amber-600/15 text-amber-700 dark:text-amber-500", m = "bg-red-500/15 text-red-500 dark:text-red-400";
  return o === "QB" || o === "TE" ? t <= 5 ? { label: "Elite", className: i } : t <= 12 ? { label: "Starter", className: c } : t <= 20 ? { label: "Streaming", className: u } : t <= 32 ? { label: "Depth", className: f } : { label: "Poor", className: m } : t <= 12 ? { label: "Elite", className: i } : t <= 24 ? { label: "Strong Starter", className: c } : t <= 36 ? { label: "Flex", className: u } : t <= 60 ? { label: "Depth", className: f } : t <= 90 ? { label: "Bench", className: p } : { label: "Poor", className: m };
}
function $k(t) {
  return t ? t <= 8 ? "text-red-500 dark:text-red-400" : t >= 25 ? "text-green-600 dark:text-green-400" : "text-muted-foreground" : "text-muted-foreground";
}
function Fk(t, r, o) {
  if (!r || r.gamesPlayed === 0) return [];
  const i = t.position || "", c = t.name || "This player", u = t.team || "", f = t.seasonTeam || y1(t.gameLog || [], u) || u, p = f, m = Xl[p] || p, g = u ? Xl[u] || u : "", y = !!(f && u && f !== u && u !== "FA"), x = t.season || 2025, b = r.ppg.toFixed(1), j = r.gamesPlayed, _ = r.pos1Pct, k = _.toFixed(0), S = r.pos1Pct + r.pos2Pct, C = r.bustPct.toFixed(0), R = r.ppg > 0 ? (r.last4Ppg - r.ppg) / r.ppg * 100 : 0, E = R > 8 ? "trending upward" : R < -12 ? "cooling late in the year" : "relatively steady", $ = S >= 60 ? "a reliable weekly starter" : S >= 35 ? "a flex-range contributor" : "a situational option", G = r.ppg > 0 ? r.volatility / r.ppg : 2, Y = G < 0.4 ? "low week-to-week variance" : G < 0.7 ? "moderate week-to-week variance" : "high week-to-week variance", W = t.careerProfile, K = W ? W.seasons : 1, le = [];
  le.push(`${c} finished the ${x} season as ${$} at the ${i} position`), m && le.push(`playing for the ${m}`), le.push(`averaging ${b} fantasy points per game across ${j} games`), t.seasonRank && le.push(`and finishing as the ${i}${t.seasonRank} overall`);
  const ie = le.join(", ") + ".";
  let ue = "";
  if (i === "QB")
    _ >= 50 ? ue = `He finished inside the top-12 at quarterback in ${k}% of his starts, showing strong weekly reliability with ${Y}. Production was ${E} heading into the final stretch of the season. That ceiling rate places him firmly in QB1 territory for redraft formats heading into 2026.` : _ >= 25 ? ue = `He landed in the top-12 at quarterback ${k}% of the time, with ${Y} in weekly output. Production was ${E} late in the season. That finish rate puts him in the QB2 range for most formats, with upside in favorable matchups.` : _ > 0 ? ue = `He reached the top-12 at quarterback in just ${k}% of starts, with ${Y} around a below-starter scoring baseline. Production was ${E} heading into the final stretch. At this volume and finish rate, he projects as a streaming option rather than a reliable weekly starter for 2026.` : ue = `He did not finish inside the top-12 at quarterback in any of his ${j} active games this season, with ${Y} around a below-starter scoring level. Production was ${E} late in the season. That output places him outside reliable starter range heading into 2026 planning.`;
  else if (i === "RB") {
    const J = S >= 60 ? "24" : "36";
    S >= 40 ? ue = `His scoring profile showed ${Y}, finishing as a top-${J} back ${k}% of the time. Production was ${E} late in the season. The bust rate of ${C}% is an important floor signal for lineup decisions, particularly in PPR formats where receiving work adds a secondary scoring lane.` : ue = `He finished as a top-${J} back in just ${k}% of games, with ${Y} around a below-starter workload. Production was ${E} late in the season. A bust rate of ${C}% reflects the limited upside weeks and signals a depth or handcuff profile rather than a consistent starter.`;
  } else i === "WR" ? _ >= 30 ? ue = `His weekly profile showed ${Y}, converting into a top-24 receiver finish ${k}% of the time. Scoring was ${E} over the second half of the schedule. Both ceiling and floor are tied closely to target volume and red-zone looks, making matchup awareness more impactful than for run-first options.` : ue = `He reached a top-24 receiver finish in just ${k}% of games, with ${Y} around a limited target role. Scoring was ${E} over the second half of the schedule. At this finish rate, he fits a depth or matchup-play profile rather than a reliable flex option.` : i === "TE" ? _ >= 30 ? ue = `His weekly output showed ${Y}, landing inside the top-12 at tight end ${k}% of the time. Scoring was ${E} as the season progressed. At tight end, where positional depth is thin, consistent target volume and red-zone involvement carry outsized value.` : ue = `He finished inside the top-12 at tight end in just ${k}% of games, with ${Y} around a limited role. Scoring was ${E} as the season progressed. That finish rate reflects a depth profile rather than a reliable starting tight end option.` : ue = `His weekly output showed ${Y}, finishing in a startable range ${k}% of the time. Production was ${E} late in the season.`;
  let Q = "";
  if (W && K >= 2) {
    const J = W.durabilityPct.toFixed(0), M = W.ppg.toFixed(1);
    Q = `Across ${W.seasons} seasons, ${c} has averaged ${M} points per game with a durability rate of ${J}%, appearing in ${W.gamesPlayed} of ${W.maxGames} possible games. That track record provides helpful context for evaluating whether the ${x} production reflects a true baseline or a short-term variance window.`;
  }
  const D = y ? `He is now with the ${g} after spending the ${x} season with the ${m}.` : "";
  return [ie, D, ue, Q].filter(Boolean);
}
function Dk({ player: t, entries: r, format: o = "ppr" }) {
  const i = xm(r, t.position, o), c = t.fantasyOutlook2026?.body ? t.fantasyOutlook2026 : null, u = c ? c.body.split(/\n\n+/).map((f) => f.trim()).filter(Boolean) : Fk(t, i);
  return /* @__PURE__ */ l.jsx("div", { className: "sc-overview", style: { display: "flex", flexDirection: "column", gap: "32px" }, children: u.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "sc-overview__section", style: { padding: "20px" }, children: [
    /* @__PURE__ */ l.jsx(vm, { title: "2026 Fantasy Outlook" }),
    c?.headline && /* @__PURE__ */ l.jsx("p", { style: { fontSize: "15px", fontWeight: 600, lineHeight: "1.6", color: "var(--sc-heading, #1e293b)", marginBottom: "12px" }, children: c.headline }),
    u.map((f, p) => /* @__PURE__ */ l.jsx("p", { style: { fontSize: "14px", lineHeight: "1.75", color: "var(--sc-body, #475569)", marginBottom: p < u.length - 1 ? "12px" : 0 }, children: f }, p))
  ] }) });
}
function Bk(t) {
  const r = t || "FLEX";
  return t === "QB" || t === "TE" ? { top: `${r}1`, mid: `${r}2`, flex: `${r}3`, bust: "Bust" } : { top: `${r}1`, mid: `${r}2`, flex: `${r}3`, bust: "Bust" };
}
function zk(t) {
  return !t || t.gamesPlayed === 0 ? { top: 0, mid: 0, flex: 0, bust: 0 } : {
    top: t.pos1Pct,
    mid: t.pos2Pct,
    flex: t.pos3Pct,
    bust: t.bustPct
  };
}
function Uk({ label: t, tone: r = "gold" }) {
  return /* @__PURE__ */ l.jsx("span", { className: `ov2-pill ov2-pill--${r}`, children: t });
}
function Wk({ pcts: t, labels: r }) {
  const o = Math.max(t.top + t.mid + t.flex + t.bust, 1e-3), i = [
    { key: "top", cls: "ov2-stack-seg--top", swatch: "linear-gradient(90deg, #F5C01A, #FFD166)", label: r.top, pct: t.top },
    { key: "mid", cls: "ov2-stack-seg--mid", swatch: "linear-gradient(90deg, #1d4ed8, #3b82f6)", label: r.mid, pct: t.mid },
    { key: "flex", cls: "ov2-stack-seg--flex", swatch: "linear-gradient(90deg, #475569, #64748b)", label: r.flex, pct: t.flex },
    { key: "bust", cls: "ov2-stack-seg--bust", swatch: "linear-gradient(90deg, #b91c1c, #ef4444)", label: r.bust, pct: t.bust }
  ];
  return /* @__PURE__ */ l.jsxs("div", { children: [
    /* @__PURE__ */ l.jsx("div", { className: "ov2-stack-bar", children: i.map((c) => {
      const u = c.pct / o * 100;
      return u < 0.5 ? null : /* @__PURE__ */ l.jsx(
        "div",
        {
          title: `${c.label}: ${c.pct.toFixed(0)}%`,
          className: `ov2-stack-seg ${c.cls}`,
          style: { width: `${u}%` },
          children: u >= 14 ? `${c.pct.toFixed(0)}%` : ""
        },
        c.key
      );
    }) }),
    /* @__PURE__ */ l.jsx("div", { className: "ov2-legend", children: i.map((c) => /* @__PURE__ */ l.jsxs("div", { className: "ov2-legend__item", children: [
      /* @__PURE__ */ l.jsx("span", { className: "ov2-legend__swatch", style: { background: c.swatch } }),
      /* @__PURE__ */ l.jsx("span", { className: "ov2-legend__label", children: c.label }),
      /* @__PURE__ */ l.jsxs("span", { className: "ov2-legend__pct", children: [
        c.pct.toFixed(0),
        "%"
      ] })
    ] }, c.key)) })
  ] });
}
function Hk(t) {
  return t === "ppr" ? "ppr" : t === "half" ? "half_ppr" : "std";
}
const Vk = 4, Yk = 2, jp = 4, Qk = 17;
function Gk({ seasons: t, position: r, format: o }) {
  const [i, c] = w.useState("ppg"), u = (r || "").toUpperCase(), f = o === "ppr" ? "PPR" : o === "half" ? "Half-PPR" : "Standard", p = /* @__PURE__ */ new Date(), m = p.getMonth(), g = m >= 8 || m === 0, y = m === 0 ? p.getFullYear() - 1 : p.getFullYear(), x = (R) => o === "ppr" ? R.ppr : o === "half" ? R.half : R.std, b = [...t].sort((R, E) => R.season - E.season).map((R) => {
    const E = x(R), $ = g && R.season >= y && R.gamesPlayed < Qk, G = $ ? Yk : Vk, Y = i === "ppg" ? E.posFinishPpg : E.posFinishTotal, W = i === "total" || R.gamesPlayed >= G ? Y : null, K = $ && R.gamesPlayed < jp;
    return { s: R, line: E, inProgress: $, rank: W, smallSample: K, badge: Ik(W, r) };
  }), j = b.filter((R) => !R.inProgress).length, _ = [...b].reverse().find((R) => R.inProgress) || null, k = !!_ && _.s.gamesPlayed < jp, S = b.length >= 12 ? "sc-finish2__timeline--ultra" : b.length >= 9 ? "sc-finish2__timeline--dense" : b.length >= 7 ? "sc-finish2__timeline--compact" : "", C = /* @__PURE__ */ l.jsxs("div", { className: "sc-finish2__heading", children: [
    /* @__PURE__ */ l.jsx("div", { className: "sc-finish2__title-row", children: /* @__PURE__ */ l.jsx("h3", { className: "sc-finish2__title", children: "Season-End Finishes" }) }),
    /* @__PURE__ */ l.jsxs("p", { className: "sc-finish2__subtitle", children: [
      f,
      " positional finishes by season."
    ] })
  ] });
  return j === 0 && _ ? /* @__PURE__ */ l.jsxs("div", { className: "sc-finish2", "data-testid": "section-season-finishes", children: [
    C,
    /* @__PURE__ */ l.jsx("p", { className: "sc-finish2__empty", children: "Rookie season in progress. Season-end finish will update as games are played." })
  ] }) : b.length === 0 ? /* @__PURE__ */ l.jsxs("div", { className: "sc-finish2", "data-testid": "section-season-finishes", children: [
    C,
    /* @__PURE__ */ l.jsx("p", { className: "sc-finish2__empty", children: "Not enough fantasy history yet. View weekly game logs below to evaluate recent usage and opportunity." })
  ] }) : /* @__PURE__ */ l.jsxs("div", { className: "sc-finish2", "data-testid": "section-season-finishes", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "sc-finish2__header", children: [
      C,
      /* @__PURE__ */ l.jsx("div", { className: "sc-finish2__toggle", "data-testid": "filter-finish-metric", children: [["ppg", "PPG Finish"], ["total", "Total Finish"]].map(([R, E]) => /* @__PURE__ */ l.jsx(
        "button",
        {
          className: `sc-finish2__seg ${i === R ? "sc-finish2__seg--active" : ""}`,
          onClick: () => c(R),
          "data-testid": `button-finish-metric-${R}`,
          children: E
        },
        R
      )) })
    ] }),
    k && /* @__PURE__ */ l.jsx("p", { className: "sc-finish2__caution", "data-testid": "text-finish-caution", children: "Current-season rank may be unstable due to limited games played." }),
    /* @__PURE__ */ l.jsx("div", { className: `sc-finish2__timeline ${S}`, "data-testid": "season-finish-cards", children: /* @__PURE__ */ l.jsx("div", { className: "sc-finish2__track", children: b.map((R) => /* @__PURE__ */ l.jsxs("div", { className: `sc-finish2__card ${R.inProgress ? "sc-finish2__card--now" : ""}`, "data-testid": `card-finish-${R.s.season}`, children: [
      /* @__PURE__ */ l.jsxs("div", { className: "sc-finish2__card-top", children: [
        /* @__PURE__ */ l.jsx("span", { className: "sc-finish2__card-season", children: R.s.season }),
        R.inProgress && /* @__PURE__ */ l.jsx("span", { className: "sc-finish2__now", children: "NOW" })
      ] }),
      /* @__PURE__ */ l.jsx("p", { className: "sc-finish2__card-rank", children: R.rank != null ? `${u}${R.rank}` : "—" }),
      /* @__PURE__ */ l.jsxs("p", { className: "sc-finish2__card-ppg", children: [
        R.line.ppg.toFixed(1),
        " PPG"
      ] }),
      R.badge && /* @__PURE__ */ l.jsx("span", { className: `sc-finish2__status ${R.badge.className}`, children: R.badge.label })
    ] }, R.s.season)) }) })
  ] });
}
function Kk({ player: t, format: r = "ppr" }) {
  const o = t.availableSeasons || (t.season ? [t.season] : []), i = Hk(r), { data: c } = Ht({
    queryKey: ["/api/players", t.id, "production", i],
    queryFn: () => p1(t.id, i)
  }), u = (() => {
    const f = (c || []).map((g) => {
      const y = r === "ppr" ? g.ppr : r === "half" ? g.half : g.std, x = g.totals;
      return {
        season: g.season,
        gp: g.gamesPlayed,
        ppg: y.ppg,
        posRank: y.posFinishPpg,
        pass_att: x.passAtt,
        pass_cmp: x.passCmp,
        pass_yd: x.passYd,
        pass_td: x.passTd,
        pass_int: x.passInt,
        rush_att: x.rushAtt,
        rush_yd: x.rushYd,
        rush_td: x.rushTd,
        targets: x.tgt,
        receptions: x.rec,
        rec_yd: x.recYd,
        rec_td: x.recTd,
        total_td: x.passTd + x.rushTd + x.recTd,
        scrimmage_yd: x.rushYd + x.recYd
      };
    }), p = new Set(f.map((g) => g.season)), m = (t.careerSeasonStats || []).filter((g) => !p.has(g.season));
    return [...f, ...m];
  })();
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-gamelog", style: { display: "flex", flexDirection: "column", gap: "32px" }, children: [
    c && c.length > 0 && /* @__PURE__ */ l.jsx(Gk, { seasons: c, position: t.position, format: r }),
    u.length > 0 && /* @__PURE__ */ l.jsx(oj, { stats: u, position: t.position, format: r, player: t, defaultSeason: o[0] })
  ] });
}
const Fe = (t) => t ?? 0, ft = (t) => (t ?? 0).toLocaleString();
function qk(t) {
  const r = ["th", "st", "nd", "rd"], o = t % 100;
  return t + (r[(o - 20) % 10] || r[o] || r[0]);
}
function Xk(t, r) {
  if (!t) return null;
  const o = (r || "FLEX").toUpperCase(), i = t <= 12 ? "sc-finb--t1" : t <= 24 ? "sc-finb--t2" : t <= 36 ? "sc-finb--t3" : "sc-finb--bust";
  return { label: `${o}${t}`, cls: i };
}
function wm(t, r) {
  if (!t) return null;
  const o = (r || "FLEX").toUpperCase(), i = t <= 12 ? "sc-finb--t1" : t <= 24 ? "sc-finb--t2" : t <= 36 ? "sc-finb--t3" : "sc-finb--bust";
  return { label: `${o}${t}`, cls: i };
}
function Zk(t, r) {
  const o = t || "", i = r.some((c) => Fe(c.stats.rush_att) > 0 || Fe(c.stats.rush_yd) > 0);
  if (o === "QB")
    return [
      { label: "Passing", primary: (c) => `${ft(c.pass_yd)} yds`, secondary: (c) => `${Fe(c.pass_td)} TD · ${Fe(c.pass_int)} INT` },
      { label: "Rushing", primary: (c) => `${ft(c.rush_yd)} yds`, secondary: (c) => `${Fe(c.rush_att)} car · ${Fe(c.rush_td)} TD` }
    ];
  if (o === "RB")
    return [
      { label: "Rushing", primary: (c) => `${ft(c.rush_yd)} yds`, secondary: (c) => `${Fe(c.rush_att)} car · ${Fe(c.rush_td)} TD` },
      { label: "Receiving", primary: (c) => `${ft(c.rec_yd)} yds`, secondary: (c) => `${Fe(c.rec)}/${Fe(c.rec_tgt)} · ${Fe(c.rec_td)} TD` }
    ];
  if (o === "WR" || o === "TE") {
    const c = [
      { label: "Receiving", primary: (u) => `${ft(u.rec_yd)} yds`, secondary: (u) => `${Fe(u.rec)}/${Fe(u.rec_tgt)} rec · ${Fe(u.rec_td)} TD` }
    ];
    return i && c.push({ label: "Rushing", primary: (u) => `${ft(u.rush_yd)} yds`, secondary: (u) => `${Fe(u.rush_att)} car · ${Fe(u.rush_td)} TD` }), c;
  }
  return o === "K" ? [
    { label: "Kicking", primary: (c) => `${Fe(c.fgm)}/${Fe(c.fga)} FG`, secondary: (c) => `${Fe(c.xpm)}/${Fe(c.xpa)} XP` }
  ] : [];
}
function Jk({ entries: t, position: r, format: o }) {
  const i = (r || "").toUpperCase(), c = t.filter((m) => m.game_status === "active"), u = Zk(r, c), f = `48px minmax(120px,1.3fr) minmax(96px,1fr) ${u.map(() => "minmax(116px,1.2fr)").join(" ")} 92px`, p = (m) => m === "W" ? "sc-wlog__wl--w" : m === "L" ? "sc-wlog__wl--l" : "sc-wlog__wl--t";
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-wlog", "data-testid": "weekly-game-log", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "sc-wlog__head", style: { gridTemplateColumns: f }, children: [
      /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__h", children: "Wk" }),
      /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__h", children: "Matchup" }),
      /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__h", children: "Result" }),
      u.map((m) => /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__h", children: m.label }, m.label)),
      /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__h sc-wlog__h--r", children: "Fantasy" })
    ] }),
    t.map((m) => {
      const g = m.game_status === "bye", y = m.game_status === "out";
      if (g || y)
        return /* @__PURE__ */ l.jsxs("div", { className: "sc-wlog__row sc-wlog__row--inactive", style: { gridTemplateColumns: f }, "data-testid": `row-week-${m.week}`, children: [
          /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell sc-wlog__wk", "data-label": "Wk", children: m.week }),
          /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell", "data-label": "Matchup", children: /* @__PURE__ */ l.jsx("span", { className: "sc-wlog__opp", children: g ? "BYE" : "—" }) }),
          /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell", "data-label": "Result", children: /* @__PURE__ */ l.jsx("span", { className: "sc-finb sc-finb--bye", children: g ? "BYE" : "OUT" }) }),
          u.map((k) => /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell sc-wlog__muted", "data-label": k.label, children: "—" }, k.label)),
          /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell sc-wlog__cell--r sc-wlog__muted", "data-label": "Fantasy", children: "—" })
        ] }, m.week);
      const x = an(m, o), b = Xk(m.pos_rank, r), j = m.score, _ = m.opp_rank_vs_pos;
      return /* @__PURE__ */ l.jsxs("div", { className: "sc-wlog__row", style: { gridTemplateColumns: f }, "data-testid": `row-week-${m.week}`, children: [
        /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell sc-wlog__wk", "data-label": "Wk", children: m.week }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell", "data-label": "Matchup", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-wlog__match", children: [
          /* @__PURE__ */ l.jsx("span", { className: "sc-wlog__opp", children: m.opp }),
          _ ? /* @__PURE__ */ l.jsxs("span", { className: `sc-wlog__opprank ${$k(_)}`, children: [
            qk(_),
            " vs ",
            i
          ] }) : null
        ] }) }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell", "data-label": "Result", children: j ? /* @__PURE__ */ l.jsxs("span", { className: "sc-wlog__result", children: [
          /* @__PURE__ */ l.jsx("span", { className: `sc-wlog__wl ${p(j.r)}`, children: j.r }),
          /* @__PURE__ */ l.jsxs("span", { className: "sc-wlog__score", children: [
            j.tm,
            "–",
            j.opp
          ] })
        ] }) : /* @__PURE__ */ l.jsx("span", { className: "sc-wlog__muted", children: "—" }) }),
        u.map((k) => /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell", "data-label": k.label, children: /* @__PURE__ */ l.jsxs("div", { className: "sc-wlog__stat", children: [
          /* @__PURE__ */ l.jsx("span", { className: "sc-wlog__stat-main", children: k.primary(m.stats) }),
          /* @__PURE__ */ l.jsx("span", { className: "sc-wlog__stat-sub", children: k.secondary(m.stats) })
        ] }) }, k.label)),
        /* @__PURE__ */ l.jsx("div", { className: "sc-wlog__cell sc-wlog__cell--r", "data-label": "Fantasy", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-wlog__fantasy", children: [
          /* @__PURE__ */ l.jsx("span", { className: "sc-wlog__fpts", children: x.toFixed(1) }),
          b ? /* @__PURE__ */ l.jsx("span", { className: `sc-finb ${b.cls}`, children: b.label }) : null
        ] }) })
      ] }, m.week);
    })
  ] });
}
function ej(t, r) {
  const o = r || "";
  return o === "QB" ? [
    { label: "GP", value: String(t.gp) },
    { label: "Pass Yds", value: ft(t.pass_yd) },
    { label: "Pass TD", value: String(t.pass_td) },
    { label: "INT", value: String(t.pass_int) },
    { label: "Rush Yds", value: ft(t.rush_yd) },
    { label: "Rush TD", value: String(t.rush_td) }
  ] : o === "RB" ? [
    { label: "GP", value: String(t.gp) },
    { label: "Rush Yds", value: ft(t.rush_yd) },
    { label: "Rush TD", value: String(t.rush_td) },
    { label: "Rec", value: String(t.receptions) },
    { label: "Rec Yds", value: ft(t.rec_yd) },
    { label: "Total TD", value: String(t.total_td) }
  ] : o === "WR" || o === "TE" ? [
    { label: "GP", value: String(t.gp) },
    { label: "Targets", value: String(t.targets) },
    { label: "Rec", value: String(t.receptions) },
    { label: "Rec Yds", value: ft(t.rec_yd) },
    { label: "Rec TD", value: String(t.rec_td) },
    { label: "Total TD", value: String(t.total_td) }
  ] : [
    { label: "GP", value: String(t.gp) },
    { label: "Total TD", value: String(t.total_td) }
  ];
}
function tj(t, r, o, i) {
  if (r.length === 0) return null;
  const c = (o || "FLEX").toUpperCase(), u = r.map((j) => an(j, i)), f = u.length ? Math.max(...u) : 0, p = r.filter((j) => j.pos_rank != null && j.pos_rank <= 12).length, m = t.posRank, g = m ? m <= 5 ? "An elite" : m <= 12 ? "A strong" : m <= 24 ? "A steady" : m <= 36 ? "A streaming-level" : "A depth" : "A", y = m ? ` ${c}${m}` : "";
  let x = `${g}${y} season across ${t.gp} game${t.gp === 1 ? "" : "s"}`;
  const b = [];
  return p > 0 && b.push(`${p} ${c}1 week${p === 1 ? "" : "s"}`), f > 0 && b.push(`a ${f.toFixed(1)}-point ceiling`), b.length && (x += ` with ${b.join(" and ")}`), x + ".";
}
function bm({ stat: t, entries: r, position: o, format: i, title: c }) {
  const u = wm(t.posRank, o), f = ej(t, o), p = r.filter((j) => j.game_status === "active"), m = tj(t, p, o, i), g = xm(r, o, i), y = (o || "FLEX").toUpperCase(), x = [];
  if (g && g.gamesPlayed > 0) {
    const j = p.map((C) => an(C, i)), _ = j.length ? Math.max(...j) : 0, k = g.ppg > 0 ? g.volatility / g.ppg : 2;
    _ >= (y === "QB" ? 30 : y === "TE" ? 20 : 25) && x.push({ label: "Elite Ceiling", tone: "gold" }), g.pos1Pct >= 50 ? x.push({ label: `Weekly ${y}1`, tone: "pos" }) : g.pos1Pct + g.pos2Pct >= 60 && x.push({ label: "Reliable Starter", tone: "pos" }), k <= 0.45 ? x.push({ label: "High Consistency", tone: "slate" }) : g.bustPct >= 30 && x.push({ label: "Volatile Floor", tone: "neg" });
  }
  const b = x.slice(0, 3);
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-dash", "data-testid": "season-summary-card", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "sc-dash__head", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "sc-dash__titlewrap", children: [
        /* @__PURE__ */ l.jsx("h4", { className: "sc-dash__title", children: c }),
        m && /* @__PURE__ */ l.jsx("p", { className: "sc-dash__insight", children: m }),
        b.length > 0 && /* @__PURE__ */ l.jsx("div", { className: "sc-dash__badges", children: b.map((j) => /* @__PURE__ */ l.jsx(Uk, { label: j.label, tone: j.tone }, j.label)) })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "sc-dash__headline", children: [
        /* @__PURE__ */ l.jsxs("span", { className: "sc-dash__ppg", children: [
          t.ppg.toFixed(1),
          /* @__PURE__ */ l.jsx("i", { children: "PPG" })
        ] }),
        u && /* @__PURE__ */ l.jsx("span", { className: `sc-finb ${u.cls}`, children: u.label })
      ] })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "sc-dash__metrics", children: f.map((j) => /* @__PURE__ */ l.jsxs("div", { className: "sc-dash__metric", children: [
      /* @__PURE__ */ l.jsx("span", { className: "sc-dash__metric-val", children: j.value }),
      /* @__PURE__ */ l.jsx("span", { className: "sc-dash__metric-lbl", children: j.label })
    ] }, j.label)) }),
    g && g.gamesPlayed > 0 && /* @__PURE__ */ l.jsxs("div", { className: "sc-dash__profile", "data-testid": "weekly-finish-profile", children: [
      /* @__PURE__ */ l.jsx("div", { className: "sc-dash__profile-head", children: /* @__PURE__ */ l.jsx("span", { className: "sc-dash__profile-title", children: "Weekly Finish Breakdown" }) }),
      /* @__PURE__ */ l.jsx(Wk, { pcts: zk(g), labels: Bk(o) })
    ] })
  ] });
}
function nj({ player: t, season: r, stat: o, position: i, format: c, isDefaultSeason: u }) {
  const { data: f, isLoading: p } = Ht({
    queryKey: ["/api/players", t.slug, "game-log", r, c],
    queryFn: async () => {
      const y = await fetch(`/api/players/${t.slug}/game-log?season=${r}&format=${c}`);
      if (!y.ok) throw new Error("Failed to fetch game log");
      return y.json();
    },
    enabled: !u
  }), m = u ? t.gameLog || [] : f || [], g = !u && p;
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-glbody", children: [
    /* @__PURE__ */ l.jsx(bm, { stat: o, entries: m, position: i, format: c, title: `${r} Season` }),
    g ? /* @__PURE__ */ l.jsxs("div", { className: "sc-glpad py-2 text-center", children: [
      /* @__PURE__ */ l.jsx(je, { className: "h-4 w-48 mx-auto mb-2" }),
      /* @__PURE__ */ l.jsx(je, { className: "h-4 w-32 mx-auto" })
    ] }) : m.length > 0 ? /* @__PURE__ */ l.jsx(Jk, { entries: m, position: i, format: c }) : /* @__PURE__ */ l.jsxs("p", { className: "sc-glpad text-center text-xs text-muted-foreground", children: [
      "No weekly game log available for ",
      r,
      "."
    ] })
  ] });
}
function rj(t) {
  const r = (c) => t.reduce((u, f) => u + (Number(f[c]) || 0), 0), o = r("gp"), i = t.reduce((c, u) => c + u.ppg * u.gp, 0);
  return {
    season: 0,
    gp: o,
    ppg: o > 0 ? i / o : 0,
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
function sj({ stats: t, position: r, format: o, onPick: i }) {
  const c = rj(t), u = (f) => r === "QB" ? `${ft(f.pass_yd)} pass yds · ${f.pass_td} TD` : r === "RB" ? `${ft(f.rush_yd)} rush yds · ${f.total_td} TD` : `${f.receptions} rec · ${ft(f.rec_yd)} yds · ${f.total_td} TD`;
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-glbody", children: [
    /* @__PURE__ */ l.jsx(bm, { stat: c, entries: [], position: r, format: o, title: "Career Totals" }),
    /* @__PURE__ */ l.jsx("div", { className: "sc-slog__seasons", children: t.map((f) => {
      const p = wm(f.posRank, r);
      return /* @__PURE__ */ l.jsxs("button", { type: "button", className: "sc-slog__srow", onClick: () => i(f.season), "data-testid": `career-season-${f.season}`, children: [
        /* @__PURE__ */ l.jsx("span", { className: "sc-slog__syear", children: f.season }),
        /* @__PURE__ */ l.jsxs("span", { className: "sc-slog__sgp", children: [
          f.gp,
          " GP"
        ] }),
        /* @__PURE__ */ l.jsx("span", { className: "sc-slog__skey", children: u(f) }),
        /* @__PURE__ */ l.jsxs("span", { className: "sc-slog__sppg", children: [
          f.ppg.toFixed(1),
          " ",
          /* @__PURE__ */ l.jsx("i", { children: "PPG" })
        ] }),
        p ? /* @__PURE__ */ l.jsx("span", { className: `sc-finb ${p.cls}`, children: p.label }) : /* @__PURE__ */ l.jsx("span", { className: "sc-wlog__muted", children: "—" }),
        /* @__PURE__ */ l.jsx(Wh, { className: "sc-slog__sarrow" })
      ] }, f.season);
    }) })
  ] });
}
function oj({ player: t, stats: r, position: o, format: i, defaultSeason: c }) {
  const u = w.useMemo(() => [...r].sort((g, y) => y.season - g.season), [r]), f = c != null && u.some((g) => g.season === c) ? c : u[0]?.season ?? "career", [p, m] = w.useState(f);
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-glcard", "data-testid": "career-stats-table", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "sc-glcard__header", children: [
      /* @__PURE__ */ l.jsx("h3", { className: "sc-glcard__title", children: "Game Log" }),
      /* @__PURE__ */ l.jsxs("div", { className: "sc-slog__selector", role: "tablist", "data-testid": "season-selector", children: [
        u.map((g) => /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            className: `sc-slog__seg ${p === g.season ? "sc-slog__seg--active" : ""}`,
            onClick: () => m(g.season),
            "data-testid": `season-tab-${g.season}`,
            children: g.season
          },
          g.season
        )),
        /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            className: `sc-slog__seg ${p === "career" ? "sc-slog__seg--active" : ""}`,
            onClick: () => m("career"),
            "data-testid": "season-tab-career",
            children: "Career"
          }
        )
      ] })
    ] }),
    p === "career" ? /* @__PURE__ */ l.jsx(sj, { stats: u, position: o, format: i, onPick: (g) => m(g) }) : /* @__PURE__ */ l.jsx(
      nj,
      {
        player: t,
        season: p,
        stat: u.find((g) => g.season === p) ?? u[0],
        position: o,
        format: i,
        isDefaultSeason: c != null && p === c
      },
      p
    )
  ] });
}
function ij({ item: t, player: r, teamColor: o, sourceName: i }) {
  const [c, u] = w.useState(!1), f = Sc(r.id), p = o || "#F5C01A", m = `linear-gradient(90deg, ${p}, ${p}88)`;
  return /* @__PURE__ */ l.jsx(
    "a",
    {
      href: t.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "block",
      "data-testid": "link-featured-news",
      children: /* @__PURE__ */ l.jsxs(
        "div",
        {
          className: "sc-player-news",
          style: { "--team-accent": p },
          children: [
            /* @__PURE__ */ l.jsx("div", { style: { height: 4, borderRadius: "6px 6px 0 0", background: m, margin: "-24px -24px 20px -24px" } }),
            /* @__PURE__ */ l.jsxs("div", { className: "sc-player-news__header", children: [
              c ? /* @__PURE__ */ l.jsx("div", { className: "sc-player-news__img-fallback", style: { borderColor: p }, children: /* @__PURE__ */ l.jsx(Qh, { className: "w-6 h-6 text-slate-400 dark:text-slate-500" }) }) : /* @__PURE__ */ l.jsx(
                "img",
                {
                  src: f,
                  alt: r.name,
                  className: "sc-player-news__img",
                  style: { borderColor: p },
                  onError: () => u(!0)
                }
              ),
              /* @__PURE__ */ l.jsxs("div", { children: [
                /* @__PURE__ */ l.jsxs("div", { className: "sc-player-news__name", children: [
                  r.name,
                  " – ",
                  r.position
                ] }),
                /* @__PURE__ */ l.jsxs("div", { className: "sc-player-news__posted", children: [
                  t.type === "video" ? "🎥 Video" : "📰 Article",
                  " • ",
                  i
                ] })
              ] })
            ] }),
            /* @__PURE__ */ l.jsxs("div", { className: "sc-player-news__pills", children: [
              /* @__PURE__ */ l.jsx("span", { className: "sc-pill sc-pill--type", "data-testid": "badge-featured-type", children: (t.type || "news").toUpperCase() }),
              t.impact && /* @__PURE__ */ l.jsx("span", { className: `sc-pill sc-pill--impact sc-pill--impact-${t.impact.toLowerCase()}`, children: t.impact }),
              t.tag && /* @__PURE__ */ l.jsx("span", { className: "sc-pill sc-pill--tag", children: t.tag })
            ] }),
            /* @__PURE__ */ l.jsx("div", { className: "sc-player-news__body", children: t.ai_blurb || t.title }),
            /* @__PURE__ */ l.jsxs("div", { className: "sc-player-news__footer", children: [
              /* @__PURE__ */ l.jsxs("span", { className: "sc-player-news__source", children: [
                "Source: ",
                i
              ] }),
              /* @__PURE__ */ l.jsx("span", { className: "sc-player-news__link", children: "View Original →" })
            ] })
          ]
        }
      )
    }
  );
}
function aj(t) {
  const r = (t || "").toUpperCase().trim();
  return r === "OUT" ? "sc-injury-pill--out" : r === "DOUBTFUL" ? "sc-injury-pill--doubtful" : r === "QUESTIONABLE" ? "sc-injury-pill--questionable" : "sc-injury-pill--none";
}
function Ol(t) {
  const r = (t || "").toUpperCase().trim();
  return r === "FP" ? "sc-injury-chip--fp" : r === "LP" ? "sc-injury-chip--lp" : r === "DNP" ? "sc-injury-chip--dnp" : "";
}
const lj = {
  NE: "Patriots",
  BUF: "Bills",
  MIA: "Dolphins",
  NYJ: "Jets",
  BAL: "Ravens",
  CIN: "Bengals",
  CLE: "Browns",
  PIT: "Steelers"
};
function cj({ player: t }) {
  const r = t.team || "", o = lj[r] || null, i = !!o, c = xc[r] || "#F5C01A", [u, f] = w.useState("articles"), { data: p, isLoading: m, refetch: g, isFetching: y } = Ht({
    queryKey: ["/api/team/news", r, t.name],
    queryFn: async () => {
      const E = await fetch(`/api/team/news?team=${encodeURIComponent(r)}&player_name=${encodeURIComponent(t.name)}&limit=8`);
      if (!E.ok) throw new Error("Failed to load news");
      return E.json();
    },
    enabled: i,
    staleTime: 1800 * 1e3
  }), { data: x, isLoading: b } = Ht({
    queryKey: ["/api/team/injury", r, t.name],
    queryFn: async () => {
      const E = await fetch(`/api/team/injury?team=${encodeURIComponent(r)}&player_name=${encodeURIComponent(t.name)}`);
      if (!E.ok) throw new Error("Failed to load injury");
      return E.json();
    },
    enabled: i && u === "injuries",
    staleTime: 1800 * 1e3
  }), j = t.news || [], _ = p?.items || [], k = _[0] || null, S = _.slice(1), C = j.length > 0 || _.length > 0, R = p?.source || (o ? `${o}.com` : "");
  return /* @__PURE__ */ l.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "32px" }, "data-testid": "news-tab", children: [
    /* @__PURE__ */ l.jsxs("div", { children: [
      /* @__PURE__ */ l.jsx(vm, { title: "News & Analysis", subtitle: "Latest team reports, injury updates, and player intel" }),
      i && /* @__PURE__ */ l.jsxs("div", { style: { display: "flex", gap: "0", marginTop: "16px" }, "data-testid": "news-filter-toggle", children: [
        /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            className: `sc-news-tab ${u === "articles" ? "sc-news-tab--active" : ""}`,
            onClick: () => f("articles"),
            "data-testid": "button-filter-articles",
            children: "Articles"
          }
        ),
        /* @__PURE__ */ l.jsx(
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
    i && u === "injuries" && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      b && /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card", children: [
        /* @__PURE__ */ l.jsx(je, { className: "h-4 w-24 mb-3" }),
        /* @__PURE__ */ l.jsx(je, { className: "h-5 w-full mb-2" }),
        /* @__PURE__ */ l.jsx(je, { className: "h-5 w-4/5 mb-3" }),
        /* @__PURE__ */ l.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ l.jsx(je, { className: "h-5 w-16 rounded-full" }),
          /* @__PURE__ */ l.jsx(je, { className: "h-5 w-16 rounded-full" }),
          /* @__PURE__ */ l.jsx(je, { className: "h-5 w-16 rounded-full" })
        ] })
      ] }),
      x && !b && (() => {
        const E = (() => {
          const Q = x.position || "";
          let D = x.injury || "";
          return D && !D.toLowerCase().includes("injury") && !D.toLowerCase().includes("illness") && !D.toLowerCase().includes("rest") && !D.toLowerCase().includes("personal") && (D = `${D} Injury`), Q && D ? `${Q} • ${D}` : Q || D;
        })(), $ = (Q) => Q.replace(/\w\S*/g, (D) => D.charAt(0).toUpperCase() + D.slice(1).toLowerCase()), G = x.report_label ? `${$(x.report_label)} Injury Report` : "Injury Report", Y = (() => {
          const Q = x.blurb || "", D = x.player_name || "";
          if (!D || !Q.includes(D)) return [{ text: Q, bold: !1 }];
          const J = Q.indexOf(D), M = [];
          return J > 0 && M.push({ text: Q.slice(0, J), bold: !1 }), M.push({ text: D, bold: !0 }), J + D.length < Q.length && M.push({ text: Q.slice(J + D.length), bold: !1 }), M;
        })(), W = (Q) => {
          const D = new Date(Q);
          if (isNaN(D.getTime())) return "";
          const J = Math.floor((Date.now() - D.getTime()) / 1e3);
          return J < 60 ? "just now" : J < 3600 ? `${Math.floor(J / 60)}m ago` : J < 86400 ? `${Math.floor(J / 3600)}h ago` : `${Math.floor(J / 86400)}d ago`;
        }, K = (Q) => {
          const D = new Date(Q);
          return isNaN(D.getTime()) ? "" : D.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        }, le = x.report_updated_at ? `Report updated: ${K(x.report_updated_at)}` : null, ie = x.fetched_at ? `Last checked: ${W(x.fetched_at)}` : null, ue = x.practice && (x.practice.wed || x.practice.thu || x.practice.fri);
        return /* @__PURE__ */ l.jsx("div", { className: `sc-injury-card ${x.found ? "" : "sc-injury-card--empty"}`, "data-testid": "injury-card", children: x.found ? /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__top", children: [
            /* @__PURE__ */ l.jsxs("div", { children: [
              /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__title", "data-testid": "text-injury-title", children: [
                /* @__PURE__ */ l.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", verticalAlign: "-2px", marginRight: "5px" }, children: /* @__PURE__ */ l.jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }),
                G
              ] }),
              /* @__PURE__ */ l.jsx("div", { className: "sc-injury-card__meta", "data-testid": "text-injury-meta", children: E })
            ] }),
            /* @__PURE__ */ l.jsx("div", { className: `sc-injury-pill ${aj(x.game_status || "")}`, "data-testid": "badge-injury-status", children: (() => {
              const Q = (x.game_status || "").toUpperCase().trim();
              return Q && Q !== "(-)" && Q !== "-" ? Q : "No designation";
            })() })
          ] }),
          /* @__PURE__ */ l.jsx("div", { className: "sc-injury-card__blurb", "data-testid": "text-injury-blurb", children: Y.map((Q, D) => Q.bold ? /* @__PURE__ */ l.jsx("strong", { children: Q.text }, D) : /* @__PURE__ */ l.jsx("span", { children: Q.text }, D)) }),
          ue && /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__bot", children: [
            x.practice?.wed && /* @__PURE__ */ l.jsxs("span", { className: `sc-injury-chip ${Ol(x.practice.wed)}`, "data-testid": "chip-practice-wed", children: [
              "WED: ",
              x.practice.wed
            ] }),
            x.practice?.thu && /* @__PURE__ */ l.jsxs("span", { className: `sc-injury-chip ${Ol(x.practice.thu)}`, "data-testid": "chip-practice-thu", children: [
              "THU: ",
              x.practice.thu
            ] }),
            x.practice?.fri && /* @__PURE__ */ l.jsxs("span", { className: `sc-injury-chip ${Ol(x.practice.fri)}`, "data-testid": "chip-practice-fri", children: [
              "FRI: ",
              x.practice.fri
            ] })
          ] }),
          /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__footer", children: [
            /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__timestamps", children: [
              le && /* @__PURE__ */ l.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-report-date", children: le }),
              ie && /* @__PURE__ */ l.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-checked", children: ie })
            ] }),
            x.source_url && /* @__PURE__ */ l.jsx("a", { className: "sc-injury-card__link", href: x.source_url, target: "_blank", rel: "noopener noreferrer", "data-testid": "link-injury-source", children: "View Full Injury Report →" })
          ] })
        ] }) : /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__top", children: [
            /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__title", children: [
              /* @__PURE__ */ l.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", verticalAlign: "-2px", marginRight: "5px" }, children: /* @__PURE__ */ l.jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }),
              G
            ] }) }),
            /* @__PURE__ */ l.jsx("div", { className: "sc-injury-pill sc-injury-pill--none", "data-testid": "badge-injury-status", children: "Not Listed" })
          ] }),
          /* @__PURE__ */ l.jsx("div", { className: "sc-injury-card__blurb", "data-testid": "text-injury-blurb", children: "No injury designation listed on the latest report." }),
          /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__footer", children: [
            /* @__PURE__ */ l.jsxs("div", { className: "sc-injury-card__timestamps", children: [
              le && /* @__PURE__ */ l.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-report-date", children: le }),
              ie && /* @__PURE__ */ l.jsx("span", { className: "sc-injury-card__updated", "data-testid": "text-injury-checked", children: ie })
            ] }),
            x.source_url && /* @__PURE__ */ l.jsx("a", { className: "sc-injury-card__link", href: x.source_url, target: "_blank", rel: "noopener noreferrer", "data-testid": "link-injury-source", children: "View Full Injury Report →" })
          ] })
        ] }) });
      })()
    ] }),
    i && u !== "articles" ? null : /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      i && m && /* @__PURE__ */ l.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "sc-player-news", style: { "--team-accent": c }, children: [
          /* @__PURE__ */ l.jsx("div", { style: { height: 4, borderRadius: "6px 6px 0 0", background: `linear-gradient(90deg, ${c}, ${c}88)`, margin: "-24px -24px 20px -24px" } }),
          /* @__PURE__ */ l.jsxs("div", { className: "sc-player-news__header", children: [
            /* @__PURE__ */ l.jsx(je, { className: "w-14 h-14 rounded-full flex-shrink-0" }),
            /* @__PURE__ */ l.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ l.jsx(je, { className: "h-5 w-40 mb-2" }),
              /* @__PURE__ */ l.jsx(je, { className: "h-3.5 w-28" })
            ] })
          ] }),
          /* @__PURE__ */ l.jsx(je, { className: "h-4 w-20 mb-3" }),
          /* @__PURE__ */ l.jsx(je, { className: "h-5 w-full mb-1.5" }),
          /* @__PURE__ */ l.jsx(je, { className: "h-5 w-4/5 mb-4" }),
          /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800", children: [
            /* @__PURE__ */ l.jsx(je, { className: "h-3.5 w-32" }),
            /* @__PURE__ */ l.jsx(je, { className: "h-3.5 w-24" })
          ] })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews", children: /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__list", children: [1, 2].map((E) => /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__card", style: { pointerEvents: "none" }, children: [
          /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__card-left", children: /* @__PURE__ */ l.jsx(je, { className: "w-[34px] h-[34px] rounded-xl" }) }),
          /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__card-mid", children: [
            /* @__PURE__ */ l.jsx(je, { className: "h-4 w-16 mb-2" }),
            /* @__PURE__ */ l.jsx(je, { className: "h-5 w-full" })
          ] })
        ] }, E)) }) })
      ] }),
      k && /* @__PURE__ */ l.jsx(ij, { item: k, player: t, teamColor: c, sourceName: R }),
      S.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews", "data-testid": "team-news-list", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__head", children: [
          /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__head-left", children: [
            /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📰" }),
            /* @__PURE__ */ l.jsxs("div", { children: [
              /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__kicker", children: [
                "Latest from ",
                R
              ] }),
              /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__sub", children: [
                _.length,
                " updates"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsxs(
            "button",
            {
              className: "sc-teamnews__btn",
              type: "button",
              onClick: () => g(),
              disabled: y,
              "data-testid": "button-refresh-news",
              children: [
                /* @__PURE__ */ l.jsx(l1, { className: `w-3.5 h-3.5 ${y ? "animate-spin" : ""}` }),
                "Refresh"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__list", children: S.map((E, $) => /* @__PURE__ */ l.jsxs(
          "a",
          {
            className: "sc-teamnews__card",
            href: E.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-testid": `link-team-news-${$}`,
            children: [
              /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__card-left", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__doc", children: /* @__PURE__ */ l.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("path", { fill: "currentColor", d: "M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" }) }) }) }),
              /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__card-mid", children: [
                /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__meta", children: [
                  /* @__PURE__ */ l.jsx("span", { className: "sc-pill sc-pill--type", "data-testid": `badge-news-type-${$}`, children: (E.type || "news").toUpperCase() }),
                  /* @__PURE__ */ l.jsx("span", { className: "sc-teamnews__source", children: R }),
                  E.impact && /* @__PURE__ */ l.jsx("span", { className: `sc-pill sc-pill--impact sc-pill--impact-${E.impact.toLowerCase()}`, children: E.impact }),
                  E.tag && /* @__PURE__ */ l.jsx("span", { className: "sc-pill sc-pill--tag", children: E.tag })
                ] }),
                /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__title", children: E.title }),
                E.ai_blurb && /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__blurb", children: E.ai_blurb })
              ] }),
              /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__card-right", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) }) })
            ]
          },
          $
        )) }),
        p?.team_profile_url && /* @__PURE__ */ l.jsx("div", { style: { padding: "0 14px 12px" }, children: /* @__PURE__ */ l.jsxs(
          "a",
          {
            href: p.team_profile_url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "sc-teamnews__profile-link",
            "data-testid": "link-team-profile",
            children: [
              "View full profile on ",
              R,
              /* @__PURE__ */ l.jsx("svg", { viewBox: "0 0 24 24", width: "12", height: "12", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) })
            ]
          }
        ) })
      ] }),
      _.length === 1 && p?.team_profile_url && /* @__PURE__ */ l.jsx("div", { style: { marginTop: -8 }, children: /* @__PURE__ */ l.jsxs(
        "a",
        {
          href: p.team_profile_url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "sc-teamnews__profile-link",
          "data-testid": "link-team-profile-single",
          children: [
            "View full profile on ",
            R,
            /* @__PURE__ */ l.jsx("svg", { viewBox: "0 0 24 24", width: "12", height: "12", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) })
          ]
        }
      ) }),
      j.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews", "data-testid": "news-list", children: [
        /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__head", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__head-left", children: [
          /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📄" }),
          /* @__PURE__ */ l.jsxs("div", { children: [
            /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__kicker", children: "Articles" }),
            /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__sub", children: [
              j.length,
              " ",
              j.length === 1 ? "article" : "articles"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__list", children: j.map((E, $) => /* @__PURE__ */ l.jsxs(
          "a",
          {
            className: "sc-teamnews__card",
            href: E.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-testid": `link-news-${$}`,
            children: [
              /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__card-left", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__doc", children: /* @__PURE__ */ l.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("path", { fill: "currentColor", d: "M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L14 3.5zM8 11h8v1.75H8V11zm0 4h8v1.75H8V15zm0 4h6v1.75H8V19z" }) }) }) }),
              /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__card-mid", children: [
                /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__meta", children: [
                  /* @__PURE__ */ l.jsx("span", { className: "sc-pill sc-pill--type", children: "NEWS" }),
                  /* @__PURE__ */ l.jsx("span", { className: "sc-teamnews__source", children: E.source }),
                  E.publishedAt && /* @__PURE__ */ l.jsx("span", { className: "sc-teamnews__date", children: new Date(E.publishedAt).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) })
                ] }),
                /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__title", children: E.title }),
                E.summary && /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__blurb", children: E.summary })
              ] }),
              /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__card-right", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true", children: /* @__PURE__ */ l.jsx("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" }) }) })
            ]
          },
          $
        )) })
      ] }),
      !C && !m && /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews", children: [
        /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__head", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__head-left", children: [
          /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__icon", "aria-hidden": "true", children: "📰" }),
          /* @__PURE__ */ l.jsxs("div", { children: [
            /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__kicker", children: "News & Analysis" }),
            /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__sub", children: "No updates found" })
          ] })
        ] }) }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-teamnews__list", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-teamnews__empty", children: [
          "No recent items available for ",
          t.name,
          ". Check back soon for updates."
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ l.jsx(tr, { href: "/articles/", children: /* @__PURE__ */ l.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 24px", cursor: "pointer", height: "100%" }, children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ l.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ l.jsx(a1, { className: "w-4 h-4", style: { color: "#0b3a7a" } }) }),
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "Browse Articles" }),
          /* @__PURE__ */ l.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Expert analysis and insights" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ l.jsx(tr, { href: "/nfl/players", children: /* @__PURE__ */ l.jsx("div", { className: "sc-card hover-elevate", style: { padding: "20px 24px", cursor: "pointer", height: "100%" }, children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ l.jsx("div", { className: "p-2 rounded-md", style: { background: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ l.jsx(Tr, { className: "w-4 h-4", style: { color: "#0b3a7a" } }) }),
        /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("p", { style: { fontWeight: 600, color: "#0b3a7a", fontSize: "14px" }, children: "Search Players" }),
          /* @__PURE__ */ l.jsx("p", { style: { fontSize: "12px", color: "#94a3b8" }, children: "Find and compare players" })
        ] })
      ] }) }) })
    ] })
  ] });
}
function uj() {
  return /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsx("div", { className: "bg-slate-50 dark:bg-[#0B1634] border-b-2 border-slate-200 dark:border-slate-700", children: /* @__PURE__ */ l.jsx("div", { className: "max-w-7xl mx-auto px-4 py-10", children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-6 flex-wrap", children: [
      /* @__PURE__ */ l.jsx(je, { className: "w-24 h-24 md:w-40 md:h-40 rounded-md" }),
      /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx(je, { className: "h-4 w-16 mb-2" }),
        /* @__PURE__ */ l.jsx(je, { className: "h-9 w-56 mb-3" }),
        /* @__PURE__ */ l.jsx(je, { className: "h-[2px] w-20 mb-4" }),
        /* @__PURE__ */ l.jsx(je, { className: "h-5 w-40" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ l.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ l.jsx("div", { className: "flex gap-2 mb-6 flex-wrap", children: Array.from({ length: 5 }).map((t, r) => /* @__PURE__ */ l.jsx(je, { className: "h-9 w-24 rounded-md" }, r)) }),
      /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: Array.from({ length: 4 }).map((t, r) => /* @__PURE__ */ l.jsx(je, { className: "h-20 rounded-md" }, r)) }),
      /* @__PURE__ */ l.jsx(je, { className: "h-40 rounded-md" })
    ] })
  ] });
}
const dj = { standard: "STD", half: "HALF", ppr: "PPR" };
function fj({ format: t, onChange: r }) {
  const o = ["standard", "half", "ppr"];
  return /* @__PURE__ */ l.jsx("div", { className: "sc-segment", role: "group", "aria-label": "Scoring format", "data-testid": "scoring-format-toggle", children: o.map((i) => /* @__PURE__ */ l.jsxs(
    "button",
    {
      type: "button",
      className: `sc-segment__btn ${t === i ? "sc-segment__btn--active" : ""}`,
      onClick: () => r(i),
      "data-testid": `button-format-${i}`,
      children: [
        /* @__PURE__ */ l.jsx("span", { className: "sc-seg-full", children: v1[i] }),
        /* @__PURE__ */ l.jsx("span", { className: "sc-seg-short", children: dj[i] })
      ]
    },
    i
  )) });
}
function Np() {
  const r = Vp().slug, [o, i] = w.useState("overview"), [c, u] = w.useState("ppr"), { data: f, isLoading: p, error: m } = Ht({
    queryKey: ["/api/players", r, { format: c }],
    queryFn: () => fetch(`/api/players/${r}?format=${c}`).then((oe) => oe.json())
  }), { data: g } = Ht({
    queryKey: ["/api/players", r, "related", { format: c }],
    queryFn: () => fetch(`/api/players/${r}/related?format=${c}`).then((oe) => oe.json()),
    enabled: !!f
  }), [y, x] = w.useState(null), [b, j] = w.useState(!1), [_, k] = w.useState(!1), S = w.useRef(null), [C, R] = w.useState({}), E = w.useRef(null), [$, G] = w.useState(2025), Y = f?.position?.toLowerCase(), { data: W, isLoading: K } = Ht({
    queryKey: ["/api/advanced-stats", Y, $, f?.id],
    queryFn: () => pb(f.id, f.position || "", $),
    enabled: o === "advanced" && !!f?.id && !!f?.position && ["QB", "RB", "WR", "TE"].includes(f.position || ""),
    staleTime: 1e3 * 60 * 60
  }), { data: le } = Ht({
    queryKey: ["/api/advanced-stats/qualification", Y, f?.id],
    queryFn: () => hb(f.id, f.position || ""),
    enabled: !!f?.id && !!f?.position && ["QB", "RB", "WR", "TE"].includes(f.position || ""),
    staleTime: 1e3 * 60 * 60
  }), ie = le?.qualifiedSeasons ?? [], ue = le?.allQualified ?? !1, Q = ie.length > 0;
  if (w.useEffect(() => {
    if (!ie.length) return;
    ($ === "all" ? ue : ie.includes($)) || G(Math.max(...ie));
  }, [ie, ue, $]), w.useEffect(() => {
    i("overview"), x(null), k(!1), S.current = null, R({}), E.current = null;
  }, [r]), w.useEffect(() => {
    if (o !== "injury" || !f?.id || !f?.name) return;
    const oe = f.id;
    S.current !== oe && (S.current = oe, j(!0), k(!1), Nk(f.id, f.name).then((pe) => {
      x(pe), j(!1);
    }).catch(() => {
      k(!0), j(!1);
    }));
  }, [o, f?.id, f?.name]), w.useEffect(() => {
    if (o !== "injury" || !f?.id || !y) return;
    const oe = Array.from(
      /* @__PURE__ */ new Set([
        ...y.nfl.map((ye) => ye.season),
        ...f.availableSeasons ?? []
      ])
    ).filter((ye) => Number.isFinite(ye));
    if (oe.length === 0) return;
    const pe = `${f.id}|${oe.slice().sort().join(",")}`;
    if (E.current === pe) return;
    E.current = pe;
    const me = f.id;
    let ve = !1;
    return Promise.all(
      oe.map(
        (ye) => h1(me, ye, "regular").then((be) => {
          const Be = be.filter(
            (ze) => (ze.passAtt || 0) + (ze.rushAtt || 0) + (ze.tgt || 0) + (ze.rec || 0) + (ze.passYd || 0) + (ze.rushYd || 0) + (ze.recYd || 0) > 0
          ).map((ze) => ze.week);
          return [ye, Be];
        }).catch(() => [ye, []])
      )
    ).then((ye) => {
      if (ve) return;
      const be = {};
      for (const [Be, ze] of ye) ze.length && (be[Be] = ze);
      R(be);
    }), () => {
      ve = !0;
    };
  }, [o, f?.id, y, f?.availableSeasons]), w.useEffect(() => {
    if (!f) return;
    document.title = `${f.name} Fantasy Football Stats, Rankings & Analysis | StatChasers`;
    const oe = `View ${f.name} fantasy football stats, trends, rankings, projections, and analysis. Updated for ${f.season} NFL season.`, pe = `https://statchasers.com/nfl/players/${f.slug}/`;
    let me = document.querySelector('meta[name="description"]');
    me || (me = document.createElement("meta"), me.setAttribute("name", "description"), document.head.appendChild(me)), me.setAttribute("content", oe);
    let ve = document.querySelector('link[rel="canonical"]');
    ve || (ve = document.createElement("link"), ve.setAttribute("rel", "canonical"), document.head.appendChild(ve)), ve.setAttribute("href", pe);
    const ye = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: f.name,
      sport: "American Football",
      url: pe
    };
    f.team && f.team !== "FA" && (ye.affiliation = { "@type": "SportsTeam", name: f.team });
    let be = document.getElementById("sc-jsonld");
    return be || (be = document.createElement("script"), be.id = "sc-jsonld", be.setAttribute("type", "application/ld+json"), document.head.appendChild(be)), be.textContent = JSON.stringify(ye), () => {
      document.title = "StatChasers", me?.setAttribute("content", ""), ve?.setAttribute("href", ""), be?.remove();
    };
  }, [f]), p)
    return /* @__PURE__ */ l.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ l.jsx(Ll, {}),
      /* @__PURE__ */ l.jsx(uj, {})
    ] });
  if (m || !f)
    return /* @__PURE__ */ l.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ l.jsx(Ll, {}),
      /* @__PURE__ */ l.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-16 text-center", children: [
        /* @__PURE__ */ l.jsx(u1, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ l.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2", "data-testid": "text-not-found", children: "Player Not Found" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-muted-foreground mb-6", children: "We couldn't find a player with that profile. They may not be in our database." }),
        /* @__PURE__ */ l.jsx(tr, { href: "/nfl/players", children: /* @__PURE__ */ l.jsxs(Dh, { "data-testid": "button-search-again", children: [
          /* @__PURE__ */ l.jsx(Tr, { className: "w-4 h-4 mr-2" }),
          "Search Players"
        ] }) })
      ] })
    ] });
  const D = f.team && xc[f.team] || "#6B7280", J = f.team ? Xl[f.team] || f.team : "Free Agent", M = f.position ? g1[f.position] || f.position : "", U = f, ne = f.gameLog || [], F = f.name.trim().split(/\s+/), Z = F.slice(0, -1).join(" ").toUpperCase(), X = F.slice(-1)[0].toUpperCase();
  f.position;
  const A = (f.bio?.snapshot_bullets ?? []).find((oe) => /^Drafted\b/.test(oe)) ?? null, B = [
    f.age ? `Age ${f.age}` : null,
    f.height ? Pk(f.height) : null,
    f.weight ? `${f.weight} lbs` : null,
    f.years_exp != null ? `Exp ${f.years_exp} yr${f.years_exp !== 1 ? "s" : ""}` : null
  ].filter(Boolean).join("  ·  "), he = Rk(D);
  return /* @__PURE__ */ l.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ l.jsx(Ll, { scoringControl: /* @__PURE__ */ l.jsx(fj, { format: c, onChange: u }) }),
    /* @__PURE__ */ l.jsx(
      "section",
      {
        className: "max-w-7xl mx-auto px-4 pt-4 pb-2",
        "data-testid": "section-player-header",
        children: /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "relative overflow-hidden rounded-2xl border shadow-sm bg-white dark:bg-[#0B1634]",
            style: { borderColor: "rgba(11,58,122,0.10)" },
            children: [
              /* @__PURE__ */ l.jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(135deg, rgba(11,58,122,0.05) 0%, rgba(255,255,255,0) 60%)" } }),
              /* @__PURE__ */ l.jsx("div", { className: "absolute inset-0 hidden dark:block", style: { background: "linear-gradient(135deg, #0B1634 0%, #111D42 40%, #0F172A 100%)" } }),
              /* @__PURE__ */ l.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[3px]", style: { background: `linear-gradient(90deg, transparent 0%, ${D}88 20%, ${D} 50%, ${D}88 80%, transparent 100%)` } }),
              /* @__PURE__ */ l.jsx("div", { className: "relative px-4 sm:px-6 pt-0 pb-1", children: /* @__PURE__ */ l.jsxs(
                "div",
                {
                  className: "player-hero",
                  style: { "--team-color": D, "--team-rgb": he },
                  children: [
                    /* @__PURE__ */ l.jsx(Tk, { playerId: f.id, name: f.name, teamColor: D, team: f.team || void 0 }),
                    /* @__PURE__ */ l.jsxs("div", { className: "player-identity", children: [
                      Z && /* @__PURE__ */ l.jsx("p", { className: "player-first-name", children: Z }),
                      /* @__PURE__ */ l.jsx("h1", { className: "player-last-name", "data-testid": "text-player-name", children: X }),
                      /* @__PURE__ */ l.jsxs("p", { className: "player-team-line", "data-testid": "text-team", children: [
                        J,
                        f.number ? /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                          " · #",
                          f.number
                        ] }) : null,
                        M ? /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                          " · ",
                          M
                        ] }) : null
                      ] }),
                      B && /* @__PURE__ */ l.jsx("p", { className: "player-meta-line", "data-testid": "text-player-meta", children: B }),
                      A && /* @__PURE__ */ l.jsx("p", { className: "player-draft-line", "data-testid": "text-player-drafted", children: A })
                    ] }),
                    f.team && /* @__PURE__ */ l.jsx(
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
    /* @__PURE__ */ l.jsx("div", { className: "border-b", style: { background: "rgba(255,255,255,0.97)", borderColor: "rgba(11,58,122,0.08)" }, children: /* @__PURE__ */ l.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ l.jsx(
      "nav",
      {
        className: "flex gap-0.5 overflow-x-auto -mb-px scrollbar-hide",
        style: { WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" },
        "data-testid": "profile-tabs",
        children: Ek.filter((oe) => oe.key !== "advanced" || Q).map((oe) => {
          const pe = o === oe.key;
          return /* @__PURE__ */ l.jsxs(
            "button",
            {
              onClick: () => i(oe.key),
              className: "relative",
              style: {
                fontWeight: pe ? 700 : 500,
                fontSize: "13px",
                lineHeight: "1.2",
                padding: "14px 18px",
                color: pe ? "#0b3a7a" : "#94a3b8",
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
              onMouseEnter: (me) => {
                pe || (me.currentTarget.style.color = "#0b3a7a");
              },
              onMouseLeave: (me) => {
                pe || (me.currentTarget.style.color = "#94a3b8");
              },
              "data-testid": `tab-${oe.key}`,
              children: [
                oe.label,
                /* @__PURE__ */ l.jsx(
                  "span",
                  {
                    className: "absolute bottom-0 left-1 right-1 sm:left-2 sm:right-2 rounded-full",
                    style: {
                      height: pe ? "3px" : "0px",
                      background: "linear-gradient(90deg, #F5C01A, #FFD166, #F5C01A)",
                      opacity: pe ? 1 : 0,
                      transform: pe ? "scaleX(1)" : "scaleX(0.3)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }
                  }
                )
              ]
            },
            oe.key
          );
        })
      }
    ) }) }),
    /* @__PURE__ */ l.jsxs("main", { className: "max-w-7xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ l.jsxs(
        "div",
        {
          className: "animate-in fade-in duration-300",
          style: { animation: "fadeSlideIn 0.3s ease-out" },
          children: [
            o === "overview" && /* @__PURE__ */ l.jsx(Dk, { player: U, entries: ne, format: c }),
            o === "gamelog" && /* @__PURE__ */ l.jsx(Kk, { player: U, format: c }),
            o === "advanced" && /* @__PURE__ */ l.jsx(
              B1,
              {
                adv: W ?? null,
                advLoading: K,
                pos: f.position || "",
                season: $,
                onSeasonChange: G,
                qualifiedSeasons: ie,
                allSeasonsQualified: ue
              }
            ),
            o === "injury" && /* @__PURE__ */ l.jsx(
              kk,
              {
                injury: y,
                loading: b,
                error: _,
                playerName: f.name,
                knownSeasons: U.availableSeasons ?? [],
                weeklyPlayed: C
              }
            ),
            o === "news" && /* @__PURE__ */ l.jsx(cj, { player: f })
          ]
        },
        o
      ),
      g && g.neighbors && g.neighbors.length > 0 && /* @__PURE__ */ l.jsx(Lk, { player: f, related: g })
    ] })
  ] });
}
const si = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: o,
    className: wt(
      "shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm",
      t
    ),
    ...r
  }
));
si.displayName = "Card";
const pj = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: o,
    className: wt("flex flex-col space-y-1.5 p-6", t),
    ...r
  }
));
pj.displayName = "CardHeader";
const hj = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: o,
    className: wt(
      "text-2xl font-semibold leading-none tracking-tight",
      t
    ),
    ...r
  }
));
hj.displayName = "CardTitle";
const mj = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: o,
    className: wt("text-sm text-muted-foreground", t),
    ...r
  }
));
mj.displayName = "CardDescription";
const oi = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx("div", { ref: o, className: wt("p-6 pt-0", t), ...r }));
oi.displayName = "CardContent";
const gj = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: o,
    className: wt("flex items-center p-6 pt-0", t),
    ...r
  }
));
gj.displayName = "CardFooter";
// @__NO_SIDE_EFFECTS__
function Sp(t) {
  const r = /* @__PURE__ */ yj(t), o = w.forwardRef((i, c) => {
    const { children: u, ...f } = i, p = w.Children.toArray(u), m = p.find(xj);
    if (m) {
      const g = m.props.children, y = p.map((x) => x === m ? w.Children.count(g) > 1 ? w.Children.only(null) : w.isValidElement(g) ? g.props.children : null : x);
      return /* @__PURE__ */ l.jsx(r, { ...f, ref: c, children: w.isValidElement(g) ? w.cloneElement(g, void 0, y) : null });
    }
    return /* @__PURE__ */ l.jsx(r, { ...f, ref: c, children: u });
  });
  return o.displayName = `${t}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function yj(t) {
  const r = w.forwardRef((o, i) => {
    const { children: c, ...u } = o;
    if (w.isValidElement(c)) {
      const f = bj(c), p = wj(u, c.props);
      return c.type !== w.Fragment && (p.ref = i ? wi(i, f) : f), w.cloneElement(c, p);
    }
    return w.Children.count(c) > 1 ? w.Children.only(null) : null;
  });
  return r.displayName = `${t}.SlotClone`, r;
}
var vj = /* @__PURE__ */ Symbol("radix.slottable");
function xj(t) {
  return w.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === vj;
}
function wj(t, r) {
  const o = { ...r };
  for (const i in r) {
    const c = t[i], u = r[i];
    /^on[A-Z]/.test(i) ? c && u ? o[i] = (...p) => {
      const m = u(...p);
      return c(...p), m;
    } : c && (o[i] = c) : i === "style" ? o[i] = { ...c, ...u } : i === "className" && (o[i] = [c, u].filter(Boolean).join(" "));
  }
  return { ...t, ...o };
}
function bj(t) {
  let r = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? t.ref : (r = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
function kj(t) {
  const r = t + "CollectionProvider", [o, i] = Os(r), [c, u] = o(
    r,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), f = (k) => {
    const { scope: S, children: C } = k, R = An.useRef(null), E = An.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ l.jsx(c, { scope: S, itemMap: E, collectionRef: R, children: C });
  };
  f.displayName = r;
  const p = t + "CollectionSlot", m = /* @__PURE__ */ Sp(p), g = An.forwardRef(
    (k, S) => {
      const { scope: C, children: R } = k, E = u(p, C), $ = Qt(S, E.collectionRef);
      return /* @__PURE__ */ l.jsx(m, { ref: $, children: R });
    }
  );
  g.displayName = p;
  const y = t + "CollectionItemSlot", x = "data-radix-collection-item", b = /* @__PURE__ */ Sp(y), j = An.forwardRef(
    (k, S) => {
      const { scope: C, children: R, ...E } = k, $ = An.useRef(null), G = Qt(S, $), Y = u(y, C);
      return An.useEffect(() => (Y.itemMap.set($, { ref: $, ...E }), () => {
        Y.itemMap.delete($);
      })), /* @__PURE__ */ l.jsx(b, { [x]: "", ref: G, children: R });
    }
  );
  j.displayName = y;
  function _(k) {
    const S = u(t + "CollectionConsumer", k);
    return An.useCallback(() => {
      const R = S.collectionRef.current;
      if (!R) return [];
      const E = Array.from(R.querySelectorAll(`[${x}]`));
      return Array.from(S.itemMap.values()).sort(
        (Y, W) => E.indexOf(Y.ref.current) - E.indexOf(W.ref.current)
      );
    }, [S.collectionRef, S.itemMap]);
  }
  return [
    { Provider: f, Slot: g, ItemSlot: j },
    _,
    i
  ];
}
var jj = w.createContext(void 0);
function km(t) {
  const r = w.useContext(jj);
  return t || r || "ltr";
}
var Ml = "rovingFocusGroup.onEntryFocus", Nj = { bubbles: !1, cancelable: !0 }, Fs = "RovingFocusGroup", [Jl, jm, Sj] = kj(Fs), [_j, Nm] = Os(
  Fs,
  [Sj]
), [Cj, Pj] = _j(Fs), Sm = w.forwardRef(
  (t, r) => /* @__PURE__ */ l.jsx(Jl.Provider, { scope: t.__scopeRovingFocusGroup, children: /* @__PURE__ */ l.jsx(Jl.Slot, { scope: t.__scopeRovingFocusGroup, children: /* @__PURE__ */ l.jsx(Ej, { ...t, ref: r }) }) })
);
Sm.displayName = Fs;
var Ej = w.forwardRef((t, r) => {
  const {
    __scopeRovingFocusGroup: o,
    orientation: i,
    loop: c = !1,
    dir: u,
    currentTabStopId: f,
    defaultCurrentTabStopId: p,
    onCurrentTabStopIdChange: m,
    onEntryFocus: g,
    preventScrollOnEntryFocus: y = !1,
    ...x
  } = t, b = w.useRef(null), j = Qt(r, b), _ = km(u), [k, S] = bh({
    prop: f,
    defaultProp: p ?? null,
    onChange: m,
    caller: Fs
  }), [C, R] = w.useState(!1), E = Ms(g), $ = jm(o), G = w.useRef(!1), [Y, W] = w.useState(0);
  return w.useEffect(() => {
    const K = b.current;
    if (K)
      return K.addEventListener(Ml, E), () => K.removeEventListener(Ml, E);
  }, [E]), /* @__PURE__ */ l.jsx(
    Cj,
    {
      scope: o,
      orientation: i,
      dir: _,
      loop: c,
      currentTabStopId: k,
      onItemFocus: w.useCallback(
        (K) => S(K),
        [S]
      ),
      onItemShiftTab: w.useCallback(() => R(!0), []),
      onFocusableItemAdd: w.useCallback(
        () => W((K) => K + 1),
        []
      ),
      onFocusableItemRemove: w.useCallback(
        () => W((K) => K - 1),
        []
      ),
      children: /* @__PURE__ */ l.jsx(
        xt.div,
        {
          tabIndex: C || Y === 0 ? -1 : 0,
          "data-orientation": i,
          ...x,
          ref: j,
          style: { outline: "none", ...t.style },
          onMouseDown: Ge(t.onMouseDown, () => {
            G.current = !0;
          }),
          onFocus: Ge(t.onFocus, (K) => {
            const le = !G.current;
            if (K.target === K.currentTarget && le && !C) {
              const ie = new CustomEvent(Ml, Nj);
              if (K.currentTarget.dispatchEvent(ie), !ie.defaultPrevented) {
                const ue = $().filter((U) => U.focusable), Q = ue.find((U) => U.active), D = ue.find((U) => U.id === k), M = [Q, D, ...ue].filter(
                  Boolean
                ).map((U) => U.ref.current);
                Pm(M, y);
              }
            }
            G.current = !1;
          }),
          onBlur: Ge(t.onBlur, () => R(!1))
        }
      )
    }
  );
}), _m = "RovingFocusGroupItem", Cm = w.forwardRef(
  (t, r) => {
    const {
      __scopeRovingFocusGroup: o,
      focusable: i = !0,
      active: c = !1,
      tabStopId: u,
      children: f,
      ...p
    } = t, m = Zp(), g = u || m, y = Pj(_m, o), x = y.currentTabStopId === g, b = jm(o), { onFocusableItemAdd: j, onFocusableItemRemove: _, currentTabStopId: k } = y;
    return w.useEffect(() => {
      if (i)
        return j(), () => _();
    }, [i, j, _]), /* @__PURE__ */ l.jsx(
      Jl.ItemSlot,
      {
        scope: o,
        id: g,
        focusable: i,
        active: c,
        children: /* @__PURE__ */ l.jsx(
          xt.span,
          {
            tabIndex: x ? 0 : -1,
            "data-orientation": y.orientation,
            ...p,
            ref: r,
            onMouseDown: Ge(t.onMouseDown, (S) => {
              i ? y.onItemFocus(g) : S.preventDefault();
            }),
            onFocus: Ge(t.onFocus, () => y.onItemFocus(g)),
            onKeyDown: Ge(t.onKeyDown, (S) => {
              if (S.key === "Tab" && S.shiftKey) {
                y.onItemShiftTab();
                return;
              }
              if (S.target !== S.currentTarget) return;
              const C = Aj(S, y.orientation, y.dir);
              if (C !== void 0) {
                if (S.metaKey || S.ctrlKey || S.altKey || S.shiftKey) return;
                S.preventDefault();
                let E = b().filter(($) => $.focusable).map(($) => $.ref.current);
                if (C === "last") E.reverse();
                else if (C === "prev" || C === "next") {
                  C === "prev" && E.reverse();
                  const $ = E.indexOf(S.currentTarget);
                  E = y.loop ? Lj(E, $ + 1) : E.slice($ + 1);
                }
                setTimeout(() => Pm(E));
              }
            }),
            children: typeof f == "function" ? f({ isCurrentTabStop: x, hasTabStop: k != null }) : f
          }
        )
      }
    );
  }
);
Cm.displayName = _m;
var Rj = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Tj(t, r) {
  return r !== "rtl" ? t : t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
function Aj(t, r, o) {
  const i = Tj(t.key, o);
  if (!(r === "vertical" && ["ArrowLeft", "ArrowRight"].includes(i)) && !(r === "horizontal" && ["ArrowUp", "ArrowDown"].includes(i)))
    return Rj[i];
}
function Pm(t, r = !1) {
  const o = document.activeElement;
  for (const i of t)
    if (i === o || (i.focus({ preventScroll: r }), document.activeElement !== o)) return;
}
function Lj(t, r) {
  return t.map((o, i) => t[(r + i) % t.length]);
}
var Oj = Sm, Mj = Cm, Ci = "Tabs", [Ij] = Os(Ci, [
  Nm
]), Em = Nm(), [$j, _c] = Ij(Ci), Rm = w.forwardRef(
  (t, r) => {
    const {
      __scopeTabs: o,
      value: i,
      onValueChange: c,
      defaultValue: u,
      orientation: f = "horizontal",
      dir: p,
      activationMode: m = "automatic",
      ...g
    } = t, y = km(p), [x, b] = bh({
      prop: i,
      onChange: c,
      defaultProp: u ?? "",
      caller: Ci
    });
    return /* @__PURE__ */ l.jsx(
      $j,
      {
        scope: o,
        baseId: Zp(),
        value: x,
        onValueChange: b,
        orientation: f,
        dir: y,
        activationMode: m,
        children: /* @__PURE__ */ l.jsx(
          xt.div,
          {
            dir: y,
            "data-orientation": f,
            ...g,
            ref: r
          }
        )
      }
    );
  }
);
Rm.displayName = Ci;
var Tm = "TabsList", Am = w.forwardRef(
  (t, r) => {
    const { __scopeTabs: o, loop: i = !0, ...c } = t, u = _c(Tm, o), f = Em(o);
    return /* @__PURE__ */ l.jsx(
      Oj,
      {
        asChild: !0,
        ...f,
        orientation: u.orientation,
        dir: u.dir,
        loop: i,
        children: /* @__PURE__ */ l.jsx(
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
Am.displayName = Tm;
var Lm = "TabsTrigger", Om = w.forwardRef(
  (t, r) => {
    const { __scopeTabs: o, value: i, disabled: c = !1, ...u } = t, f = _c(Lm, o), p = Em(o), m = $m(f.baseId, i), g = Fm(f.baseId, i), y = i === f.value;
    return /* @__PURE__ */ l.jsx(
      Mj,
      {
        asChild: !0,
        ...p,
        focusable: !c,
        active: y,
        children: /* @__PURE__ */ l.jsx(
          xt.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": y,
            "aria-controls": g,
            "data-state": y ? "active" : "inactive",
            "data-disabled": c ? "" : void 0,
            disabled: c,
            id: m,
            ...u,
            ref: r,
            onMouseDown: Ge(t.onMouseDown, (x) => {
              !c && x.button === 0 && x.ctrlKey === !1 ? f.onValueChange(i) : x.preventDefault();
            }),
            onKeyDown: Ge(t.onKeyDown, (x) => {
              [" ", "Enter"].includes(x.key) && f.onValueChange(i);
            }),
            onFocus: Ge(t.onFocus, () => {
              const x = f.activationMode !== "manual";
              !y && !c && x && f.onValueChange(i);
            })
          }
        )
      }
    );
  }
);
Om.displayName = Lm;
var Mm = "TabsContent", Im = w.forwardRef(
  (t, r) => {
    const { __scopeTabs: o, value: i, forceMount: c, children: u, ...f } = t, p = _c(Mm, o), m = $m(p.baseId, i), g = Fm(p.baseId, i), y = i === p.value, x = w.useRef(y);
    return w.useEffect(() => {
      const b = requestAnimationFrame(() => x.current = !1);
      return () => cancelAnimationFrame(b);
    }, []), /* @__PURE__ */ l.jsx(gc, { present: c || y, children: ({ present: b }) => /* @__PURE__ */ l.jsx(
      xt.div,
      {
        "data-state": y ? "active" : "inactive",
        "data-orientation": p.orientation,
        role: "tabpanel",
        "aria-labelledby": m,
        hidden: !b,
        id: g,
        tabIndex: 0,
        ...f,
        ref: r,
        style: {
          ...t.style,
          animationDuration: x.current ? "0s" : void 0
        },
        children: b && u
      }
    ) });
  }
);
Im.displayName = Mm;
function $m(t, r) {
  return `${t}-trigger-${r}`;
}
function Fm(t, r) {
  return `${t}-content-${r}`;
}
var Fj = Rm, Dm = Am, Bm = Om, zm = Im;
const Dj = Fj, Bj = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  Dm,
  {
    ref: o,
    className: wt(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      t
    ),
    ...r
  }
));
Bj.displayName = Dm.displayName;
const zj = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  Bm,
  {
    ref: o,
    className: wt(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      t
    ),
    ...r
  }
));
zj.displayName = Bm.displayName;
const Um = w.forwardRef(({ className: t, ...r }, o) => /* @__PURE__ */ l.jsx(
  zm,
  {
    ref: o,
    className: wt(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      t
    ),
    ...r
  }
));
Um.displayName = zm.displayName;
const Wm = {
  QB: "sc-pos-pill sc-pos-qb",
  RB: "sc-pos-pill sc-pos-rb",
  WR: "sc-pos-pill sc-pos-wr",
  TE: "sc-pos-pill sc-pos-te",
  K: "sc-pos-pill sc-pos-k",
  DEF: "sc-pos-pill sc-pos-def"
};
function Uj({ playerId: t, position: r, team: o }) {
  const [i, c] = w.useState(!1), u = o ? /* @__PURE__ */ l.jsx(
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
  return i || !t ? /* @__PURE__ */ l.jsxs("div", { className: "relative flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center overflow-visible", children: [
    /* @__PURE__ */ l.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: r || "?" }),
    u
  ] }) : /* @__PURE__ */ l.jsxs("div", { className: "relative flex-shrink-0 w-8 h-8", children: [
    /* @__PURE__ */ l.jsx(
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
const Cc = {
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
}, Pc = {
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
}, Hj = 2025, Hm = {
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
}, Xn = ["QB", "RB", "WR", "TE"], Vj = {
  QB: "Quarterbacks",
  RB: "Running Backs",
  WR: "Wide Receivers",
  TE: "Tight Ends"
};
function Yj(t) {
  for (const [r, o] of Object.entries(Hm))
    for (const [i, c] of Object.entries(o))
      if (c.includes(t)) return `${r} ${i}`;
  return "";
}
function Vm(t, r) {
  const o = (t.status || "").toLowerCase();
  if (/injured reserve|\bir\b|\bpup\b|out|suspend|non[- ]football|did not|inactive|reserve/.test(o))
    return "IR";
  const i = parseInt(r.replace(/[^0-9]/g, "") || "1", 10);
  return i <= 1 ? "Starter" : i === 2 ? "Backup" : "Depth";
}
function ec(t) {
  return `https://sleepercdn.com/images/team_logos/nfl/${t.toLowerCase()}.png`;
}
function Ym(t) {
  return `https://sleepercdn.com/content/nfl/players/thumb/${t}.jpg`;
}
function Qj({
  team: t,
  onClick: r
}) {
  const o = Cc[t] || "#666", i = Pc[t] || t;
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: "sc-team-tile",
      style: { "--tile-color": o },
      onClick: r,
      "data-testid": `tile-team-${t}`,
      children: [
        /* @__PURE__ */ l.jsx("div", { className: "sc-team-tile__accent", style: { backgroundColor: o } }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-team-tile__logo", children: /* @__PURE__ */ l.jsx(
          "img",
          {
            src: ec(t),
            alt: `${t} ${i} logo`,
            loading: "lazy",
            "data-testid": `img-team-logo-${t}`
          }
        ) }),
        /* @__PURE__ */ l.jsxs("div", { className: "sc-team-tile__meta", children: [
          /* @__PURE__ */ l.jsx("div", { className: "sc-team-tile__abbr", "data-testid": `text-team-abbr-${t}`, children: t }),
          /* @__PURE__ */ l.jsx("div", { className: "sc-team-tile__name", "data-testid": `text-team-name-${t}`, children: i })
        ] }),
        /* @__PURE__ */ l.jsx(Wh, { className: "sc-team-tile__arrow" })
      ]
    }
  );
}
function Gj({
  player: t,
  pos: r,
  depthLabel: o,
  onClick: i
}) {
  const c = Vm(t, o), u = c.toLowerCase(), f = t.years_exp === 0;
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      className: `sc-card sc-card--${r.toLowerCase()} sc-card--role-${u}`,
      onClick: i,
      "data-testid": `card-player-${t.slug}`,
      children: [
        /* @__PURE__ */ l.jsxs("div", { className: "sc-card__img", children: [
          /* @__PURE__ */ l.jsx(
            "img",
            {
              src: Ym(t.id),
              alt: t.name,
              loading: "lazy",
              onError: (p) => {
                const m = p.currentTarget;
                m.onerror = null, m.style.display = "none", m.parentElement?.classList.add("sc-card__img--fallback");
              },
              "data-testid": `img-headshot-${t.slug}`
            }
          ),
          /* @__PURE__ */ l.jsx("div", { className: `sc-card__role sc-card__role--${u}`, "data-testid": `card-role-${t.slug}`, children: c }),
          /* @__PURE__ */ l.jsx("div", { className: "sc-card__fallback-initials", children: t.name.split(" ").map((p) => p[0]).join("") })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-card__gold" }),
        /* @__PURE__ */ l.jsxs("div", { className: "sc-card__body", children: [
          /* @__PURE__ */ l.jsx("div", { className: "sc-card__name", "data-testid": `card-name-${t.slug}`, children: t.name }),
          /* @__PURE__ */ l.jsxs("div", { className: "sc-card__meta", children: [
            /* @__PURE__ */ l.jsx("span", { className: Wm[r] || "", "data-testid": `card-depth-${t.slug}`, children: o }),
            /* @__PURE__ */ l.jsx("span", { className: "sc-card__tier", "data-testid": `card-tier-${t.slug}`, children: c }),
            f && /* @__PURE__ */ l.jsx("span", { className: "sc-card__rookie", "data-testid": `card-rookie-${t.slug}`, children: "Rookie" })
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
  const [, i] = ac(), c = Cc[t] || "#666", u = Pc[t] || t, p = `${Wj[t] || ""} ${u}`.trim(), m = Yj(t), g = w.useMemo(() => Xn.map((x) => {
    const b = r[x] || [], j = b.reduce((_, k) => {
      const S = Vm(k, k.rank_label);
      return _[S] = (_[S] || 0) + 1, _;
    }, {});
    return { pos: x, starters: b, roleCounts: j };
  }), [r]), y = g.reduce((x, b) => x + b.starters.length, 0);
  return /* @__PURE__ */ l.jsxs("div", { className: "sc-board sc-directory", "data-testid": "team-board-view", children: [
    /* @__PURE__ */ l.jsx("div", { className: "sc-board__header", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-board__header-inner", children: [
      /* @__PURE__ */ l.jsxs(
        "button",
        {
          type: "button",
          className: "sc-board__back",
          onClick: o,
          "data-testid": "button-back-league",
          children: [
            /* @__PURE__ */ l.jsx(i1, { className: "w-3.5 h-3.5" }),
            "League View"
          ]
        }
      ),
      /* @__PURE__ */ l.jsxs(
        "div",
        {
          className: "sc-teamstrip",
          style: { "--team-color": c },
          "data-testid": "team-context-bar",
          children: [
            /* @__PURE__ */ l.jsx("img", { src: ec(t), alt: "", className: "sc-teamstrip__watermark", "aria-hidden": "true" }),
            /* @__PURE__ */ l.jsxs("div", { className: "sc-teamstrip__main", children: [
              /* @__PURE__ */ l.jsx("img", { src: ec(t), alt: "", className: "sc-teamstrip__logo" }),
              /* @__PURE__ */ l.jsxs("div", { className: "sc-teamstrip__id", children: [
                /* @__PURE__ */ l.jsx("h2", { className: "sc-teamstrip__name", "data-testid": "text-team-board-name", children: p }),
                /* @__PURE__ */ l.jsxs("div", { className: "sc-teamstrip__sub", "data-testid": "text-board-subtitle", children: [
                  /* @__PURE__ */ l.jsxs("span", { className: "sc-teamstrip__board", children: [
                    /* @__PURE__ */ l.jsx(f1, { className: "w-3.5 h-3.5" }),
                    "Fantasy Roster Board"
                  ] }),
                  m && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                    /* @__PURE__ */ l.jsx("span", { className: "sc-teamstrip__dot" }),
                    m
                  ] }),
                  /* @__PURE__ */ l.jsx("span", { className: "sc-teamstrip__dot" }),
                  Hj,
                  " Season",
                  /* @__PURE__ */ l.jsx("span", { className: "sc-teamstrip__dot" }),
                  y,
                  " Fantasy-Relevant Players"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ l.jsx("div", { className: "sc-teamstrip__summary", "data-testid": "roster-summary", children: g.map(({ pos: x, starters: b }) => b.length > 0 && /* @__PURE__ */ l.jsxs("span", { className: `sc-teamstrip__chip sc-teamstrip__chip--${x.toLowerCase()}`, children: [
              /* @__PURE__ */ l.jsx("strong", { children: b.length }),
              " ",
              x
            ] }, x)) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ l.jsx("div", { className: "sc-board__wall", "data-testid": "board-grid", children: g.map(({ pos: x, starters: b, roleCounts: j }) => b.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "sc-board__section", "data-testid": `board-section-${x}`, children: [
      /* @__PURE__ */ l.jsxs("h3", { className: "sc-board__section-title", children: [
        /* @__PURE__ */ l.jsx("span", { className: `sc-board__section-pos sc-board__section-pos--${x.toLowerCase()}`, children: x }),
        /* @__PURE__ */ l.jsxs("span", { className: "sc-board__section-count", children: [
          b.length,
          " ",
          b.length === 1 ? "Player" : "Players"
        ] }),
        ["Starter", "Backup", "Depth", "IR"].filter((_) => j[_]).map((_) => /* @__PURE__ */ l.jsxs("span", { className: "sc-board__section-role", children: [
          /* @__PURE__ */ l.jsx("span", { className: "sc-board__section-roledot" }),
          j[_],
          " ",
          _
        ] }, _))
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: "sc-board__cards", children: b.map((_) => /* @__PURE__ */ l.jsx(
        Gj,
        {
          player: _,
          pos: x,
          depthLabel: _.rank_label,
          onClick: () => i(`/nfl/players/${_.slug}/`)
        },
        _.slug
      )) })
    ] }, x)) })
  ] });
}
function _p() {
  const [t, r] = w.useState(""), [o, i] = w.useState(() => {
    const M = new URLSearchParams(window.location.search).get("pos");
    return M && Xn.includes(M) ? M : "ALL";
  }), [c, u] = w.useState(!1), [f, p] = w.useState(-1), [m, g] = w.useState(() => {
    const M = new URLSearchParams(window.location.search).get("conf");
    return M === "NFC" || M === "AFC" ? M : "AFC";
  }), [y, x] = w.useState(!1), [b, j] = w.useState(null), _ = w.useRef(null), k = w.useRef(null), S = w.useRef(null), C = w.useRef(null), [, R] = ac(), { data: E, isLoading: $ } = Ht({
    queryKey: ["/api/indexed-players"],
    // Drop each team's bench (deep-roster overflow) so only fantasy-relevant
    // players surface anywhere on this page.
    select: (M) => ({ slugs: M.slugs, byTeam: ym(M.byTeam || {}) })
  }), G = t.trim().length > 0 || o !== "ALL", Y = w.useMemo(() => {
    if (!E?.byTeam) return [];
    const M = [];
    for (const U of Object.values(E.byTeam))
      for (const [ne, F] of Object.entries(U))
        Xn.includes(ne) && M.push(...F);
    return M;
  }, [E]), W = w.useMemo(() => {
    const M = {};
    for (const U of Xn)
      M[U] = Y.filter((ne) => ne.position === U).length;
    return M;
  }, [Y]), K = w.useMemo(() => {
    if (!t.trim()) return [];
    const M = t.toLowerCase().trim();
    return Y.filter((U) => U.name.toLowerCase().includes(M) || U.team.toLowerCase().includes(M)).slice(0, 8);
  }, [Y, t]), le = w.useMemo(() => {
    let M = Y;
    if (o !== "ALL" && (M = M.filter((U) => U.position === o)), t.trim()) {
      const U = t.toLowerCase().trim();
      M = M.filter(
        (ne) => ne.name.toLowerCase().includes(U) || ne.team.toLowerCase().includes(U)
      );
    }
    return M = [...M].sort((U, ne) => U.name.localeCompare(ne.name)), M.slice(0, 100);
  }, [Y, t, o]);
  w.useEffect(() => {
    function M(U) {
      _.current && !_.current.contains(U.target) && u(!1);
    }
    return document.addEventListener("mousedown", M), () => document.removeEventListener("mousedown", M);
  }, []), w.useEffect(() => {
    p(-1);
  }, [t]), w.useEffect(() => {
    if (f >= 0 && S.current) {
      const M = S.current.children[f];
      M && M.scrollIntoView({ block: "nearest" });
    }
  }, [f]), w.useEffect(() => {
    function M(U) {
      if (U.key === "/" && !U.ctrlKey && !U.metaKey) {
        const ne = U.target?.tagName;
        ne !== "INPUT" && ne !== "TEXTAREA" && (U.preventDefault(), k.current?.focus());
      }
    }
    return document.addEventListener("keydown", M), () => document.removeEventListener("keydown", M);
  }, []), w.useEffect(() => {
    const M = new IntersectionObserver(
      ([U]) => {
        x(!U.isIntersecting);
      },
      { threshold: 0 }
    );
    return C.current && M.observe(C.current), () => M.disconnect();
  }, []);
  const ie = w.useCallback(
    (M) => {
      if (!(!c || K.length === 0))
        if (M.key === "ArrowDown")
          M.preventDefault(), p(
            (U) => U < K.length - 1 ? U + 1 : 0
          );
        else if (M.key === "ArrowUp")
          M.preventDefault(), p(
            (U) => U > 0 ? U - 1 : K.length - 1
          );
        else if (M.key === "Enter" && f >= 0) {
          M.preventDefault();
          const U = K[f];
          u(!1), R(`/nfl/players/${U.slug}/`);
        } else M.key === "Escape" && u(!1);
    },
    [c, K, f, R]
  ), ue = w.useMemo(
    () => Xn.reduce((M, U) => M + (W[U] || 0), 0),
    [W]
  ), Q = o !== "ALL" && Vj[o] || "Players", D = le.length === 100, J = t.trim() ? `Matching “${t.trim()}”${o !== "ALL" ? ` · ${Q}` : ""}` : o !== "ALL" ? `Showing ${Q.toLowerCase()} only` : "All fantasy-relevant players";
  return /* @__PURE__ */ l.jsxs("div", { className: "min-h-screen bg-background", children: [
    y && !G && /* @__PURE__ */ l.jsx("div", { className: "sc-sticky-bar", "data-testid": "sticky-filter-bar", children: /* @__PURE__ */ l.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-2 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
        /* @__PURE__ */ l.jsx(Tr, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ l.jsx(
          gi,
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
      /* @__PURE__ */ l.jsx("div", { className: "flex items-center gap-1 flex-wrap", children: Xn.map((M) => /* @__PURE__ */ l.jsxs(
        "button",
        {
          type: "button",
          className: `sc-filter-pill ${o === M ? "sc-filter-pill--active" : ""}`,
          onClick: () => i(o === M ? "ALL" : M),
          "data-testid": `button-sticky-filter-${M}`,
          children: [
            M,
            W[M] ? /* @__PURE__ */ l.jsx("span", { className: "sc-filter-pill__count", children: W[M] }) : null
          ]
        },
        M
      )) })
    ] }) }),
    /* @__PURE__ */ l.jsx(
      "div",
      {
        ref: C,
        className: "sc-header",
        "data-testid": "hero-section",
        children: /* @__PURE__ */ l.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ l.jsxs("div", { className: "sc-controlbar", ref: _, children: [
          /* @__PURE__ */ l.jsxs("div", { className: "sc-controlbar__top", children: [
            /* @__PURE__ */ l.jsxs("div", { className: "sc-controlbar__search relative group", children: [
              /* @__PURE__ */ l.jsx(Tr, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sc-search__icon z-10" }),
              /* @__PURE__ */ l.jsx(
                gi,
                {
                  ref: k,
                  type: "search",
                  placeholder: "Search any player...",
                  value: t,
                  onChange: (M) => {
                    r(M.target.value), u(!0);
                  },
                  onFocus: () => {
                    t.trim() && u(!0);
                  },
                  onKeyDown: ie,
                  className: "sc-search",
                  autoComplete: "off",
                  role: "combobox",
                  "aria-expanded": c && K.length > 0,
                  "aria-controls": "autocomplete-list",
                  "aria-activedescendant": f >= 0 ? `autocomplete-item-${f}` : void 0,
                  "data-testid": "input-player-search"
                }
              ),
              /* @__PURE__ */ l.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5", children: /* @__PURE__ */ l.jsxs("kbd", { className: "sc-search__kbd", children: [
                /* @__PURE__ */ l.jsx(Hh, { className: "w-2.5 h-2.5" }),
                "/"
              ] }) }),
              c && t.trim() && K.length > 0 && /* @__PURE__ */ l.jsx(
                "div",
                {
                  id: "autocomplete-list",
                  ref: S,
                  role: "listbox",
                  className: "absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto",
                  "data-testid": "autocomplete-dropdown",
                  children: K.map((M, U) => /* @__PURE__ */ l.jsx(tr, { href: `/nfl/players/${M.slug}/`, children: /* @__PURE__ */ l.jsxs(
                    "div",
                    {
                      id: `autocomplete-item-${U}`,
                      role: "option",
                      "aria-selected": U === f,
                      className: `flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${U === f ? "bg-muted" : "hover:bg-muted/50"}`,
                      onMouseEnter: () => p(U),
                      onClick: () => u(!1),
                      "data-testid": `autocomplete-item-${M.slug}`,
                      children: [
                        /* @__PURE__ */ l.jsx(Uj, { playerId: M.id, position: M.position || "", team: M.team || "" }),
                        /* @__PURE__ */ l.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ l.jsx("span", { className: "font-medium text-sm text-foreground truncate block", children: M.name }),
                          /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                            /* @__PURE__ */ l.jsx("span", { className: Wm[M.position || ""] || "", children: M.position }),
                            /* @__PURE__ */ l.jsx("span", { className: "text-xs text-muted-foreground", children: M.team })
                          ] })
                        ] }),
                        /* @__PURE__ */ l.jsx(Yh, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
                      ]
                    }
                  ) }, M.id))
                }
              )
            ] }),
            E?.byTeam && /* @__PURE__ */ l.jsxs("div", { className: "sc-stat-card", "data-testid": "badge-player-count", children: [
              /* @__PURE__ */ l.jsx(zh, { className: "w-4 h-4 sc-header__gold-icon" }),
              /* @__PURE__ */ l.jsxs("div", { children: [
                /* @__PURE__ */ l.jsx("p", { className: "sc-stat-card__number", children: ue }),
                /* @__PURE__ */ l.jsx("p", { className: "sc-stat-card__label", children: "Fantasy Starters" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ l.jsxs("div", { className: "sc-controlbar__bottom", children: [
            /* @__PURE__ */ l.jsxs("div", { className: "sc-controlbar__filters", children: [
              Xn.map((M) => /* @__PURE__ */ l.jsxs(
                "button",
                {
                  type: "button",
                  className: `sc-filter-pill ${o === M ? "sc-filter-pill--active" : ""}`,
                  onClick: () => i(o === M ? "ALL" : M),
                  "data-testid": `button-filter-${M}`,
                  children: [
                    M,
                    W[M] ? /* @__PURE__ */ l.jsx("span", { className: "sc-filter-pill__count", children: W[M] }) : null
                  ]
                },
                M
              )),
              (o !== "ALL" || t.trim()) && /* @__PURE__ */ l.jsxs(
                "button",
                {
                  type: "button",
                  className: "sc-clear-btn",
                  onClick: () => {
                    i("ALL"), r("");
                  },
                  "data-testid": "button-clear-filter",
                  children: [
                    /* @__PURE__ */ l.jsx(d1, { className: "w-3 h-3" }),
                    "Clear Filters"
                  ]
                }
              )
            ] }),
            E?.byTeam && /* @__PURE__ */ l.jsx("div", { className: "sc-segment", role: "group", "aria-label": "Conference filter", "data-testid": "tabs-conference", children: ["AFC", "NFC"].map((M) => /* @__PURE__ */ l.jsx(
              "button",
              {
                type: "button",
                className: `sc-segment__btn ${m === M ? "sc-segment__btn--active" : ""}`,
                onClick: () => {
                  g(M), j(null), i("ALL"), r("");
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
    /* @__PURE__ */ l.jsx("main", { className: b ? "" : "max-w-7xl mx-auto px-8 sm:px-10 py-8", children: G ? $ ? /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 12 }).map((M, U) => /* @__PURE__ */ l.jsx(si, { children: /* @__PURE__ */ l.jsx(oi, { className: "p-5", children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ l.jsx(je, { className: "w-10 h-10 rounded-md" }),
      /* @__PURE__ */ l.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ l.jsx(je, { className: "h-4 w-32 mb-2" }),
        /* @__PURE__ */ l.jsx(je, { className: "h-3 w-20" })
      ] })
    ] }) }) }, U)) }) : /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      le.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "sc-results-toolbar", "data-testid": "results-toolbar", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ l.jsxs("div", { className: "sc-results-toolbar__count", "data-testid": "text-results-count", children: [
            le.length,
            D ? "+" : "",
            " ",
            /* @__PURE__ */ l.jsx("span", { className: "sc-results-toolbar__noun", children: Q })
          ] }),
          /* @__PURE__ */ l.jsxs("div", { className: "sc-results-toolbar__sub", children: [
            J,
            D ? " · top 100 shown" : ""
          ] })
        ] }),
        /* @__PURE__ */ l.jsx("div", { className: "sc-results-toolbar__right", children: /* @__PURE__ */ l.jsxs("span", { className: "sc-results-sort", "data-testid": "results-sort", children: [
          /* @__PURE__ */ l.jsx(o1, { className: "w-3.5 h-3.5" }),
          "Sorted A–Z"
        ] }) })
      ] }),
      le.length === 0 ? /* @__PURE__ */ l.jsx(si, { children: /* @__PURE__ */ l.jsxs(oi, { className: "py-12 text-center", children: [
        /* @__PURE__ */ l.jsx(Tr, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-muted-foreground font-medium", children: "No players found" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your search or filter" })
      ] }) }) : /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3", children: le.map((M) => {
        const U = M.position || "", ne = "rank_label" in M ? M.rank_label : U, F = Cc[M.team] || "#64748b", Z = Pc[M.team] || M.team, X = parseInt(ne.replace(/[^0-9]/g, "") || "0", 10), A = X === 1 ? "t1" : X === 2 ? "t2" : X >= 3 ? "t3" : "t0";
        return /* @__PURE__ */ l.jsx(tr, { href: `/nfl/players/${M.slug}/`, children: /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: `sc-result-card sc-result-card--${U.toLowerCase()}`,
            style: { "--team-color": F },
            "data-testid": `card-player-${M.slug}`,
            children: [
              /* @__PURE__ */ l.jsxs("div", { className: "sc-result-card__img", children: [
                /* @__PURE__ */ l.jsx(
                  "img",
                  {
                    src: Ym(M.id),
                    alt: M.name,
                    loading: "lazy",
                    onError: (B) => {
                      const he = B.currentTarget;
                      he.onerror = null, he.style.display = "none", he.parentElement?.classList.add("sc-result-card__img--fallback");
                    }
                  }
                ),
                /* @__PURE__ */ l.jsx("div", { className: "sc-result-card__initials", children: M.name.split(" ").map((B) => B[0]).join("") }),
                ne && /* @__PURE__ */ l.jsx("span", { className: `sc-rank-badge sc-rank-badge--${A}`, "data-testid": `badge-rank-${M.slug}`, children: ne })
              ] }),
              /* @__PURE__ */ l.jsx("div", { className: "sc-result-card__accent" }),
              /* @__PURE__ */ l.jsxs("div", { className: "sc-result-card__body", children: [
                /* @__PURE__ */ l.jsx("div", { className: "sc-result-card__name", "data-testid": `text-player-name-${M.slug}`, children: M.name }),
                /* @__PURE__ */ l.jsx("div", { className: "sc-result-card__meta", children: /* @__PURE__ */ l.jsxs("span", { className: "sc-result-card__team", children: [
                  /* @__PURE__ */ l.jsx("span", { className: "sc-team-dot" }),
                  /* @__PURE__ */ l.jsx("span", { className: "sc-result-card__team-abbr", children: M.team }),
                  /* @__PURE__ */ l.jsx("span", { className: "sc-result-card__team-name", children: Z })
                ] }) })
              ] })
            ]
          }
        ) }, M.id);
      }) })
    ] }) : $ ? /* @__PURE__ */ l.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ l.jsx(je, { className: "h-10 w-64 mx-auto" }),
      Array.from({ length: 2 }).map((M, U) => /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx(je, { className: "h-6 w-32 mb-3" }),
        /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((ne, F) => /* @__PURE__ */ l.jsx(si, { children: /* @__PURE__ */ l.jsxs(oi, { className: "p-5", children: [
          /* @__PURE__ */ l.jsx(je, { className: "h-5 w-12 mb-3" }),
          /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: Array.from({ length: 6 }).map((Z, X) => /* @__PURE__ */ l.jsx(je, { className: "h-4 w-full" }, X)) })
        ] }) }, F)) })
      ] }, U))
    ] }) : E && E.byTeam ? b && E.byTeam[b] ? /* @__PURE__ */ l.jsx(
      Kj,
      {
        team: b,
        positions: E.byTeam[b],
        onBack: () => j(null)
      }
    ) : /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(Dj, { defaultValue: "AFC", value: m, onValueChange: g, children: ["AFC", "NFC"].map((M) => /* @__PURE__ */ l.jsx(Um, { value: M, children: /* @__PURE__ */ l.jsx("div", { className: "space-y-8", children: Object.entries(Hm[M]).map(([U, ne]) => /* @__PURE__ */ l.jsxs("div", { children: [
      /* @__PURE__ */ l.jsxs(
        "h2",
        {
          className: "sc-division-heading",
          "data-testid": `text-division-${M.toLowerCase()}-${U.toLowerCase()}`,
          children: [
            M,
            " ",
            U,
            /* @__PURE__ */ l.jsx("div", { className: "flex-1 h-px bg-amber-400/30 ml-2" })
          ]
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4", children: ne.map((F) => E.byTeam[F] ? /* @__PURE__ */ l.jsx(
        Qj,
        {
          team: F,
          onClick: () => j(F)
        },
        F
      ) : null) })
    ] }, U)) }) }, M)) }) }) : null })
  ] });
}
const Ts = window.scPlayersConfig || {}, on = (Ts.restBase || "/wp-json/statchasers/v1").replace(/\/+$/, "");
function qj(t) {
  try {
    const r = new URL(t, window.location.origin), o = r.pathname, i = r.searchParams;
    if (o === "/api/players" || o === "/api/players/") {
      const b = i.get("q") || "";
      return `${on}/players?q=${encodeURIComponent(b)}`;
    }
    if (o === "/api/indexed-players" || o === "/api/indexed-players/")
      return `${on}/indexed-players`;
    const c = o.match(/^\/api\/players\/([^/]+)\/?$/);
    if (c) {
      const b = c[1], j = i.get("format") || "ppr", _ = i.get("season") || "";
      let k = `${on}/player/${encodeURIComponent(b)}?format=${j}`;
      return _ && (k += `&season=${_}`), k;
    }
    const u = o.match(/^\/api\/players\/([^/]+)\/game-log\/?$/);
    if (u) {
      const b = u[1], j = i.get("season") || "", _ = i.get("format") || "ppr";
      let k = `${on}/player/${encodeURIComponent(b)}/game-log?format=${_}`;
      return j && (k += `&season=${j}`), k;
    }
    const f = o.match(/^\/api\/players\/([^/]+)\/related\/?$/);
    if (f) {
      const b = f[1], j = i.get("format") || "ppr", _ = i.get("season") || "";
      let k = `${on}/player/${encodeURIComponent(b)}/related?format=${j}`;
      return _ && (k += `&season=${_}`), k;
    }
    if (o.match(/^\/api\/players\/([^/]+)\/news\/?$/))
      return "data:application/json,[]";
    const m = o.match(/^\/api\/players\/([^/]+)\/injuries\/?$/);
    if (m) {
      const b = m[1], j = i.get("name") || "";
      return `${on}/player/${encodeURIComponent(b)}/injuries?name=${encodeURIComponent(j)}`;
    }
    const g = o.match(/^\/api\/advanced-stats\/([a-zA-Z]+)\/([a-zA-Z0-9]+)\/?$/);
    if (g)
      return `${on}/advanced-stats/${g[1].toLowerCase()}/${g[2].toLowerCase()}`;
    const y = o.match(/^\/api\/players\/([^/]+)\/production\/?$/);
    if (y) {
      const b = y[1], j = i.get("scoring") || "ppr";
      return `${on}/player/${encodeURIComponent(b)}/production?scoring=${encodeURIComponent(j)}`;
    }
    if (o === "/api/team/injury" || o === "/api/team/injury/") {
      const b = i.get("team") || "", j = i.get("player_name") || "", _ = i.get("week_label") || "";
      let k = `${on}/team/injury?team=${encodeURIComponent(b)}&player_name=${encodeURIComponent(j)}`;
      return _ && (k += `&week_label=${encodeURIComponent(_)}`), k;
    }
  } catch {
  }
  return t;
}
function ii(t) {
  return t.startsWith("/api/") ? qj(t) : t;
}
const Qm = window.fetch.bind(window);
window.fetch = function(t, r) {
  if (typeof t == "string")
    t = ii(t);
  else if (t instanceof Request) {
    const o = t.url, i = window.location.origin, c = o.startsWith(i) ? o.slice(i.length) : o;
    if (c.startsWith("/api/")) {
      const u = ii(c);
      t = new Request(u, t);
    }
  } else t instanceof URL && t.pathname.startsWith("/api/") && (t = ii(t.pathname + t.search));
  return Qm(t, r);
};
const Xj = async ({ queryKey: t }) => {
  const r = t.join("/"), o = ii(r), i = await Qm(o);
  if (!i.ok) {
    const c = await i.text() || i.statusText;
    throw new Error(`${i.status}: ${c}`);
  }
  return i.json();
}, Ec = new jv({
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
}), Zj = () => [window.location.pathname, (r) => {
  window.location.href = r;
}];
Ts.preloadedIndexed && Ec.setQueryData(["/api/indexed-players"], Ts.preloadedIndexed);
Ts.preloadedPlayers && Ec.setQueryData(["/api/players"], Ts.preloadedPlayers);
const Il = document.querySelector(".scpp-root");
Il && (Il.innerHTML = "", Jy.createRoot(Il).render(
  /* @__PURE__ */ l.jsx(Sv, { client: Ec, children: /* @__PURE__ */ l.jsx(Ww, { children: /* @__PURE__ */ l.jsx(Qp, { hook: Zj, children: /* @__PURE__ */ l.jsxs(n0, { children: [
    /* @__PURE__ */ l.jsx(Xo, { path: "/nfl/players/:slug", component: Np }),
    /* @__PURE__ */ l.jsx(Xo, { path: "/nfl/players/:slug/", component: Np }),
    /* @__PURE__ */ l.jsx(Xo, { path: "/nfl/players", component: _p }),
    /* @__PURE__ */ l.jsx(Xo, { path: "/nfl/players/", component: _p })
  ] }) }) }) })
));
