// Page navigation
function openLetter() {
    document.getElementById('frontPage').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('frontPage').style.display = 'none';
        document.getElementById('letterPage').classList.add('active');
    }, 500);
}

function goBack() {
    document.getElementById('letterPage').classList.remove('active');
    setTimeout(() => {
        document.getElementById('frontPage').style.display = 'flex';
        document.getElementById('frontPage').classList.remove('hidden');
    }, 100);
}

// Wish list functionality
const wishes = [];

function addWish() {
    const wishInput = document.getElementById('wishInput');
    const wish = wishInput.value.trim();
    
    if (wish) {
        wishes.push(wish);
        displayWishes();
        wishInput.value = '';
    }
}

function displayWishes() {
    const wishesList = document.getElementById('wishesList');
    if (!wishesList) return;
    
    wishesList.innerHTML = '';
    
    wishes.forEach((wish) => {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.innerHTML = `🎄 ${wish}`;
        wishesList.appendChild(wishItem);
    });
}

// Enter key support for wish input
const wishInput = document.getElementById('wishInput');
if (wishInput) {
    wishInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addWish();
        }
    });
}

// Music toggle with audio control
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

if (music) {
    music.volume = 0.5; // 50% volume
}

function toggleMusic() {
    if (!music || !musicBtn) return;
    
    if (music.paused) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(console.error)
                .then(() => {
                    musicBtn.textContent = '🔊';
                    musicPlaying = true;
                });
        }
    } else {
        music.pause();
        musicBtn.textContent = '🔇';
        musicPlaying = false;
    }
}

// Initialize music on first user interaction
function initMusic() {
    if (!music || !musicBtn) return;
    
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            musicBtn.textContent = '🔇';
            musicPlaying = false;
            
            const startMusic = () => {
                music.play().then(() => {
                    musicBtn.textContent = '🔊';
                    musicPlaying = true;
                    document.removeEventListener('click', startMusic);
                });
            };
            document.addEventListener('click', startMusic);
        }).then(() => {
            if (!music.paused) {
                musicBtn.textContent = '🔊';
                musicPlaying = true;
            }
        });
    }
}

// Start music on page load if possible
if (music && musicBtn) {
    // Try to start music immediately on page load
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // If autoplay fails, set up click handler
            console.log('Autoplay prevented, setting up click handler');
            musicBtn.textContent = '';
            musicPlaying = false;
            
            const startMusic = () => {
                music.play().then(() => {
                    musicBtn.textContent = '';
                    musicPlaying = true;
                    document.removeEventListener('click', startMusic);
                });
            };
            
            // Try to start on first user interaction
            document.addEventListener('click', startMusic, { once: true });
        }).then(() => {
            if (!music.paused) {
                musicBtn.textContent = '';
                musicPlaying = true;
            }
        });
    }
}

// Add spin animation for music button
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);