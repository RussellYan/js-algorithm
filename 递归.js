// 经典应用：构造斐波那契数列

{
  // 方法一 for
  function fibonacci(n) {
    console.time('fibonacci');
    let [a, b] = [0, 1];
    const fibArray = [b];
    for (let i = 0; i < n; i++) {
      [a, b] = [b, a + b];
      fibArray.push(b);
    }
    console.timeEnd('fibonacci')
    return fibArray;
  }
  fibonacci(1000)
  // 方法二 reduce
  function fibonacciReduce(n) {
    console.time('fibonacciReduce');
    const fibArray = [];
    [...Array(n)].reduce(([a, b]) => {
      fibArray.push(b);
      return [b, a + b];
    }, [0, 1]);
    console.timeEnd('fibonacciReduce')
    return fibArray;
  }
  fibonacciReduce(1000); // 耗时 1.12ms

  // 方法三：迭代器
  function fibonacciIterator(n) {
    console.time('fibonacciIterator');
    const it = (function* () {
      let [a, b] = [1, 1];
      yield* [a, b];
      while(true) {
        [a, b] = [b, a + b];
        yield b;
      }
    })();
    const res = [...Array(n)].map(() => it.next().value);
    console.timeEnd('fibonacciIterator');
    return res;
  }
  fibonacciIterator(1000);
  // 可以看出三种方法的运行速度：方法三 > 方法二 > 方法一
}

// 深拷贝
{
  function deepClone(target) {
    if (target === null || typeof target !== 'object') return target;
    const newObject = new target.constructor();
    for (let key in Object.getOwnPropertyDescriptors(target)) {
      newObject[key] = deepClone(target[key]);
    }
    return newObject;
  }
  var t = {a: {b: 2}, c: [3]};
  const s = deepClone(t);
  console.log(s, s === t);
}