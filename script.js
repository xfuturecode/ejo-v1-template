// Year in footer
document.getElementById("year").textContent = new Date().getFullYear()

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle")
const navDrawer = document.getElementById("navDrawer")
const navScrim = document.getElementById("navScrim")

if (menuToggle && navDrawer && navScrim) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("is-open")
    navDrawer.classList.toggle("open")
    navScrim.classList.toggle("is-open")
    document.body.style.overflow = navDrawer.classList.contains("open") ? "hidden" : ""
  })

  navScrim.addEventListener("click", () => {
    menuToggle.classList.remove("is-open")
    navDrawer.classList.remove("open")
    navScrim.classList.remove("is-open")
    document.body.style.overflow = ""
  })

  // Close drawer on link click
  navDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-open")
      navDrawer.classList.remove("open")
      navScrim.classList.remove("is-open")
      document.body.style.overflow = ""
    })
  })
}

// Hero slider
const heroSlider = document.getElementById("heroSlider")
if (heroSlider) {
  const slides = heroSlider.querySelectorAll(".hero-slide")
  const prevBtn = document.getElementById("heroPrev")
  const nextBtn = document.getElementById("heroNext")
  const dotsContainer = document.getElementById("heroDots")
  let currentSlide = 0
  let autoplayInterval

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(index))
    dotsContainer.appendChild(dot)
  })

  const dots = dotsContainer.querySelectorAll(".dot")

  function goToSlide(n) {
    slides[currentSlide].classList.remove("is-active")
    dots[currentSlide].classList.remove("active")
    currentSlide = (n + slides.length) % slides.length
    slides[currentSlide].classList.add("is-active")
    dots[currentSlide].classList.add("active")
    resetAutoplay()
  }

  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000)
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval)
    startAutoplay()
  }

  if (prevBtn) prevBtn.addEventListener("click", prevSlide)
  if (nextBtn) nextBtn.addEventListener("click", nextSlide)

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide()
    if (e.key === "ArrowRight") nextSlide()
  })

  // Touch swipe support
  let touchStartX = 0
  let touchEndX = 0

  heroSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  heroSlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide()
    if (touchEndX > touchStartX + 50) prevSlide()
  }

  startAutoplay()

  // Pause autoplay on hover
  heroSlider.addEventListener("mouseenter", () => clearInterval(autoplayInterval))
  heroSlider.addEventListener("mouseleave", startAutoplay)
}

// Testimonial slider
const slides = document.getElementById("slides")
if (slides) {
  const slideElements = slides.querySelectorAll(".slide")
  const dotsContainer = document.getElementById("sliderDots")
  let currentIndex = 0

  slideElements.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => {
      currentIndex = index
      updateSlider()
    })
    dotsContainer.appendChild(dot)
  })

  const dots = dotsContainer.querySelectorAll(".dot")

  function updateSlider() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex)
    })
  }

  // Auto-advance testimonials
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideElements.length
    updateSlider()
  }, 6000)
}

// Reveal animation on scroll
const reveals = document.querySelectorAll(".reveal")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in")
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 },
)

reveals.forEach((reveal) => revealObserver.observe(reveal))

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault()
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})
