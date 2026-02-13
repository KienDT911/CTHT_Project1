document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelopeClickArea = document.getElementById('envelopeClickArea');
    const letter = document.getElementById('letter');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const valentinePage = document.getElementById('valentinePage');
    
    // Authentication elements
    const authPage = document.getElementById('authPage');
    const letterPage = document.getElementById('letterPage');
    const wifeAuthBtn = document.getElementById('wifeAuthBtn');
    const authBox = document.getElementById('authBox');
    const authBtns = document.querySelectorAll('.auth-btn');
    const authMessage = document.getElementById('authMessage');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    // Show auth box when Wife Authentication button is clicked
    wifeAuthBtn.addEventListener('click', function() {
        wifeAuthBtn.style.display = 'none';
        authBox.style.display = 'block';
        authBox.style.animation = 'authFadeIn 0.5s ease';
    });
    
    // All 4 answers are correct
    authBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.dataset.answer;
            
            this.classList.add('correct');
            authMessage.textContent = `Đúng rùi - ${answer} là vợ iuuu của Trung Kiên 💕`;
            authMessage.style.color = '#4caf50';
            
            // Set welcome message
            welcomeMessage.textContent = `💌 Đây là thư dành cho ${answer} 💌`;
            
            // Auto transition to envelope after 1.5 seconds
            setTimeout(() => {
                authPage.style.opacity = '0';
                authPage.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    authPage.style.display = 'none';
                    letterPage.style.display = 'flex';
                }, 500);
            }, 1500);
        });
    });
    
    let noClickCount = 0;
    let isOpen = false;
    
    // Function to open envelope
    function openEnvelope() {
        if (!isOpen) {
            isOpen = true;
            envelope.classList.add('open');
            
            // Show letter after envelope opens
            setTimeout(() => {
                envelopeWrapper.style.transform = 'translateY(-100px)';
                envelopeWrapper.style.opacity = '0.5';
                envelopeWrapper.style.pointerEvents = 'none';
                letter.classList.add('show');
            }, 600);
        }
    }
    
    // Open envelope on click - listen on the click area overlay
    envelopeClickArea.addEventListener('click', openEnvelope);
    
    // Yes button - go to Valentine's page with love letter
    yesBtn.addEventListener('click', function() {
        valentinePage.classList.add('show');
        createConfetti();
        
        // Auto-scroll slowly through the page to the love letter
        setTimeout(() => {
            const loveLetter = document.getElementById('loveLetter');
            const scrollDuration = 8000; // 8 seconds to scroll
            const start = valentinePage.scrollTop;
            const end = loveLetter.offsetTop - 50;
            const startTime = performance.now();
            
            function smoothScroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / scrollDuration, 1);
                
                // Ease-in-out function for smooth scrolling
                const easeProgress = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                valentinePage.scrollTop = start + (end - start) * easeProgress;
                
                if (progress < 1) {
                    requestAnimationFrame(smoothScroll);
                }
            }
            
            requestAnimationFrame(smoothScroll);
        }, 1500); // Start scrolling after 1.5 seconds
    });
    
    // No button - shrink and change text
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // Make Yes bigger with each No click
        const yesSize = 12 + (noClickCount * 4);
        const yesPadding = 12 + (noClickCount * 5);
        yesBtn.style.padding = `${yesPadding}px ${yesPadding * 2}px`;
        yesBtn.style.fontSize = `${yesSize}px`;
        
        if (noClickCount === 1) {
            // First click - make No smaller, change text
            noBtn.textContent = 'ko (vợ chắc chưa?)';
            noBtn.style.padding = '8px 15px';
            noBtn.style.fontSize = '12px';
            yesBtn.textContent = 'Có chứ chồng iu!! 💖💖';
        } else if (noClickCount === 2) {
            // Second click - make No even smaller
            noBtn.textContent = "ko (vợ không yêu em hả???)";
            noBtn.style.padding = '5px 10px';
            noBtn.style.fontSize = '9px';
            noBtn.style.opacity = '0.7';
            yesBtn.textContent = 'Chắc chắn có!!! 💖💖💖';
            yesBtn.style.animation = 'pulse 0.5s infinite';
        } else if (noClickCount === 3) {
            // Third click - even tinier
            noBtn.textContent = "ko (sao vợ nỡ thế??)";
            noBtn.style.padding = '3px 6px';
            noBtn.style.fontSize = '6px';
            noBtn.style.opacity = '0.5';
            yesBtn.textContent = 'Có ạaaa!!!! 💖💖💖💖';
        } else if (noClickCount === 4) {
            // Fourth click - barely visible
            noBtn.textContent = "ko";
            noBtn.style.padding = '2px 4px';
            noBtn.style.fontSize = '4px';
            noBtn.style.opacity = '0.3';
            yesBtn.textContent = 'Vợ có! 💖💖💖💖💖';
        } else {
            // Fifth click - disappear completely
            noBtn.style.display = 'none';
            yesBtn.textContent = 'Có (vợ không thoát được chồng đâu 😏💖)';
        }
    });
    
    // Create confetti effect
    function createConfetti() {
        const colors = ['#ff6b9d', '#c2185b', '#ff4081', '#f50057', '#fff', '#ffd6e7'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    z-index: 1000;
                    animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
    }
    
    // Add confetti animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
