const lStorage = (function() {
  const name = 'lStorage'
    , storage = window.localStorage

  const test = function() {
    if (!window.localStorage) {
      return false
    } else {
      return true
    }
  }

  const setItem = function (key, value) {
    let data = storage.getItem(name)
    if (!data) {
      this.init()
      data = storage.getItem(name)
    }
    data = JSON.parse(data)
    data.data[key] = value
    storage.setItem(name, JSON.stringify(data))
    return data.data
  }

  const getItem = function (key) {
    let data = storage.getItem(name)
    if (!data) {
      return false
    }
    data = JSON.parse(data)
    return data.data[key]
  }

  const removeItem = function (key) {
    let data = storage.getItem(name)
    if (!data) {
      return false
    }
    data = JSON.parse(data)
    delete data.data[key]
    storage.setItem(name, JSON.stringify(data))
    return data.data
  }

  const clear = function () {
    storage.removeItem(name)
  }

  const init = function () {
    storage.setItem(name, '{"data":{}}')
  }

  return { test, setItem, getItem, removeItem, init, clear }

})()

const sStorage = (function() {
  const name = 'sStorage'
    , storage = window.sessionStorage

  const test = function() {
    if (!window.sessionStorage) {
      return false
    } else {
      return true
    }
  }

  const setItem = function (key, value) {
    let data = storage.getItem(name)
    if (!data) {
      this.init()
      data = storage.getItem(name)
    }
    data = JSON.parse(data)
    data.data[key] = value
    storage.setItem(name, JSON.stringify(data))
    return data.data
  }

  const getItem = function (key) {
    let data = storage.getItem(name)
    if (!data) {
      return false
    }
    data = JSON.parse(data)
    return data.data[key]
  }

  const removeItem = function (key) {
    let data = storage.getItem(name)
    if (!data) {
      return false
    }
    data = JSON.parse(data)
    delete data.data[key]
    storage.setItem(name, JSON.stringify(data))
    return data.data
  }

  const clear = function () {
    storage.removeItem(name)
  }

  const init = function () {
    storage.setItem(name, '{"data":{}}')
  }

  return { test, setItem, getItem, removeItem, init, clear }

})()

const cookies = (function() {
  const getItem = function (key) {
    if (!key) {
      return null
    }
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  }

  const setItem = function (key, value, end, path, domain, secure) {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
      return false
    }
    let expires = ''
    if (end) {
      switch (end.constructor) {
        case Number:
          expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end
          break
        case String:
          expires = '; expires=' + end
          break
        case Date:
          expires = '; expires=' + end.toUTCString()
          break
      }
    }
    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '')
    return true
  }

  const removeItem = function (key, path, domain) {
    if (!this.hasItem(key)) {
      return false
    }
    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '')
    return true
  }

  const hasItem = function (key) {
    if (!key) {
      return false
    }
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  }

  const keys = function () {
    let keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
    for (let nLen = keys.length, nIdx = 0; nIdx < nLen; nIdx++) {
      keys[nIdx] = decodeURIComponent(keys[nIdx])
    }
    return keys
  }

  return { getItem, setItem, removeItem, hasItem, keys }

})

export default { lStorage, sStorage, cookies }
