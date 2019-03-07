const { localStorage } = window

export function setItem (key, value) {
  return localStorage.setItem(key, value)
}

export function getItem (key) {
  return localStorage.getItem(key)
}

export function clear () {
  return localStorage.clear()
}

export default { setItem, getItem, clear }
