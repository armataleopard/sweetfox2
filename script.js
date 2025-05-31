// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Add fade-in-up animation to elements as they appear in viewport
    const animateElements = document.querySelectorAll('.section-title, .about-content p, .gallery-item, .story-card, .tokenomics-item, .roadmap-island');
    
    // Add animation classes with different delays
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in-up');
        element.classList.add(`delay-${(index % 5) + 1}`);
    });

    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // Gallery Slider
    const slider = document.querySelector('.gallery-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slideWidth = document.querySelector('.gallery-item').offsetWidth + 20; // width + margin
    let position = 0;
    const maxPosition = slider.children.length * slideWidth - slider.offsetWidth;

    prevBtn.addEventListener('click', function() {
        position = Math.max(position - slideWidth * 2, 0);
        slider.scroll({
            left: position,
            behavior: 'smooth'
        });
        playSound('pop');
    });

    nextBtn.addEventListener('click', function() {
        position = Math.min(position + slideWidth * 2, maxPosition);
        slider.scroll({
            left: position,
            behavior: 'smooth'
        });
        playSound('pop');
    });

    // Story Cards - Read More functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.story-card');
            const fullStory = card.querySelector('.story-full');
            const preview = card.querySelector('.story-preview');
            
            if (fullStory.style.display === 'block') {
                fullStory.style.display = 'none';
                preview.style.display = 'block';
                this.textContent = 'Read More';
            } else {
                fullStory.style.display = 'block';
                preview.style.display = 'none';
                this.textContent = 'Read Less';
            }
            
            playSound('page');
        });
    });

    // Tokenomics Chart
    const ctx = document.getElementById('tokenomics-chart').getContext('2d');
    
    const tokenomicsChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Community Treasury', 'Liquidity', 'Marketing', 'Team', 'Airdrops & Rewards'],
            datasets: [{
                data: [40, 25, 20, 10, 5],
                backgroundColor: [
                    '#FF9E5E', // Fox orange
                    '#FFD166', // Golden yellow
                    '#EF476F', // Bubblegum pink
                    '#06D6A0', // Emerald green
                    '#118AB2'  // Sky blue
                ],
                borderColor: '#FFFFFF',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    },
                    titleFont: {
                        family: "'Baloo 2', cursive",
                        size: 16
                    },
                    bodyFont: {
                        family: "'Nunito', sans-serif",
                        size: 14
                    },
                    padding: 12,
                    backgroundColor: 'rgba(33, 37, 41, 0.8)',
                    borderColor: '#FF9E5E',
                    borderWidth: 1,
                    displayColors: true,
                    boxPadding: 5
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    });

    // Sound effects
    const sounds = {
        pop: new Audio('data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gQ29uY3JldGVNYXNvbnJ5LmNvbQBURU5DAAAAHQAAA3N3aXRjaAAAABEAAABUQ09OAAAAEAAAAGJ1dHRvbiBwb3AAAABUSVQyAAAAFgAAA0lUdW5lUyAxMi4xLjAuNTAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAElgDt7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t//////////////////////////////////////////////////////////////////8AAAA8TEFNRTMuOTlyAc0AAAAAAAAAABSAJAOkQgAAgAAABJarfr8OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU='),
        page: new Audio('data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gQ29uY3JldGVNYXNvbnJ5LmNvbQBURU5DAAAAHQAAA3N3aXRjaAAAABEAAABUQ09OAAAAEAAAAHN3aXNoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=')
    };

    // Function to play sound
    function playSound(sound) {
        if (!soundMuted) {
            sounds[sound].currentTime = 0;
            sounds[sound].play();
        }
    }

    // Sound toggle
    let soundMuted = false;
    const soundToggle = document.querySelector('.sound-toggle');
    
    soundToggle.addEventListener('click', function() {
        soundMuted = !soundMuted;
        this.classList.toggle('muted');
        
        // Play a sound to indicate the toggle (if unmuting)
        if (!soundMuted) {
            playSound('pop');
        }
    });

    // Add hover sound effects to buttons
    const buttons = document.querySelectorAll('button:not(.sound-toggle)');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playSound('pop');
        });
    });

    // Add special effects on hero section
    const heroSection = document.querySelector('.hero');
    const mainTitle = document.querySelector('.main-title');
    
    heroSection.addEventListener('mousemove', function(e) {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        mainTitle.style.textShadow = `
            ${xPos * 0.3}px ${yPos * 0.3}px 0 var(--color-tertiary),
            ${xPos * 0.6}px ${yPos * 0.6}px 0 rgba(0, 0, 0, 0.1)
        `;
    });

    // Create random sparkles in the hero section
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.7); // Only in the top 70% of the screen
        
        // Random size
        const size = Math.random() * 10 + 5;
        
        // Random color
        const colors = ['#FF9E5E', '#FFD166', '#EF476F', '#06D6A0', '#118AB2', '#9B5DE5'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set sparkle styles
        sparkle.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            opacity: 0;
            transform: scale(0);
            animation: sparkle 1.5s ease forwards;
        `;
        
        heroSection.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
    
    // Create sparkles periodically
    setInterval(createSparkle, 300);

    // Add image click to enlarge functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay');
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.classList.add('enlarged-image');
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            playSound('pop');
            
            overlay.addEventListener('click', function() {
                this.remove();
                playSound('pop');
            });
        });
    });

    // Add CSS for image overlay
    const style = document.createElement('style');
    style.textContent = `
        .image-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
        }
        
        .enlarged-image {
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            transform: scale(0.9);
            animation: imgEnlarge 0.3s forwards;
        }
        
        @keyframes imgEnlarge {
            to { transform: scale(1); }
        }
        
        @keyframes sparkle {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
        }
    `;
    
    document.head.appendChild(style);
}); 