define(['jquery'], function($) {
    $(document).ready(function() {
        $(".lesson-box-con").each(function(index) {
            var listLesson = $(this);
            var i=0;
            i=index;
            listLesson.hover(
                function() {
                    $('.lesson-infor').eq(i).animate({ "height": "175px" },300);
                    $('.lesson-infor-p').eq(i).slideDown('fast');
                    $('.order').eq(i).slideDown('fast');
                    $('.learn-number').eq(i).slideDown('fast');
                    $('.lessonplay').eq(i).animate({ "opacity": "1" }, 200);
                    console.log(i);
                },
                function() {

                    $('.lesson-infor').animate({ height: "88px" }, 200);
                    $('.lesson-infor-p').slideUp('fast');
                    $('.lessonplay').animate({ opacity: "0" }, 200);
                    $('.order,.learn-number').slideUp('middle');
                }
            )
        })
    })
})
