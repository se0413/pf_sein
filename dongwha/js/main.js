$(document).ready(function(){
    const visual_swiper = new Swiper('.visual .swiper', {

        autoplay: {  
            delay: 5000,
            disableOnInteraction: true,
        },

        effect: "fade",

        loop: true,

        pagination: { 
            el: '.visual .paging',
            // clickable: true, 
        },

    });

    let slogan = $('.tit')
    let slogan_obj = $('.tit p span')
    let slogan_rate_s = 0.3
    let slogan_rate_e = 0.6
    let slogan_leng = slogan_obj.length
    let slogan_scroll
    let slogan_top
    let slogan_start
    let slogan_end
    let slogan_w
    let scrolling
    let win_h

    // 구급상자 애니메이션 변수
    let kit_img = $('.trust .photo img')
    let kit_rate_s = 0.4 // 구급상자 애니메이션 시작 지점
    let kit_rate_e = 0.9 // 구급상자 애니메이션 종료 지점
    let kit_scroll
    let kit_scale
    let kit_translateY

    slogan_ani()
    kit_ani()

    $(window).scroll(function(){
        slogan_ani()
        kit_ani()
    })

    $(window).resize(function(){
        slogan_ani()
        kit_ani()
    })

    function slogan_ani(){
        win_h = $(window).height()
        scrolling = $(window).scrollTop()
        slogan_top = slogan.offset().top
        slogan_start = slogan_top - win_h + (win_h * slogan_rate_s)
        slogan_end = slogan_top + slogan.height() - win_h + (win_h * slogan_rate_e)
        slogan_scroll = (scrolling - slogan_start) / (slogan_end - slogan_start) * 100
        
        if(slogan_start > scrolling) {
            slogan_obj.width(0)
        }else if(slogan_end > scrolling){
            for(i=0; i<slogan_leng; i++){
                slogan_w = (slogan_scroll - (100/slogan_leng)*i) * slogan_leng
                if(slogan_w > 100){
                    slogan_w = 100
                }
                slogan_obj.eq(i).width(slogan_w + '%')
            }
        }else{
            slogan_obj.width('100%')
        }
    }

    function kit_ani(){
        win_h = $(window).height()
        scrolling = $(window).scrollTop()
        slogan_top = slogan.offset().top
        
        let kit_start = slogan_top - win_h + (win_h * kit_rate_s)
        let kit_end = slogan_top + slogan.height() - win_h + (win_h * kit_rate_e)
        kit_scroll = (scrolling - kit_start) / (kit_end - kit_start) * 100
        
        if(kit_start > scrolling) {
            // 애니메이션 시작 전
            kit_scale = 1
            kit_translateY = 0
        }else if(kit_end > scrolling){
            // 애니메이션 진행 중
            kit_scroll = Math.max(0, Math.min(100, kit_scroll))
            kit_scale = 1 + (kit_scroll / 100) * 1.5 // 1배에서 2.5배까지 확대
            kit_translateY = (kit_scroll / 100) * 100 // 100px 아래로 이동
        }else{
            // 애니메이션 종료 후
            kit_scale = 2.5
            kit_translateY = 100
        }
        
        kit_img.css({
            'transform': 'scale(' + kit_scale + ') translateY(' + kit_translateY + 'px)'
        })
    }

})