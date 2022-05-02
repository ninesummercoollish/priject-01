window.addEventListener('load', function () {
    console.log(1)
    var focus = document.querySelector('.focus')
    var left = focus.children[0];
    var ul = focus.querySelector('ul');
    var right = document.querySelector('.rightf');
    var dll = document.querySelector('.f1');
    var dl = dll.children[0];
    // 2.鼠标经过就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null //清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function () {
            right.click();
        }, 2000)
    })
    // 3.动态的生成小圆圈 有几张图片就生成几个源
    // console.log(ul.children.length)
    // 少循环一次因为 重复了一张图片
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个dd; 把li 放进 dl里面
        var dd = document.createElement('dd');
        dl.appendChild(dd);
        // 记录当前dd的索引号 并保存
        dd.setAttribute('index', i);
        // 4.小圆圈排他思想 可以直接在生成的小圆圈的同时 直接绑定点击事件
        dd.addEventListener('click', function () {
            for (i = 0; i < dl.children.length; i++) {
                dl.children[i].className = '';
            }
            this.className = 'current'
            // 第二种写法 排他思想在外面写
            /* for (var i = 0; i < dl.children.length; i++) {
                dl.children[i].addEventListener('click', function () {
                    for (i = 0; i < dl.children.length; i++) {
                        dl.children[i].className = '';
                    }
                    this.className = 'current'
                })
            } */
            // 当我们点击了这个按钮就拿到这个按钮的索引号
            var index = this.getAttribute('index')
            // 当我们点击了某个 li 把 li的索引号 给num
            num = index;
            // 当我们点击了某个 li 把 li的索引号 给circle;
            circle = index;
            // 5.点击小圆圈,移动图片 移动的是ul   距离是 圆圈的索引号乘与 图片的宽度 是负值
            var focusWidth = focus.offsetWidth;
            animate(ul, -index * focusWidth)
            // console.log(focusWidth, index)
        })
    }
    // 把dl中的第一个dd 创建个类名
    dl.children[0].className = 'current';
    // 6.克隆第一张图片 dd 放到 ul 最后面
    // var first = dl.children[0].cloneNode(true);
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)
    // 7.点击右侧按钮 图片滚动一张
    var num = 0;
    // circle是控制小圆圈的播放
    var circle = 0;
    var focusWidth = focus.offsetWidth;
    var flag = true;
    //flag 节流阀门
    //关闭节流阀
    right.addEventListener('click', function () {
        // 如果走到了最后复制的一张图片此时ul要快速复原 left改为0
        // alert('1')
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth, function () {
            flag = true;
        });
        // 8.点击右侧按钮 小圆圈跟随着一起变化 
        circle++;
        // 如果circle == 4 说明走到我们克隆的这张图了 我们就复原
        if (circle == dl.children.length) {
            circle = 0;
        }
        // 先清除所有的小圆圈
        for (var i = 0; i < dl.children.length; i++) {
            dl.children[i].className = '';
        }
        // 留下当前小圆圈的类名
        dl.children[circle].className = 'current'
    })

    // 9.左侧按钮做法
    left.addEventListener('click', function () {
        // 如果走到了最后复制的一张图片此时ul要快速复原 left改为0
        // alert('1')
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';

        }
        num--;
        animate(ul, -num * focusWidth
            //打开节流阀
        );
        // 8.点击右侧按钮 小圆圈跟随着一起变化 
        circle--;
        // 如果circle < 0  说明第一张图片了 则小圆圈要改为第四个 (3)
        if (circle < 0) {
            circle = dl.children.length - 1;
        }
        // 先清除所有的小圆圈
        for (var i = 0; i < dl.children.length; i++) {
            dl.children[i].className = '';
        }
        // 留下当前小圆圈的类名
        dl.children[circle].className = 'current'
    })


    // 10.自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        right.click();
    }, 2500)



})