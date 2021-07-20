/**
 * 深拷贝(全！)
 * @param {拷贝目标} origin 
 * @param {防止循环引用的标记} flag 
 * @returns 
 */

function deepClone(origin, flag = new WeakMap()) {
  // 基本类型
  if (origin === null || typeof origin !== 'object') {
    return origin;
  };
  if (flag.has(origin)) {
    return flag.get(origin);
  }
  // 引用类型
  let result;
  const type = Object.prototype.toString.call(origin).replace('[object ', '').replace(']', '');
  const TargetConstructor = origin.constructor;
  if (['RegExp', 'Date'].includes(type)) {
    result = new TargetConstructor(origin);
  } else if (['Array', 'Object'].includes(type)) {
    const ownProps = Object.getOwnPropertyNames(origin);
    result = new TargetConstructor();
    flag.set(origin, result);
    for (let key of ownProps) {
      result[key] = deepClone(origin[key], flag);
    }
  } else if (['Map', 'WeakMap'].includes(type)) {
    result = new TargetConstructor();
    flag.set(origin, result);
    origin.forEach((value, key) => {
      result.set(deepClone(key, flag), deepClone(value, flag));
    });
  } else if (['Set', 'WeakSet'].includes(type)) {
    result = new TargetConstructor();
    flag.set(origin, result);
    origin.forEach(value => {
      result.add(deepClone(value, flag));
    });
  } else {
    result = origin;
  }
  return result;
}

var t = {a: {b: 2}, c: [3], d: /\C/, t: new Date('2011-03-12')};
t.s = t;
t.a.b = t;
const q = new Map();
q.set(t, {2: 3});
t.q = q;
const s = deepClone(t);
console.log(s, s ===t);

/**
 * 深度比较对象（粗糙版）
 */
function deepCompare(xObj, yObj) {
  if (xObj === null || typeof xObj !== 'object' || yObj === null || typeof yObj !== 'object') {
    return xObj === yObj;
  }
  const xProps = Object.getOwnPropertyDescriptors(xObj);
  const yProps = Object.getOwnPropertyDescriptors(yObj);
  if (Object.keys(xProps).length !== Object.keys(yProps).length) {
    return false;
  }
  return Object.keys(xProps).every(item => deepCompare(xObj[item], yObj[item]))
}