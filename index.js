
function roundNum(number, fractionDigits) {
    return Math.round(number * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
};

const significantNum = (num, precision = 4, toFix = 3, noNumRet) => {
    if (typeof num !== 'number' || isNaN(num)) {
        if (typeof noNumRet === 'string') return noNumRet;
        return null;
    };
    // num, precision required
    const max = Math.pow(10, precision);
    if (num >= max) {
        return roundNum(num, 0);
    } else {
        // toPrecision会四舍五入
        let tmp = num.toPrecision(precision);
        // 这里还需考虑到小数位在0.000000之后会变得很长，需要定义最长小数位
        const afterDotStr = tmp.split(".")[1] ?? "";
        if (afterDotStr.length > toFix) {
            tmp = roundNum(num, toFix);
        } else {
            tmp = parseFloat(tmp);
        };
        return tmp;
    };
};

const funcs = {
    roundNum,
    significantNum,
};

export default funcs;

export let fs = funcs;