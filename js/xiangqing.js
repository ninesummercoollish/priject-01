window.addEventListener('load', function () {
    var xq1 = document.querySelector('.xqbdl');
    var mask = document.querySelector('.mask')
    var big = document.querySelector('.big')
    // 1.当我们鼠标经过xq1 时 就显示隐藏mask 和big
    xq1.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    xq1.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 2.鼠标移动的时候让黄色的盒子跟随鼠标走
    xq1.addEventListener('mousemove', function (e) {
        // 1.先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        // console.log(x)
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // 2.把坐标给mak 减去mask盒子的一半就是mask的中心点
        // （3） 我们mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maxX = xq1.offsetWidth - mask.offsetWidth;// maskX做大移动距离
        var maxY = xq1.offsetHeight - mask.offsetHeight; //maxY 移动的最大距离
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maxX) {
            maskX = maxX;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maxY) {
            maskY = maxY
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //等比例遮罩层移动多少 大图片移动多少 有比例
        var img = document.querySelector('.big1');
        var imgMax = img.offsetWidth - big.offsetWidth; //大图片最大移动距离
        var imgMaxX = maskX * imgMax / maxX;
        var imgMaxY = maskY * imgMax / maxX;
        img.style.left = -imgMaxX + 'px';
        img.style.top = -imgMaxY + 'px';

    })

})