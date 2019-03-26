export function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}
export function timeStamp() {
  let time = new Date().getTime()
  return time
}
export default {
  getStyle,
  timeStamp
}
