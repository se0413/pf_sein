$(document).ready(function(){
    let tab_btn = $('.board .tap_area .tap_btn ul li') 
    let tab_name
    let tab_cnt = $('.board .tap_area .tap_cnt div[role="tabpanel"]')
    let tab_cnt_prant = $('.board .tap_area .tap_cnt')
    
    const visualSwiper = new Swiper('.visual .swiper', {
        effect: 'fade', // fade 효과 추가
        fadeEffect: {
            crossFade: true
        },
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
    });

    $('.visual .btn_wrap .btn_stop').on('click', function(){
        visual_swiper.autoplay.stop();  
        $(this).hide()
        $('.visual .btn_wrap .btn_play').show()
    })
    $('.visual .btn_wrap .btn_play').on('click', function(){
        visual_swiper.autoplay.start();  
        $(this).hide()
        $('.visual .btn_wrap .btn_stop').show()
    })
    


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const photos = document.querySelectorAll('.ingredients .photo');
                photos.forEach((photo, index) => {
                    setTimeout(() => {
                        photo.classList.add('on');
                    }, index * 300);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px'
    });

    observer.observe(document.querySelector('.ingredients'));



    $('.board .main_link a').on('mouseover', function(){
        $('.board .main_link a').removeClass('on')
        $(this).addClass('on')
    })
    $('.board .main_link a').on('mouseleave', function(){
        $(this).removeClass('on')
    })

    $('.row_board .fa .rb_list ul li a').on('mouseover', function(){
        $('.row_board .fa .rb_list ul li a').removeClass('on')
        $(this).addClass('on')
    })
    $('.row_board .fa .rb_list ul li a').on('mouseleave', function(){
        $(this).removeClass('on')
    })

    tab_btn.on('click', function(){
        tab_btn.removeClass('active')
        $(this).addClass('active')

        tab_btn.attr('aria-selected', 'false')
        $(this).attr('aria-selected', 'true')

        tab_name = $(this).attr('aria-controls')
        tab_name = '#'+ tab_name 
        console.log(tab_name)

        tab_cnt.removeClass('active')
        tab_cnt_prant.find(tab_name).addClass('active')
        
     })


    const foundation_news_swiper = new Swiper('.foundation_news .swiper', { 

        slidesPerView: 1, 
        spaceBetween: 16, 
        centeredSlides: true, 
        loop: true, 

        navigation: { 
            nextEl: '.foundation_news .btn_next',  
            prevEl: '.foundation_news .btn_prev',  
        },

    });

    let start = $(window).height() * 0.2;
    AOS.init({
        offset: start,
        duration: 300, // 애니메이션 효과가 작동되는 시간
        easing: 'ease', // 가속도
        anchorPlacement: 'top-bottom'
    });


})