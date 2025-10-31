$(document).ready(function () {

    /*visual*/
    const visual_swiper = new Swiper(".visual .swiper", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                document.querySelector(".total").textContent =
                    formatNumber(this.slides.length - this.loopedSlides * 2);
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

    /*quick_menu*/
    $('.quick_menu .quick_open').on('click', function () {
        $('.quick_menu').addClass('menu_open');
    });
    $('.quick_menu .quick_close').on('click', function () {
        $('.quick_menu').removeClass('menu_open');
    });
    $('.quick_menu .top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    /*about_us scroll animation*/
    $(window).on('scroll', function () {
        let scrollTop = $(this).scrollTop();
        let sectionOffset = $('.about_us .since').offset().top;
        let windowHeight = $(window).height();

        if (scrollTop + windowHeight * 0.7 > sectionOffset) {
            $('.about_us .since .wrapper > .n_s > .s_bar, .about_us .since .wrapper > .n_s > .n_r')
                .addClass('active');
        } else {
            $('.about_us .since .wrapper > .n_s > .s_bar, .about_us .since .wrapper > .n_s > .n_r')
                .removeClass('active');
        }
    });

    /*doctor toggle*/
    $('.doctor > .wrapper > .d_r > .d_career > .c_open').on('click', function () {
        $('.doctor > .wrapper > .d_r').addClass('active');
    });
    $('.doctor > .wrapper > .d_r > .d_career > .c_close').on('click', function () {
        $('.doctor > .wrapper > .d_r').removeClass('active');
    });

    /*medical hover*/
    $('.medical .list ul li').on('mouseenter', function () {
        if ($(window).width() > 1024) {
            $('.medical .list ul li').removeClass('on off');
            $('.medical .list ul li').addClass('off');
            $(this).removeClass('off').addClass('on');
        }
    });
    $(window).on('resize load', function () {
        if ($(window).width() <= 1024) {
            $('.medical .list ul li').removeClass('on off');
        }
    });
    $('.medical .list').on('mouseleave', function () {
        $('.medical .list ul li').removeClass('on off');
    });

    /*GSAP ScrollTrigger*/
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // PC 버전 (1601px 이상) - 섹션 핀 효과
    mm.add("(min-width: 1601px)", () => {
        const sections = document.querySelector(".section");
        const large = document.querySelector(".section .cont_wrap .cont");

        if (sections && large) {
            const tl = gsap.to(large, {
                y: () => (window.innerHeight - large.clientHeight - 64),
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sections,
                    pin: true,
                    pinType: sections.style.transform ? "transform" : "fixed",
                    start: "top 20px",
                    end: "+=1000",
                    scrub: 2,
                    anticipatePin: 1,
                    markers: false,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                },
            });

            return () => {
                if (tl.scrollTrigger) tl.scrollTrigger.kill(true);
                gsap.set(large, { clearProps: "all" });
            };
        }
    });

    // 리사이즈 시 깜빡임 완전 방지 처리
    let resizeTimer;
    let isResizing = false;
    let scrollPos = 0;
    let resizeRAF = null;

    // 리사이즈 시작 감지
    window.addEventListener("resize", () => {
        // 첫 리사이즈 감지 시
        if (!isResizing) {
            isResizing = true;
            scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            
            // 모든 ScrollTrigger 일시 비활성화
            ScrollTrigger.getAll().forEach(st => st.disable());
            
            // body에 리사이즈 클래스 추가 (CSS에서 transition 제거용)
            document.body.classList.add('is-resizing');
            document.body.style.pointerEvents = 'none';
        }

        // 리사이즈 중 스크롤 위치 고정
        if (resizeRAF) {
            cancelAnimationFrame(resizeRAF);
        }
        resizeRAF = requestAnimationFrame(() => {
            window.scrollTo(0, scrollPos);
        });

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // 리사이즈 완료 후 처리
            cancelAnimationFrame(resizeRAF);
            
            // ScrollTrigger 새로고침
            ScrollTrigger.refresh(true);
            
            // 다음 프레임에서 활성화 및 복원
            requestAnimationFrame(() => {
                ScrollTrigger.getAll().forEach(st => st.enable());
                
                requestAnimationFrame(() => {
                    window.scrollTo(0, scrollPos);
                    document.body.classList.remove('is-resizing');
                    document.body.style.pointerEvents = '';
                    isResizing = false;
                });
            });
        }, 500); // 디바운싱 시간 증가
    });


    /*GSAP fade-up - equipment 제외한 모든 fade-up 요소*/
    gsap.utils.toArray(".fade-up").forEach((el) => {
        // equipment wrapper는 별도 처리하므로 제외
        if (el.classList.contains('wrapper') && el.closest('.equipment')) {
            return;
        }
        
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reset",
            },
            opacity: 0,
            y: 100,
            duration: 1.2,
            ease: "power2.out",
        });
    });

    // equipment wrapper 전용 fade-up 처리
    let equipmentScrollTrigger = null;
    let equipmentGsapInstance = null;

    function handleEquipmentFadeUp() {
        const equipmentWrapper = document.querySelector('.equipment .wrapper');
        if (!equipmentWrapper) return;

        // 기존 애니메이션 및 ScrollTrigger 완전 제거
        if (equipmentGsapInstance) {
            equipmentGsapInstance.kill();
            equipmentGsapInstance = null;
        }
        if (equipmentScrollTrigger) {
            equipmentScrollTrigger.kill(true);
            equipmentScrollTrigger = null;
        }

        // 스타일 초기화
        gsap.set(equipmentWrapper, { clearProps: "all" });

        if (window.innerWidth <= 1600) {
            // 모바일: fade-up 클래스 추가 및 ScrollTrigger 생성
            equipmentWrapper.classList.add('fade-up');
            
            // 초기 상태 설정
            gsap.set(equipmentWrapper, { opacity: 0, y: 100 });
            
            equipmentScrollTrigger = ScrollTrigger.create({
                trigger: equipmentWrapper,
                start: "top 80%",
                toggleActions: "play none none reset",
                onEnter: () => {
                    equipmentGsapInstance = gsap.to(equipmentWrapper, {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        overwrite: 'auto'
                    });
                },
                onLeaveBack: () => {
                    equipmentGsapInstance = gsap.to(equipmentWrapper, {
                        opacity: 0,
                        y: 100,
                        duration: 0.3,
                        overwrite: 'auto'
                    });
                }
            });
        } else {
            // PC: fade-up 클래스 제거
            equipmentWrapper.classList.remove('fade-up');
        }
    }

    // 초기 실행
    handleEquipmentFadeUp();

    // 리사이즈 시 처리 (깜빡임 완전 방지)
    let equipmentResizeTimer;
    let equipmentScrollPos = 0;
    let equipmentResizing = false;

    window.addEventListener('resize', () => {
        if (!equipmentResizing) {
            equipmentResizing = true;
            equipmentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
        }

        clearTimeout(equipmentResizeTimer);
        equipmentResizeTimer = setTimeout(() => {
            handleEquipmentFadeUp();
            
            // 스크롤 위치 복원
            requestAnimationFrame(() => {
                window.scrollTo(0, equipmentScrollPos);
                equipmentResizing = false;
            });
        }, 500);
    });


    /*real hover*/
    $('.real .r_list > .r_l > .r_l_u > ul > li > .photo').on('mouseenter', function () {
        $('.real .r_list > .r_l > .r_l_u > ul').addClass('on');
    })
    $('.real .r_list > .r_l > .r_l_d > ul > li > .photo').on('mouseenter', function () {
        $('.real .r_list > .r_l > .r_l_d > ul').addClass('on');
    })
    $('.real .r_list > .r_r  > ul > li > .photo').on('mouseenter', function () {
        $('.real .r_list > .r_r > ul').addClass('on');
    })
    $('.real .r_list > .r_l > .r_l_u > ul').on('mouseleave', function () {
        $('.real .r_list > .r_l > .r_l_u > ul').removeClass('on');
    })
    $('.real .r_list > .r_l > .r_l_d > ul').on('mouseleave', function () {
        $('.real .r_list > .r_l > .r_l_d > ul').removeClass('on');
    })
    $('.real .r_list > .r_r > ul').on('mouseleave', function () {
        $('.real .r_list > .r_r > ul').removeClass('on');
    })

    
});