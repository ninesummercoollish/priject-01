function animate(obj, target, callBack) {  //这里 obj 是对象 ， target是目标  callBack 是回调函数
    clearInterval(obj.timer); //清除以前的定时器 只保留一个定时器
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10//求的是目标的缓存 这里是小数值
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //负值和正字 都会往大了取值
        if (obj.offsetLeft == target) { //这里用等于 因为后面的数会越来越精准
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            if (callBack) {  //如果有这个 回调函数
                callBack(); //调用方法
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px' //元素会越来越小走的步数
    }, 15);
}

