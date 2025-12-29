/* =========================
   WEB AUDIO (WITH VOLUME)
   (EXACT OLD LOGIC)
========================= */

let audioCtx = null;
let soundVolume = Number(localStorage.getItem("SOUND_VOL") || 50);
let lastVolume  = Number(localStorage.getItem("LAST_VOL") || 50);

function playSound(type="tap"){
  try{
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if(type === "reset"){
      osc.type = "sawtooth";
      osc.frequency.value = 300;
    }else{
      osc.type = "square";
      osc.frequency.value = 1200;
    }

    const vol = soundVolume / 100;

    gain.gain.setValueAtTime(
      (type === "reset" ? 0.25 : 0.15) * vol,
      audioCtx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + (type === "reset" ? 0.15 : 0.04)
    );

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + (type === "reset" ? 0.18 : 0.05));
  }catch(e){}
}

/* =========================
   HAPTIC (EXACT OLD)
========================= */

function haptic(ms){
  try{
    if (navigator.vibrate) navigator.vibrate(ms);
  }catch(e){}
}

/* =========================
   VOLUME HELPERS (EXACT OLD)
========================= */

function updateSoundVolume(v){
  soundVolume = Number(v);

  if(soundVolume > 0){
    lastVolume = soundVolume;
    localStorage.setItem("LAST_VOL", lastVolume);
  }

  localStorage.setItem("SOUND_VOL", soundVolume);
}

function toggleMute(){
  if(soundVolume === 0){
    soundVolume = lastVolume || 50;
  }else{
    lastVolume = soundVolume;
    soundVolume = 0;
  }

  localStorage.setItem("SOUND_VOL", soundVolume);
  localStorage.setItem("LAST_VOL", lastVolume);
}