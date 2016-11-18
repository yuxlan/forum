define(['jquery'], function($) {
    $(document).ready(function() {
        $('.back-arrow').click(function() {
            $('body').animate({ scrollTop: 0 }, 800);

        });

        $(window).scroll(function() {
            var scrollHeight = $(window).scrollTop();
            // 获取滚动高度
            // console.log(scrollHeight);
            if (scrollHeight > 0) {
                // $(".backTop .back-arrow").fadeOut('slow');
                $(".back-arrow").show("slow");
            }
            if (scrollHeight == 0) {
                $(".back-arrow").fadeOut('slow');
            }
        });
    });
})
