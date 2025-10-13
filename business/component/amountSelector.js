// ----------------------
// Amount Selector Component
// ----------------------
(function () {
  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    /* --- Glass Popup Base --- */
    .amount-selector-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      display: none;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(6px);
      z-index: 9999;
      animation: fadeIn 0.3s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .amount-selector-window {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 15px;
      padding: 20px 25px;
      backdrop-filter: blur(15px);
      color: #fff;
      width: 90%;
      max-width: 320px;
      box-shadow: 0 0 20px rgba(255,255,255,0.1);
      animation: fadeIn 0.3s ease;
      font-family: system-ui, sans-serif;
      text-align: center;
      position: relative;
    }
    .amount-selector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 1.1rem;
      font-weight: 500;
    }
    .amount-close {
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
      color: #fff;
      transition: 0.2s;
    }
    .amount-close:hover { color: #ff5555; }

    .amount-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin: 10px 0;
    }
    .amount-btn {
      border: none;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 1rem;
      background: rgba(255,255,255,0.25);
      color: #fff;
      cursor: pointer;
      transition: 0.2s;
    }
    .amount-btn:hover {
      background: rgba(255,255,255,0.4);
    }

    .amount-total {
      margin-top: 15px;
      font-size: 1.1rem;
      font-weight: 500;
    }
    .confirm-btn {
      margin-top: 18px;
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      border: none;
      border-radius: 10px;
      background: rgba(255,255,255,0.25);
      color: #fff;
      cursor: pointer;
      transition: 0.2s;
    }
    .confirm-btn:hover {
      background: rgba(255,255,255,0.4);
    }

    .toggle-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(255,255,255,0.25);
      backdrop-filter: blur(10px);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 55px;
      height: 55px;
      font-size: 1.5rem;
      cursor: pointer;
      transition: 0.3s;
      z-index: 999;
    }
    .toggle-btn:hover {
      background: rgba(255,255,255,0.4);
    }
  `;
  document.head.appendChild(style);

  // Create main popup elements
  const overlay = document.createElement("div");
  overlay.className = "amount-selector-overlay";
  overlay.innerHTML = `
    <div class="amount-selector-window">
      <div class="amount-selector-header">
        <span>Select amount</span>
        <span class="amount-close">✕</span>
      </div>
      <div class="amounts"></div>
      <div class="amount-total">Total: $<span id="amountTotal">0</span></div>
      <button class="confirm-btn">Confirm</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "toggle-btn";
  toggleBtn.textContent = "💲";
  document.body.appendChild(toggleBtn);

  const amountsDiv = overlay.querySelector(".amounts");
  const totalDisplay = overlay.querySelector("#amountTotal");
  const confirmBtn = overlay.querySelector(".confirm-btn");
  const closeBtn = overlay.querySelector(".amount-close");

  const amounts = [50, 100, 500, 1000, 5000, 10000];
  const selections = {};
  let callbackFn = null;

  // Create amount rows dynamically
  amounts.forEach(val => {
    selections[val] = 0;
    const row = document.createElement("div");
    row.className = "amount-row";
    row.innerHTML = `
      <button class="amount-btn" data-val="${val}" data-type="minus">-</button>
      <span>$${val}</span>
      <button class="amount-btn" data-val="${val}" data-type="plus">+</button>
    `;
    amountsDiv.appendChild(row);
  });

  function updateTotal() {
    let total = 0;
    for (const [val, count] of Object.entries(selections)) {
      total += val * count;
    }
    totalDisplay.textContent = total;
  }

  // Button actions
  overlay.addEventListener("click", e => {
    const btn = e.target.closest(".amount-btn");
    if (!btn) return;
    const val = parseInt(btn.dataset.val);
    const type = btn.dataset.type;
    if (type === "plus") selections[val]++;
    if (type === "minus" && selections[val] > 0) selections[val]--;
    updateTotal();
  });

  // Confirm action
  confirmBtn.addEventListener("click", () => {
    const total = parseInt(totalDisplay.textContent);
    if (callbackFn) callbackFn(total);
    closeOverlay();
  });

  // Close actions
  closeBtn.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeOverlay();
  });

  function closeOverlay() {
    overlay.style.display = "none";
    for (const key in selections) selections[key] = 0;
    updateTotal();
  }

  // Toggle icon click
  toggleBtn.addEventListener("click", () => {
    openAmountSelector();
  });

  // Public open function
  window.openAmountSelector = function (callback) {
    callbackFn = callback || null;
    overlay.style.display = "flex";
  };
})();
