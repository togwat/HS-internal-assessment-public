let priceList = [];

const shopItemHideTime = 200;	// time it takes to fade in and out shop items, in ms

function priceSliderChange()
{
	// set current price as value of the slider
	$('.price-slider-current').text(`$${$('.price-slider').slider('value').toFixed(2)}`);

	// hide shop items whose price are below the slider price
	for (let i = 0; i < shopItems.length; i++)
	{
		item = shopItems[i];

		// slider price lower than item price
		if(item.price > $('.price-slider').slider('value'))
		{
			// get id of html element
			$(`.shop-grid-item-container#${item.id}`).hide(shopItemHideTime);
		}
		// show html element if slider price is higher
		else
		{
			$(`.shop-grid-item-container#${item.id}`).show(shopItemHideTime);
		}
	}
}

// main
$(function()
{
	// set max price label
	// gather a list of all prices
	for (let i = 0; i < shopItems.length; i++)
	{
		item = shopItems[i];
		// convert to float first
		priceList.push(parseFloat(item.price));
	}

	// set max price as max label value
	let maxPrice = Math.max.apply(Math, priceList);

	// convert back to string with decimals
	$('.price-slider-max').text(`$${maxPrice.toFixed(2)}`);

	// set initial slider price to max price, as slider initial value will be max
	$('.price-slider-current').text(`$${maxPrice.toFixed(2)}`);

	// slider properties
	$('.price-slider').slider(
	{
		// set max value of slider as max price
		//min: 0,	if using decimals for slider, uncomment these two lines
		//step: 0.01,
		max: maxPrice,
		value: maxPrice,
		slide: function(event, ui)
		{
			priceSliderChange();
		},

		stop: function(event, ui)
		{
			priceSliderChange();
		}
	});
});
