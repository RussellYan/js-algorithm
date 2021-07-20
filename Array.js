/**
 * 常用Array方法:
    Array.from => 创建数组
    Array.isArray(array) => 判断是否是数组
    array.indexOf(item) => 获取数组元素索引
    array.join(mark) => arr = [1,2], arr.join()返回 '1,2', arr.join('-')返回 '1-2'，不改变arr的值
    array.reverse() => 颠倒数组中元素的顺序
    array.forEach => 遍历数组，和for循环类似，不能break
    array.push(item) / array.unshift(item) => 从后面 / 前面插入一个元素，返回新数组长度
    array.pop() / array.shift => 删除数组最后 / 最前面的元素，返回被删除的元素
    array.math => 映射
    array.reduce => 聚合
    array.reduceRight => 从右边到左reduce
    array.filter => 筛选
    array.concat(newArr / item) => 合并数组(或元素)
    array.slice(start?, end?) => 从某个已有的数组返回选定的元素
    array.splice(start, deleteCounts?, ...items) => 删除元素，并向数组添加新元素
    array.sort => 排序
    array.every(条件func) => 如果每一项都符合条件func就返回true,否者返回false
    array.some => 与every类似，但是只需要有一项符合就返回true
  集合Set的一些操作:
    new Set()
    add(item) => 添加，去重
    has(item) => 判断是否存在
    delete(item) => 删除
    values() => 返回Iterator
 * 
 */


/**
 * 括号匹配问题：
 *    给定一个括号表达式，中间只有[]和(),判断这个表达式两边括号是否平衡？
 *    tip: 比如[(())]是平衡的，[()(()]是不平衡的。
 */
function isBalance(str) {
  const [first, ...others] = str;
  // const first = str.substr(0, 1);
  // const others = str.substr(0).split();
  // stack 用来乘放括号，如果括号匹配就移除这一对括号，直到遍历完str，如果stack被清空才算完全匹配
  const stack = [first]; // ['[']
  const isMatch = (left, right) => (left === '[' && right === ']') || (left === '(' && right === ')');
  while (others.length) {
    const left = stack[stack.length - 1];
    const right = others.shift();
    if (isMatch(left, right)) {
      stack.pop();
    } else {
      stack.push(n);
    }
  }
  return stack.length === 0;
}

// 数组去重
function deduplication(array) {
  return [...new Set(array)];
}

// 数组的替代 splice
{
  const arr = [1, 2, 3, 4, 5, 6, 7];
  // 用 x 替换 [3, 4]
  console.log(arr.splice(2, 2, 'x')); // [3, 4]
  console.log(arr); // [1, 2, 'x', 5, 6, 7]
  arr.splice(2, 1); // 删除 x
  arr.splice(2, 0, 'y'); // 在2后面添加 y
  console.log(arr); // [1, 2, 'y', 5, 6, 7]
}

// Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
// Array.from(arrayLike[, mapFn[, thisArg]])
//  arrayLike: 想要转换成数组的伪数组对象或可迭代对象。
//  mapFn: 可选, 如果指定了该参数，新数组中的每个元素会执行该回调函数。
//  thisArg: 可选, 执行回调函数 mapFn 时 this 对象。
// 返回值: 一个新的数组实例
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
{
  console.log(Array.from('foo')); // ["f", "o", "o"]
  console.log(Array.from([1, 2, 3], x => x + x)); // [2, 4, 6]
  // 应用实例： 生成器构造无穷斐波那契数列
  function* fibonacci() {
    let a = b = 1;
    yield a;
    yield b;
    while(true) {
      const t = b;
      b = a + b;
      a = t;
      yield b;
    }
  }
  const it = fibonacci();
  // 下班三种生成fib10的方法等价
  // const fib10 = Array.from(Array(10), it.next, it).map(item => item.value);
  // const fib10 = Array.from(Array(10)).map(() => it.next().value);
  const fib10 = [...Array(10)].map(() => it.next().value);
  console.log(fib10);
  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
}

// 分组

// 中英文排序
{
  const zh_names = ['张三', '王五', '王刚', '李明'];
  const en_names = ['Zeller', 'abby', 'Abby', 'Billy', 'Carry', 'billy'];
  const mix_names = ['Zeller', 'abby', 'Abby', 'Billy', 'Carry', 'billy', '安徽', '台湾'];
  zh_names.sort((a, b) => a.localeCompare(b, 'zh'));
  en_names.sort((a, b) => a.localeCompare(b));
  mix_names.sort((a, b) => a.localeCompare(b, 'zh'));
  // ["安徽", "台湾", "abby", "Abby", "billy", "Billy", "Carry", "Zeller"]
}