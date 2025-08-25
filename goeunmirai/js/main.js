$(document).ready(function(){

    const visual_swiper = new Swiper(".visual .swiper", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
            document.querySelector(".total").textContent = formatNumber(this.slides.length - this.loopedSlides * 2);
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


    $('.team, .signature').each(function(){
        let $group = $(this);
        let $tab_btn = $group.find('.tap_area .tap_btn ul li');
        let $tab_cnt = $group.find('.tap_area .tap_cnt div[role="tabpanel"]');
        let $tab_cnt_prant = $group.find('.tap_area .tap_cnt');

        $tab_btn.on('click', function(){
            let $this = $(this);
            let tab_name = '#' + $this.attr('aria-controls');

            $tab_btn.removeClass('active').attr('aria-selected', 'false');
            $this.addClass('active').attr('aria-selected', 'true');

            $tab_cnt.removeClass('active');
            $tab_cnt_prant.find(tab_name).addClass('active');
        });
    });

    const ba_swiper = new Swiper(".ba .swiper", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
            document.querySelector(".total").textContent = formatNumber(this.slides.length - this.loopedSlides * 2);
            updateNumber(this.realIndex + 1);
            resetProgress();
            },
            slideChangeTransitionStart: function () {
            updateNumber(this.realIndex + 1);
            resetProgress();
            },
        },
    });     

     


})
