window.sdExtensionElements = [
  "sd-bottom-bar",
  "sd-style-link",
  "sd-controls-script",
  "sd-animate-script",
  "sd-cleanup-script"
];

window.sdExtensionElements.forEach(item =>
  document.getElementById(item).remove()
);

window.sdExtensionElements = null;
