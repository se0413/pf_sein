$(document).ready(function(){

    const visualSwiper = new Swiper('.visual .swiper', {
        effect: 'fade',
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

    // Ingredients 섹션 스크롤 애니메이션
    const ingredientsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.ingredients .butter').classList.add('on');
                document.querySelector('.ingredients .milk').classList.add('on');
                document.querySelector('.ingredients .heart').classList.add('on');
                document.querySelector('.ingredients .salt').classList.add('on');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px'
    });

    ingredientsObserver.observe(document.querySelector('.ingredients'));


    // 탭 관련
    let tab_btn = $('.menu .tap_area .tap_btn ul li');
    let tab_name;
    let tab_cnt = $('.menu .tap_area .tap_cnt div[role="tabpanel"]');
    let tab_cnt_prant = $('.menu .tap_area .tap_cnt');

    const pannel1Swiper = new Swiper('#sig_panel_01 .swiper', { 
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
    });
    
    const pannel2Swiper = new Swiper('#sig_panel_02 .swiper', { 
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
            nextEl: '#sig_panel_02 .btn_next',
            prevEl: '#sig_panel_02 .btn_prev',  
        },
    });

    const pannel3Swiper = new Swiper('#sig_panel_03 .swiper', { 
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
            nextEl: '#sig_panel_03 .btn_next',
            prevEl: '#sig_panel_03 .btn_prev',  
        },
    });

    // 탭 클릭 이벤트
    tab_btn.on('click', function(){
        tab_btn.removeClass('active');
        $(this).addClass('active');

        tab_btn.attr('aria-selected', 'false');
        $(this).attr('aria-selected', 'true');

        tab_name = $(this).attr('aria-controls');
        tab_name = '#' + tab_name;

        tab_cnt.removeClass('active');
        tab_cnt_prant.find(tab_name).addClass('active');
    });

    // 메뉴 hover 효과
    let $defaultItem = $('.menu .signature_cnt li.on');

    function handleMenuHover() {
        if (window.innerWidth > 1024) {
            $('.menu .signature_cnt li').off('mouseenter mouseleave');
            
            $('.menu .signature_cnt li').on('mouseenter', function(){
                $('.menu .signature_cnt li').removeClass('on');
                $(this).addClass('on');
            });
            
            $('.menu .signature_cnt li').on('mouseleave', function(){
                $('.menu .signature_cnt li').removeClass('on');
                $defaultItem.addClass('on');
            });
            
            $('.menu .signature_cnt li').removeClass('on');
            $defaultItem.addClass('on');
        } else {
            $('.menu .signature_cnt li').off('mouseenter mouseleave');
            $('.menu .signature_cnt li').addClass('on');
        }
    }

    // place
    handleMenuHover();
        $(window).on('resize', handleMenuHover);

        $(document).ready(function(){
        
        // 깃발 버튼 클릭 이벤트
        $('.map_photo button').on('click', function(){
            // 모든 버튼 비활성화
            $('.map_photo button').removeClass('active');
            // 클릭한 버튼 활성화
            $(this).addClass('active');
            
            // 클릭한 버튼의 data-store 값 가져오기
            const storeId = $(this).data('store');
            
            // 모든 지점 정보 숨기기
            $('.map_info > div').removeClass('active').hide();
            
            // 해당 지점 정보만 보이기
            $('#' + storeId).addClass('active').fadeIn(300);
        });
        
        // 페이지 로드 시 첫 번째 지점 자동 표시
        $('.map_photo button').first().click();
    });

    //review
    const review_swiper = new Swiper('.review .swiper', { 
        slidesPerView: '2.5',
        spaceBetween: 16,
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        breakpoints: {
            1600: {
                centeredSlides: true,
                slidesPerView: 6.5,
                spaceBetween: 20,
                initialSlide: 3,
            },
            1024: {
                centeredSlides: true,
                slidesPerView: 3.5,
                spaceBetween: 16,
                initialSlide: 3,
            },
            768: {
                centeredSlides: true,
                slidesPerView: 2.5,
                spaceBetween: 16,
                initialSlide: 3,
            },
        },
    });

});