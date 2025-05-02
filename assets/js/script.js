document.addEventListener('DOMContentLoaded', function() {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (nav.classList.contains('active')) {
                    burger.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });

    const accordionItems = document.querySelectorAll('.accordion_item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion_header');
        
        header.addEventListener('click', () => {

            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
    
    const sliderTrack = document.querySelector('.slider_track');
    const slides = document.querySelectorAll('.slider_slide');
    const prevBtn = document.querySelector('.slider_btn-prev');
    const nextBtn = document.querySelector('.slider_btn-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    let slideInterval = setInterval(nextSlide, 5000);
    
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
 
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    const tabsBtns = document.querySelectorAll('.tabs_btn');
    const tabsItems = document.querySelectorAll('.tabs_item');
    
    tabsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabsBtns.forEach(b => b.classList.remove('active'));
            tabsItems.forEach(i => i.classList.remove('active'));
            
            btn.classList.add('active');
            document.querySelector(`.tabs_item[data-tab="${tabId}"]`).classList.add('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});