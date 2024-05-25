
// content.js
function extractDifficultWords() {
  // Wrap your code in a DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function () {
    // Your code to extract difficult words here
    const text = document.body.innerText;

    // Example: Extract difficult words based on some criteria
    const difficultWords = text.split(' ').filter(word => word.length >= 8);

    // Send the extracted difficult words to the background script
    chrome.runtime.sendMessage({ action: 'displayDifficultWords', difficultWords: difficultWords });
  });
}

// Execute the extraction function when the content script is loaded
extractDifficultWords();
