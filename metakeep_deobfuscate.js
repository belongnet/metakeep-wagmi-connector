var a = {
  458: (a, b) => {
    ;(function (b) {
      var d
      var g
      var h
      var j = String.fromCharCode
      function k(a) {
        for (var b, c, d = [], f = 0, g = a.length; f < g; ) {
          if ((b = a.charCodeAt(f++)) >= 55296 && b <= 56319 && f < g) {
            if (((c = a.charCodeAt(f++)) & 64512) == 56320) {
              d.push(((b & 1023) << 10) + (c & 1023) + 65536)
            } else {
              d.push(b)
              f--
            }
          } else {
            d.push(b)
          }
        }
        return d
      }
      function i(a) {
        if (a >= 55296 && a <= 57343) {
          throw Error(
            'Lone surrogate U+' +
              a.toString(16).toUpperCase() +
              ' is not a scalar value'
          )
        }
      }
      function a(a, b) {
        return j(((a >> b) & 63) | 128)
      }
      function c(b) {
        if ((b & 4294967168) == 0) {
          return j(b)
        }
        var c = ''
        if ((b & 4294965248) == 0) {
          c = j(((b >> 6) & 31) | 192)
        } else if ((b & 4294901760) == 0) {
          i(b)
          c = j(((b >> 12) & 15) | 224)
          c += a(b, 6)
        } else if ((b & 4292870144) == 0) {
          c = j(((b >> 18) & 7) | 240)
          c += a(b, 12)
          c += a(b, 6)
        }
        return c + j((b & 63) | 128)
      }
      function l() {
        if (h >= g) {
          throw Error('Invalid byte index')
        }
        var a = d[h] & 255
        h++
        if ((a & 192) == 128) {
          return a & 63
        }
        throw Error('Invalid continuation byte')
      }
      function m() {
        var a
        var b
        if (h > g) {
          throw Error('Invalid byte index')
        }
        if (h == g) {
          return false
        }
        a = d[h] & 255
        h++
        if ((a & 128) == 0) {
          return a
        }
        if ((a & 224) == 192) {
          if ((b = ((a & 31) << 6) | l()) >= 128) {
            return b
          }
          throw Error('Invalid continuation byte')
        }
        if ((a & 240) == 224) {
          if ((b = ((a & 15) << 12) | (l() << 6) | l()) >= 2048) {
            i(b)
            return b
          }
          throw Error('Invalid continuation byte')
        }
        if (
          (a & 248) == 240 &&
          (b = ((a & 7) << 18) | (l() << 12) | (l() << 6) | l()) >= 65536 &&
          b <= 1114111
        ) {
          return b
        }
        throw Error('Invalid UTF-8 detected')
      }
      b.version = '3.0.0'
      b.encode = function (a) {
        var b = k(a)
        for (var d = b.length, e = -1, f = ''; ++e < d; ) {
          f += c(b[e])
        }
        return f
      }
      b.decode = function (b) {
        d = k(b)
        g = d.length
        h = 0
        for (var e, f = []; (e = m()) !== false; ) {
          f.push(e)
        }
        return (function (a) {
          for (var b, c = a.length, d = -1, f = ''; ++d < c; ) {
            if ((b = a[d]) > 65535) {
              f += j((((b -= 65536) >>> 10) & 1023) | 55296)
              b = (b & 1023) | 56320
            }
            f += j(b)
          }
          return f
        })(f)
      }
    })(b)
  },
}
var b = {}
function aa(c) {
  var d = b[c]
  if (d !== undefined) {
    return d.exports
  }
  var e = (b[c] = {
    exports: {},
  })
  a[c](e, e.exports, aa)
  return e.exports
}
aa.n = (a) => {
  var b = a && a.__esModule ? () => a.default : () => a
  aa.d(b, {
    a: b,
  })
  return b
}
aa.d = (a, b) => {
  for (var c in b) {
    if (aa.o(b, c) && !aa.o(a, c)) {
      Object.defineProperty(a, c, {
        enumerable: true,
        get: b[c],
      })
    }
  }
}
aa.o = (a, b) => Object.prototype.hasOwnProperty.call(a, b)
aa.r = (a) => {
  if (typeof Symbol != 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(a, Symbol.toStringTag, {
      value: 'Module',
    })
  }
  Object.defineProperty(a, '__esModule', {
    value: true,
  })
}

var r = {}

;(() => {
  'use strict'

  aa.r(r)
  aa.d(r, {
    MetaKeep: () => Ia,
  })
  var n = {
    dublin: 'https://auth.dublin.metakeep.xyz',
    prod: 'https://auth.metakeep.xyz',
    dev: 'https://auth.dev.metakeep.xyz',
    local: 'http://localhost:3000',
  }
  var ba = Object.freeze({
    SIGN_TRANSACTION: 'SIGN_TRANSACTION',
    SIGN_TYPED_DATA: 'SIGN_TYPED_DATA',
    SIGN_MESSAGE: 'SIGN_MESSAGE',
  })
  var e = Object.freeze({
    SUCCESS: 'Success',
    ERROR: 'Error',
    SIGN_REQUEST: 'SIGN_REQUEST',
    MESSAGE: 'message',
    CLOSE_FRAME: 'CLOSE_FRAME',
    SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
    SDK_MESSAGE: 'SDK_MESSAGE',
    FRAME_READY: 'FRAME_READY',
    MAKE_FRAME_VISIBLE: 'MAKE_FRAME_VISIBLE',
  })
  var ca = e.SUCCESS
  var i = e.ERROR
  e.SIGN_REQUEST
  var a = e.MESSAGE
  var c = e.CLOSE_FRAME
  e.SIGN_IN_REQUEST
  var o = e.SDK_MESSAGE
  var s = e.FRAME_READY
  var u = e.MAKE_FRAME_VISIBLE
  var f = 'CONSENT'
  var h = 'PREFETCH'
  function l(a) {
    var b = document.createElement('iframe')
    b.setAttribute('id', 'metakeep-iframe')
    b.setAttribute('src', a)
    return b
  }
  function p(a) {
    if (!document.getElementById('metakeep-iframe-style')) {
      var b = document.head || document.getElementsByTagName('head')[0]
      var c = document.createElement('style')
      c.setAttribute('id', 'metakeep-iframe-style')
      c.textContent =
        '#metakeep-iframe {width:0;height:0;position:fixed;top:0;left:0;border:none;z-index:99999;};'
      b.appendChild(c)
    }
    document.body.appendChild(a)
  }
  function v(a, b, c = undefined) {
    if (c === undefined) c = window
    function d(e) {
      b(e, function () {
        return c.removeEventListener(a, d)
      })
    }
    c.addEventListener(a, d)
  }
  var d = aa(458)
  var g = aa.n(d)
  function m(a) {
    m =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (a) {
            return typeof a
          }
        : function (a) {
            if (
              a &&
              typeof Symbol == 'function' &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
            ) {
              return 'symbol'
            } else {
              return typeof a
            }
          }
    return m(a)
  }
  function da() {
    da = function () {
      return b
    }
    var b = {}
    var q = Object.prototype
    var w = q.hasOwnProperty
    var z =
      Object.defineProperty ||
      function (a, b, c) {
        a[b] = c.value
      }
    var e = typeof Symbol == 'function' ? Symbol : {}
    var r = e.iterator || '@@iterator'
    var i = e.asyncIterator || '@@asyncIterator'
    var a = e.toStringTag || '@@toStringTag'
    function c(a, b, c) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return a[b]
    }
    try {
      c({}, '')
    } catch (a) {
      c = function (a, b, c) {
        return (a[b] = c)
      }
    }
    function t(b, d, e, f) {
      var g = d && d.prototype instanceof l ? d : l
      var h = Object.create(g.prototype)
      var a = new D(f || [])
      z(h, '_invoke', {
        value: x(b, e, a),
      })
      return h
    }
    function A(a, b, c) {
      try {
        return {
          type: 'normal',
          arg: a.call(b, c),
        }
      } catch (a) {
        return {
          type: 'throw',
          arg: a,
        }
      }
    }
    b.wrap = t
    var f = {}
    function l() {}
    function h() {}
    function n() {}
    var o = {}
    c(o, r, function () {
      return this
    })
    var p = Object.getPrototypeOf
    var d = p && p(p(E([])))
    if (d && d !== q && w.call(d, r)) {
      o = d
    }
    var g = (n.prototype = l.prototype = Object.create(o))
    function s(a) {
      ;['next', 'throw', 'return'].forEach(function (b) {
        c(a, b, function (a) {
          return this._invoke(b, a)
        })
      })
    }
    function v(b, d) {
      function f(e, g, h, a) {
        var c = A(b[e], b, g)
        if (c.type !== 'throw') {
          var i = c.arg
          var j = i.value
          if (j && m(j) == 'object' && w.call(j, '__await')) {
            return d.resolve(j.__await).then(
              function (b) {
                f('next', b, h, a)
              },
              function (b) {
                f('throw', b, h, a)
              }
            )
          } else {
            return d.resolve(j).then(
              function (a) {
                i.value = a
                h(i)
              },
              function (b) {
                return f('throw', b, h, a)
              }
            )
          }
        }
        a(c.arg)
      }
      var a
      z(this, '_invoke', {
        value: function (b, c) {
          function e() {
            return new d(function (a, d) {
              f(b, c, a, d)
            })
          }
          return (a = a ? a.then(e, e) : e())
        },
      })
    }
    function x(b, d, e) {
      var g = 'suspendedStart'
      return function (h, j) {
        if (g === 'executing') {
          throw new Error('Generator is already running')
        }
        if (g === 'completed') {
          if (h === 'throw') {
            throw j
          }
          return {
            value: undefined,
            done: true,
          }
        }
        e.method = h
        e.arg = j
        while (true) {
          var i = e.delegate
          if (i) {
            var k = B(i, e)
            if (k) {
              if (k === f) {
                continue
              }
              return k
            }
          }
          if (e.method === 'next') {
            e.sent = e._sent = e.arg
          } else if (e.method === 'throw') {
            if (g === 'suspendedStart') {
              g = 'completed'
              throw e.arg
            }
            e.dispatchException(e.arg)
          } else if (e.method === 'return') {
            e.abrupt('return', e.arg)
          }
          g = 'executing'
          var l = A(b, d, e)
          if (l.type === 'normal') {
            g = e.done ? 'completed' : 'suspendedYield'
            if (l.arg === f) {
              continue
            }
            return {
              value: l.arg,
              done: e.done,
            }
          }
          if (l.type === 'throw') {
            g = 'completed'
            e.method = 'throw'
            e.arg = l.arg
          }
        }
      }
    }
    function B(a, b) {
      var c = b.method
      var d = a.iterator[c]
      if (d === undefined) {
        b.delegate = null
        if (
          c !== 'throw' ||
          !a.iterator.return ||
          !((b.method = 'return'),
          (b.arg = undefined),
          B(a, b),
          b.method === 'throw')
        ) {
          if (c !== 'return') {
            b.method = 'throw'
            b.arg = new TypeError(
              "The iterator does not provide a '" + c + "' method"
            )
          }
        }
        return f
      }
      var e = A(d, a.iterator, b.arg)
      if (e.type === 'throw') {
        b.method = 'throw'
        b.arg = e.arg
        b.delegate = null
        return f
      }
      var g = e.arg
      if (g) {
        if (g.done) {
          b[a.resultName] = g.value
          b.next = a.nextLoc
          if (b.method !== 'return') {
            b.method = 'next'
            b.arg = undefined
          }
          b.delegate = null
          return f
        } else {
          return g
        }
      } else {
        b.method = 'throw'
        b.arg = new TypeError('iterator result is not an object')
        b.delegate = null
        return f
      }
    }
    function C(a) {
      var b = {
        tryLoc: a[0],
      }
      if (1 in a) {
        b.catchLoc = a[1]
      }
      if (2 in a) {
        b.finallyLoc = a[2]
        b.afterLoc = a[3]
      }
      this.tryEntries.push(b)
    }
    function j(a) {
      var b = a.completion || {}
      b.type = 'normal'
      delete b.arg
      a.completion = b
    }
    function D(a) {
      this.tryEntries = [
        {
          tryLoc: 'root',
        },
      ]
      a.forEach(C, this)
      this.reset(true)
    }
    function E(a) {
      if (a) {
        var b = a[r]
        if (b) {
          return b.call(a)
        }
        if (typeof a.next == 'function') {
          return a
        }
        if (!isNaN(a.length)) {
          var c = -1
          var d = function b() {
            while (++c < a.length) {
              if (w.call(a, c)) {
                b.value = a[c]
                b.done = false
                return b
              }
            }
            b.value = undefined
            b.done = true
            return b
          }
          return (d.next = d)
        }
      }
      return {
        next: F,
      }
    }
    function F() {
      return {
        value: undefined,
        done: true,
      }
    }
    h.prototype = n
    z(g, 'constructor', {
      value: n,
      configurable: true,
    })
    z(n, 'constructor', {
      value: h,
      configurable: true,
    })
    h.displayName = c(n, a, 'GeneratorFunction')
    b.isGeneratorFunction = function (a) {
      var b = typeof a == 'function' && a.constructor
      return (
        !!b && (b === h || (b.displayName || b.name) === 'GeneratorFunction')
      )
    }
    b.mark = function (b) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(b, n)
      } else {
        b.__proto__ = n
        c(b, a, 'GeneratorFunction')
      }
      b.prototype = Object.create(g)
      return b
    }
    b.awrap = function (a) {
      return {
        __await: a,
      }
    }
    s(v.prototype)
    c(v.prototype, i, function () {
      return this
    })
    b.AsyncIterator = v
    b.async = function (c, d, e, f, g = undefined) {
      if (g === undefined) g = Promise
      var h = new v(t(c, d, e, f), g)
      if (b.isGeneratorFunction(d)) {
        return h
      } else {
        return h.next().then(function (a) {
          if (a.done) {
            return a.value
          } else {
            return h.next()
          }
        })
      }
    }
    s(g)
    c(g, a, 'Generator')
    c(g, r, function () {
      return this
    })
    c(g, 'toString', function () {
      return '[object Generator]'
    })
    b.keys = function (a) {
      var b = Object(a)
      var c = []
      for (var d in b) {
        c.push(d)
      }
      c.reverse()
      return function a() {
        while (c.length) {
          var d = c.pop()
          if (d in b) {
            a.value = d
            a.done = false
            return a
          }
        }
        a.done = true
        return a
      }
    }
    b.values = E
    D.prototype = {
      constructor: D,
      reset: function (a) {
        this.prev = 0
        this.next = 0
        this.sent = this._sent = undefined
        this.done = false
        this.delegate = null
        this.method = 'next'
        this.arg = undefined
        this.tryEntries.forEach(j)
        if (!a) {
          for (var b in this) {
            if (b.charAt(0) === 't' && w.call(this, b) && !isNaN(+b.slice(1))) {
              this[b] = undefined
            }
          }
        }
      },
      stop: function () {
        this.done = true
        var a = this.tryEntries[0].completion
        if (a.type === 'throw') {
          throw a.arg
        }
        return this.rval
      },
      dispatchException: function (b) {
        if (this.done) {
          throw b
        }
        var d = this
        function e(a, c) {
          h.type = 'throw'
          h.arg = b
          d.next = a
          if (c) {
            d.method = 'next'
            d.arg = undefined
          }
          return !!c
        }
        for (var f = this.tryEntries.length - 1; f >= 0; --f) {
          var g = this.tryEntries[f]
          var h = g.completion
          if (g.tryLoc === 'root') {
            return e('end')
          }
          if (g.tryLoc <= this.prev) {
            var j = w.call(g, 'catchLoc')
            var k = w.call(g, 'finallyLoc')
            if (j && k) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            } else if (j) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
            } else {
              if (!k) {
                throw new Error('try statement without catch or finally')
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            }
          }
        }
      },
      abrupt: function (b, c) {
        for (var d = this.tryEntries.length - 1; d >= 0; --d) {
          var e = this.tryEntries[d]
          if (
            e.tryLoc <= this.prev &&
            w.call(e, 'finallyLoc') &&
            this.prev < e.finallyLoc
          ) {
            var g = e
            break
          }
        }
        if (
          g &&
          (b === 'break' || b === 'continue') &&
          g.tryLoc <= c &&
          c <= g.finallyLoc
        ) {
          g = null
        }
        var h = g ? g.completion : {}
        h.type = b
        h.arg = c
        if (g) {
          this.method = 'next'
          this.next = g.finallyLoc
          return f
        } else {
          return this.complete(h)
        }
      },
      complete: function (a, b) {
        if (a.type === 'throw') {
          throw a.arg
        }
        if (a.type === 'break' || a.type === 'continue') {
          this.next = a.arg
        } else if (a.type === 'return') {
          this.rval = this.arg = a.arg
          this.method = 'return'
          this.next = 'end'
        } else if (a.type === 'normal' && b) {
          this.next = b
        }
        return f
      },
      finish: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.finallyLoc === a) {
            this.complete(c.completion, c.afterLoc)
            j(c)
            return f
          }
        }
      },
      catch: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.tryLoc === a) {
            var d = c.completion
            if (d.type === 'throw') {
              var f = d.arg
              j(c)
            }
            return f
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function (a, b, c) {
        this.delegate = {
          iterator: E(a),
          resultName: b,
          nextLoc: c,
        }
        if (this.method === 'next') {
          this.arg = undefined
        }
        return f
      },
    }
    return b
  }
  function y(b, d, e, f, g, h, i) {
    try {
      var a = b[h](i)
      var c = a.value
    } catch (a) {
      e(a)
      return
    }
    if (a.done) {
      d(c)
    } else {
      Promise.resolve(c).then(f, g)
    }
  }
  function x(a, b) {
    var c = Object.keys(a)
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(a)
      if (b) {
        d = d.filter(function (b) {
          return Object.getOwnPropertyDescriptor(a, b).enumerable
        })
      }
      c.push.apply(c, d)
    }
    return c
  }
  function O(a) {
    for (var b = 1; b < arguments.length; b++) {
      var c = arguments[b] ?? {}
      if (b % 2) {
        x(Object(c), true).forEach(function (b) {
          E(a, b, c[b])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(a, Object.getOwnPropertyDescriptors(c))
      } else {
        x(Object(c)).forEach(function (b) {
          Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
        })
      }
    }
    return a
  }
  function E(a, b, c) {
    if (
      (b = (function (a) {
        var b = (function (a, b) {
          if (m(a) !== 'object' || a === null) {
            return a
          }
          var c = a[Symbol.toPrimitive]
          if (c !== undefined) {
            var d = c.call(a, 'string')
            if (m(d) !== 'object') {
              return d
            }
            throw new TypeError('@@toPrimitive must return a primitive value.')
          }
          return String(a)
        })(a)
        if (m(b) === 'symbol') {
          return b
        } else {
          return String(b)
        }
      })(b)) in a
    ) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      a[b] = c
    }
    return a
  }
  function S(a) {
    if (
      !(function (a) {
        return (
          (typeof a == 'string' || typeof a == 'number') &&
          /^(-)?0x[0-9a-f]*$/i.test(a)
        )
      })(a)
    ) {
      throw new Error('The parameter "' + a + '" must be a valid HEX string.')
    }
    var b = ''
    var c = 0
    for (
      var d = (a = (a = (a = (a = (a = a.replace(/^0x/i, '')).replace(
          /^(?:00)*/,
          ''
        ))
          .split('')
          .reverse()
          .join('')).replace(/^(?:00)*/, ''))
          .split('')
          .reverse()
          .join('')).length,
        f = 0;
      f < d;
      f += 2
    ) {
      c = parseInt(a.slice(f, f + 2), 16)
      b += String.fromCharCode(c)
    }
    return g().decode(b)
  }
  function j(b, c) {
    var d = c.transactionHash
    var e = c.signedRawTransaction
    var f = c.v
    var g = c.r
    var h = c.s
    return {
      raw: e,
      tx: O(
        O({}, b),
        {},
        {
          v: f,
          r: g,
          s: h,
          hash: d,
        }
      ),
    }
  }
  function L(a) {
    if (typeof a == 'number') {
      return parseInt(a)
    } else if (typeof a == 'string' && a.includes('0x')) {
      return parseInt(a, 16)
    } else {
      return parseInt(a, 10)
    }
  }
  function P(a = undefined) {
    if (a === undefined) a = {}
    if (k(a, 'type')) {
      return !k(a, 'maxPriorityFeePerGas') || !k(a, 'maxFeePerGas')
    } else {
      return L(a.type) === 2
    }
  }
  var _ = (function () {
    var b
    b = da().mark(function a() {
      var b
      var c
      var d
      var f = arguments
      return da().wrap(function (a) {
        while (true) {
          switch ((a.prev = a.next)) {
            case 0:
              b = f.length > 0 && f[0] !== undefined ? f[0] : {}
              c = f.length > 1 ? f[1] : undefined
              if (k(b, 'maxPriorityFeePerGas')) {
                b.maxPriorityFeePerGas =
                  '0x' + BigInt('1000000000').toString(16)
              }
              if (!k(b, 'maxFeePerGas')) {
                a.next = 8
                break
              }
              a.next = 6
              return c()
            case 6:
              d = a.sent
              b.maxFeePerGas =
                '0x' +
                (
                  BigInt(d.baseFeePerGas) * BigInt(2) +
                  BigInt(b.maxPriorityFeePerGas)
                ).toString(16)
            case 8:
              return a.abrupt('return', b)
            case 9:
            case 'end':
              return a.stop()
          }
        }
      }, a)
    })
    function a() {
      var d = this
      var e = arguments
      return new Promise(function (f, g) {
        var h = b.apply(d, e)
        function i(b) {
          y(h, f, g, i, a, 'next', b)
        }
        function a(b) {
          y(h, f, g, i, a, 'throw', b)
        }
        i(undefined)
      })
    }
    return function () {
      return a.apply(this, arguments)
    }
  })()
  function k(a = undefined, b = '') {
    if (a === undefined) a = {}
    return a[b] === undefined || a[b] === null
  }
  function T(a) {
    T =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (a) {
            return typeof a
          }
        : function (a) {
            if (
              a &&
              typeof Symbol == 'function' &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
            ) {
              return 'symbol'
            } else {
              return typeof a
            }
          }
    return T(a)
  }
  function ea(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c]
      d.enumerable = d.enumerable || false
      d.configurable = true
      if ('value' in d) {
        d.writable = true
      }
      Object.defineProperty(a, A(d.key), d)
    }
  }
  function t(a, b, c) {
    if (b) {
      ea(a.prototype, b)
    }
    if (c) {
      ea(a, c)
    }
    Object.defineProperty(a, 'prototype', {
      writable: false,
    })
    return a
  }
  function G(a, b, c) {
    if ((b = A(b)) in a) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      a[b] = c
    }
    return a
  }
  function A(a) {
    var b = (function (a, b) {
      if (T(a) !== 'object' || a === null) {
        return a
      }
      var c = a[Symbol.toPrimitive]
      if (c !== undefined) {
        var d = c.call(a, 'string')
        if (T(d) !== 'object') {
          return d
        }
        throw new TypeError('@@toPrimitive must return a primitive value.')
      }
      return String(a)
    })(a)
    if (T(b) === 'symbol') {
      return b
    } else {
      return String(b)
    }
  }
  var F = t(function e(b, d) {
    var j = this
    ;(function (a, b) {
      if (!(a instanceof b)) {
        throw new TypeError('Cannot call a class as a function')
      }
    })(this, e)
    G(this, 'iframe', undefined)
    G(this, 'initializeFrame', function (a, b = false) {
      j.iframe = l(a)
      p(j.iframe)
      if (b) {
        j.postMessageOnFrameReady()
      }
    })
    G(this, 'makeFrameVisible', function () {
      j.iframe.style.width = '100%'
      j.iframe.style.height = '100%'
    })
    G(this, 'postMessageOnFrameReady', function () {
      v(a, function (b, d) {
        var e = b.origin
        var f = e === undefined ? '' : e
        var g = b.data
        var h = g === undefined ? {} : g
        var a = b.source
        var c = h.eventType
        var i = c === undefined ? '' : c
        if (f === j.frameOrigin && a === j.iframe.contentWindow && i === s) {
          j.iframe.contentWindow.postMessage(
            {
              eventType: o,
              payload: j.payload,
            },
            j.frameOrigin
          )
          d()
        }
      })
    })
    G(this, 'frameEventHandler', function () {
      return new Promise(function (b, d) {
        v(a, function (a, e) {
          var k = a.origin
          var l = a.source
          var m = a.data
          if (k === j.frameOrigin && l === j.iframe.contentWindow) {
            var f
            var n
            var o = m.payload
            var q = o === undefined ? {} : o
            var r = m.eventType
            var s = m.removeFrame
            if (r === u) {
              j.makeFrameVisible()
            }
            if (r === ca || r === i) {
              if (r === ca) {
                b(q)
              } else {
                d(q)
              }
            }
            if (r === c || s) {
              e()
              if (
                (n = (f = j.iframe) && f.parentNode) &&
                typeof n.removeChild == 'function'
              ) {
                n.removeChild(f)
              }
            }
          }
        })
      })
    })
    this.frameOrigin = b
    this.payload = d
  })
  function D(a) {
    D =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (a) {
            return typeof a
          }
        : function (a) {
            if (
              a &&
              typeof Symbol == 'function' &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
            ) {
              return 'symbol'
            } else {
              return typeof a
            }
          }
    return D(a)
  }
  function N() {
    N = function () {
      return k
    }
    var k = {}
    var q = Object.prototype
    var z = q.hasOwnProperty
    var A =
      Object.defineProperty ||
      function (a, b, c) {
        a[b] = c.value
      }
    var e = typeof Symbol == 'function' ? Symbol : {}
    var r = e.iterator || '@@iterator'
    var i = e.asyncIterator || '@@asyncIterator'
    var a = e.toStringTag || '@@toStringTag'
    function c(a, b, c) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return a[b]
    }
    try {
      c({}, '')
    } catch (a) {
      c = function (a, b, c) {
        return (a[b] = c)
      }
    }
    function t(b, d, e, f) {
      var g = d && d.prototype instanceof l ? d : l
      var h = Object.create(g.prototype)
      var a = new C(f || [])
      A(h, '_invoke', {
        value: s(b, e, a),
      })
      return h
    }
    function B(a, b, c) {
      try {
        return {
          type: 'normal',
          arg: a.call(b, c),
        }
      } catch (a) {
        return {
          type: 'throw',
          arg: a,
        }
      }
    }
    k.wrap = t
    var f = {}
    function l() {}
    function h() {}
    function n() {}
    var o = {}
    c(o, r, function () {
      return this
    })
    var p = Object.getPrototypeOf
    var d = p && p(p(j([])))
    if (d && d !== q && z.call(d, r)) {
      o = d
    }
    var g = (n.prototype = l.prototype = Object.create(o))
    function m(a) {
      ;['next', 'throw', 'return'].forEach(function (b) {
        c(a, b, function (a) {
          return this._invoke(b, a)
        })
      })
    }
    function b(b, d) {
      function f(e, g, h, a) {
        var c = B(b[e], b, g)
        if (c.type !== 'throw') {
          var i = c.arg
          var j = i.value
          if (j && D(j) == 'object' && z.call(j, '__await')) {
            return d.resolve(j.__await).then(
              function (b) {
                f('next', b, h, a)
              },
              function (b) {
                f('throw', b, h, a)
              }
            )
          } else {
            return d.resolve(j).then(
              function (a) {
                i.value = a
                h(i)
              },
              function (b) {
                return f('throw', b, h, a)
              }
            )
          }
        }
        a(c.arg)
      }
      var a
      A(this, '_invoke', {
        value: function (b, c) {
          function e() {
            return new d(function (a, d) {
              f(b, c, a, d)
            })
          }
          return (a = a ? a.then(e, e) : e())
        },
      })
    }
    function s(b, d, e) {
      var g = 'suspendedStart'
      return function (h, j) {
        if (g === 'executing') {
          throw new Error('Generator is already running')
        }
        if (g === 'completed') {
          if (h === 'throw') {
            throw j
          }
          return {
            value: undefined,
            done: true,
          }
        }
        e.method = h
        e.arg = j
        while (true) {
          var i = e.delegate
          if (i) {
            var k = v(i, e)
            if (k) {
              if (k === f) {
                continue
              }
              return k
            }
          }
          if (e.method === 'next') {
            e.sent = e._sent = e.arg
          } else if (e.method === 'throw') {
            if (g === 'suspendedStart') {
              g = 'completed'
              throw e.arg
            }
            e.dispatchException(e.arg)
          } else if (e.method === 'return') {
            e.abrupt('return', e.arg)
          }
          g = 'executing'
          var l = B(b, d, e)
          if (l.type === 'normal') {
            g = e.done ? 'completed' : 'suspendedYield'
            if (l.arg === f) {
              continue
            }
            return {
              value: l.arg,
              done: e.done,
            }
          }
          if (l.type === 'throw') {
            g = 'completed'
            e.method = 'throw'
            e.arg = l.arg
          }
        }
      }
    }
    function v(a, b) {
      var c = b.method
      var d = a.iterator[c]
      if (d === undefined) {
        b.delegate = null
        if (
          c !== 'throw' ||
          !a.iterator.return ||
          !((b.method = 'return'),
          (b.arg = undefined),
          v(a, b),
          b.method === 'throw')
        ) {
          if (c !== 'return') {
            b.method = 'throw'
            b.arg = new TypeError(
              "The iterator does not provide a '" + c + "' method"
            )
          }
        }
        return f
      }
      var e = B(d, a.iterator, b.arg)
      if (e.type === 'throw') {
        b.method = 'throw'
        b.arg = e.arg
        b.delegate = null
        return f
      }
      var g = e.arg
      if (g) {
        if (g.done) {
          b[a.resultName] = g.value
          b.next = a.nextLoc
          if (b.method !== 'return') {
            b.method = 'next'
            b.arg = undefined
          }
          b.delegate = null
          return f
        } else {
          return g
        }
      } else {
        b.method = 'throw'
        b.arg = new TypeError('iterator result is not an object')
        b.delegate = null
        return f
      }
    }
    function w(a) {
      var b = {
        tryLoc: a[0],
      }
      if (1 in a) {
        b.catchLoc = a[1]
      }
      if (2 in a) {
        b.finallyLoc = a[2]
        b.afterLoc = a[3]
      }
      this.tryEntries.push(b)
    }
    function x(a) {
      var b = a.completion || {}
      b.type = 'normal'
      delete b.arg
      a.completion = b
    }
    function C(a) {
      this.tryEntries = [
        {
          tryLoc: 'root',
        },
      ]
      a.forEach(w, this)
      this.reset(true)
    }
    function j(a) {
      if (a) {
        var b = a[r]
        if (b) {
          return b.call(a)
        }
        if (typeof a.next == 'function') {
          return a
        }
        if (!isNaN(a.length)) {
          var c = -1
          var d = function b() {
            while (++c < a.length) {
              if (z.call(a, c)) {
                b.value = a[c]
                b.done = false
                return b
              }
            }
            b.value = undefined
            b.done = true
            return b
          }
          return (d.next = d)
        }
      }
      return {
        next: E,
      }
    }
    function E() {
      return {
        value: undefined,
        done: true,
      }
    }
    h.prototype = n
    A(g, 'constructor', {
      value: n,
      configurable: true,
    })
    A(n, 'constructor', {
      value: h,
      configurable: true,
    })
    h.displayName = c(n, a, 'GeneratorFunction')
    k.isGeneratorFunction = function (a) {
      var b = typeof a == 'function' && a.constructor
      return (
        !!b && (b === h || (b.displayName || b.name) === 'GeneratorFunction')
      )
    }
    k.mark = function (b) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(b, n)
      } else {
        b.__proto__ = n
        c(b, a, 'GeneratorFunction')
      }
      b.prototype = Object.create(g)
      return b
    }
    k.awrap = function (a) {
      return {
        __await: a,
      }
    }
    m(b.prototype)
    c(b.prototype, i, function () {
      return this
    })
    k.AsyncIterator = b
    k.async = function (c, d, e, f, g = undefined) {
      if (g === undefined) g = Promise
      var h = new b(t(c, d, e, f), g)
      if (k.isGeneratorFunction(d)) {
        return h
      } else {
        return h.next().then(function (a) {
          if (a.done) {
            return a.value
          } else {
            return h.next()
          }
        })
      }
    }
    m(g)
    c(g, a, 'Generator')
    c(g, r, function () {
      return this
    })
    c(g, 'toString', function () {
      return '[object Generator]'
    })
    k.keys = function (a) {
      var b = Object(a)
      var c = []
      for (var d in b) {
        c.push(d)
      }
      c.reverse()
      return function a() {
        while (c.length) {
          var d = c.pop()
          if (d in b) {
            a.value = d
            a.done = false
            return a
          }
        }
        a.done = true
        return a
      }
    }
    k.values = j
    C.prototype = {
      constructor: C,
      reset: function (a) {
        this.prev = 0
        this.next = 0
        this.sent = this._sent = undefined
        this.done = false
        this.delegate = null
        this.method = 'next'
        this.arg = undefined
        this.tryEntries.forEach(x)
        if (!a) {
          for (var b in this) {
            if (b.charAt(0) === 't' && z.call(this, b) && !isNaN(+b.slice(1))) {
              this[b] = undefined
            }
          }
        }
      },
      stop: function () {
        this.done = true
        var a = this.tryEntries[0].completion
        if (a.type === 'throw') {
          throw a.arg
        }
        return this.rval
      },
      dispatchException: function (b) {
        if (this.done) {
          throw b
        }
        var d = this
        function e(a, c) {
          h.type = 'throw'
          h.arg = b
          d.next = a
          if (c) {
            d.method = 'next'
            d.arg = undefined
          }
          return !!c
        }
        for (var f = this.tryEntries.length - 1; f >= 0; --f) {
          var g = this.tryEntries[f]
          var h = g.completion
          if (g.tryLoc === 'root') {
            return e('end')
          }
          if (g.tryLoc <= this.prev) {
            var j = z.call(g, 'catchLoc')
            var k = z.call(g, 'finallyLoc')
            if (j && k) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            } else if (j) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
            } else {
              if (!k) {
                throw new Error('try statement without catch or finally')
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            }
          }
        }
      },
      abrupt: function (b, c) {
        for (var d = this.tryEntries.length - 1; d >= 0; --d) {
          var e = this.tryEntries[d]
          if (
            e.tryLoc <= this.prev &&
            z.call(e, 'finallyLoc') &&
            this.prev < e.finallyLoc
          ) {
            var g = e
            break
          }
        }
        if (
          g &&
          (b === 'break' || b === 'continue') &&
          g.tryLoc <= c &&
          c <= g.finallyLoc
        ) {
          g = null
        }
        var h = g ? g.completion : {}
        h.type = b
        h.arg = c
        if (g) {
          this.method = 'next'
          this.next = g.finallyLoc
          return f
        } else {
          return this.complete(h)
        }
      },
      complete: function (a, b) {
        if (a.type === 'throw') {
          throw a.arg
        }
        if (a.type === 'break' || a.type === 'continue') {
          this.next = a.arg
        } else if (a.type === 'return') {
          this.rval = this.arg = a.arg
          this.method = 'return'
          this.next = 'end'
        } else if (a.type === 'normal' && b) {
          this.next = b
        }
        return f
      },
      finish: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.finallyLoc === a) {
            this.complete(c.completion, c.afterLoc)
            x(c)
            return f
          }
        }
      },
      catch: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.tryLoc === a) {
            var d = c.completion
            if (d.type === 'throw') {
              var f = d.arg
              x(c)
            }
            return f
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function (a, b, c) {
        this.delegate = {
          iterator: j(a),
          resultName: b,
          nextLoc: c,
        }
        if (this.method === 'next') {
          this.arg = undefined
        }
        return f
      },
    }
    return k
  }
  function fa(a, b) {
    var c = Object.keys(a)
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(a)
      if (b) {
        d = d.filter(function (b) {
          return Object.getOwnPropertyDescriptor(a, b).enumerable
        })
      }
      c.push.apply(c, d)
    }
    return c
  }
  function U(a) {
    for (var b = 1; b < arguments.length; b++) {
      var c = arguments[b] ?? {}
      if (b % 2) {
        fa(Object(c), true).forEach(function (b) {
          R(a, b, c[b])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(a, Object.getOwnPropertyDescriptors(c))
      } else {
        fa(Object(c)).forEach(function (b) {
          Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
        })
      }
    }
    return a
  }
  function R(a, b, c) {
    if (
      (b = (function (a) {
        var b = (function (a, b) {
          if (D(a) !== 'object' || a === null) {
            return a
          }
          var c = a[Symbol.toPrimitive]
          if (c !== undefined) {
            var d = c.call(a, 'string')
            if (D(d) !== 'object') {
              return d
            }
            throw new TypeError('@@toPrimitive must return a primitive value.')
          }
          return String(a)
        })(a)
        if (D(b) === 'symbol') {
          return b
        } else {
          return String(b)
        }
      })(b)) in a
    ) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      a[b] = c
    }
    return a
  }
  function z(b, d, e, f, g, h, i) {
    try {
      var a = b[h](i)
      var c = a.value
    } catch (a) {
      e(a)
      return
    }
    if (a.done) {
      d(c)
    } else {
      Promise.resolve(c).then(f, g)
    }
  }
  var Y = (function () {
    var b
    b = N().mark(function b() {
      var d
      var g
      var h
      var j
      var k
      var l
      var m
      var p = arguments
      return N().wrap(function (a) {
        while (true) {
          switch ((a.prev = a.next)) {
            case 0:
              d = p.length > 0 && p[0] !== undefined ? p[0] : {}
              g = p.length > 1 ? p[1] : undefined
              h = `${g}/widget`
              j = U(
                U({}, d),
                {},
                {
                  widgetType: f,
                }
              )
              k = new F(g, j)
              l = k.initializeFrame
              m = k.frameEventHandler
              l(h, true)
              return a.abrupt('return', m())
            case 7:
            case 'end':
              return a.stop()
          }
        }
      }, b)
    })
    function a() {
      var d = this
      var e = arguments
      return new Promise(function (f, g) {
        var h = b.apply(d, e)
        function i(b) {
          z(h, f, g, i, a, 'next', b)
        }
        function a(b) {
          z(h, f, g, i, a, 'throw', b)
        }
        i(undefined)
      })
    }
    return function () {
      return a.apply(this, arguments)
    }
  })()
  function H(a) {
    H =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (a) {
            return typeof a
          }
        : function (a) {
            if (
              a &&
              typeof Symbol == 'function' &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
            ) {
              return 'symbol'
            } else {
              return typeof a
            }
          }
    return H(a)
  }
  function ga() {
    ga = function () {
      return k
    }
    var k = {}
    var q = Object.prototype
    var z = q.hasOwnProperty
    var A =
      Object.defineProperty ||
      function (a, b, c) {
        a[b] = c.value
      }
    var e = typeof Symbol == 'function' ? Symbol : {}
    var r = e.iterator || '@@iterator'
    var i = e.asyncIterator || '@@asyncIterator'
    var a = e.toStringTag || '@@toStringTag'
    function c(a, b, c) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return a[b]
    }
    try {
      c({}, '')
    } catch (a) {
      c = function (a, b, c) {
        return (a[b] = c)
      }
    }
    function t(b, d, e, f) {
      var g = d && d.prototype instanceof l ? d : l
      var h = Object.create(g.prototype)
      var a = new C(f || [])
      A(h, '_invoke', {
        value: s(b, e, a),
      })
      return h
    }
    function B(a, b, c) {
      try {
        return {
          type: 'normal',
          arg: a.call(b, c),
        }
      } catch (a) {
        return {
          type: 'throw',
          arg: a,
        }
      }
    }
    k.wrap = t
    var f = {}
    function l() {}
    function h() {}
    function n() {}
    var o = {}
    c(o, r, function () {
      return this
    })
    var p = Object.getPrototypeOf
    var d = p && p(p(j([])))
    if (d && d !== q && z.call(d, r)) {
      o = d
    }
    var g = (n.prototype = l.prototype = Object.create(o))
    function m(a) {
      ;['next', 'throw', 'return'].forEach(function (b) {
        c(a, b, function (a) {
          return this._invoke(b, a)
        })
      })
    }
    function b(b, d) {
      function f(e, g, h, a) {
        var c = B(b[e], b, g)
        if (c.type !== 'throw') {
          var i = c.arg
          var j = i.value
          if (j && H(j) == 'object' && z.call(j, '__await')) {
            return d.resolve(j.__await).then(
              function (b) {
                f('next', b, h, a)
              },
              function (b) {
                f('throw', b, h, a)
              }
            )
          } else {
            return d.resolve(j).then(
              function (a) {
                i.value = a
                h(i)
              },
              function (b) {
                return f('throw', b, h, a)
              }
            )
          }
        }
        a(c.arg)
      }
      var a
      A(this, '_invoke', {
        value: function (b, c) {
          function e() {
            return new d(function (a, d) {
              f(b, c, a, d)
            })
          }
          return (a = a ? a.then(e, e) : e())
        },
      })
    }
    function s(b, d, e) {
      var g = 'suspendedStart'
      return function (h, j) {
        if (g === 'executing') {
          throw new Error('Generator is already running')
        }
        if (g === 'completed') {
          if (h === 'throw') {
            throw j
          }
          return {
            value: undefined,
            done: true,
          }
        }
        e.method = h
        e.arg = j
        while (true) {
          var i = e.delegate
          if (i) {
            var k = v(i, e)
            if (k) {
              if (k === f) {
                continue
              }
              return k
            }
          }
          if (e.method === 'next') {
            e.sent = e._sent = e.arg
          } else if (e.method === 'throw') {
            if (g === 'suspendedStart') {
              g = 'completed'
              throw e.arg
            }
            e.dispatchException(e.arg)
          } else if (e.method === 'return') {
            e.abrupt('return', e.arg)
          }
          g = 'executing'
          var l = B(b, d, e)
          if (l.type === 'normal') {
            g = e.done ? 'completed' : 'suspendedYield'
            if (l.arg === f) {
              continue
            }
            return {
              value: l.arg,
              done: e.done,
            }
          }
          if (l.type === 'throw') {
            g = 'completed'
            e.method = 'throw'
            e.arg = l.arg
          }
        }
      }
    }
    function v(a, b) {
      var c = b.method
      var d = a.iterator[c]
      if (d === undefined) {
        b.delegate = null
        if (
          c !== 'throw' ||
          !a.iterator.return ||
          !((b.method = 'return'),
          (b.arg = undefined),
          v(a, b),
          b.method === 'throw')
        ) {
          if (c !== 'return') {
            b.method = 'throw'
            b.arg = new TypeError(
              "The iterator does not provide a '" + c + "' method"
            )
          }
        }
        return f
      }
      var e = B(d, a.iterator, b.arg)
      if (e.type === 'throw') {
        b.method = 'throw'
        b.arg = e.arg
        b.delegate = null
        return f
      }
      var g = e.arg
      if (g) {
        if (g.done) {
          b[a.resultName] = g.value
          b.next = a.nextLoc
          if (b.method !== 'return') {
            b.method = 'next'
            b.arg = undefined
          }
          b.delegate = null
          return f
        } else {
          return g
        }
      } else {
        b.method = 'throw'
        b.arg = new TypeError('iterator result is not an object')
        b.delegate = null
        return f
      }
    }
    function w(a) {
      var b = {
        tryLoc: a[0],
      }
      if (1 in a) {
        b.catchLoc = a[1]
      }
      if (2 in a) {
        b.finallyLoc = a[2]
        b.afterLoc = a[3]
      }
      this.tryEntries.push(b)
    }
    function x(a) {
      var b = a.completion || {}
      b.type = 'normal'
      delete b.arg
      a.completion = b
    }
    function C(a) {
      this.tryEntries = [
        {
          tryLoc: 'root',
        },
      ]
      a.forEach(w, this)
      this.reset(true)
    }
    function j(a) {
      if (a) {
        var b = a[r]
        if (b) {
          return b.call(a)
        }
        if (typeof a.next == 'function') {
          return a
        }
        if (!isNaN(a.length)) {
          var c = -1
          var d = function b() {
            while (++c < a.length) {
              if (z.call(a, c)) {
                b.value = a[c]
                b.done = false
                return b
              }
            }
            b.value = undefined
            b.done = true
            return b
          }
          return (d.next = d)
        }
      }
      return {
        next: D,
      }
    }
    function D() {
      return {
        value: undefined,
        done: true,
      }
    }
    h.prototype = n
    A(g, 'constructor', {
      value: n,
      configurable: true,
    })
    A(n, 'constructor', {
      value: h,
      configurable: true,
    })
    h.displayName = c(n, a, 'GeneratorFunction')
    k.isGeneratorFunction = function (a) {
      var b = typeof a == 'function' && a.constructor
      return (
        !!b && (b === h || (b.displayName || b.name) === 'GeneratorFunction')
      )
    }
    k.mark = function (b) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(b, n)
      } else {
        b.__proto__ = n
        c(b, a, 'GeneratorFunction')
      }
      b.prototype = Object.create(g)
      return b
    }
    k.awrap = function (a) {
      return {
        __await: a,
      }
    }
    m(b.prototype)
    c(b.prototype, i, function () {
      return this
    })
    k.AsyncIterator = b
    k.async = function (c, d, e, f, g = undefined) {
      if (g === undefined) g = Promise
      var h = new b(t(c, d, e, f), g)
      if (k.isGeneratorFunction(d)) {
        return h
      } else {
        return h.next().then(function (a) {
          if (a.done) {
            return a.value
          } else {
            return h.next()
          }
        })
      }
    }
    m(g)
    c(g, a, 'Generator')
    c(g, r, function () {
      return this
    })
    c(g, 'toString', function () {
      return '[object Generator]'
    })
    k.keys = function (a) {
      var b = Object(a)
      var c = []
      for (var d in b) {
        c.push(d)
      }
      c.reverse()
      return function a() {
        while (c.length) {
          var d = c.pop()
          if (d in b) {
            a.value = d
            a.done = false
            return a
          }
        }
        a.done = true
        return a
      }
    }
    k.values = j
    C.prototype = {
      constructor: C,
      reset: function (a) {
        this.prev = 0
        this.next = 0
        this.sent = this._sent = undefined
        this.done = false
        this.delegate = null
        this.method = 'next'
        this.arg = undefined
        this.tryEntries.forEach(x)
        if (!a) {
          for (var b in this) {
            if (b.charAt(0) === 't' && z.call(this, b) && !isNaN(+b.slice(1))) {
              this[b] = undefined
            }
          }
        }
      },
      stop: function () {
        this.done = true
        var a = this.tryEntries[0].completion
        if (a.type === 'throw') {
          throw a.arg
        }
        return this.rval
      },
      dispatchException: function (b) {
        if (this.done) {
          throw b
        }
        var d = this
        function e(a, c) {
          h.type = 'throw'
          h.arg = b
          d.next = a
          if (c) {
            d.method = 'next'
            d.arg = undefined
          }
          return !!c
        }
        for (var f = this.tryEntries.length - 1; f >= 0; --f) {
          var g = this.tryEntries[f]
          var h = g.completion
          if (g.tryLoc === 'root') {
            return e('end')
          }
          if (g.tryLoc <= this.prev) {
            var j = z.call(g, 'catchLoc')
            var k = z.call(g, 'finallyLoc')
            if (j && k) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            } else if (j) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
            } else {
              if (!k) {
                throw new Error('try statement without catch or finally')
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            }
          }
        }
      },
      abrupt: function (b, c) {
        for (var d = this.tryEntries.length - 1; d >= 0; --d) {
          var e = this.tryEntries[d]
          if (
            e.tryLoc <= this.prev &&
            z.call(e, 'finallyLoc') &&
            this.prev < e.finallyLoc
          ) {
            var g = e
            break
          }
        }
        if (
          g &&
          (b === 'break' || b === 'continue') &&
          g.tryLoc <= c &&
          c <= g.finallyLoc
        ) {
          g = null
        }
        var h = g ? g.completion : {}
        h.type = b
        h.arg = c
        if (g) {
          this.method = 'next'
          this.next = g.finallyLoc
          return f
        } else {
          return this.complete(h)
        }
      },
      complete: function (a, b) {
        if (a.type === 'throw') {
          throw a.arg
        }
        if (a.type === 'break' || a.type === 'continue') {
          this.next = a.arg
        } else if (a.type === 'return') {
          this.rval = this.arg = a.arg
          this.method = 'return'
          this.next = 'end'
        } else if (a.type === 'normal' && b) {
          this.next = b
        }
        return f
      },
      finish: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.finallyLoc === a) {
            this.complete(c.completion, c.afterLoc)
            x(c)
            return f
          }
        }
      },
      catch: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.tryLoc === a) {
            var d = c.completion
            if (d.type === 'throw') {
              var f = d.arg
              x(c)
            }
            return f
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function (a, b, c) {
        this.delegate = {
          iterator: j(a),
          resultName: b,
          nextLoc: c,
        }
        if (this.method === 'next') {
          this.arg = undefined
        }
        return f
      },
    }
    return k
  }
  function ha(a, b) {
    var c = Object.keys(a)
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(a)
      if (b) {
        d = d.filter(function (b) {
          return Object.getOwnPropertyDescriptor(a, b).enumerable
        })
      }
      c.push.apply(c, d)
    }
    return c
  }
  function q(a) {
    for (var b = 1; b < arguments.length; b++) {
      var c = arguments[b] ?? {}
      if (b % 2) {
        ha(Object(c), true).forEach(function (b) {
          Q(a, b, c[b])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(a, Object.getOwnPropertyDescriptors(c))
      } else {
        ha(Object(c)).forEach(function (b) {
          Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
        })
      }
    }
    return a
  }
  function Q(a, b, c) {
    if (
      (b = (function (a) {
        var b = (function (a, b) {
          if (H(a) !== 'object' || a === null) {
            return a
          }
          var c = a[Symbol.toPrimitive]
          if (c !== undefined) {
            var d = c.call(a, 'string')
            if (H(d) !== 'object') {
              return d
            }
            throw new TypeError('@@toPrimitive must return a primitive value.')
          }
          return String(a)
        })(a)
        if (H(b) === 'symbol') {
          return b
        } else {
          return String(b)
        }
      })(b)) in a
    ) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      a[b] = c
    }
    return a
  }
  function W(b, d, e, f, g, h, i) {
    try {
      var a = b[h](i)
      var c = a.value
    } catch (a) {
      e(a)
      return
    }
    if (a.done) {
      d(c)
    } else {
      Promise.resolve(c).then(f, g)
    }
  }
  var V = (function () {
    var b
    b = ga().mark(function e(b, d) {
      var f
      var g
      var h
      var j
      var k
      return ga().wrap(function (a) {
        while (true) {
          switch ((a.prev = a.next)) {
            case 0:
              f = `${d}/widget`
              g = q(
                q({}, b),
                {},
                {
                  widgetType: 'SIGN',
                }
              )
              h = new F(d, g)
              j = h.initializeFrame
              k = h.frameEventHandler
              j(f, true)
              return a.abrupt('return', k())
            case 5:
            case 'end':
              return a.stop()
          }
        }
      }, e)
    })
    function a() {
      var d = this
      var e = arguments
      return new Promise(function (f, g) {
        var h = b.apply(d, e)
        function i(b) {
          W(h, f, g, i, a, 'next', b)
        }
        function a(b) {
          W(h, f, g, i, a, 'throw', b)
        }
        i(undefined)
      })
    }
    return function (b, c) {
      return a.apply(this, arguments)
    }
  })()
  function J(a) {
    J =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (a) {
            return typeof a
          }
        : function (a) {
            if (
              a &&
              typeof Symbol == 'function' &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
            ) {
              return 'symbol'
            } else {
              return typeof a
            }
          }
    return J(a)
  }
  function ia() {
    ia = function () {
      return k
    }
    var k = {}
    var q = Object.prototype
    var z = q.hasOwnProperty
    var A =
      Object.defineProperty ||
      function (a, b, c) {
        a[b] = c.value
      }
    var e = typeof Symbol == 'function' ? Symbol : {}
    var r = e.iterator || '@@iterator'
    var i = e.asyncIterator || '@@asyncIterator'
    var a = e.toStringTag || '@@toStringTag'
    function c(a, b, c) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return a[b]
    }
    try {
      c({}, '')
    } catch (a) {
      c = function (a, b, c) {
        return (a[b] = c)
      }
    }
    function t(b, d, e, f) {
      var g = d && d.prototype instanceof l ? d : l
      var h = Object.create(g.prototype)
      var a = new C(f || [])
      A(h, '_invoke', {
        value: s(b, e, a),
      })
      return h
    }
    function B(a, b, c) {
      try {
        return {
          type: 'normal',
          arg: a.call(b, c),
        }
      } catch (a) {
        return {
          type: 'throw',
          arg: a,
        }
      }
    }
    k.wrap = t
    var f = {}
    function l() {}
    function h() {}
    function n() {}
    var o = {}
    c(o, r, function () {
      return this
    })
    var p = Object.getPrototypeOf
    var d = p && p(p(j([])))
    if (d && d !== q && z.call(d, r)) {
      o = d
    }
    var g = (n.prototype = l.prototype = Object.create(o))
    function m(a) {
      ;['next', 'throw', 'return'].forEach(function (b) {
        c(a, b, function (a) {
          return this._invoke(b, a)
        })
      })
    }
    function b(b, d) {
      function f(e, g, h, a) {
        var c = B(b[e], b, g)
        if (c.type !== 'throw') {
          var i = c.arg
          var j = i.value
          if (j && J(j) == 'object' && z.call(j, '__await')) {
            return d.resolve(j.__await).then(
              function (b) {
                f('next', b, h, a)
              },
              function (b) {
                f('throw', b, h, a)
              }
            )
          } else {
            return d.resolve(j).then(
              function (a) {
                i.value = a
                h(i)
              },
              function (b) {
                return f('throw', b, h, a)
              }
            )
          }
        }
        a(c.arg)
      }
      var a
      A(this, '_invoke', {
        value: function (b, c) {
          function e() {
            return new d(function (a, d) {
              f(b, c, a, d)
            })
          }
          return (a = a ? a.then(e, e) : e())
        },
      })
    }
    function s(b, d, e) {
      var g = 'suspendedStart'
      return function (h, j) {
        if (g === 'executing') {
          throw new Error('Generator is already running')
        }
        if (g === 'completed') {
          if (h === 'throw') {
            throw j
          }
          return {
            value: undefined,
            done: true,
          }
        }
        e.method = h
        e.arg = j
        while (true) {
          var i = e.delegate
          if (i) {
            var k = v(i, e)
            if (k) {
              if (k === f) {
                continue
              }
              return k
            }
          }
          if (e.method === 'next') {
            e.sent = e._sent = e.arg
          } else if (e.method === 'throw') {
            if (g === 'suspendedStart') {
              g = 'completed'
              throw e.arg
            }
            e.dispatchException(e.arg)
          } else if (e.method === 'return') {
            e.abrupt('return', e.arg)
          }
          g = 'executing'
          var l = B(b, d, e)
          if (l.type === 'normal') {
            g = e.done ? 'completed' : 'suspendedYield'
            if (l.arg === f) {
              continue
            }
            return {
              value: l.arg,
              done: e.done,
            }
          }
          if (l.type === 'throw') {
            g = 'completed'
            e.method = 'throw'
            e.arg = l.arg
          }
        }
      }
    }
    function v(a, b) {
      var c = b.method
      var d = a.iterator[c]
      if (d === undefined) {
        b.delegate = null
        if (
          c !== 'throw' ||
          !a.iterator.return ||
          !((b.method = 'return'),
          (b.arg = undefined),
          v(a, b),
          b.method === 'throw')
        ) {
          if (c !== 'return') {
            b.method = 'throw'
            b.arg = new TypeError(
              "The iterator does not provide a '" + c + "' method"
            )
          }
        }
        return f
      }
      var e = B(d, a.iterator, b.arg)
      if (e.type === 'throw') {
        b.method = 'throw'
        b.arg = e.arg
        b.delegate = null
        return f
      }
      var g = e.arg
      if (g) {
        if (g.done) {
          b[a.resultName] = g.value
          b.next = a.nextLoc
          if (b.method !== 'return') {
            b.method = 'next'
            b.arg = undefined
          }
          b.delegate = null
          return f
        } else {
          return g
        }
      } else {
        b.method = 'throw'
        b.arg = new TypeError('iterator result is not an object')
        b.delegate = null
        return f
      }
    }
    function w(a) {
      var b = {
        tryLoc: a[0],
      }
      if (1 in a) {
        b.catchLoc = a[1]
      }
      if (2 in a) {
        b.finallyLoc = a[2]
        b.afterLoc = a[3]
      }
      this.tryEntries.push(b)
    }
    function x(a) {
      var b = a.completion || {}
      b.type = 'normal'
      delete b.arg
      a.completion = b
    }
    function C(a) {
      this.tryEntries = [
        {
          tryLoc: 'root',
        },
      ]
      a.forEach(w, this)
      this.reset(true)
    }
    function j(a) {
      if (a) {
        var b = a[r]
        if (b) {
          return b.call(a)
        }
        if (typeof a.next == 'function') {
          return a
        }
        if (!isNaN(a.length)) {
          var c = -1
          var d = function b() {
            while (++c < a.length) {
              if (z.call(a, c)) {
                b.value = a[c]
                b.done = false
                return b
              }
            }
            b.value = undefined
            b.done = true
            return b
          }
          return (d.next = d)
        }
      }
      return {
        next: D,
      }
    }
    function D() {
      return {
        value: undefined,
        done: true,
      }
    }
    h.prototype = n
    A(g, 'constructor', {
      value: n,
      configurable: true,
    })
    A(n, 'constructor', {
      value: h,
      configurable: true,
    })
    h.displayName = c(n, a, 'GeneratorFunction')
    k.isGeneratorFunction = function (a) {
      var b = typeof a == 'function' && a.constructor
      return (
        !!b && (b === h || (b.displayName || b.name) === 'GeneratorFunction')
      )
    }
    k.mark = function (b) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(b, n)
      } else {
        b.__proto__ = n
        c(b, a, 'GeneratorFunction')
      }
      b.prototype = Object.create(g)
      return b
    }
    k.awrap = function (a) {
      return {
        __await: a,
      }
    }
    m(b.prototype)
    c(b.prototype, i, function () {
      return this
    })
    k.AsyncIterator = b
    k.async = function (c, d, e, f, g = undefined) {
      if (g === undefined) g = Promise
      var h = new b(t(c, d, e, f), g)
      if (k.isGeneratorFunction(d)) {
        return h
      } else {
        return h.next().then(function (a) {
          if (a.done) {
            return a.value
          } else {
            return h.next()
          }
        })
      }
    }
    m(g)
    c(g, a, 'Generator')
    c(g, r, function () {
      return this
    })
    c(g, 'toString', function () {
      return '[object Generator]'
    })
    k.keys = function (a) {
      var b = Object(a)
      var c = []
      for (var d in b) {
        c.push(d)
      }
      c.reverse()
      return function a() {
        while (c.length) {
          var d = c.pop()
          if (d in b) {
            a.value = d
            a.done = false
            return a
          }
        }
        a.done = true
        return a
      }
    }
    k.values = j
    C.prototype = {
      constructor: C,
      reset: function (a) {
        this.prev = 0
        this.next = 0
        this.sent = this._sent = undefined
        this.done = false
        this.delegate = null
        this.method = 'next'
        this.arg = undefined
        this.tryEntries.forEach(x)
        if (!a) {
          for (var b in this) {
            if (b.charAt(0) === 't' && z.call(this, b) && !isNaN(+b.slice(1))) {
              this[b] = undefined
            }
          }
        }
      },
      stop: function () {
        this.done = true
        var a = this.tryEntries[0].completion
        if (a.type === 'throw') {
          throw a.arg
        }
        return this.rval
      },
      dispatchException: function (b) {
        if (this.done) {
          throw b
        }
        var d = this
        function e(a, c) {
          h.type = 'throw'
          h.arg = b
          d.next = a
          if (c) {
            d.method = 'next'
            d.arg = undefined
          }
          return !!c
        }
        for (var f = this.tryEntries.length - 1; f >= 0; --f) {
          var g = this.tryEntries[f]
          var h = g.completion
          if (g.tryLoc === 'root') {
            return e('end')
          }
          if (g.tryLoc <= this.prev) {
            var j = z.call(g, 'catchLoc')
            var k = z.call(g, 'finallyLoc')
            if (j && k) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            } else if (j) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
            } else {
              if (!k) {
                throw new Error('try statement without catch or finally')
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            }
          }
        }
      },
      abrupt: function (b, c) {
        for (var d = this.tryEntries.length - 1; d >= 0; --d) {
          var e = this.tryEntries[d]
          if (
            e.tryLoc <= this.prev &&
            z.call(e, 'finallyLoc') &&
            this.prev < e.finallyLoc
          ) {
            var g = e
            break
          }
        }
        if (
          g &&
          (b === 'break' || b === 'continue') &&
          g.tryLoc <= c &&
          c <= g.finallyLoc
        ) {
          g = null
        }
        var h = g ? g.completion : {}
        h.type = b
        h.arg = c
        if (g) {
          this.method = 'next'
          this.next = g.finallyLoc
          return f
        } else {
          return this.complete(h)
        }
      },
      complete: function (a, b) {
        if (a.type === 'throw') {
          throw a.arg
        }
        if (a.type === 'break' || a.type === 'continue') {
          this.next = a.arg
        } else if (a.type === 'return') {
          this.rval = this.arg = a.arg
          this.method = 'return'
          this.next = 'end'
        } else if (a.type === 'normal' && b) {
          this.next = b
        }
        return f
      },
      finish: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.finallyLoc === a) {
            this.complete(c.completion, c.afterLoc)
            x(c)
            return f
          }
        }
      },
      catch: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.tryLoc === a) {
            var d = c.completion
            if (d.type === 'throw') {
              var f = d.arg
              x(c)
            }
            return f
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function (a, b, c) {
        this.delegate = {
          iterator: j(a),
          resultName: b,
          nextLoc: c,
        }
        if (this.method === 'next') {
          this.arg = undefined
        }
        return f
      },
    }
    return k
  }
  function ja(a, b) {
    var c = Object.keys(a)
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(a)
      if (b) {
        d = d.filter(function (b) {
          return Object.getOwnPropertyDescriptor(a, b).enumerable
        })
      }
      c.push.apply(c, d)
    }
    return c
  }
  function Z(a) {
    for (var b = 1; b < arguments.length; b++) {
      var c = arguments[b] ?? {}
      if (b % 2) {
        ja(Object(c), true).forEach(function (b) {
          ka(a, b, c[b])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(a, Object.getOwnPropertyDescriptors(c))
      } else {
        ja(Object(c)).forEach(function (b) {
          Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
        })
      }
    }
    return a
  }
  function ka(a, b, c) {
    if (
      (b = (function (a) {
        var b = (function (a, b) {
          if (J(a) !== 'object' || a === null) {
            return a
          }
          var c = a[Symbol.toPrimitive]
          if (c !== undefined) {
            var d = c.call(a, 'string')
            if (J(d) !== 'object') {
              return d
            }
            throw new TypeError('@@toPrimitive must return a primitive value.')
          }
          return String(a)
        })(a)
        if (J(b) === 'symbol') {
          return b
        } else {
          return String(b)
        }
      })(b)) in a
    ) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      a[b] = c
    }
    return a
  }
  function la(b, d, e, f, g, h, i) {
    try {
      var a = b[h](i)
      var c = a.value
    } catch (a) {
      e(a)
      return
    }
    if (a.done) {
      d(c)
    } else {
      Promise.resolve(c).then(f, g)
    }
  }
  var ma = (function () {
    var b
    b = ia().mark(function e(b, d) {
      var f
      var g
      var h
      var j
      var k
      return ia().wrap(function (a) {
        while (true) {
          switch ((a.prev = a.next)) {
            case 0:
              f = `${d}/widget`
              g = Z(
                Z({}, b),
                {},
                {
                  widgetType: 'LOGIN',
                }
              )
              h = new F(d, g)
              j = h.initializeFrame
              k = h.frameEventHandler
              j(f, true)
              return a.abrupt('return', k())
            case 5:
            case 'end':
              return a.stop()
          }
        }
      }, e)
    })
    function a() {
      var d = this
      var e = arguments
      return new Promise(function (f, g) {
        var h = b.apply(d, e)
        function i(b) {
          la(h, f, g, i, a, 'next', b)
        }
        function a(b) {
          la(h, f, g, i, a, 'throw', b)
        }
        i(undefined)
      })
    }
    return function (b, c) {
      return a.apply(this, arguments)
    }
  })()
  function na(a) {
    na =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (a) {
            return typeof a
          }
        : function (a) {
            if (
              a &&
              typeof Symbol == 'function' &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
            ) {
              return 'symbol'
            } else {
              return typeof a
            }
          }
    return na(a)
  }
  function oa() {
    oa = function () {
      return k
    }
    var k = {}
    var q = Object.prototype
    var z = q.hasOwnProperty
    var A =
      Object.defineProperty ||
      function (a, b, c) {
        a[b] = c.value
      }
    var e = typeof Symbol == 'function' ? Symbol : {}
    var r = e.iterator || '@@iterator'
    var i = e.asyncIterator || '@@asyncIterator'
    var a = e.toStringTag || '@@toStringTag'
    function c(a, b, c) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return a[b]
    }
    try {
      c({}, '')
    } catch (a) {
      c = function (a, b, c) {
        return (a[b] = c)
      }
    }
    function t(b, d, e, f) {
      var g = d && d.prototype instanceof l ? d : l
      var h = Object.create(g.prototype)
      var a = new C(f || [])
      A(h, '_invoke', {
        value: s(b, e, a),
      })
      return h
    }
    function B(a, b, c) {
      try {
        return {
          type: 'normal',
          arg: a.call(b, c),
        }
      } catch (a) {
        return {
          type: 'throw',
          arg: a,
        }
      }
    }
    k.wrap = t
    var f = {}
    function l() {}
    function h() {}
    function n() {}
    var o = {}
    c(o, r, function () {
      return this
    })
    var p = Object.getPrototypeOf
    var d = p && p(p(j([])))
    if (d && d !== q && z.call(d, r)) {
      o = d
    }
    var g = (n.prototype = l.prototype = Object.create(o))
    function m(a) {
      ;['next', 'throw', 'return'].forEach(function (b) {
        c(a, b, function (a) {
          return this._invoke(b, a)
        })
      })
    }
    function b(b, d) {
      function f(e, g, h, a) {
        var c = B(b[e], b, g)
        if (c.type !== 'throw') {
          var i = c.arg
          var j = i.value
          if (j && na(j) == 'object' && z.call(j, '__await')) {
            return d.resolve(j.__await).then(
              function (b) {
                f('next', b, h, a)
              },
              function (b) {
                f('throw', b, h, a)
              }
            )
          } else {
            return d.resolve(j).then(
              function (a) {
                i.value = a
                h(i)
              },
              function (b) {
                return f('throw', b, h, a)
              }
            )
          }
        }
        a(c.arg)
      }
      var a
      A(this, '_invoke', {
        value: function (b, c) {
          function e() {
            return new d(function (a, d) {
              f(b, c, a, d)
            })
          }
          return (a = a ? a.then(e, e) : e())
        },
      })
    }
    function s(b, d, e) {
      var g = 'suspendedStart'
      return function (h, j) {
        if (g === 'executing') {
          throw new Error('Generator is already running')
        }
        if (g === 'completed') {
          if (h === 'throw') {
            throw j
          }
          return {
            value: undefined,
            done: true,
          }
        }
        e.method = h
        e.arg = j
        while (true) {
          var i = e.delegate
          if (i) {
            var k = v(i, e)
            if (k) {
              if (k === f) {
                continue
              }
              return k
            }
          }
          if (e.method === 'next') {
            e.sent = e._sent = e.arg
          } else if (e.method === 'throw') {
            if (g === 'suspendedStart') {
              g = 'completed'
              throw e.arg
            }
            e.dispatchException(e.arg)
          } else if (e.method === 'return') {
            e.abrupt('return', e.arg)
          }
          g = 'executing'
          var l = B(b, d, e)
          if (l.type === 'normal') {
            g = e.done ? 'completed' : 'suspendedYield'
            if (l.arg === f) {
              continue
            }
            return {
              value: l.arg,
              done: e.done,
            }
          }
          if (l.type === 'throw') {
            g = 'completed'
            e.method = 'throw'
            e.arg = l.arg
          }
        }
      }
    }
    function v(a, b) {
      var c = b.method
      var d = a.iterator[c]
      if (d === undefined) {
        b.delegate = null
        if (
          c !== 'throw' ||
          !a.iterator.return ||
          !((b.method = 'return'),
          (b.arg = undefined),
          v(a, b),
          b.method === 'throw')
        ) {
          if (c !== 'return') {
            b.method = 'throw'
            b.arg = new TypeError(
              "The iterator does not provide a '" + c + "' method"
            )
          }
        }
        return f
      }
      var e = B(d, a.iterator, b.arg)
      if (e.type === 'throw') {
        b.method = 'throw'
        b.arg = e.arg
        b.delegate = null
        return f
      }
      var g = e.arg
      if (g) {
        if (g.done) {
          b[a.resultName] = g.value
          b.next = a.nextLoc
          if (b.method !== 'return') {
            b.method = 'next'
            b.arg = undefined
          }
          b.delegate = null
          return f
        } else {
          return g
        }
      } else {
        b.method = 'throw'
        b.arg = new TypeError('iterator result is not an object')
        b.delegate = null
        return f
      }
    }
    function w(a) {
      var b = {
        tryLoc: a[0],
      }
      if (1 in a) {
        b.catchLoc = a[1]
      }
      if (2 in a) {
        b.finallyLoc = a[2]
        b.afterLoc = a[3]
      }
      this.tryEntries.push(b)
    }
    function x(a) {
      var b = a.completion || {}
      b.type = 'normal'
      delete b.arg
      a.completion = b
    }
    function C(a) {
      this.tryEntries = [
        {
          tryLoc: 'root',
        },
      ]
      a.forEach(w, this)
      this.reset(true)
    }
    function j(a) {
      if (a) {
        var b = a[r]
        if (b) {
          return b.call(a)
        }
        if (typeof a.next == 'function') {
          return a
        }
        if (!isNaN(a.length)) {
          var c = -1
          var d = function b() {
            while (++c < a.length) {
              if (z.call(a, c)) {
                b.value = a[c]
                b.done = false
                return b
              }
            }
            b.value = undefined
            b.done = true
            return b
          }
          return (d.next = d)
        }
      }
      return {
        next: D,
      }
    }
    function D() {
      return {
        value: undefined,
        done: true,
      }
    }
    h.prototype = n
    A(g, 'constructor', {
      value: n,
      configurable: true,
    })
    A(n, 'constructor', {
      value: h,
      configurable: true,
    })
    h.displayName = c(n, a, 'GeneratorFunction')
    k.isGeneratorFunction = function (a) {
      var b = typeof a == 'function' && a.constructor
      return (
        !!b && (b === h || (b.displayName || b.name) === 'GeneratorFunction')
      )
    }
    k.mark = function (b) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(b, n)
      } else {
        b.__proto__ = n
        c(b, a, 'GeneratorFunction')
      }
      b.prototype = Object.create(g)
      return b
    }
    k.awrap = function (a) {
      return {
        __await: a,
      }
    }
    m(b.prototype)
    c(b.prototype, i, function () {
      return this
    })
    k.AsyncIterator = b
    k.async = function (c, d, e, f, g = undefined) {
      if (g === undefined) g = Promise
      var h = new b(t(c, d, e, f), g)
      if (k.isGeneratorFunction(d)) {
        return h
      } else {
        return h.next().then(function (a) {
          if (a.done) {
            return a.value
          } else {
            return h.next()
          }
        })
      }
    }
    m(g)
    c(g, a, 'Generator')
    c(g, r, function () {
      return this
    })
    c(g, 'toString', function () {
      return '[object Generator]'
    })
    k.keys = function (a) {
      var b = Object(a)
      var c = []
      for (var d in b) {
        c.push(d)
      }
      c.reverse()
      return function a() {
        while (c.length) {
          var d = c.pop()
          if (d in b) {
            a.value = d
            a.done = false
            return a
          }
        }
        a.done = true
        return a
      }
    }
    k.values = j
    C.prototype = {
      constructor: C,
      reset: function (a) {
        this.prev = 0
        this.next = 0
        this.sent = this._sent = undefined
        this.done = false
        this.delegate = null
        this.method = 'next'
        this.arg = undefined
        this.tryEntries.forEach(x)
        if (!a) {
          for (var b in this) {
            if (b.charAt(0) === 't' && z.call(this, b) && !isNaN(+b.slice(1))) {
              this[b] = undefined
            }
          }
        }
      },
      stop: function () {
        this.done = true
        var a = this.tryEntries[0].completion
        if (a.type === 'throw') {
          throw a.arg
        }
        return this.rval
      },
      dispatchException: function (b) {
        if (this.done) {
          throw b
        }
        var d = this
        function e(a, c) {
          h.type = 'throw'
          h.arg = b
          d.next = a
          if (c) {
            d.method = 'next'
            d.arg = undefined
          }
          return !!c
        }
        for (var f = this.tryEntries.length - 1; f >= 0; --f) {
          var g = this.tryEntries[f]
          var h = g.completion
          if (g.tryLoc === 'root') {
            return e('end')
          }
          if (g.tryLoc <= this.prev) {
            var j = z.call(g, 'catchLoc')
            var k = z.call(g, 'finallyLoc')
            if (j && k) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            } else if (j) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
            } else {
              if (!k) {
                throw new Error('try statement without catch or finally')
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            }
          }
        }
      },
      abrupt: function (b, c) {
        for (var d = this.tryEntries.length - 1; d >= 0; --d) {
          var e = this.tryEntries[d]
          if (
            e.tryLoc <= this.prev &&
            z.call(e, 'finallyLoc') &&
            this.prev < e.finallyLoc
          ) {
            var g = e
            break
          }
        }
        if (
          g &&
          (b === 'break' || b === 'continue') &&
          g.tryLoc <= c &&
          c <= g.finallyLoc
        ) {
          g = null
        }
        var h = g ? g.completion : {}
        h.type = b
        h.arg = c
        if (g) {
          this.method = 'next'
          this.next = g.finallyLoc
          return f
        } else {
          return this.complete(h)
        }
      },
      complete: function (a, b) {
        if (a.type === 'throw') {
          throw a.arg
        }
        if (a.type === 'break' || a.type === 'continue') {
          this.next = a.arg
        } else if (a.type === 'return') {
          this.rval = this.arg = a.arg
          this.method = 'return'
          this.next = 'end'
        } else if (a.type === 'normal' && b) {
          this.next = b
        }
        return f
      },
      finish: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.finallyLoc === a) {
            this.complete(c.completion, c.afterLoc)
            x(c)
            return f
          }
        }
      },
      catch: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.tryLoc === a) {
            var d = c.completion
            if (d.type === 'throw') {
              var f = d.arg
              x(c)
            }
            return f
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function (a, b, c) {
        this.delegate = {
          iterator: j(a),
          resultName: b,
          nextLoc: c,
        }
        if (this.method === 'next') {
          this.arg = undefined
        }
        return f
      },
    }
    return k
  }
  function pa(a, b) {
    var c = Object.keys(a)
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(a)
      if (b) {
        d = d.filter(function (b) {
          return Object.getOwnPropertyDescriptor(a, b).enumerable
        })
      }
      c.push.apply(c, d)
    }
    return c
  }
  function qa(a) {
    for (var b = 1; b < arguments.length; b++) {
      var c = arguments[b] ?? {}
      if (b % 2) {
        pa(Object(c), true).forEach(function (b) {
          ra(a, b, c[b])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(a, Object.getOwnPropertyDescriptors(c))
      } else {
        pa(Object(c)).forEach(function (b) {
          Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
        })
      }
    }
    return a
  }
  function ra(a, b, c) {
    if (
      (b = (function (a) {
        var b = (function (a, b) {
          if (na(a) !== 'object' || a === null) {
            return a
          }
          var c = a[Symbol.toPrimitive]
          if (c !== undefined) {
            var d = c.call(a, 'string')
            if (na(d) !== 'object') {
              return d
            }
            throw new TypeError('@@toPrimitive must return a primitive value.')
          }
          return String(a)
        })(a)
        if (na(b) === 'symbol') {
          return b
        } else {
          return String(b)
        }
      })(b)) in a
    ) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      a[b] = c
    }
    return a
  }
  function sa(b, d, e, f, g, h, i) {
    try {
      var a = b[h](i)
      var c = a.value
    } catch (a) {
      e(a)
      return
    }
    if (a.done) {
      d(c)
    } else {
      Promise.resolve(c).then(f, g)
    }
  }
  var ta = (function () {
    var b
    b = oa().mark(function b() {
      var d
      var f
      var g
      var j
      var k
      var l
      var m
      var p = arguments
      return oa().wrap(function (a) {
        while (true) {
          switch ((a.prev = a.next)) {
            case 0:
              d = p.length > 0 && p[0] !== undefined ? p[0] : {}
              f = p.length > 1 ? p[1] : undefined
              g = `${f}/widget`
              j = qa(
                qa({}, d),
                {},
                {
                  widgetType: h,
                }
              )
              k = new F(f, j)
              l = k.initializeFrame
              m = k.frameEventHandler
              l(g, true)
              return a.abrupt('return', m())
            case 7:
            case 'end':
              return a.stop()
          }
        }
      }, b)
    })
    function a() {
      var d = this
      var e = arguments
      return new Promise(function (f, g) {
        var h = b.apply(d, e)
        function i(b) {
          sa(h, f, g, i, a, 'next', b)
        }
        function a(b) {
          sa(h, f, g, i, a, 'throw', b)
        }
        i(undefined)
      })
    }
    return function () {
      return a.apply(this, arguments)
    }
  })()
  function ua(a) {
    ua =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (a) {
            return typeof a
          }
        : function (a) {
            if (
              a &&
              typeof Symbol == 'function' &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
            ) {
              return 'symbol'
            } else {
              return typeof a
            }
          }
    return ua(a)
  }
  function va(a, b) {
    var c = Object.keys(a)
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(a)
      if (b) {
        d = d.filter(function (b) {
          return Object.getOwnPropertyDescriptor(a, b).enumerable
        })
      }
      c.push.apply(c, d)
    }
    return c
  }
  function wa(a) {
    for (var b = 1; b < arguments.length; b++) {
      var c = arguments[b] ?? {}
      if (b % 2) {
        va(Object(c), true).forEach(function (b) {
          Ca(a, b, c[b])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(a, Object.getOwnPropertyDescriptors(c))
      } else {
        va(Object(c)).forEach(function (b) {
          Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
        })
      }
    }
    return a
  }
  function xa() {
    xa = function () {
      return k
    }
    var k = {}
    var q = Object.prototype
    var z = q.hasOwnProperty
    var A =
      Object.defineProperty ||
      function (a, b, c) {
        a[b] = c.value
      }
    var e = typeof Symbol == 'function' ? Symbol : {}
    var r = e.iterator || '@@iterator'
    var i = e.asyncIterator || '@@asyncIterator'
    var a = e.toStringTag || '@@toStringTag'
    function c(a, b, c) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return a[b]
    }
    try {
      c({}, '')
    } catch (a) {
      c = function (a, b, c) {
        return (a[b] = c)
      }
    }
    function t(b, d, e, f) {
      var g = d && d.prototype instanceof l ? d : l
      var h = Object.create(g.prototype)
      var a = new C(f || [])
      A(h, '_invoke', {
        value: s(b, e, a),
      })
      return h
    }
    function B(a, b, c) {
      try {
        return {
          type: 'normal',
          arg: a.call(b, c),
        }
      } catch (a) {
        return {
          type: 'throw',
          arg: a,
        }
      }
    }
    k.wrap = t
    var f = {}
    function l() {}
    function h() {}
    function n() {}
    var o = {}
    c(o, r, function () {
      return this
    })
    var p = Object.getPrototypeOf
    var d = p && p(p(j([])))
    if (d && d !== q && z.call(d, r)) {
      o = d
    }
    var g = (n.prototype = l.prototype = Object.create(o))
    function m(a) {
      ;['next', 'throw', 'return'].forEach(function (b) {
        c(a, b, function (a) {
          return this._invoke(b, a)
        })
      })
    }
    function b(b, d) {
      function f(e, g, h, a) {
        var c = B(b[e], b, g)
        if (c.type !== 'throw') {
          var i = c.arg
          var j = i.value
          if (j && ua(j) == 'object' && z.call(j, '__await')) {
            return d.resolve(j.__await).then(
              function (b) {
                f('next', b, h, a)
              },
              function (b) {
                f('throw', b, h, a)
              }
            )
          } else {
            return d.resolve(j).then(
              function (a) {
                i.value = a
                h(i)
              },
              function (b) {
                return f('throw', b, h, a)
              }
            )
          }
        }
        a(c.arg)
      }
      var a
      A(this, '_invoke', {
        value: function (b, c) {
          function e() {
            return new d(function (a, d) {
              f(b, c, a, d)
            })
          }
          return (a = a ? a.then(e, e) : e())
        },
      })
    }
    function s(b, d, e) {
      var g = 'suspendedStart'
      return function (h, j) {
        if (g === 'executing') {
          throw new Error('Generator is already running')
        }
        if (g === 'completed') {
          if (h === 'throw') {
            throw j
          }
          return {
            value: undefined,
            done: true,
          }
        }
        e.method = h
        e.arg = j
        while (true) {
          var i = e.delegate
          if (i) {
            var k = v(i, e)
            if (k) {
              if (k === f) {
                continue
              }
              return k
            }
          }
          if (e.method === 'next') {
            e.sent = e._sent = e.arg
          } else if (e.method === 'throw') {
            if (g === 'suspendedStart') {
              g = 'completed'
              throw e.arg
            }
            e.dispatchException(e.arg)
          } else if (e.method === 'return') {
            e.abrupt('return', e.arg)
          }
          g = 'executing'
          var l = B(b, d, e)
          if (l.type === 'normal') {
            g = e.done ? 'completed' : 'suspendedYield'
            if (l.arg === f) {
              continue
            }
            return {
              value: l.arg,
              done: e.done,
            }
          }
          if (l.type === 'throw') {
            g = 'completed'
            e.method = 'throw'
            e.arg = l.arg
          }
        }
      }
    }
    function v(a, b) {
      var c = b.method
      var d = a.iterator[c]
      if (d === undefined) {
        b.delegate = null
        if (
          c !== 'throw' ||
          !a.iterator.return ||
          !((b.method = 'return'),
          (b.arg = undefined),
          v(a, b),
          b.method === 'throw')
        ) {
          if (c !== 'return') {
            b.method = 'throw'
            b.arg = new TypeError(
              "The iterator does not provide a '" + c + "' method"
            )
          }
        }
        return f
      }
      var e = B(d, a.iterator, b.arg)
      if (e.type === 'throw') {
        b.method = 'throw'
        b.arg = e.arg
        b.delegate = null
        return f
      }
      var g = e.arg
      if (g) {
        if (g.done) {
          b[a.resultName] = g.value
          b.next = a.nextLoc
          if (b.method !== 'return') {
            b.method = 'next'
            b.arg = undefined
          }
          b.delegate = null
          return f
        } else {
          return g
        }
      } else {
        b.method = 'throw'
        b.arg = new TypeError('iterator result is not an object')
        b.delegate = null
        return f
      }
    }
    function w(a) {
      var b = {
        tryLoc: a[0],
      }
      if (1 in a) {
        b.catchLoc = a[1]
      }
      if (2 in a) {
        b.finallyLoc = a[2]
        b.afterLoc = a[3]
      }
      this.tryEntries.push(b)
    }
    function x(a) {
      var b = a.completion || {}
      b.type = 'normal'
      delete b.arg
      a.completion = b
    }
    function C(a) {
      this.tryEntries = [
        {
          tryLoc: 'root',
        },
      ]
      a.forEach(w, this)
      this.reset(true)
    }
    function j(a) {
      if (a) {
        var b = a[r]
        if (b) {
          return b.call(a)
        }
        if (typeof a.next == 'function') {
          return a
        }
        if (!isNaN(a.length)) {
          var c = -1
          var d = function b() {
            while (++c < a.length) {
              if (z.call(a, c)) {
                b.value = a[c]
                b.done = false
                return b
              }
            }
            b.value = undefined
            b.done = true
            return b
          }
          return (d.next = d)
        }
      }
      return {
        next: D,
      }
    }
    function D() {
      return {
        value: undefined,
        done: true,
      }
    }
    h.prototype = n
    A(g, 'constructor', {
      value: n,
      configurable: true,
    })
    A(n, 'constructor', {
      value: h,
      configurable: true,
    })
    h.displayName = c(n, a, 'GeneratorFunction')
    k.isGeneratorFunction = function (a) {
      var b = typeof a == 'function' && a.constructor
      return (
        !!b && (b === h || (b.displayName || b.name) === 'GeneratorFunction')
      )
    }
    k.mark = function (b) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(b, n)
      } else {
        b.__proto__ = n
        c(b, a, 'GeneratorFunction')
      }
      b.prototype = Object.create(g)
      return b
    }
    k.awrap = function (a) {
      return {
        __await: a,
      }
    }
    m(b.prototype)
    c(b.prototype, i, function () {
      return this
    })
    k.AsyncIterator = b
    k.async = function (c, d, e, f, g = undefined) {
      if (g === undefined) g = Promise
      var h = new b(t(c, d, e, f), g)
      if (k.isGeneratorFunction(d)) {
        return h
      } else {
        return h.next().then(function (a) {
          if (a.done) {
            return a.value
          } else {
            return h.next()
          }
        })
      }
    }
    m(g)
    c(g, a, 'Generator')
    c(g, r, function () {
      return this
    })
    c(g, 'toString', function () {
      return '[object Generator]'
    })
    k.keys = function (a) {
      var b = Object(a)
      var c = []
      for (var d in b) {
        c.push(d)
      }
      c.reverse()
      return function a() {
        while (c.length) {
          var d = c.pop()
          if (d in b) {
            a.value = d
            a.done = false
            return a
          }
        }
        a.done = true
        return a
      }
    }
    k.values = j
    C.prototype = {
      constructor: C,
      reset: function (a) {
        this.prev = 0
        this.next = 0
        this.sent = this._sent = undefined
        this.done = false
        this.delegate = null
        this.method = 'next'
        this.arg = undefined
        this.tryEntries.forEach(x)
        if (!a) {
          for (var b in this) {
            if (b.charAt(0) === 't' && z.call(this, b) && !isNaN(+b.slice(1))) {
              this[b] = undefined
            }
          }
        }
      },
      stop: function () {
        this.done = true
        var a = this.tryEntries[0].completion
        if (a.type === 'throw') {
          throw a.arg
        }
        return this.rval
      },
      dispatchException: function (b) {
        if (this.done) {
          throw b
        }
        var d = this
        function e(a, c) {
          h.type = 'throw'
          h.arg = b
          d.next = a
          if (c) {
            d.method = 'next'
            d.arg = undefined
          }
          return !!c
        }
        for (var f = this.tryEntries.length - 1; f >= 0; --f) {
          var g = this.tryEntries[f]
          var h = g.completion
          if (g.tryLoc === 'root') {
            return e('end')
          }
          if (g.tryLoc <= this.prev) {
            var j = z.call(g, 'catchLoc')
            var k = z.call(g, 'finallyLoc')
            if (j && k) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            } else if (j) {
              if (this.prev < g.catchLoc) {
                return e(g.catchLoc, true)
              }
            } else {
              if (!k) {
                throw new Error('try statement without catch or finally')
              }
              if (this.prev < g.finallyLoc) {
                return e(g.finallyLoc)
              }
            }
          }
        }
      },
      abrupt: function (b, c) {
        for (var d = this.tryEntries.length - 1; d >= 0; --d) {
          var e = this.tryEntries[d]
          if (
            e.tryLoc <= this.prev &&
            z.call(e, 'finallyLoc') &&
            this.prev < e.finallyLoc
          ) {
            var g = e
            break
          }
        }
        if (
          g &&
          (b === 'break' || b === 'continue') &&
          g.tryLoc <= c &&
          c <= g.finallyLoc
        ) {
          g = null
        }
        var h = g ? g.completion : {}
        h.type = b
        h.arg = c
        if (g) {
          this.method = 'next'
          this.next = g.finallyLoc
          return f
        } else {
          return this.complete(h)
        }
      },
      complete: function (a, b) {
        if (a.type === 'throw') {
          throw a.arg
        }
        if (a.type === 'break' || a.type === 'continue') {
          this.next = a.arg
        } else if (a.type === 'return') {
          this.rval = this.arg = a.arg
          this.method = 'return'
          this.next = 'end'
        } else if (a.type === 'normal' && b) {
          this.next = b
        }
        return f
      },
      finish: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.finallyLoc === a) {
            this.complete(c.completion, c.afterLoc)
            x(c)
            return f
          }
        }
      },
      catch: function (a) {
        for (var b = this.tryEntries.length - 1; b >= 0; --b) {
          var c = this.tryEntries[b]
          if (c.tryLoc === a) {
            var d = c.completion
            if (d.type === 'throw') {
              var f = d.arg
              x(c)
            }
            return f
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function (a, b, c) {
        this.delegate = {
          iterator: j(a),
          resultName: b,
          nextLoc: c,
        }
        if (this.method === 'next') {
          this.arg = undefined
        }
        return f
      },
    }
    return k
  }
  function ya(b, d, e, f, g, h, i) {
    try {
      var a = b[h](i)
      var c = a.value
    } catch (a) {
      e(a)
      return
    }
    if (a.done) {
      d(c)
    } else {
      Promise.resolve(c).then(f, g)
    }
  }
  function za(b) {
    return function () {
      var d = this
      var e = arguments
      return new Promise(function (f, g) {
        var h = b.apply(d, e)
        function i(b) {
          ya(h, f, g, i, a, 'next', b)
        }
        function a(b) {
          ya(h, f, g, i, a, 'throw', b)
        }
        i(undefined)
      })
    }
  }
  function Aa() {
    Aa = Object.assign
      ? Object.assign.bind()
      : function (a) {
          for (var b = 1; b < arguments.length; b++) {
            var c = arguments[b]
            for (var d in c) {
              if (Object.prototype.hasOwnProperty.call(c, d)) {
                a[d] = c[d]
              }
            }
          }
          return a
        }
    return Aa.apply(this, arguments)
  }
  function Ba(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c]
      d.enumerable = d.enumerable || false
      d.configurable = true
      if ('value' in d) {
        d.writable = true
      }
      Object.defineProperty(a, Da(d.key), d)
    }
  }
  function Ca(a, b, c) {
    if ((b = Da(b)) in a) {
      Object.defineProperty(a, b, {
        value: c,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      a[b] = c
    }
    return a
  }
  function Da(a) {
    var b = (function (a, b) {
      if (ua(a) !== 'object' || a === null) {
        return a
      }
      var c = a[Symbol.toPrimitive]
      if (c !== undefined) {
        var d = c.call(a, 'string')
        if (ua(d) !== 'object') {
          return d
        }
        throw new TypeError('@@toPrimitive must return a primitive value.')
      }
      return String(a)
    })(a)
    if (ua(b) === 'symbol') {
      return b
    } else {
      return String(b)
    }
  }
  var Ea = (function () {
    function b(a) {
      var c = Aa(
        {},
        ((function (a) {
          if (a == null) {
            throw new TypeError('Cannot destructure ' + a)
          }
        })(a),
        a)
      )
      ;(function (a, b) {
        if (!(a instanceof b)) {
          throw new TypeError('Cannot call a class as a function')
        }
      })(this, b)
      Ca(this, 'rpcNodeUrl', undefined)
      Ca(this, 'connected', false)
      Ca(this, 'accounts', [])
      Ca(this, 'chainId', 137)
      Ca(this, 'rpcNodeUrls', {})
      this.signMessage = c.signMessage
      this.signTransaction = c.signTransaction
      this.signTypedData = c.signTypedData
      this.loginUser = c.loginUser
      this.rpcNodeUrls = c.rpcNodeUrls
      this.getUser = c.getUser
      this.setUser = c.setUser
    }
    var d
    var g
    var m
    var q
    var v
    var t
    var w
    var x
    var y
    var z
    var A
    var B
    var C
    d = b
    g = [
      {
        key: 'request',
        value:
          ((C = za(
            xa().mark(function b(a) {
              var c
              return xa().wrap(
                function (b) {
                  while (true) {
                    switch ((b.prev = b.next)) {
                      case 0:
                        if (this.connected) {
                          b.next = 3
                          break
                        }
                        b.next = 3
                        return this.enable()
                      case 3:
                        b.prev = 3
                        b.t0 = a.method
                        b.next =
                          b.t0 === 'eth_requestAccounts' ||
                          b.t0 === 'eth_accounts'
                            ? 7
                            : b.t0 === 'eth_signTypedData_v3' ||
                                b.t0 === 'eth_signTypedData' ||
                                b.t0 === 'eth_signTypedData_v4' ||
                                b.t0 === 'personal_sign' ||
                                b.t0 === 'eth_signTransaction' ||
                                b.t0 === 'eth_sign'
                              ? 15
                              : b.t0 === 'eth_sendTransaction'
                                ? 18
                                : b.t0 === 'wallet_switchEthereumChain'
                                  ? 21
                                  : 25
                        break
                      case 7:
                        if (!this.accounts.length) {
                          b.next = 11
                          break
                        }
                        b.t1 = this.accounts
                        b.next = 14
                        break
                      case 11:
                        b.next = 13
                        return this.enable()
                      case 13:
                        b.t1 = b.sent
                      case 14:
                        return b.abrupt('return', b.t1)
                      case 15:
                        b.next = 17
                        return this.handleSign(a)
                      case 17:
                        return b.abrupt('return', b.sent)
                      case 18:
                        b.next = 20
                        return this.handleSendTransaction(a)
                      case 20:
                        return b.abrupt('return', b.sent)
                      case 21:
                        c = a.params[0].chainId
                        b.next = 24
                        return this.handleSwitchChain(c)
                      case 24:
                        return b.abrupt('return', b.sent)
                      case 25:
                        b.next = 27
                        return this.rpcHandler(a)
                      case 27:
                        return b.abrupt('return', b.sent)
                      case 28:
                        b.next = 33
                        break
                      case 30:
                        b.prev = 30
                        b.t2 = b.catch(3)
                        throw b.t2
                      case 33:
                      case 'end':
                        return b.stop()
                    }
                  }
                },
                b,
                this,
                [[3, 30]]
              )
            })
          )),
          function (a) {
            return C.apply(this, arguments)
          }),
      },
      {
        key: 'handleSwitchChain',
        value:
          ((B = za(
            xa().mark(function b(a) {
              var c
              return xa().wrap(
                function (b) {
                  while (true) {
                    switch ((b.prev = b.next)) {
                      case 0:
                        this.chainId = L(a)
                        this.rpcNodeUrl = this.rpcNodeUrls[this.chainId]
                        if (this.rpcNodeUrl) {
                          b.next = 4
                          break
                        }
                        throw new Error(
                          `No available RPC node for chain Id ${this.chainId}`
                        )
                      case 4:
                        b.t0 = L
                        b.next = 7
                        return this.getChainId()
                      case 7:
                        b.t1 = b.sent
                        c = (0, b.t0)(b.t1)
                        if (this.chainId === c) {
                          b.next = 11
                          break
                        }
                        throw new Error(
                          `RPC node chainId ${c} does not match given chain Id ${this.chainId}`
                        )
                      case 11:
                      case 'end':
                        return b.stop()
                    }
                  }
                },
                b,
                this
              )
            })
          )),
          function (a) {
            return B.apply(this, arguments)
          }),
      },
      {
        key: 'handleSendTransaction',
        value:
          ((A = za(
            xa().mark(function d(b) {
              var e
              var f
              var g
              var h
              var j
              var l = this
              return xa().wrap(
                function (a) {
                  while (true) {
                    switch ((a.prev = a.next)) {
                      case 0:
                        e = b.params
                        f = wa({}, e[0])
                        if (!k(f, 'nonce')) {
                          a.next = 6
                          break
                        }
                        a.next = 5
                        return this.getTransactionCount()
                      case 5:
                        f.nonce = a.sent
                      case 6:
                        if (!k(f, 'chainId')) {
                          a.next = 10
                          break
                        }
                        a.next = 9
                        return this.getChainId()
                      case 9:
                        f.chainId = a.sent
                      case 10:
                        if (!k(f, 'gasLimit') || !k(f, 'gas')) {
                          a.next = 14
                          break
                        }
                        a.next = 13
                        return this.estimateGas(f)
                      case 13:
                        f.gas = a.sent
                      case 14:
                        if ((g = P(f)) || !k(f, 'gasPrice')) {
                          a.next = 19
                          break
                        }
                        a.next = 18
                        return this.getGasPrice()
                      case 18:
                        f.gasPrice = a.sent
                      case 19:
                        if (!g) {
                          a.next = 23
                          break
                        }
                        a.next = 22
                        return _(
                          f,
                          za(
                            xa().mark(function a() {
                              return xa().wrap(function (a) {
                                while (true) {
                                  switch ((a.prev = a.next)) {
                                    case 0:
                                      a.next = 2
                                      return l.getBlock('latest', false)
                                    case 2:
                                      return a.abrupt('return', a.sent)
                                    case 3:
                                    case 'end':
                                      return a.stop()
                                  }
                                }
                              }, a)
                            })
                          )
                        )
                      case 22:
                        f = a.sent
                      case 23:
                        a.next = 25
                        return this.signTransaction(f, 'sign a transaction')
                      case 25:
                        h = a.sent
                        j = h.signedRawTransaction
                        a.next = 29
                        return this.rpcHandler({
                          method: 'eth_sendRawTransaction',
                          params: [j],
                        })
                      case 29:
                        return a.abrupt('return', a.sent)
                      case 30:
                      case 'end':
                        return a.stop()
                    }
                  }
                },
                d,
                this
              )
            })
          )),
          function (a) {
            return A.apply(this, arguments)
          }),
      },
      {
        key: 'getChainId',
        value:
          ((z = za(
            xa().mark(function a() {
              return xa().wrap(
                function (a) {
                  while (true) {
                    switch ((a.prev = a.next)) {
                      case 0:
                        a.next = 2
                        return this.rpcHandler({
                          method: 'eth_chainId',
                          params: [],
                        })
                      case 2:
                        return a.abrupt('return', a.sent)
                      case 3:
                      case 'end':
                        return a.stop()
                    }
                  }
                },
                a,
                this
              )
            })
          )),
          function () {
            return z.apply(this, arguments)
          }),
      },
      {
        key: 'getGasPrice',
        value:
          ((y = za(
            xa().mark(function a() {
              return xa().wrap(
                function (a) {
                  while (true) {
                    switch ((a.prev = a.next)) {
                      case 0:
                        a.next = 2
                        return this.rpcHandler({
                          method: 'eth_gasPrice',
                          params: [],
                        })
                      case 2:
                        return a.abrupt('return', a.sent)
                      case 3:
                      case 'end':
                        return a.stop()
                    }
                  }
                },
                a,
                this
              )
            })
          )),
          function () {
            return y.apply(this, arguments)
          }),
      },
      {
        key: 'estimateGas',
        value:
          ((x = za(
            xa().mark(function b(a) {
              var c
              var d
              return xa().wrap(
                function (b) {
                  while (true) {
                    switch ((b.prev = b.next)) {
                      case 0:
                        if (
                          typeof a.chainId == 'number' ||
                          !a.chainId.startsWith('0x')
                        ) {
                          a.chainId = `0x${a.chainId.toString(16)}`
                        }
                        b.next = 3
                        return this.rpcHandler({
                          method: 'eth_estimateGas',
                          params: [a],
                        })
                      case 3:
                        c = b.sent
                        d = c * 1.2
                        return b.abrupt('return', Math.round(d))
                      case 6:
                      case 'end':
                        return b.stop()
                    }
                  }
                },
                b,
                this
              )
            })
          )),
          function (a) {
            return x.apply(this, arguments)
          }),
      },
      {
        key: 'getTransactionCount',
        value:
          ((w = za(
            xa().mark(function a() {
              var b
              return xa().wrap(
                function (a) {
                  while (true) {
                    switch ((a.prev = a.next)) {
                      case 0:
                        a.next = 2
                        return this.rpcHandler({
                          method: 'eth_getTransactionCount',
                          params: [this.accounts[0], 'latest'],
                        })
                      case 2:
                        b = a.sent
                        return a.abrupt('return', b)
                      case 4:
                      case 'end':
                        return a.stop()
                    }
                  }
                },
                a,
                this
              )
            })
          )),
          function () {
            return w.apply(this, arguments)
          }),
      },
      {
        key: 'getBlock',
        value:
          ((t = za(
            xa().mark(function a() {
              var b
              var c
              var d = arguments
              return xa().wrap(
                function (a) {
                  while (true) {
                    switch ((a.prev = a.next)) {
                      case 0:
                        b = d.length > 0 && d[0] !== undefined ? d[0] : 'latest'
                        c = d.length > 1 && d[1] !== undefined && d[1]
                        a.next = 4
                        return this.rpcHandler({
                          method: 'eth_getBlockByNumber',
                          params: [b, c],
                        })
                      case 4:
                        return a.abrupt('return', a.sent)
                      case 5:
                      case 'end':
                        return a.stop()
                    }
                  }
                },
                a,
                this
              )
            })
          )),
          function () {
            return t.apply(this, arguments)
          }),
      },
      {
        key: 'handleSign',
        value:
          ((v = za(
            xa().mark(function b(a) {
              var c
              var d
              var e
              return xa().wrap(
                function (b) {
                  while (true) {
                    switch ((b.prev = b.next)) {
                      case 0:
                        c = a.method
                        d = a.params
                        if (Array.isArray(d)) {
                          b.next = 3
                          break
                        }
                        return b.abrupt('return')
                      case 3:
                        if (c !== 'eth_sign') {
                          b.next = 7
                          break
                        }
                        b.next = 6
                        return this.signMessage(S(d[1]), 'sign a message')
                      case 6:
                      case 19:
                        return b.abrupt('return', b.sent.signature)
                      case 7:
                        if (
                          c !== 'eth_signTypedData' &&
                          c !== 'eth_signTypedData_v4'
                        ) {
                          b.next = 11
                          break
                        }
                        b.next = 10
                        return this.signTypedData(
                          typeof (f = d[1]) == 'string' ? JSON.parse(f) : f,
                          'sign typed data'
                        )
                      case 10:
                        return b.abrupt('return', b.sent)
                      case 11:
                        if (c !== 'eth_signTransaction') {
                          b.next = 16
                          break
                        }
                        b.next = 14
                        return this.signTransaction(d[0], 'sign a transaction')
                      case 14:
                        e = b.sent
                        return b.abrupt('return', j(d[0], e))
                      case 16:
                        if (c !== 'personal_sign') {
                          b.next = 20
                          break
                        }
                        b.next = 19
                        return this.signMessage(S(d[0]), 'sign a message')
                      case 20:
                        throw new Error('Method not implemented')
                      case 21:
                      case 'end':
                        return b.stop()
                    }
                  }
                  var f
                },
                b,
                this
              )
            })
          )),
          function (a) {
            return v.apply(this, arguments)
          }),
      },
      {
        key: 'rpcHandler',
        value:
          ((q = za(
            xa().mark(function b(a) {
              var c
              var d
              return xa().wrap(
                function (b) {
                  while (true) {
                    switch ((b.prev = b.next)) {
                      case 0:
                        if (this.rpcNodeUrl) {
                          b.next = 2
                          break
                        }
                        throw new Error('RPC is not set')
                      case 2:
                        b.next = 4
                        return fetch(this.rpcNodeUrl, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(
                            wa(
                              {
                                id: 1,
                                jsonrpc: '2.0',
                              },
                              a
                            )
                          ),
                        })
                      case 4:
                        c = b.sent
                        b.next = 7
                        return c.json()
                      case 7:
                        if (!(d = b.sent) || !d.error) {
                          b.next = 11
                          break
                        }
                        throw d.error?.message || 'Something Went wrong'
                      case 11:
                        return b.abrupt('return', d.result)
                      case 12:
                      case 'end':
                        return b.stop()
                    }
                  }
                },
                b,
                this
              )
            })
          )),
          function (a) {
            return q.apply(this, arguments)
          }),
      },
      {
        key: 'enable',
        value:
          ((m = za(
            xa().mark(function a() {
              var b
              var c
              var d
              var f
              var g
              return xa().wrap(
                function (a) {
                  while (true) {
                    switch ((a.prev = a.next)) {
                      case 0:
                        if (!this.connected) {
                          a.next = 2
                          break
                        }
                        return a.abrupt('return', this.accounts)
                      case 2:
                        a.prev = 2
                        a.next = 5
                        return this.loginUser({
                          user: this.getUser(),
                        })
                      case 5:
                        b = a.sent
                        c = b.wallet
                        d = b.user
                        f = d === undefined ? {} : d
                        g = c.ethAddress
                        this.accounts = [g]
                        this.connected = true
                        this.setUser(f)
                        return a.abrupt(
                          'return',
                          Promise.resolve(this.accounts)
                        )
                      case 14:
                        a.prev = 14
                        a.t0 = a.catch(2)
                        return a.abrupt('return', Promise.reject(a.t0))
                      case 17:
                      case 'end':
                        return a.stop()
                    }
                  }
                },
                a,
                this,
                [[2, 14]]
              )
            })
          )),
          function () {
            return m.apply(this, arguments)
          }),
      },
    ]
    if (g) {
      Ba(d.prototype, g)
    }
    Object.defineProperty(d, 'prototype', {
      writable: false,
    })
    return b
  })()
  Ca(
    Ea,
    'getNewProvider',
    (function () {
      var a = za(
        xa().mark(function b(a) {
          var c
          return xa().wrap(function (b) {
            while (true) {
              switch ((b.prev = b.next)) {
                case 0:
                  c = new Ea(a)
                  b.next = 3
                  return c.handleSwitchChain(a.chainId)
                case 3:
                  return b.abrupt('return', c)
                case 4:
                case 'end':
                  return b.stop()
              }
            }
          }, b)
        })
      )
      return function (b) {
        return a.apply(this, arguments)
      }
    })()
  )
  function Fa() {
    Fa =
      Object.assign ||
      function (a) {
        var b
        for (var c = 1, d = arguments.length; c < d; c++) {
          for (var f in (b = arguments[c])) {
            if (Object.prototype.hasOwnProperty.call(b, f)) {
              a[f] = b[f]
            }
          }
        }
        return a
      }
    return Fa.apply(this, arguments)
  }
  function Ga(b, d, f, e) {
    return new (f ||= Promise)(function (g, h) {
      function i(a) {
        try {
          c(e.next(a))
        } catch (a) {
          h(a)
        }
      }
      function a(a) {
        try {
          c(e.throw(a))
        } catch (a) {
          h(a)
        }
      }
      function c(b) {
        var c
        if (b.done) {
          g(b.value)
        } else {
          ;((c = b.value),
          c instanceof f
            ? c
            : new f(function (a) {
                a(c)
              })).then(i, a)
        }
      }
      c((e = e.apply(b, d || [])).next())
    })
  }
  function Ha(b, d) {
    var e
    var f
    var g
    var h
    var j = {
      label: 0,
      sent: function () {
        if (g[0] & 1) {
          throw g[1]
        }
        return g[1]
      },
      trys: [],
      ops: [],
    }
    h = {
      next: k(0),
      throw: k(1),
      return: k(2),
    }
    if (typeof Symbol == 'function') {
      h[Symbol.iterator] = function () {
        return this
      }
    }
    return h
    function k(a) {
      return function (c) {
        return (function (a) {
          if (e) {
            throw new TypeError('Generator is already executing.')
          }
          while ((h && ((h = 0), a[0] && (j = 0)), j)) {
            try {
              e = 1
              if (
                f &&
                (g =
                  a[0] & 2
                    ? f.return
                    : a[0]
                      ? f.throw || ((g = f.return) && g.call(f), 0)
                      : f.next) &&
                !(g = g.call(f, a[1])).done
              ) {
                return g
              }
              f = 0
              if (g) {
                a = [a[0] & 2, g.value]
              }
              switch (a[0]) {
                case 0:
                case 1:
                  g = a
                  break
                case 4:
                  j.label++
                  return {
                    value: a[1],
                    done: false,
                  }
                case 5:
                  j.label++
                  f = a[1]
                  a = [0]
                  continue
                case 7:
                  a = j.ops.pop()
                  j.trys.pop()
                  continue
                default:
                  if (
                    !(g = (g = j.trys).length > 0 && g[g.length - 1]) &&
                    (a[0] === 6 || a[0] === 2)
                  ) {
                    j = 0
                    continue
                  }
                  if (a[0] === 3 && (!g || (a[1] > g[0] && a[1] < g[3]))) {
                    j.label = a[1]
                    break
                  }
                  if (a[0] === 6 && j.label < g[1]) {
                    j.label = g[1]
                    g = a
                    break
                  }
                  if (g && j.label < g[2]) {
                    j.label = g[2]
                    j.ops.push(a)
                    break
                  }
                  if (g[2]) {
                    j.ops.pop()
                  }
                  j.trys.pop()
                  continue
              }
              a = d.call(b, j)
            } catch (b) {
              a = [6, b]
              f = 0
            } finally {
              e = g = 0
            }
          }
          if (a[0] & 5) {
            throw a[1]
          }
          return {
            value: a[0] ? a[1] : undefined,
            done: true,
          }
        })([a, c])
      }
    }
  }
  var Ia = (function () {
    function a(a) {
      var b = this
      this.getUser = function () {
        return b.user
      }
      this.setUser = function (a) {
        b.user = a
      }
      this.getConsent = function (a) {
        return Ga(b, undefined, undefined, function () {
          return Ha(this, function (b) {
            switch (b.label) {
              case 0:
                if (!a) {
                  throw Error('Consent token is required')
                }
                return [
                  4,
                  Y(
                    {
                      consentToken: a,
                      appId: this.appId,
                      internalOptions: this.internalOptions,
                    },
                    this.frameOrigin
                  ),
                ]
              case 1:
                return [2, b.sent()]
            }
          })
        })
      }
      this.signMessage = function (a, c) {
        return Ga(b, undefined, undefined, function () {
          var b
          return Ha(this, function (d) {
            switch (d.label) {
              case 0:
                if (!a) {
                  throw Error('Message is required')
                }
                b = {
                  payload: a,
                  type: ba.SIGN_MESSAGE,
                  user: this.getUser() || {},
                  reason: c,
                  appId: this.appId,
                  internalOptions: this.internalOptions,
                }
                return [4, V(b, this.frameOrigin)]
              case 1:
                return [2, d.sent()]
            }
          })
        })
      }
      this.signTransaction = function (a, c) {
        return Ga(b, undefined, undefined, function () {
          var b
          return Ha(this, function (d) {
            switch (d.label) {
              case 0:
                if (!a) {
                  throw Error('Transaction object is required')
                }
                if (
                  a.serializeMessage !== undefined &&
                  typeof a.serializeMessage == 'function' &&
                  a.signatures !== undefined &&
                  a.instructions !== undefined
                ) {
                  a = {
                    serializedTransactionMessage:
                      '0x' + a.serializeMessage().toString('hex'),
                  }
                } else if (
                  a.message &&
                  a.message.serialize !== undefined &&
                  typeof a.message.serialize == 'function' &&
                  a.message.addressTableLookups !== undefined &&
                  a.message.staticAccountKeys !== undefined
                ) {
                  e = a.message.serialize()
                  a = {
                    serializedTransactionMessage:
                      '0x' +
                      Array.from(new Uint8Array(e))
                        .map(function (a) {
                          return a.toString(16).padStart(2, '0')
                        })
                        .join(''),
                  }
                }
                b = {
                  payload: a,
                  type: ba.SIGN_TRANSACTION,
                  user: this.getUser() || {},
                  reason: c,
                  appId: this.appId,
                  internalOptions: this.internalOptions,
                }
                return [4, V(b, this.frameOrigin)]
              case 1:
                return [2, d.sent()]
            }
            var e
          })
        })
      }
      this.signTypedData = function (a, c) {
        return Ga(b, undefined, undefined, function () {
          var b
          return Ha(this, function (d) {
            switch (d.label) {
              case 0:
                if (!a) {
                  throw Error('Typed data is required')
                }
                b = {
                  payload: a,
                  type: ba.SIGN_TYPED_DATA,
                  user: this.getUser() || {},
                  reason: c,
                  appId: this.appId,
                  internalOptions: this.internalOptions,
                }
                return [4, V(b, this.frameOrigin)]
              case 1:
                return [2, d.sent()]
            }
          })
        })
      }
      this.loginUser = function (a = undefined) {
        if (a === undefined) a = {}
        return Ga(b, undefined, undefined, function () {
          return Ha(this, function (b) {
            switch (b.label) {
              case 0:
                return [
                  4,
                  ma(
                    Fa(Fa({}, a), {
                      appId: this.appId,
                      internalOptions: this.internalOptions,
                    }),
                    this.frameOrigin
                  ),
                ]
              case 1:
                return [2, b.sent()]
            }
          })
        })
      }
      this.getWallet = function () {
        return Ga(b, undefined, undefined, function () {
          return Ha(this, function (a) {
            switch (a.label) {
              case 0:
                return [
                  4,
                  ma(
                    {
                      user: this.getUser() || {},
                      appId: this.appId,
                      internalOptions: this.internalOptions,
                    },
                    this.frameOrigin
                  ),
                ]
              case 1:
                return [2, a.sent()]
            }
          })
        })
      }
      this.prefetch = function () {
        return Ga(b, undefined, undefined, function () {
          return Ha(this, function (a) {
            switch (a.label) {
              case 0:
                return [
                  4,
                  ta(
                    {
                      appId: this.appId,
                      internalOptions: this.internalOptions,
                    },
                    this.frameOrigin
                  ),
                ]
              case 1:
                return [2, a.sent()]
            }
          })
        })
      }
      this.frameOrigin = n[a.environment] || n.prod
      this.user = a.user || {}
      this.rpcNodeUrls = a.rpcNodeUrls || {}
      this.chainId = a.chainId || 137
      this.appId = a.appId || ''
      this.internalOptions = a.internalOptions || {}
      if (!this.internalOptions?.skipPrefetch) {
        this.prefetch()
      }
    }
    Object.defineProperty(a.prototype, 'ethereum', {
      get: function () {
        return Ga(this, undefined, undefined, function () {
          var a
          var b
          return Ha(this, function (c) {
            switch (c.label) {
              case 0:
                c.trys.push([0, 2, , 3])
                return [4, Ea.getNewProvider(this)]
              case 1:
                a = c.sent()
                Object.defineProperty(this, 'ethereum', {
                  value: a,
                  writable: false,
                  configurable: false,
                  enumerable: false,
                })
                return [2, a]
              case 2:
                b = c.sent()
                return [2, Promise.reject(b)]
              case 3:
                return [2]
            }
          })
        })
      },
      enumerable: false,
      configurable: true,
    })
    return a
  })()
})()
return r
