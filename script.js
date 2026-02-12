document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const letter = document.getElementById('letter');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const valentinePage = document.getElementById('valentinePage');
    
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
    
    // Open envelope on click - listen on both wrapper and envelope
    envelopeWrapper.addEventListener('click', openEnvelope);
    envelope.addEventListener('click', openEnvelope);
    
    // Yes button - go to Valentine's page with love letter
    yesBtn.addEventListener('click', function() {
        valentinePage.classList.add('show');
        createConfetti();
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
            noBtn.textContent = 'No (Are you sure?)';
            noBtn.style.padding = '8px 15px';
            noBtn.style.fontSize = '12px';
            yesBtn.textContent = 'Yes!! 💖💖';
        } else if (noClickCount === 2) {
            // Second click - make No even smaller
            noBtn.textContent = "No (you don't love me huh???)";
            noBtn.style.padding = '5px 10px';
            noBtn.style.fontSize = '9px';
            noBtn.style.opacity = '0.7';
            yesBtn.textContent = 'YES!!! 💖💖💖';
            yesBtn.style.animation = 'pulse 0.5s infinite';
        } else if (noClickCount === 3) {
            // Third click - even tinier
            noBtn.textContent = "No 😢";
            noBtn.style.padding = '3px 6px';
            noBtn.style.fontSize = '6px';
            noBtn.style.opacity = '0.5';
            yesBtn.textContent = 'YESSS!!!! 💖💖💖💖';
        } else if (noClickCount === 4) {
            // Fourth click - barely visible
            noBtn.textContent = "no";
            noBtn.style.padding = '2px 4px';
            noBtn.style.fontSize = '4px';
            noBtn.style.opacity = '0.3';
            yesBtn.textContent = 'Click YES already! 💖💖💖💖💖';
        } else {
            // Fifth click - disappear completely
            noBtn.style.display = 'none';
            yesBtn.textContent = 'YES (only option now 😏💖)';
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
