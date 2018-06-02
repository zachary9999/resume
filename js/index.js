$(function () {
    var $nav=$('#nav');
    var $menu=$('#menu');
    $menu.click(function () {
        $nav.toggleClass('h_auto');
    });

    var isPreLoadReady=false; //页面预加载
    var imgs=$('img');
    var len=imgs.length;
    var  blower = new LoadingBlower("#loadingContainer");
    // blower.addProgress(50);
    // $.preload(imgs, {
    //     each: function(count) {
    //         blower.addProgress((Math.round((count + 1) / len)*100));
    //         console.log((Math.round((count + 1) / len)*100));
    //     },
    //     all: function() {
    //         $('#preloadLayer').hide();
    //     }
    // })
    //
    // window.onscroll = function(e){
    //     // $nav.removeClass('h_auto');
    //     console.log(document.documentElement.scrollTop);
    //     // e.preventDefault();
    //     if(!isPreLoadReady){
    //         $('html, body').animate({scrollTop:0}, 'slow');
    //     }
    // }


    //初始化评分控件
    var $rateBoxs=$('.rate_box');
    $rateBoxs.each(function () {
        var $rateList= $(this).find('.rate_list');
        var count= $rateList.attr('data-count');
        var $txtCount=$(this).find('.count');
        $txtCount.text(count);
        var $listItem=$rateList.find('.rate_item');
        // console.log($listItem);
        for(var key=0;key<count;key++){
            $($listItem[key]).addClass('active');
        }
    })

    //swiper初始化
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})