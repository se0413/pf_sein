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

    $('.quick_menu .top').on('click', function(){
        $('html, body').animate({
            scrollTop:0
        },500)
    })

    $(window).on('scroll', function () {
    let scrollTop = $(this).scrollTop();
    let sectionOffset = $('.about_us .since').offset().top;
    let windowHeight = $(window).height();

        if (scrollTop + windowHeight * 0.7 > sectionOffset) {
            $('.about_us .since .wrapper > .n_s > .s_bar').addClass('active');
            $('.about_us .since .wrapper > .n_s > .n_r').addClass('active');
        } else {
            $('.about_us .since .wrapper > .n_s > .s_bar').removeClass('active');
            $('.about_us .since .wrapper > .n_s > .n_r').removeClass('active');
        }
    });

    /*doctor*/

    $('.doctor > .wrapper > .d_r > .d_career > .c_open').on('click', function(){
        $('.doctor > .wrapper > .d_r').addClass('active')
    })
    $('.doctor > .wrapper > .d_r > .d_career > .c_close').on('click', function(){
        $('.doctor > .wrapper > .d_r').removeClass('active')
    })

    /*.medical .list ul li.on or off*/
    $('.medical .list ul li').on('mouseenter', function(){ //1025부터 적용
        if($(window).width() > 1024){
            $('.medical .list ul li').removeClass('on')
            $('.medical .list ul li').addClass('off')
            $(this).removeClass('off')
            $(this).addClass('on')
        }
    })
    $('.medical .list').on('mouseleave', function(){
        $('.medical .list ul li').removeClass('on')
        $('.medical .list ul li').removeClass('off')
    })
});
