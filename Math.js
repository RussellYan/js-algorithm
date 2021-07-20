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