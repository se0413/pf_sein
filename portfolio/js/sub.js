$(document).ready(function(){
    let tab_btn = $('.detail.cju .tap_area .tap_btn > ul > li')
    let tab_name
    let tab_cnt = $('.detail.cju .tap_area .tap_cnt div[role="tabpanel"]')
    let tab_cnt_prant = $('.detail.cju .tap_area .tap_cnt')

    tab_btn.on('click', function(){
        tab_btn.removeClass('active')
        $(this).addClass('active')

        tab_btn.attr('aria-selected', 'false')
        $(this).attr('aria-selected', 'true')

        tab_name = $(this).attr('aria-controls')
        tab_name = '#'+ tab_name
        console.log(tab_name)

        tab_cnt.removeClass('active')
        tab_cnt_prant.find(tab_name).addClass('active')
        
     })
})