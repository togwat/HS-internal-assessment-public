let totalPrice = sessionStorage.getItem("cartTotalPrice");

// main
$(function()
{
	$('.purchase-total-label').text(`Total: $${totalPrice}`);
});
