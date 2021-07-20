const wm = new WeakMap();

function deepClone(target) {
    let result;
    if (typeof target === 'object') {
        // null
        if (target === null) {
            result = target;
        }
        // Array
        else if (Array.isArray(target)) {
            result = [];
            target.forEach(item => result.push(deepClone(item)));
        }
        // Date
        else if (target instanceof Date) {
            result = new Date(target);
        }
        // regular expression
        else if (target instanceof RegExp) {
            result = new RegExp(target);
        }
        // plain object
        else {
            // detect circular reference
            // 用WeakMap的key保存原对象的引用记录, value是对应的深拷贝对象的引用
            // 例如: a:{b:{c:{d: null}}}, d=a, a 的深拷贝对象是 copy, 则 weakmap 里保存一条 a->copy 记录
            //     当递归拷贝到d, 发现d指向a，而a已经存在于weakmap，则让新d指向copy
            if (wm.has(target)) {
                result = wm.get(target);
            }
            else {
                result = {};
                wm.set(target, result);
                for (let prop in target) {
                    result[prop] = deepClone(target[prop]);
                }
            }
        }
    }
    // function, primary type
    else {
        result = target;
    }
    return result;
}

(function () {
    const a = {
        num: 123,
        say() {
            return 'Hello';
        },
        arr: [1, 2, [4, {name: 'Jack'}]],
        n: null,
        un: undefined,
        d: new Date(),
        reg: /[a-z0-9]+/,
        b: {
            c: {
                d: null
            }
        }
    };
    a.copy = a;
    const copy = deepClone(a);
    console.log(copy)
})();