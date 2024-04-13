import { hexToUtf8 } from 'web3-utils'

var metakeepAuthUrls = {
  dublin: 'https://auth.dublin.metakeep.xyz',
  prod: 'https://auth.metakeep.xyz',
  dev: 'https://auth.dev.metakeep.xyz',
  local: 'http://localhost:3000',
}

var messageSigningTask = Object.freeze({
  SIGN_TRANSACTION: 'SIGN_TRANSACTION',
  SIGN_TYPED_DATA: 'SIGN_TYPED_DATA',
  SIGN_MESSAGE: 'SIGN_MESSAGE',
})

var FrameAction = Object.freeze({
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

var successStatus = FrameAction.SUCCESS
var errorStatus = FrameAction.ERROR
FrameAction.SIGN_REQUEST
var frameMsgAction = FrameAction.MESSAGE
var closeFrameAction = FrameAction.CLOSE_FRAME
FrameAction.SIGN_IN_REQUEST
var frameActionSdkMessage = FrameAction.SDK_MESSAGE
var frameReadyStatus = FrameAction.FRAME_READY
var makeFrameVisible = FrameAction.MAKE_FRAME_VISIBLE
var consentType = 'CONSENT'
var prefetchEn = 'PREFETCH'

function createIframeWithSrc(a) {
  var iframe = document.createElement('iframe')
  iframe.setAttribute('id', 'metakeep-iframe')
  iframe.setAttribute('src', a)
  return iframe
}

function addIframeToBody(a) {
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

function attachEventListener(
  eventName,
  callbackFunction,
  targetElement = undefined
) {
  if (targetElement === undefined) targetElement = window
  function removeEventCallback(e) {
    callbackFunction(e, function () {
      return targetElement.removeEventListener(eventName, removeEventCallback)
    })
  }
  targetElement.addEventListener(eventName, removeEventCallback)
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
              b.maxPriorityFeePerGas = '0x' + BigInt('1000000000').toString(16)
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

class FrameHandler {
  constructor(frameOrigin, payload) {
    this.frameOrigin = frameOrigin
    this.payload = payload
    this.iframe = undefined
  }

  initializeFrame = async (src, postMessage = false) => {
    this.iframe = createIframeWithSrc(src)
    addIframeToBody(this.iframe)
    if (postMessage) {
      await this.postMessageOnFrameReady()
    }
  }

  makeFrameVisible = () => {
    this.iframe.style.width = '100%'
    this.iframe.style.height = '100%'
  }

  postMessageOnFrameReady = async () => {
    await new Promise((resolve) => {
      attachEventListener(frameMsgAction, (event, done) => {
        const { origin, source, data } = event
        const frameReadyStatus = 'ready'
        if (
          origin === this.frameOrigin &&
          source === this.iframe.contentWindow &&
          data.eventType === frameReadyStatus
        ) {
          this.iframe.contentWindow.postMessage(
            {
              eventType: frameActionSdkMessage,
              payload: this.payload,
            },
            this.frameOrigin
          )
          done()
          resolve()
        }
      })
    })
  }

  frameEventHandler = async () => {
    return new Promise((resolve, reject) => {
      attachEventListener(frameMsgAction, async (event, done) => {
        const { origin, source, data } = event
        const { payload, eventType, removeFrame } = data
        const successStatus = 'success'
        const errorStatus = 'error'
        const closeFrameAction = 'close'

        if (
          origin === this.frameOrigin &&
          source === this.iframe.contentWindow
        ) {
          if (eventType === 'makeFrameVisible') {
            this.makeFrameVisible()
          }
          if (eventType === successStatus || eventType === errorStatus) {
            eventType === successStatus ? resolve(payload) : reject(payload)
          }
          if (eventType === closeFrameAction || removeFrame) {
            done()
            const parentNode = this.iframe && this.iframe.parentNode
            if (parentNode && typeof parentNode.removeChild === 'function') {
              parentNode.removeChild(this.iframe)
            }
          }
        }
      })
    })
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
                widgetType: consentType,
              }
            )
            k = new (g, j)()
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
                widgetType: prefetchEn,
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
                      return this.signMessage(hexToUtf8(d[1]), 'sign a message')
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
                      return this.signMessage(hexToUtf8(d[0]), 'sign a message')
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
      value: async function enable() {
        let userData, walletData, user, ethAddress

        if (this.connected) {
          return this.accounts
        }

        try {
          userData = await this.loginUser({ user: this.getUser() })
          walletData = userData.wallet
          user = userData.user || {}
          ethAddress = walletData.ethAddress

          this.accounts = [ethAddress]
          this.connected = true
          this.setUser(user)

          return this.accounts
        } catch (error) {
          return Promise.reject(error)
        }
      },
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
var MetaKeep = (function () {
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
                type: messageSigningTask.SIGN_MESSAGE,
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
                type: messageSigningTask.SIGN_TRANSACTION,
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
                type: messageSigningTask.SIGN_TYPED_DATA,
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
    this.frameOrigin = metakeepAuthUrls[a.environment] || metakeepAuthUrls.prod
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
