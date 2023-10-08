// shop items defined in create-shopItem.js
let cartItems = [];	// to be passed to other pages

// if user comes back to shop page with items in cart, restore cart
if ("cart" in sessionStorage)
{
	cartItems = JSON.parse(sessionStorage.getItem("cart"));
}

function addShopItem(shopItem)
{
	let shopItemTemplate = `
	<div class="shop-grid-item-container" id="${shopItem.id}">
		<a class="shop-grid-item" href="javascript:openOverlay(${shopItem.id});">
			<img class="shop-grid-item-image" src="images/thumbnails/${shopItem.name}-thumbnail.png" alt="${shopItem.title} thumbnail">
			<p class="shop-grid-item-title">${shopItem.title}</p>
			<p class="shop-grid-item-price">$${shopItem.price}</p>
		</a>
		<div class="shop-item-overlay-box">
			<span class="shop-item-overlay-box-close fas fa-times fa-fw" onclick="closeOverlay()"></span>
			<img class="shop-item-overlay-box-image" src="images/thumbnails/${shopItem.name}-thumbnail.png" alt="${shopItem.title} thumbnail">
			<p class="shop-item-overlay-box-title">${shopItem.title}</p>
			<p class="shop-item-overlay-box-price">$${shopItem.price}</p>
			<button type="button" class="shop-item-overlay-box-button add-cart-button">Add to cart</button>
		</div>
	</div>
	`;

	// add shop item to shop grid container
	$('.shop-grid-container').append(shopItemTemplate);
}

function changeCartButton(button)
{
	// modify button to remove from cart
	$(button).text('Remove from cart');
	$(button).toggleClass('add-cart-button remove-cart-button');
}

// main
$(function()
{
	// loop through shop items to add them to the page
	for (let i = 0; i < shopItems.length; i++)
	{
		item = shopItems[i];

		// add item to shop
  		addShopItem(item);

		// check if item is in cart
		// filter out all objects without id - empty(0) means not in cart
		if (cartItems.filter(cartItem => {return cartItem.id == item.id}).length != 0)
		{
			// find & modify the button
			changeCartButton($(`.shop-grid-item-container#${item.id}`).children('.shop-item-overlay-box').children('.shop-item-overlay-box-button'));
		}
	}

	// add to cart
	$(document).on('click', '.add-cart-button', function()
	{
		// retrieve id of item container
		let id = $(this).parent().parent().attr('id');

		// append the object into cart
		cartItems.push(shopItems[id]);

		// whenever new item is added, update session storage
		sessionStorage.setItem("cart", JSON.stringify(cartItems));

		// modify button to remove from cart
		changeCartButton(this);

		// update navbar link text
		changeCartLinkText();
	});

	// remove from cart
	$(document).on('click', '.remove-cart-button', function()
	{
		// retrieve id of item container
		let id = $(this).parent().parent().attr('id');

		// only retain the items without this id
		cartItems = cartItems.filter(item => {return item.id != id});

		// update session storage
		sessionStorage.setItem("cart", JSON.stringify(cartItems));

		// modify button to add to cart
		$(this).text('Add to cart');
		$(this).toggleClass('remove-cart-button add-cart-button');

		// update navbar link text
		changeCartLinkText();
	});
});
