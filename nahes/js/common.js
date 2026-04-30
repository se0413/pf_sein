$(document).ready(function(){
    let win_w 
    let pc_mobile
    let scrolling
    let scrollTop = 0

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

    //header .gnb .gnb_open, header .gnb .gnb_close
    $('header .gnb .gnb_open').on('click', function(e){
        e.preventDefault()
        scrollTop = $(window).scrollTop()
        $('header').addClass('menu_over')
        $("html, body").css({overflow: "hidden"})
    })

    $('header .gnb .gnb_close').on('click', function(){
        $('header').removeClass('menu_over')
        $("html, body").css({overflow: "visible"})
        $(window).scrollTop(scrollTop)
    })

    //.popup
    $('.popup .btn_close').on('click', function(){
        $('.popup').hide()
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


})