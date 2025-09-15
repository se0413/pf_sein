$(document).ready(function () {
    const visual_swiper = new Swiper(".visual .swiper", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                document.querySelector(".total").textContent =
                    formatNumber(this.slides.length - this.loopedSlides * 2);
                updateNumber(this.realIndex + 1);
                resetProgress();
            },
            slideChangeTransitionStart: function () {
                updateNumber(this.realIndex + 1);
                resetProgress();
            },
        },
    });

    function formatNumber(num) {
        return num.toString().padStart(2, "0");
    }

    function updateNumber(current) {
        document.querySelector(".current").textContent = formatNumber(current);
    }

    function resetProgress() {
        const progressBar = document.querySelector(".progress-bar");
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";

        setTimeout(() => {
            progressBar.style.transition = "width 5s linear";
            progressBar.style.width = "100%";
        }, 50);
    }

    function applyTabBehavior() {
        $('.team, .signature').each(function () {
            let $group = $(this);
            let $tab_btn = $group.find('.tap_area .tap_btn ul li');
            let $tab_cnt = $group.find('.tap_area .tap_cnt div[role="tabpanel"]');
            let $tab_cnt_prant = $group.find('.tap_area .tap_cnt');

            if ($(window).width() <= 1024 && $group.hasClass('signature')) {
                // 모바일 + signature일 때만: 탭버튼/사진 숨기고, 컨텐츠 전부 보이게
                $tab_btn.hide().off('click');       // 클릭 이벤트 제거
                $tab_cnt.show().addClass('active'); // 모든 컨텐츠 노출
                $tab_cnt_prant.addClass('mobile-grid'); // grid 적용
            } else {
                // PC 전체 + 모바일 team: 기존 탭 동작
                $tab_btn.show();
                $tab_cnt.hide().removeClass('active');
                $tab_cnt.first().show().addClass('active');

                // grid 제거
                $tab_cnt_prant.removeClass('mobile-grid');

                $tab_btn.off('click').on('click', function () {
                    let $this = $(this);
                    let tab_name = '#' + $this.attr('aria-controls');

                    $tab_btn.removeClass('active').attr('aria-selected', 'false');
                    $this.addClass('active').attr('aria-selected', 'true');

                    $tab_cnt.hide().removeClass('active');
                    $tab_cnt_prant.find(tab_name).show().addClass('active');
                });
            }
        });
    }

    // 최초 실행
    applyTabBehavior();
    // 리사이즈 시 실행
    $(window).on('resize', applyTabBehavior);

    const ba_swiper = new Swiper('.ba_cnt .swiper', {
        slidesPerView: 1.5,       // 1장 + 양옆이 잘린 형태
        centeredSlides: true,     // 가운데 정렬
        loop: true,
        spaceBetween: 24,
        pagination: { 
            el: '.ba_cnt .btn_wrap .paging', 
            clickable: true, 
            type: 'bullets' 
        },
        breakpoints: {
            1900: { slidesPerView: 3 },  
            1901: { slidesPerView: 1 }
        }
    });



    const place_swiper = new Swiper('.place .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpoints: {
            1900: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
        },
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true, type: 'fraction' },
        scrollbar: { el: ".place .swiper-scrollbar", hide: false, draggable: true },
    });

    $('.quick_menu .top').on('click', function(){
        $('html, body').animate({
            scrollTop:0
        },500)
    })
});
