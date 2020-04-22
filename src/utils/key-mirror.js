export default function(prefix, sep = '_') {
  return (...actions) => {
    return Array.prototype.slice.call(actions).reduce((mem, key) => {
      if (prefix) {
        mem[key] = `${prefix.toUpperCase()}${sep}${key}`;
      } else {
        mem[key] = key;
      }
      return mem;
    }, {});
  };
}
