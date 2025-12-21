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


    $('.gnb').on('mouseenter focusin', function(){
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
    

    //header .gnb .gnb_open, header .gnb .gnb_close
    $('header .gnb .gnb_open').on('click', function(e){
        $('header').addClass('menu_open')
        $('header').removeClass('fixed')
        $("html, body").css({overflow : "hidden", height : $(window).height()}).bind("scroll touchmove mousewheel", function(e){e.preventDefault();e.stopPropagation();return false;},function(){passive:false});
    })
    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_open');
        $("html, body").css({overflow : "visible", height : "auto"}).unbind('scroll touchmove mousewheel');
    })

    $('header .gnb .gnb_wrap .depth1 > li').on('click', function(){
        $('header .gnb .gnb_wrap .depth1 > li').removeClass('active')
        $(this).addClass('active')
    })


})
