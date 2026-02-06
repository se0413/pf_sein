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


    $('header').on('mouseenter focusin', function(){
        $(this).addClass('fixed')
    })
    $('header').on('mouseleave', function(){
        //마우스를 아웃했을때 fixed 클래스를 삭제하는 건 맨 상단에 있을때만 가능
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
        // console.log(scrolling)
    }
    scroll_chk()
    $(window).scroll(function(){
        scroll_chk()
    })

    //header

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
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
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

    //quick
    
    $('.quick .top').on('click', function(){
        $('html, body').animate({
            scrollTop:0
        },500)
    })
    
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }

    window.addEventListener('scroll', function() {
        const quickMenu = document.querySelector('.quick');
        const footer = document.querySelector('footer'); // 또는 '#footer' 등 푸터의 선택자
        const margin = 60; // 하단에서 유지하고 싶은 기본 여백

        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // 푸터가 화면에 나타나기 시작했는지 확인
        if (footerRect.top < viewportHeight) {
            // 푸터가 화면을 가리는 만큼 퀵메뉴를 위로 밀어 올림
            const overlap = viewportHeight - footerRect.top;
            quickMenu.style.bottom = (overlap + margin) + 'px';
        } else {
            // 푸터가 보이지 않으면 기본 위치 유지
            quickMenu.style.bottom = margin + 'px';
        }
    });


    //famaiy_site

    $('footer .f_top .famaiy_site button.f_btn_open').on('click', function(){
        $('footer .f_top .famaiy_site ul').show()
        $('footer .f_top .famaiy_site button.f_btn_open').hide()
        $('footer .f_top .famaiy_site button.f_btn_close').show()
        })
    $('footer .f_top .famaiy_site button.f_btn_close').on('click', function(){
        $('footer .f_top .famaiy_site ul').hide()
        $('footer .f_top .famaiy_site button.f_btn_close').hide()
        $('footer .f_top .famaiy_site button.f_btn_open').show()
    })
    
})