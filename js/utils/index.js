function chomp(str, sep) {
  let len = str.length
  let ret = str
  while (len > 0 && ret[len - 1] === sep) {
    ret = str.substring(0, len - 1)
    len -= 1
  }
  return ret
}

function roundAndStr(num) {
  let ret = num.toPrecision(6)
  ret = chomp(ret, '0')
  ret = chomp(ret, '.')
  return ret
}

function toPercentStr(num) {
  return `${roundAndStr(num * 100)}%`
}

export { roundAndStr, toPercentStr }
