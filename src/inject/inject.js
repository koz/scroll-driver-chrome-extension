chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // Inject styles
      document
        .getElementsByTagName("head")[0]
        .append(
          document
            .createRange()
            .createContextualFragment(
              `<link href="${chrome.extension.getURL(
                "src/inject/style.css"
              )}" rel="stylesheet">`
            )
        );

      // Inject layout
      fetch(chrome.runtime.getURL("src/inject/layout.html"))
        .then(data => data.text())
        .then(response =>
          document
            .getElementsByTagName("html")[0]
            .append(document.createRange().createContextualFragment(response))
        );

      // Add scroll listener
      document.addEventListener("scroll", event => {
        if (selectedEl) {
          selectedEl.style.setProperty(
            "transform",
            `translateY(${window.scrollY}px)`
          );
        }
      });

      const allElements = document.querySelectorAll("body > *");
      let selectedElOriginalStyle = {};
      let selectedEl;

      const YScrollSize = document.body.scrollHeight - window.innerHeight;

      // Add click events to add animation to selected element;
      allElements.forEach(item =>
        item.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          if (selectedEl && Object.keys(selectedElOriginalStyle).length) {
            Object.keys(selectedElOriginalStyle).forEach(item => {
              selectedEl.classList.remove("sd-animation");
              selectedEl.style.setProperty(item, selectedElOriginalStyle[item]);
            });
          }

          selectedEl = e.target;
          selectedElOriginalStyle = {
            transform: selectedEl.style.transform
          };
          selectedEl.classList.add("sd-animation");
        })
      );

      // Add border to highlight which element is being selected
      allElements.forEach(item => {
        item.addEventListener("mouseover", e => {
          el = e.target;
          el.classList.add("sd-hover-item");
        });
        item.addEventListener("mouseout", e => {
          el = e.target;
          el.classList.remove("sd-hover-item");
        });
      });
    }
  }, 10);
});
