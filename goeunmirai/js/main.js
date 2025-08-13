$(document).ready(function(){

    // const visual_swiper = new Swiper('.visual .swiper', { 

    //     effect: "fade", 
    //     autoplay: {  
    //         delay: 5000,
    //         disableOnInteraction: true,
    //     },

    //     loop: true,  

    //     pagination: {  
    //         el: '.visual .paging', 
    //         clickable: true,  
    //     },
    

    // });

    const visual_swiper = new Swiper(".visual .swiper", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000, // 5초마다 슬라이드
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

})
