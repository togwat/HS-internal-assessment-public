fadeTime = 200;	// time it takes to fade in and fade out, in ms

function openOverlay(id)
{
	// show dark overlay
	$('.shop-item-overlay').fadeIn(fadeTime);

	// show the overlay box of the chosen item
	$(`.shop-grid-item-container#${id}`).children('.shop-item-overlay-box').fadeIn(fadeTime);
	$(`.shop-grid-item-container#${id}`).children('.shop-item-overlay-box').css('display', 'flex');
}

// close overlay with x
function closeOverlay()
{
	$('.shop-item-overlay').fadeOut(fadeTime);
	$('.shop-item-overlay-box').fadeOut(fadeTime);
}
