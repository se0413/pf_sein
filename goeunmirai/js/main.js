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
            let $tab_cnt_parent = $group.find('.tap_area .tap_cnt');

            let isMobile = $(window).width() <= 1024;

            if (isMobile && $group.hasClass('signature')) {
                // 모바일 + signature일 때: 탭 버튼 숨기고, 모든 컨텐츠 보이기
                $tab_btn.hide().off('click');
                $tab_cnt.show().addClass('active');
                $tab_cnt_parent.addClass('mobile-grid');
            } else {
                // PC 전체 + 모바일 team: 탭 버튼 표시
                $tab_btn.show().css({
                    'display': 'inline-block',   // 강제 표시
                    'visibility': 'visible',
                    'opacity': 1
                });

                // 부모 요소 display 강제
                $tab_btn.parent().css('display', 'block');

                // 탭 컨텐츠 초기화
                $tab_cnt.hide().removeClass('active');
                $tab_cnt.first().show().addClass('active');
                $tab_cnt_parent.removeClass('mobile-grid');

                // 클릭 이벤트 한 번만 등록
                if (!$tab_btn.data('click-bound')) {
                    $tab_btn.on('click', function () {
                        let $this = $(this);
                        let tab_name = '#' + $this.attr('aria-controls');

                        $tab_btn.removeClass('active').attr('aria-selected', 'false');
                        $this.addClass('active').attr('aria-selected', 'true');

                        $tab_cnt.hide().removeClass('active');
                        $tab_cnt_parent.find(tab_name).show().addClass('active');
                    });
                    $tab_btn.data('click-bound', true);
                }
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
