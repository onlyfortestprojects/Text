"use strict";

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
  // Clear existing options
  voiceSelectEle.innerHTML = '';

  voices = window.speechSynthesis.getVoices();

  voices.forEach((voice, i) => {
    // const option = new Option(voice.name, voice.name); // Use voice name as both text and value
    // voiceSelectEle.add(option);
		document.body.innerHTML += `<div>${voice.name}</div>`
  });
}

// Events
window.speechSynthesis.onvoiceschanged = () => getVoicesToSelect();

voiceSelectEle.addEventListener("change", () => {
  speech.voice = voices[voiceSelectEle.value];
});

listenButton.addEventListener("click", () => speakTextToVoice());
