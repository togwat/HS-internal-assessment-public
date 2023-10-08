// retrieve from sessionStorage
let cartItems = JSON.parse(sessionStorage.getItem("cart"));

const cartItemHideTime = 800;	// time it takes to slide the removed cart item, in ms

if (cartItems == null)
{
	cartItems = [];
}

function addCartItem(cartItem)
{
	let cartItemTemplate = `
	<div class="cart-item" id="${cartItem.id}">
		<span class="cart-item-close fas fa-times fa-fw"></span>
		<img class="cart-item-image" src="images/thumbnails/${cartItem.name}-thumbnail.png" alt="${cartItem.title} thumbnail">
		<p class="cart-item-title">${cartItem.title}</p>
		<p class="cart-item-price">$${cartItem.price}</p>
	</div>
	`;

	// add shop item to shop grid container
	$(cartItemTemplate).insertBefore('.cart-total');
}

// get sum of all cart item price
function getTotalPrice()
{
	let totalPrice = 0;

	// add all prices
	for (let i = 0; i < cartItems.length; i++)
	{
		// convert to float
		totalPrice += parseFloat(cartItems[i].price);
	}

	// set label, with decimals
	$('.cart-total-price').text(`$${totalPrice.toFixed(2)}`);

	// add total price to sessionStorage
	sessionStorage.setItem("cartTotalPrice", totalPrice.toFixed(2));
}

// main
$(function()
{
	// add cart items
	for (let i = 0; i < cartItems.length; i++)
	{
		// add item to shop
  		addCartItem(cartItems[i]);
	}

	// get total price
	getTotalPrice();

	// remove cart item
	$('.cart-item-close').on('click', function(event)
	{
		// hide animation
		$(this).parent().hide(cartItemHideTime);

		// remove from cartItems, match id
		cartItems = cartItems.filter(item => {return item.id != $(this).parent().attr('id')});

		// update storage
		sessionStorage.setItem("cart", JSON.stringify(cartItems));

		// update total price
		getTotalPrice();

		// update navbar link text
		changeCartLinkText();
	});
});
