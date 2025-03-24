document.addEventListener('DOMContentLoaded', function() {
  var textArea = document.getElementById('text');
  var charCountElem = document.querySelector('.primary-stats p:nth-child(1) span');
  var wordCountElem = document.querySelector('.primary-stats p:nth-child(2) span');
  var sentenceCountElem = document.querySelector('.primary-stats p:nth-child(3) span');
  var allStatsElems = document.querySelectorAll('.all-stats ul li span');
  var wordCloudElem = document.querySelector('.word-cloud .word-cloud-content');

  textArea.addEventListener('input', updateStats);

  function updateStats() {
    var text = textArea.value;
    var wordCount = countWords(text);
    var charCount = countCharacters(text);
    var sentenceCount = countSentences(text);
    var paragraphCount = countParagraphs(text);
    var readingTime = formatTime(wordCount / 200);
    var speakingTime = formatTime(wordCount / 130);

    charCountElem.textContent = charCount;
    wordCountElem.textContent = wordCount;
    sentenceCountElem.textContent = sentenceCount;

    allStatsElems[0].textContent = wordCount;
    allStatsElems[1].textContent = charCount;
    allStatsElems[2].textContent = sentenceCount;
    allStatsElems[3].textContent = paragraphCount;
    allStatsElems[4].textContent = readingTime;
    allStatsElems[5].textContent = speakingTime;

    generateWordCloud(text);
  }

  function countWords(text) {
    var words = text.trim().split(/\s+/);
    return words.filter(function(word) {
      return word !== '';
    }).length;
  }

  function countCharacters(text) {
    var characters = text.replace(/\s/g, '');
    return characters.length;
  }

  function countSentences(text) {
    var sentences = text.split(/[.!?]/);
    return sentences.filter(function(sentence) {
      return sentence !== '';
    }).length;
  }

  function countParagraphs(text) {
    var paragraphs = text.split(/\n+/);
    return paragraphs.filter(function(paragraph) {
      return paragraph !== '';
    }).length;
  }

  function formatTime(minutes) {
    var totalSeconds = Math.floor(minutes * 60);
    var hours = Math.floor(totalSeconds / 3600);
    var minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (hours > 0) {
      return hours + ' hr ' + minutesLeft + ' min ' + seconds + ' sec';
    } else if (minutesLeft > 0) {
      return minutesLeft + ' min ' + seconds + ' sec';
    } else {
      return seconds + ' sec';
    }
  }

  function generateWordCloud(text) {
    var words = text.toLowerCase().split(/\s+/);
    var wordFrequency = {};
    words.forEach(function(word) {
      if (wordFrequency[word]) {
        wordFrequency[word]++;
      } else {
        wordFrequency[word] = 1;
      }
    });

    var sortedWords = Object.entries(wordFrequency)
      .sort(function(a, b) {
        return b[1] - a[1];
      })
      .slice(0, 75);

    wordCloudElem.innerHTML = '';

    sortedWords.forEach(function([word, frequency], index) {
      var wordElem = document.createElement('span');
      wordElem.textContent = word + ' ';
      
      if (index === 0) {
        wordElem.style.fontSize = '2.5rem';
      } else if (index === 1) {
        wordElem.style.fontSize = '2rem';
      } else if (index < 10) {
        wordElem.style.fontSize = '1.5rem';
      } else {
        wordElem.style.fontSize = '1rem';
      }

      wordCloudElem.appendChild(wordElem);
    });
  }
});