// shop items already defined in create-shopItems
const maxSlideshowIndex = 4;    // max 5 images in the slideshow
let slideshowIndex = 0;     // current index

const slideShowTime = 750;  // time it takes for slideshow transition, in ms
const slideHideLag = 50;    // slideshow hide lag to prevent seams during transition

const slideshowTimerTime = 5000;    // time it takes for slideshow to automatically move, in ms
let slideshowTimer = setInterval(autoAddIndex, slideshowTimerTime); // timer that calls auto slider

function indexOverflowCheck(index, maxIndex)
{

    // current index below 0, go to max
    if (index < 0)
    {
        return maxIndex;
    }
    // current index beyond max range, loop back
    else if (index > maxIndex)
    {
        return 0;
    }
    // no overflow, do nothing
    else
    {
        return index;
    }
}

// randomly select 5 images
function selectImages(shopItems, imageCount)
{
    // shuffle the array, then pick the first n items
    // fisher-yates shuffle
    for (let i = shopItems.length -1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * i);
        let k = shopItems[i];
        shopItems[i] = shopItems[j];
        shopItems[j] = k;
    }

    // get the first 5 elements
    shopItems = shopItems.slice(0, imageCount);

    return shopItems;
}

// add image and dot to html
function addImages(item, index)
{
    let slideshowImageTemplate = `<img class="slideshow-image" id="slideshow-${index}" src="images/slideshow/${item.name}.jpg" alt="Slideshow ${item.title}">`;

    // add image to slideshow container
	$('.slideshow-container').append(slideshowImageTemplate);

    let slideshowDotTemplate = `<span class="slideshow-dot slideshow-current-dot" id="dot-${index}" onclick="setIndex(${index});resetTimer();"></span>`

    // add dots
    $('.slideshow-dots-container').append(slideshowDotTemplate);
}

// add index for slideshow arrows
function addIndex(n)
{
    // only run if slideshow is not animated
    if(!$('.slideshow-image').is(':animated'))
    {
        // add/subtract index
        slideshowIndex += n;

        // if current index beyond max range, loop back
        slideshowIndex = indexOverflowCheck(slideshowIndex, maxSlideshowIndex);

        // change the image
        changeImage(n);
        changeDot();
    }
}

// set index for slideshow dots
function setIndex(n)
{
    // only run if slideshow is not animated
    if(!$('.slideshow-image').is(':animated'))
    {
        slideshowIndex = n;

        // change the image
        setImage();
        changeDot();
    }
}

function changeDot()
{
    // loop through slideshow-dot class
    $('.slideshow-dot').each(function()
    {
        // set all dots to blank
        if ($(this).hasClass('slideshow-current-dot'))
        {
            $(this).toggleClass('slideshow-current-dot slideshow-blank-dot');
        }

        // set the dot with matching index blue
        if($(this).attr('id') == `dot-${slideshowIndex}`)
        {
            $(this).toggleClass('slideshow-blank-dot slideshow-current-dot');
        }
    });
}

// slideshow image change animated
function changeImage(n)
{
    // direction: positive is left, negative is right
    let direction = "";
    let oppositeDirection = "";

    // determine direction
    if (n < 0)  // right
    {
        direction = "right";
        oppositeDirection = "left";
    }
    else if (n > 0) // left
    {
        direction = "left";
        oppositeDirection = "right";
    }

    // determine index of previous image
    let previousIndex = slideshowIndex - n;
    // if current index beyond max range, loop back
    previousIndex = indexOverflowCheck(previousIndex, maxSlideshowIndex);

    // loop through slidehow-image class
    $('.slideshow-image').each(function()
    {
        // hide previous image
        if($(this).attr('id') == `slideshow-${previousIndex}`)
        {
            $(this).hide('slide', {direction: direction}, slideShowTime + slideHideLag);
        }

        // show image with the correct index
        if($(this).attr('id') == `slideshow-${slideshowIndex}`)
        {
            $(this).show('slide', {direction: oppositeDirection}, slideShowTime);
        }
    });
}

// the old simpler changeImage without animation, used for clicking on dots
function setImage()
{
    // hide all slideshow images except the first one
    $('.slideshow-image').each(function()
    {
        $(this).hide();

        // show image with the correct index
        if($(this).attr('id') == `slideshow-${slideshowIndex}`)
        {
            $(this).show();
        }
    });
}

// on manual interaction, reset timer
function resetTimer()
{
    clearInterval(slideshowTimer);
    slideshowTimer = setInterval(autoAddIndex, slideshowTimerTime);
}

// automatically moves slideshow after a set period of time
function autoAddIndex()
{
    addIndex(1);
}

// main
$(function()
{
    // select 5 random images
    let slideshowItems = selectImages(shopItems, maxSlideshowIndex + 1);

    // add each image
    for (i = 0; i < slideshowItems.length; i++)
    {
        item = slideshowItems[i];

        addImages(item, i);
    }

    // hide all slideshow images except the first one
    setImage();
    changeDot();
});
