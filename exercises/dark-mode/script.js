$(document).ready(function() {
	$('.item').click(function() {
		$(this).toggleClass('active');
	});

  $('button').click(function() {
    $('div').toggle();
    $('button').toggleClass('active'); 
  }); 

	$("#darkmode").click(function() {
		$('body').toggleClass('darkmode');
	});
});