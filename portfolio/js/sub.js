$(document).ready(function(){
    //tab
    function initTabMenu(sectionClass) {
        let tab_btn = $(sectionClass + ' .tap_btn ul li') 
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
    initTabMenu('.detail.cju')
    initTabMenu('.detail.dongwha')
    
})