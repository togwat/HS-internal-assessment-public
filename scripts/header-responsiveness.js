const showSearchTime = 200;	// animation time, in ms
const showMenuTime = 200;

const minWindowWidth = 840;	// width needed to execute this script

// main
$(function()
{
	// open search bar
	$('.navbar-search-icon').on('click', function(event)
	{
		if ($(window).width() <= minWindowWidth)
		{
			// hide icon, show search bar
			$('.navbar-search-icon').hide(showSearchTime);
			$('.navbar-search-bar-container').css('display', 'flex');
		}
	});

	// open links menu
	$('.navbar-menu-icon').on('click', function(event)
	{
		if ($(window).width() <= minWindowWidth)
		{
			// hide icon, show menu
			$('.navbar-menu-icon').hide(showMenuTime);
			$('.navbar-links-responsive-container').css('display', 'flex');

			// show overlay
			$('.header-responsive-overlay').fadeIn(showMenuTime);
		}
	});

	// close things by tapping anywhere but the search bar
	$('html').click(function(event)
	{
		// prevent search bar from instantly closing
		if ($('.navbar-search-bar-container').is(":visible") && !$('.navbar-search-icon').is(':animated'))
		{
			if (!$(event.target).hasClass('navbar-search-bar') && $(window).width() <= minWindowWidth)
			{
				// hide search bar, show icon
				$('.navbar-search-icon').show(showSearchTime);
				$('.navbar-search-bar-container').hide('slide', {direction: 'right'}, showSearchTime, function()
				{
					// remove inline style so it doesn't override css
					$(this).removeAttr('style');
				});
			}
		}

		// menu
		if ($('.navbar-links-responsive-container').is(":visible") && !$('.navbar-menu-icon').is(':animated'))
		{
			if (!$(event.target).hasClass('navbar-links-responsive-container') && $(window).width() <= minWindowWidth)
			{
				// show icon
				$('.navbar-menu-icon').show(showMenuTime);

				// hide menu
				$('.navbar-links-responsive-container').hide('slide', {direction: 'left'}, showMenuTime, function()
				{
					$(this).removeAttr('style');
				});

				// hide overlay
				$('.header-responsive-overlay').fadeOut(showMenuTime);
			}
		}
	});
});
