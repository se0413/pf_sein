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

    let pageWrapper = document.querySelector(".collection");
    let items = document.querySelector(".pf");
    let localItems = gsap.utils.toArray(".pf");

    let mm = gsap.matchMedia();

    let distance = () => {
        return items.scrollWidth - window.innerWidth;
    };

    mm.add("(min-width: 1025px)", () => {
        gsap.to(localItems, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
                trigger: pageWrapper,
                start: "top top",
                pinnedContainer: pageWrapper,
                pin: pageWrapper,
                end: () => "+=" + distance(),
                scrub: true,
                invalidateOnRefresh: true
            }
        })
    })

});