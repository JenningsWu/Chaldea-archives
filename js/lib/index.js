function pad(str, max = 3) {
  let ret = `${str}`
  while (ret.length < max) {
    ret = `0${ret}`
  }
  return ret
}

export { pad }
