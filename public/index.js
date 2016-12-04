
$(function() {
	// 头部搜索按钮动画 显示
    $('#search-icon').on('click', function() {
    	// alert('hello');
        $('#search-bar').animate({width: "880px",opacity:1}, 1000,function(){
        	$('#nav-main').hide();
        });
        
        $('#tools').hide();
    });

    // 头部搜索按钮动画 隐藏
    $('#search-close').on('click', function() {
        $('#search-bar').animate({width: "0",opacity:0}, 1000);
        $('#nav-main').show();
        $('#tools').show();
    });

    var t = null;
    // 大菜单显示
    $('.main--menu li').hover(function () {
        $('.main-menu>li').css('borderRightColor','#fff');
        t = this;
        if(1 == $('.main--menu li').index(t)){
            $('#expandMenu').get(0).innerHTML = 
            ''
        }else {
            $('#expandMenu').get(0).innerHTML = ''
        }
        $(this).css({
            // 'borderRightColor':'#fff',
            'background':'#fff',
            'z-index': '600',
            'position': 'relative',
            'left': '-1px',
            'width': '211px',
            'border': '1px solid',
            'border-color': '#ccc #fff #ccc #ccc'
        });
        $('#expandMenu').show();
    },function () {
        // alert('hello');
        $('.main-menu>li').css('borderRightColor','#9fe6f2');
        $(this).css({
            // 'borderRightColor':'#35b558',
            'background':'#fff',
            'z-index': '600',
            'position': 'relative',
            'left': '0px',
            'width': '208px',
            'border': '1px solid',
            'border-color': '#eee #fff #fff #fff'
        });
        $('#expandMenu').hide();
    });

    $('#expandMenu').hover(function () {
        $('.main-menu>li').css('borderRightColor','#fff');
        $(t).css({
            // 'borderRightColor':'#fff',
            'background':'#fff',
            'z-index': '600',
            'position': 'relative',
            'left': '-1px',
            'width': '211px',
            'border': '1px solid',
            'border-color': '#ccc #fff #ccc #ccc'
        });
        $('#expandMenu').show();
    },function () {
        $('.main-menu>li').css('borderRightColor','#9fe6f2');
        $(t).css({
            // 'borderRightColor':'#35b558',
            'background':'#fff',
            'z-index': '600',
            'position': 'relative',
            'left': '0px',
            'width': '208px',
            'border': '1px solid',
            'border-color': '#eee #fff #fff #fff'
        });
        $('#expandMenu').hide();
    });

    
    includeLinkStyle('../src/stylesheets/index.less','shelf');
    var has = true;

    $('.lookWay-tile').on('click',function () {
        // alert($('.shelf'));
        if(!has){
            includeLinkStyle('../src/stylesheets/index.less','shelf');
            removeLinkStyle('.shelf2');
            has = true;
        }
    });

    $('.lookWay-list').on('click',function () {
        // alert($('.shelf2').lenght);
        if(has){
            includeLinkStyle('../src/stylesheets/index.less','shelf2');
            removeLinkStyle('.shelf');
            $('.body-main').css('height',' 1350px');
            has = false;
        }
    });
});

function includeLinkStyle(url,ty) {
    var link = document.createElement('link');
    link.className = ty;
    link.rel = 'stylesheet';
    link.type = 'text/less';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}

function removeLinkStyle(ty) {
    document.getElementsByTagName('head')[0].removeChild($(ty).get(0));
}