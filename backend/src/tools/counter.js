function counter() {
  let x = 0;
  return function count() {
    return x++;
  };
}

module.exports = counter;
