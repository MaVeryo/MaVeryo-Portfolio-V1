const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

document.querySelectorAll(".languageList li").forEach(item => {
  let originalText = item.innerText;

  item.addEventListener("mouseover", event => {
    const target = event.currentTarget;
    const hoverText = target.dataset.hover;
    originalText = target.innerText; // Save the original text
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      target.innerText = hoverText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return hoverText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= hoverText.length) {
        clearInterval(interval);
        target.innerText = hoverText; // Set the text to data-hover when the animation is done
      }

      iteration += 1 / 3;
    }, 30);
  });

  item.addEventListener("mouseout", event => {
    clearInterval(interval);
    const target = event.currentTarget;
    target.innerText = originalText; // Reset the text to its original content on mouseout
  });
});
