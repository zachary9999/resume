$(function () {
    //跟字体大小设置
    var dewiceWidht = document.documentElement.clientWidth;
    if (dewiceWidht < 768) {
        document.documentElement.style.fontSize = dewiceWidht / 7.2 + 'px';
    } else {
        document.documentElement.style.fontSize = 768 / 7.2 + 'px';
    }
    //初始化一些动画
    initAnimation(1);
    //fullPage初始化
    $(function () {
        $('#dowebok').fullpage({
//            sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
            anchors: ['page1', 'page2', 'page3', 'page4'],
            menu: '#menu',
            onLeave: function (index, nextIndex, direction) {
                console.log(nextIndex);
                switch (nextIndex) {
                    case 2:
                        initPub();
                        break;
                }
                //菜单主题切换
                changeMenu(nextIndex);
                initAnimation(nextIndex);
            },
            afterLoad: function (anchorLink, index) {
                // initAnimation(index);
            }
        });
    });
});

/**
 * 动画分发函数
 * @param index 当前加载的页面
 */
var initAnimation = function (index) {
    switch (index) {
        case 1:
            initS1(true);
            initS3(false);
            initS4(false);
            break;
        case 2:
            initS1(false);
            initS3(false);
            break;
        case 3:
            initS1(false);
            initS3(true);
            initS4(false);
            break;
        case 4:
            initS1(false);
            initS3(false);
            initS4(true);
            break;
    }
};
var initS1 = function (bool) {
    var delayS = .2;
    if (bool) {
        $('#s1-1').css('animationDelay', delayS + 's').addClass('fadeInLeft');
        $('#s1-2').css('animationDelay', delayS*1.2+ 's').addClass('fadeInRight');
        $('#s1-3').css('animationDelay', delayS*1.5 + 's').addClass('fadeInUp');
    } else {
        $('#s1-1').removeClass('fadeInLeft');
        $('#s1-2').removeClass('fadeInRight');
        $('#s1-3').removeClass('fadeInUp');
    }
}
var initS3 = function (bool) {
    var delayS = .2;
    if (bool) {
        $('#s3-1').css('animationDelay', delayS + 's').addClass('fadeIn');
        $('#s3-2').css('animationDelay', delayS * 1.5 + 's').addClass('fadeInLeft');
        $('.progress-bar').css('animationDelay', delayS + 's').addClass('pba');
    } else {
        $('#s3-1').removeClass('fadeIn');
        $('#s3-2').removeClass('fadeInLeft');
        $('.progress-bar').removeClass('pba');
    }
}
var initS4 = function (bool) {
    var delayS = .2;
    if (bool) {
        $('#s4-1').css({'animationDelay':delayS + 's','animationDuration':'2s'}).addClass('fadeIn');
        $('#s4-2').css('animationDelay', delayS * 1.5 + 's').addClass('fadeInLeft');
        $('#s4-3').css('animationDelay', delayS * 1.5 + 's').addClass('ta');
    } else {
        $('#s4-1').removeClass('fadeIn');
        $('#s4-3').removeClass('ta');
    }
}
/**
 *动态改变菜单主题
 */
function changeMenu(index) {
    var $lis = $('#menu').find('li');
    $lis.each(function (key, el) {
        if (index !== 1) {
            $(el).addClass('br2');
        } else {
            $(el).removeClass('br2');
        }
        if(index===4){
            $(el).addClass('br3');
        }else{
            $(el).removeClass('br3');
        }
    });
}

/**
 * 3D作品集
 */
function initPub() {
    //3D相册
    var oImgs = document.querySelectorAll('.img'),
        nowX,
        nowY,
        lastX,
        lastY,
        minusX,
        minusY,
        roY = 0,
        roX = -20;
    var timer;
    var oWrap = document.querySelector("#wrap");
    // document.querySelectorAll('img') 会消耗性能
    for (var i = 0; i < oImgs.length; i++) {
        // debugger;
        var ideg = 360 / 11 * i;
        oImgs[i].style.transform = 'rotateY(' + ideg + 'deg) translateZ(350px)';
        // debugger;
        oImgs[oImgs.length - i - 1].style.transitionDelay = 0.2 * i + "s";
    }

    function getSin() {
        var sideB = nowX - lastX;
        var sideA = nowY - lastY;
        var sideC = Math.sqrt(sideA * sideA + sideB * sideB);
        var sinA = sideA / sideC;
        console.log(sinA);
    }

    document.onmousedown = function (e) {
        var e = e || window.event; //兼容IE与火狐
        // console.log(e.clientX + "  " + e.clientY);
        // debugger;
        lastX = e.clientX;
        lastY = e.clientY; //第一次执行的坐标

        this.onmousemove = function (e) {
            // debugger;
            var e = e || window.event; //兼容IE与火狐
            nowX = e.clientX;
            nowY = e.clientY;
            minusY = lastY - nowY; //坐标差
            minusX = nowX - lastX;
            roX += minusY * 0.002;
            roY += minusX * 0.004;

            if (getSin() > 0.7) {

                oWrap.style.transform = "rotateX(" + roX + "deg)";
            }
            else {
                oWrap.style.transform = "rotateY(" + roY + "deg)";
            }
            // oWrap.style.transform = "rotateX(" + roX + "deg) rotateY(" + roY + "deg)";


        }
        this.onmouseup = function () {

            if (Math.abs(getSin()) > 0.7) {

                oWrap.style.transform = "rotateX(" + roX + "deg)";
            }
            else {
                oWrap.style.transform = "rotateY(" + roY + "deg)";
            }
            // debugger;


            //惯性添加
            this.onmousemove = null; //清除事件
            timer = setInterval(function () {
                minusY *= .98;
                minusX *= .98; //速度递减

                roX -= minusY * 0.02;
                roY -= minusX * 0.01;


                // oWrap.style.transform = "rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
                // oWrap.style.transform = "rotateY(" + roY + "deg)";
                if (Math.abs(minusY) < .1 && Math.abs(minusX) < .1) {
                    clearInterval(timer);
                }
            }, 13)
        }// end mouse up
    }
}