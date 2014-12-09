$(function(){
	$('.ajaxDelete').on('click', function(event) {
		event.preventDefault();


		var thisDeleteButton = $(this);

		$.ajax({
			url:'/watchList/'+thisDeleteButton.data('id'),
			type:'DELETE',
			success:function(result){
				thisDeleteButton.closest('tr').fadeOut('slow',function(){
					$(this).remove();
				})
			}
		});
	});
})