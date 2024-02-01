// 페이지가 로드될 때
document.addEventListener("DOMContentLoaded", () => {

    const searchForm = document.querySelector('.search_form');
    const info = document.querySelector('.info');
    const top = document.querySelector('.info_top');
    const name = document.querySelector('.book_name');
    const bookInfo = document.querySelector('.book_info');

    searchForm.addEventListener("submit", async (e) => {

        const bookApi = config.apikey; 
        e.preventDefault(); 

        const query = encodeURIComponent(document.querySelector("#bookName").value); 
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': bookApi
                }
            });

            if (response.ok) {
                const data = await response.json();


                info.style.display = data.documents.length > 0 ? 'block' : 'none';

                if (data.documents.length > 0) {

                    top.innerHTML = `<img src="${data.documents[0].thumbnail}"/>`;

                    name.innerHTML = data.documents[0].title;


                    bookInfo.innerHTML = data.documents[0].contents + "⋯";

                    bookInfo.style.display = 'block';
                }
            } else {
                console.error('HTTP 오류 발생:', response.status);
            }
        } catch (error) {
            console.error('에러 발생:', error);
        }
    });
});



// //제이쿼리로 가져오기
// $(document).ready(function () {
//     $(".search_form").submit(function (e) {

//         const bookApi = config.apikey;

//         e.preventDefault();
//         $.ajax({
//             method: "GET",
//             url: "https://dapi.kakao.com/v3/search/book?target=title",
//             data: { query: $("#bookName").val() },
//             headers: { Authorization: bookApi }
//         })
//             .done(function (msg) {
//                 if (msg.documents.length > 0) {
//                     $('.info').show();
//                     $('.info_top').html(`<img src="${msg.documents[0].thumbnail}"/>`).show();
//                     $('.book_name').html(msg.documents[0].title).show();
//                     $('.book_info').html(msg.documents[0].contents + "⋯").show();
//                 } else {
//                     // 검색 결과가 없을 때 각 요소를 숨김
//                     $('.info').hide();
//                 }
//             });
//     });
// });

