// index system to keep track of which form the user is on.
let forms = [];

function addProgressBarDots(form)
{
	// html, get icon name & form name
	let progressBarDotTemplate = `
	<span class="progress-bar-dot fas fa-${$(`.purchase-form-container#${form}`).attr('data-icon-name')}" id="${form}"></span>
	`

	// add to first
	$('.progress-bar-background').prepend(progressBarDotTemplate);
}

// main
$(function()
{
	// retrieve form id
	$('.purchase-form-container').each(function()
	{
		forms.push(this.id);
	});

	// add progress bar dots, reversed for loop because prepend
	for (let i = forms.length - 1; i >= 0; i--)
	{
		addProgressBarDots(forms[i]);
	}

	// back button
	// first item - go back to cart page
	$('.purchase-back-button').on('click', function()
	{
		// get the index of the currently visible form
		let currentIndex = forms.indexOf($('.purchase-form-container:visible').attr('id'));

		// lowest index
		if (currentIndex === 0)
		{
			window.location.href = "cart.html";
		}
		// forms behind
		else
		{
			// hide current form
			$(`.purchase-form-container#${forms[currentIndex]}`).hide();
			// display last form
			$(`.purchase-form-container#${forms[currentIndex - 1]}`).show();

			// undo the check icon of the last form
			$(`.progress-bar-dot#${forms[currentIndex - 1]}`).toggleClass(`fa-check fa-${$(`.purchase-form-container#${forms[currentIndex - 1]}`).attr('data-icon-name')} `);
		}
	});

	// continue button
	// last item - go to thanks page
	$('.purchase-continue-button').on('click', function()
	{
		// get the index of the currently visible form
		let currentIndex = forms.indexOf($('.purchase-form-container:visible').attr('id'));

		// if index is the last item of array (length - 1)
		if (currentIndex === forms.length - 1)
		{
			window.location.href = "thanks.html";
		}
		// more forms ahead
		else
		{
			// hide current form
			$(`.purchase-form-container#${forms[currentIndex]}`).hide();
			// display next form
			$(`.purchase-form-container#${forms[currentIndex + 1]}`).show();

			// current form progress bar dot replace to checked
			// get the current icon, then toggle with check icon
			$(`.progress-bar-dot#${forms[currentIndex]}`).toggleClass(`fa-${$(`.purchase-form-container#${forms[currentIndex]}`).attr('data-icon-name')} fa-check`);
		}
	});
});
