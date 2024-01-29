//제이쿼리로 가져오기
$(document).ready(function () {
    $(".search_form").submit(function (e) {

        const bookApi = config.apikey;

        e.preventDefault();
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title",
            data: { query: $("#bookName").val() },
            headers: { Authorization: bookApi }
        })
            .done(function (msg) {
                if (msg.documents.length > 0) {
                    $('.info').show();
                    $('.info_top').html(`<img src="${msg.documents[0].thumbnail}"/>`).show();
                    $('.book_name').html(msg.documents[0].title).show();
                    $('.book_info').html(msg.documents[0].contents).show();
                } else {
                    // 검색 결과가 없을 때 각 요소를 숨김
                    $('.info').hide();
                }
            });
    });
});

