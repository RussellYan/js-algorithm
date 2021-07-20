/**
 * 函数柯里化实现
 */
const curry = func => {
  // 关键点：func.length, func参数的长度
  const g = (...allArgus) => allArgus.length >= func.length ?
    func(...allArgus)
      : (...argus) => g(...allArgus, ...argus);
  return g;
}
const foo = curry((a, b, c, d) => {
  console.log(a, b, c, d);
});
foo(1)(2)(3)(4);
foo(1)(2)(3);
foo(9);
const f = foo(1)(2)(3);
f(5);

// ramda版本 （待续）