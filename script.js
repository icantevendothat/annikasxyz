
document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('content');
    const loaderOverlay = document.getElementById('loader-overlay');
    const socialLinks = document.querySelector('.social-links');
    const header = document.querySelector('.header');
    const nameFlipContainer = document.querySelector('.name-flip-container');
    const gridItems = document.querySelectorAll('.image-grid .modal-trigger');

    const animationDuration = 5000;
    const greenDuration = 400;
    const blackDuration = 400;

    const imageUrls = [
        'media/gritos.webp', 'media/spaces.webp', 'media/mareas.webp',
        'media/posters.webp', 'media/limerence.webp', 'media/rafo.webp', 'media/enyelc.webp', 'media/IMG_5747 3.webp',
        'media/lou.webp', 'media/000253110032.webp', 'media/ineinander.webp', 'media/fut3.webp', 'media/clara.webp',
        'media/suzhou.webp', 'media/ratp-1_0008_Screen-Shot-2024-04-09-at-2.22.58-AM.webp', 'media/eser.webp',
        'media/lecons.webp', 'media/blackhair.webp', 'media/hannah.webp', 'media/inmate.webp', 'media/Screen Shot 2024-04-25 at 6.06.26 PM.webp',
        'media/patternbook.webp', 'media/000265130010.webp', 'media/000021400022.webp', 'media/gaia.webp', 'media/00140015.webp', 'media/xunch.webp',
        'media/cyano4.webp', 'media/sports.webp', 'media/IMG_8994.webp', 'media/lecons.webp'
    ];

    gridItems.forEach((item, index) => {
        if (imageUrls[index]) {
            item.setAttribute("data-src", imageUrls[index]);
            // item.style.backgroundColor = "#000"; 
        }
    });

    function startOverlayAnimation() {
        loaderOverlay.classList.add('start-transition');

        setTimeout(() => {
            loaderOverlay.classList.add('black-transition');
        }, greenDuration);

        setTimeout(() => {
            loaderOverlay.style.display = 'none';
            document.body.style.overflow = 'scroll';

            showElements();
        }, greenDuration + blackDuration);
    }

    function showElements() {
        socialLinks.classList.add('show');
        header.classList.add('show');
        nameFlipContainer.classList.add('show');
        gridItems.forEach(item => item.classList.add('show'));
    }

    function lazyLoadImages() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const imageUrl = item.getAttribute("data-src");

                    if (imageUrl) {
                        item.style.backgroundImage = `url(${imageUrl})`;
                        item.classList.add("loaded");
                        observer.unobserve(item); 
                    }
                }
            });
        });

        gridItems.forEach(item => observer.observe(item));
    }

    setTimeout(() => {
        startOverlayAnimation();
        lazyLoadImages(); 
    }, animationDuration);
});


const svg = document.querySelector('svg.squiggle');
const path = svg.querySelector('path');

const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

let targetOffset = pathLength;
let currentOffset = pathLength;

const scroll = () => {
    const distance = window.scrollY;
    const totalDistance = document.documentElement.scrollHeight - window.innerHeight;
  
    const percentage = totalDistance > 0 ? distance / totalDistance : 0;
  
    const multiplier = window.innerWidth < 600 ? 1.7 : 1.17;
  
    targetOffset = pathLength - (pathLength * (multiplier * percentage));
};

window.addEventListener('resize', scroll);

const animate = () => {
  const difference = targetOffset - currentOffset;

  currentOffset += difference * 0.1;

  path.style.strokeDashoffset = currentOffset;

  if (Math.abs(difference) > 0.1) {
      requestAnimationFrame(animate);
  }
};

window.addEventListener('scroll', () => {
  scroll();
  animate();
});

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modalImg");
var caption = document.getElementById("caption");
var images = document.getElementsByClassName("modal-trigger");
var currentSlideIndex = 0;

function openModal(index) {
  var imgElement = images[index];
  if (!imgElement) {
      console.error(`Image at index ${index} not found`);
      return;
  }

  var bgImage = imgElement.style.backgroundImage;
  var imgSrc = bgImage.slice(5, -2); 
  var imgText = imgElement.getAttribute("data-text") || "No description available";

  var isCarousel = imgElement.getAttribute("data-carousel") === "true";
  var imageList = imgElement.getAttribute("data-images");

  if (imageList) {
      try {
          imageList = JSON.parse(imageList);
      } catch (error) {
          console.error("Failed to parse data-images", error);
          return;
      }
  }

  caption.innerHTML = "";
  modal.style.display = "block";


  if (isCarousel && imageList && imageList.length > 0) {
      modalImg.style.display = "none"; 
      var carouselContainer = document.querySelector('.carousel-container');
      if (carouselContainer) {
          carouselContainer.style.display = "block"; 
          carouselContainer.innerHTML = ''; 

          imageList.forEach(function(imageSrc, i) {
              var slide = document.createElement('div');
              slide.className = 'carousel-slide';
              slide.innerHTML = `<img src="${imageSrc}" alt="Slide ${i + 1}">`;
              carouselContainer.appendChild(slide);
          });

          currentSlideIndex = 0;
          showSlide(currentSlideIndex);

          caption.innerHTML = imgText; 
          caption.style.display = "block"; 
      }

      var prevButton = document.querySelector('.prev');
      var nextButton = document.querySelector('.next');
      if (prevButton && nextButton) {
          prevButton.style.display = "block"; 
          nextButton.style.display = "block"; 
      }
  } else {
      modalImg.style.display = "block"; 
      modalImg.src = imgSrc;

      caption.innerHTML = imgText; 
      caption.style.display = "block"; 

      var carouselContainer = document.querySelector('.carousel-container');
      if (carouselContainer) {
          carouselContainer.style.display = "none"; 
      }

      var prevButton = document.querySelector('.prev');
      var nextButton = document.querySelector('.next');
      if (prevButton && nextButton) {
          prevButton.style.display = "none"; 
          nextButton.style.display = "none"; 
      }
  }

  setTimeout(() => {
      modal.classList.add('open');
  }, 10);
}


function showSlide(index) {
  var slides = document.getElementsByClassName("carousel-slide");

  if (index >= slides.length) currentSlideIndex = 0;
  if (index < 0) currentSlideIndex = slides.length - 1;

  for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[currentSlideIndex].style.display = "block";
}

function nextSlide() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

function prevSlide() {
  currentSlideIndex--;
  showSlide(currentSlideIndex);
}

function closeModal() {
    modal.classList.remove('open');
    setTimeout(function() {
        modal.style.display = "none";
    }, 800);
}

for (var i = 0; i < images.length; i++) {
    (function(i) {
        images[i].addEventListener("click", function() {
            openModal(i);
        });
    })(i);
}

modal.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};

document.addEventListener('keydown', function(event) {
    if (modal.style.display === "block" && event.key === "Escape") {
        closeModal();
    }
});

document.querySelector('.name-flip-container').addEventListener('click', function() {
  const flipper = this.querySelector('.flipper');
  flipper.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", function() {
    const email = "annikasanthanam@gmail.com";
    const flipContainer = document.getElementById('flip-container');
    const frontContent = document.getElementById('front-content');
    const backContent = document.getElementById('copyEmail');

    function handleResize() {
        if (window.innerWidth < 600) {
            frontContent.innerHTML = "<h1>CLICK HERE TO TALK</h1>";
            backContent.innerHTML = "<h1>EMAIL COPIED TO CLIPBOARD</h1>";
            flipContainer.classList.add('no-flip');

            flipContainer.addEventListener('click', copyEmailToClipboard);
        } else {
            flipContainer.classList.remove('no-flip');
            flipContainer.removeEventListener('click', copyEmailToClipboard); // Ensure no duplicate listener
        }
    }

    function copyEmailToClipboard() {
        navigator.clipboard.writeText(email).then(() => {
            alert("Email copied to clipboard: " + email);
        }).catch(err => {
            console.error("Failed to copy email: ", err);
        });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); 
});

document.getElementById('flip-container').addEventListener('click', function() {
  const flipper = this.querySelector('.flipper');
  flipper.classList.toggle('open'); 
});

document.getElementById("copyEmail").addEventListener("click", function() {
  const email = "annikasanthanam@gmail.com"; 

  navigator.clipboard.writeText(email).then(() => {
      alert("Email copied to clipboard: " + email); 
  }).catch(err => {
      console.error("Failed to copy email: ", err);
  });
});