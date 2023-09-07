"use strict"

// // Selectors
// const textAreaEle = document.querySelector("textarea")
// const listenButton = document.querySelector("#listen")
// const voiceSelectEle = document.querySelector("select");




// // Variables
// let speech = new SpeechSynthesisUtterance();
// let voices = [];




// // Functions
// function speakTextToVoice() {
//   speech.text = textAreaEle.value;
//   window.speechSynthesis.speak(speech);
// }


// function getVoicesToSelect() {
//   // Clear existing options
//   voiceSelectEle.innerHTML = '';

//   voices = window.speechSynthesis.getVoices();

//   voices.forEach((voice, i) => {
//     const option = new Option(voice.name, voice.name); // Use voice name as both text and value
//     voiceSelectEle.add(option);
//   });
// }

// // Events
// window.speechSynthesis.onvoiceschanged = () => getVoicesToSelect();

// voiceSelectEle.addEventListener("change", () => {
//   speech.voice = voices[voiceSelectEle.value];
// });

// listenButton.addEventListener("click", () => speakTextToVoice());








let _speechSynth
let _voices
const _cache = {}

/**
 * retries until there have been voices loaded. No stopper flag included in this example. 
 * Note that this function assumes, that there are voices installed on the host system.
 */

function loadVoicesWhenAvailable (onComplete = () => {}) {
  _speechSynth = window.speechSynthesis
  const voices = _speechSynth.getVoices()

  if (voices.length !== 0) {
    _voices = voices
    onComplete()
  } else {
    return setTimeout(function () { loadVoicesWhenAvailable(onComplete) }, 100)
  }
}

/**
 * Returns the first found voice for a given language code.
 */

function getVoices (locale) {
  if (!_speechSynth) {
    throw new Error('Browser does not support speech synthesis')
  }
  if (_cache[locale]) return _cache[locale]

  _cache[locale] = _voices.filter(voice => voice.lang === locale)
  return _cache[locale]
}


function playByText (locale, text, onEnd) {
  const voices = getVoices(locale)

  // TODO load preference here, e.g. male / female etc.
  // TODO but for now we just use the first occurrence
  const utterance = new window.SpeechSynthesisUtterance()
  utterance.voice = voices[0]
  utterance.pitch = 1
  utterance.rate = 1
  utterance.voiceURI = 'native'
  utterance.volume = 1
  utterance.rate = 1
  utterance.pitch = 0.8
  utterance.text = text
  utterance.lang = locale

  if (onEnd) {
    utterance.onend = onEnd
  }

  _speechSynth.cancel() // cancel current speak, if any is running
  _speechSynth.speak(utterance)
}

// on document ready
loadVoicesWhenAvailable(function () {
 alert("loaded")
})

function speak () {
  setTimeout(() => playByText("en-US", "Hello, world"), 300)
}