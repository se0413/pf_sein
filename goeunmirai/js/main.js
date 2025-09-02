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

            if ($(window).width() <= 1024) {
                // 모바일: 탭버튼/사진 숨기고, 컨텐츠 전부 보이게
                $tab_btn.hide();
                $tab_cnt.show();

                // 부모에 grid 적용
                $tab_cnt_prant.addClass('mobile-grid');
            } else {
                // PC: 기존 탭 동작
                $tab_btn.show();
                $tab_cnt.hide().removeClass('active');
                $tab_cnt.first().show().addClass('active');

                // PC에서는 grid 제거
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

    // 다른 Swiper 설정들 ...
    new Swiper('.ba_cnt .swiper', {
        autoplay: { delay: 5000, disableOnInteraction: true },
        effect: "fade",
        loop: true,
        pagination: { el: '.paging', clickable: true, type: 'bullets' },
    });

    const ba_swiper = new Swiper('.ba .swiper', {
        autoplay: { delay: 5000, disableOnInteraction: true },
        effect: "fade",
        loop: true,
        pagination: { el: '.paging', clickable: true, type: 'bullets' },
    });

    const place_swiper = new Swiper('.place .swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            1900: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
        },
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true, type: 'fraction' },
        scrollbar: { el: ".place .swiper-scrollbar", hide: false, draggable: true },
    });
});
