define(['jquery'], function($) {
    $(document).ready(function() {
        /**
         * Tab键标签切换
         * 1.绑定点击事件
         * 2.设置隐藏和显示属性，点击事件触发相应的内容显示
         */
        $(".navbar").hover(function() {
            $('.navbar>ul').addClass('showtext');
            // console.log('hehehe');
        });
        $(".navbar").mouseleave(function() {
            $('.navbar>ul').removeClass('showtext');
            // console.log('hehehe');
        });

        $('.navbar>a').each(function(index) {
            var i = 1;
            var listNode = $(this);
            // $("div.show-index").removeClass("show-index");
            // $(".selected").removeClass("selected");
            // // 移除class使其隐藏
            $(this).hover(function() {
                $(".nav-hide-li").removeClass("nav-hide-li-bg");
                $(".nav-hide-li>span").removeClass("hide-angle");
                $('.navbar>a').css({ 'color': '#666666' });
                $(".nav-hide-li>span").eq(index - 1).addClass("hide-angle");
                $('.navbar>a').eq(index).css({ 'color': '#9fe6f2' });
                $(".nav-hide-li").eq(index - 1).addClass("nav-hide-li-bg");
            // }, function() {
            //     $('.navbar>a').css({ 'color': '#666666' });
            })

            $('.nav-hide-li').eq(index).hover(function() {
                $('.navbar>a').css({ 'color': '#666666' });
                $(".nav-hide-li").removeClass("nav-hide-li-bg");
                $(".nav-hide-li>span").removeClass("hide-angle");
                $(".nav-hide-li").eq(index).addClass("nav-hide-li-bg");
                $(".nav-hide-li>span").eq(index).addClass("hide-angle");
                $('.navbar>a').eq(index+1).css({ 'color': '#9fe6f2' });
            })
            $('.nav-hide-li').eq(index).mouseleave(function() {
                $('.navbar>a').eq(index).css({ 'color': '#666666' });
                $(".nav-hide-li>span").eq(index - 1).removeClass("hide-angle");
                $(".nav-hide-li").eq(index - 1).removeClass("nav-hide-li-bg");
            })
            $('.nav-bar').mouseleave(function(){
                $('.navbar>a').css({ 'color': '#666666' });
            })
        })


        /**
         *侧边栏切换
         */

        $(".con-left-li").each(function(index) {
            // 遍历tab按钮
            var listNode = $(this);
            $(this).hover(function() {
                // $(".selected").removeClass("selected");
                $(".lesson-list-detail").eq(index).addClass("showtext");
                // $(".lesson-list-detail").eq(index-1).removeClass("showtext");
                listNode.addClass("add-border", "add-color");
            })
            $(this).mouseleave(function() {
                // $(".selected").removeClass("selected");
                $(".lesson-list-detail").eq(index).removeClass("showtext");
                // $(".lesson-list-detail").eq(index-1).removeClass("showtext");
                listNode.removeClass("add-border", "add-color");
            })
        });

        /**
         *右边栏切换
         *
         */

        $(".r-links-li").each(function(index) {
            // 遍历tab按钮
            var listNode = $(this);
            $(this).hover(function() {
                $(".right-hide-links").addClass("showtext");
                $(".r-links-ul").addClass("hide");
                // $(".r-links-ul li").css({"display":"none"});
                // $(".selected").removeClass("selected");
                // $(".center_con>div").eq(index).addClass("showtext");
                $('.right-hide-li').eq(index).addClass("links-selected");
                // 对隐藏的导航进行设置
                $('.hide-recommend').eq(index).addClass("showtext");
                // 显示相应的隐藏内容
            })
            $('.right-links-icon').mouseleave(function() {
                $(".right-hide-links").removeClass("showtext");
                $(".r-links-ul").removeClass("hide");
                $('.right-hide-li').eq(index).removeClass("links-selected");
                $('.hide-recommend').eq(index).removeClass("showtext");
            })
        })



        $(".right-hide-li").each(function(index) {
            // 遍历tab按钮
            var listNode = $(this);
            listNode.hover(function() {
                $(".right-hide-li").removeClass("links-selected");
                $(".hide-recommend").removeClass("showtext");
                $('.right-hide-li').eq(index).addClass("links-selected");
                // 对隐藏的导航进行设置
                $('.hide-recommend').eq(index).addClass("showtext");
                // 显示相应的隐藏内容
            })
        })

        /**
         *每周课程
         *
         */
        $(".live-bar-li").each(function(index) {
            // 遍历tab按钮
            var listNode = $(this);
            listNode.hover(function() {
                $('.live-bar-li').removeClass("live-bar-li-on");
                $(".live-content").removeClass("showtext");
                $('.live-bar-li').eq(index).addClass("live-bar-li-on");
                // 对隐藏的导航进行设置
                $('.live-content').eq(index).addClass("showtext");
                // 显示相应的隐藏内容
            })
        })

        /**
         * 课程推荐
         */
        $(".hot-lesson-li").each(function(index) {
            // 遍历tab按钮
            var listNode = $(this);
            listNode.hover(function() {
                // 移除默认显示的内容
                $('.hot-lesson-li').removeClass("hot-lesson-li-on");
                $(".lesson-con").removeClass("showtext");
                // 显示当前内容
                $('.hot-lesson-li').eq(index).addClass("hot-lesson-li-on");
                $('.lesson-con').eq(index).addClass("showtext");
            })
        })
    })
})
