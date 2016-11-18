
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
            '<dt><a href="#">前端基础</a></dt><dd><a href="#">HTML</a></dd><dd><a href="#">CSS</a></dd><dd><a href="#">JavaScript</a></dd><dd><a href="#">HTML5</a></dd><dd><a href="#">CSS3</a></dd><dd><a href="#">技术前瞻</a></dd><dt><a href="#">前端进阶</a></dt><dd><a href="#">Typescript</a></dd><dd><a href="#">前端安全</a></dd><dd><a href="#">项目实战</a></dd><dt><a href="#">前端框架</a></dt><dd><a href="#">jQuery</a></dd><dd><a href="#">jQuery&nbsp;UI</a></dd><dd><a href="#">jQuery&nbsp;Mobile</a></dd><dd><a href="#">Ext&nbsp;JS</a></dd><dd><a href="#">AngularJS</a></dd><dd><a href="#">ReactJS</a></dd><dd><a href="#">Bootstrap</a></dd><dd><a href="#">React&nbsp;Native</a></dd><dd><a href="#">Backbone</a></dd><dd><a href="#">Three.js</a></dd><dd><a href="#">MooTools</a></dd><dd><a href="#">Compass</a></dd><dt><a href="#">HTML5游戏</a></dt><dd><a href="#">Canvas</a></dd><dd><a href="#">SVG</a></dd><dd><a href="#">WebGL</a></dd><dd><a href="#">Cocos2d-js</a></dd><dd><a href="#">CreateJS</a></dd><dd><a href="#">Flash</a></dd><dd><a href="#">Unreal</a></dd><dd><a href="#">Egret</a></dd><dd><a href="#">Phaser</a></dd>'
        }else {
            $('#expandMenu').get(0).innerHTML = '<dt><a href="#">应用开发</a></dt><dd><a href="#">Android</a></dd><dd><a href="#">IOS</a></dd><dt><a href="#">游戏开发</a></dt><dd><a href="#">Cocos</a></dd><dd><a href="#">Unity3D</a></dd><dd><a href="#">SpriteKit</a></dd><dd><a href="#">2DUnreal</a></dd><dt><a href="#">常用框架</a></dt><dd><a href="#">Cordova</a></dd><dd><a href="#">React&nbsp;Native</a></dd>'
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
        $('.main-menu>li').css('borderRightColor','#35b558');
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
        $('.main-menu>li').css('borderRightColor','#35b558');
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
            includeLinkStyle('css/shelf-style2.css','shelf2');
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
    link.type = 'text/css';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}

function removeLinkStyle(ty) {
    document.getElementsByTagName('head')[0].removeChild($(ty).get(0));
}