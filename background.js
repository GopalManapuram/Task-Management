document.addEventListener('DOMContentLoaded', function () {
  const extractButton = document.getElementById('extractButton');
  const resultsDiv = document.getElementById('results');

  extractButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractDifficultWords
      });
    });
  });

  function extractDifficultWords() {
    // Your Python code here using Pyodide
    const pythonCode = `
      // Import necessary libraries and functions
      import requests
      from bs4 import BeautifulSoup
      import nltk
      from nltk.corpus import wordnet as wn
      from nltk.corpus import stopwords
      from nltk.tokenize import word_tokenize
      import string
      import textstat
      nltk.download("stopwords")
      nltk.download('punkt')
      nltk.download('wordnet')
  
      // Function to find difficult words
      def find_difficult_words(text):
          words = word_tokenize(text.lower())
          stop_words = set(stopwords.words("english"))
          words = [word for word in words if word.isalpha() and word not in stop_words]
          difficult_words = set()
          for word in words:
              if textstat.syllable_count(word) >= 3:
                  meanings_nltk = get_meanings_nltk(word)
                  if meanings_nltk:
                      difficult_words.add(word)
          return list(difficult_words)
  
      // Function to get meanings using NLTK WordNet
      def get_meanings_nltk(word):
          meanings = []
          synsets = wn.synsets(word)
          for synset in synsets:
              for definition in synset.definition().split(";"):
                  meanings.append(definition.strip())
          return meanings
  
      try:
          // Get the current web page's content
          const text = document.body.innerText;
          
          // Find difficult words
          difficult_words = find_difficult_words(text);
          
          // Send the results back to the popup script
          js_callback(JSON.stringify(difficult_words));
      } catch (e) {
          js_callback("An error occurred: " + e);
      }
    `;

    pyodide.runPython(pythonCode);

    // Receive the results from Python and display them
    window.js_callback = function (resultJson) {
      const difficultWords = JSON.parse(resultJson);
      resultsDiv.innerHTML = '<h2>Difficult Words:</h2>' + difficultWords.join(', ');
    };
  }
});
  