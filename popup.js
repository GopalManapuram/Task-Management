document.getElementById('findDifficultWords').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'findDifficultWords' });
    });
  });
  
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'displayDifficultWords') {
      const resultDiv = document.getElementById('result');
      const difficultWords = message.difficultWords;
      resultDiv.innerHTML = "<h2>Difficult Words:</h2>";
      difficultWords.forEach(function (wordInfo) {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
          <p><strong>${wordInfo.word}</strong> (Syllables: ${wordInfo.syllables})</p>
          <p>Meaning from NLTK (WordNet):</p>
          <p>${wordInfo.meanings_nltk.join(', ')}</p>
          <hr>
        `;
        resultDiv.appendChild(wordDiv);
      });
    }
  });
  