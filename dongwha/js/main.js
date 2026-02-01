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
        if($(window).width() <= 1400) {
            // 모바일에서는 기본 스타일로 복구
            obj_name.css({
                transform: 'none',
                width: 'auto',
                height: 'auto'
            })
            obj_bg.css('opacity', 1)
            return;
        }

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
            obj_w = obj_start_w
            obj_h = obj_start_h
            obj_x = 0
            obj_y = 0
            end_obj.removeClass(end_class)
        }else if(ani_end < scrolling){
            obj_w = win_w
            obj_h = win_h
            obj_x = end_x
            obj_y = end_y * ani_ratio + ani_end
            end_obj.addClass(end_class)
        }else{
            obj_w = obj_start_w + (end_w - obj_start_w) * ani_ratio
            obj_h = obj_start_h + (end_h - obj_start_h) * ani_ratio
            obj_x = end_x * ani_ratio
            obj_y = end_y * ani_ratio + (scrolling - ani_start*(1-ani_ratio))
            end_obj.removeClass(end_class)
        }
        
        // 소수점 제거
        obj_w = Math.ceil(obj_w)
        obj_h = Math.ceil(obj_h)
        obj_x = Math.round(obj_x)
        obj_y = Math.round(obj_y)
        
        obj_name.css({
            transform: `translate(${obj_x}px, ${obj_y}px)`,
            width: obj_w + 'px',
            height: obj_h + 'px',
            willChange: 'transform'
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
            
            // 모든 탭 숨기기
            tab_cnt.removeClass('active').hide()
            
            // 선택된 탭만 페이드인으로 보이기
            tab_cnt_prant.find(tab_name).addClass('active').fadeIn(400)
        })
    }
    // 실행 (섹션마다 호출)
    initTabMenu('.research_tab')
    initTabMenu('.m_category')


    // 세로 탭 슬라이드 기능
    let currentIndex = 0;
    let tabItems, totalItems, visibleItems, itemHeight;

    function initTabSlide() {
        tabItems = $('.m_category .tap_box ul li');
        totalItems = tabItems.length; // 10개
        visibleItems = 6;
        
        // li가 완전히 렌더링될 때까지 대기
        setTimeout(function(){
            itemHeight = tabItems.first().outerHeight(true);
            
            // ul에 직접 높이와 overflow 설정
            $('.m_category .tap_box ul').css({
                'overflow': 'hidden',
                'height': itemHeight * visibleItems + 'px',
                'transition': 'transform 0.4s ease'
            });
        }, 100);
    }

    // 즉시 실행 + 로드 후 재실행
    initTabSlide();
    $(window).on('load', function(){
        initTabSlide();
    });

    // 리사이즈 시에도 재계산
    $(window).resize(function(){
        currentIndex = 0; // 인덱스 초기화
        $('.m_category .tap_box ul li').css('transform', 'translateY(0)');
        initTabSlide();
    });

    // 다음 버튼 (아래로)
    $('.m_category .tap_next').on('click', function(){
        if(currentIndex < totalItems - visibleItems) {
            currentIndex++;
            $('.m_category .tap_box ul li').css('transform', `translateY(-${itemHeight * currentIndex}px)`);
        }
    });

    // 이전 버튼 (위로)
    $('.m_category .tap_prev').on('click', function(){
        if(currentIndex > 0) {
            currentIndex--;
            $('.m_category .tap_box ul li').css('transform', `translateY(-${itemHeight * currentIndex}px)`);
        }
    });

    
})