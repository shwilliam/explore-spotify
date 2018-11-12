export function debounce(fn, delay) {
  let timeoutID = null;
  return function debounceFn() {
    clearTimeout(timeoutID);
    const args = arguments;
    timeoutID = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export default { debounce };
