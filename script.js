let isDragging = true;
let startX;
let scrollLeft;
const slider = document.getElementById('slider');
let slideIndex = 0;
const totalCards = document.querySelectorAll('.card').length;
const visibleCards = 1;

// Function to move the slider based on button click or swipe
function moveSlide(direction) {
  if (direction === 1) {
    slideIndex++;
    if (slideIndex >= totalCards) slideIndex = 0;
  } else {
    slideIndex--;
    if (slideIndex < 0) slideIndex = totalCards - 1;
  }
  updateSliderPosition();
}

// Function to update the slider's position based on the index
function updateSliderPosition() {
  const cardWidth = document.querySelector('.card').offsetWidth;
  slider.style.transform = `translateX(-${slideIndex * (cardWidth + 15)}px)`;
}

// Dragging functionality
function startDrag(e) {
  isDragging = true;
  startX = e.pageX || e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
}

function endDrag() {
  isDragging = false;
}

function dragging(e) {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  const walk = (x - startX) * 2; // Adjust dragging speed
  slider.scrollLeft = scrollLeft - walk;
}

// Autoplay functionality
let autoplayInterval = setInterval(() => moveSlide(1), 3000); // Autoplay every 3 seconds

slider.addEventListener('mouseover', () => clearInterval(autoplayInterval)); // Pause autoplay on hover
slider.addEventListener('mouseout', () => autoplayInterval = setInterval(() => moveSlide(1), 3000)); // Resume autoplay after hover

// Prevent dragging during touch events for mobile
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('touchend', endDrag);
slider.addEventListener('touchmove', dragging);
