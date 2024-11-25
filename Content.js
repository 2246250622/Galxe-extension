// content.js
(function() {
    'use strict';

    // Delay execution of the script by 4000 milliseconds (4 seconds)
    setTimeout(() => {
        const elementsToClick = document.querySelectorAll('div[data-state="closed"] .cursor-pointer'),
              refreshButtonSvgClass = 'svg[data-state="closed"] .ml-4.flex.gap-4.items-center',
              waitForClass = '.text-size-14.font-bold',
              successIconClass = 'button.bg-primary:not([disabled]).w-full',
              claimButtonSelector = 'button.absolute.rounded-sm.opacity-70.right-5.top-6.sm\\:right-9.sm\\:top-9',
              closeButtonSelector = 'div.flex.gap-1.items-center:not(.font-inter.text-size-14.text-foreground):not(.px-4.h-8.rounded-6.border.border-solid.border-border-button) span svg';

        function clickElement(element) {
            var event = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
            element.dispatchEvent(event);
        }

        function closePopup() {
            const button = document.querySelector(closeButtonSelector);
            if (button) {
                clickElement(button);
                console.log('Popup closed.');
            }
        }

        function checkClaimButton() {
            const button = document.querySelector(claimButtonSelector);
            if (button) {
                clickElement(button);
                console.log('Claim button clicked.');
                setTimeout(closePopup, 2000);
                return true;
            }
            return false;
        }

        function checkConditionsAndRetry() {
            const waitingElements = document.querySelectorAll(waitForClass);
            const successIcons = document.querySelectorAll(successIconClass);
            if (waitingElements.length > 0 || successIcons.length !== elementsToClick.length) {
                setTimeout(processElements, 60000);
            } else {
                checkClaimButton();
            }
        }

        function processElements() {
            alert('Processing elements...');
            if (!checkClaimButton()) {
                elementsToClick.forEach(clickElement);
                setTimeout(() => {
                    document.querySelectorAll(refreshButtonSvgClass).forEach(clickElement);
                    setTimeout(checkConditionsAndRetry, 2000);
                }, 2000);
            }
        }

        processElements();
    }, 4000); // 4 seconds delay
})();