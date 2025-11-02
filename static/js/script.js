document.addEventListener('DOMContentLoaded', function(){
  const bgVideo = document.getElementById('bg-video');
  const startBtn = document.getElementById('startVideo');
  const audio = document.getElementById('ambientAudio');
  const audioToggle = document.getElementById('audioToggle');

  // 🎬 Start Video & Audio
  if(startBtn){
    startBtn.addEventListener('click', ()=>{
      try{ bgVideo.play(); }catch(e){ console.warn(e); }
      try{ audio.play(); audioToggle.textContent='🔊'; }catch(e){ console.warn(e); }
    });
  }

  // 🔊 Toggle Audio
  if(audioToggle){
    audioToggle.addEventListener('click', ()=>{
      if(audio.paused){
        audio.play();
        audioToggle.textContent='🔊';
        audioToggle.setAttribute('aria-pressed','true');
      } else {
        audio.pause();
        audioToggle.textContent='🔈';
        audioToggle.setAttribute('aria-pressed','false');
      }
    });
  }

  // 💡 AI Tools Card Logic (Only one open at a time)
  window.toggleDescription = function(selectedCard){
    const allCards = document.querySelectorAll('.skill-card');

    allCards.forEach(card => {
      if (card !== selectedCard) {
        card.classList.remove('active'); // close all others
      }
    });

    selectedCard.classList.toggle('active'); // toggle the clicked one
  };

  // ✨ Animate Elements when in View (for "Why" section or others)
  const whyCards = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold: 0.25});
  whyCards.forEach(c => observer.observe(c));

  // ✅ Real-time Form Validation
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");

  const nameRegex = /^[a-zA-Z\s]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  function showError(el, msg) {
    el.textContent = msg;
    el.classList.add("show");
  }

  function hideError(el) {
    el.textContent = "";
    el.classList.remove("show");
  }

  nameInput.addEventListener("input", () =>
    !nameRegex.test(nameInput.value.trim())
      ? showError(nameError, "Enter valid name (3–30 letters).")
      : hideError(nameError)
  );

  emailInput.addEventListener("input", () =>
    !emailRegex.test(emailInput.value.trim())
      ? showError(emailError, "Enter valid email address.")
      : hideError(emailError)
  );

  phoneInput.addEventListener("input", () =>
    !phoneRegex.test(phoneInput.value.trim())
      ? showError(phoneError, "Phone number must be 10 digits.")
      : hideError(phoneError)
  );

  messageInput.addEventListener("input", () =>
    messageInput.value.trim().length < 10
      ? showError(messageError, "Message should be at least 10 characters.")
      : hideError(messageError)
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      !nameError.textContent &&
      !emailError.textContent &&
      !phoneError.textContent &&
      !messageError.textContent
    ) {
      alert("Form is valid and ready to send!,Thanks {nameInput.value}");
      form.reset();
    }
  });
});
