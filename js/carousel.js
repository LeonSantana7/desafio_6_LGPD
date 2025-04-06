//Array storage class
let carouselArr = [];

//class Carousel
class Carousel {
    constructor(image, title, url) {
        this.Image = image;
        this.Title = title;
        this.Url = url;
    }

    static Start(arr) {
        if (arr) {
            if (arr.length > 0) {
                Carousel._sequence = 0;
                Carousel._size = arr.length;
                Carousel.Next(arr);
                Carousel._interval = setInterval(function () { Carousel.Next(arr); }, 2000);
            }
        } else {
            throw "Method Start need a Array Variable.";
        }
    }
    static Next(carouselArr) {
        const slide = carouselArr[Carousel._sequence];

        document.getElementById('carousel').style.backgroundImage = `url('img/${slide.Image}')`;
        document.getElementById('carousel').style.backgroundSize = "contain";
        document.getElementById('carousel').style.backgroundPosition = "center";
        document.getElementById('carousel').style.backgroundRepeat = "no-repeat";

        const titleElement = document.getElementById('carousel-title');
        titleElement.textContent = slide.Title;

        const linkElement = document.createElement('a');
        linkElement.href = slide.Url;
        linkElement.textContent = slide.Title;

        titleElement.innerHTML = "";
        titleElement.appendChild(linkElement);

        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
    }


};
