$(document).ready(function(){

    const visual_swiper = new Swiper('.visual .swiper', {

        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },

    });

});