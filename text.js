"use strict"

// Selectors
const textAreaEle = document.querySelector("textarea")
const listenButton = document.querySelector("#listen")
const voiceSelectEle = document.querySelector("select");




// Variables
let speech = new SpeechSynthesisUtterance();
let voices = [];




// Functions
function speakTextToVoice() {
  speech.text = textAreaEle.value;
  window.speechSynthesis.speak(speech);
}


function getVoicesToSelect() {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0]; // speak with first voice the default

  voices.forEach(
    (voice, i) => {
			const option = new Option(voice.name, i)
			option.value = voice.name
			voiceSelectEle.options[i] = option
		}
  );
}
getVoicesToSelect()




// Events
window.speechSynthesis.onvoiceschanged = () => getVoicesToSelect();

voiceSelectEle.addEventListener("change", () => {
  speech.voice = voices[voiceSelectEle.value];
});

listenButton.addEventListener("click", () => speakTextToVoice());