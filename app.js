document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('text');
    const charCountElem = document.querySelector('.primary-stats p:nth-child(1) span');
    const wordCountElem = document.querySelector('.primary-stats p:nth-child(2) span');
    const sentenceCountElem = document.querySelector('.primary-stats p:nth-child(3) span');
    const allStatsElems = document.querySelectorAll('.all-stats ul li span');
    const wordCloudElem = document.querySelector('.word-cloud p');
  
    textArea.addEventListener('input', updateStats);
  
    function updateStats() {
      const text = textArea.value;
      const wordCount = countWords(text);
      const charCount = countCharacters(text);
      const sentenceCount = countSentences(text);
      const paragraphCount = countParagraphs(text);
      const readingTime = formatTime(wordCount / 200);
      const speakingTime = formatTime(wordCount / 130);
  
      charCountElem.textContent = charCount;
      wordCountElem.textContent = wordCount;
      sentenceCountElem.textContent = sentenceCount;
  
      allStatsElems[0].textContent = wordCount;
      allStatsElems[1].textContent = charCount;
      allStatsElems[2].textContent = sentenceCount;
      allStatsElems[3].textContent = paragraphCount;
      allStatsElems[4].textContent = readingTime;
      allStatsElems[5].textContent = speakingTime;
  
      wordCloudElem.textContent = generateWordCloud(text);
    }
  
    function countWords(text) {
      return text.trim().split(/\s+/).filter(Boolean).length;
    }
  
    function countCharacters(text) {
      return text.replace(/\s/g, '').length;
    }
  
    function countSentences(text) {
      return text.split(/[.!?]/).filter(Boolean).length;
    }
  
    function countParagraphs(text) {
      return text.split(/\n+/).filter(Boolean).length;
    }
  
    function formatTime(minutes) {
      const totalSeconds = Math.floor(minutes * 60);
      const hours = Math.floor(totalSeconds / 3600);
      const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      if (hours > 0) return `${hours} hr ${minutesLeft} min ${seconds} sec`.trim();
      if (minutesLeft > 0) return `${minutesLeft} min ${seconds} sec`.trim();
      return `${seconds} sec`;
    }
  
    function generateWordCloud(text) {
      const words = text.toLowerCase().split(/\s+/).filter(Boolean);
      const wordFrequency = {};
      words.forEach(word => wordFrequency[word] = (wordFrequency[word] || 0) + 1);
      return Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .map(([word, frequency]) => `${word} (${frequency})`)
        .join(', ');
    }
  });