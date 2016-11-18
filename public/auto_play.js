/**
 * 轮播图:
 * 1.通过改变图片盒子的位置实现图片位移
 * 2.添加显示图片的小圆点对应于图片的滚动，且小圆点能实现点击效果
 * 3.实现自动轮播
 * 4.给盒子添加hover事件，使鼠标滑动到盒子上图片停止轮播，滑出时开始轮播
 * 5.轮播图的无缝连接效果在于第一张图片和最后一张图片的衔接
 */
define(['jquery'], function($) {
    $(document).ready(function() {
            var i = 0;
            // 图片索引
            var clone = $(".focus-img>a").eq(0).clone();
            $(".focus-img").append(clone);
            // 克隆第一张图片并放到最后一张位置,使图片在利用css改变位置使能够更自然
            var imgWidth = $(".focus-con").width();
            // 获取图片盒子的宽度，方便设置滚动距离
            // console.log(imgWidth);
            var imgLength = $(".focus-img>a").size();
            // console.log(imgLength);
            // 获取图片张数
            for (var j = 0; j < imgLength - 1; j++) {
                // 动态添加小圆点li标签
                $(".focus-num").append("<a></a>");
            }
            $(".focus-num>a").eq(0).addClass("on-num");
            /**
             *roll:
             *1.获取图片位置来控制滚动距离
             *2.利用css改变位置实现无缝轮播
             */
            function roll() {
                if (i == imgLength) {
                    //btn_l按钮
                    $(".focus-img").css({
                        left: 0
                    });
                    i = 1;
                }
                if (i == -1) {
                    //btn_r按钮
                    $(".focus-img").css({
                        left: -parseInt((imgLength - 1) * imgWidth)
                    });
                    i = imgLength - 2;
                }
                $(".focus-img").stop().animate({ left: -i * imgWidth }, 500);
                if (i == imgLength - 1) {
                    $(".focus-num>a").eq(0).addClass("on-num").siblings().removeClass("on-num");
                } else {
                    $(".focus-num>a").eq(i).addClass("on-num").siblings().removeClass("on-num");
                }
            }
            // 自动轮播
            var auto = setInterval(function() {
                i++;
                roll();
            }, 3000);


            $(".focus-con").hover(function() {
                $('.left-btn,.right-btn').fadeIn('middle');
                clearInterval(auto);
            }, function() {
                auto = setInterval(function() {
                    i++;
                    roll();
                }, 3000);
            });
            $(".focus-con").mouseleave(function() {
                    $('.left-btn,.right-btn').fadeOut('middle');
                })
                // 鼠标滑动到小圆点上
            $(".focus-num>a").hover(function() {
                var index = $(this).index();
                $(".focus-img").stop().animate({
                    left: -parseInt(index * imgWidth)
                }, 500);
                $(".focus-num>a").eq(index).addClass("on-num").siblings().removeClass("on-num");
                // 给当前元素添加选中属性同时移除其他同类元素的选中属性
            })

            // 点击轮播
            $(".left-btn").click(function() {
                i++;
                roll();
            })
            $(".right-btn").click(function() {
                i--;
                roll();
            })



            /**
             * 简单轮播：
             * 点击按钮实现轮播
             */
            var j=0;
            cloneItem($(".items-ul>li"),$(".items-ul"));
            cloneItem($(".enterprise .strategy-box>a"),$(".enterprise .strategy-box"));
            cloneItem($(".university .strategy-box>a"),$(".university .strategy-box"));
            cloneItem($("#report .strategy-box>a"),$("#report .strategy-box"));

            $('.focus-item').mouseover(function() {
                $('.s-focus-left-btn,.s-focus-right-btn').fadeIn('middle');
            })
            $('.focus-item').mouseleave(function() {
                $('.s-focus-left-btn,.s-focus-right-btn').fadeOut('middle');
            })
            $('.enterprise .strategy-con').mouseover(function() {
                $('.e-left-btn,.e-right-btn').fadeIn('middle');
            })
            $('.enterprise .strategy-con').mouseleave(function() {
                $('.e-left-btn,.e-right-btn').fadeOut('middle');
            })
            $('.university .strategy-con').mouseover(function() {
                $('.u-left-btn,.u-right-btn').fadeIn('middle');
            })
            $('.university .strategy-con').mouseleave(function() {
                $('.u-left-btn,.u-right-btn').fadeOut('middle');
            })
            $('#report .strategy-con').mouseover(function() {
                $('.r-left-btn,.r-right-btn').fadeIn('middle');
            })
            $('#report .strategy-con').mouseleave(function() {
                $('.r-left-btn,.r-right-btn').fadeOut('middle');
            })
            $('.s-focus-left-btn').click(function() {
                var iWidth=$(".items-ul li");
                var iLength=$(".items-ul>li");
                var moveContent=$(".items-ul");
                j++;
                roll_item(2,4,iWidth,iLength,moveContent);
            });
            $('.s-focus-right-btn').click(function() {
                var iWidth=$(".items-ul li");
                var iLength=$(".items-ul>li");
                var moveContent=$(".items-ul");
                j--;
                roll_item(2,4,iWidth,iLength,moveContent);
            });
            $('.e-left-btn').click(function() {
                var iWidth=$(".enterprise .strategy-box>a");
                var iLength=$(".enterprise .strategy-box>a");
                var moveContent=$(".enterprise .strategy-box");
                j++;
                roll_item(5,7,iWidth,iLength,moveContent);
            });
            $('.e-right-btn').click(function() {
                var iWidth=$(".enterprise .strategy-box>a");
                var iLength=$(".enterprise .strategy-box>a");
                var moveContent=$(".enterprise .strategy-box");
                j--;
                roll_item(5,7,iWidth,iLength,moveContent);
            });
            $('.u-left-btn').click(function() {
                var iWidth=$(".university .strategy-box a");
                var iLength=$(".university .strategy-box a");
                var moveContent=$(".university .strategy-box");
                j++;
                roll_item(6,8,iWidth,iLength,moveContent);
            });
            $('.u-right-btn').click(function() {
                var iWidth=$(".university .strategy-box a");
                var iLength=$(".university .strategy-box a");
                var moveContent=$(".university .strategy-box");
                j--;
                roll_item(6,8,iWidth,iLength,moveContent);
            });
            $('.r-left-btn').click(function() {
                var iWidth=$("#report .strategy-box>a");
                var iLength=$("#report .strategy-box>a");
                var moveContent=$("#report .strategy-box");
                j++;
                roll_item(5,7,iWidth,iLength,moveContent);
            });
            $('.r-right-btn').click(function() {
                var iWidth=$("#report .strategy-box>a");
                var iLength=$("#report .strategy-box>a");
                var moveContent=$("#report .strategy-box");
                j--;
                roll_item(5,7,iWidth,iLength,moveContent);
            });
            function cloneItem(con,cont){
                for(var r=0;r<parseInt(con.length/2);r++){
                    var clone_item=con.eq(r).clone();
                    cont.append(clone_item);
                }
            }
            function roll_item(m,n,iWidth,iLength,moveCon) {
                var itemWidth=parseInt(iWidth.width())+1.8;
                console.log(itemWidth);
                var itemLength=iWidth.size();
                if (j == itemLength-m) {
                    //btn_l按钮,当图片移动到最后一张时再点击回到第一张
                    moveCon.css({
                        left: 0
                    });
                    j = 1;
                }
                if (j == -1) {
                    //btn_r按钮
                    moveCon.css({
                        left: parseInt(-(itemLength -(n-1)) * itemWidth)
                    });
                    j = itemLength-n;
                    // j=itemLength;
                }
                moveCon.stop().animate({ left: -j*itemWidth }, 500);
            }
    })
})
