$(document).ready(function(){
    let win_w 
    let pc_mobile
    let scrolling

    function resize_chk(){
        win_w = $(window).width()
        if(win_w > 1400){
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

    // 서브페이지는 항상 fixed
    $('header').addClass('fixed')

    // header
    $('header .gnb .gnb_wrap .depth1 > li').on('mouseenter focusin', function(){
        if(pc_mobile == 'pc'){
            $('header .gnb .gnb_wrap .depth1 > li').removeClass('on')
            $(this).addClass('on')
            $('header').addClass('menu_over')
        }
    })
    $('header').on('focusout', function(){
        if(pc_mobile == 'pc'){
            $('header .gnb .gnb_wrap .depth1 > li').removeClass('on')
            $(this).removeClass('menu_over')
        }
    })
    $('header').on('mouseleave', function(){
        if(pc_mobile == 'pc'){
            $('header .gnb .gnb_wrap .depth1 > li').removeClass('on')
            $(this).removeClass('on')
            $('header').removeClass('menu_over')
        }
    })

    $("header .gnb .gnb_wrap .depth1 > li > a").on("click", function(e){
        if(pc_mobile == 'mobile'){
            e.preventDefault();
            $(this).parent().toggleClass('open')
        }
    });

    //header .gnb .gnb_open, header .gnb .gnb_close
    $('header .gnb .gnb_open').on('click', function(){
        $('header').addClass('menu_open')
        $("html, body").css({overflow : "hidden", height : $(window).height()}).bind("scroll touchmove mousewheel", function(e){e.preventDefault();e.stopPropagation();return false;},function(){passive:false});
    })
    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_open')
        $("html, body").css({overflow : "visible", height : "auto"}).unbind('scroll touchmove mousewheel');
    })

    let sub_contents_top
    let window_h
    let sub_contentse_w

    function scroll_chk(){
        window_h = $(window).height() //브라우저높이
        scrolling = $(window).scrollTop() //스크롤된 값
        sub_contents_top =$('.sub_contents').offset().top

        if(scrolling > (sub_contents_top - window_h + (window_h / 5))){
                
        sub_contentse_w = (scrolling - (sub_contents_top - window_h))*1.2 + 565

            if(sub_contentse_w > $(window).width()){
                sub_contentse_w = $(window).width() 
                $('.dongwha_slogun').addClass('end')
            }

            $('.sub_contents .dongwha_slogun .photo_wrap .photo').width(sub_contentse_w)
        }
    }
    scroll_chk() //로딩된 이후 1번
    $(window).scroll(function(){ //브라우저가 스크롤 될때마다
        scroll_chk()
    })
    $(window).resize(function(){ //브라우저가 리사이즈 될때마다
        scroll_chk()
    })
    
})
