// a list of shop items
let shopItems = [];

class ShopItem
{
	constructor(name, title, price)
	{
		this.id;
		this.name = name;	//file name used
		this.title = title;	// proper name of item
		this.price = price.toFixed(2);	// always 2 decimal places
		this.sold = false;	// default false
	}

	// use the index of the object on the list as the id
	getId(i)
	{
		this.id = shopItems.indexOf(i);
	}
}

// if shop items created already, retrieve shop items
if ("shop" in sessionStorage)
{
	shopItems = JSON.parse(sessionStorage.getItem("shop"));
}
// create shop items
else
{
	// create item objects
	// item name, item title, item price
	let cube1 = new ShopItem("cube-camo", "Camo cube", 29.99);
	let cube2 = new ShopItem("cube-furry", "Furry cube", 69.99);
	let cube3 = new ShopItem("cube-glowing-2", "Sci-fi cube", 254.00);
	let cube4 = new ShopItem("cube-marble", "Marble cube", 12.29);
	let cube5 = new ShopItem("cube-balkan", "Balkan cube", 19.99);
	let cube6 = new ShopItem("cube-glowing", "Glowing cube", 6.00);
	let cube7 = new ShopItem("cube-metal", "Metal cube", 4.99);

	// append to list
	shopItems.push(cube1, cube2, cube3, cube4, cube5, cube6, cube7);

	// create shopItem id
	for (let i = 0; i < shopItems.length; i++)
	{
		item = shopItems[i];

		// get item id
		item.getId(item);
	}

	// save on sessionStorage
	sessionStorage.setItem("shop", JSON.stringify(shopItems));
}
