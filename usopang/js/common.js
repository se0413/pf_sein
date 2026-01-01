$(document).ready(function(){
    let win_w 
    let pc_mobile
    let scrolling

    function resize_chk(){
        win_w = $(window).width()
        if(win_w > 1024){
            pc_mobile = 'pc'
        }else{
            pc_mobile = 'mobile'
        }
        console.log(pc_mobile)
    }
    
    resize_chk()
    $(window).resize(function(){
        resize_chk()
    })


    $('header').on('mouseenter focusin', function(){
        $(this).addClass('fixed')
    })
    $('header').on('mouseleave', function(){
        if(scrolling <= 0){
            $(this).removeClass('fixed')
        }
    })

    function scroll_chk(){
        scrolling = $(window).scrollTop()
        if(scrolling > 0){
            $('header').addClass('fixed')
        }else{
            $('header').removeClass('fixed')
        }   
    }
    scroll_chk()
    $(window).scroll(function(){
        scroll_chk()
    })

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin', function(){
        if(pc_mobile == 'pc'){
            $('header').addClass('menu_over')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('on')
            $(this).addClass('on')
        }
    })
    $('header').on('mouseleave', function(){
        if(pc_mobile == 'pc'){
            $('header').removeClass('menu_over')
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('on')
            $(this).removeClass('on')
        }
    })
    

    //header .gnb .gnb_open, header .gnb .gnb_close
    $('header .gnb .gnb_open').on('click', function(e){
        $('header').addClass('menu_open')
        $("html, body").css({overflow : "hidden", height : $(window).height()}).bind("scroll touchmove mousewheel", function(e){e.preventDefault();e.stopPropagation();return false;},function(){passive:false});
    })
    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_open')
        $("html, body").css({overflow : "visible", height : "auto"}).unbind('scroll touchmove mousewheel');
    })

    //footer famillysite
    $('footer .famillysite button.btn_open').on('click', function(){
        $('footer .famillysite').addClass('open')
        $('footer .famillysite ul').slideDown()
    })
    $('footer .famillysite button.btn_close').on('click', function(){
        $('footer .famillysite').removeClass('open')
        $('footer .famillysite ul').slideUp()
    })

    //cursor
    $(window).on('scroll mousemove', function(e){  /* html cursor가 마우스 포인터를 따라다니게 하는 값 */
        $('.cursor').css('left', e.pageX + 'px');
        $('.cursor').css('top', e.pageY + 'px');
    });
    $('.c_event').hover(function(){ /* 특정한 요소에 마우스를 올렸을때만 on 클래스 주기 */
        $('.cursor').toggleClass('on');
    });

    $('body').css('overflow', 'hidden');

    $('.popup button').on('click', function () {
    // 팝업 닫기
    $('.popup').fadeOut(200);

    // 스크롤 다시 허용
    $('body').css('overflow', '');
    
    });
})