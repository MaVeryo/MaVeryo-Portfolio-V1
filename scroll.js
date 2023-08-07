const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }   
  });
}, {
  threshold: .2, 
});

const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-top, .threeSplit'); 
hiddenElements.forEach((el) => observer.observe(el));
