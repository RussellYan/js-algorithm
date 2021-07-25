/**
 * 冒泡排序法:
 * 依次比较相邻的两个值，如果后面的比前面的小，则将小的元素排到前面。
 * 依照这个规则进行多次并且递减的迭代，直到顺序正确。
 * @param {Array} arr 
 * 时间复杂度： O(n²)，n = originArr.length, 嵌套循环了两次所以时间复杂度 = O(n * n)
 */
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}

/**
 * 选择排序法:
 * 首先从原始数组中找到最小的元素，并把该元素放在数组的最前面，
 * 然后再从剩下的元素中寻找最小的元素，放在之前最小元素的后面，直到排序完毕。
 * @param {Array} arr 
 * 时间复杂度：O(n²)
 */
function selectSort(arr) {
  const len = arr.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

/**
 * 插入排序: 
 * 原理和扑克的插入排序一样
 * @param {Array} arr 
 * 时间复杂度：O(n²)
 */
function insertSort(arr) {
  // arr是一副扑克牌，box相当于手上的扑克牌
  const box = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    // 当前摸到的扑克牌
    const curCard = arr[i];
    let x = box.length;
    // 当前摸到的牌先放在box最后边，然后和左边的牌逐一对比，如果小于前面的卡片就往前挪动
    box[x] = curCard;
    while (x) {
      if (curCard < box[x - 1]) {
        box[x] = box[x - 1];
        box[x - 1] = curCard;
      }
      x--;
    }
  }
  return box;
}

/**
 * 快速排序法:
 * 首先从原始数组中找到最小的元素，并把该元素放在数组的最前面，
 * 然后再从剩下的元素中寻找最小的元素，放在之前最小元素的后面，知道排序完毕。
 * @param {Array} arr
 * 时间复杂度：O(N * logN)
 */
function fastSort(arr) {
  const len = arr.length;
  if (len < 2) return arr;
  const left = [];
  const right = [];
  const middleIndex = Math.floor(len / 2);
  const middleItem = arr.splice(middleIndex, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middleItem) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...fastSort(left), middleItem, ...fastSort(right)];
}

/**
 * 归并排序: 
 * https://www.cnblogs.com/lyt0207/p/12489144.html
 * @param {Array} arr 
 * 时间复杂度：O(N * logN)
 */
{
  function divideSort(arr) {
    const len = arr.length;
    if (len < 2) return arr;
    const middleIndex = Math.floor(len / 2);
    // 分成左右两个数组
    const left = arr.slice(0, middleIndex);
    const right = arr.slice(middleIndex, len);
    // console.log('==> ', left, right);
    // 递归拆分
    const divideSortLeft = divideSort(left);
    const divideSortRight = divideSort(right);
    // 合并
    return mergeSort(divideSortLeft, divideSortRight);
  }
  function mergeSort(left, right) {
    const result = [];
    while (left.length && right.length) {
      result.push((left[0] <= right[0] ? left : right).shift());
    }
    // 讲剩余的元素加上
    while (left.length) {
      result.push(left.shift());
    }
    while (right.length) {
      result.push(right.shift())
    }
    return result;
  }
}

/**
 * 计数排序：
 *  计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。
 *  作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
 *  当输入的元素是 n 个 0到 k 之间的整数时，时间复杂度是O(n+k)，空间复杂度也是O(n+k)，其排序速度快于任何比较排序算法。
 *  当k不是很大并且序列比较集中时，计数排序是一个很有效的排序算法。
 */
{
  // 算法思路：
  // 1、找出待排序的数组中最大和最小的元素；
  // 2、统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
  // 3、对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
  // 4、反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。
  function countingSort(arr, maxValue) {
    const bucket = new Array(maxValue + 1);
    const len = arr.length;
    let sortedIndex = 0;
    for (let i = 0; i < len; i++) {
      const cur = arr[i];
      if (!bucket[cur]) bucket[cur] = 0;
      bucket[cur]++;
    }
    console.log([...bucket], bucket.length);
    for (let j = 0; j < maxValue + 1; j++) {
      while (bucket[j] > 0) {
        arr[sortedIndex++] = j;
        bucket[j]--
      }
    }
    return arr;
  }
}

/**
 * 桶排序: 计数排序的升级版
 * 它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定
 */
{
  function bucketSort(arr, bucketSize = 5) {
    const len = arr.length;
    if (!len) return arr;
    let min = max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      } else if (arr[i] > max) {
        max = arr[i];
      }
    }
    // 桶的初始化
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = new Array(bucketCount);
    // 利用映射函数将数据分配到各个桶中
    for (let i = 0; i < len; i++) {
      const position = Math.floor((arr[i] - min) / bucketSize);
      const targetBucket = buckets[position];
      const sortBucketItems = targetBucket || [];
      sortBucketItems.push(arr[i]);
    }
    arr.length = 0;
    for (let i = 0; i < bucketCount; i++) {
      if (buckets[i].length) {
        // 对每个桶进行排序后拼接
        arr = arr.concat(fastSort(buckets[i]));
      }
    }
    return arr;
  }
}

/**
 * 基数排序
 */
{
  // 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。
  // 有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
  // 最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。
  function radixSort(arr) {
    //定义一个二维数组，表示10个桶，每个桶就是一个一维数组
    //说明
    //1，二维数组包含10个一维数组，
    //2.为了防止在放入数的时候，数据溢出，则每个一维数组（桶）
    //大小定为arr.length
    //3.很明确，基数排序是使用空间换时间的经典算法
    let bucket = new Array(10);
    for (let i = 0; i < bucket.length; i++) {
      bucket[i] = new Array(arr.length);
    }
    //为了记录每个桶中，实际存了多少个数据，我们定义一个
    //一维数组来记录每个桶的每次放入的数据个数
    //可以这里理解
    //比如：bucketElementCounts[0],记录的就是bucket[0]桶的放入数据个数
    let bucketElementCounts = new Array(10).fill(0);

    //1.得到数组中最大的位数
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    //得到最大是几位数
    let maxLength = (max + '').length;
    for (let i = 0, n = 1; i < maxLength; i++, n = n * 10) {
      //每一轮，对每个元素的各个位数进行排序处理,
      //第一次是个位，第二次是十位，第三次是百位
      for (let j = 0; j < arr.length; j++) {
        //取出每个元素的各位的值
        let digitOfElement = Math.floor(arr[j] / n) % 10;
        bucket[digitOfElement][bucketElementCounts[digitOfElement]] = arr[j];
        bucketElementCounts[digitOfElement]++;
      }
      //按照这个桶的顺序（以为数组的下标依次取出数据，放入原来数组）
      let index = 0;
      //遍历每一桶，并将桶中的数据，放入原数组
      for (let k = 0; k < bucketElementCounts.length; k++) {
        //如果桶中有数据，我们才放入原数组
        if (bucketElementCounts[k] !== 0) {
          //循环该桶即第k个桶，即第k个一维数组，放入
          for (let l = 0; l < bucketElementCounts[k]; l++) {
            //取出元素放入arr
            arr[index] = bucket[k][l];
            //arr下标后移
            index++;
          }
          //每轮处理后，下标要清0
          bucketElementCounts[k] = 0;
        }
      }
    }
  }
}

const arr = [8, 94, 15, 88, 55, 76, 21, 39];
// console.log(bubbleSort([...arr]));
// console.log(selectSort([...arr]));
// console.log(fastSort([...arr]));
// console.log(insertSort([...arr]));
// console.log(divideSort([...arr]));
console.log(bucketSort([...arr], 8));