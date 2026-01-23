document.addEventListener("DOMContentLoaded", () => {
  const pills = document.querySelectorAll(".icon-pill");
  let index = 0;
  let isHovering = false;
  let timers = [];

  function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  }

  function runAnimation() {
    if (isHovering) return;

    const current = pills[index];
    current.classList.add("expand");

    // stay expanded (2s)
    timers.push(setTimeout(() => {
      current.classList.remove("expand");

      // wait then next
      timers.push(setTimeout(() => {
        index = (index + 1) % pills.length;
        runAnimation();
      }, 400));

    }, 2000));
  }

  /* start */
  runAnimation();

  /* DESKTOP hover control */
  pills.forEach(pill => {
    pill.addEventListener("mouseenter", () => {
      isHovering = true;
      clearTimers();
      pills.forEach(p => p.classList.remove("expand"));
      pill.classList.add("expand");
    });

    pill.addEventListener("mouseleave", () => {
      pill.classList.remove("expand");
      isHovering = false;
      clearTimers();
      runAnimation();
    });
  });
});