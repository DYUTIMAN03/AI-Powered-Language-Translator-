var crsr = document.querySelector("#cursor")
var blur = document.querySelector("#cursor-blur")
document.addEventListener("mousemove", function(dets){
    crsr.style.left = dets.x+30+"px"
    crsr.style.top = dets.y+"px"
    blur.style.top = dets.y-250+"px"
    blur.style.left = dets.x-250+"px"
})

var h4all = document.querySelectorAll("#nav h4")
h4all.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        crsr.style.scale = 3
        crsr.style.border = "0.5px solid white"
        crsr.style.backgroundColor = "transparent"

    })
})
h4all.forEach(function(elem){
    elem.addEventListener("mouseleave",function(){
        crsr.style.scale = 1
        crsr.style.border = "0.5px solid #95c11e"
        crsr.style.backgroundColor = "#95c11e"

    })
})
gsap.to("#nav", {
    backgroundColor : "black",
    height: "110px",
    duration:0.5,
    scrollTrigger:{
        trigger:"#nav",
        scroller:"body",
        
        start:"top -10%",
        end:"top -10%",
        scrub:1
    }
});

gsap.to("#main",{
    backgroundColor:"black",
    scrollTrigger:{
        trigger:"#main",
        scroller:"body",
        
        start:"top -25%",
        end: "top -70%",
        scrub: 2,
    },
});

gsap.from("#about-us img,#about-us-in", {
  y: 90,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#about-us",
    scroller: "body",
    
    start: "top 70%",
    end: "top 65%",
    scrub: 1,
  },
});

gsap.from(".card", {
   scale:0.8,
    
    duration: 1,
    stagger:0.1,
    scrollTrigger: {
      trigger: ".card ",
      scroller: "body",
      
      start: "top 70%",
      end: "top 65%",
      scrub: 1,
    },
  });

  gsap.from("#colon1", {
    y: -70,
    x: -70,
    scrollTrigger: {
      trigger: "#colon1",
      scroller: "body",
      
      start: "top 55%",
      end: "top 45%",
      scrub: 4,
    },
  });
  gsap.from("#colon2", {
    y: 70,
    x: 70,
    scrollTrigger: {
      trigger: "#colon1",
      scroller: "body",
      
      start: "top 75%",
      end: "top 65%",
      scrub: 4,
    },
  });

  gsap.from("#page4 h1", {
    y: 50,
    scrollTrigger: {
      trigger: "#page4 h1",
      scroller: "body",
      
      start: "top 75%",
      end: "top 70%",
      scrub: 3,
    },
  });
  
  // Function to handle translation
async function translate() {
  // Get input values from the frontend
  const sourceText = document.getElementById("sourceText").value;
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;

  if (!sourceText || !sourceLang || !targetLang) {
      alert("Please fill in all fields.");
      return;
  }

  // API endpoint for translation
  const apiUrl = "http://127.0.0.1:5000/translate";

  try {
      // Send POST request to the backend
      const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              text: sourceText,
              src_lang: sourceLang,
              tgt_lang: targetLang,
          }),
      });

      // Handle response
      if (response.ok) {
          const data = await response.json();
          document.getElementById("targetText").value = data.translated_text;
      } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
      }
  } catch (error) {
      console.error("Error while translating:", error);
      alert("An error occurred while communicating with the backend.");
  }
}

// Attach the translate function to the button
document.addEventListener("DOMContentLoaded", () => {
  const translateButton = document.getElementById("translateButton");
  if (translateButton) {
      translateButton.addEventListener("click", translate);
  } else {
      console.error("Translate button not found!");
  }
});

  /* Paste the updated JavaScript code here */
// Map language codes to valid browser speech recognition/synthesis language codes
const langCodeMap = {
  eng_Latn: "en-US", // English (US)
  hin_Deva: "hi-IN", // Hindi
  urd_Arab: "ur-PK", // Urdu
  ben_Beng: "bn-IN", // Bengali
  mar_Deva: "mr-IN", // Marathi
  tam_Taml: "ta-IN", // Tamil
  tel_Telu: "te-IN", // Telugu
  guj_Gujr: "gu-IN", // Gujarati
  kan_Knda: "kn-IN", // Kannada
  spa_Latn: "es-ES", // Spanish
  fra_Latn: "fr-FR", // French
  deu_Latn: "de-DE", // German
  ita_Latn: "it-IT", // Italian
  jpn_Jpan: "ja-JP", // Japanese
  zho_Hans: "zh-CN", // Chinese (Simplified)
  zho_Hant: "zh-TW", // Chinese (Traditional)
  rus_Cyrl: "ru-RU", // Russian
  por_Latn: "pt-BR", // Portuguese (Brazil)
  ara_Arab: "ar-SA", // Arabic
  kor_Hang: "ko-KR", // Korean
  tha_Thai: "th-TH", // Thai
  vie_Latn: "vi-VN", // Vietnamese
  swe_Latn: "sv-SE", // Swedish
  nld_Latn: "nl-NL", // Dutch
  tur_Latn: "tr-TR"  // Turkish 
};

// Function to handle voice input for the source text
function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  const sourceLang = document.getElementById("sourceLang").value;
  const lang = langCodeMap[sourceLang]; // Map to valid recognition language

  if (!lang) {
      alert(`Voice input is not supported for the selected language (${sourceLang})`);
      return;
  }

  recognition.lang = lang;

  recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById("sourceText").value = transcript;
  };

  recognition.onerror = (event) => {
      alert("Error with voice input: " + event.error);
  };

  recognition.start();
}

// Function to read the output text aloud
function readOutputText() {
  const utterance = new SpeechSynthesisUtterance();
  const targetText = document.getElementById("targetText").value;

  if (!targetText) {
      alert("There is no text to read aloud!");
      return;
  }

  const targetLang = document.getElementById("targetLang").value;
  const lang = langCodeMap[targetLang]; // Map to valid synthesis language

  if (!lang) {
      alert(`Voice output is not supported for the selected language (${targetLang})`);
      return;
  }

  utterance.text = targetText;
  utterance.lang = lang;

  // Set a default voice if available
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
      const voice = voices.find(v => v.lang === lang) || voices[0]; // Use the first available voice if none match
      utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

// Log an alert if SpeechRecognition or SpeechSynthesis is unsupported
document.addEventListener("DOMContentLoaded", () => {
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert("Your browser does not support speech recognition.");
  }
  if (!window.speechSynthesis) {
      alert("Your browser does not support speech synthesis.");
  }
});