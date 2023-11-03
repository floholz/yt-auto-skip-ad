const _ = "EXT_YT_SKIP_ADD";
const emojis = ['😸', '😀', '😃', '😄', '😁', '🤩', '😉', '😊', '🥰', '🥳', '🤗', '😋', '😎', '😌', '🤡'];
console.log(_, 'injected');



/* create skip notification */
const notificationElement = document.createElement('div');
notificationElement.id = 'ext-yt-ad-skip_notification';
notificationElement.innerHTML = 'Ad skipped ⏭️ ' + randomEmoji();

const notificationContainerElement = document.createElement('div');
notificationContainerElement.id = 'ext-yt-ad-skip_notification-container';
notificationContainerElement.append(notificationElement);






// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList" || mutation.type === "attributes") {
            console.log(_, 'mutation.type', mutation.type);
            checkSkipButton();
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
const observeInterval = setInterval(() => {
    try {
        // Select the node that will be observed for mutations
        const targetNode = document.querySelectorAll('.ytp-ad-module')[0];
        observer.observe(targetNode, config);
        clearInterval(observeInterval);
    } catch (e) {
        console.log(e);
        console.log(_, 'failed to observe, try again ..');
    }
}, 1000);

// Later, you can stop observing
// observer.disconnect();


function checkSkipButton() {
    console.log(_, 'Ad check');
    const skipBtn = document.querySelectorAll('.ytp-ad-skip-button')[0];
    const skipSlot = document.querySelectorAll('.ytp-ad-skip-button-slot')[0];

    if (skipBtn && skipSlot.style.display !== 'none') {
        skipBtn.click();
        showNotification();
        console.log(_, 'skipped Ad');
    }
}

function showNotification(duration = 5000) {
    const fullscreenRoot = document.fullscreenElement;
    if (fullscreenRoot) {
        fullscreenRoot.append(notificationContainerElement);
    } else {
        const ytPlayer = document.getElementById('player');
        if (ytPlayer) {
            ytPlayer.append(notificationContainerElement);
        } else {
            document.body.append(notificationContainerElement);
        }
    }

    notificationContainerElement.classList.add('active');
    setTimeout(() => {
        notificationContainerElement.classList.remove('active');
    }, duration);
}

function randomEmoji() {
    const idx = Math.floor(Math.random() * emojis.length);
    return emojis[idx];
}
