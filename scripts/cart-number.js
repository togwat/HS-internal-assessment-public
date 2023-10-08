function changeCartLinkText()
{
	// update cart count
	let cartItemsCount = JSON.parse(sessionStorage.getItem("cart")).length;

	// if there are items in the cart, change the header
	if (cartItemsCount > 0)
	{
		$('#navbar-links-cart.navbar-links').text(`Cart (${cartItemsCount})`);
	}
	if (cartItemsCount == 0)
	{
		$('#navbar-links-cart.navbar-links').text('Cart');
	}
}

// main
$(function()
{
	changeCartLinkText();
});
