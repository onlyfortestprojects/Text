let speech = new SpeechSynthesisUtterance();

let voices = [];

let btn = document.querySelector("#listen");

let voiceselect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = ()=>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; // speak with first voice the default


    voices.forEach((voice, i) => (voiceselect.options[i] = new Option(voice.name, i)))

};

voiceselect.addEventListener("change",()=>{
    speech.voice = voices[voiceselect.value]
})

btn.addEventListener("click",()=>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
})