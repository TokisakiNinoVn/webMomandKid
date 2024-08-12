export default function bannerSlider() {
    const images = document.querySelectorAll('.banner-image');
    const prevIcon = document.querySelector('.prev-icon');
    const nextIcon = document.querySelector('.next-icon');
    let currentIndex = 0;
  
    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }
  
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }
  
    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }
  
    prevIcon.addEventListener('click', prevImage);
    nextIcon.addEventListener('click', nextImage);
  
    showImage(currentIndex); // Show the first image initially
  }
  