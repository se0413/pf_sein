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

    // 올바른 셀렉터로 수정
    let pannel2Swiper = new Swiper('#sig_panel_02 .swiper', { 
        slidesPerView: 3, 
        spaceBetween: 20, 
        centeredSlides: false, 
        loop: true, 
        navigation: { 
            nextEl: '#sig_panel_02 .btn_next',  
            prevEl: '#sig_panel_02 .btn_prev',  
        },
    });

    let pannel3Swiper = new Swiper('#sig_panel_03 .swiper', { 
        slidesPerView: 3, 
        spaceBetween: 20, 
        centeredSlides: false, 
        loop: true, 
        navigation: { 
            nextEl: '#sig_panel_03 .btn_next',  
            prevEl: '#sig_panel_03 .btn_prev',  
        },
    });

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


    

})