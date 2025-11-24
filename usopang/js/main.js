$(document).ready(function(){

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



    let tab_btn = $('.menu .tap_area .tap_btn ul li') 
    let tab_name
    let tab_cnt = $('.menu .tap_area .tap_cnt div[role="tabpanel"]')
    let tab_cnt_prant = $('.menu .tap_area .tap_cnt')


    // 탭 클릭
    tab_btn.on('click', function(){
        tab_btn.removeClass('active')
        $(this).addClass('active')

        tab_btn.attr('aria-selected', 'false')
        $(this).attr('aria-selected', 'true')

        tab_name = $(this).attr('aria-controls')
        tab_name = '#'+ tab_name 

        tab_cnt.removeClass('active')
        tab_cnt_prant.find(tab_name).addClass('active')
    })

    // .pannel swiper
    const signature_cnt_swiper = new Swiper('.signature_cnt .swiper', { 
        slidesPerView: 1, 
        spaceBetween: 16, 
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            400: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
        loop: false, 
        navigation: { 
            nextEl: '.tap_cnt .btn_next',  
            prevEl: '.tap_cnt .btn_prev',  
        },
    });

    let $defaultItem = $('.menu .signature_cnt li.on');

    function handleMenuHover() {
        if (window.innerWidth > 1024) {
            // PC만 hover 이벤트
            $('.menu .signature_cnt li').off('mouseenter mouseleave');
            
            $('.menu .signature_cnt li').on('mouseenter', function(){
                $('.menu .signature_cnt li').removeClass('on');
                $(this).addClass('on');
            });
            
            $('.menu .signature_cnt li').on('mouseleave', function(){
                $('.menu .signature_cnt li').removeClass('on');
                $defaultItem.addClass('on');
            });
            
            // 기본 상태
            $('.menu .signature_cnt li').removeClass('on');
            $defaultItem.addClass('on');
        } else {
            // 모바일: 모든 li에 on
            $('.menu .signature_cnt li').off('mouseenter mouseleave');
            $('.menu .signature_cnt li').addClass('on');
        }
    }

    handleMenuHover();
    $(window).on('resize', handleMenuHover);
    

})