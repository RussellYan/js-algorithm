/**
 * 迭代器和生成器
 * Iterator: 迭代器，也被称为游标Cursor, 是一种设计模式
 *  => 迭代器提供了一种遍历内容的方法，比如JavaScript迭代器中的next,而不需要关心内部构造
 * Generator: 生成器，本身也是一种设计模式，JavaScript中的生成器用于构造迭代器
 * yield:
 *  yield是ES6的新关键字，使生成器函数执行暂停，yield关键字后面的表达式的值返回给生成器的调用者。
 *  它可以被认为是一个基于生成器的版本的return关键字。
 *  yield关键字实际返回一个IteratorResult（迭代器）对象，它有两个属性，value和done，分别代表返回值和是否完成。
 *  yield无法单独工作，需要配合generator(生成器)的其他函数，如next，懒汉式操作，展现强大的主动控制特性
 */

/**
 * 遍历方法总结：
 *  方法      数组   break   迭代器
 *  for        √      √       ×
 *  for...of   √      √       √ 
 *  map        √      ×       ×
 *  forEach    √      ×       ×
 *  for...in   √      √       ×
 *  while      √      √       √ 
 */

// 迭代器的遍历
{
  const s = new Set([1, 2, 3]);
  const it = s.values();
  console.log(it); // SetIterator {1, 2, 3}
  let val = null;
  while (!(val = it.next()).done) {
    console.log(val);
    // { value: 1, done: false }
    // { value: 2, done: false }
    // { value: 3, done: false }
  }

  function* myYield(list) {
    for (let i = 0; i < list.length; i++) {
      yield list[i]
    }
  }
  const numList = myYield([1, 4, 8])
  console.log(numList.next()) // {done: false,value: 1}
  console.log(numList.next()) // {done: false,value: 4}
  console.log(numList.next()) // {done: false,value: 8}
  console.log(numList.next()) // {done: true,value: undefined}
}

// 关于next参数的说明
// next()可无限调用，但既定循环完成之后总是返回undefined
{
  function* myYield2(x) {
    let y = 2 * (yield (x + 1));
    yield (y + 3);
  }
  var num = myYield2(3)
  console.log(num.next())//{value: 4, done: false}
  console.log(num.next())//{value: NaN, done: false}
  // 以上代码解析
  // 1.var num = myYield2(3) 执行了初始化，x为3
  // 2.执行【第一个next()】相当于执行了yield (x+1) 而x为3，所以返回value为4，
  // 3.又因为当前确实执行了yield语句，所以返回的done为false
  // 4.接下来【执行第二个next()】，因为yield没设定返回值，
  // 5.所以let y = 2*(undefined) 结果y为NaN
  // 6.之后执行yield (NaN+3) 结果为NaN
}

{
  function* myYield2(x) {
    let y = 2 * (yield (x + 1));
    let z = yield (y + 3);
    return (x + y + z); // 等同于 yield (x+y+z)，不同之处在于return后面的代码将不会再执行
  }
  var num = myYield2(3)
  console.log(num.next())//{value: 4, done: false}
  console.log(num.next(2))//{value: 7, done: false}
  console.log(num.next(2))//{value: 9, done: false}
  console.log(num.next(2))//{value: undefined, done: true}
  // 1.var num = myYield2(3) 执行了初始化，x为3
  // 2.执行【第一个next()】，相当于执行了yield (x+1) 而x为3，所以返回value为4
  // 传参不传参都无所谓，因为传的参数只是代替上面yield的值，第一个之前没有其他的yield
  // 3.执行【第二个next(2)】，相当于let y = 2*(2); 结果y=4；yield (y+3);相当于yield (4+3) 最终结果返回7
  // 执行【第三个next(2)】,相当于执行了let y = 2*(2);let z = 2;return (3+4+2)；最终结果return也可以认为是一个yield

  // next() 传参是对yield整体的传参，否则yield类似于return
  // 当yield在赋值表达式的右边，比如 var result = yield 4 ,记住这句话，yield语句本身没有返回值，
  // 或者说返回值是undefined，但是当我们调用next(param)传参的时候，
  // param不但作为next返回对象的value值，它还作为上一条yield 的返回值，所以result 才会被成功赋值。
}

// 应用1：构造无穷斐波那契数列
{
  function* fibonacci() {
    let a = b = 1;
    yield a;
    yield b;
    while (true) {
      const t = b;
      b = a + b;
      a = t;
      yield b;
    }
  }
  const it = fibonacci();
  const fib10 = [...Array(10)].map(() => it.next().value);
  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
}

// 应用2：数值展平
{
  function* flatten(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        yield* flatten(arr[i]);
      } else {
        yield arr[i];
      }
    }
  }
  const flattenRes = [...flatten([1, 2, [3, 4, [5]]])];
  console.log(flattenRes);
}

// Generator异步语法
{
  create_runner(function* () {
    const val1 = yield request('url1');
    const val2 = yield request('url2');
    console.log(val1, val2);
  })()
  function request(url) {
    const cbFunc = cb => {
      setTimeout(() => {
        console.log('setTimeout ', url);
        cb(url);
      }, 1000);
    }
    return cbFunc;
  }
  function create_runner(genFunc) {
    const it = genFunc();
    function run(data) {
      const itVal = it.next(data);
      console.log(itVal);
      // 第一次 run, data=undefined, it.next(data) 执行第一个yield后面的表达式也就是genFunc的request('url1') 返回cbFunc
      if (!itVal.done) {
        console.log('执行匿名函数');
        // 执行cbFunc, run作为参数，request的参数url传给data
        itVal.value(run);
        // data = url1, 然后执行第二次run，it.next(data), data替换整个yield request('url1')，所以 val1 = data = url1
        // 同理第三次run, val2 = data = url2
      }
    }
    return run;
  }
}

// for...in 和 for...of 
{
  var a = ['A', 'B', 'C'];
  var s = new Set(['A', 'B', 'C']);
  var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);

  //遍历数组
  for (var x of a) {
    console.log('1=> ', x);//输出的是值 A　B　C
  }
  for (var x in a) {
    console.log('2=> ', x);//输出的是下标 0 1 2
  }

  //遍历Set集合
  for (var x of s) {
    console.log('3=> ', x);//输出的是Set集合每个元素的值 A　B　C
  }
  for (var x in s) {
    console.log('4=> ', x);// 不起作用，不能使用for...in循环遍历Set集合
  }

  //遍历Map集合
  for (var x of m) {
    console.log('5=> ', x[0] + "=" + x[1]);//既可以拿到键名，也可以拿到键值，输出的是值 A　B　C
  }
  for (var x in m) {
    console.log('6=> ', x[0] + "=" + x[1]);//for...in循环不能用于遍历Map
  }
}

// for...in和for...of遍历数组和对象
{
  // 遍历对象
  {
    var s = { a: 1, b: 2, c: 3 };
    var s1 = Object.create(s);
    for (var prop in s1) {
      console.log(prop);//a b c
      console.log(s1[prop]);//1 2 3
    }
    for (let prop of s1) {
      console.log(prop);//报错如下 Uncaught TypeError: s1 is not iterable 
    }
    for (let prop of Object.keys(s1)) {
      console.log(prop);// a b c
      console.log(s1[prop]);//1 2 3
    }
  }

  // 遍历数组
  {
    var arr = ['a', 'b', 'c'];
    arr.hobby = 'foosball';
    for (let i in arr) {
      console.log(i);     //0 1 2 hobby 
      console.log(arr[i]); //a b c  foosball
    }
    for (let i of arr) {
      console.log(i); //a b c
    }


    Object.prototype.objCustom = function () { };
    Array.prototype.arrCustom = function () { };
    arr.hobby = 'foosball';

    for (let i in arr) {
      console.log(i); // 0, 1, 2, "hobby", "arrCustom", "objCustom"
    }

    for (let i in arr) {
      if (iterable.hasOwnProperty(i)) {
        console.log(i); //0, 1, 2, "hobby"
      }
    }

    for (let i of arr) {
      console.log(i); // 'a', 'b', 'c'
    }

    for(var key of Object.keys(arr)){
      // Object.keys(arr) == ["0", "1", "2", "hobby"]
      console.log(key);
  }
  }
}