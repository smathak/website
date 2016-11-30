// AJax and JQuery
// 비동기적(Asynchronous)

$(function(){
    // nationq에 타자릴 칠때마다 호출되는 비동기식 
    $('#nation').keyup(function(){
        var typed = $('#nation').val() || "";
        typed = typed.trim();
        if(!typed){
            return; // 타입한 내용이 없을 경우
        }

        $.ajax({
            url: '/host/suggest_nation', // 받는 쪽
            data: {qu: typed}, // nationq에 query 를 담아서 서버에 보냄  

            success: function(data) { // success, complete, error 등은 콜백함수 
                // success함수는 Ajax의 서버로 보내고 결과를 잘 받았을 때 결과가 data로 들어옴
                // map은 data 배열을 하나씩 function의 nation으로 보내서 <li>+name+<li>로 처리한 다음 다시 배열로 돌려줌 
                var els = _.map(data, function(name) { // data = ['대한'], ['민국']] -> ['<li>대한</li>', '<li>민국</li>'']
                     return '<li>' + name + '</li>';
                }); 
                // show 화면에 나타남
                $('.suggestnation').html(els.join('\n')).show();

                // li item을 클릭했을 때, text box의 내용을 바꾸고, suggest-box감춤
                $('.suggestnation li').click(function(e) {
                    $('#nation').val($(e.currentTarget).text());
                    $('.suggestnation').hide();
                });
            }
        });
    });

     $('#city').keyup(function(){
            var typed_city = $('#city').val() || "";
            typed_city = typed_city.trim();
            if(!typed_city){
                return; // 타입한 내용이 없을 경우
        }

        $.ajax({
            url: '/host/suggest_city', // 받는 쪽
            data: {qu: typed_city}, // nationq에 query 를 담아서 서버에 보냄  

            success: function(data) { // success, complete, error 등은 콜백함수 
                // success함수는 Ajax의 서버로 보내고 결과를 잘 받았을 때 결과가 data로 들어옴
                // map은 data 배열을 하나씩 function의 nation으로 보내서 <li>+name+<li>로 처리한 다음 다시 배열로 돌려줌 
                var els = _.map(data, function(name) { // data = ['대한'], ['민국']] -> ['<li>대한</li>', '<li>민국</li>'']
                     return '<li>' + name + '</li>';
                }); 
                // show 화면에 나타남
                $('.suggestcity').html(els.join('\n')).show();

                // li item을 클릭했을 때, text box의 내용을 바꾸고, suggest-box감춤
                $('.suggestcity li').click(function(e) {
                    $('#city').val($(e.currentTarget).text());
                    $('.suggestcity').hide();
                });
            }
        });
     });
});

