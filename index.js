
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

const domOnResize = (el, cb) => {
    const callback = cb ?? (() => { })
    if (!!el) {
        // wrapper
        const wrapperEl = document.createElement('div')
        console.log(wrapperEl.style)
        Object.assign(wrapperEl.style, {
            height: '100%'
            , opacity: '0'
        })
        const scrollWrapperStyle = {
            width: '20%'
            , height: '20%'
            , overflow: 'scroll'
            , position: 'absolute'
            , left: '0'
            , top: '0'
        }
        // scrollWrapper1 smaller
        const scrollWrapperEl1 = document.createElement('div')
        Object.assign(scrollWrapperEl1.style, scrollWrapperStyle)
        const child1 = document.createElement('div')
        Object.assign(child1.style, {
            width: '300%'
            , height: '300%'
        })
        scrollWrapperEl1.appendChild(child1)
        scrollWrapperEl1.scrollTop = 1000
        scrollWrapperEl1.scrollLeft = 1000

        // scrollWrapper2 larger
        const scrollWrapperEl2 = document.createElement('div')
        Object.assign(scrollWrapperEl2.style, scrollWrapperStyle)
        const child2 = document.createElement('div')
        Object.assign(child2.style, {
            width: '300px'
            , height: '300px'
        })
        scrollWrapperEl2.appendChild(child2)
        scrollWrapperEl2.scrollTop = 1000
        scrollWrapperEl2.scrollLeft = 1000

        scrollWrapperEl1.addEventListener('scroll', () => {
            scrollWrapperEl2.scrollTop = 1000
            scrollWrapperEl2.scrollLeft = 1000
        })
        scrollWrapperEl2.addEventListener('scroll', () => {
            scrollWrapperEl1.scrollTop = 1000
            scrollWrapperEl1.scrollLeft = 1000
        })

        wrapperEl.appendChild(scrollWrapperEl1)
        wrapperEl.appendChild(scrollWrapperEl2)

        el.appendChild(wrapperEl)
    }
}

const funcs = {
    roundNum,
    significantNum,
    domOnResize,
};

export default funcs;