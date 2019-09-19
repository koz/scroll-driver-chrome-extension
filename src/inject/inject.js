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

      // Inject scripts
      document
        .getElementsByTagName("head")[0]
        .append(
          document
            .createRange()
            .createContextualFragment(
              `<script src="${chrome.runtime.getURL(
                "src/inject/controls.js"
              )}" type="text/javascript" />`
            )
        );
      document
        .getElementsByTagName("head")[0]
        .append(
          document
            .createRange()
            .createContextualFragment(
              `<script src="${chrome.runtime.getURL(
                "src/inject/animate.js"
              )}" type="text/javascript" />`
            )
        );
    }
  }, 10);
});
