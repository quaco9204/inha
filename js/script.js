// html, css, javaScript 가 로딩이 완료되었을 때.
// html 태그 구조 (DOM구조) 가 완료되었을때 실행  
$(document).ready(function () {
    
    // 안내창 닫기 modal close
    $('.modal').click(function () {
        $(this).fadeOut();
    });

    //쿠키 가져오기
    function getCookie(cookieName) {
        // getCookie('inha_day');
        let search = cookieName + "=";
        // search = 'inhaa_day='
        let cookie = document.cookie;

        /* 현재 쿠키가 존재할 경우 */
        if (cookie.length > 0) {
            /* 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴. */
            startIndex = cookie.indexOf(cookieName);

            /* 만약 존재한다면 */
            if (startIndex != -1) {
                /* 값을 얻어내기 위해 시작 인덱스 조절 */
                startIndex += cookieName.length;
                /* 값을 얻어내기 위해 종료 인덱스 추출 */
                endIndex = cookie.indexOf(";", startIndex);
                /* 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정 */
                if (endIndex == -1) {
                    endIndex = cookie.length;
                }
                /* 쿠키값을 추출하여 리턴 */
                return unescape(cookie.substring(startIndex + 1, endIndex));
            } else {
                /* 쿠키 내에 해당 쿠키가 존재하지 않을 경우 */
                return false;
            }
        } else {
            /* 쿠키 자체가 없을 경우 */
            return false;
        }
    }

    //쿠키 세팅하기
    function setCookie(name, value, expiredays) {
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }

    // if (!getCookie("inha_day")) {
    //     //사용자가 '하루 열지 않음'을 체크하지 않았음.
    //     // 원래대로 상단 배너를 보여주자

    // }


    //버튼 클릭시 상단 배너 숨기기
    $('.help-event').click(function (event) {
        event.preventDefault();
        //새로고침 후 모션추가
        $('.wrap').addClass('wrap-ani');
        $('.wrap').toggleClass('wrap-close');
        $(this).toggleClass('help-event-active');
    });

    $('#top-day-check').click(function () {

        //체크밗으의 체크상태를 실시간 파악.
        let temp = $(this).is(':checked');
        if (temp == true) {
            $('.wrap').addClass('wrap-ani');
            $('.wrap').removeClass('wrap-close');
            $('.help-event').removeClass('help-event-active');
            // 하루동안 열지 않음 셋팅
            setCookie('inha_day', 'close', 1);
        } else {
            // 하루동안 열지 않음 해제
            setCookie('inha_day', 'open', 1);
        }
    });


    // inha_day 쿠키를 가지고 오기
    let inha_day = getCookie('inha_day');

    // 쿠키에 따른) 배너창 보이고 숨기기
    if (inha_day == 'close') {
        $('.help-event').removeClass('help-event-active');
        $('#top-day-check').attr('checked', true);
    } else {
        $('.wrap').addClass('wrap-close');
    }


    // footer(하단) 사이트맵 보기
    $('.sitemap-more').click(function (event) {
        event.preventDefault();
        $('.sitemap-main').stop().slideToggle(300);
    });

    // 언어 관련 기능 
    let bt_lang = $('.bt-lang');
    let lang_list = $('.lang-list');

    bt_lang.click(function (event) {
        event.preventDefault();
        lang_list.stop().slideToggle(200);
    });
    // lang_list 에서 사라지기
    // lang_list.mouseleave(function(){
    //     $(this).stop().slideUp(200);
    // });

    bt_lang.parent().mouseleave(function () {
        lang_list.stop().slideUp(200);
    });

    // $('.member-list>li').eq(0).mouseleave(function(){
    //     lang_list.stop().slideUp(200);
    // });


    //검색 폼 기능
    let help_search = $('.help-search');
    let search_form = $('#search-form');
    let search_close = $('.search-close');
    let search_submit = $('.search-submit');
    let search_txt = $('.search-txt');
    let modal_search = $('.modal-search');
    let modal_search_close = $('.modal-search-close');
    let modal_search_bt = $('.modal-search-bt');
    // 모달_서치 내용자리
    let modal_search_cont = $('.modal-search-cont')

    // 검색버튼을 누르면 search_form 이 보이게 처리
    help_search.click(function (event) {
        event.preventDefault();
        search_txt.val(''); //새로 입력할때 전의 값을 비워줌
        search_form.stop().slideDown(300);
    });
    //search_close 클릭시 사라짐
    search_close.click(function () {
        search_form.stop().slideUp(300);


    });

    //search_submit 클릭 시
    //search_txt에 값이 있고, 없고에 따른 처리 필요
    search_submit.click(function (event) {
        //값을 읽는다.
        let temp = search_txt.val();
        if (temp == '') {
            modal_search.show();
            return false;
        }
    });

    // modal_search_close, modal_search_bt 클릭시 modal search 닫기
    modal_search_close.click(function () {
        modal_search.hide();
    });
    modal_search_bt.click(function () {
        modal_search.hide();
    });
    modal_search.click(function () {
        modal_search.hide();
    });

    modal_search_cont.click(function (event) {
        // 아래로 이벤트 전달하지 않기
        event.stopPropagation();
    });

    // 위로가기
    $('.gotop').click(function (event) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: 0
        }, 600);
    });

    // 고정 메뉴 기능
    // 클릭이 가능한 a태그 목록
    let fix_menu_list_a = $('.fix-menu-list a'); 
    //상단메뉴 고정에 의한 오차값
    let fix_menu_offset = -60;

    // 이동해야하는 위치 숫자 파악하기
    let fix_menu_pos = [
        0,
        $('.notice').offset().top + fix_menu_offset,
        $('.coop').offset().top + fix_menu_offset,
        $('.service').offset().top + fix_menu_offset,
        $('.sns').offset().top + fix_menu_offset - 150
    ];


    //소수점을 없앤다.
    for (let i = 0; i < fix_menu_pos.length; i++) {
        //숫자값을 하나씩 알아낸다.
        let temp = fix_menu_pos[i];
        //소수점을 반올림 한다.
        temp = Math.round(temp);
        //값을 바꾸어준다.
        fix_menu_pos[i] = temp;
    }

    



    //현재 클릭으로 이동인지 아닌지 구분
    let fix_menu_active = 'scroll';

    //클릭시 포커스 및 페이지 이동
    $.each(fix_menu_list_a, function (index, item) {
        $(this).click(function (event) {
            event.preventDefault();

            fix_menu_pos = [
                0,
                $('.notice').offset().top  + fix_menu_offset,
                $('.coop').offset().top  + fix_menu_offset,
                $('.service').offset().top  + fix_menu_offset,
                $('.sns').offset().top  + fix_menu_offset - 150
            ];
        
        
            //소수점을 없앤다.
            for (let i = 0; i < fix_menu_pos.length; i++) {
                //숫자값을 하나씩 알아낸다.
                let temp = fix_menu_pos[i];
                //소수점을 반올림 한다.
                temp = Math.round(temp);
                //값을 바꾸어준다.
                fix_menu_pos[i] = temp;
            }

            //클릭으로 이동함을 확인
            fix_menu_active = 'click';
            //일단, 모든 포커스 해제
            fix_menu_list_a.removeClass('fix-menu-list-focus');
            //이동할 위치 파악.
            let temp = fix_menu_pos[index];
            $('html, body').stop().animate({
                scrollTop: temp
            }, 400, function () {
                // 포커스 이동
                // 하나만 포커스 주기
                fix_menu_list_a.eq(index).addClass('fix-menu-list-focus');

                //조금만 있다가 sroll로 상태 변경
                setTimeout(delayTimer, 200);
            });
        });
    });

    function delayTimer() {
        //클릭이 끝나고 스크롤 상태로 변경
        fix_menu_active = 'scroll';
    }

    // 스크롤시에 메뉴 고정하기
    let scroll_posy = $(window).scrollTop();
    let header = $('.header');
    let wrap = $('.wrap');
    let header_top_h = $('.header-top').outerHeight();
    header_top_h = Math.round(header_top_h);

    // 만약, top-banner가 close 이면 0
    let wrap_margin_top = $('.wrap').css('margin-top');
    wrap_margin_top = parseInt(wrap_margin_top);

    $(window).scroll(function () {
        scroll_posy = $(window).scrollTop();
        
        // 스크롤 시에도 항상 체크를 해서 높이를 변경한다.
        let wrap_margin_top = $('.wrap').css('margin-top');
        wrap_margin_top = parseInt(wrap_margin_top);

        // 0, 125 에 따라 조절이 필요함
        if (scroll_posy >= (wrap_margin_top + header_top_h)) {
            header.addClass('header-fixed');
            wrap.addClass('wrap-padding');
        } else {
            header.removeClass('header-fixed');
            wrap.removeClass('wrap-padding');
        }
    });

    // 스크롤시에 포커스 이동하기
    let start = fix_menu_pos.length - 1;
    $(window).scroll(function () {

        //클릭으로 이동하고 있으면 아무런 처리를 하지마라
        if (fix_menu_active == 'click') {
            return;
        }

        //스크롤바의 위치알기

        //우측 픽스메뉴 내용임(수정)
        fix_menu_pos = [
            0,
            $('.notice').offset().top  + fix_menu_offset,
            $('.coop').offset().top  + fix_menu_offset,
            $('.service').offset().top  + fix_menu_offset,
            $('.sns').offset().top  + fix_menu_offset - 150
        ];    
        //소수점을 없앤다.
        for (let i = 0; i < fix_menu_pos.length; i++) {
            //숫자값을 하나씩 알아낸다.
            let temp = fix_menu_pos[i];
            //소수점을 반올림 한다.
            temp = Math.round(temp);
            //값을 바꾸어준다.
            fix_menu_pos[i] = temp;
        }
        
        let scy = $(window).scrollTop();

        fix_menu_list_a.removeClass('fix-menu-list-focus');

        // 코드를 개선하자.
        for (let i = start; i >= 0; i--) {
            if (scy >= fix_menu_pos[i]) {
                fix_menu_list_a.eq(i).addClass('fix-menu-list-focus');
                break;
            }
        }

        // if(scy >= fix_menu_pos[4]){
        //     fix_menu_list_a.eq(4).addClass('fix-menu-list-focus');
        // }else if(scy >= fix_menu_pos[3]){
        //     fix_menu_list_a.eq(3).addClass('fix-menu-list-focus');
        // }else if(scy >= fix_menu_pos[2]){
        //     fix_menu_list_a.eq(2).addClass('fix-menu-list-focus');
        // }else if(scy >= fix_menu_pos[1]){
        //     fix_menu_list_a.eq(1).addClass('fix-menu-list-focus');
        // }else {
        //     fix_menu_list_a.eq(0).addClass('fix-menu-list-focus');
        // }
    });

    
    //main - submenu 기능 (메인 서브메뉴 기능) 수정필요
    //메뉴 저장   
    let main_menu_list = $('.mainmenu');
    let sub_left_link = $('.sub-left-list>li');
    let sub_right_menu = $('.sub-right-menu');
    let sub_menu_close_b = $('.sub-menu-close');
    $.each(main_menu_list, function(index, item){
        $(this).click(function(e){
            // href 막기
            e.preventDefault();
            // 일단 모든 클래스 제거
            sub_left_link.removeClass('sub-left-link-focus');
            sub_right_menu.removeClass('sub-right-menu-focus');
            // sub_meunu_close 작동
            sub_menu_close.addClass('sub-menu-close-focus');
            sub_menu_close_b.addClass('sub-menu-close-focus');
            
            // 클릭된 자신과같은 순서의 sub_left_link 클래스 추가
            sub_left_link.eq(index).addClass('main-menu-link');
            // $(this).addClass('main-menu-icon-' + (index+1));

            // 내용 처리
            sub_left_link.removeClass('sub-left-link-focus');
            sub_right_menu.removeClass('sub-right-menu-focus');
            sub_left_link.eq(index).addClass('sub-left-link-focus');
            sub_right_menu.eq(index).addClass('sub-right-menu-focus');
        });
    }); 

    //gnb sub-menu 관련
    let sub_menu_close = $('.sub-menu-close-box');
    let sub_menu = $('.sub-menu');
    let sub_bt = $('.mainmenu');
    sub_bt.click(function(event){
        // href를 막는다.
        event.preventDefault();     
        sub_menu.stop().slideDown('fast');
        $(this).addClass('sub-menu-focus');
    });

    sub_menu_close.click(function(){
        //애니메이션
        sub_menu.stop().slideUp('fast');
        //클래스제거
        sub_bt.removeClass('sub-menu-focus');
        sub_left_link.removeClass('sub-left-link-focus');
        sub_right_menu.removeClass('sub-right-menu-focus');
        //close 버튼 제거
        sub_menu_close.removeClass('sub-menu-close-focus');
        sub_menu_close_b.removeClass('sub-menu-close-focus');
    });


    //사용자 메뉴 기능
    // 메뉴 저장
    let user_menu_list = $('.user-menu-list > li > a');
    let user_menu_link = $('.user-menu-link');
    $.each(user_menu_list, function(index, item){
        $(this).click(function(e){
            // href 막기
            e.preventDefault();
            // 일단 모든 클래스 제거
            user_menu_list.removeAttr('class');
            
            // 클릭된 자신만 클래스 추가
            $(this).addClass('user-menu-list-focus');
            $(this).addClass('user-menu-icon-' + (index+1));

            // 내용 처리
            user_menu_link.removeClass('user-menu-link-focus');
            user_menu_link.eq(index).addClass('user-menu-link-focus');
        });
    });    

    //사용자 메뉴 관련
    let user_menu_close = $('.user-menu-close');
    let user_menu = $('.user-menu');
    let user_bt = $('.user');
    user_bt.click(function(event){
        // href를 막는다.
        event.preventDefault();
        user_menu.stop().slideDown('fast');
        $(this).addClass('user-focus');
    });

    user_menu_close.click(function(){
        user_menu.stop().slideUp('fast');
        user_bt.removeClass('user-focus');
    });

    new Swiper('.sw-top-banner', {
        loop: true,
        slidesPerView: 2,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: '.sw-top-banner-prev',
            nextEl: '.sw-top-banner-next',
        },
        pagination: {
            el: '.sw-top-pg',
            clickable: true,
        },
    });


    // 메인 슬라이드 
    let sw_main = new Swiper('.sw-main', {
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        speed: 1000,
        allowTouchMove: false,
        pagination: {
            el: '.sw-main-pg',
            clickable: true,
        },
    });

    $('.sw-main-bt').click(function () {
        $(this).toggleClass('sw-main-bt-play');
        //sw-main-bt-play 클래스가 있는가?
        let temp = $(this).hasClass('sw-main-bt-play');
        if (temp == true) {
            sw_main.autoplay.stop();
        } else {
            sw_main.autoplay.start();
        }
    });

    //배너슬라이드
    let sw_banner = new Swiper('.sw-banner', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 600,
        navigation: {
            prevEl: '.sw-banner-prev',
            nextEl: '.sw-banner-next',
        },
    });

    //info  슬라이드
    let sw_info = new Swiper('.sw-info', {
        loop: true,
        navigation: {
            prevEl: '.sw-info-prev',
            nextEl: '.sw-info-next',
        },
        allowTouchMove: false,
    });

    //산학협력단 뉴스 슬라이드
    $('.coop-news-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        draggable: false,
        prevArrow: '.coop-news-slide-prev',
        nextArrow: '.coop-news-slide-next',
    });


    // sns 슬라이드
    new Swiper('.sw-sns', {
        slidesPerView: 4,
        spaceBetween: 22,
        allowTouchMove: false,
    });



    // 공지사항영역에 데이터 갱신 -------------------------------------------

    // 데이터를 보여줄 html의 요소(element)를 참조해둔다.
    //  공지사항 데이터를 보여줄 요소들
    let notice_data_div = $('.notice-data .notice-box');
    //  입찰공고 데이터를 보여줄 요소들
    let bid_data_div = $('.bid-data .notice-box');
    // 데이터의 카테고리를 선택할 수 있는 html 의 요소(el)를 참조해둔다.
    let notice_cate = $('.notice-menu a');
    // 보여줄 데이터 목록을 저장해 둔다.
    let notice_data_1 = [{
            title: '2021년 8월 온라인 학위수여식 안내',
            date: '2021.08.09.',
            page: '#'
        },
        {
            title: '2021-2학기 재학생 등록 및 부분(학점)등록 안내',
            date: '2021.07.30.',
            page: '#'
        },
        {
            title: '조교/사무보조원 채용 공고',
            date: '2020.11.11.',
            page: '#'
        },
        {
            title: '[의류디자인학과] 2021-2학기 조교(LA1) 모집 공고',
            date: '2021.08.10.',
            page: '#'
        },
        {
            title: '상담센터 학생상담실 시간제 상담원 모집 안내',
            date: '2021.08.09.',
            page: '#'
        },
        {
            title: '[청년기술전문인력육성사업단] 기업연계 청년기술인력 육성사업 참여인력(산학협력) 00명 선발중',
            date: '2021.08.09.',
            page: '#'
        }
    ];
    let notice_data_2 = [{
            title: '[학생지원팀] 코로나19 수도권(인천) 거리두기 4단계 격상에 따른 교내시설이용 지침 안내',
            date: '2021.07.09',
            page: '#'
        },
        {
            title: '[학생지원팀] 코로나19 거리두기 개편안에 따른 실외체육시설이용 안내',
            date: '2021.06.30',
            page: '#'
        },
        {
            title: '[프런티어학부대학] 2021-2학기 GEE(무료 영어) 프로그램 이용안내',
            date: '2021.06.30',
            page: '#'
        },
        {
            title: '일본언어문화학과 조교 채용 공고',
            date: '2021.05.21',
            page: '#'
        },
        {
            title: '(디지털 혁신공유대학 사업) 메타버스 콘테스트 참여 안내 (2021 산학협력 EXPO)',
            date: '2021.05.21',
            page: '#'
        },
        {
            title: '[총학생회]2021학년도 인하대학교 비룡제 행사 대행업체 모집 안내',
            date: '2021.04.14',
            page: '#'
        }
    ];
    let notice_data_3 = [{
            title: '2021-2학기 전담 지도교수 상담 안내',
            date: '2021.09.16',
            page: '#'
        },
        {
            title: '2021학년도 2학기 미등록 및 복학불이행 제적처리 안내',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '2021-2학기 재학생 최종등록 안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '2021-2학기 수강신청과목 포기 안내',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '인하대학교 휴학제도 변경 안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '2021학년도 2학기 학기초 강의진단 실시 안내',
            date: '2021.08.09',
            page: '#'
        }
    ];
    let notice_data_4 = [{
            title: '2021년 하나장학생 선발 공고',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '제7회 연수인재육성재단 장학생 선발 안내',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '2021년 고속도로 장학생 선발 안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '2021년도 (재)경주시장학회 장학생 선발 안내',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '',
            date: '',
            page: ''
        },
        {
            title: '2021-2학기 동산장학회 장학생 선발안내(이공계 새터민)',
            date: '2021.08.10',
            page: '#'
        }
    ];
    let notice_data_5 = [{
            title: '[프런티어학부대학] 2021-2학기 GEE(무료 영어) 프로그램 이용안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: 'bbbb[BK글로컬다문화교육연구단 / 다문화융합연구소] 9-11월 초청 특강 안내',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: 'c인하대 다문화융합연구소의 "북새통, 명사와 함께하는 다문화인문학 산책 " 특강 안내: 줌주소 포함',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '평생교육원 가을학기 수강생모집',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '[교수학습개발센터] 2021학년도 2학기 학습법 워크숍 변경 안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '[인하공학교육혁신센터] 2021 인하 융합 콜로키엄 개최',
            date: '2021.08.09',
            page: '#'
        }
    ];
    let notice_data_6 = [{
            title: '[대학혁신지원사업] 2021학년도 고전 UCC 경진대회 개최 안내 및 참가 모집(2021. 10. 5.(화)까지)',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '일본언어문화학과 조교 채용 공고',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '(디지털 혁신공유대학 사업) 메타버스 콘테스트 참여 안내 (2021 산학협력 EXPO)',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '[대학혁신지원사업] 2021 INHA Creative Changer 비전 캠프 참가자 추가 모집 ~10/1일까지',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '인하대학교 미래융합대학 LiFE (대학의 평생교육체제 지원) 사업 계약직 조교 채용 공고',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '[통계학과] 2021-2학기 대학원생 TA1 모집 안내 (~9/29까지)[통계학과] 2021-2학기 대학원생 TA1 모집 안내 (~9/29까지)',
            date: '2021.08.09',
            page: '#'
        }
    ];
    let notice_data_7 = [{
            title: '[총학생회]2021학년도 인하대학교 비룡제 행사 대행업체 모집 안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '한글날 기념행사 ‘한글 사랑 공모전’ 안내',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '2021 인하 발명아이디어 경진대회 결과(수상팀) 안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '[교육효과성센터] 학부교육실태조사 참여 안내',
            date: '2021.08.09',
            page: '#'
        },
        {
            title: '[교육효과성센터] 인하핵심역량진단 참여자 이벤트 안내',
            date: '2021.08.10',
            page: '#'
        },
        {
            title: '2021학년도 2학기(2021.09.01~2022.02.28) 의료공제 접수 안내',
            date: '2021.08.09',
            page: '#'
        }
    ];

    //입찰공고를 위한 데이터
    let bid_data = [{
            title: '[입찰 재공고] 행운의 열쇠 구매',
            date: '2021.08.09.',
            page: '#'
        },
        {
            title: '[입찰] 배터리 테스터기 구매',
            date: '2021.08.05.',
            page: '#'
        },
        {
            title: '[입찰] 형광분광기 구매',
            date: '2021.08.05',
            page: '#'
        },
        {
            title: '[입찰] 형광발광분석기 구매',
            date: '2021.08.05.',
            page: '#'
        },
        {
            title: '[입찰] 열변형시험기 구매',
            date: '2021.08.05.',
            page: '#'
        },
        {
            title: '[입찰] 인하대학교 경쟁력 강화를 위한 조사 용역',
            date: '2021.08.03.',
            page: '#'
        }

    ];

    // 데이터의 카테고리를 클릭하면 데이터를 갱신하여 화면에 보여준다.
    let notice_data_all = [
        notice_data_1,
        notice_data_2,
        notice_data_3,
        notice_data_4,
        notice_data_5,
        notice_data_6,
        notice_data_7
    ];
    $.each(notice_cate, function (index, item) {
        $(this).click(function (event) {
            //item 은 a태그입니다.
            //그래서 웹 브라우저가 갱신됩니다.
            //그래서 클릭시 데이터 갱신이 안됩니다.
            //a 태그의 href 기본 기능을 막는다.
            event.preventDefault();

            sort_data(notice_data_all[index], notice_data_div);
            //css꾸미기
            notice_cate.removeClass('notice-menu-focus');
            $(this).addClass('notice-menu-focus');

        });
    });

    //초기에 보여줄 데이터
    // 공지사항 처음 내용
    sort_data(notice_data_1, notice_data_div);
    // 입찰정보 처음 내용
    sort_data(bid_data, bid_data_div);


    function sort_data(_obj, _where) {

        $.each(_where, function (index, item) {
            //실제 배치할 데이터
            let temp_data = _obj[index];

            // 제목자리
            let temp_tit = $(this).find('.notice-box-tit');
            temp_tit.text(temp_data.title);

            // 날짜자리
            let temp_date = $(this).find('.notice-box-date');
            temp_date.text(temp_data.date);

            // href="" anchor 자리
            let temp_link = $(this).find('.notice-box-link');
            temp_link.attr('href', temp_data.page);

        });

        //dotdotdot.js 적용
        // $('.notice-box-tit').dotdotdot();
    }

    //공지사항, 입찰정보 보이고, 숨기기

    // .notice-tit 을 저장해서 참조한다.
    let notice_tit = $('.notice-tit');

    //.notice-cont 를 저장해서 참조한다.
    let notice_cont = $('.notice-cont');

    //notice-tit를 클릭하면 notice-cont를 보여주라.
    $.each(notice_tit, function (index, item) {
        $(this).click(function (event) {
            // href 기본 기능을 막자
            event.preventDefault();
            // 일단 모든 목록을 숨김
            notice_cont.hide();
            notice_cont.eq(index).show();

            //포커스 이동하기
            notice_tit.removeClass('notice-tit-focus');
            //notice_tit.eq(index).addClass('notice-tit-focus');아래와동일작동
            $(this).addClass('notice-tit-focus');

        });
    });

    
});





// 그림, 영상, 소리 등.. 
// html 태그에서 사용하는 멀티미디어 요소를
// 모두 로딩 완료 했다면 그때 처리한다.
window.onload = function () {
    $('html, body').stop().animate({
        scrollTop: 0
    }, 50);

}