document.addEventListener('DOMContentLoaded', function() {

  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function( carousel ) {

      const ele = carousel.querySelector('ul');
      const nextarrow = carousel.querySelector('.next');
      const prevarrow = carousel.querySelector('.prev');
      if (!ele || !nextarrow || !prevarrow) {
        return;
      }

      const slides = carousel.querySelectorAll('ul li');
      const slideCount = slides.length;
      if (slideCount === 0) {
        return;
      }

      const firstSlide = slides[0];
      const amountvisible = Math.round(ele.offsetWidth / Math.max(firstSlide.offsetWidth, 1));
      let carouselInView = false;

      nextarrow.style.display = slideCount > 1 ? 'block' : 'none';
      prevarrow.style.display = slideCount > 1 ? 'block' : 'none';
      ele.scrollLeft = 0;
      slides[0].classList.add('selected');

      if (amountvisible > 1) {
        var removeels = carousel.querySelectorAll('ol li:nth-last-child(-n + '+(amountvisible-1)+')');
        removeels.forEach(function(removeel) {
          removeel.remove();
        });
      }

      let bullets = carousel.querySelectorAll('ol li');
      if (bullets.length > 0) {
        bullets[0].classList.add('selected');
      }

      const autoDurationVideo = carousel.getAttribute('auto-duration-video') === 'true';
      const hasVideoSlide = carousel.querySelector('ul li video') !== null;
      const useVideoLoopAdvance = autoDurationVideo && hasVideoSlide;
      const videoProgress = new WeakMap();
      const durationAttr = carousel.getAttribute('duration');
      const durationMs = durationAttr ? parseInt(durationAttr, 10) : null;
      let selectedSlideIndex = 0;
      let imageAdvanceTimer = null;

      const clearImageAdvanceTimer = function() {
        if (imageAdvanceTimer !== null) {
          clearTimeout(imageAdvanceTimer);
          imageAdvanceTimer = null;
        }
      };

      const scheduleAutoAdvance = function() {
        clearImageAdvanceTimer();
        if (!durationMs || slideCount < 2) return;
        if (!carouselInView) return;
        const selectedSlide = slides[selectedSlideIndex];
        if (!selectedSlide) return;
        // Video slides advance via the timeupdate listener when useVideoLoopAdvance is on
        if (useVideoLoopAdvance && selectedSlide.querySelector('video')) return;
        imageAdvanceTimer = setTimeout(function() {
          if (shouldAutoAdvance()) {
            nextarrow.click();
          } else {
            scheduleAutoAdvance();
          }
        }, durationMs);
      };

      const getScrollLength = function() {
        if (slideCount < 2) {
          return Math.max(firstSlide.offsetWidth, 1);
        }
        const li1 = carousel.querySelector('ul li:nth-child(1)');
        const li2 = carousel.querySelector('ul li:nth-child(2)');
        if (!li1 || !li2) {
          return Math.max(firstSlide.offsetWidth, 1);
        }
        return Math.max(li2.offsetLeft - li1.offsetLeft, 1);
      };

      const syncVideoPlaybackState = function() {
        slides.forEach(function(slide, slideIndex) {
          const video = slide.querySelector('video');
          if (!video) return;
          const isSelected = slideIndex === selectedSlideIndex;
          const wantsAutoplay = video.dataset.autoplay === 'true';

          if (isSelected) {
            // Promote to full preload only when this slide is selected and the carousel is in view.
            if (carouselInView && video.preload !== 'auto') {
              video.preload = 'auto';
            }
            try {
              video.currentTime = 0;
            } catch (error) {}
            if (wantsAutoplay && carouselInView) {
              video.play().catch(function(){});
            }
          } else {
            video.pause();
            try {
              video.currentTime = 0;
            } catch (error) {}
            // Drop other videos back to no-fetch so they don't burn mobile data.
            if (video.preload !== 'none') {
              video.preload = 'none';
            }
          }
        });
      };

      const setSelected = function() {
          const bulletsLive = carousel.querySelectorAll('ol li');
          bulletsLive.forEach(function(bullet) {
             bullet.classList.remove('selected');
          });
          slides.forEach(function(slide) {
             slide.classList.remove('selected');
          });

          const len = getScrollLength();
          let nthchild = 1;
          if (slideCount >= 2) {
            nthchild = Math.round((ele.scrollLeft / len) + 1);
            nthchild = Math.max(1, Math.min(slideCount, nthchild));
          }
          selectedSlideIndex = nthchild - 1;

          const ulItem = carousel.querySelector('ul li:nth-child('+nthchild+')');
          if (ulItem) {
            ulItem.classList.add('selected');
          }

          const bulletCount = bulletsLive.length;
          if (bulletCount > 0) {
            const bulletIndex = Math.min(nthchild, bulletCount);
            const olItem = carousel.querySelector('ol li:nth-child('+bulletIndex+')');
            if (olItem) {
              olItem.classList.add('selected');
            }
          }

          const dynamictitleHost = carousel.parentElement && carousel.parentElement.parentElement
            ? carousel.parentElement.parentElement.querySelector('.dynamictitle')
            : null;
          if (dynamictitleHost) {
              const media = carousel.querySelector('ul li:nth-child('+nthchild+') img, ul li:nth-child('+nthchild+') video');
              const title = media ? media.getAttribute('title') : null;
              if (title) {
                dynamictitleHost.innerHTML = title;
              }
          }
          if (useVideoLoopAdvance) {
            syncVideoPlaybackState();
          }
          scheduleAutoAdvance();
      };

      const scrollTo = function(event) {
          event.preventDefault();
          const href = this.getAttribute('href');
          if (!href || href.charAt(0) !== '#') return;
          const target = document.querySelector(href);
          if (target) {
            ele.scrollLeft = target.offsetLeft;
          }
      };

      const nextSlide = function() {
          if (slideCount < 2) return;
          const lastOl = carousel.querySelector('ol li:last-child');
          const selected = carousel.querySelector('ol li.selected');
          if (!lastOl) return;
          if (!selected) {
            const firstA = carousel.querySelector('ol li:first-child a');
            if (firstA) firstA.click();
            return;
          }
          if (!lastOl.classList.contains('selected')) {
              const nextLi = selected.nextElementSibling;
              const nextA = nextLi ? nextLi.querySelector('a') : null;
              if (nextA) nextA.click();
          } else {
              const firstA = carousel.querySelector('ol li:first-child a');
              if (firstA) firstA.click();
          }
      };

      const prevSlide = function() {
          if (slideCount < 2) return;
          const firstOl = carousel.querySelector('ol li:first-child');
          const selected = carousel.querySelector('ol li.selected');
          if (!firstOl) return;
          if (!selected) {
            const lastA = carousel.querySelector('ol li:last-child a');
            if (lastA) lastA.click();
            return;
          }
          if (!firstOl.classList.contains('selected')) {
              const prevLi = selected.previousElementSibling;
              const prevA = prevLi ? prevLi.querySelector('a') : null;
              if (prevA) prevA.click();
          } else {
              const lastA = carousel.querySelector('ol li:last-child a');
              if (lastA) lastA.click();
          }
      };

      const setInteracted = function() {
        ele.classList.add('interacted');
      };

      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const shouldAutoAdvance = function() {
        if (reducedMotion) return false;
        return ele != document.querySelector(".carousel:hover ul") && ele.classList.contains('interacted')==false;
      };

      const onVideoTimeUpdate = function(event) {
        const video = event.currentTarget;
        const previousTime = videoProgress.get(video);
        const currentTime = video.currentTime;

        if (
          typeof previousTime === 'number' &&
          currentTime + 0.2 < previousTime &&
          video.closest('li') &&
          video.closest('li').classList.contains('selected') &&
          shouldAutoAdvance()
        ) {
          nextarrow.click();
        }

        videoProgress.set(video, currentTime);
      };

      if (slideCount > 1) {
        ele.addEventListener("scroll", debounce(setSelected));
      }
      ele.addEventListener("touchstart", setInteracted);
      ele.addEventListener('keydown', function (e){
          if(e.key == 'ArrowLeft') ele.classList.add('interacted');
          if(e.key == 'ArrowRight') ele.classList.add('interacted');
      });

      nextarrow.addEventListener("click", nextSlide);
      nextarrow.addEventListener("mousedown", setInteracted);
      nextarrow.addEventListener("touchstart", setInteracted);

      prevarrow.addEventListener("click", prevSlide);
      prevarrow.addEventListener("mousedown", setInteracted);
      prevarrow.addEventListener("touchstart", setInteracted);

      bullets = carousel.querySelectorAll('ol li');
      bullets.forEach(function(bullet) {
        const link = bullet.querySelector('a');
        if (link) {
          link.addEventListener('click', scrollTo);
        }
        bullet.addEventListener("mousedown", setInteracted);
        bullet.addEventListener("touchstart", setInteracted);
      });

      if (useVideoLoopAdvance) {
        slides.forEach(function(slide) {
          const video = slide.querySelector('video');
          if (video) {
            videoProgress.set(video, 0);
            video.addEventListener('timeupdate', onVideoTimeUpdate);
          }
        });
      }

      // Pause + drop preload when the carousel scrolls offscreen; resume on re-entry.
      // Saves mobile data and stops background CPU/GPU on long pages.
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            carouselInView = entry.isIntersecting;
            syncVideoPlaybackState();
            if (carouselInView) {
              scheduleAutoAdvance();
            } else {
              clearImageAdvanceTimer();
            }
          });
        }, { threshold: 0.15 });
        io.observe(carousel);
      } else {
        carouselInView = true;
        syncVideoPlaybackState();
      }

      scheduleAutoAdvance();

  });

});


/**
* Debounce functions for better performance
* (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
* @param  {Function} fn The function to debounce
*/
function debounce (fn) {
let timeout;
return function () {
  let context = this;
  let args = arguments;
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }
  timeout = window.requestAnimationFrame(function () {
    fn.apply(context, args);
  });
};
}
