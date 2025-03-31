document.addEventListener('DOMContentLoaded', function() {
  var textArea = document.getElementById('user-input');
  var wordCountElem = document.querySelector('.container .stat:nth-child(1) span');
  var charCountElem = document.querySelector('.container .stat:nth-child(2) span');
  var sentenceCountElem = document.querySelector('.container .stat:nth-child(3) span');
  var paragraphCountElem = document.querySelector('.container .stat:nth-child(4) span');
  var speakingTimeElem = document.querySelector('.container .stat:nth-child(5) span');
  var readingTimeElem = document.querySelector('.container .stat:nth-child(6) span');
  var clearBtn = document.getElementById('clear-btn');
  var copyBtn = document.getElementById('copy-btn');

  textArea.addEventListener('input', updateStats);
  clearBtn.addEventListener('click', clearText);
  copyBtn.addEventListener('click', copyText);

  function updateStats() {
    var text = textArea.value;
    var wordCount = countWords(text);
    var charCount = countCharacters(text);
    var sentenceCount = countSentences(text);
    var paragraphCount = countParagraphs(text);
    var readingTime = formatTime(wordCount / 200);
    var speakingTime = formatTime(wordCount / 130);

    wordCountElem.textContent = wordCount;
    charCountElem.textContent = charCount;
    sentenceCountElem.textContent = sentenceCount;
    paragraphCountElem.textContent = paragraphCount;
    readingTimeElem.textContent = readingTime;
    speakingTimeElem.textContent = speakingTime;
  }

  function countWords(text) {
    var words = text.trim().split(/\s+/);
    return words.filter(function(word) {
      return word !== '';
    }).length;
  }

  function countCharacters(text) {
    return text.length;
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
    } 
    else if (minutesLeft > 0) {
      return minutesLeft + ' min ' + seconds + ' sec';
    } 
    else {
      return seconds + ' sec';
    }
  }

  function clearText() {
    textArea.value = '';
    updateStats();
  }

  function copyText() {
    navigator.clipboard.writeText(textArea.value).then(function() {
      showAlert('Text copied successfully!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }

  function showAlert(message) {
    var alertElem = document.createElement('div');
    alertElem.textContent = message;
    alertElem.className = 'alert';
    document.body.appendChild(alertElem);

    setTimeout(function() {
      alertElem.classList.add('hidden');
      setTimeout(function() {
        document.body.removeChild(alertElem);
      }, 500);
    }, 2000);
  }
});