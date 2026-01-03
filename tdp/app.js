

/* =========================
   PWA + ORIENTATION
========================= */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock("portrait").catch(()=>{});
}

/* =========================
   EDIT MODE STATE
========================= */
let isEditMode = false;
let editSnapshot = null;

/* =========================
   WEB AUDIO (WITH VOLUME)
========================= */
let audioCtx = null;
let soundVolume = Number(localStorage.getItem("SOUND_VOL") || 50);
let lastVolume  = Number(localStorage.getItem("LAST_VOL") || 50);

function playSound(type="tap"){
  if (isEditMode) return;

  try{
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();

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
   ELEMENTS
========================= */
const app = document.querySelector(".app");

const totalEl = document.getElementById("total");
const unitLabelEl = document.getElementById("unitLabel");
const sessionBlock = document.getElementById("sessionBlock");

const tapWrap = document.getElementById("tapWrap");
const tapBtn  = document.getElementById("tap");
const minusBtn = document.getElementById("minus");
const sendBtn = document.getElementById("send");
const copyBtn = document.getElementById("copy");
const resetBtn = document.getElementById("reset");

const volumeSlider = document.getElementById("volumeSlider");
const volumeLabel  = document.getElementById("volumeLabel");
const volumeBar    = document.querySelector(".volume-bar");
const volIcon      = document.getElementById("volIcon");

/* Edit menu */
const editBtn  = document.getElementById("editModeBtn");
const editMenu = document.getElementById("editMenu");

/* Size controls */
const tapSizePlus  = document.getElementById("tapSizePlus");
const tapSizeMinus = document.getElementById("tapSizeMinus");

/* =========================
   STATE
========================= */
let total = Number(localStorage.getItem("TOTAL_PAX") || 0);
let session = Number(localStorage.getItem("SESSION_PAX") || 0);

let unitLabel = localStorage.getItem("UNIT_LABEL");
if (unitLabel === null) unitLabel = "x";

/* layout state (persist) */
let tapX = 0;
let tapY = 0;
let tapScale = 1; // max 1.25

const savedLayoutRaw = localStorage.getItem("LAYOUT_STATE");
if (savedLayoutRaw) {
  try{
    const s = JSON.parse(savedLayoutRaw);
    if (typeof s.tapX === "number") tapX = s.tapX;
    if (typeof s.tapY === "number") tapY = s.tapY;
    if (typeof s.tapScale === "number") tapScale = s.tapScale;
    if (typeof s.unitLabel === "string") unitLabel = s.unitLabel;
  }catch(e){}
}

render();
updateIcon();
renderUnit();
applyTapTransform();
window.addEventListener("load", ()=>{
  clampTapToBounds();
 
});

/* =========================
   HELPERS
========================= */
function render(){
  totalEl.textContent = total;
  sessionBlock.textContent = `+${session}`;
}

function saveCounts(){
  localStorage.setItem("TOTAL_PAX", total);
  localStorage.setItem("SESSION_PAX", session);
}

function updateIcon(){
  volIcon.textContent = soundVolume === 0 ? "🔇" : "🔈";
}

function renderUnit(){
  unitLabelEl.textContent = (isEditMode ? "[ Edit Text ]" : unitLabel);
  if (isEditMode) unitLabelEl.classList.add("is-placeholder");
  else unitLabelEl.classList.remove("is-placeholder");
}

function getCopyText(){
  return unitLabel ? `${total} ${unitLabel}` : `${total}`;
}

function saveLayout(){
  localStorage.setItem("LAYOUT_STATE", JSON.stringify({
    tapX, tapY, tapScale,
    unitLabel
  }));
}

function applyTapTransform(){
  tapWrap.style.transform = `translate(${tapX}px, ${tapY}px) scale(${tapScale})`;
}

function clampTapToBounds(){
  const appRect = app.getBoundingClientRect();
  const r = tapWrap.getBoundingClientRect();

  let shiftX = 0;
  let shiftY = 0;

  if (r.left < appRect.left) shiftX = appRect.left - r.left;
  if (r.right > appRect.right) shiftX = appRect.right - r.right;
  if (r.top < appRect.top) shiftY = appRect.top - r.top;
  if (r.bottom > appRect.bottom) shiftY = appRect.bottom - r.bottom;

  tapX += shiftX;
  tapY += shiftY;

  applyTapTransform();
}

/* =========================
   EDIT MODE TOGGLE
========================= */
editBtn.addEventListener("click", ()=>{
  isEditMode = !isEditMode;

  editMenu.classList.toggle("hidden", !isEditMode);
  app.classList.toggle("edit-active", isEditMode);

  if (isEditMode) {
    editSnapshot = { unitLabel, tapX, tapY, tapScale };

    unitLabelEl.textContent = "[ Edit Text ]";
    unitLabelEl.classList.add("is-placeholder");

    tapBtn.textContent = "[ Drag / Move ]";
    tapBtn.classList.add("is-drag-hint");
  } else {
    restoreSnapshot();
    exitEditModeUI();
  }
});

function exitEditModeUI(){
  tapBtn.textContent = "CLICK";
  tapBtn.classList.remove("is-drag-hint");

  unitLabelEl.classList.remove("is-placeholder");
  unitLabelEl.textContent = unitLabel;
}

/* =========================
   EDIT MENU ACTIONS
========================= */
editMenu.addEventListener("click", e=>{
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === "save") {
    localStorage.setItem("UNIT_LABEL", unitLabel);
    saveLayout();
    isEditMode = false;
    editMenu.classList.add("hidden");
    app.classList.remove("edit-active");
    exitEditModeUI();
    return;
  }

  if (action === "cancel") {
    restoreSnapshot();
    isEditMode = false;
    editMenu.classList.add("hidden");
    app.classList.remove("edit-active");
    exitEditModeUI();
    return;
  }

  if (action === "reset") {
    unitLabel = "x";
    localStorage.setItem("UNIT_LABEL", unitLabel);

    tapX = 0;
    tapY = 0;
    tapScale = 1;
    applyTapTransform();
    clampTapToBounds();

    saveLayout();

    isEditMode = false;
    editMenu.classList.add("hidden");
    app.classList.remove("edit-active");
    exitEditModeUI();
    return;
  }
});

function restoreSnapshot(){
  if (!editSnapshot) return;
  unitLabel = editSnapshot.unitLabel;
  tapX = editSnapshot.tapX;
  tapY = editSnapshot.tapY;
  tapScale = editSnapshot.tapScale;
  applyTapTransform();
  clampTapToBounds();
}

/* =========================
   EDITABLE UNIT LABEL (Edit Mode Only)
========================= */
unitLabelEl.addEventListener("pointerdown", ()=>{
  if (!isEditMode) return;

  const input = document.createElement("input");
  input.type = "text";
  input.value = "";
  input.maxLength = 14;

  input.style.background = "transparent";
  input.style.color = "#fff";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.fontSize = "20px";
  input.style.fontWeight = "700";
  input.style.width = "130px";

  unitLabelEl.replaceWith(input);
  input.focus();

  function finish(){
    unitLabel = input.value.trim();
    unitLabelEl.textContent = unitLabel ? unitLabel : "[ Edit Text ]";
    if (!unitLabel) unitLabelEl.classList.add("is-placeholder");
    else unitLabelEl.classList.remove("is-placeholder");
    input.replaceWith(unitLabelEl);
  }

  input.addEventListener("blur", finish);
  input.addEventListener("keydown", (e)=>{
    if (e.key === "Enter") input.blur();
  });
});

/* =========================
   DRAG TAP WRAP (EDIT MODE ONLY)
========================= */
let dragStartPointerX = 0;
let dragStartPointerY = 0;
let dragStartTapX = 0;
let dragStartTapY = 0;

tapBtn.addEventListener("pointerdown", (e)=>{
  if (!isEditMode) return;

  e.preventDefault();

  const rect = tapWrap.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  tapX += (e.clientX - centerX);
  tapY += (e.clientY - centerY);
  applyTapTransform();
  clampTapToBounds();

  dragStartPointerX = e.clientX;
  dragStartPointerY = e.clientY;
  dragStartTapX = tapX;
  dragStartTapY = tapY;

  function move(ev){
    tapX = dragStartTapX + (ev.clientX - dragStartPointerX);
    tapY = dragStartTapY + (ev.clientY - dragStartPointerY);
    applyTapTransform();
    clampTapToBounds();
  }

  function up(){
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", up);
  }

  document.addEventListener("pointermove", move, { passive:false });
  document.addEventListener("pointerup", up);
});

/* =========================
   TAP (NORMAL MODE)
========================= */
tapBtn.addEventListener("pointerdown", ()=>{
  if (isEditMode) return;

  playSound("tap");
  if (navigator.vibrate) navigator.vibrate(20);

  session++;
  total++;
  saveCounts();
  render();
});

/* =========================
   MINUS (NORMAL MODE)
========================= */
minusBtn.addEventListener("pointerdown", ()=>{
  if (isEditMode) return;

  if(total > 0){
    playSound("tap");
    if (navigator.vibrate) navigator.vibrate(10);

    total--;
    if(session > 0) session--;
    saveCounts();
    render();
  }
});

/* =========================
   COPY
========================= */
copyBtn.onclick = async ()=>{
  if (isEditMode) return;

  playSound("tap");
  await navigator.clipboard.writeText(getCopyText());

  session = 0;
  saveCounts();
  render();
};

/* =========================
   COPY + WHATSAPP
========================= */
sendBtn.onclick = async ()=>{
  if (isEditMode) return;

  playSound("tap");
  await navigator.clipboard.writeText(getCopyText());

  session = 0;
  saveCounts();
  render();

  window.location.href = "whatsapp://send";
};

/* =========================
   RESET ALL (NORMAL MODE)
========================= */
resetBtn.onclick = ()=>{
  if (isEditMode) return;

  playSound("reset");
  total = 0;
  session = 0;

  localStorage.clear();

  unitLabel = "x";
  localStorage.setItem("UNIT_LABEL", unitLabel);

  tapX = 0; tapY = 0; tapScale = 1;
  applyTapTransform();
  saveLayout();

  render();
  updateIcon();
  exitEditModeUI();
};

/* =========================
   VOLUME SLIDER
========================= */
volumeSlider.value = soundVolume;
volumeLabel.textContent = `Volume ${soundVolume}%`;

let labelTimer = null;

volumeSlider.addEventListener("input", ()=>{
  soundVolume = Number(volumeSlider.value);

  if(soundVolume > 0){
    lastVolume = soundVolume;
    localStorage.setItem("LAST_VOL", lastVolume);
  }

  localStorage.setItem("SOUND_VOL", soundVolume);
  updateIcon();

  volumeLabel.textContent = `Volume ${soundVolume}%`;
  volumeBar.classList.add("show-label");

  clearTimeout(labelTimer);
  labelTimer = setTimeout(()=>{
    volumeBar.classList.remove("show-label");
  }, 800);
});

/* =========================
   SINGLE TAP ICON → MUTE
========================= */
volIcon.addEventListener("pointerdown", ()=>{
  if (isEditMode) return;

  if(soundVolume === 0){
    soundVolume = lastVolume || 50;
  }else{
    lastVolume = soundVolume;
    soundVolume = 0;
  }

  volumeSlider.value = soundVolume;
  localStorage.setItem("SOUND_VOL", soundVolume);
  localStorage.setItem("LAST_VOL", lastVolume);

  updateIcon();

  volumeLabel.textContent = `Volume ${soundVolume}%`;
  volumeBar.classList.add("show-label");

  clearTimeout(labelTimer);
  labelTimer = setTimeout(()=>{
    volumeBar.classList.remove("show-label");
  }, 800);
});

/* =========================
   SIZE + / - (EDIT MODE ONLY)
========================= */
function clampScale(){
  if (tapScale > 1.25) tapScale = 1.25;
  if (tapScale < 0.6) tapScale = 0.6;
}

tapSizePlus.addEventListener("pointerdown", (e)=>{
  if (!isEditMode) return;
  e.preventDefault();

  tapScale += (10 / 170);
  clampScale();
  applyTapTransform();
  clampTapToBounds();

});

tapSizeMinus.addEventListener("pointerdown", (e)=>{
  if (!isEditMode) return;
  e.preventDefault();

  tapScale -= (10 / 170);
  clampScale();
  applyTapTransform();
  clampTapToBounds();

});

