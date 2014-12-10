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
	$('.addButton').on('click', function(event){
		// alert('it was clicked!!');
		var myButton = $(this);
		// console.log('title',$(this).data('title'));
		// console.log('year',$(this).data('year'));
		// console.log('imdbid',$(this).data('imdbid'));

		$.post('/added',{
			title: myButton.data('title'),
			year: myButton.data('year'),
			imdbID: myButton.data('imdbid')
		}, function(returnData){
			// myButton.fadeOut();
			myButton.html('Already in Watch List').prop("disabled",true).removeClass('btn-primary');
		});
	});
});


