if (window.SDreadyStateCheckInterval) {
  document
    .getElementsByTagName("head")[0]
    .append(
      document
        .createRange()
        .createContextualFragment(
          `<script id="sd-cleanup-script" src="${chrome.runtime.getURL(
            "src/inject/cleanup.js"
          )}" type="text/javascript" />`
        )
    );
  window.SDreadyStateCheckInterval = null;
} else {
  window.SDreadyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(window.SDreadyStateCheckInterval);

      // Inject styles
      document
        .getElementsByTagName("head")[0]
        .append(
          document
            .createRange()
            .createContextualFragment(
              `<link id="sd-style-link" href="${chrome.extension.getURL(
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
              `<script id="sd-controls-script" src="${chrome.runtime.getURL(
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
              `<script id="sd-animate-script" src="${chrome.runtime.getURL(
                "src/inject/animate.js"
              )}" type="text/javascript" />`
            )
        );
    }
  }, 10);
}
