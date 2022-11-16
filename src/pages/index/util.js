// 二分查找
function binarySearch(list, value) {
    let start = 0;
    let end = list.length - 1;
    let midIndex;
    const max = list.length;
    let count = 0;
    while (start <= end && count < max) {
        midIndex = Math.floor(start + (end - start) / 2, 10);
        const midValue = list[midIndex];
        if (midValue === value) {
            return midIndex + 1;
        } else if (midValue < value) {
            start = midIndex + 1;
        } else if (midValue > value) {
            end = midIndex - 1;
        }
        count++;
    }
    return midIndex;
}

const throttle = (fn, interval) => {
    var enterTime = 0; //触发的时间
    var gapTime = interval || 300; //间隔时间，如果interval不传值，默认为300ms
    return function () {
        var that = this;
        var backTime = new Date(); //第一次函数return即触发的时间
        if (backTime - enterTime > gapTime) {
            fn.call(that, arguments);
            enterTime = backTime; //赋值给第一次触发的时间 保存第二次触发时间
        }
    };
};

/**
 * 分块为二维数组
 * @example ([1,2,3,4,5,6],2)=>[[1,2],[2,3],[4,5],[6]]
 * @param {array} arr
 * @param {number} size 数组分块大小
 * @returns
 */
function chunk(arr, size = 1) {
    let index = 0;
    const res = [];
    while (index < arr.length) {
        res.push(arr.slice(index, index + size));
        index += size;
    }
    return res;
}

module.exports = {
    throttle,
    chunk,
    binarySearch,
};
