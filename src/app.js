// Put jQuery into noConflict mode
var $ = jQuery.noConflict(true);

// Append the embedded styles to the document
$('head').append($('<style type="text/css"></style>').html(Styles));

// Your application JS goes here
$('body').append(Templates.example({ name: 'Control panel' }));

function showTimelineNav() {
	var $tbtn = $('#nav-stories-toggle'),
	    $scrim = $('.timeline_scrim');
	$tbtn.addClass('open_');
	$scrim.fadeIn(250).bind('click', function(ev) {
		ev.preventDefault();
		hideTimeline();
	});
	$('#stories-nav').show().find('.timeline').animate({ 'top': '0px' }, 250);
};

function incrementTimelineImages() {
	$('.viewer').animate({'left': '-=240'}, 500);
};

$('.advance-timeline').click(function(e) {
	e.preventDefault();
	//alert('hello');
	$('.controls ol').css('position','absolute'); $('.controls ol').animate({'left': '-250px'}, 500);  
	$('.viewer').animate({'left': '-11725px'}, 500);
	showTimelineNav();
});

$('.inc-viewer').click(function(e) {
	e.preventDefault();
	incrementTimelineImages();
});