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

//////////////

const carousel = document.querySelector("#banner");
const carouselBulletPointsContainer = carousel.querySelector(".dots");
const carouselImageElement = carousel.querySelector(".banner-img");
const carouselTagLineElement = carousel.querySelector("p");
const carouselImageCount = slides.length;

const carouselFirstSlideIndex = 0;
const carouselLastSlideIndex = carouselImageCount - 1;
let carouselCurrentSlideIndex = carouselFirstSlideIndex;
let carouselPreviousSlideIndex = carouselFirstSlideIndex;

//////////////

function handleCarouselClick(event) {
    if(! event.target.classList.contains("arrow")) return;

	carouselPreviousSlideIndex = carouselCurrentSlideIndex;

	// détermine l'index du prochain slide à afficher
    if(event.target.classList.contains("arrow_left")) {
		-- carouselCurrentSlideIndex;
        if(carouselCurrentSlideIndex < carouselFirstSlideIndex) {
			carouselCurrentSlideIndex = carouselLastSlideIndex;
		}
    } else {
        ++ carouselCurrentSlideIndex;
		if(carouselCurrentSlideIndex > carouselLastSlideIndex) {
			carouselCurrentSlideIndex = carouselFirstSlideIndex;
		}
    }

	updateCarouselSlide(
		`/assets/images/slideshow/${slides[carouselCurrentSlideIndex].image}`,
		slides[carouselCurrentSlideIndex].tagLine
	);
	
	toggleCarouselActiveBulletPoint(carouselPreviousSlideIndex, carouselCurrentSlideIndex);
}

carousel.addEventListener("click", handleCarouselClick);

//////////////

function createCarouselBulletPoints(bulletPointsContainer, bulletPointsCount) {
	for(let i = 0; i !== bulletPointsCount; ++ i) {
		const newDot = document.createElement("span");
		newDot.classList.add("dot");
		bulletPointsContainer.append(newDot);
	}
}

if(carouselImageCount > 1) {
	createCarouselBulletPoints(carouselBulletPointsContainer, carouselImageCount);
	toggleCarouselActiveBulletPoint(carouselFirstSlideIndex, carouselFirstSlideIndex);
}

//////////////

function updateCarouselSlide(imageSrc, tagLineText) {
	carouselImageElement.setAttribute("src", imageSrc);
	carouselTagLineElement.innerHTML = tagLineText;
}

function toggleCarouselActiveBulletPoint(previousActiveBulletPointIndex, newActiveBulletPointIndex) {
	carouselBulletPointsContainer.children[previousActiveBulletPointIndex].classList.remove("dot_selected");
	carouselBulletPointsContainer.children[newActiveBulletPointIndex].classList.add("dot_selected");
}