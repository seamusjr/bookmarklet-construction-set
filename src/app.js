// Put jQuery into noConflict mode
var $ = jQuery.noConflict(true);

// Append the embedded styles to the document
$('head').append($('<style type="text/css"></style>').html(Styles));

// Your application JS goes here
