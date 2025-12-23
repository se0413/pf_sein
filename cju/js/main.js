$(document).ready(function(){
    const visual_swiper = new Swiper('.visual .swiper', {

        autoplay: {  
            delay: 3000,
            disableOnInteraction: true,
        },

        effect: "fade",

        loop: true,

        pagination: { 
            el: '.swiper-pagination',
            clickable: true, 
            type: 'fraction',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        

        navigation: {  
            nextEl: '.btn_next',
            prevEl: '.btn_prev',  
        },

    });

    const now_swiper = new Swiper('.now .swiper', { 

        pagination: { 
            el: '.now .swiper-pagination',
            clickable: true, 
            type: 'fraction',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        

        navigation: {
            nextEl: '.now .btn_next', 
            prevEl: '.now .btn_prev',  
        },

    });


    //tap 기능
    function initTabMenu(sectionClass) {
        let tab_btn = $(sectionClass + ' .tap_btn .tap_box ul li') 
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
    initTabMenu('.cju_board .now')
    initTabMenu('.notice')  



    const research_swiper = new Swiper('.research .swiper', { 

        pagination: { 
            el: '.research .swiper-pagination',
            clickable: true, 
            type: 'fraction',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        

        navigation: {
            nextEl: '.research .btn_next', 
            prevEl: '.research .btn_prev',  
        },

    });

    const pride_swiper = new Swiper('.pride .swiper', { 

        pagination: { 
            el: '.pride .swiper-pagination',
            clickable: true, 
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },

    });
    
    $('.service .s_box .s_list_1 .btn_open').on('click', function(){
        $('.service .s_box .s_list_1 > ul').addClass('on')
        $('.service .s_box .s_list_1 .btn_open').hide()
        $('.service .s_box .s_list_1 .btn_close').show()
    })
    $('.service .s_box .s_list_1 .btn_close').on('click', function(){
        $('.service .s_box .s_list_1 > ul').removeClass('on')
        $('.service .s_box .s_list_1 .btn_close').hide()
        $('.service .s_box .s_list_1 .btn_open').show()
    })
    $('.service .s_box .s_list_2 .btn_open').on('click', function(){
        $('.service .s_box .s_list_2 > ul').show()
        $('.service .s_box .s_list_2 .btn_open').hide()
        $('.service .s_box .s_list_2 .btn_close').show()
    })
    $('.service .s_box .s_list_2 .btn_close').on('click', function(){
        $('.service .s_box .s_list_2 > ul').hide()
        $('.service .s_box .s_list_2 .btn_close').hide()
        $('.service .s_box .s_list_2 .btn_open').show()
    })
    $('.service .s_box .s_list_3 .btn_open').on('click', function(){
        $('.service .s_box .s_list_3 > ul').show()
        $('.service .s_box .s_list_3 .btn_open').hide()
        $('.service .s_box .s_list_3 .btn_close').show()
    })
    $('.service .s_box .s_list_3 .btn_close').on('click', function(){
        $('.service .s_box .s_list_3 > ul').hide()
        $('.service .s_box .s_list_3 .btn_close').hide()
        $('.service .s_box .s_list_3 .btn_open').show()
    })
})