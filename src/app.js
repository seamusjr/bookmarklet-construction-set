// Put jQuery into noConflict mode
var $ = jQuery.noConflict(true);

// Append the embedded styles to the document
$('head').append($('<style type="text/css"></style>').html(Styles));

// Your application JS goes here
$('body').append(Templates.example({ name: 'Control panel' }));

function MyBookmarklet() {
	var $tbtn = $('#nav-stories-toggle'),
		$snav = $('#stories-nav'),
		$sviewer = $('.viewer'),
	    $scrim = $('.timeline_scrim');
	
	function openTimeline() {
		if($tbtn.hasClass('open_') === false){
			$tbtn.addClass('open_');
			$snav.show();
			$scrim.fadeIn(250).bind('click', function(ev) {
				ev.preventDefault();
				hideTimeline();
			});
			
		}// else {
		//	alert($tbtn.hasClass('open_'))
			return false;
		//}
	};
	
	function showTimelineNav() {
		openTimeline();
		$snav.find('.timeline').animate({ 'top': '0px' }, 250);
	};

	function incrementTimelineImages() {
		openTimeline();
		$sviewer.animate({'left': '-=235'}, 500);
	};
	
	function init() {
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

		$('.close-btn a').click(function(e) {
			e.preventDefault();
			$('.bookmarklet-hover-box').fadeOut(500).remove();
			delete my_bookmarklet;
		});
	};
	init();
};

var my_bookmarklet = new MyBookmarklet();
my_bookmarklet();
