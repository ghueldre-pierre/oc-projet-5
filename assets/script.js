const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
];



////////////////

function CreateCarousel(ImageDataArray, ImageBackgroundColor = null) {
	/////////////////
	const ImageElement = document.body.querySelector("#banner .banner-img");
	const TagLineElement =  document.body.querySelector("#banner p");
	const DotsContainerElement = document.body.querySelector("#banner .dots");

	/////////////////
	const ImagesFolderPath = "./assets/images/slideshow/";

	/////////////////
	const LastImageIndex = ImageDataArray.length - 1;
	const FirstImageIndex = 0;
	let currentImageIndex = FirstImageIndex;
	let previousImageIndex = FirstImageIndex;

	{
		const ArrowLeftElement = document.body.querySelector("#banner .arrow_left");
		ArrowLeftElement.addEventListener("click", function(event) {
			displayImage(getPreviousImageIndex());
		});

		const ArrowRightElement = document.body.querySelector("#banner .arrow_right");
		ArrowRightElement.addEventListener("click", function(event) {
			displayImage(getNextImageIndex());
		});
	}

	// create dots elements
	for(let i = 0; i !== ImageDataArray.length; ++ i) {
		const newDot = document.createElement("div");
		newDot.classList.add("dot");
		DotsContainerElement.append(newDot);
	}

	// set image element background color (optional)
	if(ImageBackgroundColor !== null) {
		ImageElement.style.backgroundColor = ImageBackgroundColor;
	}

	function displayImage(imageIndex) {
		const imageData = ImageDataArray[imageIndex];
		const imagePath = ImagesFolderPath + imageData["image"];
		//console.dir(imagePath);
		ImageElement.setAttribute("src", imagePath);
		TagLineElement.innerHTML = imageData["tagLine"];
		DotsContainerElement.children[previousImageIndex].classList.remove("dot_selected");
		previousImageIndex = currentImageIndex;
		DotsContainerElement.children[imageIndex].classList.add("dot_selected");
	}

	function getNextImageIndex() {
		if(currentImageIndex !== LastImageIndex) {
			currentImageIndex += 1;
		} else {
			currentImageIndex = FirstImageIndex;
		}
		return currentImageIndex;
	}

	function getPreviousImageIndex() {
		if(currentImageIndex !== FirstImageIndex) {
			currentImageIndex -= 1;
		} else {
			currentImageIndex = LastImageIndex;
		}
		return currentImageIndex;
	}

	displayImage(currentImageIndex);
}

CreateCarousel(slides, "black");
