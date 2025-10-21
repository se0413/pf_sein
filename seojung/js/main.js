$(document).ready(function () {
    
    /*visual*/

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



    /*quick_menu*/

    $('.quick_menu .quick_open').on('click', function(){
        $('.quick_menu').addClass('menu_open')
    })
    $('.quick_menu .quick_close').on('click', function(){
        $('.quick_menu').removeClass('menu_open')
    })

    $('.quick_menu .quick_close').on('click', function(){
        console.log('닫기 버튼 클릭됨!');
    $('.quick_menu').removeClass('menu_open');
    });

    $('.quick_menu .top').on('click', function(){
        $('html, body').animate({
            scrollTop:0
        },500)
    })
});
