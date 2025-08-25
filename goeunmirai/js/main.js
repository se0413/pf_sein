$(document).ready(function(){

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


    /*
        1. tab버튼을 클릭(.cts_history .tap_area .tap_btn ul li)하면 active클래스를 줘야함, 다른건 삭제
        2. 클릭한 li만 aria-selected="true" 나머지는 aria-selected="false"
        3. 클릭한 li에서 aria-controls 값을 가져와서 하단 콘텐츠(.cts_history .tap_area .tap_cnt div[role="tabpanel"]) 
            중에서 같은 이름의 id를 가진 요소에만 active클래스를 줌
        
            find 명령으로 id가 aria-controls 값과 같은 요소를 찾아야함
            find는 하위요소를 검색하는 기능
            선택자가 tabpanel을 직접 선택하는게 아니라 그 부모요소를 선택해서 하위요소를 검색하게 해야함
    */
   
    $('.team, .signature').each(function(){
        let $group = $(this);
        let $tab_btn = $group.find('.tap_area .tap_btn ul li');
        let $tab_cnt = $group.find('.tap_area .tap_cnt div[role="tabpanel"]');
        let $tab_cnt_prant = $group.find('.tap_area .tap_cnt');

        $tab_btn.on('click', function(){
            let $this = $(this);
            let tab_name = '#' + $this.attr('aria-controls');

            $tab_btn.removeClass('active').attr('aria-selected', 'false');
            $this.addClass('active').attr('aria-selected', 'true');

            $tab_cnt.removeClass('active');
            $tab_cnt_prant.find(tab_name).addClass('active');
        });
    });

     

     


})
