"use strict";

// Selectors
const textAreaEle = document.querySelector("textarea");
const listenButton = document.querySelector("#listen");
const voiceSelectEle = document.querySelector("select");




// Variables
let speech = new SpeechSynthesisUtterance();
let voices = [];




// Functions
function speakTextToVoice() {
  speech.text = textAreaEle.value;

  if (voiceSelectEle.value)
    speech.voice = speechSynthesis
      .getVoices()
      .filter((voice) => voice.name == voiceSelectEle.value)[0];

  speechSynthesis.speak(speech);
}



function loadVoices() {
  voices = window.speechSynthesis.getVoices();

  voiceSelectEle.innerHTML = "";

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.text = `(${voice.name} ${voice.lang})`;

    option.selected = voice.name === "Google US English";
    voiceSelectEle.appendChild(option);
  });
}




// Events
window.speechSynthesis.onvoiceschanged = () => loadVoices();

voiceSelectEle.addEventListener("change", () => {
  speech.voice = voices[voiceSelectEle.value];
});

listenButton.addEventListener("click", () => speakTextToVoice());
