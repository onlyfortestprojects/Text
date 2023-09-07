"use strict";

// Selectors
const textAreaEle = document.querySelector("textarea");
const listenButton = document.querySelector("#listen");
const voiceSelectEle = document.querySelector("select");



function loadVoices() {
  let voices = speechSynthesis.getVoices();

  voiceSelectEle.innerHTML = "";

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.text = `(${voice.name} ${voice.lang})`;

    option.selected = voice.name === "Google US English";
    voiceSelectEle.appendChild(option);
  });
}
loadVoices()

window.speechSynthesis.onvoiceschanged = () => loadVoices();





// Variables
let speech = new SpeechSynthesisUtterance();




// Functions
function speakTextToVoice() {
  speech.text = textAreaEle.value;

  if (voiceSelectEle.value)
    speech.voice = speechSynthesis
      .getVoices()
      .filter((voice) => voice.name == voiceSelectEle.value)[0];

  speechSynthesis.speak(speech);
}








// Events
listenButton.addEventListener("click", () => speakTextToVoice());
