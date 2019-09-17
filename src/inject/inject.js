chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      const allElements = document.querySelectorAll("body > *");
      let selectedElOriginalStyle = {};
      let selectedEl;
      document.addEventListener("scroll", event => {
        if (selectedEl) {
          selectedEl.style.setProperty(
            "transform",
            `translateY(${window.scrollY}px)`
          );
        }
      });

      allElements.forEach(item =>
        item.addEventListener("click", e => {
          if (selectedEl && Object.keys(selectedElOriginalStyle).length) {
            Object.keys(selectedElOriginalStyle).forEach(item => {
              selectedEl.style.setProperty(item, selectedElOriginalStyle[item]);
            });
          }

          selectedEl = e.target;
          selectedElOriginalStyle = {
            transition: selectedEl.style.transition,
            transform: selectedEl.style.transform
          };
          selectedEl.style.setProperty("transition", "all 300ms ease");
        })
      );

      allElements.forEach(item => {
        item.addEventListener("mouseover", e => {
          el = e.target;
          el.style.setProperty("border", "1px dotted red");
        });
        item.addEventListener("mouseout", e => {
          el = e.target;
          el.style.setProperty("border", "");
        });
      });
    }
  }, 10);
});
