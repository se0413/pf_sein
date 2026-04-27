$(document).ready(function(){
    /*
        1. tab버튼을 클릭(.cts_history .tap_area .tap_btn ul li)하면 active클래스를 줘야함, 다른건 삭제
        2. 클릭한 li만 aria-selected="true" 나머지는 aria-selected="false"
        3. 클릭한 li에서 aria-controls 값을 가져와서 하단 콘텐츠(.cts_history .tap_area .tap_cnt div[role="tabpanel"]) 
            중에서 같은 이름의 id를 가진 요소에만 active클래스를 줌
        
            find 명령으로 id가 aria-controls 값과 같은 요소를 찾아야함
            find는 하위요소를 검색하는 기능
            선택자가 tabpanel을 직접 선택하는게 아니라 그 부모요소를 선택해서 하위요소를 검색하게 해야함
    */
    let tab_btn = $('.cts_history .tap_area .tap_btn ul li') /*변수 이름을 정해줌*/
    let tab_name
    let tab_cnt = $('.cts_history .tap_area .tap_cnt div[role="tabpanel"]')
    let tab_cnt_prant = $('.cts_history .tap_area .tap_cnt')

    tab_btn.on('click', function(){
        tab_btn.removeClass('active')
        $(this).addClass('active')

        tab_btn.attr('aria-selected', 'false')
        $(this).attr('aria-selected', 'true')

        tab_name = $(this).attr('aria-controls')
        tab_name = '#'+ tab_name /*id 클래스를 추가로 삽입*/
        console.log(tab_name)

        tab_cnt.removeClass('active')
        tab_cnt_prant.find(tab_name).addClass('active')
        
     })
})