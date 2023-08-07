const carousel = document.querySelector(".carousel");
const images = carousel.querySelectorAll("imgC");
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;



const autoSlide = () => {
  const firstImgWidth = images[0].clientWidth + 14;
  const scrollAmount = firstImgWidth * 2;

  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {

    for (let i = 0; i < images.length; i++) {
      carousel.appendChild(images[i].cloneNode(true));
    }
  } else if (carousel.scrollLeft <= 0) {

    for (let i = images.length - 1; i >= 0; i--) {
      carousel.prepend(images[i].cloneNode(true));
    }
    carousel.scrollLeft += firstImgWidth * images.length;
  }

  carousel.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });

  showHideIcons();
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;

  const firstImgWidth = images[0].clientWidth + 14;
  const scrollWidth = firstImgWidth * images.length;
  if (carousel.scrollLeft <= 0) {
    carousel.scrollLeft += scrollWidth;
  } else if (carousel.scrollLeft >= scrollWidth) {
    carousel.scrollLeft -= scrollWidth;
  }

  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;

  const imageWidth = images[0].offsetWidth + 14;
  const scrollLeft = carousel.scrollLeft;
  const nearestIndex = Math.round(scrollLeft / imageWidth);

  carousel.scrollTo({
    left: nearestIndex * imageWidth,
    behavior: "smooth",
  });

  images.forEach((img) => {
    img.style.pointerEvents = "auto";
  });
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

setInterval(autoSlide, 2700); 