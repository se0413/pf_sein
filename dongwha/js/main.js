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

    // 타이포 글자 변수
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

    // 흰 배경 변환 변수
    let win_h
    let trust_w_top

    // 구급상자 애니메이션 변수
    let kit_img = $('.trust .photo img')
    let kit_rate_s = 0.4
    let kit_rate_e = 0.9 
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
        if($(window).width() <= 1400) return;
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
        if($(window).width() <= 1400) return;
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
            kit_translateY = (kit_scroll / 100) * 350 // 100px 아래로 이동
        }else{
            // 애니메이션 종료 후
            kit_scale = 2.5
            kit_translateY = 350
        }
        
        kit_img.css({
            'transform': 'scale(' + kit_scale + ') translateY(' + kit_translateY + 'px)'
        })
    }

    function scroll_chk(){
        if($(window).width() <= 1400) return;
        win_h = $(window).height()
        scrolling = $(window).scrollTop()
        trust_w_top = $('.trust_w').offset().top

        if(scrolling > (trust_w_top - win_h + (win_h / 5))){
            $('body').addClass('white_bg')
        }else{
            $('body').removeClass('white_bg')
        }
    }
        
    scroll_chk() //로딩된 이후 1번
    $(window).scroll(function(){ //브라우저가 스크롤 될때마다
        scroll_chk()
    })
    $(window).resize(function(){ //브라우저가 리사이즈 될때마다
        scroll_chk()
    })

    
    let ani_start_ratio = 0.7
    let ani_end_ratio = 0.9
    let obj_wrap = $('.research .photo_wrap')
    let obj_name = $('.research .photo_wrap .photo_move')
    let obj_bg = $('.research .photo_wrap .photo_move .photo_bg')
    let end_obj = $('.sub_cont')
    let end_class = 'dark'


    let win_w
    let ani_start
    let ani_end
    let ani_ratio
    let obj_start_w
    let obj_start_h
    let obj_start_x
    let obj_start_y
    let obj_w
    let obj_h
    let obj_x
    let obj_y

    function scale_img() {
        if($(window).width() <= 1400) return;
        scrolling = $(window).scrollTop()
        win_h = $(window).height()
        win_w = $(window).width()
        obj_start_w = obj_wrap.width()
        obj_start_h = obj_wrap.height()
        obj_start_x = obj_wrap.offset().left
        obj_start_y = obj_wrap.offset().top

        // 스크롤 구간 정의
        ani_start = obj_wrap.offset().top - win_h * (1 - ani_start_ratio)
        ani_end = end_obj.offset().top - win_h * (1 - ani_end_ratio)

        // 스크롤 비율 계산
        if (scrolling < ani_start) ani_ratio = 0
        else if (scrolling > ani_end) ani_ratio = 1
        else ani_ratio = (scrolling - ani_start) / (ani_end - ani_start)

        // 비율 제한
        ani_ratio = Math.max(0, Math.min(1, ani_ratio))

        // 화면 끝 크기 계산
        let end_w = win_w
        let end_h = win_h

        // 화면 중앙으로 이동할 오프셋 계산 (요소 중심 기준)
        let end_x = (win_w - end_w) / 2 - obj_start_x
        let end_y = (win_h - end_h) / 2 - obj_start_y
        
        if(ani_start > scrolling){
            console.log('시작전')
            obj_w = obj_start_w
            obj_h = obj_start_h
            obj_x = 0
            obj_y = 0
            end_obj.removeClass(end_class)
        }else if(ani_end < scrolling){
            console.log('종료')
            obj_w = win_w
            obj_h = win_h
            obj_x = end_x
            obj_y = end_y * ani_ratio + ani_end
            end_obj.addClass(end_class)
        }else{
            console.log('진행중')
            obj_w = obj_start_w + (end_w - obj_start_w) * ani_ratio
            obj_h = obj_start_h + (end_h - obj_start_h) * ani_ratio
            obj_x = end_x * ani_ratio
            obj_y = end_y * ani_ratio + (scrolling - ani_start*(1-ani_ratio))
            end_obj.removeClass(end_class)
        }
        
        obj_name.css({
            transform: `translate(${obj_x}px, ${obj_y}px)`,
            width: obj_w + 'px',
            height: obj_h + 'px'
        })
        obj_bg.css('opacity', ani_ratio)
    }
    scale_img()
    $(window).scroll(function(){
        scale_img()
    })
    $(window).resize(function(){
        scale_img()
    })

    //tab
    function initTabMenu(sectionClass) {
        let tab_btn = $(sectionClass + ' .tap_box ul li') 
        let tab_name
        let tab_cnt = $(sectionClass + ' .tap_cnt div[role="tabpanel"]')
        let tab_cnt_prant = $(sectionClass + ' .tap_cnt')

        tab_btn.on('click', function(){
            tab_btn.removeClass('active')
            $(this).addClass('active')
            tab_btn.attr('aria-selected', 'false')
            $(this).attr('aria-selected', 'true')
            
            tab_name = $(this).attr('aria-controls')
            tab_name = '#'+ tab_name
            
            tab_cnt.removeClass('active')
            tab_cnt_prant.find(tab_name).addClass('active')
        })
    }
    // 실행 (섹션마다 호출)
    initTabMenu('.research_tab')
})