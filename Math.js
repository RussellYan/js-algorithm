/**
 * 常用Math方法：
    Math.abs => 求绝对值
    Math.ceil => 向上取整。如果x是正数，则把小数“入”；如果x是负数，则把小数“舍” 。
    Math.floor => 向下取整。如果x是正数，则把小数“舍”；如果x是负数，则把小数“入”。
    Math.round => 四舍五入取整
    Math.max => 求最大值
    Math.min => 求最小值
    Math.random => 取0-1之间的随机数
    Math.sqrt => 求平方根
    Math.sign => 求数值的符号, 返回值是 1(正数)， 0(0)， -1(负数), NaN
 * 
 */

/**
 * 分页计算
 * @param {数据总数} total
 * @param {每页显示条数} pageSize 
 * @returns 页数
 */
function getPageNo(total, pageSize) {
  return Math.ceil((total + 1) / pageSize);
}

// 获取数组中的最大值
function getArrayMaxItem(numArray) {
  return Math.max(...numArray); // or Math.max.apply(null, A)
}

// 生成20-30之间的随机整数
function getRandomIntBetween20And30() {
  return Math.round(20 + Math.random() * 10);
}

/**
 * 判断一个数是否是素数
 * N² ≤ n ≤ (N + 1)²
 * 比如判断10是否是素数，只需要把Math.floor(10的平方根)前的数遍历一般，判断是否可以被10整除
 */
function isPrime(num) {
  let is_prime = false;
  if (num > 1) {
    const N = Math.floor(Math.sqrt(n));
    for(let i = 2; i < N; i++) {
      // 取余
      if (num % i === 0) {
        is_prime = false;
        break;
      }
    }
  }
  return is_prime;
}

// 生成数值范围内的随机整数
{
  // 常规思路
  function genNumberScope({start = 0, includeStart = true, end = 1, includeEnd = true}) {
    const random = Math.random();
    const gap = end - start;
    const floatGap = gap * random + start;
    // 因为：floatGap ∈ (start, end) 如 start = 1, end = 5, 那floatGap ∈ (1, 5)
    // 所以：四舍五入取整 => [start, end], 向上取整 => (start, end], 向下取整/取整 => [start, end)
    if (includeStart) {
      return includeEnd ? Math.round(floatGap) : parseInt(floatGap);
    } else {
      // 不包含 start 和 end 的思路：(start, end) 取整相当于 [start + 1, end -1]; 
      return includeEnd ? Math.floor(floatGap) + 1 : Math.round((gap - 2) * random + start + 1);
    }
  };
  // 思路2：利用递归的思维
  function GNS1({start = 0, includeStart = true, end = 1, includeEnd = true}) {
    if (end < start) return null;
    const calc = (start, end) => Math.round((end - start) * Math.random() + start);
    if (includeStart) {
      return includeEnd ? calc(start, end) : calc(start, end -1);
    } else {
      return includeEnd ? calc(start + 1, end) : (end - start > 2 ? calc(start + 1, end - 1) : null);
    }
  }
  // 思路3：思路1和2的启发
  function GNS2({start = 0, includeStart = true, end = 1, includeEnd = true}) {
    const newStart = includeStart ? start : start + 1;
    const newEnd = includeEnd ? end + 1 : end;
    return parseInt((newEnd - newStart) * Math.random() + newStart);
  }
  console.log(GNS2({start: 1, end: 5, includeEnd: true, includeStart: true}));
}

