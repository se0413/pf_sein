$(document).ready(function(){
    const mainImg = document.getElementById('mainImg');
    const thumbBtns = document.querySelectorAll('.thumb-btn');

    thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        mainImg.classList.add('fade');           // fade out
        setTimeout(() => {
            mainImg.src = btn.dataset.src;         // 이미지 교체
            mainImg.classList.remove('fade');      // fade in

            thumbBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            }, 200);
        });
    });
})