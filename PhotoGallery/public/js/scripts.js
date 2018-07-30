//jQuery 레퍼인 $를 사용해 익명 함수를 실행.
/*
	$(document).ready(function(){ 
		//to do... 
	}); 를 축약하면 -> $()  

 페이지(document)가 로드될 때까지 기다렸다가 콜백 함수가 실행된다는 뜻.
 page가 실제 loading중일 때 존재하지 x DOM요소
*/

$(function(){ 
	$('#post-comment').hide(); //기본적으로 숨겨있다가 사용(div 태그의 hide method사용).
	$('#btn-comment').on('click', (event)=>{
		event.preventDefault();
		//preventDefault함수를 포함시키지 않으면 UI가 우리가
		//생각한 대로 실행되지 않을 수 있다.
		$('#post-comment').slideDown();
	});

	//id = btn-like인 button 안에 onClick 이벤트 핸들러 등록.
	$('#btn-like').on('cilck', (event)=>{ 
		event.preventDefault();

		//data-id 속성을 Like버튼으로부터 반환받은 후 /images/:image_id/like경로로
		//jQuery Ajax 호출을 수행한다.
		var imgId = $(this).data('id');

		$.post('/images/' + imgId + '/like').done(function(data){
			$('.likes-count').text(data.likes);
		});
	});
});